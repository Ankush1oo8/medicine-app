"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart, calcItemTotals } from "@/lib/cart"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Loader2, User } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore"
import { firebaseClientApp } from "@/lib/firebase/client"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/hooks/use-toast"

const db = getFirestore(firebaseClientApp)

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, total, update, remove, clear } = useCart()
  const { user } = useAuth()
  const [checkingOut, setCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    setCheckingOut(true)
    try {
      const orderId = `${Date.now()}-${uuidv4()}`
      const now = Timestamp.now()

      const orderItems = items.map((it) => {
        const { total: itemTotal } = calcItemTotals(it.price, it.gst ?? "5%", it.ptr, it.quote, it.discountPercent)
        return {
          GST_Rate: it.gst_rate ?? it.gst ?? "5%",
          Image_URL: it.image ?? "",
          MRP: it.price.toFixed(2),
          Manufacturer: it.manufacturer ?? "",
          name: it.name,
          Quantity: it.pack ?? "",
          Salt_Composition: it.salt_composition ?? "",
          prodId: it.prodId ?? it.id,
          quantity: it.qty,
          price: itemTotal.toFixed(2),
          lr: "",
          orderId: orderId,
          payment: "pending",
          status: "pending",
          type: "normal",
          updatedAt: now,
        }
      })

      const orderData = {
        address: "",
        amount: total,
        totalAmount: total,
        bill: "",
        userNumber: user.phone,
        createdAt: now,
        invoicee: "",
        items: orderItems,
        lr: "",
        name: user.name ?? "",
        orderId: orderId,
        payment: "pending",
        status: "pending",
        type: "normal",
        updatedAt: now,
      }

      await setDoc(doc(db, "orders", orderId), orderData)

      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully!",
      })

      await clear()
      router.push("/medicines")

    } catch (error: any) {
      console.error("Checkout failed", error)
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description: error.message ?? "Something went wrong.",
      })
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-1">Review and manage your selected medicines</p>
          </div>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium">{user.name || 'User'}</div>
              <div className="text-xs text-muted-foreground">{user.phone}</div>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src="/generic-user-avatar.jpg" alt="Profile" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : null}
      </div>

      <div className="rounded-3xl border bg-gradient-to-br from-card to-muted/20 shadow-lg overflow-hidden animate-fade-in">
        {items.length === 0 ? (
          <div className="p-20 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-muted/50 to-muted/30 mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-muted-foreground mb-3">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Add some medicines to get started with your order. Browse our extensive collection of pharmaceutical products.</p>
            <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/medicines" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Browse Medicines
              </Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {items.map((it, index) => {
              const { total: unitNetPrice } = calcItemTotals(
                it.price,
                it.gst,
                it.ptr,
                it.quote,
                it.discountPercent,
              )
              return (
                <div key={it.id} className="p-6 hover:bg-muted/30 transition-colors animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={it.image || "/placeholder.svg?height=80&width=80&query=medicine"}
                        alt=""
                        className="size-20 rounded-xl bg-gradient-to-br from-muted to-muted/50 object-contain shadow-sm"
                      />
                      {it.discountPercent && it.discountPercent > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          -{it.discountPercent}%
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-1 mb-1">{it.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {it.salt_composition || it.pack}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-muted-foreground line-through">
                          MRP: Rs {it.price.toFixed(2)}
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          Rs {unitNetPrice.toFixed(2)}
                        </div>
                        {it.gst && (
                          <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            GST {it.gst}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Qty:</label>
                        <Input
                          type="number"
                          min={1}
                          value={it.qty}
                          onChange={(e) => update(it.id, Math.max(1, Number(e.target.value)))}
                          className="w-20 h-9"
                          disabled={checkingOut}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => remove(it.id)}
                        className="rounded-full border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        disabled={checkingOut}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="rounded-3xl border bg-gradient-to-br from-card to-muted/20 p-8 shadow-lg animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShoppingCart className="h-4 w-4" />
                {items.length} item{items.length !== 1 ? 's' : ''} in cart
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">Total: Rs {total.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">(including GST)</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={clear}
                className="rounded-full border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                disabled={checkingOut}
              >
                Clear Cart
              </Button>
              {user ? (
                <Button
                  size="lg"
                  className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={checkingOut}
                  onClick={handleCheckout}
                >
                  {checkingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Checkout Now
                    </>
                  )}
                </Button>
              ) : (
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/login" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Login to Checkout
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

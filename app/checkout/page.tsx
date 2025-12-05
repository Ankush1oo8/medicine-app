"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart"
import { getCurrentUser } from "@/lib/auth"
import { createOrder } from "@/lib/orders"
import { ArrowLeft, CreditCard, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clear } = useCart()
  const user = getCurrentUser()

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    pincode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod")
  const [isProcessing, setIsProcessing] = useState(false)

  const deliveryFee = 50
  const grandTotal = total + deliveryFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    setIsProcessing(true)
    try {
      const orderData = {
        userId: user.id,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          imageUrl: item.image,
          dosage: item.pack ?? "",
          packSize: item.pack ?? "",
        })),
        total,
        deliveryFee,
        grandTotal,
        status: "placed" as const,
        paymentStatus: "pending" as const,
        paymentMethod,
        shippingAddress: shippingInfo,
      }

      const order = await createOrder(orderData)
      await clear()
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error("Error placing order:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/medicines">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/cart">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={shippingInfo.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={shippingInfo.phone} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={shippingInfo.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value: "cod" | "online") => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online Payment</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-muted rounded overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.pack ? `${item.pack} • ` : ""}
                          Qty: {item.qty}
                        </p>
                      </div>
                      <p className="font-medium">Rs {(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>Rs {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>Rs {grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full" size="lg">
                  {isProcessing ? "Placing Order..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

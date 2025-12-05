"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { OrderDetailData } from "@/lib/firebase/models"
import { OrderDetail } from "@/lib/firebase/models"
import { useAuth } from "@/lib/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { firebaseClientApp } from "@/lib/firebase/client"

const db = getFirestore(firebaseClientApp)

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const { user } = useAuth()
  const [order, setOrder] = useState<OrderDetailData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.phone) {
      setOrder(null)
      return
    }
    let active = true
    const fetchOrder = async () => {
      setLoading(true)
      setError(null)
      try {
        const snapshot = await getDoc(doc(db, "orders", orderId))
        if (!active) return
        if (!snapshot.exists()) {
          setOrder(null)
          setError("Order not found.")
          return
        }
        const data = OrderDetail.fromMap(snapshot.data(), snapshot.id).toJSON()
        if (data.client && data.client !== user.phone) {
          setOrder(null)
          setError("You do not have access to this order.")
          return
        }
        setOrder(data)
      } catch (err) {
        console.error("Unable to load order", err)
        if (!active) return
        setError("Unable to load order.")
        setOrder(null)
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchOrder()
    return () => {
      active = false
    }
  }, [orderId, user?.phone])

  const itemCount = useMemo(() => order?.items?.reduce((s, i) => s + i.qty, 0) ?? 0, [order])

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex items-center gap-3">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-sm hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Orders</span>
        </Link>
      </div>

      {!user ? (
        <div className="mt-4 rounded-2xl border bg-card p-6 text-sm">Login to view order details.</div>
      ) : loading ? (
        <div className="mt-4 rounded-2xl border bg-card p-6 text-sm text-muted-foreground">Loading order…</div>
      ) : error ? (
        <div className="mt-4 rounded-2xl border bg-card p-6 text-sm text-destructive">{error}</div>
      ) : !order ? (
        <div className="mt-4 rounded-2xl border bg-card p-6 text-sm text-destructive">Order not found.</div>
      ) : (
        <Card className="mt-4 rounded-2xl">
          <CardHeader className="pb-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-xl font-semibold text-pretty">Order {order.id}</h1>
              <Badge
                className={cn(
                  "rounded-full",
                  order.status === "Delivered" && "bg-green-600 text-white",
                  order.status === "Cancelled" && "bg-red-600 text-white",
                )}
                variant={order.status === "Pending" || order.status === "Processing" ? "secondary" : "default"}
              >
                {order.status}
              </Badge>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Placed on {new Date(order.createdAt).toLocaleDateString()} • {itemCount} items
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <section>
                <h2 className="text-primary font-medium">Items</h2>
                <div className="mt-2 divide-y rounded-xl border">
                  {order.items?.map((it) => (
                    <div key={it.id} className="flex items-center justify-between p-3">
                      <div className="min-w-0 flex items-center gap-3">
                        <img
                          src={it.image || "/placeholder.svg?height=48&width=48&query=medicine%20thumbnail"}
                          alt={it.name}
                          className="size-12 rounded-md bg-muted object-contain flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium line-clamp-1">{it.name}</div>
                          {it.pack ? <div className="text-xs text-muted-foreground">{it.pack}</div> : null}
                          <div className="text-sm text-muted-foreground">Qty: {it.qty}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">Rs {(it.qty * (it.price ?? 0)).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </section>

              <Separator />

              <section className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary p-3 space-y-1">
                  <div className="text-sm text-muted-foreground">Payment Status</div>
                  <div className="font-medium capitalize">
                    {order.paymentStatus ?? order.payment ?? "Pending"}
                  </div>
                  {order.invoice ? (
                    <div className="text-xs text-muted-foreground">Invoice: {order.invoice}</div>
                  ) : null}
                </div>
                <div className="rounded-xl bg-secondary p-3 space-y-1">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="font-semibold">
                    Rs {(order.totalAmount ?? order.amount ?? 0).toFixed(2)}
                  </div>
                  {order.bill ? (
                    <div className="text-xs text-muted-foreground">Bill: {order.bill}</div>
                  ) : null}
                </div>
              </section>

              {order.address || order.lr ? (
                <>
                  <Separator />
                  <section className="grid gap-2 sm:grid-cols-2">
                    {order.address ? (
                      <div className="rounded-xl border p-3 text-sm">
                        <div className="text-muted-foreground">Delivery Address</div>
                        <div className="mt-1">{order.address}</div>
                      </div>
                    ) : null}
                    {order.lr ? (
                      <div className="rounded-xl border p-3 text-sm">
                        <div className="text-muted-foreground">LR / Tracking</div>
                        <div className="mt-1">{order.lr}</div>
                      </div>
                    ) : null}
                  </section>
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export default OrderDetailClient

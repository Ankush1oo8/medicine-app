"use client"

import { useEffect, useMemo, useState } from "react"
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderCard from "@/components/order-card"
import { useAuth } from "@/lib/auth"
import type { OrderDetailData } from "@/lib/firebase/models"
import { OrderDetail } from "@/lib/firebase/models"
import { firebaseClientApp } from "@/lib/firebase/client"

const db = getFirestore(firebaseClientApp)

export default function OrdersTabs() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderDetailData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.phone) {
      setOrders([])
      return
    }
    let active = true
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
      try {
        const q = query(
          collection(db, "orders"),
          where("client", "==", user.phone),
          orderBy("updatedAt", "desc"),
        )
        const snapshot = await getDocs(q)
        if (!active) return
        setOrders(snapshot.docs.map((doc) => OrderDetail.fromMap(doc.data(), doc.id).toJSON()))
      } catch (err) {
        console.error("Unable to load orders", err)
        if (!active) return
        setError("Unable to load orders.")
        setOrders([])
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchOrders()
    return () => {
      active = false
    }
  }, [user?.phone])

  const outstanding = useMemo(() => {
    return orders.filter((o) => {
      const payment = (o.paymentStatus ?? o.payment ?? "Pending").toLowerCase()
      return payment !== "paid"
    })
  }, [orders])

  const paid = useMemo(() => {
    return orders.filter((o) => {
      const payment = (o.paymentStatus ?? o.payment ?? "Pending").toLowerCase()
      return payment === "paid"
    })
  }, [orders])

  return (
    <div className="rounded-2xl border bg-card p-4">
      <Tabs defaultValue="outstanding" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="mt-4">
          {!user ? (
            <div className="text-sm text-muted-foreground">Login to view your orders.</div>
          ) : loading ? (
            <div className="text-sm text-muted-foreground">Loading orders…</div>
          ) : error ? (
            <div className="text-sm text-destructive">{error}</div>
          ) : outstanding.length === 0 ? (
            <div className="text-sm text-muted-foreground">No outstanding orders.</div>
          ) : (
            <ul className="space-y-3">
              {outstanding.map((o) => (
                <li key={o.id}>
                  <OrderCard order={o} />
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="paid" className="mt-4">
          {!user ? (
            <div className="text-sm text-muted-foreground">Login to view your orders.</div>
          ) : loading ? (
            <div className="text-sm text-muted-foreground">Loading orders…</div>
          ) : error ? (
            <div className="text-sm text-destructive">{error}</div>
          ) : paid.length === 0 ? (
            <div className="text-sm text-muted-foreground">No paid orders yet.</div>
          ) : (
            <ul className="space-y-3">
              {paid.map((o) => (
                <li key={o.id}>
                  <OrderCard order={o} />
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

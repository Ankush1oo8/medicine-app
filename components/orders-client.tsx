"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderCard } from "@/components/order-card"
import { EmptyHint } from "@/components/ui/empty-hint"
import type { OrderDetailData } from "@/lib/firebase/models"

export function OrdersClient() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderDetailData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/${user.phone}`)
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const ordersData: OrderDetailData[] = await response.json()
        setOrders(ordersData)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>
  }

  const pendingPaidOrders = orders.filter(order => order.payment === "paid" && order.status === "pending")
  const successfulOrders = orders.filter(order => order.status === "successful" || (order.payment === "paid" && order.status === "completed"))

  return (
    <Tabs defaultValue="pending-paid" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pending-paid">Paid Pending ({pendingPaidOrders.length})</TabsTrigger>
        <TabsTrigger value="successful">Successful ({successfulOrders.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="pending-paid" className="space-y-4">
        {pendingPaidOrders.length === 0 ? (
          <EmptyHint title="No pending paid orders">
            You don't have any paid orders that are still pending.
          </EmptyHint>
        ) : (
          pendingPaidOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </TabsContent>

      <TabsContent value="successful" className="space-y-4">
        {successfulOrders.length === 0 ? (
          <EmptyHint title="No successful orders">
            You don't have any successful orders yet.
          </EmptyHint>
        ) : (
          successfulOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}

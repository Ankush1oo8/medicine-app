"use client"

import { orders as demoOrders } from "@/lib/demo-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrderCard from "@/components/order-card"

export default function OrdersTabs() {
  const outstanding = demoOrders.filter((o) => o.paymentStatus !== "Paid")
  const paid = demoOrders.filter((o) => o.paymentStatus === "Paid")

  return (
    <div className="rounded-2xl border bg-card p-4">
      <Tabs defaultValue="outstanding" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="mt-4">
          {outstanding.length === 0 ? (
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
          {paid.length === 0 ? (
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

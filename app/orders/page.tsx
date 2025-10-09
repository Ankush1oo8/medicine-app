"use client"

import { orders as data } from "@/lib/demo-data"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { OrderCard } from "@/components/order-card"

export default function OrdersPage() {
  // Compute two groups: Outstanding and Paid
  const outstanding = data.filter((o) => o.paymentStatus !== "Paid")
  const paid = data.filter((o) => o.paymentStatus === "Paid")

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Your Orders</h1>
          <p className="text-sm text-muted-foreground">Review your outstanding balances and paid orders.</p>
        </div>
      </div>

      {/* Replace sections with Tabs for Outstanding and Paid */}
      <Tabs defaultValue={outstanding.length ? "outstanding" : "paid"} className="mt-5">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="mt-4">
          {outstanding.length === 0 ? (
            <div className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">
              You have no outstanding orders.
            </div>
          ) : (
            <div className="space-y-4">
              {outstanding.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="paid" className="mt-4">
          {paid.length === 0 ? (
            <div className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">
              No paid orders yet.
            </div>
          ) : (
            <div className="space-y-4">
              {paid.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

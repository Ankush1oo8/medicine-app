import OrdersTabs from "@/components/orders-tabs"

export default function OrdersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Your Orders</h1>
          <p className="text-sm text-muted-foreground">Review your outstanding balances and paid orders.</p>
        </div>
      </div>
      <div className="mt-5">
        <OrdersTabs />
      </div>
    </main>
  )
}

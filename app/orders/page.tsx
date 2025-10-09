"use client"

import { orders as data, type OrderStatus } from "@/lib/demo-data"
import { useState, useMemo } from "react"
import { OrderCard } from "@/components/order-card"
import { Button } from "@/components/ui/button"

const statuses: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

export default function OrdersPage() {
  const [s, setS] = useState<OrderStatus>("Pending")
  const list = useMemo(() => data.filter((o) => o.status === s), [s])

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      <div className="bg-secondary rounded-2xl p-3 flex gap-2 overflow-auto">
        {statuses.map((st) => (
          <Button
            key={st}
            size="sm"
            variant={s === st ? "default" : "secondary"}
            onClick={() => setS(st)}
            className="rounded-full"
          >
            {st}
          </Button>
        ))}
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>
    </div>
  )
}

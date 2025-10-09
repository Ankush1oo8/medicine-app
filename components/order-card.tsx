"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Order } from "@/lib/demo-data"
import Link from "next/link"

export function OrderCard({ order }: { order: Order }) {
  const itemCount = order.items.reduce((s, i) => s + i.qty, 0)
  return (
    <Link href={`/orders/${order.id}`} className="block" aria-label={`Open order ${order.id}`}>
      <Card className="cursor-pointer rounded-2xl hover:shadow-md transition w-full min-h-36 md:min-h-40">
        <CardHeader className="pt-5 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-base md:text-lg">{order.id}</div>
            <div className="text-sm md:text-base text-primary">{order.status}</div>
          </div>
        </CardHeader>
        <CardContent className="pt-3 md:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <div>
              {order.createdAt} • {itemCount} items
            </div>
            <div className="font-medium text-foreground">
              {"Total: Rs "}
              {order.total.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default OrderCard

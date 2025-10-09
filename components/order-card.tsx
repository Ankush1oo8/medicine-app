"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Order } from "@/lib/demo-data"
import Link from "next/link"

export function OrderCard({ order }: { order: Order }) {
  const itemCount = order.items.reduce((s, i) => s + i.qty, 0)
  return (
    <Link href={`/orders/${order.id}`} className="block">
      <Card className="cursor-pointer rounded-2xl hover:shadow-md transition">
        <CardHeader className="pt-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{order.id}</div>
            <div className="text-sm text-primary">{order.status}</div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-sm text-muted-foreground">
            {order.createdAt} • {itemCount} items
          </div>
          <div className="mt-1 font-medium">
            {"Total: Rs "}
            {order.total.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

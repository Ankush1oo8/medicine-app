"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { OrderDetailData } from "@/lib/firebase/models"

export function OrderCard({ order }: { order: OrderDetailData }) {
  const itemCount = order.items?.reduce((s, i) => s + i.qty, 0) ?? 0
  const orderLabel = order.orderId || order.id
  const amount = order.totalAmount ?? order.amount ?? 0
  const paymentStatus = order.paymentStatus ?? order.payment ?? "Pending"
  return (
    <Link href={`/orders/${order.id}`} className="block" aria-label={`Open order ${orderLabel}`}>
      <Card className="cursor-pointer rounded-2xl hover:shadow-md transition w-full min-h-36 md:min-h-40">
        <CardHeader className="pt-5 pb-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-base md:text-lg">{orderLabel}</div>
            <div className="text-sm md:text-base text-primary capitalize">{paymentStatus}</div>
          </div>
        </CardHeader>
        <CardContent className="pt-3 md:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <div>
              {new Date(order.createdAt).toLocaleDateString()} • {itemCount} items
            </div>
            <div className="font-medium text-foreground">Total: Rs {amount.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default OrderCard

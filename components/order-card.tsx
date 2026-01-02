"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar, CheckCircle, XCircle, Clock, Package, CreditCard, ArrowRight } from "lucide-react"
import type { OrderDetailData } from "@/lib/firebase/models"

export function OrderCard({ order }: { order: OrderDetailData }) {
  const itemCount = order.items?.reduce((s, i) => s + i.qty, 0) ?? 0
  const amount = order.totalAmount ?? order.amount ?? 0
  const firstItemImage = order.items?.[0]?.image
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
      case 'success':
        return 'bg-green-500/10 text-green-700 border-green-200'
      case 'cancelled':
        return 'bg-red-500/10 text-red-700 border-red-200'
      case 'pending':
      case 'processing':
        return 'bg-orange-500/10 text-orange-700 border-orange-200'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  return (
    <Link href={`/orders/${order.id}`} className="block group" aria-label={`Open order ${order.id}`}>
      <Card className="cursor-pointer rounded-3xl border bg-gradient-to-br from-card to-muted/20 shadow-lg hover:shadow-xl transition-all duration-300 card-hover overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <img
                  src={firstItemImage || "/placeholder.svg"}
                  alt="Order item"
                  className="size-16 rounded-xl bg-muted object-contain flex-shrink-0 ring-2 ring-white/50"
                  onError={(e) => {
                    console.log('Image failed to load:', firstItemImage);
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                {itemCount > 1 && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold">
                    +{itemCount - 1}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                {order.items?.[0]?.name && (
                  <div className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {order.items[0].name}
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{orderDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">₹{amount.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Amount</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/50 text-sm font-medium">
                <CreditCard className="h-4 w-4" />
                <span className="capitalize">{order.paymentStatus ?? order.payment ?? "Pending"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
              <span className="text-sm font-medium">View Details</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default OrderCard

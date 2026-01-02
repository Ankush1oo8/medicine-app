"use client"

import { useEffect, useState } from "react"
import OrdersTabs from "@/components/orders-tabs"
import { Package, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth"
import type { OrderDetailData } from "@/lib/firebase/models"

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderDetailData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user?.phone) {
      setOrders([])
      return
    }
    let active = true
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/orders/${user.phone}`)
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const ordersData: OrderDetailData[] = await response.json()
        if (!active) return
        setOrders(ordersData)
      } catch (err) {
        console.error("Unable to load orders", err)
        if (!active) return
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

  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "success" || o.status === "delivered").length
  const pendingOrders = orders.filter((o) => o.status !== "success" && o.status !== "delivered").length

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Hero Section */}
      <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 p-8 shadow-lg animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Your Orders
            </h1>
            <p className="text-muted-foreground">Review your outstanding balances and paid orders.</p>
          </div>
        </div>

        {/* Quick Stats Dashboard */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">{loading ? "..." : totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Completed</p>
                <p className="text-2xl font-bold text-green-600">{loading ? "..." : completedOrders}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100 p-4 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-900">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{loading ? "..." : pendingOrders}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Content */}
      <div className="mt-6 rounded-3xl border bg-gradient-to-br from-card to-muted/20 shadow-lg overflow-hidden">
        <div className="p-6">
          <OrdersTabs />
        </div>
      </div>
    </main>
  )
}

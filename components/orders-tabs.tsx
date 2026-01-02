"use client"

import { useEffect, useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderCard } from "@/components/order-card"
import { useAuth } from "@/lib/auth"
import { Loader2, AlertCircle, Package, CheckCircle, Clock } from "lucide-react"
import type { OrderDetailData } from "@/lib/firebase/models"

export default function OrdersTabs() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderDetailData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.phone) {
      setOrders([])
      return
    }
    let active = true
    const fetchOrders = async () => {
      setLoading(true)
      setError(null)
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
        setError("Unable to load orders.")
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

  const outstanding = useMemo(() => {
    return orders.filter((o) => o.status !== "success")
  }, [orders])

  const paid = useMemo(() => {
    return orders.filter((o) => o.status === "success")
  }, [orders])

  return (
    <div className="rounded-3xl border bg-gradient-to-br from-card to-muted/20 shadow-lg overflow-hidden animate-fade-in">
      <Tabs defaultValue="outstanding" className="w-full">
        <TabsList className="grid grid-cols-2 w-full mx-6 mt-6 mb-2 h-12 bg-muted/30">
          <TabsTrigger value="outstanding" className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            <Clock className="h-4 w-4" />
            Outstanding ({outstanding.length})
          </TabsTrigger>
          <TabsTrigger value="paid" className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
            <CheckCircle className="h-4 w-4" />
            Paid ({paid.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="mt-6">
          {!user ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">Login Required</h3>
              <p className="text-sm text-muted-foreground">Please log in to view your orders.</p>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-destructive mb-2">Error Loading Orders</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : outstanding.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
                <CheckCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">All Caught Up!</h3>
              <p className="text-sm text-muted-foreground">You have no outstanding orders.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {outstanding.map((o, index) => (
                <div key={o.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <OrderCard order={o} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="paid" className="mt-6">
          {!user ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">Login Required</h3>
              <p className="text-sm text-muted-foreground">Please log in to view your orders.</p>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-sm text-muted-foreground">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-destructive mb-2">Error Loading Orders</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : paid.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Orders Yet</h3>
              <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paid.map((o, index) => (
                <div key={o.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <OrderCard order={o} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

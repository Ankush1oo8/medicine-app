"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock order data - TODO: Replace with Firebase integration
const mockOrders = [
  {
    id: "1756101599320-bd51b53d",
    invoice: "",
    createdAt: "2025-08-25",
    items: 2,
    status: "cancelled",
    payment: "pending",
  },
  {
    id: "1756146158232-f146bb5e",
    invoice: "22366",
    createdAt: "2025-08-25",
    items: 1,
    status: "delivered",
    payment: "pending",
  },
  {
    id: "1756229605818-bb9292ee",
    invoice: "",
    createdAt: "2025-08-26",
    items: 1,
    status: "placed",
    payment: "pending",
  },
  {
    id: "1756061197259-f1a08993",
    invoice: "",
    createdAt: "2025-08-24",
    items: 3,
    status: "delivered",
    payment: "paid",
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Orders</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-4">
            <Button className="bg-white text-primary hover:bg-white/90">Pending</Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              Paid
            </Button>
          </div>
        </div>

        {/* Orders List */}
        <div className="max-w-2xl mx-auto space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">ID: {order.id.substring(0, 20)}...</p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Invoice:</span> {order.invoice || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">CreatedAt: {order.createdAt}</p>
                    <p className="text-sm mb-3">item: {order.items}</p>
                    <div className="flex space-x-4">
                      <span className="text-sm">
                        <span className="font-medium">Status:</span>{" "}
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "cancelled"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </span>
                      <span className="text-sm">
                        <span className="font-medium">Payment:</span>{" "}
                        <Badge variant={order.payment === "paid" ? "default" : "secondary"} className="text-xs">
                          {order.payment}
                        </Badge>
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

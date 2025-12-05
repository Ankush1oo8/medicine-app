"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Order } from "@/lib/orders"
import { createOrder, getUserOrders } from "@/lib/orders"

interface OrderContextType {
  orders: Order[]
  isLoading: boolean
  createNewOrder: (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) => Promise<Order>
  loadUserOrders: (userId: string) => Promise<void>
  refreshOrders: () => Promise<void>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const createNewOrder = async (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> => {
    setIsLoading(true)
    try {
      const newOrder = await createOrder(orderData)
      setOrders((prev) => [newOrder, ...prev])
      return newOrder
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserOrders = async (userId: string) => {
    setIsLoading(true)
    try {
      const userOrders = await getUserOrders(userId)
      setOrders(userOrders)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshOrders = async () => {
    // TODO: Implement refresh logic with current user
    console.log("Refreshing orders...")
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        createNewOrder,
        loadUserOrders,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}

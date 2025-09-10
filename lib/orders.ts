export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
  dosage: string
  packSize: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  deliveryFee: number
  grandTotal: number
  status: "placed" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: "cod" | "online"
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
    pincode: string
  }
  createdAt: string
  updatedAt: string
  invoice?: string
  estimatedDelivery?: string
}

// Mock orders data - TODO: Replace with Firebase integration
export const mockOrders: Order[] = [
  {
    id: "1756101599320-bd51b53d",
    userId: "user1",
    items: [
      {
        id: "med1",
        name: "A 2 RON Injection",
        price: 75.0,
        quantity: 2,
        dosage: "2ml",
        packSize: "vial of 2 ml Injection",
      },
    ],
    total: 150.0,
    deliveryFee: 50.0,
    grandTotal: 200.0,
    status: "cancelled",
    paymentStatus: "pending",
    paymentMethod: "cod",
    shippingAddress: {
      name: "Ram",
      phone: "+911234567890",
      address: "123 Main Street",
      city: "Mumbai",
      pincode: "400001",
    },
    createdAt: "2025-08-25",
    updatedAt: "2025-08-25",
  },
  {
    id: "1756146158232-f146bb5e",
    userId: "user1",
    items: [
      {
        id: "med2",
        name: "A Artivid 150mg Injection",
        price: 88.0,
        quantity: 1,
        dosage: "150mg",
        packSize: "vial of 2 ml Injection",
      },
    ],
    total: 88.0,
    deliveryFee: 50.0,
    grandTotal: 138.0,
    status: "delivered",
    paymentStatus: "pending",
    paymentMethod: "cod",
    shippingAddress: {
      name: "Ram",
      phone: "+911234567890",
      address: "123 Main Street",
      city: "Mumbai",
      pincode: "400001",
    },
    createdAt: "2025-08-25",
    updatedAt: "2025-08-26",
    invoice: "22366",
    estimatedDelivery: "2025-08-27",
  },
]

export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
  // TODO: Implement Firebase order creation
  const order: Order = {
    ...orderData,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return order
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  // TODO: Implement Firebase query
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockOrders.filter((order) => order.userId === userId)
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  // TODO: Implement Firebase query
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockOrders.find((order) => order.id === orderId) || null
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<void> {
  // TODO: Implement Firebase update
  console.log(`Updating order ${orderId} status to ${status}`)
  await new Promise((resolve) => setTimeout(resolve, 500))
}

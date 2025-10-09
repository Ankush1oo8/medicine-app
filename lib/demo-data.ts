export type Medicine = {
  id: string
  name: string
  salt?: string
  description?: string
  price: number
  stock: number
  image?: string
  pack?: string
}

export const medicines: Medicine[] = [
  {
    id: "dorsun-t",
    name: "Dorsun T Eye Drop",
    salt: "Dorzolamide (2% w/v) + Timolol (0.5% w/v)",
    description: "Packet of 5 ml eye drop.",
    price: 253,
    stock: 200,
    image: "/eye-drop-box.jpg",
    pack: "5 ml eye drop",
  },
  {
    id: "janumet-1000",
    name: "Janumet 1000mg",
    salt: "Metformin + Sitagliptin",
    description: "Strip of 15 tablets.",
    price: 380,
    stock: 290,
    image: "/tablets-strip.jpg",
    pack: "15 tablets",
  },
  {
    id: "a2-ron",
    name: "A 2 RON Injection",
    description: "Vial of 2 ml injection.",
    price: 75,
    stock: 100,
    image: "/medicine-vial.jpg",
    pack: "2 ml injection",
  },
  {
    id: "artivid-150",
    name: "A Artivid 150mg",
    description: "Vial of 2 ml injection.",
    price: 88,
    stock: 100,
    image: "/medicine-vial.jpg",
    pack: "2 ml injection",
  },
  {
    id: "atorva-20",
    name: "Atorva 20",
    description: "Strip of 10 tablets.",
    price: 146,
    stock: 400,
    image: "/blister-pack.jpg",
    pack: "10 tablets",
  },
  {
    id: "omee-20",
    name: "Omee 20",
    description: "Strip of 10 capsules.",
    price: 120,
    stock: 750,
    image: "/capsules.jpg",
    pack: "10 capsules",
  },
]

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"

export type OrderItem = {
  id: string
  medicineId: string
  name: string
  qty: number
  price: number
}

export type Order = {
  id: string
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
  total: number
  paymentStatus: "Paid" | "Unpaid"
}

export const orders: Order[] = [
  {
    id: "ORD-1001",
    status: "Pending",
    createdAt: "2025-10-08",
    paymentStatus: "Unpaid",
    items: [{ id: "oi1", medicineId: "janumet-1000", name: "Janumet 1000mg", qty: 2, price: 380 }],
    total: 760,
  },
  {
    id: "ORD-1002",
    status: "Processing",
    createdAt: "2025-10-07",
    paymentStatus: "Paid",
    items: [{ id: "oi2", medicineId: "dorsun-t", name: "Dorsun T Eye Drop", qty: 1, price: 253 }],
    total: 253,
  },
  {
    id: "ORD-1003",
    status: "Shipped",
    createdAt: "2025-10-06",
    paymentStatus: "Paid",
    items: [{ id: "oi3", medicineId: "omee-20", name: "Omee 20", qty: 3, price: 120 }],
    total: 360,
  },
  {
    id: "ORD-1004",
    status: "Delivered",
    createdAt: "2025-10-01",
    paymentStatus: "Paid",
    items: [{ id: "oi4", medicineId: "atorva-20", name: "Atorva 20", qty: 1, price: 146 }],
    total: 146,
  },
  {
    id: "ORD-1005",
    status: "Cancelled",
    createdAt: "2025-09-28",
    paymentStatus: "Unpaid",
    items: [{ id: "oi5", medicineId: "artivid-150", name: "A Artivid 150mg", qty: 4, price: 88 }],
    total: 352,
  },
]

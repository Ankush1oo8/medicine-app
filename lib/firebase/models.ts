import type { Timestamp } from "firebase/firestore"
import { FIREBASE_STORAGE_BUCKET } from "./client"

export type WithId<T> = T & { id: string }

// -------------------- Products --------------------

export type ProductData = WithId<{
  name: string
  price: number
  mrpLabel: string
  salt?: string
  saltComposition?: string
  quantity?: string
  pack?: string
  manufacturer?: string
  gst?: string
  gstRate?: string
  discount?: string
  ptr?: string
  stock?: string
  stockCount?: number
  expiry?: string
  scheme?: boolean
  image?: string
  description?: string
}>

export class Product {
  constructor(private props: ProductData) {}

  static fromMap(data: Record<string, any>, id: string): Product {
    const mrpSource = data.MRP ?? data.mrp ?? data.price ?? data.Price ?? 0
    const mrp = Number(mrpSource) || 0
    const stockSource =
      data.stock ?? data.Stock ?? data.quantity ?? data.Quantity ?? data.qty ?? data.available ?? data.Available ?? null
    const stockCount =
      typeof stockSource === "number"
        ? stockSource
        : typeof stockSource === "string"
          ? Number(stockSource)
          : undefined
    return new Product({
      id,
      name: data.Name ?? data.name ?? "",
      price: mrp,
      mrpLabel: String(mrpSource ?? ""),
      salt: data.salt ?? data.Salt ?? data.Salt_Composition ?? data.saltComposition,
      saltComposition: data.Salt_Composition ?? data.salt ?? data.saltComposition,
      quantity: data.Quantity ?? data.pack ?? data.packaging,
      pack: data.Quantity ?? data.pack ?? data.packaging,
      manufacturer: data.Manufacturer ?? data.manufacturer,
      gstRate: data.GST_Rate ?? data.gst ?? data.tax,
      gst: data.GST_Rate ?? data.gst ?? data.tax,
      discount: data.discount ?? data.Discount,
      ptr: toStringOrUndefined(data.ptr ?? data.PTR),
      stock:
        typeof stockSource === "string"
          ? stockSource
          : typeof stockCount === "number"
            ? String(stockCount)
            : undefined,
      stockCount,
      expiry: data.expiry,
      scheme: data.scheme ?? false,
      image: normalizeImage([
        data.Image_URL,
        data.image,
        data.imageUrl,
        data.photo,
        data.thumbnail,
        Array.isArray(data.images) ? data.images[0] : undefined,
      ]),
      description: data.description ?? data.Description,
    })
  }

  toJSON(): ProductData {
    return { ...this.props }
  }
}

// -------------------- Orders --------------------

export type OrderItemData = {
  id: string
  qty: number
  price: number
  name: string
  image?: string
  pack?: string
  medicineId?: string
}

export type OrderDetailData = WithId<{
  client: string
  name: string
  orderId: string
  type: string
  items: OrderItemData[]
  address?: string
  lr?: string
  bill?: string
  status: string
  createdAt: string
  updatedAt: string
  amount: number
  totalAmount: number
  total: number
  payment?: string
  paymentStatus: string
  invoice?: string
  isRead: boolean
  isReadByAdmin: boolean
}>

export class OrderDetail {
  constructor(private props: OrderDetailData) {}

  static fromMap(data: Record<string, any>, id: string): OrderDetail {
    const itemsSource = Array.isArray(data.items) ? data.items : []
    const amount = parseNumber(data.amount ?? data.total ?? data.totalAmount)
    const totalAmount = parseNumber(data.totalAmount ?? data.total ?? data.amount)
    const paymentStatus = data.paymentStatus ?? data.payment ?? "Pending"
    return new OrderDetail({
      id,
      client: data.client ?? "",
      name: data.name ?? "",
      orderId: data.orderId ?? id,
      type: data.type ?? "",
      items: itemsSource.map((item: any, idx: number) => ({
        id: item.id ?? `${id}-item-${idx}`,
        qty: Number(item.qty ?? item.quantity ?? 0),
        price: Number(item.price ?? item.amount ?? 0),
        name: item.name ?? item.productName ?? "Item",
        image: normalizeImage([item.image, item.Image_URL]),
        pack: item.pack,
        medicineId: item.prodId ?? item.medicineId,
      })),
      address: data.address,
      lr: data.lr,
      bill: data.bill,
      status: data.status ?? "pending",
      createdAt: toDateString(data.createdAt) ?? new Date().toISOString(),
      updatedAt: toDateString(data.updatedAt) ?? new Date().toISOString(),
      amount,
      totalAmount,
      total: totalAmount,
      payment: data.payment,
      paymentStatus,
      invoice: data.invoice,
      isRead: Boolean(data.isRead),
      isReadByAdmin: Boolean(data.isReadByAdmin),
    })
  }

  toJSON(): OrderDetailData {
    return { ...this.props }
  }
}

// -------------------- User Profiles --------------------

export type UserProfileData = WithId<{
  phone: string
  name: string
  email: string
  profilePhotoUrl?: string
  businessPhotoUrl?: string
  licenseUrl?: Record<string, string | null>
  businessName?: string
  year?: string
  address?: unknown[]
  assignedEmployee?: Record<string, unknown>
  reviewCart?: unknown[]
  topReviewCart?: unknown[]
  isVerified: boolean
  createdAt?: string
  updatedAt: string
  type: string
  uploadOn?: boolean
  isRead: unknown[]
  isReadByAdmin: boolean
  showStock: boolean
  requestLedger: boolean
  notificationToken?: Record<string, unknown>
  mileStone?: Array<Record<string, unknown>>
}>

export class UserProfile {
  constructor(private props: UserProfileData) {}

  static fromMap(data: Record<string, any>, phone: string): UserProfile {
    const assignedEmployee = isRecord(data.assignedEmployee) ? data.assignedEmployee : { name: "Not Assigned", phone: "" }
    const licenseUrl = isRecord(data.licenseUrl) ? (data.licenseUrl as Record<string, string | null>) : undefined
    const notificationToken = isRecord(data.notificationToken) ? data.notificationToken : {}
    const milestone = Array.isArray(data.mileStone) ? data.mileStone.filter(isRecord).map((item) => ({ ...item })) : []
    return new UserProfile({
      id: phone,
      phone,
      name: data.name ?? "",
      email: data.email ?? "",
      profilePhotoUrl: normalizeImage([data.profilePhotoUrl]),
      businessPhotoUrl: normalizeImage([data.businessPhotoUrl]),
      licenseUrl,
      businessName: data.businessName,
      year: data.year,
      address: Array.isArray(data.address) ? data.address : [],
      assignedEmployee,
      reviewCart: data.reviewCart ?? [],
      topReviewCart: data.topReviewCart ?? [],
      isVerified: Boolean(data.isVerified),
      createdAt: toDateString(data.createdAt),
      updatedAt: toDateString(data.updatedAt) ?? new Date().toISOString(),
      type: data.type ?? "retailer",
      uploadOn: data.uploadOn,
      isRead: Array.isArray(data.isRead) ? data.isRead : [],
      isReadByAdmin: Boolean(data.isReadByAdmin),
      showStock: Boolean(data.showStock),
      requestLedger: Boolean(data.requestLedger),
      notificationToken,
      mileStone: milestone,
    })
  }

  toMap() {
    return { ...this.props }
  }
}

// -------------------- Messages --------------------

export type MessagePayload = WithId<{
  senderId: string
  name: string
  type: string
  receiverId: string[]
  content: unknown[]
  status: string
  selected: { id: string[]; quote: string[] }
  isRead: boolean
  createdAt?: string
  updatedAt?: string
  isReadByAdmin: boolean
}>

export class Message {
  constructor(private props: MessagePayload) {}

  static fromMap(data: Record<string, any>, id: string): Message {
    return new Message({
      id,
      senderId: data.senderId ?? "",
      name: data.name ?? "",
      type: data.type ?? "",
      receiverId: Array.isArray(data.receiverId) ? data.receiverId : [],
      content: data.content ?? [],
      status: data.status ?? "pending",
      selected: data.selected ?? { id: [], quote: [] },
      isRead: Boolean(data.isRead),
      createdAt: toDateString(data.createdAt),
      updatedAt: toDateString(data.updatedAt),
      isReadByAdmin: Boolean(data.isReadByAdmin),
    })
  }

  toMap() {
    return { ...this.props }
  }
}

// -------------------- Notifications & Ads --------------------

export type NotificationData = WithId<{
  userId: string
  title: string
  body: string
  timestamp: string
}>

export class NotificationModel {
  constructor(private props: NotificationData) {}

  static fromMap(data: Record<string, any>, id: string): NotificationModel {
    return new NotificationModel({
      id,
      userId: data.userId ?? "",
      title: data.title ?? "",
      body: data.body ?? "",
      timestamp: toDateString(data.timestamp) ?? new Date().toISOString(),
    })
  }

  toJSON(): NotificationData {
    return { ...this.props }
  }
}

export type AdData = WithId<{
  title: string
  imageUrl?: string
}>

export class Ad {
  constructor(private props: AdData) {}

  static fromMap(data: Record<string, any>, id: string): Ad {
    return new Ad({
      id,
      title: data.title ?? "",
      imageUrl: normalizeImage([data.imageUrl]),
    })
  }

  toJSON() {
    return { ...this.props }
  }
}

// -------------------- Helpers --------------------

const parseNumber = (value: unknown) => {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

const toStringOrUndefined = (value: unknown) => {
  if (value === undefined || value === null) return undefined
  return String(value)
}

const toDateString = (value: unknown): string | undefined => {
  if (!value) return undefined
  if (typeof value === "string") return value
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "object" && value !== null && "toDate" in value) {
    try {
      return (value as Timestamp).toDate().toISOString()
    } catch {
      return undefined
    }
  }
  return undefined
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const normalizeImage = (candidates: Array<unknown>): string | undefined => {
  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const resolved = toPublicImageUrl(candidate)
      if (resolved) return resolved
    }
  }
  return undefined
}

const toPublicImageUrl = (value: string): string | undefined => {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed
  }
  if (trimmed.startsWith("gs://")) {
    const withoutScheme = trimmed.slice(5)
    const slashIndex = withoutScheme.indexOf("/")
    if (slashIndex === -1) return undefined
    const bucket = withoutScheme.slice(0, slashIndex)
    const objectPath = withoutScheme.slice(slashIndex + 1)
    return buildStorageUrl(bucket, objectPath)
  }
  const bucket = FIREBASE_STORAGE_BUCKET
  if (!bucket) return undefined
  const safePath = trimmed.replace(/^\/+/, "")
  return buildStorageUrl(bucket, safePath)
}

const buildStorageUrl = (bucket: string, objectPath: string) =>
  `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(objectPath)}?alt=media`

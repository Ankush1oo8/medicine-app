import useSWR, { mutate } from "swr"
import type { ProductData } from "@/lib/firebase/models"

export type CartItem = {
  id: string
  name: string
  price: number // MRP
  qty: number
  image?: string
  gst?: string // e.g. "5%"
  ptr?: number // percentage off excluding GST
  quote?: number // absolute quoted price (ex-GST)
  discountPercent?: number // extra discount % after PTR
  manufacturer?: string
  salt_composition?: string
  pack?: string
  gst_rate?: string
  prodId?: string
}

export type CartState = {
  items: CartItem[]
}

const CART_KEY = "demo-cart"

const getLocal = <T,>(k: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(k)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const setLocal = (k: string, v: unknown) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(k, JSON.stringify(v))
}

export function calcItemTotals(mrp: number, gstStr = "5%", ptr?: number, quote?: number, discountPercent?: number) {
  const round2 = (val: number) => Number(val.toFixed(2))
  const gstPercent = Number(gstStr.replace("%", "")) || 0
  const exceptGst = (mrp * 100) / (100 + gstPercent)

  let ptrPrice: number
  if (typeof ptr === "number") {
    ptrPrice = (exceptGst * (100 - ptr)) / 100
  } else {
    // default 20% discount
    ptrPrice = exceptGst * 0.8
  }

  if (typeof discountPercent === "number") {
    const afterDiscount = (ptrPrice * (100 - discountPercent)) / 100
    const gstAfter = (afterDiscount * gstPercent) / 100
    const total = afterDiscount + gstAfter
    return { gst: round2(gstAfter), total: round2(total), ptrPrice, afterDiscount: round2(afterDiscount) }
  } else if (typeof quote === "number") {
    const quotePercent = ((ptrPrice - quote) * 100) / ptrPrice
    const gstAfter = (quote * gstPercent) / 100
    const total = quote + gstAfter
    return { gst: round2(gstAfter), total: round2(total), ptrPrice, quotePercent: round2(quotePercent) }
  }

  const gstAfter = (ptrPrice * gstPercent) / 100
  const total = ptrPrice + gstAfter
  return { gst: round2(gstAfter), total: round2(total), ptrPrice }
}

export function useCart() {
  const { data } = useSWR<CartState>(CART_KEY, () => getLocal<CartState>(CART_KEY, { items: [] }), {
    fallbackData: { items: [] },
    revalidateOnFocus: false,
  })

  const items = data?.items ?? []

  const total = items.reduce((sum, it) => {
    const { total } = calcItemTotals(it.price, it.gst ?? "5%", it.ptr, it.quote, it.discountPercent)
    return sum + it.qty * total
  }, 0)

  return {
    items,
    total,
    add: async (m: ProductData, qty: number) => {
      const next = [...items]
      const idx = next.findIndex((i) => i.id === m.id)
      if (idx >= 0) next[idx].qty += qty
      else
        next.push({
          id: m.id,
          name: m.name,
          price: m.price ?? 0,
          qty,
          image: m.image,
          gst: m.gst ?? "5%",
          manufacturer: m.manufacturer,
          salt_composition: m.saltComposition ?? m.salt,
          pack: m.pack ?? m.quantity,
          gst_rate: m.gstRate ?? m.gst ?? "5%",
          prodId: m.id,
        })
      const state = { items: next }
      setLocal(CART_KEY, state)
      await mutate(CART_KEY, state, false)
    },
    update: async (id: string, qty: number) => {
      const next = items.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0)
      const state = { items: next }
      setLocal(CART_KEY, state)
      await mutate(CART_KEY, state, false)
    },
    remove: async (id: string) => {
      const state = { items: items.filter((i) => i.id !== id) }
      setLocal(CART_KEY, state)
      await mutate(CART_KEY, state, false)
    },
    clear: async () => {
      const state = { items: [] }
      setLocal(CART_KEY, state)
      await mutate(CART_KEY, state, false)
    },
  }
}

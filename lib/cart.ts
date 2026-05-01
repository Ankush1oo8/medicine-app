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

export function calcItemTotals(
  mrp: number,
  gstStr: string | null = "5%",
  ptr?: number,
  quote?: number,
  discountPercent?: number
) {
  const round2 = (val: number) => Number(val.toFixed(2))

  let gstPercent: number
  let exceptGst: number

  // ---------- GST & base price ----------
  if (gstStr && gstStr.length > 0) {
    gstPercent = Number(gstStr.replace("%", "")) || 0
    exceptGst = round2((mrp * 100) / (100 + gstPercent))
  } else {
    const safePtr = ptr ?? mrp * 0.8
    exceptGst = round2(safePtr / 0.8)
    gstPercent = round2((mrp * 100) / exceptGst - 100)
  }

  // ---------- PTR ----------
  const ptrPrice = round2(ptr ?? exceptGst * 0.8)

  // ---------- DISCOUNT ----------
  if (typeof discountPercent === "number") {
    const afterDiscount = round2(
      (ptrPrice * (100 - discountPercent)) / 100
    )

    const gstAfter = round2(
      (afterDiscount * gstPercent) / 100
    )

    const total = round2(afterDiscount + gstAfter)

    return {
      gst: gstAfter,
      total,
      ptrPrice,
      afterDiscount,
      gstPercent,
    }
  }

  // ---------- QUOTE ----------
  if (typeof quote === "number") {
    const quoteRounded = round2(quote)

    const quotePercent =
      ptrPrice > 0
        ? round2(((ptrPrice - quoteRounded) * 100) / ptrPrice)
        : 0

    const gstAfter = round2(
      (quoteRounded * gstPercent) / 100
    )

    const total = round2(quoteRounded + gstAfter)

    return {
      gst: gstAfter,
      total,
      ptrPrice,
      quotePercent,
      gstPercent,
    }
  }

  // ---------- DEFAULT ----------
  const gstAfter = round2((ptrPrice * gstPercent) / 100)
  const total = round2(ptrPrice + gstAfter)

  return {
    gst: gstAfter,
    total,
    ptrPrice,
    gstPercent,
  }
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

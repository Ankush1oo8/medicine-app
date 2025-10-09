import useSWR, { mutate } from "swr"
import type { Medicine } from "./demo-data"

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  image?: string
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

export function useCart() {
  const { data } = useSWR<CartState>(CART_KEY, () => getLocal<CartState>(CART_KEY, { items: [] }), {
    fallbackData: { items: [] },
    revalidateOnFocus: false,
  })

  const items = data?.items ?? []
  const total = items.reduce((s, it) => s + it.qty * it.price, 0)

  return {
    items,
    total,
    add: async (m: Medicine, qty: number) => {
      const next = [...items]
      const idx = next.findIndex((i) => i.id === m.id)
      if (idx >= 0) next[idx].qty += qty
      else next.push({ id: m.id, name: m.name, price: m.price, qty, image: m.image })
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

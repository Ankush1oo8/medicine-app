"use client"

import useSWR, { mutate } from "swr"

export type AuthUser = {
  name: string
  email: string
  phone?: string
}

const AUTH_KEY = "demo-auth"

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

export function useAuth() {
  const { data } = useSWR<AuthUser | null>(AUTH_KEY, () => getLocal<AuthUser | null>(AUTH_KEY, null), {
    fallbackData: null,
    revalidateOnFocus: false,
  })
  return {
    user: data ?? null,
    login: async (email: string, password: string) => {
      // demo credentials
      if (email === "demo@pharma.com" && password === "demo123") {
        const u: AuthUser = { name: "Ram", email, phone: "+911234567890" }
        setLocal(AUTH_KEY, u)
        await mutate(AUTH_KEY, u, false)
        return { ok: true }
      }
      return { ok: false, error: "Invalid demo credentials" }
    },
    logout: async () => {
      setLocal(AUTH_KEY, null)
      await mutate(AUTH_KEY, null, false)
    },
  }
}

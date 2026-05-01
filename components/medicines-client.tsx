'use client'

import { useEffect, useMemo, useState } from "react"
import { MedicineCard } from "@/components/medicine-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText
} from "@/components/ui/input-group"
import { Search, X } from "lucide-react"
import type { ProductData } from "@/lib/firebase/models"

export function MedicinesClient() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState("")
  const [lastDocId, setLastDocId] = useState<string | null>(null)

  const fetchProducts = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      let url = `/api/medicines?limit=10`

      if (isLoadMore && lastDocId) {
        url += `&lastDocId=${lastDocId}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`)
      }

      const result = await response.json()
      const items: ProductData[] = result.data || []

      setProducts((prev) =>
        isLoadMore ? [...prev, ...items] : items
      )

      setLastDocId(result.lastDocId || null)

    } catch (err) {
      console.error("Fetch error:", err)
      setError("Unable to load medicines.")
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchProducts(false)
  }, [])

  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    let filtered = products

    if (t) {
      filtered = products.filter(
        (m) =>
          m.name.toLowerCase().includes(t) ||
          (m.salt && m.salt.toLowerCase().includes(t)) ||
          (m.description && m.description.toLowerCase().includes(t))
      )
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name))
  }, [products, q])

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">

      {/* 🔍 Search */}
      <div className="bg-secondary rounded-2xl p-4">
        <InputGroup className="rounded-full">
          <InputGroupAddon>
            <Search className="size-4" />
            <InputGroupText>Search</InputGroupText>
          </InputGroupAddon>

          <InputGroupInput
            placeholder="Search medicines..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          {q && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton onClick={() => setQ("")}>
                <X className="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      {/* 🔄 Initial Loading */}
      {loading ? (
        <p className="mt-6 text-center">Loading...</p>
      ) : error ? (
        <p className="mt-6 text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* 📦 Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {list.map((m) => (
              <MedicineCard key={m.id} m={m} />
            ))}
          </div>

          {/* ⬇️ Load More Button */}
          {lastDocId && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchProducts(true)}
                disabled={loadingMore}
                className="px-6 py-2 bg-primary text-white rounded-full"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
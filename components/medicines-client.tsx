'use client'

import { useEffect, useMemo, useState } from "react"
import { MedicineCard } from "@/components/medicine-card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Search, X } from "lucide-react"
import type { ProductData } from "@/lib/firebase/models"

export function MedicinesClient() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState("")

  useEffect(() => {
    let active = true
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/medicines')
        if (!response.ok) {
          throw new Error(`Failed to fetch medicines: ${response.status}`)
        }
        const items: ProductData[] = await response.json()

        if (!active) return
        console.info("Medicines fetched:", items.map((p) => ({ id: p.id, name: p.name, price: p.price })))
        setProducts(items)
      } catch (err) {
        console.error("Unable to load medicines", err)
        if (!active) return
        setError("Unable to load medicines right now.")
        setProducts([])
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchProducts()
    return () => {
      active = false
    }
  }, [])

const list = useMemo(() => {
  const t = q.trim().toLowerCase()

  return products
    .filter((p) => Number(p.stock) > 0) // 🔒 FINAL GUARANTEE
    .filter((m) => {
      if (!t) return true

      return (
        m.name.toLowerCase().includes(t) ||
        (m.salt && m.salt.toLowerCase().includes(t)) ||
        (m.description && m.description.toLowerCase().includes(t))
      )
    })
}, [products, q])

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      <div className="bg-background border rounded-2xl p-4 mb-6">
        <div className="relative">
          <InputGroup className="rounded-full">
            <InputGroupAddon aria-hidden>
              <Search className="size-4" />
              <InputGroupText>Search</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              aria-label="Search medicines"
              placeholder="Search medicines by name, salt, or description..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Clear search" onClick={() => setQ("")} size="icon-sm" variant="ghost">
                  <X className="size-4" />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 rounded-3xl border bg-gradient-to-br from-card to-muted/30 p-12 text-center shadow-lg animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
          <p className="text-lg font-medium text-muted-foreground">Loading medicines...</p>
          <p className="text-sm text-muted-foreground mt-1">Please wait while we fetch the latest products</p>
        </div>
      ) : error ? (
        <div className="mt-8 rounded-3xl border bg-gradient-to-br from-destructive/5 to-destructive/10 p-12 text-center shadow-lg animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <X className="h-8 w-8 text-destructive" />
          </div>
          <p className="text-lg font-medium text-destructive mb-2">Unable to load medicines</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      ) : list.length === 0 ? (
        <div className="mt-8 rounded-3xl border bg-gradient-to-br from-card to-muted/30 p-12 text-center shadow-lg animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-muted-foreground mb-2">
            {q ? `No medicines found for "${q}"` : "No medicines available yet"}
          </p>
          <p className="text-sm text-muted-foreground">
            {q ? "Try adjusting your search terms or browse all medicines" : "Check back later for new products"}
          </p>
          {q && (
            <button
              onClick={() => setQ("")}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-8 p-4 bg-muted/30 rounded-2xl border">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {list.length} medicine{list.length !== 1 ? 's' : ''} found
                  {q && <span className="text-muted-foreground"> for "<span className="font-semibold text-primary">{q}</span>"</span>}
                </p>
                <p className="text-xs text-muted-foreground">
                  {q ? 'Search results' : 'All available medicines'}
                </p>
              </div>
            </div>
            {q && (
              <button
                onClick={() => setQ("")}
                className="px-4 py-2 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((m, index) => (
              <div key={m.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <MedicineCard m={m} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

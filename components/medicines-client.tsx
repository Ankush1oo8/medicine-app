'use client'

import { useEffect, useMemo, useState } from "react"
import { collection, getDocs, getFirestore, limit, query, where } from "firebase/firestore"
import { MedicineCard } from "@/components/medicine-card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Search, X } from "lucide-react"
import type { ProductData } from "@/lib/firebase/models"
import { Product } from "@/lib/firebase/models"
import { firebaseClientApp } from "@/lib/firebase/client"

const db = getFirestore(firebaseClientApp)

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
        const featureQuery = query(collection(db, "management"), where("type", "==", "feature"), limit(60))
        const featureSnapshot = await getDocs(featureQuery)
        let docs = featureSnapshot.docs
        if (docs.length === 0) {
          const fallback = query(collection(db, "product"), limit(60))
          const fallbackSnapshot = await getDocs(fallback)
          docs = fallbackSnapshot.docs
        }
        if (!active) return
        const items = docs.map((doc) => Product.fromMap(doc.data(), doc.id).toJSON())
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
    if (!t) return products
    return products.filter(
      (m) =>
        m.name.toLowerCase().includes(t) ||
        (m.salt && m.salt.toLowerCase().includes(t)) ||
        (m.description && m.description.toLowerCase().includes(t)),
    )
  }, [products, q])

  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      <div className="bg-secondary rounded-2xl p-4">
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
        <div className="mt-6 rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">Loading…</div>
      ) : error ? (
        <div className="mt-6 rounded-2xl border bg-card p-6 text-center text-sm text-destructive">{error}</div>
      ) : list.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
          No medicines available yet. Ensure your Firebase collections (management or product) contain items.
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m) => (
            <MedicineCard key={m.id} m={m} />
          ))}
        </div>
      )}
    </div>
  )
}

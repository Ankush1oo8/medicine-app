"use client"

import { medicines as data } from "@/lib/demo-data"
import { MedicineCard } from "@/components/medicine-card"
import { useState, useMemo } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Search, X } from "lucide-react"

export default function MedicinesPage() {
  const [q, setQ] = useState("")

  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return data
    return data.filter(
      (m) =>
        m.name.toLowerCase().includes(t) ||
        (m.salt && m.salt.toLowerCase().includes(t)) ||
        (m.description && m.description.toLowerCase().includes(t)),
    )
  }, [q])

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

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((m) => (
          <MedicineCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  )
}

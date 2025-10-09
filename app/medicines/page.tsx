"use client"

import { medicines as data } from "@/lib/demo-data"
import { Input } from "@/components/ui/input"
import { MedicineCard } from "@/components/medicine-card"
import { useState, useMemo } from "react"

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
        <div className="text-lg font-semibold mb-3">Welcome</div>
        <div className="relative">
          <Input
            placeholder="Search For Medicines..."
            className="rounded-full bg-card pl-4"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
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

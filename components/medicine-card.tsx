"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Medicine } from "@/lib/demo-data"
import { QuantityDialog } from "./quantity-dialog"

export function MedicineCard({ m }: { m: Medicine }) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardHeader className="pt-4 pb-0">
        <div className="text-sm text-primary font-medium">Stock: {m.stock}</div>
      </CardHeader>
      <CardContent className="pt-2">
        <Link href={`/medicines/${m.id}`} className="block">
          <img
            src={m.image || "/placeholder.svg?height=120&width=160&query=medicine%20image"}
            alt={m.name}
            className="h-28 w-full object-contain rounded-md bg-muted"
          />
          <div className="mt-3 font-semibold line-clamp-1">{m.name}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">{m.pack || m.description}</div>
        </Link>
        <div className="mt-2 text-primary font-medium">Rs {m.price.toFixed(1)}/pc</div>
        <div className="mt-3">
          <QuantityDialog medicine={m} />
        </div>
      </CardContent>
    </Card>
  )
}

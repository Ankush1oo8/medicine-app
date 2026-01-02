"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProductData } from "@/lib/firebase/models"
import { QuantityDialog } from "./quantity-dialog"

export function MedicineCard({ m }: { m: ProductData }) {
  return (
    <Card className="group rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 card-hover border-0 bg-gradient-to-br from-card via-card to-muted/30 overflow-hidden hover:-translate-y-2">
      <CardHeader className="pt-6 pb-3 relative">
        <div className="flex items-center justify-between">
          <div className="text-sm text-primary font-semibold bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1.5 rounded-full border border-primary/20">
            Stock: {m.stock}
          </div>
          {m.scheme && (
            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-accent to-accent/80 text-accent-foreground animate-pulse shadow-sm">
              Scheme
            </Badge>
          )}
        </div>
        {/* Enhanced hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
      </CardHeader>
      <CardContent className="pt-3 pb-6">
        <Link href={`/medicines/${m.id}`} className="block group-hover:scale-[1.02] transition-transform duration-500">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted via-muted/80 to-muted/50 p-6 shadow-inner">
            <img
              src={m.image || "/placeholder.svg?height=120&width=160&query=medicine%20image"}
              alt={m.name}
              className="h-36 w-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
            />
            {/* Enhanced shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>
          <div className="mt-5 space-y-3">
            <div className="font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {m.name}
            </div>
            {m.salt && (
              <div className="text-sm text-muted-foreground line-clamp-1 font-medium bg-muted/30 px-2 py-1 rounded-lg">
                {m.salt}
              </div>
            )}
            <div className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {m.pack || m.description}
            </div>
            {m.manufacturer && (
              <div className="text-xs text-muted-foreground bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-1.5 rounded-full inline-block font-medium border border-muted/50">
                {m.manufacturer}
              </div>
            )}
          </div>
        </Link>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-primary font-bold text-xl">
              Rs {(m.price * 0.9).toFixed(1)}/pc
            </div>
            {m.discount && (
              <div className="text-xs text-green-600 font-semibold bg-gradient-to-r from-green-50 to-green-100 px-3 py-1 rounded-full border border-green-200">
                {m.discount}% off
              </div>
            )}
          </div>
          {m.gst && (
            <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/5 px-3 py-1 rounded-full font-medium">
              GST {m.gst}
            </Badge>
          )}
        </div>
        {m.expiry && (
          <div className="text-xs text-amber-600 bg-gradient-to-r from-amber-50 to-amber-100 px-3 py-1.5 rounded-full mt-3 inline-block font-medium border border-amber-200">
            Expires: {m.expiry}
          </div>
        )}
        <div className="mt-5">
          <QuantityDialog medicine={m} />
        </div>
      </CardContent>
    </Card>
  )
}

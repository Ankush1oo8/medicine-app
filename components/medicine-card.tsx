"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProductData } from "@/lib/firebase/models"
import { QuantityDialog } from "./quantity-dialog"
import { Pill } from "lucide-react"

export function MedicineCard({ m }: { m: ProductData }) {
  return (
    <Card className="group relative rounded-3xl overflow-hidden transition-all duration-500 card-hover border-0 bg-linear-to-br from-white via-white to-teal-50/50 shadow-lg hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2">
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-teal-400/20 to-teal-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-linear-to-tr from-teal-300/15 to-teal-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <CardHeader className="pt-6 pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-teal-700 font-semibold bg-linear-to-r from-teal-100 to-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
            <Pill className="h-3.5 w-3.5" />
            <span>Stock: {m.stock}</span>
          </div>
          {m.scheme && (
            <Badge variant="secondary" className="text-xs bg-linear-to-r from-amber-400 to-amber-500 text-white animate-pulse shadow-sm font-medium">
              Scheme
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-3 pb-6 relative z-10">
        <Link href={`/medicines/${m.id}`} className="block group-hover:scale-[1.02] transition-transform duration-500">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-50 via-slate-100 to-teal-50/30 p-6 shadow-inner">
            <img
              src={m.image || "/placeholder.svg?height=120&width=160&query=medicine%20image"}
              alt={m.name}
              className="h-36 w-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
            />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>
          <div className="mt-5 space-y-3">
            <div className="font-bold text-xl line-clamp-1 group-hover:text-teal-600 transition-colors duration-300">
              {m.name}
            </div>
            {m.salt && (
              <div className="text-sm text-slate-600 line-clamp-1 font-medium bg-slate-100/80 px-2 py-1 rounded-lg">
                {m.salt}
              </div>
            )}
            <div className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {m.pack || m.description}
            </div>
            {m.manufacturer && (
              <div className="text-xs text-slate-500 bg-linear-to-r from-slate-100 to-slate-50 px-3 py-1.5 rounded-full inline-block font-medium border border-slate-200">
                {m.manufacturer}
              </div>
            )}
          </div>
        </Link>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-teal-600 font-bold text-xl">
              Rs {(() => {
                const discountPercent = m.discount ? parseFloat(String(m.discount).replace('%', '')) / 100 : 0.1
                const gstPercent = m.gst ? parseFloat(String(m.gst).replace('%', '')) / 100 : 0.05
                const discountedPrice = m.price * (1 - discountPercent)
                return (discountedPrice * (1 + gstPercent)).toFixed(1)
              })()}/pc
            </div>
            {m.discount && (
              <div className="text-xs text-emerald-600 font-semibold bg-linear-to-r from-emerald-50 to-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                {m.discount}% off
              </div>
            )}
          </div>
          {m.gst && (
            <Badge variant="outline" className="text-xs border-teal-300 text-teal-700 bg-teal-50 px-3 py-1 rounded-full font-medium">
              GST {m.gst}
            </Badge>
          )}
        </div>
        {m.expiry && (
          <div className="text-xs text-amber-600 bg-linear-to-r from-amber-50 to-amber-100 px-3 py-1.5 rounded-full mt-3 inline-block font-medium border border-amber-200">
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

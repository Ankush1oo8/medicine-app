import { notFound } from "next/navigation"
import Link from "next/link"
import { medicines } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QuantityDialog } from "@/components/quantity-dialog"

export default function MedicineDetail({ params }: { params: { id: string } }) {
  const m = medicines.find((x) => x.id === decodeURIComponent(params.id))
  if (!m) return notFound()

  const ptr = m.price * 0.86
  const discount = m.price * 0.1
  const final = m.price * 0.9

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-3">
        <Link href="/medicines" className="text-sm underline text-muted-foreground hover:text-foreground">
          Back to Medicines
        </Link>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start justify-center">
              <img
                src={m.image || "/placeholder.svg?height=240&width=240&query=medicine product photo"}
                alt={m.name}
                className="h-56 w-56 rounded-xl border bg-muted object-contain"
              />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-pretty">{m.name}</h1>
              {m.salt && <p className="text-muted-foreground">{m.salt}</p>}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  GST 5%
                </Badge>
                <Badge className="rounded-full">{m.stock > 0 ? `In Stock: ${m.stock}` : "Out of stock"}</Badge>
              </div>
              <div className="text-primary font-semibold">MRP: Rs {m.price.toFixed(2)}</div>

              <div className="mt-4 rounded-xl border">
                <div className="grid grid-cols-2 gap-2 p-3 text-sm">
                  <span className="text-muted-foreground">PTR Price</span>
                  <span className="text-right">Rs {ptr.toFixed(2)}</span>
                  <span className="text-green-600">Discount (10%)</span>
                  <span className="text-right text-green-600">- Rs {discount.toFixed(2)}</span>
                  <span className="font-medium">Price</span>
                  <span className="text-right font-medium">Rs {final.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <QuantityDialog medicine={m} />
                <Button variant="secondary" className="rounded-full">
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

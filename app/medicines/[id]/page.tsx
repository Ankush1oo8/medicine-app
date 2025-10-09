import { notFound } from "next/navigation"
import { medicines } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"
import { QuantityDialog } from "@/components/quantity-dialog"

export default function MedicineDetail({ params }: { params: { id: string } }) {
  const m = medicines.find((x) => x.id === decodeURIComponent(params.id))
  if (!m) return notFound()
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex gap-4">
          <img
            src={m.image || "/placeholder.svg?height=120&width=160&query=medicine"}
            alt={m.name}
            className="size-24 rounded-md bg-muted object-contain"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{m.name}</h1>
            {m.salt && <p className="text-muted-foreground mt-1">{m.salt}</p>}
            <div className="mt-2 text-primary font-semibold">MRP: Rs {m.price.toFixed(2)}</div>
            <div className="mt-1 text-sm text-muted-foreground">GST: 5%</div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="font-semibold text-primary">Price Details</h2>
          <ul className="mt-2 text-sm space-y-1">
            <li className="flex justify-between">
              <span>PTR Price</span>
              <span>Rs {(m.price * 0.86).toFixed(2)}</span>
            </li>
            <li className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>- Rs {(m.price * 0.1).toFixed(2)}</span>
            </li>
            <li className="flex justify-between font-medium">
              <span>Price</span>
              <span>Rs {(m.price * 0.9).toFixed(2)}</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <QuantityDialog medicine={m} />
          <Button variant="secondary" className="rounded-full">
            Stock: {m.stock}
          </Button>
        </div>
      </div>
    </div>
  )
}

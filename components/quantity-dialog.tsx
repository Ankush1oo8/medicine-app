"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { ProductData } from "@/lib/firebase/models"
import { useCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

export function QuantityDialog({ medicine }: { medicine: ProductData }) {
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const { add } = useCart()
  const { toast } = useToast()

  const stockNum = Number(medicine.stockCount ?? medicine.stock ?? 0)
  const isOutOfStock = stockNum <= 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-full" disabled={isOutOfStock}>
          {isOutOfStock ? "Out of Stock" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3">
          <img
            src={medicine.image || "/placeholder.svg?height=80&width=80&query=medicine"}
            alt="Medicine"
            className="size-16 rounded-md object-cover"
          />
          <div>
            <div className="font-medium">{medicine.name}</div>
            <div className="text-sm text-muted-foreground">Rs {medicine.price.toFixed(2)}/pc</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-24" htmlFor="qty">
            Quantity
          </label>
          <Input
            id="qty"
            type="number"
            min={1}
            max={stockNum > 0 ? stockNum : undefined}
            value={qty}
            onChange={(e) => {
              const val = Number(e.target.value)
              setQty(val)
            }}
            className="w-28"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              if (qty < 1) return
              await add(medicine, qty)
              setOpen(false)
              toast({
                title: "Added to cart",
                description: `${qty} x ${medicine.name} added to your cart.`,
              })
            }}
            className="rounded-full"
            disabled={qty < 1 || (stockNum > 0 && qty > stockNum)}
          >
            Add {qty} • Rs {(qty * medicine.price).toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Medicine } from "@/lib/demo-data"
import { useCart } from "@/lib/cart"

export function QuantityDialog({ medicine }: { medicine: Medicine }) {
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-full">
          Add
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
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-28"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              await add(medicine, qty)
              setOpen(false)
            }}
            className="rounded-full"
          >
            Add {qty} • Rs {(qty * medicine.price).toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

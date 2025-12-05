"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart"
import Image from "next/image"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    qty: number
    image?: string
    dosage?: string
    packSize?: string
  }
}

export function CartItem({ item }: CartItemProps) {
  const { update, remove } = useCart()
  const [quantity, setQuantity] = useState(item.qty)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
      update(item.id, newQuantity)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 1
    handleQuantityChange(value)
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Medicine Image */}
          <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
          </div>

          {/* Medicine Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.packSize || item.dosage}</p>
            <p className="text-lg font-bold text-primary">Rs {item.price.toFixed(1)}/pc</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => remove(item.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <Input type="number" value={quantity} onChange={handleInputChange} className="w-16 text-center" min="1" />

              <Button variant="outline" size="sm" onClick={() => handleQuantityChange(quantity + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-sm font-medium">Total: Rs {(item.price * quantity).toFixed(1)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

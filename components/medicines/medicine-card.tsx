"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package } from "lucide-react"
import type { Medicine } from "@/lib/medicines"
import Image from "next/image"

interface MedicineCardProps {
  medicine: Medicine
  onAddToCart: (medicine: Medicine) => void
}

export function MedicineCard({ medicine, onAddToCart }: MedicineCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    // TODO: Implement cart functionality
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    onAddToCart(medicine)
    setIsAdding(false)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Stock Badge */}
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary" className="text-xs">
            <Package className="h-3 w-3 mr-1" />
            Stock: {medicine.stock}
          </Badge>
          {medicine.prescription && (
            <Badge variant="destructive" className="text-xs">
              Prescription Required
            </Badge>
          )}
        </div>

        {/* Medicine Image */}
        <div className="relative w-full h-32 mb-4 bg-muted rounded-lg overflow-hidden">
          <Image
            src={medicine.imageUrl || "/placeholder.svg"}
            alt={medicine.name}
            fill
            className="object-contain p-2"
          />
        </div>

        {/* Medicine Info */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">{medicine.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{medicine.description}</p>

          {/* Additional Info */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Dosage:</span> {medicine.dosage}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Pack Size:</span> {medicine.packSize}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Manufacturer:</span> {medicine.manufacturer}
            </p>
          </div>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="text-right">
            <p className="text-lg font-bold text-primary">Rs {medicine.price.toFixed(1)}/pc</p>
          </div>
          <Button onClick={handleAddToCart} disabled={isAdding || medicine.stock === 0} className="px-6">
            {isAdding ? (
              "Adding..."
            ) : medicine.stock === 0 ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

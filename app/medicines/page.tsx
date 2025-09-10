"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MedicineCard } from "@/components/medicines/medicine-card"
import { MedicineFilters } from "@/components/medicines/medicine-filters"
import { getMedicines, type Medicine } from "@/lib/medicines"
import { Loader2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<{
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
  }>({})

  const { addItem } = useCart()

  useEffect(() => {
    loadMedicines()
  }, [filters])

  const loadMedicines = async () => {
    setIsLoading(true)
    try {
      const data = await getMedicines(filters)
      setMedicines(data)
    } catch (error) {
      console.error("Error loading medicines:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = (medicine: Medicine) => {
    addItem(medicine)
    // TODO: Show success toast notification
    console.log("Added to cart:", medicine.name)
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Medicines</h1>
          <p className="text-muted-foreground">Browse our wide selection of authentic medicines and health products</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <MedicineFilters onFiltersChange={handleFiltersChange} isLoading={isLoading} />
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : `Showing ${medicines.length} products`}
          </p>
        </div>

        {/* Medicine Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading medicines...</span>
          </div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No medicines found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria or browse all categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

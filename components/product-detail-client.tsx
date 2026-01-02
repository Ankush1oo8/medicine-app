"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QuantityDialog } from "@/components/quantity-dialog"
import type { ProductData } from "@/lib/firebase/models"
import { Product } from "@/lib/firebase/models"
import { firebaseClientApp } from "@/lib/firebase/client"

const db = getFirestore(firebaseClientApp)

export function ProductDetailClient({ productId }: { productId: string }) {
  const router = useRouter()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const docRef = doc(db, "management", productId)
        const snapshot = await getDoc(docRef)
        if (!snapshot.exists()) {
          if (active) setProduct(null)
          return
        }
        if (!active) return
        setProduct(Product.fromMap(snapshot.data(), snapshot.id).toJSON())
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchProduct()
    return () => {
      active = false
    }
  }, [productId])

  if (!product && !loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
          Product not found.
        </div>
      </div>
    )
  }

  const mrp = product?.price ?? 0
  const ptr = mrp * 0.86
  const discount = mrp * 0.1
  const final = mrp * 0.9

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-3">
        <button
          className="text-sm underline text-muted-foreground hover:text-foreground"
          onClick={() => router.push("/medicines")}
        >
          Back to Medicines
        </button>
      </div>

      {loading ? (
        <Card className="rounded-2xl">
          <CardContent className="p-4 md:p-6 text-sm text-muted-foreground">Loading product…</CardContent>
        </Card>
      ) : product ? (
        <Card className="rounded-2xl">
          <CardContent className="p-4 md:p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start justify-center">
                <img
                  src={product.image || "/placeholder.svg?height=240&width=240&query=medicine product photo"}
                  alt={product.name}
                  className="h-56 w-56 rounded-xl border bg-muted object-contain"
                />
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-pretty">{product.name}</h1>
                {product.salt && <p className="text-muted-foreground">{product.salt}</p>}
                {product.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    GST {product.gst ?? "5%"}
                  </Badge>
                  <Badge className="rounded-full">
                    {Number(product.stockCount ?? product.stock ?? 0) > 0
                      ? `In Stock: ${product.stock ?? product.stockCount}`
                      : "Out of stock"}
                  </Badge>
                  {product.manufacturer && (
                    <Badge variant="outline" className="rounded-full">
                      {product.manufacturer}
                    </Badge>
                  )}
                  {product.expiry && (
                    <Badge variant="outline" className="rounded-full">
                      Expires: {product.expiry}
                    </Badge>
                  )}
                  {product.scheme && (
                    <Badge variant="secondary" className="rounded-full">
                      Scheme Available
                    </Badge>
                  )}
                </div>
                {product.pack && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Pack:</strong> {product.pack}
                  </div>
                )}

                {/* Raw Data Display */}
                <div className="mt-6 rounded-xl border bg-muted/50 p-4">
                  <h3 className="font-semibold mb-3">Product Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div><strong>Name:</strong> {product.name}</div>
                    <div><strong>MRP:</strong> {product.mrpLabel || product.price}</div>
                    <div><strong>GST_Rate:</strong> {product.gst || "5%"}</div>
                    <div><strong>Manufacturer:</strong> {product.manufacturer || "N/A"}</div>                              
                    <div><strong>Discount:</strong> {product.discount || "0"}%</div>
                    <div><strong>Expiry:</strong> {product.expiry || "N/A"}</div>               
                    <div><strong>PTR:</strong> {product.ptr || "N/A"}</div>                                
                  </div>
                </div>

                <div className="mt-4 rounded-xl border">
                  <div className="grid grid-cols-2 gap-2 p-3 text-sm">
                    <span className="text-muted-foreground">MRP</span>
                    <span className="text-right line-through text-muted-foreground">Rs {mrp.toFixed(2)}</span>
                    <span className="text-muted-foreground">PTR Price</span>
                    <span className="text-right">Rs {ptr.toFixed(2)}</span>
                    <span className="text-green-600">Discount (10%)</span>
                    <span className="text-right text-green-600">- Rs {discount.toFixed(2)}</span>
                    <span className="font-medium">Price</span>
                    <span className="text-right font-medium">Rs {final.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <QuantityDialog medicine={product} />
                  <Button variant="secondary" className="rounded-full" onClick={() => router.push("/cart")}>
                    View Cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </main>
  )
}

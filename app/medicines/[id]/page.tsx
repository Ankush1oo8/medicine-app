import { ProductDetailClient } from "@/components/product-detail-client"

export default async function MedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductDetailClient productId={decodeURIComponent(id)} />
}

import { ProductDetailClient } from "@/components/product-detail-client"

export default function MedicineDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient productId={decodeURIComponent(params.id)} />
}

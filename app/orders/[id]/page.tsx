import { orders } from "@/lib/demo-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id)
  if (!order) return notFound()

  const itemCount = order.items.reduce((s, i) => s + i.qty, 0)

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex items-center gap-3">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-sm hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Orders</span>
        </Link>
      </div>

      <Card className="mt-4 rounded-2xl">
        <CardHeader className="pb-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-semibold text-pretty">Order {order.id}</h1>
            <Badge
              className={cn(
                "rounded-full",
                order.status === "Delivered" && "bg-green-600 text-white",
                order.status === "Cancelled" && "bg-red-600 text-white",
              )}
              variant={order.status === "Pending" || order.status === "Processing" ? "secondary" : "default"}
            >
              {order.status}
            </Badge>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Placed on {order.createdAt} • {itemCount} items
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <section>
              <h2 className="text-primary font-medium">Items</h2>
              <div className="mt-2 divide-y rounded-xl border">
                {order.items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between p-3">
                    <div className="min-w-0">
                      <Link href={`/medicines/${it.medicineId}`} className="font-medium underline">
                        {it.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">Qty: {it.qty}</div>
                    </div>
                    <div className="text-sm font-medium">
                      {"Rs "}
                      {(it.qty * it.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-secondary p-3">
                <div className="text-sm text-muted-foreground">Payment</div>
                <div className="font-medium">{order.paymentStatus}</div>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="font-semibold">
                  {"Rs "}
                  {order.total.toFixed(2)}
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

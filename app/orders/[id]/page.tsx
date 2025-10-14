import { orders } from "@/lib/demo-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { medicines } from "@/lib/demo-data"

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
                {order.items.map((it) => {
                  const med = medicines.find((m) => m.id === it.medicineId)
                  return (
                    <div key={it.id} className="flex items-center justify-between p-3">
                      <div className="min-w-0 flex items-center gap-3">
                        <img
                          src={med?.image || "/placeholder.svg?height=48&width=48&query=medicine%20thumbnail"}
                          alt={med?.name ?? it.name}
                          className="size-12 rounded-md bg-muted object-contain flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="font-medium underline underline-offset-4 hover:opacity-90">
                                {it.name}
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{med?.name ?? it.name}</DialogTitle>
                                {med?.salt ? <DialogDescription className="mt-1">{med.salt}</DialogDescription> : null}
                              </DialogHeader>
                              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <img
                                  src={
                                    med?.image ||
                                    "/placeholder.svg?height=160&width=200&query=medicine%20preview" ||
                                    "/placeholder.svg" ||
                                    "/placeholder.svg"
                                  }
                                  alt={med?.name ?? it.name}
                                  className="w-full h-40 object-contain rounded-md bg-muted"
                                />
                                <div className="text-sm space-y-2">
                                  {med?.description ? <p className="text-muted-foreground">{med.description}</p> : null}
                                  {med?.pack ? <p>Pack: {med.pack}</p> : null}
                                  <p className="font-medium">Price: Rs {it.price.toFixed(2)} / pc</p>
                                  <p className="text-muted-foreground">Qty: {it.qty}</p>
                                  <p className="font-semibold">Total: Rs {(it.qty * it.price).toFixed(2)}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {/* end popup */}
                          <div className="text-sm text-muted-foreground">Qty: {it.qty}</div>
                        </div>
                      </div>
                      {/* end left side with image + info */}
                      <div className="text-sm font-medium">
                        {"Rs "}
                        {(it.qty * it.price).toFixed(2)}
                      </div>
                    </div>
                  )
                })}
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

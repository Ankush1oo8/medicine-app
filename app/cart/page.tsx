"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const { items, total, update, remove, clear } = useCart()
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-4">
      <div className="rounded-2xl border bg-card">
        {items.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            Your cart is empty.{" "}
            <Link href="/medicines" className="underline">
              Browse medicines
            </Link>
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((it) => (
              <li key={it.id} className="p-4 flex items-center gap-3">
                <img
                  src={it.image || "/placeholder.svg?height=64&width=64&query=medicine"}
                  alt=""
                  className="size-14 rounded-md bg-muted object-contain"
                />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-muted-foreground">Rs {it.price.toFixed(2)}/pc</div>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => update(it.id, Math.max(1, Number(e.target.value)))}
                    className="w-20"
                  />
                  <Button variant="secondary" onClick={() => remove(it.id)} className="rounded-full">
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
        <div className="font-semibold">Total: Rs {total.toFixed(2)}</div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={clear} className="rounded-full" disabled={items.length === 0}>
            Clear
          </Button>
          {user ? (
            <Button className="rounded-full" disabled={items.length === 0}>
              Checkout
            </Button>
          ) : (
            <Button asChild className="rounded-full" disabled={items.length === 0}>
              <Link href="/login">Login to Checkout</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Castle as Capsule, ClipboardList, User2, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/medicines", icon: Capsule, label: "Medicines" },
  { href: "/orders", icon: ClipboardList, label: "Orders" },
  { href: "/profile", icon: User2, label: "Account" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="sticky bottom-0 inset-x-0 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80">
      <div className="mx-auto max-w-5xl px-6 py-2">
        <ul className="grid grid-cols-5 gap-3">
          {items.map((it, i) => {
            const active = pathname === it.href || (it.href !== "/" && pathname?.startsWith(it.href))
            const Icon = it.icon
            const isCenter = i === 2
            return (
              <li key={it.href} className={cn("flex justify-center")}>
                <Link
                  href={it.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-2 text-sm",
                    isCenter ? "bg-secondary shadow-md -mt-6 border border-border" : "",
                    active ? "text-primary" : "text-foreground/70",
                  )}
                >
                  <Icon className="size-5" />
                  <span className="sr-only">{it.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

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
    <nav className="sticky bottom-0 inset-x-0 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 shadow-lg border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-2">
        <ul className="grid grid-cols-5 gap-2">
          {items.map((it, i) => {
            const active = pathname === it.href || (it.href !== "/" && pathname?.startsWith(it.href))
            const Icon = it.icon
            const isCenter = i === 2
            return (
              <li key={it.href} className={cn("flex justify-center")}>
                <Link
                  href={it.href}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl px-4 py-2 text-xs font-medium transition-all duration-300",
                    isCenter && "bg-linear-to-t from-teal-500 to-teal-400 text-white shadow-lg -mt-6 transform scale-110",
                    !isCenter && active && "text-teal-600 bg-teal-50",
                    !isCenter && !active && "text-slate-400 hover:text-teal-600 hover:bg-teal-50",
                  )}
                >
                  <Icon className={cn("size-5", active && !isCenter && "text-teal-600")} />
                  <span className={cn(
                    "sr-only md:not-sr-only",
                    isCenter && "text-white"
                  )}>{it.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

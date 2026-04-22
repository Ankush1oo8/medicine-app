"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart"
import { useAuth } from "@/lib/auth"
import { useProfile } from "@/hooks/use-profile"
import { ShoppingCart, User2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  const pathname = usePathname()
  const { items } = useCart()
  const { user } = useAuth()
  const { profile } = useProfile(user?.phone || null)
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 supports-backdrop-filter:bg-white/60 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight transition-all duration-300 hover:scale-105 hover:text-teal-600">
            <span className="text-teal-600">Order</span><span className="text-slate-700">@VPA</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              className={cn(
                "relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-teal-50 hover:text-teal-600",
                isActive("/") && "text-teal-600 bg-teal-50 shadow-md ring-1 ring-teal-200",
              )}
              href="/"
            >
              Home
            </Link>
            <Link
              className={cn(
                "relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-teal-50 hover:text-teal-600",
                isActive("/medicines") && "text-teal-600 bg-teal-50 shadow-md ring-1 ring-teal-200",
              )}
              href="/medicines"
            >
              Medicines
            </Link>
            <Link
              className={cn(
                "relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-teal-50 hover:text-teal-600",
                isActive("/about") && "text-teal-600 bg-teal-50 shadow-md ring-1 ring-teal-200",
              )}
              href="/about"
            >
              About
            </Link>
            <Link
              className={cn(
                "relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-teal-50 hover:text-teal-600",
                isActive("/contact") && "text-teal-600 bg-teal-50 shadow-md ring-1 ring-teal-200",
              )}
              href="/contact"
            >
              Contact
            </Link>
            {user && (
              <Link
                className={cn(
                  "relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-teal-50 hover:text-teal-600",
                  isActive("/orders") && "text-teal-600 bg-teal-50 shadow-md ring-1 ring-teal-200",
                )}
                href="/orders"
              >
                Orders
              </Link>
            )}
          </nav>

          {/* Desktop icon group */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/cart"
              aria-label="Cart"
              className={cn(
                "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 transition-all duration-300",
                isActive("/cart") && "ring-2 ring-teal-300 bg-teal-50 border-teal-300",
              )}
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-teal-600 text-white text-[10px] px-1.5 py-0.5 font-semibold">
                  {items.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>

            {user ? (
              <Link
                href="/profile"
                aria-label="Profile"
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-teal-50 hover:border-teal-300 transition-all duration-300",
                  isActive("/profile") && "ring-2 ring-teal-300 bg-teal-50 border-teal-300",
                )}
                title="Profile"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.profilePhotoUrl || "/generic-user-avatar.jpg"} alt="Profile" />
                  <AvatarFallback className="bg-teal-100 text-teal-600">
                    <User2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Profile</span>
              </Link>
            ) : (
              <Link
                href="/login"
                aria-label="Login"
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 transition-all duration-300 font-medium",
                  isActive("/login") && "ring-2 ring-teal-300 bg-teal-50 border-teal-300",
                )}
                title="Login"
              >
                <User2 className="h-5 w-5" aria-hidden="true" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile collapse button */}
          <button
            className="md:hidden rounded-full px-4 py-2 text-sm bg-teal-600 text-white transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden border-t bg-white/95 supports-backdrop-filter:bg-white/80 backdrop-blur-md shadow-lg",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-2 text-sm">
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl transition-all duration-300",
                isActive("/") ? "text-teal-600 font-semibold bg-teal-50" : "text-slate-600 hover:bg-slate-50",
              )}
              href="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl transition-all duration-300",
                isActive("/medicines") ? "text-teal-600 font-semibold bg-teal-50" : "text-slate-600 hover:bg-slate-50",
              )}
              href="/medicines"
            >
              Medicines
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl transition-all duration-300",
                isActive("/about") ? "text-teal-600 font-semibold bg-teal-50" : "text-slate-600 hover:bg-slate-50",
              )}
              href="/about"
            >
              About
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl transition-all duration-300",
                isActive("/contact") ? "text-teal-600 font-semibold bg-teal-50" : "text-slate-600 hover:bg-slate-50",
              )}
              href="/contact"
            >
              Contact
            </Link>
            {user && (
              <Link
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl transition-all duration-300",
                  isActive("/orders") ? "text-teal-600 font-semibold bg-teal-50" : "text-slate-600 hover:bg-slate-50",
                )}
                href="/orders"
              >
                Orders
              </Link>
            )}
            {/* mobile icon row */}
            <div className="flex items-center gap-3 pt-3 border-t mt-2">
              <Link
                href="/cart"
                aria-label="Cart"
                className={cn(
                  "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-teal-50 transition-all duration-300",
                  isActive("/cart") && "bg-teal-50 border-teal-300",
                )}
                onClick={() => setOpen(false)}
                title="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-teal-600 text-white text-[10px] px-1.5 py-0.5 font-semibold">
                    {items.length}
                  </span>
                )}
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  aria-label="Profile"
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-teal-50 transition-all duration-300",
                    isActive("/profile") && "bg-teal-50 border-teal-300",
                  )}
                  onClick={() => setOpen(false)}
                  title="Profile"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.profilePhotoUrl || "/generic-user-avatar.jpg"} alt="Profile" />
                    <AvatarFallback className="bg-teal-100 text-teal-600 text-xs">PR</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Link
                  href="/login"
                  aria-label="Login"
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 hover:bg-teal-50 transition-all duration-300 font-medium",
                    isActive("/login") && "bg-teal-50 border-teal-300",
                  )}
                  onClick={() => setOpen(false)}
                  title="Login"
                >
                  <User2 className="h-5 w-5" />
                  <span className="text-sm">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

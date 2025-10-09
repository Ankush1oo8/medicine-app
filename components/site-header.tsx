"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart"
import { useAuth } from "@/lib/auth"

export function SiteHeader() {
  const pathname = usePathname()
  const { items } = useCart()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname?.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-tight transition-colors hover:opacity-90">
            Pharma Store
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/") && "text-primary font-medium",
              )}
              href="/"
            >
              Home
            </Link>
            <Link
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/medicines") && "text-primary font-medium",
              )}
              href="/medicines"
            >
              Medicines
            </Link>
            <Link
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/about") && "text-primary font-medium",
              )}
              href="/about"
            >
              About
            </Link>
            <Link
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/contact") && "text-primary font-medium",
              )}
              href="/contact"
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  className={cn(
                    "transition-colors underline-offset-8 hover:underline",
                    isActive("/orders") && "text-primary font-medium",
                  )}
                  href="/orders"
                >
                  Orders
                </Link>
                <Link
                  className={cn(
                    "transition-colors underline-offset-8 hover:underline",
                    isActive("/profile") && "text-primary font-medium",
                  )}
                  href="/profile"
                >
                  Profile
                </Link>
              </>
            )}
            {!user && (
              <Link
                className={cn(
                  "transition-colors underline-offset-8 hover:underline",
                  isActive("/login") && "text-primary font-medium",
                )}
                href="/login"
              >
                Login
              </Link>
            )}
            <Link
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/cart") && "text-primary font-medium",
              )}
              href="/cart"
            >
              Cart{items.length ? ` (${items.length})` : ""}
            </Link>
          </nav>

          {/* Mobile collapse button (no icons) */}
          <button
            className="md:hidden rounded-md px-3 py-2 text-sm bg-primary text-primary-foreground transition-colors hover:opacity-90"
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
          "md:hidden border-t bg-background/70 supports-[backdrop-filter]:bg-background/60 backdrop-blur",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-3 text-sm">
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/") && "text-primary font-medium",
              )}
              href="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/medicines") && "text-primary font-medium",
              )}
              href="/medicines"
            >
              Medicines
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/about") && "text-primary font-medium",
              )}
              href="/about"
            >
              About
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/contact") && "text-primary font-medium",
              )}
              href="/contact"
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  className={cn(
                    "transition-colors underline-offset-8 hover:underline",
                    isActive("/orders") && "text-primary font-medium",
                  )}
                  href="/orders"
                >
                  Orders
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className={cn(
                    "transition-colors underline-offset-8 hover:underline",
                    isActive("/profile") && "text-primary font-medium",
                  )}
                  href="/profile"
                >
                  Profile
                </Link>
              </>
            )}
            {!user && (
              <Link
                onClick={() => setOpen(false)}
                className={cn(
                  "transition-colors underline-offset-8 hover:underline",
                  isActive("/login") && "text-primary font-medium",
                )}
                href="/login"
              >
                Login
              </Link>
            )}
            <Link
              onClick={() => setOpen(false)}
              className={cn(
                "transition-colors underline-offset-8 hover:underline",
                isActive("/cart") && "text-primary font-medium",
              )}
              href="/cart"
            >
              Cart{items.length ? ` (${items.length})` : ""}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

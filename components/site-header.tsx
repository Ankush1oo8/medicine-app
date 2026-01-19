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
    <header className="sticky top-0 z-50 border-b bg-background/70 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-tight transition-colors hover:opacity-90">
            Order@VPA
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <Link
              className={cn(
                "relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-sm",
                isActive("/") && "text-primary bg-primary/10 shadow-md ring-1 ring-primary/20",
              )}
              href="/"
            >
              Home
            </Link>
            <Link
              className={cn(
                "relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-sm",
                isActive("/medicines") && "text-primary bg-primary/10 shadow-md ring-1 ring-primary/20",
              )}
              href="/medicines"
            >
              Medicines
            </Link>
            <Link
              className={cn(
                "relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-sm",
                isActive("/about") && "text-primary bg-primary/10 shadow-md ring-1 ring-primary/20",
              )}
              href="/about"
            >
              About
            </Link>
            <Link
              className={cn(
                "relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-sm",
                isActive("/contact") && "text-primary bg-primary/10 shadow-md ring-1 ring-primary/20",
              )}
              href="/contact"
            >
              Contact
            </Link>
            {user && (
              <Link
                className={cn(
                  "relative px-4 py-2 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-sm",
                  isActive("/orders") && "text-primary bg-primary/10 shadow-md ring-1 ring-primary/20",
                )}
                href="/orders"
              >
                Orders
              </Link>
            )}
          </nav>

          {/* Desktop icon group */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/cart"
              aria-label="Cart"
              className={cn(
                "relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors",
                isActive("/cart") && "ring-2 ring-primary/30",
              )}
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
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
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors",
                  isActive("/profile") && "ring-2 ring-primary/30",
                )}
                title="Profile"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.profilePhotoUrl || "/generic-user-avatar.jpg"} alt="Profile" />
                  <AvatarFallback>
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
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 hover:bg-muted transition-colors",
                  isActive("/login") && "ring-2 ring-primary/30",
                )}
                title="Login"
              >
                <User2 className="h-5 w-5" aria-hidden="true" />
                <span>Login</span>
              </Link>
            )}
          </div>

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
              </>
            )}
            {/* mobile icon row remains as the way to access profile/cart */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/cart"
                aria-label="Cart"
                className={cn(
                  "relative inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors",
                  isActive("/cart") && "bg-muted",
                )}
                onClick={() => setOpen(false)}
                title="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                    {items.length}
                  </span>
                )}
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  aria-label="Profile"
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-muted transition-colors",
                    isActive("/profile") && "bg-muted",
                  )}
                  onClick={() => setOpen(false)}
                  title="Profile"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={profile?.profilePhotoUrl || "/generic-user-avatar.jpg"} alt="Profile" />
                    <AvatarFallback className="text-[10px]">PR</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Link
                  href="/login"
                  aria-label="Login"
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-full border px-4 hover:bg-muted transition-colors",
                    isActive("/login") && "bg-muted",
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

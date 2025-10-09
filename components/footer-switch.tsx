"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"

export function FooterSwitch() {
  const pathname = usePathname() || "/"

  // Hide footer on deep/transactional flows
  const hide =
    pathname.startsWith("/medicines/") ||
    pathname === "/cart" ||
    pathname === "/login" ||
    pathname === "/profile" ||
    pathname.startsWith("/orders")

  if (hide) return null
  return <SiteFooter />
}

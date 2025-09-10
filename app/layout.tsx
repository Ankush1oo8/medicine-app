import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { OrderProvider } from "@/contexts/order-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "MediCare - Your Trusted Medicine Partner",
  description:
    "Get authentic medicines delivered to your doorstep. Fast, reliable, and affordable healthcare solutions.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <CartProvider>
          <OrderProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </OrderProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

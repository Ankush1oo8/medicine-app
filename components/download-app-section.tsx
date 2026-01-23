"use client"
import { cn } from "@/lib/utils"

export function DownloadAppSection({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="download-app-title"
      className={cn(
        "rounded-xl border border-border bg-muted/40",
        "px-6 py-8 md:px-10 md:py-12",
        "flex flex-col md:flex-row items-center justify-between gap-6",
        className,
      )}
    >
      <div className="space-y-2 max-w-xl">
        <h2 id="download-app-title" className="text-balance text-2xl md:text-3xl font-semibold text-foreground">
          Get medicines faster with our app
        </h2>
        <p className="text-pretty text-sm md:text-base text-muted-foreground">
          Track orders in real time, refill prescriptions, and chat with support on the go.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://apps.apple.com/in/app/order-vpa/id6755127591"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Download on the App Store"
        >
          {/* Use proper placeholder syntax */}
          <img src="/apple-app-store-logo.png" alt="" className="h-5 w-5" />
          <span>App Store</span>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.pharmacompany.ordervpa&pcampaignid=web_share"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Get it on Google Play"
        >
          <img src="/google-play-logo.png" alt="" className="h-5 w-5" />
          <span>Google Play</span>
        </a>
      </div>
    </section>
  )
}

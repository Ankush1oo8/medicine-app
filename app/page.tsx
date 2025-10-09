import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DownloadAppSection } from "@/components/download-app-section"

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background text-foreground border p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{text}</p>
    </div>
  )
}

function StepCard({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        {n}
      </div>
      <h3 className="font-semibold text-center">{title}</h3>
      <p className="mt-2 text-center text-muted-foreground leading-relaxed">{text}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* HERO: two-column like reference, keep sky-blue theme */}
      <section className="grid items-center gap-8 rounded-2xl bg-secondary p-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-secondary-foreground text-balance">
            India’s trusted B2B pharmacy ordering platform
          </h1>
          <p className="mt-4 max-w-xl text-secondary-foreground/80 leading-relaxed">
            Order genuine medicines with transparent pricing and quick delivery—built for licensed pharmacies and
            distributors.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/medicines">Browse Medicines</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-72 w-72 overflow-hidden rounded-full border bg-card">
            <img src="/images/medicines-home-1.jpg" alt="App preview" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* BENEFITS: “Order Anywhere, Anytime” style */}
      <section className="mt-10 rounded-2xl border bg-card p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Order Anywhere, Anytime</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Access special deals, repeat orders, and instant confirmations directly from your phone or desktop.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-medium">Exclusive Mobile-Only Deals</h3>
            <p className="mt-1 text-muted-foreground">Get flash offers available on the app.</p>
          </div>
          <div>
            <h3 className="font-medium">Smart App for Smart Buyer</h3>
            <p className="mt-1 text-muted-foreground">Search, set repeat orders, and track deliveries with ease.</p>
          </div>
          <div>
            <h3 className="font-medium">Secure Payment Gateway</h3>
            <p className="mt-1 text-muted-foreground">Bank‑grade security and instant confirmations.</p>
          </div>
        </div>
        <div className="mt-6">
          <Button asChild variant="outline" className="rounded-full bg-transparent">
            <Link href="/medicines">Start Ordering</Link>
          </Button>
        </div>
      </section>

      {/* STEPS: “Get Started in Under 10 Minutes” */}
      <section className="mt-10">
        <h2 className="text-center text-2xl font-semibold">Get Started in Under 10 Minutes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <StepCard n={1} title="Quick Sign‑In" text="Use the demo login to explore immediately." />
          <StepCard n={2} title="Browse & Verify" text="Open medicine cards for stock and pricing details." />
          <StepCard n={3} title="Order & Grow" text="Add to cart and place orders—track them from Orders." />
        </div>
        <div className="mt-6 flex justify-center">
          <Button asChild className="rounded-full">
            <Link href="/login">Login to Continue</Link>
          </Button>
        </div>
      </section>

      {/* Download our app section */}
      <section className="mt-10">
        <DownloadAppSection />
      </section>
    </div>
  )
}

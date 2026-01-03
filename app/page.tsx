import { DownloadAppSection } from "@/components/download-app-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Smartphone, Zap, Shield } from "lucide-react";

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
      <section className="grid items-center gap-8 rounded-2xl bg-secondary p-8 ">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold text-secondary-foreground text-balance text-center">
            LiveSupply, a unit of Vimal Pharma Associate. 
          </h1>
        </div>
      </section>
      <br/>
      {/* HERO: two-column like reference, keep sky-blue theme */}
      <section className="relative overflow-hidden grid items-center gap-8 rounded-3xl bg-gradient-to-br from-secondary via-secondary to-primary/10 p-8 md:p-12 md:grid-cols-2 animate-slide-up">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-6xl font-bold text-secondary-foreground text-balance leading-tight">
            India’s trusted B2B pharmacy ordering platform
          </h1>
          <p className="mt-6 max-w-xl text-secondary-foreground/90 leading-relaxed text-lg">
            Order genuine medicines with transparent pricing and quick delivery—built for licensed pharmacies and
            distributors.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/medicines">Browse Medicines</Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="rounded-full px-8 py-3 text-lg font-semibold">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
          <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-white/20 bg-card shadow-2xl animate-scale-in">
            <img src="/images/order-vpa-logo.jpg" alt="Order@VPA logo" className="h-full w-full object-contain p-8" />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent/10 rounded-full blur-xl"></div>
      </section>

      {/* BENEFITS: "Order Anywhere, Anytime" style */}
      <section className="mt-16 rounded-3xl border bg-gradient-to-br from-card to-muted/30 p-8 md:p-12 shadow-lg animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Order Anywhere, Anytime</h2>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
            Access special deals, repeat orders, and instant confirmations directly from your phone or desktop.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group text-center p-6 rounded-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 card-hover">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Exclusive Mobile-Only Deals</h3>
            <p className="text-muted-foreground leading-relaxed">Get flash offers available on the app with instant notifications.</p>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 card-hover">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Smart App for Smart Buyer</h3>
            <p className="text-muted-foreground leading-relaxed">Search, set repeat orders, and track deliveries with intelligent automation.</p>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-background/50 hover:bg-background/80 transition-all duration-300 card-hover">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Secure Payment Gateway</h3>
            <p className="text-muted-foreground leading-relaxed">Bank‑grade security with instant confirmations and fraud protection.</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-3 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <Link href="/medicines">Start Ordering Today</Link>
          </Button>
        </div>
      </section>

      {/* STEPS: “Get Started in Under 10 Minutes” */}
      <section className="mt-10">
        <h2 className="text-center text-2xl font-semibold">Get Started in Under 10 Minutes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <StepCard n={1} title="Quick Sign‑In" text="Verify via mobile OTP and access the dashboard instantly." />
          <StepCard n={2} title="Browse & Verify" text="Open medicine cards for stock and pricing details." />
          <StepCard n={3} title="Order & Grow" text="Add to cart and place orders—track them from Orders." />
        </div>
        {/* Conditionally render LoginCta based on authentication status */}
        {/* <LoginCta /> */}
      </section>

      {/* Download our app section */}
      <section className="mt-10">
        <DownloadAppSection />
      </section>
    </div>
  )
}

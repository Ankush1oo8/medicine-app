import { DownloadAppSection } from "@/components/download-app-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Smartphone, Zap, Shield } from "lucide-react";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white text-foreground border border-slate-200 p-4 shadow-sm">
      <div className="text-2xl font-semibold text-teal-600">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  )
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-slate-500 leading-relaxed">{text}</p>
    </div>
  )
}

function StepCard({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold">
        {n}
      </div>
      <h3 className="font-semibold text-center text-slate-800">{title}</h3>
      <p className="mt-2 text-center text-slate-500 leading-relaxed">{text}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* HERO: Teal gradient theme */}
      <section className="relative overflow-hidden grid items-center gap-8 rounded-3xl bg-gradient-to-br from-teal-50 via-teal-100 to-white p-8 md:p-12 md:grid-cols-2 animate-slide-up shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-balance leading-tight">
            India's trusted <span className="text-teal-600">B2B pharmacy</span> ordering platform
          </h1>
          <p className="mt-6 max-w-xl text-slate-600 leading-relaxed text-lg">
            Order genuine medicines with transparent pricing and quick delivery built for licensed pharmacies and
            distributors.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-teal-600 hover:bg-teal-700">
              <Link href="/medicines">Browse Medicines</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py font-semibold border-teal-300 text-teal-700 hover:bg-te-3 text-lgal-50">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-200/50 to-teal-400/30 rounded-full blur-3xl"></div>
          <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 overflow-hidden rounded-full border-4 border-white/50 bg-white shadow-2xl animate-scale-in">
            <img src="/images/order-vpa-logo.jpg" alt="Order@VPA logo" className="h-full w-full object-contain p-4 sm:p-6 md:p-8" />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-teal-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-teal-400/20 rounded-full blur-xl"></div>
      </section>

      {/* BENEFITS: "Order Anywhere, Anytime" style */}
      <section className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-teal-50/30 p-8 md:p-12 shadow-lg animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Order Anywhere, Anytime</h2>
          <p className="text-slate-500 leading-relaxed text-lg max-w-2xl mx-auto">
            Access special deals, repeat orders, and instant confirmations directly from your phone or desktop.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group text-center p-6 rounded-2xl bg-white/50 hover:bg-white border border-slate-100 hover:border-teal-200 transition-all duration-300 card-hover">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Smartphone className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-slate-800">Exclusive Mobile-Only Deals</h3>
            <p className="text-slate-500 leading-relaxed">Get flash offers available on the app with instant notifications.</p>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-white/50 hover:bg-white border border-slate-100 hover:border-teal-200 transition-all duration-300 card-hover">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-slate-800">Smart App for Smart Buyer</h3>
            <p className="text-slate-500 leading-relaxed">Search, set repeat orders, and track deliveries with intelligent automation.</p>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-white/50 hover:bg-white border border-slate-100 hover:border-teal-200 transition-all duration-300 card-hover">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-slate-800">Secure Payment Gateway</h3>
            <p className="text-slate-500 leading-relaxed">Bank‑grade security with instant confirmations and fraud protection.</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-3 text-lg font-semibold border-teal-300 text-teal-700 hover:bg-teal-600 hover:text-white transition-all duration-300">
            <Link href="/medicines">Start Ordering Today</Link>
          </Button>
        </div>
      </section>

      {/* STEPS: "Get Started in Under 10 Minutes" */}
      <section className="mt-10">
        <h2 className="text-center text-2xl font-semibold text-slate-800">Get Started in Under 10 Minutes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <StepCard n={1} title="Quick Sign‑In" text="Verify via mobile OTP and access the dashboard instantly." />
          <StepCard n={2} title="Browse & Verify" text="Open medicine cards for stock and pricing details." />
          <StepCard n={3} title="Order & Grow" text="Add to cart and place orders—track them from Orders." />
        </div>
      </section>

      {/* Download our app section */}
      <section className="mt-10">
        <DownloadAppSection />
      </section>
    </div>
  )
}

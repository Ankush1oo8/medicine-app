export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-2xl border bg-card p-6 md:p-8">
        <h1 className="text-3xl font-bold text-pretty">About Order@VPA</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Order@VPA is a modern B2B/B2C pharmacy marketplace built for speed, reliability, and compliance. We partner with
          licensed distributors and verified brands to ensure authentic medicines at transparent prices. This demo is
          front‑end only and Firebase‑ready, so your backend can plug in without redesigning the UI.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-background p-5">
            <h3 className="text-lg font-semibold">Our Mission</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Make healthcare access simple and affordable for everyone by streamlining discovery, pricing, and
              delivery.
            </p>
          </div>
          <div className="rounded-xl border bg-background p-5">
            <h3 className="text-lg font-semibold">What We Deliver</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Real‑time stock and clear PTR/MRP</li>
              <li>Easy reorders and saved carts</li>
              <li>GST invoices and order history</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-background p-5">
            <h3 className="text-lg font-semibold">Why Trust Us</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Supplied via licensed pharmacies</li>
              <li>Secure checkout and data handling</li>
              <li>Transparent returns and escalations</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-secondary p-6">
            <p className="text-4xl font-bold">500+</p>
            <p className="text-sm text-secondary-foreground/80">SKUs in demo catalogue</p>
          </div>
          <div className="rounded-xl bg-secondary p-6">
            <p className="text-4xl font-bold">99.9%</p>
            <p className="text-sm text-secondary-foreground/80">Uptime target for APIs</p>
          </div>
          <div className="rounded-xl bg-secondary p-6">
            <p className="text-4xl font-bold">48 hrs</p>
            <p className="text-sm text-secondary-foreground/80">Avg. SLA for support</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border bg-background p-5">
          <h3 className="text-lg font-semibold">Compliance & Safety</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            All medical information in this demo is sample data. Always consult a registered medical practitioner before
            purchasing or consuming any medicine. When you connect Firebase, ensure proper authentication and role‑based
            access before enabling purchases.
          </p>
        </div>
      </section>
    </div>
  )
}

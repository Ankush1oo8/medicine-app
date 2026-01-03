"use client"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6 md:p-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            We’re here to help with product queries, orders, and account support.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="font-medium">Support Email:</span> support@pharma-store.demo
            </p>
            <p>
              <span className="font-medium">Sales Email:</span> sales@pharma-store.demo
            </p>
            <p>
              <span className="font-medium">Phone:</span> +91 12345 67890
            </p>
            <p>
              <span className="font-medium">Address:</span> 123 Market Road, Mumbai, MH 400001
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-secondary p-4 text-sm">
            <p>
              <span className="font-medium">Hours:</span> Mon–Sat, 9:00 AM – 7:00 PM IST
            </p>
            <p className="mt-1">
              <span className="font-medium">SLA:</span> We aim to respond within 24–48 hours.
            </p>
            <p className="mt-1">
              <span className="font-medium">Escalation:</span> escalate@pharma-store.demo
            </p>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a demo form. No messages are sent; integrate Firebase or your API to enable submissions.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              // no-op demo submit
              console.log("[v0] Contact form submitted (demo)")
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="mb-1 font-medium">Name</span>
                <input className="rounded-md border bg-background px-3 py-2" placeholder="Your name" required />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1 font-medium">Email</span>
                <input
                  type="email"
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium">Subject</span>
              <input className="rounded-md border bg-background px-3 py-2" placeholder="How can we help?" />
            </label>
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium">Message</span>
              <textarea
                className="min-h-[120px] rounded-md border bg-background px-3 py-2"
                placeholder="Write your message..."
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground md:w-auto"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

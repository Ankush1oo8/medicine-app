export default function ExpiryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Expiry</h1>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        View important information about product expiry. Always verify batch and expiry dates at checkout and upon
        delivery.
      </p>
      <div className="mt-6 rounded-2xl border bg-card p-6">
        <h2 className="font-medium">Notes</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li>Expiry details are provided on each product and on the invoice.</li>
          <li>Report any discrepancies to our support team from the Contact page.</li>
        </ul>
      </div>
    </div>
  )
}

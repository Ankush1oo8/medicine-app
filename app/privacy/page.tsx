"use client"

import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.text())

export default function PrivacyPage() {
  const { data, error } = useSWR("/content/privacy.txt", fetcher)

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-balance">Privacy Policy</h1>
      <p className="mt-2 text-muted-foreground">Effective: 10 May 2025</p>

      <div className="mt-6 rounded-2xl border bg-card p-6">
        {error ? (
          <p className="text-destructive">Failed to load privacy policy.</p>
        ) : !data ? (
          <p>Loading...</p>
        ) : (
          <article className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{data}</article>
        )}
      </div>
    </main>
  )
}

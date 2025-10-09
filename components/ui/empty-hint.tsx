import type React from "react"
export function EmptyHint({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <div className="font-medium">{title}</div>
      {children && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
    </div>
  )
}

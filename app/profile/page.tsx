"use client"

import { useAuth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <div className="rounded-2xl border bg-card p-6">
          <div className="mb-2">You are not logged in.</div>
          <Button asChild className="rounded-full">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded-2xl bg-secondary p-5">
        <h1 className="text-xl font-bold">Account</h1>
      </div>

      <div className="mt-4 rounded-2xl border bg-card divide-y">
        <div className="p-4">
          <div className="font-semibold">{user.name.toLowerCase()}</div>
          <div className="text-sm text-muted-foreground">{user.phone}</div>
        </div>
        <div className="p-4">
          <div className="font-medium">Profile</div>
          <div className="text-sm text-muted-foreground">Name, Mobile, Email Account</div>
        </div>
        <div className="p-4">
          <div className="font-medium">Business Details</div>
          <div className="text-sm text-muted-foreground">Name, Documents, Tax Certificates</div>
        </div>
        <div className="p-4">
          <div className="font-medium">Order History</div>
          <div className="text-sm text-muted-foreground">History, Payment Status</div>
        </div>
        <div className="p-4">
          <div className="font-medium">Ledger</div>
          <div className="text-sm text-muted-foreground">Balance Sheet</div>
        </div>
        <div className="p-4">
          <div className="font-medium">Milestones</div>
          <div className="text-sm text-muted-foreground">Rewards, Gifts, Achievement</div>
        </div>
        <div className="p-4">
          <div className="font-medium">Upload License</div>
          <div className="text-sm text-muted-foreground">Add or Change License</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="secondary" asChild className="rounded-full">
          <a href="/images/account-reference.jpg" target="_blank" rel="noreferrer">
            View Reference
          </a>
        </Button>
        <Button className="rounded-full" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

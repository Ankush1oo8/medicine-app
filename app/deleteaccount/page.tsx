"use client"

import { useAuth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { DownloadAppSection } from "@/components/download-app-section"

export default function DeleteAccountPage() {
  const { user } = useAuth()

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
      <div className="rounded-2xl bg-secondary p-5 flex items-center gap-3">
        <AlertCircle className="h-6 w-6 text-destructive" />
        <h1 className="text-xl font-bold">Delete Account</h1>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <h2 className="text-lg font-semibold text-destructive mb-3">Account Deletion</h2>
          <p className="text-sm text-muted-foreground mb-4">
            To delete your Order@VPA account and all associated data, please use our mobile application. This ensures a
            secure and verified deletion process.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Download the Order@VPA mobile app</li>
            <li>Log in with your account credentials</li>
            <li>Navigate to Settings → Account → Delete Account</li>
            <li>Follow the verification steps to confirm deletion</li>
            <li>Your account and data will be permanently removed</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Download Order@VPA App</h2>
          <DownloadAppSection className="border-0 bg-transparent px-0 py-0" />
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-3">Need Help?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            If you have any questions or need assistance with account deletion, please contact our support team.
          </p>
          <Button asChild variant="outline" className="rounded-full bg-transparent">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Button asChild variant="outline" className="rounded-full bg-transparent">
          <Link href="/profile">Back to Profile</Link>
        </Button>
      </div>
    </div>
  )
}

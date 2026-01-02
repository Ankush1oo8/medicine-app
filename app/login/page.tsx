// ...existing code...
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Loader2 } from "lucide-react"

type View = "phone" | "otp"

export default function LoginPage() {
  const router = useRouter()
  const { user, sendOtp, confirmOtp, loading } = useAuth()
  const [view, setView] = useState<View>("phone")

  // Form States
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Auto-redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.replace("/")
    }
  }, [user, loading, router])

  // Check for recaptcha container presence (required for phone OTP)
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("recaptcha-container")) {
      console.warn("recaptcha-container is missing from the DOM — phone OTP will fail until it is present.")
    }
  }, [])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const res = await sendOtp(phone)
    if (!res.ok) {
      setError(res.error ?? "Failed to send OTP.")
      setSubmitting(false)
    } else {
      setView("otp")
      setSubmitting(false)
    }
  }

  const handleConfirmOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const res = await confirmOtp(otp)
    if (!res.ok) {
      setError(res.error ?? "Invalid OTP.")
      setSubmitting(false)
    } else {
      // Success will trigger useEffect redirect
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {view === "phone" ? "Login with Phone" : "Enter OTP"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {view === "phone"
              ? "Enter your mobile number to receive OTP"
              : "Enter the 6-digit code sent to your phone"}
          </p>
        </div>

        {view === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="phone">Mobile Number</label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            {/* Firebase RecaptchaVerifier requires this element */}
            <div id="recaptcha-container" />

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full rounded-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleConfirmOtp} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">OTP Code</label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full rounded-full" disabled={submitting || otp.length !== 6}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full"
              onClick={() => { setView("phone"); setOtp(""); setError(null); }}
            >
              Back to Phone
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
// ...existing code...
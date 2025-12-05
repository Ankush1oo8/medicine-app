"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Step = "phone" | "otp"

export default function LoginPage() {
  const router = useRouter()
  const { user, requestOtp, verifyOtp, loading } = useAuth()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("+91")
  const [otp, setOtp] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user && !loading) {
      router.replace("/profile")
    }
  }, [user, loading, router])

  const handleSendOtp = async () => {
    setSubmitting(true)
    setError(null)
    const res = await requestOtp(phone)
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error ?? "Could not send OTP.")
      return
    }
    setStatus("OTP sent. Enter the 6-digit code you received.")
    setStep("otp")
  }

  const handleVerifyOtp = async () => {
    setSubmitting(true)
    setError(null)
    const res = await verifyOtp(otp)
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error ?? "Invalid OTP.")
      return
    }
    setStatus("Verified! Redirecting to your profile…")
    setTimeout(() => router.replace("/profile"), 1200)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <h1 className="text-2xl font-bold">Login with OTP</h1>
        <p className="text-sm text-muted-foreground">
          Enter your registered mobile number to receive a one-time password (OTP).
        </p>

        <div className="space-y-2">
          <label className="text-sm" htmlFor="phone">
            Mobile Number
          </label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={step === "otp" || submitting}
            placeholder="+91 98765 43210"
          />
        </div>

        {step === "otp" && (
          <div className="space-y-2">
            <label className="text-sm" htmlFor="otp">
              OTP
            </label>
            <Input
              id="otp"
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
            />
          </div>
        )}

        {error && <div className="text-sm text-destructive">{error}</div>}
        {status && <div className="text-sm text-foreground">{status}</div>}

        <Button
          className="w-full rounded-full"
          onClick={step === "phone" ? handleSendOtp : handleVerifyOtp}
          disabled={submitting}
        >
          {submitting ? "Please wait…" : step === "phone" ? "Send OTP" : "Verify OTP"}
        </Button>

        <p className="text-xs text-muted-foreground">
          Have trouble receiving the OTP? Ensure the number is correct and includes your country code.
        </p>
      </div>
      <div id="recaptcha-container" className="mt-2 text-center text-[10px] text-muted-foreground" />
    </div>
  )
}

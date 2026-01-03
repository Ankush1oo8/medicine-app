// ...existing code...
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

type View = "login" | "signup"

export default function LoginPage() {
  const router = useRouter()
  const { user, login, signup, loading } = useAuth()
  const [view, setView] = useState<View>("login")

  // Form States
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    let res
    if (view === "login") {
      res = await login(email, password)
    } else {
      if (!name || !phone) {
        setError("Name and Phone are required.")
        setSubmitting(false)
        return
      }
      res = await signup(email, password, name, phone)
    }

    if (!res.ok) {
      setError(res.error ?? "Authentication failed.")
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
            {view === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {view === "login"
              ? "Login with your email and password"
              : "Enter your details to get started"}
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
          <button
            onClick={() => { setView("login"); setError(null); }}
            className={`rounded-md py-1.5 text-sm font-medium transition-all ${view === "login" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => { setView("signup"); setError(null); }}
            className={`rounded-md py-1.5 text-sm font-medium transition-all ${view === "signup" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === "signup" && (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>

          {view === "signup" && (
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
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
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
                {view === "login" ? "Logging in..." : "Signing up..."}
              </>
            ) : (
              view === "login" ? "Login" : "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
// ...existing code...
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("demo@pharma.com")
  const [password, setPassword] = useState("demo123")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="space-y-2">
          <label className="text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-sm text-destructive">{error}</div>}
        <Button
          className="w-full rounded-full"
          onClick={async () => {
            const res = await login(email, password)
            if (!res.ok) {
              setError(res.error || "Login failed")
              return
            }
            router.push("/profile")
          }}
        >
          Sign in
        </Button>
        <p className="text-xs text-muted-foreground">Demo credentials: demo@pharma.com / demo123</p>
      </div>
    </div>
  )
}

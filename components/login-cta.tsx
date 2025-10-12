"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

export function LoginCta() {
  const { user } = useAuth()
  if (user) return null
  return (
    <div className="mt-6 flex justify-center">
      <Button asChild className="rounded-full">
        <Link href="/login">Login to Continue</Link>
      </Button>
    </div>
  )
}

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  ConfirmationResult,
  RecaptchaVerifier,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth"
import { DEFAULT_RECAPTCHA_SITE_KEY, firebaseClientApp } from "@/lib/firebase/client"

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier | null
    confirmationResult?: ConfirmationResult
  }
}

export type AuthUser = {
  uid: string
  phone: string
  name?: string | null
  email?: string | null
}

const auth = getAuth(firebaseClientApp)
auth.useDeviceLanguage()

export type CurrentUser = {
  id: string
  phone?: string | null
  name?: string | null
  email?: string | null
}

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") return null
  const current = auth.currentUser
  if (!current) return null
  return {
    id: current.uid || current.phoneNumber || "user",
    phone: current.phoneNumber,
    name: current.displayName,
    email: current.email,
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}

let recaptchaVerifier: RecaptchaVerifier | null = null
const DEFAULT_CONTAINER_ID = "recaptcha-container"

function initRecaptcha(containerId = DEFAULT_CONTAINER_ID) {
  if (typeof window === "undefined") return null
  if (recaptchaVerifier) return recaptchaVerifier

  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      // automatically resolved
    },
    "expired-callback": () => {
      recaptchaVerifier = null
      if (typeof window !== "undefined") {
        window.recaptchaVerifier = null
      }
    },
  })

  if (typeof window !== "undefined") {
    window.recaptchaVerifier = recaptchaVerifier
  }

  recaptchaVerifier.render().catch(() => {
    recaptchaVerifier = null
    if (typeof window !== "undefined") window.recaptchaVerifier = null
  })

  return recaptchaVerifier
}

const normalizePhone = (input: string) => {
  if (!input) return null
  let trimmed = input.replace(/\s+/g, "")
  if (!trimmed.startsWith("+")) {
    if (trimmed.length === 10) trimmed = `+91${trimmed}`
    else return null
  }
  return trimmed
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [initialized, setInitialized] = useState(false)
  const confirmationRef = useRef<ConfirmationResult | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          phone: firebaseUser.phoneNumber ?? "",
          name: firebaseUser.displayName,
          email: firebaseUser.email,
        })
      } else {
        setUser(null)
      }
      setInitialized(true)
    })
    return () => unsubscribe()
  }, [])

  const requestOtp = useCallback(async (rawPhone: string, containerId?: string) => {
    if (typeof window === "undefined") {
      return { ok: false, error: "OTP flow is only available in the browser." }
    }

    const phone = normalizePhone(rawPhone)
    if (!phone) {
      return { ok: false, error: "Enter a valid phone number with country code." }
    }

    const verifier = initRecaptcha(containerId)
    if (!verifier) {
      return { ok: false, error: "Unable to initialize reCAPTCHA. Reload and try again." }
    }

    try {
      await verifier.verify()
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier)
      confirmationRef.current = confirmation
      if (typeof window !== "undefined") {
        window.confirmationResult = confirmation
      }
      return { ok: true }
    } catch (error) {
      console.error("OTP request failed:", error)
      recaptchaVerifier = null
      if (typeof window !== "undefined") {
        window.recaptchaVerifier = null
        window.confirmationResult = undefined
      }
      return { ok: false, error: error instanceof Error ? error.message : "Failed to send OTP." }
    }
  }, [])

  const verifyOtp = useCallback(async (code: string) => {
    if (!confirmationRef.current) {
      return { ok: false, error: "Request an OTP before verifying." }
    }
    if (!code || code.length < 6) {
      return { ok: false, error: "OTP should be 6 digits." }
    }
    try {
      await confirmationRef.current.confirm(code)
      confirmationRef.current = null
      recaptchaVerifier = null
      if (typeof window !== "undefined") {
        window.confirmationResult = undefined
        window.recaptchaVerifier = null
      }
      return { ok: true }
    } catch (error) {
      console.error("OTP verification failed:", error)
      return { ok: false, error: error instanceof Error ? error.message : "Invalid OTP." }
    }
  }, [])

  const logout = useCallback(async () => {
    confirmationRef.current = null
    await signOut(auth)
  }, [])

  return {
    user,
    loading: !initialized,
    requestOtp,
    verifyOtp,
    logout,
  }
}

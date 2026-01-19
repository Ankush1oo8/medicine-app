"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User as FirebaseUser,
} from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { firebaseClientApp } from "@/lib/firebase/client"

export type AuthUser = {
  uid: string
  email: string
  name: string
  phone: string
}

const auth = getAuth(firebaseClientApp)
const db = getFirestore(firebaseClientApp)

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const confirmationResultRef = useRef<ConfirmationResult | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch extra profile data (like phone) from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid)
        const userDoc = await getDoc(userDocRef)
        const userData = userDoc.data()

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          name: firebaseUser.displayName ?? userData?.name ?? "",
          phone: userData?.phone ?? "",
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass)
      return { ok: true }
    } catch (error: any) {
      console.error("Login failed:", error)
      return { ok: false, error: error.message }
    }
  }, [])

  const signup = useCallback(async (email: string, pass: string, name: string, phone: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass)
      if (cred.user) {
        // Update Auth Profile
        await updateProfile(cred.user, { displayName: name })

        // Create User Document in Firestore
        await setDoc(doc(db, "users", cred.user.uid), {
          name,
          email,
          phone,
          createdAt: new Date().toISOString(),
          type: "customer", // Default role
        })
      }
      return { ok: true }
    } catch (error: any) {
      console.error("Signup failed:", error)
      return { ok: false, error: error.message }
    }
  }, [])

  // Phone auth: send OTP to the provided phone number.
  // Requires a DOM element with id="recaptcha-container" (add to your login page).
  const sendOtp = useCallback(async (phone: string) => {
    try {
      const verifier = new RecaptchaVerifier(
                auth,
        "recaptcha-container",
        { size: "invisible" },
      )

      try {
        // Ensure rendered (returns a promise)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        verifier.render()
      } catch (e) {
        // ignore if already rendered
      }

      const result = await signInWithPhoneNumber(auth, phone, verifier)
      confirmationResultRef.current = result
      return { ok: true }
    } catch (error: any) {
      console.error("sendOtp failed:", error)
      return { ok: false, error: error.message }
    }
  }, [])

  // Confirm OTP code sent by `sendOtp`.
  const confirmOtp = useCallback(async (code: string) => {
    try {
      if (!confirmationResultRef.current) {
        return { ok: false, error: "No confirmation result available. Call sendOtp first." }
      }

      const cred = await confirmationResultRef.current.confirm(code)
      const firebaseUser = cred.user

      // Ensure a Firestore user doc exists for phone users
      const userDocRef = doc(db, "users", firebaseUser.uid)
      const userDoc = await getDoc(userDocRef)
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? "",
          phone: firebaseUser.phoneNumber ?? "",
          createdAt: new Date().toISOString(),
          type: "customer",
        })
      }

      return { ok: true }
    } catch (error: any) {
      console.error("confirmOtp failed:", error)
      return { ok: false, error: error.message }
    }
  }, [])

  const logout = useCallback(async () => {
    await signOut(auth)
  }, [])

  return {
    user,
    loading,
    login,
    signup,
    logout,
  }
}

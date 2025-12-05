import { getApp, getApps, initializeApp } from "firebase/app"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBeRmQkTV9DGR6zcIScecxakCXrsd37kdU",
  authDomain: "medicinal-8ab3e.firebaseapp.com",
  projectId: "medicinal-8ab3e",
  storageBucket: "medicinal-8ab3e.firebasestorage.app",
  messagingSenderId: "466525631722",
  appId: "1:466525631722:web:5ca0f873149d3cf4cd9393",
  measurementId: "G-XMGP9Z1FGD",
}

export const FIREBASE_STORAGE_BUCKET = firebaseConfig.storageBucket
export const DEFAULT_RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "6LeBZggsAAAAAKi1frQQ44vujoB5DeBCBSchYcTo"

export const firebaseClientApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null
  const supported = await isSupported().catch(() => false)
  if (!supported) return null
  return getAnalytics(firebaseClientApp)
}

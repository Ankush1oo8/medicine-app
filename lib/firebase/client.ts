import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore, initializeFirestore } from "firebase/firestore"
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBeRmQkTV9DGR6zcIScecxakCXrsd37kdU",
  authDomain: "medicinal-8ab3e.firebaseapp.com",
  projectId: "medicinal-8ab3e",
  storageBucket: "medicinal-8ab3e.firebasestorage.app",
  messagingSenderId: "466525631722",
  appId: "1:466525631722:web:6459992ff2cdc8c3cd9393",
  measurementId: "G-WN2RLXLN5S",
}

// ✅ Initialize Firebase ONCE
export const firebaseClientApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// ✅ Firestore
export const db = initializeFirestore(firebaseClientApp, {
  experimentalForceLongPolling: true,
})

// ✅ Analytics (browser only)
export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null
  const supported = await isSupported().catch(() => false)
  if (!supported) return null
  return getAnalytics(firebaseClientApp)
}

export const FIREBASE_STORAGE_BUCKET = firebaseConfig.storageBucket

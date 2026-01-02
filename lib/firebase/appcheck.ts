import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
import { firebaseClientApp } from "./firebase"

// ❌ App Check MUST run only in browser
if (typeof window !== "undefined") {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    console.warn("⚠️ App Check disabled: reCAPTCHA site key missing")
  } else {
    initializeAppCheck(firebaseClientApp, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    })
  }
}

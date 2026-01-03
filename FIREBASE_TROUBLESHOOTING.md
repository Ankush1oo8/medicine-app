# Troubleshooting Firebase Errors

## "auth/invalid-app-credential"

You are encountering the `Firebase: Error (auth/invalid-app-credential)` error. This usually indicates a configuration mismatch between your defined Firebase project settings and the environment you are running the app in.

## Checklist to Fix

1.  **Authorized Domains**:
    *   Go to **Firebase Console** > **Authentication** > **Settings** > **Authorized Domains**.
    *   Ensure `localhost` (and `127.0.0.1` if you use it) is listed.

2.  **API Key Restrictions (Google Cloud Console)**:
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
    *   Find the API Key matching your `apiKey` in `lib/firebase/client.ts`.
    *   If "Application restrictions" is set to "HTTP referrers", ensure `http://localhost:3000` (or your port) is exactly matched.
    *   If "API restrictions" is enabled, ensure **Identity Toolkit API** is checked.

3.  **App Check / Play Integrity**:
    *   If you enabled **App Check** in Firebase, `localhost` will fail unless you generate a **Debug Token**.
    *   To fix for dev: Go to **App Check** > **Apps**, click your web app, getting the Debug Token instruction, or temporarily disable App Check enforcement.

4.  **Test Phone Numbers**:
    *   To bypass reCAPTCHA and billing/quota issues during development, use **Phone Numbers for Testing**.
    *   Go to **Firebase Console** > **Authentication** > **Sign-in method** > **Phone**.
    *   Scroll down to "Phone numbers for testing".
    *   Add a dummy number (e.g., `+91 9999999999`) and a dummy code (e.g., `123456`).
    *   **Try logging in with this number**. It should work instantly without reCAPTCHA errors.

## Code Changes Made
I have updated `lib/auth.ts` to remove a redundant `verifier.verify()` call which can sometimes cause token race conditions. Please try referencing the Test Phone Number first to confirm the SDK is initialized correctly.

## "The query requires an index"

You are encountering the `FirebaseError: The query requires an index` error. This occurs when a Firestore query uses a combination of `where` clauses and `orderBy` that requires a composite index.

### How to Fix

1. **Follow the Firebase Console Link**:
   * The error message includes a direct link to create the required index in the Firebase Console.
   * Click the link: `https://console.firebase.google.com/v1/r/project/YOUR_PROJECT_ID/firestore/indexes/...`
   * This will open the Firestore Indexes page with the index pre-configured.

2. **Create the Index Manually**:
   * Go to **Firebase Console** > **Firestore Database** > **Indexes**.
   * Click **Create Index**.
   * Set the collection ID (e.g., `orders`).
   * Add fields:
     * Field: `client` (Ascending)
     * Field: `updatedAt` (Descending)
   * Click **Create**.

3. **Wait for Index Creation**:
   * Index creation can take a few minutes to several hours depending on the data size.
   * You can monitor the status in the Indexes tab.

### Example Query Causing This Error

In `components/orders-tabs.tsx`, the query is:
```typescript
const q = query(
  collection(db, "orders"),
  where("client", "==", user.phone),
  orderBy("updatedAt", "desc"),
)
```

This combination requires a composite index on `client` (equality) and `updatedAt` (descending order).

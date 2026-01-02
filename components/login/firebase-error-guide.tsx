import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldAlert } from "lucide-react"

export function FirebaseErrorGuide() {
    return (
        <Alert variant="destructive" className="mt-4 text-left">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription className="text-xs space-y-2 mt-2">
                <p>
                    <strong>Reason:</strong> Your Firebase project is either rejecting requests from <code>localhost</code> OR the Identity Toolkit API is disabled.
                </p>
                <p className="font-semibold">How to Fix (Check Both):</p>
                <ol className="list-decimal pl-4 space-y-1">
                    <li>
                        Go to{" "}
                        <a
                            href="https://console.cloud.google.com/apis/credentials"
                            target="_blank"
                            className="underline font-bold"
                        >
                            Google Cloud Console
                        </a>
                        .
                    </li>
                    <li>Edit your API Key (AIza...).</li>
                    <li>
                        Under <strong>Application restrictions</strong>, add <code>http://localhost:3000</code> and <code>http://localhost</code>.
                    </li>
                    <li>
                        Go to{" "}
                        <a
                            href="https://console.firebase.google.com/project/_/authentication/settings"
                            target="_blank"
                            className="underline font-bold"
                        >
                            Firebase Auth Settings
                        </a>
                        .
                    </li>
                    <li>
                        Click <strong>Authorized Domains</strong> and add <code>localhost</code>.
                    </li>
                    <li>
                        <strong>CRITICAL:</strong> Enable{" "}
                        <a
                            href="https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview"
                            target="_blank"
                            className="underline font-bold"
                        >
                            Identity Toolkit API
                        </a>
                        .
                    </li>
                </ol>
                <p className="mt-2 text-[10px] opacity-80">
                    <strong>Tip:</strong> Use a Test Phone Number (e.g. +91 9999999999) configured in Firebase Console to skip this check.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                    <strong>Note on Mismatch:</strong> The error mentions Project <code>167413535186</code>, but your config uses <code>medicinal-8ab3e</code> (466525631722). You are likely using an API Key from a different project. Please use the API Key associated with <code>medicinal-8ab3e</code>.
                </p>
            </AlertDescription>
        </Alert>
    )
}

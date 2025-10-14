import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Order@VPA</h3>
            <p className="mt-2 text-sm text-secondary-foreground/80 leading-relaxed">
              Fast, transparent medicine ordering with a clean, mobile‑first experience.
            </p>
          </div>

          <div>
            <h4 className="font-medium">Pages</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/medicines">Medicines</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/expiry">Expiry</Link>
              </li>
              <li>
                <Link href="/terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Help</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/contact">Support</Link>
              </li>
              <li>
                <Link href="/about">Our Mission</Link>
              </li>
              <li>
                <Link href="/medicines">Browse Catalogue</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Social</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-2"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Follow on X (Twitter)</span>
                  <span aria-hidden="true">X (Twitter)</span>
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2"
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Connect on LinkedIn</span>
                  <span aria-hidden="true">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Follow on Instagram</span>
                  <span aria-hidden="true">Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} Order@VPA. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

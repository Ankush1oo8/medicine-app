import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl">MediCare</span>
            </div>
            <p className="text-sm text-accent-foreground/80">
              Your trusted partner for quality medicines and healthcare products. We ensure safe, reliable, and
              affordable healthcare solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm hover:text-secondary transition-colors">
                Home
              </Link>
              <Link href="/medicines" className="block text-sm hover:text-secondary transition-colors">
                Medicines
              </Link>
              <Link href="/about" className="block text-sm hover:text-secondary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-sm hover:text-secondary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-sm hover:text-secondary transition-colors">
                Help Center
              </Link>
              <Link href="/returns" className="block text-sm hover:text-secondary transition-colors">
                Returns & Refunds
              </Link>
              <Link href="/shipping" className="block text-sm hover:text-secondary transition-colors">
                Shipping Info
              </Link>
              <Link href="/privacy" className="block text-sm hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@medicare.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>123 Healthcare St, Medical City</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 MediCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

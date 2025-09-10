"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProfileMenuItem } from "@/components/profile/profile-menu-item"
import { getCurrentUser } from "@/lib/auth"
import { User, Briefcase, ShoppingCart, BookOpen, Award, Upload, Info, UserPlus } from "lucide-react"

export default function ProfilePage() {
  const user = getCurrentUser()

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">Account</h1>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name || "ram"}</h2>
              <p className="text-primary-foreground/80">{user?.phone || "+911234567890"}</p>
            </div>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="max-w-2xl mx-auto space-y-4">
          <ProfileMenuItem
            href="/profile/details"
            icon={UserPlus}
            title="Profile"
            description="Name, Mobile, Email Account"
          />

          <ProfileMenuItem
            href="/profile/business"
            icon={Briefcase}
            title="Business Details"
            description="Name, Documents, Tax Certificates"
          />

          <ProfileMenuItem
            href="/profile/orders"
            icon={ShoppingCart}
            title="Order History"
            description="History, Payment Status"
          />

          <ProfileMenuItem href="/profile/ledger" icon={BookOpen} title="Ledger" description="Balance Sheet" />

          <ProfileMenuItem
            href="/profile/milestones"
            icon={Award}
            title="MileStones"
            description="Rewards, Gifts, Achievement"
          />

          <ProfileMenuItem
            href="/profile/license"
            icon={Upload}
            title="Upload License"
            description="Add or Change License"
          />

          <ProfileMenuItem href="/profile/about" icon={Info} title="About" description="Know more about MediCare" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

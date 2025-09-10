import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Shield, Truck, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-secondary/20 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Your Health, Our <span className="text-primary">Priority</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Get authentic medicines delivered to your doorstep. Fast, reliable, and affordable healthcare solutions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for medicines, health products..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-primary/20 focus:border-primary"
              />
              <Button size="lg" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/medicines">
              <Button size="lg" className="px-8 py-6 text-lg">
                Browse Medicines
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">100% Authentic</h3>
              <p className="text-sm text-muted-foreground text-center">
                All medicines are sourced from licensed distributors
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground text-center">Same day delivery available in select areas</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground text-center">Round the clock customer support available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

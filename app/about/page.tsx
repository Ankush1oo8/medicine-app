"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Clock, Users, Award, Truck } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: "Authentic Medicines",
      description: "100% genuine medicines sourced directly from licensed manufacturers and distributors.",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock customer support and emergency medicine delivery services.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep within 2-3 business days.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Qualified pharmacists and healthcare professionals to assist you.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "All medicines are quality tested and stored in optimal conditions.",
    },
    {
      icon: Heart,
      title: "Care First",
      description: "Your health and well-being is our top priority in everything we do.",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "10,000+", label: "Medicines Available" },
    { number: "500+", label: "Cities Served" },
    { number: "99.9%", label: "Customer Satisfaction" },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MediCare</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in healthcare, delivering authentic medicines and exceptional service since 2020.
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              Trusted by 50,000+ Customers
            </Badge>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At MediCare, we believe that access to quality healthcare should be simple, reliable, and affordable.
                Our mission is to bridge the gap between patients and essential medicines by providing a seamless online
                platform that ensures authentic medications reach your doorstep safely and on time.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                  <p className="text-muted-foreground">
                    Every medicine is sourced from licensed manufacturers and verified for authenticity.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Care</h3>
                  <p className="text-muted-foreground">
                    We prioritize your health and well-being in every interaction and service we provide.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                  <p className="text-muted-foreground">
                    Consistent, timely delivery and 24/7 customer support you can depend on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose MediCare?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best healthcare experience with our comprehensive range of services and
                unwavering dedication to quality.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl opacity-90">Numbers that reflect our commitment to healthcare excellence</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Founded in 2020 during the global health crisis, MediCare was born out of a simple yet powerful
                  vision: to ensure that no one should struggle to access essential medicines when they need them most.
                  Our founders, a team of healthcare professionals and technology experts, recognized the challenges
                  people faced in obtaining authentic medications safely and conveniently.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Starting with a small team and a big dream, we built partnerships with licensed pharmaceutical
                  distributors, established rigorous quality control processes, and developed a user-friendly platform
                  that puts patients first. Today, we're proud to serve over 50,000 customers across 500+ cities,
                  maintaining our commitment to authenticity, affordability, and accessibility.
                </p>
                <p className="text-lg leading-relaxed">
                  As we continue to grow, our mission remains unchanged: to be your trusted healthcare partner, ensuring
                  that quality medicines and compassionate care are always within reach.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

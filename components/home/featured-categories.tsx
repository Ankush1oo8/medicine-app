import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Bone, Eye, Stethoscope, Pill } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Heart Care",
    icon: Heart,
    description: "Cardiovascular medicines and supplements",
    color: "text-red-500",
  },
  {
    name: "Brain Health",
    icon: Brain,
    description: "Neurological and mental health products",
    color: "text-purple-500",
  },
  {
    name: "Bone & Joint",
    icon: Bone,
    description: "Orthopedic care and supplements",
    color: "text-orange-500",
  },
  {
    name: "Eye Care",
    icon: Eye,
    description: "Vision care and eye health products",
    color: "text-blue-500",
  },
  {
    name: "General Health",
    icon: Stethoscope,
    description: "General medicines and health products",
    color: "text-green-500",
  },
  {
    name: "Vitamins",
    icon: Pill,
    description: "Vitamins and dietary supplements",
    color: "text-yellow-500",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the right medicines and health products for your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                      <Link href={`/medicines?category=${category.name.toLowerCase().replace(" ", "-")}`}>
                        <Button variant="outline" size="sm">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

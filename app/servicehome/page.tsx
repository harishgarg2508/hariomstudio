'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Camera, Heart, Users, Sparkles, CalendarDays, Music, Cake, Briefcase, Plane } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DroneSection from './drone-section'
import ServiceCard from './service-card'
import Navbar from '../components/Navbar'
const packages = [
  {
    name: "Stardust",
    description: "Perfect for intimate events and personal shoots",
    price: "$999",
    features: [
      "4 hours of coverage",
      "100 edited digital photos",
      "Online gallery",
      "1 photographer"
    ]
  },
  {
    name: "Supernova",
    description: "Ideal for medium-sized events and comprehensive coverage",
    price: "$2,499",
    features: [
      "8 hours of coverage",
      "300 edited digital photos",
      "Online gallery + USB drive",
      "2 photographers",
      "Engagement or pre-event shoot"
    ]
  },
  {
    name: "Celestial",
    description: "The ultimate package for your most important moments",
    price: "$4,999",
    features: [
      "Full day coverage (up to 12 hours)",
      "500+ edited digital photos",
      "Online gallery, USB drive, and printed album",
      "2 photographers + 1 assistant",
      "Engagement shoot and rehearsal dinner coverage",
      "Drone footage included"
    ]
  }
]

const services = [
  { name: "Wedding Photography", icon: <Heart className="h-8 w-8 mb-2 text-pink-500" /> },
  { name: "Pre-Wedding Shoot", icon: <Camera className="h-8 w-8 mb-2 text-blue-500" /> },
  { name: "Birthday Celebrations", icon: <Cake className="h-8 w-8 mb-2 text-yellow-500" /> },
  { name: "Portfolio Shoot", icon: <Sparkles className="h-8 w-8 mb-2 text-purple-500" /> },
  { name: "Corporate Events", icon: <Briefcase className="h-8 w-8 mb-2 text-gray-500" /> },
  { name: "Concert & Music", icon: <Music className="h-8 w-8 mb-2 text-red-500" /> },
  { name: "Family Portraits", icon: <Users className="h-8 w-8 mb-2 text-green-500" /> },
  { name: "Travel & Adventure", icon: <Plane className="h-8 w-8 mb-2 text-cyan-500" /> },
]

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default function ServicesHome() {
  const [selectedPackage, setSelectedPackage] = useState(packages[1].name)

  return (
    <div>
    <div>
      <Navbar />
    <div className="container mx-auto px-4 py-16">
      <AnimatedSection>
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Capture Your Universe</h1>
          <p className="text-xl text-muted-foreground">
            Elevate your moments with our stellar photography services
          </p>
        </header>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Our Cosmic Packages</h2>
          <Tabs value={selectedPackage} onValueChange={setSelectedPackage} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {packages.map((pkg) => (
                <TabsTrigger key={pkg.name} value={pkg.name} className="text-lg">
                  {pkg.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {packages.map((pkg) => (
              <TabsContent key={pkg.name} value={pkg.name}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-xl">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold mb-4">{pkg.price}</p>
                    <ul className="list-disc pl-5 space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full">Choose {pkg.name}</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Our Stellar Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <DroneSection />
      </AnimatedSection>

    
    </div>
    </div>
    </div>
  )
}


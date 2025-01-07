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
import Head from 'next/head'

const packages = [
  {
    name: "Basic",
    description: "Perfect for intimate events and personal shoots in Bilaspur",
    price: "₹30000",
    features: [
      "4 hours of professional photography coverage",
      "100 professionally edited digital photos",
      "Online gallery accessible anywhere",
      "Expert photographer from Bilaspur"
    ]
  },
  {
    name: "Medium",
    description: "Ideal for weddings and events in Bilaspur with comprehensive coverage",
    price: "₹70000",
    features: [
      "8 hours of premium wedding photography",
      "300 expertly edited digital photos",
      "Online gallery + USB drive delivery",
      "2 professional Bilaspur photographers",
      "Complimentary pre-wedding shoot"
    ]
  },
  {
    name: "Advanced",
    description: "Ultimate luxury wedding photography package in Bilaspur",
    price: "₹100000+",
    features: [
      "Full day wedding photography coverage (up to 12 hours)",
      "500+ professionally edited wedding photos",
      "Premium online gallery, USB drive, and luxury wedding album",
      "2 expert photographers + 1 assistant for complete coverage",
      "Pre-wedding shoot and wedding ceremony coverage",
      "Aerial drone wedding photography included"
    ]
  }
]

const services = [
  { 
    name: "Wedding Photography", 
    icon: <Heart className="h-8 w-8 mb-2 text-pink-500" />,
    description: "Best wedding photography services in Bilaspur, capturing your special moments"
  },
  { 
    name: "Pre-Wedding Shoot", 
    icon: <Camera className="h-8 w-8 mb-2 text-blue-500" />,
    description: "Professional pre-wedding photography in scenic Bilaspur locations"
  },
  { 
    name: "Birthday Celebrations", 
    icon: <Cake className="h-8 w-8 mb-2 text-yellow-500" />,
    description: "Expert birthday party photographer in Bilaspur"
  },
  { 
    name: "Portfolio Shoot", 
    icon: <Sparkles className="h-8 w-8 mb-2 text-purple-500" />,
    description: "Professional portfolio photography in Bilaspur"
  },
  { 
    name: "Corporate Events", 
    icon: <Briefcase className="h-8 w-8 mb-2 text-gray-500" />,
    description: "Top corporate event photography services in Bilaspur"
  },
  { 
    name: "Concert & Music", 
    icon: <Music className="h-8 w-8 mb-2 text-red-500" />,
    description: "Expert concert and music event photography in Bilaspur"
  },
  { 
    name: "Family Portraits", 
    icon: <Users className="h-8 w-8 mb-2 text-green-500" />,
    description: "Professional family portrait photography in Bilaspur"
  },
  { 
    name: "Travel & Adventure", 
    icon: <Plane className="h-8 w-8 mb-2 text-cyan-500" />,
    description: "Adventure and travel photography services in Bilaspur"
  },
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
    <>
      <Head>
        <title>Best Wedding Photographer in Bilaspur, HP | Professional Photography Services</title>
        <meta name="description" content="Looking for the best wedding photographer in Bilaspur? We offer premium wedding photography, pre-wedding shoots, and event photography services in Bilaspur, HP. Trusted by 1000+ couples." />
        <meta name="keywords" content="best photographer in bilaspur, wedding photographer bilaspur, pre wedding shoot bilaspur, event photographer bilaspur, professional photographer bilaspur hp" />
        <meta property="og:title" content="Best Wedding Photographer in Bilaspur, HP | Professional Photography Services" />
        <meta property="og:description" content="Premium wedding photography services in Bilaspur. Book your wedding photographer today!" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.hariomstudiobilaspur.in/services" />
      </Head>
      
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <AnimatedSection>
            <header className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-4">Best Wedding Photography in Bilaspur</h1>
              <p className="text-xl text-muted-foreground">
                Trusted by 1000+ couples for capturing their perfect moments in Bilaspur, Himachal Pradesh
              </p>
              {/* <div className="mt-4 text-lg">
                <address className="not-italic">
                  Located at: Gandhi Market Rd, Upper Nihal, Bilaspur, HP 174001
                  <br />
                  Contact: <a href="tel:+919318869181" className="text-blue-600">+91 93188 69181</a>
                </address>
              </div> */}
            </header>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-8">Wedding Photography Packages in Bilaspur</h2>
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
                      <button 
              onClick={() => {
                const phoneNumber = '919318869181';
                const message = 'Hi HariOm Studio! I\'m interested in booking a photography session. Can you please provide me with more information about your services and packages?';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity size-lg w-full"
            >
              Book Now
            </button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </AnimatedSection>

          <AnimatedSection>
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-8">Professional Photography Services in Bilaspur</h2>
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

          <AnimatedSection>
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us for Wedding Photography in Bilaspur?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Experience & Expertise</h3>
                  <p>With over 25+ years of experience capturing weddings in Bilaspur, we understand the local traditions and perfect locations for your special day.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Advanced Equipment</h3>
                  <p>We use the latest professional cameras and lenses to ensure your wedding photos are crystal clear and stunning.</p>
                </div>
              </div>
            </section>
          </AnimatedSection>
        </main>
      </div>
    </>
  )
}
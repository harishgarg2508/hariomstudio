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
import Footer from '../components/footer'
import Head from 'next/head'

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "HariOm Studio - Professional Photography Services in Bilaspur",
  "description": "Premium photography services in Bilaspur & Himachal Pradesh. Specializing in weddings, pre-wedding shoots, corporate events, and more.",
  "priceRange": "₹30000-₹100000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bilaspur",
    "addressRegion": "Himachal Pradesh",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.3260",
    "longitude": "76.7600"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "30000",
    "highPrice": "100000"
  }
}



const packages = [
  {
    name: "Basic",
    description: "Perfect for intimate events and personal shoots",
    price: "₹*****",
    features: [
      "4 hours of coverage",
      "100 edited digital photos",
      "Online gallery",
      "1 photographer"
    ]
  },
  {
    name: "Medium",
    description: "Ideal for medium-sized events and comprehensive coverage",
    price: "₹******",
    features: [
      "8 hours of coverage",
      "300 edited digital photos",
      "Online gallery + USB drive",
      "2 photographers",
      "Engagement or pre-event shoot"
    ]
  },
  {
    name: "Advanced",
    description: "The ultimate package for your most important moments",
    price: "₹*****",
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

export default function ServicesPage() {
  const [selectedPackage, setSelectedPackage] = useState(packages[1].name)

  return (
    <>
      <Head>
        <title>Best Photography Services in Bilaspur & Himachal Pradesh | Wedding & Events</title>
        <meta name="description" content="Premium photography services in Bilaspur. Specializing in wedding photography, pre-wedding shoots, corporate events. Packages starting from ₹30,000. Book now!" />
        <meta name="keywords" content="photography services Bilaspur, wedding photographer Himachal Pradesh, pre-wedding shoot packages, corporate event photography, birthday photoshoot Bilaspur, professional photographer near me, best photography services Himachal" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-HP" />
        <meta name="geo.placename" content="Bilaspur" />
        <link rel="canonical" href="https://hariomstudiobilaspur.in/services" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <AnimatedSection>
            <header className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-4 mt-8">
                Best Photography Services in Bilaspur & Himachal Pradesh
              </h1>
              <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
                Professional Photography for Weddings, Events & Corporate
              </h2>
              <p className="text-xl text-muted-foreground">
                Premium photography services tailored to capture your precious moments. 
                Serving Bilaspur, Himachal Pradesh, and surrounding areas.
              </p>
            </header>
          </AnimatedSection>

          

          <AnimatedSection>
            <section className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-8">Professional Photography Services</h2>
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
        <Footer />
      </div>
    </>
  )
}
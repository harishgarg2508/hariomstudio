"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Frame, Users, PenTool } from 'lucide-react'

const services = [
  { icon: Camera, title: "Event Photography", description: "Professional coverage for all your special events" },
  { icon: Frame, title: "Photo Frames", description: "Custom framing solutions for your precious memories" },
  { icon: Users, title: "Portrait Sessions", description: "Capturing personalities in perfect detail" },
  { icon: PenTool, title: "Photo Editing", description: "Professional retouching and enhancement services" },
]

export function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
          <p className="mt-4 text-muted-foreground">Comprehensive photography solutions for every need</p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="group relative overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-center">
                    <service.icon className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button asChild size="lg" className="animate-shimmer">
            <Link href="/services">Explore All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  service: {
    name: string
    icon: React.ReactNode
    description: string
  }
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-center">{service.icon}</div>
          <CardTitle className="text-center">{service.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-center">
            {service.description || `Capture the essence of your ${service.name.toLowerCase()} with our expert photographers in Bilaspur.`}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center">
          <button 
              onClick={() => {
                const phoneNumber = '919318869181';
                const message = 'Hi HariOm Studio! I\'m interested in booking a photography session. Can you please provide me with more information about your services and packages?';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Learn more
            </button>
         </CardFooter>
      </Card>
    </motion.div>
  )
}
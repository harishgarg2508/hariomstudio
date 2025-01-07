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
          <Button variant="outline">Learn More</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
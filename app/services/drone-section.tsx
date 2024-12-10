'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Video as Drone, Camera } from 'lucide-react'

export default function DroneSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden bg-black text-white">
      {/* Background Video */}
      <video 
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="/images/drone.mp4"
        muted
        autoPlay
        loop
        playsInline
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Rotating Drone in the Center */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-0"
        style={{ y: smoothY, rotate: smoothRotate }}
      >
        <Drone className="w-72 h-72 text-white opacity-20" />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ opacity, scale }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.h2 
            className="text-5xl font-bold mb-6 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elevate Your Perspective
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capture breathtaking moments from the skies with our cutting-edge drone photography
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-200">
              Discover Aerial Magic
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Side Icons and Text */}
      <motion.div 
        className="absolute bottom-8 left-8"
        initial={{ x: -100, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Camera className="w-12 h-12 text-white" />
      </motion.div>
      <motion.div 
        className="absolute bottom-8 right-8 text-right"
        initial={{ x: 100, opacity: 0 }}
        animate={isVisible ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-sm font-light">Drone Photography</p>
        <p className="text-2xl font-bold">Capture the Extraordinary</p>
      </motion.div>
    </section>
  )
}

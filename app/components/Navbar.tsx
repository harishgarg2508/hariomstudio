'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Image as ImageIcon, 
  Users, 
  MessageCircle, 
  Feather, 
  BookOpen 
} from 'lucide-react'

const navItems = [
  { 
    href: 'Gallary', 
    label: 'Gallery', 
    icon: ImageIcon,
    // description: 'Explore Captured Moments'
  },
  { 
    href: '/services', 
    label: 'Services', 
    icon: Camera,
    // description: 'Professional Photography'
  },
  { 
    href: '/about', 
    label: 'About',
    icon: Users,
    // description: 'Our Story & Passion'
  },
  { 
    href: '/blog', 
    label: 'Blog', 
    icon: BookOpen,
    // description: 'Insights & Inspiration'
  },
  { 
    href: '/contact', 
    label: 'Contact', 
    icon: MessageCircle,
    // description: 'Get In Touch'
  }
]

const AnimatedCameraIcon = () => {
  const [isFlashing, setIsFlashing] = useState(false)

  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing(true)
      setTimeout(() => setIsFlashing(false), 300)
    }, 5000)

    return () => clearInterval(flashInterval)
  }, [])

  return (
    <motion.div
      animate={{ 
        rotate: [0, 45 , 0],
        transition: { 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear" 
        }
      }}
      className="relative"
    >
      <Camera 
        className={`h-6 w-6 transition-all duration-300 ${
          isFlashing 
            ? 'text-yellow-300 scale-150 drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]' 
            : 'text-white/80'
        }`} 
      />
      {isFlashing && (
        <motion.div
          
          initial={{ opacity: 0.5, scale: 5.5 }}
          animate={{ 
            
            opacity: 0, 
            scale: 5,
            transition: { duration: 0.1 }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-300 rounded-full blur-2xl"
        />
      )}
    </motion.div>
  )
}

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }}
      className="fixed top-0 left-0 right-0 z-50 p-2"
    >
      <div className="w-full px-2">
        <div className="relative flex items-center justify-between">
          {/* Logo Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Feather className="text-white/80 h-6 w-6" />
            <span className="text-2xl font-bold text-white/90 tracking-wider">
              HariOm Studio
            </span>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-10 bg-black/40 backdrop-blur-xl rounded-3xl px-20 py-3 border  border-white shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.href}
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center space-y-1 relative group  cursor-pointer"
                >
                  <Link 
                    href={item.href}
                    className="flex flex-col items-center justify-center text-white/80 hover:text-white transition-all duration-300"
                  >
                    <Icon 
                      className={`h-5 w-24 mb-1 transition-all duration-300 ${
                        hoveredItem === item.href 
                          ? 'text-blue-300 scale-110' 
                          : 'text-white/60'
                      }`} 
                    />
                    <span className="text-xs font-medium text-white/80 group-hover:text-white">
                      {item.label}
                    </span>
                  </Link>
                  
                  {hoveredItem === item.href && (
                    <motion.div
                      layoutId="hover-description"
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/20 px-3 py-1 rounded-full text-xs text-white/80"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* {item.description} */}
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </nav>

          {/* Animated Camera Icon */}
          <AnimatedCameraIcon />
        </div>
      </div>

      {/* Subtle Background Glow */}
      {/* <div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-indigo-900/50 opacity-70 blur-3xl"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'
        }}
      /> */}
    </motion.header>
  )
}
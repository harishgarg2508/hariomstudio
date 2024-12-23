'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Camera, ImageIcon, Users, MessageCircle, Feather, BookOpen, Menu, X } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/services', label: 'Services', icon: Camera },
  { href: '/about', label: 'About', icon: Users },
  { href: '/blog', label: 'Cyber Cafe', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: MessageCircle }
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
        scale: [1, 1.1, 1],
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
          initial={{ opacity: 0.5, scale: 5 }}
          animate={{ 
            opacity: 0, 
            scale: 2,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Feather className="text-white/80 h-6 w-6" />
                <span className="text-2xl font-bold text-white/90 tracking-wider">
                  HariOm Studio
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-10  bg-black/40 backdrop-blur-xl rounded-3xl px-20 py-3 border border-white shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.href}
                  onHoverStart={() => setHoveredItem(item.href)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center space-y-1 relative group cursor-pointer"
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
                </motion.div>
              )
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Animated Camera Icon */}
          <div className="hidden md:block">
            <AnimatedCameraIcon />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl py-4 px-2 rounded-b-2xl border-t border-white/20"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.href}
                  whileTap={{ scale: 0.95 }}
                  className="mb-2 last:mb-0"
                >
                  <Link 
                    href={item.href}
                    className="flex items-center space-x-4 text-white/80 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Subtle Background Glow */} 
      <div 
        className="absolute inset-0 -z-10 bg-black "
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        }}
      />
    </motion.header>
  )
}




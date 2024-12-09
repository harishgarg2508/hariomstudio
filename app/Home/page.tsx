"use client";

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-start space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Camera className="w-12 h-12 text-primary mb-4" />
      </motion.div>
      
      <motion.h1
        className="text-6xl font-bold leading-tight"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Capturing Life's
        <br />
        <span className="text-primary">Beautiful Moments</span>
      </motion.h1>

      <motion.p
        className="text-xl text-muted-foreground max-w-md mt-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Professional photography services that transform ordinary moments into extraordinary memories. Let's create something beautiful together.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
          Book a Session
        </button>
      </motion.div>
    </div>
  );
}
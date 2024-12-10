"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ContactHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Contact Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Let's Connect</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Ready to capture your special moments? Get in touch and let's create something extraordinary together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
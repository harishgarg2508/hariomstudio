"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ServicesHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.pinimg.com/736x/a8/c0/ca/a8c0cacca6974e601e8274ab10a24de7.jpg"
          alt="Services Background"
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Blogs</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Typing...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
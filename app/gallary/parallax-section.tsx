'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function ParallaxSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div ref={ref} className="my-20 h-[50vh] md:h-[80vh] relative overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-10">
        <Image src="/images/parallax1.jpg" alt="Parallax 1" layout="fill" objectFit="cover" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute inset-0 z-20">
        <Image src="/images/parallax2.jpg" alt="Parallax 2" layout="fill" objectFit="cover" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute inset-0 z-30">
        <Image src="/images/parallax3.jpg" alt="Parallax 3" layout="fill" objectFit="cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center">Capturing Life's Moments</h2>
      </div>
    </div>
  )
}


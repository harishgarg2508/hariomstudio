"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg"
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
      {images.map((image, index) => (
        <motion.div
          key={image}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.2,
            rotateY: index === currentIndex ? 0 : 15,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      ))}
    </div>
  );
}


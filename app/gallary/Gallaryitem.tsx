'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GalleryItem as GalleryItemType } from '../types/gallery';

interface Props {
  item: GalleryItemType;
}

export function GalleryItem({ item }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-xl"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-square w-full overflow-hidden"
      >
        <img
          src={item.url}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="mt-2 text-sm">{item.description}</p>
          <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
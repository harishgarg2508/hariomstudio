'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GalleryItem as GalleryItemType } from '../types/gallery';
import { FullScreenSlider } from './FullScreenSlider';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface Props {
  item: GalleryItemType;
  items: GalleryItemType[];
  index: number;
}

export function GalleryItem({ item, items, index }: Props) {
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const handleImageError = () => {
    setImageError(true);
  };

  const renderThumbnail = () => {
    if (item.type === 'video') {
      const videoId = item.url.split('v=')[1];
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      return (
        <div className="relative w-full h-full">
          <Image
            src={thumbnailUrl}
            alt={item.title || 'Video thumbnail'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleImageError}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-12 w-12 text-white opacity-70" />
          </div>
        </div>
      );
    } else {
      return (
        <Image
          src={item.url}
          alt={item.title || 'Gallery image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={handleImageError}
        />
      );
    }
  };

  return (
    <>
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
          className="relative aspect-square w-full overflow-hidden cursor-pointer"
          onClick={() => setIsFullScreenOpen(true)}
        >
          {imageError ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              Image not available
            </div>
          ) : (
            renderThumbnail()
          )}
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

      {isFullScreenOpen && (
        <FullScreenSlider
          items={items}
          initialIndex={index}
          onClose={() => setIsFullScreenOpen(false)}
        />
      )}
    </>
  );
}


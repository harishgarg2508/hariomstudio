'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { galleryData } from './Gallarydata';
import { FilterBar } from './Filterbar';
import { GalleryItem } from './Gallaryitem';
import { VideoItem } from './VideoItem';
const categories = Array.from(new Set(galleryData.map(item => item.category)));

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredItems = galleryData.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesType = selectedType === 'all' ? true : item.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            My Creative Portfolio
          </h1>
          <p className="mx-auto max-w-2xl text-gray-300">
            Explore my collection of work spanning photography, videos, and artistic creations.
            Each piece tells a unique story and represents my creative journey.
          </p>
        </motion.div>

        <FilterBar
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          categories={categories}
        />

        <motion.div
          layout
          className="grid auto-rows-[1fr] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredItems.map((item) => (
            item.type === 'video' ? (
              <VideoItem key={item.id} item={item} />
            ) : (
              <GalleryItem key={item.id} item={item} />
            )
          ))}
        </motion.div>
      </div>
    </section>
  );
}
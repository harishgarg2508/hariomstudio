'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { galleryData } from './Gallarydata';
import { FilterBar } from './FilterBar';
import { GalleryItem } from './Gallaryitem';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import Head from 'next/head';

const categories = Array.from(new Set(galleryData.map(item => item.category)));

// Structured data for local business
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Best Wedding Photography in Bilaspur & Himachal Pradesh",
  "description": "Professional wedding photography services in Bilaspur and across Himachal Pradesh. Capturing your special moments with artistic excellence.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bilaspur",
    "addressRegion": "Himachal Pradesh",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.3260",
    "longitude": "76.7600"
  },
  "priceRange": "₹₹₹",
  "servesCuisine": "Wedding Photography, Pre-wedding Shoots, Corporate Events"
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredItems = galleryData.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesType = selectedType === 'all' ? true : item.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <>
      <Head>
        <title>Best Wedding Photography in Bilaspur, Himachal Pradesh | Professional Photography Services</title>
        <meta name="description" content="Award-winning wedding photography services in Bilaspur and Himachal Pradesh. Specializing in pre-wedding shoots, traditional ceremonies, and destination weddings. Book your session today!" />
        <meta name="keywords" content="wedding photography Bilaspur, best wedding photographer Himachal Pradesh, pre-wedding shoot Bilaspur, wedding photoshoot Himachal, professional photographer near me, destination wedding photography Himachal Pradesh, wedding videography Bilaspur, candid wedding photography, traditional wedding photography, budget wedding photographer Bilaspur" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-HP" />
        <meta name="geo.placename" content="Bilaspur" />
        <link rel="canonical" href="https://hariomstudiobilaspur.in/gallery" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div>
        <Navbar />
        <section className="min-h-screen bg-gradient-to-r from-gray-900 to-black py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1 className="mb-4 mt-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Best Wedding Photography in Bilaspur & Himachal Pradesh
              </h1>
              <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                Professional Wedding Photography Services Near You
              </h2>
              <p className="mx-auto max-w-2xl text-gray-300">
                Discover exceptional wedding photography services in Bilaspur and across Himachal Pradesh. 
                We specialize in capturing timeless moments through artistic pre-wedding shoots, 
                traditional ceremonies, and destination weddings.
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
              className="grid auto-rows-[2fr] grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4"
            >
              {filteredItems.map((item, index) => (
                <GalleryItem key={item.id} item={item} items={filteredItems} index={index} />
              ))}
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
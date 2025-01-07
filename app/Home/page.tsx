"use client";
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import Head from 'next/head';

const heroSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Hariom Studio - Premier Photography Services in Bilaspur HP",
  "description": "Expert photography services in Bilaspur, Himachal Pradesh. Wedding photography, pre-wedding shoots, and special events.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Hariom Studio",
    "image": "https://hariomstudiobilaspur.in/studio-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gandhi Market Rd, Upper Nihal",
      "addressLocality": "Bilaspur",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "174001"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.340292",
      "longitude": "76.763430"
    },
    "url": "https://hariomstudiobilaspur.in"
  }
};

export default function HeroSection() {
  return (
    <>
      <Head>
        <title>Hariom Studio - Best Photography Services in Bilaspur, Himachal Pradesh</title>
        <meta name="description" content="Transform your moments into timeless memories with Bilaspur's premier photography studio. Wedding, pre-wedding, corporate events, and family portraits." />
        <meta name="keywords" content="photography Bilaspur, wedding photographer HP, Hariom Studio, best photographer Himachal Pradesh, pre-wedding shoot Bilaspur" />
        
        <meta property="og:title" content="Hariom Studio - Capture Life's Beautiful Moments" />
        <meta property="og:description" content="Premier photography services in Bilaspur, HP. Specializing in weddings, events, and portraits." />
        <meta property="og:url" content="https://hariomstudiobilaspur.in" />
        
        <link rel="canonical" href="https://hariomstudiobilaspur.in" />
        
        <script type="application/ld+json">
          {JSON.stringify(heroSchema)}
        </script>
      </Head>

      <div className="flex flex-col items-start space-y-4" itemScope itemType="https://schema.org/PhotographyBusiness">
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
          itemProp="description"
        >
          Professional photography services in Bilaspur, HP. Specializing in weddings, pre-wedding shoots, corporate events, and creating timeless memories.
        </motion.p>

        <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={() => {
                const phoneNumber = '919318869181';
                const message = 'Hi HariOm Studio! I\'m interested in booking a photography session. Can you please provide me with more information about your services and packages?';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Session
            </button>
          </motion.div>
      </div>
    </>
  );
}
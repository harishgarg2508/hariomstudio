"use client";

import { motion } from "framer-motion";
import { Camera, Video, Award, Image as ImageIcon } from "lucide-react";
import { Equipment } from "./equipment";
import { ProfileHero } from "./profile";
import { Stats } from "./stats";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Metadata } from 'next';

// Enhanced structured data with more details
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Best Wedding Photography Studio in Bilaspur - HariOm Studio",
  "description": "Discover HariOm Studio - Bilaspur's premier photography studio specializing in wedding photography, pre-wedding shoots, and events. Professional equipment and experienced photographers.",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "HariOm Studio",
    "image": "https://hariomstudiobilaspur.in/logo.png",
    "priceRange": "₹₹₹",
    "telephone": "+91-9318869181",
    "email": "contact@hariomstudiobilaspur.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gandhi Market Rd, Upper Nihal",
      "addressLocality": "Bilaspur",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "174001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.340292",
      "longitude": "76.763430"
    },
    "areaServed": ["Bilaspur", "Himachal Pradesh", "Punjab", "Haryana"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Photography"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pre-Wedding Shoots"
          }
        }
      ]
    }
  }
};

// Metadata for the page
export const metadata: Metadata = {
  title: 'Best Wedding Photography Studio in Bilaspur | HariOm Studio',
  description: 'Leading photography studio in Bilaspur offering professional wedding photography, pre-wedding shoots, and event coverage. State-of-the-art equipment and experienced photographers.',
  keywords: 'best photography studio Bilaspur, wedding photographer Himachal Pradesh, pre-wedding shoot Bilaspur, professional photographer near me, photo studio equipment Bilaspur, HariOm Studio about',
  openGraph: {
    title: 'Best Wedding Photography Studio in Bilaspur | HariOm Studio',
    description: 'Premier photography services in Bilaspur and Himachal Pradesh. Professional equipment and experienced photographers for weddings and events.',
    url: 'https://hariomstudiobilaspur.in/about',
    type: 'website'
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article 
        itemScope 
        itemType="https://schema.org/AboutPage"
        className="flex flex-col min-h-screen"
      >
        <header className="w-full">
          <h1 className="sr-only">Best Wedding Photography Studio in Bilaspur - HariOm Studio</h1>
          <ProfileHero />
        </header>

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Premier Photography Services in Bilaspur & Himachal Pradesh
          </h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-center text-gray-600">
              Established in Bilaspur, HariOm Studio has been capturing precious moments 
              with artistic excellence. Our team of professional photographers specializes 
              in weddings, pre-wedding shoots, and special events.
            </p>
          </div>
        </section>

        <Stats />
        <Equipment />
        <Footer />
      </article>
    </main>
  );
}
"use client";

import { motion } from "framer-motion";
import { Camera, Video, Award, Image as ImageIcon } from "lucide-react";
import { Equipment } from "./equipment";
import { ProfileHero } from "./profile";
import { Stats } from "./stats";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Head from 'next/head';
import Script from 'next/script';

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Hariom Studio",
  "description": "Professional photography studio in Bilaspur, Himachal Pradesh specializing in wedding photography and events",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Hariom Studio",
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
    }
  }
};

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Hariom Studio - Premier Photography Services in Bilaspur</title>
        <meta name="description" content="Learn about Hariom Studio, Bilaspur's leading photography service. Professional equipment, skilled photographers, and years of experience in wedding and event photography." />
        <meta name="keywords" content="about Hariom Studio, photography studio Bilaspur, professional photographers HP, wedding photography experience, photo studio equipment Bilaspur" />
        <link rel="canonical" href="https://hariomstudiobilaspur.in/about" />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-0S2R4K96T3" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0S2R4K96T3');
        `}
      </Script>

      <main className="min-h-screen bg-background">
        <Navbar />
        <article itemScope itemType="https://schema.org/AboutPage">
          <ProfileHero />
          <Stats />
          <Equipment />
          <Footer />
        </article>
      </main>
    </>
  );
}
"use client";

import { ContactHero } from "./contact-hero";
import { ContactMap } from "./contact-map";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Head from 'next/head';

// Structured data for the contact page
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact HariOm Studio - Best Photography Studio in Bilaspur",
  "description": "Get in touch with HariOm Studio for professional photography services in Bilaspur, Himachal Pradesh. Book your photography session today!",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "HariOm Studio",
    "image": "https://hariomstudiobilaspur.in/logo.png",
    "telephone": "+91-9318869181",
    "email": "contact@hariomstudiobilaspur.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Bus Stand",
      "addressLocality": "Bilaspur",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "174001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.3260",
      "longitude": "76.7600"
    },
    "url": "https://hariomstudiobilaspur.in/contact",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  }
};

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Best Photography Studio in Bilaspur | HariOm Studio</title>
        <meta name="description" content="Contact HariOm Studio for professional photography services in Bilaspur. Book wedding photography, pre-wedding shoots, and events. Visit our studio near Bus Stand, Bilaspur, HP." />
        <meta name="keywords" content="contact photographer Bilaspur, book wedding photographer Himachal Pradesh, photography studio near me, best photography studio Bilaspur, photography services contact, HariOm Studio contact" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-HP" />
        <meta name="geo.placename" content="Bilaspur" />
        <link rel="canonical" href="https://hariomstudiobilaspur.in/contact" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <main className="min-h-screen bg-background">
        <Navbar />
        <ContactHero />
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Best Photography Studio in Bilaspur</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
        <ContactMap />
        <Footer />
      </main>
    </>
  );
}
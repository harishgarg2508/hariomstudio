'use client'

import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Phone, MapPin, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  // Schema markup for local business
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "HariOm Studio",
    "image": "https://www.hariomstudiobilaspur.in/logo.png",
    "description": "Professional photography studio in Bilaspur, Himachal Pradesh, specializing in wedding photography, pre-wedding shoots, and event photography.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gandhi Market Rd, Upper Nihal",
      "addressLocality": "Bilaspur",
      "addressRegion": "Himachal Pradesh",
      "postalCode": "174001",
      "addressCountry": "IN"
    },
    "telephone": "+919318869181",
    "priceRange": "₹₹₹",
    "openingHours": "Mo-Su 09:00-19:00"
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Studio Information */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            HariOm Studio - Best Photography in Bilaspur
          </h2>
          <p className="text-gray-300 text-center md:text-left mb-4">
            Professional Photography Services in Bilaspur, Himachal Pradesh
          </p>
          <ul className="text-sm text-gray-400 space-y-2 text-center md:text-left">
            <li>✨ Wedding Photography in Bilaspur</li>
            <li>📸 Pre-Wedding Shoot Specialists</li>
            <li>🎉 Event Photography Services</li>
            <li>👔 Corporate Photography</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-xl font-semibold mb-3">Contact Best Photographers in Bilaspur</h3>
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-400" size={24} />
            <a href="tel:+919318869181" className="hover:text-blue-400 transition-colors">
              +91 93188 69181
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="text-blue-400" size={24} />
            <a href="mailto:hariomstudiobilaspur1@gmail.in" className="hover:text-blue-400 transition-colors">
              hariomstudiobilaspur1@gmail.com </a>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-400" size={24} />
            <span>Open 9 AM - 7 PM (All Days)</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={24} />
            <address className="not-italic text-gray-300">
              Gandhi Market Rd, Upper Nihal,<br />
              Bilaspur, Himachal Pradesh 174001<br />
              <span className="text-sm">(Near Bus Stand)</span>
            </address>
          </div>
        </div>

        {/* Social Media and Services */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-xl font-semibold mb-3">Connect With Bilaspur's Top Photographers</h3>
          <div className="flex space-x-6 mb-6">
            <a 
              href="https://facebook.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={28} />
            </a>
            <a 
              href="https://instagram.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={28} />
            </a>
            <a 
              href="https://twitter.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="Follow us on Twitter"
            >
              <Twitter size={28} />
            </a>
            <a 
              href="https://youtube.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
              aria-label="Subscribe on YouTube"
            >
              <Youtube size={28} />
            </a>
          </div>
          <div className="text-sm text-gray-400 space-y-2">
            <p>Areas Served:</p>
            <p>Bilaspur • Hamirpur • Kangra • chandigarh • Kullu • Mandi • Shimla • Solan • Himachal Pradesh • Punjab • Haryana </p>
            <p>Services:</p>
            <p>Wedding Photography • Pre-Wedding Shoots • Maternity Shoots • Birthday Parties • Corporate Events • Product Photography</p>
          </div>
        </div>
      </div>

      {/* Copyright and Awards */}
      <div className="border-t border-gray-700 mt-8 pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} HariOm Studio - Professional Photographers in Bilaspur, HP. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
              Best Wedding Photography
            </span>
            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
              Top Rated in Bilaspur
            </span>
            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
             Best Photographer in Bilaspur
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
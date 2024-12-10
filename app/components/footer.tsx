import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Studio Logo and Branding */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            HariOm Studio
          </h2>
          <p className="text-gray-300 text-center md:text-left">
            Capturing Moments, Creating Memories
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-400" size={24} />
            <span>+91 93188 69181</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-blue-400" size={24} />
            <span>Gandhi Market Rd, Upper Nihal, Bilaspur, HP 174001</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-6">
            <a 
              href="https://facebook.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Facebook size={28} />
            </a>
            <a 
              href="https://instagram.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              <Instagram size={28} />
            </a>
            <a 
              href="https://twitter.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <Twitter size={28} />
            </a>
            <a 
              href="https://youtube.com/hariomstudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <Youtube size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Additional Info */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} HariOm Studio. All Rights Reserved.
          <span className="ml-4 text-xs bg-blue-600 text-white px-2 py-1 rounded">
            Photography Excellence
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
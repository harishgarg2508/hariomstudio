"use client";

import { ContactHero } from "./contact-hero";
import { ContactMap } from "./contact-map";
import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ContactHero />
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <ContactMap />
      <Footer />
    </main>
  );
}
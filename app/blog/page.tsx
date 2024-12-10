"use client";

import { ServicesHero } from "./ServicesHero";
import { ServiceCategories } from "./ServiceCategories";
import { StudentUpdates } from "./StudentUpdates";
import { AstrologyServices } from "./AstrologyServices";
import { PhotoServices } from "./PhotoServices";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
        <Navbar />
      <ServicesHero />
      <ServiceCategories />
      <StudentUpdates />
      <PhotoServices />
      <AstrologyServices />
      <Footer />
    </main>
  );
}
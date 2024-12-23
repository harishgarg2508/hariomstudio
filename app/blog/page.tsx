"use client";

import { ServicesHero } from "./ServicesHero";
import { ServiceCategories } from "./ServiceCategories";
import { StudentUpdates } from "./StudentUpdates";
import { AstrologyServices } from "./AstrologyServices";
import { PhotoServices } from "./PhotoServices";
import { PrintingServices } from "./cyber-cafe";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ServicesHero />
      <ServiceCategories />
      <section id="student-services">
        <StudentUpdates />
      </section>
      <section id="photo-services">
        <PhotoServices />
      </section>
      <section id="cyber-cafe">
        <PrintingServices />
      </section>
      <section id="astrology-services">
        <AstrologyServices />
      </section>
      <Footer />
    </main>
  );
}

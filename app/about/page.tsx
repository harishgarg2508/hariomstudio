"use client";

import { motion } from "framer-motion";
import { Camera, Video, Award, Image as ImageIcon } from "lucide-react";
import { Equipment } from "./equipment";
// import { ExperienceTimeline } from "./experience";
import { ProfileHero } from "./profile";
import { Stats } from "./stats";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProfileHero />
      <Stats />
      <Equipment />
      {/* <ExperienceTimeline /> */}
      <Footer />
    </main>
  );
}
// import { HeroSection } from "@/components/ui/hero-section";
'use client';
import HeroSection from "./Home/home";
import Navbar from "./components/Navbar";
import ImageSlider from "./gallary/Image-slider";
// import Gallery from "./gallery/page";
import ServicesHome from "./servicehome/servicehome";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen gradient-background">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left side - Hero content */}
            <div className="order-2 lg:order-1">
              <HeroSection />
            </div>
            
            {/* Right side - Image slider */}
            <div className="order-1 lg:order-2">
              <ImageSlider />
            </div>
          </div>

          {/* Services Section */}
          <div className="mt-20">
            <ServicesHome />
          </div>
          
        </div>
        <Footer />
      </div>
    </main>
  );
}


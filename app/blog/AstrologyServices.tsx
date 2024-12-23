"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Stars, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const astrologyServices = [
  {
    icon: Moon,
    title: "Birth Chart Analysis",
    description: "Detailed analysis of your natal chart and life path",
    duration: "60 minutes",
    price: "₹100",
  },
  {
    icon: Sun,
    title: "Yearly Predictions",
    description: "Comprehensive forecast for the coming year",
    duration: "90 minutes",
    price: "₹150",
  },
  {
    icon: Stars,
    title: "Relationship Compatibility",
    description: "Synastry and composite chart analysis",
    duration: "75 minutes",
    price: "₹125",
  },
  {
    icon: Compass,
    title: "Career Guidance",
    description: "Astrological career counseling and timing",
    duration: "60 minutes",
    price: "₹100",
  },
];

export function AstrologyServices() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Astrology Consultations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover insights about your life path through ancient astrological wisdom
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {astrologyServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <service.icon className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Duration:</span> {service.duration}
                </p>
                <p className="text-lg font-bold text-primary">{service.price}</p>
                <Button className="w-full">Book Consultation</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
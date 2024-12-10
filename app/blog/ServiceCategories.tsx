"use client";

import { motion } from "framer-motion";
import { Printer, Camera, GraduationCap, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    icon: GraduationCap,
    title: "Student Services",
    description: "Exam form filling, document processing, and educational support",
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Professional photography, passport photos, and custom frames",
    color: "bg-green-500/10",
    textColor: "text-green-500",
  },
  {
    icon: Printer,
    title: "Cyber Cafe",
    description: "Printing, scanning, and internet services",
    color: "bg-purple-500/10",
    textColor: "text-purple-500",
  },
  {
    icon: Stars,
    title: "Astrology",
    description: "Personal consultations and astrological guidance",
    color: "bg-orange-500/10",
    textColor: "text-orange-500",
  },
];

export function ServiceCategories() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg p-6 bg-card hover:shadow-lg transition-shadow"
            >
              <div className={`${category.color} p-3 rounded-full w-fit mb-4`}>
                <category.icon className={`h-6 w-6 ${category.textColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
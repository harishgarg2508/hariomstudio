"use client";

import { motion } from "framer-motion";
import { Printer, FileText, Image as ImageIcon, File } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Printer,
    title: "Document Printing",
    description: "Black & white and color printing services for all document types",
    price: "Starting at $0.10/page",
  },
  {
    icon: FileText,
    title: "Scanning Services",
    description: "High-quality document scanning with various format options",
    price: "Starting at $0.25/page",
  },
  {
    icon: ImageIcon,
    title: "Photo Printing",
    description: "Professional photo printing in multiple sizes",
    price: "Starting at $2/photo",
  },
  {
    icon: File,
    title: "Document Processing",
    description: "Document formatting, conversion, and processing services",
    price: "Starting at $5/document",
  },
];

export function PrintingServices() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Printing Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional printing services for all your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-purple-500/50"
            >
              <div className="mb-4 p-3 rounded-lg bg-purple-500/10 w-fit group-hover:bg-purple-500/20 transition-colors">
                <service.icon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <p className="text-sm font-medium text-purple-500 mb-4">{service.price}</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Order Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
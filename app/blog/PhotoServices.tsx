"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Frame, Image as ImageIcon } from "lucide-react";

const photoServices = [
  {
    icon: Camera,
    title: "Passport Photos",
    description: "Instant passport and visa photos that meet all official requirements",
    price: "Starting at $15",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  },
  {
    icon: Frame,
    title: "Custom Frames",
    description: "Wide selection of frames in various sizes and styles",
    price: "Starting at $25",
    image: "https://images.unsplash.com/photo-1544549999-f9b7d5f4d961",
  },
  {
    icon: ImageIcon,
    title: "Photo Albums",
    description: "Premium quality photo albums with customizable designs",
    price: "Starting at $40",
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443",
  },
];

export function PhotoServices() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Photography Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional photography solutions for all your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <service.icon className="h-6 w-6 mb-2" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{service.description}</p>
                <p className="text-sm font-medium">{service.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
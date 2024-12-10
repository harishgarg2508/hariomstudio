"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const equipment = [
  {
    category: "Cameras",
    items: [
      {
        name: "Sony A7R IV",
        image: "images/camera.jpeg",
        specs: "61MP Full-Frame Sensor",
      },
      {
        name: "Canon EOS R5",
        image: "images/camera2.jpeg",
        specs: "45MP Full-Frame Sensor",
      },
    ],
  },
  {
    category: "Drones",
    items: [
      {
        name: "DJI Mavic 3 Pro",
        image: "/images/drone1.jpeg",
        specs: "4/3 CMOS Hasselblad Camera",
      },
    ],
  },
  {
    category: "Lenses",
    items: [
      {
        name: "Sony 24-70mm f/2.8 GM",
        image: "/images/lens1.jpeg",
        specs: "Professional Zoom Lens",
      },
      {
        name: "Canon RF 85mm f/1.2L",
        image: "/images/lens2.jpeg",
        specs: "Portrait Prime Lens",
      },
    ],
  },
];

export function Equipment() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Professional Equipment
        </motion.h2>
        
        {equipment.map((category, categoryIndex) => (
          <div key={category.category} className="mb-16 last:mb-0">
            <h3 className="text-2xl font-semibold mb-8">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                    <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-300">{item.specs}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { Camera, Users, Award, Image as ImageIcon } from "lucide-react";

const stats = [
  { icon: Camera, label: "Photo Sessions", value: "1,500+" },
  { icon: Users, label: "Happy Clients", value: "1000+" },
  { icon: Award, label: "Awards Won", value: "50+" },
  { icon: ImageIcon, label: "Photos Delivered", value: "100,000+" },
];

export function Stats() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
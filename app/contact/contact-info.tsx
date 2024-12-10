"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Camera, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Studio Location",
    details: ["Gandhi Market Rd, Upper Nihal, Bilaspur, Himachal Pradesh 174001"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 93188 69181"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@johnanderson.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Weekend: By Appointment"],
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-muted-foreground">
          Whether you're looking to book a session, inquire about my services, or just want to say hello, I'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-8">
        {contactInfo.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className="bg-primary/10 p-3 rounded-lg">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-muted-foreground">
                  {detail}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
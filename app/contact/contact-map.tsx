"use client";

import { motion } from "framer-motion";

export function ContactMap() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-[400px] w-full bg-secondary relative overflow-hidden"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.6762645330805!2d76.76088797564505!3d31.340312574296906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39053f9575d35ba9%3A0xf6d2a41ade307522!2sHari%20Om%20Studio!5e0!3m2!1sen!2sin!4v1733814458734!5m2!1sen!2sin"
        width="100%"
        height="150%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale"
      />
    </motion.section>
  );
}

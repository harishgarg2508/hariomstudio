"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const updates = [
  {
    title: "University Exam Forms Open",
    deadline: "March 15, 2024",
    description: "Final semester examination forms are now available. Last date to apply without late fee.",
    urgent: true,
  },
  {
    title: "University Exam Forms Open",
    deadline: "March 15, 2024",
    description: "Final semester examination forms are now available. Last date to apply without late fee.",
    urgent: true,
  },
  {
    title: "University Exam Forms Open",
    deadline: "March 15, 2024",
    description: "Final semester examination forms are now available. Last date to apply without late fee.",
    urgent: true,
  },
  {
    title: "University Exam Forms Open",
    deadline: "March 15, 2024",
    description: "Final semester examination forms are now available. Last date to apply without late fee.",
    urgent: true,
  },
  {
    title: "Scholarship Applications",
    deadline: "March 30, 2024",
    description: "State merit scholarship applications are now being accepted.",
    urgent: false,
  },
  {
    title: "Document Verification Drive",
    deadline: "April 5, 2024",
    description: "Special camp for document verification and attestation.",
    urgent: false,
  },
];

export function StudentUpdates() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Student Updates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed about important deadlines, exam schedules, and educational opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((update, index) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              {update.urgent && (
                <div className="flex items-center gap-2 text-red-500 mb-4">
                  <Bell className="h-4 w-4 animate-pulse" />
                  <span className="text-sm font-medium">Urgent</span>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{update.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{update.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deadline: {update.deadline}</span>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
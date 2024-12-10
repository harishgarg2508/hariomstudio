import { motion } from "framer-motion";

const experiences = [
    {
      year: "2023",
      title: "National Geographic Feature",
      description: "Featured photographer in National Geographic's 'World in Focus' series",
    },
    {
      year: "2021",
      title: "Sony World Photography Awards",
      description: "First place in Professional Sports category",
    },
    {
      year: "2019",
      title: "International Photography Awards",
      description: "Gold medal in Nature Photography",
    },
    {
      year: "2017",
      title: "Wildlife Photographer of the Year",
      description: "Runner-up in Behavior: Mammals category",
    },
  ];
  
  export function ExperienceTimeline() {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Professional Journey
          </motion.h2>
  
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20" />
  
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                  <div className="bg-card p-6 rounded-lg shadow-lg">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded text-sm mb-3">
                      {experience.year}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
                    <p className="text-muted-foreground">{experience.description}</p>
                  </div>
                </div>
                <div className={index % 2 === 0 ? "md:order-2" : "md:order-1"} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
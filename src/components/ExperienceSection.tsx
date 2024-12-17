import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  company: string;
  logo: string | JSX.Element;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

const ExperienceSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const experiences: Experience[] = [
    {
      company: "Apple",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z"/>
        </svg>
      ),
      role: "Technical Support",
      period: "2023 - Present",
      description: [
        "Provide expert technical support for Apple products and services",
        "Resolve complex hardware and software issues effectively",
        "Maintain high customer satisfaction through clear communication",
        "Collaborate with team members to tackle technical problems"
      ],
      skills: ["Technical Support", "Problem Solving", "iOS", "macOS"]
    },
    {
      company: "Software Engineer",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      ),
      role: "Software Engineer",
      period: "2023 - Present",
      description: [
        "Developed custom web applications for clients",
        "Implemented full-stack solutions from concept to deployment",
        "Managed project lifecycles and client communication",
        "Created scalable and maintainable code"
      ],
      skills: ["React", "Next.js", "TypeScript", "PostgreSQL"]
    },
    {
      company: "UTSA",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/>
        </svg>
      ),
      role: "Research Assistant",
      period: "2023 - 2024",
      description: [
        "Conducted research in computer science",
        "Assisted in data collection and analysis",
        "Collaborated with faculty and researchers",
        "Contributed to academic publications"
      ],
      skills: ["Research", "Data Analysis", "Python", "Machine Learning"]
    }
  ];

  return (
    <section id="experience" className="relative py-20 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 
              'linear-gradient(to right, rgba(37, 99, 235, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Subtle Gradients */}
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"/>
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Journey</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-[1fr,2fr] gap-8 lg:gap-12">
          {/* Timeline Navigation */}
          <div className="relative space-y-4">
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-full text-left"
              >
                <div className={`relative p-6 rounded-2xl transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-white shadow-lg border border-blue-100' 
                    : 'bg-gray-50 hover:bg-white hover:shadow-md border border-transparent'
                }`}>
                  {/* Company Info */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeIndex === index ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {exp.logo}
                    </div>
                    <div>
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        activeIndex === index ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {exp.company}
                      </h3>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeIndex === index && (
                    <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[2px] h-12 bg-gradient-to-b from-blue-400 to-blue-600"/>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Experience Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {experiences[activeIndex].role}
                  </h3>
                  <p className="text-gray-600">
                    {experiences[activeIndex].company} · {experiences[activeIndex].period}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4 mb-8">
                  {experiences[activeIndex].description.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-2 bg-blue-500"/>
                      <p className="text-gray-600">{item}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Technologies & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experiences[activeIndex].skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600 border border-blue-100"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  company: string;
  logo: JSX.Element;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    company: "Apple",
    logo: (
      <svg viewBox="0 0 384 512" className="w-full h-full">
        <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
      </svg>
    ),
    role: "Apple Support College Program",
    period: "2023 - Present",
    description: [
      "Provided personalized technical support to customers, resolving complex issues across iOS, macOS, and Apple hardware.",
      "Streamlined troubleshooting processes, reducing average resolution time by 30%.",
      "Maintained high customer satisfaction ratings through empathetic communication and problem-solving.",
      "Collaborated with Apple teams to report software and hardware bugs, contributing to continuous product improvement."
    ],
    skills: ["Technical Support", "Problem Solving", "iOS", "macOS", "Automation", "Customer Success"]
  },
  {
    company: "Software Engineer",
    logo: (
      <svg viewBox="0 0 640 512" className="w-full h-full">
        <path fill="currentColor" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>
      </svg>
    ),
    role: "Software Engineer",
    period: "2023 - Present",
    description: [
      "Developed and deployed custom web applications for clients using React, Next.js, and TypeScript.",
      "Designed scalable backend systems with Python and Django to support dynamic client needs.",
      "Managed the full software development lifecycle, including requirements gathering, implementation, testing, and deployment.",
      "Optimized application performance and ensured seamless integration with third-party APIs.",
      "Provided ongoing maintenance and support, delivering high-quality solutions tailored to client requirements."
    ],
    skills: ["React", "Next.js", "TypeScript", "PostgreSQL", "Python", "Django", "REST APIs", "AWS",]
  },
  {
    company: "UTSA",
    logo: (
      <svg viewBox="0 0 640 512" className="w-full h-full">
        <path fill="currentColor" d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"/>
      </svg>
    ),
    role: "Research Assistant",
    period: "2023 - 2024",
    description: [
      "Researched data security, focusing on identifying data leaks in Android devices.",
      "Developed Python scripts to detect potential data leaks, improving detection efficiency by 30%.",
      "Collaborated with faculty and researchers to design experiments, analyze data, and contribute to a research paper for publication.",
      "Presented findings at a departmental seminar, effectively communicating complex methodologies and receiving positive feedback for clarity."
    ],    
    skills: ["Research", "Python", "Data Security", "Automation", "Data Analysis", "Android", "Scientific Writing", "Problem Solving"]
  }
];

const ExperienceButton = memo(({ 
  experience, 
  isActive, 
  onClick 
}: { 
  experience: Experience; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    initial={false}
    layout
    className="w-full text-left group relative"
  >
    <div className={`relative px-8 py-6 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl' 
        : 'bg-white hover:bg-slate-50'
    }`}>
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center p-3 transition-colors duration-300 ${
          isActive ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
        }`}>
          {experience.logo}
        </div>
        <div>
          <h3 className={`font-semibold transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
          }`}>
            {experience.company}
          </h3>
          <p className={`text-sm transition-colors duration-300 ${
            isActive ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {experience.period}
          </p>
        </div>
      </div>
      {/* Blue Line Indicator */}
      {isActive && (
        <div
          className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-400 to-indigo-600"
        />
      )}
    </div>
  </motion.button>
));


const ExperienceDetails = memo(({ experience }: { experience: Experience }) => (
  <div className="relative bg-white rounded-xl p-8 h-full">
    <div className="mb-8">
      <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 mb-6">
        <div className="w-6 h-6 text-slate-600 mr-2">
          {experience.logo}
        </div>
        <span className="text-sm font-medium text-slate-700">{experience.company}</span>
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mb-3">
        {experience.role}
      </h3>
      <p className="text-blue-600 font-medium">
        {experience.period}
      </p>
    </div>

    <div className="space-y-5 mb-10">
      {experience.description.map((item, index) => (
        <div 
          key={index}
          className="flex items-start gap-4"
        >
          <div className="w-2 h-2 rounded-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600"/>
          <p className="text-slate-600 leading-relaxed">{item}</p>
        </div>
      ))}
    </div>

    <div>
      <h4 className="text-lg font-semibold text-slate-900 mb-4">
        Key Technologies
      </h4>
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
));

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleExperienceClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section id="experience" className="relative py-32 bg-slate-50 overflow-hidden">
      {/* Refined Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(51 65 85) 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-70 blur-3xl"/>
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-full opacity-70 blur-3xl"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Refined Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-3">
            Professional Journey
          </h2>
          <h3 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6">
            Experience & Achievements
          </h3>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-[400px,1fr] gap-8 lg:gap-16">
          <div className="space-y-3">
            {experiences.map((exp, index) => (
              <ExperienceButton
                key={exp.company}
                experience={exp}
                isActive={activeIndex === index}
                onClick={() => handleExperienceClick(index)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200/80"
            >
              <ExperienceDetails experience={experiences[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default memo(ExperienceSection);
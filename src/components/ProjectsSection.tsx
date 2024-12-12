import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: 'coming-soon' | 'live';
  link?: string;
}

const ProjectPattern = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#fade)" />
    <g className="opacity-30">
      <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
      <path d="M 20 30 L 20 20 L 30 20" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M 70 20 L 80 20 L 80 30" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M 20 70 L 20 80 L 30 80" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M 70 80 L 80 80 L 80 70" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="50" y="48" fontSize="8" fill="currentColor" textAnchor="middle" className="uppercase">Coming</text>
      <text x="50" y="58" fontSize="8" fill="currentColor" textAnchor="middle" className="uppercase">Soon</text>
    </g>
  </svg>
);

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="relative overflow-hidden rounded-xl">
      {/* Gradient border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-50 group-hover:opacity-100 blur transition duration-300" />
      
      {/* Card Content */}
      <div className="relative bg-[#1A1A1A] p-4 sm:p-5 rounded-xl border border-blue-500/10 h-full">
        {/* Project Image/Pattern - Adjusted height for mobile */}
        <div className="relative h-32 sm:h-40 mb-4 overflow-hidden rounded-lg bg-[#0A0A0A] text-blue-500/50">
          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
            <ProjectPattern />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        </div>

        {/* Project Info - Improved mobile text sizing */}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack - Better wrapping on mobile */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link or Status - Touch-friendly sizing */}
        {project.status === 'live' ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition duration-200 py-1"
          >
            View Project
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        ) : (
          <span className="inline-flex items-center text-sm text-blue-400/70 py-1">
            Coming Soon
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const projects: Project[] = [
  {
    title: "AI Chat Platform",
    description: "Real-time chat application with AI-powered responses and sentiment analysis.",
    tech: ["React", "Node.js", "OpenAI"],
    status: 'live',
    link: "https://github.com/yourusername/project1"
  },
  {
    title: "E-commerce Dashboard",
    description: "Analytics dashboard for tracking sales, inventory, and customer behavior.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    status: 'coming-soon'
  },
  {
    title: "Crypto Portfolio Tracker",
    description: "Track and analyze cryptocurrency investments with real-time data.",
    tech: ["React", "Firebase", "Chart.js"],
    status: 'coming-soon'
  }
];

export default memo(function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#0A0A0A] py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Adjusted for mobile */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Featured Projects</h2>
          <div className="h-1 w-16 sm:w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Project Cards Grid - Improved mobile layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

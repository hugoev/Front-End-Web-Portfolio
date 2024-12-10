import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

const ProjectsSection: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with real-time inventory tracking, secure payment processing, and an intuitive admin dashboard.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates and team functionality.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Analytics Dashboard",
      description: "Interactive analytics dashboard with real-time data visualization.",
      tags: ["React", "D3.js", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen bg-[#030303] py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 
              `radial-gradient(circle at center, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '48px 48px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my latest work and technical achievements
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300`} />
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                {/* Project Title with Decorative Number */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <span className="text-8xl font-bold text-white/5 absolute top-4 right-8">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Project Description */}
                <p className="text-gray-400 mb-6 max-w-3xl">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-2 bg-gradient-to-r ${project.color} rounded-lg text-white font-medium opacity-90 hover:opacity-100 transition-all duration-300`}
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    View Code
                  </a>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-white/5 to-transparent rounded-tr-2xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-white/5 to-transparent rounded-bl-2xl rotate-180 opacity-20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <span>View More on GitHub</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
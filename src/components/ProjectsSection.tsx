import React, { memo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

// Types
interface Project {
  title: string;
  description: string;
  tech: string[];
  status: 'coming-soon' | 'live';
  link?: string;
  category: 'Web App' | 'Mobile App' | 'Desktop App';
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

// Components
const CategoryBadge = memo(({ category }: { category: Project['category'] }) => {
  const colors = {
    'Web App': 'from-blue-400/10 to-blue-500/10 text-blue-600 border-blue-200',
    'Mobile App': 'from-purple-400/10 to-purple-500/10 text-purple-600 border-purple-200',
    'Desktop App': 'from-emerald-400/10 to-emerald-500/10 text-emerald-600 border-emerald-200'
  };

  return (
    <span className={`
      text-xs font-medium px-3 py-1.5 
      bg-gradient-to-r ${colors[category]}
      rounded-full border
    `}>
      {category}
    </span>
  );
});

const TechBadge = memo(({ name }: { name: string }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
    <span className="text-sm text-gray-600">
      {name}
    </span>
  </div>
));

const LiveBadge = memo(() => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
    </span>
    <span className="text-xs font-medium text-green-700">Live Project</span>
  </div>
));

const ComingSoonBadge = memo(() => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
    </span>
    <span className="text-xs font-medium text-amber-700">Coming Soon</span>
  </div>
));

const ProjectCard = memo(({ project }: { project: Project }) => (
  <motion.div
    variants={cardVariants}
    className="group relative flex flex-col bg-white rounded-2xl transition-all duration-300 hover:shadow-xl"
  >
    {/* Card Header */}
    <div className="relative px-6 pt-6">
      <div className="flex items-start justify-between gap-4">
        <CategoryBadge category={project.category} />
        {project.status === 'live' ? <LiveBadge /> : <ComingSoonBadge />}
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-900">
        {project.title}
      </h3>
      <p className="mt-2 text-gray-600 line-clamp-2">
        {project.description}
      </p>
    </div>

    {/* Tech Stack */}
    <div className="px-6 mt-6">
      <div className="flex flex-wrap gap-3">
        {project.tech.map(tech => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>
    </div>

    {/* Card Footer */}
    <div className="mt-auto px-6 py-6 border-t border-gray-100">
      {project.status === 'live' ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group/link"
        >
          View Project
          <svg 
            className="ml-2 w-4 h-4 transform transition-transform group-hover/link:translate-x-0.5" 
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
      ) : (
        <button 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 cursor-not-allowed"
          disabled
        >
          In Development
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
            />
          </svg>
        </button>
      )}
    </div>
  </motion.div>
));

// Projects Data
const projects: Project[] = [
  {
    title: "Enterprise AI Chat Platform",
    description: "Advanced real-time communication platform with AI-powered responses, sentiment analysis, and contextual understanding for enhanced user interactions.",
    tech: ["React", "Node.js", "OpenAI", "Socket.io"],
    status: 'live',
    link: "https://github.com/yourusername/project1",
    category: 'Web App'
  },
  {
    title: "Analytics Dashboard Pro",
    description: "Enterprise-grade analytics platform providing real-time insights into business metrics, featuring advanced data visualization and predictive analytics.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Redux"],
    status: 'coming-soon',
    category: 'Web App'
  },
  {
    title: "DeFi Portfolio Manager",
    description: "Comprehensive cryptocurrency portfolio system with real-time market data integration, automated trading strategies, and advanced risk analytics.",
    tech: ["React Native", "Firebase", "TradingView", "WebSocket"],
    status: 'coming-soon',
    category: 'Mobile App'
  }
];

// Main Section Component
const ProjectsSection: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section id="projects" className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-base font-semibold text-blue-600 mb-3">
              PORTFOLIO
            </h2>
            <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Featured Projects
            </h3>
            <p className="text-gray-600">
              Explore a collection of my recent work and ongoing developments,
              showcasing expertise in web applications, mobile development, and user experience design.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>

          {/* View All Projects Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View All Projects
              <svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
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
    </LazyMotion>
  );
};

export default memo(ProjectsSection);
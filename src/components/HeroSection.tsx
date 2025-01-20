import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Types
interface Technology {
  readonly name: string;
  readonly color: string;
  readonly icon: string;
}

interface MousePosition {
  x: number;
  y: number;
}

interface SocialLink {
  readonly name: string;
  readonly href: string;
  readonly icon: JSX.Element;
}

// Static data
const TECHNOLOGIES: readonly Technology[] = [
  { name: 'React', color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
  { name: 'TypeScript', color: 'from-blue-400 to-indigo-500', icon: '📝' },
  { name: 'Node.js', color: 'from-green-400 to-emerald-500', icon: '🚀' },
  { name: 'Next.js', color: 'from-gray-700 to-gray-900', icon: '▲' }
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/hugoev',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hugoev',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

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

// Components
const FeatureCard = memo(({ tech, mousePosition }: { tech: Technology; mousePosition: MousePosition }) => {
  const shouldReduceMotion = useReducedMotion();
  const rotateX = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 8;
  const rotateY = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 8;

  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] transform-gp id=home">
      <motion.div
        className="relative w-full h-full rounded-2xl bg-white shadow-2xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-white opacity-50" />
        
        {/* Main Content */}
        <div className="relative h-full p-6 lg:p-8 flex flex-col">
          {/* Top Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="px-3 lg:px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100">
                <span className="text-sm font-medium text-gray-500">EXPERTISE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Available</span>
              </div>
            </div>
            
            <div>
              <motion.div 
                className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent mb-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {tech.name}
              </motion.div>
              <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                Specialized in building scalable applications with modern web technologies 
                and best practices.
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mt-6 lg:mt-8 flex-grow">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {[
                { 
                  name: 'Frontend Development', 
                  icon: (
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )
                },
                { 
                  name: 'Backend Architecture', 
                  icon: (
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  )
                },
                { 
                  name: 'Cloud Infrastructure', 
                  icon: (
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  )
                },
                { 
                  name: 'DevOps & CI/CD', 
                  icon: (
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  )
                }
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgb(249, 250, 251)' }}
                  className="p-3 lg:p-4 rounded-xl border border-gray-100 bg-white transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                      {skill.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm lg:text-base">{skill.name}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>San Antonio, TX</div>
              <div className="flex items-center gap-2">
                <span>View Full Profile</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

const Header = memo(() => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 sm:space-y-6">
    <motion.div variants={fadeInUp} className="space-y-2 sm:space-y-3">
      <div className="inline-block px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
        <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          SOFTWARE ENGINEER
        </span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        <span className="text-gray-900">Hello, I'm</span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Hugo Villarreal
        </span>
      </h1>
    </motion.div>

    <motion.p variants={fadeInUp} className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
      Crafting exceptional digital experiences through innovative solutions
      and cutting-edge technologies.
    </motion.p>
  </motion.div>
));

const TechStack = memo(({ technologies, activeTech }: {
  technologies: readonly Technology[];
  activeTech: number;
}) => (
  <motion.div variants={fadeInUp} className="space-y-4">
    <div className="text-sm text-gray-500 font-medium">TECH STACK</div>
    <div className="flex flex-wrap gap-3">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          whileHover={{ scale: 1.05 }}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
            index === activeTech 
              ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100' 
              : 'bg-gray-50 border border-gray-100'
          }`}
        >
          <span className={`text-sm font-medium bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
            {tech.name}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

const SocialLinks = memo(({ links }: { links: readonly SocialLink[] }) => (
  <div className="flex space-x-3">
    {links.map((social) => (
      <motion.a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        className="p-3 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all duration-300"
      >
        {social.icon}
      </motion.a>
    ))}
  </div>
));

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const [activeTech, setActiveTech] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (shouldReduceMotion) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech(prev => (prev + 1) % TECHNOLOGIES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden pt-16 pb-8"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      id="home"
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Always visible */}
          <div className="space-y-8 sm:space-y-12 max-w-2xl mx-auto lg:max-w-none">
            <Header />
            <div className="hidden sm:block">
              <TechStack technologies={TECHNOLOGIES} activeTech={activeTech} />
            </div>
            <div className="space-y-6 sm:space-y-8">
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 sm:gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium shadow-lg shadow-blue-200 text-center"
                >
                  View Projects
                </motion.a>
                
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 font-medium transition-colors duration-300 text-center"
                >
                  Contact Me
                </motion.a>
              </motion.div>
              <SocialLinks links={SOCIAL_LINKS} />
            </div>
          </div>

          {/* Right Column - Feature Card */}
          <motion.div 
            variants={fadeInUp} 
            className="hidden lg:block w-full max-w-2xl mx-auto lg:max-w-none"
          >
            <AnimatePresence mode="wait">
              <FeatureCard 
                key={TECHNOLOGIES[activeTech].name}
                tech={TECHNOLOGIES[activeTech]} 
                mousePosition={mousePosition} 
              />
            </AnimatePresence>
          </motion.div>

          {/* Mobile Tech Stack - Only visible on small screens */}
          <div className="block sm:hidden">
            <TechStack technologies={TECHNOLOGIES} activeTech={activeTech} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default memo(HeroSection);
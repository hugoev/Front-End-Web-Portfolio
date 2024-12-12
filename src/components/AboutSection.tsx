import React, { useState, useRef, useCallback, memo } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#0A0A0A] py-24 overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 
            `linear-gradient(to right, #1E3A8A 1px, transparent 1px),
             linear-gradient(to bottom, #1E3A8A 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-4"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-1 w-20 bg-blue-600 mx-auto rounded-full mb-6"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Personal Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-50 blur" />
              <div className="relative p-6 bg-gray-900 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">My Journey</h3>
                <p className="text-gray-300 leading-relaxed">
                  Software engineer with a focus on building intuitive web applications 
                  and solving complex technical challenges. Previously worked at Apple, 
                  where I combined technical support expertise with development skills 
                  to create innovative solutions.
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "5+", label: "Years Experience" },
                { value: "50+", label: "Projects Completed" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur-sm" />
                  <div className="relative p-4 bg-gray-900 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-50 blur" />
            <div className="relative p-8 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-6">Core Technologies</h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Frontend Development",
                    items: ["React", "TypeScript", "Next.js", "TailwindCSS"]
                  },
                  {
                    title: "Backend & Infrastructure",
                    items: ["Node.js", "AWS", "PostgreSQL", "Docker"]
                  }
                ].map((category, index) => (
                  <div key={category.title} className="space-y-3">
                    <h4 className="text-gray-200 font-medium">{category.title}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.6 + itemIndex * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span className="text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 
                           text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Let's Connect
                  <svg
                    className="w-4 h-4 ml-2"
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
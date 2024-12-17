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
      className="relative min-h-screen bg-white py-24 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 
              `linear-gradient(to right, rgba(37, 99, 235, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(37, 99, 235, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
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
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-50 blur" />
              <div className="relative p-6 bg-white rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">My Journey</h3>
                <p className="text-gray-600 leading-relaxed">
                  Passionate software engineer with experience in building intuitive web applications 
                  and solving complex technical challenges. Specializing in modern web technologies 
                  and full-stack development, I focus on creating efficient, scalable solutions that 
                  deliver exceptional user experiences.
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "100k+", label: "Lines of Code" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-50 blur" />
                  <div className="relative p-6 bg-white rounded-lg border border-blue-100">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
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
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-50 blur" />
            <div className="relative p-8 bg-white rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-600 mb-6">Core Technologies</h3>
              
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
                    <h4 className="text-gray-900 font-medium">{category.title}</h4>
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
                          <span className="text-gray-600">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
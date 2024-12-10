import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const AboutSection: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skills = [
    { 
      category: "Development",
      items: ["Full Stack Development", "Web Applications", "API Integration", "Database Design"]
    },
    {
      category: "Technical",
      items: ["Problem Solving", "System Architecture", "Performance Optimization", "Technical Support"]
    },
    {
      category: "Tools",
      items: ["Version Control", "CI/CD", "Cloud Services", "Testing"]
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative min-h-screen bg-[#030303] py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 
              `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />

        {/* Gradient Orbs */}
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-30"
          style={{
            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />
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
            About Me
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate about crafting digital experiences and solving complex problems
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* About Text */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20" />
              <div className="relative bg-black/40 backdrop-blur-xl rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 leading-relaxed mb-4">
                  As a Software Engineer at Apple, I specialize in providing exceptional technical support
                  while leveraging my development expertise to create innovative solutions. My journey includes
                  freelance development and research experience at UTSA, giving me a unique perspective on
                  problem-solving and software development.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I'm passionate about building scalable applications and creating intuitive user experiences.
                  My approach combines technical excellence with creative problem-solving to deliver
                  exceptional results.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Years Experience", value: "3+" },
                { label: "Projects Completed", value: "20+" },
                { label: "Technologies", value: "15+" },
                { label: "Problems Solved", value: "100+" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300" />
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-lg p-4 border border-white/10">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + groupIndex * 0.1 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20" />
                <div className="relative bg-black/40 backdrop-blur-xl rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {skillGroup.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {skillGroup.items.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

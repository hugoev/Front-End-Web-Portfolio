import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTech, setActiveTech] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const technologies = [
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'TypeScript', color: 'from-blue-400 to-indigo-500' },
    { name: 'Node.js', color: 'from-green-400 to-emerald-500' },
    { name: 'Next.js', color: 'from-gray-400 to-gray-600' },
    { name: 'MongoDB', color: 'from-green-500 to-emerald-600' },
    { name: 'AWS', color: 'from-orange-400 to-red-500' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % technologies.length);
    }, 3000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  };

  const particlesArray = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-[#030303] overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(50,50,50,0.2) 0%, transparent 60%)`
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Particles */}
        {particlesArray.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            animate={{
              x: [particle.x + '%', (particle.x + Math.random() * 20 - 10) + '%'],
              y: [particle.y + '%', (particle.y + Math.random() * 20 - 10) + '%']
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              width: particle.size,
              height: particle.size
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: 
                `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Main Title */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block"
              >
                <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-mono tracking-wider mb-2">
                  SOFTWARE ENGINEER
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold">
                  <span className="text-white">Hello, I'm</span>
                  <br />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key="name"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                    >
                      Hugo
                    </motion.span>
                  </AnimatePresence>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-400 text-lg max-w-xl"
              >
                Crafting exceptional digital experiences through innovative solutions
                and cutting-edge technologies.
              </motion.p>
            </div>

            {/* Technology Stack */}
            <div className="space-y-4">
              <div className="text-sm text-gray-500 font-mono">TECH STACK</div>
              <div className="flex flex-wrap gap-3">
                <AnimatePresence mode="wait">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        background: index === activeTech ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className={`px-4 py-2 rounded-full cursor-pointer backdrop-blur-sm
                        ${index === activeTech ? 'ring-2 ring-white/20' : ''}`}
                    >
                      <span className={`text-sm bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group relative overflow-hidden px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
                <span className="relative text-white font-medium">View Projects</span>
              </a>
              
              <a
                href="#contact"
                className="group px-8 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all duration-300"
              >
                <span className="text-white font-medium">Contact Me</span>
              </a>
            </motion.div>

            {/* Social Links */}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex space-x-4"
            >
              {[
                {
                  name: 'GitHub',
                  href: 'https://github.com/hugoev',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  )
                },
                {
                  name: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/hugoev/',
                  target: '_blank',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )
                }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              perspective: '1000px',
              transform: `rotateX(${mousePosition.y * 10 - 5}deg) rotateY(${mousePosition.x * 10 - 5}deg)`
            }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30" />
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <motion.div
                    animate={{
                      background: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="px-4 py-1 rounded-md text-sm text-gray-400"
                  >
                    developer.ts
                  </motion.div>
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTech}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-gray-300"
                    >
                      <div>
                        <span className="text-pink-400">interface</span>{' '}
                        <span className="text-blue-400">Developer</span> {'{'}
                      </div>
                      <div className="pl-6">
                        <span className="text-purple-400">name</span>:{' '}
                        <span className="text-green-300">'Hugo'</span>;
                      </div>
                      <div className="pl-6">
                        <span className="text-purple-400">currentTech</span>:{' '}
                        <span className="text-green-300">'{technologies[activeTech].name}'</span>;
                      </div>
                      <div className="pl-6">
                        <span className="text-purple-400">expertise</span>: {'{'}
                      </div>
                      <div className="pl-8">
                        <span className="text-purple-400">years</span>:{' '}
                        <span className="text-orange-300">3</span>,
                      </div>
                      <div className="pl-8">
                        <span className="text-purple-400">level</span>:{' '}
                        <span className="text-green-300">'Advanced'</span>
                      </div>
                      <div className="pl-6">{'}'}</div>
                      <div>{'}'}</div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </motion.section>
  );
};

export default HeroSection;
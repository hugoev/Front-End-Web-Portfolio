import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Technology {
  readonly name: string;
  readonly color: string;
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

// Constants
const TECHNOLOGIES: readonly Technology[] = [
  { name: 'React', color: 'from-blue-400 to-blue-600' },
  { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
  { name: 'Node.js', color: 'from-blue-400 to-blue-500' },
  { name: 'Next.js', color: 'from-gray-400 to-gray-600' },
  //{ name: 'MongoDB', color: 'from-blue-300 to-blue-500' },
  //{ name: 'AWS', color: 'from-gray-300 to-blue-500' }
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

// Utility function for throttling
const useThrottledCallback = (callback: Function, delay: number) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args: any[]) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
};

// Memoized Components
const BackgroundGrid = memo(({ mousePosition }: { mousePosition: MousePosition }) => (
  <div className="absolute inset-0 opacity-[0.05]">
    <div
      className="h-full w-full"
      style={{
        backgroundImage: 
          `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
           linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
      }}
    />
  </div>
));
BackgroundGrid.displayName = 'BackgroundGrid';

const CodeContent = memo(({ tech }: { tech: string }) => (
  <>
    <div>
      <span className="text-blue-400">interface</span>{' '}
      <span className="text-blue-300">Developer</span> {'{'}
    </div>
    <div className="pl-6">
      <span className="text-gray-400">name</span>:{' '}
      <span className="text-blue-300">'Hugo Villarreal'</span>;
    </div>
    <div className="pl-6">
      <span className="text-gray-400">currentTech</span>:{' '}
      <span className="text-blue-300">'{tech}'</span>;
    </div>
    <div className="pl-6">
      <span className="text-gray-400">expertise</span>: {'{'}
    </div>
    <div className="pl-8">
      <span className="text-gray-400">years</span>:{' '}
      <span className="text-gray-300">5</span>,
    </div>
    <div className="pl-8">
      <span className="text-gray-400">level</span>:{' '}
      <span className="text-blue-300">'Senior'</span>
    </div>
    <div className="pl-6">{'}'}</div>
    <div>{'}'}</div>
  </>
));
CodeContent.displayName = 'CodeContent';

const FeatureCard = memo(({ tech, mousePosition }: { tech: string; mousePosition: MousePosition }) => {
  const rotateX = (mousePosition.y - 0.5) * 20;
  const rotateY = (mousePosition.x - 0.5) * 20;

  return (
    <div
      className="relative w-full aspect-[4/3] transform-gpu"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        {/* Main Card */}
        <div className="absolute inset-0 bg-[#0A0A0A] rounded-2xl border border-blue-500/20 shadow-2xl overflow-hidden">
          {/* Dynamic Background */}
          <div className="absolute inset-0">
            {/* Animated Gradients */}
            <div className="absolute inset-0 opacity-75">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-blue-500/20 to-transparent animate-gradient-x" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/20 to-blue-600/30 animate-gradient-y" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
            </div>
            
            {/* Animated Lines */}
            <div className="absolute inset-0">
              <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
                <motion.path
                  d="M0,50 Q25,40 50,50 T100,50"
                  stroke="url(#blue-gradient)"
                  strokeWidth="0.2"
                  fill="none"
                  animate={{
                    d: [
                      "M0,50 Q25,40 50,50 T100,50",
                      "M0,50 Q25,60 50,50 T100,50",
                      "M0,50 Q25,40 50,50 T100,50"
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="relative h-full p-8 flex flex-col justify-between">
            {/* Header with Tech Focus */}
            <div className="space-y-6">
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-2"
              >
                <div className="text-sm text-blue-400 tracking-wider">CURRENT FOCUS</div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    {tech}
                  </span>
                </div>
              </motion.div>

              {/* Animated Divider */}
              <div className="relative h-px w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </div>

            {/* Animated Skill Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Frontend', icon: '⚡️' },
                { name: 'Backend', icon: '🛠' },
                { name: 'Cloud', icon: '☁️' },
                { name: 'UI/UX', icon: '🎨' }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    type: "spring"
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative px-4 py-3 bg-blue-500/5 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-colors duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="relative flex items-center gap-2">
                    <span className="text-lg">{skill.icon}</span>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Footer */}
            <div className="mt-6 pt-6 border-t border-blue-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm text-blue-400">Open to Opportunities</span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-blue-500/10 rounded-full"
                >
                  <span className="text-sm text-gray-400">San Antonio, TX</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Shadow */}
        <div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-blue-500/10 blur-2xl rounded-full"
          style={{
            transform: `translateX(-50%) translateZ(-100px) rotateX(90deg)`
          }}
        />
      </motion.div>
    </div>
  );
});
FeatureCard.displayName = 'FeatureCard';

const Header = memo(() => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="inline-block"
    >
      <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-blue-400 font-mono tracking-wider mb-2">
        SOFTWARE ENGINEER
      </div>
      <h1 className="text-6xl lg:text-7xl font-bold">
        <span className="text-gray-300">Hello, I'm</span>
        <br />
        <AnimatePresence mode="wait">
          <motion.span
            key="name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text"
          >
            Hugo Villarreal
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
));
Header.displayName = 'Header';

const TechStack = memo(({ technologies, activeTech }: {
  technologies: readonly Technology[];
  activeTech: number;
}) => (
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
              background: index === activeTech ? 'rgba(59, 130, 246, 0.1)' : 'rgba(75, 85, 99, 0.1)'
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`px-4 py-2 rounded-full cursor-pointer backdrop-blur-sm
              ${index === activeTech ? 'ring-2 ring-blue-500/20' : ''}`}
          >
            <span className={`text-sm bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
              {tech.name}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
));
TechStack.displayName = 'TechStack';

const CTAButtons = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.8 }}
    className="flex flex-wrap gap-4"
  >
    <a
      href="#projects"
      className="group relative overflow-hidden px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600"
      role="button"
      aria-label="View Projects"
    >
      <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
      <span className="relative text-white font-medium">View Projects</span>
    </a>
    
    <a
      href="#contact"
      className="group px-8 py-3 rounded-lg border border-gray-700 hover:bg-gray-800/50 transition-all duration-300"
      role="button"
      aria-label="Contact Me"
    >
      <span className="text-gray-300 font-medium">Contact Me</span>
    </a>
  </motion.div>
));
CTAButtons.displayName = 'CTAButtons';

const SocialLinks = memo(({ links }: { links: readonly SocialLink[] }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
    className="flex space-x-4"
  >
    {links.map((social) => (
      <motion.a
        key={social.name}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${social.name}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 transition-colors duration-300"
      >
        {social.icon}
      </motion.a>
    ))}
  </motion.div>
));
SocialLinks.displayName = 'SocialLinks';

const ScrollIndicator = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
  >
    <div className="flex flex-col items-center">
      <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
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
        className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center"
      >
        <div className="w-1 h-2 bg-gray-700 rounded-full mt-2" />
      </motion.div>
    </div>
  </motion.div>
));
ScrollIndicator.displayName = 'ScrollIndicator';

const MainContent = memo(({ isVisible, technologies, activeTech, socialLinks }: {
  isVisible: boolean;
  technologies: readonly Technology[];
  activeTech: number;
  socialLinks: readonly SocialLink[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="space-y-12"
  >
    <Header />
    <TechStack technologies={technologies} activeTech={activeTech} />
    <CTAButtons />
    <SocialLinks links={socialLinks} />
  </motion.div>
));
MainContent.displayName = 'MainContent';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0.5, y: 0.5 });
  const [activeTech, setActiveTech] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useThrottledCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    }
  }, 16);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTech(prev => (prev + 1) % TECHNOLOGIES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const backgroundStyle = useCallback(() => ({
    backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.03) 0%, transparent 60%)`
  }), [mousePosition.x, mousePosition.y]);

  const codeEditorStyle = useCallback(() => ({
    perspective: '1000px',
    transform: `rotateX(${mousePosition.y * 10 - 5}deg) rotateY(${mousePosition.x * 10 - 5}deg)`
  }), [mousePosition.x, mousePosition.y]);

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden"
      style={backgroundStyle()}
    >
      <div className="absolute inset-0">
        <BackgroundGrid mousePosition={mousePosition} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <MainContent
            isVisible={isVisible}
            technologies={TECHNOLOGIES}
            activeTech={activeTech}
            socialLinks={SOCIAL_LINKS}
          />

<motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <FeatureCard tech={TECHNOLOGIES[activeTech].name} mousePosition={mousePosition} />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </motion.section>
  );
};

export default memo(HeroSection);
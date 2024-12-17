import React, { memo, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useInView } from 'framer-motion';

// Types
interface StatCardProps {
  value: string;
  label: string;
}

interface TechCategoryProps {
  title: string;
  items: string[];
}

// Memoized Components
const BackgroundGrid = memo(() => (
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 
          `linear-gradient(to right, rgba(37, 99, 235, 0.1) 1px, transparent 1px),
           linear-gradient(to bottom, rgba(37, 99, 235, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    />
  </div>
));

const SectionHeader = memo(() => (
  <div className="text-center mb-20">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
    <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mb-6" />
  </div>
));

const JourneyCard = memo(() => (
  <div className="relative h-full">
    <div 
      className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-50 blur-md" 
      style={{ clipPath: 'inset(0 0 0 0 round 8px)' }}
    />
    <div className="relative h-full p-6 bg-white rounded-lg border border-blue-100">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">My Journey</h3>
      <p className="text-gray-600 leading-relaxed">
        Full-stack software engineer specializing in building innovative digital solutions with modern web technologies. 
        Combining technical expertise with a passion for user-centric design, I create scalable applications that solve 
        complex challenges and deliver seamless experiences. From architecting robust backend systems to crafting 
        intuitive user interfaces, I transform ideas into high-performance solutions that drive real-world impact.
      </p>
    </div>
  </div>
));

const StatCard = memo(({ value, label }: StatCardProps) => (
  <div className="relative h-full">
    <div 
      className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-50 blur-md" 
      style={{ clipPath: 'inset(0 0 0 0 round 8px)' }}
    />
    <div className="relative h-full p-6 bg-white rounded-lg border border-blue-100">
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  </div>
));

const TechCategory = memo(({ title, items }: TechCategoryProps) => (
  <div className="space-y-3 transform-gpu">
    <h4 className="text-gray-900 font-medium">{title}</h4>
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-center space-x-2">
          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-gray-600 truncate">{item}</span>
        </div>
      ))}
    </div>
  </div>
));

// Static data
const stats = [
  { value: "3+", label: "Years Building Solutions" },
  { value: "100k+", label: "Lines of Production Code" },
];

const technologies = [
  {
    title: "Frontend Development",
    items: [
      "React (Hooks, Context)",
      "TypeScript",
      "Next.js (SSR)",
      "TailwindCSS",
    ]
  },
  {
    title: "Backend & Infrastructure",
    items: [
      "Node.js (Express)",
      "AWS (Cloud)",
      "PostgreSQL (DB)",
      "Docker"
    ]
  }
];

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const y = useMotionValue(20);

  useEffect(() => {
    if (isInView) {
      y.set(0);
    }
  }, [isInView, y]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen bg-white py-24 overflow-hidden will-change-transform"
    >
      <BackgroundGrid />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="transform-gpu"
        >
          <SectionHeader />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Introduction */}
            <div className="flex flex-col space-y-6 h-full">
              {/* Journey Card - Takes up more vertical space */}
              <div className="flex-grow">
                <JourneyCard />
              </div>

              {/* Key Metrics - Fixed height */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>
            
            {/* Technical Expertise */}
            <div className="relative h-full">
              <div 
                className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-50 blur-md"
                style={{ clipPath: 'inset(0 0 0 0 round 8px)' }}
              />
              <div className="relative h-full p-8 bg-white rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-600 mb-6">Core Technologies</h3>
                <div className="space-y-6">
                  {technologies.map((category) => (
                    <TechCategory key={category.title} {...category} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Award, GitBranch } from 'lucide-react';

// Types
interface TechItem {
  name: string;
  description?: string;
  icon?: React.ReactNode;
  proficiency?: number;
}

interface TechCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: TechItem[];
}

interface Metric {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

// Component Props
interface StatCardProps {
  metric: Metric;
}

interface TechStackProps {
  categories: TechCategory[];
}

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Components
const StatCard = ({ metric }: StatCardProps) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
  >
    <div className="flex items-start gap-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        {metric.icon}
      </div>
      <div>
        <div className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {metric.value}
        </div>
        <div className="text-gray-600 font-medium mt-1">{metric.label}</div>
        <div className="text-gray-500 text-sm mt-2">{metric.description}</div>
      </div>
    </div>
  </motion.div>
);

const TechStack = ({ categories }: TechStackProps) => (
  <div className="space-y-8">
    {categories.map((category, index) => (
      <motion.div 
        key={category.title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { delay: index * 0.1, duration: 0.5 }
          }
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            {category.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.title}
            </h3>
            <p className="text-gray-500 text-sm">
              {category.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.items.map((item) => (
            <div 
              key={item.name}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 text-gray-900 font-medium">
                {item.icon && <span className="text-blue-600">{item.icon}</span>}
                <span>{item.name}</span>
              </div>
              {item.description && (
                <p className="text-gray-500 text-sm mt-1">
                  {item.description}
                </p>
              )}
              {item.proficiency && (
                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    style={{ width: `${item.proficiency}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

// Enhanced Data
const metrics: Metric[] = [
  { 
    value: "3+", 
    label: "Years Experience",
    description: "Building scalable web applications with modern technologies",
    icon: <Award className="w-6 h-6 text-blue-600" />
  },
  { 
    value: "100k+", 
    label: "Lines of Code",
    description: "Written across production applications and open-source projects",
    icon: <GitBranch className="w-6 h-6 text-blue-600" />
  },
];

const techCategories: TechCategory[] = [
  {
    title: "Frontend Development",
    description: "Building responsive and performant user interfaces",
    icon: <Code2 className="w-6 h-6 text-blue-600" />,
    items: [
      { 
        name: "React & TypeScript",
        description: "Component architecture, hooks, and type safety",
        proficiency: 90
      },
      { 
        name: "Next.js",
        description: "Server-side rendering and static site generation",
        proficiency: 85
      },
      { 
        name: "Tailwind CSS",
        description: "Utility-first styling and responsive design",
        proficiency: 95
      },
      { 
        name: "Angular",
        description: "Enterprise-grade applications",
        proficiency: 80
      }
    ]
  },
  {
    title: "Backend Development",
    description: "Creating secure and scalable server applications",
    icon: <Server className="w-6 h-6 text-blue-600" />,
    items: [
      { 
        name: "Node.js",
        description: "REST APIs and real-time applications",
        proficiency: 85
      },
      { 
        name: "PostgreSQL",
        description: "Database design and optimization",
        proficiency: 80
      },
      { 
        name: "AWS",
        description: "Cloud infrastructure and deployment",
        proficiency: 75
      },
      { 
        name: "Docker",
        description: "Containerization and orchestration",
        proficiency: 70
      }
    ]
  }
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-50" id="about">
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div variants={fadeIn} className="space-y-8">
            {/* Bio */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                My Journey
              </h3>
              <div className="prose">
                <p className="text-gray-600 leading-relaxed">
                  As a full-stack developer, I'm deeply passionate about crafting innovative 
                  digital solutions that make a meaningful impact. My approach combines technical 
                  expertise with a strong focus on user experience, ensuring that every project 
                  I undertake not only meets technical requirements but exceeds user expectations.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  I specialize in building scalable web applications using modern technologies 
                  and best practices. Whether it's optimizing performance, implementing complex 
                  features, or solving challenging problems, I'm committed to delivering 
                  high-quality solutions that drive results.
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {metrics.map((metric) => (
                <StatCard key={metric.label} metric={metric} />
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={fadeIn}>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-600 mb-8">
                Technical Expertise
              </h3>
              <TechStack categories={techCategories} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
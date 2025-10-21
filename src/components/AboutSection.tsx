import { motion } from 'framer-motion';
import { Award, Code2, GitBranch, Server } from 'lucide-react';
import React from 'react';

// Types remain the same
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

interface StatCardProps {
  metric: Metric;
}


// Animations remain the same
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

// Updated Components with consistent theming
const StatCard = ({ metric }: StatCardProps) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-start gap-4">
      <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
        {metric.icon}
      </div>
      <div>
        <div className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {metric.value}
        </div>
        <div className="text-gray-600 dark:text-gray-300 font-medium mt-1">{metric.label}</div>
        <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">{metric.description}</div>
      </div>
    </div>
  </motion.div>
);


// Data remains the same
const metrics: Metric[] = [
  { 
    value: "3+", 
    label: "Years Experience",
    description: "Building scalable web applications with modern technologies",
    icon: <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
  },
  { 
    value: "3", 
    label: "Professional Certifications",
    description: "Meta Full Stack Software Engineer, Amazon Software Developer, Microsoft AI/ML Engineer",
    icon: <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
  },
  { 
    value: "10+", 
    label: "Programming Languages",
    description: "Python, Java, TypeScript, JavaScript, Go, Rust, C, C#, C++, SQL",
    icon: <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
  },
  { 
    value: "100k+", 
    label: "Lines of Code",
    description: "Written across production applications and open-source projects",
    icon: <GitBranch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
  },
];

const techCategories: TechCategory[] = [
  {
    title: "Core Programming Languages",
    description: "Primary languages for backend and systems development",
    icon: <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    items: [
      { 
        name: "Python & Django",
        description: "Full-stack web development, REST APIs, data processing",
        proficiency: 95
      },
      { 
        name: "Go & Backend Services",
        description: "High-performance APIs, microservices, concurrent systems",
        proficiency: 90
      },
      { 
        name: "Java & Spring Boot",
        description: "Enterprise applications, microservices, Spring ecosystem",
        proficiency: 85
      },
      { 
        name: "TypeScript & JavaScript",
        description: "Modern frontend development, type safety, React/Angular/Vue",
        proficiency: 92
      }
    ]
  },
  {
    title: "Development & Infrastructure",
    description: "Tools and practices for modern software development",
    icon: <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    items: [
      { 
        name: "Cloud & AWS",
        description: "Cloud infrastructure, deployment, scalable systems",
        proficiency: 88
      },
      { 
        name: "Docker & CI/CD",
        description: "Containerization, automated deployment, DevOps practices",
        proficiency: 90
      },
      { 
        name: "Databases & SQL",
        description: "PostgreSQL, database design, query optimization",
        proficiency: 85
      },
      { 
        name: "Git & Version Control",
        description: "Collaborative development, branching strategies, code review",
        proficiency: 95
      }
    ]
  }
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900" id="about">
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div variants={fadeIn} className="space-y-8">
            {/* Bio */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                My Journey
              </h3>
              <div className="prose dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  As a full-stack developer with an interest in AI and machine learning, I specialize 
                  in building robust web applications using modern development practices. My approach 
                  focuses on creating scalable solutions that meet technical requirements while 
                  staying curious about emerging technologies and their potential applications.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                  I excel at building complete web applications from frontend to backend, with expertise 
                  in Python, Django, React, TypeScript, and cloud technologies. Whether it's creating 
                  user interfaces, designing APIs, or optimizing database performance, I'm committed 
                  to delivering high-quality solutions that drive real business value.
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
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
                Technical Expertise
              </h3>
              <div className="space-y-8">
                {techCategories.map((category, index) => (
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
                      <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {category.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((item) => (
                        <div 
                          key={item.name}
                          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center gap-3 text-gray-900 dark:text-white font-medium">
                            {item.icon && <span className="text-blue-600 dark:text-blue-400">{item.icon}</span>}
                            <span>{item.name}</span>
                          </div>
                          {item.description && (
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                              {item.description}
                            </p>
                          )}
                          {item.proficiency && (
                            <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
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
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
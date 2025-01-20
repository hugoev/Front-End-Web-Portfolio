import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Technology {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  proficiency: number;
  description: string;
  icon: JSX.Element;
  features: string[];
}

interface CategoryData {
  name: string;
  description: string;
  technologies: Technology[];
}

const TechStackSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Proficiency Circle Component
  const ProficiencyCircle = ({ percentage }: { percentage: number }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const [isVisible, setIsVisible] = useState(false);
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (circleRef.current) {
        observer.observe(circleRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div ref={circleRef} className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            className="stroke-current text-gray-100"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            className="stroke-current text-blue-600"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
    );
  };

  const categories: CategoryData[] = [
    {
      name: "Frontend Development",
      description: "Modern web application development",
      technologies: [
        {
          name: "React & Next.js",
          level: "Expert",
          proficiency: 95,
          description: "Building scalable frontend applications with modern React patterns",
          features: [
            "Component Architecture",
            "Performance Optimization",
            "State Management",
            "Server-Side Rendering"
          ],
          icon: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full">
              <circle r="2.05" fill="currentColor"/>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
          )
        },
        {
          name: "TypeScript",
          level: "Expert",
          proficiency: 92,
          description: "Type-safe development with advanced patterns",
          features: [
            "Type Systems",
            "Modern Features",
            "Code Organization",
            "Build Tools"
          ],
          icon: (
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="currentColor" d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.012z"/>
            </svg>
          )
        }
      ]
    },
    {
      name: "Backend Development",
      description: "Server-side architecture and APIs",
      technologies: [
        {
          name: "Node.js & Express",
          level: "Expert",
          proficiency: 90,
          description: "Server-side JavaScript development with modern frameworks",
          features: [
            "RESTful APIs",
            "GraphQL",
            "Authentication",
            "Microservices"
          ],
          icon: (
            <svg viewBox="0 0 256 282" className="w-full h-full">
            <path fill="currentColor" d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z"/>
            <path fill="currentColor" d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z"/>
          </svg>
          )
        },
        {
          name: "Python (Django/Flask)",
          level: "Expert",
          proficiency: 88,
          description: "Building robust backend systems with Python frameworks",
          features: [
            "Django & Flask",
            "API Development",
            "Database Design",
            "PEP Standards"
          ],
          icon: (
            <svg viewBox="0 0 448 512" className="w-full h-full">
              <path fill="currentColor" d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/>
            </svg>
          )
        }
      ]
    },
    {
      name: "DevOps & Tools",
      description: "Infrastructure and development tools",
      technologies: [
        {
          name: "Docker & Kubernetes",
          level: "Advanced",
          proficiency: 85,
          description: "Container orchestration and deployment automation",
          features: [
            "Containerization",
            "Orchestration",
            "Deployment",
            "Scaling"
          ],
          icon: (
            <svg  viewBox="0 0 640 512">
<path fill="currentColor" d="M349.9 236.3h-66.1v-59.4h66.1v59.4zm0-204.3h-66.1v60.7h66.1V32zm78.2 144.8H362v59.4h66.1v-59.4zm-156.3-72.1h-66.1v60.1h66.1v-60.1zm78.1 0h-66.1v60.1h66.1v-60.1zm276.8 100c-14.4-9.7-47.6-13.2-73.1-8.4-3.3-24-16.7-44.9-41.1-63.7l-14-9.3-9.3 14c-18.4 27.8-23.4 73.6-3.7 103.8-8.7 4.7-25.8 11.1-48.4 10.7H2.4c-8.7 50.8 5.8 116.8 44 162.1 37.1 43.9 92.7 66.2 165.4 66.2 157.4 0 273.9-72.5 328.4-204.2 21.4.4 67.6.1 91.3-45.2 1.5-2.5 6.6-13.2 8.5-17.1l-13.3-8.9zm-511.1-27.9h-66v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm78.1 0h-66.1v59.4h66.1v-59.4zm-78.1-72.1h-66.1v60.1h66.1v-60.1z"/>
</svg>
          )
        },
        {
          name: "CI/CD & Git",
          level: "Expert",
          proficiency: 92,
          description: "Version control and deployment automation",
          features: [
            "Git Workflows",
            "CI/CD Pipelines",
            "Testing",
            "Automation"
          ],
          icon: (
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="currentColor" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <section className="relative py-24 bg-white">
      {/* Modern subtle background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at center, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-2">
            Technical Proficiency
          </h2>
          <h3 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Core Technologies & Expertise
          </h3>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Building scalable web applications with modern technologies
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl shadow-sm">
            {categories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(index)}
                className={`
                  relative px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300
                  ${selectedCategory === index 
                    ? 'text-blue-600 bg-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Technology Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories[selectedCategory].technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
                  hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                  {/* Tech Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl p-2.5 text-blue-600">
                          {tech.icon}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${tech.level === 'Expert' 
                            ? 'bg-blue-100 text-blue-700' 
                            : tech.level === 'Advanced'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech.level}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{tech.name}</h4>
                      <p className="text-gray-600 text-sm">{tech.description}</p>
                    </div>
                  </div>

                  {/* Proficiency Circle */}
                  <div className="mb-6 flex justify-center">
                    <ProficiencyCircle percentage={tech.proficiency} />
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    {tech.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStackSection;
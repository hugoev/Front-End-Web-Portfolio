import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface Technology {
  name: string;
  proficiency: number;
  description: string;
  icon: JSX.Element;
  color: string;
}

interface TechnologiesData {
  Frontend: Technology[];
  Backend: Technology[];
  Tools: Technology[];
  [key: string]: Technology[];
}

interface ProficiencyBarProps {
  percentage: number;
  color: string;
}

const TechStackSection: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, [activeCategory]);

  const technologies: TechnologiesData = {
    Frontend: [
      {
        name: "React",
        proficiency: 90,
        description: "Component-based UI development",
        icon: (
          <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
            <title>React Logo</title>
            <circle r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        ),
        color: "from-blue-600 to-blue-400"
      },
      {
        name: "TypeScript",
        proficiency: 85,
        description: "Type-safe JavaScript development",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
          </svg>
        ),
        color: "from-blue-500 to-blue-300"
      },
      {
        name: "Next.js",
        proficiency: 80,
        description: "React framework for production",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.317 12.317 0 0 0 2.465-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
          </svg>
        ),
        color: "from-blue-700 to-blue-500"
      }
    ],
    Backend: [
      {
        name: "Node.js",
        proficiency: 85,
        description: "Server-side JavaScript runtime",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.998 24c-.321 0-.641-.084-.924-.247l-2.937-1.737c-.439-.245-.225-.332-.08-.382.585-.203.703-.25 1.327-.604.066-.037.152-.023.219.015l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.24l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.05-.139.142-.139.241v10.15c0 .097.055.189.137.236l2.408 1.392c1.308.654 2.107-.116 2.107-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.55l-2.304-1.325c-.57-.329-.924-.943-.924-1.597V6.921c0-.658.354-1.271.924-1.599l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.941.924 1.599v10.15c0 .658-.354 1.273-.924 1.602l-8.794 5.078c-.284.164-.604.247-.926.247zm2.219-6.939c-3.85 0-4.655-1.771-4.655-3.25 0-.142.114-.253.256-.253h1.136c.127 0 .233.092.254.217.172 1.161.683 1.746 3.01 1.746 1.853 0 2.64-.419 2.64-1.401 0-.566-.225-.986-3.102-1.27-2.406-.24-3.894-.77-3.894-2.697 0-1.775 1.497-2.833 4.008-2.833 2.818 0 4.213.979 4.391 3.081.006.069-.019.135-.062.186-.042.05-.103.079-.167.079h-1.139c-.12 0-.226-.084-.252-.202-.279-1.24-.947-1.638-2.771-1.638-2.039 0-2.277.711-2.277 1.242 0 .646.28.833 3.007 1.198 2.703.363 3.987.876 3.987 2.754 0 1.917-1.599 3.011-4.385 3.011z"/>
          </svg>
        ),
        color: "from-blue-500 to-blue-300"
      },
      {
        name: "Python",
        proficiency: 80,
        description: "General-purpose programming",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <g>
              <path d="M11.914,0C5.82,0,6.2,2.656,6.2,2.656l.007,2.752h5.814v.826H3.9S0,5.789,0,11.969s3.403,6,3.403,6h2.02V14.93s-.108-3.409,3.35-3.409h5.762s3.239.052,3.239-3.13V3.147S18.28,0,11.914,0ZM8.718,1.85a1.051,1.051,0,1,1-1.05,1.052A1.052,1.052,0,0,1,8.718,1.85Z"/>
              <path d="M12.087,24c6.093,0,5.714-2.656,5.714-2.656l-.007-2.752H11.98v-.826h8.121s3.9.445,3.9-5.735-3.4-6-3.4-6h-2.02v3.045s.108,3.409-3.35,3.409H9.463s-3.239-.052-3.239,3.13v5.244S5.72,24,12.087,24Zm3.2-1.85a1.051,1.051,0,1,1,1.05-1.052A1.052,1.052,0,0,1,15.283,22.15Z"/>
            </g>
          </svg>
        ),
        color: "from-blue-600 to-blue-400"
      }
    ],
    Tools: [
      {
        name: "Git",
        proficiency: 88,
        description: "Version control system",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
          </svg>
        ),
        color: "from-blue-500 to-blue-300"
      }
    ]
  };

  const ProficiencyBar: React.FC<ProficiencyBarProps> = ({ percentage, color }) => {
    const barRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!barRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(barRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div ref={barRef} className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className={`absolute h-full bg-gradient-to-r ${color} transform-gpu`}
          style={{
            width: isVisible ? `${percentage}%` : '0%',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'width',
            WebkitBackfaceVisibility: 'hidden',
            WebkitPerspective: '1000',
            WebkitTransform: 'translate3d(0,0,0)'
          }}
        />
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative min-h-screen bg-white py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(37, 99, 235, 0.3) 2px, transparent 2px)`,
            backgroundSize: '48px 48px',
            transform: 'translate3d(0,0,0)'
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl transform-gpu" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl transform-gpu" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 transform-gpu"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-50 rounded-full p-1 border border-blue-100">
            {Object.keys(technologies).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 transform-gpu ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies[activeCategory as keyof typeof technologies].map((tech, index) => (
            <motion.div
              key={tech.name}
              layout
              initial={!isInitialLoad ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative transform-gpu"
            >
              <div 
                className={`absolute -inset-0.5 bg-gradient-to-r ${tech.color} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300 transform-gpu`}
                style={{ willChange: 'opacity' }}
              />
              <div className="relative bg-white rounded-2xl p-6 border border-blue-100">
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300 transform-gpu">
                    {tech.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">
                    {tech.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm">
                  {tech.description}
                </p>

                {/* Optimized Proficiency Bar */}
                <ProficiencyBar percentage={tech.proficiency} color={tech.color} />
                
                <div className="text-sm text-gray-600 text-right">
                  {tech.proficiency}%
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
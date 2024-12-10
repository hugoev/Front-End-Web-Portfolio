
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TechStackSection: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');

  const technologies = {
    Frontend: [
      {
        name: "React",
        proficiency: 90,
        description: "Component-based UI development with modern features for interactivity",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
            <g>
              {/* Center dot */}
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              
              {/* Three rings forming the atom symbol */}
              <ellipse 
                cx="12" 
                cy="12" 
                rx="5" 
                ry="10" 
                transform="rotate(30 12 12)"
              />
              <ellipse 
                cx="12" 
                cy="12" 
                rx="5" 
                ry="10" 
                transform="rotate(150 12 12)"
              />
              <ellipse 
                cx="12" 
                cy="12" 
                rx="5" 
                ry="10" 
                transform="rotate(-90 12 12)"
              />
            </g>
          </svg>
        ),
        color: "from-cyan-400 to-blue-500"
      },
      {
        name: "TypeScript",
        proficiency: 85,
        description: "Type-safe JavaScript development for better scalability and maintainability",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
          </svg>
        ),
        color: "from-blue-400 to-blue-600"
      },
      {
        name: "Next.js",
        proficiency: 80,
        description: "React framework optimized for fast production-ready applications",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.317 12.317 0 0 0 2.465-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
          </svg>
        ),
        color: "from-gray-600 to-black"
      }
    ],
    Backend: [
      {
        name: "Node.js",
        proficiency: 85,
        description: "Server-side runtime for efficient and scalable JavaScript applications",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.998 24c-.321 0-.641-.084-.924-.247l-2.937-1.737c-.439-.245-.225-.332-.08-.382.585-.203.703-.25 1.327-.604.066-.037.152-.023.219.015l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.24l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.05-.139.142-.139.241v10.15c0 .097.055.189.137.236l2.408 1.392c1.308.654 2.107-.116 2.107-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.55l-2.304-1.325c-.57-.329-.924-.943-.924-1.597V6.921c0-.658.354-1.271.924-1.599l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.941.924 1.599v10.15c0 .658-.354 1.273-.924 1.602l-8.794 5.078c-.284.164-.604.247-.926.247zm2.219-6.939c-3.85 0-4.655-1.771-4.655-3.25 0-.142.114-.253.256-.253h1.136c.127 0 .233.092.254.217.172 1.161.683 1.746 3.01 1.746 1.853 0 2.64-.419 2.64-1.401 0-.566-.225-.986-3.102-1.27-2.406-.24-3.894-.77-3.894-2.697 0-1.775 1.497-2.833 4.008-2.833 2.818 0 4.213.979 4.391 3.081.006.069-.019.135-.062.186-.042.05-.103.079-.167.079h-1.139c-.12 0-.226-.084-.252-.202-.279-1.24-.947-1.638-2.771-1.638-2.039 0-2.277.711-2.277 1.242 0 .646.28.833 3.007 1.198 2.703.363 3.987.876 3.987 2.754 0 1.917-1.599 3.011-4.385 3.011z"/>
          </svg>
        ),
        color: "from-green-400 to-emerald-500"
      },
      {
        name: "Python",
        proficiency: 80,
        description: "General-purpose programming language for automation, AI, and scripting",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13v8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
          </svg>
        ),
        color: "from-blue-500 to-yellow-500"
      }
    ],
    Tools: [
      {
        name: "Git",
        proficiency: 88,
        description: "Version control and collaboration",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
          </svg>
        ),
        color: "from-orange-500 to-red-500"
      }
    ]
  };

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative min-h-screen bg-[#030303] py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '48px 48px'
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-xl rounded-full p-1">
            {Object.keys(technologies).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white'
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${tech.color} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300`} />
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 text-gray-300 group-hover:text-white transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-white">
                    {tech.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4 text-sm">
                  {tech.description}
                </p>

                {/* Proficiency Bar */}
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`absolute h-full bg-gradient-to-r ${tech.color}`}
                  />
                </div>
                <div className="text-sm text-gray-400 text-right">
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
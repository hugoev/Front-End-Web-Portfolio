import React from 'react';
import { motion } from 'framer-motion';

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  category: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  tags, 
  imageUrl, 
  liveUrl, 
  githubUrl 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group relative"
  >
    {/* Gradient border effect */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300" />
    
    {/* Card content */}
    <div className="relative flex flex-col bg-[#0A0A0A] rounded-xl overflow-hidden border border-blue-500/10">
      {/* Image container */}
      <div className="aspect-video relative overflow-hidden bg-[#1A1A1A]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full transition duration-300 group-hover:scale-105" 
        />
        
        {/* Overlay with buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
          <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition duration-300">
            <div className="flex gap-3">
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300 text-sm text-center backdrop-blur-sm"
              >
                Live Demo
              </a>
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition duration-300 text-sm text-center backdrop-blur-sm"
              >
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;
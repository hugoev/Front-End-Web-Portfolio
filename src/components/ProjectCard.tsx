// src/components/ProjectCard.tsx

import React from 'react';

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
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
    <div className="aspect-video bg-gray-100 relative overflow-hidden">
      <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white w-full">
          <div className="flex gap-3">
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
            >
              Live Demo
            </a>
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-900 transition duration-300 text-sm"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-1">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectCard;
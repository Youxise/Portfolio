'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, ArrowLeft } from 'lucide-react';
import { Project } from '@/lib/types';
import { ProjectViewer } from './ProjectViewer';

interface ProjectsFolderProps {
  projects: Project[];
  onProjectOpen: (project: Project) => void;
  isLoading: boolean;
}

export function ProjectsFolder({ projects, onProjectOpen, isLoading }: ProjectsFolderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Group projects by category
  const projectsByCategory = projects.reduce((acc, project) => {
    const category = project.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // Filter projects within each category based on search term
  const filteredProjectsByCategory = Object.entries(projectsByCategory).reduce((acc, [category, categoryProjects]) => {
    const filtered = categoryProjects.filter(project => {
      const matchesSearch = (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (project.stack && project.stack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesSearch;
    });
    
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, Project[]>);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    sessionStorage.setItem('selectedProject', JSON.stringify(project));
  };

  const goBackToProjects = () => {
    setSelectedProject(null);
    sessionStorage.removeItem('selectedProject');
  };

  // Add useEffect to restore selected project
  useEffect(() => {
    const savedProject = sessionStorage.getItem('selectedProject');
    if (savedProject) {
      try {
        const project = JSON.parse(savedProject);
        setSelectedProject(project);
      } catch (error) {
        console.error('Error parsing saved project:', error);
      }
    }
  }, []);

  // If a project is selected, show the project viewer
  if (selectedProject) {
    return (
      <div className="h-full flex flex-col">
        {/* Back Button */}
        <div className="p-4">
          <button
            onClick={goBackToProjects}
            className="flex items-center justify-center w-8 h-8 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Back to Projects"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Project Content */}
        <div className="flex-1 overflow-hidden">
          <ProjectViewer project={selectedProject} />
        </div>
      </div>
    );
  }

  // Show categorized project list
  return (
    <div className="h-full flex flex-col">
      {/* Header with search */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Projects</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>
      </div>
      
      {/* Categorized Projects */}
      <div className="flex-1 overflow-auto p-6">
        {Object.entries(filteredProjectsByCategory).map(([category, categoryProjects]) => (
          <div key={category} className="mb-8">
            {/* Category Header */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white/90 mb-2">{category}</h3>
              <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => openProject(project)}
                >
                  <div className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-200 group-hover:scale-[1.02]">
                    {/* Project Cover */}
                    {project.cover && (
                      <div className="mb-3 overflow-hidden rounded-md">
                        <img
                          src={project.cover}
                          alt={project.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Project Info */}
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h4>
                      <FileText className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors" />
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(project.stack || []).slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.stack?.length || 0) > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-white/50 rounded text-xs">
                          +{(project.stack?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        
        {Object.keys(filteredProjectsByCategory).length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/50">No projects found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { Project } from '@/lib/types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ExternalLink, Github, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProjectViewerProps {
  project: Project;
}

export function ProjectViewer({ project }: ProjectViewerProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && project.gallery) {
      setSelectedImageIndex((selectedImageIndex - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && project.gallery) {
      setSelectedImageIndex((selectedImageIndex + 1) % project.gallery.length);
    }
  };

  return (
    <div className="h-full overflow-auto">
      {/* Project Header */}
      <div className="p-6 border-b border-white/20 bg-gradient-to-r from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">{project.title}</h1>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(project.stack || []).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-blue-500/30 text-blue-200 rounded-full text-sm font-medium border border-blue-400/40 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white/15 text-white/80 rounded-md text-xs border border-white/25 shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, index) => {
                const isGithub = link.label.toLowerCase().includes('github');
                const isDemo = link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live');
                const Icon = isGithub ? Github : isDemo ? Globe : ExternalLink;
                
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 hover:border-white/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{link.label}</span>
                  </motion.a>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Project Cover Image */}
      {project.cover && (
        <div className="p-6 border-b border-white/10">
          <motion.img
            src={project.cover}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {/* Project Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MarkdownRenderer content={project.body} />
      </motion.div>
      
      {/* Project Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="p-6 border-t border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer bg-black/20 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => openModal(index)}
              >
                <img
                  src={image}
                  alt={`${project.title} gallery ${index + 1}`}
                  className="w-full h-64 object-contain rounded-lg border border-white/20 group-hover:border-white/40 transition-all"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    Click to enlarge
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && project.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            {project.gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative flex items-center justify-center w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.gallery[selectedImageIndex]}
                alt={`${project.title} gallery ${selectedImageIndex + 1}`}
                className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {project.gallery.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
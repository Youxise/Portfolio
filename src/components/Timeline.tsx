'use client';

import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Briefcase, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  period: string;
  description: string[];
  technologies?: string[];
  gpa?: string;
  thesis?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const { t } = useLanguage();
  
  return (
    <div className="relative max-w-6xl mx-auto p-8">
      {/* Central timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 opacity-60" />
      
      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center ${
                isLeft ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  className="w-4 h-4 bg-white border-4 border-blue-400 rounded-full shadow-lg"
                />
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  {item.type === 'education' ? (
                    <GraduationCap className="w-4 h-4 text-white" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-white" />
                  )}
                </motion.div>
              </div>
              
              {/* Content card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                className={`w-5/12 ${
                  isLeft ? 'mr-auto pr-4 ml-2' : 'ml-auto pl-4 mr-2'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15">
                  {/* Header */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div className="text-xs text-amber-300 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2 py-1 rounded-md border border-amber-400/30">
                        {item.period}
                      </div>
                    </div>
                    <p className="text-blue-200 font-medium text-sm">
                      {item.organization}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-1 mb-3">
                    {item.description.map((desc, i) => (
                      <p key={i} className="text-gray-200 text-sm leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>
                  

                  
                  {item.thesis && (
                    <div className="text-sm text-purple-300 mb-3">
                      <strong>{t('timeline.thesis')}:</strong> {item.thesis}
                    </div>
                  )}
                  
                  {/* Technologies */}
                  {item.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-full border border-blue-400/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
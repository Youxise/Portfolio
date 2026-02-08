'use client';

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  User, 
  FolderOpen,
  FileText,
  Image,
  Music,
  Video,
  Settings,
  Trash2,
  Monitor,
  LucideIcon
} from 'lucide-react';
import { useDoubleClick } from '@/hooks/useDoubleClick';
import { cn } from '@/lib/utils';

interface IconProps {
  id: string;
  title: string;
  icon: string;
  onDoubleClick: () => void;
  isMobile?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  User,
  FolderOpen,
  FileText,
  Image,
  Music,
  Video,
  Settings,
  Trash2,
  Monitor,
};

export function Icon({ id, title, icon, onDoubleClick, isMobile = false }: IconProps) {
  const IconComponent = iconMap[icon];
  const clickHandler = useDoubleClick(undefined, onDoubleClick, isMobile ? 300 : 500);

  if (!IconComponent) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center cursor-pointer group no-select",
        "focus-ring rounded-lg p-2",
        isMobile ? "w-16 h-20" : "w-20 h-24"
      )}
      onClick={clickHandler}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDoubleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${title}`}
    >
      {/* Icon Background */}
      <motion.div
        className={cn(
          "bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 border border-white/20",
          "group-hover:bg-white/20 transition-colors duration-200",
          isMobile ? "w-12 h-12" : "w-16 h-16"
        )}
        whileHover={{ y: -2 }}
      >
        <IconComponent 
          className={cn(
            "text-white drop-shadow-lg",
            isMobile ? "w-6 h-6" : "w-8 h-8"
          )} 
        />
      </motion.div>
      
      {/* Icon Label */}
      <span className={cn(
        "text-white text-center font-medium leading-tight drop-shadow-lg",
        "group-hover:text-white/90 transition-colors duration-200",
        isMobile ? "text-xs max-w-[60px]" : "text-sm max-w-[80px]"
      )}>
        {title}
      </span>
    </motion.div>
  );
}
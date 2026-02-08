'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FolderOpen, 
  FileText, 
  Image, 
  Music, 
  Video,
  Settings,
  Trash2,
  Monitor,
  Wifi,
  Battery,
  ChevronDown,
  Code,
  Zap,
  Sparkles,
  GraduationCap,
  Briefcase,
  User,
  Languages
} from 'lucide-react';

interface DesktopProps {
  onIconDoubleClick: (iconId: string) => void;
}

const getDesktopIcons = (t: any) => [
  { id: 'browser', title: t('desktop.icons.browser'), icon: 'Monitor', x: 50, y: 50 },
  { id: 'documents', title: t('desktop.icons.documents'), icon: 'FileText', x: 50, y: 150 },
  { id: 'pictures', title: t('desktop.icons.pictures'), icon: 'Image', x: 50, y: 250 },
  { id: 'music', title: t('desktop.icons.music'), icon: 'Music', x: 50, y: 350 },
  { id: 'videos', title: t('desktop.icons.videos'), icon: 'Video', x: 150, y: 50 },
  { id: 'settings', title: t('desktop.icons.settings'), icon: 'Settings', x: 150, y: 150 },
  { id: 'trash', title: t('desktop.icons.trash'), icon: 'Trash2', x: 150, y: 250 },
];

export function Desktop({ onIconDoubleClick }: DesktopProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const iconComponents = useMemo(() => {
    const desktopIcons = getDesktopIcons(t);
    return desktopIcons.map((icon) => (
      <motion.div
        key={icon.id}
        className="absolute cursor-pointer select-none"
        style={{ left: icon.x, top: icon.y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 * desktopIcons.indexOf(icon) }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon
          id={icon.id}
          title={icon.title}
          icon={icon.icon}
          onDoubleClick={() => onIconDoubleClick(icon.id)}
        />
      </motion.div>
    ));
  }, [onIconDoubleClick, t, language]);

  // Generate static star data that won't change on re-renders
  const starData = useMemo(() => {
    return [...Array(120)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 70,
      size: Math.random() * 3 + 1,
      brightness: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  // Generate static shooting star data
  const shootingStarData = useMemo(() => {
    return [...Array(5)].map((_, i) => ({
      id: i,
      left: Math.random() * 50,
      top: Math.random() * 30,
      delay: i * 12 + Math.random() * 8,
    }));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-hide intro after 8 seconds - REMOVE THIS
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowIntro(false);
  //   }, 8000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-900/10 to-transparent" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <path 
              d="M0,400 L0,200 L200,100 L400,150 L600,80 L800,120 L1000,60 L1200,100 L1200,400 Z" 
              fill="rgba(0,0,0,0.4)"
            />
            <path 
              d="M0,400 L0,250 L150,180 L350,220 L550,160 L750,200 L950,140 L1200,180 L1200,400 Z" 
              fill="rgba(0,0,0,0.3)"
            />
          </svg>
        </div>
        
        {/* Enhanced stars */}
        {isClient && (
          <div className="absolute inset-0">
            {starData.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                animate={{
                  opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: star.twinkleSpeed,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              />
            ))}
            
            {/* Enhanced shooting stars */}
            {shootingStarData.map((star) => (
              <motion.div
                key={star.id}
                className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                }}
                animate={{
                  x: [0, 300],
                  y: [0, 150],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4">
        {iconComponents}
      </div>

      {/* Enhanced Central Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        
        {/* Main intro section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showIntro ? 1 : 0.7, scale: showIntro ? 1 : 0.95 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 relative z-10"
        >
          {/* Floating icons */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="flex space-x-4 text-cyan-400/60"
            >
              <Code className="w-6 h-6" />
              <Zap className="w-6 h-6" />
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </div>
          
          {/* Name with enhanced animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl"
          >
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              {t('desktop.name')}
            </motion.span>
          </motion.h1>
          
          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3, delay: 1.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6"
          />
        </motion.div>

        {/* Professional title with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showIntro ? 1 : 0.8, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center relative z-10"
        >
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-4 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {t('desktop.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-base md:text-lg text-gray-400 font-light tracking-wider drop-shadow-lg mb-6"
          >
            {t('desktop.tagline')}
          </motion.p>
          
          {/* Interactive taglines */}

        </motion.div>
        


        

      </div>

      {/* Desktop Grid (subtle) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      {/* Language Toggle Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-4 right-4 z-20"
      >
        <motion.button
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">
            {language === 'en' ? 'FR' : 'EN'}
          </span>
        </motion.button>
      </motion.div>

      {/* Mobile Instructions */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-20 left-4 right-4 z-10"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <p className="text-gray-300 text-sm">
              {t('desktop.mobileInstructions')}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
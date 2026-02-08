'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  GraduationCap, 
  Briefcase, 
  User, 
  FolderOpen, 
  FileText,
  Monitor,
  Search,
  Wifi,
  Battery,
  Settings
} from 'lucide-react';

// Application definitions for the dock
const getDockApps = (t: (key: string) => string) => [
  {
    id: 'education',
    title: t('dock.education'),
    icon: GraduationCap,
    color: 'from-blue-500 to-purple-600',
    shadowColor: 'shadow-blue-500/50',
    hoverColor: 'hover:shadow-blue-400/70'
  },
  {
    id: 'experience',
    title: t('dock.experience'), 
    icon: Briefcase,
    color: 'from-green-500 to-emerald-600',
    shadowColor: 'shadow-green-500/50',
    hoverColor: 'hover:shadow-green-400/70'
  },
  {
    id: 'info',
    title: t('dock.aboutMe'),
    icon: User,
    color: 'from-orange-500 to-red-600',
    shadowColor: 'shadow-orange-500/50',
    hoverColor: 'hover:shadow-orange-400/70'
  },
  {
    id: 'projects',
    title: t('dock.projects'),
    icon: FolderOpen,
    color: 'from-cyan-500 to-blue-600',
    shadowColor: 'shadow-cyan-500/50',
    hoverColor: 'hover:shadow-cyan-400/70'
  },
];

// Icon mapping for different window types
const getWindowIcon = (windowId: string, title: string) => {
  if (windowId.includes('education')) return GraduationCap;
  if (windowId.includes('experience')) return Briefcase;
  if (windowId.includes('info')) return User;
  if (windowId.includes('projects')) return FolderOpen;
  if (windowId.includes('project-')) return FileText;
  return Monitor; // Default icon
};

interface DockProps {
  onAppLaunch: (appId: string) => void;
}

export function Dock({ onAppLaunch }: DockProps) {
  const { t } = useLanguage();
  const { windows, focusWindow, minimizeWindow } = useWindowStore();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Clock functionality
  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindows = windows.filter(w => w.open && !w.minimized);
  const minimizedWindows = windows.filter(w => w.open && w.minimized);

  return (
    <>
      {/* Enhanced Windows-style taskbar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[100000]",
          "bg-gradient-to-r from-gray-900/98 via-gray-800/98 to-gray-900/98",
          "backdrop-blur-2xl border-t border-gradient-to-r from-gray-600/30 via-gray-500/50 to-gray-600/30",
          "shadow-2xl shadow-black/50",
          isMobile ? "h-20 pb-2" : "h-16 pb-2"
        )}
      >
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-emerald-600/5 to-green-600/5 animate-pulse" />
        
        <div className={cn(
          "relative h-full flex items-center justify-between",
          isMobile ? "px-3 py-2" : "px-4 py-2"
        )}>
          {/* Left side - Start button and Search */}
          <div className="flex items-center">
            {/* Windows Start Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredApp('start')}
              onMouseLeave={() => setHoveredApp(null)}
              className={cn(
                "relative flex items-center justify-center transition-all duration-300",
                "bg-gradient-to-br from-blue-600/40 to-blue-800/60 hover:from-blue-500/50 hover:to-blue-700/70",
                "border border-blue-400/40 hover:border-blue-300/60 rounded-lg",
                "shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:shadow-xl",
                isMobile ? "w-10 h-10 mr-3" : "w-9 h-9 mr-4",
                "backdrop-blur-sm"
              )}
              aria-label={t('dock.startMenu')}
            >
              {/* Enhanced Windows Logo */}
              <motion.div 
                className={cn(
                  "grid grid-cols-2 gap-0.5",
                  isMobile ? "w-5 h-5" : "w-4 h-4"
                )}
                whileHover={{ rotate: 5 }}
              >
                <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-sm shadow-sm" />
                <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-sm shadow-sm" />
                <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-sm shadow-sm" />
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-sm shadow-sm" />
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-md -z-10" />
            </motion.button>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredApp('search')}
              onMouseLeave={() => setHoveredApp(null)}
              className={cn(
                "relative flex items-center justify-center transition-all duration-300",
                "hover:bg-gradient-to-br hover:from-white/15 hover:to-white/5",
                "border border-transparent hover:border-white/30 rounded-lg",
                "hover:shadow-lg hover:shadow-white/20",
                isMobile ? "w-10 h-10 mr-4" : "w-9 h-9 mr-6"
              )}
              aria-label={t('dock.search')}
            >
              <Search className={cn(
                "text-white/70 hover:text-white transition-all duration-300",
                isMobile ? "w-5 h-5" : "w-4 h-4"
              )} />
            </motion.button>
          </div>

          {/* Center - Application Icons */}
          <div className="flex-1 flex items-center justify-center">
            <div className={cn(
              "flex items-center",
              isMobile ? "space-x-8" : "space-x-10" // Increased from space-x-4 and space-x-6
            )}>
              {/* Application Launchers */}
              {getDockApps(t).map((app, index) => {
                const IconComponent = app.icon;
                const isOpen = windows.some(w => w.id === app.id && w.open);
                const isMinimized = windows.some(w => w.id === app.id && w.open && w.minimized);
                const isHovered = hoveredApp === app.id;
                
                return (
                  <motion.div 
                    key={app.id} 
                    className="relative flex items-center justify-center" // Added flex centering
                    initial={{ scale: 0, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    {/* Tooltip - moved outside button to avoid transform conflicts */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: -15, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            "absolute bottom-full mb-2",
                            "px-3 py-1.5 rounded-lg",
                            "bg-black/90 backdrop-blur-sm",
                            "text-white text-sm font-medium",
                            "border border-white/20",
                            "shadow-xl",
                            "pointer-events-none",
                            "whitespace-nowrap z-[200]"
                          )}
                          style={{
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-80px)', // Fixed positioning
                            top: 'auto',
                            bottom: '100%'
                          }}
                        >
                          {app.title}
                          {isOpen && (
                            <span className="ml-2 text-xs opacity-75">
                              {isMinimized ? `(${t('dock.minimized')})` : `(${t('dock.active')})`}
                            </span>
                          )}
                          {/* Tooltip arrow */}
                          <div 
                            className="absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" 
                            style={{
                              left: '25%', // Adjusted arrow position
                              transform: 'translateX(-25%)'
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Outer glow ring for open windows */}
                    {isOpen && (
                      <motion.div
                        className={cn(
                          "absolute inset-0 rounded-xl",
                          "bg-gradient-to-br opacity-60",
                          isMinimized ? app.color.replace('500', '400').replace('600', '500') : app.color,
                          "blur-sm scale-110"
                        )}
                        animate={{
                          opacity: isMinimized ? [0.3, 0.5, 0.3] : [0.6, 0.8, 0.6],
                          scale: isMinimized ? [1.05, 1.1, 1.05] : [1.1, 1.15, 1.1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    {/* Main button */}
                    <motion.button
                      whileHover={{ 
                        scale: 1.15, 
                        y: -10,
                        rotateY: 8,
                        rotateX: 3
                      }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setHoveredApp(app.id)}
                      onMouseLeave={() => setHoveredApp(null)}
                      onClick={() => {
                        const existingWindow = windows.find(w => w.id === app.id && w.open);
                        if (existingWindow) {
                          if (existingWindow.minimized) {
                            focusWindow(existingWindow.id);
                          } else {
                            minimizeWindow(existingWindow.id);
                          }
                        } else {
                          onAppLaunch(app.id);
                        }
                      }}
                      className={cn(
                        "relative flex items-center justify-center transition-all duration-500",
                        "rounded-xl backdrop-blur-md border-2",
                        isMobile ? "w-14 h-14 p-3" : "w-12 h-12 p-2.5",
                        // Base styling
                        "bg-gradient-to-br from-white/10 to-white/5",
                        "border-white/20 hover:border-white/40",
                        "shadow-lg hover:shadow-2xl",
                        // State-specific styling
                        !isOpen && "hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10",
                        isOpen && !isMinimized && cn(
                          "bg-gradient-to-br", app.color.replace('500', '600').replace('600', '700'),
                          "border-white/60 shadow-2xl",
                          "ring-2 ring-white/30"
                        ),
                        isOpen && isMinimized && cn(
                          "bg-gradient-to-br", app.color.replace('500', '300').replace('600', '400'),
                          "border-white/40 opacity-75",
                          "ring-1 ring-white/20"
                        )
                      )}
                      style={{
                        transformStyle: 'preserve-3d',
                        filter: isOpen && !isMinimized ? 'brightness(1.1)' : 'brightness(1)'
                      }}
                    >
                      {/* Icon with enhanced styling */}
                      <IconComponent className={cn(
                        "transition-all duration-500 drop-shadow-2xl",
                        isMobile ? "w-7 h-7" : "w-6 h-6",
                        "text-white",
                        isOpen && !isMinimized && "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]",
                        isOpen && isMinimized && "text-white/80",
                        !isOpen && "text-white/90 hover:text-white"
                      )} />
                      
                      {/* Elegant particle system on hover */}
                      {isHovered && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                          {[...Array(12)].map((_, i) => {
                            const angle = (i * 30) * (Math.PI / 180);
                            const radius = 25;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            
                            return (
                              <motion.div
                                key={i}
                                className={cn(
                                  "absolute w-1.5 h-1.5 rounded-full",
                                  "bg-gradient-to-r from-white to-white/60",
                                  "shadow-lg shadow-white/50"
                                )}
                                initial={{ 
                                  opacity: 0, 
                                  scale: 0,
                                  x: 0,
                                  y: 0
                                }}
                                animate={{ 
                                  opacity: [0, 1, 0.8, 0], 
                                  scale: [0, 1, 1.2, 0],
                                  x: [0, x * 0.5, x, x * 1.2],
                                  y: [0, y * 0.5, y, y * 1.2]
                                }}
                                transition={{ 
                                  duration: 0.8, // Reduced from 2.5 to 0.8
                                  delay: i * 0.05, // Reduced from 0.1 to 0.05
                                  repeat: Infinity,
                                  repeatDelay: 0.2, // Reduced from 0.5 to 0.2
                                  ease: "easeOut"
                                }}
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: 'translate(-50%, -50%)'
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </motion.button>
                    
                    {/* Enhanced state indicators */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {/* Open window indicator */}
                      {isOpen && !isMinimized && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [1, 1.2, 1], 
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            "bg-gradient-to-r", app.color,
                            "shadow-lg ring-1 ring-white/30"
                          )}
                        />
                      )}
                      
                      {/* Minimized window indicator */}
                      {isOpen && isMinimized && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0.8, 1, 0.8], 
                            opacity: [0.5, 0.7, 0.5]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            "bg-gradient-to-r", app.color.replace('500', '400').replace('600', '500'),
                            "shadow-md ring-1 ring-white/20 opacity-60"
                          )}
                        />
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: -15, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className={cn(
                            "absolute bottom-full mb-2",
                            "px-3 py-1.5 rounded-lg",
                            "bg-black/90 backdrop-blur-sm",
                            "text-white text-sm font-medium",
                            "border border-white/20",
                            "shadow-xl",
                            "pointer-events-none",
                            "whitespace-nowrap z-[200]"
                          )}
                          style={{
                            left: '50%',
                            transform: 'translateX(-50%)'
                          }}
                        >
                          {app.title}
                          {isOpen && (
                            <span className="ml-2 text-xs opacity-75">
                              {isMinimized ? '(Minimized)' : '(Active)'}
                            </span>
                          )}
                          {/* Tooltip arrow */}
                          <div 
                            className="absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" 
                            style={{
                              left: '25%', // Adjusted arrow position
                              transform: 'translateX(-25%)'
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              
              {/* Additional Open Windows */}
              <AnimatePresence>
                {
                  minimizedWindows
                    .filter(window => !getDockApps(t).some(app => app.id === window.id))
                    .map((window, index) => {
                      const IconComponent = getWindowIcon(window.id, window.title);
                      const isHovered = hoveredApp === `open-${window.id}`;
                      
                      return (
                        <motion.div 
                          key={`open-${window.id}`} 
                          className="relative"
                          initial={{ scale: 0, opacity: 0, rotateY: 90 }}
                          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                          exit={{ scale: 0, opacity: 0, rotateY: -90 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.15, y: -6, rotateY: 8 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setHoveredApp(`open-${window.id}`)}
                            onMouseLeave={() => setHoveredApp(null)}
                            onClick={() => focusWindow(window.id)}
                            className={cn(
                              "relative flex items-center justify-center transition-all duration-300",
                              "bg-white/5 hover:bg-white/10 rounded-lg backdrop-blur-sm",
                              isMobile ? "w-12 h-12 p-2" : "w-11 h-11 p-2"
                            )}
                          >
                            <IconComponent className={cn(
                              "text-white drop-shadow-lg",
                              isMobile ? "w-6 h-6" : "w-5 h-5"
                            )} />
                            
                            {/* Small dot for minimized windows */}
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full"
                            />
                          </motion.button>
                        </motion.div>
                      );
                    })
                }
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - System Tray */}
          <div className="flex items-center space-x-4">
            {/* WiFi Icon */}
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }} // Added fast transition
              onMouseEnter={() => setHoveredApp('wifi')}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <Wifi className={cn(
                "text-white/90 hover:text-white drop-shadow-lg transition-colors font-bold",
                isMobile ? "w-6 h-6" : "w-5 h-5"
              )} strokeWidth={2.5} />
              <AnimatePresence>
                {hoveredApp === 'wifi' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-12 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-[200]"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    Connected
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Apply the same fix to battery, clock, and settings tooltips */}
              <AnimatePresence>
                {hoveredApp === 'battery' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-12 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-[200]"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    85% Charged
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {hoveredApp === 'clock' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-12 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-[200]"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    {isClient ? currentTime.toLocaleDateString([], { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : 'Loading...'}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {hoveredApp === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-12 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-[200]"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    Settings
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Battery Icon */}
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }} // Added fast transition
              onMouseEnter={() => setHoveredApp('battery')}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <Battery className={cn(
                "text-white/90 hover:text-white drop-shadow-lg transition-colors font-bold",
                isMobile ? "w-6 h-6" : "w-5 h-5"
              )} strokeWidth={2.5} />
              <AnimatePresence>
                {hoveredApp === 'battery' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-[200]"
                  >
                    85% Charged
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Separator */}
            <div className={cn(
              "bg-white/30",
              isMobile ? "w-px h-7" : "w-px h-6"
            )}></div>

            {/* Clock */}
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.1 }} // Added fast transition
              onMouseEnter={() => setHoveredApp('clock')}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <div className={cn(
                "text-white font-mono font-bold tracking-wider drop-shadow-lg",
                isMobile ? "text-base" : "text-sm"
              )}>
                {isClient ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </div>
              <AnimatePresence>
                {hoveredApp === 'clock' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-[200]"
                  >
                    {isClient ? currentTime.toLocaleDateString([], { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : 'Loading...'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Settings Icon */}
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }} // Reduced from 0.2 to 0.1
              onMouseEnter={() => setHoveredApp('settings')}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <Settings className={cn(
                "text-white/90 hover:text-white transition-colors font-bold",
                isMobile ? "w-5 h-5" : "w-4 h-4"
              )} strokeWidth={2.5} />
              <AnimatePresence>
                {hoveredApp === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -8 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-[200]"
                  >
                    Settings
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
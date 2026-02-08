'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Desktop } from '@/components/Desktop';
import { Window } from '@/components/Window';
import { Dock } from '@/components/Dock';
import { ProjectsFolder } from '@/components/ProjectsFolder';
import { ProjectViewer } from '@/components/ProjectViewer';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Timeline } from '@/components/Timeline';
import { useWindowStore } from '@/store/useWindowStore';
import { getProjects } from '@/lib/projects';
import type { Project, WindowState } from '@/lib/types';
import { Clock } from '@/components/Clock';
import BootSequence from '@/components/BootSequence';
import LockScreen from '@/components/LockScreen';
import { FakeCursor } from '@/components/FakeCursor';
import { getResponsiveWindowSize, getResponsiveWindowPosition } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

// Timeline data for education and experience (fallback - actual data loaded from MDX files)
const getEducationData = (t: any) => [];

const getExperienceData = (t: any) => [];

// Info content fallback - actual data loaded from MDX files
const getInfoContent = (t: any) => '';

export default function HomePage() {
  const { t, language } = useLanguage();
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindow } = useWindowStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [infoContent, setInfoContent] = useState<string>('');
  const [educationContent, setEducationContent] = useState<string>('');
  const [experienceContent, setExperienceContent] = useState<string>('');
  const [isBooting, setIsBooting] = useState(true);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const [showFakeCursor, setShowFakeCursor] = useState(false);
  const [fakeCursorShown, setFakeCursorShown] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`/api/projects?lang=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const projectData = await response.json();
        setProjects(projectData);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    const loadInfoContent = async () => {
      try {
        const response = await fetch(`/api/content/info?lang=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch info content');
        }
        const data = await response.json();
        setInfoContent(data.content);
      } catch (error) {
        console.error('Error loading info content:', error);
        // Fallback to translation-based content
        setInfoContent(getInfoContent(t));
      }
    };

    const loadEducationContent = async () => {
      try {
        const response = await fetch(`/api/content/education?lang=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch education content');
        }
        const data = await response.json();
        setEducationContent(data.content);
      } catch (error) {
        console.error('Error loading education content:', error);
        setEducationContent('');
      }
    };

    const loadExperienceContent = async () => {
      try {
        const response = await fetch(`/api/content/experience?lang=${language}`);
        if (!response.ok) {
          throw new Error('Failed to fetch experience content');
        }
        const data = await response.json();
        setExperienceContent(data.content);
      } catch (error) {
        console.error('Error loading experience content:', error);
        setExperienceContent('');
      }
    };
  
    // Only load content after login
    if (showDesktop) {
      setIsLoading(true);
      loadProjects();
      loadInfoContent();
      loadEducationContent();
      loadExperienceContent();
    }
  }, [showDesktop, language, t]);

  const handleBootComplete = () => {
    setIsBooting(false);
    setShowLockScreen(true);
  };

  const handleLogin = () => {
    setShowLockScreen(false);
    setShowDesktop(true);
  };

  const handleIconDoubleClick = (iconId: string) => {
    const windowCount = windows.filter(w => w.open).length;
    
    // Get responsive size based on window type
    const getWindowConfig = (type: 'default' | 'large' | 'small' = 'default') => {
      const size = getResponsiveWindowSize(type);
      const position = getResponsiveWindowPosition(size, windowCount);
      return { ...size, ...position };
    };
  
    switch (iconId) {
      case 'education': {
        const config = getWindowConfig('large');
        openWindow({
          id: 'education',
          title: 'Education',
          content: 'education',
          open: true,
          minimized: false,
          maximized: false,
          x: config.x,
          y: config.y,
          width: config.width,
          height: config.height,
        });
        break;
      }
      case 'experience': {
        const config = getWindowConfig('large');
        openWindow({
          id: 'experience',
          title: 'Experience',
          content: 'experience',
          open: true,
          minimized: false,
          maximized: false,
          x: config.x,
          y: config.y,
          width: config.width,
          height: config.height,
        });
        break;
      }
      case 'info': {
        const config = getWindowConfig('default');
        openWindow({
          id: 'info',
          title: 'About Me',
          content: 'info',
          open: true,
          minimized: false,
          maximized: false,
          x: config.x,
          y: config.y,
          width: config.width,
          height: config.height,
        });
        break;
      }
      case 'projects': {
        const config = getWindowConfig('large');
        openWindow({
          id: 'projects',
          title: 'Projects',
          content: 'projects',
          open: true,
          minimized: false,
          maximized: false,
          x: config.x,
          y: config.y,
          width: config.width,
          height: config.height,
        });
        break;
      }
    }
  };

  const handleProjectOpen = (project: Project) => {
    const windowCount = windows.filter(w => w.open).length;
    const size = getResponsiveWindowSize('large');
    const position = getResponsiveWindowPosition(size, windowCount);
  
    const windowId = `project-${project.slug}`;
    
    openWindow({
      id: windowId,
      title: project.title,
      content: 'project',
      open: true,
      minimized: false,
      maximized: false,
      x: position.x,
      y: position.y,
      width: size.width,
      height: size.height,
      data: project,
    });
    
    focusWindow(windowId);
  };

  const renderWindowContent = (window: WindowState) => {
    switch (window.content) {
      case 'education':
        return (
          <div className="h-full overflow-auto">
            {educationContent ? (
              <MarkdownRenderer content={educationContent} />
            ) : (
              <Timeline items={getEducationData(t)} />
            )}
          </div>
        );
      case 'experience':
        return (
          <div className="h-full overflow-auto">
            {experienceContent ? (
              <MarkdownRenderer content={experienceContent} />
            ) : (
              <Timeline items={getExperienceData(t)} />
            )}
          </div>
        );
      case 'info':
        return (
          <div className="h-full overflow-auto">
            <MarkdownRenderer content={infoContent || getInfoContent(t)} />
          </div>
        );
      case 'projects':
        return (
          <ProjectsFolder
            projects={projects}
            onProjectOpen={handleProjectOpen}
            isLoading={isLoading}
          />
        );
      case 'project':
        return window.data ? (
          <ProjectViewer project={window.data} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Project data not found</p>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Content not found for: {typeof window.content === 'string' ? window.content : 'unknown'}</p>
          </div>
        );
    }
  };

  // Show fake cursor after desktop is fully loaded (only once)
  useEffect(() => {
    if (showDesktop && !isLoading && !fakeCursorShown) {
      const timer = setTimeout(() => {
        setShowFakeCursor(true);
        setFakeCursorShown(true);
      }, 1000); // Show cursor after 1 second

      return () => clearTimeout(timer);
    }
  }, [showDesktop, isLoading, fakeCursorShown]);

  // Handle window resize to update existing windows
  useEffect(() => {
    const handleResize = () => {
      // Update all open windows to ensure they stay within viewport bounds
      windows.forEach(window => {
        if (window.open && !window.maximized) {
          const dockHeight = globalThis.window.innerWidth < 768 ? 64 : 56;
          const maxX = Math.max(0, globalThis.window.innerWidth - window.width);
          const maxY = Math.max(0, globalThis.window.innerHeight - dockHeight - window.height);
          
          if (window.x > maxX || window.y > maxY) {
            updateWindow(window.id, {
              x: Math.max(0, Math.min(window.x, maxX)),
              y: Math.max(0, Math.min(window.y, maxY)),
            });
          }
        }
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windows, updateWindow]);

  const handleFakeCursorProjectsClick = () => {
    handleIconDoubleClick('projects');
  };

  const handleFakeCursorComplete = () => {
    setShowFakeCursor(false);
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isBooting && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
        
        {!isBooting && showLockScreen && (
          <LockScreen key="lock" onLogin={handleLogin} />
        )}
        
        {!isBooting && !showLockScreen && showDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <Desktop onIconDoubleClick={handleIconDoubleClick} />
            
            {/* Windows */}
            <AnimatePresence>
              {windows
                .filter(window => window.open)
                .map((window) => {
                  const content = renderWindowContent(window);
                  return (
                    <div key={window.id} className="relative w-full h-full">
                      <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        position={{ x: window.x, y: window.y }}
                        size={{ width: window.width, height: window.height }}
                        isMinimized={window.minimized}
                        isMaximized={window.maximized}
                        zIndex={window.zIndex}
                        onClose={() => closeWindow(window.id)}
                        onMinimize={() => minimizeWindow(window.id)}
                        onMaximize={() => maximizeWindow(window.id)}
                        onFocus={() => focusWindow(window.id)}
                        onPositionChange={(position) => updateWindow(window.id, { x: position.x, y: position.y })}
                        onSizeChange={(size) => updateWindow(window.id, { width: size.width, height: size.height })}
                      >
                        {content}
                      </Window>
                    </div>
                  );
                })}
            </AnimatePresence>
            
            {/* Clock */}
            <Clock />
        
            {/* Dock */}
            <Dock onAppLaunch={handleIconDoubleClick} />
            
            {/* Fake Cursor Animation */}
            {showFakeCursor && (
              <FakeCursor 
                onComplete={handleFakeCursorComplete}
                onProjectsClick={handleFakeCursorProjectsClick}
              />
            )}
        
            {/* Loading Overlay for Projects */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white/10 backdrop-blur-md rounded-lg p-8 flex flex-col items-center space-y-4"
                  >
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <p className="text-white text-sm">Loading portfolio...</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
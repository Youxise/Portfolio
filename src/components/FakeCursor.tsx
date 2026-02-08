'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MousePointer2 } from 'lucide-react';

interface FakeCursorProps {
  onComplete: () => void;
  onProjectsClick: () => void;
}

export function FakeCursor({ onComplete, onProjectsClick }: FakeCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Start animation after a short delay
    const startTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  const handleAnimationComplete = async () => {
    // Simulate click animation
    setIsClicking(true);
    
    // Trigger projects window opening after a shorter delay
    setTimeout(() => {
      onProjectsClick();
    }, 500);
    
    // Hide cursor after click
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    }, 1200);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          position: 'fixed',
          zIndex: 2147483647, // Maximum z-index value
          pointerEvents: 'none'
        }}
        initial={{
          x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
          y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          x: typeof window !== 'undefined' ? window.innerWidth / 2 + 120 : 520,
          y: typeof window !== 'undefined' ? window.innerHeight - 60 : 740,
          opacity: 1,
          scale: isClicking ? 0.95 : 1
        }}
        exit={{
          opacity: 0,
          scale: 0.8
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          type: "tween"
        }}
        onAnimationComplete={handleAnimationComplete}
      >
        {/* Elegant cursor design */}
        <motion.div
          className="relative"
          animate={{
            rotate: isClicking ? -8 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Elegant glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-lg" />
          
          {/* Sophisticated shadow */}
          <div className="absolute -inset-2 bg-black/30 rounded-full blur-md" />
          
          {/* Main cursor with gradient */}
          <div className="relative">
            <MousePointer2 
              className="w-10 h-10 relative z-10" 
              fill="url(#cursorGradient)"
              stroke="#ffffff"
              strokeWidth={0.5}
            />
            
            {/* SVG gradient definition */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Elegant click ripple effect */}
          <AnimatePresence>
            {isClicking && (
              <>
                {/* Primary ripple */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full" />
                </motion.div>
                
                {/* Secondary ripple */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0.4 }}
                  animate={{ scale: 4, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Elegant trailing particles */}
        <motion.div
          className="absolute top-2 left-2 w-2 h-2 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional trailing particle */}
        <motion.div
          className="absolute top-1 left-1 w-1 h-1 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
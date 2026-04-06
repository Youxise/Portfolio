'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, Volume2, Settings, Unlock } from 'lucide-react';

interface LockScreenProps {
  onLogin: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onLogin }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      }));
      setCurrentDate(now.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      }));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocking(true);
    // Trigger unlock animation and then login
    setTimeout(() => {
      onLogin();
    }, 800); // Shorter delay for smoother transition
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        scale: 1.1,
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-black relative overflow-hidden flex flex-col"
    >
      {/* Unlock Overlay Animation */}
      <AnimatePresence>
        {isUnlocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [0, 360, 720],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.8,
                times: [0, 0.6, 1],
                ease: "easeInOut"
              }}
              className="text-emerald-400"
            >
              <Unlock size={80} />
            </motion.div>
            
            {/* Ripple effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ 
                scale: [0, 3, 6],
                opacity: [0.8, 0.3, 0]
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-32 h-32 border-2 border-emerald-400 rounded-full"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ 
                scale: [0, 2, 4],
                opacity: [0.6, 0.2, 0]
              }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="absolute w-32 h-32 border border-emerald-400 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 text-white/80">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium">Portfolio OS</span>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-3"
        >
          <Wifi className="w-4 h-4" />
          <div className="flex items-center space-x-1">
            <Battery className="w-4 h-4" />
            <span className="text-xs">98%</span>
          </div>
          <Volume2 className="w-4 h-4" />
          <Settings className="w-4 h-4 opacity-60" />
        </motion.div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-8">
        {/* Time and Date Display */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="text-8xl md:text-9xl font-thin text-white mb-2 tracking-wider"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isClient ? currentTime : '--:--'}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-emerald-300 font-light tracking-wide"
          >
            {isClient ? currentDate : 'Loading...'}
          </motion.div>
        </motion.div>

        {/* User Profile Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* User Avatar */}
          <motion.div
            className="w-24 h-24 mx-auto mb-6 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold text-black shadow-2xl border-2 border-emerald-400/30">
              YM
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border border-emerald-400/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* User Info */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-2xl font-light text-white mb-2"
          >
             Joseph MOULAI
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-emerald-300 text-sm font-medium"
          >
            AI & Data Engineer
          </motion.p>
        </motion.div>

        {/* Unlock Interface */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.p
            className="text-gray-400 text-sm mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Click to unlock and explore portfolio
          </motion.p>
          
          <motion.button
            onClick={handleUnlock}
            disabled={isUnlocking}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
              backgroundColor: "rgba(16, 185, 129, 0.9)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-16 py-4 bg-emerald-500/80 backdrop-blur-sm text-black rounded-full font-medium text-lg shadow-xl border border-emerald-400/50 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <Unlock className="w-5 h-5" />
              <span>Unlock Portfolio</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl"
              >
                →
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10"
      >
        <div className="flex items-center space-x-4 text-xs text-gray-500">

        </div>
      </motion.div>

      {/* Ambient glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
};

export default LockScreen;
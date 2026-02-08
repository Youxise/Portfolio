'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation over 3 seconds
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          // Complete boot sequence after 3 seconds
          setTimeout(() => {
            onComplete();
          }, 100);
          return 100;
        }
        return newProgress;
      });
    }, 30); // 30ms * 100 = 3000ms (3 seconds)

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
        
        {/* Clean title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-light text-white mb-2 tracking-wide">
            System Booting
          </h1>
          <p className="text-gray-400 text-sm font-light tracking-wider uppercase">
            Initializing Portfolio
          </p>
        </motion.div>

        {/* Sleek loading bar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-80 max-w-[90vw]"
        >
          {/* Progress container */}
          <div className="relative">
            {/* Background bar */}
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              {/* Progress fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
            
            {/* Progress percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6"
            >
              <span className="text-lg font-mono text-gray-300 tabular-nums">
                {progress}%
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Minimal loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex space-x-1"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BootSequence;
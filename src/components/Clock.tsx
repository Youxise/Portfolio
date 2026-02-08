'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Clock() {
  const [currentTime, setCurrentTime] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    }));

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-4 left-4 z-40"
    >
      <div className={cn(
        "glass rounded-xl px-3 py-2",
        "text-white/90 font-mono text-sm"
      )}>
        {isClient ? currentTime : '--:--'}
      </div>
    </motion.div>
  );
}
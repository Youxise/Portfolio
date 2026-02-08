import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Responsive window sizing utilities
export function getResponsiveWindowSize(type: 'default' | 'large' | 'small' = 'default') {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return { width: 800, height: 600 };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dockHeight = vw < 768 ? 64 : 56;
  const availableHeight = vh - dockHeight;

  // Calculate responsive sizes based on viewport
  const sizes = {
    small: {
      width: Math.min(600, vw * 0.7),
      height: Math.min(400, availableHeight * 0.6)
    },
    default: {
      width: Math.min(800, vw * 0.8),
      height: Math.min(600, availableHeight * 0.7)
    },
    large: {
      width: Math.min(1000, vw * 0.9),
      height: Math.min(800, availableHeight * 0.8)
    }
  };

  return sizes[type];
}

export function getResponsiveWindowPosition(windowSize: { width: number; height: number }, windowCount: number = 0) {
  if (typeof window === 'undefined') {
    return { x: 100, y: 100 };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const dockHeight = vw < 768 ? 64 : 56;
  const availableHeight = vh - dockHeight;

  // Center the window with slight offset for multiple windows
  const centerX = Math.max(20, (vw - windowSize.width) / 2);
  const centerY = Math.max(20, (availableHeight - windowSize.height) / 2);

  // Add staggered offset for multiple windows
  const offsetX = (windowCount * 30) % (vw * 0.1);
  const offsetY = (windowCount * 20) % (availableHeight * 0.1);

  return {
    x: Math.min(centerX + offsetX, vw - windowSize.width - 20),
    y: Math.min(centerY + offsetY, availableHeight - windowSize.height - 20)
  };
}
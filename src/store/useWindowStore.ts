import { create } from 'zustand';
import { WindowState } from '@/lib/types';

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  openWindow: (window: Omit<WindowState, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<WindowState>) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 1000,

  openWindow: (windowData) => {
    console.log('openWindow called with:', windowData);
    const { windows, nextZIndex } = get();
    const existingWindow = windows.find(w => w.id === windowData.id);
    
    if (existingWindow) {
      console.log('Updating existing window');
      set({
        windows: windows.map(w => 
          w.id === windowData.id 
            ? { ...w, open: true, minimized: false, zIndex: nextZIndex }
            : w
        ),
        nextZIndex: nextZIndex + 1
      });
    } else {
      console.log('Creating new window');
      set({
        windows: [...windows, { ...windowData, zIndex: nextZIndex }],
        nextZIndex: nextZIndex + 1
      });
    }
    console.log('Windows after openWindow:', get().windows);
  },

  closeWindow: (id) => {
    set({
      windows: get().windows.map(w => 
        w.id === id ? { ...w, open: false } : w
      )
    });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map(w => 
        w.id === id ? { ...w, minimized: !w.minimized } : w
      )
    });
  },

  maximizeWindow: (id) => {
    set({
      windows: get().windows.map(w => 
        w.id === id ? { ...w, maximized: !w.maximized } : w
      )
    });
  },

  focusWindow: (id) => {
    const { windows, nextZIndex } = get();
    set({
      windows: windows.map(w => 
        w.id === id ? { ...w, zIndex: nextZIndex, minimized: false } : w
      ),
      nextZIndex: nextZIndex + 1
    });
  },

  updateWindow: (id, updates) => {
    set({
      windows: get().windows.map(w => 
        w.id === id ? { ...w, ...updates } : w
      )
    });
  },
}));
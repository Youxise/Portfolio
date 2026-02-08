'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Desktop and UI
    'desktop.education': 'Education',
    'desktop.experience': 'Experience',
    'desktop.projects': 'Projects',
    'desktop.about': 'About Me',
    'desktop.language': 'Language',
    'desktop.name': 'Youcef MOULAI',
    'desktop.title': 'AI & Data Science Engineer',
    'desktop.tagline': 'Building Intelligent Data Solutions',
    'desktop.mobileInstructions': 'Use the dock below to access applications',
    'desktop.icons.browser': 'Browser',
    'desktop.icons.documents': 'Documents',
    'desktop.icons.pictures': 'Pictures',
    'desktop.icons.music': 'Music',
    'desktop.icons.videos': 'Videos',
    'desktop.icons.settings': 'Settings',
    'desktop.icons.trash': 'Bin',
    
    // Window controls
    'window.close': 'Close',
    'window.minimize': 'Minimize',
    'window.maximize': 'Maximize',
    
    // Timeline
    'timeline.education': 'Education',
    'timeline.experience': 'Experience',
    'timeline.thesis': 'Thesis',
    'timeline.gpa': 'GPA',
    
    // Dock
    'dock.education': 'Education',
    'dock.experience': 'Experience',
    'dock.aboutMe': 'About Me',
    'dock.projects': 'Projects',
    'dock.startMenu': 'Start Menu',
    'dock.search': 'Search',
    'dock.minimized': 'Minimized',
    'dock.active': 'Active',
    
    // Boot sequence
    'boot.title': 'System Booting',
    'boot.subtitle': 'Initializing Portfolio',
    
    // Lock screen
    'lock.welcome': 'Welcome',
    'lock.enter': 'Press Enter to continue',
  },
  fr: {
    // Desktop and UI
    'desktop.education': 'Éducation',
    'desktop.experience': 'Expérience',
    'desktop.projects': 'Projets',
    'desktop.about': 'À propos',
    'desktop.language': 'Langue',
    'desktop.name': 'Youcef MOULAI',
    'desktop.title': 'Ingénieur IA & Data Science',
    'desktop.tagline': 'Développement de Solutions Intelligentes',
    'desktop.mobileInstructions': 'Utilisez le dock ci-dessous pour accéder aux applications',
    'desktop.icons.browser': 'Navigateur',
    'desktop.icons.documents': 'Documents',
    'desktop.icons.pictures': 'Images',
    'desktop.icons.music': 'Musique',
    'desktop.icons.videos': 'Vidéos',
    'desktop.icons.settings': 'Paramètres',
    'desktop.icons.trash': 'Bin',
    
    // Timeline
    'timeline.education': 'Éducation',
    'timeline.experience': 'Expérience',
    'timeline.thesis': 'Thèse',
    'timeline.gpa': 'Note',
    
    // Window controls
    'window.close': 'Fermer',
    'window.minimize': 'Réduire',
    'window.maximize': 'Agrandir',
    'window.restore': 'Restaurer',
    
    // Dock
    'dock.education': 'Éducation',
    'dock.experience': 'Expérience',
    'dock.aboutMe': 'À propos',
    'dock.projects': 'Projets',
    'dock.startMenu': 'Menu Démarrer',
    'dock.search': 'Rechercher',
    'dock.minimized': 'Réduit',
    'dock.active': 'Actif',
    
    // Boot sequence
    'boot.title': 'Démarrage du système',
    'boot.subtitle': 'Initialisation du Portfolio',
    
    // Lock screen
    'lock.welcome': 'Bienvenue',
    'lock.enter': 'Appuyez sur Entrée pour continuer',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  PROFESSIONAL: 'professional',
  OCEAN: 'ocean',
  SUNSET: 'sunset',
  FOREST: 'forest'
};

export const PAGE_COLORS = {
  HOME: 'home',
  ABOUT: 'about',
  PROJECTS: 'projects',
  CONTACT: 'contact'
};

const getPageAccentColors = (page) => {
  const colors = {
    home: { gradient: 'from-amber-500 to-orange-500', text: 'text-amber-600', btnPrimary: 'from-amber-600 to-orange-500', btnSecondary: 'border-amber-200' },
    about: { gradient: 'from-emerald-500 to-teal-500', text: 'text-emerald-600', btnPrimary: 'from-emerald-600 to-teal-500', btnSecondary: 'border-emerald-200' },
    projects: { gradient: 'from-violet-500 to-purple-500', text: 'text-violet-600', btnPrimary: 'from-violet-600 to-purple-500', btnSecondary: 'border-violet-200' },
    contact: { gradient: 'from-rose-500 to-pink-500', text: 'text-rose-600', btnPrimary: 'from-rose-600 to-pink-500', btnSecondary: 'border-rose-200' }
  };
  return colors[page] || colors.home;
};

const themeConfigs = {
  light: {
    name: 'Light',
    background: 'bg-amber-50',
    text: 'text-amber-900',
    textMuted: 'text-amber-700',
    cardBg: 'bg-white/80 backdrop-blur-md',
    cardBorder: 'border-amber-200',
    navBg: 'bg-transparent',
    heroBg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50',
    sectionBg: 'bg-amber-50',
    sectionAltBg: 'bg-orange-50/50',
    buttonPrimary: 'bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 shadow-md',
    buttonSecondary: 'bg-white/80 backdrop-blur-sm text-amber-900 border-2 border-amber-200 hover:bg-amber-100',
    accentGradient: 'from-amber-600 to-orange-500',
    accentText: 'text-amber-600',
    footerBg: 'bg-amber-100',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  },
  dark: {
    name: 'Dark',
    background: 'bg-stone-900',
    text: 'text-stone-100',
    textMuted: 'text-stone-400',
    cardBg: 'bg-stone-800/80 backdrop-blur-md',
    cardBorder: 'border-stone-700',
    navBg: 'bg-transparent',
    heroBg: 'bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900',
    sectionBg: 'bg-stone-900',
    sectionAltBg: 'bg-stone-800/50',
    buttonPrimary: 'bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 shadow-lg',
    buttonSecondary: 'bg-stone-700/80 backdrop-blur-sm text-stone-100 border border-stone-600 hover:bg-stone-600',
    accentGradient: 'from-amber-500 to-orange-400',
    accentText: 'text-amber-400',
    footerBg: 'bg-stone-950',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  },
  professional: {
    name: 'Professional',
    background: 'bg-stone-50',
    text: 'text-stone-900',
    textMuted: 'text-stone-600',
    cardBg: 'bg-white/80 backdrop-blur-md',
    cardBorder: 'border-stone-300',
    navBg: 'bg-transparent',
    heroBg: 'bg-gradient-to-br from-stone-100 via-amber-50 to-stone-50',
    sectionBg: 'bg-white',
    sectionAltBg: 'bg-amber-50/30',
    buttonPrimary: 'bg-gradient-to-r from-amber-700 to-stone-600 text-white hover:from-amber-800 hover:to-stone-700 shadow-md',
    buttonSecondary: 'bg-white/80 backdrop-blur-sm text-stone-900 border-2 border-stone-300 hover:bg-stone-100',
    accentGradient: 'from-amber-700 to-stone-600',
    accentText: 'text-amber-700',
    footerBg: 'bg-stone-100',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  },
  ocean: {
    name: 'Ocean',
    background: 'bg-slate-900',
    text: 'text-cyan-50',
    textMuted: 'text-cyan-300',
    cardBg: 'bg-slate-800/80 backdrop-blur-md',
    cardBorder: 'border-cyan-700',
    navBg: 'bg-transparent',
    heroBg: 'bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900',
    sectionBg: 'bg-slate-900',
    sectionAltBg: 'bg-cyan-900/30',
    buttonPrimary: 'bg-gradient-to-r from-cyan-600 to-blue-500 text-white hover:from-cyan-700 hover:to-blue-600 shadow-lg',
    buttonSecondary: 'bg-slate-700/80 backdrop-blur-sm text-cyan-100 border border-cyan-600 hover:bg-slate-600',
    accentGradient: 'from-cyan-400 to-blue-400',
    accentText: 'text-cyan-400',
    footerBg: 'bg-slate-950',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  },
  sunset: {
    name: 'Sunset',
    background: 'bg-slate-900',
    text: 'text-pink-50',
    textMuted: 'text-pink-300',
    cardBg: 'bg-slate-800/80 backdrop-blur-md',
    cardBorder: 'border-pink-700',
    navBg: 'bg-transparent',
    heroBg: 'bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900',
    sectionBg: 'bg-slate-900',
    sectionAltBg: 'bg-pink-900/30',
    buttonPrimary: 'bg-gradient-to-r from-pink-600 to-rose-500 text-white hover:from-pink-700 hover:to-rose-600 shadow-lg',
    buttonSecondary: 'bg-slate-700/80 backdrop-blur-sm text-pink-100 border border-pink-600 hover:bg-slate-600',
    accentGradient: 'from-pink-400 to-rose-400',
    accentText: 'text-pink-400',
    footerBg: 'bg-slate-950',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  },
  forest: {
    name: 'Forest',
    background: 'bg-stone-900',
    text: 'text-emerald-50',
    textMuted: 'text-emerald-300',
    cardBg: 'bg-stone-800/80 backdrop-blur-md',
    cardBorder: 'border-emerald-700',
    navBg: 'bg-transparent',
    heroBg: 'bg-gradient-to-br from-stone-900 via-emerald-900 to-stone-900',
    sectionBg: 'bg-stone-900',
    sectionAltBg: 'bg-emerald-900/30',
    buttonPrimary: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-700 hover:to-teal-600 shadow-lg',
    buttonSecondary: 'bg-stone-700/80 backdrop-blur-sm text-emerald-100 border border-emerald-600 hover:bg-stone-600',
    accentGradient: 'from-emerald-400 to-teal-400',
    accentText: 'text-emerald-400',
    footerBg: 'bg-stone-950',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved || THEMES.DARK;
  });
  const [currentPage, setCurrentPage] = useState(PAGE_COLORS.HOME);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);

    // Update document class for Tailwind dark mode
    const root = document.documentElement;
    root.classList.remove('dark');
    if (theme === THEMES.DARK) {
      root.classList.add('dark');
    }
  }, [theme]);

  const currentTheme = themeConfigs[theme];
  const pageColors = getPageAccentColors(currentPage);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, currentPage, setCurrentPage, pageColors }}>
      <div className={`${currentTheme.fontClass} ${currentTheme.background}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;

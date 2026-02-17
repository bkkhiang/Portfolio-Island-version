import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  PROFESSIONAL: 'professional'
};

const themeConfigs = {
  light: {
    name: 'Light',
    background: 'bg-white',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    navBg: 'bg-white/80 backdrop-blur-md border-gray-200 shadow-sm',
    heroBg: 'bg-gradient-to-br from-sky-50 via-white to-blue-50',
    sectionBg: 'bg-white',
    sectionAltBg: 'bg-sky-50/50',
    buttonPrimary: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 shadow-md',
    buttonSecondary: 'bg-white text-gray-900 border-2 border-sky-200 hover:bg-sky-50',
    accentGradient: 'from-sky-500 to-blue-600',
    accentText: 'text-sky-600',
    footerBg: 'bg-sky-50',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  },
  dark: {
    name: 'Dark',
    background: 'bg-slate-900',
    text: 'text-gray-100',
    textMuted: 'text-gray-400',
    cardBg: 'bg-slate-800',
    cardBorder: 'border-slate-700',
    navBg: 'bg-slate-900/90 backdrop-blur-md border-slate-700 shadow-lg',
    heroBg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    sectionBg: 'bg-slate-900',
    sectionAltBg: 'bg-slate-800/50',
    buttonPrimary: 'bg-gradient-to-r from-blue-600 to-amber-500 text-white hover:from-blue-700 hover:to-amber-600 shadow-lg',
    buttonSecondary: 'bg-slate-700 text-white border border-slate-600 hover:bg-slate-600',
    accentGradient: 'from-blue-500 to-amber-500',
    accentText: 'text-amber-400',
    footerBg: 'bg-slate-950',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  },
  professional: {
    name: 'Professional',
    background: 'bg-gray-50',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-300',
    navBg: 'bg-white/95 backdrop-blur-md border-b-2 border-emerald-600 shadow-md',
    heroBg: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-gray-50',
    sectionBg: 'bg-white',
    sectionAltBg: 'bg-emerald-50/30',
    buttonPrimary: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-md',
    buttonSecondary: 'bg-white text-gray-900 border-2 border-emerald-200 hover:bg-emerald-50',
    accentGradient: 'from-emerald-600 to-teal-600',
    accentText: 'text-emerald-700',
    footerBg: 'bg-gray-50',
    fontClass: 'font-sans',
    headingFont: 'font-serif',
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved || THEMES.LIGHT;
  });

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
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

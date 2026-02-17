import React from 'react';
import { useTheme, THEMES } from '../contexts/ThemeContext.jsx';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: THEMES.LIGHT, label: '☀️ Light', icon: 'sun' },
    { value: THEMES.DARK, label: '🌙 Dark', icon: 'moon' },
    { value: THEMES.PROFESSIONAL, label: '💼 Professional', icon: 'briefcase' },
    { value: THEMES.OCEAN, label: '🌊 Ocean', icon: 'ocean' },
    { value: THEMES.SUNSET, label: '🌅 Sunset', icon: 'sunset' },
    { value: THEMES.FOREST, label: '🌲 Forest', icon: 'forest' },
  ];

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:hover:bg-gray-600 transition-all duration-200 active:scale-95"
        aria-label="Toggle theme"
      >
        <span className="text-lg">
          {theme === THEMES.LIGHT && '☀️'}
          {theme === THEMES.DARK && '🌙'}
          {theme === THEMES.PROFESSIONAL && '💼'}
          {theme === THEMES.OCEAN && '🌊'}
          {theme === THEMES.SUNSET && '🌅'}
          {theme === THEMES.FOREST && '🌲'}
        </span>
        <span className="text-sm font-medium hidden sm:inline">
          {themes.find(t => t.value === theme)?.label.split(' ')[1]}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors ${
              theme === t.value ? 'bg-cyan-50 dark:bg-gray-700 text-cyan-600 dark:text-cyan-400' : ''
            }`}
          >
            <span className="text-lg">
              {t.icon === 'sun' && '☀️'}
              {t.icon === 'moon' && '🌙'}
              {t.icon === 'briefcase' && '💼'}
              {t.icon === 'ocean' && '🌊'}
              {t.icon === 'sunset' && '🌅'}
              {t.icon === 'forest' && '🌲'}
            </span>
            <span className="text-sm font-medium">{t.label}</span>
            {theme === t.value && (
              <svg className="w-4 h-4 ml-auto text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;

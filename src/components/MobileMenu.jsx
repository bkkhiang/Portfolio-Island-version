import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import ThemeSwitcher from './ThemeSwitcher.jsx';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { currentTheme } = useTheme();

  const navigation = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden ${currentTheme.cardBg} ${currentTheme.cardBorder} border-r`}
      >
        <div className="pt-20 pb-6 px-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 ${currentTheme.text} hover:${currentTheme.accentText} transition-colors`}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Brand */}
          <div className={`text-2xl font-bold bg-gradient-to-r ${currentTheme.accentGradient} bg-clip-text text-transparent mb-8 ${currentTheme.headingFont}`}>
            BIJOY KHIANG
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 mb-8">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={`block px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.to
                    ? `${currentTheme.buttonPrimary}`
                    : `${currentTheme.buttonSecondary}`
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Theme Switcher */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className={`text-sm font-medium mb-3 ${currentTheme.textMuted}`}>Theme</p>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

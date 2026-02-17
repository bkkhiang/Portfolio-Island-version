import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme, PAGE_COLORS } from './contexts/ThemeContext.jsx';
import ThreeDScene from './components/ThreeDScene';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import './index.css';

function App() {
  const location = useLocation();
  const { currentTheme, setCurrentPage } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/home') setCurrentPage(PAGE_COLORS.HOME);
    else if (location.pathname === '/about') setCurrentPage(PAGE_COLORS.ABOUT);
    else if (location.pathname === '/projects') setCurrentPage(PAGE_COLORS.PROJECTS);
    else if (location.pathname === '/contact') setCurrentPage(PAGE_COLORS.CONTACT);
  }, [location.pathname, setCurrentPage]);

  const { pageColors } = useTheme();

  return (
    <div className={`min-h-screen ${currentTheme.fontClass}`}>
      {/* Navigation - Always visible with glassmorphic style */}
      <nav className={`fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6 transition-all`}>
        <div className="flex justify-center">
          <div className={`flex items-center gap-2 md:gap-4 px-3 py-2 ${currentTheme.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl border ${currentTheme.cardBorder}`}>
            {/* Logo */}
            <Link to="/home" className={`mr-2 md:mr-4 text-xl md:text-2xl font-bold bg-gradient-to-r ${pageColors.gradient} bg-clip-text text-transparent ${currentTheme.headingFont}`}>
              BK
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {[
                { name: 'Home', path: '/home', icon: '🏠' },
                { name: 'About', path: '/about', icon: '👤' },
                { name: 'Projects', path: '/projects', icon: '💼' },
                { name: 'Contact', path: '/contact', icon: '✉️' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group relative px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? `bg-gradient-to-r ${pageColors.gradient} text-white shadow-lg`
                      : `${currentTheme.text} hover:${currentTheme.accentText}`
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="hidden md:inline">{item.name}</span>
                  </span>
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${pageColors.gradient} blur-lg -z-10`}></div>
                </Link>
              ))}
              {/* Theme Switcher */}
              <div className="pl-2 border-l border-gray-300 dark:border-gray-600">
                <ThemeSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${currentTheme.cardBg} ${currentTheme.cardBorder} border`}
              aria-label="Toggle menu"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content with Routing */}
      <Routes>
        <Route path="/home" element={<ThreeDScene />} />

        <Route path="/about" element={<About />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/contact" element={<Contact />} />

        {/* Default route - redirect to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
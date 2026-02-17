import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from './contexts/ThemeContext.jsx';
import ThreeDScene from './components/ThreeDScene';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import './index.css';

function App() {
  const location = useLocation();
  const { currentTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${currentTheme.fontClass}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-6 transition-all ${currentTheme.navBg}`}>
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/home" className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentTheme.accentGradient} bg-clip-text text-transparent ${currentTheme.headingFont}`}>
            BIJOY KHIANG
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/home"
              className={`px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/home'
                  ? `${currentTheme.buttonPrimary}`
                  : `${currentTheme.buttonSecondary}`
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/about'
                  ? `${currentTheme.buttonPrimary}`
                  : `${currentTheme.buttonSecondary}`
              }`}
            >
              About
            </Link>
            <Link
              to="/projects"
              className={`px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/projects'
                  ? `${currentTheme.buttonPrimary}`
                  : `${currentTheme.buttonSecondary}`
              }`}
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/contact'
                  ? `${currentTheme.buttonPrimary}`
                  : `${currentTheme.buttonSecondary}`
              }`}
            >
              Contact
            </Link>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
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
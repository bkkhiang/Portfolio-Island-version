import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { useTheme } from '../contexts/ThemeContext.jsx';

const ThreeDScene = () => {
  const { currentTheme, theme, pageColors } = useTheme();
  const [autoRotate, setAutoRotate] = useState(true);
  const [showCvModal, setShowCvModal] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(true);

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  return (
    <div className={`relative min-h-screen ${currentTheme.background} overflow-hidden`}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 1 }}
      >
        <source src="/air.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-amber-900/40 via-transparent to-orange-900/40 dark:from-stone-900/70 dark:via-transparent dark:to-stone-900/70 pointer-events-none"></div>

      {/* Loading Spinner */}
      {!modelLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="relative">
            <div className={`w-16 h-16 border-4 ${theme === 'dark' ? 'border-amber-400/30' : 'border-amber-200'} rounded-full`}></div>
            <div className={`absolute top-0 left-0 w-16 h-16 border-4 border-transparent ${theme === 'dark' ? 'border-t-amber-400' : 'border-t-amber-400'} rounded-full animate-spin`}></div>
          </div>
        </div>
      )}

      {/* Island with Cottage - Fullscreen Main Interactive Layer (z-index: 20) */}
      <div className="absolute inset-0 z-20" style={{ pointerEvents: 'auto' }}>
        <model-viewer
          src="/models/fantasy-cottage.glb"
          camera-controls
          auto-rotate={autoRotate}
          shadow-intensity="1"
          exposure="0.6"
          className="w-full h-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto',
            transform: 'translateX(15%)'
          }}
          onLoad={() => setModelLoaded(true)}
        />
      </div>

      {/* Hero Text Overlay - Left side of model, above the 3D */}
      <div className="absolute inset-0 flex items-center justify-start z-30 pointer-events-none pt-24 md:pt-28">
        <div className="pl-4 md:pl-16 lg:pl-24 pointer-events-auto max-w-2xl">
          {/* Main Heading */}
          <animated.div
            className="mb-4"
            initial={{ opacity: 0, x: -80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, tension: 120, friction: 20 }}
          >
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${currentTheme.headingFont}`}>
              <span className={`bg-gradient-to-r ${pageColors.gradient} bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] animate-pulse`}>
                Hello! My Name Is Bijoy
              </span>
            </h1>
          </animated.div>

          {/* Subtitle */}
          <animated.div
            className="mb-3"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, tension: 120, friction: 20 }}
          >
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-semibold ${currentTheme.text} drop-shadow-lg`}>
              I am a <span className={`bg-gradient-to-r ${pageColors.gradient} bg-clip-text text-transparent font-bold`}>Senior Research Assistant</span>
            </h2>
          </animated.div>

          {/* Tagline */}
          <animated.div
            className="mb-6"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, tension: 120, friction: 20 }}
          >
            <p className={`text-xl md:text-2xl lg:text-3xl font-medium ${currentTheme.text} drop-shadow-lg`}>
              Currently adapting <span className={`bg-gradient-to-r ${pageColors.gradient} bg-clip-text text-transparent font-bold`}>AI Automation</span> & <span className={`bg-gradient-to-r ${pageColors.gradient} bg-clip-text text-transparent font-bold`}>Web Development</span>
            </p>
          </animated.div>

          {/* CTA Buttons */}
          <animated.div
            className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button
              onClick={() => setShowCvModal(true)}
              className={`group relative px-8 py-4 bg-gradient-to-r ${pageColors.gradient} text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
            >
              <span className="flex items-center gap-2">
                <span>👁️</span> Preview CV
              </span>
            </button>
            <a
              href="/bijoy-cv.pdf"
              download="Bijoy_Khiang_CV.pdf"
              className={`group relative px-8 py-4 ${currentTheme.cardBg} backdrop-blur-xl font-bold rounded-full shadow-lg border ${currentTheme.cardBorder} hover:scale-105 transition-all duration-300 ${currentTheme.text}`}
            >
              <span className="flex items-center gap-2">
                <span>📥</span> Download CV
              </span>
            </a>
          </animated.div>
        </div>
      </div>

      {/* CV Preview Modal */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm" onClick={() => setShowCvModal(false)}>
          {/* Mobile Header */}
          <div className={`flex-shrink-0 ${currentTheme.cardBg} border-b ${currentTheme.cardBorder} px-4 py-3 flex items-center justify-between`}>
            <h3 className={`text-lg font-bold ${currentTheme.text}`}>CV Preview - Bijoy Khiang</h3>
            <button
              onClick={() => setShowCvModal(false)}
              className={`${currentTheme.textMuted} hover:${currentTheme.text} text-2xl font-bold focus:outline-none p-1`}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* PDF Viewer - Takes remaining space */}
          <div className="flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-full w-full flex flex-col md:flex-row max-w-[95vw] md:max-w-5xl w-full mx-auto">
              {/* PDF Container */}
              <div className="flex-1 relative bg-gray-100">
                <iframe
                  src="/bijoy-cv.pdf"
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full border-none"
                  title="CV Preview"
                  style={{ minHeight: '100%' }}
                />
              </div>

              {/* Action Buttons - Side panel on desktop, integrated on mobile */}
              <div className={`${currentTheme.cardBg} border-t md:border-t-0 md:border-l ${currentTheme.cardBorder} p-4 md:p-6 flex md:flex-col justify-center items-center gap-3`}>
                <button
                  onClick={() => setShowCvModal(false)}
                  className={`w-full px-6 py-3 ${currentTheme.buttonSecondary} font-semibold rounded-lg transition-colors text-center`}
                >
                  Close
                </button>
                <a
                  href="/bijoy-cv.pdf"
                  download="Bijoy_Khiang_CV.pdf"
                  className="w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors text-center"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDScene;

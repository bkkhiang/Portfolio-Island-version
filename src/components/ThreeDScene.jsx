import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { useTheme } from '../contexts/ThemeContext.jsx';

const ThreeDScene = () => {
  const { currentTheme } = useTheme();
  const [autoRotate, setAutoRotate] = useState(true);
  const [showCvModal, setShowCvModal] = useState(false);

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  return (
    <div className={`relative min-h-screen ${currentTheme.background} overflow-hidden`}>
      {/* Sky - Fullscreen Background (z-index: 0) */}
      <div className="absolute inset-0 z-0">
        <model-viewer
          src="/models/sky.glb"
          auto-rotate="false"
          camera-controls="false"
          disable-zoom
          disable-pan
          shadow-intensity="0"
          exposure="0.8"
          camera-orbit="0deg 90deg 0.5m"
          className="w-full h-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'scale(1.2)'
          }}
        />
      </div>

      {/* Plane - Positioned above island (z-index: 10) */}
      <div className="absolute top-16 right-1/3 z-10 w-28 h-28 md:w-36 md:h-36 pointer-events-none" style={{ animation: 'float 5s ease-in-out infinite 1s', background: 'transparent', cursor: 'default' }}>
        <model-viewer
          src="/models/plane.glb"
          auto-rotate="false"
          camera-controls="false"
          disable-zoom
          disable-pan
          shadow-intensity="0"
          exposure="0.7"
          camera-orbit="60deg 30deg 4m"
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            cursor: 'default'
          }}
        />
      </div>

      {/* Island with Cottage - Fullscreen Main Interactive Layer (z-index: 20) */}
      <div className="absolute inset-0 z-20" style={{ pointerEvents: 'auto' }}>
        <model-viewer
          src="/models/fantasy-cottage.glb"
          camera-controls
          auto-rotate={autoRotate}
          shadow-intensity="2.5"
          exposure="0.4"
          className="w-full h-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto'
          }}
        />
      </div>

      {/* Navigation from App.jsx */}
      {/* Note: App.jsx provides the main navigation bar */}

      {/* Hero Text Overlay - centered on top */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className="text-center max-w-4xl px-8 pointer-events-auto">
          <animated.h1
            className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${currentTheme.accentGradient} bg-clip-text text-transparent mb-6 drop-shadow-lg ${currentTheme.headingFont}`}
            style={{
              opacity: 0,
              y: -50,
              config: { duration: 1000 }
            }}
          >
            BIJOY
            <span className="block text-6xl md:text-8xl">KHIANG</span>
          </animated.h1>

          <animated.p
            className={`text-lg md:text-2xl ${currentTheme.textMuted} mb-8 max-w-2xl mx-auto drop-shadow-md`}
            style={{
              opacity: 0,
              y: -30,
              config: { duration: 1200, delay: 200 }
            }}
          >
            Technical Officer specializing in data automation and conservation tech
          </animated.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <animated.button
              className={`px-8 py-4 ${currentTheme.buttonPrimary} font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
              style={{
                opacity: 0,
                y: -20,
                config: { duration: 1400, delay: 400 }
              }}
            >
              View About
            </animated.button>
            <animated.button
              onClick={() => setShowCvModal(true)}
              className={`px-8 py-4 ${currentTheme.buttonSecondary} font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
              style={{
                opacity: 0,
                y: -20,
                config: { duration: 1400, delay: 600 }
              }}
            >
              View CV
            </animated.button>
          </div>
        </div>
      </div>

      {/* Auto-Rotate Toggle - Top Right */}
      <button
        onClick={toggleAutoRotate}
        className={`absolute top-24 right-6 md:right-8 z-40 px-4 py-2 ${currentTheme.cardBg} backdrop-blur-sm rounded-lg shadow-md ${currentTheme.cardBorder} hover:opacity-90 transition-all`}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <svg
            className={`w-5 h-5 ${autoRotate ? currentTheme.accentText : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className={currentTheme.text}>Auto-Rotate: {autoRotate ? 'ON' : 'OFF'}</span>
        </div>
      </button>

      {/* Action Buttons - Bottom Right */}
      <div className="absolute bottom-24 right-6 md:right-8 z-40 flex flex-row gap-4">
        <a
          href="/projects"
          className={`inline-block px-8 py-4 ${currentTheme.buttonPrimary} font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
        >
          View Projects
        </a>
        <button
          onClick={() => setShowCvModal(true)}
          className={`inline-block px-8 py-4 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300`}
        >
          View CV
        </button>
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

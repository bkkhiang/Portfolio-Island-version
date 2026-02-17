import { useTheme } from '../contexts/ThemeContext.jsx';

const VideoBackground = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.35 }}
      >
        <source src="/air.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-amber-900/40 via-transparent to-orange-900/40 dark:from-stone-900/70 dark:via-transparent dark:to-stone-900/70 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;

import { useEffect, useRef } from 'react';

const CozyBackground = ({ theme = 'light' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const isDark = theme === 'dark';
    
    const colors = isDark 
      ? ['#1c1917', '#292524', '#44403c']  // Stone dark
      : ['#fef3c7', '#fde68a', '#fcd34d'];  // Warm cream/amber

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      const waveCount = 5;
      const baseHeight = canvas.height * 0.7;

      for (let w = 0; w < waveCount; w++) {
        const offset = w * 80;
        const alpha = 0.3 - (w * 0.05);
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = baseHeight + 
            Math.sin(x * 0.003 + time + offset) * 30 +
            Math.sin(x * 0.006 + time * 1.5 + offset) * 20 +
            Math.sin(x * 0.01 + time * 0.5 + offset) * 10;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        ctx.fillStyle = isDark 
          ? `rgba(28, 25, 23, ${alpha})`
          : `rgba(254, 243, 199, ${alpha})`;
        ctx.fill();
      }

      // Subtle floating particles (dust motes)
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.5 + i * 100) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.3 + i * 50) * 0.5 + 0.5) * canvas.height;
        const size = Math.sin(time + i) * 1 + 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? `rgba(251, 191, 36, ${0.1 + Math.sin(time + i) * 0.05})`
          : `rgba(217, 119, 6, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawWaves);
    };

    resizeCanvas();
    drawWaves();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default CozyBackground;

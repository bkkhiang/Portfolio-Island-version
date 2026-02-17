import { useEffect, useRef } from 'react';

const AiryBackground = ({ theme = 'light' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let bubbles = [];

    const isDark = theme === 'dark';
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createBubbles = () => {
      bubbles = [];
      const count = isDark ? 30 : 20;
      
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: -Math.random() * 0.5 - 0.2,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += bubble.speedX + Math.sin(bubble.wobble) * 0.3;
        bubble.y += bubble.speedY;

        // Reset bubble when it goes off screen
        if (bubble.y < -10) {
          bubble.y = canvas.height + 10;
          bubble.x = Math.random() * canvas.width;
        }
        if (bubble.x < -10) bubble.x = canvas.width + 10;
        if (bubble.x > canvas.width + 10) bubble.x = -10;

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        
        if (isDark) {
          gradient.addColorStop(0, `rgba(251, 191, 36, ${bubble.opacity})`);
          gradient.addColorStop(0.5, `rgba(245, 158, 11, ${bubble.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
        } else {
          gradient.addColorStop(0, `rgba(180, 83, 9, ${bubble.opacity})`);
          gradient.addColorStop(0.5, `rgba(217, 119, 6, ${bubble.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(217, 119, 6, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Small highlight
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawBubbles);
    };

    resizeCanvas();
    createBubbles();
    drawBubbles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createBubbles();
    });

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

export default AiryBackground;

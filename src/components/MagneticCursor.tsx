
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], .interactive')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], .interactive')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 3 : 2,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-sm" />
      </motion.div>
    </>
  );
};

export default MagneticCursor;

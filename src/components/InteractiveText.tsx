
import { motion } from 'framer-motion';
import { useState } from 'react';

interface InteractiveTextProps {
  text: string;
  className?: string;
}

const InteractiveText = ({ text, className = "" }: InteractiveTextProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block cursor-pointer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{
            y: hoveredIndex === index ? -10 : 0,
            color: hoveredIndex === index ? '#06b6d4' : 'inherit',
            scale: hoveredIndex === index ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          style={{
            textShadow: hoveredIndex === index ? '0 0 20px rgba(6, 182, 212, 0.8)' : 'none'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

export default InteractiveText;

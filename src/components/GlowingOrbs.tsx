
import { motion } from 'framer-motion';

const GlowingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large floating orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: `linear-gradient(${i * 72}deg, #06b6d4, #8b5cf6, #ec4899)`,
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Small dancing orbs */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`small-${i}`}
          className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

export default GlowingOrbs;

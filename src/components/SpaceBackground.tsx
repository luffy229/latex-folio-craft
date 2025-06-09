
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SpaceBackground = () => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 2,
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        animate={{
          background: [
            "linear-gradient(45deg, #0f172a, #581c87, #0f172a)",
            "linear-gradient(45deg, #0f172a, #7c3aed, #0f172a)",
            "linear-gradient(45deg, #0f172a, #581c87, #0f172a)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Nebula Effects */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + star.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* Shooting Stars */}
      <motion.div
        className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"
        animate={{
          x: [-100, window.innerWidth + 100],
          y: [100, 300],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-transparent rounded-full"
        animate={{
          x: [-50, window.innerWidth + 50],
          y: [200, 500],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 7,
          ease: "easeOut",
          delay: 3,
        }}
      />

      {/* Cosmic Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
    </div>
  );
};

export default SpaceBackground;


import { motion } from "framer-motion";
import { Atom, Orbit, Sparkles, Zap } from "lucide-react";

const FloatingElements = () => {
  const elements = [
    { icon: Atom, delay: 0, x: "10%", y: "20%" },
    { icon: Orbit, delay: 1, x: "80%", y: "10%" },
    { icon: Sparkles, delay: 2, x: "15%", y: "70%" },
    { icon: Zap, delay: 0.5, x: "85%", y: "60%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((Element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: Element.x, top: Element.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Element.delay,
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Element.icon className="w-6 h-6 text-cyan-300" />
          </div>
        </motion.div>
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Orbital Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-full h-full border border-cyan-500/20 rounded-full">
          <motion.div
            className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-full h-full border border-purple-500/20 rounded-full">
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingElements;

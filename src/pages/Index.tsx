import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye, Zap, Palette, Code, Rocket, Stars, Globe, Sparkles } from "lucide-react";
import PortfolioBuilder from "@/components/PortfolioBuilder";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import Footer from "@/components/Footer";
import ParticleSystem from "@/components/ParticleSystem";
import MagneticCursor from "@/components/MagneticCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import InteractiveText from "@/components/InteractiveText";
import GlowingOrbs from "@/components/GlowingOrbs";
import { useLenis } from "@/hooks/useLenis";
import { useGSAP } from "@/hooks/useGSAP";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const templatesRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const templatesInView = useInView(templatesRef, { once: true, margin: "-100px" });
  
  // Enhanced parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const featuresY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const templatesY = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Initialize hooks
  useLenis();
  useGSAP();
  const { playHoverSound, playClickSound, playSuccessSound } = useSoundEffects();

  if (showBuilder) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateX: -15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <PortfolioBuilder onBack={() => {
            setShowBuilder(false);
            playSuccessSound();
          }} />
        </motion.div>
      </AnimatePresence>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Background Effects */}
      <SpaceBackground />
      <FloatingElements />
      <ParticleSystem />
      <GlowingOrbs />
      <MagneticCursor />
      <ScrollProgressBar />
      
      {/* Enhanced Hero Section */}
      <motion.div 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: textScale }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="floating-element inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 text-cyan-300 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-medium mb-8 sm:mb-12 shadow-2xl interactive"
            onMouseEnter={playHoverSound}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            <span className="hidden sm:inline">LaTeX Portfolio Builder - Beyond Reality</span>
            <span className="sm:hidden">Portfolio Builder</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Stars className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="reveal-text text-5xl sm:text-7xl md:text-8xl lg:text-[12rem] font-black mb-8 sm:mb-12 relative leading-none tracking-tighter"
          >
            <InteractiveText 
              text="Cosmic"
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%] block"
            />
            <br />
            <InteractiveText 
              text="Folio"
              className="bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%] animation-delay-500 block"
            />
            
            {/* Enhanced floating orb with magnetic effect */}
            <motion.div
              className="absolute -top-6 sm:-top-12 -right-6 sm:-right-12 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-2xl opacity-70"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 2, opacity: 1 }}
            />
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="reveal-text text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-3xl lg:max-w-5xl mx-auto mb-12 sm:mb-16 leading-relaxed font-light px-4"
          >
            Transcend the ordinary. Create portfolios that exist beyond dimensions with the cosmic power of{" "}
            <motion.span 
              className="text-cyan-400 font-semibold interactive"
              whileHover={{ 
                textShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
                scale: 1.05,
              }}
              onMouseEnter={playHoverSound}
            >
              LaTeX
            </motion.span>
            , real-time compilation, and stellar templates that defy imagination.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full sm:w-auto"
            >
              <Button
                size="lg"
                onClick={() => {
                  setShowBuilder(true);
                  playClickSound();
                }}
                onMouseEnter={playHoverSound}
                className="interactive relative text-lg sm:text-xl px-8 sm:px-12 py-8 sm:py-10 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold shadow-2xl overflow-hidden border-2 border-cyan-400/50 w-full sm:w-auto"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4" />
                </motion.div>
                <span className="hidden sm:inline">Launch Into Space</span>
                <span className="sm:hidden">Launch</span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                onMouseEnter={playHoverSound}
                className="interactive text-lg sm:text-xl px-8 sm:px-12 py-8 sm:py-10 rounded-3xl border-3 border-cyan-400/60 bg-slate-900/60 backdrop-blur-xl text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-500 shadow-xl w-full sm:w-auto"
              >
                <Globe className="w-6 h-6 sm:w-7 sm:h-7 mr-3 sm:mr-4" />
                <span className="hidden sm:inline">Explore Templates</span>
                <span className="sm:hidden">Templates</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Features Grid */}
      <motion.div
        ref={featuresRef}
        style={{ y: featuresY }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.h2 
            className="reveal-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent px-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Quantum Features
          </motion.h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-2xl lg:max-w-3xl mx-auto font-light px-4">
            Harness the power of advanced technology to create portfolios that transcend reality
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
        >
          {[
            {
              icon: Code,
              title: "Quantum Templates",
              description: "Templates that exist in multiple dimensions - professional, academic, creative, and minimal realities designed for every career path",
              gradient: "from-cyan-500 to-blue-600",
              delay: 0
            },
            {
              icon: Zap,
              title: "Real-time Compilation",
              description: "Watch your portfolio materialize instantly as LaTeX code transforms into stellar documents with live preview technology",
              gradient: "from-purple-500 to-pink-600", 
              delay: 0.2
            },
            {
              icon: Download,
              title: "Cosmic Downloads",
              description: "Download both LaTeX source and compiled PDF - your creations ready for any universe or dimension you wish to explore",
              gradient: "from-pink-500 to-orange-600",
              delay: 0.4
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={featuresInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: feature.delay, type: "spring", stiffness: 100 }}
              className="cosmic-card perspective-1000"
            >
              <Card className="group relative h-full bg-slate-900/60 backdrop-blur-xl border-2 border-slate-700/40 hover:border-cyan-400/70 transition-all duration-700 overflow-hidden rounded-3xl shadow-2xl">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}
                />
                
                {/* Animated border glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <CardHeader className="text-center relative z-10 p-6 sm:p-8 lg:p-10">
                  <motion.div
                    className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 relative shadow-2xl`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.15,
                      boxShadow: "0 0 50px rgba(6, 182, 212, 0.6)"
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  <CardTitle className="text-2xl sm:text-3xl text-slate-100 mb-4 sm:mb-6 font-bold leading-tight">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Template Preview */}
      <motion.div
        ref={templatesRef}
        style={{ y: templatesY }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={templatesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.h2 
            className="reveal-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent px-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Interdimensional Templates
          </motion.h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl lg:max-w-4xl mx-auto font-light leading-relaxed px-4">
            Each template exists in its own reality, meticulously crafted for different purposes across the multiverse of professional excellence
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            { name: "Professional", icon: FileText, gradient: "from-cyan-500 to-blue-600", description: "Corporate excellence" },
            { name: "Academic", icon: Eye, gradient: "from-purple-500 to-indigo-600", description: "Scholarly achievements" },
            { name: "Creative", icon: Palette, gradient: "from-pink-500 to-orange-600", description: "Artistic expression" },
            { name: "Minimal", icon: Sparkles, gradient: "from-emerald-500 to-teal-600", description: "Clean simplicity" }
          ].map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 100, rotateY: 45 }}
              animate={templatesInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="cosmic-card perspective-1000"
            >
              <Card className="group cursor-pointer bg-slate-900/60 backdrop-blur-xl border-2 border-slate-700/40 hover:border-purple-400/70 transition-all duration-700 overflow-hidden relative rounded-3xl shadow-2xl h-full">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}
                />
                
                {/* Glowing edge effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-700`}
                />
                
                <CardContent className="p-6 sm:p-8 relative z-10 h-full flex flex-col">
                  <motion.div
                    className={`w-full h-32 sm:h-40 bg-gradient-to-br ${template.gradient} rounded-2xl mb-4 sm:mb-6 flex items-center justify-center relative overflow-hidden shadow-xl`}
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="relative z-10"
                    >
                      <template.icon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                    </motion.div>
                    
                    {/* Animated overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Floating particles */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                      }}
                    />
                  </motion.div>
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-xl sm:text-2xl text-slate-100 mb-2 sm:mb-3">{template.name}</h3>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                      {template.description}
                    </p>
                  </div>
                  
                  {/* Interactive hover indicator */}
                  <motion.div
                    className="mt-4 sm:mt-6 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r ${template.gradient} text-white text-xs sm:text-sm font-medium`}
                      whileHover={{ scale: 1.05 }}
                    >
                      Explore Template
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Floating Action Button */}
      <motion.div
        className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 15 }}
      >
        <motion.div
          whileHover={{ scale: 1.2, rotateY: 15 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(6, 182, 212, 0.3)",
              "0 0 40px rgba(124, 58, 237, 0.5)",
              "0 0 20px rgba(6, 182, 212, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Button
            onClick={() => {
              setShowBuilder(true);
              playClickSound();
            }}
            onMouseEnter={playHoverSound}
            className="interactive w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-2xl border-2 border-cyan-400/50 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;


import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye, Zap, Palette, Code, Rocket, Stars, Globe, Sparkles } from "lucide-react";
import PortfolioBuilder from "@/components/PortfolioBuilder";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import { useLenis } from "@/hooks/useLenis";
import { useGSAP } from "@/hooks/useGSAP";

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

  // Initialize smooth scrolling and GSAP animations
  useLenis();
  useGSAP();

  if (showBuilder) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateX: -15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <PortfolioBuilder onBack={() => setShowBuilder(false)} />
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
      <SpaceBackground />
      <FloatingElements />
      
      {/* Enhanced Hero Section */}
      <motion.div 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: textScale }}
        className="relative z-10 container mx-auto px-4 pt-32 pb-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="floating-element inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 text-cyan-300 px-8 py-4 rounded-full text-sm font-medium mb-12 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="w-5 h-5" />
            </motion.div>
            LaTeX Portfolio Builder - Beyond Reality
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Stars className="w-5 h-5" />
            </motion.div>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="reveal-text text-8xl md:text-[12rem] font-black mb-12 relative leading-none tracking-tighter"
          >
            <motion.span 
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Cosmic
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%] animation-delay-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Folio
            </motion.span>
            
            {/* Enhanced floating orb */}
            <motion.div
              className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-2xl opacity-70"
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
            />
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="reveal-text text-2xl md:text-3xl text-slate-300 max-w-5xl mx-auto mb-16 leading-relaxed font-light"
          >
            Transcend the ordinary. Create portfolios that exist beyond dimensions with the cosmic power of{" "}
            <motion.span 
              className="text-cyan-400 font-semibold"
              whileHover={{ textShadow: "0 0 20px rgba(6, 182, 212, 0.8)" }}
            >
              LaTeX
            </motion.span>
            , real-time compilation, and stellar templates that defy imagination.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                size="lg"
                onClick={() => setShowBuilder(true)}
                className="relative text-xl px-12 py-10 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold shadow-2xl overflow-hidden border-2 border-cyan-400/50"
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
                  <Rocket className="w-7 h-7 mr-4" />
                </motion.div>
                Launch Into Space
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
            >
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-12 py-10 rounded-3xl border-3 border-cyan-400/60 bg-slate-900/60 backdrop-blur-xl text-cyan-300 hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-500 shadow-xl"
              >
                <Globe className="w-7 h-7 mr-4" />
                Explore Templates
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Features Grid */}
      <motion.div
        ref={featuresRef}
        style={{ y: featuresY }}
        className="relative z-10 container mx-auto px-4 mb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="reveal-text text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Quantum Features
          </motion.h2>
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto font-light">
            Harness the power of advanced technology to create portfolios that transcend reality
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="grid lg:grid-cols-3 gap-12"
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
                
                <CardHeader className="text-center relative z-10 p-10">
                  <motion.div
                    className={`w-28 h-28 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 relative shadow-2xl`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.15,
                      boxShadow: "0 0 50px rgba(6, 182, 212, 0.6)"
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <feature.icon className="w-14 h-14 text-white" />
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
                  <CardTitle className="text-3xl text-slate-100 mb-6 font-bold leading-tight">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-lg leading-relaxed">
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
        className="relative z-10 container mx-auto px-4 pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={templatesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="reveal-text text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Interdimensional Templates
          </motion.h2>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed">
            Each template exists in its own reality, meticulously crafted for different purposes across the multiverse of professional excellence
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
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
                
                <CardContent className="p-8 relative z-10 h-full flex flex-col">
                  <motion.div
                    className={`w-full h-40 bg-gradient-to-br ${template.gradient} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden shadow-xl`}
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="relative z-10"
                    >
                      <template.icon className="w-16 h-16 text-white" />
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
                    <h3 className="font-bold text-2xl text-slate-100 mb-3">{template.name}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      {template.description}
                    </p>
                  </div>
                  
                  {/* Interactive hover indicator */}
                  <motion.div
                    className="mt-6 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`px-4 py-2 rounded-full bg-gradient-to-r ${template.gradient} text-white text-sm font-medium`}
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
        className="fixed bottom-10 right-10 z-50"
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
            onClick={() => setShowBuilder(true)}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-2xl border-2 border-cyan-400/50 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;

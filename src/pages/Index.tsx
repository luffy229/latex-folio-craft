
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye, Zap, Palette, Code, Rocket, Stars, Globe } from "lucide-react";
import PortfolioBuilder from "@/components/PortfolioBuilder";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const featuresY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const templatesY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  if (showBuilder) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <PortfolioBuilder onBack={() => setShowBuilder(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SpaceBackground />
      <FloatingElements />
      
      {/* Hero Section */}
      <motion.div 
        style={{ y: heroY }}
        className="relative z-10 container mx-auto px-4 pt-32 pb-24"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-pulse-slow"
          >
            <Rocket className="w-5 h-5" />
            LaTeX Portfolio Builder - Beyond Reality
            <Stars className="w-5 h-5" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-7xl md:text-9xl font-bold mb-8 relative"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
              Cosmic
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%] animation-delay-500">
              Folio
            </span>
            <motion.div
              className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Transcend the ordinary. Create portfolios that exist beyond dimensions with the cosmic power of LaTeX, 
            real-time compilation, and stellar templates that defy imagination.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => setShowBuilder(true)}
                className="relative text-lg px-10 py-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold shadow-2xl overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Rocket className="w-6 h-6 mr-3" />
                Launch Into Space
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-8 rounded-2xl border-2 border-cyan-400/50 bg-slate-900/50 backdrop-blur-sm text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
              >
                <Globe className="w-6 h-6 mr-3" />
                Explore Templates
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        style={{ y: featuresY }}
        className="relative z-10 container mx-auto px-4 mb-24"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Code,
              title: "Quantum Templates",
              description: "Templates that exist in multiple dimensions - professional, academic, creative, and minimal realities",
              gradient: "from-cyan-500 to-blue-600"
            },
            {
              icon: Zap,
              title: "Real-time Compilation",
              description: "Watch your portfolio materialize instantly as LaTeX code transforms into stellar documents",
              gradient: "from-purple-500 to-pink-600"
            },
            {
              icon: Download,
              title: "Cosmic Downloads",
              description: "Download both LaTeX source and compiled PDF - your creations ready for any universe",
              gradient: "from-pink-500 to-orange-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="group relative h-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <CardHeader className="text-center relative z-10">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6 relative`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                  <CardTitle className="text-2xl text-slate-100 mb-4">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Template Preview */}
      <motion.div
        style={{ y: templatesY }}
        className="relative z-10 container mx-auto px-4 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Interdimensional Templates
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Each template exists in its own reality, crafted for different purposes across the multiverse
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {["Professional", "Academic", "Creative", "Minimal"].map((template, index) => (
            <motion.div
              key={template}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -15, rotateX: 10 }}
              className="perspective-1000"
            >
              <Card className="group cursor-pointer bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-purple-400/50 transition-all duration-500 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <CardContent className="p-8 relative z-10">
                  <motion.div
                    className="w-full h-40 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Palette className="w-12 h-12 text-purple-400" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                  <h3 className="font-bold text-xl text-slate-100 mb-3">{template}</h3>
                  <p className="text-sm text-slate-400">
                    Perfect for {template.toLowerCase()} portfolios across all dimensions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setShowBuilder(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-2xl"
          >
            <Rocket className="w-8 h-8 text-white" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;

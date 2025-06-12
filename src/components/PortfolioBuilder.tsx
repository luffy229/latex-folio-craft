import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, FileText, Copy, RotateCcw, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LaTeXEditor from "./LaTeXEditor";
import PDFPreview from "./PDFPreview";

interface PortfolioBuilderProps {
  onBack: () => void;
}

const defaultLatexCode = `\\documentclass[10pt, letterpaper]{article}
\\usepackage[
    ignoreheadfoot, % set margins without considering header and footer
    top=2 cm, % seperation between body and page edge from the top
    bottom=2 cm, % seperation between body and page edge from the bottom
    left=2 cm, % seperation between body and page edge from the left
    right=2 cm, % seperation between body and page edge from the right
    footskip=1.0 cm, % seperation between body and footer
] {geometry} % for adjusting page geometry
\\usepackage{titlesec} % for customizing section titles
\\usepackage{tabularx} % for making tables with fixed width columns
\\usepackage{array} % tabularx requires this
\\usepackage[dvipsnames]{xcolor} % for coloring text
\\definecolor{primaryColor}{RGB}{0, 0, 0} % define primary color
\\usepackage{enumitem} % for customizing lists
\\usepackage{fontawesome5} % for using icons
\\usepackage{amsmath} % for math
\\usepackage[
    pdftitle={Pratik Pal's Resume},
    pdfauthor={Pratik A Pal},
    pdfcreator={Pratik_A_Pal_resume},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref} % for links, metadata and bookmarks
\\usepackage[pscoord]{eso-pic} % for floating text on the page
\\usepackage{calc} % for calculating lengths
\\usepackage{bookmark} % for bookmarks
\\usepackage{lastpage} % for getting the total number of pages
\\usepackage{changepage} % for one column entries (adjustwidth environment)
\\usepackage{paracol} % for two and three column entries
\\usepackage{ifthen} % for conditional statements

\\begin{document}

\\begin{center}
    \\textbf{\\LARGE Pratik A Pal} \\\\
    \\vspace{5pt}
    Goa,India | pratik2002pal@gmail.com | 9064 671 54 0 | Portfolio | Linkedin | Github
\\end{center}

\\section{Profile}
Passionate Software Developer with a strong foundation in full stack development, data structures, and scalable web applications. Interested in building performant and intuitive software products that create real world impact.

\\section{Education}
\\textbf{Padre Conceicao College Of Engineering}, BE in Electronics And Computer \\hfill Sept 2021 - June 2025 \\\\
\\textbf{Coursework:} Computer Architecture, Comparison of Learning Algorithms, Computational Theory

\\section{Experience}
\\textbf{Software Developer Engineer Intern}, Creative Capsule - Verna, GOA \\hfill July 2024 - Aug 2024
\\begin{itemize}
    \\item Engineered a real-time Stock Tracker using Next.js, TypeScript, and Tailwind CSS with dynamic UI components
    \\item Improved initial load time by up to 40\\% through Next.js server-side rendering (SSR) and static site generation (SSG) compared to client-side react
    \\item Collaborated with developers to implement React best practices and optimize frontend efficiency
\\end{itemize}

\\section{Technical Skills}
\\textbf{Languages:} C++, C, Java, Python, JavaScript, TypeScript, HTML, CSS \\\\
\\textbf{Frameworks:} React.js, Next.js, Node.js, Express.js, Tailwind CSS \\\\
\\textbf{Tools:} Git, Clerk, Convex, Node.js, Express.js, PostgreSQL \\\\
\\textbf{Mobile Development:} React Native, Flutter \\\\
\\textbf{Databases:} MongoDB, PostgreSQL \\\\
\\textbf{Core Skills:} Data Structures Algorithms (C++), Algorithm Design, Data Science, Machine Learning

\\section{Projects}
\\textbf{Portfolio Overlap Application} \\hfill Github
\\begin{itemize}
    \\item Engineered a web application to perform comprehensive portfolio overlap analysis for mutual funds and stocks.
    \\item Reduced manual portfolio comparison time by 70\\% using automated overlap detection and clean UI.
    \\item Technologies: Next.js, Tailwind CSS, TypeScript, Node.js, PostgreSQL
\\end{itemize}

\\textbf{Muse Streaming Music Platform} \\hfill Live Demo | Github
\\begin{itemize}
    \\item Developed a full-stack music streaming platform featuring secure user authentication, real-time chat functionality, and an administrative dashboard for content management.
    \\item Scaled to support 1000+ concurrent users, ensuring seamless music playbook and real-time communication.
    \\item Technologies: React, Node.js, Express.js, MongoDB, Socket.io, Clerk
\\end{itemize}

\\textbf{Online Code Editor — Multi-Language Integrated Development Environment (IDE)} \\hfill Live Demo | Github
\\begin{itemize}
    \\item Created a VSCode-inspired web-based IDE supporting over 10 programming languages, featuring execution history and workspace management for enhanced code development.
    \\item Enhanced code execution performance by 30\\% with optimized backend logic using Convex functions.
\\end{itemize}

\\end{document}`;

const PortfolioBuilder = ({ onBack }: PortfolioBuilderProps) => {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [latexCode, setLatexCode] = useState(defaultLatexCode);
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [autoCompileEnabled, setAutoCompileEnabled] = useState(true);
  const { toast } = useToast();

  const sections = ["Profile", "Education", "Experience", "Technical Skills", "Projects"];

  useEffect(() => {
    handleCompile();
  }, []);

  useEffect(() => {
    if (!autoCompileEnabled || !latexCode.trim()) return;
    const timer = setTimeout(() => {
      handleCompile();
    }, 1000);
    return () => clearTimeout(timer);
  }, [latexCode, autoCompileEnabled]);

  const handleCompile = async () => {
    if (!latexCode.trim()) return;
    setIsCompiling(true);
    setTimeout(() => {
      setPdfUrl(`data:application/pdf;base64,${btoa("Mock PDF content")}`);
      setIsCompiling(false);
      if (!autoCompileEnabled) {
        toast({
          title: "Compilation Complete",
          description: "Your portfolio has been compiled successfully!",
        });
      }
    }, 1500);
  };

  const handleLatexChange = (newCode: string) => {
    setLatexCode(newCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode);
    toast({
      title: "Code Copied!",
      description: "LaTeX code copied to clipboard",
    });
  };

  const handleReset = () => {
    setLatexCode(defaultLatexCode);
    toast({
      title: "Editor Reset",
      description: "LaTeX code reset to template default",
    });
  };

  const handleDownloadTeX = () => {
    const blob = new Blob([latexCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.tex";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "LaTeX source file downloaded successfully!",
    });
  };

  const handleDownloadPDF = () => {
    if (!pdfUrl) {
      toast({
        title: "No PDF Available",
        description: "Please compile your portfolio first.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Download Started",
      description: "PDF file downloaded successfully!",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Space Background with more dynamic elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated gradient overlay with more complexity */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(6,182,212,0.1), rgba(168,85,247,0.1), rgba(236,72,153,0.1))",
              "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(6,182,212,0.1), rgba(168,85,247,0.1))",
              "linear-gradient(225deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1), rgba(6,182,212,0.1))",
              "linear-gradient(315deg, rgba(6,182,212,0.1), rgba(168,85,247,0.1), rgba(236,72,153,0.1))",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Multiple floating orbs with different sizes and animations */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 25, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-500/15 to-cyan-500/15 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 40, -30, 0],
            scale: [0.8, 1.2, 1, 0.8],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1.2, 1, 1.4, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Additional smaller orbs for more depth */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 0.7, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      {/* Top Header Bar with enhanced animations */}
      <motion.div 
        className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10 h-14 flex items-center justify-between px-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left - Back button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-1.5 h-8 backdrop-blur-sm transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Menu
          </Button>
        </motion.div>

        {/* Center - Title with glow effect */}
        <motion.div 
          className="text-white/90 font-medium"
          animate={{ 
            textShadow: [
              "0 0 10px rgba(6, 182, 212, 0.3)",
              "0 0 20px rgba(6, 182, 212, 0.5)",
              "0 0 10px rgba(6, 182, 212, 0.3)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          RenderCV EngineeringResumes Theme
        </motion.div>

        {/* Right - Action buttons with stagger animation */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { text: "Auto-compile", active: autoCompileEnabled, onClick: () => setAutoCompileEnabled(!autoCompileEnabled) },
            { text: "Recompile", icon: Play, onClick: handleCompile, disabled: isCompiling, variant: "primary" },
            { text: "Review" },
            { text: "Share" },
            { text: "Submit" },
            { text: "History" },
          ].map((button, index) => (
            <motion.div
              key={button.text}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={button.variant === "primary" ? "default" : "outline"}
                size="sm"
                onClick={button.onClick}
                disabled={button.disabled}
                className={`
                  ${button.variant === "primary" 
                    ? "bg-green-500/80 hover:bg-green-500 text-white glow-effect" 
                    : "border-white/20 text-white/90 hover:bg-white/10"
                  } 
                  px-3 py-1.5 h-8 text-xs backdrop-blur-sm transition-all duration-300
                  ${button.active ? 'bg-white/10' : 'bg-transparent'}
                `}
              >
                {button.icon && <button.icon className="w-3 h-3 mr-1.5" />}
                {button.text}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Main Content - Three panels with enhanced animations */}
      <div className="relative z-10 flex h-[calc(100vh-56px)]">
        {/* Left Sidebar with enhanced animations */}
        <motion.div 
          className="w-60 bg-black/20 backdrop-blur-md border-r border-white/10"
          initial={{ x: -240, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-4">
            <motion.h3 
              className="text-sm font-medium text-white/90 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              File outline
            </motion.h3>
            <div className="space-y-1">
              {sections.map((section, index) => (
                <motion.div
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`px-3 py-2 text-sm cursor-pointer rounded transition-all duration-300 ${
                    selectedSection === section
                      ? 'bg-white/20 text-white backdrop-blur-sm glow-effect'
                      : 'text-white/70 hover:bg-white/10 hover:text-white/90'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center - LaTeX Editor with enhanced animations */}
        <motion.div 
          className="flex-1 border-r border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-full bg-black/20 backdrop-blur-md">
            {/* Editor Tabs */}
            <motion.div 
              className="bg-black/30 backdrop-blur-md border-b border-white/10 px-4 py-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-sm border-t border-l border-r border-white/20 px-4 py-2 text-sm font-medium text-white/90 rounded-t-lg"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                main.tex
              </motion.div>
            </motion.div>
            
            {/* Editor Toolbar */}
            <motion.div 
              className="bg-black/20 backdrop-blur-md border-b border-white/10 px-4 py-2 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70">Code Editor</span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { icon: Copy, onClick: handleCopy },
                  { icon: RotateCcw, onClick: handleReset },
                ].map((button, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={button.onClick}
                      className="text-white/70 hover:text-white hover:bg-white/10 p-2 h-8 w-8 backdrop-blur-sm transition-all duration-300"
                    >
                      <button.icon className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Editor Content */}
            <motion.div 
              className="h-[calc(100%-81px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <LaTeXEditor
                code={latexCode}
                onChange={handleLatexChange}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right - PDF Preview with enhanced animations */}
        <motion.div 
          className="flex-1"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="h-full bg-black/20 backdrop-blur-md">
            {/* Preview Header */}
            <motion.div 
              className="bg-black/20 backdrop-blur-md border-b border-white/10 px-4 py-2 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="w-4 h-4 text-white/70" />
                </motion.div>
                <span className="text-sm text-white/90 font-medium">Portfolio Preview</span>
                <span className="text-xs text-white/60">Compiled from LaTeX</span>
              </div>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                {[
                  { text: ".tex", onClick: handleDownloadTeX },
                  { text: "PDF", onClick: handleDownloadPDF, variant: "primary" },
                  { icon: Download, onClick: handleDownloadPDF },
                ].map((button, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={button.variant === "primary" ? "default" : button.icon ? "ghost" : "outline"}
                      size="sm"
                      onClick={button.onClick}
                      className={`
                        ${button.variant === "primary" 
                          ? "bg-blue-600/80 hover:bg-blue-600 text-white glow-effect" 
                          : button.icon 
                            ? "text-white/70 hover:text-white hover:bg-white/10 p-1.5 h-7 w-7"
                            : "border-white/20 text-white/90 hover:bg-white/10 px-3 py-1.5 h-7"
                        } 
                        text-xs backdrop-blur-sm transition-all duration-300
                      `}
                    >
                      {button.icon && <button.icon className="w-4 h-4" />}
                      {button.text}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Preview Content */}
            <motion.div 
              className="h-[calc(100%-41px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <PDFPreview
                pdfUrl={pdfUrl}
                isCompiling={isCompiling}
                fullscreen
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;

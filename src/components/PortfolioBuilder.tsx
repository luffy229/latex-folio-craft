
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
      {/* Space Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(6,182,212,0.1), rgba(168,85,247,0.1), rgba(236,72,153,0.1))",
              "linear-gradient(45deg, rgba(236,72,153,0.1), rgba(6,182,212,0.1), rgba(168,85,247,0.1))",
              "linear-gradient(45deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1), rgba(6,182,212,0.1))",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
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
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10 h-14 flex items-center justify-between px-4">
        {/* Left - Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-1.5 h-8 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Menu
        </Button>

        {/* Center - Title */}
        <div className="text-white/90 font-medium">
          RenderCV EngineeringResumes Theme
        </div>

        {/* Right - Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoCompileEnabled(!autoCompileEnabled)}
            className={`border-white/20 text-white/90 hover:bg-white/10 px-3 py-1.5 h-8 text-xs backdrop-blur-sm ${
              autoCompileEnabled ? 'bg-white/10' : 'bg-transparent'
            }`}
          >
            Auto-compile
          </Button>
          
          <Button
            size="sm"
            onClick={handleCompile}
            disabled={isCompiling}
            className="bg-green-500/80 hover:bg-green-500 text-white px-3 py-1.5 h-8 text-xs backdrop-blur-sm glow-effect"
          >
            <Play className="w-3 h-3 mr-1.5" />
            Recompile
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white/90 hover:bg-white/10 px-2 py-1.5 h-8 backdrop-blur-sm"
          >
            Review
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white/90 hover:bg-white/10 px-2 py-1.5 h-8 backdrop-blur-sm"
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white/90 hover:bg-white/10 px-2 py-1.5 h-8 backdrop-blur-sm"
          >
            Submit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white/90 hover:bg-white/10 px-2 py-1.5 h-8 backdrop-blur-sm"
          >
            History
          </Button>
        </div>
      </div>

      {/* Main Content - Three panels */}
      <div className="relative z-10 flex h-[calc(100vh-56px)]">
        {/* Left Sidebar - File outline */}
        <div className="w-60 bg-black/20 backdrop-blur-md border-r border-white/10">
          <div className="p-4">
            <h3 className="text-sm font-medium text-white/90 mb-3">File outline</h3>
            <div className="space-y-1">
              {sections.map((section) => (
                <motion.div
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`px-3 py-2 text-sm cursor-pointer rounded transition-all duration-300 ${
                    selectedSection === section
                      ? 'bg-white/20 text-white backdrop-blur-sm glow-effect'
                      : 'text-white/70 hover:bg-white/10 hover:text-white/90'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {section}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - LaTeX Editor */}
        <div className="flex-1 border-r border-white/10">
          <div className="h-full bg-black/20 backdrop-blur-md">
            {/* Editor Tabs */}
            <div className="bg-black/30 backdrop-blur-md border-b border-white/10 px-4 py-0 flex items-center">
              <div className="bg-white/10 backdrop-blur-sm border-t border-l border-r border-white/20 px-4 py-2 text-sm font-medium text-white/90 rounded-t-lg">
                main.tex
              </div>
            </div>
            
            {/* Editor Toolbar */}
            <div className="bg-black/20 backdrop-blur-md border-b border-white/10 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70">Code Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2 h-8 w-8 backdrop-blur-sm"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2 h-8 w-8 backdrop-blur-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="h-[calc(100%-81px)]">
              <LaTeXEditor
                code={latexCode}
                onChange={handleLatexChange}
              />
            </div>
          </div>
        </div>

        {/* Right - PDF Preview */}
        <div className="flex-1">
          <div className="h-full bg-black/20 backdrop-blur-md">
            {/* Preview Header */}
            <div className="bg-black/20 backdrop-blur-md border-b border-white/10 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/90 font-medium">Portfolio Preview</span>
                <span className="text-xs text-white/60">Compiled from LaTeX</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTeX}
                  className="border-white/20 text-white/90 hover:bg-white/10 px-3 py-1.5 h-7 text-xs backdrop-blur-sm"
                >
                  .tex
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="bg-blue-600/80 hover:bg-blue-600 text-white px-3 py-1.5 h-7 text-xs backdrop-blur-sm glow-effect"
                >
                  PDF
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 h-7 w-7 backdrop-blur-sm"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Preview Content */}
            <div className="h-[calc(100%-41px)]">
              <PDFPreview
                pdfUrl={pdfUrl}
                isCompiling={isCompiling}
                fullscreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;

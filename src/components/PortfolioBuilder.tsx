
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Eye, FileText, Zap, Rocket, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LaTeXEditor from "./LaTeXEditor";
import PDFPreview from "./PDFPreview";
import TemplateSelector from "./TemplateSelector";
import LoadingSkeleton from "./LoadingSkeleton";
import SpaceBackground from "./SpaceBackground";

interface PortfolioBuilderProps {
  onBack: () => void;
}

const defaultLatexCode = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{primarycolor}{RGB}{46, 125, 50}
\\titleformat{\\section}{\\large\\bfseries\\color{primarycolor}}{}{0em}{}[\\textcolor{primarycolor}{\\titlerule}]
\\titleformat{\\subsection}{\\bfseries}{}{0em}{}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{John Smith}}\\\\
\\vspace{5pt}
{\\large Senior Software Engineer}\\\\
\\vspace{5pt}
Email: john.smith@email.com | Phone: (555) 123-4567\\\\
LinkedIn: linkedin.com/in/johnsmith | GitHub: github.com/johnsmith
\\end{center}

\\section{Professional Summary}
Dynamic and results-oriented software engineer with 8+ years of experience in full-stack development. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve project goals.

\\section{Experience}
\\subsection{Senior Software Engineer | TechCorp Inc. | 2020 - Present}
\\begin{itemize}[leftmargin=20pt]
\\item Led development of microservices architecture serving 1M+ daily users
\\item Implemented CI/CD pipelines reducing deployment time by 60\\%
\\item Mentored 5 junior developers and conducted technical interviews
\\item Technologies: React, Node.js, AWS, Docker, Kubernetes
\\end{itemize}

\\subsection{Software Engineer | StartupXYZ | 2018 - 2020}
\\begin{itemize}[leftmargin=20pt]
\\item Developed and maintained RESTful APIs using Python and Django
\\item Collaborated with product team to deliver features for 50K+ users
\\item Optimized database queries improving response time by 40\\%
\\item Technologies: Python, Django, PostgreSQL, Redis
\\end{itemize}

\\section{Education}
\\textbf{Master of Science in Computer Science} | Stanford University | 2018\\\\
\\textbf{Bachelor of Science in Software Engineering} | UC Berkeley | 2016

\\section{Technical Skills}
\\textbf{Languages:} JavaScript, Python, Java, TypeScript, Go\\\\
\\textbf{Frameworks:} React, Node.js, Django, Spring Boot, Express\\\\
\\textbf{Tools:} AWS, Docker, Kubernetes, Git, Jenkins, MongoDB

\\section{Key Achievements}
\\begin{itemize}[leftmargin=20pt]
\\item Led team that delivered project 2 weeks ahead of schedule
\\item Reduced system downtime by 95\\% through monitoring implementation
\\item AWS Certified Solutions Architect - Professional (2022)
\\end{itemize}

\\end{document}`;

const PortfolioBuilder = ({ onBack }: PortfolioBuilderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [latexCode, setLatexCode] = useState(defaultLatexCode);
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [autoCompileEnabled, setAutoCompileEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      handleCompile();
    }, 2000);

    return () => clearTimeout(timer);
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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />
      
      {/* Top Header Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 sticky top-0"
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Menu and Title */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cosmos
              </Button>
            </motion.div>
            
            <div className="h-6 w-px bg-slate-600" />
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Cosmic Portfolio Builder
            </h1>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAutoCompileEnabled(!autoCompileEnabled);
                  toast({
                    title: autoCompileEnabled ? "Auto-compile Disabled" : "Auto-compile Enabled",
                    description: autoCompileEnabled 
                      ? "Manual compilation required" 
                      : "Changes will auto-compile",
                  });
                }}
                className={`border-slate-500/50 text-slate-300 hover:bg-slate-500/10 ${
                  autoCompileEnabled ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''
                }`}
              >
                <Zap className="w-4 h-4 mr-2" />
                Auto-compile
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompile}
                disabled={isCompiling}
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isCompiling ? "Compiling..." : "Compile"}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadTeX}
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                .tex
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                onClick={handleDownloadPDF}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="flex h-[calc(100vh-73px)] relative">
        {/* Left Sidebar - Templates (Mobile Overlay + Desktop Sidebar) */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                sidebarOpen ? 'fixed inset-y-0 z-50 lg:relative' : 'hidden lg:block'
              } w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 overflow-y-auto`}
            >
              {/* Mobile Overlay Background */}
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/50 -z-10"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h2 className="text-lg font-semibold text-cyan-300">Templates</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                  onTemplateLoad={setLatexCode}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area - Split Editor and Preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* LaTeX Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 border-r border-slate-700/50"
          >
            <Card className="h-full bg-slate-900/40 backdrop-blur-sm border-0 rounded-none">
              <CardHeader className="pb-2 border-b border-slate-700/50">
                <CardTitle className="flex items-center gap-2 text-cyan-300">
                  <Rocket className="w-5 h-5" />
                  LaTeX Editor
                  <span className="text-xs text-slate-400 ml-auto">main.tex</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-73px)]">
                <LaTeXEditor
                  code={latexCode}
                  onChange={handleLatexChange}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* PDF Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            <Card className="h-full bg-slate-900/40 backdrop-blur-sm border-0 rounded-none">
              <CardHeader className="pb-2 border-b border-slate-700/50">
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <Eye className="w-5 h-5" />
                  Live Preview
                  {isCompiling && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="ml-auto"
                    >
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-73px)]">
                <PDFPreview
                  pdfUrl={pdfUrl}
                  isCompiling={isCompiling}
                  fullscreen
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;

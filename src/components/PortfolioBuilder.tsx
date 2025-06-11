
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Eye, FileText, Zap, Menu, X } from "lucide-react";
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
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <SpaceBackground />
      
      {/* Top Header Bar - Exact match to image */}
      <div className="relative z-10 bg-slate-800/90 backdrop-blur border-b border-slate-700 flex items-center justify-between px-4 py-2 h-14">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-700 p-2"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-slate-300 hover:text-white hover:bg-slate-700 px-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoCompileEnabled(!autoCompileEnabled)}
            className={`border-slate-600 text-slate-300 hover:bg-slate-700 px-3 ${
              autoCompileEnabled ? 'bg-slate-700' : ''
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Auto-compile
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCompile}
            disabled={isCompiling}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 px-3"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isCompiling ? "Compiling..." : "Compile"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTeX}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 px-3"
          >
            <FileText className="w-4 h-4 mr-2" />
            .tex
          </Button>
          
          <Button
            size="sm"
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3"
          >
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-56px)] relative">
        {/* Left Sidebar - Templates */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                sidebarOpen ? 'fixed inset-y-0 z-50 lg:relative' : 'hidden lg:block'
              } w-80 bg-slate-800/90 backdrop-blur border-r border-slate-700 overflow-y-auto`}
            >
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
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={setSelectedTemplate}
                  onTemplateLoad={setLatexCode}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Split Editor and Preview */}
        <div className="flex-1 flex">
          {/* LaTeX Editor */}
          <div className="flex-1 border-r border-slate-700">
            <div className="h-full bg-slate-900">
              <div className="border-b border-slate-700 px-4 py-2 bg-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">main.tex</span>
                </div>
              </div>
              <div className="h-[calc(100%-49px)]">
                <LaTeXEditor
                  code={latexCode}
                  onChange={handleLatexChange}
                />
              </div>
            </div>
          </div>

          {/* PDF Preview */}
          <div className="flex-1">
            <div className="h-full bg-slate-900">
              <div className="border-b border-slate-700 px-4 py-2 bg-slate-800">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">Preview</span>
                  {isCompiling && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </div>
              <div className="h-[calc(100%-49px)]">
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
    </div>
  );
};

export default PortfolioBuilder;

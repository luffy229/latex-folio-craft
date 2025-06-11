
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, FileText, Zap } from "lucide-react";
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

\\section{Education}
\\textbf{Master of Science in Computer Science} | Stanford University | 2018\\\\
\\textbf{Bachelor of Science in Software Engineering} | UC Berkeley | 2016

\\section{Technical Skills}
\\textbf{Languages:} JavaScript, Python, Java, TypeScript, Go\\\\
\\textbf{Frameworks:} React, Node.js, Django, Spring Boot, Express\\\\
\\textbf{Tools:} AWS, Docker, Kubernetes, Git, Jenkins, MongoDB

\\end{document}`;

const PortfolioBuilder = ({ onBack }: PortfolioBuilderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [latexCode, setLatexCode] = useState(defaultLatexCode);
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [autoCompileEnabled, setAutoCompileEnabled] = useState(true);
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
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <SpaceBackground />
      
      {/* Top Header Bar - Exact match to image */}
      <div className="relative z-10 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 h-14 flex items-center justify-between px-4">
        {/* Left - Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-1.5 h-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Right - Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoCompileEnabled(!autoCompileEnabled)}
            className={`border-slate-600 text-slate-300 hover:bg-slate-700/50 px-3 py-1.5 h-8 text-xs ${
              autoCompileEnabled ? 'bg-slate-700/50' : ''
            }`}
          >
            <Zap className="w-3 h-3 mr-1.5" />
            Auto-compile
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCompile}
            disabled={isCompiling}
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 px-3 py-1.5 h-8 text-xs"
          >
            <Zap className="w-3 h-3 mr-1.5" />
            Compile
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTeX}
            className="border-slate-600 text-slate-300 hover:bg-slate-700/50 px-3 py-1.5 h-8 text-xs"
          >
            <FileText className="w-3 h-3 mr-1.5" />
            .tex
          </Button>
          
          <Button
            size="sm"
            onClick={handleDownloadPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 h-8 text-xs"
          >
            <Download className="w-3 h-3 mr-1.5" />
            PDF
          </Button>
        </div>
      </div>

      {/* Main Content - Three panels exactly like the image */}
      <div className="flex h-[calc(100vh-56px)] relative">
        {/* Left Sidebar - Templates */}
        <div className="w-80 bg-slate-800/80 backdrop-blur-sm border-r border-slate-700/50 overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Cosmic Portfolio Templates</h2>
              <p className="text-slate-400 text-sm">Choose from our collection of stellar templates, each crafted with unique design elements for different dimensions of professional excellence</p>
            </div>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              onTemplateLoad={setLatexCode}
            />
          </div>
        </div>

        {/* Center - LaTeX Editor */}
        <div className="flex-1 border-r border-slate-700/50">
          <div className="h-full bg-slate-900/50">
            {/* Editor Tab */}
            <div className="bg-slate-800/80 border-b border-slate-700/50 px-4 py-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300 font-medium">main.tex</span>
            </div>
            {/* Editor Content */}
            <div className="h-[calc(100%-41px)]">
              <LaTeXEditor
                code={latexCode}
                onChange={handleLatexChange}
              />
            </div>
          </div>
        </div>

        {/* Right - PDF Preview */}
        <div className="flex-1">
          <div className="h-full bg-slate-900/50">
            {/* Preview Tab */}
            <div className="bg-slate-800/80 border-b border-slate-700/50 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300 font-medium">Preview</span>
                {isCompiling && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                <span className="text-xs text-slate-400">Portfolio Preview</span>
                <span className="text-xs text-slate-500">Compiled from LaTeX</span>
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 h-6 text-xs ml-2"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
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


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Eye, FileText, Zap, Rocket } from "lucide-react";
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
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Auto-compile the default template on load
      handleCompile();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-compile when code changes (with debounce)
  useEffect(() => {
    if (!autoCompileEnabled || !latexCode.trim()) return;
    
    const timer = setTimeout(() => {
      handleCompile();
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [latexCode, autoCompileEnabled]);

  const handleCompile = async () => {
    if (!latexCode.trim()) return;
    
    setIsCompiling(true);
    
    // Simulate LaTeX compilation
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
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      {/* Header - Fully Responsive */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0"
      >
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="flex items-center gap-1 sm:gap-2 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Back to</span> Cosmos
                </Button>
              </motion.div>
              <div className="h-4 sm:h-6 w-px bg-slate-600" />
              <h1 className="text-sm sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Cosmic Portfolio Builder
              </h1>
            </div>
            
            {/* Action Buttons - Responsive Grid */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-end">
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
                  className={`flex items-center gap-1 sm:gap-2 border-slate-500/50 text-slate-300 hover:bg-slate-500/10 text-xs sm:text-sm px-2 sm:px-3 ${
                    autoCompileEnabled ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''
                  }`}
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Auto-compile</span>
                  <span className="sm:hidden">{autoCompileEnabled ? 'ON' : 'OFF'}</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="flex items-center gap-1 sm:gap-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{isCompiling ? "Compiling..." : "Compile"}</span>
                  <span className="sm:hidden">⚡</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTeX}
                  className="flex items-center gap-1 sm:gap-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">.tex</span>
                  <span className="sm:hidden">📄</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">PDF</span>
                  <span className="sm:hidden">📥</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Responsive */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="editor" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 h-10 sm:h-auto">
              <TabsTrigger 
                value="templates" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 text-xs sm:text-sm py-2"
              >
                Templates
              </TabsTrigger>
              <TabsTrigger 
                value="editor" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 text-xs sm:text-sm py-2"
              >
                Editor
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 text-xs sm:text-sm py-2"
              >
                Preview
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="templates">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TemplateSelector
                    selectedTemplate={selectedTemplate}
                    onTemplateSelect={setSelectedTemplate}
                    onTemplateLoad={setLatexCode}
                  />
                </motion.div>
              </TabsContent>

              <TabsContent value="editor">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid lg:grid-cols-2 gap-4 sm:gap-6 h-[70vh] sm:h-[80vh]"
                >
                  <Card className="flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-700/50">
                    <CardHeader className="pb-2 px-3 sm:px-6 py-3 sm:py-6">
                      <CardTitle className="flex items-center gap-2 text-cyan-300 text-sm sm:text-base">
                        <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                        LaTeX Editor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                      <LaTeXEditor
                        code={latexCode}
                        onChange={handleLatexChange}
                      />
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-700/50">
                    <CardHeader className="pb-2 px-3 sm:px-6 py-3 sm:py-6">
                      <CardTitle className="flex items-center gap-2 text-purple-300 text-sm sm:text-base">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        Live Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                      <PDFPreview
                        pdfUrl={pdfUrl}
                        isCompiling={isCompiling}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="preview">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50">
                    <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
                      <CardTitle className="text-cyan-300 text-sm sm:text-base">Portfolio Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <PDFPreview
                        pdfUrl={pdfUrl}
                        isCompiling={isCompiling}
                        fullscreen
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;

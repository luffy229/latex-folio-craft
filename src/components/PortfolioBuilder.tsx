
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

  const handleCompile = async () => {
    setIsCompiling(true);
    
    // Simulate LaTeX compilation
    setTimeout(() => {
      setPdfUrl(`data:application/pdf;base64,${btoa("Mock PDF content")}`);
      setIsCompiling(false);
      toast({
        title: "Compilation Complete",
        description: "Your portfolio has been compiled successfully!",
      });
    }, 1500);
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
      
      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Cosmos
                </Button>
              </motion.div>
              <div className="h-6 w-px bg-slate-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Cosmic Portfolio Builder
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="flex items-center gap-2 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"
                >
                  <Zap className="w-4 h-4" />
                  {isCompiling ? "Compiling..." : "Compile"}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTeX}
                  className="flex items-center gap-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  <FileText className="w-4 h-4" />
                  Download .tex
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="editor" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50">
              <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20">
                Templates
              </TabsTrigger>
              <TabsTrigger value="editor" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20">
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20">
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
                  className="grid lg:grid-cols-2 gap-6 h-[80vh]"
                >
                  <Card className="flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-cyan-300">
                        <Rocket className="w-5 h-5" />
                        LaTeX Editor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <LaTeXEditor
                        code={latexCode}
                        onChange={setLatexCode}
                      />
                    </CardContent>
                  </Card>

                  <Card className="flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-700/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-300">
                        <Eye className="w-5 h-5" />
                        Live Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
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
                    <CardHeader>
                      <CardTitle className="text-cyan-300">Portfolio Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
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

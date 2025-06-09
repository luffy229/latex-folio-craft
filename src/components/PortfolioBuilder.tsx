
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Eye, FileText, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LaTeXEditor from "./LaTeXEditor";
import PDFPreview from "./PDFPreview";
import TemplateSelector from "./TemplateSelector";
import LoadingSkeleton from "./LoadingSkeleton";

interface PortfolioBuilderProps {
  onBack: () => void;
}

const PortfolioBuilder = ({ onBack }: PortfolioBuilderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [latexCode, setLatexCode] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold">LaTeX Portfolio Builder</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompile}
                disabled={isCompiling}
                className="flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {isCompiling ? "Compiling..." : "Compile"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadTeX}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Download .tex
              </Button>
              
              <Button
                size="sm"
                onClick={handleDownloadPDF}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              onTemplateLoad={setLatexCode}
            />
          </TabsContent>

          <TabsContent value="editor">
            <div className="grid lg:grid-cols-2 gap-6 h-[80vh]">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>LaTeX Editor</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <LaTeXEditor
                    code={latexCode}
                    onChange={setLatexCode}
                  />
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <PDFPreview
                  pdfUrl={pdfUrl}
                  isCompiling={isCompiling}
                  fullscreen
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioBuilder;

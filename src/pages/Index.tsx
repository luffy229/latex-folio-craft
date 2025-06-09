
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye, Zap, Palette, Code } from "lucide-react";
import PortfolioBuilder from "@/components/PortfolioBuilder";

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  if (showBuilder) {
    return <PortfolioBuilder onBack={() => setShowBuilder(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-float">
            <Zap className="w-4 h-4" />
            LaTeX Portfolio Builder
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient mb-6">
            LaTeX Folio
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Create stunning professional portfolios with the power of LaTeX. 
            Real-time compilation, beautiful templates, and instant downloads.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => setShowBuilder(true)}
              className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FileText className="w-5 h-5 mr-2" />
              Start Building
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-primary/5 transition-all duration-300"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Templates
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Multiple Templates</CardTitle>
              <CardDescription>
                Choose from professional, academic, creative, and minimal portfolio templates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Real-time Preview</CardTitle>
              <CardDescription>
                See your portfolio update instantly as you edit with live LaTeX compilation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Easy Download</CardTitle>
              <CardDescription>
                Download both the LaTeX source code and compiled PDF with one click
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Template Preview */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Beautiful Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Professional", "Academic", "Creative", "Minimal"].map((template) => (
              <Card key={template} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                    <Palette className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{template}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Perfect for {template.toLowerCase()} portfolios
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

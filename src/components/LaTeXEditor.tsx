
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Copy, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LaTeXEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const LaTeXEditor = ({ code, onChange }: LaTeXEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localCode, setLocalCode] = useState(code);
  const { toast } = useToast();

  // Update local code when prop changes
  useEffect(() => {
    setLocalCode(code);
  }, [code]);

  // Debounce the onChange to avoid too many updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localCode !== code) {
        onChange(localCode);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localCode, onChange, code]);

  const handleCodeChange = (newCode: string) => {
    setLocalCode(newCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localCode);
    toast({
      title: "Code Copied!",
      description: "LaTeX code copied to clipboard",
    });
  };

  const handleReset = () => {
    const defaultCode = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{primarycolor}{RGB}{46, 125, 50}
\\titleformat{\\section}{\\large\\bfseries\\color{primarycolor}}{}{0em}{}[\\textcolor{primarycolor}{\\titlerule}]

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{Your Name}}\\\\
\\vspace{5pt}
{\\large Your Title}\\\\
\\vspace{5pt}
Email: your.email@example.com | Phone: (555) 123-4567
\\end{center}

\\section{Professional Summary}
Write your professional summary here...

\\section{Experience}
Add your work experience here...

\\section{Education}
Add your education details here...

\\section{Skills}
List your skills here...

\\end{document}`;
    
    setLocalCode(defaultCode);
    onChange(defaultCode);
    toast({
      title: "Editor Reset",
      description: "LaTeX code reset to template default",
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 bg-slate-800/50 border-b border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded flex items-center justify-center">
            <Code className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium text-cyan-300">LaTeX Editor</span>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 p-2 h-8 w-8"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-slate-300 hover:text-purple-300 hover:bg-purple-500/10 p-2 h-8 w-8"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative overflow-hidden">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 pointer-events-none ${
            isFocused ? 'opacity-100' : ''
          }`}
        />
        
        <textarea
          value={localCode}
          onChange={(e) => handleCodeChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-full p-4 bg-transparent text-slate-100 font-mono text-sm leading-relaxed resize-none outline-none border-0 placeholder-slate-500 overflow-y-auto"
          placeholder="Write your LaTeX code here..."
          spellCheck={false}
          style={{
            minHeight: '100%',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(148 163 184) transparent'
          }}
        />
        
        {/* Live editing indicator */}
        <div className="absolute bottom-4 right-4 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-slate-500 bg-slate-800/80 px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm"
          >
            <Zap className="w-3 h-3" />
            Live editing
          </motion.div>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="p-2 bg-slate-800/30 border-t border-slate-700/50 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Lines: {localCode.split('\n').length}</span>
          <span>Characters: {localCode.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LaTeXEditor;

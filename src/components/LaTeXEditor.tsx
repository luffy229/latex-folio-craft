
import { useState } from "react";
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
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: "LaTeX code copied to clipboard",
    });
  };

  const handleReset = () => {
    // You can implement reset to default template logic here
    toast({
      title: "Editor Reset",
      description: "LaTeX code reset to template default",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 bg-slate-800/50 border-b border-slate-700/50 rounded-t-lg">
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
              className="text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 p-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-slate-300 hover:text-purple-300 hover:bg-purple-500/10 p-2"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 ${
            isFocused ? 'opacity-100' : ''
          }`}
        />
        
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-full p-4 bg-slate-900/50 text-slate-100 font-mono text-sm leading-relaxed resize-none outline-none border-0 latex-editor placeholder-slate-500"
          placeholder="Write your LaTeX code here..."
          spellCheck={false}
        />
        
        {/* Syntax highlighting overlay could go here in the future */}
        <div className="absolute bottom-4 right-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-slate-500 bg-slate-800/80 px-2 py-1 rounded flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            Live editing
          </motion.div>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="p-2 bg-slate-800/30 border-t border-slate-700/50 rounded-b-lg">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Lines: {code.split('\n').length}</span>
          <span>Characters: {code.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LaTeXEditor;


import { Card, CardContent } from "@/components/ui/card";
import { FileText, Loader2, Eye, Download } from "lucide-react";
import { motion } from "framer-motion";

interface PDFPreviewProps {
  pdfUrl: string;
  isCompiling: boolean;
  fullscreen?: boolean;
}

const PDFPreview = ({ pdfUrl, isCompiling, fullscreen = false }: PDFPreviewProps) => {
  const height = fullscreen ? "h-[80vh]" : "h-full min-h-[400px]";

  if (isCompiling) {
    return (
      <div className={`${height} flex items-center justify-center bg-slate-900/40 backdrop-blur-sm rounded-lg border border-slate-700/50`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          </motion.div>
          
          <motion.p 
            className="text-cyan-300 text-lg font-semibold mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Compiling LaTeX in the Cosmos...
          </motion.p>
          
          <div className="mt-6 space-y-3 max-w-xs mx-auto">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-xs text-slate-400">Transforming your portfolio into stellar PDF...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className={`${height} flex items-center justify-center bg-slate-900/40 backdrop-blur-sm rounded-lg border-2 border-dashed border-cyan-500/30`}>
        <div className="text-center max-w-md">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-cyan-500/30"
          >
            <FileText className="w-10 h-10 text-cyan-300" />
          </motion.div>
          <h3 className="text-xl font-bold text-cyan-300 mb-3">No Cosmic Portfolio Yet</h3>
          <p className="text-slate-300 mb-4">
            Your portfolio awaits compilation in the cosmic void
          </p>
          <p className="text-sm text-slate-400">
            Click "Compile" to transform your LaTeX into a stellar PDF
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} bg-slate-900/40 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700/50`}>
      <div className="w-full h-full flex flex-col">
        {/* PDF Viewer Header */}
        <div className="bg-slate-800/50 border-b border-slate-700/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-cyan-300 font-semibold">Portfolio Preview</h4>
              <p className="text-xs text-slate-400">Compiled from LaTeX</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors text-sm"
          >
            <Download className="w-3 h-3" />
            Download
          </motion.button>
        </div>

        {/* PDF Content Area */}
        <div className="flex-1 p-6 flex items-center justify-center bg-gradient-to-br from-slate-900/20 to-purple-900/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Simulated PDF Content */}
            <div className="bg-white p-8 text-slate-900 min-h-[500px]">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">John Smith</h1>
                <p className="text-lg text-slate-600">Senior Software Engineer</p>
                <div className="text-sm text-slate-500 mt-2">
                  john.smith@email.com | (555) 123-4567 | LinkedIn | GitHub
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-300 pb-1 mb-3">
                    Professional Summary
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    Dynamic and results-oriented software engineer with 8+ years of experience in full-stack development. 
                    Proven track record of delivering scalable solutions and leading cross-functional teams.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-300 pb-1 mb-3">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">Senior Software Engineer | TechCorp Inc.</h3>
                      <p className="text-sm text-slate-600 mb-2">2020 - Present</p>
                      <ul className="text-slate-700 text-sm space-y-1 ml-4">
                        <li>• Led development of microservices architecture serving 1M+ daily users</li>
                        <li>• Implemented CI/CD pipelines reducing deployment time by 60%</li>
                        <li>• Mentored 5 junior developers and conducted technical interviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-300 pb-1 mb-3">
                    Education
                  </h2>
                  <div className="text-slate-700">
                    <p className="font-semibold">Master of Science in Computer Science</p>
                    <p className="text-sm text-slate-600">Stanford University | 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Info Footer */}
        <div className="bg-slate-800/30 border-t border-slate-700/50 p-3">
          <p className="text-xs text-slate-400 text-center">
            This is a preview of your compiled LaTeX portfolio. In production, this would show the actual PDF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;

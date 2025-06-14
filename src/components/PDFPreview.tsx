
import { Loader2, FileText, Download, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PDFPreviewProps {
  pdfUrl: string;
  isCompiling: boolean;
  fullscreen?: boolean;
  compilationMessage?: string;
}

const PDFPreview = ({ pdfUrl, isCompiling, fullscreen = false, compilationMessage }: PDFPreviewProps) => {
  const height = fullscreen ? "h-full" : "h-full min-h-[400px]";

  if (isCompiling) {
    return (
      <div className={`${height} flex items-center justify-center bg-black/30 backdrop-blur-md`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-white/70 text-sm">Compiling LaTeX...</p>
          <p className="text-white/50 text-xs mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className={`${height} flex items-center justify-center bg-black/30 backdrop-blur-md`}>
        <div className="text-center">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-white/80 mb-2">No PDF Available</h3>
          <p className="text-white/60 text-sm">Click "Recompile" to generate PDF</p>
        </div>
      </div>
    );
  }

  // Check if it's an HTML preview or actual PDF
  const isHtmlPreview = pdfUrl.startsWith('data:text/html');

  return (
    <div className={`${height} bg-black/30 backdrop-blur-md overflow-hidden`}>
      {/* Status indicator */}
      {compilationMessage && (
        <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 px-4 py-2 flex items-center gap-2">
          {isHtmlPreview ? (
            <AlertCircle className="w-4 h-4 text-yellow-400" />
          ) : (
            <FileText className="w-4 h-4 text-green-400" />
          )}
          <span className="text-xs text-white/70">{compilationMessage}</span>
        </div>
      )}
      
      {/* Preview content */}
      <div className={`${compilationMessage ? 'h-[calc(100%-41px)]' : 'h-full'}`}>
        {isHtmlPreview ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="LaTeX Preview"
            style={{ backgroundColor: 'white' }}
          />
        ) : (
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="PDF Preview"
          />
        )}
      </div>
    </div>
  );
};

export default PDFPreview;

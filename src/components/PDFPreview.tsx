
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Loader2 } from "lucide-react";

interface PDFPreviewProps {
  pdfUrl: string;
  isCompiling: boolean;
  fullscreen?: boolean;
}

const PDFPreview = ({ pdfUrl, isCompiling, fullscreen = false }: PDFPreviewProps) => {
  const height = fullscreen ? "h-[80vh]" : "h-full min-h-[400px]";

  if (isCompiling) {
    return (
      <div className={`${height} flex items-center justify-center bg-muted/20 rounded-lg`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Compiling LaTeX...</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse"></div>
            </div>
            <p className="text-xs text-muted-foreground">This may take a few moments</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className={`${height} flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted`}>
        <div className="text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No PDF generated yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Click "Compile" to generate your portfolio PDF
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} bg-muted/20 rounded-lg overflow-hidden`}>
      <div className="w-full h-full flex items-center justify-center bg-white/90 rounded-lg">
        <div className="text-center p-8">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">PDF Preview</h3>
          <p className="text-muted-foreground mb-4">
            Your compiled portfolio would appear here
          </p>
          <div className="bg-muted/50 p-4 rounded-lg max-w-md">
            <p className="text-sm text-muted-foreground">
              In a real implementation, this would show the actual PDF using a library like PDF.js
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;

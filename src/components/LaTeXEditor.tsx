
import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface LaTeXEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const LaTeXEditor = ({ code, onChange }: LaTeXEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [code]);

  return (
    <div className="h-full flex flex-col">
      <Textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing your LaTeX code here..."
        className="flex-1 min-h-[400px] font-mono text-sm leading-relaxed resize-none latex-editor"
        style={{ minHeight: "400px" }}
      />
      
      {/* LaTeX Syntax Helper */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-sm mb-2">LaTeX Quick Reference:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div><code>\textbf{'{bold}'}</code> - Bold text</div>
          <div><code>\textit{'{italic}'}</code> - Italic text</div>
          <div><code>\section{'{title}'}</code> - Section</div>
          <div><code>\subsection{'{title}'}</code> - Subsection</div>
          <div><code>\begin{'{itemize}'}</code> - Bullet list</div>
          <div><code>\item</code> - List item</div>
        </div>
      </div>
    </div>
  );
};

export default LaTeXEditor;

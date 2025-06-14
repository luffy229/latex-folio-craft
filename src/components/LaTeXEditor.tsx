
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface LaTeXEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export interface LaTeXEditorRef {
  scrollToLine: (line: number) => void;
}

const LaTeXEditor = forwardRef<LaTeXEditorRef, LaTeXEditorProps>(({ code, onChange }, ref) => {
  const [localCode, setLocalCode] = useState(code);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Expose scrollToLine method to parent component
  useImperativeHandle(ref, () => ({
    scrollToLine: (lineNumber: number) => {
      if (!textareaRef.current) return;
      
      const textarea = textareaRef.current;
      const lines = textarea.value.split('\n');
      let charPosition = 0;
      
      for (let i = 0; i < lineNumber - 1 && i < lines.length; i++) {
        charPosition += lines[i].length + 1; // +1 for newline character
      }
      
      textarea.focus();
      textarea.setSelectionRange(charPosition, charPosition);
      
      // Calculate scroll position
      const lineHeight = 24; // Approximate line height in pixels
      const scrollTop = Math.max(0, (lineNumber - 5) * lineHeight); // Show 5 lines above target
      textarea.scrollTop = scrollTop;
    }
  }));

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newCode = localCode.substring(0, start) + '  ' + localCode.substring(end);
      setLocalCode(newCode);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="h-full bg-black/30 backdrop-blur-md overflow-hidden">
      <div className="flex h-full">
        {/* Line numbers */}
        <div className="bg-black/40 backdrop-blur-sm border-r border-white/10 px-3 py-4 text-xs text-white/60 font-mono select-none min-w-[50px] overflow-y-auto">
          {localCode.split('\n').map((_, index) => (
            <div key={index} className="leading-6 text-right">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Editor content */}
        <div className="flex-1 relative overflow-hidden">
          <textarea
            ref={textareaRef}
            value={localCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-transparent text-white/90 font-mono text-sm leading-6 resize-none outline-none border-0 overflow-y-auto placeholder-white/40 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30"
            placeholder="Write your LaTeX code here..."
            spellCheck={false}
            style={{
              minHeight: '100%',
              fontFamily: 'JetBrains Mono, Courier New, monospace',
              tabSize: 2
            }}
          />
        </div>
      </div>
    </div>
  );
});

LaTeXEditor.displayName = "LaTeXEditor";

export default LaTeXEditor;

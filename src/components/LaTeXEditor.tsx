
import { useState, useEffect } from "react";

interface LaTeXEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const LaTeXEditor = ({ code, onChange }: LaTeXEditorProps) => {
  const [localCode, setLocalCode] = useState(code);

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

  return (
    <div className="h-full bg-black/30 backdrop-blur-md">
      <div className="flex h-full">
        {/* Line numbers */}
        <div className="bg-black/40 backdrop-blur-sm border-r border-white/10 px-3 py-4 text-xs text-white/60 font-mono select-none min-w-[50px]">
          {localCode.split('\n').map((_, index) => (
            <div key={index} className="leading-6 text-right">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Editor content */}
        <div className="flex-1 relative">
          <textarea
            value={localCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full p-4 bg-transparent text-white/90 font-mono text-sm leading-6 resize-none outline-none border-0 overflow-y-auto placeholder-white/40"
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
};

export default LaTeXEditor;


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
    <div className="h-full bg-white">
      <div className="flex h-full">
        {/* Line numbers */}
        <div className="bg-gray-50 border-r border-gray-200 px-3 py-4 text-xs text-gray-500 font-mono select-none min-w-[50px]">
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
            className="w-full h-full p-4 bg-white text-gray-900 font-mono text-sm leading-6 resize-none outline-none border-0 overflow-y-auto"
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

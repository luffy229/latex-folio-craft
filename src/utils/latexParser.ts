
export interface OutlineItem {
  id: string;
  title: string;
  type: 'section' | 'subsection' | 'subsubsection' | 'begin' | 'item';
  line: number;
  level: number;
}

export const parseLatexStructure = (latexCode: string): OutlineItem[] => {
  const lines = latexCode.split('\n');
  const outline: OutlineItem[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Match sections
    const sectionMatch = trimmedLine.match(/\\section\{([^}]+)\}/);
    if (sectionMatch) {
      outline.push({
        id: `section-${index}`,
        title: sectionMatch[1],
        type: 'section',
        line: index + 1,
        level: 1
      });
      return;
    }
    
    // Match subsections
    const subsectionMatch = trimmedLine.match(/\\subsection\{([^}]+)\}/);
    if (subsectionMatch) {
      outline.push({
        id: `subsection-${index}`,
        title: subsectionMatch[1],
        type: 'subsection',
        line: index + 1,
        level: 2
      });
      return;
    }
    
    // Match subsubsections
    const subsubsectionMatch = trimmedLine.match(/\\subsubsection\{([^}]+)\}/);
    if (subsubsectionMatch) {
      outline.push({
        id: `subsubsection-${index}`,
        title: subsubsectionMatch[1],
        type: 'subsubsection',
        line: index + 1,
        level: 3
      });
      return;
    }
    
    // Match begin environments
    const beginMatch = trimmedLine.match(/\\begin\{([^}]+)\}/);
    if (beginMatch) {
      outline.push({
        id: `begin-${index}`,
        title: `${beginMatch[1]} environment`,
        type: 'begin',
        line: index + 1,
        level: 2
      });
      return;
    }
    
    // Match itemize/enumerate items
    const itemMatch = trimmedLine.match(/\\item\s+(.+)/);
    if (itemMatch) {
      const itemText = itemMatch[1].substring(0, 30) + (itemMatch[1].length > 30 ? '...' : '');
      outline.push({
        id: `item-${index}`,
        title: itemText,
        type: 'item',
        line: index + 1,
        level: 3
      });
    }
  });
  
  return outline;
};

export const scrollToLine = (lineNumber: number, textareaRef: React.RefObject<HTMLTextAreaElement>) => {
  if (!textareaRef.current) return;
  
  const textarea = textareaRef.current;
  const lines = textarea.value.split('\n');
  let charPosition = 0;
  
  for (let i = 0; i < lineNumber - 1 && i < lines.length; i++) {
    charPosition += lines[i].length + 1; // +1 for newline character
  }
  
  textarea.focus();
  textarea.setSelectionRange(charPosition, charPosition);
  textarea.scrollTop = (lineNumber - 1) * 24; // Approximate line height
};

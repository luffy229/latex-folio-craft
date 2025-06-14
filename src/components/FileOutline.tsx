
import { motion } from "framer-motion";
import { 
  Hash, 
  FileText, 
  List, 
  ChevronRight, 
  ChevronDown,
  Layers
} from "lucide-react";
import { OutlineItem } from "@/utils/latexParser";
import { useState } from "react";

interface FileOutlineProps {
  outline: OutlineItem[];
  onItemClick: (line: number) => void;
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

const FileOutline = ({ outline, onItemClick, selectedSection, onSectionChange }: FileOutlineProps) => {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const getIcon = (type: OutlineItem['type']) => {
    switch (type) {
      case 'section':
        return <Hash className="w-4 h-4" />;
      case 'subsection':
        return <Hash className="w-3 h-3" />;
      case 'subsubsection':
        return <Hash className="w-3 h-3" />;
      case 'begin':
        return <Layers className="w-4 h-4" />;
      case 'item':
        return <List className="w-3 h-3" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getIndentation = (level: number) => {
    return level * 12; // 12px per level
  };

  const toggleSection = (itemId: string) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(itemId)) {
      newCollapsed.delete(itemId);
    } else {
      newCollapsed.add(itemId);
    }
    setCollapsedSections(newCollapsed);
  };

  const isCollapsible = (item: OutlineItem) => {
    return item.type === 'section' || item.type === 'subsection' || item.type === 'begin';
  };

  const shouldShowItem = (item: OutlineItem, index: number) => {
    // Always show top-level items
    if (item.level === 1) return true;
    
    // Find the parent section
    for (let i = index - 1; i >= 0; i--) {
      const prevItem = outline[i];
      if (prevItem.level < item.level) {
        return !collapsedSections.has(prevItem.id);
      }
    }
    return true;
  };

  if (outline.length === 0) {
    return (
      <div className="p-4">
        <h3 className="text-sm font-medium text-white/90 mb-3">File outline</h3>
        <div className="text-sm text-white/60 italic">
          No structure found. Add sections, subsections, or environments to see the outline.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-white/90 mb-3">File outline</h3>
      <div className="space-y-1">
        {outline.map((item, index) => {
          if (!shouldShowItem(item, index)) return null;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center text-sm cursor-pointer rounded transition-all duration-300 ${
                selectedSection === item.title
                  ? 'bg-white/20 text-white backdrop-blur-sm glow-effect'
                  : 'text-white/70 hover:bg-white/10 hover:text-white/90'
              }`}
              style={{ paddingLeft: `${8 + getIndentation(item.level)}px` }}
              onClick={() => {
                onItemClick(item.line);
                onSectionChange(item.title);
              }}
            >
              {/* Collapse/Expand button for collapsible items */}
              {isCollapsible(item) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(item.id);
                  }}
                  className="mr-1 p-0.5 hover:bg-white/10 rounded"
                >
                  {collapsedSections.has(item.id) ? (
                    <ChevronRight className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              )}
              
              {/* Icon */}
              <div className="mr-2 flex-shrink-0 text-white/50">
                {getIcon(item.type)}
              </div>
              
              {/* Title */}
              <div className="flex-1 py-2 truncate" title={item.title}>
                {item.title}
              </div>
              
              {/* Line number */}
              <div className="text-xs text-white/40 ml-2">
                {item.line}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FileOutline;

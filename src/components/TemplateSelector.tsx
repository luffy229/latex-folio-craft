
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Sparkles } from "lucide-react";
import { templates } from "@/data/templates";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onTemplateLoad: (code: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, onTemplateLoad }: TemplateSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateClick = (template: any) => {
    onTemplateSelect(template.id);
    // Immediately load the template code
    onTemplateLoad(template.code);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-glow">
          Choose Your Template
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
          Select from our collection of professional resume templates crafted for different industries and styles
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="flex flex-wrap gap-2 p-1 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600/50">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Templates Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card 
              className={`bg-slate-800/50 backdrop-blur-sm border transition-all duration-300 cursor-pointer interactive ${
                selectedTemplate === template.id
                  ? "border-cyan-400 shadow-lg shadow-cyan-400/20 ring-2 ring-cyan-400/30"
                  : "border-slate-600/50 hover:border-slate-500 hover:shadow-lg"
              }`}
              onClick={() => handleTemplateClick(template)}
            >
              <CardContent className="p-6">
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <div className="text-slate-400 text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Template Preview</p>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {template.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="bg-slate-700/50 text-slate-300 border-slate-600"
                    >
                      {template.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 text-slate-300 hover:text-white hover:bg-slate-700/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement preview functionality
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className={`flex-1 transition-all ${
                        selectedTemplate === template.id
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateClick(template);
                      }}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      {selectedTemplate === template.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Sparkles className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No templates found
          </h3>
          <p className="text-slate-400">
            Try selecting a different category or check back later for new templates
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TemplateSelector;

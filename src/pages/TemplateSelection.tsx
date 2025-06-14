
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import Navigation from "@/components/Navigation";
import MagneticCursor from "@/components/MagneticCursor";
import ParticleSystem from "@/components/ParticleSystem";
import TemplateSelector from "@/components/TemplateSelector";

const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleTemplateLoad = (code: string) => {
    // Navigate immediately when template code is loaded
    navigate('/portfolio/builder', { 
      state: { 
        templateId: selectedTemplate,
        templateCode: code 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <SpaceBackground />
      <FloatingElements />
      <ParticleSystem />
      <MagneticCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-24 left-6 z-10"
      >
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 hover:border-slate-500 interactive"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
      
      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Template Selector */}
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            onTemplateLoad={handleTemplateLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;

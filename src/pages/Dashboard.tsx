import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search,
  Filter,
  FileText,
  ArrowLeft
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import Navigation from "@/components/Navigation";
import MagneticCursor from "@/components/MagneticCursor";
import ParticleSystem from "@/components/ParticleSystem";
import PortfolioCard from "@/components/PortfolioCard";
import { usePortfolios } from "@/hooks/usePortfolios";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("All");
  const { portfolios, isLoading, deletePortfolio } = usePortfolios();
  const navigate = useNavigate();
  const { toast } = useToast();

  const templates = ["All", "Professional", "Academic", "Creative", "Minimal"];

  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch = portfolio.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = selectedTemplate === "All" || portfolio.template === selectedTemplate;
    return matchesSearch && matchesTemplate;
  });

  const handleEdit = (id: string) => {
    // TODO: Navigate to portfolio editor
    toast({
      title: "Feature coming soon",
      description: "Portfolio editing will be available soon.",
    });
  };

  const handlePreview = (id: string) => {
    // TODO: Navigate to portfolio preview
    toast({
      title: "Feature coming soon",
      description: "Portfolio preview will be available soon.",
    });
  };

  const handleDownload = (id: string) => {
    // TODO: Implement PDF download
    toast({
      title: "Feature coming soon",
      description: "PDF download will be available soon.",
    });
  };

  const handleDelete = async (id: string) => {
    await deletePortfolio.mutateAsync(id);
  };

  const handleCreatePortfolio = () => {
    navigate('/portfolio/templates');
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
        <Link to="/">
          <Button
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 hover:border-slate-500 interactive"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
      
      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-glow">
              Your Cosmic Portfolios
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
              Manage and edit your stellar portfolio collection across the multiverse
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search portfolios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors w-full sm:w-64 interactive"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors appearance-none cursor-pointer interactive"
                >
                  {templates.map(template => (
                    <option key={template} value={template} className="bg-slate-800">
                      {template}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Create New Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleCreatePortfolio}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg glow-effect interactive"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Portfolio
              </Button>
            </motion.div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-slate-300">Loading your portfolios...</p>
            </div>
          )}

          {/* Portfolio Grid */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredPortfolios.map((portfolio, index) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                />
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && filteredPortfolios.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                {portfolios.length === 0 ? "No portfolios yet" : "No portfolios found"}
              </h3>
              <p className="text-slate-400 mb-6">
                {searchTerm || selectedTemplate !== "All" 
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first cosmic portfolio to get started"
                }
              </p>
              <Button 
                onClick={handleCreatePortfolio}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white glow-effect interactive"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Portfolio
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Edit3, 
  Download, 
  Trash2, 
  Plus, 
  Calendar,
  Eye,
  Search,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import Navigation from "@/components/Navigation";

// Mock data for portfolios
const mockPortfolios = [
  {
    id: "1",
    name: "Software Engineer Resume",
    template: "Professional",
    lastModified: "2024-01-15",
    created: "2024-01-10",
    preview: "/api/placeholder/300/400"
  },
  {
    id: "2", 
    name: "Academic CV",
    template: "Academic",
    lastModified: "2024-01-12",
    created: "2024-01-08",
    preview: "/api/placeholder/300/400"
  },
  {
    id: "3",
    name: "Creative Portfolio",
    template: "Creative", 
    lastModified: "2024-01-10",
    created: "2024-01-05",
    preview: "/api/placeholder/300/400"
  },
  {
    id: "4",
    name: "Minimal Resume",
    template: "Minimal",
    lastModified: "2024-01-08",
    created: "2024-01-03",
    preview: "/api/placeholder/300/400"
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("All");

  const templates = ["All", "Professional", "Academic", "Creative", "Minimal"];

  const filteredPortfolios = mockPortfolios.filter(portfolio => {
    const matchesSearch = portfolio.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = selectedTemplate === "All" || portfolio.template === selectedTemplate;
    return matchesSearch && matchesTemplate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <SpaceBackground />
      <FloatingElements />
      
      {/* Navigation */}
      <Navigation />
      
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
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
                  className="pl-10 pr-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors w-full sm:w-64"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors appearance-none cursor-pointer"
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
              <Link to="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Portfolio
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPortfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 hover:border-cyan-400/70 transition-all duration-500 overflow-hidden shadow-2xl">
                  {/* Preview Image */}
                  <div className="relative aspect-[3/4] bg-slate-800/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-slate-400" />
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-cyan-500/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-slate-100 line-clamp-1">
                      {portfolio.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {portfolio.template}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Modified {portfolio.lastModified}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600/50 text-slate-300 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPortfolios.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No portfolios found
              </h3>
              <p className="text-slate-400 mb-6">
                {searchTerm || selectedTemplate !== "All" 
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first cosmic portfolio to get started"
                }
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Portfolio
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

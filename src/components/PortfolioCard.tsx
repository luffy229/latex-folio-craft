
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Edit3, 
  Download, 
  Trash2, 
  Calendar,
  Eye,
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Portfolio = Database['public']['Tables']['portfolios']['Row'];

interface PortfolioCardProps {
  portfolio: Portfolio;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onDownload: (id: string) => void;
}

const PortfolioCard = ({ portfolio, onEdit, onDelete, onPreview, onDownload }: PortfolioCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(portfolio.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 hover:border-cyan-400/70 transition-all duration-500 overflow-hidden shadow-2xl glow-effect interactive">
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
                onClick={() => onPreview(portfolio.id)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors interactive"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => onEdit(portfolio.id)}
                className="p-2 bg-cyan-500/80 backdrop-blur-sm rounded-full text-white hover:bg-cyan-500 transition-colors interactive"
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
              Modified {formatDate(portfolio.updated_at)}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(portfolio.id)}
              className="flex-1 border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white interactive"
            >
              <Download className="w-3 h-3 mr-1" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="border-slate-600/50 text-slate-300 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 interactive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioCard;

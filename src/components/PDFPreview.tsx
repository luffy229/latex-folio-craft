
import { Loader2, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PDFPreviewProps {
  pdfUrl: string;
  isCompiling: boolean;
  fullscreen?: boolean;
}

const PDFPreview = ({ pdfUrl, isCompiling, fullscreen = false }: PDFPreviewProps) => {
  const height = fullscreen ? "h-full" : "h-full min-h-[400px]";

  if (isCompiling) {
    return (
      <div className={`${height} flex items-center justify-center bg-black/30 backdrop-blur-md`}>
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-white/70 text-sm">Compiling LaTeX...</p>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className={`${height} flex items-center justify-center bg-black/30 backdrop-blur-md`}>
        <div className="text-center">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-white/80 mb-2">No PDF Available</h3>
          <p className="text-white/60 text-sm">Click "Recompile" to generate PDF</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} bg-black/30 backdrop-blur-md overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 p-6`}>
      <div className="max-w-2xl mx-auto">
        {/* Simulated PDF Content with space theme styling */}
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-white/20 glow-effect relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle floating particles in the background */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${10 + i * 8}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          <div className="text-center mb-6 relative">
            <motion.h1 
              className="text-2xl font-bold text-gray-900 mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Pratik A Pal
            </motion.h1>
            <motion.div 
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Goa,India | pratik2002pal@gmail.com | 9064 671 54 0 | Portfolio | Linkedin | Github
            </motion.div>
          </div>
          
          <div className="space-y-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">Profile</h2>
              <p className="text-gray-800 text-sm leading-relaxed">
                Passionate Software Developer with a strong foundation in full stack development, data structures, and scalable web applications. Interested in building performant and intuitive software products that create real world impact.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">Education</h2>
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 text-sm">Padre Conceicao College Of Engineering</span>
                <span className="text-gray-600 text-sm">Sept 2021 - June 2025</span>
              </div>
              <p className="text-gray-800 text-sm">BE in Electronics And Computer</p>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Coursework:</span> Computer Architecture, Comparison of Learning Algorithms, Computational Theory
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">Experience</h2>
              <div className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900 text-sm">Software Developer Engineer Intern, Creative Capsule - Verna, GOA</span>
                  <span className="text-gray-600 text-sm">July 2024 - Aug 2024</span>
                </div>
                <ul className="text-gray-800 text-sm space-y-1 ml-4">
                  <li>• Engineered a real-time Stock Tracker using Next.js, TypeScript, and Tailwind CSS with dynamic UI components</li>
                  <li>• Improved initial load time by up to 40% through Next.js server-side rendering (SSR) and static site generation (SSG) compared to client-side react</li>
                  <li>• Collaborated with developers to implement React best practices and optimize frontend efficiency</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">Technical Skills</h2>
              <div className="text-gray-800 text-sm space-y-1">
                <p><span className="font-semibold">Languages:</span> C++, C, Java, Python, JavaScript, TypeScript, HTML, CSS</p>
                <p><span className="font-semibold">Frameworks:</span> React.js, Next.js, Node.js, Express.js, Tailwind CSS</p>
                <p><span className="font-semibold">Tools:</span> Git, Clerk, Convex, Node.js, Express.js, PostgreSQL</p>
                <p><span className="font-semibold">Mobile Development:</span> React Native, Flutter</p>
                <p><span className="font-semibold">Databases:</span> MongoDB, PostgreSQL</p>
                <p><span className="font-semibold">Core Skills:</span> Data Structures Algorithms (C++), Algorithm Design, Data Science, Machine Learning</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">Projects</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900 text-sm">Portfolio Overlap Application</span>
                    <span className="text-gray-600 text-sm">Github</span>
                  </div>
                  <ul className="text-gray-800 text-sm space-y-1 ml-4">
                    <li>• Engineered a web application to perform comprehensive portfolio overlap analysis for mutual funds and stocks.</li>
                    <li>• Reduced manual portfolio comparison time by 70% using automated overlap detection and clean UI.</li>
                    <li>• Technologies: Next.js, Tailwind CSS, TypeScript, Node.js, PostgreSQL</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900 text-sm">Muse Streaming Music Platform</span>
                    <span className="text-gray-600 text-sm">Live Demo | Github</span>
                  </div>
                  <ul className="text-gray-800 text-sm space-y-1 ml-4">
                    <li>• Developed a full-stack music streaming platform featuring secure user authentication, real-time chat functionality, and an administrative dashboard for content management.</li>
                    <li>• Scaled to support 1000+ concurrent users, ensuring seamless music playback and real-time communication.</li>
                    <li>• Technologies: React, Node.js, Express.js, MongoDB, Socket.io, Clerk</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900 text-sm">Online Code Editor — Multi-Language Integrated Development Environment (IDE)</span>
                    <span className="text-gray-600 text-sm">Live Demo | Github</span>
                  </div>
                  <ul className="text-gray-800 text-sm space-y-1 ml-4">
                    <li>• Created a VSCode-inspired web-based IDE supporting over 10 programming languages, featuring execution history and workspace management for enhanced code development.</li>
                    <li>• Enhanced code execution performance by 30% with optimized backend logic using Convex functions.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PDFPreview;

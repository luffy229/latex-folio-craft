
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
      <div className={`${height} flex items-center justify-center bg-white`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-gray-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Compiling LaTeX...</p>
        </div>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className={`${height} flex items-center justify-center bg-white`}>
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No PDF Available</h3>
          <p className="text-gray-500 text-sm">Click "Recompile" to generate PDF</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} bg-white overflow-auto p-6`}>
      <div className="max-w-2xl mx-auto">
        {/* Simulated PDF Content with exact styling from image */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Pratik A Pal</h1>
            <div className="text-sm text-gray-600">
              Goa,India | pratik2002pal@gmail.com | 9064 671 54 0 | Portfolio | Linkedin | Github
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Profile</h2>
              <p className="text-gray-800 text-sm leading-relaxed">
                Passionate Software Developer with a strong foundation in full stack development, data structures, and scalable web applications. Interested in building performant and intuitive software products that create real world impact.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Education</h2>
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 text-sm">Padre Conceicao College Of Engineering</span>
                <span className="text-gray-600 text-sm">Sept 2021 - June 2025</span>
              </div>
              <p className="text-gray-800 text-sm">BE in Electronics And Computer</p>
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Coursework:</span> Computer Architecture, Comparison of Learning Algorithms, Computational Theory
              </p>
            </div>
            
            <div>
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
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Technical Skills</h2>
              <div className="text-gray-800 text-sm space-y-1">
                <p><span className="font-semibold">Languages:</span> C++, C, Java, Python, JavaScript, TypeScript, HTML, CSS</p>
                <p><span className="font-semibold">Frameworks:</span> React.js, Next.js, Node.js, Express.js, Tailwind CSS</p>
                <p><span className="font-semibold">Tools:</span> Git, Clerk, Convex, Node.js, Express.js, PostgreSQL</p>
                <p><span className="font-semibold">Mobile Development:</span> React Native, Flutter</p>
                <p><span className="font-semibold">Databases:</span> MongoDB, PostgreSQL</p>
                <p><span className="font-semibold">Core Skills:</span> Data Structures Algorithms (C++), Algorithm Design, Data Science, Machine Learning</p>
              </div>
            </div>
            
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;

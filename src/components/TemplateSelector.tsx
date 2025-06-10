import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, GraduationCap, Palette, Minimize2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  gradient: string;
  code: string;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onTemplateLoad: (code: string) => void;
}

const templates: Template[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and modern design perfect for corporate positions",
    icon: FileText,
    gradient: "from-cyan-500 to-blue-600",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}

\\definecolor{primarycolor}{RGB}{46, 125, 50}
\\titleformat{\\section}{\\large\\bfseries\\color{primarycolor}}{}{0em}{}[\\textcolor{primarycolor}{\\titlerule}]
\\titleformat{\\subsection}{\\bfseries}{}{0em}{}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{John Smith}}\\\\
\\vspace{5pt}
{\\large Senior Software Engineer}\\\\
\\vspace{5pt}
Email: john.smith@email.com | Phone: (555) 123-4567\\\\
LinkedIn: linkedin.com/in/johnsmith | GitHub: github.com/johnsmith
\\end{center}

\\section{Professional Summary}
Dynamic and results-oriented software engineer with 8+ years of experience in full-stack development. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve project goals.

\\section{Experience}
\\subsection{Senior Software Engineer | TechCorp Inc. | 2020 - Present}
\\begin{itemize}[leftmargin=20pt]
\\item Led development of microservices architecture serving 1M+ daily users
\\item Implemented CI/CD pipelines reducing deployment time by 60\\%
\\item Mentored 5 junior developers and conducted technical interviews
\\item Technologies: React, Node.js, AWS, Docker, Kubernetes
\\end{itemize}

\\subsection{Software Engineer | StartupXYZ | 2018 - 2020}
\\begin{itemize}[leftmargin=20pt]
\\item Developed and maintained RESTful APIs using Python and Django
\\item Collaborated with product team to deliver features for 50K+ users
\\item Optimized database queries improving response time by 40\\%
\\item Technologies: Python, Django, PostgreSQL, Redis
\\end{itemize}

\\section{Education}
\\textbf{Master of Science in Computer Science} | Stanford University | 2018\\\\
\\textbf{Bachelor of Science in Software Engineering} | UC Berkeley | 2016

\\section{Technical Skills}
\\textbf{Languages:} JavaScript, Python, Java, TypeScript, Go\\\\
\\textbf{Frameworks:} React, Node.js, Django, Spring Boot, Express\\\\
\\textbf{Tools:} AWS, Docker, Kubernetes, Git, Jenkins, MongoDB

\\section{Key Achievements}
\\begin{itemize}[leftmargin=20pt]
\\item Led team that delivered project 2 weeks ahead of schedule
\\item Reduced system downtime by 95\\% through monitoring implementation
\\item AWS Certified Solutions Architect - Professional (2022)
\\end{itemize}

\\end{document}`
  },
  {
    id: "academic",
    name: "Academic",
    description: "Scholarly format ideal for research and academic positions",
    icon: GraduationCap,
    gradient: "from-purple-500 to-indigo-600",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{url}

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{Dr. Sarah Johnson}}\\\\
\\vspace{5pt}
{\\large Assistant Professor of Computer Science}\\\\
\\vspace{5pt}
Department of Computer Science\\\\
MIT - Massachusetts Institute of Technology\\\\
Email: sarah.johnson@mit.edu | ORCID: 0000-0000-0000-0000
\\end{center}

\\section{Education}
\\textbf{Ph.D. in Computer Science} | Carnegie Mellon University | 2019\\\\
Dissertation: "Machine Learning Approaches to Natural Language Understanding"\\\\
Advisor: Dr. Michael Chen | GPA: 3.9/4.0

\\textbf{M.S. in Computer Science} | University of Washington | 2015\\\\
\\textbf{B.S. in Computer Science} | UC Berkeley | 2013 | Summa Cum Laude

\\section{Research Interests}
Primary research focus on Natural Language Processing and Machine Learning, with particular interest in transformer architectures and their applications to conversational AI. Secondary interests include computer vision and multimodal learning systems.

\\section{Publications}
\\subsection{Peer-Reviewed Journal Articles}
\\begin{enumerate}[leftmargin=20pt]
\\item \\textbf{Johnson, S.}, Chen, M., Wong, L. "Attention Mechanisms in Neural Machine Translation." \\textit{Journal of Machine Learning Research}, vol. 22, pp. 1-28, 2023.
\\item Chen, M., \\textbf{Johnson, S.} "Few-shot Learning for Domain Adaptation in NLP." \\textit{Computational Linguistics}, vol. 48, no. 3, pp. 567-592, 2022.
\\end{enumerate}

\\subsection{Conference Proceedings}
\\begin{enumerate}[leftmargin=20pt]
\\item \\textbf{Johnson, S.}, Liu, X. "Robust Question Answering with Pre-trained Language Models." \\textit{ACL 2023}, Toronto, Canada.
\\item Wang, K., \\textbf{Johnson, S.}, Brown, A. "Cross-lingual Transfer Learning for Low-Resource Languages." \\textit{EMNLP 2022}, Abu Dhabi, UAE.
\\end{enumerate}

\\section{Teaching Experience}
\\textbf{CS 6.034 Artificial Intelligence} | MIT | Fall 2022, Spring 2023\\\\
Role: Instructor | Enrollment: 180 students

\\textbf{CS 188 Introduction to Artificial Intelligence} | UC Berkeley | Spring 2020\\\\
Role: Teaching Assistant | Enrollment: 350 students

\\section{Grants and Awards}
\\begin{itemize}[leftmargin=20pt]
\\item NSF CAREER Award, National Science Foundation, \\$500,000, 2023-2028
\\item Best Paper Award, EMNLP Conference, 2022
\\item Google PhD Fellowship in Machine Learning, 2017-2019
\\end{itemize}

\\section{Professional Service}
\\begin{itemize}[leftmargin=20pt]
\\item Program Committee Member: ACL 2023, EMNLP 2022-2023
\\item Reviewer: JMLR, Computational Linguistics, TACL
\\item Workshop Organizer: "Advances in NLP" at ICML 2023
\\end{itemize}

\\end{document}`
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and artistic layout for creative professionals",
    icon: Palette,
    gradient: "from-pink-500 to-orange-600",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{fontspec}

\\definecolor{accent}{RGB}{142, 36, 170}
\\definecolor{secondary}{RGB}{46, 125, 50}

\\titleformat{\\section}{\\large\\bfseries\\color{accent}}{}{0em}{}[\\textcolor{accent}{\\titlerule[2pt]}]
\\titleformat{\\subsection}{\\bfseries\\color{secondary}}{}{0em}{}

\\begin{document}

\\begin{center}
{\\Huge \\textbf{\\color{accent}Maya Rodriguez}}\\\\
\\vspace{10pt}
{\\Large Creative Director \\& Brand Strategist}\\\\
\\vspace{10pt}
\\textcolor{accent}{\\rule{0.5\\textwidth}{2pt}}\\\\
\\vspace{10pt}
Email: maya.rodriguez@creative.com | Portfolio: mayavisual.com\\\\
Instagram: @mayavisual | LinkedIn: linkedin.com/in/mayarodriguez
\\end{center}

\\section{Creative Vision}
Passionate creative professional specializing in brand identity and visual storytelling. I believe in the power of design to create emotional connections between brands and their audiences, transforming ideas into compelling visual narratives that drive engagement and business growth.

\\section{Portfolio Highlights}
\\subsection{Rebranding Campaign - EcoTech Solutions | 2023}
\\textbf{Role:} Creative Director\\\\
\\textbf{Medium:} Digital \\& Print Identity System\\\\
\\textbf{Description:} Complete brand overhaul for sustainable technology startup. Developed visual identity, packaging design, and digital presence that increased brand recognition by 300\\% and contributed to \\$2M Series A funding.

\\subsection{"Future Cities" Exhibition | Museum of Modern Art | 2022}
\\textbf{Role:} Visual Designer \\& Art Director\\\\
\\textbf{Medium:} Interactive Installation \\& Digital Art\\\\
\\textbf{Description:} Immersive multimedia exhibition exploring urban sustainability. Created visual systems for 15 interactive displays, attracting 50K+ visitors and receiving critical acclaim in Design Week.

\\subsection{Nike "Run Wild" Campaign | Global Launch | 2021}
\\textbf{Role:} Senior Art Director\\\\
\\textbf{Medium:} Multi-platform Campaign\\\\
\\textbf{Description:} Led creative direction for international product launch spanning TV, digital, and outdoor advertising. Campaign achieved 45M impressions and 15\\% increase in product sales.

\\section{Experience}
\\subsection{Creative Director | Infinity Design Studio | 2021 - Present}
\\begin{itemize}[leftmargin=20pt]
\\item Lead creative strategy for 20+ high-profile clients including Fortune 500 companies
\\item Conceptualize and execute award-winning campaigns across all media channels
\\item Manage team of 8 designers and oversee \\$2M annual creative budget
\\item Increased client retention rate to 95\\% through innovative design solutions
\\end{itemize}

\\subsection{Senior Art Director | CreativeLab Agency | 2018 - 2021}
\\begin{itemize}[leftmargin=20pt]
\\item Designed visual identities for 50+ emerging and established brands
\\item Collaborated with strategy teams on brand positioning and messaging
\\item Led pitch presentations resulting in \\$5M new business wins
\\item Mentored junior designers and established creative quality standards
\\end{itemize}

\\section{Skills \\& Expertise}
\\textbf{Design Software:} Adobe Creative Suite, Sketch, Figma, Cinema 4D, Blender\\\\
\\textbf{Specialties:} Brand Identity, Typography, Motion Graphics, UI/UX Design, Art Direction\\\\
\\textbf{Creative Process:} Design Thinking, Visual Storytelling, User Research, Prototyping

\\section{Recognition \\& Awards}
\\begin{itemize}[leftmargin=20pt]
\\item Cannes Lions - Gold Lion for Digital Craft (2023)
\\item D\\&AD Pencil - Yellow Pencil for Brand Identity (2022)
\\item Featured in Creative Review "30 Under 30" (2021)
\\item AIGA Design Excellence Award (2020)
\\end{itemize}

\\end{document}`
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design focusing on content",
    icon: Minimize2,
    gradient: "from-emerald-500 to-teal-600",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1.2in]{geometry}
\\usepackage{enumitem}

\\begin{document}

\\begin{center}
{\\Large Alex Thompson}\\\\
\\vspace{15pt}
alex.thompson@email.com\\\\
(555) 987-6543\\\\
linkedin.com/in/alexthompson\\\\
github.com/alexthompson
\\end{center}

\\vspace{30pt}

\\section*{Summary}
Full-stack developer with 5 years of experience building scalable web applications. Passionate about clean code, user experience, and continuous learning. Seeking opportunities to contribute to innovative projects in a collaborative environment.

\\vspace{20pt}

\\section*{Experience}

\\textbf{Full Stack Developer}\\\\
\\textit{WebTech Solutions} | 2021 - Present
\\begin{itemize}[leftmargin=15pt, itemsep=5pt]
\\item Developed responsive web applications using React and Node.js
\\item Implemented RESTful APIs serving 100K+ monthly active users
\\item Reduced page load times by 50\\% through code optimization
\\item Collaborated with design team to improve user experience metrics
\\end{itemize}

\\textbf{Frontend Developer}\\\\
\\textit{Digital Innovations Co.} | 2019 - 2021
\\begin{itemize}[leftmargin=15pt, itemsep=5pt]
\\item Built interactive user interfaces with HTML, CSS, and JavaScript
\\item Integrated third-party APIs and payment processing systems
\\item Maintained 99.5\\% uptime for client-facing applications
\\item Participated in agile development process and code reviews
\\end{itemize}

\\textbf{Junior Web Developer}\\\\
\\textit{StartupHub} | 2018 - 2019
\\begin{itemize}[leftmargin=15pt, itemsep=5pt]
\\item Assisted in development of e-commerce platform
\\item Fixed bugs and implemented feature requests
\\item Learned modern development practices and version control
\\end{itemize}

\\vspace{20pt}

\\section*{Education}

\\textbf{Bachelor of Science in Computer Science}\\\\
\\textit{State University} | 2018\\\\
Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering

\\vspace{20pt}

\\section*{Technical Skills}

\\textbf{Languages:} JavaScript, Python, HTML, CSS, SQL\\\\
\\textbf{Frameworks:} React, Express.js, Django, Bootstrap\\\\
\\textbf{Tools:} Git, Docker, AWS, MongoDB, PostgreSQL\\\\
\\textbf{Other:} Agile Methodology, RESTful APIs, Responsive Design

\\vspace{20pt}

\\section*{Projects}

\\textbf{Personal Finance Tracker}
\\begin{itemize}[leftmargin=15pt, itemsep=3pt]
\\item Full-stack web application for expense tracking and budgeting
\\item Built with React frontend and Express.js backend
\\item Integrated Chart.js for data visualization and analytics
\\item Deployed on AWS with automated CI/CD pipeline
\\end{itemize}

\\textbf{Weather Dashboard}
\\begin{itemize}[leftmargin=15pt, itemsep=3pt]
\\item Responsive web app displaying weather data from multiple APIs
\\item Implemented geolocation features and 7-day forecasts
\\item Used local storage for user preferences and favorites
\\end{itemize}

\\end{document}`
  }
];

const TemplateSelector = ({
  selectedTemplate,
  onTemplateSelect,
  onTemplateLoad,
}: TemplateSelectorProps) => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTemplateSelect = (template: any) => {
    onTemplateSelect(template.id);
    onTemplateLoad(template.code);
    toast({
      title: "Template Selected",
      description: `${template.name} template loaded successfully!`,
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Cosmic Portfolio Templates
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Choose from our collection of stellar templates, each crafted for different dimensions of professional excellence
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredTemplate(template.id)}
            onHoverEnd={() => setHoveredTemplate(null)}
            whileHover={{ y: -10 }}
            className="relative"
          >
            <Card className={`group cursor-pointer h-full bg-slate-900/40 backdrop-blur-sm border transition-all duration-500 overflow-hidden ${
              selectedTemplate === template.id 
                ? 'border-cyan-400/70 shadow-lg shadow-cyan-400/20' 
                : 'border-slate-700/50 hover:border-purple-400/50'
            }`}>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 transition-opacity duration-500 ${
                  hoveredTemplate === template.id ? 'opacity-10' : ''
                }`}
              />
              
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${template.gradient} rounded-xl flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <template.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {selectedTemplate === template.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center"
                    >
                      <Zap className="w-3 h-3 text-slate-900" />
                    </motion.div>
                  )}
                </div>
                
                <CardTitle className="text-xl text-slate-100 mb-2">
                  {template.name}
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                {/* Template Preview */}
                <div className="bg-slate-800/50 rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center border border-slate-700/30">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: hoveredTemplate === template.id ? [1, 1.1, 1] : 1,
                        rotate: hoveredTemplate === template.id ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-16 h-20 bg-gradient-to-b ${template.gradient} rounded shadow-lg mx-auto mb-2 opacity-70`}
                    />
                    <p className="text-xs text-slate-400">Preview</p>
                  </div>
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white'
                        : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 border border-slate-600/50'
                    }`}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                  >
                    {selectedTemplate === template.id ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select Template'
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;

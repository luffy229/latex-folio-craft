
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Palette, User, GraduationCap, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  preview: string;
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
    description: "Clean and modern design perfect for corporate environments",
    category: "Business",
    icon: Briefcase,
    preview: "A sleek layout with clear sections for experience, skills, and achievements",
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
    description: "Formal layout ideal for research positions and academia",
    category: "Education",
    icon: GraduationCap,
    preview: "Traditional academic format with emphasis on publications and research",
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
    description: "Artistic and unique design for creative professionals",
    category: "Design",
    icon: Palette,
    preview: "Bold typography and creative sections for portfolios and artistic work",
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
    description: "Clean and simple design focusing on content over decoration",
    category: "Simple",
    icon: User,
    preview: "Elegant minimalist approach with plenty of white space and clear typography",
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

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, onTemplateLoad }: TemplateSelectorProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUseTemplate = (template: Template) => {
    onTemplateSelect(template.id);
    onTemplateLoad(template.code);
    toast({
      title: "Template Loaded",
      description: `${template.name} template has been loaded into the editor.`,
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Business: "bg-blue-500/10 text-blue-700",
      Education: "bg-green-500/10 text-green-700",
      Design: "bg-purple-500/10 text-purple-700",
      Simple: "bg-gray-500/10 text-gray-700",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/10 text-gray-700";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Choose Your Template</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select a professionally designed LaTeX template with pre-filled content. 
          Each template includes realistic data that you can customize to match your profile.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          
          return (
            <Card 
              key={template.id} 
              className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                selectedTemplate === template.id ? 'ring-2 ring-primary border-primary' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {template.name}
                        {selectedTemplate === template.id && (
                          <Badge variant="default" className="text-xs">Selected</Badge>
                        )}
                      </CardTitle>
                      <Badge variant="secondary" className={`text-xs mt-1 ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <CardDescription className="mt-3">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">{template.preview}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewTemplate(previewTemplate === template.id ? null : template.id)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {previewTemplate === template.id ? "Hide Code" : "Preview Code"}
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => handleUseTemplate(template)}
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Use Template
                    </Button>
                  </div>
                  
                  {previewTemplate === template.id && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">LaTeX Code Preview:</h4>
                      <pre className="text-xs overflow-x-auto max-h-40 overflow-y-auto latex-editor bg-background p-3 rounded border">
                        {template.code.substring(0, 500)}...
                      </pre>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

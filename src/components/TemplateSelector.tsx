
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

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titleformat{\\subsection}{\\bfseries}{}{0em}{}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{Your Name}}\\\\
\\vspace{5pt}
{\\large Professional Portfolio}\\\\
\\vspace{5pt}
Email: your.email@example.com | Phone: (555) 123-4567\\\\
LinkedIn: linkedin.com/in/yourprofile | Portfolio: yourwebsite.com
\\end{center}

\\section{Professional Summary}
Dynamic and results-oriented professional with expertise in [Your Field]. Proven track record of delivering high-quality solutions and driving organizational success.

\\section{Experience}
\\subsection{Senior Position Title | Company Name | 2020 - Present}
\\begin{itemize}[leftmargin=20pt]
\\item Led cross-functional teams to deliver complex projects on time and under budget
\\item Implemented innovative solutions that increased efficiency by 30\\%
\\item Mentored junior team members and contributed to knowledge sharing initiatives
\\end{itemize}

\\subsection{Position Title | Previous Company | 2018 - 2020}
\\begin{itemize}[leftmargin=20pt]
\\item Developed and maintained critical systems serving 10,000+ users
\\item Collaborated with stakeholders to define requirements and deliver solutions
\\item Achieved 99.9\\% uptime through proactive monitoring and optimization
\\end{itemize}

\\section{Education}
\\textbf{Degree Title} | University Name | Year\\\\
Relevant coursework: Course 1, Course 2, Course 3

\\section{Skills}
\\textbf{Technical:} Skill 1, Skill 2, Skill 3, Skill 4\\\\
\\textbf{Soft Skills:} Leadership, Communication, Problem Solving, Team Collaboration

\\section{Achievements}
\\begin{itemize}[leftmargin=20pt]
\\item Achievement 1 with quantifiable impact
\\item Recognition or award received
\\item Certification or professional development milestone
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

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{Dr. Your Name}}\\\\
\\vspace{5pt}
{\\large Academic Portfolio}\\\\
\\vspace{5pt}
Department of [Your Department]\\\\
University Name\\\\
Email: your.email@university.edu | ORCID: 0000-0000-0000-0000
\\end{center}

\\section{Education}
\\textbf{Ph.D. in [Field]} | University Name | Year\\\\
Dissertation: "Title of Your Dissertation"\\\\
Advisor: Dr. Advisor Name

\\textbf{M.S. in [Field]} | University Name | Year\\\\
\\textbf{B.S. in [Field]} | University Name | Year

\\section{Research Interests}
Primary research focus on [Research Area 1], with particular interest in [Specific Topic]. Secondary interests include [Research Area 2] and [Research Area 3].

\\section{Publications}
\\subsection{Peer-Reviewed Journal Articles}
\\begin{enumerate}[leftmargin=20pt]
\\item \\textbf{Your Name}, Co-author. "Title of Paper." \\textit{Journal Name}, vol. X, no. Y, pp. Z-W, Year.
\\item Co-author, \\textbf{Your Name}. "Another Paper Title." \\textit{Another Journal}, vol. A, no. B, pp. C-D, Year.
\\end{enumerate}

\\subsection{Conference Proceedings}
\\begin{enumerate}[leftmargin=20pt]
\\item \\textbf{Your Name}, Co-author. "Conference Paper Title." \\textit{Conference Name}, Location, Year.
\\end{enumerate}

\\section{Teaching Experience}
\\textbf{Course Title} | University Name | Semester Year\\\\
Role: [Instructor/Teaching Assistant]

\\section{Grants and Awards}
\\begin{itemize}[leftmargin=20pt]
\\item Grant Name, Funding Agency, Amount, Year
\\item Award Name, Awarding Organization, Year
\\end{itemize}

\\section{Professional Service}
\\begin{itemize}[leftmargin=20pt]
\\item Reviewer for Journal Name (Year-Present)
\\item Committee Member, Conference Name, Year
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

\\definecolor{accent}{RGB}{46, 125, 50}
\\titleformat{\\section}{\\large\\bfseries\\color{accent}}{}{0em}{}[\\textcolor{accent}{\\titlerule[2pt]}]
\\titleformat{\\subsection}{\\bfseries\\color{accent}}{}{0em}{}

\\begin{document}

\\begin{center}
{\\Huge \\textbf{\\color{accent}Your Name}}\\\\
\\vspace{10pt}
{\\Large Creative Professional}\\\\
\\vspace{10pt}
\\textcolor{accent}{\\rule{0.5\\textwidth}{2pt}}\\\\
\\vspace{10pt}
Email: your.email@example.com | Portfolio: yourportfolio.com\\\\
Instagram: @yourhandle | LinkedIn: linkedin.com/in/yourprofile
\\end{center}

\\section{Creative Vision}
Passionate creative professional specializing in [Your Specialty]. I believe in the power of design to tell stories, evoke emotions, and create meaningful connections between brands and their audiences.

\\section{Portfolio Highlights}
\\subsection{Project Name | Client/Company | Year}
\\textbf{Role:} [Your Role]\\\\
\\textbf{Medium:} [Digital/Print/Video/etc.]\\\\
\\textbf{Description:} Brief description of the project, your creative process, and the impact it had. Mention any awards or recognition received.

\\subsection{Another Project | Client | Year}
\\textbf{Role:} [Your Role]\\\\
\\textbf{Medium:} [Medium Type]\\\\
\\textbf{Description:} Another project description highlighting your creative problem-solving and results achieved.

\\section{Experience}
\\subsection{Creative Director | Agency Name | 2021 - Present}
\\begin{itemize}[leftmargin=20pt]
\\item Lead creative strategy for 15+ high-profile clients
\\item Conceptualize and execute award-winning campaigns
\\item Mentor junior designers and foster creative collaboration
\\end{itemize}

\\subsection{Senior Designer | Previous Company | 2018 - 2021}
\\begin{itemize}[leftmargin=20pt]
\\item Designed visual identities for emerging brands
\\item Collaborated with cross-functional teams on product launches
\\item Increased client satisfaction scores by 40\\% through innovative designs
\\end{itemize}

\\section{Skills \\& Expertise}
\\textbf{Design Software:} Adobe Creative Suite, Sketch, Figma, Cinema 4D\\\\
\\textbf{Specialties:} Brand Identity, Typography, Motion Graphics, UI/UX Design\\\\
\\textbf{Creative Process:} Concept Development, Visual Storytelling, User Research

\\section{Recognition}
\\begin{itemize}[leftmargin=20pt]
\\item Award Name - Category, Year
\\item Featured in Publication Name, Year
\\item Client testimonial or industry recognition
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
{\\Large Your Name}\\\\
\\vspace{15pt}
your.email@example.com\\\\
(555) 123-4567\\\\
linkedin.com/in/yourprofile
\\end{center}

\\vspace{30pt}

\\section*{Summary}
Brief professional summary that captures your key strengths and career objectives in 2-3 concise sentences.

\\vspace{20pt}

\\section*{Experience}

\\textbf{Job Title}\\\\
\\textit{Company Name} | Year - Present
\\begin{itemize}[leftmargin=15pt, itemsep=5pt]
\\item Key achievement or responsibility
\\item Another important contribution
\\item Quantifiable result or impact
\\end{itemize}

\\textbf{Previous Job Title}\\\\
\\textit{Previous Company} | Year - Year
\\begin{itemize}[leftmargin=15pt, itemsep=5pt]
\\item Relevant experience or accomplishment
\\item Skills or technologies used
\\item Results or outcomes achieved
\\end{itemize}

\\vspace{20pt}

\\section*{Education}

\\textbf{Degree Title}\\\\
\\textit{University Name} | Year

\\vspace{20pt}

\\section*{Skills}

Technical Skills, Software Proficiency, Language Skills, Relevant Competencies

\\vspace{20pt}

\\section*{Projects}

\\textbf{Project Name}
\\begin{itemize}[leftmargin=15pt, itemsep=3pt]
\\item Brief description of the project and your role
\\item Technologies or methods used
\\item Outcome or impact
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
          Select a professionally designed LaTeX template that matches your style and industry. 
          Each template is optimized for different career paths and presentation styles.
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

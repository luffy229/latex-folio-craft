
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, GraduationCap, Palette, Minimize2, Zap, Crown, Trophy, Briefcase, Code, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  gradient: string;
  accentColor: string;
  borderStyle: string;
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
    name: "Corporate Elite",
    description: "Sophisticated design for executive-level positions with premium styling",
    category: "business",
    icon: Crown,
    gradient: "from-slate-600 via-slate-700 to-slate-800",
    accentColor: "from-amber-400 to-yellow-500",
    borderStyle: "border-amber-400/50 shadow-amber-400/20",
    code: `\\documentclass[11pt,a4paper]{moderncv}
\\moderncvstyle{banking}
\\moderncvcolor{black}
\\usepackage[utf8]{inputenc}
\\usepackage[scale=0.75]{geometry}
\\usepackage{fontawesome}

\\name{Jonathan}{Sterling}
\\title{Chief Executive Officer}
\\address{Park Avenue 1250}{New York, NY 10028}{}
\\phone[mobile]{+1~(555)~123~4567}
\\email{j.sterling@executive.com}
\\social[linkedin]{jonathan-sterling}
\\photo[70pt][0.4pt]{picture}

\\begin{document}

\\makecvtitle

\\section{Executive Summary}
Visionary leader with 15+ years driving organizational transformation and sustainable growth. Proven track record of scaling companies from startup to IPO, managing P\\&L exceeding \\$500M, and leading teams of 1000+ employees across global markets.

\\section{Leadership Experience}
\\cventry{2020--Present}{Chief Executive Officer}{TechCorp International}{San Francisco}{}{
\\begin{itemize}
\\item Increased company valuation from \\$2B to \\$8B through strategic acquisitions
\\item Led successful IPO raising \\$1.2B in capital
\\item Expanded operations to 15 countries with 50\\% YoY revenue growth
\\item Implemented ESG initiatives reducing carbon footprint by 60\\%
\\end{itemize}}

\\cventry{2015--2020}{President \\& COO}{Innovation Dynamics}{Boston}{}{
\\begin{itemize}
\\item Orchestrated company turnaround, improving EBITDA from -15\\% to +25\\%
\\item Negotiated \\$500M merger with strategic partner
\\item Built high-performance culture increasing employee satisfaction by 40\\%
\\end{itemize}}

\\section{Board Positions \\& Advisory Roles}
\\cvitem{2021--Present}{Board Member, Future Technologies Foundation}
\\cvitem{2019--Present}{Strategic Advisor, Venture Capital Partners}
\\cvitem{2018--Present}{Chairman, Industry Innovation Council}

\\section{Education \\& Certifications}
\\cventry{1998--2002}{MBA, Strategy \\& Finance}{Harvard Business School}{Boston}{\\textit{Summa Cum Laude}}{}
\\cventry{1994--1998}{BS, Computer Science}{MIT}{Cambridge}{\\textit{Magna Cum Laude}}{}

\\section{Awards \\& Recognition}
\\cvitem{2023}{Fortune 500 CEO of the Year}
\\cvitem{2022}{Harvard Business Review Visionary Leader Award}
\\cvitem{2021}{Forbes Most Innovative Executive}

\\end{document}`
  },
  {
    id: "academic",
    name: "Scholarly Genesis",
    description: "Distinguished academic template with research-focused layout and citations",
    category: "education",
    icon: GraduationCap,
    gradient: "from-indigo-600 via-purple-600 to-violet-700",
    accentColor: "from-indigo-400 to-purple-500",
    borderStyle: "border-indigo-400/50 shadow-indigo-400/20",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{fontawesome}
\\usepackage{academicons}

\\definecolor{academicblue}{RGB}{25, 78, 132}
\\definecolor{accentgold}{RGB}{218, 165, 32}

\\titleformat{\\section}{\\Large\\bfseries\\color{academicblue}}{}{0em}{}[\\textcolor{accentgold}{\\titlerule[3pt]}]
\\titleformat{\\subsection}{\\large\\bfseries\\color{academicblue}}{}{0em}{}

\\begin{document}

\\begin{center}
{\\Huge \\textbf{\\color{academicblue}Dr. Elena Vasquez}}\\\\
\\vspace{8pt}
{\\Large\\color{accentgold} Professor of Theoretical Physics}\\\\
\\vspace{8pt}
{\\large Institute for Advanced Study $\\bullet$ Princeton University}\\\\
\\vspace{12pt}
\\faEnvelope\\, elena.vasquez@princeton.edu \\quad 
\\faPhone\\, +1 (609) 258-4000 \\quad
\\aiOrcid\\, 0000-0002-1825-0097\\\\
\\faGlobe\\, princeton.edu/\\textasciitilde evasquez \\quad
\\aiGoogleScholar\\, Elena Vasquez
\\end{center}

\\vspace{20pt}

\\section{Research Interests}
\\textbf{Primary:} Quantum Field Theory, String Theory, Mathematical Physics\\\\
\\textbf{Secondary:} Cosmology, Black Hole Physics, Quantum Gravity\\\\
\\textbf{Emerging:} Quantum Information Theory, Machine Learning in Physics

\\section{Academic Appointments}
\\textbf{Professor of Theoretical Physics} \\hfill 2018--Present\\\\
\\textit{Institute for Advanced Study, Princeton University}
\\begin{itemize}[leftmargin=15pt]
\\item Principal Investigator, NSF Quantum Foundations Grant (\\$2.5M)
\\item Director, Princeton Center for Theoretical Physics
\\item Mentor to 12 PhD students and 8 postdoctoral researchers
\\end{itemize}

\\textbf{Associate Professor} \\hfill 2012--2018\\\\
\\textit{Department of Physics, Stanford University}

\\textbf{Assistant Professor} \\hfill 2008--2012\\\\
\\textit{Department of Physics, MIT}

\\section{Education}
\\textbf{Ph.D. in Theoretical Physics} \\hfill 2008\\\\
\\textit{California Institute of Technology} $\\bullet$ Advisor: Prof. John Schwarz\\\\
Dissertation: "Dualities in String Theory and Their Cosmological Implications"

\\textbf{M.A. in Physics} \\hfill 2004\\\\
\\textit{University of Cambridge} $\\bullet$ First Class Honours

\\textbf{B.S. in Physics \\& Mathematics} \\hfill 2003\\\\
\\textit{Universidad Autónoma de Madrid} $\\bullet$ Summa Cum Laude

\\section{Selected Publications}
\\subsection{Peer-Reviewed Articles (h-index: 47, Citations: 8,200+)}
\\begin{enumerate}[leftmargin=20pt]
\\item \\textbf{Vasquez, E.}, Chen, L., Kumar, S. "Holographic Entanglement Entropy in AdS/CFT Correspondence." \\textit{Physical Review Letters}, 128, 201601 (2024). [Cited 340 times]

\\item Rodriguez, M., \\textbf{Vasquez, E.} "Quantum Error Correction in String Theory Models." \\textit{Journal of High Energy Physics}, 2023(11), 087. [Featured Article]

\\item \\textbf{Vasquez, E.}, Thompson, R. "Black Hole Information Paradox: A Quantum Information Perspective." \\textit{Nature Physics}, 19, 1123-1129 (2023). [Cover Article]
\\end{enumerate}

\\section{Grants \\& Funding}
\\begin{itemize}[leftmargin=15pt]
\\item NSF Quantum Foundations Initiative, PI, \\$2,500,000 (2022-2027)
\\item Simons Foundation Mathematics \\& Physical Sciences, PI, \\$800,000 (2020-2025)
\\item DOE Early Career Research Program, PI, \\$750,000 (2015-2020)
\\end{itemize}

\\section{Honors \\& Awards}
\\begin{itemize}[leftmargin=15pt]
\\item Breakthrough Prize in Fundamental Physics (2024)
\\item American Physical Society Fellowship (2020)
\\item Sloan Research Fellowship (2016)
\\item Marie Curie International Fellowship (2010)
\\end{itemize}

\\end{document}`
  },
  {
    id: "creative",
    name: "Artistic Fusion",
    description: "Bold creative template with artistic flair and innovative design elements",
    category: "design",
    icon: Palette,
    gradient: "from-pink-500 via-rose-500 to-orange-500",
    accentColor: "from-pink-400 to-orange-400",
    borderStyle: "border-pink-400/50 shadow-pink-400/20",
    code: `\\documentclass[11pt,a4paper,dvipsnames]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{fontawesome}
\\usepackage{tikz}
\\usepackage{multicol}

\\definecolor{creative1}{RGB}{219, 39, 119}
\\definecolor{creative2}{RGB}{251, 146, 60}
\\definecolor{creative3}{RGB}{139, 69, 19}

\\titleformat{\\section}{\\Large\\bfseries\\color{creative1}}{}{0em}{}[\\textcolor{creative2}{\\tikz[baseline=-0.6ex]\\draw[line width=3pt] (0,0) -- (\\textwidth,0);}]

\\begin{document}

\\begin{center}
\\tikz[remember picture,overlay] \\node[opacity=0.1] at (current page.center) {\\includegraphics[width=\\paperwidth]{creative-bg}};

{\\fontsize{36}{40}\\selectfont\\textbf{\\color{creative1}ZARA}}\\\\
{\\fontsize{36}{40}\\selectfont\\textbf{\\color{creative2}MARTINEZ}}\\\\
\\vspace{15pt}
{\\Large\\color{creative3}\\textsc{Creative Director \\& Brand Alchemist}}\\\\
\\vspace{15pt}
\\tikz \\draw[creative2, line width=2pt] (0,0) -- (4,0);\\\\
\\vspace{10pt}
\\faEnvelope\\, zara@creativestudio.com \\quad
\\faInstagram\\, @zaracreates \\quad
\\faBehance\\, zaramartinez\\\\
\\faGlobe\\, zaramartinez.design \\quad
\\faLinkedin\\, /in/zaramartinez
\\end{center}

\\vspace{25pt}

\\section{Creative Philosophy}
\\begin{multicols}{2}
\\textit{"Design is not just what it looks like—design is how it works, how it feels, and how it transforms the human experience. I create visual narratives that don't just communicate; they inspire, provoke, and ignite emotional connections."}

\\columnbreak

My approach blends traditional craftsmanship with cutting-edge digital innovation, creating brand experiences that transcend conventional boundaries and resonate across cultural dimensions.
\\end{multicols}

\\section{Signature Projects}
\\textbf{\\color{creative1}METAMORPHOSIS CAMPAIGN} \\hfill 2024\\\\
\\textit{Global Beauty Brand Transformation}
\\begin{itemize}[leftmargin=15pt, itemsep=3pt]
\\item Conceptualized and executed complete brand metamorphosis
\\item 360° campaign spanning 25 countries, 8 languages
\\item Achieved 400\\% increase in brand engagement
\\item Won Cannes Lions Grand Prix for Integrated Campaign
\\end{itemize}

\\textbf{\\color{creative1}URBAN SYMPHONY INSTALLATION} \\hfill 2023\\\\
\\textit{Interactive Public Art Experience}
\\begin{itemize}[leftmargin=15pt, itemsep=3pt]
\\item Created immersive sound-visual installation for NYC High Line
\\item Collaborated with 20 local artists and musicians
\\item Attracted 500K+ visitors over 6-month exhibition
\\item Featured in Artforum, Dezeen, and Creative Review
\\end{itemize}

\\textbf{\\color{creative1}SUSTAINABLE FUTURES SUMMIT} \\hfill 2022\\\\
\\textit{Conference Visual Identity \\& Experience Design}
\\begin{itemize}[leftmargin=15pt, itemsep=3pt]
\\item Developed comprehensive visual language for climate conference
\\item Designed interactive digital experiences for 10K+ attendees
\\item Created biodegradable signage system using innovative materials
\\item Influenced global sustainability design standards
\\end{itemize}

\\section{Studio Leadership}
\\textbf{\\color{creative1}Founder \\& Creative Director} \\hfill 2019--Present\\\\
\\textit{Martinez Creative Collective, Brooklyn}
\\begin{itemize}[leftmargin=15pt]
\\item Lead multidisciplinary team of 15 creatives
\\item Art direction for Fortune 500 brands and emerging artists
\\item Generated \\$3.2M revenue with 95\\% client retention rate
\\item Mentored 50+ emerging designers through residency programs
\\end{itemize}

\\section{Creative Arsenal}
\\begin{multicols}{3}
\\textbf{Visual Design}\\\\
Adobe Creative Suite\\\\
Figma \\& Sketch\\\\
Cinema 4D\\\\
Blender \\& Maya\\\\
Procreate

\\columnbreak

\\textbf{Strategy \\& Research}\\\\
Design Thinking\\\\
User Research\\\\
Brand Architecture\\\\
Cultural Analysis\\\\
Trend Forecasting

\\columnbreak

\\textbf{Innovation}\\\\
AR/VR Design\\\\
AI-Assisted Creation\\\\
Sustainable Materials\\\\
Interactive Installations\\\\
Emerging Media
\\end{multicols}

\\section{Recognition \\& Impact}
\\begin{itemize}[leftmargin=15pt]
\\item \\textbf{D\\&AD Black Pencil} - Outstanding Creative Excellence (2024)
\\item \\textbf{Creative Review Annual} - Top 10 Global Creatives (2023)
\\item \\textbf{Fast Company} - Most Creative People in Business (2022)
\\item \\textbf{TED Speaker} - "The Future of Empathetic Design" (2021)
\\end{itemize}

\\end{document}`
  },
  {
    id: "minimal",
    name: "Zen Simplicity",
    description: "Clean minimalist design emphasizing content over decoration",
    category: "simple",
    icon: Minimize2,
    gradient: "from-gray-400 via-gray-500 to-gray-600",
    accentColor: "from-gray-300 to-gray-400",
    borderStyle: "border-gray-400/50 shadow-gray-400/20",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1.5in]{geometry}
\\usepackage{enumitem}
\\usepackage{microtype}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{6pt}

\\begin{document}

\\begin{center}
\\textbf{\\Large ALEX CHEN}\\\\
Software Architect\\\\
\\vspace{10pt}
alex.chen@email.com\\\\
linkedin.com/in/alexchen\\\\
github.com/alexchen
\\end{center}

\\vspace{40pt}

\\textbf{Summary}

Pragmatic software architect with deep expertise in distributed systems and cloud infrastructure. I build scalable solutions that solve real problems with elegant simplicity.

\\vspace{30pt}

\\textbf{Experience}

\\textbf{Principal Software Architect}\\\\
CloudFirst Technologies | 2021 -- Present

Design and implement cloud-native architectures serving millions of users. Lead technical strategy across engineering organization of 200+ developers.

Key contributions:
\\begin{itemize}[leftmargin=15pt, itemsep=2pt]
\\item Architected microservices platform reducing deployment time from hours to minutes
\\item Designed auto-scaling infrastructure handling 10x traffic spikes seamlessly
\\item Established engineering practices improving code quality and team productivity
\\item Mentored 25+ engineers across senior and principal levels
\\end{itemize}

\\textbf{Senior Software Engineer}\\\\
DataFlow Systems | 2018 -- 2021

Built real-time data processing pipelines handling petabytes of information daily.

\\begin{itemize}[leftmargin=15pt, itemsep=2pt]
\\item Developed streaming analytics platform processing 100M+ events per second
\\item Optimized database queries improving response times by 80\\%
\\item Collaborated with product teams on user-facing analytics features
\\end{itemize}

\\textbf{Software Engineer}\\\\
StartupLab | 2016 -- 2018

Full-stack development for early-stage SaaS products.

\\begin{itemize}[leftmargin=15pt, itemsep=2pt]
\\item Built MVP products from concept to production deployment
\\item Implemented secure authentication and payment processing systems
\\item Maintained 99.9\\% uptime across all customer-facing services
\\end{itemize}

\\vspace{30pt}

\\textbf{Technical Skills}

\\textbf{Languages:} Go, Python, JavaScript, Java, SQL\\\\
\\textbf{Infrastructure:} AWS, Kubernetes, Docker, Terraform\\\\
\\textbf{Data:} PostgreSQL, Redis, Apache Kafka, Elasticsearch\\\\
\\textbf{Tools:} Git, Jenkins, Grafana, DataDog

\\vspace{30pt}

\\textbf{Education}

\\textbf{Master of Science, Computer Science}\\\\
Carnegie Mellon University | 2016

\\textbf{Bachelor of Science, Computer Engineering}\\\\
University of California, Berkeley | 2014

\\vspace{30pt}

\\textbf{Selected Projects}

\\textbf{Open Source Contributions}\\\\
Core contributor to Apache Beam and maintainer of popular Go libraries with 10K+ GitHub stars.

\\textbf{Technical Writing}\\\\
Author of "Designing Distributed Systems" (O'Reilly, 2023). Regular contributor to engineering blogs and conference speaker.

\\end{document}`
  },
  {
    id: "tech",
    name: "Digital Matrix",
    description: "Cutting-edge tech template with modern design and developer focus",
    category: "technology",
    icon: Code,
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    accentColor: "from-green-300 to-emerald-400",
    borderStyle: "border-green-400/50 shadow-green-400/20",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{fontawesome}
\\usepackage{listings}
\\usepackage{tikz}

\\definecolor{techgreen}{RGB}{34, 197, 94}
\\definecolor{darkgreen}{RGB}{5, 46, 22}
\\definecolor{lightgray}{RGB}{243, 244, 246}

\\titleformat{\\section}{\\Large\\bfseries\\color{techgreen}}{}{0em}{}[\\textcolor{darkgreen}{\\tikz[baseline=-0.5ex]\\fill[darkgreen] (0,0) rectangle (\\textwidth,2pt);}]

\\lstset{
    backgroundcolor=\\color{lightgray},
    basicstyle=\\ttfamily\\small,
    breaklines=true,
    frame=single
}

\\begin{document}

\\begin{center}
\\tikz[remember picture,overlay] {
    \\foreach \\i in {1,...,20} {
        \\node[green, opacity=0.1] at (\\i,\\i) {\\faCode};
    }
}

{\\fontsize{28}{32}\\selectfont\\textbf{\\color{techgreen}MAYA PATEL}}\\\\
\\vspace{8pt}
{\\Large\\color{darkgreen}\\texttt{Full-Stack Developer | DevOps Engineer}}\\\\
\\vspace{12pt}
\\texttt{\\faTerminal\\,\\,maya@devops.cloud\\,\\,|\\,\\,\\faGithub\\,\\,github.com/mayapatel\\,\\,|\\,\\,\\faLinkedin\\,\\,/in/maya-patel}\\\\
\\texttt{\\faGlobe\\,\\,mayapatel.dev\\,\\,|\\,\\,\\faTwitter\\,\\,@maya\\_codes\\,\\,|\\,\\,+1\\,(555)\\,987-6543}
\\end{center}

\\vspace{20pt}

\\section{\\faRocket\\quad Technical Expertise}
\\begin{center}
\\begin{tikzpicture}[node distance=1.5cm]
\\node[draw, rounded corners, fill=techgreen!20, minimum width=3cm] (frontend) {\\textbf{Frontend}};
\\node[draw, rounded corners, fill=techgreen!20, minimum width=3cm, right=of frontend] (backend) {\\textbf{Backend}};
\\node[draw, rounded corners, fill=techgreen!20, minimum width=3cm, right=of backend] (devops) {\\textbf{DevOps}};

\\node[below=0.5cm of frontend, text width=3cm, align=center] {React, Vue.js\\\\TypeScript\\\\Next.js, Nuxt};
\\node[below=0.5cm of backend, text width=3cm, align=center] {Node.js, Python\\\\Go, Rust\\\\GraphQL, REST};
\\node[below=0.5cm of devops, text width=3cm, align=center] {AWS, GCP\\\\Docker, K8s\\\\Terraform, Ansible};
\\end{tikzpicture}
\\end{center}

\\section{\\faCode\\quad Professional Experience}

\\textbf{\\color{techgreen}Senior Full-Stack Developer} \\hfill \\texttt{2022 -- Present}\\\\
\\textit{\\color{darkgreen}TechNova Solutions | Remote}
\\begin{itemize}[leftmargin=15pt]
\\item Architected microservices platform serving 2M+ daily active users
\\item Implemented real-time collaboration features using WebSocket and GraphQL subscriptions
\\item Reduced infrastructure costs by 40\\% through container optimization and auto-scaling
\\item Led migration from monolith to microservices, improving deployment frequency by 300\\%
\\end{itemize}

\\textbf{\\color{techgreen}DevOps Engineer} \\hfill \\texttt{2020 -- 2022}\\\\
\\textit{\\color{darkgreen}CloudFirst Dynamics | San Francisco, CA}
\\begin{itemize}[leftmargin=15pt]
\\item Built CI/CD pipelines reducing deployment time from 2 hours to 8 minutes
\\item Implemented Infrastructure as Code using Terraform and Ansible
\\item Achieved 99.99\\% uptime through advanced monitoring and alerting systems
\\item Managed multi-cloud Kubernetes clusters across AWS, GCP, and Azure
\\end{itemize}

\\textbf{\\color{techgreen}Full-Stack Developer} \\hfill \\texttt{2018 -- 2020}\\\\
\\textit{\\color{darkgreen}StartupHub | Austin, TX}
\\begin{itemize}[leftmargin=15pt]
\\item Developed progressive web applications with offline-first architecture
\\item Integrated payment systems processing \\$10M+ in annual transactions
\\item Optimized database queries improving API response times by 60\\%
\\item Mentored 5 junior developers in modern web development practices
\\end{itemize}

\\section{\\faGithub\\quad Open Source Contributions}

\\textbf{\\color{techgreen}React Performance Toolkit} \\hfill \\texttt{\\faStar\\,2.8k stars}\\\\
Creator and maintainer of performance optimization library for React applications.

\\textbf{\\color{techgreen}Docker Compose Templates} \\hfill \\texttt{\\faStar\\,1.5k stars}\\\\
Collection of production-ready Docker Compose configurations for common tech stacks.

\\textbf{\\color{techgreen}Kubernetes Operator} \\hfill \\texttt{\\faStar\\,900 stars}\\\\
Go-based Kubernetes operator for automated database backup and restoration.

\\section{\\faCertificate\\quad Certifications \\& Education}

\\textbf{\\color{techgreen}AWS Certified Solutions Architect - Professional} \\hfill \\texttt{2023}\\\\
\\textbf{\\color{techgreen}Certified Kubernetes Administrator (CKA)} \\hfill \\texttt{2022}\\\\
\\textbf{\\color{techgreen}Google Cloud Professional Cloud Architect} \\hfill \\texttt{2021}

\\textbf{\\color{techgreen}Bachelor of Science in Computer Science} \\hfill \\texttt{2018}\\\\
\\textit{University of Texas at Austin} | \\texttt{GPA: 3.8/4.0}

\\section{\\faRocket\\quad Notable Projects}

\\textbf{\\color{techgreen}Real-time Analytics Dashboard}\\\\
Built using React, D3.js, and WebSocket for live data visualization handling 100K+ concurrent users.

\\textbf{\\color{techgreen}Multi-tenant SaaS Platform}\\\\
Architected using Node.js, PostgreSQL, and Redis with automated scaling and tenant isolation.

\\textbf{\\color{techgreen}Edge Computing Framework}\\\\
Developed Go-based framework for deploying serverless functions at edge locations worldwide.

\\end{document}`
  },
  {
    id: "executive",
    name: "Leadership Pinnacle",
    description: "Premium executive template for C-level positions and board members",
    category: "leadership",
    icon: Trophy,
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    accentColor: "from-blue-400 to-indigo-500",
    borderStyle: "border-blue-400/50 shadow-blue-400/20",
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{fontawesome}
\\usepackage{tikz}
\\usepackage{tabularx}

\\definecolor{execblue}{RGB}{30, 64, 175}
\\definecolor{goldaccent}{RGB}{245, 158, 11}
\\definecolor{darkgray}{RGB}{75, 85, 99}

\\titleformat{\\section}{\\Large\\bfseries\\color{execblue}}{}{0em}{}[\\textcolor{goldaccent}{\\tikz[baseline=-0.5ex]\\fill[goldaccent] (0,0) rectangle (\\textwidth,3pt);}]

\\begin{document}

\\begin{center}
\\tikz[remember picture,overlay] {
    \\node[opacity=0.05] at (current page.north) {\\includegraphics[width=\\paperwidth]{executive-pattern}};
}

{\\fontsize{32}{36}\\selectfont\\textbf{\\color{execblue}ROBERT J. ANDERSON}}\\\\
\\vspace{8pt}
{\\Large\\color{goldaccent}Chief Executive Officer \\& Chairman}\\\\
\\vspace{12pt}
\\textcolor{darkgray}{\\rule{0.6\\textwidth}{1pt}}\\\\
\\vspace{8pt}
\\begin{tabularx}{\\textwidth}{@{}X@{\\hspace{1cm}}X@{}}
\\centering\\faEnvelope\\, r.anderson@globalcorp.com & \\centering\\faPhone\\, +1 (212) 555-0123 \\\\
\\centering\\faLinkedin\\, /in/robert-anderson-ceo & \\centering\\faGlobe\\, robertanderson.executive
\\end{tabularx}
\\end{center}

\\vspace{25pt}

\\section{Executive Profile}
Transformational CEO with 20+ years leading global organizations through complex market dynamics and digital transformation. Proven track record of creating shareholder value exceeding \\$15B through strategic vision, operational excellence, and stakeholder engagement. Board-certified director with expertise in M\\&A, international expansion, and sustainable business practices.

\\section{Leadership Experience}

\\textbf{\\color{execblue}Chief Executive Officer \\& Chairman} \\hfill \\textcolor{goldaccent}{2019 -- Present}\\\\
\\textit{Global Dynamics Corporation | New York, NY}
\\begin{itemize}[leftmargin=15pt, itemsep=4pt]
\\item Transformed traditional manufacturing company into technology leader, increasing market cap from \\$8B to \\$23B
\\item Successfully navigated company through COVID-19 pandemic with zero layoffs and 15\\% revenue growth
\\item Led acquisition strategy resulting in 12 strategic purchases worth \\$4.2B
\\item Implemented ESG framework achieving carbon neutrality and 40\\% diversity in leadership roles
\\item Delivered 180\\% total shareholder return over 5-year tenure
\\end{itemize}

\\textbf{\\color{execblue}President \\& Chief Operating Officer} \\hfill \\textcolor{goldaccent}{2015 -- 2019}\\\\
\\textit{Meridian Industries | Chicago, IL}
\\begin{itemize}[leftmargin=15pt, itemsep=4pt]
\\item Orchestrated largest turnaround in company history, improving EBITDA from -8\\% to +22\\%
\\item Launched digital transformation initiative resulting in \\$500M cost savings annually
\\item Expanded international presence from 8 to 25 countries, growing global revenue by 140\\%
\\item Built high-performance leadership team reducing executive turnover by 60\\%
\\end{itemize}

\\textbf{\\color{execblue}Senior Vice President, Strategy} \\hfill \\textcolor{goldaccent}{2012 -- 2015}\\\\
\\textit{Fortune Enterprises | Boston, MA}
\\begin{itemize}[leftmargin=15pt, itemsep=4pt]
\\item Developed and executed \\$2.5B strategic plan doubling company valuation
\\item Led due diligence for largest acquisition in company history (\\$1.8B transaction)
\\item Established innovation labs in Silicon Valley, Austin, and Berlin
\\end{itemize}

\\section{Board Positions \\& Governance}

\\begin{tabularx}{\\textwidth}{@{}p{0.4\\textwidth}@{\\hspace{0.1\\textwidth}}p{0.5\\textwidth}@{}}
\\textbf{\\color{execblue}Chairman of the Board} & Technology Innovation Fund\\\\
\\textcolor{goldaccent}{2021 -- Present} & \\textit{\\$2.5B venture capital fund}\\\\[8pt]

\\textbf{\\color{execblue}Independent Director} & National Manufacturing Council\\\\
\\textcolor{goldaccent}{2020 -- Present} & \\textit{Federal advisory committee}\\\\[8pt]

\\textbf{\\color{execblue}Board Member} & Future Leaders Foundation\\\\
\\textcolor{goldaccent}{2018 -- Present} & \\textit{Non-profit education initiative}\\\\
\\end{tabularx}

\\section{Executive Education \\& Credentials}

\\textbf{\\color{execblue}Master of Business Administration} \\hfill \\textcolor{goldaccent}{1998}\\\\
\\textit{Wharton School, University of Pennsylvania} | \\textit{Beta Gamma Sigma}

\\textbf{\\color{execblue}Bachelor of Science, Industrial Engineering} \\hfill \\textcolor{goldaccent}{1995}\\\\
\\textit{Massachusetts Institute of Technology} | \\textit{Magna Cum Laude}

\\textbf{\\color{execblue}Advanced Management Program} \\hfill \\textcolor{goldaccent}{2010}\\\\
\\textit{Harvard Business School}

\\textbf{\\color{execblue}Director Certification Program} \\hfill \\textcolor{goldaccent}{2016}\\\\
\\textit{National Association of Corporate Directors}

\\section{Recognition \\& Thought Leadership}

\\begin{itemize}[leftmargin=15pt, itemsep=3pt]
\\item \\textbf{Fortune CEO of the Year} | Recognized for exceptional leadership during crisis (2021)
\\item \\textbf{Harvard Business Review} | Featured in "Leaders Who Make a Difference" (2020)
\\item \\textbf{World Economic Forum} | Young Global Leader Alumni (2008-2013)
\\item \\textbf{Published Author} | "Leading Through Transformation" (McGraw-Hill, 2022)
\\item \\textbf{Keynote Speaker} | 50+ international conferences on leadership and innovation
\\end{itemize}

\\section{Core Competencies}

\\begin{center}
\\begin{tikzpicture}[node distance=1.8cm]
\\node[draw, ellipse, fill=execblue!20, minimum width=2.5cm] (strategy) {Strategic Vision};
\\node[draw, ellipse, fill=execblue!20, minimum width=2.5cm, right=of strategy] (operations) {Operations};
\\node[draw, ellipse, fill=execblue!20, minimum width=2.5cm, right=of operations] (finance) {Finance \\& M\\&A};
\\node[draw, ellipse, fill=execblue!20, minimum width=2.5cm, below=1cm of strategy] (digital) {Digital Transform};
\\node[draw, ellipse, fill=execblue!20, minimum width=2.5cm, below=1cm of operations] (people) {People Leadership};
\\node[draw, ellipse, fill=execblue!20, minimum width=2.5cm, below=1cm of finance] (governance) {Governance};
\\end{tikzpicture}
\\end{center}

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
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
          Cosmic Portfolio Templates
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
          Choose from our collection of stellar templates, each crafted with unique design elements for different dimensions of professional excellence
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredTemplate(template.id)}
            onHoverEnd={() => setHoveredTemplate(null)}
            whileHover={{ y: -8 }}
            className="relative"
          >
            <Card className={`group cursor-pointer h-full bg-slate-900/40 backdrop-blur-sm border transition-all duration-500 overflow-hidden ${
              selectedTemplate === template.id 
                ? `${template.borderStyle} shadow-lg` 
                : 'border-slate-700/50 hover:border-purple-400/50'
            }`}>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-0 transition-opacity duration-500 ${
                  hoveredTemplate === template.id ? 'opacity-5' : ''
                }`}
              />
              
              <CardHeader className="relative z-10 p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${template.gradient} rounded-xl flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <template.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  
                  {selectedTemplate === template.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${template.accentColor} rounded-full flex items-center justify-center`}
                    >
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.div>
                  )}
                </div>
                
                <CardTitle className="text-lg sm:text-xl text-slate-100 mb-2">
                  {template.name}
                </CardTitle>
                <CardDescription className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 p-4 sm:p-6 pt-0">
                {/* Enhanced Template Preview */}
                <div className={`bg-slate-800/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 min-h-[100px] sm:min-h-[120px] flex items-center justify-center border border-slate-700/30 relative overflow-hidden`}>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${template.accentColor} opacity-5`}
                  />
                  <div className="text-center relative z-10">
                    <motion.div
                      animate={{ 
                        scale: hoveredTemplate === template.id ? [1, 1.05, 1] : 1,
                        rotate: hoveredTemplate === template.id ? [0, 2, -2, 0] : 0
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-b ${template.gradient} rounded shadow-lg mx-auto mb-2 relative`}
                    >
                      <div className={`absolute inset-1 bg-gradient-to-b ${template.accentColor} rounded opacity-30`} />
                      <div className="absolute top-2 left-2 right-2 h-1 bg-white/20 rounded" />
                      <div className="absolute top-4 left-2 right-2 h-0.5 bg-white/15 rounded" />
                      <div className="absolute top-5.5 left-2 right-2 h-0.5 bg-white/15 rounded" />
                    </motion.div>
                    <p className="text-xs text-slate-400">Live Preview</p>
                  </div>
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full transition-all duration-300 text-sm sm:text-base ${
                      selectedTemplate === template.id
                        ? `bg-gradient-to-r ${template.accentColor} hover:opacity-90 text-white`
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

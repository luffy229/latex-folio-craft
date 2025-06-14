export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  code: string;
  category: string;
}

export const templates: Template[] = [
  {
    id: 'custom-hipster-cv',
    name: 'Custom Hipster CV',
    description: 'A modern two-column resume with sidebar layout, perfect for creative professionals - based on your custom template',
    preview: '/api/placeholder/400/300',
    category: 'Creative',
    code: `% a mashup of hipstercv, friggeri and twenty cv
% https://www.latextemplates.com/template/twenty-seconds-resumecv
% https://www.latextemplates.com/template/friggeri-resume-cv

\\documentclass[lighthipster]{simplehipstercv}
% available options are: darkhipster, lighthipster, pastel, allblack, grey, verylight, withoutsidebar
% withoutsidebar
\\usepackage[utf8]{inputenc}
\\usepackage[default]{raleway}
\\usepackage[margin=1cm, a4paper]{geometry}

%------------------------------------------------------------------ Variablen

\\newlength{\\rightcolwidth}
\\newlength{\\leftcolwidth}
\\setlength{\\leftcolwidth}{0.23\\textwidth}
\\setlength{\\rightcolwidth}{0.75\\textwidth}

%------------------------------------------------------------------
\\title{Your Resume Title}
\\author{Your Name}
\\date{\\today}

\\pagestyle{empty}
\\begin{document}

\\thispagestyle{empty}
%-------------------------------------------------------------

\\section*{Start}

\\simpleheader{headercolour}{Your}{Name}{Your Title}{white}

%------------------------------------------------

% this has to be here so the paracols starts..
\\subsection*{}
\\vspace{4em}

\\setlength{\\columnsep}{1.5cm}
\\columnratio{0.23}[0.75]
\\begin{paracol}{2}
\\hbadness5000

\\paracolbackgroundoptions

\\footnotesize
{\\setasidefontcolour
\\flushright
\\begin{center}
    % \\roundpic{profile.jpg} % Uncomment and add your photo
\\end{center}

\\bg{cvgreen}{white}{About me}\\\\[0.5em]

{\\footnotesize
Write a brief description about yourself, your professional background, and what makes you unique in your field.}
\\bigskip

\\bg{cvgreen}{white}{Personal} \\\\[0.5em]
Your Full Name

Nationality: Your Nationality

Date of Birth: Your DOB

\\bigskip

\\bg{cvgreen}{white}{Areas of specialization} \\\\[0.5em]

Skill 1 ~•~ Skill 2 ~•~ Skill 3 ~•~ Skill 4

\\bigskip

\\bg{cvgreen}{white}{Interests}\\\\[0.5em]

List your professional interests and hobbies that are relevant to your career.
\\bigskip

\\bg{cvgreen}{white}{Technical Skills}\\\\[0.5em]

\\texttt{Python} ~/~ \\texttt{JavaScript} ~/~ \\texttt{React}

\\texttt{Node.js} ~/~ \\texttt{SQL} ~/~ \\texttt{Git}

\\texttt{AWS} ~/~ \\texttt{Docker} ~/~ \\texttt{Linux}

\\vspace{4em}

\\infobubble{\\faAt}{cvgreen}{white}{your.email@example.com}
\\infobubble{\\faLinkedin}{cvgreen}{white}{linkedin.com/in/yourprofile}
\\infobubble{\\faGithub}{cvgreen}{white}{github.com/yourusername}
\\infobubble{\\faPhone}{cvgreen}{white}{+1 (555) 123-4567}

\\phantom{turn the page}

\\phantom{turn the page}
}
%-----------------------------------------------------------
\\switchcolumn

\\small
\\section*{Professional Experience}

\\begin{tabular}{r| p{0.5\\textwidth} c}
    \\cvevent{2021--Present}{Senior Software Developer}{Lead}{Tech Company \\color{cvred}}{Led development of key features, mentored junior developers, and improved system performance by 40\\%.}{} \\\\
    \\cvevent{2019--2021}{Software Developer}{Full-time}{StartUp Inc \\color{cvred}}{Developed web applications using modern technologies and collaborated with cross-functional teams.}{}
\\end{tabular}
\\vspace{3em}

\\begin{minipage}[t]{0.35\\textwidth}
\\section*{Education}
\\begin{tabular}{r p{0.6\\textwidth} c}
    \\cvdegree{2019}{Computer Science}{B.S.}{University Name \\color{headerblue}}{}{} \\\\
    \\cvdegree{2023}{Software Engineering}{M.S.}{University Name \\color{headerblue}}{}{}
\\end{tabular}
\\end{minipage}\\hfill
\\begin{minipage}[t]{0.3\\textwidth}
\\section*{Programming}
\\begin{tabular}{r @{\\hspace{0.5em}}l}
     \\bg{skilllabelcolour}{iconcolour}{JavaScript} &  \\barrule{0.9}{0.5em}{cvpurple}\\\\
     \\bg{skilllabelcolour}{iconcolour}{Python} & \\barrule{0.8}{0.5em}{cvgreen} \\\\
     \\bg{skilllabelcolour}{iconcolour}{React} & \\barrule{0.85}{0.5em}{cvpurple} \\\\
     \\bg{skilllabelcolour}{iconcolour}{Node.js} & \\barrule{0.7}{0.5em}{cvpurple} \\\\
     \\bg{skilllabelcolour}{iconcolour}{SQL} & \\barrule{0.75}{0.5em}{cvpurple} \\\\
\\end{tabular}
\\end{minipage}

\\section*{Projects}
\\begin{tabular}{r| p{0.5\\textwidth} c}
    \\cvevent{2023}{E-commerce Platform}{Personal Project}{GitHub \\color{cvred}}{Built a full-stack e-commerce application with React, Node.js, and MongoDB.}{} \\\\
    \\cvevent{2022}{Task Management App}{Team Project}{Portfolio \\color{cvred}}{Developed a collaborative task management tool with real-time updates.}{} \\\\
\\end{tabular}
\\vspace{3em}

\\begin{minipage}[t]{0.3\\textwidth}
\\section*{Certifications}
\\begin{tabular}{>{\\footnotesize\\bfseries}r >{\\footnotesize}p{0.55\\textwidth}}
    2023 & AWS Certified Developer \\\\
    2022 & React Professional Certification \\\\
    2021 & Agile Project Management
\\end{tabular}
\\bigskip

\\section*{Languages}
\\begin{tabular}{l | ll}
\\textbf{English} & C2 & {\\phantom{x}\\footnotesize native} \\\\
\\textbf{Spanish} & B2 & \\pictofraction{\\faCircle}{cvgreen}{3}{black!30}{1}{\\tiny} \\\\
\\textbf{French} & A2 & \\pictofraction{\\faCircle}{cvgreen}{1}{black!30}{3}{\\tiny} \\\\
\\end{tabular}
\\bigskip

\\end{minipage}\\hfill
\\begin{minipage}[t]{0.3\\textwidth}
\\section*{Publications}
\\begin{tabular}{>{\\footnotesize\\bfseries}r >{\\footnotesize}p{0.7\\textwidth}}
    2023 & \\emph{Modern Web Development Practices}, Tech Blog. \\\\
    2022 & \\text{Building Scalable Applications}, in: \\emph{Developer Monthly} (3/2022).
\\end{tabular}
\\bigskip

\\section*{Speaking}
\\begin{tabular}{>{\\footnotesize\\bfseries}r >{\\footnotesize}p{0.6\\textwidth}}
    Mar. 2023 & \\text{Future of Web Development}, at: \\emph{Tech Conference 2023} in San Francisco.
\\end{tabular}
\\end{minipage}

\\vfill{} % Whitespace before final footer

%----------------------------------------------------------------------------------------
%	FINAL FOOTER
%----------------------------------------------------------------------------------------
\\setlength{\\parindent}{0pt}
\\begin{minipage}[t]{\\rightcolwidth}
\\begin{center}\\fontfamily{\\sfdefault}\\selectfont \\color{black!70}
{\\small Your Name \\icon{\\faEnvelopeO}{cvgreen}{} your.email@example.com \\icon{\\faMapMarker}{cvgreen}{} Your City, Country \\icon{\\faPhone}{cvgreen}{} +1 (555) 123-4567 \\newline\\icon{\\faAt}{cvgreen}{} \\protect\\url{yourwebsite.com}
}
\\end{center}
\\end{minipage}

\\end{paracol}

\\end{document}`
  },
  {
    id: 'hipster-cv',
    name: 'Hipster CV',
    description: 'A modern two-column resume with sidebar layout, perfect for creative professionals',
    preview: '/api/placeholder/400/300',
    category: 'Creative',
    code: `% a mashup of hipstercv, friggeri and twenty cv
% https://www.latextemplates.com/template/twenty-seconds-resumecv
% https://www.latextemplates.com/template/friggeri-resume-cv

\\documentclass[lighthipster]{simplehipstercv}
% available options are: darkhipster, lighthipster, pastel, allblack, grey, verylight, withoutsidebar
% withoutsidebar
\\usepackage[utf8]{inputenc}
\\usepackage[default]{raleway}
\\usepackage[margin=1cm, a4paper]{geometry}

%------------------------------------------------------------------ Variablen

\\newlength{\\rightcolwidth}
\\newlength{\\leftcolwidth}
\\setlength{\\leftcolwidth}{0.23\\textwidth}
\\setlength{\\rightcolwidth}{0.75\\textwidth}

%------------------------------------------------------------------
\\title{My Resume}
\\author{Your Name}
\\date{\\today}

\\pagestyle{empty}
\\begin{document}

\\thispagestyle{empty}
%-------------------------------------------------------------

\\section*{Start}

\\simpleheader{headercolour}{Your}{Name}{Professional Title}{white}

%------------------------------------------------

% this has to be here so the paracols starts..
\\subsection*{}
\\vspace{4em}

\\setlength{\\columnsep}{1.5cm}
\\columnratio{0.23}[0.75]
\\begin{paracol}{2}
\\hbadness5000

\\paracolbackgroundoptions

\\footnotesize
{\\setasidefontcolour
\\flushright
\\begin{center}
    % \\roundpic{profile.jpg} % Uncomment and add your photo
\\end{center}

\\bg{cvgreen}{white}{About me}\\\\[0.5em]

{\\footnotesize
Write a brief description about yourself, your professional background, and what makes you unique in your field.}
\\bigskip

\\bg{cvgreen}{white}{Personal} \\\\[0.5em]
Your Full Name

Nationality: Your Nationality

Date of Birth: Your DOB

\\bigskip

\\bg{cvgreen}{white}{Areas of specialization} \\\\[0.5em]

Skill 1 ~•~ Skill 2 ~•~ Skill 3 ~•~ Skill 4

\\bigskip

\\bg{cvgreen}{white}{Interests}\\\\[0.5em]

List your professional interests and hobbies that are relevant to your career.
\\bigskip

\\bg{cvgreen}{white}{Technical Skills}\\\\[0.5em]

\\texttt{Python} ~/~ \\texttt{JavaScript} ~/~ \\texttt{React}

\\texttt{Node.js} ~/~ \\texttt{SQL} ~/~ \\texttt{Git}

\\texttt{AWS} ~/~ \\texttt{Docker} ~/~ \\texttt{Linux}

\\vspace{4em}

\\infobubble{\\faAt}{cvgreen}{white}{your.email@example.com}
\\infobubble{\\faLinkedin}{cvgreen}{white}{linkedin.com/in/yourprofile}
\\infobubble{\\faGithub}{cvgreen}{white}{github.com/yourusername}
\\infobubble{\\faPhone}{cvgreen}{white}{+1 (555) 123-4567}

\\phantom{turn the page}

\\phantom{turn the page}
}
%-----------------------------------------------------------
\\switchcolumn

\\small
\\section*{Professional Experience}

\\begin{tabular}{r| p{0.5\\textwidth} c}
    \\cvevent{2021--Present}{Senior Software Developer}{Full-time}{Tech Company \\color{cvred}}{Led development of key features, mentored junior developers, and improved system performance by 40\\%.}{} \\\\
    \\cvevent{2019--2021}{Software Developer}{Full-time}{StartUp Inc \\color{cvred}}{Developed web applications using modern technologies and collaborated with cross-functional teams.}{}
\\end{tabular}
\\vspace{3em}

\\begin{minipage}[t]{0.35\\textwidth}
\\section*{Education}
\\begin{tabular}{r p{0.6\\textwidth} c}
    \\cvdegree{2019}{Computer Science}{B.S.}{University Name \\color{headerblue}}{}{} \\\\
    \\cvdegree{2023}{Software Engineering}{M.S.}{University Name \\color{headerblue}}{}{}
\\end{tabular}
\\end{minipage}\\hfill
\\begin{minipage}[t]{0.3\\textwidth}
\\section*{Programming}
\\begin{tabular}{r @{\\hspace{0.5em}}l}
     \\bg{skilllabelcolour}{iconcolour}{JavaScript} &  \\barrule{0.9}{0.5em}{cvpurple}\\\\
     \\bg{skilllabelcolour}{iconcolour}{Python} & \\barrule{0.8}{0.5em}{cvgreen} \\\\
     \\bg{skilllabelcolour}{iconcolour}{React} & \\barrule{0.85}{0.5em}{cvpurple} \\\\
     \\bg{skilllabelcolour}{iconcolour}{Node.js} & \\barrule{0.7}{0.5em}{cvpurple} \\\\
     \\bg{skilllabelcolour}{iconcolour}{SQL} & \\barrule{0.75}{0.5em}{cvpurple} \\\\
\\end{tabular}
\\end{minipage}

\\section*{Projects}
\\begin{tabular}{r| p{0.5\\textwidth} c}
    \\cvevent{2023}{E-commerce Platform}{Personal Project}{GitHub \\color{cvred}}{Built a full-stack e-commerce application with React, Node.js, and MongoDB.}{} \\\\
    \\cvevent{2022}{Task Management App}{Team Project}{Portfolio \\color{cvred}}{Developed a collaborative task management tool with real-time updates.}{} \\\\
\\end{tabular}
\\vspace{3em}

\\begin{minipage}[t]{0.3\\textwidth}
\\section*{Certifications}
\\begin{tabular}{>{\\footnotesize\\bfseries}r >{\\footnotesize}p{0.55\\textwidth}}
    2023 & AWS Certified Developer \\\\
    2022 & React Professional Certification \\\\
    2021 & Agile Project Management
\\end{tabular}
\\bigskip

\\section*{Languages}
\\begin{tabular}{l | ll}
\\textbf{English} & C2 & {\\phantom{x}\\footnotesize native} \\\\
\\textbf{Spanish} & B2 & \\pictofraction{\\faCircle}{cvgreen}{3}{black!30}{1}{\\tiny} \\\\
\\textbf{French} & A2 & \\pictofraction{\\faCircle}{cvgreen}{1}{black!30}{3}{\\tiny} \\\\
\\end{tabular}
\\bigskip

\\end{minipage}\\hfill
\\begin{minipage}[t]{0.3\\textwidth}
\\section*{Publications}
\\begin{tabular}{>{\\footnotesize\\bfseries}r >{\\footnotesize}p{0.7\\textwidth}}
    2023 & \\emph{Modern Web Development Practices}, Tech Blog. \\\\
    2022 & \\text{Building Scalable Applications}, in: \\emph{Developer Monthly} (3/2022).
\\end{tabular}
\\bigskip

\\section*{Speaking}
\\begin{tabular}{>{\\footnotesize\\bfseries}r >{\\footnotesize}p{0.6\\textwidth}}
    Mar. 2023 & \\text{Future of Web Development}, at: \\emph{Tech Conference 2023} in San Francisco.
\\end{tabular}
\\end{minipage}

\\vfill{} % Whitespace before final footer

%----------------------------------------------------------------------------------------
%	FINAL FOOTER
%----------------------------------------------------------------------------------------
\\setlength{\\parindent}{0pt}
\\begin{minipage}[t]{\\rightcolwidth}
\\begin{center}\\fontfamily{\\sfdefault}\\selectfont \\color{black!70}
{\\small Your Name \\icon{\\faEnvelopeO}{cvgreen}{} your.email@example.com \\icon{\\faMapMarker}{cvgreen}{} Your City, Country \\icon{\\faPhone}{cvgreen}{} +1 (555) 123-4567 \\newline\\icon{\\faAt}{cvgreen}{} \\protect\\url{yourwebsite.com}
}
\\end{center}
\\end{minipage}

\\end{paracol}

\\end{document}`
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean and professional resume template with clear sections',
    preview: '/api/placeholder/400/300',
    category: 'Professional',
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\pagestyle{empty}

\\titleformat{\\section}{\\large\\bfseries\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{10pt}

\\begin{document}

\\begin{center}
{\\LARGE\\textbf{Your Name}}\\\\
\\vspace{5pt}
Your Address, City, State ZIP\\\\
Phone: (555) 123-4567 | Email: your.email@example.com\\\\
LinkedIn: linkedin.com/in/yourprofile | GitHub: github.com/yourusername
\\end{center}

\\section{Professional Summary}
Results-driven professional with X years of experience in [your field]. Proven track record of [key achievements]. Seeking to leverage expertise in [relevant skills] to contribute to [target role/company].

\\section{Experience}
\\textbf{Job Title} | Company Name \\hfill Month Year -- Present\\\\
\\begin{itemize}[leftmargin=20pt]
\\item Achievement-focused bullet point with quantifiable results
\\item Another accomplishment that demonstrates your value
\\item Technical skills or leadership examples
\\end{itemize}

\\textbf{Previous Job Title} | Previous Company \\hfill Month Year -- Month Year\\\\
\\begin{itemize}[leftmargin=20pt]
\\item Key responsibility or achievement
\\item Another important contribution
\\item Relevant experience or skill demonstration
\\end{itemize}

\\section{Education}
\\textbf{Degree Title} | University Name \\hfill Graduation Year\\\\
Relevant coursework, honors, or GPA (if strong)

\\section{Skills}
\\textbf{Technical:} List your technical skills, programming languages, tools\\\\
\\textbf{Soft Skills:} Communication, Leadership, Problem-solving, Team collaboration

\\section{Projects}
\\textbf{Project Name} \\hfill Year\\\\
Brief description of the project, technologies used, and impact or results achieved.

\\end{document}`
  },
  {
    id: 'academic-cv',
    name: 'Academic CV',
    description: 'Comprehensive academic curriculum vitae for researchers and academics',
    preview: '/api/placeholder/400/300',
    category: 'Academic',
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\pagestyle{empty}

\\titleformat{\\section}{\\large\\bfseries\\scshape\\raggedright}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{15pt}{10pt}

\\begin{document}

\\begin{center}
{\\LARGE\\textbf{Dr. Your Name}}\\\\
\\vspace{5pt}
Department/Institution\\\\
Address, City, State ZIP\\\\
Phone: (555) 123-4567 | Email: your.email@university.edu\\\\
ORCID: 0000-0000-0000-0000
\\end{center}

\\section{Research Interests}
Your main research areas, methodologies, and theoretical frameworks that guide your work.

\\section{Education}
\\textbf{Ph.D. in [Field]} | University Name \\hfill Year\\\\
Dissertation: \\textit{Title of Your Dissertation}\\\\
Advisor: Dr. Advisor Name

\\textbf{M.A./M.S. in [Field]} | University Name \\hfill Year\\\\
\\textbf{B.A./B.S. in [Field]} | University Name \\hfill Year

\\section{Academic Positions}
\\textbf{Current Position} | Institution \\hfill Year--Present\\\\
\\textbf{Previous Position} | Institution \\hfill Year--Year

\\section{Publications}
\\subsection*{Peer-Reviewed Articles}
\\begin{enumerate}[leftmargin=20pt]
\\item Author, A., \\textbf{Your Name}, \\& Author, C. (Year). Title of article. \\textit{Journal Name}, Volume(Issue), pages.
\\item \\textbf{Your Name} \\& Author, B. (Year). Another article title. \\textit{Journal Name}, Volume(Issue), pages.
\\end{enumerate}

\\subsection*{Book Chapters}
\\begin{enumerate}[leftmargin=20pt]
\\item \\textbf{Your Name} (Year). Chapter title. In Editor Name (Ed.), \\textit{Book Title} (pp. xx-xx). Publisher.
\\end{enumerate}

\\section{Conference Presentations}
\\textbf{Your Name} (Year, Month). Presentation title. Paper presented at Conference Name, Location.

\\section{Grants and Awards}
\\textbf{Grant/Award Name} | Funding Agency \\hfill Year\\\\
Amount: \\$X,XXX

\\section{Teaching Experience}
\\textbf{Course Title} | Institution \\hfill Semester Year\\\\
Role: [Instructor/TA/etc.]

\\section{Service}
\\textbf{Editorial Positions}\\\\
\\textbf{Committee Memberships}\\\\
\\textbf{Peer Review}

\\end{document}`
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Minimalist design focusing on content with clean typography',
    preview: '/api/placeholder/400/300',
    category: 'Minimal',
    code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.8in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{6pt}

\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    urlcolor=blue
}

\\begin{document}

\\begin{center}
{\\huge\\textbf{Your Name}}\\\\[10pt]
{\\large Professional Title}\\\\[5pt]
your.email@example.com | (555) 123-4567 | linkedin.com/in/yourprofile
\\end{center}

\\vspace{20pt}

\\textbf{\\large EXPERIENCE}
\\hrule
\\vspace{10pt}

\\textbf{Job Title} \\hfill \\textbf{2021 -- Present}\\\\
Company Name, Location

• Key achievement with quantifiable impact\\\\
• Another significant contribution\\\\
• Technical or leadership accomplishment

\\vspace{10pt}

\\textbf{Previous Job Title} \\hfill \\textbf{2019 -- 2021}\\\\
Previous Company, Location

• Important responsibility or achievement\\\\
• Relevant experience demonstration\\\\
• Skill or knowledge application

\\vspace{20pt}

\\textbf{\\large EDUCATION}
\\hrule
\\vspace{10pt}

\\textbf{Degree Title} \\hfill \\textbf{Year}\\\\
University Name, Location\\\\
Relevant details, honors, or GPA

\\vspace{20pt}

\\textbf{\\large SKILLS}
\\hrule
\\vspace{10pt}

\\textbf{Technical:} List of technical skills, programming languages, tools\\\\
\\textbf{Languages:} English (Native), Spanish (Fluent), French (Intermediate)

\\vspace{20pt}

\\textbf{\\large PROJECTS}
\\hrule
\\vspace{10pt}

\\textbf{Project Name} \\hfill \\textbf{Year}\\\\
Brief description of the project, technologies used, and key outcomes or learning.

\\textbf{Another Project} \\hfill \\textbf{Year}\\\\
Description highlighting your role, challenges overcome, and results achieved.

\\end{document}`
  }
];

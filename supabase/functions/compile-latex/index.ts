import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to safely encode UTF-8 strings to base64
function utf8ToBase64(str: string): string {
  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (error) {
    const cleanStr = str.replace(/[^\x00-\x7F]/g, "");
    return btoa(cleanStr);
  }
}

// Function to compile LaTeX using multiple web-based LaTeX compilers
async function compileLatexToPDF(latexCode: string) {
  try {
    console.log('Attempting to compile LaTeX to PDF using web service...');
    
    // Try Overleaf-compatible API first
    try {
      const response = await fetch('https://texlive.net/cgi-bin/latexcgi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `filecontents=${encodeURIComponent(latexCode)}&filename=document.tex&engine=pdflatex`
      });

      if (response.ok) {
        const pdfBuffer = await response.arrayBuffer();
        const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
        console.log('Successfully compiled LaTeX to PDF via TeXLive');
        
        return {
          success: true,
          pdfUrl: `data:application/pdf;base64,${base64Pdf}`,
          message: 'LaTeX successfully compiled to PDF',
          isHtmlPreview: false
        };
      }
    } catch (texLiveError) {
      console.log('TeXLive compilation failed, trying alternative...');
    }

    // Fallback to LaTeX.Online
    const response = await fetch('https://latex.ytotech.com/builds/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resources: [{
          main: true,
          file: 'main.tex',
          content: latexCode
        }],
        command: 'pdflatex'
      })
    });

    if (response.ok) {
      const pdfBuffer = await response.arrayBuffer();
      const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
      console.log('Successfully compiled LaTeX to PDF via LaTeX.Online');
      
      return {
        success: true,
        pdfUrl: `data:application/pdf;base64,${base64Pdf}`,
        message: 'LaTeX successfully compiled to PDF',
        isHtmlPreview: false
      };
    } else {
      console.log('All PDF compilation services failed, falling back to HTML preview');
      throw new Error(`LaTeX compilation failed: ${response.status}`);
    }
  } catch (error) {
    console.log('PDF compilation failed:', error);
    throw error;
  }
}

// Enhanced LaTeX to HTML converter with better template support
class LaTeXConverter {
  private errors: string[] = [];

  convert(latexCode: string): { html: string; success: boolean; errors: string[] } {
    this.errors = [];
    
    try {
      let html = this.processLatexCode(latexCode);
      
      return {
        html,
        success: this.errors.length === 0,
        errors: this.errors
      };
    } catch (error) {
      this.errors.push(`Conversion error: ${error}`);
      return {
        html: this.generateErrorPreview(latexCode),
        success: false,
        errors: this.errors
      };
    }
  }

  private processLatexCode(latexCode: string): string {
    let content = latexCode;
    
    // Detect if this is a complex template (like simplehipstercv)
    const isComplexTemplate = content.includes('simplehipstercv') || 
                              content.includes('paracol') || 
                              content.includes('\\bg{') ||
                              content.includes('\\barrule');
    
    if (isComplexTemplate) {
      return this.processComplexTemplate(content);
    }
    
    // Standard processing for simple templates
    content = this.removeDocumentSetup(content);
    content = this.processEnvironments(content);
    content = this.processStructuralCommands(content);
    content = this.processTextFormatting(content);
    content = this.processMathematical(content);
    content = this.processLists(content);
    content = this.processTables(content);
    content = this.processReferences(content);
    content = this.processSpacing(content);
    content = this.finalCleanup(content);
    
    return this.wrapInHTML(content);
  }

  private processComplexTemplate(latexCode: string): string {
    let content = latexCode;
    
    // Remove document setup
    content = this.removeDocumentSetup(content);
    
    // Extract header information
    const headerMatch = content.match(/\\simpleheader\{[^}]*\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{[^}]*\}/);
    const firstName = headerMatch ? headerMatch[1] : 'Your';
    const lastName = headerMatch ? headerMatch[2] : 'Name';
    const title = headerMatch ? headerMatch[3] : 'Your Title';
    
    // Process two-column layout
    const colonParts = content.split('\\switchcolumn');
    const leftColumn = colonParts[0] || '';
    const rightColumn = colonParts[1] || '';
    
    // Process left sidebar
    const leftContent = this.processLeftSidebar(leftColumn);
    
    // Process right main content  
    const rightContent = this.processRightContent(rightColumn);
    
    return this.wrapComplexTemplateInHTML(firstName, lastName, title, leftContent, rightContent);
  }

  private processLeftSidebar(content: string): string {
    let html = '';
    
    // Extract About Me section
    const aboutMatch = content.match(/\\bg\{[^}]*\}\{[^}]*\}\{About me\}.*?\n\n\{\\footnotesize\n([^}]*)\}/s);
    if (aboutMatch) {
      html += `
        <div class="mb-6">
          <div class="bg-green-600 text-white px-3 py-1 mb-2 font-bold">About me</div>
          <p class="text-sm text-gray-700">${aboutMatch[1].trim()}</p>
        </div>
      `;
    }
    
    // Extract Personal information
    const personalMatch = content.match(/\\bg\{[^}]*\}\{[^}]*\}\{Personal\}.*?\n([^\\]*?)\\bigskip/s);
    if (personalMatch) {
      const personalInfo = personalMatch[1].trim().split('\n').filter(line => line.trim());
      html += `
        <div class="mb-6">
          <div class="bg-green-600 text-white px-3 py-1 mb-2 font-bold">Personal</div>
          ${personalInfo.map(info => `<p class="text-sm text-gray-700">${info.trim()}</p>`).join('')}
        </div>
      `;
    }
    
    // Extract Areas of specialization
    const skillsMatch = content.match(/\\bg\{[^}]*\}\{[^}]*\}\{Areas of specialization\}.*?\n\n([^\\]*?)\\bigskip/s);
    if (skillsMatch) {
      html += `
        <div class="mb-6">
          <div class="bg-green-600 text-white px-3 py-1 mb-2 font-bold">Areas of specialization</div>
          <p class="text-sm text-gray-700">${skillsMatch[1].trim()}</p>
        </div>
      `;
    }
    
    // Extract Technical Skills
    const techMatch = content.match(/\\bg\{[^}]*\}\{[^}]*\}\{Technical Skills\}.*?\n\n([^\\]*?)\\vspace/s);
    if (techMatch) {
      const techSkills = techMatch[1].trim().replace(/\\texttt\{([^}]*)\}/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');
      html += `
        <div class="mb-6">
          <div class="bg-green-600 text-white px-3 py-1 mb-2 font-bold">Technical Skills</div>
          <div class="text-sm text-gray-700">${techSkills}</div>
        </div>
      `;
    }
    
    // Extract contact information
    const contactMatches = content.match(/\\infobubble\{[^}]*\}\{[^}]*\}\{[^}]*\}\{([^}]*)\}/g);
    if (contactMatches) {
      html += `
        <div class="mb-6">
          <div class="bg-green-600 text-white px-3 py-1 mb-2 font-bold">Contact</div>
          ${contactMatches.map(match => {
            const contactMatch = match.match(/\{([^}]*)\}$/);
            return contactMatch ? `<p class="text-sm text-gray-700 mb-1">${contactMatch[1]}</p>` : '';
          }).join('')}
        </div>
      `;
    }
    
    return html;
  }

  private processRightContent(content: string): string {
    let html = '';
    
    // Process Professional Experience
    const expMatch = content.match(/\\section\*\{Professional Experience\}(.*?)(?=\\section\*|\\begin\{minipage\}|$)/s);
    if (expMatch) {
      html += '<div class="mb-8"><h2 class="text-xl font-bold mb-4 border-b border-gray-300 pb-2">Professional Experience</h2>';
      
      const cveventMatches = expMatch[1].match(/\\cvevent\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{[^}]*\}/g);
      if (cveventMatches) {
        cveventMatches.forEach(match => {
          const parts = match.match(/\\cvevent\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{[^}]*\}/);
          if (parts) {
            html += `
              <div class="mb-4">
                <div class="flex justify-between items-start mb-1">
                  <h3 class="font-bold text-gray-800">${parts[2]}</h3>
                  <span class="text-sm text-gray-600">${parts[1]}</span>
                </div>
                <div class="text-sm text-gray-600 mb-2">${parts[4].replace(/\\color\{[^}]*\}/, '')}</div>
                <p class="text-sm text-gray-700">${parts[5]}</p>
              </div>
            `;
          }
        });
      }
      html += '</div>';
    }
    
    // Process Education
    const eduMatch = content.match(/\\section\*\{Education\}(.*?)(?=\\end\{minipage\})/s);
    if (eduMatch) {
      html += '<div class="mb-6"><h3 class="text-lg font-bold mb-3">Education</h3>';
      
      const degreeMatches = eduMatch[1].match(/\\cvdegree\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{[^}]*\}\{[^}]*\}/g);
      if (degreeMatches) {
        degreeMatches.forEach(match => {
          const parts = match.match(/\\cvdegree\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{[^}]*\}\{[^}]*\}/);
          if (parts) {
            html += `
              <div class="mb-2">
                <div class="flex justify-between">
                  <span class="font-semibold">${parts[3]} in ${parts[2]}</span>
                  <span class="text-sm text-gray-600">${parts[1]}</span>
                </div>
                <div class="text-sm text-gray-600">${parts[4].replace(/\\color\{[^}]*\}/, '')}</div>
              </div>
            `;
          }
        });
      }
      html += '</div>';
    }
    
    // Process Programming Skills
    const progMatch = content.match(/\\section\*\{Programming\}(.*?)(?=\\end\{minipage\})/s);
    if (progMatch) {
      html += '<div class="mb-6"><h3 class="text-lg font-bold mb-3">Programming</h3>';
      
      const skillMatches = progMatch[1].match(/\\bg\{[^}]*\}\{[^}]*\}\{([^}]*)\}\s*&\s*\\barrule\{([^}]*)\}/g);
      if (skillMatches) {
        skillMatches.forEach(match => {
          const parts = match.match(/\\bg\{[^}]*\}\{[^}]*\}\{([^}]*)\}\s*&\s*\\barrule\{([^}]*)\}/);
          if (parts) {
            const skill = parts[1];
            const level = parseFloat(parts[2]) * 100;
            html += `
              <div class="mb-2">
                <div class="flex justify-between text-sm">
                  <span>${skill}</span>
                  <span>${Math.round(level)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: ${level}%"></div>
                </div>
              </div>
            `;
          }
        });
      }
      html += '</div>';
    }
    
    return html;
  }

  private removeDocumentSetup(content: string): string {
    content = content.replace(/\\documentclass(\[[^\]]*\])?\{[^}]*\}/g, '');
    content = content.replace(/\\usepackage(\[[^\]]*\])?\{[^}]*\}/g, '');
    content = content.replace(/\\newcommand\{[^}]*\}\{[^}]*\}/g, '');
    content = content.replace(/\\renewcommand\{[^}]*\}\{[^}]*\}/g, '');
    content = content.replace(/\\definecolor\{[^}]*\}\{[^}]*\}\{[^}]*\}/g, '');
    content = content.replace(/\\geometry\{[^}]*\}/g, '');
    content = content.replace(/\\pagestyle\{[^}]*\}/g, '');
    content = content.replace(/\\setlength\{[^}]*\}\{[^}]*\}/g, '');
    content = content.replace(/\\begin\{document\}/g, '');
    content = content.replace(/\\end\{document\}/g, '');
    
    return content;
  }

  private processEnvironments(content: string): string {
    content = content.replace(/\\begin\{center\}(.*?)\\end\{center\}/gs, '<div class="text-center">$1</div>');
    content = content.replace(/\\begin\{flushleft\}(.*?)\\end\{flushleft\}/gs, '<div class="text-left">$1</div>');
    content = content.replace(/\\begin\{flushright\}(.*?)\\end\{flushright\}/gs, '<div class="text-right">$1</div>');
    content = content.replace(/\\begin\{quote\}(.*?)\\end\{quote\}/gs, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>');
    content = content.replace(/\\begin\{quotation\}(.*?)\\end\{quotation\}/gs, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>');
    content = content.replace(/\\begin\{verbatim\}(.*?)\\end\{verbatim\}/gs, '<pre class="bg-gray-100 p-3 rounded font-mono text-sm">$1</pre>');
    content = content.replace(/\\begin\{minipage\}(\[[^\]]*\])?\{[^}]*\}(.*?)\\end\{minipage\}/gs, '<div class="inline-block align-top">$2</div>');
    
    return content;
  }

  private processStructuralCommands(content: string): string {
    content = content.replace(/\\title\{([^}]*)\}/g, '<h1 class="text-3xl font-bold text-center mb-4">$1</h1>');
    content = content.replace(/\\author\{([^}]*)\}/g, '<div class="text-center text-lg mb-2">$1</div>');
    content = content.replace(/\\date\{([^}]*)\}/g, '<div class="text-center text-sm text-gray-600 mb-6">$1</div>');
    content = content.replace(/\\maketitle/g, '');
    
    content = content.replace(/\\part\{([^}]*)\}/g, '<h1 class="text-4xl font-bold mt-8 mb-6 border-b-2 border-black pb-2">$1</h1>');
    content = content.replace(/\\chapter\{([^}]*)\}/g, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>');
    content = content.replace(/\\section\{([^}]*)\}/g, '<h2 class="text-2xl font-bold mt-6 mb-4 border-b border-gray-400 pb-1">$1</h2>');
    content = content.replace(/\\subsection\{([^}]*)\}/g, '<h3 class="text-xl font-bold mt-5 mb-3">$1</h3>');
    content = content.replace(/\\subsubsection\{([^}]*)\}/g, '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>');
    content = content.replace(/\\paragraph\{([^}]*)\}/g, '<h5 class="font-bold mt-3 mb-1">$1</h5>');
    content = content.replace(/\\subparagraph\{([^}]*)\}/g, '<h6 class="font-semibold mt-2 mb-1">$1</h6>');
    
    return content;
  }

  private processTextFormatting(content: string): string {
    content = content.replace(/\\textbf\{([^}]*)\}/g, '<strong>$1</strong>');
    content = content.replace(/\\textit\{([^}]*)\}/g, '<em>$1</em>');
    content = content.replace(/\\underline\{([^}]*)\}/g, '<span class="underline">$1</span>');
    content = content.replace(/\\emph\{([^}]*)\}/g, '<em>$1</em>');
    content = content.replace(/\\texttt\{([^}]*)\}/g, '<code class="bg-gray-100 px-1 rounded font-mono">$1</code>');
    content = content.replace(/\\textsc\{([^}]*)\}/g, '<span class="uppercase tracking-wide text-sm">$1</span>');
    
    content = content.replace(/\\tiny\s+([^\\{]+)/g, '<span class="text-xs">$1</span>');
    content = content.replace(/\\scriptsize\s+([^\\{]+)/g, '<span class="text-xs">$1</span>');
    content = content.replace(/\\footnotesize\s+([^\\{]+)/g, '<span class="text-sm">$1</span>');
    content = content.replace(/\\small\s+([^\\{]+)/g, '<span class="text-sm">$1</span>');
    content = content.replace(/\\normalsize\s+([^\\{]+)/g, '<span class="text-base">$1</span>');
    content = content.replace(/\\large\s+([^\\{]+)/g, '<span class="text-lg">$1</span>');
    content = content.replace(/\\Large\s+([^\\{]+)/g, '<span class="text-xl">$1</span>');
    content = content.replace(/\\LARGE\s+([^\\{]+)/g, '<span class="text-2xl">$1</span>');
    content = content.replace(/\\huge\s+([^\\{]+)/g, '<span class="text-3xl">$1</span>');
    content = content.replace(/\\Huge\s+([^\\{]+)/g, '<span class="text-4xl">$1</span>');
    
    return content;
  }

  private processMathematical(content: string): string {
    content = content.replace(/\$([^$]+)\$/g, '<span class="font-mono bg-blue-50 px-1 rounded">$1</span>');
    content = content.replace(/\$\$([^$]+)\$\$/g, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\\[(.*?)\\\]/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\\((.*?)\\\)/gs, '<span class="font-mono bg-blue-50 px-1 rounded">$1</span>');
    
    content = content.replace(/\\begin\{equation\}(.*?)\\end\{equation\}/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\begin\{align\}(.*?)\\end\{align\}/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\begin\{eqnarray\}(.*?)\\end\{eqnarray\}/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    
    return content;
  }

  private processLists(content: string): string {
    content = content.replace(/\\begin\{itemize\}/g, '<ul class="list-disc ml-6 my-3">');
    content = content.replace(/\\end\{itemize\}/g, '</ul>');
    content = content.replace(/\\begin\{enumerate\}/g, '<ol class="list-decimal ml-6 my-3">');
    content = content.replace(/\\end\{enumerate\}/g, '</ol>');
    content = content.replace(/\\begin\{description\}/g, '<dl class="my-3">');
    content = content.replace(/\\end\{description\}/g, '</dl>');
    
    content = content.replace(/\\item\s+/g, '<li class="mb-1">');
    content = content.replace(/\\item\[([^\]]*)\]\s*/g, '<dt class="font-semibold">$1</dt><dd class="ml-4">');
    
    return content;
  }

  private processTables(content: string): string {
    content = content.replace(/\\begin\{tabular\}\{[^}]*\}(.*?)\\end\{tabular\}/gs, (match, tableContent) => {
      let rows = tableContent.split('\\\\');
      let html = '<table class="border-collapse border border-gray-300 my-4">';
      
      rows.forEach((row: string) => {
        if (row.trim()) {
          let cells = row.split('&');
          html += '<tr>';
          cells.forEach((cell: string) => {
            html += `<td class="border border-gray-300 px-2 py-1">${cell.trim()}</td>`;
          });
          html += '</tr>';
        }
      });
      
      html += '</table>';
      return html;
    });
    
    return content;
  }

  private processReferences(content: string): string {
    content = content.replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, '<a href="$1" class="text-blue-600 underline hover:text-blue-800">$2</a>');
    content = content.replace(/\\url\{([^}]*)\}/g, '<a href="$1" class="text-blue-600 underline hover:text-blue-800 font-mono">$1</a>');
    content = content.replace(/\\cite\{([^}]*)\}/g, '[<span class="text-blue-600">$1</span>]');
    content = content.replace(/\\ref\{([^}]*)\}/g, '<span class="text-blue-600">ref:$1</span>');
    content = content.replace(/\\label\{([^}]*)\}/g, '');
    
    return content;
  }

  private processSpacing(content: string): string {
    content = content.replace(/\\\\\s*/g, '<br>');
    content = content.replace(/\\newline/g, '<br>');
    content = content.replace(/\\newpage/g, '<div class="mt-12"></div>');
    content = content.replace(/\\clearpage/g, '<div class="mt-12"></div>');
    content = content.replace(/\\hspace\{[^}]*\}/g, '<span class="inline-block w-4"></span>');
    content = content.replace(/\\quad/g, '<span class="inline-block w-4"></span>');
    content = content.replace(/\\qquad/g, '<span class="inline-block w-8"></span>');
    content = content.replace(/\\vspace\{[^}]*\}/g, '<div class="my-2"></div>');
    content = content.replace(/\\bigskip/g, '<div class="my-4"></div>');
    content = content.replace(/\\medskip/g, '<div class="my-2"></div>');
    content = content.replace(/\\smallskip/g, '<div class="my-1"></div>');
    
    return content;
  }

  private finalCleanup(content: string): string {
    content = content.replace(/<li class="[^"]*">([^<]*?)(?=<li|<\/[ou]l|<h[1-6]|<div|$)/g, '<li class="mb-1">$1</li>');
    content = content.replace(/<dd class="[^"]*">([^<]*?)(?=<dt|<\/dl|<h[1-6]|<div|$)/g, '<dd class="ml-4">$1</dd>');
    
    content = content.replace(/\n\s*\n/g, '</p><p class="mb-3">');
    content = '<p class="mb-3">' + content + '</p>';
    
    content = content.replace(/<p class="mb-3">\s*<\/p>/g, '');
    content = content.replace(/<p class="mb-3">\s*(<h[1-6])/g, '$1');
    content = content.replace(/(<\/h[1-6]>)\s*<\/p>/g, '$1');
    content = content.replace(/(<div[^>]*>)\s*<\/p>/g, '$1');
    content = content.replace(/<p class="mb-3">\s*(<div)/g, '$1');
    
    content = content.replace(/\\[a-zA-Z]+\{[^}]*\}/g, '');
    content = content.replace(/\\[a-zA-Z]+/g, '');
    
    return content;
  }

  private wrapComplexTemplateInHTML(firstName: string, lastName: string, title: string, leftContent: string, rightContent: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            font-family: 'Raleway', 'Arial', sans-serif; 
            line-height: 1.4; 
            max-width: 210mm;
            min-height: 297mm;
            margin: 0 auto; 
            background: white;
            color: black;
            font-size: 10pt;
          }
          
          @media screen {
            body {
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              margin-top: 20px;
              margin-bottom: 20px;
            }
          }
          
          .cv-header {
            background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            margin-bottom: 0;
          }
          
          .cv-container {
            display: flex;
            min-height: calc(100vh - 120px);
          }
          
          .cv-sidebar {
            background: #f7fafc;
            width: 35%;
            padding: 2rem 1.5rem;
            border-right: 1px solid #e2e8f0;
          }
          
          .cv-main {
            flex: 1;
            padding: 2rem;
            background: white;
          }
        </style>
      </head>
      <body>
        <div class="cv-header">
          <h1 class="text-4xl font-bold mb-2">${firstName} ${lastName}</h1>
          <p class="text-xl opacity-90">${title}</p>
        </div>
        
        <div class="cv-container">
          <div class="cv-sidebar">
            ${leftContent}
          </div>
          
          <div class="cv-main">
            ${rightContent}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private wrapInHTML(content: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LaTeX Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            font-family: 'Computer Modern', 'Times New Roman', serif; 
            line-height: 1.6; 
            max-width: 210mm;
            min-height: 297mm;
            margin: 0 auto; 
            padding: 25mm;
            background: white;
            color: black;
            font-size: 11pt;
          }
          
          @media screen {
            body {
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              margin-top: 20px;
              margin-bottom: 20px;
            }
          }
          
          @media print {
            body {
              margin: 0;
              padding: 25mm;
              box-shadow: none;
            }
          }
          
          h1, h2, h3, h4, h5, h6 {
            color: #1a1a1a;
          }
          
          a {
            color: #0066cc;
            text-decoration: none;
          }
          
          a:hover {
            text-decoration: underline;
          }
          
          table {
            margin: 1em auto;
          }
          
          code {
            font-family: 'Courier New', monospace;
          }
          
          blockquote {
            margin: 1.5em 0;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
  }

  private generateErrorPreview(latexCode: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>LaTeX Preview - Error</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="p-8 bg-red-50">
        <div class="max-w-4xl mx-auto">
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h2 class="font-bold text-lg mb-2">LaTeX Compilation Error</h2>
            <p>There was an error processing your LaTeX code. Please check the syntax and try again.</p>
            ${this.errors.length > 0 ? `
              <div class="mt-2">
                <strong>Errors:</strong>
                <ul class="list-disc ml-5">
                  ${this.errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
          <div class="bg-gray-100 p-4 rounded">
            <h3 class="font-bold mb-2">Original LaTeX Code:</h3>
            <pre class="text-sm overflow-x-auto">${latexCode.substring(0, 1000)}${latexCode.length > 1000 ? '...' : ''}</pre>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latexCode } = await req.json();
    
    console.log('Processing LaTeX code:', latexCode.substring(0, 100) + '...');
    
    // First try to compile to actual PDF
    try {
      const pdfResult = await compileLatexToPDF(latexCode);
      return new Response(JSON.stringify(pdfResult), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (pdfError) {
      console.log('PDF compilation failed, falling back to enhanced HTML preview:', pdfError);
      
      // Fall back to enhanced HTML preview
      const converter = new LaTeXConverter();
      const result = converter.convert(latexCode);
      
      const base64Html = utf8ToBase64(result.html);
      
      const response = {
        success: true,
        pdfUrl: `data:text/html;base64,${base64Html}`,
        message: result.success 
          ? 'LaTeX converted to enhanced HTML preview (PDF compilation temporarily unavailable)' 
          : `LaTeX preview generated with ${result.errors.length} warning(s)`,
        isHtmlPreview: true,
        errors: result.errors
      };
      
      console.log('Enhanced conversion completed:', { 
        success: result.success, 
        errorCount: result.errors.length 
      });
      
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in LaTeX compilation:', error);
    
    // Return a basic error preview using safe encoding
    const basicPreview = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><title>LaTeX Preview</title></head>
      <body style="font-family: Times, serif; padding: 20px;">
        <h2>LaTeX Preview Error</h2>
        <p>Unable to process LaTeX code. Please check your syntax and try again.</p>
        <p><strong>Error:</strong> ${error.message}</p>
      </body>
      </html>
    `;
    
    const base64Html = utf8ToBase64(basicPreview);
    
    return new Response(JSON.stringify({ 
      success: true, 
      pdfUrl: `data:text/html;base64,${base64Html}`,
      message: 'Error preview generated',
      isHtmlPreview: true,
      errors: [error.message]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

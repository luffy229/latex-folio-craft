
export interface LaTeXConversionResult {
  html: string;
  success: boolean;
  errors: string[];
}

export class LaTeXConverter {
  private errors: string[] = [];

  convert(latexCode: string): LaTeXConversionResult {
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
    
    // Remove document setup
    content = this.removeDocumentSetup(content);
    
    // Process environments first (before other commands)
    content = this.processEnvironments(content);
    
    // Process document structure
    content = this.processStructuralCommands(content);
    
    // Process text formatting
    content = this.processTextFormatting(content);
    
    // Process mathematical content
    content = this.processMathematical(content);
    
    // Process lists
    content = this.processLists(content);
    
    // Process tables
    content = this.processTables(content);
    
    // Process references and links
    content = this.processReferences(content);
    
    // Process spacing and layout
    content = this.processSpacing(content);
    
    // Clean up and format paragraphs
    content = this.finalCleanup(content);
    
    return this.wrapInHTML(content);
  }

  private removeDocumentSetup(content: string): string {
    // Remove document class
    content = content.replace(/\\documentclass(\[[^\]]*\])?\{[^}]*\}/g, '');
    
    // Remove packages
    content = content.replace(/\\usepackage(\[[^\]]*\])?\{[^}]*\}/g, '');
    
    // Remove other preamble commands
    content = content.replace(/\\newcommand\{[^}]*\}\{[^}]*\}/g, '');
    content = content.replace(/\\renewcommand\{[^}]*\}\{[^}]*\}/g, '');
    content = content.replace(/\\definecolor\{[^}]*\}\{[^}]*\}\{[^}]*\}/g, '');
    content = content.replace(/\\geometry\{[^}]*\}/g, '');
    content = content.replace(/\\pagestyle\{[^}]*\}/g, '');
    content = content.replace(/\\setlength\{[^}]*\}\{[^}]*\}/g, '');
    
    // Remove document environment
    content = content.replace(/\\begin\{document\}/g, '');
    content = content.replace(/\\end\{document\}/g, '');
    
    return content;
  }

  private processEnvironments(content: string): string {
    // Process center environment
    content = content.replace(/\\begin\{center\}(.*?)\\end\{center\}/gs, '<div class="text-center">$1</div>');
    
    // Process flushleft/flushright
    content = content.replace(/\\begin\{flushleft\}(.*?)\\end\{flushleft\}/gs, '<div class="text-left">$1</div>');
    content = content.replace(/\\begin\{flushright\}(.*?)\\end\{flushright\}/gs, '<div class="text-right">$1</div>');
    
    // Process quote/quotation
    content = content.replace(/\\begin\{quote\}(.*?)\\end\{quote\}/gs, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>');
    content = content.replace(/\\begin\{quotation\}(.*?)\\end\{quotation\}/gs, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>');
    
    // Process verbatim
    content = content.replace(/\\begin\{verbatim\}(.*?)\\end\{verbatim\}/gs, '<pre class="bg-gray-100 p-3 rounded font-mono text-sm">$1</pre>');
    
    // Process minipage
    content = content.replace(/\\begin\{minipage\}(\[[^\]]*\])?\{[^}]*\}(.*?)\\end\{minipage\}/gs, '<div class="inline-block align-top">$2</div>');
    
    return content;
  }

  private processStructuralCommands(content: string): string {
    // Process title, author, date
    content = content.replace(/\\title\{([^}]*)\}/g, '<h1 class="text-3xl font-bold text-center mb-4">$1</h1>');
    content = content.replace(/\\author\{([^}]*)\}/g, '<div class="text-center text-lg mb-2">$1</div>');
    content = content.replace(/\\date\{([^}]*)\}/g, '<div class="text-center text-sm text-gray-600 mb-6">$1</div>');
    content = content.replace(/\\maketitle/g, '');
    
    // Process sections
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
    // Font styles
    content = content.replace(/\\textbf\{([^}]*)\}/g, '<strong>$1</strong>');
    content = content.replace(/\\textit\{([^}]*)\}/g, '<em>$1</em>');
    content = content.replace(/\\underline\{([^}]*)\}/g, '<span class="underline">$1</span>');
    content = content.replace(/\\emph\{([^}]*)\}/g, '<em>$1</em>');
    content = content.replace(/\\texttt\{([^}]*)\}/g, '<code class="bg-gray-100 px-1 rounded font-mono">$1</code>');
    content = content.replace(/\\textsc\{([^}]*)\}/g, '<span class="uppercase tracking-wide text-sm">$1</span>');
    
    // Font sizes
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
    // Inline math
    content = content.replace(/\$([^$]+)\$/g, '<span class="font-mono bg-blue-50 px-1 rounded">$1</span>');
    
    // Display math
    content = content.replace(/\$\$([^$]+)\$\$/g, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\\[(.*?)\\\]/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\\((.*?)\\\)/gs, '<span class="font-mono bg-blue-50 px-1 rounded">$1</span>');
    
    // Math environments
    content = content.replace(/\\begin\{equation\}(.*?)\\end\{equation\}/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\begin\{align\}(.*?)\\end\{align\}/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    content = content.replace(/\\begin\{eqnarray\}(.*?)\\end\{eqnarray\}/gs, '<div class="text-center font-mono bg-blue-50 p-3 rounded my-4">$1</div>');
    
    return content;
  }

  private processLists(content: string): string {
    // Itemize (unordered lists)
    content = content.replace(/\\begin\{itemize\}/g, '<ul class="list-disc ml-6 my-3">');
    content = content.replace(/\\end\{itemize\}/g, '</ul>');
    
    // Enumerate (ordered lists)
    content = content.replace(/\\begin\{enumerate\}/g, '<ol class="list-decimal ml-6 my-3">');
    content = content.replace(/\\end\{enumerate\}/g, '</ol>');
    
    // Description lists
    content = content.replace(/\\begin\{description\}/g, '<dl class="my-3">');
    content = content.replace(/\\end\{description\}/g, '</dl>');
    
    // List items
    content = content.replace(/\\item\s+/g, '<li class="mb-1">');
    content = content.replace(/\\item\[([^\]]*)\]\s*/g, '<dt class="font-semibold">$1</dt><dd class="ml-4">');
    
    return content;
  }

  private processTables(content: string): string {
    // Basic tabular environment
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
    // Hyperlinks
    content = content.replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, '<a href="$1" class="text-blue-600 underline hover:text-blue-800">$2</a>');
    content = content.replace(/\\url\{([^}]*)\}/g, '<a href="$1" class="text-blue-600 underline hover:text-blue-800 font-mono">$1</a>');
    
    // Citations and references (simplified)
    content = content.replace(/\\cite\{([^}]*)\}/g, '[<span class="text-blue-600">$1</span>]');
    content = content.replace(/\\ref\{([^}]*)\}/g, '<span class="text-blue-600">ref:$1</span>');
    content = content.replace(/\\label\{([^}]*)\}/g, '');
    
    return content;
  }

  private processSpacing(content: string): string {
    // Line breaks
    content = content.replace(/\\\\\s*/g, '<br>');
    content = content.replace(/\\newline/g, '<br>');
    
    // Page breaks (convert to spacing)
    content = content.replace(/\\newpage/g, '<div class="mt-12"></div>');
    content = content.replace(/\\clearpage/g, '<div class="mt-12"></div>');
    
    // Horizontal spacing
    content = content.replace(/\\hspace\{[^}]*\}/g, '<span class="inline-block w-4"></span>');
    content = content.replace(/\\quad/g, '<span class="inline-block w-4"></span>');
    content = content.replace(/\\qquad/g, '<span class="inline-block w-8"></span>');
    
    // Vertical spacing
    content = content.replace(/\\vspace\{[^}]*\}/g, '<div class="my-2"></div>');
    content = content.replace(/\\bigskip/g, '<div class="my-4"></div>');
    content = content.replace(/\\medskip/g, '<div class="my-2"></div>');
    content = content.replace(/\\smallskip/g, '<div class="my-1"></div>');
    
    return content;
  }

  private finalCleanup(content: string): string {
    // Fix unclosed list items
    content = content.replace(/<li class="[^"]*">([^<]*?)(?=<li|<\/[ou]l|<h[1-6]|<div|$)/g, '<li class="mb-1">$1</li>');
    content = content.replace(/<dd class="[^"]*">([^<]*?)(?=<dt|<\/dl|<h[1-6]|<div|$)/g, '<dd class="ml-4">$1</dd>');
    
    // Handle paragraphs
    content = content.replace(/\n\s*\n/g, '</p><p class="mb-3">');
    content = '<p class="mb-3">' + content + '</p>';
    
    // Clean up empty paragraphs and fix spacing
    content = content.replace(/<p class="mb-3">\s*<\/p>/g, '');
    content = content.replace(/<p class="mb-3">\s*(<h[1-6])/g, '$1');
    content = content.replace(/(<\/h[1-6]>)\s*<\/p>/g, '$1');
    content = content.replace(/(<div[^>]*>)\s*<\/p>/g, '$1');
    content = content.replace(/<p class="mb-3">\s*(<div)/g, '$1');
    
    // Remove extra LaTeX commands that weren't processed
    content = content.replace(/\\[a-zA-Z]+\{[^}]*\}/g, '');
    content = content.replace(/\\[a-zA-Z]+/g, '');
    
    return content;
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

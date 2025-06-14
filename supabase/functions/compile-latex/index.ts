
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latexCode } = await req.json();
    
    console.log('Compiling LaTeX code:', latexCode.substring(0, 100) + '...');
    
    // Try multiple LaTeX compilation services
    const compilationServices = [
      {
        name: 'LaTeX.Online',
        url: 'https://latex.vercel.app/api/compile',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: latexCode })
      },
      {
        name: 'Overleaf API Alternative',
        url: 'https://latexbase.com/api/v1/compile',
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          compiler: 'pdflatex',
          code: latexCode,
          resources: []
        })
      }
    ];

    // Try each service
    for (const service of compilationServices) {
      try {
        console.log(`Trying ${service.name}...`);
        const response = await fetch(service.url, {
          method: service.method,
          headers: service.headers,
          body: service.body
        });

        if (response.ok) {
          const result = await response.json();
          
          // Handle different response formats
          let pdfUrl = null;
          if (result.pdf) {
            pdfUrl = `data:application/pdf;base64,${result.pdf}`;
          } else if (result.output && result.output.pdf) {
            pdfUrl = `data:application/pdf;base64,${result.output.pdf}`;
          }

          if (pdfUrl) {
            console.log(`Successfully compiled with ${service.name}`);
            return new Response(JSON.stringify({ 
              success: true, 
              pdfUrl,
              message: `LaTeX compiled successfully with ${service.name}`
            }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
        }
      } catch (error) {
        console.error(`${service.name} failed:`, error);
        continue;
      }
    }

    // If all services fail, generate enhanced HTML preview
    console.log('All compilation services failed, generating enhanced HTML preview');
    const enhancedPreview = generateEnhancedLatexPreview(latexCode);
    
    return new Response(JSON.stringify({ 
      success: true, 
      pdfUrl: `data:text/html;base64,${btoa(enhancedPreview)}`,
      message: 'LaTeX structure preview generated (compilation services unavailable)',
      isHtmlPreview: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in LaTeX compilation:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'LaTeX compilation failed: ' + error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateEnhancedLatexPreview(latexCode: string): string {
  // Enhanced LaTeX to HTML parser that handles more LaTeX commands
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>LaTeX Preview</title>
      <style>
        body { 
          font-family: 'Computer Modern', 'Times New Roman', serif; 
          line-height: 1.6; 
          max-width: 210mm;
          min-height: 297mm;
          margin: 0 auto; 
          padding: 25.4mm;
          background: white;
          color: black;
          font-size: 11pt;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        /* Document structure */
        .document-title { 
          font-size: 18pt; 
          font-weight: bold; 
          text-align: center; 
          margin-bottom: 6pt; 
        }
        
        .contact-info { 
          text-align: center; 
          font-size: 10pt; 
          margin-bottom: 12pt; 
          color: #333; 
        }
        
        /* Sections */
        .section { 
          font-size: 14pt; 
          font-weight: bold; 
          margin-top: 18pt; 
          margin-bottom: 9pt; 
          border-bottom: 1px solid #000;
          padding-bottom: 2pt;
        }
        
        .subsection { 
          font-size: 12pt; 
          font-weight: bold; 
          margin-top: 12pt; 
          margin-bottom: 6pt; 
        }
        
        .subsubsection { 
          font-size: 11pt; 
          font-weight: bold; 
          margin-top: 9pt; 
          margin-bottom: 4pt; 
        }
        
        /* Lists */
        .itemize { 
          margin: 6pt 0; 
          padding-left: 18pt; 
        }
        
        .enumerate { 
          margin: 6pt 0; 
          padding-left: 18pt; 
        }
        
        .item { 
          margin-bottom: 3pt; 
          display: list-item;
          list-style-type: disc;
        }
        
        /* Text formatting */
        .textbf { font-weight: bold; }
        .textit { font-style: italic; }
        .underline { text-decoration: underline; }
        .emph { font-style: italic; }
        
        /* Spacing */
        .vspace-small { margin-top: 6pt; }
        .vspace-medium { margin-top: 12pt; }
        .vspace-large { margin-top: 18pt; }
        
        .hfill { float: right; }
        
        /* Special environments */
        .center { text-align: center; }
        .flushleft { text-align: left; }
        .flushright { text-align: right; }
        
        /* Tables */
        .tabular {
          margin: 12pt 0;
          border-collapse: collapse;
        }
        
        .tabular td {
          padding: 3pt 6pt;
          vertical-align: top;
        }
        
        /* Math */
        .math { font-style: italic; }
        
        /* Hyperlinks */
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
        
        /* Resume specific styles */
        .resume-header {
          text-align: center;
          margin-bottom: 20pt;
          border-bottom: 2px solid #000;
          padding-bottom: 10pt;
        }
        
        .experience-item {
          margin-bottom: 12pt;
        }
        
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4pt;
        }
        
        .job-title {
          font-weight: bold;
          font-size: 11pt;
        }
        
        .job-date {
          font-size: 10pt;
          color: #666;
        }
        
        .job-description {
          margin-left: 0;
        }
      </style>
    </head>
    <body>
  `;

  // Parse and convert LaTeX content
  let content = latexCode;
  
  // Remove document class and packages
  content = content.replace(/\\documentclass\{[^}]*\}/g, '');
  content = content.replace(/\\usepackage(\[[^\]]*\])?\{[^}]*\}/g, '');
  content = content.replace(/\\begin\{document\}/g, '');
  content = content.replace(/\\end\{document\}/g, '');
  
  // Handle document structure
  content = content.replace(/\\begin\{center\}(.*?)\\end\{center\}/gs, '<div class="center">$1</div>');
  
  // Handle text formatting
  content = content.replace(/\\textbf\{([^}]*)\}/g, '<span class="textbf">$1</span>');
  content = content.replace(/\\textit\{([^}]*)\}/g, '<span class="textit">$1</span>');
  content = content.replace(/\\underline\{([^}]*)\}/g, '<span class="underline">$1</span>');
  content = content.replace(/\\emph\{([^}]*)\}/g, '<span class="emph">$1</span>');
  
  // Handle font sizes
  content = content.replace(/\\LARGE\s+([^\\{]+)/g, '<span style="font-size: 18pt;">$1</span>');
  content = content.replace(/\\Large\s+([^\\{]+)/g, '<span style="font-size: 16pt;">$1</span>');
  content = content.replace(/\\large\s+([^\\{]+)/g, '<span style="font-size: 13pt;">$1</span>');
  
  // Handle sections
  content = content.replace(/\\section\{([^}]*)\}/g, '<h2 class="section">$1</h2>');
  content = content.replace(/\\subsection\{([^}]*)\}/g, '<h3 class="subsection">$1</h3>');
  content = content.replace(/\\subsubsection\{([^}]*)\}/g, '<h4 class="subsubsection">$1</h4>');
  
  // Handle lists
  content = content.replace(/\\begin\{itemize\}/g, '<ul class="itemize">');
  content = content.replace(/\\end\{itemize\}/g, '</ul>');
  content = content.replace(/\\begin\{enumerate\}/g, '<ol class="enumerate">');
  content = content.replace(/\\end\{enumerate\}/g, '</ol>');
  content = content.replace(/\\item\s+/g, '<li class="item">');
  
  // Handle spacing
  content = content.replace(/\\vspace\{[^}]*\}/g, '<div class="vspace-medium"></div>');
  content = content.replace(/\\hfill\s*/g, '<span class="hfill">');
  
  // Handle line breaks
  content = content.replace(/\\\\\s*/g, '<br>');
  
  // Handle hyperlinks
  content = content.replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, '<a href="$1">$2</a>');
  content = content.replace(/\\url\{([^}]*)\}/g, '<a href="$1">$1</a>');
  
  // Clean up and format paragraphs
  content = content.replace(/\n\s*\n/g, '</p><p>');
  content = '<p>' + content + '</p>';
  
  // Fix unclosed list items
  content = content.replace(/<li class="item">([^<]*?)(?=<li|<\/ul|<\/ol|<h[2-4]|$)/g, '<li class="item">$1</li>');
  
  // Clean up empty paragraphs and fix structure
  content = content.replace(/<p>\s*<\/p>/g, '');
  content = content.replace(/<p>\s*(<h[2-4])/g, '$1');
  content = content.replace(/(<\/h[2-4]>)\s*<\/p>/g, '$1');
  
  htmlContent += content;
  
  htmlContent += `
    </body>
    </html>
  `;

  return htmlContent;
}

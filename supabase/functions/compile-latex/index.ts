
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
    
    // Use LaTeX.js API for real LaTeX compilation
    const latexApiResponse = await fetch('https://latexonline.cc/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'text': latexCode,
        'command': 'pdflatex',
        'force': 'true'
      })
    });

    if (!latexApiResponse.ok) {
      console.error('LaTeX compilation failed:', latexApiResponse.status, latexApiResponse.statusText);
      
      // Fallback: Try alternative LaTeX service
      try {
        const fallbackResponse = await fetch('https://texlive.net/cgi-bin/latexcgi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            'filecontents': latexCode,
            'filename': 'document.tex',
            'engine': 'pdflatex'
          })
        });

        if (fallbackResponse.ok) {
          const pdfBuffer = await fallbackResponse.arrayBuffer();
          const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
          const pdfUrl = `data:application/pdf;base64,${base64Pdf}`;
          
          return new Response(JSON.stringify({ 
            success: true, 
            pdfUrl,
            message: 'LaTeX compiled successfully (fallback service)'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (fallbackError) {
        console.error('Fallback compilation also failed:', fallbackError);
      }

      // If both services fail, provide a structured preview
      const structuredPreview = generateStructuredPreview(latexCode);
      
      return new Response(JSON.stringify({ 
        success: true, 
        pdfUrl: `data:text/html;base64,${btoa(structuredPreview)}`,
        message: 'LaTeX structure preview generated (compilation services unavailable)',
        isHtmlPreview: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Convert response to PDF data URL
    const pdfBuffer = await latexApiResponse.arrayBuffer();
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
    const pdfUrl = `data:application/pdf;base64,${base64Pdf}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      pdfUrl,
      message: 'LaTeX compiled successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error compiling LaTeX:', error);
    
    // Generate a structured preview as fallback
    try {
      const { latexCode } = await req.json();
      const structuredPreview = generateStructuredPreview(latexCode);
      
      return new Response(JSON.stringify({ 
        success: true, 
        pdfUrl: `data:text/html;base64,${btoa(structuredPreview)}`,
        message: 'LaTeX structure preview generated (compilation error occurred)',
        isHtmlPreview: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (fallbackError) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }
});

function generateStructuredPreview(latexCode: string): string {
  // Parse LaTeX content and generate HTML preview
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: 'Times New Roman', serif; 
          line-height: 1.6; 
          max-width: 800px; 
          margin: 20px auto; 
          padding: 20px;
          background: white;
          color: black;
        }
        .document-title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 10px; }
        .contact-info { text-align: center; font-size: 14px; margin-bottom: 20px; color: #666; }
        .section-title { font-size: 18px; font-weight: bold; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #ccc; }
        .subsection-title { font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 8px; }
        .experience-item { margin-bottom: 15px; }
        .experience-header { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px; }
        .experience-details { margin-left: 0; }
        ul { margin: 8px 0; padding-left: 20px; }
        li { margin-bottom: 3px; }
        .skills-section p { margin: 5px 0; }
        .project-item { margin-bottom: 15px; }
      </style>
    </head>
    <body>
  `;

  // Extract document title (name)
  const nameMatch = latexCode.match(/\\textbf\{\\LARGE\s+([^}]+)\}/);
  if (nameMatch) {
    htmlContent += `<div class="document-title">${nameMatch[1]}</div>`;
  }

  // Extract contact information
  const contactMatch = latexCode.match(/\\vspace\{5pt\}\s*([^\\]+)/);
  if (contactMatch) {
    htmlContent += `<div class="contact-info">${contactMatch[1].trim()}</div>`;
  }

  // Process sections
  const sections = latexCode.split(/\\section\{([^}]+)\}/);
  for (let i = 1; i < sections.length; i += 2) {
    const sectionTitle = sections[i];
    const sectionContent = sections[i + 1] || '';
    
    htmlContent += `<div class="section-title">${sectionTitle}</div>`;
    
    if (sectionTitle.toLowerCase().includes('profile')) {
      // Handle profile section
      const profileText = sectionContent.replace(/\\[a-zA-Z]+\{[^}]*\}/g, '').trim();
      htmlContent += `<p>${profileText}</p>`;
    } else if (sectionTitle.toLowerCase().includes('education')) {
      // Handle education section
      const educationContent = sectionContent
        .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
        .replace(/\\hfill\s*([^\\\n]+)/g, '<span style="float: right;">$1</span>')
        .replace(/\\\\/g, '<br>');
      htmlContent += `<div>${educationContent}</div>`;
    } else if (sectionTitle.toLowerCase().includes('experience')) {
      // Handle experience section
      processExperienceSection(sectionContent, htmlContent);
    } else if (sectionTitle.toLowerCase().includes('skills')) {
      // Handle skills section
      const skillsContent = sectionContent
        .replace(/\\textbf\{([^}]+)\}/g, '<p><strong>$1</strong>')
        .replace(/\\\\/g, '</p>')
        .replace(/\s+/g, ' ');
      htmlContent += `<div class="skills-section">${skillsContent}</div>`;
    } else if (sectionTitle.toLowerCase().includes('projects')) {
      // Handle projects section
      processProjectsSection(sectionContent, htmlContent);
    } else {
      // Generic section handling
      const genericContent = sectionContent
        .replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>')
        .replace(/\\item\s+/g, '<li>')
        .replace(/\\begin\{itemize\}/g, '<ul>')
        .replace(/\\end\{itemize\}/g, '</ul>')
        .replace(/\\\\/g, '<br>');
      htmlContent += `<div>${genericContent}</div>`;
    }
  }

  htmlContent += `
    </body>
    </html>
  `;

  return htmlContent;

  function processExperienceSection(content: string, html: string) {
    const experiences = content.split(/\\textbf\{([^}]+)\}/).filter(Boolean);
    for (let j = 0; j < experiences.length; j += 2) {
      if (j + 1 < experiences.length) {
        const title = experiences[j];
        const details = experiences[j + 1];
        
        const dateMatch = details.match(/\\hfill\s*([^\\\n]+)/);
        const date = dateMatch ? dateMatch[1].trim() : '';
        
        htmlContent += `
          <div class="experience-item">
            <div class="experience-header">
              <span>${title}</span>
              <span>${date}</span>
            </div>
        `;
        
        // Process bullet points
        const itemsMatch = details.match(/\\begin\{itemize\}(.*?)\\end\{itemize\}/s);
        if (itemsMatch) {
          const items = itemsMatch[1].split(/\\item\s+/).filter(Boolean);
          htmlContent += '<ul>';
          items.forEach(item => {
            const cleanItem = item.replace(/\\\\/g, '').trim();
            if (cleanItem) {
              htmlContent += `<li>${cleanItem}</li>`;
            }
          });
          htmlContent += '</ul>';
        }
        
        htmlContent += '</div>';
      }
    }
  }

  function processProjectsSection(content: string, html: string) {
    const projects = content.split(/\\textbf\{([^}]+)\}/).filter(Boolean);
    for (let j = 0; j < projects.length; j += 2) {
      if (j + 1 < projects.length) {
        const title = projects[j];
        const details = projects[j + 1];
        
        const linkMatch = details.match(/\\hfill\s*([^\\\n]+)/);
        const link = linkMatch ? linkMatch[1].trim() : '';
        
        htmlContent += `
          <div class="project-item">
            <div class="experience-header">
              <span>${title}</span>
              <span>${link}</span>
            </div>
        `;
        
        // Process bullet points
        const itemsMatch = details.match(/\\begin\{itemize\}(.*?)\\end\{itemize\}/s);
        if (itemsMatch) {
          const items = itemsMatch[1].split(/\\item\s+/).filter(Boolean);
          htmlContent += '<ul>';
          items.forEach(item => {
            const cleanItem = item.replace(/\\\\/g, '').trim();
            if (cleanItem) {
              htmlContent += `<li>${cleanItem}</li>`;
            }
          });
          htmlContent += '</ul>';
        }
        
        htmlContent += '</div>';
      }
    }
  }
}

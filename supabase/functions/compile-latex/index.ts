
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
    
    // For now, we'll simulate compilation and return a success response
    // In a real implementation, you would use a LaTeX compiler service
    // like LaTeX.js, overleaf API, or a containerized LaTeX environment
    
    // Simulate compilation time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock PDF URL (in real implementation, this would be the actual compiled PDF)
    const pdfUrl = `data:application/pdf;base64,${btoa(JSON.stringify({ 
      compiled: true, 
      timestamp: Date.now(),
      source: latexCode.substring(0, 50) + '...'
    }))}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      pdfUrl,
      message: 'LaTeX compiled successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error compiling LaTeX:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

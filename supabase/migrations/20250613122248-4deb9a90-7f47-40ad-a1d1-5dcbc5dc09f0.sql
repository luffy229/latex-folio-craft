
-- Create portfolios table to store user-created portfolios
CREATE TABLE public.portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  template TEXT NOT NULL,
  content JSONB,
  latex_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on portfolios table
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolios
CREATE POLICY "Users can view their own portfolios" 
  ON public.portfolios 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own portfolios" 
  ON public.portfolios 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolios" 
  ON public.portfolios 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolios" 
  ON public.portfolios 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for portfolios updated_at
CREATE TRIGGER handle_portfolios_updated_at
  BEFORE UPDATE ON public.portfolios
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create template_downloads table to track template usage
CREATE TABLE public.template_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_name TEXT NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on template_downloads table
ALTER TABLE public.template_downloads ENABLE ROW LEVEL SECURITY;

-- Create policies for template_downloads
CREATE POLICY "Users can view their own downloads" 
  ON public.template_downloads 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own downloads" 
  ON public.template_downloads 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create portfolio_works table for author's portfolio
CREATE TABLE IF NOT EXISTS public.portfolio_works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('cerpen', 'puisi', 'artikel', 'cerita-rakyat', 'novel-berseri', 'lainnya')),
  genre TEXT,
  year_created INTEGER,
  status TEXT CHECK (status IN ('published', 'unpublished', 'in_progress', 'completed')) DEFAULT 'unpublished',
  publisher TEXT,
  isbn TEXT,
  cover_image TEXT,
  external_link TEXT,
  awards TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_works_author_id ON public.portfolio_works(author_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_works_category ON public.portfolio_works(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_works_status ON public.portfolio_works(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_works_created_at ON public.portfolio_works(created_at DESC);

-- Enable RLS
ALTER TABLE public.portfolio_works ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio_works
CREATE POLICY "Users can view all portfolio works" ON public.portfolio_works
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own portfolio works" ON public.portfolio_works
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own portfolio works" ON public.portfolio_works
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own portfolio works" ON public.portfolio_works
  FOR DELETE USING (auth.uid() = author_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for portfolio_works
CREATE TRIGGER update_portfolio_works_updated_at 
    BEFORE UPDATE ON public.portfolio_works 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 
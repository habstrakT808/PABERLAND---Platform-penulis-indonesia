-- Fix portfolio_works category constraint to match current article categories
-- Drop the old constraint
ALTER TABLE public.portfolio_works 
DROP CONSTRAINT IF EXISTS portfolio_works_category_check;

-- Add the new constraint with updated categories
ALTER TABLE public.portfolio_works 
ADD CONSTRAINT portfolio_works_category_check 
CHECK (category IN (
  'info/berita',
  'cerpen', 
  'dongeng',
  'cerita-rakyat',
  'cermin (cerita mini)',
  'puisi',
  'cerbung',
  'novel',
  'serial',
  'resensi buku',
  'artikel'
));

-- Update any existing portfolio works with old categories to new ones
UPDATE public.portfolio_works 
SET category = 'serial' 
WHERE category = 'novel-berseri';

UPDATE public.portfolio_works 
SET category = 'artikel' 
WHERE category = 'lainnya';

-- Add comment to document the change
COMMENT ON CONSTRAINT portfolio_works_category_check ON public.portfolio_works 
IS 'Updated to match current article categories as of 2025'; 
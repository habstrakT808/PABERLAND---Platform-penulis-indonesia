-- Add 'buku' category to portfolio_works category constraint
-- First, let's see what categories currently exist in the table
-- SELECT DISTINCT category FROM public.portfolio_works;

-- Update any existing data that might conflict with the new constraint
-- (This step ensures we don't have any invalid categories before adding the constraint)

-- Drop the old constraint first
ALTER TABLE public.portfolio_works 
DROP CONSTRAINT IF EXISTS portfolio_works_category_check;

-- Add the new constraint with 'buku' category included
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
  'artikel',
  'buku'
));

-- Add comment to document the change
COMMENT ON CONSTRAINT portfolio_works_category_check ON public.portfolio_works 
IS 'Updated to include buku category as of 2025'; 
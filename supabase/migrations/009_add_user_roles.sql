-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role TEXT CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')) DEFAULT 'Penulis';

-- Update existing profiles to have default role
UPDATE public.profiles SET role = 'Penulis' WHERE role IS NULL; 
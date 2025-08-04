-- Add policy for admins to delete any profile
CREATE POLICY "Admins can delete any profile" ON public.profiles FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
); 
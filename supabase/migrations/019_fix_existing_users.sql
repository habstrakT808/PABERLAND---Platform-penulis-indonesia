-- src/supabase/migrations/019_fix_existing_users.sql

-- Add role column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles 
    ADD COLUMN role TEXT CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')) DEFAULT 'Penulis';
  END IF;
END $$;

-- Create profiles for users that exist in auth.users but not in profiles
INSERT INTO public.profiles (id, full_name, phone, role)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'full_name', 'User ' || au.id::text),
  au.raw_user_meta_data->>'phone',
  COALESCE(au.raw_user_meta_data->>'role', 'Penulis')
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
  AND au.email_confirmed_at IS NOT NULL; -- Only confirmed users

-- Update existing profiles that don't have role
UPDATE public.profiles SET role = 'Penulis' WHERE role IS NULL;

-- Show summary
DO $$
DECLARE
  total_users INTEGER;
  total_profiles INTEGER;
  missing_profiles INTEGER;
BEGIN
  -- Count total users
  SELECT COUNT(*) INTO total_users FROM auth.users WHERE email_confirmed_at IS NOT NULL;
  
  -- Count total profiles
  SELECT COUNT(*) INTO total_profiles FROM public.profiles;
  
  -- Count missing profiles
  SELECT COUNT(*) INTO missing_profiles 
  FROM auth.users au
  LEFT JOIN public.profiles p ON au.id = p.id
  WHERE p.id IS NULL AND au.email_confirmed_at IS NOT NULL;
  
  RAISE NOTICE '=== USER PROFILE SUMMARY ===';
  RAISE NOTICE 'Total confirmed users: %', total_users;
  RAISE NOTICE 'Total profiles: %', total_profiles;
  RAISE NOTICE 'Missing profiles: %', missing_profiles;
  
  IF missing_profiles > 0 THEN
    RAISE NOTICE '⚠️  Some users are missing profiles!';
  ELSE
    RAISE NOTICE '✅ All users have profiles';
  END IF;
  
  RAISE NOTICE '=== END SUMMARY ===';
END $$; 
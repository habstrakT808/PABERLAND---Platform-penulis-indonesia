-- src/supabase/migrations/018_debug_auth_system.sql

-- Debug: Check current state
DO $$
BEGIN
  RAISE NOTICE '=== DEBUG AUTH SYSTEM ===';
  
  -- Check if role column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'role'
  ) THEN
    RAISE NOTICE '✅ Role column exists';
  ELSE
    RAISE NOTICE '❌ Role column missing - adding it now';
    ALTER TABLE public.profiles 
    ADD COLUMN role TEXT CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')) DEFAULT 'Penulis';
  END IF;
  
  -- Check if trigger exists
  IF EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'on_auth_user_created'
  ) THEN
    RAISE NOTICE '✅ Auth trigger exists';
  ELSE
    RAISE NOTICE '❌ Auth trigger missing';
  END IF;
  
  -- Check if function exists
  IF EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user'
  ) THEN
    RAISE NOTICE '✅ handle_new_user function exists';
  ELSE
    RAISE NOTICE '❌ handle_new_user function missing';
  END IF;
  
  RAISE NOTICE '=== END DEBUG ===';
END $$;

-- Fix: Drop and recreate trigger function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create robust trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  role_value TEXT;
BEGIN
  -- Get role from user metadata, default to 'Penulis'
  role_value := COALESCE(new.raw_user_meta_data->>'role', 'Penulis');
  
  -- Insert profile with role
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    role_value
  );
  
  RAISE NOTICE 'Profile created for user % with role %', new.id, role_value;
  RETURN new;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
    
    -- Try to create profile without role as fallback
    BEGIN
      INSERT INTO public.profiles (id, full_name, phone)
      VALUES (
        new.id,
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'phone'
      );
      RAISE NOTICE 'Profile created without role for user %', new.id;
    EXCEPTION
      WHEN OTHERS THEN
        RAISE WARNING 'Failed to create profile for user %: %', new.id, SQLERRM;
    END;
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update existing profiles that don't have role
UPDATE public.profiles SET role = 'Penulis' WHERE role IS NULL;

-- Verify the setup (simplified without loop)
DO $$
DECLARE
  total_profiles INTEGER;
  profiles_with_role INTEGER;
BEGIN
  RAISE NOTICE '=== VERIFICATION ===';
  
  -- Count profiles
  SELECT COUNT(*) INTO total_profiles FROM public.profiles;
  RAISE NOTICE 'Total profiles: %', total_profiles;
  
  -- Count profiles with role
  SELECT COUNT(*) INTO profiles_with_role FROM public.profiles WHERE role IS NOT NULL;
  RAISE NOTICE 'Profiles with role: %', profiles_with_role;
  
  -- Show first profile as sample
  RAISE NOTICE 'Sample profile:';
  RAISE NOTICE '  - First profile: %', (
    SELECT full_name || ' (role: ' || COALESCE(role, 'NULL') || ')' 
    FROM public.profiles 
    LIMIT 1
  );
  
  RAISE NOTICE '=== END VERIFICATION ===';
END $$; 
-- src/supabase/migrations/017_comprehensive_auth_fix.sql

-- Step 1: Add role column to profiles table if it doesn't exist
DO $$ 
BEGIN
    -- Check if role column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'role'
    ) THEN
        -- Add role column
        ALTER TABLE public.profiles 
        ADD COLUMN role TEXT CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')) DEFAULT 'Penulis';
        
        -- Update existing profiles to have default role
        UPDATE public.profiles SET role = 'Penulis' WHERE role IS NULL;
        
        RAISE NOTICE 'Role column added successfully';
    ELSE
        RAISE NOTICE 'Role column already exists';
    END IF;
END $$;

-- Step 2: Fix the auth trigger function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  role_value TEXT;
BEGIN
  -- Get role from user metadata, default to 'Penulis'
  role_value := COALESCE(new.raw_user_meta_data->>'role', 'Penulis');
  
  -- Insert with role column (we know it exists now)
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    role_value
  );
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Step 3: Ensure RLS policies are correct
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Recreate policies
CREATE POLICY "Users can insert their own profile" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Step 4: Verify the setup
DO $$
BEGIN
  -- Check if everything is set up correctly
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'role'
  ) THEN
    RAISE NOTICE '✅ Role column exists in profiles table';
  ELSE
    RAISE WARNING '❌ Role column missing from profiles table';
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'on_auth_user_created'
  ) THEN
    RAISE NOTICE '✅ Auth trigger exists';
  ELSE
    RAISE WARNING '❌ Auth trigger missing';
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user'
  ) THEN
    RAISE NOTICE '✅ handle_new_user function exists';
  ELSE
    RAISE WARNING '❌ handle_new_user function missing';
  END IF;
END $$; 
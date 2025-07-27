-- src/supabase/migrations/015_fix_user_roles.sql

-- Add role column to profiles table if it doesn't exist
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

-- Ensure the role column has the correct constraint
DO $$
BEGIN
    -- Check if the constraint exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'profiles_role_check'
    ) THEN
        -- Add the constraint if it doesn't exist
        ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_role_check 
        CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku'));
        
        RAISE NOTICE 'Role constraint added successfully';
    ELSE
        RAISE NOTICE 'Role constraint already exists';
    END IF;
END $$;

-- Update any NULL roles to default value
UPDATE public.profiles SET role = 'Penulis' WHERE role IS NULL;

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name = 'role'; 
-- supabase/migrations/028_complete_auth_fix.sql

-- STEP 1: Fix RLS policies that are causing 406 errors
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create proper RLS policies
CREATE POLICY "Enable read access for all users" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- STEP 2: Recreate trigger function with better logging and error handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    role_value TEXT;
    full_name_value TEXT;
    phone_value TEXT;
BEGIN
    -- Detailed logging for debugging
    RAISE LOG 'AUTH_TRIGGER: User signup detected - ID: %, Email: %', NEW.id, NEW.email;
    RAISE LOG 'AUTH_TRIGGER: Raw metadata: %', NEW.raw_user_meta_data;
    
    -- Extract metadata with fallbacks
    role_value := COALESCE(NEW.raw_user_meta_data->>'role', 'Penulis');
    full_name_value := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        split_part(NEW.email, '@', 1),
        'User'
    );
    phone_value := NEW.raw_user_meta_data->>'phone';
    
    RAISE LOG 'AUTH_TRIGGER: Extracted - Name: %, Role: %, Phone: %', 
        full_name_value, role_value, phone_value;
    
    -- Insert profile with explicit bypass of RLS
    INSERT INTO public.profiles (
        id, 
        full_name, 
        phone, 
        role,
        bio,
        avatar_url,
        is_admin,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        full_name_value,
        phone_value,
        role_value,
        NULL,
        NULL,
        false,
        timezone('utc'::text, now()),
        timezone('utc'::text, now())
    );
    
    RAISE LOG 'AUTH_TRIGGER: SUCCESS - Profile created for % (%) with role %', 
        full_name_value, NEW.email, role_value;
    
    RETURN NEW;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'AUTH_TRIGGER: FAILED for user % (%): SQLSTATE=%, ERROR=%', 
            NEW.email, NEW.id, SQLSTATE, SQLERRM;
        
        -- Critical: Don't let auth fail because of profile creation
        RETURN NEW;
END;
$$;

-- Grant explicit permissions to the function
ALTER FUNCTION public.handle_new_user() OWNER TO postgres;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, anon, authenticated, service_role;

-- STEP 3: Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION public.handle_new_user();

-- STEP 4: Create missing profiles for users who can login but don't have profiles
DO $$
DECLARE
    user_record RECORD;
    created_count INTEGER := 0;
BEGIN
    RAISE NOTICE '🔄 Creating profiles for users without profiles...';
    
    FOR user_record IN
        SELECT 
            au.id,
            au.email,
            au.raw_user_meta_data,
            au.created_at
        FROM auth.users au
        LEFT JOIN public.profiles p ON au.id = p.id
        WHERE p.id IS NULL
        ORDER BY au.created_at DESC
    LOOP
        BEGIN
            INSERT INTO public.profiles (
                id, 
                full_name, 
                phone, 
                role,
                bio,
                avatar_url,
                is_admin,
                created_at,
                updated_at
            ) VALUES (
                user_record.id,
                COALESCE(
                    user_record.raw_user_meta_data->>'full_name',
                    split_part(user_record.email, '@', 1),
                    'User'
                ),
                user_record.raw_user_meta_data->>'phone',
                COALESCE(user_record.raw_user_meta_data->>'role', 'Penulis'),
                NULL,
                NULL,
                false,
                COALESCE(user_record.created_at, timezone('utc'::text, now())),
                timezone('utc'::text, now())
            );
            
            created_count := created_count + 1;
            RAISE NOTICE '✅ Created profile for: % (%)', 
                COALESCE(user_record.raw_user_meta_data->>'full_name', 'User'), 
                user_record.email;
            
        EXCEPTION
            WHEN OTHERS THEN
                RAISE WARNING '❌ Failed to create profile for %: %', 
                    user_record.email, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '📊 Created % missing profiles', created_count;
END $$;

-- STEP 5: Test the system (FIXED VERSION - NO ERROR)
DO $$
DECLARE
    total_auth_users INTEGER;
    total_profiles INTEGER;
    missing_profiles INTEGER;
    trigger_exists BOOLEAN;
BEGIN
    SELECT COUNT(*) INTO total_auth_users FROM auth.users;
    SELECT COUNT(*) INTO total_profiles FROM public.profiles;
    
    SELECT COUNT(*) INTO missing_profiles 
    FROM auth.users au
    LEFT JOIN public.profiles p ON au.id = p.id
    WHERE p.id IS NULL;
    
    SELECT EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'on_auth_user_created'
    ) INTO trigger_exists;
    
    RAISE NOTICE '🎯 SYSTEM STATUS AFTER FIX:';
    RAISE NOTICE '================================';
    RAISE NOTICE '📊 Total auth users: %', total_auth_users;
    RAISE NOTICE '📊 Total profiles: %', total_profiles;
    RAISE NOTICE '❌ Missing profiles: %', missing_profiles;
    RAISE NOTICE '🔧 Trigger exists: %', trigger_exists;
    
    IF missing_profiles = 0 AND trigger_exists THEN
        RAISE NOTICE '🎉 SUCCESS: All users have profiles and trigger is active!';
    ELSE
        RAISE NOTICE '⚠️  Still need attention';
    END IF;
    RAISE NOTICE '================================';
END $$;
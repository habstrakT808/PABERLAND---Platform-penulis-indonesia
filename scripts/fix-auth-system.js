// scripts/fix-auth-system.js
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.log(
    "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixAuthSystem() {
  console.log("🔧 Fixing Auth System...\n");

  try {
    // Step 1: Add role column if it doesn't exist
    console.log("📝 Step 1: Adding role column...");
    const { error: alterError } = await supabase.rpc("exec_sql", {
      sql: `
        DO $$ 
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'profiles' 
            AND column_name = 'role'
          ) THEN
            ALTER TABLE public.profiles 
            ADD COLUMN role TEXT CHECK (role IN ('Penulis', 'Ilustrator', 'Kreator Buku', 'Pekerja Buku')) DEFAULT 'Penulis';
            RAISE NOTICE 'Role column added successfully';
          ELSE
            RAISE NOTICE 'Role column already exists';
          END IF;
        END $$;
      `,
    });

    if (alterError) {
      console.log(
        "⚠️  Alter table error (might already exist):",
        alterError.message
      );
    } else {
      console.log("✅ Role column added/verified");
    }

    // Step 2: Create profiles for missing users
    console.log("\n📝 Step 2: Creating missing profiles...");
    const { data: users, error: usersError } =
      await supabase.auth.admin.listUsers();

    if (usersError) {
      console.error("❌ Error fetching users:", usersError);
      return;
    }

    const confirmedUsers = users.users.filter(
      (user) => user.email_confirmed_at
    );
    console.log(`Found ${confirmedUsers.length} confirmed users`);

    for (const user of confirmedUsers) {
      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code === "PGRST116") {
        // Profile doesn't exist, create it
        const userData = user.user_metadata || {};
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          full_name: userData.full_name || `User ${user.id}`,
          phone: userData.phone || "",
          role: userData.role || "Penulis",
        });

        if (insertError) {
          console.error(
            `❌ Failed to create profile for ${user.email}:`,
            insertError.message
          );
        } else {
          console.log(`✅ Created profile for ${user.email}`);
        }
      } else if (profileError) {
        console.error(
          `❌ Error checking profile for ${user.email}:`,
          profileError.message
        );
      } else {
        console.log(`ℹ️  Profile already exists for ${user.email}`);
      }
    }

    // Step 3: Update existing profiles without role
    console.log("\n📝 Step 3: Updating profiles without role...");
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ role: "Penulis" })
      .is("role", null);

    if (updateError) {
      console.error("❌ Error updating profiles:", updateError.message);
    } else {
      console.log("✅ Updated profiles without role");
    }

    // Step 4: Show summary
    console.log("\n📊 Step 4: Summary...");
    const { count: totalProfiles, error: countError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("❌ Error counting profiles:", countError.message);
    } else {
      console.log(`✅ Total profiles: ${totalProfiles}`);
    }

    console.log("\n🎉 Auth system fix completed!");
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

// Run the fix
fixAuthSystem();

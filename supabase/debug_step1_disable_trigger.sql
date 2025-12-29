-- DEBUG STEP 1: DISABLE AUTOMATIC PROFILE CREATION
-- Run this in Supabase SQL Editor.
-- Goal: See if the "500 Error" stops when we don't try to write to the profiles table.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- After running this, try to Sign Up again on localhost.
-- If it WORKS (no 500 error, but maybe "Check email"), then the bug is definitely in the Trigger logic.
-- If it FAILS (still 500), the bug is in Supabase Auth configuration (e.g. SMTP settings or Hooks).

-- Add themes_unlocked column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS themes_unlocked BOOLEAN DEFAULT FALSE;

-- Update the handle_new_user trigger just in case
-- (No change needed to trigger if default is false)

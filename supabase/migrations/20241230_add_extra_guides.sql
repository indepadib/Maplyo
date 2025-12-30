-- Add extra_guides column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS extra_guides INTEGER DEFAULT 0;

-- Update the handle_new_user trigger just in case, though default handles it
-- (No change needed to trigger if default is 0)

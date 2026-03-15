-- SQL SNIPPET TO FIX STUCK 'DEMO' MODE
-- Run this in the Supabase SQL Editor if a user is PRO but stuck in DEMO

-- REPLACE 'USER_ID_HERE' with the actual user id from Auth.users
-- UPDATE public.profiles 
-- SET plan_variant = 'pro', subscription_status = 'active'
-- WHERE id = 'USER_ID_HERE';

-- To see all users and their plans:
-- SELECT p.id, p.email, p.plan_variant FROM public.profiles p;

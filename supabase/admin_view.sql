-- view_admin_stats.sql
-- Run this in Supabase SQL Editor to create a convenient View for Admin

CREATE OR REPLACE VIEW public.admin_users_stats AS
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.plan_variant, -- 'demo', 'basic', 'pro'
    p.subscription_status, -- 'free', 'active', etc.
    p.created_at as joined_at,
    COUNT(g.id) as total_guides,
    COUNT(CASE WHEN g.is_published = true THEN 1 END) as published_guides
FROM 
    public.profiles p
LEFT JOIN 
    public.guides g ON p.id = g.user_id
GROUP BY 
    p.id, p.email, p.full_name, p.plan_variant, p.subscription_status, p.created_at
ORDER BY 
    p.created_at DESC;

-- Grant access to the dashboard users (if you want to fetch this in an admin app later)
GRANT SELECT ON public.admin_users_stats TO authenticated, service_role;

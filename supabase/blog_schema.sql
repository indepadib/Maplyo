-- Create the blog_posts table for SEO auto-blogging
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    seo_keywords TEXT[] DEFAULT '{}',
    generated_by_ai BOOLEAN DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS Policies
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published blogs
CREATE POLICY "Public can view published blogs"
    ON public.blog_posts
    FOR SELECT
    USING (true);

-- Only authenticated users (admins realistically) can insert/update, 
-- but since our API uses service_role key, it bypasses RLS anyway.
-- We'll add a restrictive policy for public mutation just in case.
CREATE POLICY "Only authenticated can insert blogs"
    ON public.blog_posts
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated can update blogs"
    ON public.blog_posts
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Create an index on the slug for fast lookups (critical for SEO routing)
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts (slug);
-- Create an index on published_at for fast sorting
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON public.blog_posts (published_at DESC);

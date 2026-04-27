-- Update the blog_posts table to support multiple languages
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;

-- Example of what translations JSONB will contain:
-- {
--   "en": { "title": "...", "excerpt": "...", "content": "..." },
--   "es": { "title": "...", "excerpt": "...", "content": "..." },
--   "ar": { "title": "...", "excerpt": "...", "content": "..." },
--   "nl": { "title": "...", "excerpt": "...", "content": "..." },
--   "zh": { "title": "...", "excerpt": "...", "content": "..." }
-- }

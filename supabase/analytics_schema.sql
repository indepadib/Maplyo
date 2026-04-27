-- Create guide_views table to track analytics
CREATE TABLE public.guide_views (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  guide_id uuid REFERENCES public.guides(id) ON DELETE CASCADE NOT NULL,
  viewed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_agent text,
  country text
);

-- RLS: Only allow insert via service role (API). Allow host to view their own views.
ALTER TABLE public.guide_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view views of their own guides" ON public.guide_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.guides
      WHERE guides.id = guide_views.guide_id
      AND guides.user_id = auth.uid()
    )
  );

-- Function to get view count quickly (optional, but good for performance if views scale)
-- Just using count() for now is fine since we have indexing.
CREATE INDEX idx_guide_views_guide_id ON public.guide_views(guide_id);

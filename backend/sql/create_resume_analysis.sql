-- Run this in Supabase SQL Editor to create the resume_analysis table
-- Go to: https://supabase.com/dashboard/project/nuguynzynyyqykubethi/sql/new

CREATE TABLE IF NOT EXISTS public.resume_analysis (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    resume_text text,
    ats_score integer DEFAULT 0,
    keywords_missing text[] DEFAULT '{}',
    suggestions text DEFAULT '',
    generated_questions text[] DEFAULT '{}',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.resume_analysis ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users can only see/edit their own resume analysis
CREATE POLICY "Users can view own resume analysis." 
    ON public.resume_analysis FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resume analysis." 
    ON public.resume_analysis FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resume analysis." 
    ON public.resume_analysis FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resume analysis." 
    ON public.resume_analysis FOR DELETE 
    USING (auth.uid() = user_id);

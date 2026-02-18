-- Table: resume_analysis
create table public.resume_analysis (
  user_id uuid references public.profiles(id) primary key,
  resume_text text,
  ats_score integer,
  keywords_missing jsonb, -- Array of strings
  suggestions text,
  generated_questions jsonb, -- Array of strings (custom interview questions)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.resume_analysis enable row level security;

create policy "Users can view own resume analysis."
  on public.resume_analysis for select
  using (auth.uid() = user_id);

create policy "Users can insert/update own resume analysis."
  on public.resume_analysis for insert
  with check (auth.uid() = user_id);

create policy "Users can update own resume analysis."
  on public.resume_analysis for update
  using (auth.uid() = user_id);

-- Grants
grant all on table public.resume_analysis to anon, authenticated, service_role;

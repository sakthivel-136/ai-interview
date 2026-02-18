-- Database Schema for AI Interview Intelligence Platform

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: profiles
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  roll_number text unique,
  department text,
  year integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: problems
create table public.problems (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  difficulty text not null, -- 'Easy', 'Medium', 'Hard'
  category text not null,
  test_cases jsonb not null, -- Array of objects {input, output}
  expected_output jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: submissions
create table public.submissions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  problem_id uuid references public.problems(id) not null,
  code text not null,
  score integer default 0,
  status text check (status in ('Pending', 'Pass', 'Fail')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: aptitude_questions
create table public.aptitude_questions (
  id uuid default uuid_generate_v4() primary key,
  question text not null,
  options jsonb not null, -- Array of strings
  correct_answer text not null,
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: mock_attempts (Tracks round progress)
create table public.mock_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  round text check (round in ('Aptitude', 'Coding', 'HR', 'Technical')),
  score integer default 0,
  passed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: interview_answers (For HR/Technical rounds)
create table public.interview_answers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  question text not null,
  answer text not null,
  ai_score integer,
  sentiment text,
  confidence float,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: user_stats (Aggregated stats for leaderboard)
create table public.user_stats (
  user_id uuid references public.profiles(id) primary key,
  total_score float default 0, -- float for weighted calculation
  aptitude_score integer default 0,
  coding_score integer default 0,
  hr_score integer default 0,
  technical_score integer default 0,
  rank integer,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security)
alter table public.profiles enable row level security;
alter table public.submissions enable row level security;
alter table public.mock_attempts enable row level security;
alter table public.interview_answers enable row level security;
alter table public.user_stats enable row level security;

-- Profiles: Users can view their own profile. Ideally public profiles for leaderboard?
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Submissions: Users view/submit their own.
create policy "Users can view own submissions." on public.submissions for select using (auth.uid() = user_id);
create policy "Users can insert own submissions." on public.submissions for insert with check (auth.uid() = user_id);

-- Mock Attempts: Users view/insert own.
create policy "Users can view own mock attempts." on public.mock_attempts for select using (auth.uid() = user_id);
create policy "Users can insert own mock attempts." on public.mock_attempts for insert with check (auth.uid() = user_id);

-- Trigger to create user_stats on profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_stats (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
-- NOTE: In Supabase, the trigger usually goes on auth.users, but we are inserting into profiles manually 
-- or via another trigger on auth.users -> public.profiles. Since app logic handles profile creation,
-- we'll attach this trigger to public.profiles instead for simplicity in this context, 
-- or stick to auth.users if Supabase manages it. 
-- Let's stick to a trigger on public.profiles insert for safety if we manually create profiles.
create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_user();

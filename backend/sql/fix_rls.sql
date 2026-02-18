-- Fix RLS Policies for AI Interview Platform

-- 1. Profiles: Allow users to insert their own profile (Required for Sign Up / Profile Setup)
create policy "Users can insert their own profile."
on public.profiles
for insert
with check (auth.uid() = id);

-- 2. Interview Answers: Allow users to insert their own answers (Required for Mock Interview)
create policy "Users can insert own answers."
on public.interview_answers
for insert
with check (auth.uid() = user_id);

create policy "Users can view own answers."
on public.interview_answers
for select
using (auth.uid() = user_id);

-- 3. User Stats: Allow everyone to read stats (Required for Leaderboard)
create policy "Enable read access for all users"
on public.user_stats
for select
using (true);

-- 4. Enable insert for user_stats if not handled by trigger (Just in case, though trigger is security definer)
-- If trigger is used, this isn't strictly needed for the trigger, but good for admin debugging.
-- But let's verify if the user needs to update it? No, stats are calculated.

-- 5. Fix Mock Attempts if missing (schema.sql had it, but double check doesn't hurt, but policy names must be unique)
-- Skipping to avoid duplication errors if they already ran schema.sql. 
-- The error reported was specifically for 'profiles'.

-- 6. Grant usage on schema public (Standard fix for permission denied sometimes)
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all routines in schema public to anon, authenticated, service_role;

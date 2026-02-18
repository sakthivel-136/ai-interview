-- Migration to change UUID columns to TEXT to support hybrid IDs

-- 1. Progress: Submissions Table
ALTER TABLE public.submissions ALTER COLUMN problem_id TYPE text;

-- 2. Progress: Problems Table
-- This is trickier because it's a primary key.
-- We need to drop the foreign key constraint first.
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_problem_id_fkey;

ALTER TABLE public.problems ALTER COLUMN id TYPE text;

-- Re-add the foreign key constraint
ALTER TABLE public.submissions ADD CONSTRAINT submissions_problem_id_fkey 
  FOREIGN KEY (problem_id) REFERENCES public.problems(id);

-- 3. Also do it for other tables if necessary
ALTER TABLE public.mock_attempts ALTER COLUMN id TYPE text;
ALTER TABLE public.aptitude_questions ALTER COLUMN id TYPE text;
ALTER TABLE public.interview_answers ALTER COLUMN id TYPE text;

-- Also update existing sequences or defaults if they rely on UUID generation
-- (They will still work with text columns)

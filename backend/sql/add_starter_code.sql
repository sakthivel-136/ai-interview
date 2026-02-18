-- Add starter_code column to the problems table
ALTER TABLE public.problems ADD COLUMN IF NOT EXISTS starter_code TEXT;

-- Update existing records with a default starter code if null
UPDATE public.problems SET starter_code = '# Write your code here' WHERE starter_code IS NULL;

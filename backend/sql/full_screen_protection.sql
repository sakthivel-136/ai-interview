-- Add full-screen protection columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mock_exit_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_exit_date DATE DEFAULT current_date;

-- Add a comment explaining the purpose
COMMENT ON COLUMN profiles.mock_exit_count IS 'Tracks how many times a user has exited full-screen in a single day during mock interviews.';
COMMENT ON COLUMN profiles.last_exit_date IS 'Records the last date an exit occurred to reset the daily count.';

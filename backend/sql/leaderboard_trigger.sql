-- Create function to update user statistics for leaderboard
CREATE OR REPLACE FUNCTION public.update_user_leaderboard()
RETURNS TRIGGER AS $$
DECLARE
    max_aptitude NUMERIC;
    max_coding NUMERIC;
    max_hr NUMERIC;
    max_tech NUMERIC;
    new_total NUMERIC;
BEGIN
    -- We use MAX score to represent best performance, or AVG. 
    -- Let's use MAX to encourage multiple attempts.
    
    SELECT COALESCE(MAX(score), 0) INTO max_aptitude FROM public.mock_attempts WHERE user_id = NEW.user_id AND round = 'Aptitude';
    SELECT COALESCE(MAX(score), 0) INTO max_coding FROM public.mock_attempts WHERE user_id = NEW.user_id AND round = 'Coding';
    SELECT COALESCE(MAX(score), 0) INTO max_hr FROM public.mock_attempts WHERE user_id = NEW.user_id AND round = 'HR';
    SELECT COALESCE(MAX(score), 0) INTO max_tech FROM public.mock_attempts WHERE user_id = NEW.user_id AND round = 'Technical';

    -- Total Score Calculation (Average of bests)
    -- If a round hasn't been attempted (0), it pulls down the average, which is correct (not ranked yet).
    new_total := (max_aptitude + max_coding + max_hr + max_tech) / 4.0;

    -- Upsert into user_stats
    INSERT INTO public.user_stats (user_id, aptitude_score, coding_score, hr_score, technical_score, total_score, updated_at)
    VALUES (NEW.user_id, max_aptitude, max_coding, max_hr, max_tech, new_total, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
        aptitude_score = EXCLUDED.aptitude_score,
        coding_score = EXCLUDED.coding_score,
        hr_score = EXCLUDED.hr_score,
        technical_score = EXCLUDED.technical_score,
        total_score = EXCLUDED.total_score,
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create Trigger
DROP TRIGGER IF EXISTS on_mock_attempt ON public.mock_attempts;
CREATE TRIGGER on_mock_attempt
AFTER INSERT OR UPDATE ON public.mock_attempts
FOR EACH ROW EXECUTE PROCEDURE public.update_user_leaderboard();

-- Create RLS Policy for user_stats (Public Read)
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Leaderboard is public" ON public.user_stats;
CREATE POLICY "Leaderboard is public" ON public.user_stats FOR SELECT USING (true);

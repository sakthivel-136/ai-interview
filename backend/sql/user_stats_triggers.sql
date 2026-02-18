-- 1. Function to update stats from submissions (Practice Arena)
CREATE OR REPLACE FUNCTION public.update_user_stats_from_submission()
RETURNS TRIGGER AS $$
BEGIN
    -- Update coding_score as the average of highest scores per problem
    UPDATE public.user_stats
    SET coding_score = (
        SELECT COALESCE(AVG(max_score), 0)
        FROM (
            SELECT problem_id, MAX(score) as max_score
            FROM public.submissions
            WHERE user_id = NEW.user_id
            GROUP BY problem_id
        ) s
    ),
    updated_at = now()
    WHERE user_id = NEW.user_id;
    
    -- Recalculate total_score
    PERFORM public.recalculate_total_score(NEW.user_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Function to update stats from mock attempts
CREATE OR REPLACE FUNCTION public.update_user_stats_from_mock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.round = 'Aptitude' THEN
        UPDATE public.user_stats SET aptitude_score = GREATEST(aptitude_score, NEW.score) WHERE user_id = NEW.user_id;
    ELSIF NEW.round = 'Coding' THEN
        -- Mock coding round score
        UPDATE public.user_stats SET coding_score = GREATEST(coding_score, NEW.score) WHERE user_id = NEW.user_id;
    ELSIF NEW.round = 'HR' THEN
        UPDATE public.user_stats SET hr_score = GREATEST(hr_score, NEW.score) WHERE user_id = NEW.user_id;
    ELSIF NEW.round = 'Technical' THEN
        UPDATE public.user_stats SET technical_score = GREATEST(technical_score, NEW.score) WHERE user_id = NEW.user_id;
    END IF;

    -- Recalculate total_score
    PERFORM public.recalculate_total_score(NEW.user_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Helper to calculate weighted total score
CREATE OR REPLACE FUNCTION public.recalculate_total_score(uid uuid)
RETURNS void AS $$
BEGIN
    UPDATE public.user_stats
    SET total_score = (
        (COALESCE(aptitude_score, 0) * 0.2) + 
        (COALESCE(coding_score, 0) * 0.4) + 
        (COALESCE(hr_score, 0) * 0.2) + 
        (COALESCE(technical_score, 0) * 0.2)
    ),
    updated_at = now()
    WHERE user_id = uid;
    
    -- Update ranks (global)
    WITH ranked_stats AS (
        SELECT user_id, RANK() OVER (ORDER BY total_score DESC) as new_rank
        FROM public.user_stats
    )
    UPDATE public.user_stats
    SET rank = ranked_stats.new_rank
    FROM ranked_stats
    WHERE public.user_stats.user_id = ranked_stats.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create Triggers
DROP TRIGGER IF EXISTS tr_submission_stats ON public.submissions;
CREATE TRIGGER tr_submission_stats
    AFTER INSERT OR UPDATE ON public.submissions
    FOR EACH ROW EXECUTE PROCEDURE public.update_user_stats_from_submission();

DROP TRIGGER IF EXISTS tr_mock_stats ON public.mock_attempts;
CREATE TRIGGER tr_mock_stats
    AFTER INSERT OR UPDATE ON public.mock_attempts
    FOR EACH ROW EXECUTE PROCEDURE public.update_user_stats_from_mock();

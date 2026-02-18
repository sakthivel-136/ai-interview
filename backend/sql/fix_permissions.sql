-- Run this in Supabase SQL Editor if you get "permission denied" errors
-- This explicitly grants table permissions to the authenticated and service_role roles

GRANT ALL ON public.resume_analysis TO authenticated;
GRANT ALL ON public.resume_analysis TO service_role;
GRANT ALL ON public.resume_analysis TO postgres;

-- Also ensure the sequence (if any) is accessible, or id is just gen_random_uuid()
-- Since we use gen_random_uuid(), we don't need sequence grants.

-- Final check: Ensure RLS isn't blocking the service_role
-- (Service role should already bypass, but some setups differ)
-- You can also try disabling RLS temporarily for debugging if needed:
-- ALTER TABLE public.resume_analysis DISABLE ROW LEVEL SECURITY;

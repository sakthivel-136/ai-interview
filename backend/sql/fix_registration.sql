-- Fix Registration Error: Remove the erroneous trigger on auth.users
-- This trigger attempts to insert into user_stats before a profile exists, 
-- causing a foreign key violation during signup.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Add INSERT policy for profiles
-- This allows users to create their own profile during the profile-setup phase.
DROP POLICY IF EXISTS "Users can insert own profile." ON public.profiles;
CREATE POLICY "Users can insert own profile." ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Ensure user_stats trigger exists on profiles (reference from schema.sql)
-- This correctly initializes user stats AFTER the profile record is created.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_stats (user_id) VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create the profiles table in the public schema
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (id)
);

-- Enable Row Level Security on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy for public read access to profiles
CREATE POLICY "Public profiles are visible to everyone" 
ON public.profiles
FOR SELECT 
USING (true);

-- Create a policy to allow authenticated users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name, email, avatar_url, updated_at)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name',
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url',
        NOW()
    );
    RETURN NEW;
END;
$$
 LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user function on user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Secure the handle_new_user function
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;

-- Additional RLS policies for extra security

-- Policy to allow users to read only their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Policy to prevent users from inserting profiles directly
CREATE POLICY "Users cannot insert profiles directly"
ON public.profiles
FOR INSERT
WITH CHECK (false);

-- Policy to prevent users from deleting profiles
CREATE POLICY "Users cannot delete profiles"
ON public.profiles
FOR DELETE
USING (false);

-- Create a secure function for updating profiles
CREATE OR REPLACE FUNCTION update_profile(
    user_id UUID,
    new_first_name TEXT,
    new_last_name TEXT,
    new_avatar_url TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET 
        first_name = COALESCE(new_first_name, first_name),
        last_name = COALESCE(new_last_name, last_name),
        avatar_url = COALESCE(new_avatar_url, avatar_url),
        updated_at = NOW()
    WHERE id = user_id AND auth.uid() = user_id;
END;
$$
 LANGUAGE plpgsql SECURITY DEFINER;

-- Secure the update_profile function
REVOKE ALL ON FUNCTION update_profile(UUID, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION update_profile(UUID, TEXT, TEXT, TEXT) TO authenticated;

-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role TEXT DEFAULT 'user' 
CHECK (role IN ('user', 'admin', 'moderator'));

-- Create policy for role-based access
CREATE POLICY "Users can only view profiles based on role"
ON public.profiles
FOR SELECT
USING (
  CASE 
    WHEN auth.jwt()->>'role' = 'admin' THEN true
    WHEN auth.jwt()->>'role' = 'moderator' THEN true
    ELSE id = auth.uid()
  END
);

-- Create function to update user role (admin only)
CREATE OR REPLACE FUNCTION update_user_role(
  target_user_id UUID,
  new_role TEXT
)
RETURNS VOID AS $$
BEGIN
  IF (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' THEN
    UPDATE public.profiles
    SET role = new_role
    WHERE id = target_user_id;
  ELSE
    RAISE EXCEPTION 'Only admins can update roles';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON profiles TO authenticated;
GRANT SELECT ON public_profiles TO authenticated;
GRANT EXECUTE ON FUNCTION update_profile TO authenticated;

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

-- Add an index on the email column for faster lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- Create a view for public profile information
CREATE VIEW public.public_profiles AS
SELECT id, first_name, last_name, avatar_url
FROM public.profiles;

-- Grant SELECT permission on the public_profiles view to the 'anon' role
GRANT SELECT ON public.public_profiles TO anon;

-- Create a function to get the current user's profile
CREATE OR REPLACE FUNCTION get_my_profile()
RETURNS public.profiles AS $$
  SELECT *
  FROM public.profiles
  WHERE id = auth.uid()
$$
 LANGUAGE sql SECURITY DEFINER;

-- Secure the get_my_profile function
REVOKE ALL ON FUNCTION get_my_profile() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_my_profile() TO authenticated;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Drop existing view if it exists
DROP VIEW IF EXISTS public_profiles;

-- Create public_profiles view
CREATE VIEW public_profiles AS
  SELECT id, first_name, last_name, avatar_url
  FROM profiles;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_profile;

-- Create or replace function to update profile
CREATE OR REPLACE FUNCTION update_profile(
  user_id UUID,
  new_first_name TEXT,
  new_last_name TEXT,
  new_avatar_url TEXT,
  new_email TEXT
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET
    first_name = COALESCE(new_first_name, first_name),
    last_name = COALESCE(new_last_name, last_name),
    avatar_url = COALESCE(new_avatar_url, avatar_url),
    email = COALESCE(new_email, email),
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON profiles TO authenticated;
GRANT SELECT ON public_profiles TO authenticated;
GRANT EXECUTE ON FUNCTION update_profile TO authenticated;

-- Create roles table
CREATE TABLE public.roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- Create user_roles junction table
CREATE TABLE public.user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Create some default roles
INSERT INTO public.roles (name, description) VALUES
    ('admin', 'Administrator with full access'),
    ('engineer', 'Engineer with access to engineering features'),
    ('project_manager', 'Project manager with access to project management features'),
    ('user', 'Regular user with limited access');

-- Function to get user roles
CREATE OR REPLACE FUNCTION get_user_roles(p_user_id UUID)
RETURNS TABLE (role_name TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT r.name
    FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    WHERE ur.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to assign role to user
CREATE OR REPLACE FUNCTION assign_role_to_user(p_user_id UUID, p_role_name TEXT)
RETURNS VOID AS $$
DECLARE
    v_role_id UUID;
BEGIN
    SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
    IF v_role_id IS NULL THEN
        RAISE EXCEPTION 'Role % does not exist', p_role_name;
    END IF;

    INSERT INTO public.user_roles (user_id, role_id)
    VALUES (p_user_id, v_role_id)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to remove role from user
CREATE OR REPLACE FUNCTION remove_role_from_user(p_user_id UUID, p_role_name TEXT)
RETURNS VOID AS $$
DECLARE
    v_role_id UUID;
BEGIN
    SELECT id INTO v_role_id FROM public.roles WHERE name = p_role_name;
    IF v_role_id IS NULL THEN
        RAISE EXCEPTION 'Role % does not exist', p_role_name;
    END IF;

    DELETE FROM public.user_roles
    WHERE user_id = p_user_id AND role_id = v_role_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.roles TO authenticated;
GRANT ALL ON public.user_roles TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_roles TO authenticated;
GRANT EXECUTE ON FUNCTION assign_role_to_user TO authenticated;
GRANT EXECUTE ON FUNCTION remove_role_from_user TO authenticated;

-- Create the profiles table
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

-- Create policies for the profiles table
CREATE POLICY "Public profiles are visible to everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create the roles table
CREATE TABLE public.roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- Create the user_roles junction table
CREATE TABLE public.user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Insert default roles
INSERT INTO public.roles (name, description) VALUES
    ('admin', 'Administrator with full access'),
    ('engineer', 'Engineer with access to engineering features'),
    ('project_manager', 'Project manager with access to project management features'),
    ('user', 'Regular user with limited access');

-- Create the chats table
CREATE TABLE public.chats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    messages JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on the chats table
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Create policies for the chats table
CREATE POLICY "Users can view their own chats" ON public.chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own chats" ON public.chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own chats" ON public.chats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own chats" ON public.chats FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user creation
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
    
    -- Assign default 'user' role to new users
    INSERT INTO public.user_roles (user_id, role_id)
    SELECT NEW.id, id FROM public.roles WHERE name = 'user';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Secure the handle_new_user function
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.roles TO authenticated;
GRANT ALL ON public.user_roles TO authenticated;
GRANT ALL ON public.chats TO authenticated;

-- Enable RLS on the user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for the user_roles table
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage user roles" ON public.user_roles USING (
    EXISTS (
        SELECT 1 FROM public.user_roles ur
        JOIN public.roles r ON ur.role_id = r.id
        WHERE ur.user_id = auth.uid() AND r.name = 'admin'
    )
);

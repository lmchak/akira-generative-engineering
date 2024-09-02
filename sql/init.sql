-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create public_profiles table
CREATE TABLE public_profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT
);

-- Create saved_chats table
CREATE TABLE saved_chats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  messages JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create llm_settings table
CREATE TABLE llm_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  model TEXT DEFAULT 'gpt-3.5-turbo',
  temperature FLOAT DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 150,
  top_p FLOAT DEFAULT 1,
  frequency_penalty FLOAT DEFAULT 0,
  presence_penalty FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE llm_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update their own profile"
  ON profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone"
  ON public_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own public profile"
  ON public_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own public profile"
  ON public_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own saved chats"
  ON saved_chats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved chats"
  ON saved_chats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved chats"
  ON saved_chats FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved chats"
  ON saved_chats FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own LLM settings"
  ON llm_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own LLM settings"
  ON llm_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own LLM settings"
  ON llm_settings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);

  INSERT INTO public.public_profiles (id)
  VALUES (NEW.id);

  INSERT INTO public.llm_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
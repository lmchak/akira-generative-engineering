-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  notifications BOOLEAN DEFAULT true,
  language TEXT DEFAULT 'en',
  privacy_level TEXT DEFAULT 'public',
  subscription_plan TEXT DEFAULT 'free',
  next_billing_date TIMESTAMP WITH TIME ZONE,
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
CREATE POLICY "Users can view and update own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON public_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert and update own public profile" ON public_profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage their own saved chats" ON saved_chats
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own LLM settings" ON llm_settings
  FOR ALL USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION update_profile(
  user_id UUID,
  new_first_name TEXT,
  new_last_name TEXT,
  new_avatar_url TEXT,
  new_bio TEXT,
  new_notifications BOOLEAN,
  new_language TEXT,
  new_privacy_level TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET
    first_name = COALESCE(new_first_name, first_name),
    last_name = COALESCE(new_last_name, last_name),
    avatar_url = COALESCE(new_avatar_url, avatar_url),
    bio = COALESCE(new_bio, bio),
    notifications = COALESCE(new_notifications, notifications),
    language = COALESCE(new_language, language),
    privacy_level = COALESCE(new_privacy_level, privacy_level),
    updated_at = NOW()
  WHERE id = user_id;

  UPDATE public_profiles
  SET
    first_name = COALESCE(new_first_name, first_name),
    last_name = COALESCE(new_last_name, last_name),
    avatar_url = COALESCE(new_avatar_url, avatar_url)
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE OR REPLACE FUNCTION sync_profiles() RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public_profiles (id, first_name, last_name, avatar_url)
    VALUES (NEW.id, NEW.first_name, NEW.last_name, NEW.avatar_url);
  ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE public_profiles
    SET first_name = NEW.first_name,
        last_name = NEW.last_name,
        avatar_url = NEW.avatar_url
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER sync_profiles_trigger
AFTER INSERT OR UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION sync_profiles();
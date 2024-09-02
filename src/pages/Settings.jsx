import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from 'next-themes';
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile, useUpdateProfile } from '@/integrations/supabase/hooks/profiles';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { session } = useSupabaseAuth();
  const { data: profile, isLoading } = useProfile(session?.user?.id);
  const updateProfile = useUpdateProfile();

  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (profile) {
      setEmail(profile.email || '');
      setNotifications(profile.notifications || true);
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        id: session.user.id,
        email,
        notifications,
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  if (!mounted || isLoading) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch
            id="darkMode"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
        <Button variant="destructive" onClick={() => alert('Account deletion functionality to be implemented')}>
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Settings;
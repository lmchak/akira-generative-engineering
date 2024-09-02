import React from 'react';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { useSupabaseAuth } from '@/integrations/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from '@/components/ChatInterface';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProfile, useUpdateProfile } from '@/integrations/supabase/hooks/profiles';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { session } = useSupabaseAuth();
  const { data: profile, isLoading } = useProfile(session?.user?.id);
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();

  const dummyData = [
    { name: 'Jan', views: 4000 },
    { name: 'Feb', views: 3000 },
    { name: 'Mar', views: 2000 },
    { name: 'Apr', views: 2780 },
    { name: 'May', views: 1890 },
    { name: 'Jun', views: 2390 },
    { name: 'Jul', views: 3490 },
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const profileData = {
      id: session.user.id,
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      avatar_url: formData.get('avatar_url'),
      bio: formData.get('bio'),
    };

    if (profile) {
      await updateProfile.mutateAsync(profileData);
    } else {
      await createProfile.mutateAsync(profileData);
    }
  };

  if (!session) {
    return <div>Please log in to view your profile.</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Card */}
      <Card className="md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile?.avatar_url} alt={profile?.first_name} />
            <AvatarFallback>{profile?.first_name?.[0]}{profile?.last_name?.[0]}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              name="first_name"
              placeholder="First Name"
              defaultValue={profile?.first_name || ''}
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              defaultValue={profile?.last_name || ''}
            />
            <Input
              name="avatar_url"
              placeholder="Avatar URL"
              defaultValue={profile?.avatar_url || ''}
            />
            <Textarea
              name="bio"
              placeholder="Bio"
              defaultValue={profile?.bio || ''}
            />
            <Button type="submit" className="w-full">
              {profile ? 'Update Profile' : 'Create Profile'}
            </Button>
          </form>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">312</p>
              <p className="text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="font-medium">12</p>
              <p className="text-muted-foreground">Followed bots</p>
            </div>
          </div>
          <Button className="w-full mt-4">Add a post</Button>
        </CardContent>
      </Card>

      {/* Analytics Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Chat
            <Link to="/chat">
              <Button variant="outline" size="sm">Open Full Chat</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
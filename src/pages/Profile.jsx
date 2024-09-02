import React, { useState, useEffect } from 'react';
import { useProfile, useUpdateProfile } from '@/integrations/supabase/hooks/profiles';
import { useSupabaseAuth } from '@/integrations/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from '@/components/ChatInterface';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { toast } from "sonner";

const Profile = () => {
  const { session } = useSupabaseAuth();
  const { data: profile, isLoading, refetch } = useProfile(session?.user?.id);
  const updateProfileMutation = useUpdateProfile();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    avatar_url: '',
    email: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        avatar_url: profile.avatar_url || '',
        email: profile.email || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync({
        id: session.user.id,
        ...formData,
      });
      await refetch();
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const dummyData = [
    { name: 'Jan', views: 4000 },
    { name: 'Feb', views: 3000 },
    { name: 'Mar', views: 2000 },
    { name: 'Apr', views: 2780 },
    { name: 'May', views: 1890 },
    { name: 'Jun', views: 2390 },
    { name: 'Jul', views: 3490 },
  ];

  if (!session) {
    return <div>Please log in to view your profile.</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          <Avatar className="h-12 w-12">
            <AvatarImage src={formData.avatar_url} alt={formData.first_name} />
            <AvatarFallback>{formData.first_name?.[0]}{formData.last_name?.[0]}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="avatar_url"
              placeholder="Avatar URL"
              value={formData.avatar_url}
              onChange={handleInputChange}
            />
            <Button type="submit" className="w-full">
              Update Profile
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
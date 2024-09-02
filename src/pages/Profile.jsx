import React from 'react';
import Layout from '@/components/Layout';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { useSupabaseAuth } from '@/integrations/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from '@/components/ChatInterface';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Profile = () => {
  const { session } = useSupabaseAuth();
  const { data: profile, isLoading } = useProfile(session?.user?.id);

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
    return <Layout><div>Please log in to view your profile.</div></Layout>;
  }

  if (isLoading) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
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
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{profile?.first_name} {profile?.last_name}</p>
              <p className="text-sm text-muted-foreground">@{profile?.email?.split('@')[0]}</p>
            </div>
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

        {/* Chat Interface */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatInterface />
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card className="md:col-span-3">
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
      </div>
    </Layout>
  );
};

export default Profile;
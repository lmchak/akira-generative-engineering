import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePublicProfiles } from '@/integrations/supabase/hooks/public_profiles';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: publicProfiles, isLoading } = usePublicProfiles();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (publicProfiles) {
      const filteredResults = publicProfiles.filter(profile =>
        profile.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Users</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((profile) => (
            <Card key={profile.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={profile.avatar_url} alt={`${profile.first_name}'s avatar`} />
                    <AvatarFallback>{profile.first_name[0]}{profile.last_name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{profile.first_name} {profile.last_name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{profile.bio || 'No bio available'}</p>
                <Button className="mt-4" variant="outline">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {searchResults.length === 0 && searchQuery && (
        <p className="text-center text-gray-600 dark:text-gray-400">No users found. Try a different search term.</p>
      )}
    </div>
  );
};

export default Search;
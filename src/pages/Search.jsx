import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePublicProfiles } from '@/integrations/supabase/hooks/public_profiles';

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
      <h1 className="text-2xl font-bold mb-4">Search</h1>
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
                <CardTitle>{profile.first_name} {profile.last_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={profile.avatar_url} alt={`${profile.first_name}'s avatar`} className="w-20 h-20 rounded-full mb-2" />
                <p>{profile.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
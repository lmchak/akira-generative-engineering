import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder search functionality
    const dummyResults = [
      { id: 1, title: 'Result 1', description: 'This is a description for Result 1' },
      { id: 2, title: 'Result 2', description: 'This is a description for Result 2' },
      { id: 3, title: 'Result 3', description: 'This is a description for Result 3' },
    ];
    setSearchResults(dummyResults);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((result) => (
          <Card key={result.id}>
            <CardHeader>
              <CardTitle>{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{result.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Search;
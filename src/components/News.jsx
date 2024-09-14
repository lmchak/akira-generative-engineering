import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const newsData = [
  {
    title: "Big Tech's bid to rewrite the rules on net zero",
    source: "Financial Times",
    date: "August 16, 2024",
    summary: "DCRE's coverage on data centres was referenced to illustrate the surge in data centre capacity across the globe.",
  },
  {
    title: "Understanding Data Centre Markets",
    source: "DCRE",
    date: "August 15, 2024",
    summary: "Our Global Data Centre Index 2024 provides a comprehensive overview of data centre markets worldwide.",
  },
  {
    title: "Scott's Sizzling Summer Guide",
    source: "DCRE",
    date: "July 9, 2024",
    summary: "A guide to Data Centre Hotspots in Barcelona, Crete, Dubai, Florida, and Melbourne.",
  },
  {
    title: "AI's Insatiable Need For Energy",
    source: "Bloomberg",
    date: "June 27, 2024",
    summary: "DCRE was prominently mentioned in an article about AI's impact on global power systems.",
  },
  {
    title: "Data Centre Trends: A Deep Dive into Supply Growth",
    source: "DCRE",
    date: "May 21, 2024",
    summary: "An analysis of global data centre trends and development patterns.",
  },
  {
    title: "Race for AI Supremacy in Middle East Is Measured in Data Centers",
    source: "Bloomberg",
    date: "April 11, 2024",
    summary: "Bloomberg referenced DCRE's data to detail the present data centre landscape in the UAE and Saudi Arabia markets.",
  },
  {
    title: "5 Factors for Success: Choosing a Data Centre Location in Emerging APAC Markets",
    source: "DCRE",
    date: "January 11, 2024",
    summary: "An analysis of factors to consider when choosing data centre locations in emerging APAC markets.",
  },
  {
    title: "2023 in Review: DCRE's Year of Growth and Global Impact",
    source: "DCRE",
    date: "December 27, 2023",
    summary: "A reflection on DCRE's achievements and growth in 2023.",
  },
];

const News = () => {
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredNews = newsData.filter(item => 
    filter === 'all' || item.source.toLowerCase() === filter
  ).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">News and Blogs From DCRE</h1>
      <p className="mb-4">Get up-to-date on the latest data centre news, trends and commentaries around the globe.</p>
      
      <div className="flex justify-between mb-6">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="DCRE">DCRE</SelectItem>
            <SelectItem value="bloomberg">Bloomberg</SelectItem>
            <SelectItem value="financial times">Financial Times</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          variant="outline"
        >
          Sort by Date {sortOrder === 'desc' ? '↓' : '↑'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{item.source} | {item.date}</p>
              <p>{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
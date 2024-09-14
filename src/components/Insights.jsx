import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Insights = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Center Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard
          title="Market Trends"
          content="Stay updated on the latest market trends in the data center industry."
        />
        <InsightCard
          title="Investment Opportunities"
          content="Discover potential investment opportunities in various regions."
        />
        <InsightCard
          title="Technology Advancements"
          content="Learn about the latest technological advancements impacting data centers."
        />
        <InsightCard
          title="Regulatory Updates"
          content="Keep informed about regulatory changes affecting the data center industry."
        />
        <InsightCard
          title="Sustainability Initiatives"
          content="Explore sustainability efforts and green initiatives in data centers."
        />
        <InsightCard
          title="Industry Reports"
          content="Access in-depth reports and analysis on the data center market."
        />
      </div>
    </div>
  );
};

const InsightCard = ({ title, content }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default Insights;
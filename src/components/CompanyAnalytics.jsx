import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompanyAnalytics = () => {
  // Dummy data for demonstration
  const companyData = [
    { region: 'EMEA', facilityCount: 10, marketSharePercentage: 30 },
    { region: 'APAC', facilityCount: 15, marketSharePercentage: 40 },
    { region: 'Americas', facilityCount: 8, marketSharePercentage: 25 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="facilityCount" fill="#8884d8" name="Facility Count" />
            <Bar yAxisId="right" dataKey="marketSharePercentage" fill="#82ca9d" name="Market Share %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CompanyAnalytics;
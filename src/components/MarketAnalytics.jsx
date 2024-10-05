import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const MarketAnalytics = ({ region, segment }) => {
  // Dummy data for demonstration
  const marketData = [
    { date: '2023 Q1', supplyMW: 100, takeupMW: 80 },
    { date: '2023 Q2', supplyMW: 120, takeupMW: 90 },
    { date: '2023 Q3', supplyMW: 140, takeupMW: 110 },
    { date: '2023 Q4', supplyMW: 160, takeupMW: 130 },
  ];

  const companyData = [
    { name: 'Company A', totalMW: 500 },
    { name: 'Company B', totalMW: 400 },
    { name: 'Company C', totalMW: 300 },
    { name: 'Company D', totalMW: 200 },
    { name: 'Others', totalMW: 600 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Supply and Take-up</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="supplyMW" stroke="#8884d8" name="Supply (MW)" />
              <Line type="monotone" dataKey="takeupMW" stroke="#82ca9d" name="Take-up (MW)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Share</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={companyData}
                dataKey="totalMW"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {companyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalytics;
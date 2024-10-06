import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#8DD1E1', '#A4DE6C', '#D0ED57'];

const MarketAnalytics = ({ refreshTrigger }) => {
  const [operatorData, setOperatorData] = useState([]);
  const [capacityProjection, setCapacityProjection] = useState([]);

  const fetchData = async () => {
    const apiUrl = 'https://msqkuenfolzzjqtupste.supabase.co/rest/v1/johor_dc';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcWt1ZW5mb2x6empxdHVwc3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3ODA5OTksImV4cCI6MjA0MTM1Njk5OX0.txZ1kSx8l2V-kp1RHgH-LlSoSmDTouIxoYMnIwsiBEM';

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      console.log('Fetched data:', data);
      processData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (data) => {
    const processedData = data.reduce((acc, item) => {
      if (item.OPERATOR && item['TOTAL LIVE CAPACITY (MW)']) {
        const capacity = parseFloat(item['TOTAL LIVE CAPACITY (MW)']);
        if (!isNaN(capacity)) {
          const existingOperator = acc.find(d => d.operator === item.OPERATOR);
          if (existingOperator) {
            existingOperator.capacity += capacity;
          } else {
            acc.push({
              operator: item.OPERATOR,
              capacity: capacity,
            });
          }
        }
      }
      return acc;
    }, []);

    // Sort by capacity in descending order
    processedData.sort((a, b) => b.capacity - a.capacity);

    console.log('Processed operator data:', processedData);
    setOperatorData(processedData);

    // Process capacity projection data
    const projectionData = data.reduce((acc, item) => {
      const operator = item.OPERATOR;
      const capacity2023 = parseFloat(item['2023 CAPACITY (MW)']) || 0;
      const capacity2024 = parseFloat(item['2024 CAPACITY (MW)']) || 0;
      const capacity2025 = parseFloat(item['2025 CAPACITY (MW)']) || 0;

      const existingOperator = acc.find(d => d.operator === operator);
      if (existingOperator) {
        existingOperator['2023'] += capacity2023;
        existingOperator['2024'] += capacity2024;
        existingOperator['2025'] += capacity2025;
      } else {
        acc.push({
          operator: operator,
          '2023': capacity2023,
          '2024': capacity2024,
          '2025': capacity2025,
        });
      }
      return acc;
    }, []);

    console.log('Processed projection data:', projectionData);
    setCapacityProjection(projectionData);
  };

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Center Operators - Total Live Capacity (MW)</CardTitle>
        </CardHeader>
        <CardContent>
          {operatorData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={operatorData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="operator" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="capacity" fill="#8884d8" name="Total Live Capacity (MW)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No operator data available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Share by Operator</CardTitle>
        </CardHeader>
        <CardContent>
          {operatorData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={operatorData}
                  dataKey="capacity"
                  nameKey="operator"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label={(entry) => entry.operator}
                >
                  {operatorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No operator data available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Capacity Projection (2023-2025)</CardTitle>
        </CardHeader>
        <CardContent>
          {capacityProjection.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={capacityProjection} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="operator" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="2023" stroke="#8884d8" name="2023 Capacity (MW)" />
                <Line type="monotone" dataKey="2024" stroke="#82ca9d" name="2024 Capacity (MW)" />
                <Line type="monotone" dataKey="2025" stroke="#ffc658" name="2025 Capacity (MW)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No projection data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalytics;
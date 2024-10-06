import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarketAnalytics = ({ refreshTrigger }) => {
  const [operatorData, setOperatorData] = useState([]);

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
  };

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, [refreshTrigger]);

  return (
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
  );
};

export default MarketAnalytics;
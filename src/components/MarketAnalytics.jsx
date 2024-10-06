import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarketAnalytics = ({ refreshTrigger }) => {
  const [marketData, setMarketData] = useState([]);
  const [companyData, setCompanyData] = useState([]);

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
    const marketDataProcessed = data.reduce((acc, item) => {
      const year = new Date(item.date).getFullYear();
      const existingYear = acc.find(d => d.date === year);
      if (existingYear) {
        existingYear.supplyMW += parseFloat(item.supply_mw) || 0;
        existingYear.takeupMW += parseFloat(item.takeup_mw) || 0;
      } else {
        acc.push({
          date: year,
          supplyMW: parseFloat(item.supply_mw) || 0,
          takeupMW: parseFloat(item.takeup_mw) || 0,
        });
      }
      return acc;
    }, []);

    const companyDataProcessed = data.reduce((acc, item) => {
      if (item.OPERATOR) {
        const existingCompany = acc.find(d => d.name === item.OPERATOR);
        if (existingCompany) {
          existingCompany.value += parseFloat(item.supply_mw) || 0;
        } else {
          acc.push({
            name: item.OPERATOR,
            value: parseFloat(item.supply_mw) || 0,
          });
        }
      }
      return acc;
    }, []);

    console.log('Processed market data:', marketDataProcessed);
    console.log('Processed company data:', companyDataProcessed);

    setMarketData(marketDataProcessed.sort((a, b) => a.date - b.date));
    setCompanyData(companyDataProcessed.filter(item => item.value > 0));
  };

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, [refreshTrigger]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Supply and Take-up</CardTitle>
        </CardHeader>
        <CardContent>
          {marketData.length > 0 ? (
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
          ) : (
            <p>No market data available</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Share</CardTitle>
        </CardHeader>
        <CardContent>
          {companyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={companyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {companyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No company data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalytics;
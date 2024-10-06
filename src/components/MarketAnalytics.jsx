import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const MarketAnalytics = ({ region, segment, onGenerateReport }) => {
  const [marketData, setMarketData] = useState([]);
  const [companyData, setCompanyData] = useState([]);

  const apiUrl = 'https://msqkuenfolzzjqtupste.supabase.co/rest/v1/johor_dc';
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcWt1ZW5mb2x6empxdHVwc3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3ODA5OTksImV4cCI6MjA0MTM1Njk5OX0.txZ1kSx8l2V-kp1RHgH-LlSoSmDTouIxoYMnIwsiBEM';

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      processData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (data) => {
    // Process market data
    const marketDataProcessed = data.reduce((acc, item) => {
      const year = new Date(item.date).getFullYear();
      const existingYear = acc.find(d => d.date === year);
      if (existingYear) {
        existingYear.supplyMW += item.supply_mw || 0;
        existingYear.takeupMW += item.takeup_mw || 0;
      } else {
        acc.push({
          date: year,
          supplyMW: item.supply_mw || 0,
          takeupMW: item.takeup_mw || 0,
        });
      }
      return acc;
    }, []);

    setMarketData(marketDataProcessed);

    // Process company data
    const companyDataProcessed = data.reduce((acc, item) => {
      const existingCompany = acc.find(d => d.name === item.company);
      if (existingCompany) {
        existingCompany.totalMW += item.supply_mw || 0;
      } else {
        acc.push({
          name: item.company,
          totalMW: item.supply_mw || 0,
        });
      }
      return acc;
    }, []);

    setCompanyData(companyDataProcessed);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (onGenerateReport) {
      onGenerateReport(fetchData);
    }
  }, [onGenerateReport]);

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
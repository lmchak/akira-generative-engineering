import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, AlertTriangle } from 'lucide-react';

const EnvironmentalMonitoring = () => {
  const tempHumidityData = [
    { time: '00:00', temperature: 22, humidity: 45 },
    { time: '04:00', temperature: 21, humidity: 46 },
    { time: '08:00', temperature: 23, humidity: 44 },
    { time: '12:00', temperature: 24, humidity: 43 },
    { time: '16:00', temperature: 23, humidity: 45 },
    { time: '20:00', temperature: 22, humidity: 46 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environmental Monitoring</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Thermometer className="mr-2" /> Temperature & Humidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tempHumidityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Droplets className="mr-2" /> Leak Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  No active leaks detected. Last check: 5 minutes ago
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalMonitoring;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SustainabilityMetrics = () => {
  const energyData = [
    { month: 'Jan', carbon: 1200, renewable: 800, water: 500 },
    { month: 'Feb', carbon: 1100, renewable: 850, water: 480 },
    { month: 'Mar', carbon: 1300, renewable: 900, water: 520 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sustainability Metrics & Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="carbon" stroke="#ff4444" name="Carbon Emissions (tons)" />
                <Line type="monotone" dataKey="renewable" stroke="#44ff44" name="Renewable Energy (MWh)" />
                <Line type="monotone" dataKey="water" stroke="#4444ff" name="Water Usage (kL)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Energy Usage Intensity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 kWh/GB</div>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Water Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">500 kL</div>
                <Progress value={60} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Carbon Footprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1200 tons</div>
                <Progress value={40} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityMetrics;
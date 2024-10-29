import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const EnergyManagement = () => {
  const energyData = [
    { name: '00:00', consumption: 340 },
    { name: '04:00', consumption: 320 },
    { name: '08:00', consumption: 380 },
    { name: '12:00', consumption: 420 },
    { name: '16:00', consumption: 400 },
    { name: '20:00', consumption: 360 },
  ];

  const pue = 1.2;
  const puePercentage = ((pue - 1) / 0.5) * 100; // Assuming 1.5 is the maximum acceptable PUE

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span>Power Usage Effectiveness (PUE)</span>
              <span>{pue}</span>
            </div>
            <Progress value={puePercentage} className="h-2" />
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="consumption" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyManagement;
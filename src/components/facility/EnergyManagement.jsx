import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import EnergyChart from './energy/EnergyChart';

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
  const puePercentage = ((pue - 1) / 0.5) * 100;

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
          <EnergyChart data={energyData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyManagement;
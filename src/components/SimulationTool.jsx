import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SimulationTool = () => {
  const [simulationResults, setSimulationResults] = useState(null);

  const runSimulation = () => {
    // Mock simulation data
    const mockResults = [
      { time: '0h', temperature: 20, energyConsumption: 100 },
      { time: '4h', temperature: 22, energyConsumption: 110 },
      { time: '8h', temperature: 25, energyConsumption: 130 },
      { time: '12h', temperature: 23, energyConsumption: 120 },
      { time: '16h', temperature: 21, energyConsumption: 105 },
      { time: '20h', temperature: 20, energyConsumption: 100 },
    ];
    setSimulationResults(mockResults);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation and Performance Prediction</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={runSimulation}>Run Simulation</Button>
        {simulationResults && (
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={simulationResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="energyConsumption" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimulationTool;
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const GenerativeEngineering = () => {
  const [designParams, setDesignParams] = useState({
    coolingRequirement: '',
    energyConstraint: '',
    materialLimit: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Design parameters submitted:', designParams);
    alert('Design submitted. AI is generating solutions...');
  };

  const projectStatus = [
    { name: 'Concept', completed: 80 },
    { name: 'MEP', completed: 60 },
    { name: 'Construction', completed: 30 },
    { name: 'Commissioning', completed: 10 },
  ];

  const performanceMetrics = [
    { name: 'Jan', energyConsumption: 4000, coolingEfficiency: 2400 },
    { name: 'Feb', energyConsumption: 3000, coolingEfficiency: 1398 },
    { name: 'Mar', energyConsumption: 2000, coolingEfficiency: 9800 },
    { name: 'Apr', energyConsumption: 2780, coolingEfficiency: 3908 },
    { name: 'May', energyConsumption: 1890, coolingEfficiency: 4800 },
    { name: 'Jun', energyConsumption: 2390, coolingEfficiency: 3800 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Generative Engineering for AI Data Center Design</h1>
      
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="design">Design Tool</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectStatus}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="energyConsumption" stroke="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="coolingEfficiency" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="design">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Design Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coolingRequirement">Cooling Requirement (kW)</Label>
                  <Input
                    id="coolingRequirement"
                    name="coolingRequirement"
                    type="number"
                    value={designParams.coolingRequirement}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="energyConstraint">Energy Constraint (kWh)</Label>
                  <Input
                    id="energyConstraint"
                    name="energyConstraint"
                    type="number"
                    value={designParams.energyConstraint}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materialLimit">Material Limit ($)</Label>
                  <Input
                    id="materialLimit"
                    name="materialLimit"
                    type="number"
                    value={designParams.materialLimit}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit">Generate Design</Button>
              </form>
              <div className="mt-4 p-4 border border-dashed border-gray-300 text-center">
                3D Model / Schematic Representation will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulation">
          <Card>
            <CardHeader>
              <CardTitle>Simulation and Performance Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => alert('Simulation started')}>Run Simulation</Button>
              <div className="mt-4 p-4 border border-dashed border-gray-300 text-center">
                Simulation results and performance predictions will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GenerativeEngineering;
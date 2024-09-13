import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MepOptimization = () => {
  const [mepParams, setMepParams] = useState({
    powerRequirement: '',
    coolingCapacity: '',
    floorSpace: '',
  });

  const [optimizationResults, setOptimizationResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMepParams(prev => ({ ...prev, [name]: value }));
  };

  const handleOptimize = (e) => {
    e.preventDefault();
    // Simulated optimization results
    const results = {
      powerEfficiency: Math.round(Math.random() * 20 + 80),
      coolingEfficiency: Math.round(Math.random() * 20 + 80),
      spaceUtilization: Math.round(Math.random() * 20 + 80),
      recommendations: [
        "Implement variable speed pumps for coolant circulation",
        "Optimize pipe routing to minimize pressure drops",
        "Use high-efficiency transformers for power distribution",
      ],
    };
    setOptimizationResults(results);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>MEP System Optimization</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOptimize} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="powerRequirement">Power Requirement (kW)</Label>
            <Input
              id="powerRequirement"
              name="powerRequirement"
              type="number"
              value={mepParams.powerRequirement}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coolingCapacity">Cooling Capacity (kW)</Label>
            <Input
              id="coolingCapacity"
              name="coolingCapacity"
              type="number"
              value={mepParams.coolingCapacity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floorSpace">Floor Space (sq ft)</Label>
            <Input
              id="floorSpace"
              name="floorSpace"
              type="number"
              value={mepParams.floorSpace}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Optimize MEP Systems</Button>
        </form>

        {optimizationResults && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Optimization Results</h3>
            <Tabs defaultValue="efficiency">
              <TabsList>
                <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="efficiency">
                <div className="space-y-2">
                  <p>Power Efficiency: {optimizationResults.powerEfficiency}%</p>
                  <p>Cooling Efficiency: {optimizationResults.coolingEfficiency}%</p>
                  <p>Space Utilization: {optimizationResults.spaceUtilization}%</p>
                </div>
              </TabsContent>
              <TabsContent value="recommendations">
                <ul className="list-disc pl-5 space-y-1">
                  {optimizationResults.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MepOptimization;
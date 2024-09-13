import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const ConstructionPlanning = () => {
  const [constructionPlan, setConstructionPlan] = useState(null);
  const [billOfMaterials, setBillOfMaterials] = useState([]);
  const [progress, setProgress] = useState(0);

  const generateConstructionPlan = () => {
    // Simulated construction plan generation
    setConstructionPlan({
      phases: [
        { name: 'Site Preparation', duration: '2 weeks' },
        { name: 'Foundation', duration: '4 weeks' },
        { name: 'Structural Work', duration: '8 weeks' },
        { name: 'MEP Installation', duration: '6 weeks' },
        { name: 'Finishing', duration: '4 weeks' },
      ]
    });

    // Simulated bill of materials
    setBillOfMaterials([
      { item: 'Concrete', quantity: '500 cubic yards', unit: 'yd³' },
      { item: 'Steel Reinforcement', quantity: '50 tons', unit: 't' },
      { item: 'HVAC Units', quantity: '10', unit: 'pcs' },
      { item: 'Electrical Panels', quantity: '20', unit: 'pcs' },
      { item: 'Cooling Pipes', quantity: '1000 meters', unit: 'm' },
    ]);

    // Simulated progress
    setProgress(30);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Construction Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={generateConstructionPlan}>Generate Plan</Button>
        </CardContent>
      </Card>

      {constructionPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Construction Phases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phase</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {constructionPlan.phases.map((phase, index) => (
                  <TableRow key={index}>
                    <TableCell>{phase.name}</TableCell>
                    <TableCell>{phase.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {billOfMaterials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bill of Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billOfMaterials.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Construction Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-center">{progress}% Complete</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConstructionPlanning;
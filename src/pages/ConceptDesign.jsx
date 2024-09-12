import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const ConceptDesign = () => {
  const [designConstraints, setDesignConstraints] = useState({
    coolingLoad: '',
    aiHardwareRequirements: '',
  });
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [criticalPaths, setCriticalPaths] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignConstraints(prev => ({ ...prev, [name]: value }));
  };

  const generateDesigns = () => {
    // Simulated AI-generated designs
    const designs = [
      { id: 1, layout: 'Centralized Cooling', efficiency: 85, performance: 90 },
      { id: 2, layout: 'Distributed Cooling', efficiency: 80, performance: 95 },
      { id: 3, layout: 'Hybrid Cooling', efficiency: 88, performance: 92 },
    ];
    setGeneratedDesigns(designs);

    // Simulated critical paths
    const paths = [
      'Excessive power requirements for Layout 2',
      'Potential insufficient cooling for high-density racks in Layout 1',
    ];
    setCriticalPaths(paths);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Concept Design</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Design Constraints</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coolingLoad">Cooling Load (kW)</Label>
              <Input
                id="coolingLoad"
                name="coolingLoad"
                type="number"
                value={designConstraints.coolingLoad}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aiHardwareRequirements">AI Hardware Requirements</Label>
              <Input
                id="aiHardwareRequirements"
                name="aiHardwareRequirements"
                type="text"
                value={designConstraints.aiHardwareRequirements}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="button" onClick={generateDesigns}>Generate Designs</Button>
          </form>
        </CardContent>
      </Card>

      {generatedDesigns.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Cooling Layouts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Layout</TableHead>
                  <TableHead>Energy Efficiency (%)</TableHead>
                  <TableHead>Cooling Performance (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedDesigns.map((design) => (
                  <TableRow key={design.id}>
                    <TableCell>{design.layout}</TableCell>
                    <TableCell>{design.efficiency}</TableCell>
                    <TableCell>{design.performance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {criticalPaths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Critical Design Paths</CardTitle>
          </CardHeader>
          <CardContent>
            {criticalPaths.map((path, index) => (
              <Alert key={index} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Potential Issue</AlertTitle>
                <AlertDescription>{path}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConceptDesign;
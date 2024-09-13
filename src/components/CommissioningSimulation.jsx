import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from 'lucide-react';

const CommissioningSimulation = () => {
  const [simulationResults, setSimulationResults] = useState(null);
  const [complianceData, setComplianceData] = useState(null);

  const runSimulation = () => {
    // Simulated backend logic
    const results = {
      heatLoad: Math.random() * 100,
      powerUsage: Math.random() * 1000,
      coolingEfficiency: Math.random() * 100,
    };
    setSimulationResults(results);

    const compliance = {
      status: Math.random() > 0.8 ? 'Failed' : 'Passed',
      certifications: ['ISO 9001', 'ASHRAE 90.4', 'EN 50600'],
      discrepancies: Math.random() > 0.8 ? ['Cooling efficiency below threshold', 'Power usage exceeds limit'] : [],
    };
    setComplianceData(compliance);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commissioning Simulation</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={runSimulation}>Run Simulation</Button>
        
        {simulationResults && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Simulation Results</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Heat Load</TableCell>
                  <TableCell>{simulationResults.heatLoad.toFixed(2)} kW</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Power Usage</TableCell>
                  <TableCell>{simulationResults.powerUsage.toFixed(2)} kW</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cooling Efficiency</TableCell>
                  <TableCell>{simulationResults.coolingEfficiency.toFixed(2)}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
        
        {complianceData && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Compliance Data</h3>
            <Alert variant={complianceData.status === 'Passed' ? 'default' : 'destructive'}>
              {complianceData.status === 'Passed' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <AlertTitle>Compliance Status: {complianceData.status}</AlertTitle>
              <AlertDescription>
                {complianceData.status === 'Passed' 
                  ? 'All systems are operating within required parameters.' 
                  : 'Some systems are not meeting the required standards. Please review discrepancies.'}
              </AlertDescription>
            </Alert>
            <div>
              <h4 className="font-semibold">Certifications:</h4>
              <ul className="list-disc pl-5">
                {complianceData.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
            {complianceData.discrepancies.length > 0 && (
              <div>
                <h4 className="font-semibold">Discrepancies:</h4>
                <ul className="list-disc pl-5">
                  {complianceData.discrepancies.map((discrepancy, index) => (
                    <li key={index}>{discrepancy}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommissioningSimulation;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileCheck, AlertCircle } from 'lucide-react';

const SustainabilityCompliance = () => {
  const regulations = [
    { id: 1, name: 'Environmental Protection Act', status: 'Compliant', lastAudit: '2024-02-15', nextAudit: '2024-08-15', progress: 100 },
    { id: 2, name: 'Carbon Emissions Standard', status: 'In Progress', lastAudit: '2024-01-20', nextAudit: '2024-04-20', progress: 75 },
    { id: 3, name: 'Waste Management Regulation', status: 'Attention Needed', lastAudit: '2024-02-01', nextAudit: '2024-05-01', progress: 60 },
  ];

  const incidents = [
    { id: 1, type: 'Minor Spill', date: '2024-02-28', status: 'Resolved' },
    { id: 2, type: 'Emissions Alert', date: '2024-03-01', status: 'In Progress' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Compliance & Regulatory Management</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileCheck className="mr-2" /> Regulatory Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Regulation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Audit</TableHead>
                <TableHead>Next Audit</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regulations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell>{reg.name}</TableCell>
                  <TableCell>{reg.status}</TableCell>
                  <TableCell>{reg.lastAudit}</TableCell>
                  <TableCell>{reg.nextAudit}</TableCell>
                  <TableCell>
                    <Progress value={reg.progress} className="w-[60px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2" /> Environmental Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              <AlertCircle className="mr-2 h-4 w-4" />
              Report New Incident
            </Button>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>{incident.type}</TableCell>
                    <TableCell>{incident.date}</TableCell>
                    <TableCell>{incident.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityCompliance;
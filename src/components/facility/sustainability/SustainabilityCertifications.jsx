import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { FileCheck } from 'lucide-react';

const SustainabilityCertifications = () => {
  const certifications = [
    { id: 1, name: 'LEED Certification', status: 'Active', expiry: '2025-12-31', progress: 100 },
    { id: 2, name: 'ENERGY STAR', status: 'In Progress', expiry: '2024-12-31', progress: 75 },
    { id: 3, name: 'ISO 50001', status: 'Pending', expiry: '2024-06-30', progress: 45 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Green Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certification</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Documentation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certifications.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.name}</TableCell>
                <TableCell>{cert.status}</TableCell>
                <TableCell>{cert.expiry}</TableCell>
                <TableCell>
                  <Progress value={cert.progress} className="w-[60px]" />
                </TableCell>
                <TableCell>
                  <FileCheck className="h-4 w-4 text-green-500" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SustainabilityCertifications;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckSquare, FileText, AlertCircle, BarChart } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const ComplianceManagement = () => {
  const complianceItems = [
    { id: 1, requirement: "ISO 27001", status: "Compliant", lastAudit: "2024-02-15", nextAudit: "2024-08-15", progress: 100 },
    { id: 2, requirement: "GDPR", status: "In Progress", lastAudit: "2024-01-20", nextAudit: "2024-04-20", progress: 75 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance & Regulatory Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CheckSquare className="mr-2" /> Compliance Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Checklist</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2" /> Document Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Documents</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2" /> Audit Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Logs</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart className="mr-2" /> Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Generate Reports</Button>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requirement</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Audit</TableHead>
              <TableHead>Next Audit</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.requirement}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.lastAudit}</TableCell>
                <TableCell>{item.nextAudit}</TableCell>
                <TableCell>
                  <Progress value={item.progress} className="w-[60px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ComplianceManagement;
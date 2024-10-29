import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HardDrive, FileWarning, Activity, TestTube } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const DisasterRecovery = () => {
  const backupSchedules = [
    { id: 1, system: "Core Infrastructure", lastBackup: "2024-03-15 02:00", status: "Completed", type: "Full" },
    { id: 2, system: "Database Servers", lastBackup: "2024-03-15 03:30", status: "In Progress", type: "Incremental" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disaster Recovery & Business Continuity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <HardDrive className="mr-2" /> Backup Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Schedule Backup</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileWarning className="mr-2" /> Recovery Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Plans</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2" /> Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Run Analysis</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TestTube className="mr-2" /> Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Run Tests</Button>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>System</TableHead>
              <TableHead>Last Backup</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backupSchedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.system}</TableCell>
                <TableCell>{schedule.lastBackup}</TableCell>
                <TableCell>
                  <Badge variant={schedule.status === "Completed" ? "success" : "warning"}>
                    {schedule.status}
                  </Badge>
                </TableCell>
                <TableCell>{schedule.type}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DisasterRecovery;
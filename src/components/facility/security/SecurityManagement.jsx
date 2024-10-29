import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, Video, FileText, History } from 'lucide-react';

const SecurityManagement = () => {
  const securityLogs = [
    { id: 1, event: "Door Access", location: "Server Room A", timestamp: "2024-03-15 10:30", user: "John Doe" },
    { id: 2, event: "Camera Motion", location: "Perimeter East", timestamp: "2024-03-15 11:15", user: "System" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Shield className="mr-2" /> Access Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Access</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Video className="mr-2" /> Surveillance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Cameras</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2" /> Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Report Incident</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <History className="mr-2" /> Audit Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Logs</Button>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {securityLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.event}</TableCell>
                <TableCell>{log.location}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SecurityManagement;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertTriangle, GitPullRequest, Bell } from 'lucide-react';

const IncidentManagement = () => {
  const incidents = [
    { id: 1, type: "Power Fluctuation", severity: "High", status: "Open", reportedAt: "2024-03-15 09:30" },
    { id: 2, type: "Network Latency", severity: "Medium", status: "In Progress", reportedAt: "2024-03-15 10:15" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident & Change Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button>
            <AlertTriangle className="mr-2" /> Report Incident
          </Button>
          <Button variant="outline">
            <GitPullRequest className="mr-2" /> Request Change
          </Button>
          <Button variant="outline">
            <Bell className="mr-2" /> Manage Notifications
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reported At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.type}</TableCell>
                <TableCell>{incident.severity}</TableCell>
                <TableCell>{incident.status}</TableCell>
                <TableCell>{incident.reportedAt}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default IncidentManagement;
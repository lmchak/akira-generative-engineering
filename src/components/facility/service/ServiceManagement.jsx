import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileCheck, Ticket, LineChart, ClipboardList } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const ServiceManagement = () => {
  const tickets = [
    { id: 1, title: "Network Connectivity Issue", priority: "High", status: "Open", sla: "2 hours", created: "2024-03-15 09:00" },
    { id: 2, title: "Server Maintenance Request", priority: "Medium", status: "In Progress", sla: "4 hours", created: "2024-03-15 10:30" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileCheck className="mr-2" /> SLA Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Define SLAs</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Ticket className="mr-2" /> Support Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Create Ticket</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <LineChart className="mr-2" /> Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Metrics</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <ClipboardList className="mr-2" /> Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Generate Report</Button>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SLA Target</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>
                  <Badge variant={ticket.priority === "High" ? "destructive" : "default"}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.sla}</TableCell>
                <TableCell>{ticket.created}</TableCell>
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

export default ServiceManagement;
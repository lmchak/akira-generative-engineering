import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Wrench, Calendar, ClipboardList } from 'lucide-react';

const MaintenanceManagement = () => {
  const workOrders = [
    { id: 1, title: "AC Maintenance", priority: "High", status: "In Progress", dueDate: "2024-03-20" },
    { id: 2, title: "UPS Check", priority: "Medium", status: "Scheduled", dueDate: "2024-03-25" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Button>
            <Wrench className="mr-2" /> Create Work Order
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2" /> Schedule Maintenance
          </Button>
          <Button variant="outline">
            <ClipboardList className="mr-2" /> View History
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.title}</TableCell>
                <TableCell>{order.priority}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.dueDate}</TableCell>
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

export default MaintenanceManagement;
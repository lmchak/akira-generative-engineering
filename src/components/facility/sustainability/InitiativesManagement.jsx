import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from 'lucide-react';

const InitiativesManagement = () => {
  const projects = [
    { id: 1, name: 'Solar Panel Installation', status: 'In Progress', progress: 75, lead: 'John Doe' },
    { id: 2, name: 'Water Recycling System', status: 'Planning', progress: 30, lead: 'Jane Smith' },
    { id: 3, name: 'Waste Reduction Program', status: 'Completed', progress: 100, lead: 'Mike Johnson' },
  ];

  const programs = [
    { id: 1, name: 'Green Office Challenge', participants: 150, impact: 'High', status: 'Active' },
    { id: 2, name: 'Recycling Drive', participants: 200, impact: 'Medium', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Initiatives Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Initiative
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sustainability Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Project Lead</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <Progress value={project.progress} className="w-[60px]" />
                  </TableCell>
                  <TableCell>{project.lead}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Employee Engagement Programs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>{program.participants}</TableCell>
                  <TableCell>{program.impact}</TableCell>
                  <TableCell>{program.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InitiativesManagement;
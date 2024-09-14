import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockProjectData = {
    milestones: [
      { name: 'Design Phase', completed: 80 },
      { name: 'Construction', completed: 30 },
      { name: 'Equipment Installation', completed: 10 },
      { name: 'Testing', completed: 0 },
    ],
    budget: [
      { month: 'Jan', planned: 100000, actual: 95000 },
      { month: 'Feb', planned: 150000, actual: 160000 },
      { month: 'Mar', planned: 200000, actual: 190000 },
      { month: 'Apr', planned: 250000, actual: 240000 },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Project Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="design">Design Coordination</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Milestone Progress</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockProjectData.milestones}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Budget Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockProjectData.budget}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="planned" stroke="#8884d8" />
                      <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design">
          <Card>
            <CardHeader>
              <CardTitle>Design Coordination</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Design coordination features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Milestone Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Milestone management features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Resource management features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Timeline optimization features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Budget Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Budget management features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;
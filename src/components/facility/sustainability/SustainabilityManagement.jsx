import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Award, Recycle, Droplets, Battery, FileCheck } from 'lucide-react';

const SustainabilityManagement = () => {
  const energyData = [
    { month: 'Jan', carbon: 1200, renewable: 800, water: 500 },
    { month: 'Feb', carbon: 1100, renewable: 850, water: 480 },
    { month: 'Mar', carbon: 1300, renewable: 900, water: 520 },
  ];

  const certifications = [
    { id: 1, name: 'LEED Certification', status: 'Active', expiry: '2025-12-31', progress: 100 },
    { id: 2, name: 'ENERGY STAR', status: 'In Progress', expiry: '2024-12-31', progress: 75 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sustainability Management</h1>
      
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Sustainability Metrics</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="practices">Sustainable Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2" /> Carbon & Energy Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="carbon" stroke="#ff4444" name="Carbon Emissions (tons)" />
                    <Line type="monotone" dataKey="renewable" stroke="#44ff44" name="Renewable Energy (MWh)" />
                    <Line type="monotone" dataKey="water" stroke="#4444ff" name="Water Usage (kL)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <Battery className="mr-2 h-4 w-4" /> Energy Usage Intensity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2 kWh/GB</div>
                    <Progress value={75} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <Droplets className="mr-2 h-4 w-4" /> Water Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">500 kL</div>
                    <Progress value={60} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <Leaf className="mr-2 h-4 w-4" /> Carbon Footprint
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1200 tons</div>
                    <Progress value={40} className="mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2" /> Green Certifications
              </CardTitle>
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
        </TabsContent>

        <TabsContent value="practices">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Recycle className="mr-2" /> Sustainable Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Renewable Energy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">75%</div>
                    <div className="text-sm text-muted-foreground">Energy from renewable sources</div>
                    <Progress value={75} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">E-Waste Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">2.5 tons</div>
                    <div className="text-sm text-muted-foreground">Recycled this quarter</div>
                    <Progress value={85} className="mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SustainabilityManagement;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CapacityManagement = () => {
  const capacityData = [
    { name: 'Jan', usage: 65 },
    { name: 'Feb', usage: 70 },
    { name: 'Mar', usage: 75 },
    { name: 'Apr', usage: 80 },
    { name: 'May', usage: 85 },
    { name: 'Jun', usage: 82 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capacity Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4" variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Capacity Warning</AlertTitle>
          <AlertDescription>
            Zone A approaching 85% capacity threshold. Consider resource reallocation.
          </AlertDescription>
        </Alert>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={capacityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapacityManagement;
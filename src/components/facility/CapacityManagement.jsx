import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import CapacityChart from './capacity/CapacityChart';

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
        <CapacityChart data={capacityData} />
      </CardContent>
    </Card>
  );
};

export default CapacityManagement;
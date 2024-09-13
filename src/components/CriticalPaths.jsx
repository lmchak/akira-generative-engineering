import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const CriticalPaths = ({ paths }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Critical Design Paths</CardTitle>
      </CardHeader>
      <CardContent>
        {paths.map((path, index) => (
          <Alert key={index} variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Potential Issue</AlertTitle>
            <AlertDescription>{path}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default CriticalPaths;
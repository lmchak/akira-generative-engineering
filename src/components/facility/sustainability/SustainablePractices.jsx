import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SustainablePractices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Renewable Energy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">75%</div>
          <div className="text-sm text-muted-foreground">Energy from renewable sources</div>
          <Progress value={75} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>E-Waste Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">2.5 tons</div>
          <div className="text-sm text-muted-foreground">Recycled this quarter</div>
          <Progress value={85} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Water Conservation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">30%</div>
          <div className="text-sm text-muted-foreground">Reduction in water usage</div>
          <Progress value={30} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Green Supply Chain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">60%</div>
          <div className="text-sm text-muted-foreground">Sustainable suppliers</div>
          <Progress value={60} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainablePractices;
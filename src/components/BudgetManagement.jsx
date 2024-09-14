import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, DollarSign, TrendingUp } from 'lucide-react';

const BudgetManagement = () => {
  const [budget, setBudget] = useState({
    total: 1000000,
    spent: 450000,
    remaining: 550000
  });
  const [costPrediction, setCostPrediction] = useState(null);
  const [valueOptimization, setValueOptimization] = useState(null);
  const [costAlerts, setCostAlerts] = useState([]);

  useEffect(() => {
    predictCosts();
    optimizeValue();
    trackCosts();
  }, []);

  const predictCosts = () => {
    // Simulating cost prediction
    const prediction = {
      predictedOverrun: 50000,
      suggestion: "Consider reducing scope of marketing campaign to save $60,000"
    };
    setCostPrediction(prediction);
  };

  const optimizeValue = () => {
    // Simulating cost vs value optimization
    const optimization = {
      highValueAreas: ["Product Development", "Customer Support"],
      lowValueAreas: ["Office Renovations"],
      recommendation: "Reallocate $30,000 from Office Renovations to Product Development for better ROI"
    };
    setValueOptimization(optimization);
  };

  const trackCosts = () => {
    // Simulating real-time cost tracking
    const newAlerts = [
      { id: 1, message: "Marketing expenses approaching budget limit (85% used)", severity: "warning" },
      { id: 2, message: "IT infrastructure costs exceeded budget by 5%", severity: "error" }
    ];
    setCostAlerts(newAlerts);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Current Budget Status</h3>
          <div className="flex items-center space-x-4">
            <DollarSign className="h-6 w-6" />
            <div className="flex-1">
              <Progress value={(budget.spent / budget.total) * 100} className="w-full" />
            </div>
            <span className="font-semibold">{((budget.spent / budget.total) * 100).toFixed(1)}% Used</span>
          </div>
          <Table className="mt-2">
            <TableBody>
              <TableRow>
                <TableCell>Total Budget</TableCell>
                <TableCell className="text-right">${budget.total.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spent</TableCell>
                <TableCell className="text-right">${budget.spent.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Remaining</TableCell>
                <TableCell className="text-right">${budget.remaining.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Cost Prediction</h3>
          {costPrediction && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Potential Cost Overrun: ${costPrediction.predictedOverrun.toLocaleString()}</AlertTitle>
              <AlertDescription>{costPrediction.suggestion}</AlertDescription>
            </Alert>
          )}
          <Button onClick={predictCosts} className="mt-2">Update Cost Prediction</Button>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Cost vs. Value Optimization</h3>
          {valueOptimization && (
            <div>
              <p><strong>High Value Areas:</strong> {valueOptimization.highValueAreas.join(", ")}</p>
              <p><strong>Low Value Areas:</strong> {valueOptimization.lowValueAreas.join(", ")}</p>
              <Alert className="mt-2">
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Optimization Recommendation</AlertTitle>
                <AlertDescription>{valueOptimization.recommendation}</AlertDescription>
              </Alert>
            </div>
          )}
          <Button onClick={optimizeValue} className="mt-2">Optimize Cost vs. Value</Button>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Real-time Cost Tracking</h3>
          {costAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === "error" ? "destructive" : "default"} className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Cost Alert</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
          <Button onClick={trackCosts} className="mt-2">Refresh Cost Tracking</Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default BudgetManagement;

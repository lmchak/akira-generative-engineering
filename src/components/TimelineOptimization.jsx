import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Clock, GitBranch, Activity } from 'lucide-react';

const TimelineOptimization = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, task: 'Design Phase', startDate: '2024-03-01', endDate: '2024-04-15', status: 'In Progress' },
    { id: 2, task: 'Development Phase', startDate: '2024-04-16', endDate: '2024-06-30', status: 'Pending' },
    { id: 3, task: 'Testing Phase', startDate: '2024-07-01', endDate: '2024-08-15', status: 'Pending' },
  ]);

  const [prediction, setPrediction] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [criticalPath, setCriticalPath] = useState(null);

  const predictDelays = () => {
    // Simulating AI prediction
    setPrediction({
      task: 'Development Phase',
      delay: '2 weeks',
      contingency: 'Allocate additional resources to mitigate delay',
    });
  };

  const simulateScenario = () => {
    // Simulating scenario analysis
    setScenario({
      change: 'Scope increase in Development Phase',
      impact: '3 weeks delay',
      recommendation: 'Parallel testing to maintain end date',
    });
  };

  const analyzeCriticalPath = () => {
    // Simulating critical path analysis
    setCriticalPath({
      tasks: ['Design Phase', 'Development Phase'],
      bottleneck: 'Development Phase',
      suggestion: 'Optimize resource allocation in Development Phase',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Current Schedule</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>{task.startDate}</TableCell>
                  <TableCell>{task.endDate}</TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <div>
            <Button onClick={predictDelays} className="mr-2">
              <Clock className="mr-2 h-4 w-4" /> Predict Delays
            </Button>
            {prediction && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Delay Prediction</AlertTitle>
                <AlertDescription>
                  Task: {prediction.task}<br />
                  Potential Delay: {prediction.delay}<br />
                  Contingency Plan: {prediction.contingency}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <Button onClick={simulateScenario} className="mr-2">
              <GitBranch className="mr-2 h-4 w-4" /> Simulate Scenario
            </Button>
            {scenario && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Scenario Simulation</AlertTitle>
                <AlertDescription>
                  Change: {scenario.change}<br />
                  Impact: {scenario.impact}<br />
                  Recommendation: {scenario.recommendation}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <Button onClick={analyzeCriticalPath} className="mr-2">
              <Activity className="mr-2 h-4 w-4" /> Analyze Critical Path
            </Button>
            {criticalPath && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Critical Path Analysis</AlertTitle>
                <AlertDescription>
                  Critical Tasks: {criticalPath.tasks.join(', ')}<br />
                  Bottleneck: {criticalPath.bottleneck}<br />
                  Suggestion: {criticalPath.suggestion}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineOptimization;

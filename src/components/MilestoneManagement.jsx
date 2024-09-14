import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Bell } from 'lucide-react';

const MilestoneManagement = () => {
  const [milestones, setMilestones] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [progressAlerts, setProgressAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating initial data fetch
    fetchMilestones();
    generateRecommendations();
    monitorProgress();
    checkNotifications();
  }, []);

  const fetchMilestones = () => {
    // Simulated API call to fetch milestones
    const mockMilestones = [
      { id: 1, name: 'Project Kickoff', dueDate: '2024-03-15', status: 'Completed' },
      { id: 2, name: 'Design Phase Completion', dueDate: '2024-05-01', status: 'In Progress' },
      { id: 3, name: 'MVP Release', dueDate: '2024-07-15', status: 'Pending' },
      { id: 4, name: 'User Testing', dueDate: '2024-08-01', status: 'Pending' },
      { id: 5, name: 'Final Release', dueDate: '2024-09-30', status: 'Pending' },
    ];
    setMilestones(mockMilestones);
  };

  const generateRecommendations = () => {
    // Simulated AI recommendation generation
    const mockRecommendations = [
      { id: 1, suggestion: 'Consider adding a Beta Testing phase between MVP Release and User Testing', confidence: 0.85 },
      { id: 2, suggestion: 'The current timeline for Design Phase Completion may be optimistic. Consider extending by 2 weeks.', confidence: 0.72 },
    ];
    setRecommendations(mockRecommendations);
  };

  const monitorProgress = () => {
    // Simulated ML-based progress monitoring
    const mockAlerts = [
      { id: 1, message: 'Design Phase is likely to be delayed by 1 week based on current progress', severity: 'warning' },
      { id: 2, message: 'Resource shortage detected for MVP Release phase', severity: 'error' },
    ];
    setProgressAlerts(mockAlerts);
  };

  const checkNotifications = () => {
    // Simulated notification generation
    const mockNotifications = [
      { id: 1, message: 'Design Phase Completion milestone due in 2 weeks', type: 'reminder' },
      { id: 2, message: 'MVP Release milestone may be at risk due to resource constraints', type: 'alert' },
    ];
    setNotifications(mockNotifications);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestone Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Current Milestones</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone) => (
                <TableRow key={milestone.id}>
                  <TableCell>{milestone.name}</TableCell>
                  <TableCell>{milestone.dueDate}</TableCell>
                  <TableCell>{milestone.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
          {recommendations.map((rec) => (
            <Alert key={rec.id} className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Recommendation (Confidence: {(rec.confidence * 100).toFixed(0)}%)</AlertTitle>
              <AlertDescription>{rec.suggestion}</AlertDescription>
            </Alert>
          ))}
          <Button onClick={generateRecommendations} className="mt-2">Generate New Recommendations</Button>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Progress Monitoring</h3>
          {progressAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === 'error' ? 'destructive' : 'default'} className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Progress Alert</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
          <Button onClick={monitorProgress} className="mt-2">Refresh Progress Analysis</Button>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Notifications & Alerts</h3>
          {notifications.map((notif) => (
            <Alert key={notif.id} variant={notif.type === 'alert' ? 'destructive' : 'default'} className="mb-2">
              <Bell className="h-4 w-4" />
              <AlertTitle>{notif.type === 'alert' ? 'Alert' : 'Reminder'}</AlertTitle>
              <AlertDescription>{notif.message}</AlertDescription>
            </Alert>
          ))}
          <Button onClick={checkNotifications} className="mt-2">Check for New Notifications</Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default MilestoneManagement;

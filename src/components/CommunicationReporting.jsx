import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText, Mic, MessageSquare } from 'lucide-react';

const CommunicationReporting = () => {
  const [statusReport, setStatusReport] = useState(null);
  const [meetingSummary, setMeetingSummary] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [userQuery, setUserQuery] = useState('');

  const generateStatusReport = () => {
    // Simulating API call to generate status report
    const report = {
      overallProgress: '75%',
      upcomingMilestones: [
        { name: 'Design Phase Completion', date: '2024-04-15' },
        { name: 'MVP Release', date: '2024-07-15' },
      ],
      risks: [
        { description: 'Potential delay in equipment delivery', impact: 'Medium' },
      ],
    };
    setStatusReport(report);
  };

  const generateMeetingSummary = () => {
    // Simulating AI-generated meeting summary
    const summary = {
      date: '2024-03-10',
      attendees: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      actionItems: [
        { task: 'Update project timeline', assignee: 'John Doe', dueDate: '2024-03-17' },
        { task: 'Schedule vendor meeting', assignee: 'Jane Smith', dueDate: '2024-03-20' },
      ],
      keyDecisions: [
        'Approved budget increase for marketing campaign',
        'Postponed office renovation to Q3',
      ],
    };
    setMeetingSummary(summary);
  };

  const handleAiQuery = () => {
    // Simulating AI response to user query
    setAiResponse(`Based on the current project data, the status of milestone X is: In Progress. It is scheduled to be completed by 2024-05-01, and the team is currently 60% through the planned tasks.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication & Reporting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Automated Status Reports</h3>
          <Button onClick={generateStatusReport} className="mb-2">
            <FileText className="mr-2 h-4 w-4" /> Generate Status Report
          </Button>
          {statusReport && (
            <div className="space-y-2">
              <p><strong>Overall Progress:</strong> {statusReport.overallProgress}</p>
              <h4 className="font-semibold">Upcoming Milestones:</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statusReport.upcomingMilestones.map((milestone, index) => (
                    <TableRow key={index}>
                      <TableCell>{milestone.name}</TableCell>
                      <TableCell>{milestone.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <h4 className="font-semibold">Risks:</h4>
              <ul className="list-disc pl-5">
                {statusReport.risks.map((risk, index) => (
                  <li key={index}>{risk.description} - Impact: {risk.impact}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Meeting Summaries</h3>
          <Button onClick={generateMeetingSummary} className="mb-2">
            <Mic className="mr-2 h-4 w-4" /> Generate Meeting Summary
          </Button>
          {meetingSummary && (
            <div className="space-y-2">
              <p><strong>Date:</strong> {meetingSummary.date}</p>
              <p><strong>Attendees:</strong> {meetingSummary.attendees.join(', ')}</p>
              <h4 className="font-semibold">Action Items:</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetingSummary.actionItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.task}</TableCell>
                      <TableCell>{item.assignee}</TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <h4 className="font-semibold">Key Decisions:</h4>
              <ul className="list-disc pl-5">
                {meetingSummary.keyDecisions.map((decision, index) => (
                  <li key={index}>{decision}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">AI Chat Interface</h3>
          <div className="flex space-x-2 mb-2">
            <Input
              type="text"
              placeholder="Ask a question about the project..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAiQuery}>
              <MessageSquare className="mr-2 h-4 w-4" /> Ask AI
            </Button>
          </div>
          {aiResponse && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>AI Response</AlertTitle>
              <AlertDescription>{aiResponse}</AlertDescription>
            </Alert>
          )}
        </section>
      </CardContent>
    </Card>
  );
};

export default CommunicationReporting;
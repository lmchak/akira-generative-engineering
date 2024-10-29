import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp } from 'lucide-react';

const ContinuousImprovement = () => {
  const benchmarkData = [
    { metric: 'Energy', company: 85, industry: 75 },
    { metric: 'Water', company: 78, industry: 70 },
    { metric: 'Waste', company: 92, industry: 80 },
  ];

  const goals = [
    { id: 1, name: 'Carbon Neutral by 2025', progress: 65, target: '0 emissions' },
    { id: 2, name: '100% Renewable Energy', progress: 80, target: '100%' },
    { id: 3, name: 'Zero Waste to Landfill', progress: 45, target: '0 waste' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Continuous Improvement</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Industry Benchmarking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="company" fill="#4CAF50" name="Our Performance" />
                <Bar dataKey="industry" fill="#2196F3" name="Industry Average" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Sustainability Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm text-gray-500">Target: {goal.target}</span>
                </div>
                <Progress value={goal.progress} className="w-full" />
                <div className="text-sm text-gray-500 text-right">{goal.progress}% Complete</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuousImprovement;
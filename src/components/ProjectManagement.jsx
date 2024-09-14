import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesignCoordinationModule from './DesignCoordinationModule';
import MilestoneManagement from './MilestoneManagement';
import ResourceManagement from './ResourceManagement';
import TimelineOptimization from './TimelineOptimization';
import BudgetManagement from './BudgetManagement';
import CommunicationReporting from './CommunicationReporting';

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState('design');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Project Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="design">Design Coordination</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
          <DesignCoordinationModule />
        </TabsContent>

        <TabsContent value="milestones">
          <MilestoneManagement />
        </TabsContent>

        <TabsContent value="resources">
          <ResourceManagement />
        </TabsContent>

        <TabsContent value="timeline">
          <TimelineOptimization />
        </TabsContent>

        <TabsContent value="budget">
          <BudgetManagement />
        </TabsContent>

        <TabsContent value="communication">
          <CommunicationReporting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;

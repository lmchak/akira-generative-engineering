import React from 'react';
import Dashboard from '@/components/Dashboard';
import DesignTool from '@/components/DesignTool';
import SimulationTool from '@/components/SimulationTool';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GenerativeEngineering = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Generative Engineering for AI Data Center Design</h1>
      <Dashboard />
      <Tabs defaultValue="design">
        <TabsList>
          <TabsTrigger value="design">Design Tool</TabsTrigger>
          <TabsTrigger value="simulation">Simulation Tool</TabsTrigger>
        </TabsList>
        <TabsContent value="design">
          <DesignTool />
        </TabsContent>
        <TabsContent value="simulation">
          <SimulationTool />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GenerativeEngineering;
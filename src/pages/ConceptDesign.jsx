import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConceptDesignChatInterface from '@/components/ConceptDesignChatInterface';
import ConceptDesignForm from '@/components/ConceptDesignForm';
import GeneratedDesigns from '@/components/GeneratedDesigns';
import CriticalPaths from '@/components/CriticalPaths';

const ConceptDesign = () => {
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [criticalPaths, setCriticalPaths] = useState([]);

  const handleGenerateDesigns = (designConstraints) => {
    // This function can be expanded to process the AI-generated design
    // and update the generatedDesigns and criticalPaths states
    console.log("Design constraints:", designConstraints);
    
    // For now, we'll just set some dummy data
    setGeneratedDesigns([
      { id: 1, layout: 'Centralized Cooling', efficiency: 85, performance: 90 },
      { id: 2, layout: 'Distributed Cooling', efficiency: 80, performance: 95 },
    ]);
    setCriticalPaths([
      'Optimize power distribution for Layout 1',
      'Improve cooling efficiency for high-density racks in Layout 2',
    ]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Concept Design</h1>
      
      <Tabs defaultValue="design">
        <TabsList>
          <TabsTrigger value="design">Design Tool</TabsTrigger>
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
          <ConceptDesignForm onGenerateDesigns={handleGenerateDesigns} />
          {generatedDesigns.length > 0 && <GeneratedDesigns designs={generatedDesigns} />}
          {criticalPaths.length > 0 && <CriticalPaths paths={criticalPaths} />}
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Concept Design Chat Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <ConceptDesignChatInterface />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDesign;
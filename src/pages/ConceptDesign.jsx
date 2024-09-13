import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConceptDesignChatInterface from '@/components/ConceptDesignChatInterface';
import ConceptDesignForm from '@/components/ConceptDesignForm';
import GeneratedDesigns from '@/components/GeneratedDesigns';
import CriticalPaths from '@/components/CriticalPaths';

const ConceptDesign = () => {
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [criticalPaths, setCriticalPaths] = useState([]);

  const handleGenerateDesigns = (designConstraints) => {
    // Simulated AI-generated designs
    const designs = [
      { id: 1, layout: 'Centralized Cooling', efficiency: 85, performance: 90 },
      { id: 2, layout: 'Distributed Cooling', efficiency: 80, performance: 95 },
      { id: 3, layout: 'Hybrid Cooling', efficiency: 88, performance: 92 },
    ];
    setGeneratedDesigns(designs);

    // Simulated critical paths
    const paths = [
      'Excessive power requirements for Layout 2',
      'Potential insufficient cooling for high-density racks in Layout 1',
    ];
    setCriticalPaths(paths);
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
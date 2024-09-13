import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from '@/components/ChatInterface';
import CommissioningSimulation from '@/components/CommissioningSimulation';

const Commissioning = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Commissioning and Compliance</h1>
      
      <Tabs defaultValue="simulation">
        <TabsList>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="simulation">
          <CommissioningSimulation />
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Commissioning Chat Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatInterface />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Commissioning;
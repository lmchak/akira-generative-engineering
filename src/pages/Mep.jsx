import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MepOptimization from '@/components/MepOptimization';
import ChatInterface from '@/components/ChatInterface';

const Mep = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">MEP Optimization</h1>
      
      <Tabs defaultValue="optimization">
        <TabsList>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="optimization">
          <MepOptimization />
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>MEP Chat Assistant</CardTitle>
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

export default Mep;
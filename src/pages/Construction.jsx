import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConstructionPlanning from '@/components/ConstructionPlanning';
import ChatInterface from '@/components/ChatInterface';

const Construction = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Construction Planning</h1>
      
      <Tabs defaultValue="planning">
        <TabsList>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="planning">
          <ConstructionPlanning />
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Construction Chat Assistant</CardTitle>
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

export default Construction;
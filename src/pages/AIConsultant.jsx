import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIConsultantChatInterface from '@/components/AIConsultantChatInterface';

const AIConsultant = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Data Center Real Estate Consultant</h1>
      
      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>AI Data Center Real Estate Consultant</CardTitle>
            </CardHeader>
            <CardContent>
              <AIConsultantChatInterface />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIConsultant;
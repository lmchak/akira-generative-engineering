import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInterface from '@/components/ChatInterface';

const Chat = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chat</h1>
      <Card>
        <CardHeader>
          <CardTitle>Chat Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;

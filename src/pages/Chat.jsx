import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Chat = () => {
  return (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)]">
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
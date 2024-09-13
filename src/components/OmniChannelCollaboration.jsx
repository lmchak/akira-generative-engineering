import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OmniChannelCollaboration = () => {
  const [activeChannel, setActiveChannel] = useState('chat');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log(`Sending message via ${activeChannel}: ${message}`);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Omni Channel Collaboration</h1>
      
      <Tabs value={activeChannel} onValueChange={setActiveChannel}>
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Project Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto border rounded p-2">
                  {/* Chat messages would be displayed here */}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <Button onClick={handleSendMessage}>Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Compose Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="To" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Email body" rows={6} />
                <Button>Send Email</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample notifications */}
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe commented on Design Phase</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar-2.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Smith updated Construction Timeline</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OmniChannelCollaboration;
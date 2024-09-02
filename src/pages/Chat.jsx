import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { Send, Mic, PaperclipIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user', timestamp: new Date().toISOString() };
      setMessages([...messages, newMessage]);
      setInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { text: generateAIResponse(input), sender: 'ai', timestamp: new Date().toISOString() };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  const generateAIResponse = (userInput) => {
    // Simple echo with some variations
    const responses = [
      `I understood your message: "${userInput}". How can I assist you further?`,
      `You said: "${userInput}". That's interesting! Can you tell me more?`,
      `I see you mentioned "${userInput}". Let's explore that topic together.`,
      `"${userInput}" - That's a great point! What else would you like to discuss?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="flex-grow flex flex-col m-0 rounded-none sm:m-4 sm:rounded-lg overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center">
            <Link to="/profile" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <CardTitle className="text-xl">Chat with AI</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-8 w-8">
                  {message.sender === 'user' ? (
                    <>
                      <AvatarImage src={profile?.avatar_url} alt={profile?.first_name} />
                      <AvatarFallback>{profile?.first_name?.[0]}{profile?.last_name?.[0]}</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/ai-avatar.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className={`px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p>{message.text}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
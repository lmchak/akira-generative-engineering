import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageList = ({ messages, profile, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse max-w-5xl' : 'max-w-full'}`}>
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
            <Card className={`${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white max-w-5xl' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white max-w-full'
            }`}>
              <CardContent className="p-3">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

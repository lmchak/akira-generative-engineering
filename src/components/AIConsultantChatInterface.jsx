import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { Send, Mic, PaperclipIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AIConsultantChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatHistory = () => {
    const savedMessages = localStorage.getItem('aiConsultantChatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  };

  const saveChatHistory = (updatedMessages) => {
    localStorage.setItem('aiConsultantChatHistory', JSON.stringify(updatedMessages));
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date().toISOString() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      saveChatHistory(updatedMessages);
      setInput('');

      try {
        const aiResponseText = await generateAIResponse(input);
        const aiMessage = { text: aiResponseText, sender: 'ai', timestamp: new Date().toISOString() };
        const finalMessages = [...updatedMessages, aiMessage];
        setMessages(finalMessages);
        saveChatHistory(finalMessages);
      } catch (error) {
        console.error("Error generating AI response:", error);
      }
    }
  };

  const generateAIResponse = async (userInput) => {
    const data = { question: userInput };
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/prediction/fb77b02d-9e3c-42ed-8d16-cb772cfd8c26",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();
      return result.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, something went wrong. Please try again later.";
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
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
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
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
    </div>
  );
};

export default AIConsultantChatInterface;
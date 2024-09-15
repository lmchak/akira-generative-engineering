import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { Send, Mic, PaperclipIcon, MoreVertical, Settings, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ConceptDesignChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);
  const messagesEndRef = useRef(null);
  const [llmSettings, setLlmSettings] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150,
  });

  useEffect(() => {
    loadChatHistory();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatHistory = () => {
    const savedMessages = localStorage.getItem('conceptDesignChatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  };

  const saveChatHistory = (updatedMessages) => {
    localStorage.setItem('conceptDesignChatHistory', JSON.stringify(updatedMessages));
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-2">
            <Settings className="mr-2 h-4 w-4" />
            LLM Settings
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>LLM Configuration</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">Model</Label>
              <Select
                value={llmSettings.model}
                onValueChange={(value) => setLlmSettings({ ...llmSettings, model: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="temperature" className="text-right">Temperature</Label>
              <div className="col-span-3">
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[llmSettings.temperature]}
                  onValueChange={([value]) => setLlmSettings({ ...llmSettings, temperature: value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxTokens" className="text-right">Max Tokens</Label>
              <Input
                id="maxTokens"
                type="number"
                value={llmSettings.maxTokens}
                onChange={(e) => setLlmSettings({ ...llmSettings, maxTokens: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConceptDesignChatInterface;

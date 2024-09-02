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
import { Switch } from "@/components/ui/switch";
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);
  const messagesEndRef = useRef(null);
  const [savedChats, setSavedChats] = useState([]);
  const [llmSettings, setLlmSettings] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatName, setEditingChatName] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    loadSavedChats();
    loadLlmSettings();
  }, [session?.user?.id]);

  const loadSavedChats = async () => {
    const { data, error } = await supabase
      .from('saved_chats')
      .select('*')
      .eq('user_id', session?.user?.id);
    if (error) {
      console.error('Error loading saved chats:', error);
    } else {
      setSavedChats(data);
    }
  };

  const loadLlmSettings = async () => {
    const { data, error } = await supabase
      .from('llm_settings')
      .select('*')
      .eq('user_id', session?.user?.id)
      .single();
    if (error) {
      console.error('Error loading LLM settings:', error);
    } else if (data) {
      setLlmSettings(data);
    }
  };

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
    const responses = [
      `I understood your message: "${userInput}". How can I assist you further?`,
      `You said: "${userInput}". That's interesting! Can you tell me more?`,
      `I see you mentioned "${userInput}". Let's explore that topic together.`,
      `"${userInput}" - That's a great point! What else would you like to discuss?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const saveChat = async () => {
    const { data, error } = await supabase
      .from('saved_chats')
      .insert({
        user_id: session?.user?.id,
        name: `Chat ${savedChats.length + 1}`,
        messages: messages,
      })
      .select();
    if (error) {
      toast.error('Error saving chat: ' + error.message);
    } else {
      setSavedChats([...savedChats, data[0]]);
      toast.success('Chat saved successfully!');
    }
  };

  const removeChat = async (chatId) => {
    const { error } = await supabase
      .from('saved_chats')
      .delete()
      .eq('id', chatId);
    if (error) {
      toast.error('Error removing chat: ' + error.message);
    } else {
      setSavedChats(savedChats.filter(chat => chat.id !== chatId));
      toast.success('Chat removed successfully!');
    }
  };

  const startEditingChat = (chatId, chatName) => {
    setEditingChatId(chatId);
    setEditingChatName(chatName);
  };

  const saveEditedChatName = async () => {
    const { error } = await supabase
      .from('saved_chats')
      .update({ name: editingChatName })
      .eq('id', editingChatId);
    if (error) {
      toast.error('Error updating chat name: ' + error.message);
    } else {
      setSavedChats(savedChats.map(chat => 
        chat.id === editingChatId ? { ...chat, name: editingChatName } : chat
      ));
      setEditingChatId(null);
      toast.success('Chat name updated successfully!');
    }
  };

  const updateLlmSettings = async (newSettings) => {
    const { error } = await supabase
      .from('llm_settings')
      .upsert({ user_id: session?.user?.id, ...newSettings });
    if (error) {
      toast.error('Error updating LLM settings: ' + error.message);
    } else {
      setLlmSettings(newSettings);
      toast.success('LLM settings updated successfully!');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
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
          <Button variant="outline" size="icon">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chat Options</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Button onClick={saveChat} className="w-full">Save Chat</Button>
                <div>
                  <h3 className="font-semibold mb-2">Saved Chats</h3>
                  {savedChats.map(chat => (
                    <div key={chat.id} className="flex items-center justify-between mb-2">
                      {editingChatId === chat.id ? (
                        <Input
                          value={editingChatName}
                          onChange={(e) => setEditingChatName(e.target.value)}
                          onBlur={saveEditedChatName}
                          onKeyPress={(e) => e.key === 'Enter' && saveEditedChatName()}
                        />
                      ) : (
                        <span>{chat.name}</span>
                      )}
                      <div>
                        <Button variant="ghost" size="sm" onClick={() => startEditingChat(chat.id, chat.name)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeChat(chat.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      LLM Settings
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>LLM Settings</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Select
                          value={llmSettings.model}
                          onValueChange={(value) => updateLlmSettings({ ...llmSettings, model: value })}
                        >
                          <SelectTrigger id="model">
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Temperature: {llmSettings.temperature}</Label>
                        <Slider
                          id="temperature"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[llmSettings.temperature]}
                          onValueChange={([value]) => updateLlmSettings({ ...llmSettings, temperature: value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxTokens">Max Tokens: {llmSettings.maxTokens}</Label>
                        <Slider
                          id="maxTokens"
                          min={1}
                          max={2048}
                          step={1}
                          value={[llmSettings.maxTokens]}
                          onValueChange={([value]) => updateLlmSettings({ ...llmSettings, maxTokens: value })}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="streamResponse"
                          checked={llmSettings.streamResponse}
                          onCheckedChange={(checked) => updateLlmSettings({ ...llmSettings, streamResponse: checked })}
                        />
                        <Label htmlFor="streamResponse">Stream Response</Label>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
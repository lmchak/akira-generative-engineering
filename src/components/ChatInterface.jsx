import React, { useState, useEffect, useRef } from 'react';
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import { useChats, useCreateChat, useUpdateChat, useDeleteChat } from '@/integrations/supabase/hooks/chats';
import SavedChats from './SavedChats';
import ChatSettings from './ChatSettings';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ChatInterface = () => {
  const [messages, setMessages] = useLocalStorage('chatMessages', []);
  const [input, setInput] = useState('');
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);
  const messagesEndRef = useRef(null);
  const { data: savedChats, refetch: refetchChats } = useChats();
  const createChat = useCreateChat();
  const updateChat = useUpdateChat();
  const deleteChat = useDeleteChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (session?.user?.id) {
      refetchChats();
    }
  }, [session?.user?.id, refetchChats]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date().toISOString() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');

      try {
        const aiResponseText = await generateAIResponse(input);
        const aiMessage = { text: aiResponseText, sender: 'ai', timestamp: new Date().toISOString() };
        setMessages([...updatedMessages, aiMessage]);
      } catch (error) {
        console.error("Error generating AI response:", error);
      }
    }
  };

  const generateAIResponse = async (userInput) => {
    const data = { question: userInput };
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/prediction/a164fd14-4780-4f44-848f-b9bb314dff24",
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

  const saveChat = async () => {
    if (messages.length === 0) return;
    try {
      await createChat.mutateAsync({
        user_id: session.user.id,
        name: `Chat ${(savedChats?.length || 0) + 1}`,
        messages: messages,
      });
      await refetchChats();
      console.log("Chat saved successfully");
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };

  const deleteCurrentChat = () => {
    setMessages([]);
  };

  const loadChat = (chatMessages) => {
    setMessages(chatMessages);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <SavedChats savedChats={savedChats} loadChat={loadChat} deleteChat={deleteChat.mutateAsync} />
        <ChatSettings />
      </div>
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} profile={profile} messagesEndRef={messagesEndRef} />
        <InputArea
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          saveChat={saveChat}
          deleteChat={deleteCurrentChat}
        />
      </div>
    </div>
  );
};

export default ChatInterface;

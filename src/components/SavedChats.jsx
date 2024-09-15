import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2 } from 'lucide-react';
import { useDeleteChat, useUpdateChat } from '@/integrations/supabase/hooks/chats';

const SavedChats = ({ savedChats, loadChat }) => {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatName, setEditingChatName] = useState('');
  const deleteChat = useDeleteChat();
  const updateChat = useUpdateChat();

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat.mutateAsync(chatId);
    } catch (error) {
      console.error('Error removing chat:', error);
    }
  };

  const handleUpdateChatName = async () => {
    try {
      await updateChat.mutateAsync({ id: editingChatId, name: editingChatName });
      setEditingChatId(null);
      setEditingChatName('');
    } catch (error) {
      console.error('Error updating chat name:', error);
    }
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Saved Chats</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        {savedChats?.map((chat) => (
          <div key={chat.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            {editingChatId === chat.id ? (
              <Input
                value={editingChatName}
                onChange={(e) => setEditingChatName(e.target.value)}
                onBlur={handleUpdateChatName}
                onKeyPress={(e) => e.key === 'Enter' && handleUpdateChatName()}
                className="w-full"
              />
            ) : (
              <>
                <span onClick={() => loadChat(chat.messages)} className="cursor-pointer">{chat.name}</span>
                <div>
                  <Button variant="ghost" size="icon" onClick={() => {
                    setEditingChatId(chat.id);
                    setEditingChatName(chat.name);
                  }}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteChat(chat.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedChats;
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2 } from 'lucide-react';
import { useUpdateChat } from '@/integrations/supabase/hooks/chats';

const SavedChats = ({ savedChats, loadChat, deleteChat }) => {
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatName, setEditingChatName] = useState('');
  const updateChat = useUpdateChat();

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
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
    <div className="flex-grow overflow-y-auto">
      <h2 className="text-lg font-semibold p-4">Saved Chats</h2>
      {savedChats && savedChats.length > 0 ? (
        savedChats.map((chat) => (
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
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No saved chats yet.</p>
      )}
    </div>
  );
};

export default SavedChats;

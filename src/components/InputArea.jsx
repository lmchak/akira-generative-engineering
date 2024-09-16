import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, PaperclipIcon } from 'lucide-react';

const InputArea = ({ input, setInput, handleSend, saveChat, deleteChat }) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Button onClick={saveChat} variant="outline" size="sm">
          Save Chat
        </Button>
        <Button onClick={deleteChat} variant="outline" size="sm">
          Delete Chat
        </Button>
      </div>
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
  );
};

export default InputArea;
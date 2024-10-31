import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

const KnowledgeBaseHeader = ({ onCreateNew }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <FileText className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Knowledge bases</h2>
        <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-sm">2</span>
      </div>
      <Button onClick={onCreateNew} className="bg-blue-500 hover:bg-blue-600">
        Create knowledge base
      </Button>
    </div>
  );
};

export default KnowledgeBaseHeader;
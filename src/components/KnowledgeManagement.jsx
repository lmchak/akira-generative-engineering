import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import KnowledgeBaseHeader from './knowledge/KnowledgeBaseHeader';
import KnowledgeBaseList from './knowledge/KnowledgeBaseList';
import { toast } from "sonner";

const KnowledgeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [knowledgeBases, setKnowledgeBases] = useState([]);

  const handleCreateNew = () => {
    toast.info("Create knowledge base functionality coming soon");
  };

  const handleEdit = (knowledgeBase) => {
    toast.info(`Edit ${knowledgeBase.name}`);
  };

  const handleDelete = (id) => {
    toast.info(`Delete knowledge base ${id}`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="bases" className="w-full">
        <TabsList>
          <TabsTrigger value="bases">Knowledge bases</TabsTrigger>
          <TabsTrigger value="chat">Chat with your document</TabsTrigger>
        </TabsList>

        <TabsContent value="bases">
          <Card>
            <CardContent className="pt-6">
              <KnowledgeBaseHeader onCreateNew={handleCreateNew} />
              <KnowledgeBaseList
                knowledgeBases={knowledgeBases}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardContent>
              Chat with your document feature coming soon...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeManagement;
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import KnowledgeBaseHeader from './knowledge/KnowledgeBaseHeader';
import KnowledgeBaseList from './knowledge/KnowledgeBaseList';
import CreateKnowledgeBaseDialog from './knowledge/CreateKnowledgeBaseDialog';
import DocumentChat from './knowledge/DocumentChat';
import { toast } from "sonner";

const KnowledgeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Sample knowledge base data
  const [knowledgeBases] = useState([
    {
      id: 1,
      name: "Data Center Documentation",
      status: "Active",
      description: "Complete documentation for data center operations and procedures",
      sourceFiles: "25 files",
      creationTime: "2024-02-15T10:30:00",
      lastSync: "2024-03-10T15:45:00"
    },
    {
      id: 2,
      name: "Technical Specifications",
      status: "Processing",
      description: "Hardware and software specifications for all equipment",
      sourceFiles: "12 files",
      creationTime: "2024-02-20T09:15:00",
      lastSync: "2024-03-09T14:20:00"
    },
    {
      id: 3,
      name: "Maintenance Procedures",
      status: "Active",
      description: "Standard operating procedures for maintenance tasks",
      sourceFiles: "18 files",
      creationTime: "2024-02-25T11:45:00",
      lastSync: "2024-03-10T16:30:00"
    }
  ]);

  const handleCreateNew = () => {
    setIsCreateDialogOpen(true);
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
            <CardContent className="pt-6">
              <DocumentChat />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateKnowledgeBaseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default KnowledgeManagement;
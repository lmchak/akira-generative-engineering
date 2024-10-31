import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KnowledgeBaseOverview from '@/components/knowledge/details/KnowledgeBaseOverview';
import TagsSection from '@/components/knowledge/details/TagsSection';
import DataSourceSection from '@/components/knowledge/details/DataSourceSection';
import ModelSection from '@/components/knowledge/details/ModelSection';

const KnowledgeBaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Save changes logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Knowledge Base Details</h1>
        <Button onClick={() => navigate('/knowledge-management')}>Back</Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="data-source">Data Source</TabsTrigger>
          <TabsTrigger value="model">Model</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <KnowledgeBaseOverview id={id} isEditing={isEditing} onEdit={() => setIsEditing(true)} />
        </TabsContent>

        <TabsContent value="tags">
          <TagsSection id={id} />
        </TabsContent>

        <TabsContent value="data-source">
          <DataSourceSection id={id} />
        </TabsContent>

        <TabsContent value="model">
          <ModelSection id={id} />
        </TabsContent>
      </Tabs>

      {isEditing && (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseDetails;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Tags, RefreshCw, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

const KnowledgeBaseDetails = () => {
  const { id } = useParams();

  const { data: knowledgeBase, isLoading, error } = useQuery({
    queryKey: ['knowledgeBase', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_bases')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const handleSync = async () => {
    try {
      // Implement sync functionality here
      toast.success('Sync started successfully');
    } catch (error) {
      toast.error('Failed to sync: ' + error.message);
    }
  };

  const handleEditDetails = async () => {
    try {
      // Implement edit functionality here
      toast.success('Details updated successfully');
    } catch (error) {
      toast.error('Failed to update details: ' + error.message);
    }
  };

  const handleManageTags = async () => {
    try {
      // Implement tag management here
      toast.success('Tags updated successfully');
    } catch (error) {
      toast.error('Failed to update tags: ' + error.message);
    }
  };

  const handleViewWarnings = async (syncEvent) => {
    try {
      // Implement warning view functionality here
      toast.info('Viewing warnings for sync event: ' + syncEvent.id);
    } catch (error) {
      toast.error('Failed to load warnings: ' + error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!knowledgeBase) {
    return <div>Knowledge base not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{knowledgeBase.name}</h2>
        <Badge variant="outline">{knowledgeBase.status}</Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data-source">Data Source</TabsTrigger>
          <TabsTrigger value="sync-history">Sync History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Knowledge Base Overview</CardTitle>
              <Button variant="outline" onClick={handleEditDetails}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {knowledgeBase.description || 'No description provided'}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {knowledgeBase.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleManageTags}>
                    <Tags className="h-4 w-4 mr-2" />
                    Manage Tags
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-source">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Data Source Configuration</CardTitle>
              <Button variant="outline" onClick={handleSync}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Source Type</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {knowledgeBase.data_source_type || 'Not configured'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Connection Details</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {knowledgeBase.connection_details || 'No connection details available'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync-history">
          <Card>
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {knowledgeBase.sync_history?.map((event, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{new Date(event.timestamp).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{event.status}</p>
                      </div>
                      {event.has_warnings && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewWarnings(event)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                          View Warnings
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBaseDetails;
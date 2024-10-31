import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const KnowledgeBaseOverview = ({ id, isEditing, onEdit }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Knowledge Base Overview</CardTitle>
        {!isEditing && <Button onClick={onEdit}>Edit</Button>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input 
            disabled={!isEditing}
            defaultValue="Data Center Documentation"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea 
            disabled={!isEditing}
            defaultValue="Complete documentation for data center operations and procedures"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <Input 
            disabled
            value="Active"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBaseOverview;
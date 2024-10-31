import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ModelSection = ({ id }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vector Embeddings Model</CardTitle>
        <Button>Edit Provisioned Throughput</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Model Type</label>
          <Select defaultValue="ada">
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ada">text-embedding-ada-002</SelectItem>
              <SelectItem value="custom">Custom Model</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Provisioned Throughput</label>
          <Input type="number" defaultValue="100" />
          <p className="text-sm text-gray-500">Requests per minute</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Current Usage</h3>
          <p>Average: 45 requests/minute</p>
          <p>Peak: 78 requests/minute</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelSection;
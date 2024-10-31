import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const DataSourceConfig = ({ config, onConfigChange }) => {
  const handleChunkingStrategyChange = (value) => {
    onConfigChange('chunkingStrategy', value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Data Source Configuration</h3>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <Label>Chunking Strategy</Label>
              <Select 
                value={config.chunkingStrategy} 
                onValueChange={handleChunkingStrategyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select chunking strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed-size chunking</SelectItem>
                  <SelectItem value="default">Default chunking</SelectItem>
                  <SelectItem value="hierarchical">Hierarchical chunking</SelectItem>
                  <SelectItem value="semantic">Semantic chunking</SelectItem>
                  <SelectItem value="none">No chunking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {config.chunkingStrategy === 'fixed' && (
              <div className="space-y-4">
                <div>
                  <Label>Maximum Tokens per Chunk</Label>
                  <Input 
                    type="number" 
                    value={config.maxTokens}
                    onChange={(e) => onConfigChange('maxTokens', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Overlap Percentage</Label>
                  <Slider 
                    value={[config.overlapPercentage]}
                    max={100}
                    step={1}
                    onValueChange={([value]) => onConfigChange('overlapPercentage', value)}
                  />
                </div>
              </div>
            )}

            <div>
              <Label>Data Deletion Policy</Label>
              <RadioGroup 
                value={config.deletionPolicy}
                onValueChange={(value) => onConfigChange('deletionPolicy', value)}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delete" id="delete" />
                    <Label htmlFor="delete">Delete</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retain" id="retain" />
                    <Label htmlFor="retain">Retain</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataSourceConfig;
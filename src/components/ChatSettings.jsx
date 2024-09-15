import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Settings } from 'lucide-react';

const ChatSettings = () => {
  const [llmSettings, setLlmSettings] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="m-2">
          <Settings className="mr-2 h-4 w-4" />
          LLM Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>LLM Configuration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">Model</Label>
            <Select
              value={llmSettings.model}
              onValueChange={(value) => setLlmSettings({ ...llmSettings, model: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="temperature" className="text-right">Temperature</Label>
            <div className="col-span-3">
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={[llmSettings.temperature]}
                onValueChange={([value]) => setLlmSettings({ ...llmSettings, temperature: value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxTokens" className="text-right">Max Tokens</Label>
            <Input
              id="maxTokens"
              type="number"
              value={llmSettings.maxTokens}
              onChange={(e) => setLlmSettings({ ...llmSettings, maxTokens: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSettings;
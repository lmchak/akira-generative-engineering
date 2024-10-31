import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Play, ChevronDown } from 'lucide-react';
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DocumentChatResponse from './DocumentChatResponse';

const DocumentChat = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [dataSource, setDataSource] = useState('computer');
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const fileInputRef = useRef(null);

  const allowedFileTypes = [
    'application/pdf', 
    'text/markdown', 
    'text/plain', 
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/html',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!allowedFileTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Please upload a supported document format.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!allowedFileTypes.includes(droppedFile.type)) {
        toast.error("Invalid file type. Please upload a supported document format.");
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRun = async () => {
    if (!file) {
      toast.error("Please upload a document first");
      return;
    }
    if (!query.trim()) {
      toast.error("Please enter a query");
      return;
    }
    if (!selectedModel) {
      toast.error("Please select a model");
      return;
    }

    try {
      // Simulated API call - replace with actual implementation
      setResponse({
        answer: "This is a simulated response based on the document analysis.",
        sourceChunks: [
          { text: "Source chunk 1...", page: 1 },
          { text: "Source chunk 2...", page: 2 }
        ]
      });
      toast.success("Analysis complete");
    } catch (error) {
      toast.error("Failed to analyze document");
      console.error(error);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResponse(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Data Source</Label>
          <Select value={dataSource} onValueChange={setDataSource}>
            <SelectTrigger>
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="computer">Your Computer</SelectItem>
              <SelectItem value="s3">S3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>System Prompt</Label>
        <Textarea
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Enter a system prompt..."
          className="h-20"
        />
      </div>

      <div
        className="border-2 border-dashed rounded-lg p-6 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <span>{file.name}</span>
            <Button variant="ghost" size="sm" onClick={clearFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2">Drag and drop your document here, or</p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Select document
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.md,.txt,.doc,.docx,.html,.csv,.xls,.xlsx"
            />
          </>
        )}
      </div>

      <Alert>
        <AlertDescription>
          Supported file types: PDF, MD, TXT, DOC, DOCX, HTML, CSV, XLS, XLSX. Maximum file size: 10MB
        </AlertDescription>
      </Alert>

      <div>
        <Label>Query</Label>
        <div className="flex space-x-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write a query..."
          />
          <Button onClick={handleRun}>
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      {response && <DocumentChatResponse response={response} />}
    </div>
  );
};

export default DocumentChat;
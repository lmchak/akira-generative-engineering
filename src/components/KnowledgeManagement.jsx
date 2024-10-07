import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const KnowledgeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [file, setFile] = useState(null);
  const [ingestionStatus, setIngestionStatus] = useState(null);
  const [cleaningStatus, setCleaningStatus] = useState(null);
  const [labelingStatus, setLabelingStatus] = useState(null);
  const [featureEngineeringStatus, setFeatureEngineeringStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await query({ "question": searchQuery });
      setSearchResults(response.text ? [{ result: response.text }] : []);
    } catch (error) {
      console.error('Error searching knowledge repository:', error);
      setSearchResults([{ result: 'An error occurred while searching. Please try again.' }]);
    }
    setIsSearching(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    let formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/vector/upsert/77a1c598-a28e-4a9b-9a26-e4e31ecf3ab6",
        {
          method: "POST",
          body: formData
        }
      );
      const result = await response.json();
      console.log("File upload result:", result);
      return result;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const simulateProcessStep = (setStatus, duration) => {
  const simulateProcessStep = (setStatus, duration) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setStatus({ type: 'info', message: `Processing... ${progress}%`, progress });
        if (progress >= 100) {
          clearInterval(interval);
          setStatus({ type: 'success', message: 'Processing completed successfully!', progress: 100 });
          resolve();
        }
      }, duration / 10);
    });
  };
  };

  const handleDataIngestion = async () => {
  const handleDataIngestion = async () => {
    if (!file) {
      setIngestionStatus({ type: 'error', message: 'Please select a file to ingest.' });
      return;
    }

    setIngestionStatus({ type: 'info', message: 'Starting data ingestion process...', progress: 0 });

    try {
      // File upload
      await uploadFile(file);
      setIngestionStatus({ type: 'success', message: 'File uploaded successfully!', progress: 25 });

      // Simulating the rest of the ingestion process
      await simulateProcessStep(setIngestionStatus, 2000);

      // Data Cleaning
      setCleaningStatus({ type: 'info', message: 'Starting data cleaning...', progress: 0 });
      await simulateProcessStep(setCleaningStatus, 2000);

      // Knowledge Repository (Labeling)
      setLabelingStatus({ type: 'info', message: 'Labeling data...', progress: 0 });
      await simulateProcessStep(setLabelingStatus, 2000);

      // Feature Engineering
      setFeatureEngineeringStatus({ type: 'info', message: 'Performing feature engineering...', progress: 0 });
      await simulateProcessStep(setFeatureEngineeringStatus, 2000);

      setIngestionStatus({ type: 'success', message: 'Data ingestion and processing completed successfully!', progress: 100 });
    } catch (error) {
      console.error('Error during data ingestion:', error);
      setIngestionStatus({ type: 'error', message: 'An error occurred during data ingestion.' });
    }
  };
  };

  const renderStatusAlert = (status) => {
  const renderStatusAlert = (status) => {
    if (!status) return null;
    return (
      <Alert variant={status.type === 'error' ? 'destructive' : 'default'}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{status.type === 'error' ? 'Error' : 'Info'}</AlertTitle>
        <AlertDescription>{status.message}</AlertDescription>
        {status.progress !== undefined && <Progress value={status.progress} className="mt-2" />}
      </Alert>
    );
  };
  };

  async function query(data) {
    const response = await fetch(
      "http://127.0.0.1:3000/api/v1/prediction/77a1c598-a28e-4a9b-9a26-e4e31ecf3ab6",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const result = await response.json();
    return result;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="search">
        <TabsList>
          <TabsTrigger value="search">Knowledge Search</TabsTrigger>
          <TabsTrigger value="ingestion">Data Ingestion</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Repository</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {searchResults.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <p>{result.result}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ingestion">
          <Card>
            <CardHeader>
              <CardTitle>Data Ingestion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select file to ingest</Label>
                <Input id="file-upload" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt,.html" />
              </div>
              <Button onClick={handleDataIngestion} disabled={!file}>
                Start Ingestion
              </Button>
              {renderStatusAlert(ingestionStatus)}
              {renderStatusAlert(cleaningStatus)}
              {renderStatusAlert(labelingStatus)}
              {renderStatusAlert(featureEngineeringStatus)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeManagement;

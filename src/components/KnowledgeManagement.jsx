import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const KnowledgeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [file, setFile] = useState(null);
  const [ingestionStatus, setIngestionStatus] = useState(null);

  // Mock data for demonstration
  const mockProjects = [
    { id: 1, name: 'Data Center A', location: 'New York', coolingSystem: 'Liquid Cooling', efficiency: '95%' },
    { id: 2, name: 'Server Farm B', location: 'Texas', coolingSystem: 'Air Cooling', efficiency: '88%' },
    { id: 3, name: 'Cloud Center C', location: 'California', coolingSystem: 'Hybrid Cooling', efficiency: '92%' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real application, this would query the backend
    const filteredResults = mockProjects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.coolingSystem.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDataIngestion = async () => {
    if (!file) {
      setIngestionStatus({ type: 'error', message: 'Please select a file to ingest.' });
      return;
    }

    // Simulating the ingestion process
    setIngestionStatus({ type: 'info', message: 'Ingestion in progress...' });

    // In a real application, you would send the file to your backend for processing
    setTimeout(() => {
      setIngestionStatus({ type: 'success', message: 'Data ingestion completed successfully!' });
      setFile(null);
    }, 3000);
  };

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
                <Button type="submit">Search</Button>
              </form>
            </CardContent>
          </Card>

          {searchResults.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Cooling System</TableHead>
                      <TableHead>Efficiency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.location}</TableCell>
                        <TableCell>{project.coolingSystem}</TableCell>
                        <TableCell>{project.efficiency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
              {ingestionStatus && (
                <Alert variant={ingestionStatus.type === 'error' ? 'destructive' : 'default'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{ingestionStatus.type === 'error' ? 'Error' : 'Info'}</AlertTitle>
                  <AlertDescription>{ingestionStatus.message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeManagement;
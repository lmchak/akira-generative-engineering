import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapIcon, CalendarIcon, BuildingIcon, CompassIcon } from "lucide-react";

const SiteSelector = () => {
  const [sites, setSites] = useState([
    { id: 1, name: 'Site A', viabilityScore: 8 },
    { id: 2, name: 'Site B', viabilityScore: 6 },
    { id: 3, name: 'Site C', viabilityScore: 9 },
  ]);

  const [selectedSite, setSelectedSite] = useState(null);

  const handleSiteSelection = (site) => {
    setSelectedSite(site);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Site Selector</h1>
      <Tabs defaultValue="siteViability">
        <TabsList className="mb-4">
          <TabsTrigger value="siteViability">Site Viability</TabsTrigger>
          <TabsTrigger value="customMaps">Custom Maps</TabsTrigger>
          <TabsTrigger value="projectMilestones">Project Milestones</TabsTrigger>
          <TabsTrigger value="propertyPages">Property Pages</TabsTrigger>
        </TabsList>
        <TabsContent value="siteViability">
          <Card>
            <CardHeader>
              <CardTitle>Site Viability</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site Name</TableHead>
                    <TableHead>Viability Score</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell>{site.name}</TableCell>
                      <TableCell>{site.viabilityScore}/10</TableCell>
                      <TableCell>
                        <Button onClick={() => handleSiteSelection(site)}>Select</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customMaps">
          <Card>
            <CardHeader>
              <CardTitle>Custom Maps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <MapIcon className="h-5 w-5" />
                <span>Custom map functionality coming soon...</span>
              </div>
              <p>Layer external and DCRE datasets, including flood mapping, flight paths, availability zones, fibre routes, nearby substations, and hazard information.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projectMilestones">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <CalendarIcon className="h-5 w-5" />
                <span>Project milestone tracking coming soon...</span>
              </div>
              <p>Generate an audit trail, mark project milestones, and foster alignment across distributed real estate teams.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="propertyPages">
          <Card>
            <CardHeader>
              <CardTitle>Property Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <BuildingIcon className="h-5 w-5" />
                <span>Property page creation coming soon...</span>
              </div>
              <p>Create individual property pages containing vital details, images, technical information, etc. Develop a private property library for current and future reference.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedSite && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Selected Site: {selectedSite.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Viability Score: {selectedSite.viabilityScore}/10</p>
            <div className="flex items-center space-x-2 mt-4">
              <CompassIcon className="h-5 w-5" />
              <span>Detailed site analysis coming soon...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SiteSelector;
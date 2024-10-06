import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DataCenterTable from './DataCenterTable';
import MarketAnalytics from './MarketAnalytics';
import CompanyAnalytics from './CompanyAnalytics';
import SupplierAnalytics from './SupplierAnalytics';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("market");
  const [selectedRegion, setSelectedRegion] = useState("EMEA");
  const [selectedSegment, setSelectedSegment] = useState("colocation");
  const [showDataCenterTable, setShowDataCenterTable] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGenerateReport = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const toggleDataCenterTable = () => {
    setShowDataCenterTable(!showDataCenterTable);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Center Analytics</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="market">Market Analytics</TabsTrigger>
          <TabsTrigger value="company">Company Analytics</TabsTrigger>
          <TabsTrigger value="supplier">Supplier Analytics</TabsTrigger>
          <TabsTrigger value="datacenters">Data Centers</TabsTrigger>
        </TabsList>
        <TabsContent value="market">
          <div className="flex space-x-4 mb-4">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMEA">EMEA</SelectItem>
                <SelectItem value="APAC">APAC</SelectItem>
                <SelectItem value="Americas">Americas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Select Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="colocation">Colocation</SelectItem>
                <SelectItem value="self-build">Self-build</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </div>
          <MarketAnalytics 
            region={selectedRegion} 
            segment={selectedSegment} 
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>
        <TabsContent value="company">
          <CompanyAnalytics />
        </TabsContent>
        <TabsContent value="supplier">
          <SupplierAnalytics />
        </TabsContent>
        <TabsContent value="datacenters">
          <div className="mb-4">
            <Button onClick={toggleDataCenterTable}>
              {showDataCenterTable ? "Hide Data Center Table" : "Show Data Center Table"}
            </Button>
          </div>
          {showDataCenterTable && <DataCenterTable />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetManagement from '@/components/facility/AssetManagement';
import CapacityManagement from '@/components/facility/CapacityManagement';
import EnergyManagement from '@/components/facility/EnergyManagement';
import SustainabilityManagement from '@/components/facility/sustainability/SustainabilityManagement';
import SustainabilityReports from '@/components/facility/sustainability/SustainabilityReports';

const FacilityManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Data Center Facility Management</h1>
      
      <Routes>
        <Route path="/" element={
          <Tabs defaultValue="assets" className="space-y-4">
            <TabsList>
              <TabsTrigger value="assets">Asset Management</TabsTrigger>
              <TabsTrigger value="capacity">Capacity Management</TabsTrigger>
              <TabsTrigger value="energy">Energy Management</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>

            <TabsContent value="assets">
              <AssetManagement />
            </TabsContent>

            <TabsContent value="capacity">
              <CapacityManagement />
            </TabsContent>

            <TabsContent value="energy">
              <EnergyManagement />
            </TabsContent>

            <TabsContent value="sustainability">
              <SustainabilityManagement />
            </TabsContent>
          </Tabs>
        } />
        <Route path="/sustainability" element={<SustainabilityManagement />} />
        <Route path="/sustainability/reports" element={<SustainabilityReports />} />
      </Routes>
    </div>
  );
};

export default FacilityManagement;
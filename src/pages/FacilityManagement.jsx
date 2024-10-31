import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetManagement from '@/components/facility/AssetManagement';
import CapacityManagement from '@/components/facility/CapacityManagement';
import EnergyManagement from '@/components/facility/EnergyManagement';

const FacilityManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AI Data Center Facility Management</h1>
      
      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assets">Asset Management</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Management</TabsTrigger>
          <TabsTrigger value="energy">Energy Management</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default FacilityManagement;
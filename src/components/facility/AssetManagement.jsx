import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssetList from './asset/AssetList';
import AssetActions from './asset/AssetActions';

const AssetManagement = () => {
  const [assets, setAssets] = useState([
    { id: 1, name: 'Server Rack A1', type: 'Hardware', status: 'Active', location: 'Zone 1' },
    { id: 2, name: 'Network Switch B2', type: 'Network', status: 'Maintenance', location: 'Zone 2' },
  ]);

  const handleScan = () => {
    console.log('Scanning asset...');
  };

  const handleAdd = () => {
    console.log('Adding asset...');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Asset Inventory
          <AssetActions onScan={handleScan} onAdd={handleAdd} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AssetList assets={assets} />
      </CardContent>
    </Card>
  );
};

export default AssetManagement;
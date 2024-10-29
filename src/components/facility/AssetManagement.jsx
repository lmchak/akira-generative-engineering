import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Barcode, Plus } from 'lucide-react';

const AssetManagement = () => {
  const [assets, setAssets] = useState([
    { id: 1, name: 'Server Rack A1', type: 'Hardware', status: 'Active', location: 'Zone 1' },
    { id: 2, name: 'Network Switch B2', type: 'Network', status: 'Maintenance', location: 'Zone 2' },
  ]);

  const handleScan = () => {
    // Implement barcode scanning logic
    console.log('Scanning asset...');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Asset Inventory
          <div className="space-x-2">
            <Button variant="outline" onClick={handleScan}>
              <Barcode className="mr-2 h-4 w-4" />
              Scan Asset
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>{asset.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssetManagement;
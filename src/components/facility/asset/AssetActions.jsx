import React from 'react';
import { Button } from "@/components/ui/button";
import { Barcode, Plus } from 'lucide-react';

const AssetActions = ({ onScan, onAdd }) => {
  return (
    <div className="space-x-2">
      <Button variant="outline" onClick={onScan}>
        <Barcode className="mr-2 h-4 w-4" />
        Scan Asset
      </Button>
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Asset
      </Button>
    </div>
  );
};

export default AssetActions;
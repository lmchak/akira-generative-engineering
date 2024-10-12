import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ITOperationsInputs = ({ inputs, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>IT Operations Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="criticalLoad">Critical Load (kW)</Label>
          <Input
            id="criticalLoad"
            type="number"
            value={inputs.criticalLoad}
            onChange={(e) => onChange('criticalLoad', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rackType">Rack Type</Label>
          <Select value={inputs.rackType} onValueChange={(value) => onChange('rackType', value)}>
            <SelectTrigger id="rackType">
              <SelectValue placeholder="Select Rack Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rack">Rack</SelectItem>
              <SelectItem value="tank">Tank</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacityUtilisation">Capacity Utilisation (%)</Label>
          <Input
            id="capacityUtilisation"
            type="number"
            value={inputs.capacityUtilisation}
            onChange={(e) => onChange('capacityUtilisation', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="greenBrownField">Green/Brown-field</Label>
          <Select value={inputs.greenBrownField} onValueChange={(value) => onChange('greenBrownField', value)}>
            <SelectTrigger id="greenBrownField">
              <SelectValue placeholder="Select Field Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Green">Green</SelectItem>
              <SelectItem value="Brown">Brown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="upsType">UPS Type</Label>
          <Select value={inputs.upsType} onValueChange={(value) => onChange('upsType', value)}>
            <SelectTrigger id="upsType">
              <SelectValue placeholder="Select UPS Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pduCriticalType">PDU-critical Type</Label>
          <Input
            id="pduCriticalType"
            value={inputs.pduCriticalType}
            onChange={(e) => onChange('pduCriticalType', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pduOverheadType">PDU-overhead Type</Label>
          <Select value={inputs.pduOverheadType} onValueChange={(value) => onChange('pduOverheadType', value)}>
            <SelectTrigger id="pduOverheadType">
              <SelectValue placeholder="Select PDU-overhead Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rcduType">rCDU Type</Label>
          <Select value={inputs.rcduType} onValueChange={(value) => onChange('rcduType', value)}>
            <SelectTrigger id="rcduType">
              <SelectValue placeholder="Select rCDU Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="serverType">Server Type</Label>
          <Select value={inputs.serverType} onValueChange={(value) => onChange('serverType', value)}>
            <SelectTrigger id="serverType">
              <SelectValue placeholder="Select Server Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ITOperationsInputs;
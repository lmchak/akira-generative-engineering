import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FacilityOperationsInputs = ({ inputs, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facility Operations Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="redundancyPower"
            checked={inputs.redundancyPower}
            onCheckedChange={(checked) => onChange('redundancyPower', checked)}
          />
          <Label htmlFor="redundancyPower">Redundancy Power</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="genSetType">Gen-set Type</Label>
          <Select value={inputs.genSetType} onValueChange={(value) => onChange('genSetType', value)}>
            <SelectTrigger id="genSetType">
              <SelectValue placeholder="Select Gen-set Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="buildingManagement">Building Management</Label>
          <Select value={inputs.buildingManagement} onValueChange={(value) => onChange('buildingManagement', value)}>
            <SelectTrigger id="buildingManagement">
              <SelectValue placeholder="Select Building Management" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="redundancyCooling"
            checked={inputs.redundancyCooling}
            onCheckedChange={(checked) => onChange('redundancyCooling', checked)}
          />
          <Label htmlFor="redundancyCooling">Redundancy Cooling</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hruAirType">HRU-air Type</Label>
          <Select value={inputs.hruAirType} onValueChange={(value) => onChange('hruAirType', value)}>
            <SelectTrigger id="hruAirType">
              <SelectValue placeholder="Select HRU-air Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CT">CT</SelectItem>
              <SelectItem value="Air">Air</SelectItem>
              <SelectItem value="Ch">Ch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ahuType">AHU Type</Label>
          <Select value={inputs.ahuType} onValueChange={(value) => onChange('ahuType', value)}>
            <SelectTrigger id="ahuType">
              <SelectValue placeholder="Select AHU Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hruLiquidType">HRU-liquid Type</Label>
          <Select value={inputs.hruLiquidType} onValueChange={(value) => onChange('hruLiquidType', value)}>
            <SelectTrigger id="hruLiquidType">
              <SelectValue placeholder="Select HRU-liquid Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Default">Default</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cduType">CDU Type</Label>
          <Select value={inputs.cduType} onValueChange={(value) => onChange('cduType', value)}>
            <SelectTrigger id="cduType">
              <SelectValue placeholder="Select CDU Type" />
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

export default FacilityOperationsInputs;
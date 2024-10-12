import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ConstraintsInputs = ({ inputs, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Constraints Inputs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pue">PUE (Power Usage Effectiveness)</Label>
          <Input
            id="pue"
            type="number"
            value={inputs.pue}
            onChange={(e) => onChange('pue', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="erf">ERF (Energy Reuse Factor)</Label>
          <Input
            id="erf"
            type="number"
            value={inputs.erf}
            onChange={(e) => onChange('erf', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wue">WUE (Water Usage Effectiveness)</Label>
          <Input
            id="wue"
            type="number"
            value={inputs.wue}
            onChange={(e) => onChange('wue', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="floorArea">Floor Area</Label>
          <Input
            id="floorArea"
            type="number"
            value={inputs.floorArea}
            onChange={(e) => onChange('floorArea', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="waterUsage">Water Usage</Label>
          <Input
            id="waterUsage"
            type="number"
            value={inputs.waterUsage}
            onChange={(e) => onChange('waterUsage', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="powerLosses">Power Losses</Label>
          <Input
            id="powerLosses"
            type="number"
            value={inputs.powerLosses}
            onChange={(e) => onChange('powerLosses', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConstraintsInputs;
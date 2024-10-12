import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FacilityOperationsInputs from './FacilityOperationsInputs';
import ITOperationsInputs from './ITOperationsInputs';
import ConstraintsInputs from './ConstraintsInputs';

const ConceptDesignForm = ({ onGenerateDesigns }) => {
  const [designConstraints, setDesignConstraints] = useState({
    facilityOperations: {
      redundancyPower: false,
      genSetType: 'Default',
      buildingManagement: 'Default',
      redundancyCooling: false,
      hruAirType: 'CT',
      ahuType: 'Default',
      hruLiquidType: 'Default',
      cduType: 'Default',
    },
    itOperations: {
      criticalLoad: '',
      rackType: 'rack',
      capacityUtilisation: '',
      greenBrownField: 'Green',
      upsType: 'Default',
      pduCriticalType: '',
      pduOverheadType: 'Default',
      rcduType: 'Default',
      serverType: 'Default',
    },
    constraints: {
      pue: '',
      erf: '',
      wue: '',
      floorArea: '',
      waterUsage: '',
      powerLosses: '',
    },
  });

  const handleInputChange = (category, field, value) => {
    setDesignConstraints(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateDesigns(designConstraints);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FacilityOperationsInputs
        inputs={designConstraints.facilityOperations}
        onChange={(field, value) => handleInputChange('facilityOperations', field, value)}
      />
      <ITOperationsInputs
        inputs={designConstraints.itOperations}
        onChange={(field, value) => handleInputChange('itOperations', field, value)}
      />
      <ConstraintsInputs
        inputs={designConstraints.constraints}
        onChange={(field, value) => handleInputChange('constraints', field, value)}
      />
      <Button type="submit">Generate Designs</Button>
    </form>
  );
};

export default ConceptDesignForm;
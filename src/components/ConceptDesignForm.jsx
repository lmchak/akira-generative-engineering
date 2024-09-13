import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ConceptDesignForm = ({ onGenerateDesigns }) => {
  const [designConstraints, setDesignConstraints] = useState({
    coolingLoad: '',
    aiHardwareRequirements: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignConstraints(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateDesigns(designConstraints);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design Constraints</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="coolingLoad">Cooling Load (kW)</Label>
            <Input
              id="coolingLoad"
              name="coolingLoad"
              type="number"
              value={designConstraints.coolingLoad}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aiHardwareRequirements">AI Hardware Requirements</Label>
            <Input
              id="aiHardwareRequirements"
              name="aiHardwareRequirements"
              type="text"
              value={designConstraints.aiHardwareRequirements}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Generate Designs</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConceptDesignForm;
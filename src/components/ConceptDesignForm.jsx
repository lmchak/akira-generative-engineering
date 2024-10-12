import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseAuth } from '@/integrations/supabase';
import { useProfile } from '@/integrations/supabase/hooks/profiles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

  const [aiResponse, setAiResponse] = useState(null);
  const { session } = useSupabaseAuth();
  const { data: profile } = useProfile(session?.user?.id);

  const handleInputChange = (category, field, value) => {
    setDesignConstraints(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const generateAIResponse = async (prompt) => {
    const data = { question: prompt };
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/prediction/fb77b02d-9e3c-42ed-8d16-cb772cfd8c26",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();
      return result.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, something went wrong. Please try again later.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = `Generate a data center design based on the following parameters:
    
Facility Operations:
- Redundancy Power: ${designConstraints.facilityOperations.redundancyPower}
- Gen-set Type: ${designConstraints.facilityOperations.genSetType}
- Building Management: ${designConstraints.facilityOperations.buildingManagement}
- Redundancy Cooling: ${designConstraints.facilityOperations.redundancyCooling}
- HRU-air Type: ${designConstraints.facilityOperations.hruAirType}
- AHU Type: ${designConstraints.facilityOperations.ahuType}
- HRU-liquid Type: ${designConstraints.facilityOperations.hruLiquidType}
- CDU Type: ${designConstraints.facilityOperations.cduType}

IT Operations:
- Critical Load: ${designConstraints.itOperations.criticalLoad} kW
- Rack Type: ${designConstraints.itOperations.rackType}
- Capacity Utilisation: ${designConstraints.itOperations.capacityUtilisation}%
- Green/Brown-field: ${designConstraints.itOperations.greenBrownField}
- UPS Type: ${designConstraints.itOperations.upsType}
- PDU-critical Type: ${designConstraints.itOperations.pduCriticalType}
- PDU-overhead Type: ${designConstraints.itOperations.pduOverheadType}
- rCDU Type: ${designConstraints.itOperations.rcduType}
- Server Type: ${designConstraints.itOperations.serverType}

Constraints:
- PUE (Power Usage Effectiveness): ${designConstraints.constraints.pue}
- ERF (Energy Reuse Factor): ${designConstraints.constraints.erf}
- WUE (Water Usage Effectiveness): ${designConstraints.constraints.wue}
- Floor Area: ${designConstraints.constraints.floorArea}
- Water Usage: ${designConstraints.constraints.waterUsage}
- Power Losses: ${designConstraints.constraints.powerLosses}

Please provide a detailed data center design that optimizes for energy efficiency, cooling performance, and overall sustainability based on these parameters. Include recommendations for layout, cooling systems, power distribution, and any other relevant aspects of the data center design.`;

    const aiResponseText = await generateAIResponse(prompt);
    setAiResponse(aiResponseText);
    onGenerateDesigns(designConstraints);
  };

  return (
    <div className="space-y-6">
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

      {aiResponse && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-start space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/ai-avatar.png" alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiResponse}</ReactMarkdown>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConceptDesignForm;
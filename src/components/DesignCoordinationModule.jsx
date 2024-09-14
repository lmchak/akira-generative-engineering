import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload, CheckCircle, XCircle } from 'lucide-react';

const DesignCoordinationModule = () => {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [collaborationSuggestion, setCollaborationSuggestion] = useState('');
  const [riskAssessment, setRiskAssessment] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const analyzeDesign = () => {
    // Simulating AI analysis
    setTimeout(() => {
      setAnalysisResult({
        status: 'success',
        message: 'Design document meets project specifications.',
      });
    }, 2000);
  };

  const requestApproval = () => {
    // Simulating approval workflow
    alert('Approval request sent to the project manager.');
  };

  const suggestImprovements = () => {
    // Simulating AI-generated suggestions
    setCollaborationSuggestion('Consider optimizing the cooling system layout for better energy efficiency.');
  };

  const assessRisks = () => {
    // Simulating risk assessment
    setRiskAssessment({
      level: 'medium',
      details: 'Potential delay in equipment delivery may impact timeline.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design Coordination Module</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="design-doc">Upload Design Document</Label>
          <Input id="design-doc" type="file" onChange={handleFileUpload} />
        </div>
        
        <Button onClick={analyzeDesign} disabled={!file}>
          Analyze Design
        </Button>

        {analysisResult && (
          <Alert variant={analysisResult.status === 'success' ? 'default' : 'destructive'}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Analysis Result</AlertTitle>
            <AlertDescription>{analysisResult.message}</AlertDescription>
          </Alert>
        )}

        <Button onClick={requestApproval} disabled={!analysisResult || analysisResult.status !== 'success'}>
          Request Approval
        </Button>

        <div>
          <Button onClick={suggestImprovements}>Suggest Improvements</Button>
          {collaborationSuggestion && (
            <Textarea 
              value={collaborationSuggestion} 
              readOnly 
              className="mt-2"
            />
          )}
        </div>

        <div>
          <Button onClick={assessRisks}>Assess Risks</Button>
          {riskAssessment && (
            <Alert variant={riskAssessment.level === 'high' ? 'destructive' : 'default'} className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Risk Assessment</AlertTitle>
              <AlertDescription>{riskAssessment.details}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DesignCoordinationModule;
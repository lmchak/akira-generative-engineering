import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const DesignAnalysis = ({ file, onAnalysis }) => {
  const [analysisStatus, setAnalysisStatus] = useState('');

  useEffect(() => {
    if (file) {
      analyzeDocument();
    }
  }, [file]);

  const analyzeDocument = () => {
    setAnalysisStatus('Analyzing document...');
    // Simulating AI analysis
    setTimeout(() => {
      const result = {
        status: 'success',
        message: 'Design document aligns with project specifications.',
      };
      setAnalysisStatus('');
      onAnalysis(result);
    }, 3000);
  };

  return (
    <div>
      {analysisStatus && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analysis Status</AlertTitle>
          <AlertDescription>{analysisStatus}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DesignAnalysis;
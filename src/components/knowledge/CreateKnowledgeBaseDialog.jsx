import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Steps } from './Steps';
import IAMRoleSelector from './IAMRoleSelector';
import DataSourceConfig from './DataSourceConfig';

const CreateKnowledgeBaseDialog = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    iamRole: 'auto-create',
    tags: [],
    dataSource: {
      chunkingStrategy: 'default',
      maxTokens: 300,
      overlapPercentage: 20,
      deletionPolicy: 'delete'
    },
    embeddingsModel: 'titan',
    vectorStore: 'quick-create',
    useCustomKMS: false,
    kmsKey: '',
    enableRedundancy: false
  });

  const steps = [
    { id: 1, title: 'Provide knowledge base details' },
    { id: 2, title: 'Set up data source' },
    { id: 3, title: 'Configure vector store' },
    { id: 4, title: 'Review and create' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDataSourceConfigChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      dataSource: {
        ...prev.dataSource,
        [field]: value
      }
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create knowledge base</DialogTitle>
        </DialogHeader>

        <Steps currentStep={currentStep} steps={steps} />

        <div className="py-4">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Knowledge base name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter knowledge base name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (optional)</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter description"
                  />
                </div>
              </div>

              <IAMRoleSelector
                selectedRole={formData.iamRole}
                onRoleChange={(value) => handleInputChange('iamRole', value)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <DataSourceConfig
              config={formData.dataSource}
              onConfigChange={handleDataSourceConfigChange}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Vector Store Configuration</h3>
                <Card>
                  <CardContent className="pt-6">
                    <RadioGroup
                      value={formData.vectorStore}
                      onValueChange={(value) => handleInputChange('vectorStore', value)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="quick-create" id="quick-create" />
                          <Label htmlFor="quick-create">
                            Quick create a new vector store - Recommended
                            <p className="text-sm text-gray-500">
                              We will create an OpenSearch Serverless vector store in your account.
                            </p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="existing" id="existing" />
                          <Label htmlFor="existing">
                            Choose a vector store you have created
                            <p className="text-sm text-gray-500">
                              Select from OpenSearch Serverless, Aurora, Pinecone or Redis Enterprise Cloud
                            </p>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {formData.vectorStore === 'quick-create' && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="redundancy"
                            checked={formData.enableRedundancy}
                            onCheckedChange={(checked) => handleInputChange('enableRedundancy', checked)}
                          />
                          <Label htmlFor="redundancy" className="text-sm">
                            Enable redundancy (active replicas)
                            <p className="text-gray-500">
                              Recommended for production use to ensure high availability
                            </p>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="kms"
                            checked={formData.useCustomKMS}
                            onCheckedChange={(checked) => handleInputChange('useCustomKMS', checked)}
                          />
                          <Label htmlFor="kms" className="text-sm">
                            Add customer-managed KMS key for vector store
                            <p className="text-gray-500">
                              Optional: Use your own KMS key for encryption
                            </p>
                          </Label>
                        </div>

                        {formData.useCustomKMS && (
                          <Input
                            className="mt-2"
                            value={formData.kmsKey}
                            onChange={(e) => handleInputChange('kmsKey', e.target.value)}
                            placeholder="Enter KMS key"
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Configuration</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Description:</strong> {formData.description || 'None'}</p>
                <p><strong>IAM Role:</strong> {formData.iamRole === 'auto-create' ? 'Auto-created' : 'Custom'}</p>
                <p><strong>Chunking Strategy:</strong> {formData.dataSource.chunkingStrategy}</p>
                <p><strong>Vector Store:</strong> {formData.vectorStore === 'quick-create' ? 'New OpenSearch Serverless' : 'Existing Store'}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length ? 'Create' : 'Next'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKnowledgeBaseDialog;
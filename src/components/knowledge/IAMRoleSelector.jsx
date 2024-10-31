import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const IAMRoleSelector = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">IAM Role Configuration</h3>
      <Card>
        <CardContent className="pt-6">
          <RadioGroup value={selectedRole} onValueChange={onRoleChange}>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="auto-create" id="auto-create" />
                <Label htmlFor="auto-create">
                  Let Amazon Bedrock create the service role
                  <p className="text-sm text-gray-500">
                    A new IAM role will be created with necessary permissions
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">
                  Choose a custom role
                  <p className="text-sm text-gray-500">
                    Select an existing IAM role with required permissions
                  </p>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default IAMRoleSelector;
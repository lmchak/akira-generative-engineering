import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DeleteKnowledgeBaseDialog = ({ open, onOpenChange, onConfirm, knowledgeBaseName }) => {
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = () => {
    if (confirmText.toLowerCase() === 'delete') {
      onConfirm();
      onOpenChange(false);
      toast.success('Knowledge base deleted successfully');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Knowledge Base</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>Are you sure you want to delete "{knowledgeBaseName}"? This action cannot be undone.</p>
            
            <div className="space-y-2 bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <h4 className="font-medium text-yellow-800">Warning</h4>
              <ul className="list-disc pl-4 text-sm text-yellow-700 space-y-1">
                <li>All associated data will be permanently deleted</li>
                <li>Vector embeddings will be removed</li>
                <li>Access to this knowledge base will be revoked for all users</li>
                <li>Any integrations using this knowledge base will stop working</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                To confirm deletion, type "delete" in the box below:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type 'delete' to confirm"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={confirmText.toLowerCase() !== 'delete'}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteKnowledgeBaseDialog;
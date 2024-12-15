import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Mail } from 'lucide-react';

const StageChangeDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  candidateName, 
  newStage,
  emailTemplate,
  jobTitle 
}) => {
  const replaceVariables = (text) => {
    if (!text) return '';
    
    return text
      .replace(/\[Candidate Name\]/g, candidateName)
      .replace(/\[Position\]/g, jobTitle)
      .replace(/\[Stage\]/g, newStage)
      .replace(/\[Company\]/g, 'Jumpstart');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Confirm Stage Change
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription className="space-y-4">
          <div className="flex items-center gap-3 bg-[#6FEEC5]/10 rounded-lg p-3 border border-[#6FEEC5]/20">
            <div className="w-8 h-8 rounded-full bg-[#6FEEC5] flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-black">
                {candidateName[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-900">
                Moving {candidateName} to {newStage}
              </p>
              <p className="text-xs text-gray-500">
                This action will trigger an email notification to the candidate
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-medium text-gray-700">Email Preview</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-600">Subject:</p>
                <p className="text-sm text-gray-900">{replaceVariables(emailTemplate?.subject)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Body:</p>
                <div className="text-sm text-gray-900 whitespace-pre-wrap border-t pt-2 mt-1">
                  {replaceVariables(emailTemplate?.body)}
                </div>
              </div>
            </div>
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className="gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-black bg-[#6FEEC5] rounded-lg hover:bg-[#6FEEC5]/90"
          >
            Confirm & Send Email
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StageChangeDialog;
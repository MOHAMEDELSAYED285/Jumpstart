import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Textarea } from '../ui/textarea';

const CustomEmailDialog = ({ isOpen, onClose, onSend, defaultMessage }) => {
  const [emailContent, setEmailContent] = useState(defaultMessage);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Customize Rejection Email</AlertDialogTitle>
          <AlertDialogDescription>
            This candidate has progressed beyond the initial stage. You may want to customize the rejection email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Textarea
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          rows={10}
          placeholder="Enter your custom message here..."
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSend(emailContent)}>Send Email</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomEmailDialog;


import React, { useState } from 'react';
import { X } from 'lucide-react';

const RejectionEmailModal = ({ isOpen, onClose, onSend, candidateName }) => {
  const [emailContent, setEmailContent] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customize Rejection Email</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="mb-4 text-gray-600">
          Customize the rejection email for {candidateName}:
        </p>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded-md mb-4"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          placeholder="Enter your customized rejection email here..."
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSend(emailContent)}
            className="px-4 py-2 bg-[#6FEEC5] text-gray-900 rounded-md hover:bg-[#6FEEC5]/90"
          >
            Send Rejection Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionEmailModal;


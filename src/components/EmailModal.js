import React, { useState } from 'react';
import { X } from 'lucide-react';
import { emailTemplates, formatEmailTemplate } from '../utils/emailTemplates';

const EmailModal = ({ isOpen, onClose, candidate, stage, onSend }) => {
  const [emailData, setEmailData] = useState(() => {
    const template = emailTemplates[stage] || emailTemplates['initial-screening'];
    return formatEmailTemplate(template, {
      candidateName: candidate?.name || '',
      role: candidate?.role || '',
      companyName: 'Your Company',
      schedulingLink: 'https://calendly.com/your-link'
    });
  });

  const handleSend = async (e) => {
    e.preventDefault();
    await onSend(emailData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Send Email</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSend} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="email"
              value={candidate?.email}
              disabled
              className="w-full px-3 py-2 bg-gray-50 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-[#6FEEC5]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={emailData.body}
              onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
              rows={10}
              className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-[#6FEEC5]"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6FEEC5] text-black rounded-md hover:bg-opacity-90"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;


import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Wand2, Loader2 } from 'lucide-react';

const EmailTemplateEditor = ({ stage, template, onUpdate }) => {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    onUpdate({ ...template, subject: e.target.value });
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    onUpdate({ ...template, body: e.target.value });
  };

  const handleGenerateEmail = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      
      const healthCheck = await fetch('/api/health').catch(() => ({ ok: false }));
      
      if (!healthCheck.ok) {
        throw new Error('Server is not running. Please start the server with "npm run server"');
      }

      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stageName: stage.title,
          stageDescription: stage.description || '',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate email');
      }

      const data = await response.json();

      if (data.generatedEmail) {
        setBody(data.generatedEmail);
        onUpdate({ ...template, body: data.generatedEmail });
        alert('Email template generated successfully');
      } else {
        throw new Error('No email content received');
      }
    } catch (error) {
      console.error('Error generating email:', error);
      setError(error.message);
      alert(error.message || 'Failed to generate email template. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mb-6 p-4 border border-[#6FEEC5] rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-black">{stage.title} Email Template</h4>

      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor={`subject-${stage.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <Input
            id={`subject-${stage.id}`}
            value={subject}
            onChange={handleSubjectChange}
            className="w-full"
            placeholder="Enter email subject..."
          />
        </div>
        
        <div>
          <label htmlFor={`body-${stage.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <Textarea
            id={`body-${stage.id}`}
            value={body}
            onChange={handleBodyChange}
            rows={8}
            className="w-full resize-y min-h-[200px]"
            placeholder="Enter email body..."
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTemplateEditor;


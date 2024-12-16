import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';


const EmailTemplateEditor = ({ stage, template, onUpdate }) => {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const [error] = useState(null);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    onUpdate({ ...template, subject: e.target.value });
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    onUpdate({ ...template, body: e.target.value });
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


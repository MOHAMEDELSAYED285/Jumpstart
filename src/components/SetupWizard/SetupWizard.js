import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StageManager from '../StageConfiguration/StageManager';
import EmailTemplateEditor from './EmailTemplateEditor';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';

const REJECTION_TEMPLATE = {
  subject: 'Jumpstart: Update on your application',
  body: `Dear [Candidate Name],

Thank you for taking the time to apply for the [Position] role at Jumpstart and for your interest in joining our team. We appreciate the effort you put into your application.

After careful consideration, we regret to inform you that we have decided to move forward with other candidates whose qualifications more closely match our current needs.

Please know that this decision was not easy, and we were impressed with many aspects of your background and experience. We encourage you to apply for future positions at Jumpstart that align with your skills and experience.

We wish you the best in your job search and future professional endeavors.

Best regards,
The Jumpstart Recruiting Team`
};

const SetupWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [stages, setStages] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState({
    rejection: REJECTION_TEMPLATE
  });

  const handleStagesUpdate = (updatedStages) => {
    setStages(updatedStages);

    const templates = {
      rejection: REJECTION_TEMPLATE
    };
    updatedStages.forEach(stage => {
      templates[stage.id] = templates[stage.id] || {
        subject: `Jumpstart: Update on your application for ${stage.title}`,
        body: `Dear [Candidate Name],

We hope this email finds you well. We wanted to provide you with an update on your application for the [Position] role at Jumpstart.

We're pleased to inform you that your application has progressed to the ${stage.title} stage of our hiring process. This is an important step, and we're excited about the possibility of you joining our team.

If you have any questions or need any additional information, please don't hesitate to reach out to us at recruiting@jumpstart.com.

We look forward to learning more about you and potentially welcoming you to the Jumpstart team!

Best regards,
The Jumpstart Recruiting Team`
      };
    });
    setEmailTemplates(templates);
    setStep(1);
  };

  const handleEmailTemplateUpdate = (stageId, template) => {
    setEmailTemplates(prev => ({
      ...prev,
      [stageId]: template
    }));
  };

  const handleComplete = () => {
    const templatesWithRejection = {
      ...emailTemplates,
      rejection: REJECTION_TEMPLATE
    };
    
    localStorage.setItem('kanbanStages', JSON.stringify(stages));
    localStorage.setItem('emailTemplates', JSON.stringify(templatesWithRejection));
    localStorage.setItem('setupComplete', 'true');
    navigate('/kanban');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">ATS Setup Wizard</h2>
        {step === 0 ? (
          <StageManager
            initialStages={stages}
            onStagesUpdate={handleStagesUpdate}
            onClose={() => navigate('/')}
          />
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">Email Templates</h3>
            
            <div className="mb-8 border-b pb-6">
              <h4 className="text-lg font-medium mb-3 text-black">Standard Rejection Template</h4>
              <EmailTemplateEditor
                key="rejection"
                stage={{ id: 'rejection', title: 'Rejection' }}
                template={emailTemplates.rejection}
                onUpdate={(template) => handleEmailTemplateUpdate('rejection', template)}
              />
            </div>

            <div>
              <h4 className="text-lg font-medium mb-3 text-black">Stage Templates</h4>
              {stages.map(stage => (
                <EmailTemplateEditor
                  key={stage.id}
                  stage={stage}
                  template={emailTemplates[stage.id]}
                  onUpdate={(template) => handleEmailTemplateUpdate(stage.id, template)}
                />
              ))}
            </div>

            <div className="flex justify-between mt-6 space-x-4">
            <Button
          onClick={() => setStep(0)}
          variant="outline"
          className="flex-1 border-2 border-[#6FEEC5] text-[#6FEEC5] hover:bg-[#6FEEC5] hover:text-white transition-colors duration-200"
        >
          Back to Stages
        </Button>
        <Button
          onClick={handleComplete}
          className="flex-1 bg-[#6FEEC5] text-black hover:bg-[#5FD4B0] transition-colors duration-200"
        >
          Complete Setup
        </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupWizard;
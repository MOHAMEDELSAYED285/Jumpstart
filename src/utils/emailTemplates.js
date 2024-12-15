export const emailTemplates = {
    'initial-screening': {
      subject: 'Application Received - {{role}}',
      body: `Dear {{candidateName}},
  
  Thank you for applying to the {{role}} position at {{companyName}}. We have received your application and our team will review it shortly.
  
  We appreciate your interest in joining our team and will be in touch with next steps.
  
  Best regards,
  {{companyName}} Team`
    },
    'first-interview': {
      subject: 'Interview Invitation - {{role}}',
      body: `Dear {{candidateName}},
  
  We're pleased to invite you to interview for the {{role}} position. We were impressed by your application and would like to learn more about your experience.
  
  Please click the link below to schedule your interview:
  {{schedulingLink}}
  
  Best regards,
  {{companyName}} Team`
    },
    'second-interview': {
      subject: 'Second Interview Invitation - {{role}}',
      body: `Dear {{candidateName}},
  
  Thank you for your time during the first interview. We would like to invite you for a second interview for the {{role}} position.
  
  This interview will focus more on technical aspects and will include a practical assessment.
  
  Please choose your preferred time slot:
  {{schedulingLink}}
  
  Best regards,
  {{companyName}} Team`
    },
    'technical-assessment': {
      subject: 'Technical Assessment - {{role}}',
      body: `Dear {{candidateName}},
  
  As part of your application for the {{role}} position, we would like you to complete a technical assessment.
  
  Please find the assessment details and instructions here:
  {{assessmentLink}}
  
  You will have 48 hours to complete this assessment from when you start.
  
  Best regards,
  {{companyName}} Team`
    },
    'offer': {
      subject: 'Offer Letter - {{role}} at {{companyName}}',
      body: `Dear {{candidateName}},
  
  We are delighted to offer you the position of {{role}} at {{companyName}}. 
  
  Please find attached your formal offer letter with all the details of our offer.
  
  We look forward to welcoming you to the team!
  
  Best regards,
  {{companyName}} Team`
    },
    'rejection': {
      subject: 'Update on your application for {{role}}',
      body: `Dear {{candidateName}},
  
  Thank you for your interest in the {{role}} position and for taking the time to go through our interview process.
  
  After careful consideration, we have decided to move forward with other candidates whose qualifications better match our current needs.
  
  We appreciate your interest in {{companyName}} and wish you the best in your job search.
  
  Best regards,
  {{companyName}} Team`
    },
    'on-hold': {
      subject: 'Update on your application for {{role}}',
      body: `Dear {{candidateName}},
  
  Thank you for your patience regarding your application for the {{role}} position at {{companyName}}.
  
  We wanted to inform you that we are currently reviewing our hiring needs and timeline for this position. We will keep your application on file and contact you if we decide to move forward.
  
  We appreciate your continued interest in {{companyName}}.
  
  Best regards,
  {{companyName}} Team`
    }
  };
  
  export const formatEmailTemplate = (template, variables) => {
    let subject = template.subject;
    let body = template.body;
  
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, value);
      body = body.replace(regex, value);
    });
  
    return { subject, body };
  };
  
  
export const exportToCSV = (data, filename) => {
    const headers = [
      'Name',
      'Email',
      'Role',
      'Stage',
      'Current Company',
      'Experience',
      'Education',
      'Skills',
      'Salary Expectations'
    ];
  
    const csvContent = [
      headers.join(','),
      ...data.map(candidate => [
        candidate.name,
        candidate.email,
        candidate.role,
        candidate.stage,
        candidate.currentCompany,
        candidate.experience,
        `${candidate.education.degree} in ${candidate.education.subject} from ${candidate.education.university}`,
        candidate.skills.join('; '),
        `${candidate.salaryExpectations.minimum} - ${candidate.salaryExpectations.ideal}`
      ].join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  
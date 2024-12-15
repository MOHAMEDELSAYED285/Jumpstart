import React, { useState } from 'react';
import { X, Mail, ChevronDown, ChevronRight, Briefcase, Building2, HomeIcon, Phone, FileCheck, Trophy, School, UserCheck, GraduationCap, Globe, DollarSign, Paperclip, LinkIcon, FileText, Video, Linkedin, GitlabIcon as GitHub, Send } from 'lucide-react';
import { candidateData } from '../data';

// Badge component for status pills
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Info item with icon
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-gray-500">
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </div>
    <p className="text-gray-900 font-medium">{value}</p>
  </div>
);

const StageProgress = ({ currentStage, stages }) => {
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);
  const currentStageTitle = stages.find(stage => stage.id === currentStage)?.title || 'Unknown';
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-medium">Current Stage</h3>
        <Badge variant="purple">{currentStageTitle}</Badge>
      </div>
      <p className="text-gray-500 text-sm">
        Candidate's stage will be updated after each review.
      </p>
      <div className="flex items-center gap-2 mt-6">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className={`flex items-center rounded-lg px-4 py-2 ${
              index <= currentIndex 
                ? index === currentIndex 
                  ? 'bg-white shadow-sm border border-gray-200' 
                  : 'text-gray-500'
                : 'text-gray-400'
            }`}>
              <span className="text-sm font-medium">{stage.title}</span>
            </div>
            {index < stages.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium relative ${
      active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {children}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6FEEC5]" />
    )}
  </button>
);

const DetailSection = ({ icon: Icon, title, children }) => (
  <div className="space-y-6 py-8 first:pt-0">
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6 text-gray-500" />
      <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

const AttachmentCard = ({ icon: Icon, title, subtitle, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
  >
    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
      <Icon className="w-5 h-5 text-gray-500" />
    </div>
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    <ChevronRight className="w-4 h-4 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

const LinkButton = ({ icon: Icon, href, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
  >
    <Icon className="w-4 h-4" />
    {text}
  </a>
);

const CandidateDetail = ({ candidate, onClose, stages, onStageChange, onAddNote, onRejectCandidate }) => {
  const [isStageDropdownOpen, setIsStageDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');
  const candidateInfo = candidateData.find(c => 
    c['Candidate'].toLowerCase() === candidate.email.toLowerCase()
  );

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      const newNoteObj = {
        id: Date.now(),
        content: newNote,
        timestamp: new Date().toISOString(),
        author: {
          name: 'Current User', // Replace with actual user name when available
          avatar: 'https://via.placeholder.com/40' // Replace with actual user avatar when available
        }
      };
      onAddNote(candidate.id, newNoteObj);
      setNewNote('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-3xl bg-white h-full flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
              {candidate.photo ? (
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-medium">
                  {candidate.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
              <p className="text-sm text-gray-500">{candidate.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#6FEEC5] rounded-lg hover:bg-[#6FEEC5]/90"
                onClick={() => setIsStageDropdownOpen(!isStageDropdownOpen)}
              >
                Move to
                <ChevronDown className="w-4 h-4" />
              </button>
              {isStageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                  {stages.map((stage) => (
                    <button
                      key={stage.id}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        onStageChange(candidate.id, stage.id);
                        setIsStageDropdownOpen(false);
                      }}
                    >
                      {stage.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => onRejectCandidate(candidate.id)}
            >
              Reject
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-8">
            <InfoItem
              icon={Trophy}
              label="Top Achievement"
              value={candidateInfo?.['Top achievement (from Candidate)'] || 'Not specified'}
            />
            <InfoItem
              icon={DollarSign}
              label="Salary Expectations"
              value={
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Min: {candidateInfo['Minimum salary (from Candidate)']}</span>
                  <span className="text-sm text-gray-600">Ideal: {candidateInfo['Ideal salary (from Candidate)']}</span>
                </div>
              }
            />
            <InfoItem
              icon={School}
              label="University"
              value={candidateInfo?.['Undergrad university (from Candidate)'] || 'Not specified'}
            />
            <InfoItem
              icon={UserCheck}
              label="Right to Work"
              value={candidateInfo?.['Right to Work'] || 'Not verified'}
            />
          </div>
        </div>

        {/* Stage Progress */}
        <div className="px-6 py-6 border-b border-gray-200">
          <StageProgress currentStage={candidate.stage} stages={stages} />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 bg-white">
          <TabButton active={activeTab === 'details'} onClick={() => setActiveTab('details')}>
            Details
          </TabButton>
          <TabButton active={activeTab === 'notes'} onClick={() => setActiveTab('notes')}>
            Notes
          </TabButton>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {activeTab === 'details' && candidateInfo && (
              <div className="space-y-0">
                <DetailSection icon={Briefcase} title="Work Experience">
                  <div className="space-y-0">
                    {['1', '2', '3'].map((index) => {
                      const role = candidateInfo[`(${index}) Work Experience Role (from Candidate)`];
                      if (!role) return null;
                      return (
                        <div key={index} className="relative pl-6 pb-8 last:pb-0">
                          <div className="absolute left-0 top-2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-gray-300" />
                          <div className="absolute left-0 top-3 bottom-0 w-px bg-gray-200" />
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-3">
                                  <h4 className="text-xl font-semibold text-gray-900">{role}</h4>
                                  <Badge variant="purple">Good</Badge>
                                </div>
                                <p className="text-gray-600 mt-1">{candidateInfo[`(${index}) Work Experience Company (from Candidate)`]}</p>
                                <p className="text-gray-500 text-sm mt-1">{candidateInfo[`(${index}) Time spent in work experience (from Candidate)`]}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed mt-2">
                              {candidateInfo[`(${index}) Work Experience Description (from Candidate)`]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </DetailSection>

                <DetailSection icon={GraduationCap} title="Education">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {candidateInfo['Undergrad degree type (from Candidate)']} in {candidateInfo['Undergrad subject (from Candidate)']}
                        </h4>
                        <p className="text-gray-600">{candidateInfo['Undergrad university (from Candidate)']}</p>
                      </div>
                      <Badge variant="green">{candidateInfo['Undergrad graduation year (from Candidate)']}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium text-gray-900">Result:</span>
                      <span className="text-gray-700">{candidateInfo['Undergrad result (from Candidate)']}</span>
                    </div>
                  </div>
                </DetailSection>

                <DetailSection icon={Globe} title="Skills & Languages">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidateInfo['Generalist roles suitable for copy (from Candidate)'].split(',').map((skill, index) => (
                          <Badge key={index} variant="purple">{skill.trim()}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidateInfo['Languages (from Candidate)'].split(',').map((language, index) => (
                          <Badge key={index}>{language.trim()}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DetailSection>

                <DetailSection icon={FileText} title="Application Details">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Preferred Working Style</h4>
                      <p className="text-gray-700">{candidateInfo['Preferred working style copy (from Candidate)']}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Application Rationale</h4>
                      <p className="text-gray-700">{candidateInfo['Application Rationale']}</p>
                    </div>
                  </div>
                </DetailSection>

                <DetailSection icon={Paperclip} title="Attachments">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <AttachmentCard
                      icon={FileText}
                      title="Resume.pdf"
                      subtitle="View CV"
                      href={candidateInfo['CV RAW (from Candidate)']}
                    />
                    {candidateInfo['Raw video intro (from Candidate)'] && (
                      <AttachmentCard
                        icon={Video}
                        title="Introduction Video"
                        subtitle="View video"
                        href={candidateInfo['Raw video intro (from Candidate)']}
                      />
                    )}
                  </div>
                </DetailSection>

                <DetailSection icon={LinkIcon} title="Links">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {candidateInfo['LinkedIn RAW (from Candidate)'] && (
                      <LinkButton 
                        icon={Linkedin} 
                        href={candidateInfo['LinkedIn RAW (from Candidate)']} 
                        text="LinkedIn Profile" 
                      />
                    )}
                    {candidateInfo['Github RAW (from Candidate)'] && 
                     candidateInfo['Github RAW (from Candidate)'] !== 'N/A' && (
                      <LinkButton 
                        icon={GitHub} 
                        href={candidateInfo['Github RAW (from Candidate)']} 
                        text="GitHub Profile" 
                      />
                    )}
                  </div>
                </DetailSection>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                {candidate.notes?.map((note, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src={note.author.avatar} 
                        alt={note.author.name} 
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-900">{note.author.name}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(note.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <form onSubmit={handleAddNote} className="bg-white rounded-xl border border-gray-200 p-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6FEEC5] focus:border-transparent min-h-[80px]"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 bg-[#6FEEC5] rounded-lg hover:bg-[#6FEEC5]/90 transition-colors"
                    >
                      Add note
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;


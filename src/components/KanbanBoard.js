import React, { useState, useCallback, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import Column from './Column';
import CandidateCard from './CandidateCard';
import CandidateDetail from './CandidateDetail';
import RoleHeader from './RoleHeader';
import Notification from './Notification';
import RejectionEmailModal from './RejectionEmailModal';
import StageChangeDialog from './StageChangeDialog';
import { candidateData } from '../data';

// The heart of our ATS - manages the entire recruitment pipeline view
const KanbanBoard = () => {
  const navigate = useNavigate();
  
  // Track everything we need about our candidates and their stages
  const [activeId, setActiveId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [stages, setStages] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [notification, setNotification] = useState(null);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [candidateToReject, setCandidateToReject] = useState(null);
  const [stageChangeConfirmation, setStageChangeConfirmation] = useState(null);

  // Load up saved stages and set up our initial candidate list
  useEffect(() => {
    const savedStages = JSON.parse(localStorage.getItem('kanbanStages') || '[]');
    const savedEmailTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '{}');
    setStages(savedStages);
    setEmailTemplates(savedEmailTemplates);
    
    // Transform our raw candidate data into something more useful
    const initialCandidates = candidateData.map((candidate, index) => ({
      id: `candidate-${index}`,
      email: candidate['Candidate'],
      name: candidate['Candidate'].split('@')[0],
      stage: savedStages[0]?.id || 'application-review',
      candidateData: candidate,
      notes: [],
    }));
    setCandidates(initialCandidates);
  }, []);

  // Prevent accidental drags with a small distance threshold
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  }));

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  // When a candidate is dropped into a new stage, show confirmation
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (!over) return;

    const activeCandidate = candidates.find(c => c.id === active.id);
    const overStage = over.id;
    const newStage = stages.find(s => s.id === overStage);

    if (activeCandidate && activeCandidate.stage !== overStage) {
      setStageChangeConfirmation({
        candidateId: activeCandidate.id,
        candidateName: activeCandidate.name,
        newStageId: overStage,
        newStageName: newStage.title,
        candidateEmail: activeCandidate.email
      });
    }

    setActiveId(null);
  }, [candidates, stages]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  // Handle stage changes from buttons/menus (not just drag and drop)
  const handleMoveToStage = useCallback((candidateId, newStageId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    const newStage = stages.find(s => s.id === newStageId);
    
    if (candidate && newStage) {
      setStageChangeConfirmation({
        candidateId,
        candidateName: candidate.name,
        newStageId,
        newStageName: newStage.title,
        candidateEmail: candidate.email
      });
    }
  }, [candidates, stages]);

  // Actually move the candidate and send any stage-change emails
  const confirmStageChange = useCallback(() => {
    const { candidateId, newStageId, candidateEmail } = stageChangeConfirmation;
    
    setCandidates(prevCandidates => {
      const updatedCandidates = prevCandidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, stage: newStageId }
          : candidate
      );
      
      const template = emailTemplates[newStageId];
      if (template) {
        setNotification(`Email sent to ${candidateEmail}`);
      }

      return updatedCandidates;
    });

    setStageChangeConfirmation(null);
  }, [stageChangeConfirmation, emailTemplates]);

  // Keep track of any notes added for candidates
  const handleAddNote = (candidateId, newNote) => {
    setCandidates(prevCandidates => 
      prevCandidates.map(candidate => 
        candidate.id === candidateId 
          ? {
              ...candidate,
              notes: [...(candidate.notes || []), newNote]
            }
          : candidate
      )
    );
  };

  // Handle the rejection flow - show confirmation for later stages
  const handleRejectCandidate = useCallback((candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate && stages.findIndex(stage => stage.id === candidate.stage) > 0) {
      setCandidateToReject(candidate);
      setRejectionModalOpen(true);
    } else {
      removeCandidateFromBoard(candidateId);
    }
  }, [candidates, stages]);

  const removeCandidateFromBoard = (candidateId) => {
    setCandidates(prevCandidates => prevCandidates.filter(candidate => candidate.id !== candidateId));
    setNotification("Candidate has been rejected and removed from the board.");
  };

  const handleSendRejectionEmail = (emailContent) => {
    console.log(`Sending rejection email to ${candidateToReject.email}:`, emailContent);
    removeCandidateFromBoard(candidateToReject.id);
    setRejectionModalOpen(false);
    setCandidateToReject(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="px-8 py-6 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">In process</h1>
      </div>

      <RoleHeader 
        role={{
          title: "Software Engineer (front-end focused)",
          location: "London • Hybrid",
          publishedDate: "Published 1 week ago",
          totalApplicants: candidates.length
        }}
        onBackClick={() => navigate('/')}
        onEditStages={() => navigate('/setup')}
      />
      
      <div className="flex-1 overflow-hidden">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="h-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 h-full">
              {stages.map((stage) => (
                <Column
                  key={stage.id}
                  stage={stage}
                  candidates={candidates.filter(c => c.stage === stage.id)}
                  onCandidateClick={setSelectedCandidate}
                  stages={stages}
                  onMoveToStage={handleMoveToStage}
                  onRejectCandidate={handleRejectCandidate}
                />
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeId ? (
              <CandidateCard
                candidate={candidates.find(c => c.id === activeId)}
                isDragging
                stages={stages}
                onMoveToStage={handleMoveToStage}
                onRejectCandidate={handleRejectCandidate}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {selectedCandidate && (
  <CandidateDetail
    candidate={selectedCandidate}
    onAddNote={handleAddNote}
    onClose={() => setSelectedCandidate(null)}
    stages={stages}
    onStageChange={(candidateId, newStage) => {
      handleMoveToStage(candidateId, newStage);
    }}
    onRejectCandidate={handleRejectCandidate}
  />
)}

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <RejectionEmailModal
        isOpen={rejectionModalOpen}
        onClose={() => {
          setRejectionModalOpen(false);
          setCandidateToReject(null);
        }}
        onSend={handleSendRejectionEmail}
        candidateName={candidateToReject?.name}
      />

      {stageChangeConfirmation && (
        <StageChangeDialog
          isOpen={!!stageChangeConfirmation}
          onClose={() => setStageChangeConfirmation(null)}
          onConfirm={confirmStageChange}
          candidateName={stageChangeConfirmation.candidateName}
          newStage={stageChangeConfirmation.newStageName}
          emailTemplate={emailTemplates[stageChangeConfirmation.newStageId]}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
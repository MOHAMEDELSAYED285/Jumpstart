import React, { useState, useCallback, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import Column from './Column';
import CandidateCard from './CandidateCard';
import CandidateDetail from './CandidateDetail';
import RoleHeader from './RoleHeader';
import Notification from './Notification';
import RejectionEmailModal from './RejectionEmailModal';
import { candidateData } from '../data';

const KanbanBoard = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [stages, setStages] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [notification, setNotification] = useState(null);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [candidateToReject, setCandidateToReject] = useState(null);

  useEffect(() => {
    const savedStages = JSON.parse(localStorage.getItem('kanbanStages') || '[]');
    const savedEmailTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '{}');
    setStages(savedStages);
    setEmailTemplates(savedEmailTemplates);
    
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

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  }));

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (!over) return;

    const activeCandidate = candidates.find(c => c.id === active.id);
    const overStage = over.id;

    if (activeCandidate && activeCandidate.stage !== overStage) {
      setCandidates(prevCandidates => {
        const updatedCandidates = prevCandidates.map(candidate =>
          candidate.id === activeCandidate.id
            ? { ...candidate, stage: overStage }
            : candidate
        );
        
        const template = emailTemplates[overStage];
        if (template) {
          setNotification(`Email sent to ${activeCandidate.email}`);
        }

        return updatedCandidates;
      });
    }

    setActiveId(null);
  }, [candidates, emailTemplates]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleMoveToStage = useCallback((candidateId, newStageId) => {
    setCandidates(prevCandidates => {
      const updatedCandidates = prevCandidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, stage: newStageId }
          : candidate
      );
      
      const movedCandidate = updatedCandidates.find(c => c.id === candidateId);
      if (movedCandidate) {
        const template = emailTemplates[newStageId];
        if (template) {
          setNotification(`Email sent to ${movedCandidate.email}`);
        }
      }

      return updatedCandidates;
    });
  }, [emailTemplates]);

  const handleAddNote = useCallback((candidateId, newNote) => {
    setCandidates(prevCandidates =>
      prevCandidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, notes: [...(candidate.notes || []), newNote] }
          : candidate
      )
    );
  }, []);

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
    // Here you would typically send the email using your backend API
    console.log(`Sending rejection email to ${candidateToReject.email}:`, emailContent);
    removeCandidateFromBoard(candidateToReject.id);
    setRejectionModalOpen(false);
    setCandidateToReject(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
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
            <div className="grid auto-cols-fr grid-flow-col gap-4 h-full max-w-[1800px] mx-auto">
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
          onClose={() => setSelectedCandidate(null)}
          stages={stages}
          onStageChange={(candidateId, newStage) => {
            setCandidates(prevCandidates =>
              prevCandidates.map(candidate =>
                candidate.id === candidateId
                  ? { ...candidate, stage: newStage }
                  : candidate
              )
            );
          }}
          onAddNote={handleAddNote}
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
    </div>
  );
};

export default KanbanBoard;


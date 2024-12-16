import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import CandidateCard from './CandidateCard';

const Column = ({ stage, candidates, onCandidateClick, stages, onMoveToStage, onRejectCandidate }) => {
  const { setNodeRef } = useDroppable({
    id: stage.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-white rounded-lg shadow-sm h-[calc(100vh-240px)]"
    >
      <div 
        className="px-3 py-2 border-b border-gray-200 flex items-center justify-between"
        style={{ backgroundColor: `${stage.color}10` }}
      >
        <div>
          <h2 className="font-medium text-gray-900 truncate">{stage.title}</h2>
          <span className="text-xs text-gray-500">{candidates.length} candidates</span>
        </div>
      </div>
      <div className="p-2 space-y-2 overflow-y-auto flex-1 min-h-0">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onClick={() => onCandidateClick(candidate)}
            stages={stages}
            onMoveToStage={onMoveToStage}
            onRejectCandidate={onRejectCandidate}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;


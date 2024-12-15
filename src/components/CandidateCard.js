import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Briefcase, GraduationCap, DollarSign, MoreHorizontal } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

const CandidateCard = ({ candidate, onClick, isDragging, stages, onMoveToStage, onRejectCandidate }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: candidate.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const candidateInfo = candidate.candidateData;

  const dropdownOptions = [
    ...stages
      .filter(stage => stage.id !== candidate.stage)
      .map((stage) => ({
        label: stage.title,
        onClick: () => onMoveToStage(candidate.id, stage.id),
      })),
    {
      label: 'Reject',
      onClick: () => onRejectCandidate(candidate.id),
      className: 'text-red-600 hover:bg-red-50',
    },
  ];

  const handleCardClick = (e) => {
    // Only trigger onClick if the click is not on the dropdown or its children
    if (!e.target.closest('.dropdown-menu')) {
      onClick?.(candidate);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleCardClick}
      className={`
        bg-white rounded-lg border border-gray-200 p-3
        hover:border-[#6FEEC5] transition-all duration-200 cursor-pointer
        ${isDragging ? 'shadow-lg' : 'shadow-sm'}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#6FEEC5] flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-black">
              {candidate.name[0].toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {candidateInfo['Candidate Full Name']}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {candidateInfo['(1) Time spent in work experience (from Candidate)']}
            </p>
          </div>
        </div>
        <div className="dropdown-menu">
          <DropdownMenu
            trigger={
              <button 
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            }
            options={dropdownOptions}
            className="w-40"
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <GraduationCap className="w-3.5 h-3.5 text-[#6FEEC5] flex-shrink-0" />
          <span className="truncate text-gray-600">
            {candidateInfo['Undergrad university (from Candidate)']}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Briefcase className="w-3.5 h-3.5 text-[#6FEEC5] flex-shrink-0" />
          <span className="truncate text-gray-600">
            {candidateInfo['(1) Work Experience Role (from Candidate)']} @ {candidateInfo['(1) Work Experience Company (from Candidate)']}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <DollarSign className="w-3.5 h-3.5 text-[#6FEEC5] flex-shrink-0" />
          <span className="truncate text-gray-600">
            {candidateInfo['Minimum salary (from Candidate)']} - {candidateInfo['Ideal salary (from Candidate)']}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CandidateCard);


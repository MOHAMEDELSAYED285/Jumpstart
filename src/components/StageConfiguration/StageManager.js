import React, { useState, useEffect } from 'react';
import { Plus, ChevronUp, ChevronDown, Edit2, Trash2, X } from 'lucide-react';
import NewStageModal from './NewStageModal';
import { Button } from "../../ui/button";

const StageManager = ({ initialStages, onStagesUpdate, onClose }) => {
  const [availableStages, setAvailableStages] = useState([]);
  const [activeStages, setActiveStages] = useState(initialStages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState(null);

  useEffect(() => {
    
    const savedActiveStages = localStorage.getItem('activeStages');
    if (savedActiveStages) {
      setActiveStages(JSON.parse(savedActiveStages));
    } else {

      const defaultActiveStages = [
        { id: 'application-review', title: 'Application Review', color: '#6FEEC5' },
        { id: 'phone-screening', title: 'Phone Screening', color: '#4A90E2' },
        { id: 'first-interview', title: 'First Interview', color: '#F5A623' },
        { id: 'second-interview', title: 'Second Interview', color: '#7ED321' },
        { id: 'offer', title: 'Offer', color: '#50E3C2' },
      ];
      setActiveStages(defaultActiveStages);
      localStorage.setItem('activeStages', JSON.stringify(defaultActiveStages));
    }

    
    const savedAvailableStages = localStorage.getItem('availableStages');
    if (savedAvailableStages) {
      setAvailableStages(JSON.parse(savedAvailableStages));
    } else {
    
      const defaultAvailableStages = [
        { id: 'assessment', title: 'Assessment', color: '#9013FE' },
        { id: 'reference-check', title: 'Reference Check', color: '#417505' },
        { id: 'final-interview', title: 'Final Interview', color: '#BD10E0' },
        { id: 'rejected', title: 'Rejected', color: '#D0021B' },
      ];
      setAvailableStages(defaultAvailableStages);
      localStorage.setItem('availableStages', JSON.stringify(defaultAvailableStages));
    }
  }, []);

  const handleDeleteStage = (stageId, isActive) => {
    if (isActive) {
      const stageToMove = activeStages.find(stage => stage.id === stageId);
      const newActiveStages = activeStages.filter(stage => stage.id !== stageId);
      const newAvailableStages = [...availableStages, stageToMove];
      
      setActiveStages(newActiveStages);
      setAvailableStages(newAvailableStages);
      localStorage.setItem('availableStages', JSON.stringify(newAvailableStages));
    } else {
      const newAvailableStages = availableStages.filter(stage => stage.id !== stageId);
      setAvailableStages(newAvailableStages);
      localStorage.setItem('availableStages', JSON.stringify(newAvailableStages));
    }
  };

  const handleAddStage = (newStage) => {
    const newAvailableStages = [...availableStages, newStage];
    setAvailableStages(newAvailableStages);
    localStorage.setItem('availableStages', JSON.stringify(newAvailableStages));
    setIsModalOpen(false);
  };

  const handleEditStage = (stage, isActive) => {
    setEditingStage({
      ...stage,
      isActive,
    });
    setIsModalOpen(true);
  };

  const handleUpdateStage = (updatedStage) => {
    if (editingStage.isActive) {
      const newActiveStages = activeStages.map(stage => 
        stage.id === updatedStage.id ? updatedStage : stage
      );
      setActiveStages(newActiveStages);
    } else {
      const newAvailableStages = availableStages.map(stage => 
        stage.id === updatedStage.id ? updatedStage : stage
      );
      setAvailableStages(newAvailableStages);
      localStorage.setItem('availableStages', JSON.stringify(newAvailableStages));
    }
    setIsModalOpen(false);
    setEditingStage(null);
  };

  const handleMoveStage = (index, direction) => {
    const newActiveStages = [...activeStages];
    const [movedStage] = newActiveStages.splice(index, 1);
    newActiveStages.splice(index + direction, 0, movedStage);
    setActiveStages(newActiveStages);
  };

  const handleAddToWorkflow = (stage) => {
    const newActiveStages = [...activeStages, stage];
    const newAvailableStages = availableStages.filter(s => s.id !== stage.id);
    setActiveStages(newActiveStages);
    setAvailableStages(newAvailableStages);
    localStorage.setItem('availableStages', JSON.stringify(newAvailableStages));
  };

  const handleRemoveFromWorkflow = (stage) => {
    const newAvailableStages = [...availableStages, stage];
    const newActiveStages = activeStages.filter(s => s.id !== stage.id);
    setAvailableStages(newAvailableStages);
    setActiveStages(newActiveStages);
    localStorage.setItem('availableStages', JSON.stringify(newAvailableStages));
  };

  const handleApply = () => {
    onStagesUpdate(activeStages);
    localStorage.setItem('activeStages', JSON.stringify(activeStages));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Configure Hiring Stages</h2>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-[#6FEEC5] text-black rounded-md hover:bg-opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Stage
          </Button>
          <Button
            onClick={() => onClose(activeStages)}
            variant="ghost"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Active Workflow</h3>
          <div className="space-y-2 p-4 rounded-lg bg-gray-50">
            {activeStages.map((stage, index) => (
              <ActiveStageItem
                key={stage.id}
                stage={stage}
                index={index}
                onDelete={() => handleRemoveFromWorkflow(stage)}
                onEdit={() => handleEditStage(stage, true)}
                onMoveUp={() => handleMoveStage(index, -1)}
                onMoveDown={() => handleMoveStage(index, 1)}
                isFirst={index === 0}
                isLast={index === activeStages.length - 1}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Available Stages</h3>
          <div className="flex flex-wrap gap-2 p-4 rounded-lg min-h-[100px] bg-gray-50">
            {availableStages.map((stage) => (
              <StageItem
                key={stage.id}
                stage={stage}
                onDelete={() => handleDeleteStage(stage.id, false)}
                onEdit={() => handleEditStage(stage, false)}
                onAdd={() => handleAddToWorkflow(stage)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleApply}
          className="px-4 py-2 bg-[#6FEEC5] text-black rounded-md hover:bg-opacity-90"
        >
          Save and Continue
        </Button>
      </div>

      {isModalOpen && (
        <NewStageModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingStage(null);
          }}
          onSubmit={editingStage ? handleUpdateStage : handleAddStage}
          initialData={editingStage}
        />
      )}
    </div>
  );
};

const StageItem = ({ stage, onDelete, onEdit, onAdd }) => (
  <div
    className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border"
    style={{ borderLeft: `4px solid ${stage.color}` }}
  >
    <span className="font-medium">{stage.title}</span>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onEdit} aria-label={`Edit ${stage.title}`}>
        <Edit2 className="w-4 h-4 text-gray-500" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onDelete} aria-label={`Delete ${stage.title}`}>
        <Trash2 className="w-4 h-4 text-gray-500" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onAdd} aria-label={`Add ${stage.title} to workflow`}>
        <Plus className="w-4 h-4 text-gray-500" />
      </Button>
    </div>
  </div>
);

const ActiveStageItem = ({ stage, index, onDelete, onEdit, onMoveUp, onMoveDown, isFirst, isLast }) => (
  <div
    className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border shadow-sm"
    style={{ borderLeft: `4px solid ${stage.color}` }}
  >
    <span className="font-medium">{stage.title}</span>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onEdit} aria-label={`Edit ${stage.title}`}>
        <Edit2 className="w-4 h-4 text-gray-500" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onDelete} aria-label={`Remove ${stage.title} from workflow`}>
        <Trash2 className="w-4 h-4 text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMoveUp}
        disabled={isFirst}
        aria-label={`Move ${stage.title} up`}
        className={isFirst ? 'opacity-50 cursor-not-allowed' : ''}
      >
        <ChevronUp className="w-4 h-4 text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMoveDown}
        disabled={isLast}
        aria-label={`Move ${stage.title} down`}
        className={isLast ? 'opacity-50 cursor-not-allowed' : ''}
      >
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </Button>
    </div>
  </div>
);

export default StageManager;


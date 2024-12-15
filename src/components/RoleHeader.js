import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';

const RoleHeader = ({ role, onBackClick, onEditStages }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-4 py-4">
        <button
          onClick={onBackClick}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to roles
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{role.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">{role.location}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{role.publishedDate}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {role.totalApplicants} applicants
            </span>
            <button
              onClick={onEditStages}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Edit Stages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleHeader;


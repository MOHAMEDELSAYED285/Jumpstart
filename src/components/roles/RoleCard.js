import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoleCard({ role }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{role.title}</h3>
            <p className="text-sm text-gray-500">{role.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/kanban`}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Completion</span>
            <span className="font-medium">{role.completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#6FEEC5] h-2 rounded-full"
              style={{ width: `${role.completion}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <p className="text-sm font-medium">{role.candidates}</p>
            <p className="text-xs text-gray-500">Candidates</p>
          </div>
          <div>
            <p className="text-sm font-medium">{role.daysActive}</p>
            <p className="text-xs text-gray-500">Days active</p>
          </div>
          <div>
            <p className="text-sm font-medium">{role.stages.interview}</p>
            <p className="text-xs text-gray-500">In interview</p>
          </div>
        </div>

        {/* Stage Distribution */}
        <div className="flex gap-1 h-1">
          <div 
            className="bg-blue-400" 
            style={{ width: `${(role.stages.screening / role.candidates) * 100}%` }}
          />
          <div 
            className="bg-purple-400" 
            style={{ width: `${(role.stages.interview / role.candidates) * 100}%` }}
          />
          <div 
            className="bg-green-400" 
            style={{ width: `${(role.stages.offer / role.candidates) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}


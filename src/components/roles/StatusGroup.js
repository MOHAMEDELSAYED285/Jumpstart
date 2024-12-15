import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import RoleCard from './RoleCard';

export default function StatusGroup({ title, description, roles }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (roles.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isExpanded ? 'transform rotate-180' : ''
            }`}
          />
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      )}
    </div>
  );
}


import React from 'react';

export default function MetricsCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
          {trend && (
            <p className="text-sm text-gray-500 mt-1">{trend}</p>
          )}
        </div>
        <div className="p-2 bg-[#6FEEC5] bg-opacity-20 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}


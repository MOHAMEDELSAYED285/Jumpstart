import React, { useState, useEffect } from 'react';
import { X, Bold, Italic, Link, List, AlignLeft } from 'lucide-react';

const NewStageModal = ({ onClose, onSubmit, initialData }) => {
  const [stageData, setStageData] = useState({
    name: '',
    color: '#6FEEC5',
    interviewTemplate: '',
    isExternal: false,
    externalName: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setStageData({
        name: initialData.title || '',
        color: initialData.color || '#6FEEC5',
        interviewTemplate: initialData.interviewTemplate || '',
        isExternal: initialData.isExternal || false,
        externalName: initialData.externalName || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      id: initialData ? initialData.id : `stage-${Date.now()}`,
      title: stageData.name,
      color: stageData.color,
      interviewTemplate: stageData.interviewTemplate,
      isExternal: stageData.isExternal,
      externalName: stageData.externalName,
      description: stageData.description
    };
    onSubmit(submissionData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Stage' : 'New Stage'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NAME
            </label>
            <input
              type="text"
              placeholder="E.g. Review"
              className="w-full px-3 py-2 border rounded-md"
              value={stageData.name}
              onChange={(e) => setStageData({ ...stageData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              COLOR
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={stageData.color}
                onChange={(e) => setStageData({ ...stageData, color: e.target.value })}
                className="w-10 h-10 p-1 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={stageData.color}
                onChange={(e) => setStageData({ ...stageData, color: e.target.value })}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                pattern="^#[0-9A-Fa-f]{6}$"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              INTERVIEW TEMPLATE
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={stageData.interviewTemplate}
              onChange={(e) => setStageData({ ...stageData, interviewTemplate: e.target.value })}
            >
              <option value="">Select interview template</option>
              <option value="technical">Technical Interview</option>
              <option value="behavioral">Behavioral Interview</option>
              <option value="cultural">Cultural Fit Interview</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={stageData.isExternal}
                onChange={(e) => setStageData({ ...stageData, isExternal: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                Show this stage of the hiring process to applicants when they apply
              </span>
            </label>
          </div>

          {stageData.isExternal && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  EXTERNAL NAME
                </label>
                <input
                  type="text"
                  placeholder="E.g. Internal review process"
                  className="w-full px-3 py-2 border rounded-md"
                  value={stageData.externalName}
                  onChange={(e) => setStageData({ ...stageData, externalName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  STAGE DESCRIPTION
                </label>
                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <Bold className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <Italic className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <Link className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <List className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-100 rounded">
                      <AlignLeft className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    placeholder="E.g. Once we've reviewed your application, a member of our team will review it. If you are a potential match, we'll schedule a call to learn more about your skills and experience."
                    className="w-full p-3 min-h-[100px] resize-none focus:outline-none"
                    value={stageData.description}
                    onChange={(e) => setStageData({ ...stageData, description: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6FEEC5] text-black rounded-md hover:bg-opacity-90"
            >
              {initialData ? 'Save Changes' : 'Create Stage'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStageModal;


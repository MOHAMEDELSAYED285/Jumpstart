import React, { useState } from 'react';
import { Star, FileText, User, Briefcase, X } from 'lucide-react';

const RatingComponent = ({ rating, details }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-[#6FEEC5] fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderDetailIcon = (type) => {
    switch (type) {
      case 'cv':
        return <FileText className="h-5 w-5 text-[#6FEEC5]" />;
      case 'interview':
        return <User className="h-5 w-5 text-[#6FEEC5]" />;
      case 'experience':
        return <Briefcase className="h-5 w-5 text-[#6FEEC5]" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-1 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderStars(rating)}
      </div>
      {isHovered && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-white rounded-md shadow-lg z-10 border border-[#6FEEC5]">
          <div className="flex space-x-2">
            {details.map((detail, index) => (
              <div
                key={index}
                className="cursor-pointer p-1 hover:bg-[#6FEEC5] hover:bg-opacity-10 rounded"
                onClick={() => setActiveDetail(detail)}
              >
                {renderDetailIcon(detail.type)}
              </div>
            ))}
          </div>
        </div>
      )}
      {activeDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setActiveDetail(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-black">{activeDetail.title}</h3>
            <div className="flex items-center mb-4">
              <div className="mr-2">{renderDetailIcon(activeDetail.type)}</div>
              <div className="font-medium text-black">Score: {activeDetail.score}/5</div>
            </div>
            <p className="text-gray-600 mb-4">{activeDetail.description}</p>
            <div className="bg-[#6FEEC5] bg-opacity-10 p-4 rounded mb-4">
              <h4 className="font-medium mb-2 text-black">Highlights:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-800">
                {activeDetail.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-black">Insights:</h4>
              <p className="text-gray-600">{activeDetail.insights}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingComponent;


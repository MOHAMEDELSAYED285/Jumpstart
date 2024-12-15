import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const DropdownMenu = ({ trigger, options, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={`absolute right-0 mt-2 py-2 bg-white rounded-md shadow-lg z-10 ${className}`}>
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${option.className || ''}`}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
            >
              {option.label}
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;


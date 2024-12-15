import React, { useState, useEffect, useRef } from 'react';

const AlertDialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open);
  const dialogRef = useRef(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onOpenChange]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => { setIsOpen(false); onOpenChange(false); }} />
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto z-50">
        {children}
      </div>
    </div>
  );
};

const AlertDialogContent = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

const AlertDialogHeader = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

const AlertDialogFooter = ({ children }) => {
  return <div className="flex justify-end space-x-2 mt-4">{children}</div>;
};

const AlertDialogTitle = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

const AlertDialogDescription = ({ children }) => {
  return <p className="text-sm text-gray-500">{children}</p>;
};

const AlertDialogAction = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const AlertDialogCancel = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

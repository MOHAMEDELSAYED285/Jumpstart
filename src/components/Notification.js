import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Notification = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md flex items-center">
      <span>{message}</span>
      <button onClick={() => setIsVisible(false)} className="ml-2 focus:outline-none">
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;


import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-[#6FEEC5] bg-opacity-95',
          icon: <CheckCircle className="w-5 h-5 text-black" />
        };
      case 'error':
        return {
          bgColor: 'bg-red-500 bg-opacity-95',
          icon: <XCircle className="w-5 h-5 text-white" />
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-500 bg-opacity-95',
          icon: <AlertCircle className="w-5 h-5 text-black" />
        };
      default:
        return {
          bgColor: 'bg-gray-800 bg-opacity-95',
          icon: <AlertCircle className="w-5 h-5 text-white" />
        };
    }
  };

  const { bgColor, icon } = getToastStyles();

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slide-up">
      <div className={`${bgColor} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
        {icon}
        <span className={`flex-1 text-sm ${type === 'success' ? 'text-black' : 'text-white'}`}>
          {message}
        </span>
        <button 
          onClick={onClose}
          className={`p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors`}
        >
          <X className={`w-4 h-4 ${type === 'success' ? 'text-black' : 'text-white'}`} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
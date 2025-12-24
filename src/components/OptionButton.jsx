import React from 'react';

const OptionButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-500 hover:shadow-md hover:bg-blue-50 transition-all duration-200 group"
    >
      <span className="font-medium text-gray-700 group-hover:text-blue-700">
        {label}
      </span>
    </button>
  );
};

export default OptionButton;
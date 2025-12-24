import React from 'react';
import OptionButton from './OptionButton';

const DecisionCard = ({ questionData, onAnswer }) => {
  if (!questionData) return <div className="text-red-500">Error: Missing Node</div>;

  return (
    <div className="w-full max-w-lg animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
        {questionData.question}
      </h2>
      <div className="flex flex-col gap-3">
        {questionData.options.map((option, idx) => (
          <OptionButton
            key={idx}
            label={option.label}
            onClick={() => onAnswer(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default DecisionCard;
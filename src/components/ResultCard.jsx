import React from 'react';
import CodeBlock from './CodeBlock';
import { hooksData } from '../data/hooksData';

const ResultCard = ({ hookKey, onRestart }) => {
  const data = hooksData[hookKey];

  if (!data) return <div className="text-center">Hook data not found.</div>;

  return (
    <div className="w-full max-w-2xl animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
          Recommended Hook
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 mt-2 mb-2 font-mono">
          {data.title}
        </h1>
        <p className="text-xl text-gray-500 font-light">{data.tagline}</p>
      </div>

      {/* Mental Model */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
        <h3 className="font-bold text-blue-900 mb-2">Mental Model</h3>
        <p className="text-blue-800 leading-relaxed">{data.mentalModel}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Use When */}
        <div>
          <h3 className="flex items-center text-green-700 font-bold mb-3">
            <span className="bg-green-100 p-1 rounded mr-2">✅</span> Use When
          </h3>
          <ul className="space-y-2">
            {data.useWhen.map((item, i) => (
              <li key={i} className="text-gray-700 text-sm flex items-start">
                <span className="mr-2">•</span>{item}
              </li>
            ))}
          </ul>
        </div>

        {/* Avoid When */}
        <div>
          <h3 className="flex items-center text-red-700 font-bold mb-3">
            <span className="bg-red-100 p-1 rounded mr-2">⚠️</span> Avoid When
          </h3>
          <ul className="space-y-2">
            {data.avoidWhen.map((item, i) => (
              <li key={i} className="text-gray-700 text-sm flex items-start">
                <span className="mr-2">•</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CodeBlock code={data.code} />

      <div className="mt-10 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-transform hover:scale-105"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
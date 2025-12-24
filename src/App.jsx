import React, { useReducer } from 'react';
import { decisionReducer, initialState, ACTIONS } from './reducer/decisionReducer';
import { decisionTree } from './data/decisionTree';
import DecisionCard from './components/DecisionCard';
import ResultCard from './components/ResultCard';

function App() {
  const [state, dispatch] = useReducer(decisionReducer, initialState);

  const handleStart = () => {
    dispatch({ type: ACTIONS.START });
  };

  const handleAnswer = (option) => {
    dispatch({
      type: ACTIONS.ANSWER,
      payload: {
        nextNodeId: option.next,
        resultHook: option.result
      }
    });
  };

  const handleRestart = () => {
    dispatch({ type: ACTIONS.RESET });
  };

  const handleGoBack = () => {
    dispatch({ type: ACTIONS.GO_BACK });
  };

  // UI Calculations
  const currentNode = decisionTree[state.currentNodeId];
  const stepCount = state.history.length + 1;
  // Progress is estimated based on the depth of the tree
  const progressPercentage = Math.min((state.history.length / 4) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-gray-900">
      
      {/* Navbar / Brand */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight text-gray-900 flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
          Friendly
        </div>
        {state.status === 'ACTIVE' && (
          <div className="text-xs font-mono text-gray-400">
            Step {stepCount}
          </div>
        )}
      </div>

      <main className="w-full max-w-4xl flex flex-col items-center justify-center">
        
        {/* State: IDLE (Home) */}
        {state.status === 'IDLE' && (
          <div className="text-center max-w-xl animate-fade-in">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6">
              Stop guessing. <br/>
              <span className="text-blue-600">Start reasoning.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              An interactive decision guide to finding the correct React hook based on mental models, not memorization.
            </p>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Start Decision Guide
            </button>
          </div>
        )}

        {/* State: ACTIVE (Decision Tree) */}
        {state.status === 'ACTIVE' && (
          <div className="w-full max-w-lg animate-fade-in-up">
            
            {/* New: Progress & Navigation Header */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <button 
                  onClick={handleGoBack}
                  className={`text-sm font-medium transition-colors ${state.history.length > 0 ? 'text-blue-600 hover:text-blue-800' : 'text-gray-300 cursor-not-allowed'}`}
                  disabled={state.history.length === 0}
                >
                  ← Back
                </button>
                <span className="text-xs font-mono text-gray-400">Question {stepCount}</span>
              </div>
              
              {/* Visual Progress Bar */}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <DecisionCard 
              questionData={currentNode} 
              onAnswer={handleAnswer} 
            />
          </div>
        )}

        {/* State: COMPLETED (Result) */}
        {state.status === 'COMPLETED' && (
          <div className="flex flex-col items-center">
             {/* Allow users to go back even from the result page */}
            <button 
              onClick={handleGoBack}
              className="mb-8 text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors self-start"
            >
              ← Change previous answer
            </button>
            <ResultCard 
              hookKey={state.result} 
              onRestart={handleRestart} 
            />
          </div>
        )}

      </main>

      <footer className="w-full py-8 mt-auto flex flex-col items-center justify-center border-t border-gray-200/60 bg-white/50 backdrop-blur-sm">
  <div className="flex items-center gap-4 mb-2">
    
    <a 
      href="https://github.com/mayowa-dev" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
    >
      GitHub
    </a>
    <span className="text-gray-300">|</span>
    <a 
      href="https://www.linkedin.com/in/abdulwahab-mayowa-5a433118a/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
    >
      LinkedIn
    </a>
  </div>

  <p className="text-[11px] text-gray-400 font-mono tracking-widest uppercase">
    Handcrafted by <span className="text-gray-900 font-bold">Abdulwahab Mayowa</span>
  </p>
  
  <p className="mt-1 text-[10px] text-gray-300">
    Built with React & Tailwind • 2025
  </p>
</footer>
    </div>
  );
}

export default App;
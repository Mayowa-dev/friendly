import React, { useReducer } from 'react';
import { decisionReducer, initialState, ACTIONS } from './reducer/decisionReducer';
import { decisionTree } from './data/decisionTree';
import DecisionCard from './components/DecisionCard';
import ResultCard from './components/ResultCard';

function App() {
  const [state, dispatch] = useReducer(decisionReducer, initialState);

  const handleStart = () => dispatch({ type: ACTIONS.START });
  const handleAnswer = (option) => {
    dispatch({
      type: ACTIONS.ANSWER,
      payload: { nextNodeId: option.next, resultHook: option.result }
    });
  };
  const handleRestart = () => dispatch({ type: ACTIONS.RESET });
  const handleGoBack = () => dispatch({ type: ACTIONS.GO_BACK });

  const currentNode = decisionTree[state.currentNodeId];
  const stepCount = state.history.length + 1;
  const progressPercentage = Math.min((state.history.length / 4) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 font-sans text-gray-900">
      
      {/* Navbar - Changed from absolute to relative for better mobile flow */}
      <header className="w-full max-w-4xl py-4 sm:py-6 flex justify-between items-center mb-8">
        <div className="font-bold text-lg sm:text-xl tracking-tight text-gray-900 flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span>
          Friendly
        </div>
        {state.status === 'ACTIVE' && (
          <div className="text-[10px] sm:text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
            STEP {stepCount}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-full sm:max-w-xl flex-1 flex flex-col items-center justify-center">
        
        {/* State: IDLE (Home) */}
        {state.status === 'IDLE' && (
          <div className="text-center px-2 animate-fade-in">
            {/* Reduced text size for mobile (text-4xl) and kept 5xl for desktop */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Stop guessing. <br/>
              <span className="text-blue-600">Start reasoning.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed max-w-md mx-auto">
              An interactive decision guide to finding the correct React hook based on mental models, not memorization.
            </p>
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl sm:rounded-full shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              Start Decision Guide
            </button>
          </div>
        )}

        {/* State: ACTIVE (Decision Tree) */}
        {state.status === 'ACTIVE' && (
          <div className="w-full px-2 animate-fade-in-up">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={handleGoBack}
                  className={`text-sm font-bold flex items-center gap-1 transition-colors ${state.history.length > 0 ? 'text-blue-600' : 'text-gray-300'}`}
                  disabled={state.history.length === 0}
                >
                  <span className="text-lg">←</span> Back
                </button>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
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
          <div className="w-full px-2 animate-fade-in">
            <button 
              onClick={handleGoBack}
              className="mb-6 text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
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

      {/* Footer - Optimized for mobile tap targets */}
      <footer className="w-full max-w-4xl py-10 mt-12 border-t border-gray-100 flex flex-col items-center">
        <div className="flex items-center gap-6 mb-4">
          <a href="https://github.com/mayowa-dev" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-500 hover:text-blue-600">GITHUB</a>
          <span className="text-gray-200">/</span>
          <a href="https://www.linkedin.com/in/abdulwahab-mayowa-5a433118a/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-gray-500 hover:text-blue-600">LINKEDIN</a>
        </div>
        <p className="text-[10px] text-gray-400 font-mono tracking-[0.2em] uppercase mb-1">Handcrafted by</p>
        <p className="text-sm font-bold text-gray-900">Abdulwahab Mayowa</p>
        <p className="mt-2 text-[10px] text-gray-300">© 2025 • Built with React & Tailwind</p>
      </footer>
    </div>
  );
}

export default App;
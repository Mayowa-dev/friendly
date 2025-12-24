export const initialState = {
  status: 'IDLE',
  currentNodeId: 'root',
  history: [],
  result: null
};

export const ACTIONS = {
  START: 'START',
  ANSWER: 'ANSWER',
  RESET: 'RESET',
  GO_BACK: 'GO_BACK' // 1. Added this
};

export function decisionReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START:
      return { ...initialState, status: 'ACTIVE' };

    case ACTIONS.ANSWER:
      if (action.payload.resultHook) {
        return { 
          ...state, 
          status: 'COMPLETED', 
          result: action.payload.resultHook 
        };
      }
      return {
        ...state,
        currentNodeId: action.payload.nextNodeId,
        history: [...state.history, state.currentNodeId]
      };

    case ACTIONS.GO_BACK: // 2. Added this logic
      if (state.history.length === 0) return state;
      
      const newHistory = [...state.history];
      const previousNodeId = newHistory.pop(); // Remove the last node from history
      
      return {
        ...state,
        status: 'ACTIVE', // Return to active if they go back from the result screen
        currentNodeId: previousNodeId,
        history: newHistory,
        result: null
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}
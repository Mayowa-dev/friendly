export const initialState = {
  status: 'IDLE', // IDLE, ACTIVE, COMPLETED
  currentNodeId: 'root',
  history: [], // For "Question X of Y" or backtracking
  result: null
};

export const ACTIONS = {
  START: 'START',
  ANSWER: 'ANSWER',
  RESET: 'RESET'
};

export function decisionReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START:
      return {
        ...initialState,
        status: 'ACTIVE'
      };

    case ACTIONS.ANSWER: {
      const { nextNodeId, resultHook } = action.payload;

      if (resultHook) {
        return {
          ...state,
          status: 'COMPLETED',
          result: resultHook,
          history: [...state.history, state.currentNodeId]
        };
      }

      return {
        ...state,
        currentNodeId: nextNodeId,
        history: [...state.history, state.currentNodeId]
      };
    }

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}
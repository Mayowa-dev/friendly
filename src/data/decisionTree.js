export const decisionTree = {
  root: {
    question: "What is the primary goal of the code you are writing?",
    options: [
      { label: "Storing or Managing Data", next: "data_nature" },
      { label: "Running Side Effects (API, DOM)", next: "effects_nature" },
      { label: "Performance Optimization", next: "perf_nature" },
      { label: "Sharing Data Globally", result: "useContext" }
    ]
  },
  data_nature: {
    question: "Does changing this data need to trigger a re-render of the UI?",
    options: [
      { label: "Yes, the UI must update", next: "state_complexity" },
      { label: "No, it's hidden data", result: "useRef" }
    ]
  },
  state_complexity: {
    question: "How complex is the state logic?",
    options: [
      { label: "Simple (strings, booleans, single independent values)", result: "useState" },
      { label: "Complex (objects, multiple sub-values, state machines)", result: "useReducer" }
    ]
  },
  effects_nature: {
    question: "What kind of effect are you running?",
    options: [
      { label: "Syncing with external systems (API, subscriptions, document title)", result: "useEffect" },
      { label: "Directly manipulating a DOM node imperatively", result: "useRef" }
    ]
  },
  perf_nature: {
    question: "What are you trying to cache?",
    options: [
      { label: "A calculated value (result of a function)", result: "useMemo" },
      { label: "A function definition itself", result: "useCallback" }
    ]
  }
};
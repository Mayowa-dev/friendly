export const hooksData = {
  useState: {
    title: "useState",
    tagline: "The Memory of Components",
    mentalModel: "Think of it as a personal notebook for a component. It writes something down to remember it for the next render.",
    useWhen: [
      "You need to store data that changes over time.",
      "The UI needs to update when this data changes.",
      "The data is specific to this specific component instance."
    ],
    avoidWhen: [
      "The data can be calculated automatically from existing props.",
      "You are storing complex state that depends on previous states (consider useReducer).",
      "The data does not affect the UI (consider useRef)."
    ],
    code: `const [count, setCount] = useState(0);

// Update triggers re-render
<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`
  },
  useEffect: {
    title: "useEffect",
    tagline: "Synchronization Engine",
    mentalModel: "This is not a lifecycle hook. It is a way to synchronize your component with an external system (API, DOM, Timer).",
    useWhen: [
      "You need to fetch data from an API.",
      "You need to subscribe to events.",
      "You need to manually change the DOM (document.title)."
    ],
    avoidWhen: [
      "You are just calculating data for the render (do it directly in the body).",
      "You are handling user events (handle clicks in event handlers, not effects)."
    ],
    code: `useEffect(() => {
  const sub = source.subscribe();
  
  // Cleanup is crucial
  return () => sub.unsubscribe();
}, [source]); // dependency array`
  },
  useContext: {
    title: "useContext",
    tagline: "The Teleporter",
    mentalModel: "Teleports data from a parent component down to any child, bypassing the components in between.",
    useWhen: [
      "Data is considered 'global' for a tree (Theme, User Auth).",
      "Prop drilling becomes unmanageable (3+ levels deep)."
    ],
    avoidWhen: [
      "You just want to pass props 1-2 levels down.",
      "You use it to avoid composition (passing components as children)."
    ],
    code: `const theme = useContext(ThemeContext);

return <div style={{ color: theme.color }} />`
  },
  useReducer: {
    title: "useReducer",
    tagline: "The State Machine",
    mentalModel: "Instead of telling React *what* to do (setState), you tell it *what happened* (dispatch), and a reducer logic decides the outcome.",
    useWhen: [
      "State logic is complex or involves multiple sub-values.",
      "The next state depends heavily on the previous state.",
      "You want to separate business logic from the component view."
    ],
    avoidWhen: [
      "The state is a simple primitive (boolean, string).",
      "You are just toggling a single value."
    ],
    code: `const [state, dispatch] = useReducer(reducer, { count: 0 });

// Dispatch an 'action'
<button onClick={() => dispatch({ type: 'increment' })}>+1</button>`
  },
  useRef: {
    title: "useRef",
    tagline: "The Escape Hatch",
    mentalModel: "A box that you can put things in. Changing the contents of the box does NOT tell React to re-render.",
    useWhen: [
      "You need to access a DOM element directly.",
      "You need to store a value (like a timer ID) that doesn't affect the visual output."
    ],
    avoidWhen: [
      "You are trying to store data that should trigger a UI update."
    ],
    code: `const inputRef = useRef(null);

// Access DOM directly
const focusInput = () => {
  inputRef.current.focus();
};`
  },
  useMemo: {
    title: "useMemo",
    tagline: "The Memoizer (Cache)",
    mentalModel: "Don't redo expensive homework if the inputs haven't changed. Cache the result.",
    useWhen: [
      "You have a heavy calculation (filtering huge arrays).",
      "You need to keep a referential equality for a dependency array."
    ],
    avoidWhen: [
      "The calculation is cheap (basic math, string concatenation).",
      "You are optimizing prematurely."
    ],
    code: `const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);`
  },
  useCallback: {
    title: "useCallback",
    tagline: "The Function Freezer",
    mentalModel: "Ensures a function maintains the same identity (memory address) between renders unless dependencies change.",
    useWhen: [
      "You pass a function to a child component wrapped in React.memo.",
      "The function is used in a useEffect dependency array."
    ],
    avoidWhen: [
      "You just want to clean up code (it actually has a performance cost)."
    ],
    code: `const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`
  }
};
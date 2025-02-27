// store.ts
type Listener = () => void;

function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners: Listener[] = [];

  const getState = () => state;

  const setState = (newState: Partial<T>) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  };

  return { getState, setState, subscribe };
}
const widthStore = createStore({ innerWidth:window.innerWidth, count: 1 });

// window.addEventListener('resize', e=>widthStore.setState({innerWidth: window.innerWidth}))

export default widthStore;

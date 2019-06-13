import { useRef, useState } from 'react';

/**
 * @callback Thunk
 * @param {Dispatch} dispatch
 * @param {Function} getState
 * @returns {void|*}
 */

/**
 * @callback Dispatch
 * @param {Object|Thunk} action
 * @returns {void|*}
 */

/**
 * Augments React's useReducer() hook so that the action
 * dispatcher supports thunks.
 *
 * @param {Function} reducer
 * @param {*} initialArg
 * @param {Function} [init]
 * @returns {[*, Dispatch]}
 */
function useThunkReducer(reducer, initialArg, init = (a) => a) {
  const [hookState, setHookState] = useState(init(initialArg));

  // State management.
  const state = useRef(hookState);
  const getState = () => state.current;
  const setState = (newState) => {
    state.current = newState;
    setHookState(newState);
  };

  // Reducer and augmented dispatcher.
  const reduce = (action) => reducer(getState(), action);
  const dispatch = (action) => (
    typeof action === 'function'
      ? action(dispatch, getState)
      : setState(reduce(action))
  );

  return [hookState, dispatch];
}

export default useThunkReducer;

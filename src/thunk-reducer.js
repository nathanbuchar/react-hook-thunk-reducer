import { useCallback, useRef, useState } from 'react';

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
  const setState = useCallback(
    (newState) => {
      state.current = newState;
      setHookState(newState);
    },
    [setHookState]
  );

  // Reducer and augmented dispatcher.
  const reduce = useCallback(
    (action) => reducer(getState(), action),
    [reducer, getState]
  );
  const dispatch = useCallback(
    (action) => (
      typeof action === 'function'
        ? action(dispatch, getState)
        : setState(reduce(action))
    ),
    [dispatch, getState, setState, reduce]
  );

  return [hookState, dispatch];
}

export default useThunkReducer;

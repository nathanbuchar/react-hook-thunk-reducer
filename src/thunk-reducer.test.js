/* eslint-env jest */

import { renderHook, cleanup, act } from 'react-hooks-testing-library';

import useThunkReducer from './thunk-reducer';

function init(initialCount) {
  return {
    count: initialCount,
  };
}

function reducer(state, { type }) {
  switch (type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      throw new Error();
  }
}

function increment() {
  return {
    type: 'increment',
  };
}

describe('thunk reducer hook tests', () => {
  afterEach(cleanup);

  test('returns state and dispatcher', () => {
    const { result } = renderHook(() => useThunkReducer(reducer, { count: 0 }));

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toEqual({ count: 0 });
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  test('initializes state lazily', () => {
    const { result } = renderHook(() => useThunkReducer(reducer, 0, init));

    expect(result.current[0]).toEqual({ count: 0 });
  });

  test('dispatches an action', () => {
    const { result } = renderHook(() => useThunkReducer(reducer, 0, init));
    const [, dispatch] = result.current;

    expect(result.current[0].count).toEqual(0);
    act(() => dispatch(increment()));
    expect(result.current[0].count).toEqual(1);
  });

  test('dispatches a thunk', (done) => {
    function incrementAsync() {
      return (dispatch, getState) => {
        expect(getState().count).toEqual(0);

        setTimeout(() => {
          expect(getState().count).toEqual(1);
          act(() => dispatch(increment()));
          expect(getState().count).toEqual(2);
          done();
        }, 100);
      };
    }

    const { result } = renderHook(() => useThunkReducer(reducer, 0, init));
    const [, dispatch] = result.current;

    act(() => dispatch(incrementAsync()));
    act(() => dispatch(increment()));
  });

  test('dispatches nested thunks', () => {
    function incrementAsyncInner() {
      return (dispatch) => {
        act(() => dispatch(increment()));
      };
    }

    function incrementAsyncOuter() {
      return (dispatch) => {
        act(() => dispatch(incrementAsyncInner()));
      };
    }

    const { result } = renderHook(() => useThunkReducer(reducer, 0, init));
    const [, dispatch] = result.current;

    act(() => dispatch(incrementAsyncOuter()));
    expect(result.current[0].count).toEqual(1);
  });

  test('dispatch returns value of inner function', () => {
    function incrementAndReturnCount() {
      return (dispatch, getState) => {
        act(() => dispatch(increment()));
        return getState().count;
      };
    }

    const { result } = renderHook(() => useThunkReducer(reducer, 0, init));
    const [, dispatch] = result.current;

    act(() => {
      expect(dispatch(incrementAndReturnCount())).toEqual(1);
    });
  });
});

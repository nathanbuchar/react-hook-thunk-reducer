import { Reducer } from 'react';

export interface ThunkDispatch<S, A> {
  <
    Action extends (dispatch: ThunkDispatch<S, A>, getState: () => S) => unknown
  >(
    action: Action
  ): ReturnType<Action>;
  (value: A): void;
}

export default function useThunkReducer<S, A>(
  reducer: Reducer<S, A>,
  initialArg: S,
  init?: (s: S) => S
): [S, ThunkDispatch<S, A>];

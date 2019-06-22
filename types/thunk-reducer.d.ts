import { Dispatch, Reducer, useRef, useState } from 'react'

export interface Thunk<S, A> {
  (dispatch: Dispatch<A | Thunk<S, A>>, getState: () => S): void
}

export default function useThunkReducer<S, A>(reducer: Reducer<S, A>, initialArg: S, init?: (s: S) => S): [S, Dispatch<A | Thunk<S, A>>]

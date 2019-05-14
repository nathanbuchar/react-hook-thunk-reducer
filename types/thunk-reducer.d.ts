import { Dispatch, Reducer, useCallback, useRef, useState } from "react"

export interface Thunk<S, A> {
    (dispatch: Dispatch<A | Thunk<S, A>>, getState: () => S): void
}

export function useThunkReducer<S, A>(reducer: Reducer<S, A>, initialArg: S): [S, Dispatch<A | Thunk<S, A>>]
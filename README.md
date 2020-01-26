# react-hook-thunk-reducer

> Akin to [redux-thunk](https://www.npmjs.com/package/redux-thunk), `useThunkReducer()` augments React's [`useReducer()`](https://reactjs.org/docs/hooks-reference.html#usereducer) hook so that the action dispatcher supports [thunks](https://en.wikipedia.org/wiki/Thunk). Now, you can write action creators that return a function rather than an action!
>
> Requires React v16.8 and above.

[![Npm version](https://img.shields.io/npm/v/react-hook-thunk-reducer.svg)](https://npmjs.org/package/react-hook-thunk-reducer)
[![Travis](https://img.shields.io/travis/nathanbuchar/react-hook-thunk-reducer/master.svg)](https://travis-ci.org/nathanbuchar/react-hook-thunk-reducer?branch=master)
[![David](https://img.shields.io/david/nathanbuchar/react-hook-thunk-reducer.svg)](https://david-dm.org/nathanbuchar/react-hook-thunk-reducer)

<br/>

## Install

```bash
npm install react-hook-thunk-reducer
```

Then just import it and use it like you would `React.useReducer()`.

```js
import { useThunkReducer } from 'react-hook-thunk-reducer';

function Component({ initialState }) {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  // ...
}
```

## Usage

Create your actions just like you would in Redux. Similar to [redux-thunk](https://www.npmjs.com/package/redux-thunk), if an action returns a function, it's treated as a [thunk](https://en.wikipedia.org/wiki/Thunk) and has access to the current state.

```js
function increment() {
  return {
    type: 'increment'
  };
}

function incrementIfOdd() {
  return (dispatch, getState) => {
    const { count } = getState();

    if (count % 2 !== 0) {
      dispatch(increment());
    }
  };
}
```

Create your functional component and call the `useThunkReducer()` hook as if it were `React.useReducer()`;

```js
import { useThunkReducer } from 'react-hook-thunk-reducer';

// ...

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      throw new Error();
  }
}

function Counter({ initialState }) {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  // ...

  return (
    <>
      Count: {state.count}
      <button onClick={onButtonPress}>+</button>
    </>
  );
}
```

Dispatch your actions using the augmented `dispatch` function.

```js
const onButtonPress = () => {
  dispatch(incrementIfOdd());
};
```

The value of the inner function will be returned when dispatching thunks.

```js
function incrementAndReturnCount() {
  return (dispatch, getState) => {
    dispatch(increment());

    return getState().count;
  };
}

const newCount = dispatch(incrementAndReturnCount());
```

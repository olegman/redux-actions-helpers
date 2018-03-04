# Redux Actions Helpers
[![Build Status](https://img.shields.io/travis/olegman/redux-actions-helpers/master.svg?style=flat-square)](https://travis-ci.org/olegman/redux-actions-helpers)
[![Latest Stable Version](https://img.shields.io/npm/v/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![Dependency Status](https://img.shields.io/david/olegman/redux-actions-helpers.svg?style=flat-square)](https://david-dm.org/olegman/redux-actions-helpers)
[![License](https://img.shields.io/npm/l/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dt/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)

Redux actions helpers helps you create redux actions with less code and avoid common mistakes. Jump to [QuickStart Guide](https://github.com/olegman/redux-actions-helpers#quickstart-guide) to see it in action.

- **Simple:** it's only helpers for creating and handle actions from [official redux documentation](http://redux.js.org/docs/basics/Actions.html) nothing more, I don't try to invent some new way of creating and handle actions and that's why it easy to integrate in existing project and it can work nice with other tools and libs.
- **Small:** it's really very small, without any extra dependencies and won't bloat your bundle size.
- **Productive:** the main goal of this lib to keep you more productive, you will write much less code and do more, also you have to do much less job when you do some refactorings and it provide some very helpful errors and warnings to avoid common mistakes and save your time on debugging.

## Installation

```bash
npm install --save redux-actions-helpers
```

## QuickStart Guide
Let's create an action first, in good old days it can look like this:
```javascript
export const ACTION_WITHOUT_PARAMS = 'ACTION_WITHOUT_PARAMS';
export function actionWithoutParams() {
    return {
        type: ACTION_WITHOUT_PARAMS
    }
}
```
But now we have [createAction](https://github.com/olegman/redux-actions-helpers#createactiontype-paramscreator) helper that could do it much better:
```javascript
import { createAction } from 'redux-actions-helpers';
export const actionWithoutParams = createAction('ACTION_WITHOUT_PARAMS');
```
Feel the difference only one single line to create action(it's **83,4%** less lines of code), and as you can see we moved away extra export of constant, because for now our action can act like constant too.

And what about actions with params, previously we can do like this
```javascript
export const ACTION_WITH_PARAMS = 'ACTION_WITH_PARAMS';
export function actionWithParams(param1, param2) {
    return {
        type: ACTION_WITH_PARAMS,
        param1,
        param2
    }
}
```
For now it can be easy as:
```javascript
import { createAction } from 'redux-actions-helpers';
export const actionWithParams = createAction('ACTION_WITH_PARAMS', (param1, param2) => ({ param1, param2 }));
```
Ok, looks good now let's move on in our reducer and look how can we get benefit from our new and shiny actions. And here we have another helper method [handleActions](https://github.com/olegman/redux-actions-helpers#handleactionshandlers-options):
```javascript
import { handleActions } from 'redux-actions-helpers';
import { actionWithoutParams, actionWithParams, anotherAction } from 'actions.js';

const initialState = {
    param1: 'someValue',
    param2: 'someValue'
};

export default handleActions({
    /* yay we use one function to dispatch actions and like constant, looks nice.
    Under the hood it's just a constant so if we write 'ACTION_WITHOUT_PARAMS' this will work too */
    [actionWithoutParams]: (state, action) => {
        // some cool stuff
        return {
            ...state,
            withCoolStuff
        };
    },
    /* 💥 killer feature: multiple actions on one handler with very nice and short syntax.
    But nothing magical under the hood it's just constants with ',' delimeter */
    [actionWithParams + anotherAction]: (state, action) => {
        let { param1, param2 } = action;
        return {
            ...state,
            param1,
            param2
        };
    }
}, { initialState });
```
That's all, that simple 😎

## What about async actions?
As I mentioned earlier this lib works well with existing ecosystem and the best way to work with async actions is [redux-saga](https://github.com/yelouafi/redux-saga/) you must check it out if you haven't already 😉

## Example with redux saga
```javascript
// saga.js
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { fetch, fetchSuccess, fetchFail } from 'actions.js';

export function* fetchData(action) {
   try {
      const data = yield call(Api.fetchData, action.url);
      yield put(fetchSuccess(data));
   } catch (error) {
      yield put(fetchFail(error));
   }
}

export default function* rootSaga() {
  yield fork(takeEvery, fetch.toString(), fetchData)
}
```
Everything looks nice instead of this string: fetch.toString(). The problem is that action can act like constant in some situation with no effort but it still a function and in some cases you need to force action to be a constant with type string. But I'm very kind and have one more thing for you, this is [redux-actions-helpers-saga](https://github.com/olegman/redux-actions-helpers-saga). For now this is only one small function that just an alias for redux-saga fork helper function, that do .toString transform under the hood, to keep code looks pretty and nice:
```javascript
import { forkActionWatcher } from 'redux-actions-helpers-saga';
export default function* rootSaga() {
  yield forkActionWatcher(takeEvery, fetch, fetchData)
}
```
Yep, much better 👏

## API Reference

###`createAction(type, paramsCreator)`
- `type: String`: action id, must be unique.
- `paramsCreator: Function`: returns object of params that will be merged to action itself.

###`handleActions(handlers, options)`
- `handlers: Object`: just plain object where key must be a string and value function handler.
- `options: Object`: object with some options.

Available options:
- `initialState`: `required` option that must provide your initialState (defaultState) state of reducer.
- `strict`: default value is `true`, enables strict mode with all available warnings.

###`clearRegistry()`

## Errors and warnings Reference
- `Error: Duplicate Action`: your type property in action must be unique to avoid some unexpected behaviour, and if you have such mistake you will get an error to fix this. If you have many actions in many places(components) the best practice to avoid this error is naming action with namespace like so: `@@namespace/OUR_CONSTANT`
- `Warning: Property type is reserved by action`: means that you create params with type property, but action already resrved this property to itself and won't be overriden. So you need to rename this property to different name.
- `Warning: Unknown action`: this warning can produce `handleActions` function when you pass in some unknown action type.

## Conclusion
I know there are many similar libs that try to solve same problem, for example: [redux-actions](https://github.com/acdlite/redux-actions), [redux-act](https://github.com/pauldijou/redux-act) and many more. But in fact it's not true, because they try to solve many problems at once and looks too complicated with many unnecessary things for me (that bloat my final bundle size 😱), moreover they don't have some useful things that my library can do. My library do small things but do it very good, it's really save your time, help with useful errors and warnings, and have low cost to integrate in existing solution and even can reduce your final bundle size (if you have many actions in project). Hope you enjoy it, as I do ✌️

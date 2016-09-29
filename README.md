# Redux Actions Helpers
[![Build Status](https://img.shields.io/travis/olegman/redux-actions-helpers/master.svg?style=flat-square)](https://travis-ci.org/olegman/redux-actions-helpers)
[![Latest Stable Version](https://img.shields.io/npm/v/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![Dependency Status](https://img.shields.io/david/olegman/redux-actions-helpers.svg?style=flat-square)](https://david-dm.org/olegman/redux-actions-helpers)
[![License](https://img.shields.io/npm/l/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dt/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)

Redux actions helpers is tiny TypeScript library which helps you create redux actions with less code and avoid common mistakes.

- **Simple:** it's only helpers for creating and handle actions from [official redux documentation](http://redux.js.org/docs/basics/Actions.html) nothing more, I don't try to invent some new way of creating and handle actions and that's why it easy to integrate in existing project and it can work nice with other tools and libs. 
- **Small:** it's realy very small, without any extra dependencies and won't bloat your bundle size.
- **Productive:** the main goal of this lib to keep you more productive, you will write much less code and do more, also you have to do much less job when you do some refactorings and it provide some very helpful errors and warnings to avoid common mistakes and save your time on debugging.

##Example
Before:
```javascript 
// actions.js
export const ACTION_WITHOUT_PARAMS = 'ACTION_WITHOUT_PARAMS';
export function actionWithoutParams() {
    return {
        type: ACTION_WITHOUT_PARAMS
    }
}

export const ACTION_WITH_PARAMS = 'ACTION_WITH_PARAMS';
export function actionWithParams(param1, param2) {
    return {
        type: ACTION_WITH_PARAMS,
        param1,
        param2
    }
}

export const ANOTHER_ACTION = 'ANOTHER_ACTION';
export function actionWithParams() {
    return {
        type: ANOTHER_ACTION
    }
}

// reducer.js
import { ACTION_WITHOUT_PARAMS, ACTION_WITH_PARAMS, ANOTHER_ACTION } from 'actions.js';

const initialState = {
    param1: 'someValue',
    param2: 'someValue'
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_WITHOUT_PARAMS:
            // some cool stuff
            return {
                ...state,
                withCoolStuff
            };
        case ACTION_WITH_PARAMS:
        case ANOTHER_ACTION:
            let { param1, param2 } = action; 
            return {
                ...state,
                param1,
                param2
            };
        default:
            return state;
    }
}
```
<img src="https://s-media-cache-ak0.pinimg.com/564x/5a/6c/22/5a6c2283a90edd21c8815cf3c80c924b.jpg" width="300">
Too much code to write and maintain 😰

After:
```javascript
// actions.js
import { createAction } from 'redux-actions-helpers';
/* wow one single line instead of 6 lines we had before 👍 */
export const actionWithoutParams = createAction('ACTION_WITHOUT_PARAMS');
/* if you want you can write this in one single line too, but for me it's more readable, 
but still shorter than before 😏 */
export const actionWithParams = createAction('ACTION_WITH_PARAMS', (param1, param2) => ({ 
    param1, 
    param2 
}));
/* as you can see now we export only one function, we don't need to export
additional constant, because now this function can act like constant too 😉 */
export const anotherAction = createAction('ANOTHER_ACTION');

// reducer.js
import { handleActions } from 'redux-actions-helpers';
import { actionWithoutParams, actionWithParams, anotherAction } from 'actions.js';

const initialState = {
    param1: 'someValue',
    param2: 'someValue'
};

export default handleActions({
    /* yay we use one function to dispatch actions and like constant, looks nice
    and under the hood it's just a constant so if we write 'ACTION_WITHOUT_PARAMS' this wil work too */
    [actionWithoutParams]: (state, action) => {
        // some cool stuff
        return {
            ...state,
            withCoolStuff
        };
    },
    /* 💥 killer feature: multiple actions on one handler with very nice and short syntax,
    but nothing magical under the hood it's just constants with ',' delimeter */
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
<img src="https://s-media-cache-ak0.pinimg.com/originals/0d/30/b4/0d30b41543d97867ca502a8ac3b5afe0.gif" width="300">
It's much better for now, looks nice and clean with much less code 😎

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
```
import { fork } from 'redux-actions-helpers-saga';
export default function* rootSaga() {
  yield fork(takeEvery, fetch, fetchData)
}
```
Yep, much better 👏

## Conclusion
I know there are many similar libs that try to solve same problem, for example: [redux-actions](https://github.com/acdlite/redux-actions), [redux-act](https://github.com/pauldijou/redux-act) and many more. But in fact it's not true, because they try to solve many problems at once and looks too complicated with many unnecessary things for me (that bloat my final bundle size 😱), moreover they don't have some useful things that my library can do. My library do small things but do it very good, it's realy save your time, help with useful errors and warnings, and have low cost to integrate in existing solution and even can reduce your final bundle size (if you have many actions in project). Hope you enjoy it, as I do ✌️

# Redux Actions Helpers
[![Build Status](https://img.shields.io/travis/olegman/redux-actions-helpers/master.svg?style=flat-square)](https://travis-ci.org/olegman/redux-actions-helpers)
[![Latest Stable Version](https://img.shields.io/npm/v/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![Dependency Status](https://img.shields.io/david/olegman/redux-actions-helpers.svg?style=flat-square)](https://david-dm.org/olegman/redux-actions-helpers)
[![License](https://img.shields.io/npm/l/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dt/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)

This is tiny lib for reducing boilerplate when you create and handle new actions in your redux app. With the help of this lib
you can create action in one single line and use it to dispatch actions and like constant. Also this lib provide some helpful
errors and warnings, to avoid common mistakes. You can see usage in example below.

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

After:
```javascript
// actions.js
import { createAction } from 'redux-actions-helpers';
export const actionWithoutParams = createAction('ACTION_WITHOUT_PARAMS');
export const actionWithParams = createAction('ACTION_WITH_PARAMS', (param1, param2) => ({ param1, param2 }));
export const anotherAction = createAction('ANOTHER_ACTION');

// reducer.js
import { handleActions } from 'redux-actions-helpers';
import { actionWithoutParams, actionWithParams, anotherAction } from 'actions.js';

const initialState = {
    param1: 'someValue',
    param2: 'someValue'
};

export default handleActions({
    [actionWithoutParams]: (state, action) => {
        // some cool stuff
        return {
            ...state,
            withCoolStuff
        };
    },
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

## What about async actions?
Use [redux-saga](https://github.com/yelouafi/redux-saga/) and be happy 

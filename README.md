# Redux Actions Helpers
[![Build Status](https://img.shields.io/travis/olegman/redux-actions-helpers/master.svg?style=flat-square)](https://travis-ci.org/olegman/redux-actions-helpers)
[![Latest Stable Version](https://img.shields.io/npm/v/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![Dependency Status](https://img.shields.io/david/olegman/redux-actions-helpers.svg?style=flat-square)](https://david-dm.org/olegman/redux-actions-helpers)
[![License](https://img.shields.io/npm/l/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)
[![NPM Downloads](https://img.shields.io/npm/dt/redux-actions-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-actions-helpers)

This is tiny lib for reducing boilerplate when you create and handle new actions in your app.

Before:
``` 
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


// reducer.js
import { ACTION_WITHOUT_PARAMS, ACTION_WITH_PARAMS } from 'actions.js';

const initialState = {
    param1: 'someValue',
    param2: 'someValue'
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ACTION_WITHOUT_PARAMS:
            // some cool stuff
            return state;
        case ACTION_WITH_PARAMS:
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

After:
``` 
// actions.js
import { createAction } from 'redux-actions-helpers';
export const actionWithoutParams = createAction('ACTION_WITHOUT_PARAMS');
export const actionWithParams = createAction('ACTION_WITH_PARAMS', (param1, param2) => ({ param1, param2 }));


// reducer.js
import { actionWithoutParams, actionWithParams } from 'actions.js';

const initialState = {
    param1: 'someValue',
    param2: 'someValue'
};

export default handleActions({
    [actionWithoutParams]: (state, action) => {
        // some cool stuff
        return state;
    },
    [actionWithParams]: (state, action) => {
        let { param1, param2 } = action; 
        return {
            ...state,
            param1,
            param2
        };
    }
}, initialState);
```

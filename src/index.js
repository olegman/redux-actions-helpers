import { fork as sagaFork } from 'redux-saga/effects';

export function createAction(type, paramsCreator = () => null) {
    const actionCreator = (...args) => {
        return {
            ...paramsCreator(...args),
            type
        }
    };
    actionCreator.toString = () => type;
    return actionCreator;
}

export function handleActions(handlers, initialState) {
    return (state = initialState, action = {}) => {
        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

export function fork(take, action, watcher) {
    return sagaFork(take, action.toString(), watcher);
}

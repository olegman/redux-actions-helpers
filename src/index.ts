import { fork as sagaFork } from 'redux-saga/effects';

const actionsRegistry = new Set();
export interface params {
    [propName: string]: any;
}
export interface paramsCreator {
    (...any): params;
}
export function createAction(type: string, paramsCreator: paramsCreator = () => ({})) {
    if (actionsRegistry.has(type)) {
        throw `Duplicate action ${type}`;
    } else {
        actionsRegistry.add(type);
    }

    const actionCreator = (...args) => {
        return Object.assign(paramsCreator(...args), { type });
    };
    actionCreator.toString = () => type;
    return actionCreator;
}

export interface state {
    [propName: string]: any;
}
export interface handler {
    (state: state, action: action): state;
}
export interface handlers {
    [propName: string]: handler
}
export interface action {
    type: string;
    [propName: string]: any;
}
export function handleActions(handlers: handlers, initialState: state) {
    return (state = initialState, action: action) => {
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

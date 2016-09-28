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
export default function handleActions(handlers: handlers, initialState: state) {
    return (state = initialState, action: action) => {
        if (handlers[action.type]) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

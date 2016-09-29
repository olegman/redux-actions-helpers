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
    const flattenHandlers = (handlers => {
        let result = {};
        Object.keys(handlers).forEach(type => {
            if (type.slice(-1) === ',') {
                const multipleTypes = type.slice(0, -1);
                const types = multipleTypes.split(',');
                types.forEach(splittedType => {
                    result[splittedType] = handlers[type];
                })
            } else {
                result[type] = handlers[type];
            }
        });
        return result;
    })(handlers);

    return (state = initialState, action: action) => {
        if (flattenHandlers[action.type]) {
            return flattenHandlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

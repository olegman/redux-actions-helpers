import actionsRegistry from './actionsRegistry';

export interface state {
    [propName: string]: any;
}
export interface handler {
    (state: any, action: action): state;
}
export interface handlers {
    [propName: string]: handler
}
export interface action {
    type: string;
    [propName: string]: any;
}
export interface options {
    initialState: state;
    strict?: boolean;
}

export default function handleActions(handlers: handlers, options: options) {
    const { initialState } = options;
    if (!('strict' in options)) options.strict = true;

    const flattenHandlers = (handlers => {
        let result = {};
        Object.keys(handlers).forEach(type => {
            if (type.slice(-1) === ',') {
                const multipleTypes = type.slice(0, -1);
                const types = multipleTypes.split(',');
                types.forEach(splittedType => {
                    if (options.strict && !actionsRegistry.has(splittedType)) console.warn(`Unknown action ${splittedType}`);
                    result[splittedType] = handlers[type];
                })
            } else {
                if (options.strict && !actionsRegistry.has(type)) console.warn(`Unknown action ${type}`);
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

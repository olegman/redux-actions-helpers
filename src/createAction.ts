import actionsRegistry from './actionsRegistry';

export interface params {
    [propName: string]: any;
}
export interface paramsCreator {
    (...any): params;
}

export function clearRegistry() : any {
    actionsRegistry.clear();
}

const defaultTransform = (...args) => ({ ...args });

export default function createAction(type: string, transform = defaultTransform): any {
    if (actionsRegistry.has(type)) {
        throw `Duplicate action ${type}`;
    } else {
        actionsRegistry.add(type);
    }

    const actionCreator = (...args) => {
        const params = transform(...args);
        if ('type' in params) {
            console.warn('Property type is reserved by action');
        }
        return Object.assign(params, { type });
    };
    actionCreator.toString = () => type;
    actionCreator.valueOf = () => `${type},`;
    return actionCreator;
}

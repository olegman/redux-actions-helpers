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

const validateType = (type: string): boolean => {
    const re = /^@@([a-z0-9]+(?:\-?[a-z0-9]+))+\/([A-Z0-9]+(?:\_?[A-Z0-9]+))+$/;

    return re.test(type);
};

export default function createAction(type: string, transform = defaultTransform): any {
    if (actionsRegistry.has(type)) {
        throw `Duplicate action ${type}`;
    } else {
        actionsRegistry.add(type);
    }

    if (!validateType(type)) {
        console.warn(`Action type: ${type} doesn't match regexp pattern /^@@([a-z0-9]+(?:\\-?[a-z0-9]+))+\\/([A-Z0-9]+(?:\\_?[A-Z0-9]+))+$/`);
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

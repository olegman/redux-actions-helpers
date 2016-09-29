const actionsRegistry = new Set();
export interface params {
    type?: void;
    [propName: string]: any;
}
export interface paramsCreator {
    (...any): params;
}
export default function createAction(type: string, paramsCreator: paramsCreator = () => ({})) {
    if (actionsRegistry.has(type)) {
        throw `Duplicate action ${type}`;
    } else {
        actionsRegistry.add(type);
    }

    const actionCreator = (...args) => {
        const params = paramsCreator(...args);
        if (params.type !== undefined) {
            console.warn('Property type is reserved by action');
        }
        return Object.assign(params, { type });
    };
    actionCreator.toString = () => type;
    actionCreator.valueOf = () => `${type},`;
    return actionCreator;
}

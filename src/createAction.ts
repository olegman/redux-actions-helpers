const actionsRegistry = new Set();
export interface params {
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
        return Object.assign(paramsCreator(...args), { type });
    };
    actionCreator.toString = () => type;
    return actionCreator;
}

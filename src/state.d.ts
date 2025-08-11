export type ChangeListener = {
    changed: (stateId: symbol, property: string, oldValue: unknown, newValue: unknown) => void;
};
export declare class State {
    #private;
    [key: string]: any;
    constructor();
    /**
     * @param listener - object that has a "changed" method
     * @param properties - array of properties of interest
     */
    addListener(listener: ChangeListener, properties?: string[]): void;
    addProperty(propName: string, initialValue: unknown): void;
    get id(): symbol;
    removeListener(listener: ChangeListener): void;
}

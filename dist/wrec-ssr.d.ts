declare type AnyClass = new (...args: any[]) => any;

declare type ChangeCallback = (change: StateChange) => void;

export declare function createElement(name: string, attributes: StringToString, innerHTML: string): HTMLElement;

export declare function css(strings: TemplateStringsArray, ...values: unknown[]): string;

export declare function html(strings: TemplateStringsArray, ...values: unknown[]): string;

declare const HTMLElementBase: {
    new (): HTMLElement;
    prototype: HTMLElement;
};

declare type LooseObject = Record<string, unknown>;

declare type PropertyConfig<T = any> = {
    computed?: string;
    dispatch?: boolean;
    required?: boolean;
    type: AnyClass;
    usedBy?: string | string[];
    value?: T;
    values?: T extends string ? string[] : never;
};

declare type StateChange = {
    state: WrecState;
    statePath: string;
    oldValue: unknown;
    newValue: unknown;
};

declare type StringToAny = Record<string, any>;

declare type StringToString = Record<string, string>;

export declare abstract class Wrec extends HTMLElementBase {
    #private;
    private static attrToPropMap;
    private static propToAttrMap;
    private static computedGraph;
    static context: {};
    static css: string;
    private static elementName;
    static formAssociated: boolean;
    static html: string;
    static properties: Record<string, PropertyConfig>;
    private static propToComputedMap;
    private static methodToExprsMap;
    private static propToExprsMap;
    private static registeredComputedProps;
    private static computedPropsRegistered;
    private static template;
    static define(elementName: string): void;
    constructor();
    attributeChangedCallback(attrName: string, _oldValue: string | null, newValue: string | null): void;
    batchSet(changes: StringToAny): void;
    private static buildHTML;
    changed(_statePath: string, componentProp: string, newValue: unknown): void;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    dispatch(name: string, detail: any): void;
    displayIfSet(value: any, display?: string): string;
    formAssociatedCallback(): void;
    formResetCallback(): void;
    private static getAttrName;
    static getPropName(attrName: string): string;
    static get observedAttributes(): string[];
    propertyChangedCallback(_propName: string, _oldValue: unknown, _newValue: unknown): void;
    ready(): void;
    setAttributeSafe(name: string, value: string): void;
    setFormValue(propName: string, value: string): void;
    static ssr(properties?: StringToAny): string;
    /**
     * @param state - WrecState object
     * @param map - object whose keys are state properties and
     *   whose values are component properties
     */
    useState(state: WrecState, map?: StringToString): void;
}

export declare class WrecState {
    #private;
    static get(name: string): WrecState | undefined;
    [key: string]: unknown;
    constructor(name: string, persist: boolean, initial?: LooseObject);
    subscribe(callback: ChangeCallback, paths?: string[]): () => void;
    addProperty(propName: string, initialValue: unknown): void;
    get id(): symbol;
    log(): void;
}

export { }

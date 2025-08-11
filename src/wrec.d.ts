import type { ChangeListener, State } from './state';
export declare function createElement(name: string, attributes: Record<string, string>, innerHTML: string): HTMLElement;
declare class Wrec extends HTMLElement implements ChangeListener {
    #private;
    static css: string;
    static html: string;
    static formAssociated: boolean;
    static processed: boolean;
    static properties: Record<string, any>;
    static propToComputedMap: Map<string, string[][]> | null;
    static propToExprsMap: Map<string, string[]> | null;
    static template: HTMLTemplateElement | null;
    [key: string]: any;
    constructor();
    attributeChangedCallback(attrName: string, oldValue: string, newValue: string | number | boolean | undefined): void;
    changed(stateId: symbol, stateProp: string, _oldStateValue: unknown, newStateValue: unknown): void;
    connectedCallback(): void;
    static dataForId(data: Record<string, any>): string;
    disconnectedCallback(): void;
    dispatch(name: string, detail: any): void;
    static elementName(): string;
    static getAttrName(propName: string): string;
    static getPropName(attrName: string): string;
    static get observedAttributes(): string[];
    propertyChangedCallback(_propName: string, _oldValue: unknown, _newValue: unknown): void;
    static register(): void;
    /**
     * @param stateName - unique name for th2nd parameter State object
     * @param state - State object
     * @param map - object whose keys are state properties and
     * whose values are component properties
     */
    useState(state: State, map: Record<string, string>): void;
}
export default Wrec;
export declare function css(strings: TemplateStringsArray, ...values: unknown[]): string;
export declare function html(strings: TemplateStringsArray, ...values: unknown[]): string;

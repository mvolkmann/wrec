(global as any).HTMLElement = class HTMLElement {};

global.customElements = {
  define: () => {},
  get: (_name: string) => undefined,
  getName: () => '',
  upgrade: () => {},
  whenDefined: () => {
    return new Promise((_resolve, reject) => reject());
  }
};

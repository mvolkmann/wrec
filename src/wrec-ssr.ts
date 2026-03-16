import {
  parse,
  HTMLElement as NHPElement,
  NodeType as NHPNodeType,
  TextNode as NHPTextNode
} from 'node-html-parser';
import {Wrec} from './wrec';

export * from './wrec';

const FIRST_CHAR = 'a-zA-Z_$';
const OTHER_CHAR = FIRST_CHAR + '0-9';
const IDENTIFIER = `[${FIRST_CHAR}][${OTHER_CHAR}]*`;
const REFS_TEST_RE = new RegExp(`this\\.${IDENTIFIER}(\\.${IDENTIFIER})*`);
const SKIP = 'this.'.length;

const getPropName = (str: string) => str.substring(SKIP).split('.')[0];

Wrec.ssr = function ssr(properties: Record<string, any> = {}) {
  let attributes = '';
  const keys = Object.keys(properties);
  keys.sort();
  for (const property of keys) {
    const attrName = (this as any).getAttrName(property);
    attributes += ` ${attrName}="${properties[property]}"`;
  }

  const staticProperties = (this as any).properties;
  for (const [propName, descriptor] of Object.entries(staticProperties)) {
    if (properties[propName] === undefined) {
      const {value} = descriptor as {value?: unknown};
      if (value !== undefined) properties[propName] = value;
    }
  }

  function evaluate(expr: string) {
    return new Function('return ' + expr).call(properties);
  }

  function process(element: NHPElement) {
    const {attributes} = element;
    for (const [attrName, value] of Object.entries(attributes)) {
      if (REFS_TEST_RE.test(value)) {
        const newValue = evaluate(value);
        const propName = getPropName(attrName);
        const defaultValue = staticProperties[propName]?.value ?? '';
        if (newValue === defaultValue) {
          element.removeAttribute(attrName);
        } else {
          element.setAttribute(attrName, String(newValue));
        }
      }
    }

    const {childNodes} = element;
    childNodes.forEach((node, index) => {
      if (node.nodeType === NHPNodeType.ELEMENT_NODE) {
        process(node as NHPElement);
      } else if (node.nodeType === NHPNodeType.COMMENT_NODE) {
        const value = node.textContent ?? '';
        if (REFS_TEST_RE.test(value)) {
          const newValue = evaluate(value);
          childNodes[index] = new NHPTextNode(String(newValue));
        }
      }
    });
  }

  const htmlString = (this as any).buildHTML();
  const root = parse(htmlString, {comment: true});
  const {children} = root;
  children.forEach(process);
  const result = children.map(element => element.outerHTML).join('\n');
  const elementName = (this as any).elementName;

  return `
      <${elementName}${attributes}>
        <template shadowrootmode="open">
          ${result}
        </template>
      </${elementName}>
    `;
};

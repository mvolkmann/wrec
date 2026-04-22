import {
  parse,
  HTMLElement as NHPElement,
  NodeType as NHPNodeType,
  TextNode as NHPTextNode
} from 'node-html-parser';
import {
  REF_RE,
  REFS_TEST_RE,
  evaluateInScope,
  getExpressionPropName,
  initializeEvaluationScope
} from './evaluation';
import {Wrec, WrecState, createElement, css, html} from './wrec';

export {Wrec, WrecState, createElement, css, html};

// Escapes an SSR attribute value so it remains valid HTML when serialized.
function escapeAttributeValue(value: unknown) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Evaluates a Wrec component template in Node and serializes declarative shadow DOM.
Wrec.ssr = function ssr(properties: Record<string, any> = {}): string {
  const ctor = this as typeof Wrec;
  const scope = initializeEvaluationScope(ctor, properties);
  let attributes = '';
  const keys = Object.keys(properties);
  keys.sort();
  for (const property of keys) {
    const attrName = (ctor as any).getAttrName(property);
    const attrValue = escapeAttributeValue(properties[property]);
    attributes += ` ${attrName}="${attrValue}"`;
  }

  // Evaluates a single template expression against the supplied properties.
  function evaluate(expr: string) {
    return evaluateInScope(expr, scope, ctor.context);
  }

  // Walks a parsed template tree and resolves dynamic attributes and text.
  function process(element: NHPElement) {
    const {attributes} = element;
    for (const [attrName, value] of Object.entries(attributes)) {
      if (REFS_TEST_RE.test(value)) {
        const newValue = evaluate(value);
        if (REF_RE.test(value)) {
          const propName = getExpressionPropName(value);
          const defaultValue = ctor.properties?.[propName]?.value;
          if (defaultValue === '' && newValue === defaultValue) {
            element.removeAttribute(attrName);
            continue;
          }
        }
        element.setAttribute(attrName, escapeAttributeValue(newValue));
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
          // Text expressions intentionally preserve raw HTML so
          // components can emit SSR markup when needed.
          childNodes[index] = new NHPTextNode(String(newValue));
        }
      }
    });
  }

  const htmlString = (ctor as any).buildHTML();
  const root = parse(htmlString, {comment: true});
  const {children} = root;
  children.forEach(process);
  const result = children.map(element => element.outerHTML).join('\n');
  const elementName = (ctor as any).elementName;

  return `
      <${elementName}${attributes}>
        <template shadowrootmode="open">
          ${result}
        </template>
      </${elementName}>
    `;
};

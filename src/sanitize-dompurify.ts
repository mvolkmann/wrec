// wrec.ts currently uses sanitize-xss instead of this.
// Keep this file for a bit longer until you are sure
// that using xss instead of dompurify works correctly.
/*
import DOMPurify from 'dompurify';

// Prevent DOMPurify from removing certain attributes whose names
// begin with "on" because wrec uses those wire up event listeners.
// Do not allow "onerror" because that can be used for XSS attacks.
//TODO: More may need to be added later.
const safeOnAttrNames = new Set([
  'onblur',
  'onchange',
  'onclick',
  'onfocus',
  'oninput',
  'onkeydown',
  'onreset',
  'onsubmit'
]);
(DOMPurify as any).addHook(
  'uponSanitizeAttribute' as any,
  (_node: any, data: any) => {
    const {attrName} = data;
    const lower = attrName.toLowerCase();
    if (safeOnAttrNames.has(lower)) data.forceKeepAttr = true;
  }
);

// DOMPurify uses the browser HTML parser which removes elements
// that are not nested in the required parent element.
// For example, tr elements are stripped when not inside a table element.
// wrec needs to insert elements from HTML strings that violate this.
// This function wraps HTML strings in the required parent element
// only for the purpose of sanitizing the HTML.
// It then extracts the required portion of the sanitized result.
function sanitize(html: string): NodeListOf<ChildNode> {
  let h = html.trim();
  let extract = null;
  // tr elements must be wrapped in table/tbody.
  if (/^\s*<tr[\s>]/i.test(h)) {
    h = `<table><tbody>${h}</tbody></table>`;
    extract = 'tbody';
    // td or th elements must be wrapped in table/tbody/tr.
  } else if (/^\s*<(td|th)[\s>]/i.test(h)) {
    h = `<table><tbody><tr>${h}</tr></tbody></table>`;
    extract = 'tr';
    // option elements must be wrapped in select.
  } else if (/^\s*<option[\s>]/i.test(h)) {
    h = `<select>${h}</select>`;
    extract = 'select';
    // col elements must be wrapped in colgroup.
  } else if (/^\s*<col[\s>]/i.test(h)) {
    h = `<table><colgroup>${h}</colgroup></table>`;
    extract = 'colgroup';
  }

  const fragment = DOMPurify.sanitize(h, {
    ADD_TAGS: ['#comment'],
    ALLOW_UNKNOWN_PROTOCOLS: true,
    RETURN_DOM_FRAGMENT: true
  });
  if (extract) {
    const container = fragment.querySelector(extract);
    if (container) return container.childNodes;
  }
  return fragment.childNodes;
}

export default sanitize;
*/

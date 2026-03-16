import { parse as S, NodeType as h, TextNode as O } from "node-html-parser";
import { Wrec as _ } from "./wrec.es.js";
import { WrecState as j, createElement as C, css as F, html as D } from "./wrec.es.js";
const $ = "a-zA-Z_$", w = $ + "0-9", T = `[${$}][${w}]*`, d = new RegExp(`this\\.${T}(\\.${T})*`), y = 5, A = (a) => a.substring(y).split(".")[0];
_.ssr = function(o = {}) {
  let u = "";
  const l = Object.keys(o);
  l.sort();
  for (const t of l) {
    const s = this.getAttrName(t);
    u += ` ${s}="${o[t]}"`;
  }
  const f = this.properties;
  for (const [t, s] of Object.entries(f))
    if (o[t] === void 0) {
      const { value: n } = s;
      n !== void 0 && (o[t] = n);
    }
  function m(t) {
    return new Function("return " + t).call(o);
  }
  function p(t) {
    const { attributes: s } = t;
    for (const [e, c] of Object.entries(s))
      if (d.test(c)) {
        const r = m(c), i = A(e), R = f[i]?.value ?? "";
        r === R ? t.removeAttribute(e) : t.setAttribute(e, String(r));
      }
    const { childNodes: n } = t;
    n.forEach((e, c) => {
      if (e.nodeType === h.ELEMENT_NODE)
        p(e);
      else if (e.nodeType === h.COMMENT_NODE) {
        const r = e.textContent ?? "";
        if (d.test(r)) {
          const i = m(r);
          n[c] = new O(String(i));
        }
      }
    });
  }
  const b = this.buildHTML(), g = S(b, { comment: !0 }), { children: E } = g;
  E.forEach(p);
  const v = E.map((t) => t.outerHTML).join(`
`), N = this.elementName;
  return `
      <${N}${u}>
        <template shadowrootmode="open">
          ${v}
        </template>
      </${N}>
    `;
};
export {
  _ as Wrec,
  j as WrecState,
  C as createElement,
  F as css,
  D as html
};

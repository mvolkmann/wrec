import { HTMLElement as y, parse as H, NodeType as T, TextNode as M } from "node-html-parser";
import { Wrec as R } from "./wrec.es.js";
import { WrecState as I, createElement as C, css as D, html as F } from "./wrec.es.js";
const b = "a-zA-Z_$", S = b + "0-9", h = `[${b}][${S}]*`, N = new RegExp(`this\\.${h}(\\.${h})*`), _ = 5, O = (c) => c.substring(_).split(".")[0];
typeof window > "u" && !globalThis.HTMLElement && (globalThis.HTMLElement = y);
typeof window > "u" && !globalThis.customElements && (globalThis.customElements = {
  get: (c) => {
  },
  getName: () => "",
  define: () => {
  },
  upgrade: () => {
  },
  whenDefined: () => Promise.reject(new Error("customElements is not available"))
});
R.ssr = function(o = {}) {
  let l = "";
  const m = Object.keys(o);
  m.sort();
  for (const t of m) {
    const n = this.getAttrName(t);
    l += ` ${n}="${o[t]}"`;
  }
  const u = this.properties;
  for (const [t, n] of Object.entries(u))
    if (o[t] === void 0) {
      const { value: s } = n;
      s !== void 0 && (o[t] = s);
    }
  function f(t) {
    return new Function("return " + t).call(o);
  }
  function E(t) {
    const { attributes: n } = t;
    for (const [e, i] of Object.entries(n))
      if (N.test(i)) {
        const r = f(i), a = O(e), v = u[a]?.value ?? "";
        r === v ? t.removeAttribute(e) : t.setAttribute(e, String(r));
      }
    const { childNodes: s } = t;
    s.forEach((e, i) => {
      if (e.nodeType === T.ELEMENT_NODE)
        E(e);
      else if (e.nodeType === T.COMMENT_NODE) {
        const r = e.textContent ?? "";
        if (N.test(r)) {
          const a = f(r);
          s[i] = new M(String(a));
        }
      }
    });
  }
  const g = this.buildHTML(), w = H(g, { comment: !0 }), { children: d } = w;
  d.forEach(E);
  const $ = d.map((t) => t.outerHTML).join(`
`), p = this.elementName;
  return `
      <${p}${l}>
        <template shadowrootmode="open">
          ${$}
        </template>
      </${p}>
    `;
};
export {
  R as Wrec,
  I as WrecState,
  C as createElement,
  D as css,
  F as html
};

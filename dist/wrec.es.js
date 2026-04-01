var Tt = (c) => {
  throw TypeError(c);
};
var st = (c, a, t) => a.has(c) || Tt("Cannot " + t);
var h = (c, a, t) => (st(c, a, "read from private field"), t ? t.call(c) : a.get(c)), y = (c, a, t) => a.has(c) ? Tt("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(c) : a.set(c, t), M = (c, a, t, e) => (st(c, a, "write to private field"), e ? e.call(c, t) : a.set(c, t), t), f = (c, a, t) => (st(c, a, "access private method"), t);
import Mt from "xss";
function Rt(c, a, t = "") {
  const e = /* @__PURE__ */ new WeakMap(), s = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(o, n) {
      const r = Reflect.get(o, n);
      if (r === null || typeof r != "object") return r;
      const l = e.get(r);
      if (l) return l;
      const p = t ? `${t}.${n}` : n, u = Rt(r, a, p);
      return e.set(r, u), u;
    },
    // Intercept property writes.
    set(o, n, r) {
      const l = Reflect.get(o, n);
      if (l !== r) {
        Reflect.set(o, n, r);
        const p = t ? `${t}.${n}` : n;
        a(p, l, r);
      }
      return !0;
    }
  };
  return new Proxy(c, s);
}
function Ot(c) {
  const a = {};
  for (const [t, e] of Object.entries(c)) {
    const s = typeof e == "object" && e !== null;
    a[t] = s ? Ot(e) : e;
  }
  return a;
}
const Z = typeof window < "u" && typeof window.document < "u";
let At = class extends Error {
};
var P, tt, A, X, U, x, et, Nt;
const O = class O {
  constructor(a, t, e) {
    y(this, et);
    y(this, tt, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    y(this, A, []);
    y(this, X);
    y(this, U);
    y(this, x);
    if (!a) throw new At("name cannot be empty");
    if (h(O, P).has(a))
      throw new At(`WrecState with name "${a}" already exists`);
    if (M(this, X, a), M(this, U, t), M(this, x, Rt({}, f(this, et, Nt).bind(this))), t && Z) {
      const s = sessionStorage.getItem("wrec-state-" + a), o = s ? JSON.parse(s) : void 0;
      o && (e = o);
    }
    if (e)
      for (const [s, o] of Object.entries(e))
        this.addProperty(s, o);
    h(O, P).set(a, this);
  }
  // This static method is useful for accessing a specific WrecState object
  // from the DevTools console.  For example:
  // state = WrecState.get('vault');
  //
  // WrecState object properties are accessed via nested Proxy objects
  // so all changes can be monitored.
  //
  // Properties can be directly modified as follows:
  // state.color = 'blue';
  // state.team.leader.name = 'Mark';
  static get(a) {
    return h(this, P).get(a);
  }
  /**
   * @param listener - object that has a "changed" method
   * @param map - map from state property paths to component properties
   */
  addListener(a, t = {}) {
    const e = h(this, A).find(
      (s) => s.listenerRef.deref() === a
    );
    if (e) {
      const { propertyMap: s } = e;
      for (const [o, n] of Object.entries(t))
        s[o] = n;
    } else
      h(this, A).push({
        listenerRef: new WeakRef(a),
        propertyMap: t
      });
  }
  addProperty(a, t) {
    Object.defineProperty(this, a, {
      enumerable: !0,
      get() {
        return h(this, x)[a];
      },
      set(e) {
        h(this, x)[a] = e;
      }
    }), h(this, x)[a] = t;
  }
  get id() {
    return h(this, tt);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", h(this, X));
    for (const [a, t] of Object.entries(h(this, x)))
      console.log(`  ${a} = ${JSON.stringify(t)}`);
  }
  removeListener(a) {
    M(this, A, h(this, A).filter((t) => t.listenerRef.deref() !== a));
  }
};
P = new WeakMap(), tt = new WeakMap(), A = new WeakMap(), X = new WeakMap(), U = new WeakMap(), x = new WeakMap(), et = new WeakSet(), Nt = function(a, t, e) {
  const s = /* @__PURE__ */ new Set();
  for (const o of h(this, A)) {
    const n = o.listenerRef.deref();
    if (!n)
      s.add(o);
    else if (Z && n instanceof HTMLElement && !n.isConnected)
      s.add(o);
    else {
      const { propertyMap: r } = o, l = Object.keys(r);
      (l.length === 0 || l.includes(a)) && n.changed(
        a,
        r[a],
        e,
        t,
        this
      );
    }
  }
  M(this, A, h(this, A).filter(
    (o) => !s.has(o)
  ));
}, y(O, P, /* @__PURE__ */ new Map()), Z && window.addEventListener("beforeunload", () => {
  for (const [a, t] of h(O, P).entries())
    if (h(t, U)) {
      const e = Ot(t);
      sessionStorage.setItem("wrec-state-" + a, JSON.stringify(e));
    }
});
let ct = O;
Z && process.env.NODE_ENV === "development" && (window.WrecState = ct);
function St(c, a) {
  let t = c;
  for (const e of a.split("."))
    t = t[e];
  return t;
}
function Gt(c, a, t) {
  const e = a.split("."), s = e.length - 1;
  let o = c;
  e.forEach((n, r) => {
    r === s ? o[n] = t : o = o[n];
  });
}
const Qt = /* @__PURE__ */ new Set(["button", "input", "label", "option", "th"]), vt = "__WREC", xt = "__";
function te(c) {
  const a = {
    allowCommentTag: !0,
    onTag: (s, o) => {
      if (Qt.has(s)) return o;
    },
    onTagAttr(s, o, n) {
      if (o.startsWith("on")) return "";
    },
    safeAttrValue(s, o, n) {
      return o === "class" || s === "a" && o === "href" && !n.startsWith("javascript") || s === "img" && o === "src" ? n : "";
    },
    stripIgnoreTagBody: ["script", "style", "iframe"],
    whiteList: {
      ...Mt.getDefaultWhiteList(),
      label: ["class", "for"],
      span: ["class"]
    }
  }, t = [];
  c = c.replace(/<!--[\s\S]*?-->/g, (s) => {
    let o = "";
    do
      o = vt + t.length + xt;
    while (c.includes(o));
    return t.push(s), o;
  });
  let e = Mt(c, a);
  return t.forEach((s, o) => {
    const n = new RegExp(
      `${vt}${o}${xt}`,
      "g"
    );
    e = e.replace(n, s);
  }), e;
}
const ee = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]), se = globalThis.HTMLElement ?? class {
}, at = globalThis.customElements ?? {
  get: (c) => {
  },
  getName: () => "",
  define: () => {
  },
  upgrade: () => {
  },
  whenDefined: () => Promise.reject(
    new Error("customElements is not available in this environment")
  )
};
class v extends Error {
}
const oe = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, Lt = "a-zA-Z_$", ie = Lt + "0-9", I = `[${Lt}][${ie}]*`, Ct = new RegExp(`this\\.(${I})\\s*\\(`, "g"), ne = /<!--\s*(.*?)\s*-->/, re = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, ot = new RegExp(`^this\\.${I}$`), it = new RegExp(`this\\.${I}(\\.${I})*`, "g"), jt = new RegExp(`this\\.${I}(\\.${I})*`), ce = 5;
function ae(c) {
  return c instanceof HTMLButtonElement || c instanceof HTMLFieldSetElement || c instanceof HTMLInputElement || c instanceof HTMLSelectElement || c instanceof HTMLTextAreaElement || c instanceof K;
}
function me(c, a, t) {
  const e = document.createElement(c);
  if (a)
    for (const [s, o] of Object.entries(a))
      e.setAttribute(s, o);
  return t && (e.innerHTML = t), e;
}
const Pt = (c) => Array.isArray(c.values) && c.values.length > 0 ? c.values[0] : fe(c.type), fe = (c) => c === String ? "" : c === Number ? 0 : c === Boolean ? !1 : c === Array ? [] : c === Object ? {} : void 0;
function Q(c) {
  const a = [];
  let t = c.firstElementChild;
  for (; t; )
    a.push(t), t.shadowRoot && a.push(...Q(t.shadowRoot)), t.firstElementChild && a.push(...Q(t)), t = t.nextElementSibling;
  return a;
}
const D = (c) => c.substring(ce).split(".")[0];
function Ht(c, a) {
  let t = c[0];
  return a.forEach((e, s) => {
    t += e + c[s + 1];
  }), t;
}
function Y(c) {
  const a = typeof c;
  return a === "string" || a === "number" || a === "boolean";
}
function _(c) {
  return c.localName === "textarea";
}
function Et(c) {
  const { localName: a } = c;
  return a === "input" || a === "select";
}
const he = (c) => c.replace(/<!--[\s\S]*?-->/g, "");
function kt(c, a, t, e) {
  return c.slice(0, a) + e + c.slice(a + t);
}
function nt(c) {
  const a = Number(c);
  if (isNaN(a)) throw new v(`can't convert "${c}" to a number`);
  return a;
}
function Ft(c, a, t) {
  const [e, s] = a.split(":");
  if (Y(t))
    if (typeof t == "boolean") {
      t ? c.setAttribute(e, e) : c.removeAttribute(e);
      const o = K.getPropName(e);
      c[o] = t;
    } else {
      const o = c.getAttribute(a), n = String(t);
      o !== n && (c.setAttribute(e, n), e === "value" && Et(c) && (c.value = n));
    }
  else {
    const o = K.getPropName(a);
    c[o] = t;
  }
}
function rt(c, a, t) {
  const [e, s] = a.split(":");
  c instanceof CSSStyleRule ? c.style.setProperty(e, t) : (Ft(c, e, t), e === "value" && Et(c) && (c.value = t));
}
const $t = (c) => typeof c == "string" ? [c] : c;
async function le(c) {
  const a = /* @__PURE__ */ new Set();
  for (const e of Q(c.content)) {
    const { localName: s } = e;
    s.includes("-") && a.add(s);
  }
  function t(e) {
    return new Promise((s, o) => {
      setTimeout(() => {
        const n = `custom element <${e}> not defined`;
        o(new Error(n));
      }, 1e3);
    });
  }
  return Promise.all(
    [...a].map(
      async (e) => Promise.race([
        at.whenDefined(e),
        t(e)
      ])
    )
  );
}
var N, L, m, T, j, C, H, k, F, $, i, It, Bt, Dt, ft, ht, _t, lt, S, Vt, Wt, R, V, W, pt, ut, dt, mt, zt, z, q, w, J, bt, yt, qt, Jt, gt, Kt, Xt, Ut, G, Zt, Yt, wt;
const g = class g extends se {
  constructor() {
    super();
    y(this, i);
    // This is true while the batchSet method is running.
    y(this, N, !1);
    // This holds the names of computed properties
    // that are currently being updated.
    y(this, L, /* @__PURE__ */ new Set());
    y(this, m, this.constructor);
    // This is a map from expressions to references to them
    // which can be found in element text content,
    // attribute values, and CSS property values.
    // Each component instance needs its own map.
    y(this, T, /* @__PURE__ */ new Map());
    y(this, j, {});
    y(this, C);
    // For components that set `formAssociated` to true,
    // this stores in the initial value of each property
    // in the formAssociatedCallback method
    // so they can be restored in the formResetCallback method.
    y(this, H, {});
    y(this, k, null);
    // This is a map from properties in this web component
    // to corresponding properties in a parent web component.
    // This must be an instance property because
    // each component instance can have its properties mapped
    // to the properties of different parent components.
    // This is used to update a parent property
    // when the corresponding child property value changes.
    y(this, F, /* @__PURE__ */ new Map());
    // This is a map from component properties to state bindings.
    // It must be instance-specific because each component instance
    // can bind the same property to a different WrecState/path.
    y(this, $, /* @__PURE__ */ new Map());
    this.attachShadow({ mode: "open" });
    const t = h(this, m);
    f(this, i, R).call(this, "attrToPropMap") || (t.attrToPropMap = /* @__PURE__ */ new Map()), f(this, i, R).call(this, "properties") || (t.properties = {}), f(this, i, R).call(this, "propToAttrMap") || (t.propToAttrMap = /* @__PURE__ */ new Map()), f(this, i, R).call(this, "propToComputedMap") || (t.propToComputedMap = /* @__PURE__ */ new Map()), f(this, i, R).call(this, "propToExprsMap") || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  static define(t) {
    if (this.elementName = t, at.get(t))
      throw new v(`custom element ${t} is already defined`);
    at.define(t, this);
  }
  attributeChangedCallback(t, e, s) {
    t === "disabled" && f(this, i, ht).call(this);
    const o = g.getPropName(t);
    if (!f(this, i, W).call(this, o) && f(this, i, V).call(this, o)) {
      const n = f(this, i, yt).call(this, o, s);
      this[o] = n;
      const r = h(this, j)[o];
      r && this.setFormValue(r, String(n));
    }
  }
  // This applies multiple property changes and only updates
  // the affected parts of the DOM after all of them are made.
  batchSet(t) {
    M(this, N, !0);
    const e = h(this, m).propToExprsMap, s = /* @__PURE__ */ new Set();
    for (const [l, p] of Object.entries(t)) {
      this[l] = p;
      const u = e.get(l) ?? [];
      for (const d of u)
        s.add(d);
    }
    const o = h(this, m).propToComputedMap, n = /* @__PURE__ */ new Set(), r = {};
    for (const l of Object.keys(t)) {
      const p = o.get(l) || [];
      for (const [u, d] of p)
        n.add(u), r[u] = d;
    }
    for (const l of n) {
      const p = r[l];
      f(this, i, z).call(this, l, f(this, i, S).call(this, p));
      const u = e.get(l) ?? [];
      for (const d of u)
        s.add(d);
    }
    for (; ; ) {
      let l = !1;
      for (const p of n) {
        const u = r[p], d = f(this, i, S).call(this, u), b = this[p];
        JSON.stringify(d) !== JSON.stringify(b) && (f(this, i, z).call(this, p, d), l = !0);
      }
      if (!l) break;
    }
    f(this, i, lt).call(this, [...s]), M(this, N, !1);
  }
  static buildHTML() {
    let t = `<style>
    :host([hidden]) { display: none; }`;
    this.css && (t += this.css), t += `</style>
`;
    let e = this.html.trim();
    if (!e) throw new v("static property html must be set");
    return e.startsWith("<") || (e = `<span><!--${e}--></span>`), t + e;
  }
  changed(t, e, s) {
    this[e] = s;
  }
  async connectedCallback() {
    f(this, i, Ut).call(this), f(this, i, Dt).call(this), await f(this, i, It).call(this), this.hasAttribute("disabled") && f(this, i, ht).call(this), f(this, i, wt).call(this, this.shadowRoot), f(this, i, pt).call(this, this.shadowRoot), f(this, i, Xt).call(this), f(this, i, Bt).call(this);
  }
  disconnectedCallback() {
    for (const { state: t } of h(this, $).values())
      t.removeListener(this);
    h(this, T).clear(), h(this, H).clear(), h(this, F).clear(), h(this, $).clear();
  }
  dispatch(t, e) {
    this.dispatchEvent(
      new CustomEvent(t, {
        bubbles: !0,
        // up DOM tree
        composed: !0,
        // can pass through shadow DOM
        detail: e
      })
    );
  }
  displayIfSet(t, e = "block") {
    return `display: ${t ? e : "none"}`;
  }
  // This method is called automatically if
  // the component is nested in form element AND
  // the static property formAssociated is true.
  // It does things that are only necessary in that situation.
  formAssociatedCallback() {
    let t = this.getAttribute("form-assoc");
    if (!t) {
      const r = this.getAttribute("name");
      if (r)
        if (f(this, i, V).call(this, "value"))
          t = `value:${r}`;
        else
          return;
      else
        return;
    }
    const e = {}, s = t.split(",");
    for (const r of s) {
      const [l, p] = r.split(":");
      e[l.trim()] = p.trim();
    }
    M(this, j, e), M(this, C, new FormData()), M(this, k, this.attachInternals()), h(this, k).setFormValue(h(this, C));
    for (const [r, l] of Object.entries(e)) {
      const p = this[r];
      Y(p) && this.setFormValue(l, String(p));
    }
    const o = Object.keys(h(this, m).properties), n = h(this, H);
    for (const r of o)
      n[r] = this[r];
  }
  formResetCallback() {
    const t = h(this, H);
    for (const e of Object.keys(t)) {
      let s = t[e];
      ot.test(s) && (s = f(this, i, S).call(this, s)), this[e] = s;
    }
  }
  static getAttrName(t) {
    let e = this.propToAttrMap.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), this.propToAttrMap.set(t, e)), e;
  }
  static getPropName(t) {
    let e = this.attrToPropMap.get(t);
    return e || (e = t.replace(/-([a-z])/g, (s, o) => o.toUpperCase()), this.attrToPropMap.set(t, e)), e;
  }
  static get observedAttributes() {
    const t = Object.entries(this.properties || {}).filter(([e, s]) => !s.computed).map(([e]) => g.getAttrName(e));
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, s) {
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !h(this, C) || !Y(e) || (h(this, C).set(t, e), h(this, k)?.setFormValue(h(this, C)));
  }
  static ssr(t = {}) {
    throw new v('Import Wrec from "wrec/ssr" to use the ssr method.');
  }
  /**
   * @param state - WrecState object
   * @param map - object whose keys are state properties and
   *   whose values are component properties
   */
  useState(t, e) {
    if (!e) {
      e = {};
      for (const s of Object.keys(t))
        e[s] = s;
    }
    f(this, i, Zt).call(this, t, e);
    for (const [s, o] of Object.entries(e))
      if (f(this, i, V).call(this, o)) {
        const n = St(t, s);
        n !== void 0 && (this[o] = n), h(this, $).set(o, { state: t, stateProp: s });
      }
    t.addListener(this, e);
  }
};
N = new WeakMap(), L = new WeakMap(), m = new WeakMap(), T = new WeakMap(), j = new WeakMap(), C = new WeakMap(), H = new WeakMap(), k = new WeakMap(), F = new WeakMap(), $ = new WeakMap(), i = new WeakSet(), It = async function() {
  const t = h(this, m);
  let { template: e } = t;
  e || (e = t.template = document.createElement("template"), e.innerHTML = t.buildHTML()), await le(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
}, Bt = function() {
  const t = h(this, m), { properties: e } = t;
  for (const [s, { computed: o }] of Object.entries(e))
    o && f(this, i, z).call(this, s, f(this, i, S).call(this, o));
}, Dt = function() {
  const t = h(this, m), { observedAttributes: e, properties: s } = t;
  for (const [o, n] of Object.entries(s))
    n.computed || f(this, i, ft).call(this, o, n, e);
  for (const [o, n] of Object.entries(s))
    n.computed && f(this, i, ft).call(this, o, n, e);
}, ft = function(t, e, s) {
  if (t === "class" || t === "style")
    throw new v(`"${t}" is a reserved property`);
  const o = g.getAttrName(t), n = this.hasAttribute(o);
  e.required && !n && f(this, i, w).call(this, this, o, "is a required attribute");
  let r = e.value;
  this.hasOwnProperty(t) && (r = this[t], delete this[t]);
  const { type: l } = e, p = l === Boolean ? r || n : s.includes(o) && n ? f(this, i, bt).call(this, t, o) : r ?? Pt(e), u = "#" + t;
  this[u] = p, e.computed && f(this, i, zt).call(this, t, e), Object.defineProperty(this, t, {
    enumerable: !0,
    get() {
      return this[u];
    },
    set(d) {
      e.computed && !h(this, L).has(t) && f(this, i, w).call(this, null, t, "is a computed property and cannot be set directly"), l === Number && typeof d == "string" && (d = nt(d));
      const b = this[u];
      if (d === b) return;
      f(this, i, Yt).call(this, t, l, d), this[u] = d;
      const E = h(this, $).get(t);
      E && Gt(E.state, E.stateProp, d), f(this, i, qt).call(this, t, l, d, o), h(this, N) || (f(this, i, Jt).call(this, t), f(this, i, mt).call(this, t)), f(this, i, Kt).call(this, t, d);
      const B = h(this, j)[t];
      B && this.setFormValue(B, String(d)), this.propertyChangedCallback(t, b, d), e.dispatch && this.dispatch("change", {
        tagName: this.localName,
        property: t,
        oldValue: b,
        value: d
      });
    }
  });
}, ht = function() {
  const t = this.hasAttribute("disabled"), e = Q(this.shadowRoot);
  for (const s of e)
    ae(s) && (s.disabled = t);
}, _t = function(t) {
  var s;
  const e = t instanceof g;
  for (const o of t.getAttributeNames()) {
    const n = t.getAttribute(o), r = f(this, i, dt).call(this, t, n);
    if (r) {
      const l = this[r];
      l === void 0 && f(this, i, J).call(this, t, o, r);
      let [p, u] = o.split(":");
      const d = g.getPropName(p), b = f(this, i, W).call(this, r);
      e && f(s = t, i, W).call(s, d) || (t[d] = l), p === "value" && (u ? (t["on" + u] === void 0 && f(this, i, w).call(this, t, o, "refers to an unsupported event name"), t.setAttribute(p, this[r])) : u = "change"), e && !b && h(t, F).set(
        g.getPropName(p),
        r
      );
    }
    f(this, i, q).call(this, n, t, o);
  }
}, lt = function(t) {
  for (const e of t) {
    const s = f(this, i, S).call(this, e), o = h(this, T).get(e) ?? [], n = /* @__PURE__ */ new Set();
    for (const r of o) {
      const l = r instanceof HTMLElement || r instanceof CSSStyleRule ? r : r.element;
      if (l instanceof HTMLElement && !l.isConnected) {
        n.add(r);
        continue;
      }
      if (r instanceof HTMLElement)
        f(this, i, gt).call(this, r, s);
      else if (!(r instanceof CSSStyleRule)) {
        const { element: p, attrName: u } = r;
        p instanceof CSSStyleRule ? p.style.setProperty(u, s) : rt(p, u, s);
      }
    }
    if (n.size > 0) {
      const r = o.filter((l) => !n.has(l));
      r.length === 0 ? h(this, T).delete(e) : h(this, T).set(e, r);
    }
  }
}, S = function(t) {
  const { context: e } = h(this, m);
  return new Function(
    "context",
    `const {${Object.keys(e).join(",")}} = context; return ${t};`
  ).call(this, e);
}, Vt = function(t) {
  const { localName: e } = t;
  if (e === "style") {
    const { sheet: s } = t, o = s?.cssRules ?? [], n = Array.from(o);
    for (const r of n)
      if (r.constructor === CSSStyleRule) {
        const l = Array.from(r.style);
        for (const p of l)
          if (p.startsWith("--")) {
            const u = r.style.getPropertyValue(p);
            f(this, i, q).call(this, u, r, p);
          }
      }
  } else {
    let s = "";
    if (_(t)) {
      f(this, i, q).call(this, t.textContent, t);
      const o = t.textContent?.match(ne);
      o && (s = o[1]);
    } else {
      const o = Array.from(t.childNodes).find(
        (n) => n.nodeType === Node.COMMENT_NODE
      );
      o && (s = o.textContent?.trim() ?? "");
    }
    if (s) {
      const o = f(this, i, dt).call(this, t, s);
      o && _(t) ? t.textContent = this[o] : f(this, i, q).call(this, s, t);
    }
  }
}, Wt = function(t, e, s) {
  if (s.length !== 1) return;
  const [o] = s;
  if (!ot.test(o)) return;
  const n = Et(t) || _(t);
  let [r, l] = (e ?? "").split(":");
  if (!(n && r === "value" || _(t))) return;
  l ? t["on" + l] === void 0 && f(this, i, w).call(this, t, e, "refers to an unsupported event name") : l = "change";
  const u = D(o);
  t.addEventListener(l, (d) => {
    const { target: b } = d;
    if (!b) return;
    const E = b.value, { type: B } = h(this, m).properties[u];
    this[u] = B === Number ? nt(E) : E, f(this, i, mt).call(this, u);
  });
}, R = function(t) {
  return Object.hasOwn(h(this, m), t);
}, V = function(t) {
  return !!h(this, m).properties[t];
}, W = function(t) {
  return !!h(this, m).properties[t]?.computed;
}, pt = function(t) {
  const e = Array.from(t.querySelectorAll("*"));
  for (const s of e)
    f(this, i, _t).call(this, s), s.firstElementChild || f(this, i, Vt).call(this, s);
}, // formAssociated is only needed when the component is inside a form.
ut = function() {
  if (h(this, m).formAssociated || this.closest("form") === null) return;
  const t = h(this, m).name;
  f(this, i, w).call(this, this, void 0, `inside form, class ${t} requires "static formAssociated = true;"`);
}, dt = function(t, e) {
  if (!e || !ot.test(e)) return;
  const s = D(e);
  return this[s] === void 0 && f(this, i, J).call(this, t, "", s), s;
}, mt = function(t) {
  const e = h(this, m).propToExprsMap.get(t) || [];
  f(this, i, lt).call(this, e);
}, zt = function(t, e) {
  const s = h(this, m), o = s.propToComputedMap;
  function n(p, u) {
    let d = o.get(p);
    d || (d = [], o.set(p, d)), d.push([t, u]);
  }
  const { computed: r } = e, l = r.match(it) || [];
  for (const p of l) {
    const u = D(p);
    this[u] === void 0 && f(this, i, J).call(this, null, t, u), typeof this[u] != "function" && n(u, r);
  }
  for (const p of r.matchAll(Ct)) {
    const u = p[1];
    if (typeof this[u] != "function")
      throw new v(
        `property ${t} computed calls non-method ${u}`
      );
    for (const [d, b] of Object.entries(s.properties))
      $t(b.usedBy)?.includes(u) && n(d, r);
  }
}, z = function(t, e) {
  h(this, L).add(t);
  try {
    this[t] = e;
  } finally {
    h(this, L).delete(t);
  }
}, // WARNING: Do not place untrusted JavaScript expressions
// in attribute values or the text content of elements!
q = function(t, e, s = void 0) {
  if (!t) return;
  const o = f(this, i, G).call(this, e, s, t);
  if (!o) {
    const p = t.replaceAll("this..", "this.");
    s ? rt(e, s, p) : "textContent" in e && (e.textContent = p);
    return;
  }
  const n = h(this, m);
  o.forEach((p) => {
    const u = D(p);
    if (typeof this[u] == "function") return;
    const d = n.propToExprsMap;
    let b = d.get(u);
    b || (b = [], d.set(u, b)), b.includes(t) || b.push(t);
  });
  for (const [p, u] of h(this, T).entries())
    for (const d of u) {
      const b = d instanceof HTMLElement || d instanceof CSSStyleRule ? d : d.element;
      b instanceof CSSStyleRule || b.isConnected || h(this, T).set(
        p,
        u.filter((E) => E !== d)
      );
    }
  let r = h(this, T).get(t);
  r || (r = [], h(this, T).set(t, r)), r.push(s ? { element: e, attrName: s } : e), e instanceof HTMLElement && f(this, i, Wt).call(this, e, s, o);
  const l = f(this, i, S).call(this, t);
  s ? rt(e, s, l) : f(this, i, gt).call(this, e, l);
}, w = function(t, e, s) {
  const o = t instanceof HTMLElement ? t.localName : "CSS rule";
  throw new v(
    `component ${h(this, m).elementName}` + (t ? `, element "${o}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${s}`
  );
}, J = function(t, e, s) {
  f(this, i, w).call(this, t, e, `refers to missing property "${s}"`);
}, bt = function(t, e) {
  return f(this, i, yt).call(this, t, this.getAttribute(e));
}, yt = function(t, e) {
  if (e?.match(it)) return e;
  const o = h(this, m).properties[t], { type: n, values: r } = o;
  if (n || f(this, i, w).call(this, null, t, "does not specify its type"), e === null)
    return n === Boolean ? !1 : Pt(o);
  if (n === String) {
    if (r && !r.includes(e)) {
      const l = r.map((p) => `"${p}"`).join(", ");
      f(this, i, w).call(this, null, t, `must be one of ${l}`);
    }
    return e;
  }
  if (n === Number) return nt(e);
  if (n === Boolean) {
    if (e === "true") return !0;
    if (e === "false" || e === "null") return !1;
    const l = g.getAttrName(t);
    return e && e !== l && f(this, i, w).call(this, null, t, "is a Boolean attribute, so its value must match attribute name or be missing"), e === "" || e === l;
  }
}, // Updates the matching attribute for a property.
// VS Code thinks this is never called, but it is called by #defineProp.
qt = function(t, e, s, o) {
  if (Y(s) && !f(this, i, W).call(this, t)) {
    const n = e === Boolean ? this.hasAttribute(o) : f(this, i, bt).call(this, t, o);
    s !== n && Ft(this, o || t, s);
  }
}, // Updates all computed properties that reference this property.
// VS Code thinks this is never called, but it is called by #defineProp.
Jt = function(t) {
  const s = h(this, m).propToComputedMap.get(t) || [];
  for (const [o, n] of s)
    f(this, i, z).call(this, o, f(this, i, S).call(this, n));
}, gt = function(t, e) {
  if (e === void 0) return;
  const s = t instanceof HTMLElement;
  Array.isArray(e) && (e = e.join(""));
  const o = typeof e;
  o !== "string" && o !== "number" && f(this, i, w).call(this, t, void 0, " computed content is not a string or number");
  const n = String(e);
  if (t instanceof HTMLElement && _(t))
    t.value = n;
  else if (s && o === "string" && n.trim().startsWith("<")) {
    const r = te(n);
    t.innerHTML = r, f(this, i, wt).call(this, t), f(this, i, pt).call(this, t);
  } else s && (t.textContent = n);
}, // Update corresponding parent web component property if bound to one.
// VS Code thinks this is never called, but it is called by #defineProp.
Kt = function(t, e) {
  const s = h(this, F).get(t);
  if (!s) return;
  const o = this.getRootNode();
  if (!(o instanceof ShadowRoot)) return;
  const { host: n } = o;
  if (!n) return;
  const r = n;
  r[s] = e;
}, // This adds expressions to the expressions arrays in propToExprsMap
// that contain calls to methods listed the usedBy array or each property.
Xt = function() {
  const t = h(this, m);
  function e() {
    const n = /* @__PURE__ */ new Map();
    t.methodToExprsMap = n;
    const r = Array.from(h(this, T).keys());
    for (const l of r)
      for (const p of l.matchAll(Ct)) {
        const u = p[1];
        let d = n.get(u);
        d || (d = [], n.set(u, d)), d.includes(l) || d.push(l);
      }
  }
  const { properties: s, propToExprsMap: o } = t;
  for (const [n, r] of Object.entries(s)) {
    const l = $t(r.usedBy);
    if (!l) continue;
    t.methodToExprsMap || e.call(this);
    const { methodToExprsMap: p } = t;
    let u = o.get(n);
    u || (u = [], o.set(n, u));
    for (const d of l) {
      if (typeof this[d] != "function")
        throw new v(
          `property ${n} usedBy contains non-method ${d}`
        );
      const b = p.get(d) || [];
      for (const E of b)
        u.includes(E) || u.push(E);
    }
  }
}, Ut = function() {
  const t = new Set(Object.keys(h(this, m).properties));
  for (const e of this.getAttributeNames())
    if (!ee.has(e) && !e.startsWith("on")) {
      if (e === "form-assoc") {
        f(this, i, ut).call(this);
        continue;
      }
      if (!t.has(g.getPropName(e))) {
        if (e === "name") {
          f(this, i, ut).call(this);
          continue;
        }
        f(this, i, w).call(this, null, e, "is not a supported attribute");
      }
    }
}, G = function(t, e, s) {
  const o = s.match(it);
  if (o)
    return o.forEach((n) => {
      const r = D(n);
      this[r] === void 0 && f(this, i, J).call(this, t, e, r);
    }), o;
}, Zt = function(t, e) {
  for (const [s, o] of Object.entries(e)) {
    let n = St(t, s);
    n === void 0 && f(this, i, w).call(this, this, void 0, `invalid state path "${s}"`), n = this[o], f(this, i, V).call(this, o) || f(this, i, w).call(this, null, o, "refers to missing property in useState map");
  }
}, // When type is an array, this can't validate the type of the array elements.
// This is called by #defineProp.
Yt = function(t, e, s) {
  const { values: o } = h(this, m).properties[t];
  if (o) {
    let r;
    e !== String ? r = "declares allowed values, but its type is not String" : typeof s != "string" ? r = `value is a ${typeof s}, but type is String` : o.includes(s) || (r = `must be one of ${o.map((p) => `"${p}"`).join(", ")}`), r && f(this, i, w).call(this, null, t, r);
  }
  if (s instanceof e) return;
  let n = typeof s;
  if (n === "object") {
    const { constructor: r } = s;
    n = r.name, r !== e && f(this, i, w).call(this, null, t, `was set to a ${n}, but must be a ${e.name}`);
  }
  n !== e.name.toLowerCase() && f(this, i, w).call(this, null, t, `was set to a ${n}, but must be a ${e.name}`);
}, wt = function(t) {
  const e = Array.from(t.querySelectorAll("*"));
  for (const s of e) {
    const o = [];
    for (const n of Array.from(s.attributes)) {
      const r = n.name;
      if (r.startsWith("on")) {
        let l = r.slice(2);
        l = l[0].toLowerCase() + l.slice(1).toLowerCase();
        const p = n.value;
        f(this, i, G).call(this, s, r, p);
        let u;
        typeof this[p] == "function" ? u = (d) => this[p](d) : (f(this, i, G).call(this, s, r, p), u = () => f(this, i, S).call(this, p)), s.addEventListener(l, u), o.push(r);
      }
    }
    for (const n of o)
      s.removeAttribute(n);
  }
}, g.attrToPropMap = /* @__PURE__ */ new Map(), g.propToAttrMap = /* @__PURE__ */ new Map(), g.context = {}, g.css = "", g.elementName = "", g.formAssociated = !1, g.html = "", g.template = null;
let K = g;
function be(c, ...a) {
  let t = Ht(c, a);
  for (; ; ) {
    const e = oe.exec(t);
    if (!e) break;
    const s = e[2];
    if (jt.test(s)) {
      const o = e[1];
      if (!o.startsWith("--")) {
        const n = `--${o}: ${s};
      ${o}: var(--${o})`;
        t = kt(t, e.index, e[0].length, n);
      }
    }
  }
  return t;
}
function ye(c, ...a) {
  let t = Ht(c, a);
  for (; ; ) {
    const e = re.exec(t);
    if (!e || e[1] === "style") break;
    const s = he(e[2]);
    if (jt.test(s)) {
      const o = `<!-- ${s.trim()} -->`, n = e.index + e[0].indexOf(">") + 1;
      t = kt(t, n, s.length, o);
    }
  }
  return t;
}
export {
  K as Wrec,
  ct as WrecState,
  me as createElement,
  be as css,
  ye as html
};

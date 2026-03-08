var K = (r) => {
  throw TypeError(r);
};
var D = (r, t, e) => t.has(r) || K("Cannot " + e);
var p = (r, t, e) => (D(r, t, "read from private field"), e ? e.call(r) : t.get(r)), E = (r, t, e) => t.has(r) ? K("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), M = (r, t, e, s) => (D(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e), Z = (r, t, e) => (D(r, t, "access private method"), e);
import { HTMLElement as nt, NodeType as F, parse as rt, TextNode as ct } from "node-html-parser";
import X from "xss";
function G(r, t, e = "") {
  const s = /* @__PURE__ */ new WeakMap(), o = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(i, n) {
      const c = Reflect.get(i, n);
      if (c === null || typeof c != "object") return c;
      const a = s.get(c);
      if (a) return a;
      const f = e ? `${e}.${n}` : n, l = G(c, t, f);
      return s.set(c, l), l;
    },
    // Intercept property writes.
    set(i, n, c) {
      const a = Reflect.get(i, n);
      if (a !== c) {
        Reflect.set(i, n, c);
        const f = e ? `${e}.${n}` : n;
        t(f, a, c);
      }
      return !0;
    }
  };
  return new Proxy(r, o);
}
function Q(r) {
  const t = {};
  for (const [e, s] of Object.entries(r)) {
    const o = typeof s == "object" && s !== null;
    t[e] = o ? Q(s) : s;
  }
  return t;
}
const O = typeof window < "u" && typeof window.document < "u";
let U = class extends Error {
};
var T, H, m, N, $, w, _, tt;
const A = class A {
  constructor(t, e, s) {
    E(this, _);
    E(this, H, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    E(this, m, []);
    E(this, N);
    E(this, $);
    E(this, w);
    if (!t) throw new U("name cannot be empty");
    if (p(A, T).has(t))
      throw new U(`WrecState with name "${t}" already exists`);
    if (M(this, N, t), M(this, $, e), M(this, w, G({}, Z(this, _, tt).bind(this))), e && O) {
      const o = sessionStorage.getItem("wrec-state-" + t), i = o ? JSON.parse(o) : void 0;
      i && (s = i);
    }
    if (s)
      for (const [o, i] of Object.entries(s))
        this.addProperty(o, i);
    p(A, T).set(t, this);
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
  static get(t) {
    return p(this, T).get(t);
  }
  /**
   * @param listener - object that has a "changed" method
   * @param map - map from state property paths to component properties
   */
  addListener(t, e = {}) {
    const s = p(this, m).find(
      (o) => o.listenerRef.deref() === t
    );
    if (s) {
      const { propertyMap: o } = s;
      for (const [i, n] of Object.entries(e))
        o[i] = n;
    } else
      p(this, m).push({
        listenerRef: new WeakRef(t),
        propertyMap: e
      });
  }
  addProperty(t, e) {
    Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return p(this, w)[t];
      },
      set(s) {
        p(this, w)[t] = s;
      }
    }), p(this, w)[t] = e;
  }
  get id() {
    return p(this, H);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", p(this, N));
    for (const [t, e] of Object.entries(p(this, w)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    M(this, m, p(this, m).filter((e) => e.listenerRef.deref() !== t));
  }
};
T = new WeakMap(), H = new WeakMap(), m = new WeakMap(), N = new WeakMap(), $ = new WeakMap(), w = new WeakMap(), _ = new WeakSet(), tt = function(t, e, s) {
  const o = /* @__PURE__ */ new Set();
  for (const i of p(this, m)) {
    const n = i.listenerRef.deref();
    if (!n)
      o.add(i);
    else if (O && n instanceof HTMLElement && !n.isConnected)
      o.add(i);
    else {
      const { propertyMap: c } = i, a = Object.keys(c);
      (a.length === 0 || a.includes(t)) && n.changed(
        t,
        c[t],
        s,
        e,
        this
      );
    }
  }
  M(this, m, p(this, m).filter(
    (i) => !o.has(i)
  ));
}, E(A, T, /* @__PURE__ */ new Map()), O && window.addEventListener("beforeunload", () => {
  for (const [t, e] of p(A, T).entries())
    if (p(e, $)) {
      const s = Q(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(s));
    }
});
let z = A;
O && process.env.NODE_ENV === "development" && (window.WrecState = z);
function Y(r, t) {
  let e = r;
  for (const s of t.split("."))
    e = e[s];
  return e;
}
function at(r, t, e) {
  const s = t.split("."), o = s.length - 1;
  let i = r;
  s.forEach((n, c) => {
    c === o ? i[n] = e : i = i[n];
  });
}
const ft = /* @__PURE__ */ new Set(["input", "label", "option", "th"]);
function lt(r) {
  const t = {
    allowCommentTag: !0,
    onTag: (o, i) => {
      if (ft.has(o)) return i;
    },
    onTagAttr(o, i, n) {
      if (i.startsWith("on")) return "";
    },
    safeAttrValue(o, i, n) {
      return i === "class" || o === "a" && i === "href" && !n.startsWith("javascript") || o === "img" && i === "src" ? n : "";
    },
    stripIgnoreTagBody: ["script", "style", "iframe"],
    whiteList: {
      ...X.getDefaultWhiteList(),
      label: ["class", "for"],
      span: ["class"]
    }
  }, e = [];
  r = r.replace(/<!--[\s\S]*?-->/g, (o) => {
    const i = `__COMMENT_${e.length}__`;
    return e.push(o), i;
  });
  let s = X(r, t);
  return s = s.replace(/__COMMENT_(\d+)__/g, (o, i) => e[i]), s;
}
const ht = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]);
typeof window > "u" && (global.HTMLElement = nt, global.customElements = {
  get: (r) => {
  },
  getName: () => "",
  define: () => {
  },
  upgrade: () => {
  },
  whenDefined: () => Promise.reject()
});
class x extends Error {
}
const ut = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, et = "a-zA-Z_$", pt = et + "0-9", P = `[${et}][${pt}]*`, dt = /<!--\s*(.*?)\s*-->/, mt = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, V = new RegExp(`^this\\.${P}$`), I = new RegExp(`this\\.${P}(\\.${P})*`, "g"), L = new RegExp(`this\\.${P}(\\.${P})*`), bt = 5;
function gt(r) {
  return r instanceof HTMLButtonElement || r instanceof HTMLFieldSetElement || r instanceof HTMLInputElement || r instanceof HTMLSelectElement || r instanceof HTMLTextAreaElement || r instanceof b;
}
function St(r, t, e) {
  const s = document.createElement(r);
  if (t)
    for (const [o, i] of Object.entries(t))
      s.setAttribute(o, i);
  return e && (s.innerHTML = e), s;
}
const yt = (r) => r === String ? "" : r === Number ? 0 : r === Boolean ? !1 : r === Array ? [] : r === Object ? {} : void 0;
function j(r) {
  const t = [];
  let e = r.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...j(e.shadowRoot)), e.firstElementChild && t.push(...j(e)), e = e.nextElementSibling;
  return t;
}
const S = (r) => r.substring(bt).split(".")[0];
function st(r, t) {
  let e = r[0];
  return t.forEach((s, o) => {
    e += s + r[o + 1];
  }), e;
}
function q(r) {
  const t = typeof r;
  return t === "string" || t === "number" || t === "boolean";
}
function C(r) {
  return r.localName === "textarea";
}
function J(r) {
  const { localName: t } = r;
  return t === "input" || t === "select";
}
const Et = (r) => r.replace(/<!--[\s\S]*?-->/g, "");
function ot(r, t, e, s) {
  return r.slice(0, t) + s + r.slice(t + e);
}
function W(r) {
  const t = Number(r);
  if (isNaN(t)) throw new x(`can't convert "${r}" to a number`);
  return t;
}
function it(r, t, e) {
  const [s, o] = t.split(":");
  if (q(e))
    if (typeof e == "boolean") {
      e ? r.setAttribute(s, s) : r.removeAttribute(s);
      const i = b.getPropName(s);
      r[i] = e;
    } else {
      const i = r.getAttribute(t), n = String(e);
      i !== n && (r.setAttribute(s, n), s === "value" && J(r) && (r.value = n));
    }
  else {
    const i = b.getPropName(t);
    r[i] = e;
  }
}
function B(r, t, e) {
  const [s, o] = t.split(":");
  r instanceof CSSStyleRule ? r.style.setProperty(s, e) : (it(r, s, e), s === "value" && J(r) && (r.value = e));
}
async function wt(r) {
  const t = /* @__PURE__ */ new Set();
  for (const s of j(r.content)) {
    const { localName: o } = s;
    o.includes("-") && t.add(o);
  }
  function e(s) {
    return new Promise((o, i) => {
      setTimeout(() => {
        const n = `custom element <${s}> not defined`;
        i(new Error(n));
      }, 1e3);
    });
  }
  return Promise.all(
    [...t].map(
      async (s) => Promise.race([customElements.whenDefined(s), e(s)])
    )
  );
}
class b extends HTMLElement {
  // There is one instance of `attrToPropMap`, `properties`, `propToAttrMap`,
  // `propToComputedMap`, and `propToExprsMap` per Wrec subclass,
  // not one for only the Wrec class.
  // The instances created here are not used.
  // Subclass-specific instances are created in the constructor.
  // This is used to lookup the camelCase property name
  // that corresponds to a kebab-case attribute name.
  static attrToPropMap = /* @__PURE__ */ new Map();
  // This is used to lookup the kebab-case attribute name
  // that corresponds to a camelCase property name.
  static propToAttrMap = /* @__PURE__ */ new Map();
  // This can be overridden in each Wrec subclass.
  // It lists all the module-level functions
  // that be used in JavaScript expressions.
  static context = {};
  // This can be set in each Wrec subclass.
  // It describes CSS rules that a web component uses.
  static css = "";
  static elementName = "";
  // Set this to true in Wrec subclasses that need
  // the ability to contribute data to form submissions.
  static formAssociated = !1;
  // This must be set in each Wrec subclass.
  // It describes HTML that a web component renders.
  static html = "";
  // This must be set in each Wrec subclass.
  // It describes all the properties that a web component supports.
  static properties;
  // This is a map from properties to arrays of
  // computed property expressions that use the property.
  // It is used to update computed properties
  // when the properties on which they depend are modified.
  // See the method #updateComputedProperties.
  // This map cannot be private.
  static propToComputedMap;
  // This is a map from properties to expressions that refer to them.
  // It is the sma for all instances of a component.
  // This map cannot be private.
  static propToExprsMap;
  static template = null;
  // This is true while the batchSet method is running.
  #a = !1;
  #t = this.constructor;
  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #o = /* @__PURE__ */ new Map();
  #f = {};
  #i;
  // For components that set `formAssociated` to true,
  // this stores in the initial value of each property
  // in the formAssociatedCallback method
  // so they can be restored in the formResetCallback method.
  #l = {};
  #h = null;
  // This is a map from properties in this web component
  // to corresponding properties in a parent web component.
  // This must be an instance property because
  // each component instance can have its properties mapped
  // to the properties of different parent components.
  // This is used to update a parent property
  // when the corresponding child property value changes.
  #u = /* @__PURE__ */ new Map();
  static define(t) {
    if (this.elementName = t, customElements.get(t))
      throw new x(`custom element ${t} is already defined`);
    customElements.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.attrToPropMap || (t.attrToPropMap = /* @__PURE__ */ new Map()), t.properties || (t.properties = {}), t.propToAttrMap || (t.propToExprsMap = /* @__PURE__ */ new Map()), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, s) {
    t === "disabled" && this.#m();
    const o = b.getPropName(t);
    if (this.#n(o)) {
      const i = this.#M(o, String(s));
      this[o] = i;
      const n = this.#f[o];
      n && this.setFormValue(n, String(i)), this.propertyChangedCallback(o, e, s);
    }
  }
  // This applies multiple property changes and only updates
  // the affected parts of the DOM after all of them are made.
  batchSet(t) {
    this.#a = !0;
    const e = this.#t.propToExprsMap, s = /* @__PURE__ */ new Set();
    for (const [c, a] of Object.entries(t)) {
      this[c] = a;
      const f = e.get(c) ?? [];
      for (const l of f)
        s.add(l);
    }
    const o = this.#t.propToComputedMap, i = /* @__PURE__ */ new Set(), n = {};
    for (const c of Object.keys(t)) {
      const a = o.get(c) || [];
      for (const [f, l] of a)
        i.add(f), n[f] = l;
    }
    for (const c of i) {
      const a = n[c];
      this[c] = this.#s(a);
      const f = e.get(c) ?? [];
      for (const l of f)
        s.add(l);
    }
    for (; ; ) {
      let c = !1;
      for (const a of i) {
        const f = n[a], l = this.#s(f), u = this[a];
        JSON.stringify(l) !== JSON.stringify(u) && (this[a] = l, c = !0);
      }
      if (!c) break;
    }
    this.#b([...s]), this.#a = !1;
  }
  async #S() {
    const t = this.#t;
    let { template: e } = t;
    e || (e = t.template = document.createElement("template"), e.innerHTML = t.buildHTML()), await wt(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  static buildHTML() {
    let t = `<style>
    :host([hidden]) { display: none; }`;
    this.css && (t += this.css), t += `</style>
`;
    let e = this.html.trim();
    if (!e) throw new x("static property html must be set");
    return e.startsWith("<") || (e = `<span><!--${e}--></span>`), t + e;
  }
  changed(t, e, s) {
    this[e] = s;
  }
  connectedCallback() {
    this.#H(), this.#x(), this.#S().then(() => {
      this.hasAttribute("disabled") && this.#m(), this.#v(this.shadowRoot), this.#g(this.shadowRoot), this.#C();
    });
  }
  #C() {
    const t = this.#t, { properties: e } = t;
    for (const [s, { computed: o }] of Object.entries(e))
      o && (this[s] = this.#s(o));
  }
  #x() {
    const t = this.#t, { observedAttributes: e, properties: s } = t;
    for (const [o, i] of Object.entries(s))
      i.computed || this.#d(o, i, e);
    for (const [o, i] of Object.entries(s))
      i.computed && this.#d(o, i, e);
  }
  #d(t, e, s) {
    if (t === "class" || t === "style")
      throw new x(`"${t}" is a reserved property`);
    const o = b.getAttrName(t), i = this.hasAttribute(o);
    e.required && !i && this.#e(this, o, "is a required attribute");
    let n = e.value;
    this.hasOwnProperty(t) && (n = this[t], delete this[t]);
    const { type: c } = e, a = c === Boolean ? n || i : s.includes(o) && i ? this.#T(t, o) : n || yt(c), f = "#" + t;
    this[f] = a, e.computed && this.#R(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[f];
      },
      set(l) {
        c === Number && typeof l == "string" && (l = W(l));
        const u = this[f];
        if (l === u) return;
        this.#k(t, c, l), this[f] = l;
        const { state: h, stateProp: d } = this.#t.properties[t];
        d && at(h, d, l), this.#O(t, c, l, o), this.#a || (this.#L(t), this.#w(t)), this.#j(t, l);
        const g = this.#f[t];
        g && this.setFormValue(g, String(l)), this.propertyChangedCallback(t, u, l), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: u,
          value: l
        });
      }
    });
  }
  #m() {
    const t = this.hasAttribute("disabled"), e = j(this.shadowRoot);
    for (const s of e)
      gt(s) && (s.disabled = t);
  }
  disconnectedCallback() {
    this.#o.clear(), this.#l.clear(), this.#u.clear();
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
  #P(t) {
    const e = t instanceof b;
    for (const s of t.getAttributeNames()) {
      const o = t.getAttribute(s), i = this.#E(t, o);
      if (i) {
        const n = this[i];
        n === void 0 && this.#c(t, s, i), t[i] = n;
        let [c, a] = s.split(":");
        c === "value" && (a ? (t["on" + a] === void 0 && this.#e(t, s, "refers to an unsupported event name"), t.setAttribute(c, this[i])) : a = "change"), e && t.#u.set(
          b.getPropName(c),
          i
        );
      }
      this.#r(o, t, s);
    }
  }
  #b(t) {
    for (const e of t) {
      const s = this.#s(e), o = this.#o.get(e) ?? [];
      for (const i of o)
        if (i instanceof HTMLElement)
          this.#A(i, s);
        else if (!(i instanceof CSSStyleRule)) {
          const { element: n, attrName: c } = i;
          n instanceof CSSStyleRule ? n.style.setProperty(c, s) : B(n, c, s);
        }
    }
  }
  #s(t) {
    const { context: e } = this.#t;
    return new Function(
      "context",
      `const {${Object.keys(e).join(",")}} = context; return ${t};`
    ).call(this, e);
  }
  #N(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: s } = t, o = s?.cssRules ?? [], i = Array.from(o);
      for (const n of i)
        if (n.constructor === CSSStyleRule) {
          const c = Array.from(n.style);
          for (const a of c)
            if (a.startsWith("--")) {
              const f = n.style.getPropertyValue(a);
              this.#r(f, n, a);
            }
        }
    } else {
      let s = "";
      if (C(t)) {
        this.#r(t.textContent, t);
        const o = t.textContent?.match(dt);
        o && (s = o[1]);
      } else {
        const o = Array.from(t.childNodes).find(
          (i) => i.nodeType === F.COMMENT_NODE
        );
        o && (s = o.textContent?.trim() ?? "");
      }
      if (s) {
        const o = this.#E(t, s);
        o && C(t) ? t.textContent = this[o] : this.#r(s, t);
      }
    }
  }
  // This method is called automatically if
  // the component is nested in form element AND
  // the static property formAssociated is true.
  // It does things that are only necessary in that situation.
  formAssociatedCallback() {
    let t = this.getAttribute("form-assoc");
    if (!t) {
      const n = this.getAttribute("name");
      if (n)
        if (this.#n("value"))
          t = `value:${n}`;
        else
          return;
      else
        return;
    }
    const e = {}, s = t.split(",");
    for (const n of s) {
      const [c, a] = n.split(":");
      e[c.trim()] = a.trim();
    }
    this.#f = e, this.#i = new FormData(), this.#h = this.attachInternals(), this.#h.setFormValue(this.#i);
    const o = Object.keys(this.#t.properties), i = this.#l;
    for (const n of o)
      i[n] = this[n];
  }
  formResetCallback() {
    const t = this.#l;
    for (const e of Object.keys(t)) {
      let s = t[e];
      V.test(s) && (s = this.#s(s)), this[e] = s;
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
  #$(t, e, s) {
    if (s.length !== 1) return;
    const [o] = s;
    if (!V.test(o)) return;
    const i = J(t) || C(t);
    let [n, c] = (e ?? "").split(":");
    if (!(i && n === "value" || C(t))) return;
    c ? t["on" + c] === void 0 && this.#e(t, e, "refers to an unsupported event name") : c = "change";
    const f = S(o);
    t.addEventListener(c, (l) => {
      const { target: u } = l;
      if (!u) return;
      const h = u.value, { type: d } = this.#t.properties[f];
      this[f] = d === Number ? W(h) : h, this.#w(f);
    });
  }
  #n(t) {
    return !!this.#t.properties[t];
  }
  #g(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e)
      this.#P(s), s.firstElementChild || this.#N(s);
  }
  // formAssociated is only needed when the component is inside a form.
  #y() {
    if (this.#t.formAssociated || this.closest("form") === null) return;
    const t = this.#t.name;
    this.#e(
      this,
      void 0,
      `inside form, class ${t} requires "static formAssociated = true;"`
    );
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(
      (e) => b.getAttrName(e)
    );
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, s) {
  }
  #E(t, e) {
    if (!e || !V.test(e)) return;
    const s = S(e);
    return this[s] === void 0 && this.#c(t, "", s), s;
  }
  #w(t) {
    const e = this.#t.propToExprsMap.get(t) || [];
    this.#b(e);
  }
  #R(t, e) {
    const { computed: s, uses: o } = e, i = this.#t.propToComputedMap;
    function n(a, f) {
      let l = i.get(a);
      l || (l = [], i.set(a, l)), l.push([t, f]);
    }
    const c = s.match(I) || [];
    for (const a of c) {
      const f = S(a);
      this[f] === void 0 && this.#c(null, t, f), typeof this[f] != "function" && n(f, s);
    }
    if (o)
      for (const a of o.split(","))
        n(a.trim(), s);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #r(t, e, s = void 0) {
    if (!t) return;
    const o = this.#p(e, s, t);
    if (!o) {
      const a = t.replaceAll("this..", "this.");
      s ? B(e, s, a) : "textContent" in e && (e.textContent = a);
      return;
    }
    const i = this.#t;
    o.forEach((a) => {
      const f = S(a);
      if (typeof this[f] == "function") return;
      const l = i.propToExprsMap;
      let u = l.get(f);
      u || (u = [], l.set(f, u)), u.includes(t) || u.push(t);
    });
    for (const [a, f] of this.#o.entries())
      for (const l of f) {
        const u = l instanceof HTMLElement || l instanceof CSSStyleRule ? l : l.element;
        u instanceof CSSStyleRule || u.isConnected || this.#o.set(
          a,
          f.filter((h) => h !== l)
        );
      }
    let n = this.#o.get(t);
    n || (n = [], this.#o.set(t, n)), n.push(s ? { element: e, attrName: s } : e), e instanceof HTMLElement && this.#$(e, s, o);
    const c = this.#s(t);
    s ? B(e, s, c) : this.#A(e, c);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !q(e) || (this.#i.set(t, e), this.#h?.setFormValue(this.#i));
  }
  static ssr(t = {}) {
    let e = "";
    const s = Object.keys(t);
    s.sort();
    for (const h of s) {
      const d = this.getAttrName(h);
      e += ` ${d}="${t[h]}"`;
    }
    const o = this.properties;
    for (const [h, d] of Object.entries(o))
      if (t[h] === void 0) {
        const { value: g } = d;
        g !== void 0 && (t[h] = g);
      }
    function i(h) {
      return new Function("return " + h).call(t);
    }
    function n(h) {
      const { attributes: d } = h;
      for (const [y, R] of Object.entries(d))
        if (L.test(R)) {
          const v = i(R), k = o[y].value;
          v === k ? h.removeAttribute(y) : h.setAttribute(y, v);
        }
      const { childNodes: g } = h;
      g.forEach((y, R) => {
        if (y.nodeType === F.ELEMENT_NODE)
          n(y);
        else if (y.nodeType === F.COMMENT_NODE) {
          const v = y.textContent ?? "";
          if (L.test(v)) {
            const k = i(v);
            g[R] = new ct(k);
          }
        }
      });
    }
    const c = this.buildHTML(), a = rt(c, { comment: !0 }), { children: f } = a;
    f.forEach(n);
    const l = f.map((h) => h.outerHTML).join(`
`), { elementName: u } = this;
    return `
      <${u}${e}>
        <template shadowrootmode="open">
          ${l}
        </template>
      </${u}>
    `;
  }
  #e(t, e, s) {
    const o = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new x(
      `component ${this.#t.elementName}` + (t ? `, element "${o}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${s}`
    );
  }
  #c(t, e, s) {
    this.#e(t, e, `refers to missing property "${s}"`);
  }
  #T(t, e) {
    return this.#M(t, this.getAttribute(e));
  }
  #M(t, e) {
    if (e?.match(I)) return e;
    const s = this.#t, { type: o } = s.properties[t];
    if (o || this.#e(null, t, "does not specify its type"), o === String) return e;
    if (o === Number) return W(e);
    if (o === Boolean)
      return e === "true" ? !0 : e === "false" || e === "null" ? !1 : (e && e !== t && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === t);
  }
  // Updates the matching attribute for a property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #O(t, e, s, o) {
    if (q(s)) {
      const i = e === Boolean ? this.hasAttribute(o) : this.#T(t, o);
      s !== i && it(this, o || t, s);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #L(t) {
    const s = this.#t.propToComputedMap.get(t) || [];
    for (const [o, i] of s)
      this[o] = this.#s(i);
  }
  #A(t, e) {
    if (e === void 0) return;
    const s = t instanceof HTMLElement;
    Array.isArray(e) && (e = e.join(""));
    const o = typeof e;
    o !== "string" && o !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    );
    const i = String(e);
    if (t instanceof HTMLElement && C(t))
      t.value = i;
    else if (s && o === "string" && i.trim().startsWith("<")) {
      const n = lt(i);
      t.innerHTML = n, this.#v(t), this.#g(t);
    } else s && (t.textContent = i);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #j(t, e) {
    const s = this.#u.get(t);
    if (!s) return;
    const o = this.getRootNode();
    if (!(o instanceof ShadowRoot)) return;
    const { host: i } = o;
    if (!i) return;
    const n = i;
    n[s] = e;
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
    this.#_(t, e);
    for (const [s, o] of Object.entries(e))
      if (this.#n(o)) {
        const i = Y(t, s);
        i !== void 0 && (this[o] = i);
        const n = this.#t.properties[o];
        n.state = t, n.stateProp = s;
      }
    t.addListener(this, e);
  }
  #H() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!ht.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#y();
          continue;
        }
        if (!t.has(b.getPropName(e))) {
          if (e === "name") {
            this.#y();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #p(t, e, s) {
    const o = s.match(I);
    if (o)
      return o.forEach((i) => {
        const n = S(i);
        this[n] === void 0 && this.#c(t, e, n);
      }), o;
  }
  #_(t, e) {
    for (const [s, o] of Object.entries(e)) {
      let i = Y(t, s);
      i === void 0 && this.#e(this, void 0, `invalid state path "${s}"`), i = this[o], this.#n(o) || this.#e(
        null,
        o,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #k(t, e, s) {
    if (s instanceof e) return;
    let o = typeof s;
    if (o === "object") {
      const { constructor: i } = s;
      o = i.name, i !== e && this.#e(
        null,
        t,
        `was set to a ${o}, but must be a ${e.name}`
      );
    }
    o !== e.name.toLowerCase() && this.#e(
      null,
      t,
      `was set to a ${o}, but must be a ${e.name}`
    );
  }
  #v(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e) {
      const o = [];
      for (const i of Array.from(s.attributes)) {
        const n = i.name;
        if (n.startsWith("on")) {
          let c = n.slice(2);
          c = c[0].toLowerCase() + c.slice(1).toLowerCase();
          const a = i.value;
          this.#p(s, n, a);
          let f;
          typeof this[a] == "function" ? f = (l) => this[a](l) : (this.#p(s, n, a), f = () => this.#s(a)), s.addEventListener(c, f), o.push(n);
        }
      }
      for (const i of o)
        s.removeAttribute(i);
    }
  }
}
function Ct(r, ...t) {
  let e = st(r, t);
  for (; ; ) {
    const s = ut.exec(e);
    if (!s) break;
    const o = s[2];
    if (L.test(o)) {
      const i = s[1];
      if (!i.startsWith("--")) {
        const n = `--${i}: ${o};
      ${i}: var(--${i})`;
        e = ot(e, s.index, s[0].length, n);
      }
    }
  }
  return e;
}
function xt(r, ...t) {
  let e = st(r, t);
  for (; ; ) {
    const s = mt.exec(e);
    if (!s || s[1] === "style") break;
    const o = Et(s[2]);
    if (L.test(o)) {
      const i = `<!-- ${o.trim()} -->`, n = s.index + s[0].indexOf(">") + 1;
      e = ot(e, n, o.length, i);
    }
  }
  return e;
}
export {
  b as Wrec,
  z as WrecState,
  St as createElement,
  Ct as css,
  xt as html
};

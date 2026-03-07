var W = (n) => {
  throw TypeError(n);
};
var L = (n, t, e) => t.has(n) || W("Cannot " + e);
var u = (n, t, e) => (L(n, t, "read from private field"), e ? e.call(n) : t.get(n)), b = (n, t, e) => t.has(n) ? W("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), w = (n, t, e, s) => (L(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), B = (n, t, e) => (L(n, t, "access private method"), e);
import J from "dompurify";
import { parseHTML as K } from "linkedom";
function U(n, t, e = "") {
  const s = /* @__PURE__ */ new WeakMap(), o = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(i, r) {
      const c = Reflect.get(i, r);
      if (c === null || typeof c != "object") return c;
      const f = s.get(c);
      if (f) return f;
      const a = e ? `${e}.${r}` : r, l = U(c, t, a);
      return s.set(c, l), l;
    },
    // Intercept property writes.
    set(i, r, c) {
      const f = Reflect.get(i, r);
      if (f !== c) {
        Reflect.set(i, r, c);
        const a = e ? `${e}.${r}` : r;
        t(a, f, c);
      }
      return !0;
    }
  };
  return new Proxy(n, o);
}
function Z(n) {
  const t = {};
  for (const [e, s] of Object.entries(n)) {
    const o = typeof s == "object" && s !== null;
    t[e] = o ? Z(s) : s;
  }
  return t;
}
const N = typeof window < "u" && typeof window.document < "u";
let q = class extends Error {
};
var g, R, p, v, C, y, O, G;
const E = class E {
  constructor(t, e, s) {
    b(this, O);
    b(this, R, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    b(this, p, []);
    b(this, v);
    b(this, C);
    b(this, y);
    if (!t) throw new q("name cannot be empty");
    if (u(E, g).has(t))
      throw new q(`WrecState with name "${t}" already exists`);
    if (w(this, v, t), w(this, C, e), w(this, y, U({}, B(this, O, G).bind(this))), e && N) {
      const o = sessionStorage.getItem("wrec-state-" + t), i = o ? JSON.parse(o) : void 0;
      i && (s = i);
    }
    if (s)
      for (const [o, i] of Object.entries(s))
        this.addProperty(o, i);
    u(E, g).set(t, this);
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
    return u(this, g).get(t);
  }
  /**
   * @param listener - object that has a "changed" method
   * @param map - map from state property paths to component properties
   */
  addListener(t, e = {}) {
    const s = u(this, p).find(
      (o) => o.listenerRef.deref() === t
    );
    if (s) {
      const { propertyMap: o } = s;
      for (const [i, r] of Object.entries(e))
        o[i] = r;
    } else
      u(this, p).push({
        listenerRef: new WeakRef(t),
        propertyMap: e
      });
  }
  addProperty(t, e) {
    Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return u(this, y)[t];
      },
      set(s) {
        u(this, y)[t] = s;
      }
    }), u(this, y)[t] = e;
  }
  get id() {
    return u(this, R);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", u(this, v));
    for (const [t, e] of Object.entries(u(this, y)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    w(this, p, u(this, p).filter((e) => e.listenerRef.deref() !== t));
  }
};
g = new WeakMap(), R = new WeakMap(), p = new WeakMap(), v = new WeakMap(), C = new WeakMap(), y = new WeakMap(), O = new WeakSet(), G = function(t, e, s) {
  const o = /* @__PURE__ */ new Set();
  for (const i of u(this, p)) {
    const r = i.listenerRef.deref();
    if (!r)
      o.add(i);
    else if (N && r instanceof HTMLElement && !r.isConnected)
      o.add(i);
    else {
      const { propertyMap: c } = i, f = Object.keys(c);
      (f.length === 0 || f.includes(t)) && r.changed(
        t,
        c[t],
        s,
        e,
        this
      );
    }
  }
  w(this, p, u(this, p).filter(
    (i) => !o.has(i)
  ));
}, b(E, g, /* @__PURE__ */ new Map()), N && window.addEventListener("beforeunload", () => {
  for (const [t, e] of u(E, g).entries())
    if (u(e, C)) {
      const s = Z(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(s));
    }
});
let D = E;
N && process.env.NODE_ENV === "development" && (window.WrecState = D);
function z(n, t) {
  let e = n;
  for (const s of t.split("."))
    e = e[s];
  return e;
}
function et(n, t, e) {
  const s = t.split("."), o = s.length - 1;
  let i = n;
  s.forEach((r, c) => {
    c === o ? i[r] = e : i = i[r];
  });
}
const st = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]);
if (typeof window > "u") {
  const { HTMLElement: n } = K("<!DOCTYPE html>");
  global.HTMLElement = n, global.customElements = {
    get: (t) => {
    },
    getName: () => "",
    define: () => {
    },
    upgrade: () => {
    },
    whenDefined: () => Promise.reject()
  };
} else {
  const n = /* @__PURE__ */ new Set([
    "onblur",
    "onchange",
    "onclick",
    "onfocus",
    "oninput",
    "onkeydown",
    "onreset",
    "onsubmit"
  ]);
  J.addHook(
    "uponSanitizeAttribute",
    (t, e) => {
      const { attrName: s } = e, o = s.toLowerCase();
      n.has(o) && (e.forceKeepAttr = !0);
    }
  );
}
class A extends Error {
}
const ot = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, X = "a-zA-Z_$", it = X + "0-9", S = `[${X}][${it}]*`, nt = /<!--\s*(.*?)\s*-->/, rt = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, j = new RegExp(`^this\\.${S}$`), H = new RegExp(`this\\.${S}(\\.${S})*`, "g"), P = new RegExp(`this\\.${S}(\\.${S})*`), ct = 5;
function at(n) {
  return n instanceof HTMLButtonElement || n instanceof HTMLFieldSetElement || n instanceof HTMLInputElement || n instanceof HTMLSelectElement || n instanceof HTMLTextAreaElement || n instanceof d;
}
function yt(n, t, e) {
  const s = document.createElement(n);
  if (t)
    for (const [o, i] of Object.entries(t))
      s.setAttribute(o, i);
  return e && (s.innerHTML = e), s;
}
const ft = (n) => n === String ? "" : n === Number ? 0 : n === Boolean ? !1 : n === Array ? [] : n === Object ? {} : void 0;
function $(n) {
  const t = [];
  let e = n.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...$(e.shadowRoot)), e.firstElementChild && t.push(...$(e)), e = e.nextElementSibling;
  return t;
}
const T = (n) => n.substring(ct).split(".")[0];
function Y(n, t) {
  let e = n[0];
  return t.forEach((s, o) => {
    e += s + n[o + 1];
  }), e;
}
function F(n) {
  const t = typeof n;
  return t === "string" || t === "number" || t === "boolean";
}
function M(n) {
  return n.localName === "textarea";
}
function I(n) {
  const { localName: t } = n;
  return t === "input" || t === "select";
}
const lt = (n) => n.replace(/<!--[\s\S]*?-->/g, "");
function Q(n, t, e, s) {
  return n.slice(0, t) + s + n.slice(t + e);
}
function ht(n) {
  let t = n.trim(), e = null;
  /^\s*<tr[\s>]/i.test(t) ? (t = `<table><tbody>${t}</tbody></table>`, e = "tbody") : /^\s*<(td|th)[\s>]/i.test(t) ? (t = `<table><tbody><tr>${t}</tr></tbody></table>`, e = "tr") : /^\s*<option[\s>]/i.test(t) ? (t = `<select>${t}</select>`, e = "select") : /^\s*<col[\s>]/i.test(t) && (t = `<table><colgroup>${t}</colgroup></table>`, e = "colgroup");
  const s = J.sanitize(t, {
    ADD_TAGS: ["#comment"],
    ALLOW_UNKNOWN_PROTOCOLS: !0,
    RETURN_DOM_FRAGMENT: !0
  });
  if (e) {
    const o = s.querySelector(e);
    if (o) return o.childNodes;
  }
  return s.childNodes;
}
function k(n) {
  const t = Number(n);
  if (isNaN(t)) throw new A(`can't convert "${n}" to a number`);
  return t;
}
function tt(n, t, e) {
  const [s, o] = t.split(":");
  if (F(e))
    if (typeof e == "boolean") {
      e ? n.setAttribute(s, s) : n.removeAttribute(s);
      const i = d.getPropName(s);
      n[i] = e;
    } else {
      const i = n.getAttribute(t), r = String(e);
      i !== r && (n.setAttribute(s, r), s === "value" && I(n) && (n.value = r));
    }
  else {
    const i = d.getPropName(t);
    n[i] = e;
  }
}
function _(n, t, e) {
  const [s, o] = t.split(":");
  n instanceof CSSStyleRule ? n.style.setProperty(s, e) : (tt(n, s, e), s === "value" && I(n) && (n.value = e));
}
async function ut(n) {
  const t = /* @__PURE__ */ new Set();
  for (const s of $(n.content)) {
    const { localName: o } = s;
    o.includes("-") && t.add(o);
  }
  function e(s) {
    return new Promise((o, i) => {
      setTimeout(() => {
        const r = `custom element <${s}> not defined`;
        i(new Error(r));
      }, 1e3);
    });
  }
  return Promise.all(
    [...t].map(
      async (s) => Promise.race([customElements.whenDefined(s), e(s)])
    )
  );
}
class d extends HTMLElement {
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
      throw new A(`custom element ${t} is already defined`);
    customElements.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.attrToPropMap || (t.attrToPropMap = /* @__PURE__ */ new Map()), t.properties || (t.properties = {}), t.propToAttrMap || (t.propToExprsMap = /* @__PURE__ */ new Map()), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, s) {
    t === "disabled" && this.#m();
    const o = d.getPropName(t);
    if (this.#n(o)) {
      const i = this.#M(o, String(s));
      this[o] = i;
      const r = this.#f[o];
      r && this.setFormValue(r, String(i)), this.propertyChangedCallback(o, e, s);
    }
  }
  // This applies multiple property changes and only updates
  // the affected parts of the DOM after all of them are made.
  batchSet(t) {
    this.#a = !0;
    const e = this.#t.propToExprsMap, s = /* @__PURE__ */ new Set();
    for (const [c, f] of Object.entries(t)) {
      this[c] = f;
      const a = e.get(c) ?? [];
      for (const l of a)
        s.add(l);
    }
    const o = this.#t.propToComputedMap, i = /* @__PURE__ */ new Set(), r = {};
    for (const c of Object.keys(t)) {
      const f = o.get(c) || [];
      for (const [a, l] of f)
        i.add(a), r[a] = l;
    }
    for (const c of i) {
      const f = r[c];
      this[c] = this.#s(f);
      const a = e.get(c) ?? [];
      for (const l of a)
        s.add(l);
    }
    for (; ; ) {
      let c = !1;
      for (const f of i) {
        const a = r[f], l = this.#s(a), h = this[f];
        JSON.stringify(l) !== JSON.stringify(h) && (this[f] = l, c = !0);
      }
      if (!c) break;
    }
    this.#b([...s]), this.#a = !1;
  }
  async #v() {
    const t = this.#t;
    let { template: e } = t;
    e || (e = t.template = document.createElement("template"), e.innerHTML = t.buildHTML()), await ut(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  static buildHTML() {
    let t = `<style>
    :host([hidden]) { display: none; }`;
    this.css && (t += this.css), t += `</style>
`;
    let e = this.html.trim();
    if (!e) throw new A("static property html must be set");
    return e.startsWith("<") || (e = `<span><!--${e}--></span>`), t + e;
  }
  changed(t, e, s) {
    this[e] = s;
  }
  connectedCallback() {
    this.#H(), this.#x(), this.#v().then(() => {
      this.hasAttribute("disabled") && this.#m(), this.#S(this.shadowRoot), this.#y(this.shadowRoot), this.#C();
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
      throw new A(`"${t}" is a reserved property`);
    const o = d.getAttrName(t), i = this.hasAttribute(o);
    e.required && !i && this.#e(this, o, "is a required attribute");
    let r = e.value;
    this.hasOwnProperty(t) && (r = this[t], delete this[t]);
    const { type: c } = e, f = c === Boolean ? r || i : s.includes(o) && i ? this.#T(t, o) : r || ft(c), a = "#" + t;
    this[a] = f, e.computed && this.#R(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[a];
      },
      set(l) {
        c === Number && typeof l == "string" && (l = k(l));
        const h = this[a];
        if (l === h) return;
        this.#_(t, c, l), this[a] = l;
        const { state: m, stateProp: x } = this.#t.properties[t];
        x && et(m, x, l), this.#O(t, c, l, o), this.#a || (this.#L(t), this.#E(t)), this.#j(t, l);
        const V = this.#f[t];
        V && this.setFormValue(V, String(l)), this.propertyChangedCallback(t, h, l), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: h,
          value: l
        });
      }
    });
  }
  #m() {
    const t = this.hasAttribute("disabled"), e = $(this.shadowRoot);
    for (const s of e)
      at(s) && (s.disabled = t);
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
  #N(t) {
    const e = t instanceof d;
    for (const s of t.getAttributeNames()) {
      const o = t.getAttribute(s), i = this.#w(t, o);
      if (i) {
        const r = this[i];
        r === void 0 && this.#c(t, s, i), t[i] = r;
        let [c, f] = s.split(":");
        c === "value" && (f ? (t["on" + f] === void 0 && this.#e(t, s, "refers to an unsupported event name"), t.setAttribute(c, this[i])) : f = "change"), e && t.#u.set(
          d.getPropName(c),
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
          const { element: r, attrName: c } = i;
          r instanceof CSSStyleRule ? r.style.setProperty(c, s) : _(r, c, s);
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
  #P(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: s } = t, o = s?.cssRules ?? [], i = Array.from(o);
      for (const r of i)
        if (r.constructor === CSSStyleRule) {
          const c = Array.from(r.style);
          for (const f of c)
            if (f.startsWith("--")) {
              const a = r.style.getPropertyValue(f);
              this.#r(a, r, f);
            }
        }
    } else {
      let s = "";
      if (M(t)) {
        this.#r(t.textContent, t);
        const o = t.textContent?.match(nt);
        o && (s = o[1]);
      } else {
        const o = Array.from(t.childNodes).find(
          (i) => i.nodeType === Node.COMMENT_NODE
        );
        o && (s = o.textContent?.trim() ?? "");
      }
      if (s) {
        const o = this.#w(t, s);
        o && M(t) ? t.textContent = this[o] : this.#r(s, t);
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
      const r = this.getAttribute("name");
      if (r)
        if (this.#n("value"))
          t = `value:${r}`;
        else
          return;
      else
        return;
    }
    const e = {}, s = t.split(",");
    for (const r of s) {
      const [c, f] = r.split(":");
      e[c.trim()] = f.trim();
    }
    this.#f = e, this.#i = new FormData(), this.#h = this.attachInternals(), this.#h.setFormValue(this.#i);
    const o = Object.keys(this.#t.properties), i = this.#l;
    for (const r of o)
      i[r] = this[r];
  }
  formResetCallback() {
    const t = this.#l;
    for (const e of Object.keys(t)) {
      let s = t[e];
      j.test(s) && (s = this.#s(s)), this[e] = s;
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
    if (!j.test(o)) return;
    const i = I(t) || M(t);
    let [r, c] = (e ?? "").split(":");
    if (!(i && r === "value" || M(t))) return;
    c ? t["on" + c] === void 0 && this.#e(t, e, "refers to an unsupported event name") : c = "change";
    const a = T(o);
    t.addEventListener(c, (l) => {
      const { target: h } = l;
      if (!h) return;
      const m = h.value, { type: x } = this.#t.properties[a];
      this[a] = x === Number ? k(m) : m, this.#E(a);
    });
  }
  #n(t) {
    return !!this.#t.properties[t];
  }
  #y(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e)
      this.#N(s), s.firstElementChild || this.#P(s);
  }
  // formAssociated is only needed when the component is inside a form.
  #g() {
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
      (e) => d.getAttrName(e)
    );
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, s) {
  }
  #w(t, e) {
    if (!e || !j.test(e)) return;
    const s = T(e);
    return this[s] === void 0 && this.#c(t, "", s), s;
  }
  #E(t) {
    const e = this.#t.propToExprsMap.get(t) || [];
    this.#b(e);
  }
  #R(t, e) {
    const { computed: s, uses: o } = e, i = this.#t.propToComputedMap;
    function r(f, a) {
      let l = i.get(f);
      l || (l = [], i.set(f, l)), l.push([t, a]);
    }
    const c = s.match(H) || [];
    for (const f of c) {
      const a = T(f);
      this[a] === void 0 && this.#c(null, t, a), typeof this[a] != "function" && r(a, s);
    }
    if (o)
      for (const f of o.split(","))
        r(f.trim(), s);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #r(t, e, s = void 0) {
    if (!t) return;
    const o = this.#p(e, s, t);
    if (!o) {
      const f = t.replaceAll("this..", "this.");
      s ? _(e, s, f) : "textContent" in e && (e.textContent = f);
      return;
    }
    const i = this.#t;
    o.forEach((f) => {
      const a = T(f);
      if (typeof this[a] == "function") return;
      const l = i.propToExprsMap;
      let h = l.get(a);
      h || (h = [], l.set(a, h)), h.includes(t) || h.push(t);
    });
    for (const [f, a] of this.#o.entries())
      for (const l of a) {
        const h = l instanceof HTMLElement || l instanceof CSSStyleRule ? l : l.element;
        h instanceof CSSStyleRule || h.isConnected || this.#o.set(
          f,
          a.filter((m) => m !== l)
        );
      }
    let r = this.#o.get(t);
    r || (r = [], this.#o.set(t, r)), r.push(s ? { element: e, attrName: s } : e), e instanceof HTMLElement && this.#$(e, s, o);
    const c = this.#s(t);
    s ? _(e, s, c) : this.#A(e, c);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !F(e) || (this.#i.set(t, e), this.#h?.setFormValue(this.#i));
  }
  static ssr(t = {}) {
    for (const [a, l] of Object.entries(this.properties))
      if (t[a] === void 0) {
        const { value: h } = l;
        h !== void 0 && (t[a] = h);
      }
    function e(a) {
      return new Function("return " + a).call(t);
    }
    let s = "";
    for (const [a, l] of Object.entries(t)) {
      const h = this.getAttrName(a);
      s += ` ${h}="${l}"`;
    }
    const o = this.buildHTML(), { document: i } = K(o), r = i.querySelectorAll("*");
    for (const a of r) {
      for (const l of a.attributes) {
        const { value: h } = l;
        P.test(h) && (l.value = e(h));
      }
      for (const l of a.childNodes)
        if (l.nodeType === 8) {
          const h = l.textContent ?? "";
          if (P.test(h)) {
            const m = i.createTextNode(e(h));
            a.replaceChild(m, l);
          }
        }
    }
    const c = [...i.children].map((a) => a.outerHTML).join(`
`), { elementName: f } = this;
    return `
      <${f}${s}>
        <template shadowrootmode="open">
          ${c}
        </template>
      </${f}>
    `;
  }
  #e(t, e, s) {
    const o = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new A(
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
    if (e?.match(H)) return e;
    const s = this.#t, { type: o } = s.properties[t];
    if (o || this.#e(null, t, "does not specify its type"), o === String) return e;
    if (o === Number) return k(e);
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
    if (F(s)) {
      const i = e === Boolean ? this.hasAttribute(o) : this.#T(t, o);
      s !== i && tt(this, o || t, s);
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
    if (t instanceof HTMLElement && M(t))
      t.value = i;
    else if (s && o === "string" && i.trim().startsWith("<")) {
      const r = ht(i);
      t.replaceChildren(...r), this.#S(t), this.#y(t);
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
    const r = i;
    r[s] = e;
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
    this.#k(t, e);
    for (const [s, o] of Object.entries(e))
      if (this.#n(o)) {
        const i = z(t, s);
        i !== void 0 && (this[o] = i);
        const r = this.#t.properties[o];
        r.state = t, r.stateProp = s;
      }
    t.addListener(this, e);
  }
  #H() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!st.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#g();
          continue;
        }
        if (!t.has(d.getPropName(e))) {
          if (e === "name") {
            this.#g();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #p(t, e, s) {
    const o = s.match(H);
    if (o)
      return o.forEach((i) => {
        const r = T(i);
        this[r] === void 0 && this.#c(t, e, r);
      }), o;
  }
  #k(t, e) {
    for (const [s, o] of Object.entries(e)) {
      let i = z(t, s);
      i === void 0 && this.#e(this, void 0, `invalid state path "${s}"`), i = this[o], this.#n(o) || this.#e(
        null,
        o,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #_(t, e, s) {
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
  #S(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e) {
      const o = [];
      for (const i of Array.from(s.attributes)) {
        const r = i.name;
        if (r.startsWith("on")) {
          let c = r.slice(2);
          c = c[0].toLowerCase() + c.slice(1).toLowerCase();
          const f = i.value;
          this.#p(s, r, f);
          let a;
          typeof this[f] == "function" ? a = (l) => this[f](l) : (this.#p(s, r, f), a = () => this.#s(f)), s.addEventListener(c, a), o.push(r);
        }
      }
      for (const i of o)
        s.removeAttribute(i);
    }
  }
}
function gt(n, ...t) {
  let e = Y(n, t);
  for (; ; ) {
    const s = ot.exec(e);
    if (!s) break;
    const o = s[2];
    if (P.test(o)) {
      const i = s[1];
      if (!i.startsWith("--")) {
        const r = `--${i}: ${o};
      ${i}: var(--${i})`;
        e = Q(e, s.index, s[0].length, r);
      }
    }
  }
  return e;
}
function wt(n, ...t) {
  let e = Y(n, t);
  for (; ; ) {
    const s = rt.exec(e);
    if (!s || s[1] === "style") break;
    const o = lt(s[2]);
    if (P.test(o)) {
      const i = `<!-- ${o.trim()} -->`, r = s.index + s[0].indexOf(">") + 1;
      e = Q(e, r, o.length, i);
    }
  }
  return e;
}
export {
  d as Wrec,
  D as WrecState,
  yt as createElement,
  gt as css,
  wt as html
};

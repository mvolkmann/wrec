var D = (r) => {
  throw TypeError(r);
};
var N = (r, t, e) => t.has(r) || D("Cannot " + e);
var p = (r, t, e) => (N(r, t, "read from private field"), e ? e.call(r) : t.get(r)), b = (r, t, e) => t.has(r) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), E = (r, t, e, s) => (N(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e), V = (r, t, e) => (N(r, t, "access private method"), e);
import W from "xss";
function Z(r, t, e = "") {
  const s = /* @__PURE__ */ new WeakMap(), o = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(i, n) {
      const c = Reflect.get(i, n);
      if (c === null || typeof c != "object") return c;
      const a = s.get(c);
      if (a) return a;
      const f = e ? `${e}.${n}` : n, h = Z(c, t, f);
      return s.set(c, h), h;
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
function Y(r) {
  const t = {};
  for (const [e, s] of Object.entries(r)) {
    const o = typeof s == "object" && s !== null;
    t[e] = o ? Y(s) : s;
  }
  return t;
}
const P = typeof window < "u" && typeof window.document < "u";
let z = class extends Error {
};
var w, R, d, v, C, y, O, G;
const T = class T {
  constructor(t, e, s) {
    b(this, O);
    b(this, R, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    b(this, d, []);
    b(this, v);
    b(this, C);
    b(this, y);
    if (!t) throw new z("name cannot be empty");
    if (p(T, w).has(t))
      throw new z(`WrecState with name "${t}" already exists`);
    if (E(this, v, t), E(this, C, e), E(this, y, Z({}, V(this, O, G).bind(this))), e && P) {
      const o = sessionStorage.getItem("wrec-state-" + t), i = o ? JSON.parse(o) : void 0;
      i && (s = i);
    }
    if (s)
      for (const [o, i] of Object.entries(s))
        this.addProperty(o, i);
    p(T, w).set(t, this);
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
    return p(this, w).get(t);
  }
  /**
   * @param listener - object that has a "changed" method
   * @param map - map from state property paths to component properties
   */
  addListener(t, e = {}) {
    const s = p(this, d).find(
      (o) => o.listenerRef.deref() === t
    );
    if (s) {
      const { propertyMap: o } = s;
      for (const [i, n] of Object.entries(e))
        o[i] = n;
    } else
      p(this, d).push({
        listenerRef: new WeakRef(t),
        propertyMap: e
      });
  }
  addProperty(t, e) {
    Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return p(this, y)[t];
      },
      set(s) {
        p(this, y)[t] = s;
      }
    }), p(this, y)[t] = e;
  }
  get id() {
    return p(this, R);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", p(this, v));
    for (const [t, e] of Object.entries(p(this, y)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    E(this, d, p(this, d).filter((e) => e.listenerRef.deref() !== t));
  }
};
w = new WeakMap(), R = new WeakMap(), d = new WeakMap(), v = new WeakMap(), C = new WeakMap(), y = new WeakMap(), O = new WeakSet(), G = function(t, e, s) {
  const o = /* @__PURE__ */ new Set();
  for (const i of p(this, d)) {
    const n = i.listenerRef.deref();
    if (!n)
      o.add(i);
    else if (P && n instanceof HTMLElement && !n.isConnected)
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
  E(this, d, p(this, d).filter(
    (i) => !o.has(i)
  ));
}, b(T, w, /* @__PURE__ */ new Map()), P && window.addEventListener("beforeunload", () => {
  for (const [t, e] of p(T, w).entries())
    if (p(e, C)) {
      const s = Y(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(s));
    }
});
let _ = T;
P && process.env.NODE_ENV === "development" && (window.WrecState = _);
function q(r, t) {
  let e = r;
  for (const s of t.split("."))
    e = e[s];
  return e;
}
function it(r, t, e) {
  const s = t.split("."), o = s.length - 1;
  let i = r;
  s.forEach((n, c) => {
    c === o ? i[n] = e : i = i[n];
  });
}
const nt = /* @__PURE__ */ new Set(["button", "input", "label", "option", "th"]), J = "__WREC", X = "__";
function rt(r) {
  const t = {
    allowCommentTag: !0,
    onTag: (o, i) => {
      if (nt.has(o)) return i;
    },
    onTagAttr(o, i, n) {
      if (i.startsWith("on")) return "";
    },
    safeAttrValue(o, i, n) {
      return i === "class" || o === "a" && i === "href" && !n.startsWith("javascript") || o === "img" && i === "src" ? n : "";
    },
    stripIgnoreTagBody: ["script", "style", "iframe"],
    whiteList: {
      ...W.getDefaultWhiteList(),
      label: ["class", "for"],
      span: ["class"]
    }
  }, e = [];
  r = r.replace(/<!--[\s\S]*?-->/g, (o) => {
    let i = "";
    do
      i = J + e.length + X;
    while (r.includes(i));
    return e.push(o), i;
  });
  let s = W(r, t);
  return e.forEach((o, i) => {
    const n = new RegExp(
      `${J}${i}${X}`,
      "g"
    );
    s = s.replace(n, o);
  }), s;
}
const ct = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]), at = globalThis.HTMLElement ?? class {
}, F = globalThis.customElements ?? {
  get: (r) => {
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
class g extends Error {
}
const ft = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, Q = "a-zA-Z_$", ht = Q + "0-9", M = `[${Q}][${ht}]*`, K = new RegExp(`this\\.(${M})\\s*\\(`, "g"), lt = /<!--\s*(.*?)\s*-->/, pt = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, L = new RegExp(`^this\\.${M}$`), j = new RegExp(`this\\.${M}(\\.${M})*`, "g"), tt = new RegExp(`this\\.${M}(\\.${M})*`), ut = 5;
function dt(r) {
  return r instanceof HTMLButtonElement || r instanceof HTMLFieldSetElement || r instanceof HTMLInputElement || r instanceof HTMLSelectElement || r instanceof HTMLTextAreaElement || r instanceof u;
}
function Tt(r, t, e) {
  const s = document.createElement(r);
  if (t)
    for (const [o, i] of Object.entries(t))
      s.setAttribute(o, i);
  return e && (s.innerHTML = e), s;
}
const U = (r) => Array.isArray(r.values) && r.values.length > 0 ? r.values[0] : mt(r.type), mt = (r) => r === String ? "" : r === Number ? 0 : r === Boolean ? !1 : r === Array ? [] : r === Object ? {} : void 0;
function $(r) {
  const t = [];
  let e = r.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...$(e.shadowRoot)), e.firstElementChild && t.push(...$(e)), e = e.nextElementSibling;
  return t;
}
const A = (r) => r.substring(ut).split(".")[0];
function et(r, t) {
  let e = r[0];
  return t.forEach((s, o) => {
    e += s + r[o + 1];
  }), e;
}
function I(r) {
  const t = typeof r;
  return t === "string" || t === "number" || t === "boolean";
}
function S(r) {
  return r.localName === "textarea";
}
function B(r) {
  const { localName: t } = r;
  return t === "input" || t === "select";
}
const bt = (r) => r.replace(/<!--[\s\S]*?-->/g, "");
function st(r, t, e, s) {
  return r.slice(0, t) + s + r.slice(t + e);
}
function H(r) {
  const t = Number(r);
  if (isNaN(t)) throw new g(`can't convert "${r}" to a number`);
  return t;
}
function ot(r, t, e) {
  const [s, o] = t.split(":");
  if (I(e))
    if (typeof e == "boolean") {
      e ? r.setAttribute(s, s) : r.removeAttribute(s);
      const i = u.getPropName(s);
      r[i] = e;
    } else {
      const i = r.getAttribute(t), n = String(e);
      i !== n && (r.setAttribute(s, n), s === "value" && B(r) && (r.value = n));
    }
  else {
    const i = u.getPropName(t);
    r[i] = e;
  }
}
function k(r, t, e) {
  const [s, o] = t.split(":");
  r instanceof CSSStyleRule ? r.style.setProperty(s, e) : (ot(r, s, e), s === "value" && B(r) && (r.value = e));
}
async function gt(r) {
  const t = /* @__PURE__ */ new Set();
  for (const s of $(r.content)) {
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
      async (s) => Promise.race([
        F.whenDefined(s),
        e(s)
      ])
    )
  );
}
class u extends at {
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
  #p = !1;
  // This holds the names of computed properties
  // that are currently being updated.
  #u = /* @__PURE__ */ new Set();
  #t = this.constructor;
  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #s = /* @__PURE__ */ new Map();
  #d = {};
  #i;
  // For components that set `formAssociated` to true,
  // this stores in the initial value of each property
  // in the formAssociatedCallback method
  // so they can be restored in the formResetCallback method.
  #m = {};
  #b = null;
  // This is a map from properties in this web component
  // to corresponding properties in a parent web component.
  // This must be an instance property because
  // each component instance can have its properties mapped
  // to the properties of different parent components.
  // This is used to update a parent property
  // when the corresponding child property value changes.
  #g = /* @__PURE__ */ new Map();
  // This is a map from component properties to state bindings.
  // It must be instance-specific because each component instance
  // can bind the same property to a different WrecState/path.
  #r = /* @__PURE__ */ new Map();
  static define(t) {
    if (this.elementName = t, F.get(t))
      throw new g(`custom element ${t} is already defined`);
    F.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    this.#n("attrToPropMap") || (t.attrToPropMap = /* @__PURE__ */ new Map()), this.#n("properties") || (t.properties = {}), this.#n("propToAttrMap") || (t.propToAttrMap = /* @__PURE__ */ new Map()), this.#n("propToComputedMap") || (t.propToComputedMap = /* @__PURE__ */ new Map()), this.#n("propToExprsMap") || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, s) {
    t === "disabled" && this.#E();
    const o = u.getPropName(t);
    if (!this.#a(o) && this.#c(o)) {
      const i = this.#x(o, s);
      this[o] = i;
      const n = this.#d[o];
      n && this.setFormValue(n, String(i)), this.propertyChangedCallback(o, e, s);
    }
  }
  // This applies multiple property changes and only updates
  // the affected parts of the DOM after all of them are made.
  batchSet(t) {
    this.#p = !0;
    const e = this.#t.propToExprsMap, s = /* @__PURE__ */ new Set();
    for (const [c, a] of Object.entries(t)) {
      this[c] = a;
      const f = e.get(c) ?? [];
      for (const h of f)
        s.add(h);
    }
    const o = this.#t.propToComputedMap, i = /* @__PURE__ */ new Set(), n = {};
    for (const c of Object.keys(t)) {
      const a = o.get(c) || [];
      for (const [f, h] of a)
        i.add(f), n[f] = h;
    }
    for (const c of i) {
      const a = n[c];
      this.#f(c, this.#o(a));
      const f = e.get(c) ?? [];
      for (const h of f)
        s.add(h);
    }
    for (; ; ) {
      let c = !1;
      for (const a of i) {
        const f = n[a], h = this.#o(f), l = this[a];
        JSON.stringify(h) !== JSON.stringify(l) && (this.#f(a, h), c = !0);
      }
      if (!c) break;
    }
    this.#T([...s]), this.#p = !1;
  }
  async #R() {
    const t = this.#t;
    let { template: e } = t;
    e || (e = t.template = document.createElement("template"), e.innerHTML = t.buildHTML()), await gt(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  static buildHTML() {
    let t = `<style>
    :host([hidden]) { display: none; }`;
    this.css && (t += this.css), t += `</style>
`;
    let e = this.html.trim();
    if (!e) throw new g("static property html must be set");
    return e.startsWith("<") || (e = `<span><!--${e}--></span>`), t + e;
  }
  changed(t, e, s) {
    this[e] = s;
  }
  async connectedCallback() {
    this.#D(), this.#N(), await this.#R(), this.hasAttribute("disabled") && this.#E(), this.#$(this.shadowRoot), this.#M(this.shadowRoot), this.#B(), this.#O();
  }
  #O() {
    const t = this.#t, { properties: e } = t;
    for (const [s, { computed: o }] of Object.entries(e))
      o && this.#f(s, this.#o(o));
  }
  #N() {
    const t = this.#t, { observedAttributes: e, properties: s } = t;
    for (const [o, i] of Object.entries(s))
      i.computed || this.#w(o, i, e);
    for (const [o, i] of Object.entries(s))
      i.computed && this.#w(o, i, e);
  }
  #w(t, e, s) {
    if (t === "class" || t === "style")
      throw new g(`"${t}" is a reserved property`);
    const o = u.getAttrName(t), i = this.hasAttribute(o);
    e.required && !i && this.#e(this, o, "is a required attribute");
    let n = e.value;
    this.hasOwnProperty(t) && (n = this[t], delete this[t]);
    const { type: c } = e, a = c === Boolean ? n || i : s.includes(o) && i ? this.#C(t, o) : n ?? U(e), f = "#" + t;
    this[f] = a, e.computed && this.#k(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[f];
      },
      set(h) {
        e.computed && !this.#u.has(t) && this.#e(
          null,
          t,
          "is a computed property and cannot be set directly"
        ), c === Number && typeof h == "string" && (h = H(h));
        const l = this[f];
        if (h === l) return;
        this.#W(t, c, h), this[f] = h;
        const m = this.#r.get(t);
        m && it(m.state, m.stateProp, h), this.#_(t, c, h, o), this.#p || (this.#F(t), this.#v(t)), this.#I(t, h);
        const x = this.#d[t];
        x && this.setFormValue(x, String(h)), this.propertyChangedCallback(t, l, h), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: l,
          value: h
        });
      }
    });
  }
  #E() {
    const t = this.hasAttribute("disabled"), e = $(this.shadowRoot);
    for (const s of e)
      dt(s) && (s.disabled = t);
  }
  disconnectedCallback() {
    for (const { state: t } of this.#r.values())
      t.removeListener(this);
    this.#s.clear(), this.#m.clear(), this.#g.clear(), this.#r.clear();
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
  #L(t) {
    const e = t instanceof u;
    for (const s of t.getAttributeNames()) {
      const o = t.getAttribute(s), i = this.#S(t, o);
      if (i) {
        const n = this[i];
        n === void 0 && this.#l(t, s, i);
        let [c, a] = s.split(":");
        const f = u.getPropName(c), h = this.#a(i);
        e && t.#a(f) || (t[f] = n), c === "value" && (a ? (t["on" + a] === void 0 && this.#e(t, s, "refers to an unsupported event name"), t.setAttribute(c, this[i])) : a = "change"), e && !h && t.#g.set(
          u.getPropName(c),
          i
        );
      }
      this.#h(o, t, s);
    }
  }
  #T(t) {
    for (const e of t) {
      const s = this.#o(e), o = this.#s.get(e) ?? [], i = /* @__PURE__ */ new Set();
      for (const n of o) {
        const c = n instanceof HTMLElement || n instanceof CSSStyleRule ? n : n.element;
        if (c instanceof HTMLElement && !c.isConnected) {
          i.add(n);
          continue;
        }
        if (n instanceof HTMLElement)
          this.#P(n, s);
        else if (!(n instanceof CSSStyleRule)) {
          const { element: a, attrName: f } = n;
          a instanceof CSSStyleRule ? a.style.setProperty(f, s) : k(a, f, s);
        }
      }
      if (i.size > 0) {
        const n = o.filter((c) => !i.has(c));
        n.length === 0 ? this.#s.delete(e) : this.#s.set(e, n);
      }
    }
  }
  #o(t) {
    const { context: e } = this.#t;
    return new Function(
      "context",
      `const {${Object.keys(e).join(",")}} = context; return ${t};`
    ).call(this, e);
  }
  #j(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: s } = t, o = s?.cssRules ?? [], i = Array.from(o);
      for (const n of i)
        if (n.constructor === CSSStyleRule) {
          const c = Array.from(n.style);
          for (const a of c)
            if (a.startsWith("--")) {
              const f = n.style.getPropertyValue(a);
              this.#h(f, n, a);
            }
        }
    } else {
      let s = "";
      if (S(t)) {
        this.#h(t.textContent, t);
        const o = t.textContent?.match(lt);
        o && (s = o[1]);
      } else {
        const o = Array.from(t.childNodes).find(
          (i) => i.nodeType === Node.COMMENT_NODE
        );
        o && (s = o.textContent?.trim() ?? "");
      }
      if (s) {
        const o = this.#S(t, s);
        o && S(t) ? t.textContent = this[o] : this.#h(s, t);
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
        if (this.#c("value"))
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
    this.#d = e, this.#i = new FormData(), this.#b = this.attachInternals(), this.#b.setFormValue(this.#i);
    const o = Object.keys(this.#t.properties), i = this.#m;
    for (const n of o)
      i[n] = this[n];
  }
  formResetCallback() {
    const t = this.#m;
    for (const e of Object.keys(t)) {
      let s = t[e];
      L.test(s) && (s = this.#o(s)), this[e] = s;
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
  #H(t, e, s) {
    if (s.length !== 1) return;
    const [o] = s;
    if (!L.test(o)) return;
    const i = B(t) || S(t);
    let [n, c] = (e ?? "").split(":");
    if (!(i && n === "value" || S(t))) return;
    c ? t["on" + c] === void 0 && this.#e(t, e, "refers to an unsupported event name") : c = "change";
    const f = A(o);
    t.addEventListener(c, (h) => {
      const { target: l } = h;
      if (!l) return;
      const m = l.value, { type: x } = this.#t.properties[f];
      this[f] = x === Number ? H(m) : m, this.#v(f);
    });
  }
  #n(t) {
    return Object.hasOwn(this.#t, t);
  }
  #c(t) {
    return !!this.#t.properties[t];
  }
  #a(t) {
    return !!this.#t.properties[t]?.computed;
  }
  #M(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e)
      this.#L(s), s.firstElementChild || this.#j(s);
  }
  // formAssociated is only needed when the component is inside a form.
  #A() {
    if (this.#t.formAssociated || this.closest("form") === null) return;
    const t = this.#t.name;
    this.#e(
      this,
      void 0,
      `inside form, class ${t} requires "static formAssociated = true;"`
    );
  }
  static get observedAttributes() {
    const t = Object.entries(this.properties || {}).filter(([e, s]) => !s.computed).map(([e]) => u.getAttrName(e));
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, s) {
  }
  #S(t, e) {
    if (!e || !L.test(e)) return;
    const s = A(e);
    return this[s] === void 0 && this.#l(t, "", s), s;
  }
  #v(t) {
    const e = this.#t.propToExprsMap.get(t) || [];
    this.#T(e);
  }
  #k(t, e) {
    const s = this.#t, o = s.propToComputedMap;
    function i(a, f) {
      let h = o.get(a);
      h || (h = [], o.set(a, h)), h.push([t, f]);
    }
    const { computed: n } = e, c = n.match(j) || [];
    for (const a of c) {
      const f = A(a);
      this[f] === void 0 && this.#l(null, t, f), typeof this[f] != "function" && i(f, n);
    }
    for (const a of n.matchAll(K)) {
      const f = a[1];
      if (typeof this[f] != "function")
        throw new g(
          `property ${t} computed calls non-method ${f}`
        );
      for (const [h, l] of Object.entries(s.properties))
        l.usedBy?.includes(f) && i(h, n);
    }
  }
  #f(t, e) {
    this.#u.add(t);
    try {
      this[t] = e;
    } finally {
      this.#u.delete(t);
    }
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #h(t, e, s = void 0) {
    if (!t) return;
    const o = this.#y(e, s, t);
    if (!o) {
      const a = t.replaceAll("this..", "this.");
      s ? k(e, s, a) : "textContent" in e && (e.textContent = a);
      return;
    }
    const i = this.#t;
    o.forEach((a) => {
      const f = A(a);
      if (typeof this[f] == "function") return;
      const h = i.propToExprsMap;
      let l = h.get(f);
      l || (l = [], h.set(f, l)), l.includes(t) || l.push(t);
    });
    for (const [a, f] of this.#s.entries())
      for (const h of f) {
        const l = h instanceof HTMLElement || h instanceof CSSStyleRule ? h : h.element;
        l instanceof CSSStyleRule || l.isConnected || this.#s.set(
          a,
          f.filter((m) => m !== h)
        );
      }
    let n = this.#s.get(t);
    n || (n = [], this.#s.set(t, n)), n.push(s ? { element: e, attrName: s } : e), e instanceof HTMLElement && this.#H(e, s, o);
    const c = this.#o(t);
    s ? k(e, s, c) : this.#P(e, c);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !I(e) || (this.#i.set(t, e), this.#b?.setFormValue(this.#i));
  }
  static ssr(t = {}) {
    throw new g('Import Wrec from "wrec/ssr" to use the ssr method.');
  }
  #e(t, e, s) {
    const o = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new g(
      `component ${this.#t.elementName}` + (t ? `, element "${o}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${s}`
    );
  }
  #l(t, e, s) {
    this.#e(t, e, `refers to missing property "${s}"`);
  }
  #C(t, e) {
    return this.#x(t, this.getAttribute(e));
  }
  #x(t, e) {
    if (e?.match(j)) return e;
    const o = this.#t.properties[t], { type: i, values: n } = o;
    if (i || this.#e(null, t, "does not specify its type"), e === null)
      return i === Boolean ? !1 : U(o);
    if (i === String) {
      if (n && !n.includes(e)) {
        const c = n.map((a) => `"${a}"`).join(", ");
        this.#e(null, t, `must be one of ${c}`);
      }
      return e;
    }
    if (i === Number) return H(e);
    if (i === Boolean) {
      if (e === "true") return !0;
      if (e === "false" || e === "null") return !1;
      const c = u.getAttrName(t);
      return e && e !== c && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === "" || e === c;
    }
  }
  // Updates the matching attribute for a property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #_(t, e, s, o) {
    if (I(s) && !this.#a(t)) {
      const i = e === Boolean ? this.hasAttribute(o) : this.#C(t, o);
      s !== i && ot(this, o || t, s);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #F(t) {
    const s = this.#t.propToComputedMap.get(t) || [];
    for (const [o, i] of s)
      this.#f(o, this.#o(i));
  }
  #P(t, e) {
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
    if (t instanceof HTMLElement && S(t))
      t.value = i;
    else if (s && o === "string" && i.trim().startsWith("<")) {
      const n = rt(i);
      t.innerHTML = n, this.#$(t), this.#M(t);
    } else s && (t.textContent = i);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #I(t, e) {
    const s = this.#g.get(t);
    if (!s) return;
    const o = this.getRootNode();
    if (!(o instanceof ShadowRoot)) return;
    const { host: i } = o;
    if (!i) return;
    const n = i;
    n[s] = e;
  }
  // This adds expressions to the expressions arrays in propToExprsMap
  // that contain calls to methods listed the usedBy array or each property.
  #B() {
    let t;
    function e() {
      t = /* @__PURE__ */ new Map();
      const i = Array.from(this.#s.keys());
      for (const n of i)
        for (const c of n.matchAll(K)) {
          const a = c[1];
          let f = t.get(a);
          f || (f = [], t.set(a, f)), f.includes(n) || f.push(n);
        }
    }
    const { properties: s, propToExprsMap: o } = this.#t;
    for (const [i, n] of Object.entries(s)) {
      const { usedBy: c } = n;
      if (!c) continue;
      t || e.call(this);
      let a = o.get(i);
      a || (a = [], o.set(i, a));
      for (const f of c) {
        if (typeof this[f] != "function")
          throw new g(
            `property ${i} usedBy contains non-method ${f}`
          );
        const h = t.get(f) || [];
        for (const l of h)
          a.includes(l) || a.push(l);
      }
    }
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
    this.#V(t, e);
    for (const [s, o] of Object.entries(e))
      if (this.#c(o)) {
        const i = q(t, s);
        i !== void 0 && (this[o] = i), this.#r.set(o, { state: t, stateProp: s });
      }
    t.addListener(this, e);
  }
  #D() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!ct.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#A();
          continue;
        }
        if (!t.has(u.getPropName(e))) {
          if (e === "name") {
            this.#A();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #y(t, e, s) {
    const o = s.match(j);
    if (o)
      return o.forEach((i) => {
        const n = A(i);
        this[n] === void 0 && this.#l(t, e, n);
      }), o;
  }
  #V(t, e) {
    for (const [s, o] of Object.entries(e)) {
      let i = q(t, s);
      i === void 0 && this.#e(this, void 0, `invalid state path "${s}"`), i = this[o], this.#c(o) || this.#e(
        null,
        o,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #W(t, e, s) {
    const { values: o } = this.#t.properties[t];
    if (o) {
      let n;
      e !== String ? n = "declares allowed values, but its type is not String" : typeof s != "string" ? n = `value is a ${typeof s}, but type is String` : o.includes(s) || (n = `must be one of ${o.map((a) => `"${a}"`).join(", ")}`), n && this.#e(null, t, n);
    }
    if (s instanceof e) return;
    let i = typeof s;
    if (i === "object") {
      const { constructor: n } = s;
      i = n.name, n !== e && this.#e(
        null,
        t,
        `was set to a ${i}, but must be a ${e.name}`
      );
    }
    i !== e.name.toLowerCase() && this.#e(
      null,
      t,
      `was set to a ${i}, but must be a ${e.name}`
    );
  }
  #$(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e) {
      const o = [];
      for (const i of Array.from(s.attributes)) {
        const n = i.name;
        if (n.startsWith("on")) {
          let c = n.slice(2);
          c = c[0].toLowerCase() + c.slice(1).toLowerCase();
          const a = i.value;
          this.#y(s, n, a);
          let f;
          typeof this[a] == "function" ? f = (h) => this[a](h) : (this.#y(s, n, a), f = () => this.#o(a)), s.addEventListener(c, f), o.push(n);
        }
      }
      for (const i of o)
        s.removeAttribute(i);
    }
  }
}
function Mt(r, ...t) {
  let e = et(r, t);
  for (; ; ) {
    const s = ft.exec(e);
    if (!s) break;
    const o = s[2];
    if (tt.test(o)) {
      const i = s[1];
      if (!i.startsWith("--")) {
        const n = `--${i}: ${o};
      ${i}: var(--${i})`;
        e = st(e, s.index, s[0].length, n);
      }
    }
  }
  return e;
}
function At(r, ...t) {
  let e = et(r, t);
  for (; ; ) {
    const s = pt.exec(e);
    if (!s || s[1] === "style") break;
    const o = bt(s[2]);
    if (tt.test(o)) {
      const i = `<!-- ${o.trim()} -->`, n = s.index + s[0].indexOf(">") + 1;
      e = st(e, n, o.length, i);
    }
  }
  return e;
}
export {
  u as Wrec,
  _ as WrecState,
  Tt as createElement,
  Mt as css,
  At as html
};

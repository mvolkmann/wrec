var D = (r) => {
  throw TypeError(r);
};
var N = (r, t, e) => t.has(r) || D("Cannot " + e);
var p = (r, t, e) => (N(r, t, "read from private field"), e ? e.call(r) : t.get(r)), b = (r, t, e) => t.has(r) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), E = (r, t, e, s) => (N(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e), V = (r, t, e) => (N(r, t, "access private method"), e);
import W from "xss";
function Y(r, t, e = "") {
  const s = /* @__PURE__ */ new WeakMap(), i = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(o, n) {
      const c = Reflect.get(o, n);
      if (c === null || typeof c != "object") return c;
      const a = s.get(c);
      if (a) return a;
      const f = e ? `${e}.${n}` : n, h = Y(c, t, f);
      return s.set(c, h), h;
    },
    // Intercept property writes.
    set(o, n, c) {
      const a = Reflect.get(o, n);
      if (a !== c) {
        Reflect.set(o, n, c);
        const f = e ? `${e}.${n}` : n;
        t(f, a, c);
      }
      return !0;
    }
  };
  return new Proxy(r, i);
}
function G(r) {
  const t = {};
  for (const [e, s] of Object.entries(r)) {
    const i = typeof s == "object" && s !== null;
    t[e] = i ? G(s) : s;
  }
  return t;
}
const P = typeof window < "u" && typeof window.document < "u";
let z = class extends Error {
};
var w, R, m, x, C, g, O, Q;
const T = class T {
  constructor(t, e, s) {
    b(this, O);
    b(this, R, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    b(this, m, []);
    b(this, x);
    b(this, C);
    b(this, g);
    if (!t) throw new z("name cannot be empty");
    if (p(T, w).has(t))
      throw new z(`WrecState with name "${t}" already exists`);
    if (E(this, x, t), E(this, C, e), E(this, g, Y({}, V(this, O, Q).bind(this))), e && P) {
      const i = sessionStorage.getItem("wrec-state-" + t), o = i ? JSON.parse(i) : void 0;
      o && (s = o);
    }
    if (s)
      for (const [i, o] of Object.entries(s))
        this.addProperty(i, o);
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
    const s = p(this, m).find(
      (i) => i.listenerRef.deref() === t
    );
    if (s) {
      const { propertyMap: i } = s;
      for (const [o, n] of Object.entries(e))
        i[o] = n;
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
        return p(this, g)[t];
      },
      set(s) {
        p(this, g)[t] = s;
      }
    }), p(this, g)[t] = e;
  }
  get id() {
    return p(this, R);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", p(this, x));
    for (const [t, e] of Object.entries(p(this, g)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    E(this, m, p(this, m).filter((e) => e.listenerRef.deref() !== t));
  }
};
w = new WeakMap(), R = new WeakMap(), m = new WeakMap(), x = new WeakMap(), C = new WeakMap(), g = new WeakMap(), O = new WeakSet(), Q = function(t, e, s) {
  const i = /* @__PURE__ */ new Set();
  for (const o of p(this, m)) {
    const n = o.listenerRef.deref();
    if (!n)
      i.add(o);
    else if (P && n instanceof HTMLElement && !n.isConnected)
      i.add(o);
    else {
      const { propertyMap: c } = o, a = Object.keys(c);
      (a.length === 0 || a.includes(t)) && n.changed(
        t,
        c[t],
        s,
        e,
        this
      );
    }
  }
  E(this, m, p(this, m).filter(
    (o) => !i.has(o)
  ));
}, b(T, w, /* @__PURE__ */ new Map()), P && window.addEventListener("beforeunload", () => {
  for (const [t, e] of p(T, w).entries())
    if (p(e, C)) {
      const s = G(e);
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
function nt(r, t, e) {
  const s = t.split("."), i = s.length - 1;
  let o = r;
  s.forEach((n, c) => {
    c === i ? o[n] = e : o = o[n];
  });
}
const rt = /* @__PURE__ */ new Set(["button", "input", "label", "option", "th"]), J = "__WREC", X = "__";
function ct(r) {
  const t = {
    allowCommentTag: !0,
    onTag: (i, o) => {
      if (rt.has(i)) return o;
    },
    onTagAttr(i, o, n) {
      if (o.startsWith("on")) return "";
    },
    safeAttrValue(i, o, n) {
      return o === "class" || i === "a" && o === "href" && !n.startsWith("javascript") || i === "img" && o === "src" ? n : "";
    },
    stripIgnoreTagBody: ["script", "style", "iframe"],
    whiteList: {
      ...W.getDefaultWhiteList(),
      label: ["class", "for"],
      span: ["class"]
    }
  }, e = [];
  r = r.replace(/<!--[\s\S]*?-->/g, (i) => {
    let o = "";
    do
      o = J + e.length + X;
    while (r.includes(o));
    return e.push(i), o;
  });
  let s = W(r, t);
  return e.forEach((i, o) => {
    const n = new RegExp(
      `${J}${o}${X}`,
      "g"
    );
    s = s.replace(n, i);
  }), s;
}
const at = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]), ft = globalThis.HTMLElement ?? class {
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
class y extends Error {
}
const ht = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, tt = "a-zA-Z_$", lt = tt + "0-9", M = `[${tt}][${lt}]*`, K = new RegExp(`this\\.(${M})\\s*\\(`, "g"), pt = /<!--\s*(.*?)\s*-->/, ut = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, L = new RegExp(`^this\\.${M}$`), j = new RegExp(`this\\.${M}(\\.${M})*`, "g"), et = new RegExp(`this\\.${M}(\\.${M})*`), dt = 5;
function mt(r) {
  return r instanceof HTMLButtonElement || r instanceof HTMLFieldSetElement || r instanceof HTMLInputElement || r instanceof HTMLSelectElement || r instanceof HTMLTextAreaElement || r instanceof d;
}
function Mt(r, t, e) {
  const s = document.createElement(r);
  if (t)
    for (const [i, o] of Object.entries(t))
      s.setAttribute(i, o);
  return e && (s.innerHTML = e), s;
}
const U = (r) => Array.isArray(r.values) && r.values.length > 0 ? r.values[0] : bt(r.type), bt = (r) => r === String ? "" : r === Number ? 0 : r === Boolean ? !1 : r === Array ? [] : r === Object ? {} : void 0;
function $(r) {
  const t = [];
  let e = r.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...$(e.shadowRoot)), e.firstElementChild && t.push(...$(e)), e = e.nextElementSibling;
  return t;
}
const A = (r) => r.substring(dt).split(".")[0];
function st(r, t) {
  let e = r[0];
  return t.forEach((s, i) => {
    e += s + r[i + 1];
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
const yt = (r) => r.replace(/<!--[\s\S]*?-->/g, "");
function ot(r, t, e, s) {
  return r.slice(0, t) + s + r.slice(t + e);
}
function H(r) {
  const t = Number(r);
  if (isNaN(t)) throw new y(`can't convert "${r}" to a number`);
  return t;
}
function it(r, t, e) {
  const [s, i] = t.split(":");
  if (I(e))
    if (typeof e == "boolean") {
      e ? r.setAttribute(s, s) : r.removeAttribute(s);
      const o = d.getPropName(s);
      r[o] = e;
    } else {
      const o = r.getAttribute(t), n = String(e);
      o !== n && (r.setAttribute(s, n), s === "value" && B(r) && (r.value = n));
    }
  else {
    const o = d.getPropName(t);
    r[o] = e;
  }
}
function k(r, t, e) {
  const [s, i] = t.split(":");
  r instanceof CSSStyleRule ? r.style.setProperty(s, e) : (it(r, s, e), s === "value" && B(r) && (r.value = e));
}
const Z = (r) => typeof r == "string" ? [r] : r;
async function gt(r) {
  const t = /* @__PURE__ */ new Set();
  for (const s of $(r.content)) {
    const { localName: i } = s;
    i.includes("-") && t.add(i);
  }
  function e(s) {
    return new Promise((i, o) => {
      setTimeout(() => {
        const n = `custom element <${s}> not defined`;
        o(new Error(n));
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
class d extends ft {
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
  static propToComputedMap;
  // This is a map from method names to expressions
  // that include calls to them.
  // It is the same for all instances of a component.
  static methodToExprsMap;
  // This is a map from properties to expressions that refer to them.
  // It is the same for all instances of a component.
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
  #y = /* @__PURE__ */ new Map();
  // This is a map from component properties to state bindings.
  // It must be instance-specific because each component instance
  // can bind the same property to a different WrecState/path.
  #r = /* @__PURE__ */ new Map();
  static define(t) {
    if (this.elementName = t, F.get(t))
      throw new y(`custom element ${t} is already defined`);
    F.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    this.#n("attrToPropMap") || (t.attrToPropMap = /* @__PURE__ */ new Map()), this.#n("properties") || (t.properties = {}), this.#n("propToAttrMap") || (t.propToAttrMap = /* @__PURE__ */ new Map()), this.#n("propToComputedMap") || (t.propToComputedMap = /* @__PURE__ */ new Map()), this.#n("propToExprsMap") || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, s) {
    t === "disabled" && this.#E();
    const i = d.getPropName(t);
    if (!this.#a(i) && this.#c(i)) {
      const o = this.#v(i, s);
      this[i] = o;
      const n = this.#d[i];
      n && this.setFormValue(n, String(o)), this.propertyChangedCallback(i, e, s);
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
    const i = this.#t.propToComputedMap, o = /* @__PURE__ */ new Set(), n = {};
    for (const c of Object.keys(t)) {
      const a = i.get(c) || [];
      for (const [f, h] of a)
        o.add(f), n[f] = h;
    }
    for (const c of o) {
      const a = n[c];
      this.#f(c, this.#o(a));
      const f = e.get(c) ?? [];
      for (const h of f)
        s.add(h);
    }
    for (; ; ) {
      let c = !1;
      for (const a of o) {
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
    if (!e) throw new y("static property html must be set");
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
    for (const [s, { computed: i }] of Object.entries(e))
      i && this.#f(s, this.#o(i));
  }
  #N() {
    const t = this.#t, { observedAttributes: e, properties: s } = t;
    for (const [i, o] of Object.entries(s))
      o.computed || this.#w(i, o, e);
    for (const [i, o] of Object.entries(s))
      o.computed && this.#w(i, o, e);
  }
  #w(t, e, s) {
    if (t === "class" || t === "style")
      throw new y(`"${t}" is a reserved property`);
    const i = d.getAttrName(t), o = this.hasAttribute(i);
    e.required && !o && this.#e(this, i, "is a required attribute");
    let n = e.value;
    this.hasOwnProperty(t) && (n = this[t], delete this[t]);
    const { type: c } = e, a = c === Boolean ? n || o : s.includes(i) && o ? this.#C(t, i) : n ?? U(e), f = "#" + t;
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
        const u = this.#r.get(t);
        u && nt(u.state, u.stateProp, h), this.#_(t, c, h, i), this.#p || (this.#F(t), this.#x(t)), this.#I(t, h);
        const v = this.#d[t];
        v && this.setFormValue(v, String(h)), this.propertyChangedCallback(t, l, h), e.dispatch && this.dispatch("change", {
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
      mt(s) && (s.disabled = t);
  }
  disconnectedCallback() {
    for (const { state: t } of this.#r.values())
      t.removeListener(this);
    this.#s.clear(), this.#m.clear(), this.#y.clear(), this.#r.clear();
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
    const e = t instanceof d;
    for (const s of t.getAttributeNames()) {
      const i = t.getAttribute(s), o = this.#S(t, i);
      if (o) {
        const n = this[o];
        n === void 0 && this.#l(t, s, o);
        let [c, a] = s.split(":");
        const f = d.getPropName(c), h = this.#a(o);
        e && t.#a(f) || (t[f] = n), c === "value" && (a ? (t["on" + a] === void 0 && this.#e(t, s, "refers to an unsupported event name"), t.setAttribute(c, this[o])) : a = "change"), e && !h && t.#y.set(
          d.getPropName(c),
          o
        );
      }
      this.#h(i, t, s);
    }
  }
  #T(t) {
    for (const e of t) {
      const s = this.#o(e), i = this.#s.get(e) ?? [], o = /* @__PURE__ */ new Set();
      for (const n of i) {
        const c = n instanceof HTMLElement || n instanceof CSSStyleRule ? n : n.element;
        if (c instanceof HTMLElement && !c.isConnected) {
          o.add(n);
          continue;
        }
        if (n instanceof HTMLElement)
          this.#P(n, s);
        else if (!(n instanceof CSSStyleRule)) {
          const { element: a, attrName: f } = n;
          a instanceof CSSStyleRule ? a.style.setProperty(f, s) : k(a, f, s);
        }
      }
      if (o.size > 0) {
        const n = i.filter((c) => !o.has(c));
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
      const { sheet: s } = t, i = s?.cssRules ?? [], o = Array.from(i);
      for (const n of o)
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
        const i = t.textContent?.match(pt);
        i && (s = i[1]);
      } else {
        const i = Array.from(t.childNodes).find(
          (o) => o.nodeType === Node.COMMENT_NODE
        );
        i && (s = i.textContent?.trim() ?? "");
      }
      if (s) {
        const i = this.#S(t, s);
        i && S(t) ? t.textContent = this[i] : this.#h(s, t);
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
    const i = Object.keys(this.#t.properties), o = this.#m;
    for (const n of i)
      o[n] = this[n];
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
    return e || (e = t.replace(/-([a-z])/g, (s, i) => i.toUpperCase()), this.attrToPropMap.set(t, e)), e;
  }
  #H(t, e, s) {
    if (s.length !== 1) return;
    const [i] = s;
    if (!L.test(i)) return;
    const o = B(t) || S(t);
    let [n, c] = (e ?? "").split(":");
    if (!(o && n === "value" || S(t))) return;
    c ? t["on" + c] === void 0 && this.#e(t, e, "refers to an unsupported event name") : c = "change";
    const f = A(i);
    t.addEventListener(c, (h) => {
      const { target: l } = h;
      if (!l) return;
      const u = l.value, { type: v } = this.#t.properties[f];
      this[f] = v === Number ? H(u) : u, this.#x(f);
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
    const t = Object.entries(this.properties || {}).filter(([e, s]) => !s.computed).map(([e]) => d.getAttrName(e));
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
  #x(t) {
    const e = this.#t.propToExprsMap.get(t) || [];
    this.#T(e);
  }
  #k(t, e) {
    const s = this.#t, i = s.propToComputedMap;
    function o(a, f) {
      let h = i.get(a);
      h || (h = [], i.set(a, h)), h.push([t, f]);
    }
    const { computed: n } = e, c = n.match(j) || [];
    for (const a of c) {
      const f = A(a);
      this[f] === void 0 && this.#l(null, t, f), typeof this[f] != "function" && o(f, n);
    }
    for (const a of n.matchAll(K)) {
      const f = a[1];
      if (typeof this[f] != "function")
        throw new y(
          `property ${t} computed calls non-method ${f}`
        );
      for (const [h, l] of Object.entries(s.properties))
        Z(l.usedBy)?.includes(f) && o(h, n);
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
    const i = this.#g(e, s, t);
    if (!i) {
      const a = t.replaceAll("this..", "this.");
      s ? k(e, s, a) : "textContent" in e && (e.textContent = a);
      return;
    }
    const o = this.#t;
    i.forEach((a) => {
      const f = A(a);
      if (typeof this[f] == "function") return;
      const h = o.propToExprsMap;
      let l = h.get(f);
      l || (l = [], h.set(f, l)), l.includes(t) || l.push(t);
    });
    for (const [a, f] of this.#s.entries())
      for (const h of f) {
        const l = h instanceof HTMLElement || h instanceof CSSStyleRule ? h : h.element;
        l instanceof CSSStyleRule || l.isConnected || this.#s.set(
          a,
          f.filter((u) => u !== h)
        );
      }
    let n = this.#s.get(t);
    n || (n = [], this.#s.set(t, n)), n.push(s ? { element: e, attrName: s } : e), e instanceof HTMLElement && this.#H(e, s, i);
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
    throw new y('Import Wrec from "wrec/ssr" to use the ssr method.');
  }
  #e(t, e, s) {
    const i = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new y(
      `component ${this.#t.elementName}` + (t ? `, element "${i}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${s}`
    );
  }
  #l(t, e, s) {
    this.#e(t, e, `refers to missing property "${s}"`);
  }
  #C(t, e) {
    return this.#v(t, this.getAttribute(e));
  }
  #v(t, e) {
    if (e?.match(j)) return e;
    const i = this.#t.properties[t], { type: o, values: n } = i;
    if (o || this.#e(null, t, "does not specify its type"), e === null)
      return o === Boolean ? !1 : U(i);
    if (o === String) {
      if (n && !n.includes(e)) {
        const c = n.map((a) => `"${a}"`).join(", ");
        this.#e(null, t, `must be one of ${c}`);
      }
      return e;
    }
    if (o === Number) return H(e);
    if (o === Boolean) {
      if (e === "true") return !0;
      if (e === "false" || e === "null") return !1;
      const c = d.getAttrName(t);
      return e && e !== c && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === "" || e === c;
    }
  }
  // Updates the matching attribute for a property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #_(t, e, s, i) {
    if (I(s) && !this.#a(t)) {
      const o = e === Boolean ? this.hasAttribute(i) : this.#C(t, i);
      s !== o && it(this, i || t, s);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #F(t) {
    const s = this.#t.propToComputedMap.get(t) || [];
    for (const [i, o] of s)
      this.#f(i, this.#o(o));
  }
  #P(t, e) {
    if (e === void 0) return;
    const s = t instanceof HTMLElement;
    Array.isArray(e) && (e = e.join(""));
    const i = typeof e;
    i !== "string" && i !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    );
    const o = String(e);
    if (t instanceof HTMLElement && S(t))
      t.value = o;
    else if (s && i === "string" && o.trim().startsWith("<")) {
      const n = ct(o);
      t.innerHTML = n, this.#$(t), this.#M(t);
    } else s && (t.textContent = o);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #I(t, e) {
    const s = this.#y.get(t);
    if (!s) return;
    const i = this.getRootNode();
    if (!(i instanceof ShadowRoot)) return;
    const { host: o } = i;
    if (!o) return;
    const n = o;
    n[s] = e;
  }
  // This adds expressions to the expressions arrays in propToExprsMap
  // that contain calls to methods listed the usedBy array or each property.
  #B() {
    const t = this.#t;
    function e() {
      const o = /* @__PURE__ */ new Map();
      t.methodToExprsMap = o;
      const n = Array.from(this.#s.keys());
      for (const c of n)
        for (const a of c.matchAll(K)) {
          const f = a[1];
          let h = o.get(f);
          h || (h = [], o.set(f, h)), h.includes(c) || h.push(c);
        }
    }
    const { properties: s, propToExprsMap: i } = t;
    for (const [o, n] of Object.entries(s)) {
      const c = Z(n.usedBy);
      if (!c) continue;
      t.methodToExprsMap || e.call(this);
      const { methodToExprsMap: a } = t;
      let f = i.get(o);
      f || (f = [], i.set(o, f));
      for (const h of c) {
        if (typeof this[h] != "function")
          throw new y(
            `property ${o} usedBy contains non-method ${h}`
          );
        const l = a.get(h) || [];
        for (const u of l)
          f.includes(u) || f.push(u);
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
    for (const [s, i] of Object.entries(e))
      if (this.#c(i)) {
        const o = q(t, s);
        o !== void 0 && (this[i] = o), this.#r.set(i, { state: t, stateProp: s });
      }
    t.addListener(this, e);
  }
  #D() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!at.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#A();
          continue;
        }
        if (!t.has(d.getPropName(e))) {
          if (e === "name") {
            this.#A();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #g(t, e, s) {
    const i = s.match(j);
    if (i)
      return i.forEach((o) => {
        const n = A(o);
        this[n] === void 0 && this.#l(t, e, n);
      }), i;
  }
  #V(t, e) {
    for (const [s, i] of Object.entries(e)) {
      let o = q(t, s);
      o === void 0 && this.#e(this, void 0, `invalid state path "${s}"`), o = this[i], this.#c(i) || this.#e(
        null,
        i,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #W(t, e, s) {
    const { values: i } = this.#t.properties[t];
    if (i) {
      let n;
      e !== String ? n = "declares allowed values, but its type is not String" : typeof s != "string" ? n = `value is a ${typeof s}, but type is String` : i.includes(s) || (n = `must be one of ${i.map((a) => `"${a}"`).join(", ")}`), n && this.#e(null, t, n);
    }
    if (s instanceof e) return;
    let o = typeof s;
    if (o === "object") {
      const { constructor: n } = s;
      o = n.name, n !== e && this.#e(
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
  #$(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e) {
      const i = [];
      for (const o of Array.from(s.attributes)) {
        const n = o.name;
        if (n.startsWith("on")) {
          let c = n.slice(2);
          c = c[0].toLowerCase() + c.slice(1).toLowerCase();
          const a = o.value;
          this.#g(s, n, a);
          let f;
          typeof this[a] == "function" ? f = (h) => this[a](h) : (this.#g(s, n, a), f = () => this.#o(a)), s.addEventListener(c, f), i.push(n);
        }
      }
      for (const o of i)
        s.removeAttribute(o);
    }
  }
}
function At(r, ...t) {
  let e = st(r, t);
  for (; ; ) {
    const s = ht.exec(e);
    if (!s) break;
    const i = s[2];
    if (et.test(i)) {
      const o = s[1];
      if (!o.startsWith("--")) {
        const n = `--${o}: ${i};
      ${o}: var(--${o})`;
        e = ot(e, s.index, s[0].length, n);
      }
    }
  }
  return e;
}
function St(r, ...t) {
  let e = st(r, t);
  for (; ; ) {
    const s = ut.exec(e);
    if (!s || s[1] === "style") break;
    const i = yt(s[2]);
    if (et.test(i)) {
      const o = `<!-- ${i.trim()} -->`, n = s.index + s[0].indexOf(">") + 1;
      e = ot(e, n, i.length, o);
    }
  }
  return e;
}
export {
  d as Wrec,
  _ as WrecState,
  Mt as createElement,
  At as css,
  St as html
};

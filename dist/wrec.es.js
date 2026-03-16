var V = (n) => {
  throw TypeError(n);
};
var O = (n, t, e) => t.has(n) || V("Cannot " + e);
var p = (n, t, e) => (O(n, t, "read from private field"), e ? e.call(n) : t.get(n)), b = (n, t, e) => t.has(n) ? V("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), w = (n, t, e, s) => (O(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), B = (n, t, e) => (O(n, t, "access private method"), e);
import W from "xss";
function K(n, t, e = "") {
  const s = /* @__PURE__ */ new WeakMap(), o = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(i, r) {
      const c = Reflect.get(i, r);
      if (c === null || typeof c != "object") return c;
      const a = s.get(c);
      if (a) return a;
      const h = e ? `${e}.${r}` : r, f = K(c, t, h);
      return s.set(c, f), f;
    },
    // Intercept property writes.
    set(i, r, c) {
      const a = Reflect.get(i, r);
      if (a !== c) {
        Reflect.set(i, r, c);
        const h = e ? `${e}.${r}` : r;
        t(h, a, c);
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
const P = typeof window < "u" && typeof window.document < "u";
let z = class extends Error {
};
var y, N, d, v, C, g, $, U;
const T = class T {
  constructor(t, e, s) {
    b(this, $);
    b(this, N, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    b(this, d, []);
    b(this, v);
    b(this, C);
    b(this, g);
    if (!t) throw new z("name cannot be empty");
    if (p(T, y).has(t))
      throw new z(`WrecState with name "${t}" already exists`);
    if (w(this, v, t), w(this, C, e), w(this, g, K({}, B(this, $, U).bind(this))), e && P) {
      const o = sessionStorage.getItem("wrec-state-" + t), i = o ? JSON.parse(o) : void 0;
      i && (s = i);
    }
    if (s)
      for (const [o, i] of Object.entries(s))
        this.addProperty(o, i);
    p(T, y).set(t, this);
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
    return p(this, y).get(t);
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
      for (const [i, r] of Object.entries(e))
        o[i] = r;
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
        return p(this, g)[t];
      },
      set(s) {
        p(this, g)[t] = s;
      }
    }), p(this, g)[t] = e;
  }
  get id() {
    return p(this, N);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", p(this, v));
    for (const [t, e] of Object.entries(p(this, g)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    w(this, d, p(this, d).filter((e) => e.listenerRef.deref() !== t));
  }
};
y = new WeakMap(), N = new WeakMap(), d = new WeakMap(), v = new WeakMap(), C = new WeakMap(), g = new WeakMap(), $ = new WeakSet(), U = function(t, e, s) {
  const o = /* @__PURE__ */ new Set();
  for (const i of p(this, d)) {
    const r = i.listenerRef.deref();
    if (!r)
      o.add(i);
    else if (P && r instanceof HTMLElement && !r.isConnected)
      o.add(i);
    else {
      const { propertyMap: c } = i, a = Object.keys(c);
      (a.length === 0 || a.includes(t)) && r.changed(
        t,
        c[t],
        s,
        e,
        this
      );
    }
  }
  w(this, d, p(this, d).filter(
    (i) => !o.has(i)
  ));
}, b(T, y, /* @__PURE__ */ new Map()), P && window.addEventListener("beforeunload", () => {
  for (const [t, e] of p(T, y).entries())
    if (p(e, C)) {
      const s = Z(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(s));
    }
});
let _ = T;
P && process.env.NODE_ENV === "development" && (window.WrecState = _);
function q(n, t) {
  let e = n;
  for (const s of t.split("."))
    e = e[s];
  return e;
}
function st(n, t, e) {
  const s = t.split("."), o = s.length - 1;
  let i = n;
  s.forEach((r, c) => {
    c === o ? i[r] = e : i = i[r];
  });
}
const ot = /* @__PURE__ */ new Set(["input", "label", "option", "th"]), J = "__WREC", X = "__";
function it(n) {
  const t = {
    allowCommentTag: !0,
    onTag: (o, i) => {
      if (ot.has(o)) return i;
    },
    onTagAttr(o, i, r) {
      if (i.startsWith("on")) return "";
    },
    safeAttrValue(o, i, r) {
      return i === "class" || o === "a" && i === "href" && !r.startsWith("javascript") || o === "img" && i === "src" ? r : "";
    },
    stripIgnoreTagBody: ["script", "style", "iframe"],
    whiteList: {
      ...W.getDefaultWhiteList(),
      label: ["class", "for"],
      span: ["class"]
    }
  }, e = [];
  n = n.replace(/<!--[\s\S]*?-->/g, (o) => {
    let i = "";
    do
      i = J + e.length + X;
    while (n.includes(i));
    return e.push(o), i;
  });
  let s = W(n, t);
  return e.forEach((o, i) => {
    const r = new RegExp(
      `${J}${i}${X}`,
      "g"
    );
    s = s.replace(r, o);
  }), s;
}
const nt = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]), rt = globalThis.HTMLElement ?? class {
}, F = globalThis.customElements ?? {
  get: (n) => {
  },
  getName: () => "",
  define: () => {
  },
  upgrade: () => {
  },
  whenDefined: () => Promise.reject(new Error("customElements is not available in this environment"))
};
class E extends Error {
}
const ct = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, Y = "a-zA-Z_$", at = Y + "0-9", S = `[${Y}][${at}]*`, ft = /<!--\s*(.*?)\s*-->/, ht = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, L = new RegExp(`^this\\.${S}$`), j = new RegExp(`this\\.${S}(\\.${S})*`, "g"), G = new RegExp(`this\\.${S}(\\.${S})*`), lt = 5;
function pt(n) {
  return n instanceof HTMLButtonElement || n instanceof HTMLFieldSetElement || n instanceof HTMLInputElement || n instanceof HTMLSelectElement || n instanceof HTMLTextAreaElement || n instanceof u;
}
function wt(n, t, e) {
  const s = document.createElement(n);
  if (t)
    for (const [o, i] of Object.entries(t))
      s.setAttribute(o, i);
  return e && (s.innerHTML = e), s;
}
const ut = (n) => n === String ? "" : n === Number ? 0 : n === Boolean ? !1 : n === Array ? [] : n === Object ? {} : void 0;
function R(n) {
  const t = [];
  let e = n.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...R(e.shadowRoot)), e.firstElementChild && t.push(...R(e)), e = e.nextElementSibling;
  return t;
}
const M = (n) => n.substring(lt).split(".")[0];
function Q(n, t) {
  let e = n[0];
  return t.forEach((s, o) => {
    e += s + n[o + 1];
  }), e;
}
function I(n) {
  const t = typeof n;
  return t === "string" || t === "number" || t === "boolean";
}
function A(n) {
  return n.localName === "textarea";
}
function D(n) {
  const { localName: t } = n;
  return t === "input" || t === "select";
}
const dt = (n) => n.replace(/<!--[\s\S]*?-->/g, "");
function tt(n, t, e, s) {
  return n.slice(0, t) + s + n.slice(t + e);
}
function H(n) {
  const t = Number(n);
  if (isNaN(t)) throw new E(`can't convert "${n}" to a number`);
  return t;
}
function et(n, t, e) {
  const [s, o] = t.split(":");
  if (I(e))
    if (typeof e == "boolean") {
      e ? n.setAttribute(s, s) : n.removeAttribute(s);
      const i = u.getPropName(s);
      n[i] = e;
    } else {
      const i = n.getAttribute(t), r = String(e);
      i !== r && (n.setAttribute(s, r), s === "value" && D(n) && (n.value = r));
    }
  else {
    const i = u.getPropName(t);
    n[i] = e;
  }
}
function k(n, t, e) {
  const [s, o] = t.split(":");
  n instanceof CSSStyleRule ? n.style.setProperty(s, e) : (et(n, s, e), s === "value" && D(n) && (n.value = e));
}
async function mt(n) {
  const t = /* @__PURE__ */ new Set();
  for (const s of R(n.content)) {
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
      async (s) => Promise.race([F.whenDefined(s), e(s)])
    )
  );
}
class u extends rt {
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
  #f = !1;
  #t = this.constructor;
  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #o = /* @__PURE__ */ new Map();
  #h = {};
  #i;
  // For components that set `formAssociated` to true,
  // this stores in the initial value of each property
  // in the formAssociatedCallback method
  // so they can be restored in the formResetCallback method.
  #l = {};
  #p = null;
  // This is a map from properties in this web component
  // to corresponding properties in a parent web component.
  // This must be an instance property because
  // each component instance can have its properties mapped
  // to the properties of different parent components.
  // This is used to update a parent property
  // when the corresponding child property value changes.
  #u = /* @__PURE__ */ new Map();
  // This is a map from component properties to state bindings.
  // It must be instance-specific because each component instance
  // can bind the same property to a different WrecState/path.
  #m = /* @__PURE__ */ new Map();
  static define(t) {
    if (this.elementName = t, F.get(t))
      throw new E(`custom element ${t} is already defined`);
    F.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    this.#n("attrToPropMap") || (t.attrToPropMap = /* @__PURE__ */ new Map()), this.#n("properties") || (t.properties = {}), this.#n("propToAttrMap") || (t.propToAttrMap = /* @__PURE__ */ new Map()), this.#n("propToComputedMap") || (t.propToComputedMap = /* @__PURE__ */ new Map()), this.#n("propToExprsMap") || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, s) {
    t === "disabled" && this.#g();
    const o = u.getPropName(t);
    if (this.#r(o)) {
      const i = this.#S(o, String(s));
      this[o] = i;
      const r = this.#h[o];
      r && this.setFormValue(r, String(i)), this.propertyChangedCallback(o, e, s);
    }
  }
  // This applies multiple property changes and only updates
  // the affected parts of the DOM after all of them are made.
  batchSet(t) {
    this.#f = !0;
    const e = this.#t.propToExprsMap, s = /* @__PURE__ */ new Set();
    for (const [c, a] of Object.entries(t)) {
      this[c] = a;
      const h = e.get(c) ?? [];
      for (const f of h)
        s.add(f);
    }
    const o = this.#t.propToComputedMap, i = /* @__PURE__ */ new Set(), r = {};
    for (const c of Object.keys(t)) {
      const a = o.get(c) || [];
      for (const [h, f] of a)
        i.add(h), r[h] = f;
    }
    for (const c of i) {
      const a = r[c];
      this[c] = this.#s(a);
      const h = e.get(c) ?? [];
      for (const f of h)
        s.add(f);
    }
    for (; ; ) {
      let c = !1;
      for (const a of i) {
        const h = r[a], f = this.#s(h), l = this[a];
        JSON.stringify(f) !== JSON.stringify(l) && (this[a] = f, c = !0);
      }
      if (!c) break;
    }
    this.#y([...s]), this.#f = !1;
  }
  async #x() {
    const t = this.#t;
    let { template: e } = t;
    e || (e = t.template = document.createElement("template"), e.innerHTML = t.buildHTML()), await mt(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  static buildHTML() {
    let t = `<style>
    :host([hidden]) { display: none; }`;
    this.css && (t += this.css), t += `</style>
`;
    let e = this.html.trim();
    if (!e) throw new E("static property html must be set");
    return e.startsWith("<") || (e = `<span><!--${e}--></span>`), t + e;
  }
  changed(t, e, s) {
    this[e] = s;
  }
  connectedCallback() {
    this.#_(), this.#R(), this.#x().then(() => {
      this.hasAttribute("disabled") && this.#g(), this.#C(this.shadowRoot), this.#w(this.shadowRoot), this.#P();
    });
  }
  #P() {
    const t = this.#t, { properties: e } = t;
    for (const [s, { computed: o }] of Object.entries(e))
      o && (this[s] = this.#s(o));
  }
  #R() {
    const t = this.#t, { observedAttributes: e, properties: s } = t;
    for (const [o, i] of Object.entries(s))
      i.computed || this.#b(o, i, e);
    for (const [o, i] of Object.entries(s))
      i.computed && this.#b(o, i, e);
  }
  #b(t, e, s) {
    if (t === "class" || t === "style")
      throw new E(`"${t}" is a reserved property`);
    const o = u.getAttrName(t), i = this.hasAttribute(o);
    e.required && !i && this.#e(this, o, "is a required attribute");
    let r = e.value;
    this.hasOwnProperty(t) && (r = this[t], delete this[t]);
    const { type: c } = e, a = c === Boolean ? r || i : s.includes(o) && i ? this.#A(t, o) : r || ut(c), h = "#" + t;
    this[h] = a, e.computed && this.#L(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[h];
      },
      set(f) {
        c === Number && typeof f == "string" && (f = H(f));
        const l = this[h];
        if (f === l) return;
        this.#I(t, c, f), this[h] = f;
        const m = this.#m.get(t);
        m && st(m.state, m.stateProp, f), this.#j(t, c, f, o), this.#f || (this.#H(t), this.#M(t)), this.#k(t, f);
        const x = this.#h[t];
        x && this.setFormValue(x, String(f)), this.propertyChangedCallback(t, l, f), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: l,
          value: f
        });
      }
    });
  }
  #g() {
    const t = this.hasAttribute("disabled"), e = R(this.shadowRoot);
    for (const s of e)
      pt(s) && (s.disabled = t);
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
    const e = t instanceof u;
    for (const s of t.getAttributeNames()) {
      const o = t.getAttribute(s), i = this.#T(t, o);
      if (i) {
        const r = this[i];
        r === void 0 && this.#a(t, s, i);
        let [c, a] = s.split(":");
        const h = u.getPropName(c);
        t[h] = r, c === "value" && (a ? (t["on" + a] === void 0 && this.#e(t, s, "refers to an unsupported event name"), t.setAttribute(c, this[i])) : a = "change"), e && t.#u.set(
          u.getPropName(c),
          i
        );
      }
      this.#c(o, t, s);
    }
  }
  #y(t) {
    for (const e of t) {
      const s = this.#s(e), o = this.#o.get(e) ?? [];
      for (const i of o)
        if (i instanceof HTMLElement)
          this.#v(i, s);
        else if (!(i instanceof CSSStyleRule)) {
          const { element: r, attrName: c } = i;
          r instanceof CSSStyleRule ? r.style.setProperty(c, s) : k(r, c, s);
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
  #$(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: s } = t, o = s?.cssRules ?? [], i = Array.from(o);
      for (const r of i)
        if (r.constructor === CSSStyleRule) {
          const c = Array.from(r.style);
          for (const a of c)
            if (a.startsWith("--")) {
              const h = r.style.getPropertyValue(a);
              this.#c(h, r, a);
            }
        }
    } else {
      let s = "";
      if (A(t)) {
        this.#c(t.textContent, t);
        const o = t.textContent?.match(ft);
        o && (s = o[1]);
      } else {
        const o = Array.from(t.childNodes).find(
          (i) => i.nodeType === Node.COMMENT_NODE
        );
        o && (s = o.textContent?.trim() ?? "");
      }
      if (s) {
        const o = this.#T(t, s);
        o && A(t) ? t.textContent = this[o] : this.#c(s, t);
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
        if (this.#r("value"))
          t = `value:${r}`;
        else
          return;
      else
        return;
    }
    const e = {}, s = t.split(",");
    for (const r of s) {
      const [c, a] = r.split(":");
      e[c.trim()] = a.trim();
    }
    this.#h = e, this.#i = new FormData(), this.#p = this.attachInternals(), this.#p.setFormValue(this.#i);
    const o = Object.keys(this.#t.properties), i = this.#l;
    for (const r of o)
      i[r] = this[r];
  }
  formResetCallback() {
    const t = this.#l;
    for (const e of Object.keys(t)) {
      let s = t[e];
      L.test(s) && (s = this.#s(s)), this[e] = s;
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
  #O(t, e, s) {
    if (s.length !== 1) return;
    const [o] = s;
    if (!L.test(o)) return;
    const i = D(t) || A(t);
    let [r, c] = (e ?? "").split(":");
    if (!(i && r === "value" || A(t))) return;
    c ? t["on" + c] === void 0 && this.#e(t, e, "refers to an unsupported event name") : c = "change";
    const h = M(o);
    t.addEventListener(c, (f) => {
      const { target: l } = f;
      if (!l) return;
      const m = l.value, { type: x } = this.#t.properties[h];
      this[h] = x === Number ? H(m) : m, this.#M(h);
    });
  }
  #n(t) {
    return Object.hasOwn(this.#t, t);
  }
  #r(t) {
    return !!this.#t.properties[t];
  }
  #w(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e)
      this.#N(s), s.firstElementChild || this.#$(s);
  }
  // formAssociated is only needed when the component is inside a form.
  #E() {
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
      (e) => u.getAttrName(e)
    );
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, s) {
  }
  #T(t, e) {
    if (!e || !L.test(e)) return;
    const s = M(e);
    return this[s] === void 0 && this.#a(t, "", s), s;
  }
  #M(t) {
    const e = this.#t.propToExprsMap.get(t) || [];
    this.#y(e);
  }
  #L(t, e) {
    const { computed: s, uses: o } = e, i = this.#t.propToComputedMap;
    function r(a, h) {
      let f = i.get(a);
      f || (f = [], i.set(a, f)), f.push([t, h]);
    }
    const c = s.match(j) || [];
    for (const a of c) {
      const h = M(a);
      this[h] === void 0 && this.#a(null, t, h), typeof this[h] != "function" && r(h, s);
    }
    if (o)
      for (const a of o.split(","))
        r(a.trim(), s);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #c(t, e, s = void 0) {
    if (!t) return;
    const o = this.#d(e, s, t);
    if (!o) {
      const a = t.replaceAll("this..", "this.");
      s ? k(e, s, a) : "textContent" in e && (e.textContent = a);
      return;
    }
    const i = this.#t;
    o.forEach((a) => {
      const h = M(a);
      if (typeof this[h] == "function") return;
      const f = i.propToExprsMap;
      let l = f.get(h);
      l || (l = [], f.set(h, l)), l.includes(t) || l.push(t);
    });
    for (const [a, h] of this.#o.entries())
      for (const f of h) {
        const l = f instanceof HTMLElement || f instanceof CSSStyleRule ? f : f.element;
        l instanceof CSSStyleRule || l.isConnected || this.#o.set(
          a,
          h.filter((m) => m !== f)
        );
      }
    let r = this.#o.get(t);
    r || (r = [], this.#o.set(t, r)), r.push(s ? { element: e, attrName: s } : e), e instanceof HTMLElement && this.#O(e, s, o);
    const c = this.#s(t);
    s ? k(e, s, c) : this.#v(e, c);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !I(e) || (this.#i.set(t, e), this.#p?.setFormValue(this.#i));
  }
  static ssr(t = {}) {
    throw new E(
      'SSR support moved to the "wrec/ssr" entry. Import from "wrec/ssr" to use Wrec.ssr().'
    );
  }
  #e(t, e, s) {
    const o = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new E(
      `component ${this.#t.elementName}` + (t ? `, element "${o}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${s}`
    );
  }
  #a(t, e, s) {
    this.#e(t, e, `refers to missing property "${s}"`);
  }
  #A(t, e) {
    return this.#S(t, this.getAttribute(e));
  }
  #S(t, e) {
    if (e?.match(j)) return e;
    const s = this.#t, { type: o } = s.properties[t];
    if (o || this.#e(null, t, "does not specify its type"), o === String) return e;
    if (o === Number) return H(e);
    if (o === Boolean) {
      if (e === "true") return !0;
      if (e === "false" || e === "null") return !1;
      const i = u.getAttrName(t);
      return e && e !== i && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === "" || e === i;
    }
  }
  // Updates the matching attribute for a property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #j(t, e, s, o) {
    if (I(s)) {
      const i = e === Boolean ? this.hasAttribute(o) : this.#A(t, o);
      s !== i && et(this, o || t, s);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #H(t) {
    const s = this.#t.propToComputedMap.get(t) || [];
    for (const [o, i] of s)
      this[o] = this.#s(i);
  }
  #v(t, e) {
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
    if (t instanceof HTMLElement && A(t))
      t.value = i;
    else if (s && o === "string" && i.trim().startsWith("<")) {
      const r = it(i);
      t.innerHTML = r, this.#C(t), this.#w(t);
    } else s && (t.textContent = i);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #k(t, e) {
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
    this.#F(t, e);
    for (const [s, o] of Object.entries(e))
      if (this.#r(o)) {
        const i = q(t, s);
        i !== void 0 && (this[o] = i), this.#m.set(o, { state: t, stateProp: s });
      }
    t.addListener(this, e);
  }
  #_() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!nt.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#E();
          continue;
        }
        if (!t.has(u.getPropName(e))) {
          if (e === "name") {
            this.#E();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #d(t, e, s) {
    const o = s.match(j);
    if (o)
      return o.forEach((i) => {
        const r = M(i);
        this[r] === void 0 && this.#a(t, e, r);
      }), o;
  }
  #F(t, e) {
    for (const [s, o] of Object.entries(e)) {
      let i = q(t, s);
      i === void 0 && this.#e(this, void 0, `invalid state path "${s}"`), i = this[o], this.#r(o) || this.#e(
        null,
        o,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #I(t, e, s) {
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
  #C(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e) {
      const o = [];
      for (const i of Array.from(s.attributes)) {
        const r = i.name;
        if (r.startsWith("on")) {
          let c = r.slice(2);
          c = c[0].toLowerCase() + c.slice(1).toLowerCase();
          const a = i.value;
          this.#d(s, r, a);
          let h;
          typeof this[a] == "function" ? h = (f) => this[a](f) : (this.#d(s, r, a), h = () => this.#s(a)), s.addEventListener(c, h), o.push(r);
        }
      }
      for (const i of o)
        s.removeAttribute(i);
    }
  }
}
function Et(n, ...t) {
  let e = Q(n, t);
  for (; ; ) {
    const s = ct.exec(e);
    if (!s) break;
    const o = s[2];
    if (G.test(o)) {
      const i = s[1];
      if (!i.startsWith("--")) {
        const r = `--${i}: ${o};
      ${i}: var(--${i})`;
        e = tt(e, s.index, s[0].length, r);
      }
    }
  }
  return e;
}
function Tt(n, ...t) {
  let e = Q(n, t);
  for (; ; ) {
    const s = ht.exec(e);
    if (!s || s[1] === "style") break;
    const o = dt(s[2]);
    if (G.test(o)) {
      const i = `<!-- ${o.trim()} -->`, r = s.index + s[0].indexOf(">") + 1;
      e = tt(e, r, o.length, i);
    }
  }
  return e;
}
export {
  u as Wrec,
  _ as WrecState,
  wt as createElement,
  Et as css,
  Tt as html
};

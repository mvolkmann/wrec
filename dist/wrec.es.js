function R(r, t) {
  let s = r;
  for (const e of t.split("."))
    s = s[e];
  return s;
}
function O(r, t, s) {
  const e = t.split("."), o = e.length - 1;
  let i = r;
  e.forEach((n, h) => {
    h === o ? i[n] = s : i = i[n];
  });
}
class m extends Error {
}
const k = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, P = "a-zA-Z_$", F = P + "0-9", b = `[${P}][${F}]*`, j = /<!--\s*(.*?)\s*-->/, _ = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, A = new RegExp(`^this\\.${b}$`), y = new RegExp(`this\\.${b}(\\.${b})*`, "g"), N = new RegExp(`this\\.${b}(\\.${b})*`), V = /* @__PURE__ */ new Set(["class", "style"]), $ = 5;
function I(r) {
  return r instanceof HTMLButtonElement || r instanceof HTMLFieldSetElement || r instanceof HTMLInputElement || r instanceof HTMLSelectElement || r instanceof HTMLTextAreaElement || r instanceof u;
}
function q(r, t, s) {
  const e = document.createElement(r);
  if (t)
    for (const [o, i] of Object.entries(t))
      e.setAttribute(o, i);
  return s && (e.innerHTML = s), e;
}
const D = (r) => r === String ? "" : r === Number ? 0 : r === Boolean ? !1 : r === Array ? [] : r === Object ? {} : void 0;
function w(r) {
  const t = [];
  let s = r.firstElementChild;
  for (; s; )
    t.push(s), s.shadowRoot && t.push(...w(s.shadowRoot)), s.firstElementChild && t.push(...w(s)), s = s.nextElementSibling;
  return t;
}
const E = (r) => r.substring($).split(".")[0];
function x(r, t) {
  let s = r[0];
  return t.forEach((e, o) => {
    s += e + r[o + 1];
  }), s;
}
function S(r) {
  const t = typeof r;
  return t === "string" || t === "number" || t === "boolean";
}
function d(r) {
  return r.localName === "textarea";
}
function v(r) {
  const { localName: t } = r;
  return t === "input" || t === "select";
}
const B = (r) => r.replace(/<!--[\s\S]*?-->/g, "");
function L(r, t, s, e) {
  return r.slice(0, t) + e + r.slice(t + s);
}
function C(r) {
  const t = Number(r);
  if (isNaN(t)) throw new m(`can't convert "${r}" to a number`);
  return t;
}
function H(r, t, s) {
  const [e, o] = t.split(":");
  if (S(s))
    if (typeof s == "boolean") {
      s ? r.setAttribute(e, e) : r.removeAttribute(e);
      const i = u.getPropName(e);
      r[i] = s;
    } else {
      const i = r.getAttribute(t), n = String(s);
      i !== n && (r.setAttribute(e, n), e === "value" && v(r) && (r.value = n));
    }
  else {
    const i = u.getPropName(t);
    r[i] = s;
  }
}
function T(r, t, s) {
  const [e, o] = t.split(":");
  r instanceof CSSStyleRule ? r.style.setProperty(e, s) : (H(r, e, s), e === "value" && v(r) && (r.value = s));
}
class u extends HTMLElement {
  // This is used to lookup the camelCase property name
  // that corresponds to a kebab-case attribute name.
  static #p = /* @__PURE__ */ new Map();
  // This is used to lookup the kebab-case attribute name
  // that corresponds to a camelCase property name.
  static #d = /* @__PURE__ */ new Map();
  // This can be set in each Wrec subclass.
  // It describes CSS rules that a web component uses.
  static css = "";
  // Set this to true in Wrec subclasses that need
  // the ability to contribute data to form submissions.
  static formAssociated = !1;
  // This must be set in each Wrec subclass.
  // It describes HTML that a web component renders.
  static html = "";
  // There is one instance of `properties`, `propToComputedMap`,
  // and `propToExprsMap` per Wrec subclass,
  // not one for only the Wrec class.
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
  #t = this.constructor;
  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #e = /* @__PURE__ */ new Map();
  #c = {};
  #i;
  // For components that set `formAssociated` to true,
  // this stores in the initial value of each property
  // in the formAssociatedCallback method
  // so they can be restored in the formResetCallback method.
  #f = {};
  #h = null;
  // This is a map from properties in this web component
  // to corresponding properties in a parent web component.
  // This must be an instance property because
  // each component instance can have its properties mapped
  // to the properties of different parent components.
  // This is used to update a parent property
  // when the corresponding child property value changes.
  #l = /* @__PURE__ */ new Map();
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.properties || (t.properties = {}), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, s, e) {
    t === "disabled" && this.#m();
    const o = u.getPropName(t);
    if (this.#n(o)) {
      const i = this.#y(o, String(e));
      this[o] = i;
      const n = this.#c[o];
      n && this.setFormValue(n, String(i)), this.propertyChangedCallback(o, s, e);
    }
  }
  #w() {
    if (!this.shadowRoot) return;
    const t = this.#t;
    let { template: s } = t;
    if (!s) {
      s = t.template = document.createElement("template");
      let e = `<style>
    :host([hidden]) { display: none; }`;
      t.css && (e += t.css), e += `</style>
`;
      let o = t.html.trim();
      o.startsWith("<") || (o = `<span><!--${o}--></span>`), s.innerHTML = e + o;
    }
    this.shadowRoot.replaceChildren(s.content.cloneNode(!0));
  }
  changed(t, s, e) {
    this[s] = e;
  }
  connectedCallback() {
    this.#O(), this.#v(), this.#w(), this.hasAttribute("disabled") && this.#m(), requestAnimationFrame(() => {
      this.shadowRoot && (this.#T(this.shadowRoot), this.#b(this.shadowRoot)), this.#S();
    });
  }
  #S() {
    const t = this.#t, { properties: s } = t;
    for (const [e, { computed: o }] of Object.entries(s))
      o && (this[e] = this.#o(o));
  }
  #v() {
    const t = this.#t, { observedAttributes: s, properties: e } = t;
    for (const [o, i] of Object.entries(e))
      this.#M(o, i, s);
  }
  #M(t, s, e) {
    const o = u.getAttrName(t), i = this.hasAttribute(o);
    s.required && !i && this.#s(this, t, "is a required attribute");
    let n = s.value;
    this.hasOwnProperty(t) && (n = this[t], delete this[t]);
    const { type: h } = s, a = h === Boolean ? n || i : e.includes(o) && i ? this.#A(t, o) : n || D(h), f = "#" + t;
    this[f] = a, s.computed && this.#$(t, s), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[f];
      },
      set(c) {
        h === Number && typeof c == "string" && (c = C(c));
        const l = this[f];
        if (c === l) return;
        this.#F(t, h, c), this[f] = c;
        const { state: p, stateProp: g } = this.#t.properties[t];
        g && O(p, g, c), this.#L(t), this.#x(t, h, c, o), this.#E(t), this.#H(t, c);
        const M = this.#c[t];
        M && this.setFormValue(M, String(c)), this.propertyChangedCallback(t, l, c), s.dispatch && this.dispatch("change", { [t]: c });
      }
    });
  }
  #m() {
    const t = this.hasAttribute("disabled"), s = w(this.shadowRoot);
    for (const e of s)
      I(e) && (e.disabled = t);
  }
  disconnectedCallback() {
    this.#e.clear(), this.#f.clear(), this.#l.clear();
  }
  dispatch(t, s) {
    this.dispatchEvent(
      new CustomEvent(t, {
        bubbles: !0,
        // up DOM tree
        composed: !0,
        // can pass through shadow DOM
        detail: s
      })
    );
  }
  displayIfSet(t, s = "block") {
    return `display: ${t ? s : "none"}`;
  }
  // This inserts a dash before each uppercase letter
  // that is preceded by a lowercase letter or digit.
  static elementName() {
    return this.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }
  #R(t) {
    const s = t instanceof u;
    for (const e of t.getAttributeNames()) {
      const o = t.getAttribute(e), i = this.#g(t, o);
      if (i) {
        const n = this[i];
        n === void 0 && this.#a(t, e, i), t[i] = n;
        let [h, a] = e.split(":");
        h === "value" && (a ? (t["on" + a] === void 0 && this.#s(t, e, "refers to an unsupported event name"), t.setAttribute(h, this[i])) : a = "change"), s && t.#l.set(
          u.getPropName(h),
          i
        );
      }
      this.#r(o, t, e);
    }
  }
  #o(t) {
    const s = new Function("return " + t).call(this);
    return Array.isArray(s) ? s.join("") : s;
  }
  #P(t) {
    const { localName: s } = t;
    if (s === "style") {
      const { sheet: e } = t, o = e?.cssRules ?? [], i = Array.from(o);
      for (const n of i)
        if (n.constructor === CSSStyleRule) {
          const h = Array.from(n.style);
          for (const a of h)
            if (a.startsWith("--")) {
              const f = n.style.getPropertyValue(a);
              this.#r(f, n, a);
            }
        }
    } else {
      let e = "";
      if (d(t)) {
        this.#r(t.textContent, t);
        const o = t.textContent?.match(j);
        o && (e = o[1]);
      } else {
        const o = Array.from(t.childNodes).find(
          (i) => i.nodeType === Node.COMMENT_NODE
        );
        o && (e = o.textContent?.trim() ?? "");
      }
      if (e) {
        const o = this.#g(t, e);
        o && d(t) ? t.textContent = this[o] : this.#r(e, t);
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
    const s = {}, e = t.split(",");
    for (const n of e) {
      const [h, a] = n.split(":");
      s[h.trim()] = a.trim();
    }
    this.#c = s, this.#i = new FormData(), this.#h = this.attachInternals(), this.#h.setFormValue(this.#i);
    const o = Object.keys(this.#t.properties), i = this.#f;
    for (const n of o)
      i[n] = this[n];
  }
  formResetCallback() {
    const t = this.#f;
    for (const s of Object.keys(t)) {
      let e = t[s];
      A.test(e) && (e = this.#o(e)), this[s] = e;
    }
  }
  static getAttrName(t) {
    let s = u.#d.get(t);
    return s || (s = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), u.#d.set(t, s)), s;
  }
  static getPropName(t) {
    let s = u.#p.get(t);
    return s || (s = t.replace(/-([a-z])/g, (e, o) => o.toUpperCase()), u.#p.set(t, s)), s;
  }
  #N(t, s, e) {
    if (e.length !== 1) return;
    const [o] = e;
    if (!A.test(o)) return;
    const i = v(t) || d(t);
    let [n, h] = (s ?? "").split(":");
    if (!(i && n === "value" || d(t))) return;
    h ? t["on" + h] === void 0 && this.#s(t, s, "refers to an unsupported event name") : h = "change";
    const f = E(o);
    t.addEventListener(h, (c) => {
      const { target: l } = c;
      if (!l) return;
      const p = l.value, { type: g } = this.#t.properties[f];
      this[f] = g === Number ? C(p) : p, this.#E(f);
    });
  }
  #n(t) {
    return !!this.#t.properties[t];
  }
  #b(t) {
    const s = Array.from(t.querySelectorAll("*"));
    for (const e of s)
      this.#R(e), e.firstElementChild || this.#P(e);
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(u.getAttrName);
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, s, e) {
  }
  #g(t, s) {
    if (!s || !A.test(s)) return;
    const e = E(s);
    return this[e] === void 0 && this.#a(t, "", e), e;
  }
  #E(t) {
    const o = this.#t.propToExprsMap.get(t) || [];
    for (const i of o) {
      let n = this.#o(i);
      const h = this.#e.get(i) ?? [];
      for (const a of h)
        if (a instanceof HTMLElement)
          this.#C(a, n);
        else if (!(a instanceof CSSStyleRule)) {
          const { element: f, attrName: c } = a;
          f instanceof CSSStyleRule ? f.style.setProperty(c, n) : T(f, c, n);
        }
    }
  }
  static register() {
    const t = this.elementName();
    customElements.get(t) || customElements.define(t, this);
  }
  #$(t, s) {
    const { computed: e, uses: o } = s, i = this.#t.propToComputedMap;
    function n(a, f) {
      let c = i.get(a);
      c || (c = [], i.set(a, c)), c.push([t, f]);
    }
    const h = e.match(y) || [];
    for (const a of h) {
      const f = a.substring($);
      this[f] === void 0 && this.#a(null, t, f), typeof this[f] != "function" && n(f, e);
    }
    if (o)
      for (const a of o.split(","))
        n(a, e);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #r(t, s, e = void 0) {
    if (!t) return;
    const o = this.#u(s, e, t);
    if (!o) {
      const a = t.replaceAll("this..", "this.");
      e ? T(s, e, a) : "textContent" in s && (s.textContent = a);
      return;
    }
    const i = this.#t;
    o.forEach((a) => {
      const f = E(a);
      if (typeof this[f] == "function") return;
      const c = i.propToExprsMap;
      let l = c.get(f);
      l || (l = [], c.set(f, l)), l.includes(t) || l.push(t);
    });
    for (const [a, f] of this.#e.entries())
      for (const c of f) {
        const l = c instanceof HTMLElement || c instanceof CSSStyleRule ? c : c.element;
        l instanceof CSSStyleRule || l.isConnected || this.#e.set(
          a,
          f.filter((p) => p !== c)
        );
      }
    let n = this.#e.get(t);
    n || (n = [], this.#e.set(t, n)), n.push(e ? { element: s, attrName: e } : s), s instanceof HTMLElement && this.#N(s, e, o);
    const h = this.#o(t);
    e ? T(s, e, h) : this.#C(s, h);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, s) {
    this.hasAttribute(t) || this.setAttribute(t, s);
  }
  setFormValue(t, s) {
    !this.#i || !S(s) || (this.#i.set(t, s), this.#h?.setFormValue(this.#i));
  }
  #s(t, s, e) {
    const o = this.#t, i = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new m(
      `component ${o.elementName()}` + (t ? `, element "${i}"` : "") + (s ? `, attribute "${s}"` : "") + ` ${e}`
    );
  }
  #a(t, s, e) {
    this.#s(t, s, `refers to missing property "${e}"`);
  }
  #A(t, s) {
    return this.#y(t, this.getAttribute(s));
  }
  #y(t, s) {
    if (s?.match(y)) return s;
    const e = this.#t, { type: o } = e.properties[t];
    if (o || this.#s(null, t, "does not specify its type"), o === String) return s;
    if (o === Number) return C(s);
    if (o === Boolean)
      return s === "true" ? !0 : s === "false" || s === "null" ? !1 : (s && s !== t && this.#s(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), s === t);
  }
  // Updates the matching attribute for a property if there is one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #x(t, s, e, o) {
    if (S(e) && this.hasAttribute(o)) {
      const i = s === Boolean ? this.hasAttribute(o) : this.#A(t, o);
      e !== i && H(this, t, e);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #L(t) {
    const e = this.#t.propToComputedMap.get(t) || [];
    for (const [o, i] of e)
      this[o] = this.#o(i);
  }
  #C(t, s) {
    if (s === void 0) return;
    const e = t instanceof HTMLElement, o = typeof s;
    o !== "string" && o !== "number" && this.#s(
      t,
      void 0,
      " computed content is not a string or number"
    ), t instanceof HTMLElement && d(t) ? t.value = s : e && o === "string" && s.trim().startsWith("<") ? (t.innerHTML = s, this.#T(t), this.#b(t)) : e && (t.textContent = s);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #H(t, s) {
    const e = this.#l.get(t);
    if (!e) return;
    const o = this.getRootNode();
    if (!(o instanceof ShadowRoot)) return;
    const { host: i } = o;
    if (!i) return;
    const n = i;
    n[e] = s;
  }
  /**
   * @param state - WrecState object
   * @param map - object whose keys are state properties and
   *   whose values are component properties
   */
  useState(t, s) {
    if (!s) {
      s = {};
      for (const e of Object.keys(t))
        s[e] = e;
    }
    this.#k(t, s);
    for (const [e, o] of Object.entries(s))
      if (this.#n(o)) {
        const i = R(t, e);
        i !== void 0 && (this[o] = i);
        const n = this.#t.properties[o];
        n.state = t, n.stateProp = e;
      }
    t.addListener(this, s);
  }
  #O() {
    const t = this.#t, s = new Set(Object.keys(t.properties));
    for (const o of s)
      V.has(o) && this.#s(
        null,
        "",
        `property "${o}" is not allowed because it is a reserved attribute`
      );
    const e = this.#t.name;
    for (const o of this.getAttributeNames())
      if (o !== "class" && o !== "id" && o !== "disabled" && !o.startsWith("on")) {
        if (o === "form-assoc") {
          if (!t.formAssociated)
            throw new m(
              `add "static formAssociated = true;" to class ${e}`
            );
          continue;
        }
        if (!s.has(u.getPropName(o))) {
          if (o === "name") {
            if (t.formAssociated) continue;
            throw new m(
              `name attribute requires "static formAssociated = true;" in class ${e}`
            );
          }
          this.#s(null, o, "is not a supported attribute");
        }
      }
  }
  #u(t, s, e) {
    const o = e.match(y);
    if (o)
      return o.forEach((i) => {
        const n = E(i);
        this[n] === void 0 && this.#a(t, s, n);
      }), o;
  }
  #k(t, s) {
    for (const [e, o] of Object.entries(s)) {
      let i = R(t, e);
      if (i === void 0)
        throw new m(`invalid state path "${e}"`);
      i = this[o], this.#n(o) || this.#s(
        null,
        o,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  #F(t, s, e) {
    if (e instanceof s) return;
    let o = typeof e;
    if (o === "object") {
      const { constructor: i } = e;
      o = i.name, i !== s && this.#s(
        null,
        t,
        `was set to a ${o}, but must be a ${s.name}`
      );
    }
    o !== s.name.toLowerCase() && this.#s(
      null,
      t,
      `was set to a ${o}, but must be a ${s.name}`
    );
  }
  #T(t) {
    const s = Array.from(t.querySelectorAll("*"));
    for (const e of s) {
      const o = [];
      for (const i of Array.from(e.attributes)) {
        const n = i.name;
        if (n.startsWith("on")) {
          let h = n.slice(2);
          h = h[0].toLowerCase() + h.slice(1).toLowerCase();
          const a = i.value;
          this.#u(e, n, a);
          let f;
          typeof this[a] == "function" ? f = (c) => this[a](c) : (this.#u(e, n, a), f = () => this.#o(a)), e.addEventListener(h, f), o.push(n);
        }
      }
      for (const i of o)
        e.removeAttribute(i);
    }
  }
}
function z(r, ...t) {
  let s = x(r, t);
  for (; ; ) {
    const e = k.exec(s);
    if (!e) break;
    const o = e[2];
    if (N.test(o)) {
      const i = e[1];
      if (!i.startsWith("--")) {
        const n = `--${i}: ${o};
      ${i}: var(--${i})`;
        s = L(s, e.index, e[0].length, n);
      }
    }
  }
  return s;
}
function Z(r, ...t) {
  let s = x(r, t);
  for (; ; ) {
    const e = _.exec(s);
    if (!e || e[1] === "style") break;
    const o = B(e[2]);
    if (N.test(o)) {
      const i = `<!-- ${o.trim()} -->`, n = e.index + e[0].indexOf(">") + 1;
      s = L(s, n, o.length, i);
    }
  }
  return s;
}
export {
  u as Wrec,
  q as createElement,
  z as css,
  Z as html
};

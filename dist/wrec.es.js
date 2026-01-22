function M(n, t) {
  let e = n;
  for (const s of t.split("."))
    e = e[s];
  return e;
}
function H(n, t, e) {
  const s = t.split("."), o = s.length - 1;
  let i = n;
  s.forEach((r, h) => {
    h === o ? i[r] = e : i = i[r];
  });
}
class m extends Error {
}
const O = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, P = "a-zA-Z_$", F = P + "0-9", b = `[${P}][${F}]*`, j = /<!--\s*(.*?)\s*-->/, V = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, A = new RegExp(`^this\\.${b}$`), E = new RegExp(`this\\.${b}(\\.${b})*`, "g"), $ = new RegExp(`this\\.${b}(\\.${b})*`), _ = /* @__PURE__ */ new Set(["class", "style"]), N = 5;
function I(n) {
  return n instanceof HTMLButtonElement || n instanceof HTMLFieldSetElement || n instanceof HTMLInputElement || n instanceof HTMLSelectElement || n instanceof HTMLTextAreaElement || n instanceof u;
}
function D(n) {
  const t = new CSSStyleSheet();
  for (const e of Array.from(n.cssRules))
    t.insertRule(e.cssText);
  return t;
}
function z(n, t, e) {
  const s = document.createElement(n);
  if (t)
    for (const [o, i] of Object.entries(t))
      s.setAttribute(o, i);
  return e && (s.innerHTML = e), s;
}
const B = (n) => n === String ? "" : n === Number ? 0 : n === Boolean ? !1 : n === Array ? [] : n === Object ? {} : void 0;
function w(n) {
  const t = [];
  let e = n.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...w(e.shadowRoot)), e.firstElementChild && t.push(...w(e)), e = e.nextElementSibling;
  return t;
}
const g = (n) => n.substring(N).split(".")[0];
function x(n, t) {
  let e = n[0];
  return t.forEach((s, o) => {
    e += s + n[o + 1];
  }), e;
}
function T(n) {
  const t = typeof n;
  return t === "string" || t === "number" || t === "boolean";
}
function d(n) {
  return n.localName === "textarea";
}
function R(n) {
  const { localName: t } = n;
  return t === "input" || t === "select";
}
const q = (n) => n.replace(/<!--[\s\S]*?-->/g, "");
function L(n, t, e, s) {
  return n.slice(0, t) + s + n.slice(t + e);
}
function S(n) {
  const t = Number(n);
  if (isNaN(t)) throw new m(`can't convert "${n}" to a number`);
  return t;
}
function k(n, t, e) {
  const [s, o] = t.split(":");
  if (T(e))
    if (typeof e == "boolean") {
      e ? n.setAttribute(s, s) : n.removeAttribute(s);
      const i = u.getPropName(s);
      n[i] = e;
    } else {
      const i = n.getAttribute(t), r = String(e);
      i !== r && (n.setAttribute(s, r), s === "value" && R(n) && (n.value = r));
    }
  else {
    const i = u.getPropName(t);
    n[i] = e;
  }
}
function C(n, t, e) {
  const [s, o] = t.split(":");
  n instanceof CSSStyleRule ? n.style.setProperty(s, e) : (k(n, s, e), s === "value" && R(n) && (n.value = e));
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
  //static propToExprsMap: Map<string, string[]> | null = null;
  static propToExprsMap;
  static stylesheet = null;
  static template = null;
  #t = this.constructor;
  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #s = /* @__PURE__ */ new Map();
  #a = {};
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
  attributeChangedCallback(t, e, s) {
    t === "disabled" && this.#m();
    const o = u.getPropName(t);
    if (this.#r(o)) {
      const i = this.#E(o, String(s));
      this[o] = i;
      const r = this.#a[o];
      r && this.setFormValue(r, String(i)), this.propertyChangedCallback(o, e, s);
    }
  }
  #w() {
    if (!this.shadowRoot) return;
    const t = this.#t;
    if (t.css) {
      let { stylesheet: s } = t;
      if (!s) {
        s = t.stylesheet = new CSSStyleSheet();
        const o = `:host([hidden]) { display: none; } ${t.css}`;
        s.replaceSync(o);
      }
      this.shadowRoot.adoptedStyleSheets = [D(s)];
    }
    let e = t.template;
    if (!e) {
      e = t.template = document.createElement("template");
      const s = t.html.trim();
      e.innerHTML = s.startsWith("<") ? s : `<span><!--${s}--></span>`;
    }
    this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, s) {
    this[e] = s;
  }
  connectedCallback() {
    this.#O(), this.#R(), this.#w(), this.hasAttribute("disabled") && this.#m(), requestAnimationFrame(() => {
      if (this.shadowRoot) {
        this.#C(this.shadowRoot), this.#b(this.shadowRoot);
        for (const t of this.shadowRoot.adoptedStyleSheets)
          this.#N(t);
      }
      this.#T();
    });
  }
  #T() {
    const t = this.#t, { properties: e } = t;
    for (const [s, { computed: o }] of Object.entries(e))
      o && (this[s] = this.#o(o));
  }
  #R() {
    const t = this.#t, { observedAttributes: e, properties: s } = t;
    for (const [o, i] of Object.entries(s))
      this.#v(o, i, e);
  }
  #v(t, e, s) {
    const o = u.getAttrName(t), i = this.hasAttribute(o);
    e.required && !i && this.#e(this, t, "is a required attribute");
    let r = e.value;
    this.hasOwnProperty(t) && (r = this[t], delete this[t]);
    const { type: h } = e, c = h === Boolean ? r || i : s.includes(o) && i ? this.#A(t, o) : r || B(h), f = "#" + t;
    this[f] = c, e.computed && this.#x(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[f];
      },
      set(a) {
        h === Number && typeof a == "string" && (a = S(a));
        const l = this[f];
        if (a === l) return;
        this.#j(t, h, a), this[f] = a;
        const { state: p, stateProp: y } = this.#t.properties[t];
        y && H(p, y, a), this.#k(t), this.#L(t, h, a, o), this.#g(t), this.#H(t, a);
        const v = this.#a[t];
        v && this.setFormValue(v, String(a)), this.propertyChangedCallback(t, l, a), e.dispatch && this.dispatch("change", { [t]: a });
      }
    });
  }
  #m() {
    const t = this.hasAttribute("disabled"), e = w(this.shadowRoot);
    for (const s of e)
      I(s) && (s.disabled = t);
  }
  disconnectedCallback() {
    this.#s.clear(), this.#f.clear(), this.#l.clear();
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
  // This inserts a dash before each uppercase letter
  // that is preceded by a lowercase letter or digit.
  static elementName() {
    return this.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }
  #M(t) {
    const e = t instanceof u;
    for (const s of t.getAttributeNames()) {
      const o = t.getAttribute(s), i = this.#y(t, o);
      if (i) {
        const r = this[i];
        r === void 0 && this.#c(t, s, i), t[i] = r;
        let [h, c] = s.split(":");
        h === "value" && (c ? (t["on" + c] === void 0 && this.#e(t, s, "refers to an unsupported event name"), t.setAttribute(h, this[i])) : c = "change"), e && t.#l.set(
          u.getPropName(h),
          i
        );
      }
      this.#n(o, t, s);
    }
  }
  #o(t) {
    const e = new Function("return " + t).call(this);
    return Array.isArray(e) ? e.join("") : e;
  }
  #P(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: s } = t, o = s?.cssRules ?? [], i = Array.from(o);
      for (const r of i)
        if (r.constructor === CSSStyleRule) {
          const h = Array.from(r.style);
          for (const c of h)
            if (c.startsWith("--")) {
              const f = r.style.getPropertyValue(c);
              this.#n(f, r, c);
            }
        }
    } else {
      let s = "";
      if (d(t)) {
        this.#n(t.textContent, t);
        const o = t.textContent?.match(j);
        o && (s = o[1]);
      } else {
        const o = Array.from(t.childNodes).find(
          (i) => i.nodeType === Node.COMMENT_NODE
        );
        o && (s = o.textContent?.trim() ?? "");
      }
      if (s) {
        const o = this.#y(t, s);
        o && d(t) ? t.textContent = this[o] : this.#n(s, t);
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
      const [h, c] = r.split(":");
      e[h.trim()] = c.trim();
    }
    this.#a = e, this.#i = new FormData(), this.#h = this.attachInternals(), this.#h.setFormValue(this.#i);
    const o = Object.keys(this.#t.properties), i = this.#f;
    for (const r of o)
      i[r] = this[r];
  }
  formResetCallback() {
    const t = this.#f;
    for (const e of Object.keys(t)) {
      let s = t[e];
      A.test(s) && (s = this.#o(s)), this[e] = s;
    }
  }
  static getAttrName(t) {
    let e = u.#d.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), u.#d.set(t, e)), e;
  }
  static getPropName(t) {
    let e = u.#p.get(t);
    return e || (e = t.replace(/-([a-z])/g, (s, o) => o.toUpperCase()), u.#p.set(t, e)), e;
  }
  #$(t, e, s) {
    if (s.length !== 1) return;
    const [o] = s;
    if (!A.test(o)) return;
    const i = R(t) || d(t);
    let [r, h] = (e ?? "").split(":");
    if (!(i && r === "value" || d(t))) return;
    h ? t["on" + h] === void 0 && this.#e(t, e, "refers to an unsupported event name") : h = "change";
    const f = g(o);
    t.addEventListener(h, (a) => {
      const { target: l } = a;
      if (!l) return;
      const p = l.value, { type: y } = this.#t.properties[f];
      this[f] = y === Number ? S(p) : p, this.#g(f);
    });
  }
  #r(t) {
    return !!this.#t.properties[t];
  }
  #b(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e)
      this.#M(s), s.firstElementChild || this.#P(s);
  }
  #N(t) {
    const e = t.cssRules;
    for (const s of Array.from(e))
      if (s instanceof CSSStyleRule) {
        for (const o of Array.from(s.style))
          if (o.startsWith("--")) {
            const i = s.style.getPropertyValue(o);
            this.#n(i, s, o);
          }
      }
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(u.getAttrName);
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, s) {
  }
  #y(t, e) {
    if (!e || !A.test(e)) return;
    const s = g(e);
    return this[s] === void 0 && this.#c(t, "", s), s;
  }
  #g(t) {
    const o = this.#t.propToExprsMap.get(t) || [];
    for (const i of o) {
      let r = this.#o(i);
      const h = this.#s.get(i) ?? [];
      for (const c of h)
        if (c instanceof HTMLElement)
          this.#S(c, r);
        else if (!(c instanceof CSSStyleRule)) {
          const { element: f, attrName: a } = c;
          f instanceof CSSStyleRule ? f.style.setProperty(a, r) : C(f, a, r);
        }
    }
  }
  static register() {
    const t = this.elementName();
    customElements.get(t) || customElements.define(t, this);
  }
  #x(t, e) {
    const { computed: s, uses: o } = e, i = this.#t.propToComputedMap;
    function r(c, f) {
      let a = i.get(c);
      a || (a = [], i.set(c, a)), a.push([t, f]);
    }
    const h = s.match(E) || [];
    for (const c of h) {
      const f = c.substring(N);
      this[f] === void 0 && this.#c(null, t, f), typeof this[f] != "function" && r(f, s);
    }
    if (o)
      for (const c of o.split(","))
        r(c, s);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #n(t, e, s = void 0) {
    if (!t) return;
    const o = this.#u(e, s, t);
    if (!o) {
      const c = t.replaceAll("this..", "this.");
      s ? C(e, s, c) : "textContent" in e && (e.textContent = c);
      return;
    }
    const i = this.#t;
    o.forEach((c) => {
      const f = g(c);
      if (typeof this[f] == "function") return;
      const a = i.propToExprsMap;
      let l = a.get(f);
      l || (l = [], a.set(f, l)), l.includes(t) || l.push(t);
    });
    for (const [c, f] of this.#s.entries())
      for (const a of f) {
        const l = a instanceof HTMLElement || a instanceof CSSStyleRule ? a : a.element;
        l instanceof CSSStyleRule || l.isConnected || this.#s.set(
          c,
          f.filter((p) => p !== a)
        );
      }
    let r = this.#s.get(t);
    r || (r = [], this.#s.set(t, r)), r.push(s ? { element: e, attrName: s } : e), e instanceof HTMLElement && this.#$(e, s, o);
    const h = this.#o(t);
    s ? C(e, s, h) : this.#S(e, h);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !T(e) || (this.#i.set(t, e), this.#h?.setFormValue(this.#i));
  }
  #e(t, e, s) {
    const o = this.#t, i = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new m(
      `component ${o.elementName()}` + (t ? `, element "${i}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${s}`
    );
  }
  #c(t, e, s) {
    this.#e(t, e, `refers to missing property "${s}"`);
  }
  #A(t, e) {
    return this.#E(t, this.getAttribute(e));
  }
  #E(t, e) {
    if (e?.match(E)) return e;
    const s = this.#t, { type: o } = s.properties[t];
    if (o || this.#e(null, t, "does not specify its type"), o === String) return e;
    if (o === Number) return S(e);
    if (o === Boolean)
      return e === "true" ? !0 : e === "false" || e === "null" ? !1 : (e && e !== t && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === t);
  }
  // Updates the matching attribute for a property if there is one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #L(t, e, s, o) {
    if (T(s) && this.hasAttribute(o)) {
      const i = e === Boolean ? this.hasAttribute(o) : this.#A(t, o);
      s !== i && k(this, t, s);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #k(t) {
    const s = this.#t.propToComputedMap.get(t) || [];
    for (const [o, i] of s)
      this[o] = this.#o(i);
  }
  #S(t, e) {
    if (e === void 0) return;
    const s = t instanceof HTMLElement, o = typeof e;
    o !== "string" && o !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    ), t instanceof HTMLElement && d(t) ? t.value = e : s && o === "string" && e.trim().startsWith("<") ? (t.innerHTML = e, this.#C(t), this.#b(t)) : s && (t.textContent = e);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #H(t, e) {
    const s = this.#l.get(t);
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
        const i = M(t, s);
        i !== void 0 && (this[o] = i);
        const r = this.#t.properties[o];
        r.state = t, r.stateProp = s;
      }
    t.addListener(this, e);
  }
  #O() {
    const t = this.#t, e = new Set(Object.keys(t.properties));
    for (const o of e)
      _.has(o) && this.#e(
        null,
        "",
        `property "${o}" is not allowed because it is a reserved attribute`
      );
    const s = this.#t.name;
    for (const o of this.getAttributeNames())
      if (o !== "class" && o !== "id" && o !== "disabled" && !o.startsWith("on")) {
        if (o === "form-assoc") {
          if (!t.formAssociated)
            throw new m(
              `add "static formAssociated = true;" to class ${s}`
            );
          continue;
        }
        if (!e.has(u.getPropName(o))) {
          if (o === "name") {
            if (t.formAssociated) continue;
            throw new m(
              `name attribute requires "static formAssociated = true;" in class ${s}`
            );
          }
          this.#e(null, o, "is not a supported attribute");
        }
      }
  }
  #u(t, e, s) {
    const o = s.match(E);
    if (o)
      return o.forEach((i) => {
        const r = g(i);
        this[r] === void 0 && this.#c(t, e, r);
      }), o;
  }
  #F(t, e) {
    for (const [s, o] of Object.entries(e)) {
      let i = M(t, s);
      if (i === void 0)
        throw new m(`invalid state path "${s}"`);
      i = this[o], this.#r(o) || this.#e(
        null,
        o,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  #j(t, e, s) {
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
          let h = r.slice(2);
          h = h[0].toLowerCase() + h.slice(1).toLowerCase();
          const c = i.value;
          this.#u(s, r, c);
          let f;
          typeof this[c] == "function" ? f = (a) => this[c](a) : (this.#u(s, r, c), f = () => this.#o(c)), s.addEventListener(h, f), o.push(r);
        }
      }
      for (const i of o)
        s.removeAttribute(i);
    }
  }
}
function Z(n, ...t) {
  let e = x(n, t);
  for (; ; ) {
    const s = O.exec(e);
    if (!s) break;
    const o = s[2];
    if ($.test(o)) {
      const i = s[1];
      if (!i.startsWith("--")) {
        const r = `--${i}: ${o};
      ${i}: var(--${i})`;
        e = L(e, s.index, s[0].length, r);
      }
    }
  }
  return e;
}
function K(n, ...t) {
  let e = x(n, t);
  for (; ; ) {
    const s = V.exec(e);
    if (!s || s[1] === "style") break;
    const o = q(s[2]);
    if ($.test(o)) {
      const i = `<!-- ${o.trim()} -->`, r = s.index + s[0].indexOf(">") + 1;
      e = L(e, r, o.length, i);
    }
  }
  return e;
}
export {
  u as Wrec,
  z as createElement,
  Z as css,
  K as html
};

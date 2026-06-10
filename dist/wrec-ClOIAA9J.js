import e from "xss";
//#region src/proxies.ts
function t(e, n, r = "") {
	let i = /* @__PURE__ */ new WeakMap();
	return new Proxy(e, {
		get(e, a) {
			let o = Reflect.get(e, a);
			if (typeof o != "object" || !o) return o;
			let s = i.get(o);
			if (s) return s;
			let c = t(o, n, r ? `${r}.${a}` : a);
			return i.set(o, c), c;
		},
		set(e, t, i) {
			let a = Reflect.get(e, t);
			return a !== i && (Reflect.set(e, t, i), n(r ? `${r}.${t}` : t, a, i)), !0;
		}
	});
}
function n(e) {
	let t = Array.isArray(e) ? [] : {};
	for (let [r, i] of Object.entries(e)) t[r] = typeof i == "object" && i ? n(i) : i;
	return t;
}
//#endregion
//#region src/wrec-state.ts
var r = typeof window < "u" && window.document !== void 0, i = class extends Error {}, a = class e {
	static #e = /* @__PURE__ */ new Map();
	static {
		r && window.addEventListener("beforeunload", () => {
			for (let [e, t] of this.#e.entries()) if (t.#i) {
				let r = n(t);
				sessionStorage.setItem("wrec-state-" + e, JSON.stringify(r));
			}
		});
	}
	static get(e) {
		return this.#e.get(e);
	}
	#t = [];
	#n = Symbol("objectId");
	#r;
	#i;
	#a;
	constructor(n, a, o) {
		let s = typeof a == "boolean" ? a : !1;
		if (o = typeof a == "boolean" ? o : a, !n) throw new i("name cannot be empty");
		if (e.#e.has(n)) throw new i(`WrecState with name "${n}" already exists`);
		if (this.#r = n, this.#i = s, this.#a = t({}, this.#s.bind(this)), s && r) {
			let e = sessionStorage.getItem("wrec-state-" + n), t = e ? JSON.parse(e) : void 0;
			t && (o = t);
		}
		if (o) for (let [e, t] of Object.entries(o)) this.addProperty(e, t);
		e.#e.set(n, this);
	}
	subscribe(e, t = []) {
		if (this.#t.some((t) => t.callback === e)) throw new i("WrecState subscribe was passed a callback that was already added");
		let n = {
			callback: e,
			statePaths: t
		};
		return this.#t.push(n), () => {
			this.#t = this.#t.filter((e) => e !== n);
		};
	}
	addProperty(e, t) {
		Object.defineProperty(this, e, {
			enumerable: !0,
			get() {
				return this.#a[e];
			},
			set(t) {
				this.#a[e] = t;
			}
		}), this.#a[e] = t;
	}
	get id() {
		return this.#n;
	}
	#o(e, t) {
		return t.some((t) => e === t || e.startsWith(t + ".") || t.startsWith(e + "."));
	}
	log() {
		console.log("WrecState:", this.#r);
		for (let [e, t] of Object.entries(this.#a)) console.log(`  ${e} = ${JSON.stringify(t)}`);
	}
	#s(e, t, n) {
		let r = {
			state: this,
			statePath: e,
			oldValue: t,
			newValue: n
		};
		for (let { callback: t, statePaths: n } of this.#t) (n.length === 0 || this.#o(e, n)) && t(r);
	}
};
r && process.env.NODE_ENV === "development" && (window.WrecState = a);
//#endregion
//#region src/paths.ts
function o(e, t) {
	let n = c(t), r = e;
	for (let e of n) {
		if (!s(r)) return;
		r = r[e];
	}
	return r;
}
function s(e) {
	return typeof e == "object" && !!e;
}
function c(e) {
	if (e = e.trim(), !e) throw Error("path cannot be empty");
	let t = e.split(".");
	if (t.some((e) => e.length === 0)) throw Error(`path "${e}" contains an empty segment`);
	return t;
}
function l(e, t, n) {
	let r = c(t), i = r.length - 1, a = e;
	r.forEach((e, o) => {
		if (!s(a)) {
			let e = r.slice(0, o).join(".");
			throw Error(`cannot set path "${t}": "${e}" is not object-like`);
		}
		let c = a;
		if (o === i) {
			c[e] = n;
			return;
		}
		let l = c[e];
		if (l === void 0) {
			let e = r.slice(0, o + 1).join(".");
			throw Error(`cannot set path "${t}": missing "${e}"`);
		}
		if (!s(l)) {
			let e = r.slice(0, o + 1).join(".");
			throw Error(`cannot set path "${t}": "${e}" is not object-like`);
		}
		a = l;
	});
}
//#endregion
//#region src/evaluation.ts
var u = "[a-zA-Z_$][a-zA-Z_$0-9]*", d = RegExp(`this\\.(${u})\\s*\\(`, "g"), ee = /<!--\s*(.*?)\s*-->/, f = RegExp(`^this\\.${u}$`), p = RegExp(`this\\.${u}(\\.${u})*`, "g"), m = RegExp(`this\\.${u}(\\.${u})*`);
function h(e, t) {
	for (let [n, r] of Object.entries(t)) e[n] === void 0 && (e[n] = te(r));
}
function g(e, t) {
	let n = Object.entries(t).filter(([e, t]) => !!t.computed).map(([e]) => e), r = new Set(n), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
	for (let o of n) {
		let n = t[o].computed, s = /* @__PURE__ */ new Set();
		for (let r of n.matchAll(p)) {
			let n = y(r[0]), i = x(n), a = !1;
			for (let [e, n] of Object.entries(t)) S(n.usedBy)?.includes(i) && (s.add(e), a = !0);
			!a && typeof e[n] != "function" && s.add(n);
		}
		for (let e of n.matchAll(d)) {
			let n = e[1];
			for (let [e, r] of Object.entries(t)) S(r.usedBy)?.includes(n) && s.add(e);
		}
		i.set(o, [...s].filter((e) => r.has(e)).sort()), a.set(o, n);
	}
	return {
		computedNames: n,
		dependenciesMap: i,
		expressions: a
	};
}
function _(e, t) {
	let { computedNames: n, dependenciesMap: r, expressions: i } = g(t, e.properties ?? {}), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = [];
	for (let e of n) {
		let t = r.get(e) ?? [];
		o.set(e, t.length), t.length === 0 && s.push(e);
		for (let n of t) {
			let t = a.get(n) ?? [];
			t.push(e), a.set(n, t);
		}
	}
	let c = [];
	for (let e = 0; e < s.length; e++) {
		let t = s[e];
		c.push(t);
		let n = a.get(t) ?? [];
		for (let e of n) {
			let t = o.get(e) - 1;
			o.set(e, t), t === 0 && s.push(e);
		}
	}
	if (c.length !== n.length) {
		let e = n.filter((e) => o.get(e) > 0).sort();
		throw Error(`computed properties form a cycle: ${e.join(", ")}`);
	}
	let l = e.context ?? {};
	for (let e of c) t[e] = v(i.get(e), t, l);
}
function te(e) {
	return e.value === void 0 ? Array.isArray(e.values) && e.values.length > 0 ? e.values[0] : ne(e.type) : e.value;
}
function ne(e) {
	return e === String ? "" : e === Number ? 0 : e === Boolean ? !1 : e === Array ? [] : e === Object ? {} : void 0;
}
function v(e, t, n = {}) {
	return Function("context", `const {${Object.keys(n).join(",")}} = context; return ${e};`).call(t, n);
}
function y(e) {
	return e.substring(5).split(".")[0];
}
function b(e, t = {}) {
	let n = Object.create(e.prototype);
	return Object.assign(n, t), h(n, e.properties ?? {}), _(e, n), n;
}
function x(e) {
	return `get ${e}`;
}
function S(e) {
	return typeof e == "string" ? [e] : e;
}
//#endregion
//#region src/sanitize-xss.ts
var C = "__WREC", re = "__", ie = "[A-Za-z_$][A-Za-z0-9_$]*", ae = new Set([
	"checked",
	"colspan",
	"disabled",
	"for",
	"id",
	"max",
	"min",
	"name",
	"rowspan",
	"scope",
	"selected",
	"type",
	"value"
]);
function oe(e, t) {
	return `${C}${e}_${t}${re}`;
}
function w(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function T(e) {
	let t = e.trim();
	return t ? RegExp(`^${ie}$`).test(t) ? !0 : t.startsWith("this.") : !1;
}
function se(t) {
	let n = {
		allowCommentTag: !0,
		onTagAttr(e, t, n) {
			if (t.startsWith("on")) return T(n) ? `${t}="${w(n)}"` : "";
			if (t === "title" || t.startsWith("aria-") || t.startsWith("data-")) return `${t}="${w(n)}"`;
			if (e === "a" && t === "href" && n.startsWith("javascript")) return "";
		},
		safeAttrValue(e, t, n) {
			return t === "class" || ae.has(t) || e === "a" && t === "href" || e === "img" && t === "src" ? n : "";
		},
		stripIgnoreTagBody: [
			"script",
			"style",
			"iframe"
		],
		whiteList: {
			...e.getDefaultWhiteList(),
			button: [
				"class",
				"id",
				"type"
			],
			input: [
				"checked",
				"class",
				"disabled",
				"id",
				"max",
				"min",
				"name",
				"type",
				"value"
			],
			label: [
				"class",
				"for",
				"id"
			],
			option: [
				"class",
				"id",
				"selected",
				"value"
			],
			span: ["class", "id"],
			th: [
				"class",
				"colspan",
				"id",
				"rowspan",
				"scope"
			]
		}
	}, r = [], i = Date.now() + Math.floor(Math.random() * 1e6);
	t = t.replace(/<!--[\s\S]*?-->/g, (e) => {
		let t = oe(i, r.length);
		return r.push({
			comment: e,
			token: t
		}), t;
	});
	let a = e(t, n);
	return r.forEach(({ comment: e, token: t }) => {
		a = a.replaceAll(t, e);
	}), a;
}
//#endregion
//#region src/wrec.ts
var E = () => /* @__PURE__ */ new Map(), D = new Set([
	"class",
	"disabled",
	"hidden",
	"id",
	"tabindex",
	"title"
]), O = globalThis.HTMLElement ?? class {}, k = globalThis.customElements ?? {
	get: (e) => void 0,
	getName: (e) => null,
	define: () => {},
	initialize: (e) => {},
	upgrade: (e) => {},
	whenDefined: () => Promise.reject(/* @__PURE__ */ Error("customElements is not available in this environment"))
}, A = class extends Error {}, j = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, M = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g;
function N(e) {
	return e instanceof HTMLButtonElement || e instanceof HTMLFieldSetElement || e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement || e instanceof $;
}
function P(e, t, n) {
	let r = document.createElement(e);
	if (t) for (let [e, n] of Object.entries(t)) r.setAttribute(e, n);
	return n && (r.innerHTML = n), r;
}
var F = (e) => Array.isArray(e.values) && e.values.length > 0 ? e.values[0] : I(e.type), I = (e) => e === String ? "" : e === Number ? 0 : e === Boolean ? !1 : e === Array ? [] : e === Object ? {} : void 0;
function L(e) {
	let t = [], n = e.firstElementChild;
	for (; n;) t.push(n), n.shadowRoot && t.push(...L(n.shadowRoot)), n.firstElementChild && t.push(...L(n)), n = n.nextElementSibling;
	return t;
}
function R(e, t) {
	let n = e;
	for (; n;) {
		let e = Object.getOwnPropertyDescriptor(n, t);
		if (e) return e;
		n = Object.getPrototypeOf(n);
	}
}
function z(e) {
	return e.substring(4).trim();
}
function B(e, t) {
	let n = e[0];
	return t.forEach((t, r) => {
		n += t + e[r + 1];
	}), n;
}
function V(e) {
	return e instanceof HTMLInputElement && e.type === "checkbox";
}
function H(e) {
	return e.startsWith("get ");
}
function U(e) {
	let t = typeof e;
	return t === "string" || t === "number" || t === "boolean";
}
function W(e) {
	return e instanceof HTMLInputElement && e.type === "radio";
}
function G(e) {
	return e.localName === "textarea";
}
function K(e) {
	let { localName: t } = e;
	return t === "input" || t === "select";
}
var q = (e) => `get ${e}`, ce = (e) => e.replace(/<!--[\s\S]*?-->/g, "");
function J(e, t, n, r) {
	return e.slice(0, t) + r + e.slice(t + n);
}
function Y(e) {
	let t = Number(e);
	if (isNaN(t)) throw new A(`can't convert "${e}" to a number`);
	return t;
}
function X(e, t, n) {
	let [r] = t.split(":");
	if (r === "checked" && W(e) && typeof n == "string") {
		let t = e.value === n;
		t ? e.setAttribute(r, r) : e.removeAttribute(r), e.checked = t;
		return;
	}
	if (U(n)) if (typeof n == "boolean") {
		n ? e.setAttribute(r, r) : e.removeAttribute(r);
		let t = $.getPropName(r);
		e[t] = n;
	} else {
		let i = e.getAttribute(t), a = String(n);
		i !== a && (e.setAttribute(r, a), r === "value" && K(e) && (e.value = a));
	}
	else {
		let r = $.getPropName(t);
		e[r] = n;
	}
}
function Z(e, t, n) {
	let [r] = t.split(":");
	e instanceof CSSStyleRule ? e.style.getPropertyValue(r) !== n && e.style.setProperty(r, n) : (X(e, r, n), r === "value" && K(e) && e.value !== n && (e.value = n));
}
var Q = (e) => typeof e == "string" ? [e] : e;
async function le(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of L(e.content)) {
		let { localName: e } = n;
		e.includes("-") && t.add(e);
	}
	function n(e) {
		return new Promise((t, n) => {
			setTimeout(() => {
				let t = `custom element <${e}> not defined`;
				n(Error(t));
			}, 1e3);
		});
	}
	return Promise.all([...t].map(async (e) => Promise.race([k.whenDefined(e), n(e)])));
}
var $ = class e extends O {
	static {
		this.attrToPropMap = /* @__PURE__ */ new Map();
	}
	static {
		this.propToAttrMap = /* @__PURE__ */ new Map();
	}
	static {
		this.context = {};
	}
	static {
		this.css = "";
	}
	static {
		this.elementName = "";
	}
	static {
		this.formAssociated = !1;
	}
	static {
		this.html = "";
	}
	static {
		this.template = null;
	}
	#e = !1;
	#t = /* @__PURE__ */ new Set();
	#n = this.constructor;
	#r = !1;
	#i = /* @__PURE__ */ new Map();
	#a = {};
	#o;
	#s = {};
	#c = null;
	#l = /* @__PURE__ */ new Map();
	#u = /* @__PURE__ */ new Map();
	#d = /* @__PURE__ */ new WeakMap();
	#f = /* @__PURE__ */ new WeakSet();
	#p = /* @__PURE__ */ new Map();
	static define(e) {
		if (this.elementName = e, k.get(e)) throw new A(`custom element ${e} is already defined`);
		k.define(e, this);
	}
	constructor() {
		super(), this.attachShadow({ mode: "open" });
		let e = this.#n;
		this.#A("attrToPropMap") || (e.attrToPropMap = /* @__PURE__ */ new Map()), this.#A("computedGraph") || (e.computedGraph = null), this.#A("computedPropsRegistered") || (e.computedPropsRegistered = !1), this.#A("properties") || (e.properties = {}), this.#A("propToAttrMap") || (e.propToAttrMap = /* @__PURE__ */ new Map()), this.#A("propToComputedMap") || (e.propToComputedMap = /* @__PURE__ */ new Map()), this.#A("propToExprsMap") || (e.propToExprsMap = /* @__PURE__ */ new Map()), this.#A("registeredComputedProps") || (e.registeredComputedProps = /* @__PURE__ */ new Set());
	}
	attributeChangedCallback(t, n, r) {
		t === "disabled" && this.#y();
		let i = e.getPropName(t);
		if (!this.#M(i) && this.#j(i)) {
			let e = this.#K(i, r);
			this.#B(i, e);
			let t = this.#a[i];
			t && this.setFormValue(t, String(e));
		}
	}
	batchSet(e) {
		let t = this.#$(e);
		if (t.entries.length === 0) return;
		let [n, r] = t.entries[0];
		if (t.errors.length) {
			this.#b(n, r, t.errors);
			return;
		}
		this.#e = !0;
		let i = this.#n.propToExprsMap, a = /* @__PURE__ */ new Set();
		try {
			for (let [e, n] of t.entries) {
				this.#B(e, n);
				let t = i.get(e) ?? [];
				for (let e of t) a.add(e);
			}
			let e = this.#E(t.entries.map(([e]) => e));
			for (let [t, n] of e) {
				this.#z(t, this.#C(n));
				let e = i.get(t) ?? [];
				for (let t of e) a.add(t);
			}
			this.#S([...a]);
		} finally {
			this.#e = !1;
		}
		for (let [e, n] of t.entries) this.#n.properties[e] && this.#b(e, n, []);
	}
	async #m() {
		let e = this.#n, { template: t } = e;
		t || (t = e.template = document.createElement("template"), t.innerHTML = e.buildHTML()), await le(t), this.shadowRoot.replaceChildren(t.content.cloneNode(!0));
	}
	static buildHTML() {
		let e = "<style>\n    :host([hidden]) { display: none; }";
		this.css && (e += this.css), e += "</style>\n";
		let t = this.html.trim();
		if (!t) throw new A("static property html must be set");
		return t.startsWith("<") || (t = `<span><!--${t}--></span>`), e + t;
	}
	changed(e, t, n) {
		this.#B(t, n);
	}
	#h() {
		let { properties: e } = this.#n;
		for (let [t, { computed: n }] of Object.entries(e)) n && this.#z(t, this.#C(n));
	}
	async connectedCallback() {
		this.#Q(), this.#g(), await this.#m(), this.hasAttribute("disabled") && this.#y(), this.#ae(this.shadowRoot), this.#P(this.shadowRoot), this.#Z(), this.#h(), this.ready();
	}
	#g() {
		let { observedAttributes: e, properties: t } = this.#n;
		for (let [n, r] of Object.entries(t)) r.computed || this.#_(n, r, e);
		for (let [n, r] of Object.entries(t)) r.computed && this.#_(n, r, e);
		this.#L();
	}
	#_(t, n, r) {
		if (t === "class" || t === "style") throw new A(`"${t}" is a reserved property`);
		let i = e.getAttrName(t), a = this.hasAttribute(i);
		n.required && !a && this.#U(this, i, "is a required attribute");
		let o = n.value;
		this.hasOwnProperty(t) && (o = this.#D(t), this.#v(t));
		let { type: s } = n, c = s === Boolean ? o || a : r.includes(i) && a ? this.#G(t, i) : o ?? F(n), u = "#" + t;
		this.#B(u, this.#N(t, s, c)), Object.defineProperty(this, t, {
			enumerable: !0,
			get() {
				return this.#D(u);
			},
			set(e) {
				n.computed && !this.#t.has(t) && this.#U(null, t, "is a computed property and cannot be set directly"), s === Number && typeof e == "string" && (e = Y(e));
				let r = this.#D(u);
				if (e === r) return;
				this.#re(t, s, e);
				let a = this.#ee(n, t, e);
				if (!a.skipped && a.errors.length) {
					this.#b(t, e, a.errors);
					return;
				}
				e = this.#N(t, s, e), this.#B(u, e);
				let o = this.#u.get(t);
				o && l(o.state, o.stateProp, e), this.#q(t, s, e, i), this.#e || (this.#J(t), this.#I(t)), this.#X(t, e);
				let c = this.#a[t];
				c && this.setFormValue(c, String(e)), this.propertyChangedCallback(t, r, e), a.skipped || this.#b(t, e, a.errors), n.dispatch && this.dispatch("change", {
					tagName: this.localName,
					property: t,
					oldValue: r,
					value: e
				});
			}
		});
	}
	#v(e) {
		delete this[e];
	}
	#y() {
		let t = this.hasAttribute("disabled"), n = L(this.shadowRoot);
		for (let r of n) N(r) && (r instanceof e ? t ? r.setAttribute("disabled", "") : r.removeAttribute("disabled") : r.disabled = t);
	}
	disconnectedCallback() {
		for (let { unsubscribe: e } of this.#p.values()) e();
		this.#i.clear(), this.#s = {}, this.#l.clear(), this.#u.clear(), this.#p.clear();
	}
	dispatch(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			bubbles: !0,
			composed: !0,
			detail: t
		}));
	}
	#b(e, t, n) {
		let r = n.length === 0;
		this.#r = !0;
		try {
			this.dispatch("validation", {
				instance: this,
				property: e,
				valid: r,
				value: t,
				errors: n
			});
		} finally {
			this.#r = !1;
		}
	}
	displayIfSet(e, t = "block") {
		return `display: ${e == null ? "none" : t}`;
	}
	#x(t) {
		let n = t instanceof e;
		for (let r of t.getAttributeNames()) {
			let i = t.getAttribute(r);
			if (r === "ref") {
				this.#H(t, i);
				continue;
			}
			let a = this.#F(t, i);
			if (a) {
				let i = this.#D(a);
				i === void 0 && this.#W(t, r, a);
				let [o, s] = r.split(":"), c = e.getPropName(o);
				if (o === "checked") {
					let { type: e } = this.#n.properties[a];
					V(t) && e !== Boolean && this.#U(t, r, `refers to property "${a}" whose type is not Boolean`), W(t) && e !== String && this.#U(t, r, `refers to property "${a}" whose type is not String`);
				}
				let l = this.#M(a);
				n && t.#M(c) || (o === "checked" && W(t) ? t.checked = t.value === i : t[c] = i), o === "value" && (s ? (t["on" + s] === void 0 && this.#U(t, r, "refers to an unsupported event name"), t.setAttribute(o, this.#D(a))) : s = "change"), n && !l && t.#l.set(e.getPropName(o), a);
			}
			this.#V(i, t, r);
		}
	}
	#S(e) {
		for (let t of e) {
			let e = this.#C(t), n = this.#i.get(t) ?? [], r = /* @__PURE__ */ new Set();
			for (let t of n) {
				let n = t instanceof HTMLElement || t instanceof CSSStyleRule ? t : t.element;
				if (n instanceof HTMLElement && !n.isConnected) {
					r.add(t);
					continue;
				}
				if (t instanceof HTMLElement) this.#Y(t, e);
				else if (!(t instanceof CSSStyleRule)) {
					let { element: n, attrName: r } = t;
					n instanceof CSSStyleRule ? n.style.setProperty(r, e) : Z(n, r, e);
				}
			}
			if (r.size > 0) {
				let e = n.filter((e) => !r.has(e));
				e.length === 0 ? this.#i.delete(t) : this.#i.set(t, e);
			}
		}
	}
	#C(e) {
		return v(e, this, this.#n.context);
	}
	#w(e) {
		let { localName: t } = e;
		if (t === "style") {
			let { sheet: t } = e, n = t?.cssRules ?? [], r = Array.from(n);
			for (let e of r) if (e.constructor === CSSStyleRule) {
				let t = Array.from(e.style);
				for (let n of t) if (n.startsWith("--")) {
					let t = e.style.getPropertyValue(n);
					this.#V(t, e, n);
				}
			}
		} else {
			let t = "";
			if (G(e)) {
				this.#V(e.textContent, e);
				let n = e.textContent?.match(ee);
				n && (t = n[1]);
			} else {
				let n = Array.from(e.childNodes).find((e) => e.nodeType === Node.COMMENT_NODE);
				n && (t = n.textContent?.trim() ?? "");
			}
			if (t) {
				let n = this.#F(e, t);
				n && G(e) ? e.textContent = this.#D(n) : this.#V(t, e);
			}
		}
	}
	formAssociatedCallback() {
		let e = this.getAttribute("form-assoc");
		if (!e) {
			let t = this.getAttribute("name");
			if (t) if (this.#j("value")) e = `value:${t}`;
			else return;
			else return;
		}
		let t = {}, n = e.split(",");
		for (let e of n) {
			let [n, r] = e.split(":");
			t[n.trim()] = r.trim();
		}
		this.#a = t, this.#o = new FormData(), this.#c = this.attachInternals(), this.#c.setFormValue(this.#o);
		for (let [e, n] of Object.entries(t)) {
			let t = this.#D(e);
			U(t) && this.setFormValue(n, String(t));
		}
		let r = Object.keys(this.#n.properties), i = this.#s;
		for (let e of r) i[e] = this.#D(e);
	}
	formResetCallback() {
		let e = this.#s;
		for (let t of Object.keys(e)) {
			let n = e[t];
			f.test(n) && (n = this.#C(n)), this.#B(t, n);
		}
	}
	static getAttrName(e) {
		let t = this.propToAttrMap.get(e);
		return t || (t = e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), this.propToAttrMap.set(e, t)), t;
	}
	#T() {
		let e = this.#n, t = e.computedGraph;
		if (t) return t;
		let n = E(), r = E(), i = {};
		for (let t of e.registeredComputedProps) n.set(t, []);
		for (let [t, a] of e.propToComputedMap) for (let [o, s] of a) {
			if (i[o] = s, !e.registeredComputedProps.has(o) || (n.has(o) || n.set(o, []), !e.registeredComputedProps.has(t))) continue;
			n.get(o).push(t);
			let a = r.get(t);
			a || (a = [], r.set(t, a)), a.push(o);
		}
		return t = {
			computedToDependenciesMap: n,
			computedToDependentsMap: r,
			computedToExprMap: i
		}, e.computedGraph = t, t;
	}
	#E(e) {
		let { computedToDependenciesMap: t, computedToDependentsMap: n, computedToExprMap: r } = this.#T(), i = this.#n.propToComputedMap, a = /* @__PURE__ */ new Set(), o = [...new Set(e)];
		for (let e = 0; e < o.length; e++) {
			let t = o[e], n = i.get(t) || [];
			for (let [e, t] of n) r[e] = t, a.has(e) || (a.add(e), o.push(e));
		}
		let s = [...a].filter((e) => (t.get(e) || []).filter((e) => a.has(e)).length === 0), c = [], l = /* @__PURE__ */ new Map();
		for (let e of a) {
			let n = t.get(e) || [], r = 0;
			for (let e of n) a.has(e) && r++;
			l.set(e, r);
		}
		for (let e = 0; e < s.length; e++) {
			let t = s[e];
			c.push(t);
			let r = n.get(t) || [];
			for (let e of r) {
				if (!a.has(e)) continue;
				let t = l.get(e) - 1;
				l.set(e, t), t === 0 && s.push(e);
			}
		}
		if (c.length !== a.size) throw new A(`computed properties form a cycle: ${[...a].filter((e) => l.get(e) > 0).sort().join(", ")}`);
		return c.map((e) => [e, r[e]]);
	}
	#D(e) {
		return this[e];
	}
	static getPropName(e) {
		let t = this.attrToPropMap.get(e);
		return t || (t = e.replace(/-([a-z])/g, (e, t) => t.toUpperCase()), this.attrToPropMap.set(e, t)), t;
	}
	#O(e, t, n) {
		let r = this.#D("#" + e), i = this.#u.get(e);
		i && l(i.state, i.stateProp, r), this.#e || (this.#J(e), this.#I(e)), this.#X(e, r), this.propertyChangedCallback(e, t, n);
	}
	#k(e, t, n) {
		if (n.length !== 1) return;
		let [r] = n;
		if (!f.test(r)) return;
		let i = V(e), a = W(e), o = K(e) || G(e), [s, c] = (t ?? "").split(":");
		if (!(o && s === "value" || i && s === "checked" || a && s === "checked" || G(e))) return;
		c ? e["on" + c] === void 0 && this.#U(e, t, "refers to an unsupported event name") : c = "change";
		let l = y(r);
		e.addEventListener(c, (e) => {
			let { target: t } = e;
			if (!t) return;
			let { type: n } = this.#n.properties[l], r = t, { value: o } = r;
			s === "checked" ? i ? this.#B(l, r.checked) : a && r.checked && this.#B(l, o) : this.#B(l, n === Number ? Y(o) : o), this.#I(l);
		});
	}
	#A(e) {
		return Object.hasOwn(this.#n, e);
	}
	#j(e) {
		return !!this.#n.properties[e];
	}
	#M(e) {
		return !!this.#n.properties[e]?.computed;
	}
	#N(e, n, r) {
		if (typeof r != "object" || !r || n !== Array && n !== Object || this.#f.has(r)) return r;
		let i = this.#d.get(r);
		if (i) return i;
		let a = t(r, (t, n, r) => {
			this.#O(e, n, r);
		});
		return this.#d.set(r, a), this.#f.add(a), a;
	}
	#P(e) {
		let t = Array.from(e.querySelectorAll("*"));
		for (let e of t) this.#x(e), e.firstElementChild || this.#w(e);
	}
	static get observedAttributes() {
		let t = Object.entries(this.properties || {}).filter(([e, t]) => !t.computed).map(([t]) => e.getAttrName(t));
		return t.includes("disabled") || t.push("disabled"), t;
	}
	propertyChangedCallback(e, t, n) {}
	#F(e, t) {
		if (!t || !f.test(t)) return;
		let n = y(t);
		return this.#D(n) === void 0 && this.#W(e, "", n), n;
	}
	#I(e) {
		let t = this.#n.propToExprsMap.get(e) || [];
		this.#S(t);
	}
	ready() {}
	#L() {
		let e = this.#n;
		if (!e.computedPropsRegistered) {
			e.computedPropsRegistered = !0, e.computedGraph = null;
			for (let [t, n] of Object.entries(e.properties)) n.computed && this.#R(t, n);
		}
	}
	#R(e, t) {
		let n = this.#n;
		n.registeredComputedProps.add(e);
		let r = n.propToComputedMap;
		function i(t, n) {
			let i = r.get(t);
			i || (i = [], r.set(t, i)), i.push([e, n]);
		}
		let a = t.computed;
		for (let t of a.matchAll(p)) {
			let r = y(t[0]);
			this.#D(r) === void 0 && this.#W(null, e, r);
			let o = q(r), s = !1;
			for (let [e, t] of Object.entries(n.properties)) Q(t.usedBy)?.includes(o) && (i(e, a), s = !0);
			!s && typeof this.#D(r) != "function" && i(r, a);
		}
		for (let t of a.matchAll(d)) {
			let r = t[1];
			if (typeof this.#D(r) != "function") throw new A(`property ${e} computed calls non-method ${r}`);
			for (let [e, t] of Object.entries(n.properties)) Q(t.usedBy)?.includes(r) && i(e, a);
		}
	}
	#z(e, t) {
		this.#t.add(e);
		try {
			this.#B(e, t);
		} finally {
			this.#t.delete(e);
		}
	}
	#B(e, t) {
		this[e] = t;
	}
	#V(e, t, n = void 0) {
		if (!e) return;
		let r = this.#te(t, n, e);
		if (!r) {
			let r = e.replaceAll("this..", "this.");
			n ? Z(t, n, r) : "textContent" in t && (t.textContent = r);
			return;
		}
		let i = this.#n;
		r.forEach((t) => {
			let n = y(t);
			if (typeof this.#D(n) == "function") return;
			let r = i.propToExprsMap, a = r.get(n);
			a || (a = [], r.set(n, a)), a.includes(e) || a.push(e);
		});
		for (let [e, t] of this.#i.entries()) for (let n of t) {
			let r = n instanceof HTMLElement || n instanceof CSSStyleRule ? n : n.element;
			r instanceof CSSStyleRule || r.isConnected || this.#i.set(e, t.filter((e) => e !== n));
		}
		let a = this.#i.get(e);
		a || (a = [], this.#i.set(e, a)), a.push(n ? {
			element: t,
			attrName: n
		} : t), t instanceof HTMLElement && this.#k(t, n, r);
		let o = this.#C(e);
		n ? Z(t, n, o) : this.#Y(t, o);
	}
	#H(e, t) {
		let n = t?.trim() ?? "", r = this.#n.properties[n];
		r || this.#W(e, "ref", n), r.type !== O && this.#U(e, "ref", `refers to property "${n}" whose type is not HTMLElement`), this.#D(n) && this.#U(e, "ref", `is a duplicate reference to the property "${n}"`), this.#B(n, e), e.removeAttribute("ref");
	}
	setAttributeSafe(e, t) {
		this.hasAttribute(e) || this.setAttribute(e, t);
	}
	setFormValue(e, t) {
		!this.#o || !U(t) || (this.#o.set(e, t), this.#c?.setFormValue(this.#o));
	}
	static ssr(e = {}) {
		throw new A("SSR is not available in the browser build.");
	}
	#U(e, t, n) {
		let r = e instanceof HTMLElement ? e.localName : "CSS rule";
		throw new A(`component ${this.#n.elementName}` + (e ? `, element "${r}"` : "") + (t ? `, attribute "${t}"` : "") + ` ${n}`);
	}
	#W(e, t, n) {
		this.#U(e, t, `refers to missing property "${n}"`);
	}
	#G(e, t) {
		return this.#K(e, this.getAttribute(t));
	}
	#K(t, n) {
		if (n?.match(p)) return n;
		let r = this.#n.properties[t], { type: i, values: a } = r;
		if (i || this.#U(null, t, "does not specify its type"), n === null) return i === Boolean ? !1 : F(r);
		if (i === String) {
			if (a && !a.includes(n)) {
				let e = a.map((e) => `"${e}"`).join(", ");
				this.#U(null, t, `must be one of ${e}`);
			}
			return n;
		}
		if (i === Number) return Y(n);
		if (i === Boolean) {
			if (n === "true") return !0;
			if (n === "false" || n === "null") return !1;
			let r = e.getAttrName(t);
			return n && n !== r && this.#U(null, t, "is a Boolean attribute, so its value must match attribute name or be missing"), n === "" || n === r;
		}
	}
	#q(e, t, n, r) {
		U(n) && !this.#M(e) && n !== (t === Boolean ? this.hasAttribute(r) : this.#G(e, r)) && X(this, r || e, n);
	}
	#J(e) {
		for (let [t, n] of this.#E([e])) this.#z(t, this.#C(n));
	}
	#Y(e, t) {
		if (t === void 0) return;
		let n = e instanceof HTMLElement;
		Array.isArray(t) && (t = t.join(""));
		let r = typeof t;
		r !== "string" && r !== "number" && this.#U(e, void 0, " computed content is not a string or number");
		let i = String(t);
		if (e instanceof HTMLElement && G(e)) e.value !== i && (e.value = i);
		else if (n && r === "string" && i.trim().startsWith("<")) {
			let t = se(i);
			if (e.innerHTML === t) return;
			e.innerHTML = t, this.#ae(e), this.#P(e);
		} else n && e.textContent !== i && (e.textContent = i);
	}
	#X(e, t) {
		let n = this.#l.get(e);
		if (!n) return;
		let r = this.getRootNode();
		if (!(r instanceof ShadowRoot)) return;
		let { host: i } = r;
		if (!i) return;
		let a = i;
		a[n] = t;
	}
	#Z() {
		let e = this.#n, t = (e, t, n) => {
			let r = e.get(t);
			r || (r = [], e.set(t, r)), r.includes(n) || r.push(n);
		}, n = () => {
			let n = E();
			e.methodToExprsMap = n;
			let r = Array.from(this.#i.keys());
			for (let e of r) {
				for (let r of e.matchAll(d)) t(n, r[1], e);
				for (let r of e.matchAll(p)) t(n, q(y(r[0])), e);
			}
		}, { properties: r, propToExprsMap: i } = e;
		for (let [t, a] of Object.entries(r)) {
			let r = Q(a.usedBy);
			if (!r) continue;
			e.methodToExprsMap || n();
			let { methodToExprsMap: o } = e, s = i.get(t);
			s || (s = [], i.set(t, s));
			for (let e of r) {
				if (H(e)) {
					let n = z(e);
					if (typeof R(this, n)?.get != "function") throw new A(`property ${t} usedBy contains non-getter ${e}`);
				} else if (typeof this.#D(e) != "function") throw new A(`property ${t} usedBy contains non-method ${e}`);
				let n = o.get(e) || [];
				for (let e of n) s.includes(e) || s.push(e);
			}
		}
	}
	useState(e, t) {
		if (!t) {
			t = {};
			for (let n of Object.keys(e)) t[n] = n;
		}
		this.#ne(e, t);
		for (let [n, r] of Object.entries(t)) if (this.#j(r)) {
			let t = o(e, n);
			t !== void 0 && this.#B(r, t), this.#u.set(r, {
				state: e,
				stateProp: n
			});
		}
		let n = this.#p.get(e), r = {
			...n?.map,
			...t
		};
		n?.unsubscribe();
		let i = e.subscribe(({ statePath: t, newValue: n }) => {
			let i = r[t];
			if (i) {
				this.#B(i, n);
				return;
			}
			let a = Object.keys(r).find((e) => t.startsWith(e + ".") || e.startsWith(t + "."));
			if (!a) return;
			let s = r[a];
			this.#B(s, o(e, a));
		}, Object.keys(r));
		this.#p.set(e, {
			map: r,
			unsubscribe: i
		});
	}
	validate(e) {
		return [];
	}
	#Q() {
		let t = new Set(Object.keys(this.#n.properties));
		for (let n of this.getAttributeNames()) if (!D.has(n) && !n.startsWith("on") && n !== "ref") {
			if (n === "form-assoc") {
				this.#ie();
				continue;
			}
			if (!t.has(e.getPropName(n))) {
				if (n === "name") {
					this.#ie();
					continue;
				}
				this.#U(null, n, "is not a supported attribute");
			}
		}
	}
	#$(e) {
		let t = [], n = [], r = { ...this };
		for (let [i, a] of Object.entries(e)) {
			let e = this.#n.properties[i], o = a;
			if (e) {
				e.computed && this.#U(null, i, "is a computed property and cannot be set directly"), e.type === Number && typeof o == "string" && (o = Y(o)), this.#re(i, e.type, o);
				let t = e.validate?.(o);
				typeof t == "string" && n.push(t);
			}
			t.push([i, o]), r[i] = o;
		}
		return this.#r || n.push(...this.validate(r)), {
			entries: t,
			errors: n
		};
	}
	#ee(e, t, n) {
		if (this.#e || this.#r) return {
			errors: [],
			skipped: !0
		};
		let r = [], { validate: i } = e, a = i?.(n);
		typeof a == "string" && r.push(a);
		let o = {
			...this,
			[t]: n
		};
		return r.push(...this.validate(o)), {
			errors: r,
			skipped: !1
		};
	}
	#te(e, t, n) {
		let r = n.match(p);
		if (r) return r.forEach((n) => {
			let r = y(n);
			this.#D(r) === void 0 && this.#W(e, t, r);
		}), r;
	}
	#ne(e, t) {
		for (let [n, r] of Object.entries(t)) {
			let t = o(e, n);
			t === void 0 && this.#U(this, void 0, `invalid state path "${n}"`), t = this.#D(r), this.#j(r) || this.#U(null, r, "refers to missing property in useState map");
		}
	}
	#re(e, t, n) {
		let { values: r } = this.#n.properties[e];
		if (r) {
			let i;
			t === String ? typeof n == "string" ? r.includes(n) || (i = `must be one of ${r.map((e) => `"${e}"`).join(", ")}`) : i = `value is a ${typeof n}, but type is String` : i = "declares allowed values, but its type is not String", i && this.#U(null, e, i);
		}
		if (n instanceof t) return;
		let i = typeof n;
		if (i === "object") {
			let { constructor: r } = n;
			i = r.name, r !== t && this.#U(null, e, `was set to a ${i}, but must be a ${t.name}`);
		}
		i !== t.name.toLowerCase() && this.#U(null, e, `was set to a ${i}, but must be a ${t.name}`);
	}
	#ie() {
		if (this.#n.formAssociated || this.closest("form") === null) return;
		let e = this.#n.name;
		this.#U(this, void 0, `inside form, class ${e} requires "static formAssociated = true;"`);
	}
	#ae(e) {
		let t = Array.from(e.querySelectorAll("*"));
		for (let e of t) {
			let t = [];
			for (let n of Array.from(e.attributes)) {
				let r = n.name;
				if (r.startsWith("on")) {
					let i = r.slice(2);
					i = i[0].toLowerCase() + i.slice(1).toLowerCase();
					let a = n.value;
					this.#te(e, r, a);
					let o;
					typeof this.#D(a) == "function" ? o = (e) => this.#D(a).call(this, e) : (this.#te(e, r, a), o = () => this.#C(a)), e.addEventListener(i, o), t.push(r);
				}
			}
			for (let n of t) e.removeAttribute(n);
		}
	}
};
function ue(e, ...t) {
	let n = B(e, t);
	for (;;) {
		let e = j.exec(n);
		if (!e) break;
		let t = e[2];
		if (m.test(t)) {
			let r = e[1];
			if (!r.startsWith("--")) {
				let i = `--${r}: ${t};
      ${r}: var(--${r})`;
				n = J(n, e.index, e[0].length, i);
			}
		}
	}
	return n;
}
function de(e, ...t) {
	let n = B(e, t);
	for (;;) {
		let e = M.exec(n);
		if (!e || e[1] === "style") break;
		let t = ce(e[2]);
		if (m.test(t)) {
			let r = `<!-- ${t.trim()} -->`, i = e.index + e[0].indexOf(">") + 1;
			n = J(n, i, t.length, r);
		}
	}
	return n;
}
//#endregion
export { m as a, y as c, de as i, b as l, P as n, f as o, ue as r, v as s, $ as t, a as u };

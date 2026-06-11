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
	#i = /* @__PURE__ */ new Set();
	#a = /* @__PURE__ */ new Map();
	#o = {};
	#s;
	#c = {};
	#l = null;
	#u = /* @__PURE__ */ new Map();
	#d = /* @__PURE__ */ new Map();
	#f = /* @__PURE__ */ new WeakMap();
	#p = /* @__PURE__ */ new WeakSet();
	#m = /* @__PURE__ */ new Map();
	static define(e) {
		if (this.elementName = e, k.get(e)) throw new A(`custom element ${e} is already defined`);
		k.define(e, this);
	}
	constructor() {
		super(), this.attachShadow({ mode: "open" });
		let e = this.#n;
		this.#j("attrToPropMap") || (e.attrToPropMap = /* @__PURE__ */ new Map()), this.#j("computedGraph") || (e.computedGraph = null), this.#j("computedPropsRegistered") || (e.computedPropsRegistered = !1), this.#j("properties") || (e.properties = {}), this.#j("propToAttrMap") || (e.propToAttrMap = /* @__PURE__ */ new Map()), this.#j("propToComputedMap") || (e.propToComputedMap = /* @__PURE__ */ new Map()), this.#j("propToExprsMap") || (e.propToExprsMap = /* @__PURE__ */ new Map()), this.#j("registeredComputedProps") || (e.registeredComputedProps = /* @__PURE__ */ new Set());
	}
	attributeChangedCallback(t, n, r) {
		if (this.#i.has(t)) return;
		t === "disabled" && this.#b();
		let i = e.getPropName(t);
		if (!this.#N(i) && this.#M(i)) {
			let e = this.#J(i, r), a = this.#O(i);
			if (this.#V(i, e), e !== a && this.#O(i) === a) {
				this.#U(t, n);
				return;
			}
			let o = this.#o[i];
			o && this.setFormValue(o, String(e));
		}
	}
	batchSet(e) {
		let t = this.#te(e);
		if (t.entries.length === 0) return;
		let [n, r] = t.entries[0];
		if (t.errors.length) {
			this.#x(n, r, t.errors);
			return;
		}
		this.#e = !0;
		let i = this.#n.propToExprsMap, a = /* @__PURE__ */ new Set();
		try {
			for (let [e, n] of t.entries) {
				this.#V(e, n);
				let t = i.get(e) ?? [];
				for (let e of t) a.add(e);
			}
			let e = this.#D(t.entries.map(([e]) => e));
			for (let [t, n] of e) {
				this.#B(t, this.#w(n));
				let e = i.get(t) ?? [];
				for (let t of e) a.add(t);
			}
			this.#C([...a]);
		} finally {
			this.#e = !1;
		}
		for (let [e, n] of t.entries) this.#n.properties[e] && this.#x(e, n, []);
	}
	async #h() {
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
		this.#V(t, n);
	}
	#g() {
		let { properties: e } = this.#n;
		for (let [t, { computed: n }] of Object.entries(e)) n && this.#B(t, this.#w(n));
	}
	async connectedCallback() {
		this.#ee(), this.#_(), await this.#h(), this.hasAttribute("disabled") && this.#b(), this.#se(this.shadowRoot), this.#F(this.shadowRoot), this.#$(), this.#g(), this.ready();
	}
	#_() {
		let { observedAttributes: e, properties: t } = this.#n;
		for (let [n, r] of Object.entries(t)) r.computed || this.#v(n, r, e);
		for (let [n, r] of Object.entries(t)) r.computed && this.#v(n, r, e);
		this.#R();
	}
	#v(t, n, r) {
		if (t === "class" || t === "style") throw new A(`"${t}" is a reserved property`);
		let i = e.getAttrName(t), a = this.hasAttribute(i);
		n.required && !a && this.#G(this, i, "is a required attribute");
		let o = n.value;
		this.hasOwnProperty(t) && (o = this.#O(t), this.#y(t));
		let { type: s } = n, c = s === Boolean ? o || a : r.includes(i) && a ? this.#q(t, i) : o ?? F(n), u = "#" + t;
		this.#V(u, this.#P(t, s, c)), Object.defineProperty(this, t, {
			enumerable: !0,
			get() {
				return this.#O(u);
			},
			set(e) {
				n.computed && !this.#t.has(t) && this.#G(null, t, "is a computed property and cannot be set directly"), s === Number && typeof e == "string" && (e = Y(e));
				let r = this.#O(u);
				if (e === r) return;
				this.#ae(t, s, e);
				let a = this.#ne(n, t, e);
				if (!a.skipped && a.errors.length) {
					this.#x(t, e, a.errors);
					return;
				}
				e = this.#P(t, s, e), this.#V(u, e);
				let o = this.#d.get(t);
				o && l(o.state, o.stateProp, e), this.#Y(t, s, e, i, n.reflect), this.#e || (this.#X(t), this.#L(t)), this.#Q(t, e);
				let c = this.#o[t];
				c && this.setFormValue(c, String(e)), this.propertyChangedCallback(t, r, e), a.skipped || this.#x(t, e, a.errors), n.dispatch && this.dispatch("change", {
					tagName: this.localName,
					property: t,
					oldValue: r,
					value: e
				});
			}
		});
	}
	#y(e) {
		delete this[e];
	}
	#b() {
		let t = this.hasAttribute("disabled"), n = L(this.shadowRoot);
		for (let r of n) N(r) && (r instanceof e ? t ? r.setAttribute("disabled", "") : r.removeAttribute("disabled") : r.disabled = t);
	}
	disconnectedCallback() {
		for (let { unsubscribe: e } of this.#m.values()) e();
		this.#a.clear(), this.#c = {}, this.#u.clear(), this.#d.clear(), this.#m.clear();
	}
	dispatch(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			bubbles: !0,
			composed: !0,
			detail: t
		}));
	}
	#x(e, t, n) {
		this.#r = !0;
		try {
			this.dispatch("validation", {
				instance: this,
				property: e,
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
	#S(t) {
		let n = t instanceof e;
		for (let r of t.getAttributeNames()) {
			let i = t.getAttribute(r);
			if (r === "ref") {
				this.#W(t, i);
				continue;
			}
			let a = this.#I(t, i);
			if (a) {
				let i = this.#O(a);
				i === void 0 && this.#K(t, r, a);
				let [o, s] = r.split(":"), c = e.getPropName(o);
				if (o === "checked") {
					let { type: e } = this.#n.properties[a];
					V(t) && e !== Boolean && this.#G(t, r, `refers to property "${a}" whose type is not Boolean`), W(t) && e !== String && this.#G(t, r, `refers to property "${a}" whose type is not String`);
				}
				let l = this.#N(a);
				n && t.#N(c) || (o === "checked" && W(t) ? t.checked = t.value === i : t[c] = i), o === "value" && (s ? (t["on" + s] === void 0 && this.#G(t, r, "refers to an unsupported event name"), t.setAttribute(o, this.#O(a))) : s = "change"), n && !l && t.#u.set(e.getPropName(o), a);
			}
			this.#H(i, t, r);
		}
	}
	#C(e) {
		for (let t of e) {
			let e = this.#w(t), n = this.#a.get(t) ?? [], r = /* @__PURE__ */ new Set();
			for (let t of n) {
				let n = t instanceof HTMLElement || t instanceof CSSStyleRule ? t : t.element;
				if (n instanceof HTMLElement && !n.isConnected) {
					r.add(t);
					continue;
				}
				if (t instanceof HTMLElement) this.#Z(t, e);
				else if (!(t instanceof CSSStyleRule)) {
					let { element: n, attrName: r } = t;
					n instanceof CSSStyleRule ? n.style.setProperty(r, e) : Z(n, r, e);
				}
			}
			if (r.size > 0) {
				let e = n.filter((e) => !r.has(e));
				e.length === 0 ? this.#a.delete(t) : this.#a.set(t, e);
			}
		}
	}
	#w(e) {
		return v(e, this, this.#n.context);
	}
	#T(e) {
		let { localName: t } = e;
		if (t === "style") {
			let { sheet: t } = e, n = t?.cssRules ?? [], r = Array.from(n);
			for (let e of r) if (e.constructor === CSSStyleRule) {
				let t = Array.from(e.style);
				for (let n of t) if (n.startsWith("--")) {
					let t = e.style.getPropertyValue(n);
					this.#H(t, e, n);
				}
			}
		} else {
			let t = "";
			if (G(e)) {
				this.#H(e.textContent, e);
				let n = e.textContent?.match(ee);
				n && (t = n[1]);
			} else {
				let n = Array.from(e.childNodes).find((e) => e.nodeType === Node.COMMENT_NODE);
				n && (t = n.textContent?.trim() ?? "");
			}
			if (t) {
				let n = this.#I(e, t);
				n && G(e) ? e.textContent = this.#O(n) : this.#H(t, e);
			}
		}
	}
	formAssociatedCallback() {
		let e = this.getAttribute("form-assoc");
		if (!e) {
			let t = this.getAttribute("name");
			if (t) if (this.#M("value")) e = `value:${t}`;
			else return;
			else return;
		}
		let t = {}, n = e.split(",");
		for (let e of n) {
			let [n, r] = e.split(":");
			t[n.trim()] = r.trim();
		}
		this.#o = t, this.#s = new FormData(), this.#l = this.attachInternals(), this.#l.setFormValue(this.#s);
		for (let [e, n] of Object.entries(t)) {
			let t = this.#O(e);
			U(t) && this.setFormValue(n, String(t));
		}
		let r = Object.keys(this.#n.properties), i = this.#c;
		for (let e of r) i[e] = this.#O(e);
	}
	formResetCallback() {
		let e = this.#c;
		for (let t of Object.keys(e)) {
			let n = e[t];
			f.test(n) && (n = this.#w(n)), this.#V(t, n);
		}
	}
	static getAttrName(e) {
		let t = this.propToAttrMap.get(e);
		return t || (t = e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), this.propToAttrMap.set(e, t)), t;
	}
	#E() {
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
	#D(e) {
		let { computedToDependenciesMap: t, computedToDependentsMap: n, computedToExprMap: r } = this.#E(), i = this.#n.propToComputedMap, a = /* @__PURE__ */ new Set(), o = [...new Set(e)];
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
	#O(e) {
		return this[e];
	}
	static getPropName(e) {
		let t = this.attrToPropMap.get(e);
		return t || (t = e.replace(/-([a-z])/g, (e, t) => t.toUpperCase()), this.attrToPropMap.set(e, t)), t;
	}
	#k(e, t, n) {
		let r = this.#O("#" + e), i = this.#d.get(e);
		i && l(i.state, i.stateProp, r), this.#e || (this.#X(e), this.#L(e)), this.#Q(e, r), this.propertyChangedCallback(e, t, n);
	}
	#A(e, t, n) {
		if (n.length !== 1) return;
		let [r] = n;
		if (!f.test(r)) return;
		let i = V(e), a = W(e), o = K(e) || G(e), [s, c] = (t ?? "").split(":");
		if (!(o && s === "value" || i && s === "checked" || a && s === "checked" || G(e))) return;
		c ? e["on" + c] === void 0 && this.#G(e, t, "refers to an unsupported event name") : c = "change";
		let l = y(r);
		e.addEventListener(c, (e) => {
			let { target: t } = e;
			if (!t) return;
			let { type: n } = this.#n.properties[l], r = t, { value: o } = r;
			s === "checked" ? i ? this.#V(l, r.checked) : a && r.checked && this.#V(l, o) : this.#V(l, n === Number ? Y(o) : o), this.#L(l);
		});
	}
	#j(e) {
		return Object.hasOwn(this.#n, e);
	}
	#M(e) {
		return !!this.#n.properties[e];
	}
	#N(e) {
		return !!this.#n.properties[e]?.computed;
	}
	#P(e, n, r) {
		if (typeof r != "object" || !r || n !== Array && n !== Object || this.#p.has(r)) return r;
		let i = this.#f.get(r);
		if (i) return i;
		let a = t(r, (t, n, r) => {
			this.#k(e, n, r);
		});
		return this.#f.set(r, a), this.#p.add(a), a;
	}
	#F(e) {
		let t = Array.from(e.querySelectorAll("*"));
		for (let e of t) this.#S(e), e.firstElementChild || this.#T(e);
	}
	static get observedAttributes() {
		let t = Object.entries(this.properties || {}).filter(([e, t]) => !t.computed).map(([t]) => e.getAttrName(t));
		return t.includes("disabled") || t.push("disabled"), t;
	}
	propertyChangedCallback(e, t, n) {}
	#I(e, t) {
		if (!t || !f.test(t)) return;
		let n = y(t);
		return this.#O(n) === void 0 && this.#K(e, "", n), n;
	}
	#L(e) {
		let t = this.#n.propToExprsMap.get(e) || [];
		this.#C(t);
	}
	ready() {}
	#R() {
		let e = this.#n;
		if (!e.computedPropsRegistered) {
			e.computedPropsRegistered = !0, e.computedGraph = null;
			for (let [t, n] of Object.entries(e.properties)) n.computed && this.#z(t, n);
		}
	}
	#z(e, t) {
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
			this.#O(r) === void 0 && this.#K(null, e, r);
			let o = q(r), s = !1;
			for (let [e, t] of Object.entries(n.properties)) Q(t.usedBy)?.includes(o) && (i(e, a), s = !0);
			!s && typeof this.#O(r) != "function" && i(r, a);
		}
		for (let t of a.matchAll(d)) {
			let r = t[1];
			if (typeof this.#O(r) != "function") throw new A(`property ${e} computed calls non-method ${r}`);
			for (let [e, t] of Object.entries(n.properties)) Q(t.usedBy)?.includes(r) && i(e, a);
		}
	}
	#B(e, t) {
		this.#t.add(e);
		try {
			this.#V(e, t);
		} finally {
			this.#t.delete(e);
		}
	}
	#V(e, t) {
		this[e] = t;
	}
	#H(e, t, n = void 0) {
		if (!e) return;
		let r = this.#re(t, n, e);
		if (!r) {
			let r = e.replaceAll("this..", "this.");
			n ? Z(t, n, r) : "textContent" in t && (t.textContent = r);
			return;
		}
		let i = this.#n;
		r.forEach((t) => {
			let n = y(t);
			if (typeof this.#O(n) == "function") return;
			let r = i.propToExprsMap, a = r.get(n);
			a || (a = [], r.set(n, a)), a.includes(e) || a.push(e);
		});
		for (let [e, t] of this.#a.entries()) for (let n of t) {
			let r = n instanceof HTMLElement || n instanceof CSSStyleRule ? n : n.element;
			r instanceof CSSStyleRule || r.isConnected || this.#a.set(e, t.filter((e) => e !== n));
		}
		let a = this.#a.get(e);
		a || (a = [], this.#a.set(e, a)), a.push(n ? {
			element: t,
			attrName: n
		} : t), t instanceof HTMLElement && this.#A(t, n, r);
		let o = this.#w(e);
		n ? Z(t, n, o) : this.#Z(t, o);
	}
	#U(e, t) {
		this.#i.add(e);
		try {
			t === null ? this.removeAttribute(e) : this.setAttribute(e, t);
		} finally {
			this.#i.delete(e);
		}
		e === "disabled" && this.#b();
	}
	#W(e, t) {
		let n = t?.trim() ?? "", r = this.#n.properties[n];
		r || this.#K(e, "ref", n), r.type !== O && this.#G(e, "ref", `refers to property "${n}" whose type is not HTMLElement`), this.#O(n) && this.#G(e, "ref", `is a duplicate reference to the property "${n}"`), this.#V(n, e), e.removeAttribute("ref");
	}
	setAttributeSafe(e, t) {
		this.hasAttribute(e) || this.setAttribute(e, t);
	}
	setFormValue(e, t) {
		!this.#s || !U(t) || (this.#s.set(e, t), this.#l?.setFormValue(this.#s));
	}
	static ssr(e = {}) {
		throw new A("SSR is not available in the browser build.");
	}
	#G(e, t, n) {
		let r = e instanceof HTMLElement ? e.localName : "CSS rule";
		throw new A(`component ${this.#n.elementName}` + (e ? `, element "${r}"` : "") + (t ? `, attribute "${t}"` : "") + ` ${n}`);
	}
	#K(e, t, n) {
		this.#G(e, t, `refers to missing property "${n}"`);
	}
	#q(e, t) {
		return this.#J(e, this.getAttribute(t));
	}
	#J(t, n) {
		if (n?.match(p)) return n;
		let r = this.#n.properties[t], { type: i, values: a } = r;
		if (i || this.#G(null, t, "does not specify its type"), n === null) return i === Boolean ? !1 : F(r);
		if (i === String) {
			if (a && !a.includes(n)) {
				let e = a.map((e) => `"${e}"`).join(", ");
				this.#G(null, t, `must be one of ${e}`);
			}
			return n;
		}
		if (i === Number) return Y(n);
		if (i === Boolean) {
			if (n === "true") return !0;
			if (n === "false" || n === "null") return !1;
			let r = e.getAttrName(t);
			return n && n !== r && this.#G(null, t, "is a Boolean attribute, so its value must match attribute name or be missing"), n === "" || n === r;
		}
	}
	#Y(e, t, n, r, i = !0) {
		i && U(n) && !this.#N(e) && n !== (t === Boolean ? this.hasAttribute(r) : this.#q(e, r)) && X(this, r || e, n);
	}
	#X(e) {
		for (let [t, n] of this.#D([e])) this.#B(t, this.#w(n));
	}
	#Z(e, t) {
		if (t === void 0) return;
		let n = e instanceof HTMLElement;
		Array.isArray(t) && (t = t.join(""));
		let r = typeof t;
		r !== "string" && r !== "number" && this.#G(e, void 0, " computed content is not a string or number");
		let i = String(t);
		if (e instanceof HTMLElement && G(e)) e.value !== i && (e.value = i);
		else if (n && r === "string" && i.trim().startsWith("<")) {
			let t = se(i);
			if (e.innerHTML === t) return;
			e.innerHTML = t, this.#se(e), this.#F(e);
		} else n && e.textContent !== i && (e.textContent = i);
	}
	#Q(e, t) {
		let n = this.#u.get(e);
		if (!n) return;
		let r = this.getRootNode();
		if (!(r instanceof ShadowRoot)) return;
		let { host: i } = r;
		if (!i) return;
		let a = i;
		a[n] = t;
	}
	#$() {
		let e = this.#n, t = (e, t, n) => {
			let r = e.get(t);
			r || (r = [], e.set(t, r)), r.includes(n) || r.push(n);
		}, n = () => {
			let n = E();
			e.methodToExprsMap = n;
			let r = Array.from(this.#a.keys());
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
				} else if (typeof this.#O(e) != "function") throw new A(`property ${t} usedBy contains non-method ${e}`);
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
		this.#ie(e, t);
		for (let [n, r] of Object.entries(t)) if (this.#M(r)) {
			let t = o(e, n);
			t !== void 0 && this.#V(r, t), this.#d.set(r, {
				state: e,
				stateProp: n
			});
		}
		let n = this.#m.get(e), r = {
			...n?.map,
			...t
		};
		n?.unsubscribe();
		let i = e.subscribe(({ statePath: t, newValue: n }) => {
			let i = r[t];
			if (i) {
				this.#V(i, n);
				return;
			}
			let a = Object.keys(r).find((e) => t.startsWith(e + ".") || e.startsWith(t + "."));
			if (!a) return;
			let s = r[a];
			this.#V(s, o(e, a));
		}, Object.keys(r));
		this.#m.set(e, {
			map: r,
			unsubscribe: i
		});
	}
	validate(e) {
		return [];
	}
	#ee() {
		let t = new Set(Object.keys(this.#n.properties));
		for (let n of this.getAttributeNames()) if (!D.has(n) && !n.startsWith("on") && n !== "ref") {
			if (n === "form-assoc") {
				this.#oe();
				continue;
			}
			if (!t.has(e.getPropName(n))) {
				if (n === "name") {
					this.#oe();
					continue;
				}
				this.#G(null, n, "is not a supported attribute");
			}
		}
	}
	#te(e) {
		let t = [], n = [], r = { ...this };
		for (let [i, a] of Object.entries(e)) {
			let e = this.#n.properties[i], o = a;
			if (e) {
				e.computed && this.#G(null, i, "is a computed property and cannot be set directly"), e.type === Number && typeof o == "string" && (o = Y(o)), this.#ae(i, e.type, o);
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
	#ne(e, t, n) {
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
	#re(e, t, n) {
		let r = n.match(p);
		if (r) return r.forEach((n) => {
			let r = y(n);
			this.#O(r) === void 0 && this.#K(e, t, r);
		}), r;
	}
	#ie(e, t) {
		for (let [n, r] of Object.entries(t)) {
			let t = o(e, n);
			t === void 0 && this.#G(this, void 0, `invalid state path "${n}"`), t = this.#O(r), this.#M(r) || this.#G(null, r, "refers to missing property in useState map");
		}
	}
	#ae(e, t, n) {
		let { values: r } = this.#n.properties[e];
		if (r) {
			let i;
			t === String ? typeof n == "string" ? r.includes(n) || (i = `must be one of ${r.map((e) => `"${e}"`).join(", ")}`) : i = `value is a ${typeof n}, but type is String` : i = "declares allowed values, but its type is not String", i && this.#G(null, e, i);
		}
		if (n instanceof t) return;
		let i = typeof n;
		if (i === "object") {
			let { constructor: r } = n;
			i = r.name, r !== t && this.#G(null, e, `was set to a ${i}, but must be a ${t.name}`);
		}
		i !== t.name.toLowerCase() && this.#G(null, e, `was set to a ${i}, but must be a ${t.name}`);
	}
	#oe() {
		if (this.#n.formAssociated || this.closest("form") === null) return;
		let e = this.#n.name;
		this.#G(this, void 0, `inside form, class ${e} requires "static formAssociated = true;"`);
	}
	#se(e) {
		let t = Array.from(e.querySelectorAll("*"));
		for (let e of t) {
			let t = [];
			for (let n of Array.from(e.attributes)) {
				let r = n.name;
				if (r.startsWith("on")) {
					let i = r.slice(2);
					i = i[0].toLowerCase() + i.slice(1).toLowerCase();
					let a = n.value;
					this.#re(e, r, a);
					let o;
					typeof this.#O(a) == "function" ? o = (e) => this.#O(a).call(this, e) : (this.#re(e, r, a), o = () => this.#w(a)), e.addEventListener(i, o), t.push(r);
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

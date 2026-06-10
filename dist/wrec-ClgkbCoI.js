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
var u = "[a-zA-Z_$][a-zA-Z_$0-9]*", d = RegExp(`this\\.(${u})\\s*\\(`, "g"), f = /<!--\s*(.*?)\s*-->/, p = RegExp(`^this\\.${u}$`), m = RegExp(`this\\.${u}(\\.${u})*`, "g"), h = RegExp(`this\\.${u}(\\.${u})*`);
function g(e, t) {
	for (let [n, r] of Object.entries(t)) e[n] === void 0 && (e[n] = te(r));
}
function _(e, t) {
	let n = Object.entries(t).filter(([e, t]) => !!t.computed).map(([e]) => e), r = new Set(n), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
	for (let o of n) {
		let n = t[o].computed, s = /* @__PURE__ */ new Set();
		for (let r of n.matchAll(m)) {
			let n = b(r[0]), i = re(n), a = !1;
			for (let [e, n] of Object.entries(t)) x(n.usedBy)?.includes(i) && (s.add(e), a = !0);
			!a && typeof e[n] != "function" && s.add(n);
		}
		for (let e of n.matchAll(d)) {
			let n = e[1];
			for (let [e, r] of Object.entries(t)) x(r.usedBy)?.includes(n) && s.add(e);
		}
		i.set(o, [...s].filter((e) => r.has(e)).sort()), a.set(o, n);
	}
	return {
		computedNames: n,
		dependenciesMap: i,
		expressions: a
	};
}
function ee(e, t) {
	let { computedNames: n, dependenciesMap: r, expressions: i } = _(t, e.properties ?? {}), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = [];
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
	for (let e of c) t[e] = y(i.get(e), t, l);
}
function te(e) {
	return e.value === void 0 ? Array.isArray(e.values) && e.values.length > 0 ? e.values[0] : v(e.type) : e.value;
}
function v(e) {
	return e === String ? "" : e === Number ? 0 : e === Boolean ? !1 : e === Array ? [] : e === Object ? {} : void 0;
}
function y(e, t, n = {}) {
	return Function("context", `const {${Object.keys(n).join(",")}} = context; return ${e};`).call(t, n);
}
function b(e) {
	return e.substring(5).split(".")[0];
}
function ne(e, t = {}) {
	let n = Object.create(e.prototype);
	return Object.assign(n, t), g(n, e.properties ?? {}), ee(e, n), n;
}
function re(e) {
	return `get ${e}`;
}
function x(e) {
	return typeof e == "string" ? [e] : e;
}
//#endregion
//#region src/sanitize-xss.ts
var ie = "__WREC", ae = "__", oe = "[A-Za-z_$][A-Za-z0-9_$]*", se = new Set([
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
function S(e, t) {
	return `${ie}${e}_${t}${ae}`;
}
function C(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function ce(e) {
	let t = e.trim();
	return t ? RegExp(`^${oe}$`).test(t) ? !0 : t.startsWith("this.") : !1;
}
function w(t) {
	let n = {
		allowCommentTag: !0,
		onTagAttr(e, t, n) {
			if (t.startsWith("on")) return ce(n) ? `${t}="${C(n)}"` : "";
			if (t === "title" || t.startsWith("aria-") || t.startsWith("data-")) return `${t}="${C(n)}"`;
			if (e === "a" && t === "href" && n.startsWith("javascript")) return "";
		},
		safeAttrValue(e, t, n) {
			return t === "class" || se.has(t) || e === "a" && t === "href" || e === "img" && t === "src" ? n : "";
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
		let t = S(i, r.length);
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
var T = () => /* @__PURE__ */ new Map(), E = new Set([
	"class",
	"disabled",
	"hidden",
	"id",
	"tabindex",
	"title"
]), D = globalThis.HTMLElement ?? class {}, O = globalThis.customElements ?? {
	get: (e) => void 0,
	getName: (e) => null,
	define: () => {},
	initialize: (e) => {},
	upgrade: (e) => {},
	whenDefined: () => Promise.reject(/* @__PURE__ */ Error("customElements is not available in this environment"))
}, k = class extends Error {}, A = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, j = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g;
function M(e, t) {
	return e.length === t.length && e.every((e, n) => e === t[n]);
}
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
var q = (e) => `get ${e}`, le = (e) => e.replace(/<!--[\s\S]*?-->/g, "");
function J(e, t, n, r) {
	return e.slice(0, t) + r + e.slice(t + n);
}
function Y(e) {
	let t = Number(e);
	if (isNaN(t)) throw new k(`can't convert "${e}" to a number`);
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
async function ue(e) {
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
	return Promise.all([...t].map(async (e) => Promise.race([O.whenDefined(e), n(e)])));
}
var $ = class e extends D {
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
	#i = [];
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
		if (this.elementName = e, O.get(e)) throw new k(`custom element ${e} is already defined`);
		O.define(e, this);
	}
	constructor() {
		super(), this.attachShadow({ mode: "open" });
		let e = this.#n;
		this.#M("attrToPropMap") || (e.attrToPropMap = /* @__PURE__ */ new Map()), this.#M("computedGraph") || (e.computedGraph = null), this.#M("computedPropsRegistered") || (e.computedPropsRegistered = !1), this.#M("properties") || (e.properties = {}), this.#M("propToAttrMap") || (e.propToAttrMap = /* @__PURE__ */ new Map()), this.#M("propToComputedMap") || (e.propToComputedMap = /* @__PURE__ */ new Map()), this.#M("propToExprsMap") || (e.propToExprsMap = /* @__PURE__ */ new Map()), this.#M("registeredComputedProps") || (e.registeredComputedProps = /* @__PURE__ */ new Set());
	}
	attributeChangedCallback(t, n, r) {
		t === "disabled" && this.#x();
		let i = e.getPropName(t);
		if (!this.#P(i) && this.#N(i)) {
			let e = this.#J(i, r);
			this.#H(i, e);
			let t = this.#o[i];
			t && this.setFormValue(t, String(e));
		}
	}
	batchSet(e) {
		this.#e = !0;
		let t = this.#n.propToExprsMap, n = /* @__PURE__ */ new Set();
		for (let [r, i] of Object.entries(e)) {
			this.#H(r, i);
			let e = t.get(r) ?? [];
			for (let t of e) n.add(t);
		}
		let r = this.#O(Object.keys(e));
		for (let [e, i] of r) {
			this.#V(e, this.#T(i));
			let r = t.get(e) ?? [];
			for (let e of r) n.add(e);
		}
		this.#w([...n]), this.#e = !1;
	}
	async #h() {
		let e = this.#n, { template: t } = e;
		t || (t = e.template = document.createElement("template"), t.innerHTML = e.buildHTML()), await ue(t), this.shadowRoot.replaceChildren(t.content.cloneNode(!0));
	}
	static buildHTML() {
		let e = "<style>\n    :host([hidden]) { display: none; }";
		this.css && (e += this.css), e += "</style>\n";
		let t = this.html.trim();
		if (!t) throw new k("static property html must be set");
		return t.startsWith("<") || (t = `<span><!--${t}--></span>`), e + t;
	}
	changed(e, t, n) {
		this.#H(t, n);
	}
	#g(e, t) {
		if (this.#r) return;
		let n = {
			...this,
			[e]: t
		};
		return this.validate(n);
	}
	#_() {
		let { properties: e } = this.#n;
		for (let [t, { computed: n }] of Object.entries(e)) n && this.#V(t, this.#T(n));
	}
	async connectedCallback() {
		this.#ee(), this.#v(), await this.#h(), this.hasAttribute("disabled") && this.#x(), this.#oe(this.shadowRoot), this.#I(this.shadowRoot), this.#$(), this.#_(), this.ready();
	}
	#v() {
		let { observedAttributes: e, properties: t } = this.#n;
		for (let [n, r] of Object.entries(t)) r.computed || this.#y(n, r, e);
		for (let [n, r] of Object.entries(t)) r.computed && this.#y(n, r, e);
		this.#z();
	}
	#y(t, n, r) {
		if (t === "class" || t === "style") throw new k(`"${t}" is a reserved property`);
		let i = e.getAttrName(t), a = this.hasAttribute(i);
		n.required && !a && this.#G(this, i, "is a required attribute");
		let o = n.value;
		this.hasOwnProperty(t) && (o = this.#k(t), this.#b(t));
		let { type: s } = n, c = s === Boolean ? o || a : r.includes(i) && a ? this.#q(t, i) : o ?? F(n), u = "#" + t;
		this.#H(u, this.#F(t, s, c)), Object.defineProperty(this, t, {
			enumerable: !0,
			get() {
				return this.#k(u);
			},
			set(e) {
				n.computed && !this.#t.has(t) && this.#G(null, t, "is a computed property and cannot be set directly"), s === Number && typeof e == "string" && (e = Y(e));
				let r = this.#k(u);
				if (e === r || (this.#re(t, s, e), !this.#ie(n, t, e))) return;
				let a = this.#g(t, e);
				if (a && a.length > 0) {
					this.#S(t, e, a, !0);
					return;
				}
				e = this.#F(t, s, e), this.#H(u, e);
				let o = this.#d.get(t);
				o && l(o.state, o.stateProp, e), this.#Y(t, s, e, i), this.#e || (this.#X(t), this.#R(t)), this.#Q(t, e);
				let c = this.#o[t];
				c && this.setFormValue(c, String(e)), this.propertyChangedCallback(t, r, e), a && this.#S(t, e, a), n.dispatch && this.dispatch("change", {
					tagName: this.localName,
					property: t,
					oldValue: r,
					value: e
				});
			}
		});
	}
	#b(e) {
		delete this[e];
	}
	#x() {
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
	#S(e, t, n, r = !1) {
		if (!r && M(n, this.#i)) return;
		this.#i = n;
		let i = n.length === 0;
		this.#r = !0;
		try {
			this.dispatch("validation", {
				errors: n,
				message: n.join(", "),
				object: this,
				property: e,
				valid: i,
				value: t
			});
		} finally {
			this.#r = !1;
		}
	}
	displayIfSet(e, t = "block") {
		return `display: ${e == null ? "none" : t}`;
	}
	#C(t) {
		let n = t instanceof e;
		for (let r of t.getAttributeNames()) {
			let i = t.getAttribute(r);
			if (r === "ref") {
				this.#W(t, i);
				continue;
			}
			let a = this.#L(t, i);
			if (a) {
				let i = this.#k(a);
				i === void 0 && this.#K(t, r, a);
				let [o, s] = r.split(":"), c = e.getPropName(o);
				if (o === "checked") {
					let { type: e } = this.#n.properties[a];
					V(t) && e !== Boolean && this.#G(t, r, `refers to property "${a}" whose type is not Boolean`), W(t) && e !== String && this.#G(t, r, `refers to property "${a}" whose type is not String`);
				}
				let l = this.#P(a);
				n && t.#P(c) || (o === "checked" && W(t) ? t.checked = t.value === i : t[c] = i), o === "value" && (s ? (t["on" + s] === void 0 && this.#G(t, r, "refers to an unsupported event name"), t.setAttribute(o, this.#k(a))) : s = "change"), n && !l && t.#u.set(e.getPropName(o), a);
			}
			this.#U(i, t, r);
		}
	}
	#w(e) {
		for (let t of e) {
			let e = this.#T(t), n = this.#a.get(t) ?? [], r = /* @__PURE__ */ new Set();
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
	#T(e) {
		return y(e, this, this.#n.context);
	}
	#E(e) {
		let { localName: t } = e;
		if (t === "style") {
			let { sheet: t } = e, n = t?.cssRules ?? [], r = Array.from(n);
			for (let e of r) if (e.constructor === CSSStyleRule) {
				let t = Array.from(e.style);
				for (let n of t) if (n.startsWith("--")) {
					let t = e.style.getPropertyValue(n);
					this.#U(t, e, n);
				}
			}
		} else {
			let t = "";
			if (G(e)) {
				this.#U(e.textContent, e);
				let n = e.textContent?.match(f);
				n && (t = n[1]);
			} else {
				let n = Array.from(e.childNodes).find((e) => e.nodeType === Node.COMMENT_NODE);
				n && (t = n.textContent?.trim() ?? "");
			}
			if (t) {
				let n = this.#L(e, t);
				n && G(e) ? e.textContent = this.#k(n) : this.#U(t, e);
			}
		}
	}
	formAssociatedCallback() {
		let e = this.getAttribute("form-assoc");
		if (!e) {
			let t = this.getAttribute("name");
			if (t) if (this.#N("value")) e = `value:${t}`;
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
			let t = this.#k(e);
			U(t) && this.setFormValue(n, String(t));
		}
		let r = Object.keys(this.#n.properties), i = this.#c;
		for (let e of r) i[e] = this.#k(e);
	}
	formResetCallback() {
		let e = this.#c;
		for (let t of Object.keys(e)) {
			let n = e[t];
			p.test(n) && (n = this.#T(n)), this.#H(t, n);
		}
	}
	static getAttrName(e) {
		let t = this.propToAttrMap.get(e);
		return t || (t = e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), this.propToAttrMap.set(e, t)), t;
	}
	#D() {
		let e = this.#n, t = e.computedGraph;
		if (t) return t;
		let n = T(), r = T(), i = {};
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
	#O(e) {
		let { computedToDependenciesMap: t, computedToDependentsMap: n, computedToExprMap: r } = this.#D(), i = this.#n.propToComputedMap, a = /* @__PURE__ */ new Set(), o = [...new Set(e)];
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
		if (c.length !== a.size) throw new k(`computed properties form a cycle: ${[...a].filter((e) => l.get(e) > 0).sort().join(", ")}`);
		return c.map((e) => [e, r[e]]);
	}
	#k(e) {
		return this[e];
	}
	static getPropName(e) {
		let t = this.attrToPropMap.get(e);
		return t || (t = e.replace(/-([a-z])/g, (e, t) => t.toUpperCase()), this.attrToPropMap.set(e, t)), t;
	}
	#A(e, t, n) {
		let r = this.#k("#" + e), i = this.#d.get(e);
		i && l(i.state, i.stateProp, r), this.#e || (this.#X(e), this.#R(e)), this.#Q(e, r), this.propertyChangedCallback(e, t, n);
	}
	#j(e, t, n) {
		if (n.length !== 1) return;
		let [r] = n;
		if (!p.test(r)) return;
		let i = V(e), a = W(e), o = K(e) || G(e), [s, c] = (t ?? "").split(":");
		if (!(o && s === "value" || i && s === "checked" || a && s === "checked" || G(e))) return;
		c ? e["on" + c] === void 0 && this.#G(e, t, "refers to an unsupported event name") : c = "change";
		let l = b(r);
		e.addEventListener(c, (e) => {
			let { target: t } = e;
			if (!t) return;
			let { type: n } = this.#n.properties[l], r = t, { value: o } = r;
			s === "checked" ? i ? this.#H(l, r.checked) : a && r.checked && this.#H(l, o) : this.#H(l, n === Number ? Y(o) : o), this.#R(l);
		});
	}
	#M(e) {
		return Object.hasOwn(this.#n, e);
	}
	#N(e) {
		return !!this.#n.properties[e];
	}
	#P(e) {
		return !!this.#n.properties[e]?.computed;
	}
	#F(e, n, r) {
		if (typeof r != "object" || !r || n !== Array && n !== Object || this.#p.has(r)) return r;
		let i = this.#f.get(r);
		if (i) return i;
		let a = t(r, (t, n, r) => {
			this.#A(e, n, r);
		});
		return this.#f.set(r, a), this.#p.add(a), a;
	}
	#I(e) {
		let t = Array.from(e.querySelectorAll("*"));
		for (let e of t) this.#C(e), e.firstElementChild || this.#E(e);
	}
	static get observedAttributes() {
		let t = Object.entries(this.properties || {}).filter(([e, t]) => !t.computed).map(([t]) => e.getAttrName(t));
		return t.includes("disabled") || t.push("disabled"), t;
	}
	propertyChangedCallback(e, t, n) {}
	#L(e, t) {
		if (!t || !p.test(t)) return;
		let n = b(t);
		return this.#k(n) === void 0 && this.#K(e, "", n), n;
	}
	#R(e) {
		let t = this.#n.propToExprsMap.get(e) || [];
		this.#w(t);
	}
	ready() {}
	#z() {
		let e = this.#n;
		if (!e.computedPropsRegistered) {
			e.computedPropsRegistered = !0, e.computedGraph = null;
			for (let [t, n] of Object.entries(e.properties)) n.computed && this.#B(t, n);
		}
	}
	#B(e, t) {
		let n = this.#n;
		n.registeredComputedProps.add(e);
		let r = n.propToComputedMap;
		function i(t, n) {
			let i = r.get(t);
			i || (i = [], r.set(t, i)), i.push([e, n]);
		}
		let a = t.computed;
		for (let t of a.matchAll(m)) {
			let r = b(t[0]);
			this.#k(r) === void 0 && this.#K(null, e, r);
			let o = q(r), s = !1;
			for (let [e, t] of Object.entries(n.properties)) Q(t.usedBy)?.includes(o) && (i(e, a), s = !0);
			!s && typeof this.#k(r) != "function" && i(r, a);
		}
		for (let t of a.matchAll(d)) {
			let r = t[1];
			if (typeof this.#k(r) != "function") throw new k(`property ${e} computed calls non-method ${r}`);
			for (let [e, t] of Object.entries(n.properties)) Q(t.usedBy)?.includes(r) && i(e, a);
		}
	}
	#V(e, t) {
		this.#t.add(e);
		try {
			this.#H(e, t);
		} finally {
			this.#t.delete(e);
		}
	}
	#H(e, t) {
		this[e] = t;
	}
	#U(e, t, n = void 0) {
		if (!e) return;
		let r = this.#te(t, n, e);
		if (!r) {
			let r = e.replaceAll("this..", "this.");
			n ? Z(t, n, r) : "textContent" in t && (t.textContent = r);
			return;
		}
		let i = this.#n;
		r.forEach((t) => {
			let n = b(t);
			if (typeof this.#k(n) == "function") return;
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
		} : t), t instanceof HTMLElement && this.#j(t, n, r);
		let o = this.#T(e);
		n ? Z(t, n, o) : this.#Z(t, o);
	}
	#W(e, t) {
		let n = t?.trim() ?? "", r = this.#n.properties[n];
		r || this.#K(e, "ref", n), r.type !== D && this.#G(e, "ref", `refers to property "${n}" whose type is not HTMLElement`), this.#k(n) && this.#G(e, "ref", `is a duplicate reference to the property "${n}"`), this.#H(n, e), e.removeAttribute("ref");
	}
	setAttributeSafe(e, t) {
		this.hasAttribute(e) || this.setAttribute(e, t);
	}
	setFormValue(e, t) {
		!this.#s || !U(t) || (this.#s.set(e, t), this.#l?.setFormValue(this.#s));
	}
	static ssr(e = {}) {
		throw new k("SSR is not available in the browser build.");
	}
	#G(e, t, n) {
		let r = e instanceof HTMLElement ? e.localName : "CSS rule";
		throw new k(`component ${this.#n.elementName}` + (e ? `, element "${r}"` : "") + (t ? `, attribute "${t}"` : "") + ` ${n}`);
	}
	#K(e, t, n) {
		this.#G(e, t, `refers to missing property "${n}"`);
	}
	#q(e, t) {
		return this.#J(e, this.getAttribute(t));
	}
	#J(t, n) {
		if (n?.match(m)) return n;
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
	#Y(e, t, n, r) {
		U(n) && !this.#P(e) && n !== (t === Boolean ? this.hasAttribute(r) : this.#q(e, r)) && X(this, r || e, n);
	}
	#X(e) {
		for (let [t, n] of this.#O([e])) this.#V(t, this.#T(n));
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
			let t = w(i);
			if (e.innerHTML === t) return;
			e.innerHTML = t, this.#oe(e), this.#I(e);
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
			let n = T();
			e.methodToExprsMap = n;
			let r = Array.from(this.#a.keys());
			for (let e of r) {
				for (let r of e.matchAll(d)) t(n, r[1], e);
				for (let r of e.matchAll(m)) t(n, q(b(r[0])), e);
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
					if (typeof R(this, n)?.get != "function") throw new k(`property ${t} usedBy contains non-getter ${e}`);
				} else if (typeof this.#k(e) != "function") throw new k(`property ${t} usedBy contains non-method ${e}`);
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
		for (let [n, r] of Object.entries(t)) if (this.#N(r)) {
			let t = o(e, n);
			t !== void 0 && this.#H(r, t), this.#d.set(r, {
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
				this.#H(i, n);
				return;
			}
			let a = Object.keys(r).find((e) => t.startsWith(e + ".") || e.startsWith(t + "."));
			if (!a) return;
			let s = r[a];
			this.#H(s, o(e, a));
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
		for (let n of this.getAttributeNames()) if (!E.has(n) && !n.startsWith("on") && n !== "ref") {
			if (n === "form-assoc") {
				this.#ae();
				continue;
			}
			if (!t.has(e.getPropName(n))) {
				if (n === "name") {
					this.#ae();
					continue;
				}
				this.#G(null, n, "is not a supported attribute");
			}
		}
	}
	#te(e, t, n) {
		let r = n.match(m);
		if (r) return r.forEach((n) => {
			let r = b(n);
			this.#k(r) === void 0 && this.#K(e, t, r);
		}), r;
	}
	#ne(e, t) {
		for (let [n, r] of Object.entries(t)) {
			let t = o(e, n);
			t === void 0 && this.#G(this, void 0, `invalid state path "${n}"`), t = this.#k(r), this.#N(r) || this.#G(null, r, "refers to missing property in useState map");
		}
	}
	#re(e, t, n) {
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
	#ie(e, t, n) {
		let { validate: r } = e;
		if (!r) return !0;
		let i = r(n), a = typeof i != "string";
		return a || this.dispatch("validation", {
			object: this,
			property: t,
			value: n,
			message: i,
			valid: !1
		}), a;
	}
	#ae() {
		if (this.#n.formAssociated || this.closest("form") === null) return;
		let e = this.#n.name;
		this.#G(this, void 0, `inside form, class ${e} requires "static formAssociated = true;"`);
	}
	#oe(e) {
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
					typeof this.#k(a) == "function" ? o = (e) => this.#k(a).call(this, e) : (this.#te(e, r, a), o = () => this.#T(a)), e.addEventListener(i, o), t.push(r);
				}
			}
			for (let n of t) e.removeAttribute(n);
		}
	}
};
function de(e, ...t) {
	let n = B(e, t);
	for (;;) {
		let e = A.exec(n);
		if (!e) break;
		let t = e[2];
		if (h.test(t)) {
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
function fe(e, ...t) {
	let n = B(e, t);
	for (;;) {
		let e = j.exec(n);
		if (!e || e[1] === "style") break;
		let t = le(e[2]);
		if (h.test(t)) {
			let r = `<!-- ${t.trim()} -->`, i = e.index + e[0].indexOf(">") + 1;
			n = J(n, i, t.length, r);
		}
	}
	return n;
}
//#endregion
export { h as a, b as c, fe as i, ne as l, P as n, p as o, de as r, y as s, $ as t, a as u };

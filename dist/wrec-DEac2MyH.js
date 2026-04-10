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
	let t = {};
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
		if (!n) throw new i("name cannot be empty");
		if (e.#e.has(n)) throw new i(`WrecState with name "${n}" already exists`);
		if (this.#r = n, this.#i = a, this.#a = t({}, this.#o.bind(this)), a && r) {
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
	log() {
		console.log("WrecState:", this.#r);
		for (let [e, t] of Object.entries(this.#a)) console.log(`  ${e} = ${JSON.stringify(t)}`);
	}
	#o(e, t, n) {
		let r = {
			state: this,
			statePath: e,
			oldValue: t,
			newValue: n
		};
		for (let { callback: t, statePaths: n } of this.#t) (n.length === 0 || n.includes(e)) && t(r);
	}
};
r && process.env.NODE_ENV === "development" && (window.WrecState = a);
//#endregion
//#region src/paths.ts
function o(e, t) {
	let n = e;
	for (let e of t.split(".")) n = n[e];
	return n;
}
function s(e, t, n) {
	let r = t.split("."), i = r.length - 1, a = e;
	r.forEach((e, t) => {
		t === i ? a[e] = n : a = a[e];
	});
}
//#endregion
//#region src/sanitize-xss.ts
var c = new Set([
	"button",
	"input",
	"label",
	"option",
	"th"
]), l = "__WREC", u = "__";
function d(t) {
	let n = {
		allowCommentTag: !0,
		onTag: (e, t) => {
			if (c.has(e)) return t;
		},
		onTagAttr(e, t, n) {
			if (t.startsWith("on")) return "";
		},
		safeAttrValue(e, t, n) {
			return t === "class" || e === "a" && t === "href" && !n.startsWith("javascript") || e === "img" && t === "src" ? n : "";
		},
		stripIgnoreTagBody: [
			"script",
			"style",
			"iframe"
		],
		whiteList: {
			...e.getDefaultWhiteList(),
			label: ["class", "for"],
			span: ["class"]
		}
	}, r = [];
	t = t.replace(/<!--[\s\S]*?-->/g, (e) => {
		let n = "";
		do
			n = l + r.length + u;
		while (t.includes(n));
		return r.push(e), n;
	});
	let i = e(t, n);
	return r.forEach((e, t) => {
		let n = RegExp(`${l}${t}${u}`, "g");
		i = i.replace(n, e);
	}), i;
}
//#endregion
//#region src/wrec.ts
var f = () => /* @__PURE__ */ new Map(), p = new Set([
	"class",
	"disabled",
	"hidden",
	"id",
	"tabindex",
	"title"
]), m = globalThis.HTMLElement ?? class {}, h = globalThis.customElements ?? {
	get: (e) => void 0,
	getName: (e) => null,
	define: () => {},
	initialize: (e) => {},
	upgrade: (e) => {},
	whenDefined: () => Promise.reject(/* @__PURE__ */ Error("customElements is not available in this environment"))
}, g = class extends Error {}, _ = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, v = "a-zA-Z_$", y = `[${v}][${v + "0-9"}]*`, b = RegExp(`this\\.(${y})\\s*\\(`, "g"), x = /<!--\s*(.*?)\s*-->/, S = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, C = RegExp(`^this\\.${y}$`), w = RegExp(`this\\.${y}(\\.${y})*`, "g"), T = RegExp(`this\\.${y}(\\.${y})*`), E = 5;
function D(e) {
	return e instanceof HTMLButtonElement || e instanceof HTMLFieldSetElement || e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement || e instanceof W;
}
function O(e, t, n) {
	let r = document.createElement(e);
	if (t) for (let [e, n] of Object.entries(t)) r.setAttribute(e, n);
	return n && (r.innerHTML = n), r;
}
var k = (e) => Array.isArray(e.values) && e.values.length > 0 ? e.values[0] : A(e.type), A = (e) => e === String ? "" : e === Number ? 0 : e === Boolean ? !1 : e === Array ? [] : e === Object ? {} : void 0;
function j(e) {
	let t = [], n = e.firstElementChild;
	for (; n;) t.push(n), n.shadowRoot && t.push(...j(n.shadowRoot)), n.firstElementChild && t.push(...j(n)), n = n.nextElementSibling;
	return t;
}
var M = (e) => e.substring(E).split(".")[0];
function N(e, t) {
	let n = e[0];
	return t.forEach((t, r) => {
		n += t + e[r + 1];
	}), n;
}
function P(e) {
	let t = typeof e;
	return t === "string" || t === "number" || t === "boolean";
}
function F(e) {
	return e.localName === "textarea";
}
function I(e) {
	let { localName: t } = e;
	return t === "input" || t === "select";
}
var L = (e) => e.replace(/<!--[\s\S]*?-->/g, "");
function R(e, t, n, r) {
	return e.slice(0, t) + r + e.slice(t + n);
}
function z(e) {
	let t = Number(e);
	if (isNaN(t)) throw new g(`can't convert "${e}" to a number`);
	return t;
}
function B(e, t, n) {
	let [r, i] = t.split(":");
	if (P(n)) if (typeof n == "boolean") {
		n ? e.setAttribute(r, r) : e.removeAttribute(r);
		let t = W.getPropName(r);
		e[t] = n;
	} else {
		let i = e.getAttribute(t), a = String(n);
		i !== a && (e.setAttribute(r, a), r === "value" && I(e) && (e.value = a));
	}
	else {
		let r = W.getPropName(t);
		e[r] = n;
	}
}
function V(e, t, n) {
	let [r, i] = t.split(":");
	e instanceof CSSStyleRule ? e.style.setProperty(r, n) : (B(e, r, n), r === "value" && I(e) && (e.value = n));
}
var H = (e) => typeof e == "string" ? [e] : e;
async function U(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of j(e.content)) {
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
	return Promise.all([...t].map(async (e) => Promise.race([h.whenDefined(e), n(e)])));
}
var W = class e extends m {
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
	#r = /* @__PURE__ */ new Map();
	#i = {};
	#a;
	#o = {};
	#s = null;
	#c = /* @__PURE__ */ new Map();
	#l = /* @__PURE__ */ new Map();
	#u = /* @__PURE__ */ new Map();
	static define(e) {
		if (this.elementName = e, h.get(e)) throw new g(`custom element ${e} is already defined`);
		h.define(e, this);
	}
	constructor() {
		super(), this.attachShadow({ mode: "open" });
		let e = this.#n;
		this.#C("attrToPropMap") || (e.attrToPropMap = /* @__PURE__ */ new Map()), this.#C("computedGraph") || (e.computedGraph = null), this.#C("computedPropsRegistered") || (e.computedPropsRegistered = !1), this.#C("properties") || (e.properties = {}), this.#C("propToAttrMap") || (e.propToAttrMap = /* @__PURE__ */ new Map()), this.#C("propToComputedMap") || (e.propToComputedMap = /* @__PURE__ */ new Map()), this.#C("propToExprsMap") || (e.propToExprsMap = /* @__PURE__ */ new Map()), this.#C("registeredComputedProps") || (e.registeredComputedProps = /* @__PURE__ */ new Set());
	}
	attributeChangedCallback(t, n, r) {
		t === "disabled" && this.#h();
		let i = e.getPropName(t);
		if (!this.#T(i) && this.#w(i)) {
			let e = this.#R(i, r);
			this[i] = e;
			let t = this.#i[i];
			t && this.setFormValue(t, String(e));
		}
	}
	batchSet(e) {
		this.#e = !0;
		let t = this.#n.propToExprsMap, n = /* @__PURE__ */ new Set();
		for (let [r, i] of Object.entries(e)) {
			this[r] = i;
			let e = t.get(r) ?? [];
			for (let t of e) n.add(t);
		}
		let r = this.#x(Object.keys(e));
		for (let [e, i] of r) {
			this.#M(e, this.#v(i));
			let r = t.get(e) ?? [];
			for (let e of r) n.add(e);
		}
		this.#_([...n]), this.#e = !1;
	}
	async #d() {
		let e = this.#n, { template: t } = e;
		t || (t = e.template = document.createElement("template"), t.innerHTML = e.buildHTML()), await U(t), this.shadowRoot.replaceChildren(t.content.cloneNode(!0));
	}
	static buildHTML() {
		let e = "<style>\n    :host([hidden]) { display: none; }";
		this.css && (e += this.css), e += "</style>\n";
		let t = this.html.trim();
		if (!t) throw new g("static property html must be set");
		return t.startsWith("<") || (t = `<span><!--${t}--></span>`), e + t;
	}
	changed(e, t, n) {
		this[t] = n;
	}
	async connectedCallback() {
		this.#W(), this.#p(), await this.#d(), this.hasAttribute("disabled") && this.#h(), this.#J(this.shadowRoot), this.#E(this.shadowRoot), this.#U(), this.#f(), this.ready();
	}
	#f() {
		let { properties: e } = this.#n;
		for (let [t, { computed: n }] of Object.entries(e)) n && this.#M(t, this.#v(n));
	}
	#p() {
		let { observedAttributes: e, properties: t } = this.#n;
		for (let [n, r] of Object.entries(t)) r.computed || this.#m(n, r, e);
		for (let [n, r] of Object.entries(t)) r.computed && this.#m(n, r, e);
		this.#A();
	}
	#m(t, n, r) {
		if (t === "class" || t === "style") throw new g(`"${t}" is a reserved property`);
		let i = e.getAttrName(t), a = this.hasAttribute(i);
		n.required && !a && this.#F(this, i, "is a required attribute");
		let o = n.value;
		this.hasOwnProperty(t) && (o = this[t], delete this[t]);
		let { type: c } = n, l = c === Boolean ? o || a : r.includes(i) && a ? this.#L(t, i) : o ?? k(n), u = "#" + t;
		this[u] = l, Object.defineProperty(this, t, {
			enumerable: !0,
			get() {
				return this[u];
			},
			set(e) {
				n.computed && !this.#t.has(t) && this.#F(null, t, "is a computed property and cannot be set directly"), c === Number && typeof e == "string" && (e = z(e));
				let r = this[u];
				if (e === r) return;
				this.#q(t, c, e), this[u] = e;
				let a = this.#l.get(t);
				a && s(a.state, a.stateProp, e), this.#z(t, c, e, i), this.#e || (this.#B(t), this.#k(t)), this.#H(t, e);
				let o = this.#i[t];
				o && this.setFormValue(o, String(e)), this.propertyChangedCallback(t, r, e), n.dispatch && this.dispatch("change", {
					tagName: this.localName,
					property: t,
					oldValue: r,
					value: e
				});
			}
		});
	}
	#h() {
		let e = this.hasAttribute("disabled"), t = j(this.shadowRoot);
		for (let n of t) D(n) && (n.disabled = e);
	}
	disconnectedCallback() {
		for (let { unsubscribe: e } of this.#u.values()) e();
		this.#r.clear(), this.#o.clear(), this.#c.clear(), this.#l.clear(), this.#u.clear();
	}
	dispatch(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			bubbles: !0,
			composed: !0,
			detail: t
		}));
	}
	displayIfSet(e, t = "block") {
		return `display: ${e == null ? "none" : t}`;
	}
	#g(t) {
		let n = t instanceof e;
		for (let r of t.getAttributeNames()) {
			let i = t.getAttribute(r);
			if (r === "ref") {
				this.#P(t, i);
				continue;
			}
			let a = this.#O(t, i);
			if (a) {
				let i = this[a];
				i === void 0 && this.#I(t, r, a);
				let [o, s] = r.split(":"), c = e.getPropName(o), l = this.#T(a);
				n && t.#T(c) || (t[c] = i), o === "value" && (s ? (t["on" + s] === void 0 && this.#F(t, r, "refers to an unsupported event name"), t.setAttribute(o, this[a])) : s = "change"), n && !l && t.#c.set(e.getPropName(o), a);
			}
			this.#N(i, t, r);
		}
	}
	#_(e) {
		for (let t of e) {
			let e = this.#v(t), n = this.#r.get(t) ?? [], r = /* @__PURE__ */ new Set();
			for (let t of n) {
				let n = t instanceof HTMLElement || t instanceof CSSStyleRule ? t : t.element;
				if (n instanceof HTMLElement && !n.isConnected) {
					r.add(t);
					continue;
				}
				if (t instanceof HTMLElement) this.#V(t, e);
				else if (!(t instanceof CSSStyleRule)) {
					let { element: n, attrName: r } = t;
					n instanceof CSSStyleRule ? n.style.setProperty(r, e) : V(n, r, e);
				}
			}
			if (r.size > 0) {
				let e = n.filter((e) => !r.has(e));
				e.length === 0 ? this.#r.delete(t) : this.#r.set(t, e);
			}
		}
	}
	#v(e) {
		let { context: t } = this.#n;
		return Function("context", `const {${Object.keys(t).join(",")}} = context; return ${e};`).call(this, t);
	}
	#y(e) {
		let { localName: t } = e;
		if (t === "style") {
			let { sheet: t } = e, n = t?.cssRules ?? [], r = Array.from(n);
			for (let e of r) if (e.constructor === CSSStyleRule) {
				let t = Array.from(e.style);
				for (let n of t) if (n.startsWith("--")) {
					let t = e.style.getPropertyValue(n);
					this.#N(t, e, n);
				}
			}
		} else {
			let t = "";
			if (F(e)) {
				this.#N(e.textContent, e);
				let n = e.textContent?.match(x);
				n && (t = n[1]);
			} else {
				let n = Array.from(e.childNodes).find((e) => e.nodeType === Node.COMMENT_NODE);
				n && (t = n.textContent?.trim() ?? "");
			}
			if (t) {
				let n = this.#O(e, t);
				n && F(e) ? e.textContent = this[n] : this.#N(t, e);
			}
		}
	}
	formAssociatedCallback() {
		let e = this.getAttribute("form-assoc");
		if (!e) {
			let t = this.getAttribute("name");
			if (t) if (this.#w("value")) e = `value:${t}`;
			else return;
			else return;
		}
		let t = {}, n = e.split(",");
		for (let e of n) {
			let [n, r] = e.split(":");
			t[n.trim()] = r.trim();
		}
		this.#i = t, this.#a = new FormData(), this.#s = this.attachInternals(), this.#s.setFormValue(this.#a);
		for (let [e, n] of Object.entries(t)) {
			let t = this[e];
			P(t) && this.setFormValue(n, String(t));
		}
		let r = Object.keys(this.#n.properties), i = this.#o;
		for (let e of r) i[e] = this[e];
	}
	formResetCallback() {
		let e = this.#o;
		for (let t of Object.keys(e)) {
			let n = e[t];
			C.test(n) && (n = this.#v(n)), this[t] = n;
		}
	}
	static getAttrName(e) {
		let t = this.propToAttrMap.get(e);
		return t || (t = e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), this.propToAttrMap.set(e, t)), t;
	}
	#b() {
		let e = this.#n, t = e.computedGraph;
		if (t) return t;
		let n = f(), r = f(), i = {};
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
	#x(e) {
		let { computedToDependenciesMap: t, computedToDependentsMap: n, computedToExprMap: r } = this.#b(), i = this.#n.propToComputedMap, a = /* @__PURE__ */ new Set(), o = [...new Set(e)];
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
		if (c.length !== a.size) throw new g(`computed properties form a cycle: ${[...a].filter((e) => l.get(e) > 0).sort().join(", ")}`);
		return c.map((e) => [e, r[e]]);
	}
	static getPropName(e) {
		let t = this.attrToPropMap.get(e);
		return t || (t = e.replace(/-([a-z])/g, (e, t) => t.toUpperCase()), this.attrToPropMap.set(e, t)), t;
	}
	#S(e, t, n) {
		if (n.length !== 1) return;
		let [r] = n;
		if (!C.test(r)) return;
		let i = I(e) || F(e), [a, o] = (t ?? "").split(":");
		if (!(i && a === "value" || F(e))) return;
		o ? e["on" + o] === void 0 && this.#F(e, t, "refers to an unsupported event name") : o = "change";
		let s = M(r);
		e.addEventListener(o, (e) => {
			let { target: t } = e;
			if (!t) return;
			let n = t.value, { type: r } = this.#n.properties[s];
			this[s] = r === Number ? z(n) : n, this.#k(s);
		});
	}
	#C(e) {
		return Object.hasOwn(this.#n, e);
	}
	#w(e) {
		return !!this.#n.properties[e];
	}
	#T(e) {
		return !!this.#n.properties[e]?.computed;
	}
	#E(e) {
		let t = Array.from(e.querySelectorAll("*"));
		for (let e of t) this.#g(e), e.firstElementChild || this.#y(e);
	}
	#D() {
		if (this.#n.formAssociated || this.closest("form") === null) return;
		let e = this.#n.name;
		this.#F(this, void 0, `inside form, class ${e} requires "static formAssociated = true;"`);
	}
	static get observedAttributes() {
		let t = Object.entries(this.properties || {}).filter(([e, t]) => !t.computed).map(([t]) => e.getAttrName(t));
		return t.includes("disabled") || t.push("disabled"), t;
	}
	propertyChangedCallback(e, t, n) {}
	#O(e, t) {
		if (!t || !C.test(t)) return;
		let n = M(t);
		return this[n] === void 0 && this.#I(e, "", n), n;
	}
	#k(e) {
		let t = this.#n.propToExprsMap.get(e) || [];
		this.#_(t);
	}
	ready() {}
	#A() {
		let e = this.#n;
		if (!e.computedPropsRegistered) {
			e.computedPropsRegistered = !0, e.computedGraph = null;
			for (let [t, n] of Object.entries(e.properties)) n.computed && this.#j(t, n);
		}
	}
	#j(e, t) {
		let n = this.#n;
		n.registeredComputedProps.add(e);
		let r = n.propToComputedMap;
		function i(t, n) {
			let i = r.get(t);
			i || (i = [], r.set(t, i)), i.push([e, n]);
		}
		let a = t.computed;
		for (let t of a.matchAll(w)) {
			let n = M(t[0]);
			this[n] === void 0 && this.#I(null, e, n), typeof this[n] != "function" && i(n, a);
		}
		for (let t of a.matchAll(b)) {
			let r = t[1];
			if (typeof this[r] != "function") throw new g(`property ${e} computed calls non-method ${r}`);
			for (let [e, t] of Object.entries(n.properties)) H(t.usedBy)?.includes(r) && i(e, a);
		}
	}
	#M(e, t) {
		this.#t.add(e);
		try {
			this[e] = t;
		} finally {
			this.#t.delete(e);
		}
	}
	#N(e, t, n = void 0) {
		if (!e) return;
		let r = this.#G(t, n, e);
		if (!r) {
			let r = e.replaceAll("this..", "this.");
			n ? V(t, n, r) : "textContent" in t && (t.textContent = r);
			return;
		}
		let i = this.#n;
		r.forEach((t) => {
			let n = M(t);
			if (typeof this[n] == "function") return;
			let r = i.propToExprsMap, a = r.get(n);
			a || (a = [], r.set(n, a)), a.includes(e) || a.push(e);
		});
		for (let [e, t] of this.#r.entries()) for (let n of t) {
			let r = n instanceof HTMLElement || n instanceof CSSStyleRule ? n : n.element;
			r instanceof CSSStyleRule || r.isConnected || this.#r.set(e, t.filter((e) => e !== n));
		}
		let a = this.#r.get(e);
		a || (a = [], this.#r.set(e, a)), a.push(n ? {
			element: t,
			attrName: n
		} : t), t instanceof HTMLElement && this.#S(t, n, r);
		let o = this.#v(e);
		n ? V(t, n, o) : this.#V(t, o);
	}
	#P(e, t) {
		let n = t?.trim() ?? "", r = this.#n.properties[n];
		r || this.#I(e, "ref", n), r.type !== m && this.#F(e, "ref", `refers to property "${n}" whose type is not HTMLElement`), this[n] && this.#F(e, "ref", `is a duplicate reference to the property "${n}"`), this[n] = e, e.removeAttribute("ref");
	}
	setAttributeSafe(e, t) {
		this.hasAttribute(e) || this.setAttribute(e, t);
	}
	setFormValue(e, t) {
		!this.#a || !P(t) || (this.#a.set(e, t), this.#s?.setFormValue(this.#a));
	}
	static ssr(e = {}) {
		throw new g("SSR is not available in the browser build.");
	}
	#F(e, t, n) {
		let r = e instanceof HTMLElement ? e.localName : "CSS rule";
		throw new g(`component ${this.#n.elementName}` + (e ? `, element "${r}"` : "") + (t ? `, attribute "${t}"` : "") + ` ${n}`);
	}
	#I(e, t, n) {
		this.#F(e, t, `refers to missing property "${n}"`);
	}
	#L(e, t) {
		return this.#R(e, this.getAttribute(t));
	}
	#R(t, n) {
		if (n?.match(w)) return n;
		let r = this.#n.properties[t], { type: i, values: a } = r;
		if (i || this.#F(null, t, "does not specify its type"), n === null) return i === Boolean ? !1 : k(r);
		if (i === String) {
			if (a && !a.includes(n)) {
				let e = a.map((e) => `"${e}"`).join(", ");
				this.#F(null, t, `must be one of ${e}`);
			}
			return n;
		}
		if (i === Number) return z(n);
		if (i === Boolean) {
			if (n === "true") return !0;
			if (n === "false" || n === "null") return !1;
			let r = e.getAttrName(t);
			return n && n !== r && this.#F(null, t, "is a Boolean attribute, so its value must match attribute name or be missing"), n === "" || n === r;
		}
	}
	#z(e, t, n, r) {
		P(n) && !this.#T(e) && n !== (t === Boolean ? this.hasAttribute(r) : this.#L(e, r)) && B(this, r || e, n);
	}
	#B(e) {
		for (let [t, n] of this.#x([e])) this.#M(t, this.#v(n));
	}
	#V(e, t) {
		if (t === void 0) return;
		let n = e instanceof HTMLElement;
		Array.isArray(t) && (t = t.join(""));
		let r = typeof t;
		r !== "string" && r !== "number" && this.#F(e, void 0, " computed content is not a string or number");
		let i = String(t);
		e instanceof HTMLElement && F(e) ? e.value = i : n && r === "string" && i.trim().startsWith("<") ? (e.innerHTML = d(i), this.#J(e), this.#E(e)) : n && (e.textContent = i);
	}
	#H(e, t) {
		let n = this.#c.get(e);
		if (!n) return;
		let r = this.getRootNode();
		if (!(r instanceof ShadowRoot)) return;
		let { host: i } = r;
		if (!i) return;
		let a = i;
		a[n] = t;
	}
	#U() {
		let e = this.#n;
		function t() {
			let t = f();
			e.methodToExprsMap = t;
			let n = Array.from(this.#r.keys());
			for (let e of n) for (let n of e.matchAll(b)) {
				let r = n[1], i = t.get(r);
				i || (i = [], t.set(r, i)), i.includes(e) || i.push(e);
			}
		}
		let { properties: n, propToExprsMap: r } = e;
		for (let [i, a] of Object.entries(n)) {
			let n = H(a.usedBy);
			if (!n) continue;
			e.methodToExprsMap || t.call(this);
			let { methodToExprsMap: o } = e, s = r.get(i);
			s || (s = [], r.set(i, s));
			for (let e of n) {
				if (typeof this[e] != "function") throw new g(`property ${i} usedBy contains non-method ${e}`);
				let t = o.get(e) || [];
				for (let e of t) s.includes(e) || s.push(e);
			}
		}
	}
	useState(e, t) {
		if (!t) {
			t = {};
			for (let n of Object.keys(e)) t[n] = n;
		}
		this.#K(e, t);
		for (let [n, r] of Object.entries(t)) if (this.#w(r)) {
			let t = o(e, n);
			t !== void 0 && (this[r] = t), this.#l.set(r, {
				state: e,
				stateProp: n
			});
		}
		let n = this.#u.get(e), r = {
			...n?.map,
			...t
		};
		n?.unsubscribe();
		let i = e.subscribe(({ statePath: e, newValue: t }) => {
			let n = r[e];
			n && (this[n] = t);
		}, Object.keys(r));
		this.#u.set(e, {
			map: r,
			unsubscribe: i
		});
	}
	#W() {
		let t = new Set(Object.keys(this.#n.properties));
		for (let n of this.getAttributeNames()) if (!p.has(n) && !n.startsWith("on") && n !== "ref") {
			if (n === "form-assoc") {
				this.#D();
				continue;
			}
			if (!t.has(e.getPropName(n))) {
				if (n === "name") {
					this.#D();
					continue;
				}
				this.#F(null, n, "is not a supported attribute");
			}
		}
	}
	#G(e, t, n) {
		let r = n.match(w);
		if (r) return r.forEach((n) => {
			let r = M(n);
			this[r] === void 0 && this.#I(e, t, r);
		}), r;
	}
	#K(e, t) {
		for (let [n, r] of Object.entries(t)) {
			let t = o(e, n);
			t === void 0 && this.#F(this, void 0, `invalid state path "${n}"`), t = this[r], this.#w(r) || this.#F(null, r, "refers to missing property in useState map");
		}
	}
	#q(e, t, n) {
		let { values: r } = this.#n.properties[e];
		if (r) {
			let i;
			t === String ? typeof n == "string" ? r.includes(n) || (i = `must be one of ${r.map((e) => `"${e}"`).join(", ")}`) : i = `value is a ${typeof n}, but type is String` : i = "declares allowed values, but its type is not String", i && this.#F(null, e, i);
		}
		if (n instanceof t) return;
		let i = typeof n;
		if (i === "object") {
			let { constructor: r } = n;
			i = r.name, r !== t && this.#F(null, e, `was set to a ${i}, but must be a ${t.name}`);
		}
		i !== t.name.toLowerCase() && this.#F(null, e, `was set to a ${i}, but must be a ${t.name}`);
	}
	#J(e) {
		let t = Array.from(e.querySelectorAll("*"));
		for (let e of t) {
			let t = [];
			for (let n of Array.from(e.attributes)) {
				let r = n.name;
				if (r.startsWith("on")) {
					let i = r.slice(2);
					i = i[0].toLowerCase() + i.slice(1).toLowerCase();
					let a = n.value;
					this.#G(e, r, a);
					let o;
					typeof this[a] == "function" ? o = (e) => this[a](e) : (this.#G(e, r, a), o = () => this.#v(a)), e.addEventListener(i, o), t.push(r);
				}
			}
			for (let n of t) e.removeAttribute(n);
		}
	}
};
function G(e, ...t) {
	let n = N(e, t);
	for (;;) {
		let e = _.exec(n);
		if (!e) break;
		let t = e[2];
		if (T.test(t)) {
			let r = e[1];
			if (!r.startsWith("--")) {
				let i = `--${r}: ${t};
      ${r}: var(--${r})`;
				n = R(n, e.index, e[0].length, i);
			}
		}
	}
	return n;
}
function K(e, ...t) {
	let n = N(e, t);
	for (;;) {
		let e = S.exec(n);
		if (!e || e[1] === "style") break;
		let t = L(e[2]);
		if (T.test(t)) {
			let r = `<!-- ${t.trim()} -->`, i = e.index + e[0].indexOf(">") + 1;
			n = R(n, i, t.length, r);
		}
	}
	return n;
}
//#endregion
export { a, K as i, O as n, G as r, W as t };

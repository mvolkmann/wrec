var Ue = (i) => {
  throw TypeError(i);
};
var Zt = (i, t, e) => t.has(i) || Ue("Cannot " + e);
var R = (i, t, e) => (Zt(i, t, "read from private field"), e ? e.call(i) : t.get(i)), j = (i, t, e) => t.has(i) ? Ue("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), ot = (i, t, e, n) => (Zt(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e), He = (i, t, e) => (Zt(i, t, "access private method"), e);
const {
  entries: Ke,
  setPrototypeOf: ze,
  isFrozen: Ln,
  getPrototypeOf: Dn,
  getOwnPropertyDescriptor: xn
} = Object;
let {
  freeze: N,
  seal: x,
  create: ce
} = Object, {
  apply: le,
  construct: fe
} = typeof Reflect < "u" && Reflect;
N || (N = function(t) {
  return t;
});
x || (x = function(t) {
  return t;
});
le || (le = function(t, e) {
  for (var n = arguments.length, s = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++)
    s[r - 2] = arguments[r];
  return t.apply(e, s);
});
fe || (fe = function(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++)
    n[s - 1] = arguments[s];
  return new t(...n);
});
const Mt = L(Array.prototype.forEach), vn = L(Array.prototype.lastIndexOf), $e = L(Array.prototype.pop), lt = L(Array.prototype.push), In = L(Array.prototype.splice), Nt = L(String.prototype.toLowerCase), Jt = L(String.prototype.toString), Qt = L(String.prototype.match), ft = L(String.prototype.replace), Pn = L(String.prototype.indexOf), kn = L(String.prototype.trim), v = L(Object.prototype.hasOwnProperty), C = L(RegExp.prototype.test), ut = Fn(TypeError);
function L(i) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++)
      n[s - 1] = arguments[s];
    return le(i, t, n);
  };
}
function Fn(i) {
  return function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return fe(i, e);
  };
}
function d(i, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Nt;
  ze && ze(i, null);
  let n = t.length;
  for (; n--; ) {
    let s = t[n];
    if (typeof s == "string") {
      const r = e(s);
      r !== s && (Ln(t) || (t[n] = r), s = r);
    }
    i[s] = !0;
  }
  return i;
}
function Un(i) {
  for (let t = 0; t < i.length; t++)
    v(i, t) || (i[t] = null);
  return i;
}
function k(i) {
  const t = ce(null);
  for (const [e, n] of Ke(i))
    v(i, e) && (Array.isArray(n) ? t[e] = Un(n) : n && typeof n == "object" && n.constructor === Object ? t[e] = k(n) : t[e] = n);
  return t;
}
function pt(i, t) {
  for (; i !== null; ) {
    const n = xn(i, t);
    if (n) {
      if (n.get)
        return L(n.get);
      if (typeof n.value == "function")
        return L(n.value);
    }
    i = Dn(i);
  }
  function e() {
    return null;
  }
  return e;
}
const We = N(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), te = N(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ee = N(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Hn = N(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), ne = N(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), zn = N(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ge = N(["#text"]), Be = N(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), oe = N(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), je = N(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ct = N(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), $n = x(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Wn = x(/<%[\w\W]*|[\w\W]*%>/gm), Gn = x(/\$\{[\w\W]*/gm), Bn = x(/^data-[\-\w.\u00B7-\uFFFF]+$/), jn = x(/^aria-[\-\w]+$/), Ze = x(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Yn = x(/^(?:\w+script|data):/i), Vn = x(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Je = x(/^html$/i), Xn = x(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Ye = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: jn,
  ATTR_WHITESPACE: Vn,
  CUSTOM_ELEMENT: Xn,
  DATA_ATTR: Bn,
  DOCTYPE_NAME: Je,
  ERB_EXPR: Wn,
  IS_ALLOWED_URI: Ze,
  IS_SCRIPT_OR_DATA: Yn,
  MUSTACHE_EXPR: $n,
  TMPLIT_EXPR: Gn
});
const ht = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, qn = function() {
  return typeof window > "u" ? null : window;
}, Kn = function(t, e) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let n = null;
  const s = "data-tt-policy-suffix";
  e && e.hasAttribute(s) && (n = e.getAttribute(s));
  const r = "dompurify" + (n ? "#" + n : "");
  try {
    return t.createPolicy(r, {
      createHTML(a) {
        return a;
      },
      createScriptURL(a) {
        return a;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + r + " could not be created."), null;
  }
}, Ve = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Qe() {
  let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : qn();
  const t = (u) => Qe(u);
  if (t.version = "3.3.1", t.removed = [], !i || !i.document || i.document.nodeType !== ht.document || !i.Element)
    return t.isSupported = !1, t;
  let {
    document: e
  } = i;
  const n = e, s = n.currentScript, {
    DocumentFragment: r,
    HTMLTemplateElement: a,
    Node: l,
    Element: p,
    NodeFilter: h,
    NamedNodeMap: m = i.NamedNodeMap || i.MozNamedAttrMap,
    HTMLFormElement: A,
    DOMParser: G,
    trustedTypes: H
  } = i, B = p.prototype, fn = pt(B, "cloneNode"), un = pt(B, "remove"), pn = pt(B, "nextSibling"), hn = pt(B, "childNodes"), At = pt(B, "parentNode");
  if (typeof a == "function") {
    const u = e.createElement("template");
    u.content && u.content.ownerDocument && (e = u.content.ownerDocument);
  }
  let w, it = "";
  const {
    implementation: Pt,
    createNodeIterator: mn,
    createDocumentFragment: dn,
    getElementsByTagName: Tn
  } = e, {
    importNode: gn
  } = n;
  let M = Ve();
  t.isSupported = typeof Ke == "function" && typeof At == "function" && Pt && Pt.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: kt,
    ERB_EXPR: Ft,
    TMPLIT_EXPR: Ut,
    DATA_ATTR: En,
    ARIA_ATTR: An,
    IS_SCRIPT_OR_DATA: _n,
    ATTR_WHITESPACE: me,
    CUSTOM_ELEMENT: bn
  } = Ye;
  let {
    IS_ALLOWED_URI: de
  } = Ye, b = null;
  const Te = d({}, [...We, ...te, ...ee, ...ne, ...Ge]);
  let S = null;
  const ge = d({}, [...Be, ...oe, ...je, ...Ct]);
  let g = Object.seal(ce(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), rt = null, Ht = null;
  const K = Object.seal(ce(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Ee = !0, zt = !0, Ae = !1, _e = !0, Z = !1, _t = !0, V = !1, $t = !1, Wt = !1, J = !1, bt = !1, St = !1, be = !0, Se = !1;
  const Sn = "user-content-";
  let Gt = !0, at = !1, Q = {}, I = null;
  const Bt = d({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let ye = null;
  const Re = d({}, ["audio", "video", "img", "source", "image", "track"]);
  let jt = null;
  const Oe = d({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), yt = "http://www.w3.org/1998/Math/MathML", Rt = "http://www.w3.org/2000/svg", z = "http://www.w3.org/1999/xhtml";
  let tt = z, Yt = !1, Vt = null;
  const yn = d({}, [yt, Rt, z], Jt);
  let Ot = d({}, ["mi", "mo", "mn", "ms", "mtext"]), wt = d({}, ["annotation-xml"]);
  const Rn = d({}, ["title", "style", "font", "a", "script"]);
  let ct = null;
  const On = ["application/xhtml+xml", "text/html"], wn = "text/html";
  let _ = null, et = null;
  const Mn = e.createElement("form"), we = function(o) {
    return o instanceof RegExp || o instanceof Function;
  }, Xt = function() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(et && et === o)) {
      if ((!o || typeof o != "object") && (o = {}), o = k(o), ct = // eslint-disable-next-line unicorn/prefer-includes
      On.indexOf(o.PARSER_MEDIA_TYPE) === -1 ? wn : o.PARSER_MEDIA_TYPE, _ = ct === "application/xhtml+xml" ? Jt : Nt, b = v(o, "ALLOWED_TAGS") ? d({}, o.ALLOWED_TAGS, _) : Te, S = v(o, "ALLOWED_ATTR") ? d({}, o.ALLOWED_ATTR, _) : ge, Vt = v(o, "ALLOWED_NAMESPACES") ? d({}, o.ALLOWED_NAMESPACES, Jt) : yn, jt = v(o, "ADD_URI_SAFE_ATTR") ? d(k(Oe), o.ADD_URI_SAFE_ATTR, _) : Oe, ye = v(o, "ADD_DATA_URI_TAGS") ? d(k(Re), o.ADD_DATA_URI_TAGS, _) : Re, I = v(o, "FORBID_CONTENTS") ? d({}, o.FORBID_CONTENTS, _) : Bt, rt = v(o, "FORBID_TAGS") ? d({}, o.FORBID_TAGS, _) : k({}), Ht = v(o, "FORBID_ATTR") ? d({}, o.FORBID_ATTR, _) : k({}), Q = v(o, "USE_PROFILES") ? o.USE_PROFILES : !1, Ee = o.ALLOW_ARIA_ATTR !== !1, zt = o.ALLOW_DATA_ATTR !== !1, Ae = o.ALLOW_UNKNOWN_PROTOCOLS || !1, _e = o.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Z = o.SAFE_FOR_TEMPLATES || !1, _t = o.SAFE_FOR_XML !== !1, V = o.WHOLE_DOCUMENT || !1, J = o.RETURN_DOM || !1, bt = o.RETURN_DOM_FRAGMENT || !1, St = o.RETURN_TRUSTED_TYPE || !1, Wt = o.FORCE_BODY || !1, be = o.SANITIZE_DOM !== !1, Se = o.SANITIZE_NAMED_PROPS || !1, Gt = o.KEEP_CONTENT !== !1, at = o.IN_PLACE || !1, de = o.ALLOWED_URI_REGEXP || Ze, tt = o.NAMESPACE || z, Ot = o.MATHML_TEXT_INTEGRATION_POINTS || Ot, wt = o.HTML_INTEGRATION_POINTS || wt, g = o.CUSTOM_ELEMENT_HANDLING || {}, o.CUSTOM_ELEMENT_HANDLING && we(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (g.tagNameCheck = o.CUSTOM_ELEMENT_HANDLING.tagNameCheck), o.CUSTOM_ELEMENT_HANDLING && we(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (g.attributeNameCheck = o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), o.CUSTOM_ELEMENT_HANDLING && typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (g.allowCustomizedBuiltInElements = o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Z && (zt = !1), bt && (J = !0), Q && (b = d({}, Ge), S = [], Q.html === !0 && (d(b, We), d(S, Be)), Q.svg === !0 && (d(b, te), d(S, oe), d(S, Ct)), Q.svgFilters === !0 && (d(b, ee), d(S, oe), d(S, Ct)), Q.mathMl === !0 && (d(b, ne), d(S, je), d(S, Ct))), o.ADD_TAGS && (typeof o.ADD_TAGS == "function" ? K.tagCheck = o.ADD_TAGS : (b === Te && (b = k(b)), d(b, o.ADD_TAGS, _))), o.ADD_ATTR && (typeof o.ADD_ATTR == "function" ? K.attributeCheck = o.ADD_ATTR : (S === ge && (S = k(S)), d(S, o.ADD_ATTR, _))), o.ADD_URI_SAFE_ATTR && d(jt, o.ADD_URI_SAFE_ATTR, _), o.FORBID_CONTENTS && (I === Bt && (I = k(I)), d(I, o.FORBID_CONTENTS, _)), o.ADD_FORBID_CONTENTS && (I === Bt && (I = k(I)), d(I, o.ADD_FORBID_CONTENTS, _)), Gt && (b["#text"] = !0), V && d(b, ["html", "head", "body"]), b.table && (d(b, ["tbody"]), delete rt.tbody), o.TRUSTED_TYPES_POLICY) {
        if (typeof o.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ut('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof o.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ut('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        w = o.TRUSTED_TYPES_POLICY, it = w.createHTML("");
      } else
        w === void 0 && (w = Kn(H, s)), w !== null && typeof it == "string" && (it = w.createHTML(""));
      N && N(o), et = o;
    }
  }, Me = d({}, [...te, ...ee, ...Hn]), Ce = d({}, [...ne, ...zn]), Cn = function(o) {
    let c = At(o);
    (!c || !c.tagName) && (c = {
      namespaceURI: tt,
      tagName: "template"
    });
    const f = Nt(o.tagName), T = Nt(c.tagName);
    return Vt[o.namespaceURI] ? o.namespaceURI === Rt ? c.namespaceURI === z ? f === "svg" : c.namespaceURI === yt ? f === "svg" && (T === "annotation-xml" || Ot[T]) : !!Me[f] : o.namespaceURI === yt ? c.namespaceURI === z ? f === "math" : c.namespaceURI === Rt ? f === "math" && wt[T] : !!Ce[f] : o.namespaceURI === z ? c.namespaceURI === Rt && !wt[T] || c.namespaceURI === yt && !Ot[T] ? !1 : !Ce[f] && (Rn[f] || !Me[f]) : !!(ct === "application/xhtml+xml" && Vt[o.namespaceURI]) : !1;
  }, P = function(o) {
    lt(t.removed, {
      element: o
    });
    try {
      At(o).removeChild(o);
    } catch {
      un(o);
    }
  }, X = function(o, c) {
    try {
      lt(t.removed, {
        attribute: c.getAttributeNode(o),
        from: c
      });
    } catch {
      lt(t.removed, {
        attribute: null,
        from: c
      });
    }
    if (c.removeAttribute(o), o === "is")
      if (J || bt)
        try {
          P(c);
        } catch {
        }
      else
        try {
          c.setAttribute(o, "");
        } catch {
        }
  }, Ne = function(o) {
    let c = null, f = null;
    if (Wt)
      o = "<remove></remove>" + o;
    else {
      const E = Qt(o, /^[\r\n\t ]+/);
      f = E && E[0];
    }
    ct === "application/xhtml+xml" && tt === z && (o = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + o + "</body></html>");
    const T = w ? w.createHTML(o) : o;
    if (tt === z)
      try {
        c = new G().parseFromString(T, ct);
      } catch {
      }
    if (!c || !c.documentElement) {
      c = Pt.createDocument(tt, "template", null);
      try {
        c.documentElement.innerHTML = Yt ? it : T;
      } catch {
      }
    }
    const O = c.body || c.documentElement;
    return o && f && O.insertBefore(e.createTextNode(f), O.childNodes[0] || null), tt === z ? Tn.call(c, V ? "html" : "body")[0] : V ? c.documentElement : O;
  }, Le = function(o) {
    return mn.call(
      o.ownerDocument || o,
      o,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, qt = function(o) {
    return o instanceof A && (typeof o.nodeName != "string" || typeof o.textContent != "string" || typeof o.removeChild != "function" || !(o.attributes instanceof m) || typeof o.removeAttribute != "function" || typeof o.setAttribute != "function" || typeof o.namespaceURI != "string" || typeof o.insertBefore != "function" || typeof o.hasChildNodes != "function");
  }, De = function(o) {
    return typeof l == "function" && o instanceof l;
  };
  function $(u, o, c) {
    Mt(u, (f) => {
      f.call(t, o, c, et);
    });
  }
  const xe = function(o) {
    let c = null;
    if ($(M.beforeSanitizeElements, o, null), qt(o))
      return P(o), !0;
    const f = _(o.nodeName);
    if ($(M.uponSanitizeElement, o, {
      tagName: f,
      allowedTags: b
    }), _t && o.hasChildNodes() && !De(o.firstElementChild) && C(/<[/\w!]/g, o.innerHTML) && C(/<[/\w!]/g, o.textContent) || o.nodeType === ht.progressingInstruction || _t && o.nodeType === ht.comment && C(/<[/\w]/g, o.data))
      return P(o), !0;
    if (!(K.tagCheck instanceof Function && K.tagCheck(f)) && (!b[f] || rt[f])) {
      if (!rt[f] && Ie(f) && (g.tagNameCheck instanceof RegExp && C(g.tagNameCheck, f) || g.tagNameCheck instanceof Function && g.tagNameCheck(f)))
        return !1;
      if (Gt && !I[f]) {
        const T = At(o) || o.parentNode, O = hn(o) || o.childNodes;
        if (O && T) {
          const E = O.length;
          for (let D = E - 1; D >= 0; --D) {
            const W = fn(O[D], !0);
            W.__removalCount = (o.__removalCount || 0) + 1, T.insertBefore(W, pn(o));
          }
        }
      }
      return P(o), !0;
    }
    return o instanceof p && !Cn(o) || (f === "noscript" || f === "noembed" || f === "noframes") && C(/<\/no(script|embed|frames)/i, o.innerHTML) ? (P(o), !0) : (Z && o.nodeType === ht.text && (c = o.textContent, Mt([kt, Ft, Ut], (T) => {
      c = ft(c, T, " ");
    }), o.textContent !== c && (lt(t.removed, {
      element: o.cloneNode()
    }), o.textContent = c)), $(M.afterSanitizeElements, o, null), !1);
  }, ve = function(o, c, f) {
    if (be && (c === "id" || c === "name") && (f in e || f in Mn))
      return !1;
    if (!(zt && !Ht[c] && C(En, c))) {
      if (!(Ee && C(An, c))) {
        if (!(K.attributeCheck instanceof Function && K.attributeCheck(c, o))) {
          if (!S[c] || Ht[c]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Ie(o) && (g.tagNameCheck instanceof RegExp && C(g.tagNameCheck, o) || g.tagNameCheck instanceof Function && g.tagNameCheck(o)) && (g.attributeNameCheck instanceof RegExp && C(g.attributeNameCheck, c) || g.attributeNameCheck instanceof Function && g.attributeNameCheck(c, o)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              c === "is" && g.allowCustomizedBuiltInElements && (g.tagNameCheck instanceof RegExp && C(g.tagNameCheck, f) || g.tagNameCheck instanceof Function && g.tagNameCheck(f)))
            ) return !1;
          } else if (!jt[c]) {
            if (!C(de, ft(f, me, ""))) {
              if (!((c === "src" || c === "xlink:href" || c === "href") && o !== "script" && Pn(f, "data:") === 0 && ye[o])) {
                if (!(Ae && !C(_n, ft(f, me, "")))) {
                  if (f)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Ie = function(o) {
    return o !== "annotation-xml" && Qt(o, bn);
  }, Pe = function(o) {
    $(M.beforeSanitizeAttributes, o, null);
    const {
      attributes: c
    } = o;
    if (!c || qt(o))
      return;
    const f = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: S,
      forceKeepAttr: void 0
    };
    let T = c.length;
    for (; T--; ) {
      const O = c[T], {
        name: E,
        namespaceURI: D,
        value: W
      } = O, nt = _(E), Kt = W;
      let y = E === "value" ? Kt : kn(Kt);
      if (f.attrName = nt, f.attrValue = y, f.keepAttr = !0, f.forceKeepAttr = void 0, $(M.uponSanitizeAttribute, o, f), y = f.attrValue, Se && (nt === "id" || nt === "name") && (X(E, o), y = Sn + y), _t && C(/((--!?|])>)|<\/(style|title|textarea)/i, y)) {
        X(E, o);
        continue;
      }
      if (nt === "attributename" && Qt(y, "href")) {
        X(E, o);
        continue;
      }
      if (f.forceKeepAttr)
        continue;
      if (!f.keepAttr) {
        X(E, o);
        continue;
      }
      if (!_e && C(/\/>/i, y)) {
        X(E, o);
        continue;
      }
      Z && Mt([kt, Ft, Ut], (Fe) => {
        y = ft(y, Fe, " ");
      });
      const ke = _(o.nodeName);
      if (!ve(ke, nt, y)) {
        X(E, o);
        continue;
      }
      if (w && typeof H == "object" && typeof H.getAttributeType == "function" && !D)
        switch (H.getAttributeType(ke, nt)) {
          case "TrustedHTML": {
            y = w.createHTML(y);
            break;
          }
          case "TrustedScriptURL": {
            y = w.createScriptURL(y);
            break;
          }
        }
      if (y !== Kt)
        try {
          D ? o.setAttributeNS(D, E, y) : o.setAttribute(E, y), qt(o) ? P(o) : $e(t.removed);
        } catch {
          X(E, o);
        }
    }
    $(M.afterSanitizeAttributes, o, null);
  }, Nn = function u(o) {
    let c = null;
    const f = Le(o);
    for ($(M.beforeSanitizeShadowDOM, o, null); c = f.nextNode(); )
      $(M.uponSanitizeShadowNode, c, null), xe(c), Pe(c), c.content instanceof r && u(c.content);
    $(M.afterSanitizeShadowDOM, o, null);
  };
  return t.sanitize = function(u) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = null, f = null, T = null, O = null;
    if (Yt = !u, Yt && (u = "<!-->"), typeof u != "string" && !De(u))
      if (typeof u.toString == "function") {
        if (u = u.toString(), typeof u != "string")
          throw ut("dirty is not a string, aborting");
      } else
        throw ut("toString is not a function");
    if (!t.isSupported)
      return u;
    if ($t || Xt(o), t.removed = [], typeof u == "string" && (at = !1), at) {
      if (u.nodeName) {
        const W = _(u.nodeName);
        if (!b[W] || rt[W])
          throw ut("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (u instanceof l)
      c = Ne("<!---->"), f = c.ownerDocument.importNode(u, !0), f.nodeType === ht.element && f.nodeName === "BODY" || f.nodeName === "HTML" ? c = f : c.appendChild(f);
    else {
      if (!J && !Z && !V && // eslint-disable-next-line unicorn/prefer-includes
      u.indexOf("<") === -1)
        return w && St ? w.createHTML(u) : u;
      if (c = Ne(u), !c)
        return J ? null : St ? it : "";
    }
    c && Wt && P(c.firstChild);
    const E = Le(at ? u : c);
    for (; T = E.nextNode(); )
      xe(T), Pe(T), T.content instanceof r && Nn(T.content);
    if (at)
      return u;
    if (J) {
      if (bt)
        for (O = dn.call(c.ownerDocument); c.firstChild; )
          O.appendChild(c.firstChild);
      else
        O = c;
      return (S.shadowroot || S.shadowrootmode) && (O = gn.call(n, O, !0)), O;
    }
    let D = V ? c.outerHTML : c.innerHTML;
    return V && b["!doctype"] && c.ownerDocument && c.ownerDocument.doctype && c.ownerDocument.doctype.name && C(Je, c.ownerDocument.doctype.name) && (D = "<!DOCTYPE " + c.ownerDocument.doctype.name + `>
` + D), Z && Mt([kt, Ft, Ut], (W) => {
      D = ft(D, W, " ");
    }), w && St ? w.createHTML(D) : D;
  }, t.setConfig = function() {
    let u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Xt(u), $t = !0;
  }, t.clearConfig = function() {
    et = null, $t = !1;
  }, t.isValidAttribute = function(u, o, c) {
    et || Xt({});
    const f = _(u), T = _(o);
    return ve(f, T, c);
  }, t.addHook = function(u, o) {
    typeof o == "function" && lt(M[u], o);
  }, t.removeHook = function(u, o) {
    if (o !== void 0) {
      const c = vn(M[u], o);
      return c === -1 ? void 0 : In(M[u], c, 1)[0];
    }
    return $e(M[u]);
  }, t.removeHooks = function(u) {
    M[u] = [];
  }, t.removeAllHooks = function() {
    M = Ve();
  }, t;
}
var tn = Qe();
function en(i, t, e = "") {
  const n = /* @__PURE__ */ new WeakMap(), s = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(r, a) {
      const l = Reflect.get(r, a);
      if (l === null || typeof l != "object") return l;
      const p = n.get(l);
      if (p) return p;
      const h = e ? `${e}.${a}` : a, m = en(l, t, h);
      return n.set(l, m), m;
    },
    // Intercept property writes.
    set(r, a, l) {
      const p = Reflect.get(r, a);
      if (p !== l) {
        Reflect.set(r, a, l);
        const h = e ? `${e}.${a}` : a;
        t(h, p, l);
      }
      return !0;
    }
  };
  return new Proxy(i, s);
}
function nn(i) {
  const t = {};
  for (const [e, n] of Object.entries(i)) {
    const s = typeof n == "object" && n !== null;
    t[e] = s ? nn(n) : n;
  }
  return t;
}
const Lt = typeof window < "u" && typeof window.document < "u";
let Xe = class extends Error {
};
var q, vt, F, gt, Et, Y, It, on;
const st = class st {
  constructor(t, e, n) {
    j(this, It);
    j(this, vt, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    j(this, F, []);
    j(this, gt);
    j(this, Et);
    j(this, Y);
    if (!t) throw new Xe("name cannot be empty");
    if (R(st, q).has(t))
      throw new Xe(`WrecState with name "${t}" already exists`);
    if (ot(this, gt, t), ot(this, Et, e), ot(this, Y, en({}, He(this, It, on).bind(this))), e && Lt) {
      const s = sessionStorage.getItem("wrec-state-" + t), r = s ? JSON.parse(s) : void 0;
      r && (n = r);
    }
    if (n)
      for (const [s, r] of Object.entries(n))
        this.addProperty(s, r);
    R(st, q).set(t, this);
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
    return R(this, q).get(t);
  }
  /**
   * @param listener - object that has a "changed" method
   * @param map - map from state property paths to component properties
   */
  addListener(t, e = {}) {
    const n = R(this, F).find(
      (s) => s.listenerRef.deref() === t
    );
    if (n) {
      const { propertyMap: s } = n;
      for (const [r, a] of Object.entries(e))
        s[r] = a;
    } else
      R(this, F).push({
        listenerRef: new WeakRef(t),
        propertyMap: e
      });
  }
  addProperty(t, e) {
    Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return R(this, Y)[t];
      },
      set(n) {
        R(this, Y)[t] = n;
      }
    }), R(this, Y)[t] = e;
  }
  get id() {
    return R(this, vt);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", R(this, gt));
    for (const [t, e] of Object.entries(R(this, Y)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    ot(this, F, R(this, F).filter((e) => e.listenerRef.deref() !== t));
  }
};
q = new WeakMap(), vt = new WeakMap(), F = new WeakMap(), gt = new WeakMap(), Et = new WeakMap(), Y = new WeakMap(), It = new WeakSet(), on = function(t, e, n) {
  const s = /* @__PURE__ */ new Set();
  for (const r of R(this, F)) {
    const a = r.listenerRef.deref();
    if (!a)
      s.add(r);
    else if (Lt && a instanceof HTMLElement && !a.isConnected)
      s.add(r);
    else {
      const { propertyMap: l } = r, p = Object.keys(l);
      (p.length === 0 || p.includes(t)) && a.changed(
        t,
        l[t],
        n,
        e,
        this
      );
    }
  }
  ot(this, F, R(this, F).filter(
    (r) => !s.has(r)
  ));
}, j(st, q, /* @__PURE__ */ new Map()), Lt && window.addEventListener("beforeunload", () => {
  for (const [t, e] of R(st, q).entries())
    if (R(e, Et)) {
      const n = nn(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(n));
    }
});
let ue = st;
Lt && process.env.NODE_ENV === "development" && (window.WrecState = ue);
function qe(i, t) {
  let e = i;
  for (const n of t.split("."))
    e = e[n];
  return e;
}
function Zn(i, t, e) {
  const n = t.split("."), s = n.length - 1;
  let r = i;
  n.forEach((a, l) => {
    l === s ? r[a] = e : r = r[a];
  });
}
const Jn = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]), Qn = /* @__PURE__ */ new Set([
  "onblur",
  "onchange",
  "onclick",
  "onfocus",
  "oninput",
  "onkeydown",
  "onreset",
  "onsubmit"
]);
tn.addHook("uponSanitizeAttribute", (i, t) => {
  const { attrName: e } = t, n = e.toLowerCase();
  Qn.has(n) && (t.forceKeepAttr = !0);
});
class Dt extends Error {
}
const to = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, sn = "a-zA-Z_$", eo = sn + "0-9", Tt = `[${sn}][${eo}]*`, no = /<!--\s*(.*?)\s*-->/, oo = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, se = new RegExp(`^this\\.${Tt}$`), ie = new RegExp(`this\\.${Tt}(\\.${Tt})*`, "g"), rn = new RegExp(`this\\.${Tt}(\\.${Tt})*`), so = 5;
function io(i) {
  return i instanceof HTMLButtonElement || i instanceof HTMLFieldSetElement || i instanceof HTMLInputElement || i instanceof HTMLSelectElement || i instanceof HTMLTextAreaElement || i instanceof U;
}
function po(i, t, e) {
  const n = document.createElement(i);
  if (t)
    for (const [s, r] of Object.entries(t))
      n.setAttribute(s, r);
  return e && (n.innerHTML = e), n;
}
const ro = (i) => i === String ? "" : i === Number ? 0 : i === Boolean ? !1 : i === Array ? [] : i === Object ? {} : void 0;
function xt(i) {
  const t = [];
  let e = i.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...xt(e.shadowRoot)), e.firstElementChild && t.push(...xt(e)), e = e.nextElementSibling;
  return t;
}
const mt = (i) => i.substring(so).split(".")[0];
function an(i, t) {
  let e = i[0];
  return t.forEach((n, s) => {
    e += n + i[s + 1];
  }), e;
}
function pe(i) {
  const t = typeof i;
  return t === "string" || t === "number" || t === "boolean";
}
function dt(i) {
  return i.localName === "textarea";
}
function he(i) {
  const { localName: t } = i;
  return t === "input" || t === "select";
}
const ao = (i) => i.replace(/<!--[\s\S]*?-->/g, "");
function cn(i, t, e, n) {
  return i.slice(0, t) + n + i.slice(t + e);
}
function co(i) {
  let t = i.trim(), e = null;
  /^\s*<tr[\s>]/i.test(t) ? (t = `<table><tbody>${t}</tbody></table>`, e = "tbody") : /^\s*<(td|th)[\s>]/i.test(t) ? (t = `<table><tbody><tr>${t}</tr></tbody></table>`, e = "tr") : /^\s*<option[\s>]/i.test(t) ? (t = `<select>${t}</select>`, e = "select") : /^\s*<col[\s>]/i.test(t) && (t = `<table><colgroup>${t}</colgroup></table>`, e = "colgroup");
  const n = tn.sanitize(t, {
    ADD_TAGS: ["#comment"],
    ALLOW_UNKNOWN_PROTOCOLS: !0,
    RETURN_DOM_FRAGMENT: !0
  });
  if (e) {
    const s = n.querySelector(e);
    if (s) return s.childNodes;
  }
  return n.childNodes;
}
function re(i) {
  const t = Number(i);
  if (isNaN(t)) throw new Dt(`can't convert "${i}" to a number`);
  return t;
}
function ln(i, t, e) {
  const [n, s] = t.split(":");
  if (pe(e))
    if (typeof e == "boolean") {
      e ? i.setAttribute(n, n) : i.removeAttribute(n);
      const r = U.getPropName(n);
      i[r] = e;
    } else {
      const r = i.getAttribute(t), a = String(e);
      r !== a && (i.setAttribute(n, a), n === "value" && he(i) && (i.value = a));
    }
  else {
    const r = U.getPropName(t);
    i[r] = e;
  }
}
function ae(i, t, e) {
  const [n, s] = t.split(":");
  i instanceof CSSStyleRule ? i.style.setProperty(n, e) : (ln(i, n, e), n === "value" && he(i) && (i.value = e));
}
async function lo(i) {
  const t = /* @__PURE__ */ new Set();
  for (const n of xt(i.content)) {
    const { localName: s } = n;
    s.includes("-") && t.add(s);
  }
  function e(n) {
    return new Promise((s, r) => {
      setTimeout(() => {
        const a = `custom element <${n}> not defined`;
        r(new Error(a));
      }, 1e3);
    });
  }
  return Promise.all(
    [...t].map(
      async (n) => Promise.race([customElements.whenDefined(n), e(n)])
    )
  );
}
class U extends HTMLElement {
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
  #c = !1;
  #t = this.constructor;
  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #o = /* @__PURE__ */ new Map();
  #l = {};
  #s;
  // For components that set `formAssociated` to true,
  // this stores in the initial value of each property
  // in the formAssociatedCallback method
  // so they can be restored in the formResetCallback method.
  #f = {};
  #u = null;
  // This is a map from properties in this web component
  // to corresponding properties in a parent web component.
  // This must be an instance property because
  // each component instance can have its properties mapped
  // to the properties of different parent components.
  // This is used to update a parent property
  // when the corresponding child property value changes.
  #p = /* @__PURE__ */ new Map();
  static define(t) {
    if (this.elementName = t, customElements.get(t))
      throw new Dt(`custom element ${t} is already defined`);
    customElements.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.attrToPropMap || (t.attrToPropMap = /* @__PURE__ */ new Map()), t.properties || (t.properties = {}), t.propToAttrMap || (t.propToExprsMap = /* @__PURE__ */ new Map()), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, n) {
    t === "disabled" && this.#d();
    const s = U.getPropName(t);
    if (this.#i(s)) {
      const r = this.#S(s, String(n));
      this[s] = r;
      const a = this.#l[s];
      a && this.setFormValue(a, String(r)), this.propertyChangedCallback(s, e, n);
    }
  }
  // This applies multiple property changes and only updates
  // the affected parts of the DOM after all of them are made.
  batchSet(t) {
    this.#c = !0;
    const e = this.#t.propToExprsMap, n = /* @__PURE__ */ new Set();
    for (const [l, p] of Object.entries(t)) {
      this[l] = p;
      const h = e.get(l) ?? [];
      for (const m of h)
        n.add(m);
    }
    const s = this.#t.propToComputedMap, r = /* @__PURE__ */ new Set(), a = {};
    for (const l of Object.keys(t)) {
      const p = s.get(l) || [];
      for (const [h, m] of p)
        r.add(h), a[h] = m;
    }
    for (const l of r) {
      const p = a[l];
      this[l] = this.#n(p);
      const h = e.get(l) ?? [];
      for (const m of h)
        n.add(m);
    }
    for (; ; ) {
      let l = !1;
      for (const p of r) {
        const h = a[p], m = this.#n(h), A = this[p];
        JSON.stringify(m) !== JSON.stringify(A) && (this[p] = m, l = !0);
      }
      if (!l) break;
    }
    this.#T([...n]), this.#c = !1;
  }
  async #O() {
    const t = this.#t;
    let { template: e } = t;
    if (!e) {
      e = t.template = document.createElement("template");
      let n = `<style>
    :host([hidden]) { display: none; }`;
      t.css && (n += t.css), n += `</style>
`;
      let s = t.html.trim();
      s || this.#e(this, void 0, "static property html must be set"), s.startsWith("<") || (s = `<span><!--${s}--></span>`), e.innerHTML = n + s;
    }
    await lo(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, n) {
    this[e] = n;
  }
  connectedCallback() {
    this.#P(), this.#M(), this.#O().then(() => {
      this.hasAttribute("disabled") && this.#d(), this.#R(this.shadowRoot), this.#g(this.shadowRoot), this.#w();
    });
  }
  #w() {
    const t = this.#t, { properties: e } = t;
    for (const [n, { computed: s }] of Object.entries(e))
      s && (this[n] = this.#n(s));
  }
  #M() {
    const t = this.#t, { observedAttributes: e, properties: n } = t;
    for (const [s, r] of Object.entries(n))
      r.computed || this.#m(s, r, e);
    for (const [s, r] of Object.entries(n))
      r.computed && this.#m(s, r, e);
  }
  #m(t, e, n) {
    if (t === "class" || t === "style")
      throw new Dt(`"${t}" is a reserved property`);
    const s = U.getAttrName(t), r = this.hasAttribute(s);
    e.required && !r && this.#e(this, s, "is a required attribute");
    let a = e.value;
    this.hasOwnProperty(t) && (a = this[t], delete this[t]);
    const { type: l } = e, p = l === Boolean ? a || r : n.includes(s) && r ? this.#b(t, s) : a || ro(l), h = "#" + t;
    this[h] = p, e.computed && this.#D(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[h];
      },
      set(m) {
        l === Number && typeof m == "string" && (m = re(m));
        const A = this[h];
        if (m === A) return;
        this.#F(t, l, m), this[h] = m;
        const { state: G, stateProp: H } = this.#t.properties[t];
        H && Zn(G, H, m), this.#x(t, l, m, s), this.#c || (this.#v(t), this.#_(t)), this.#I(t, m);
        const B = this.#l[t];
        B && this.setFormValue(B, String(m)), this.propertyChangedCallback(t, A, m), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: A,
          value: m
        });
      }
    });
  }
  #d() {
    const t = this.hasAttribute("disabled"), e = xt(this.shadowRoot);
    for (const n of e)
      io(n) && (n.disabled = t);
  }
  disconnectedCallback() {
    this.#o.clear(), this.#f.clear(), this.#p.clear();
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
  #C(t) {
    const e = t instanceof U;
    for (const n of t.getAttributeNames()) {
      const s = t.getAttribute(n), r = this.#A(t, s);
      if (r) {
        const a = this[r];
        a === void 0 && this.#a(t, n, r), t[r] = a;
        let [l, p] = n.split(":");
        l === "value" && (p ? (t["on" + p] === void 0 && this.#e(t, n, "refers to an unsupported event name"), t.setAttribute(l, this[r])) : p = "change"), e && t.#p.set(
          U.getPropName(l),
          r
        );
      }
      this.#r(s, t, n);
    }
  }
  #T(t) {
    for (const e of t) {
      const n = this.#n(e), s = this.#o.get(e) ?? [];
      for (const r of s)
        if (r instanceof HTMLElement)
          this.#y(r, n);
        else if (!(r instanceof CSSStyleRule)) {
          const { element: a, attrName: l } = r;
          a instanceof CSSStyleRule ? a.style.setProperty(l, n) : ae(a, l, n);
        }
    }
  }
  #n(t) {
    const { context: e } = this.#t;
    return new Function(
      "context",
      `const {${Object.keys(e).join(",")}} = context; return ${t};`
    ).call(this, e);
  }
  #N(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: n } = t, s = n?.cssRules ?? [], r = Array.from(s);
      for (const a of r)
        if (a.constructor === CSSStyleRule) {
          const l = Array.from(a.style);
          for (const p of l)
            if (p.startsWith("--")) {
              const h = a.style.getPropertyValue(p);
              this.#r(h, a, p);
            }
        }
    } else {
      let n = "";
      if (dt(t)) {
        this.#r(t.textContent, t);
        const s = t.textContent?.match(no);
        s && (n = s[1]);
      } else {
        const s = Array.from(t.childNodes).find(
          (r) => r.nodeType === Node.COMMENT_NODE
        );
        s && (n = s.textContent?.trim() ?? "");
      }
      if (n) {
        const s = this.#A(t, n);
        s && dt(t) ? t.textContent = this[s] : this.#r(n, t);
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
      const a = this.getAttribute("name");
      if (a)
        if (this.#i("value"))
          t = `value:${a}`;
        else
          return;
      else
        return;
    }
    const e = {}, n = t.split(",");
    for (const a of n) {
      const [l, p] = a.split(":");
      e[l.trim()] = p.trim();
    }
    this.#l = e, this.#s = new FormData(), this.#u = this.attachInternals(), this.#u.setFormValue(this.#s);
    const s = Object.keys(this.#t.properties), r = this.#f;
    for (const a of s)
      r[a] = this[a];
  }
  formResetCallback() {
    const t = this.#f;
    for (const e of Object.keys(t)) {
      let n = t[e];
      se.test(n) && (n = this.#n(n)), this[e] = n;
    }
  }
  static getAttrName(t) {
    let e = this.propToAttrMap.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), this.propToAttrMap.set(t, e)), e;
  }
  static getPropName(t) {
    let e = this.attrToPropMap.get(t);
    return e || (e = t.replace(/-([a-z])/g, (n, s) => s.toUpperCase()), this.attrToPropMap.set(t, e)), e;
  }
  #L(t, e, n) {
    if (n.length !== 1) return;
    const [s] = n;
    if (!se.test(s)) return;
    const r = he(t) || dt(t);
    let [a, l] = (e ?? "").split(":");
    if (!(r && a === "value" || dt(t))) return;
    l ? t["on" + l] === void 0 && this.#e(t, e, "refers to an unsupported event name") : l = "change";
    const h = mt(s);
    t.addEventListener(l, (m) => {
      const { target: A } = m;
      if (!A) return;
      const G = A.value, { type: H } = this.#t.properties[h];
      this[h] = H === Number ? re(G) : G, this.#_(h);
    });
  }
  #i(t) {
    return !!this.#t.properties[t];
  }
  #g(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e)
      this.#C(n), n.firstElementChild || this.#N(n);
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
      (e) => U.getAttrName(e)
    );
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, n) {
  }
  #A(t, e) {
    if (!e || !se.test(e)) return;
    const n = mt(e);
    return this[n] === void 0 && this.#a(t, "", n), n;
  }
  #_(t) {
    const e = this.#t.propToExprsMap.get(t) || [];
    this.#T(e);
  }
  #D(t, e) {
    const { computed: n, uses: s } = e, r = this.#t.propToComputedMap;
    function a(p, h) {
      let m = r.get(p);
      m || (m = [], r.set(p, m)), m.push([t, h]);
    }
    const l = n.match(ie) || [];
    for (const p of l) {
      const h = mt(p);
      this[h] === void 0 && this.#a(null, t, h), typeof this[h] != "function" && a(h, n);
    }
    if (s)
      for (const p of s.split(","))
        a(p.trim(), n);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #r(t, e, n = void 0) {
    if (!t) return;
    const s = this.#h(e, n, t);
    if (!s) {
      const p = t.replaceAll("this..", "this.");
      n ? ae(e, n, p) : "textContent" in e && (e.textContent = p);
      return;
    }
    const r = this.#t;
    s.forEach((p) => {
      const h = mt(p);
      if (typeof this[h] == "function") return;
      const m = r.propToExprsMap;
      let A = m.get(h);
      A || (A = [], m.set(h, A)), A.includes(t) || A.push(t);
    });
    for (const [p, h] of this.#o.entries())
      for (const m of h) {
        const A = m instanceof HTMLElement || m instanceof CSSStyleRule ? m : m.element;
        A instanceof CSSStyleRule || A.isConnected || this.#o.set(
          p,
          h.filter((G) => G !== m)
        );
      }
    let a = this.#o.get(t);
    a || (a = [], this.#o.set(t, a)), a.push(n ? { element: e, attrName: n } : e), e instanceof HTMLElement && this.#L(e, n, s);
    const l = this.#n(t);
    n ? ae(e, n, l) : this.#y(e, l);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#s || !pe(e) || (this.#s.set(t, e), this.#u?.setFormValue(this.#s));
  }
  #e(t, e, n) {
    const s = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new Dt(
      `component ${this.#t.elementName}` + (t ? `, element "${s}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${n}`
    );
  }
  #a(t, e, n) {
    this.#e(t, e, `refers to missing property "${n}"`);
  }
  #b(t, e) {
    return this.#S(t, this.getAttribute(e));
  }
  #S(t, e) {
    if (e?.match(ie)) return e;
    const n = this.#t, { type: s } = n.properties[t];
    if (s || this.#e(null, t, "does not specify its type"), s === String) return e;
    if (s === Number) return re(e);
    if (s === Boolean)
      return e === "true" ? !0 : e === "false" || e === "null" ? !1 : (e && e !== t && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === t);
  }
  // Updates the matching attribute for a property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #x(t, e, n, s) {
    if (pe(n)) {
      const r = e === Boolean ? this.hasAttribute(s) : this.#b(t, s);
      n !== r && ln(this, s || t, n);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #v(t) {
    const n = this.#t.propToComputedMap.get(t) || [];
    for (const [s, r] of n)
      this[s] = this.#n(r);
  }
  #y(t, e) {
    if (e === void 0) return;
    const n = t instanceof HTMLElement;
    Array.isArray(e) && (e = e.join(""));
    const s = typeof e;
    s !== "string" && s !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    );
    const r = String(e);
    if (t instanceof HTMLElement && dt(t))
      t.value = r;
    else if (n && s === "string" && r.trim().startsWith("<")) {
      const a = co(r);
      t.replaceChildren(...a), this.#R(t), this.#g(t);
    } else n && (t.textContent = r);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #I(t, e) {
    const n = this.#p.get(t);
    if (!n) return;
    const s = this.getRootNode();
    if (!(s instanceof ShadowRoot)) return;
    const { host: r } = s;
    if (!r) return;
    const a = r;
    a[n] = e;
  }
  /**
   * @param state - WrecState object
   * @param map - object whose keys are state properties and
   *   whose values are component properties
   */
  useState(t, e) {
    if (!e) {
      e = {};
      for (const n of Object.keys(t))
        e[n] = n;
    }
    this.#k(t, e);
    for (const [n, s] of Object.entries(e))
      if (this.#i(s)) {
        const r = qe(t, n);
        r !== void 0 && (this[s] = r);
        const a = this.#t.properties[s];
        a.state = t, a.stateProp = n;
      }
    t.addListener(this, e);
  }
  #P() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!Jn.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#E();
          continue;
        }
        if (!t.has(U.getPropName(e))) {
          if (e === "name") {
            this.#E();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #h(t, e, n) {
    const s = n.match(ie);
    if (s)
      return s.forEach((r) => {
        const a = mt(r);
        this[a] === void 0 && this.#a(t, e, a);
      }), s;
  }
  #k(t, e) {
    for (const [n, s] of Object.entries(e)) {
      let r = qe(t, n);
      r === void 0 && this.#e(this, void 0, `invalid state path "${n}"`), r = this[s], this.#i(s) || this.#e(
        null,
        s,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #F(t, e, n) {
    if (n instanceof e) return;
    let s = typeof n;
    if (s === "object") {
      const { constructor: r } = n;
      s = r.name, r !== e && this.#e(
        null,
        t,
        `was set to a ${s}, but must be a ${e.name}`
      );
    }
    s !== e.name.toLowerCase() && this.#e(
      null,
      t,
      `was set to a ${s}, but must be a ${e.name}`
    );
  }
  #R(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e) {
      const s = [];
      for (const r of Array.from(n.attributes)) {
        const a = r.name;
        if (a.startsWith("on")) {
          let l = a.slice(2);
          l = l[0].toLowerCase() + l.slice(1).toLowerCase();
          const p = r.value;
          this.#h(n, a, p);
          let h;
          typeof this[p] == "function" ? h = (m) => this[p](m) : (this.#h(n, a, p), h = () => this.#n(p)), n.addEventListener(l, h), s.push(a);
        }
      }
      for (const r of s)
        n.removeAttribute(r);
    }
  }
}
function ho(i, ...t) {
  let e = an(i, t);
  for (; ; ) {
    const n = to.exec(e);
    if (!n) break;
    const s = n[2];
    if (rn.test(s)) {
      const r = n[1];
      if (!r.startsWith("--")) {
        const a = `--${r}: ${s};
      ${r}: var(--${r})`;
        e = cn(e, n.index, n[0].length, a);
      }
    }
  }
  return e;
}
function mo(i, ...t) {
  let e = an(i, t);
  for (; ; ) {
    const n = oo.exec(e);
    if (!n || n[1] === "style") break;
    const s = ao(n[2]);
    if (rn.test(s)) {
      const r = `<!-- ${s.trim()} -->`, a = n.index + n[0].indexOf(">") + 1;
      e = cn(e, a, s.length, r);
    }
  }
  return e;
}
export {
  U as Wrec,
  ue as WrecState,
  po as createElement,
  ho as css,
  mo as html
};

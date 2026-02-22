var Ue = (i) => {
  throw TypeError(i);
};
var Zt = (i, t, e) => t.has(i) || Ue("Cannot " + e);
var R = (i, t, e) => (Zt(i, t, "read from private field"), e ? e.call(i) : t.get(i)), j = (i, t, e) => t.has(i) ? Ue("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), ot = (i, t, e, n) => (Zt(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e), He = (i, t, e) => (Zt(i, t, "access private method"), e);
const {
  entries: Ke,
  setPrototypeOf: ze,
  isFrozen: Nn,
  getPrototypeOf: Dn,
  getOwnPropertyDescriptor: In
} = Object;
let {
  freeze: L,
  seal: I,
  create: ce
} = Object, {
  apply: le,
  construct: fe
} = typeof Reflect < "u" && Reflect;
L || (L = function(t) {
  return t;
});
I || (I = function(t) {
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
const Mt = N(Array.prototype.forEach), Pn = N(Array.prototype.lastIndexOf), $e = N(Array.prototype.pop), ft = N(Array.prototype.push), xn = N(Array.prototype.splice), Nt = N(String.prototype.toLowerCase), Jt = N(String.prototype.toString), Qt = N(String.prototype.match), ut = N(String.prototype.replace), vn = N(String.prototype.indexOf), kn = N(String.prototype.trim), P = N(Object.prototype.hasOwnProperty), M = N(RegExp.prototype.test), pt = Fn(TypeError);
function N(i) {
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
      r !== s && (Nn(t) || (t[n] = r), s = r);
    }
    i[s] = !0;
  }
  return i;
}
function Un(i) {
  for (let t = 0; t < i.length; t++)
    P(i, t) || (i[t] = null);
  return i;
}
function k(i) {
  const t = ce(null);
  for (const [e, n] of Ke(i))
    P(i, e) && (Array.isArray(n) ? t[e] = Un(n) : n && typeof n == "object" && n.constructor === Object ? t[e] = k(n) : t[e] = n);
  return t;
}
function ht(i, t) {
  for (; i !== null; ) {
    const n = In(i, t);
    if (n) {
      if (n.get)
        return N(n.get);
      if (typeof n.value == "function")
        return N(n.value);
    }
    i = Dn(i);
  }
  function e() {
    return null;
  }
  return e;
}
const We = L(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), te = L(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ee = L(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Hn = L(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), ne = L(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), zn = L(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Ge = L(["#text"]), Be = L(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), oe = L(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), je = L(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Lt = L(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), $n = I(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Wn = I(/<%[\w\W]*|[\w\W]*%>/gm), Gn = I(/\$\{[\w\W]*/gm), Bn = I(/^data-[\-\w.\u00B7-\uFFFF]+$/), jn = I(/^aria-[\-\w]+$/), Ze = I(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Yn = I(/^(?:\w+script|data):/i), Vn = I(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Je = I(/^html$/i), Xn = I(/^[a-z][.\w]*(-[.\w]+)+$/i);
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
const mt = {
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
      createHTML(c) {
        return c;
      },
      createScriptURL(c) {
        return c;
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
  const t = (f) => Qe(f);
  if (t.version = "3.3.1", t.removed = [], !i || !i.document || i.document.nodeType !== mt.document || !i.Element)
    return t.isSupported = !1, t;
  let {
    document: e
  } = i;
  const n = e, s = n.currentScript, {
    DocumentFragment: r,
    HTMLTemplateElement: c,
    Node: u,
    Element: p,
    NodeFilter: h,
    NamedNodeMap: m = i.NamedNodeMap || i.MozNamedAttrMap,
    HTMLFormElement: b,
    DOMParser: G,
    trustedTypes: H
  } = i, B = p.prototype, fn = ht(B, "cloneNode"), un = ht(B, "remove"), pn = ht(B, "nextSibling"), hn = ht(B, "childNodes"), _t = ht(B, "parentNode");
  if (typeof c == "function") {
    const f = e.createElement("template");
    f.content && f.content.ownerDocument && (e = f.content.ownerDocument);
  }
  let O, rt = "";
  const {
    implementation: vt,
    createNodeIterator: mn,
    createDocumentFragment: dn,
    getElementsByTagName: Tn
  } = e, {
    importNode: gn
  } = n;
  let C = Ve();
  t.isSupported = typeof Ke == "function" && typeof _t == "function" && vt && vt.createHTMLDocument !== void 0;
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
  } = Ye, _ = null;
  const Te = d({}, [...We, ...te, ...ee, ...ne, ...Ge]);
  let S = null;
  const ge = d({}, [...Be, ...oe, ...je, ...Lt]);
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
  })), at = null, Ht = null;
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
  let Ee = !0, zt = !0, Ae = !1, _e = !0, Z = !1, bt = !0, V = !1, $t = !1, Wt = !1, J = !1, St = !1, yt = !1, be = !0, Se = !1;
  const Sn = "user-content-";
  let Gt = !0, ct = !1, Q = {}, x = null;
  const Bt = d({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let ye = null;
  const Re = d({}, ["audio", "video", "img", "source", "image", "track"]);
  let jt = null;
  const we = d({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Rt = "http://www.w3.org/1998/Math/MathML", wt = "http://www.w3.org/2000/svg", z = "http://www.w3.org/1999/xhtml";
  let tt = z, Yt = !1, Vt = null;
  const yn = d({}, [Rt, wt, z], Jt);
  let Ot = d({}, ["mi", "mo", "mn", "ms", "mtext"]), Ct = d({}, ["annotation-xml"]);
  const Rn = d({}, ["title", "style", "font", "a", "script"]);
  let lt = null;
  const wn = ["application/xhtml+xml", "text/html"], On = "text/html";
  let A = null, et = null;
  const Cn = e.createElement("form"), Oe = function(o) {
    return o instanceof RegExp || o instanceof Function;
  }, Xt = function() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(et && et === o)) {
      if ((!o || typeof o != "object") && (o = {}), o = k(o), lt = // eslint-disable-next-line unicorn/prefer-includes
      wn.indexOf(o.PARSER_MEDIA_TYPE) === -1 ? On : o.PARSER_MEDIA_TYPE, A = lt === "application/xhtml+xml" ? Jt : Nt, _ = P(o, "ALLOWED_TAGS") ? d({}, o.ALLOWED_TAGS, A) : Te, S = P(o, "ALLOWED_ATTR") ? d({}, o.ALLOWED_ATTR, A) : ge, Vt = P(o, "ALLOWED_NAMESPACES") ? d({}, o.ALLOWED_NAMESPACES, Jt) : yn, jt = P(o, "ADD_URI_SAFE_ATTR") ? d(k(we), o.ADD_URI_SAFE_ATTR, A) : we, ye = P(o, "ADD_DATA_URI_TAGS") ? d(k(Re), o.ADD_DATA_URI_TAGS, A) : Re, x = P(o, "FORBID_CONTENTS") ? d({}, o.FORBID_CONTENTS, A) : Bt, at = P(o, "FORBID_TAGS") ? d({}, o.FORBID_TAGS, A) : k({}), Ht = P(o, "FORBID_ATTR") ? d({}, o.FORBID_ATTR, A) : k({}), Q = P(o, "USE_PROFILES") ? o.USE_PROFILES : !1, Ee = o.ALLOW_ARIA_ATTR !== !1, zt = o.ALLOW_DATA_ATTR !== !1, Ae = o.ALLOW_UNKNOWN_PROTOCOLS || !1, _e = o.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Z = o.SAFE_FOR_TEMPLATES || !1, bt = o.SAFE_FOR_XML !== !1, V = o.WHOLE_DOCUMENT || !1, J = o.RETURN_DOM || !1, St = o.RETURN_DOM_FRAGMENT || !1, yt = o.RETURN_TRUSTED_TYPE || !1, Wt = o.FORCE_BODY || !1, be = o.SANITIZE_DOM !== !1, Se = o.SANITIZE_NAMED_PROPS || !1, Gt = o.KEEP_CONTENT !== !1, ct = o.IN_PLACE || !1, de = o.ALLOWED_URI_REGEXP || Ze, tt = o.NAMESPACE || z, Ot = o.MATHML_TEXT_INTEGRATION_POINTS || Ot, Ct = o.HTML_INTEGRATION_POINTS || Ct, g = o.CUSTOM_ELEMENT_HANDLING || {}, o.CUSTOM_ELEMENT_HANDLING && Oe(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (g.tagNameCheck = o.CUSTOM_ELEMENT_HANDLING.tagNameCheck), o.CUSTOM_ELEMENT_HANDLING && Oe(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (g.attributeNameCheck = o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), o.CUSTOM_ELEMENT_HANDLING && typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (g.allowCustomizedBuiltInElements = o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Z && (zt = !1), St && (J = !0), Q && (_ = d({}, Ge), S = [], Q.html === !0 && (d(_, We), d(S, Be)), Q.svg === !0 && (d(_, te), d(S, oe), d(S, Lt)), Q.svgFilters === !0 && (d(_, ee), d(S, oe), d(S, Lt)), Q.mathMl === !0 && (d(_, ne), d(S, je), d(S, Lt))), o.ADD_TAGS && (typeof o.ADD_TAGS == "function" ? K.tagCheck = o.ADD_TAGS : (_ === Te && (_ = k(_)), d(_, o.ADD_TAGS, A))), o.ADD_ATTR && (typeof o.ADD_ATTR == "function" ? K.attributeCheck = o.ADD_ATTR : (S === ge && (S = k(S)), d(S, o.ADD_ATTR, A))), o.ADD_URI_SAFE_ATTR && d(jt, o.ADD_URI_SAFE_ATTR, A), o.FORBID_CONTENTS && (x === Bt && (x = k(x)), d(x, o.FORBID_CONTENTS, A)), o.ADD_FORBID_CONTENTS && (x === Bt && (x = k(x)), d(x, o.ADD_FORBID_CONTENTS, A)), Gt && (_["#text"] = !0), V && d(_, ["html", "head", "body"]), _.table && (d(_, ["tbody"]), delete at.tbody), o.TRUSTED_TYPES_POLICY) {
        if (typeof o.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw pt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof o.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw pt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        O = o.TRUSTED_TYPES_POLICY, rt = O.createHTML("");
      } else
        O === void 0 && (O = Kn(H, s)), O !== null && typeof rt == "string" && (rt = O.createHTML(""));
      L && L(o), et = o;
    }
  }, Ce = d({}, [...te, ...ee, ...Hn]), Me = d({}, [...ne, ...zn]), Mn = function(o) {
    let a = _t(o);
    (!a || !a.tagName) && (a = {
      namespaceURI: tt,
      tagName: "template"
    });
    const l = Nt(o.tagName), T = Nt(a.tagName);
    return Vt[o.namespaceURI] ? o.namespaceURI === wt ? a.namespaceURI === z ? l === "svg" : a.namespaceURI === Rt ? l === "svg" && (T === "annotation-xml" || Ot[T]) : !!Ce[l] : o.namespaceURI === Rt ? a.namespaceURI === z ? l === "math" : a.namespaceURI === wt ? l === "math" && Ct[T] : !!Me[l] : o.namespaceURI === z ? a.namespaceURI === wt && !Ct[T] || a.namespaceURI === Rt && !Ot[T] ? !1 : !Me[l] && (Rn[l] || !Ce[l]) : !!(lt === "application/xhtml+xml" && Vt[o.namespaceURI]) : !1;
  }, v = function(o) {
    ft(t.removed, {
      element: o
    });
    try {
      _t(o).removeChild(o);
    } catch {
      un(o);
    }
  }, X = function(o, a) {
    try {
      ft(t.removed, {
        attribute: a.getAttributeNode(o),
        from: a
      });
    } catch {
      ft(t.removed, {
        attribute: null,
        from: a
      });
    }
    if (a.removeAttribute(o), o === "is")
      if (J || St)
        try {
          v(a);
        } catch {
        }
      else
        try {
          a.setAttribute(o, "");
        } catch {
        }
  }, Le = function(o) {
    let a = null, l = null;
    if (Wt)
      o = "<remove></remove>" + o;
    else {
      const E = Qt(o, /^[\r\n\t ]+/);
      l = E && E[0];
    }
    lt === "application/xhtml+xml" && tt === z && (o = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + o + "</body></html>");
    const T = O ? O.createHTML(o) : o;
    if (tt === z)
      try {
        a = new G().parseFromString(T, lt);
      } catch {
      }
    if (!a || !a.documentElement) {
      a = vt.createDocument(tt, "template", null);
      try {
        a.documentElement.innerHTML = Yt ? rt : T;
      } catch {
      }
    }
    const w = a.body || a.documentElement;
    return o && l && w.insertBefore(e.createTextNode(l), w.childNodes[0] || null), tt === z ? Tn.call(a, V ? "html" : "body")[0] : V ? a.documentElement : w;
  }, Ne = function(o) {
    return mn.call(
      o.ownerDocument || o,
      o,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT | h.SHOW_PROCESSING_INSTRUCTION | h.SHOW_CDATA_SECTION,
      null
    );
  }, qt = function(o) {
    return o instanceof b && (typeof o.nodeName != "string" || typeof o.textContent != "string" || typeof o.removeChild != "function" || !(o.attributes instanceof m) || typeof o.removeAttribute != "function" || typeof o.setAttribute != "function" || typeof o.namespaceURI != "string" || typeof o.insertBefore != "function" || typeof o.hasChildNodes != "function");
  }, De = function(o) {
    return typeof u == "function" && o instanceof u;
  };
  function $(f, o, a) {
    Mt(f, (l) => {
      l.call(t, o, a, et);
    });
  }
  const Ie = function(o) {
    let a = null;
    if ($(C.beforeSanitizeElements, o, null), qt(o))
      return v(o), !0;
    const l = A(o.nodeName);
    if ($(C.uponSanitizeElement, o, {
      tagName: l,
      allowedTags: _
    }), bt && o.hasChildNodes() && !De(o.firstElementChild) && M(/<[/\w!]/g, o.innerHTML) && M(/<[/\w!]/g, o.textContent) || o.nodeType === mt.progressingInstruction || bt && o.nodeType === mt.comment && M(/<[/\w]/g, o.data))
      return v(o), !0;
    if (!(K.tagCheck instanceof Function && K.tagCheck(l)) && (!_[l] || at[l])) {
      if (!at[l] && xe(l) && (g.tagNameCheck instanceof RegExp && M(g.tagNameCheck, l) || g.tagNameCheck instanceof Function && g.tagNameCheck(l)))
        return !1;
      if (Gt && !x[l]) {
        const T = _t(o) || o.parentNode, w = hn(o) || o.childNodes;
        if (w && T) {
          const E = w.length;
          for (let D = E - 1; D >= 0; --D) {
            const W = fn(w[D], !0);
            W.__removalCount = (o.__removalCount || 0) + 1, T.insertBefore(W, pn(o));
          }
        }
      }
      return v(o), !0;
    }
    return o instanceof p && !Mn(o) || (l === "noscript" || l === "noembed" || l === "noframes") && M(/<\/no(script|embed|frames)/i, o.innerHTML) ? (v(o), !0) : (Z && o.nodeType === mt.text && (a = o.textContent, Mt([kt, Ft, Ut], (T) => {
      a = ut(a, T, " ");
    }), o.textContent !== a && (ft(t.removed, {
      element: o.cloneNode()
    }), o.textContent = a)), $(C.afterSanitizeElements, o, null), !1);
  }, Pe = function(o, a, l) {
    if (be && (a === "id" || a === "name") && (l in e || l in Cn))
      return !1;
    if (!(zt && !Ht[a] && M(En, a))) {
      if (!(Ee && M(An, a))) {
        if (!(K.attributeCheck instanceof Function && K.attributeCheck(a, o))) {
          if (!S[a] || Ht[a]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(xe(o) && (g.tagNameCheck instanceof RegExp && M(g.tagNameCheck, o) || g.tagNameCheck instanceof Function && g.tagNameCheck(o)) && (g.attributeNameCheck instanceof RegExp && M(g.attributeNameCheck, a) || g.attributeNameCheck instanceof Function && g.attributeNameCheck(a, o)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              a === "is" && g.allowCustomizedBuiltInElements && (g.tagNameCheck instanceof RegExp && M(g.tagNameCheck, l) || g.tagNameCheck instanceof Function && g.tagNameCheck(l)))
            ) return !1;
          } else if (!jt[a]) {
            if (!M(de, ut(l, me, ""))) {
              if (!((a === "src" || a === "xlink:href" || a === "href") && o !== "script" && vn(l, "data:") === 0 && ye[o])) {
                if (!(Ae && !M(_n, ut(l, me, "")))) {
                  if (l)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, xe = function(o) {
    return o !== "annotation-xml" && Qt(o, bn);
  }, ve = function(o) {
    $(C.beforeSanitizeAttributes, o, null);
    const {
      attributes: a
    } = o;
    if (!a || qt(o))
      return;
    const l = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: S,
      forceKeepAttr: void 0
    };
    let T = a.length;
    for (; T--; ) {
      const w = a[T], {
        name: E,
        namespaceURI: D,
        value: W
      } = w, nt = A(E), Kt = W;
      let y = E === "value" ? Kt : kn(Kt);
      if (l.attrName = nt, l.attrValue = y, l.keepAttr = !0, l.forceKeepAttr = void 0, $(C.uponSanitizeAttribute, o, l), y = l.attrValue, Se && (nt === "id" || nt === "name") && (X(E, o), y = Sn + y), bt && M(/((--!?|])>)|<\/(style|title|textarea)/i, y)) {
        X(E, o);
        continue;
      }
      if (nt === "attributename" && Qt(y, "href")) {
        X(E, o);
        continue;
      }
      if (l.forceKeepAttr)
        continue;
      if (!l.keepAttr) {
        X(E, o);
        continue;
      }
      if (!_e && M(/\/>/i, y)) {
        X(E, o);
        continue;
      }
      Z && Mt([kt, Ft, Ut], (Fe) => {
        y = ut(y, Fe, " ");
      });
      const ke = A(o.nodeName);
      if (!Pe(ke, nt, y)) {
        X(E, o);
        continue;
      }
      if (O && typeof H == "object" && typeof H.getAttributeType == "function" && !D)
        switch (H.getAttributeType(ke, nt)) {
          case "TrustedHTML": {
            y = O.createHTML(y);
            break;
          }
          case "TrustedScriptURL": {
            y = O.createScriptURL(y);
            break;
          }
        }
      if (y !== Kt)
        try {
          D ? o.setAttributeNS(D, E, y) : o.setAttribute(E, y), qt(o) ? v(o) : $e(t.removed);
        } catch {
          X(E, o);
        }
    }
    $(C.afterSanitizeAttributes, o, null);
  }, Ln = function f(o) {
    let a = null;
    const l = Ne(o);
    for ($(C.beforeSanitizeShadowDOM, o, null); a = l.nextNode(); )
      $(C.uponSanitizeShadowNode, a, null), Ie(a), ve(a), a.content instanceof r && f(a.content);
    $(C.afterSanitizeShadowDOM, o, null);
  };
  return t.sanitize = function(f) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, l = null, T = null, w = null;
    if (Yt = !f, Yt && (f = "<!-->"), typeof f != "string" && !De(f))
      if (typeof f.toString == "function") {
        if (f = f.toString(), typeof f != "string")
          throw pt("dirty is not a string, aborting");
      } else
        throw pt("toString is not a function");
    if (!t.isSupported)
      return f;
    if ($t || Xt(o), t.removed = [], typeof f == "string" && (ct = !1), ct) {
      if (f.nodeName) {
        const W = A(f.nodeName);
        if (!_[W] || at[W])
          throw pt("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (f instanceof u)
      a = Le("<!---->"), l = a.ownerDocument.importNode(f, !0), l.nodeType === mt.element && l.nodeName === "BODY" || l.nodeName === "HTML" ? a = l : a.appendChild(l);
    else {
      if (!J && !Z && !V && // eslint-disable-next-line unicorn/prefer-includes
      f.indexOf("<") === -1)
        return O && yt ? O.createHTML(f) : f;
      if (a = Le(f), !a)
        return J ? null : yt ? rt : "";
    }
    a && Wt && v(a.firstChild);
    const E = Ne(ct ? f : a);
    for (; T = E.nextNode(); )
      Ie(T), ve(T), T.content instanceof r && Ln(T.content);
    if (ct)
      return f;
    if (J) {
      if (St)
        for (w = dn.call(a.ownerDocument); a.firstChild; )
          w.appendChild(a.firstChild);
      else
        w = a;
      return (S.shadowroot || S.shadowrootmode) && (w = gn.call(n, w, !0)), w;
    }
    let D = V ? a.outerHTML : a.innerHTML;
    return V && _["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && M(Je, a.ownerDocument.doctype.name) && (D = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + D), Z && Mt([kt, Ft, Ut], (W) => {
      D = ut(D, W, " ");
    }), O && yt ? O.createHTML(D) : D;
  }, t.setConfig = function() {
    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Xt(f), $t = !0;
  }, t.clearConfig = function() {
    et = null, $t = !1;
  }, t.isValidAttribute = function(f, o, a) {
    et || Xt({});
    const l = A(f), T = A(o);
    return Pe(l, T, a);
  }, t.addHook = function(f, o) {
    typeof o == "function" && ft(C[f], o);
  }, t.removeHook = function(f, o) {
    if (o !== void 0) {
      const a = Pn(C[f], o);
      return a === -1 ? void 0 : xn(C[f], a, 1)[0];
    }
    return $e(C[f]);
  }, t.removeHooks = function(f) {
    C[f] = [];
  }, t.removeAllHooks = function() {
    C = Ve();
  }, t;
}
var tn = Qe();
function en(i, t, e = "") {
  const n = /* @__PURE__ */ new WeakMap(), s = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(r, c) {
      const u = Reflect.get(r, c);
      if (u === null || typeof u != "object") return u;
      const p = n.get(u);
      if (p) return p;
      const h = e ? `${e}.${c}` : c, m = en(u, t, h);
      return n.set(u, m), m;
    },
    // Intercept property writes.
    set(r, c, u) {
      const p = Reflect.get(r, c);
      if (p !== u) {
        Reflect.set(r, c, u);
        const h = e ? `${e}.${c}` : c;
        t(h, p, u);
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
const Dt = typeof window < "u" && typeof window.document < "u";
let Xe = class extends Error {
};
var q, Pt, F, Et, At, Y, xt, on;
const it = class it {
  constructor(t, e, n) {
    j(this, xt);
    j(this, Pt, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    j(this, F, []);
    j(this, Et);
    j(this, At);
    j(this, Y);
    if (!t) throw new Xe("name cannot be empty");
    if (R(it, q).has(t))
      throw new Xe(`WrecState with name "${t}" already exists`);
    if (ot(this, Et, t), ot(this, At, e), ot(this, Y, en({}, He(this, xt, on).bind(this))), e && Dt) {
      const s = sessionStorage.getItem("wrec-state-" + t), r = s ? JSON.parse(s) : void 0;
      r && (n = r);
    }
    if (n)
      for (const [s, r] of Object.entries(n))
        this.addProperty(s, r);
    R(it, q).set(t, this);
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
      for (const [r, c] of Object.entries(e))
        s[r] = c;
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
    return R(this, Pt);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", R(this, Et));
    for (const [t, e] of Object.entries(R(this, Y)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    ot(this, F, R(this, F).filter((e) => e.listenerRef.deref() !== t));
  }
};
q = new WeakMap(), Pt = new WeakMap(), F = new WeakMap(), Et = new WeakMap(), At = new WeakMap(), Y = new WeakMap(), xt = new WeakSet(), on = function(t, e, n) {
  const s = /* @__PURE__ */ new Set();
  for (const r of R(this, F)) {
    const c = r.listenerRef.deref();
    if (!c)
      s.add(r);
    else if (Dt && c instanceof HTMLElement && !c.isConnected)
      s.add(r);
    else {
      const { propertyMap: u } = r, p = Object.keys(u);
      (p.length === 0 || p.includes(t)) && c.changed(
        t,
        u[t],
        n,
        e,
        this
      );
    }
  }
  ot(this, F, R(this, F).filter(
    (r) => !s.has(r)
  ));
}, j(it, q, /* @__PURE__ */ new Map()), Dt && window.addEventListener("beforeunload", () => {
  for (const [t, e] of R(it, q).entries())
    if (R(e, At)) {
      const n = nn(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(n));
    }
});
let ue = it;
Dt && process.env.NODE_ENV === "development" && (window.WrecState = ue);
function qe(i, t) {
  let e = i;
  for (const n of t.split("."))
    e = e[n];
  return e;
}
function Zn(i, t, e) {
  const n = t.split("."), s = n.length - 1;
  let r = i;
  n.forEach((c, u) => {
    u === s ? r[c] = e : r = r[c];
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
class st extends Error {
}
const to = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, sn = "a-zA-Z_$", eo = sn + "0-9", gt = `[${sn}][${eo}]*`, no = /<!--\s*(.*?)\s*-->/, oo = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, se = new RegExp(`^this\\.${gt}$`), ie = new RegExp(`this\\.${gt}(\\.${gt})*`, "g"), rn = new RegExp(`this\\.${gt}(\\.${gt})*`), so = 5;
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
function It(i) {
  const t = [];
  let e = i.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...It(e.shadowRoot)), e.firstElementChild && t.push(...It(e)), e = e.nextElementSibling;
  return t;
}
const dt = (i) => i.substring(so).split(".")[0];
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
function Tt(i) {
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
  if (isNaN(t)) throw new st(`can't convert "${i}" to a number`);
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
      const r = i.getAttribute(t), c = String(e);
      r !== c && (i.setAttribute(n, c), n === "value" && he(i) && (i.value = c));
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
  for (const n of It(i.content)) {
    const { localName: s } = n;
    s.includes("-") && t.add(s);
  }
  function e(n) {
    return new Promise((s, r) => {
      setTimeout(() => {
        const c = `custom element <${n}> not defined`;
        r(new Error(c));
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
  #t = this.constructor;
  // This is a map from expressions to references to them
  // which can be found in element text content,
  // attribute values, and CSS property values.
  // Each component instance needs its own map.
  #n = /* @__PURE__ */ new Map();
  #c = {};
  #s;
  // For components that set `formAssociated` to true,
  // this stores in the initial value of each property
  // in the formAssociatedCallback method
  // so they can be restored in the formResetCallback method.
  #l = {};
  #f = null;
  // This is a map from properties in this web component
  // to corresponding properties in a parent web component.
  // This must be an instance property because
  // each component instance can have its properties mapped
  // to the properties of different parent components.
  // This is used to update a parent property
  // when the corresponding child property value changes.
  #u = /* @__PURE__ */ new Map();
  static define(t) {
    if (this.elementName = t, customElements.get(t))
      throw new st(`custom element ${t} is already defined`);
    customElements.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.attrToPropMap || (t.attrToPropMap = /* @__PURE__ */ new Map()), t.properties || (t.properties = {}), t.propToAttrMap || (t.propToExprsMap = /* @__PURE__ */ new Map()), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, n) {
    t === "disabled" && this.#m();
    const s = U.getPropName(t);
    if (this.#i(s)) {
      const r = this.#_(s, String(n));
      this[s] = r;
      const c = this.#c[s];
      c && this.setFormValue(c, String(r)), this.propertyChangedCallback(s, e, n);
    }
  }
  async #y() {
    const t = this.#t;
    let { template: e } = t;
    if (!e) {
      e = t.template = document.createElement("template");
      let n = `<style>
    :host([hidden]) { display: none; }`;
      t.css && (n += t.css), n += `</style>
`;
      let s = t.html.trim();
      if (!s) throw new st("static property html must be set");
      s.startsWith("<") || (s = `<span><!--${s}--></span>`), e.innerHTML = n + s;
    }
    await lo(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, n) {
    this[e] = n;
  }
  connectedCallback() {
    this.#P(), this.#w(), this.#y().then(() => {
      this.hasAttribute("disabled") && this.#m(), this.#S(this.shadowRoot), this.#d(this.shadowRoot), this.#R();
    });
  }
  #R() {
    const t = this.#t, { properties: e } = t;
    for (const [n, { computed: s }] of Object.entries(e))
      s && (this[n] = this.#o(s));
  }
  #w() {
    const t = this.#t, { observedAttributes: e, properties: n } = t;
    for (const [s, r] of Object.entries(n))
      r.computed || this.#h(s, r, e);
    for (const [s, r] of Object.entries(n))
      r.computed && this.#h(s, r, e);
  }
  #h(t, e, n) {
    const s = U.getAttrName(t), r = this.hasAttribute(s);
    e.required && !r && this.#e(this, t, "is a required attribute");
    let c = e.value;
    this.hasOwnProperty(t) && (c = this[t], delete this[t]);
    const { type: u } = e, p = u === Boolean ? c || r : n.includes(s) && r ? this.#A(t, s) : c || ro(u), h = "#" + t;
    this[h] = p, e.computed && this.#L(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[h];
      },
      set(m) {
        u === Number && typeof m == "string" && (m = re(m));
        const b = this[h];
        if (m === b) return;
        this.#v(t, u, m), this[h] = m;
        const { state: G, stateProp: H } = this.#t.properties[t];
        H && Zn(G, H, m), this.#D(t), this.#N(t, u, m, s), this.#E(t), this.#I(t, m);
        const B = this.#c[t];
        B && this.setFormValue(B, String(m)), this.propertyChangedCallback(t, b, m), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: b,
          value: m
        });
      }
    });
  }
  #m() {
    const t = this.hasAttribute("disabled"), e = It(this.shadowRoot);
    for (const n of e)
      io(n) && (n.disabled = t);
  }
  disconnectedCallback() {
    this.#n.clear(), this.#l.clear(), this.#u.clear();
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
  #O(t) {
    const e = t instanceof U;
    for (const n of t.getAttributeNames()) {
      const s = t.getAttribute(n), r = this.#g(t, s);
      if (r) {
        const c = this[r];
        c === void 0 && this.#a(t, n, r), t[r] = c;
        let [u, p] = n.split(":");
        u === "value" && (p ? (t["on" + p] === void 0 && this.#e(t, n, "refers to an unsupported event name"), t.setAttribute(u, this[r])) : p = "change"), e && t.#u.set(
          U.getPropName(u),
          r
        );
      }
      this.#r(s, t, n);
    }
  }
  #o(t) {
    return new Function("return " + t).call(this);
  }
  #C(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: n } = t, s = n?.cssRules ?? [], r = Array.from(s);
      for (const c of r)
        if (c.constructor === CSSStyleRule) {
          const u = Array.from(c.style);
          for (const p of u)
            if (p.startsWith("--")) {
              const h = c.style.getPropertyValue(p);
              this.#r(h, c, p);
            }
        }
    } else {
      let n = "";
      if (Tt(t)) {
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
        const s = this.#g(t, n);
        s && Tt(t) ? t.textContent = this[s] : this.#r(n, t);
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
      const c = this.getAttribute("name");
      if (c)
        if (this.#i("value"))
          t = `value:${c}`;
        else
          return;
      else
        return;
    }
    const e = {}, n = t.split(",");
    for (const c of n) {
      const [u, p] = c.split(":");
      e[u.trim()] = p.trim();
    }
    this.#c = e, this.#s = new FormData(), this.#f = this.attachInternals(), this.#f.setFormValue(this.#s);
    const s = Object.keys(this.#t.properties), r = this.#l;
    for (const c of s)
      r[c] = this[c];
  }
  formResetCallback() {
    const t = this.#l;
    for (const e of Object.keys(t)) {
      let n = t[e];
      se.test(n) && (n = this.#o(n)), this[e] = n;
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
  #M(t, e, n) {
    if (n.length !== 1) return;
    const [s] = n;
    if (!se.test(s)) return;
    const r = he(t) || Tt(t);
    let [c, u] = (e ?? "").split(":");
    if (!(r && c === "value" || Tt(t))) return;
    u ? t["on" + u] === void 0 && this.#e(t, e, "refers to an unsupported event name") : u = "change";
    const h = dt(s);
    t.addEventListener(u, (m) => {
      const { target: b } = m;
      if (!b) return;
      const G = b.value, { type: H } = this.#t.properties[h];
      this[h] = H === Number ? re(G) : G, this.#E(h);
    });
  }
  #i(t) {
    return !!this.#t.properties[t];
  }
  #d(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e)
      this.#O(n), n.firstElementChild || this.#C(n);
  }
  // formAssociated is only needed when the component is inside a form.
  #T() {
    if (this.#t.formAssociated || this.closest("form") === null) return;
    const t = this.#t.name;
    throw new st(
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
  #g(t, e) {
    if (!e || !se.test(e)) return;
    const n = dt(e);
    return this[n] === void 0 && this.#a(t, "", n), n;
  }
  #E(t) {
    const s = this.#t.propToExprsMap.get(t) || [];
    for (const r of s) {
      let c = this.#o(r);
      const u = this.#n.get(r) ?? [];
      for (const p of u)
        if (p instanceof HTMLElement)
          this.#b(p, c);
        else if (!(p instanceof CSSStyleRule)) {
          const { element: h, attrName: m } = p;
          h instanceof CSSStyleRule ? h.style.setProperty(m, c) : ae(h, m, c);
        }
    }
  }
  #L(t, e) {
    const { computed: n, uses: s } = e, r = this.#t.propToComputedMap;
    function c(p, h) {
      let m = r.get(p);
      m || (m = [], r.set(p, m)), m.push([t, h]);
    }
    const u = n.match(ie) || [];
    for (const p of u) {
      const h = dt(p);
      this[h] === void 0 && this.#a(null, t, h), typeof this[h] != "function" && c(h, n);
    }
    if (s)
      for (const p of s.split(","))
        c(p, n);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #r(t, e, n = void 0) {
    if (!t) return;
    const s = this.#p(e, n, t);
    if (!s) {
      const p = t.replaceAll("this..", "this.");
      n ? ae(e, n, p) : "textContent" in e && (e.textContent = p);
      return;
    }
    const r = this.#t;
    s.forEach((p) => {
      const h = dt(p);
      if (typeof this[h] == "function") return;
      const m = r.propToExprsMap;
      let b = m.get(h);
      b || (b = [], m.set(h, b)), b.includes(t) || b.push(t);
    });
    for (const [p, h] of this.#n.entries())
      for (const m of h) {
        const b = m instanceof HTMLElement || m instanceof CSSStyleRule ? m : m.element;
        b instanceof CSSStyleRule || b.isConnected || this.#n.set(
          p,
          h.filter((G) => G !== m)
        );
      }
    let c = this.#n.get(t);
    c || (c = [], this.#n.set(t, c)), c.push(n ? { element: e, attrName: n } : e), e instanceof HTMLElement && this.#M(e, n, s);
    const u = this.#o(t);
    n ? ae(e, n, u) : this.#b(e, u);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#s || !pe(e) || (this.#s.set(t, e), this.#f?.setFormValue(this.#s));
  }
  #e(t, e, n) {
    const s = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new st(
      `component ${this.#t.elementName}` + (t ? `, element "${s}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${n}`
    );
  }
  #a(t, e, n) {
    this.#e(t, e, `refers to missing property "${n}"`);
  }
  #A(t, e) {
    return this.#_(t, this.getAttribute(e));
  }
  #_(t, e) {
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
  // Updates the matching attribute for a property if there is one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #N(t, e, n, s) {
    if (pe(n) && this.hasAttribute(s)) {
      const r = e === Boolean ? this.hasAttribute(s) : this.#A(t, s);
      n !== r && ln(this, t, n);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #D(t) {
    const n = this.#t.propToComputedMap.get(t) || [];
    for (const [s, r] of n)
      this[s] = this.#o(r);
  }
  #b(t, e) {
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
    if (t instanceof HTMLElement && Tt(t))
      t.value = r;
    else if (n && s === "string" && r.trim().startsWith("<")) {
      const c = co(r);
      t.replaceChildren(...c), this.#S(t), this.#d(t);
    } else n && (t.textContent = r);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #I(t, e) {
    const n = this.#u.get(t);
    if (!n) return;
    const s = this.getRootNode();
    if (!(s instanceof ShadowRoot)) return;
    const { host: r } = s;
    if (!r) return;
    const c = r;
    c[n] = e;
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
    this.#x(t, e);
    for (const [n, s] of Object.entries(e))
      if (this.#i(s)) {
        const r = qe(t, n);
        r !== void 0 && (this[s] = r);
        const c = this.#t.properties[s];
        c.state = t, c.stateProp = n;
      }
    t.addListener(this, e);
  }
  #P() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!Jn.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#T();
          continue;
        }
        if (!t.has(U.getPropName(e))) {
          if (e === "name") {
            this.#T();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #p(t, e, n) {
    const s = n.match(ie);
    if (s)
      return s.forEach((r) => {
        const c = dt(r);
        this[c] === void 0 && this.#a(t, e, c);
      }), s;
  }
  #x(t, e) {
    for (const [n, s] of Object.entries(e)) {
      let r = qe(t, n);
      if (r === void 0)
        throw new st(`invalid state path "${n}"`);
      r = this[s], this.#i(s) || this.#e(
        null,
        s,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #v(t, e, n) {
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
  #S(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e) {
      const s = [];
      for (const r of Array.from(n.attributes)) {
        const c = r.name;
        if (c.startsWith("on")) {
          let u = c.slice(2);
          u = u[0].toLowerCase() + u.slice(1).toLowerCase();
          const p = r.value;
          this.#p(n, c, p);
          let h;
          typeof this[p] == "function" ? h = (m) => this[p](m) : (this.#p(n, c, p), h = () => this.#o(p)), n.addEventListener(u, h), s.push(c);
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
        const c = `--${r}: ${s};
      ${r}: var(--${r})`;
        e = cn(e, n.index, n[0].length, c);
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
      const r = `<!-- ${s.trim()} -->`, c = n.index + n[0].indexOf(">") + 1;
      e = cn(e, c, s.length, r);
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

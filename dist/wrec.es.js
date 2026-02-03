var Ue = (i) => {
  throw TypeError(i);
};
var Zt = (i, t, e) => t.has(i) || Ue("Cannot " + e);
var R = (i, t, e) => (Zt(i, t, "read from private field"), e ? e.call(i) : t.get(i)), j = (i, t, e) => t.has(i) ? Ue("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), ot = (i, t, e, n) => (Zt(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e), He = (i, t, e) => (Zt(i, t, "access private method"), e);
const {
  entries: Ke,
  setPrototypeOf: ze,
  isFrozen: Dn,
  getPrototypeOf: In,
  getOwnPropertyDescriptor: vn
} = Object;
let {
  freeze: L,
  seal: v,
  create: ce
} = Object, {
  apply: le,
  construct: fe
} = typeof Reflect < "u" && Reflect;
L || (L = function(t) {
  return t;
});
v || (v = function(t) {
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
const Ct = M(Array.prototype.forEach), xn = M(Array.prototype.lastIndexOf), $e = M(Array.prototype.pop), lt = M(Array.prototype.push), Pn = M(Array.prototype.splice), Lt = M(String.prototype.toLowerCase), Jt = M(String.prototype.toString), Qt = M(String.prototype.match), ft = M(String.prototype.replace), kn = M(String.prototype.indexOf), Fn = M(String.prototype.trim), x = M(Object.prototype.hasOwnProperty), N = M(RegExp.prototype.test), ut = Un(TypeError);
function M(i) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++)
      n[s - 1] = arguments[s];
    return le(i, t, n);
  };
}
function Un(i) {
  return function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return fe(i, e);
  };
}
function d(i, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Lt;
  ze && ze(i, null);
  let n = t.length;
  for (; n--; ) {
    let s = t[n];
    if (typeof s == "string") {
      const r = e(s);
      r !== s && (Dn(t) || (t[n] = r), s = r);
    }
    i[s] = !0;
  }
  return i;
}
function Hn(i) {
  for (let t = 0; t < i.length; t++)
    x(i, t) || (i[t] = null);
  return i;
}
function F(i) {
  const t = ce(null);
  for (const [e, n] of Ke(i))
    x(i, e) && (Array.isArray(n) ? t[e] = Hn(n) : n && typeof n == "object" && n.constructor === Object ? t[e] = F(n) : t[e] = n);
  return t;
}
function pt(i, t) {
  for (; i !== null; ) {
    const n = vn(i, t);
    if (n) {
      if (n.get)
        return M(n.get);
      if (typeof n.value == "function")
        return M(n.value);
    }
    i = In(i);
  }
  function e() {
    return null;
  }
  return e;
}
const Ge = L(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), te = L(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ee = L(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), zn = L(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), ne = L(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), $n = L(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), We = L(["#text"]), Be = L(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), oe = L(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), je = L(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), wt = L(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Gn = v(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Wn = v(/<%[\w\W]*|[\w\W]*%>/gm), Bn = v(/\$\{[\w\W]*/gm), jn = v(/^data-[\-\w.\u00B7-\uFFFF]+$/), Yn = v(/^aria-[\-\w]+$/), Ze = v(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Vn = v(/^(?:\w+script|data):/i), Xn = v(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Je = v(/^html$/i), qn = v(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Ye = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Yn,
  ATTR_WHITESPACE: Xn,
  CUSTOM_ELEMENT: qn,
  DATA_ATTR: jn,
  DOCTYPE_NAME: Je,
  ERB_EXPR: Wn,
  IS_ALLOWED_URI: Ze,
  IS_SCRIPT_OR_DATA: Vn,
  MUSTACHE_EXPR: Gn,
  TMPLIT_EXPR: Bn
});
const mt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Kn = function() {
  return typeof window > "u" ? null : window;
}, Zn = function(t, e) {
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
  let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Kn();
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
    NodeFilter: m,
    NamedNodeMap: h = i.NamedNodeMap || i.MozNamedAttrMap,
    HTMLFormElement: b,
    DOMParser: W,
    trustedTypes: H
  } = i, B = p.prototype, un = pt(B, "cloneNode"), pn = pt(B, "remove"), mn = pt(B, "nextSibling"), hn = pt(B, "childNodes"), Et = pt(B, "parentNode");
  if (typeof c == "function") {
    const f = e.createElement("template");
    f.content && f.content.ownerDocument && (e = f.content.ownerDocument);
  }
  let C, it = "";
  const {
    implementation: Pt,
    createNodeIterator: dn,
    createDocumentFragment: Tn,
    getElementsByTagName: gn
  } = e, {
    importNode: En
  } = n;
  let w = Ve();
  t.isSupported = typeof Ke == "function" && typeof Et == "function" && Pt && Pt.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: kt,
    ERB_EXPR: Ft,
    TMPLIT_EXPR: Ut,
    DATA_ATTR: An,
    ARIA_ATTR: _n,
    IS_SCRIPT_OR_DATA: bn,
    ATTR_WHITESPACE: he,
    CUSTOM_ELEMENT: Sn
  } = Ye;
  let {
    IS_ALLOWED_URI: de
  } = Ye, _ = null;
  const Te = d({}, [...Ge, ...te, ...ee, ...ne, ...We]);
  let S = null;
  const ge = d({}, [...Be, ...oe, ...je, ...wt]);
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
  let Ee = !0, zt = !0, Ae = !1, _e = !0, Z = !1, At = !0, V = !1, $t = !1, Gt = !1, J = !1, _t = !1, bt = !1, be = !0, Se = !1;
  const yn = "user-content-";
  let Wt = !0, at = !1, Q = {}, P = null;
  const Bt = d({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let ye = null;
  const Re = d({}, ["audio", "video", "img", "source", "image", "track"]);
  let jt = null;
  const Oe = d({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), St = "http://www.w3.org/1998/Math/MathML", yt = "http://www.w3.org/2000/svg", z = "http://www.w3.org/1999/xhtml";
  let tt = z, Yt = !1, Vt = null;
  const Rn = d({}, [St, yt, z], Jt);
  let Rt = d({}, ["mi", "mo", "mn", "ms", "mtext"]), Ot = d({}, ["annotation-xml"]);
  const On = d({}, ["title", "style", "font", "a", "script"]);
  let ct = null;
  const Cn = ["application/xhtml+xml", "text/html"], wn = "text/html";
  let A = null, et = null;
  const Nn = e.createElement("form"), Ce = function(o) {
    return o instanceof RegExp || o instanceof Function;
  }, Xt = function() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(et && et === o)) {
      if ((!o || typeof o != "object") && (o = {}), o = F(o), ct = // eslint-disable-next-line unicorn/prefer-includes
      Cn.indexOf(o.PARSER_MEDIA_TYPE) === -1 ? wn : o.PARSER_MEDIA_TYPE, A = ct === "application/xhtml+xml" ? Jt : Lt, _ = x(o, "ALLOWED_TAGS") ? d({}, o.ALLOWED_TAGS, A) : Te, S = x(o, "ALLOWED_ATTR") ? d({}, o.ALLOWED_ATTR, A) : ge, Vt = x(o, "ALLOWED_NAMESPACES") ? d({}, o.ALLOWED_NAMESPACES, Jt) : Rn, jt = x(o, "ADD_URI_SAFE_ATTR") ? d(F(Oe), o.ADD_URI_SAFE_ATTR, A) : Oe, ye = x(o, "ADD_DATA_URI_TAGS") ? d(F(Re), o.ADD_DATA_URI_TAGS, A) : Re, P = x(o, "FORBID_CONTENTS") ? d({}, o.FORBID_CONTENTS, A) : Bt, rt = x(o, "FORBID_TAGS") ? d({}, o.FORBID_TAGS, A) : F({}), Ht = x(o, "FORBID_ATTR") ? d({}, o.FORBID_ATTR, A) : F({}), Q = x(o, "USE_PROFILES") ? o.USE_PROFILES : !1, Ee = o.ALLOW_ARIA_ATTR !== !1, zt = o.ALLOW_DATA_ATTR !== !1, Ae = o.ALLOW_UNKNOWN_PROTOCOLS || !1, _e = o.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Z = o.SAFE_FOR_TEMPLATES || !1, At = o.SAFE_FOR_XML !== !1, V = o.WHOLE_DOCUMENT || !1, J = o.RETURN_DOM || !1, _t = o.RETURN_DOM_FRAGMENT || !1, bt = o.RETURN_TRUSTED_TYPE || !1, Gt = o.FORCE_BODY || !1, be = o.SANITIZE_DOM !== !1, Se = o.SANITIZE_NAMED_PROPS || !1, Wt = o.KEEP_CONTENT !== !1, at = o.IN_PLACE || !1, de = o.ALLOWED_URI_REGEXP || Ze, tt = o.NAMESPACE || z, Rt = o.MATHML_TEXT_INTEGRATION_POINTS || Rt, Ot = o.HTML_INTEGRATION_POINTS || Ot, g = o.CUSTOM_ELEMENT_HANDLING || {}, o.CUSTOM_ELEMENT_HANDLING && Ce(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (g.tagNameCheck = o.CUSTOM_ELEMENT_HANDLING.tagNameCheck), o.CUSTOM_ELEMENT_HANDLING && Ce(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (g.attributeNameCheck = o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), o.CUSTOM_ELEMENT_HANDLING && typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (g.allowCustomizedBuiltInElements = o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Z && (zt = !1), _t && (J = !0), Q && (_ = d({}, We), S = [], Q.html === !0 && (d(_, Ge), d(S, Be)), Q.svg === !0 && (d(_, te), d(S, oe), d(S, wt)), Q.svgFilters === !0 && (d(_, ee), d(S, oe), d(S, wt)), Q.mathMl === !0 && (d(_, ne), d(S, je), d(S, wt))), o.ADD_TAGS && (typeof o.ADD_TAGS == "function" ? K.tagCheck = o.ADD_TAGS : (_ === Te && (_ = F(_)), d(_, o.ADD_TAGS, A))), o.ADD_ATTR && (typeof o.ADD_ATTR == "function" ? K.attributeCheck = o.ADD_ATTR : (S === ge && (S = F(S)), d(S, o.ADD_ATTR, A))), o.ADD_URI_SAFE_ATTR && d(jt, o.ADD_URI_SAFE_ATTR, A), o.FORBID_CONTENTS && (P === Bt && (P = F(P)), d(P, o.FORBID_CONTENTS, A)), o.ADD_FORBID_CONTENTS && (P === Bt && (P = F(P)), d(P, o.ADD_FORBID_CONTENTS, A)), Wt && (_["#text"] = !0), V && d(_, ["html", "head", "body"]), _.table && (d(_, ["tbody"]), delete rt.tbody), o.TRUSTED_TYPES_POLICY) {
        if (typeof o.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ut('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof o.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ut('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        C = o.TRUSTED_TYPES_POLICY, it = C.createHTML("");
      } else
        C === void 0 && (C = Zn(H, s)), C !== null && typeof it == "string" && (it = C.createHTML(""));
      L && L(o), et = o;
    }
  }, we = d({}, [...te, ...ee, ...zn]), Ne = d({}, [...ne, ...$n]), Ln = function(o) {
    let a = Et(o);
    (!a || !a.tagName) && (a = {
      namespaceURI: tt,
      tagName: "template"
    });
    const l = Lt(o.tagName), T = Lt(a.tagName);
    return Vt[o.namespaceURI] ? o.namespaceURI === yt ? a.namespaceURI === z ? l === "svg" : a.namespaceURI === St ? l === "svg" && (T === "annotation-xml" || Rt[T]) : !!we[l] : o.namespaceURI === St ? a.namespaceURI === z ? l === "math" : a.namespaceURI === yt ? l === "math" && Ot[T] : !!Ne[l] : o.namespaceURI === z ? a.namespaceURI === yt && !Ot[T] || a.namespaceURI === St && !Rt[T] ? !1 : !Ne[l] && (On[l] || !we[l]) : !!(ct === "application/xhtml+xml" && Vt[o.namespaceURI]) : !1;
  }, k = function(o) {
    lt(t.removed, {
      element: o
    });
    try {
      Et(o).removeChild(o);
    } catch {
      pn(o);
    }
  }, X = function(o, a) {
    try {
      lt(t.removed, {
        attribute: a.getAttributeNode(o),
        from: a
      });
    } catch {
      lt(t.removed, {
        attribute: null,
        from: a
      });
    }
    if (a.removeAttribute(o), o === "is")
      if (J || _t)
        try {
          k(a);
        } catch {
        }
      else
        try {
          a.setAttribute(o, "");
        } catch {
        }
  }, Le = function(o) {
    let a = null, l = null;
    if (Gt)
      o = "<remove></remove>" + o;
    else {
      const E = Qt(o, /^[\r\n\t ]+/);
      l = E && E[0];
    }
    ct === "application/xhtml+xml" && tt === z && (o = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + o + "</body></html>");
    const T = C ? C.createHTML(o) : o;
    if (tt === z)
      try {
        a = new W().parseFromString(T, ct);
      } catch {
      }
    if (!a || !a.documentElement) {
      a = Pt.createDocument(tt, "template", null);
      try {
        a.documentElement.innerHTML = Yt ? it : T;
      } catch {
      }
    }
    const O = a.body || a.documentElement;
    return o && l && O.insertBefore(e.createTextNode(l), O.childNodes[0] || null), tt === z ? gn.call(a, V ? "html" : "body")[0] : V ? a.documentElement : O;
  }, Me = function(o) {
    return dn.call(
      o.ownerDocument || o,
      o,
      // eslint-disable-next-line no-bitwise
      m.SHOW_ELEMENT | m.SHOW_COMMENT | m.SHOW_TEXT | m.SHOW_PROCESSING_INSTRUCTION | m.SHOW_CDATA_SECTION,
      null
    );
  }, qt = function(o) {
    return o instanceof b && (typeof o.nodeName != "string" || typeof o.textContent != "string" || typeof o.removeChild != "function" || !(o.attributes instanceof h) || typeof o.removeAttribute != "function" || typeof o.setAttribute != "function" || typeof o.namespaceURI != "string" || typeof o.insertBefore != "function" || typeof o.hasChildNodes != "function");
  }, De = function(o) {
    return typeof u == "function" && o instanceof u;
  };
  function $(f, o, a) {
    Ct(f, (l) => {
      l.call(t, o, a, et);
    });
  }
  const Ie = function(o) {
    let a = null;
    if ($(w.beforeSanitizeElements, o, null), qt(o))
      return k(o), !0;
    const l = A(o.nodeName);
    if ($(w.uponSanitizeElement, o, {
      tagName: l,
      allowedTags: _
    }), At && o.hasChildNodes() && !De(o.firstElementChild) && N(/<[/\w!]/g, o.innerHTML) && N(/<[/\w!]/g, o.textContent) || o.nodeType === mt.progressingInstruction || At && o.nodeType === mt.comment && N(/<[/\w]/g, o.data))
      return k(o), !0;
    if (!(K.tagCheck instanceof Function && K.tagCheck(l)) && (!_[l] || rt[l])) {
      if (!rt[l] && xe(l) && (g.tagNameCheck instanceof RegExp && N(g.tagNameCheck, l) || g.tagNameCheck instanceof Function && g.tagNameCheck(l)))
        return !1;
      if (Wt && !P[l]) {
        const T = Et(o) || o.parentNode, O = hn(o) || o.childNodes;
        if (O && T) {
          const E = O.length;
          for (let D = E - 1; D >= 0; --D) {
            const G = un(O[D], !0);
            G.__removalCount = (o.__removalCount || 0) + 1, T.insertBefore(G, mn(o));
          }
        }
      }
      return k(o), !0;
    }
    return o instanceof p && !Ln(o) || (l === "noscript" || l === "noembed" || l === "noframes") && N(/<\/no(script|embed|frames)/i, o.innerHTML) ? (k(o), !0) : (Z && o.nodeType === mt.text && (a = o.textContent, Ct([kt, Ft, Ut], (T) => {
      a = ft(a, T, " ");
    }), o.textContent !== a && (lt(t.removed, {
      element: o.cloneNode()
    }), o.textContent = a)), $(w.afterSanitizeElements, o, null), !1);
  }, ve = function(o, a, l) {
    if (be && (a === "id" || a === "name") && (l in e || l in Nn))
      return !1;
    if (!(zt && !Ht[a] && N(An, a))) {
      if (!(Ee && N(_n, a))) {
        if (!(K.attributeCheck instanceof Function && K.attributeCheck(a, o))) {
          if (!S[a] || Ht[a]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(xe(o) && (g.tagNameCheck instanceof RegExp && N(g.tagNameCheck, o) || g.tagNameCheck instanceof Function && g.tagNameCheck(o)) && (g.attributeNameCheck instanceof RegExp && N(g.attributeNameCheck, a) || g.attributeNameCheck instanceof Function && g.attributeNameCheck(a, o)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              a === "is" && g.allowCustomizedBuiltInElements && (g.tagNameCheck instanceof RegExp && N(g.tagNameCheck, l) || g.tagNameCheck instanceof Function && g.tagNameCheck(l)))
            ) return !1;
          } else if (!jt[a]) {
            if (!N(de, ft(l, he, ""))) {
              if (!((a === "src" || a === "xlink:href" || a === "href") && o !== "script" && kn(l, "data:") === 0 && ye[o])) {
                if (!(Ae && !N(bn, ft(l, he, "")))) {
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
    return o !== "annotation-xml" && Qt(o, Sn);
  }, Pe = function(o) {
    $(w.beforeSanitizeAttributes, o, null);
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
      const O = a[T], {
        name: E,
        namespaceURI: D,
        value: G
      } = O, nt = A(E), Kt = G;
      let y = E === "value" ? Kt : Fn(Kt);
      if (l.attrName = nt, l.attrValue = y, l.keepAttr = !0, l.forceKeepAttr = void 0, $(w.uponSanitizeAttribute, o, l), y = l.attrValue, Se && (nt === "id" || nt === "name") && (X(E, o), y = yn + y), At && N(/((--!?|])>)|<\/(style|title|textarea)/i, y)) {
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
      if (!_e && N(/\/>/i, y)) {
        X(E, o);
        continue;
      }
      Z && Ct([kt, Ft, Ut], (Fe) => {
        y = ft(y, Fe, " ");
      });
      const ke = A(o.nodeName);
      if (!ve(ke, nt, y)) {
        X(E, o);
        continue;
      }
      if (C && typeof H == "object" && typeof H.getAttributeType == "function" && !D)
        switch (H.getAttributeType(ke, nt)) {
          case "TrustedHTML": {
            y = C.createHTML(y);
            break;
          }
          case "TrustedScriptURL": {
            y = C.createScriptURL(y);
            break;
          }
        }
      if (y !== Kt)
        try {
          D ? o.setAttributeNS(D, E, y) : o.setAttribute(E, y), qt(o) ? k(o) : $e(t.removed);
        } catch {
          X(E, o);
        }
    }
    $(w.afterSanitizeAttributes, o, null);
  }, Mn = function f(o) {
    let a = null;
    const l = Me(o);
    for ($(w.beforeSanitizeShadowDOM, o, null); a = l.nextNode(); )
      $(w.uponSanitizeShadowNode, a, null), Ie(a), Pe(a), a.content instanceof r && f(a.content);
    $(w.afterSanitizeShadowDOM, o, null);
  };
  return t.sanitize = function(f) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, l = null, T = null, O = null;
    if (Yt = !f, Yt && (f = "<!-->"), typeof f != "string" && !De(f))
      if (typeof f.toString == "function") {
        if (f = f.toString(), typeof f != "string")
          throw ut("dirty is not a string, aborting");
      } else
        throw ut("toString is not a function");
    if (!t.isSupported)
      return f;
    if ($t || Xt(o), t.removed = [], typeof f == "string" && (at = !1), at) {
      if (f.nodeName) {
        const G = A(f.nodeName);
        if (!_[G] || rt[G])
          throw ut("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (f instanceof u)
      a = Le("<!---->"), l = a.ownerDocument.importNode(f, !0), l.nodeType === mt.element && l.nodeName === "BODY" || l.nodeName === "HTML" ? a = l : a.appendChild(l);
    else {
      if (!J && !Z && !V && // eslint-disable-next-line unicorn/prefer-includes
      f.indexOf("<") === -1)
        return C && bt ? C.createHTML(f) : f;
      if (a = Le(f), !a)
        return J ? null : bt ? it : "";
    }
    a && Gt && k(a.firstChild);
    const E = Me(at ? f : a);
    for (; T = E.nextNode(); )
      Ie(T), Pe(T), T.content instanceof r && Mn(T.content);
    if (at)
      return f;
    if (J) {
      if (_t)
        for (O = Tn.call(a.ownerDocument); a.firstChild; )
          O.appendChild(a.firstChild);
      else
        O = a;
      return (S.shadowroot || S.shadowrootmode) && (O = En.call(n, O, !0)), O;
    }
    let D = V ? a.outerHTML : a.innerHTML;
    return V && _["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && N(Je, a.ownerDocument.doctype.name) && (D = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + D), Z && Ct([kt, Ft, Ut], (G) => {
      D = ft(D, G, " ");
    }), C && bt ? C.createHTML(D) : D;
  }, t.setConfig = function() {
    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Xt(f), $t = !0;
  }, t.clearConfig = function() {
    et = null, $t = !1;
  }, t.isValidAttribute = function(f, o, a) {
    et || Xt({});
    const l = A(f), T = A(o);
    return ve(l, T, a);
  }, t.addHook = function(f, o) {
    typeof o == "function" && lt(w[f], o);
  }, t.removeHook = function(f, o) {
    if (o !== void 0) {
      const a = xn(w[f], o);
      return a === -1 ? void 0 : Pn(w[f], a, 1)[0];
    }
    return $e(w[f]);
  }, t.removeHooks = function(f) {
    w[f] = [];
  }, t.removeAllHooks = function() {
    w = Ve();
  }, t;
}
var tn = Qe();
function Xe(i, t) {
  let e = i;
  for (const n of t.split("."))
    e = e[n];
  return e;
}
function Jn(i, t, e) {
  const n = t.split("."), s = n.length - 1;
  let r = i;
  n.forEach((c, u) => {
    u === s ? r[c] = e : r = r[c];
  });
}
function en(i, t, e = "") {
  const n = /* @__PURE__ */ new WeakMap(), s = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(r, c) {
      const u = Reflect.get(r, c);
      if (u === null || typeof u != "object") return u;
      const p = n.get(u);
      if (p) return p;
      const m = e ? `${e}.${c}` : c, h = en(u, t, m);
      return n.set(u, h), h;
    },
    // Intercept property writes.
    set(r, c, u) {
      const p = Reflect.get(r, c);
      if (p !== u) {
        Reflect.set(r, c, u);
        const m = e ? `${e}.${c}` : c;
        t(m, p, u);
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
const Mt = typeof window < "u" && typeof window.document < "u";
let qe = class extends Error {
};
var q, vt, U, Tt, gt, Y, xt, on;
const st = class st {
  constructor(t, e, n) {
    j(this, xt);
    j(this, vt, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    j(this, U, []);
    j(this, Tt);
    j(this, gt);
    j(this, Y);
    if (!t) throw new qe("name cannot be empty");
    if (R(st, q).has(t))
      throw new qe(`WrecState with name "${t}" already exists`);
    if (ot(this, Tt, t), ot(this, gt, e), ot(this, Y, en({}, He(this, xt, on).bind(this))), e && Mt) {
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
    const n = R(this, U).find(
      (s) => s.listenerRef.deref() === t
    );
    if (n) {
      const { propertyMap: s } = n;
      for (const [r, c] of Object.entries(e))
        s[r] = c;
    } else
      R(this, U).push({
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
    console.log("WrecState:", R(this, Tt));
    for (const [t, e] of Object.entries(R(this, Y)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    ot(this, U, R(this, U).filter((e) => e.listenerRef.deref() !== t));
  }
};
q = new WeakMap(), vt = new WeakMap(), U = new WeakMap(), Tt = new WeakMap(), gt = new WeakMap(), Y = new WeakMap(), xt = new WeakSet(), on = function(t, e, n) {
  const s = /* @__PURE__ */ new Set();
  for (const r of R(this, U)) {
    const c = r.listenerRef.deref();
    if (!c)
      s.add(r);
    else if (Mt && c instanceof HTMLElement && !c.isConnected)
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
  ot(this, U, R(this, U).filter(
    (r) => !s.has(r)
  ));
}, j(st, q, /* @__PURE__ */ new Map()), Mt && window.addEventListener("beforeunload", () => {
  for (const [t, e] of R(st, q).entries())
    if (R(e, gt)) {
      const n = nn(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(n));
    }
});
let ue = st;
Mt && process.env.NODE_ENV === "development" && (window.WrecState = ue);
const Qn = /* @__PURE__ */ new Set([
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
const to = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, sn = "a-zA-Z_$", eo = sn + "0-9", dt = `[${sn}][${eo}]*`, no = /<!--\s*(.*?)\s*-->/, oo = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, se = new RegExp(`^this\\.${dt}$`), ie = new RegExp(`this\\.${dt}(\\.${dt})*`, "g"), rn = new RegExp(`this\\.${dt}(\\.${dt})*`), so = /* @__PURE__ */ new Set(["class", "style"]), an = 5;
function io(i) {
  return i instanceof HTMLButtonElement || i instanceof HTMLFieldSetElement || i instanceof HTMLInputElement || i instanceof HTMLSelectElement || i instanceof HTMLTextAreaElement || i instanceof I;
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
const Nt = (i) => i.substring(an).split(".")[0];
function cn(i, t) {
  let e = i[0];
  return t.forEach((n, s) => {
    e += n + i[s + 1];
  }), e;
}
function pe(i) {
  const t = typeof i;
  return t === "string" || t === "number" || t === "boolean";
}
function ht(i) {
  return i.localName === "textarea";
}
function me(i) {
  const { localName: t } = i;
  return t === "input" || t === "select";
}
const ao = (i) => i.replace(/<!--[\s\S]*?-->/g, "");
function ln(i, t, e, n) {
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
function fn(i, t, e) {
  const [n, s] = t.split(":");
  if (pe(e))
    if (typeof e == "boolean") {
      e ? i.setAttribute(n, n) : i.removeAttribute(n);
      const r = I.getPropName(n);
      i[r] = e;
    } else {
      const r = i.getAttribute(t), c = String(e);
      r !== c && (i.setAttribute(n, c), n === "value" && me(i) && (i.value = c));
    }
  else {
    const r = I.getPropName(t);
    i[r] = e;
  }
}
function ae(i, t, e) {
  const [n, s] = t.split(":");
  i instanceof CSSStyleRule ? i.style.setProperty(n, e) : (fn(i, n, e), n === "value" && me(i) && (i.value = e));
}
function lo(i) {
  const t = /* @__PURE__ */ new Set();
  for (const n of It(i)) {
    const { localName: s } = n;
    s.includes("-") && t.add(s);
  }
  const e = [...t].map((n) => customElements.whenDefined(n));
  return Promise.all(e);
}
class I extends HTMLElement {
  // This is used to lookup the camelCase property name
  // that corresponds to a kebab-case attribute name.
  static #m = /* @__PURE__ */ new Map();
  // This is used to lookup the kebab-case attribute name
  // that corresponds to a camelCase property name.
  static #h = /* @__PURE__ */ new Map();
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
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.properties || (t.properties = {}), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, n) {
    t === "disabled" && this.#d();
    const s = I.getPropName(t);
    if (this.#i(s)) {
      const r = this.#b(s, String(n));
      this[s] = r;
      const c = this.#c[s];
      c && this.setFormValue(c, String(r)), this.propertyChangedCallback(s, e, n);
    }
  }
  async #R() {
    const t = this.#t;
    let { template: e } = t;
    if (!e) {
      e = t.template = document.createElement("template");
      let n = `<style>
    :host([hidden]) { display: none; }`;
      t.css && (n += t.css), n += `</style>
`;
      let s = t.html.trim();
      s.startsWith("<") || (s = `<span><!--${s}--></span>`), e.innerHTML = n + s;
    }
    await lo(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, n) {
    this[e] = n;
  }
  connectedCallback() {
    this.#P(), this.#C(), this.#R().then(() => {
      this.hasAttribute("disabled") && this.#d(), requestAnimationFrame(() => {
        this.#y(this.shadowRoot), this.#T(this.shadowRoot), this.#O();
      });
    });
  }
  #O() {
    const t = this.#t, { properties: e } = t;
    for (const [n, { computed: s }] of Object.entries(e))
      s && (this[n] = this.#o(s));
  }
  #C() {
    const t = this.#t, { observedAttributes: e, properties: n } = t;
    for (const [s, r] of Object.entries(n))
      this.#w(s, r, e);
  }
  #w(t, e, n) {
    const s = I.getAttrName(t), r = this.hasAttribute(s);
    e.required && !r && this.#e(this, t, "is a required attribute");
    let c = e.value;
    this.hasOwnProperty(t) && (c = this[t], delete this[t]);
    const { type: u } = e, p = u === Boolean ? c || r : n.includes(s) && r ? this.#_(t, s) : c || ro(u), m = "#" + t;
    this[m] = p, e.computed && this.#D(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[m];
      },
      set(h) {
        u === Number && typeof h == "string" && (h = re(h));
        const b = this[m];
        if (h === b) return;
        this.#F(t, u, h), this[m] = h;
        const { state: W, stateProp: H } = this.#t.properties[t];
        H && Jn(W, H, h), this.#v(t), this.#I(t, u, h, s), this.#A(t), this.#x(t, h);
        const B = this.#c[t];
        B && this.setFormValue(B, String(h)), this.propertyChangedCallback(t, b, h), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: b,
          value: h
        });
      }
    });
  }
  #d() {
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
  // This inserts a dash before each uppercase letter
  // that is preceded by a lowercase letter or digit.
  static elementName() {
    return this.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }
  #N(t) {
    const e = t instanceof I;
    for (const n of t.getAttributeNames()) {
      const s = t.getAttribute(n), r = this.#E(t, s);
      if (r) {
        const c = this[r];
        c === void 0 && this.#a(t, n, r), t[r] = c;
        let [u, p] = n.split(":");
        u === "value" && (p ? (t["on" + p] === void 0 && this.#e(t, n, "refers to an unsupported event name"), t.setAttribute(u, this[r])) : p = "change"), e && t.#u.set(
          I.getPropName(u),
          r
        );
      }
      this.#r(s, t, n);
    }
  }
  #o(t) {
    const e = new Function("return " + t).call(this);
    return Array.isArray(e) ? e.join("") : e;
  }
  #L(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: n } = t, s = n?.cssRules ?? [], r = Array.from(s);
      for (const c of r)
        if (c.constructor === CSSStyleRule) {
          const u = Array.from(c.style);
          for (const p of u)
            if (p.startsWith("--")) {
              const m = c.style.getPropertyValue(p);
              this.#r(m, c, p);
            }
        }
    } else {
      let n = "";
      if (ht(t)) {
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
        const s = this.#E(t, n);
        s && ht(t) ? t.textContent = this[s] : this.#r(n, t);
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
    let e = I.#h.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), I.#h.set(t, e)), e;
  }
  static getPropName(t) {
    let e = I.#m.get(t);
    return e || (e = t.replace(/-([a-z])/g, (n, s) => s.toUpperCase()), I.#m.set(t, e)), e;
  }
  #M(t, e, n) {
    if (n.length !== 1) return;
    const [s] = n;
    if (!se.test(s)) return;
    const r = me(t) || ht(t);
    let [c, u] = (e ?? "").split(":");
    if (!(r && c === "value" || ht(t))) return;
    u ? t["on" + u] === void 0 && this.#e(t, e, "refers to an unsupported event name") : u = "change";
    const m = Nt(s);
    t.addEventListener(u, (h) => {
      const { target: b } = h;
      if (!b) return;
      const W = b.value, { type: H } = this.#t.properties[m];
      this[m] = H === Number ? re(W) : W, this.#A(m);
    });
  }
  #i(t) {
    return !!this.#t.properties[t];
  }
  #T(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e)
      this.#N(n), n.firstElementChild || this.#L(n);
  }
  // formAssociated is only needed when the component is inside a form.
  #g() {
    if (this.#t.formAssociated || this.closest("form") === null) return;
    const t = this.#t.name;
    throw new Dt(
      `inside form, class ${t} requires "static formAssociated = true;"`
    );
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(I.getAttrName);
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, n) {
  }
  #E(t, e) {
    if (!e || !se.test(e)) return;
    const n = Nt(e);
    return this[n] === void 0 && this.#a(t, "", n), n;
  }
  #A(t) {
    const s = this.#t.propToExprsMap.get(t) || [];
    for (const r of s) {
      let c = this.#o(r);
      const u = this.#n.get(r) ?? [];
      for (const p of u)
        if (p instanceof HTMLElement)
          this.#S(p, c);
        else if (!(p instanceof CSSStyleRule)) {
          const { element: m, attrName: h } = p;
          m instanceof CSSStyleRule ? m.style.setProperty(h, c) : ae(m, h, c);
        }
    }
  }
  static register() {
    const t = this.elementName();
    customElements.get(t) || customElements.define(t, this);
  }
  #D(t, e) {
    const { computed: n, uses: s } = e, r = this.#t.propToComputedMap;
    function c(p, m) {
      let h = r.get(p);
      h || (h = [], r.set(p, h)), h.push([t, m]);
    }
    const u = n.match(ie) || [];
    for (const p of u) {
      const m = p.substring(an);
      this[m] === void 0 && this.#a(null, t, m), typeof this[m] != "function" && c(m, n);
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
      const m = Nt(p);
      if (typeof this[m] == "function") return;
      const h = r.propToExprsMap;
      let b = h.get(m);
      b || (b = [], h.set(m, b)), b.includes(t) || b.push(t);
    });
    for (const [p, m] of this.#n.entries())
      for (const h of m) {
        const b = h instanceof HTMLElement || h instanceof CSSStyleRule ? h : h.element;
        b instanceof CSSStyleRule || b.isConnected || this.#n.set(
          p,
          m.filter((W) => W !== h)
        );
      }
    let c = this.#n.get(t);
    c || (c = [], this.#n.set(t, c)), c.push(n ? { element: e, attrName: n } : e), e instanceof HTMLElement && this.#M(e, n, s);
    const u = this.#o(t);
    n ? ae(e, n, u) : this.#S(e, u);
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
    const s = this.#t, r = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new Dt(
      `component ${s.elementName()}` + (t ? `, element "${r}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${n}`
    );
  }
  #a(t, e, n) {
    this.#e(t, e, `refers to missing property "${n}"`);
  }
  #_(t, e) {
    return this.#b(t, this.getAttribute(e));
  }
  #b(t, e) {
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
  #I(t, e, n, s) {
    if (pe(n) && this.hasAttribute(s)) {
      const r = e === Boolean ? this.hasAttribute(s) : this.#_(t, s);
      n !== r && fn(this, t, n);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #v(t) {
    const n = this.#t.propToComputedMap.get(t) || [];
    for (const [s, r] of n)
      this[s] = this.#o(r);
  }
  #S(t, e) {
    if (e === void 0) return;
    const n = t instanceof HTMLElement, s = typeof e;
    if (s !== "string" && s !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    ), t instanceof HTMLElement && ht(t))
      t.value = e;
    else if (n && s === "string" && e.trim().startsWith("<")) {
      const r = co(e);
      t.replaceChildren(...r), this.#y(t), this.#T(t);
    } else n && (t.textContent = e);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #x(t, e) {
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
    this.#k(t, e);
    for (const [n, s] of Object.entries(e))
      if (this.#i(s)) {
        const r = Xe(t, n);
        r !== void 0 && (this[s] = r);
        const c = this.#t.properties[s];
        c.state = t, c.stateProp = n;
      }
    t.addListener(this, e);
  }
  #P() {
    const t = this.#t, e = new Set(Object.keys(t.properties));
    for (const n of e)
      so.has(n) && this.#e(
        null,
        "",
        `property "${n}" is not allowed because it is a reserved attribute`
      );
    for (const n of this.getAttributeNames())
      if (n !== "class" && n !== "id" && n !== "disabled" && !n.startsWith("on")) {
        if (n === "form-assoc") {
          this.#g();
          continue;
        }
        if (!e.has(I.getPropName(n))) {
          if (n === "name") {
            this.#g();
            continue;
          }
          this.#e(null, n, "is not a supported attribute");
        }
      }
  }
  #p(t, e, n) {
    const s = n.match(ie);
    if (s)
      return s.forEach((r) => {
        const c = Nt(r);
        this[c] === void 0 && this.#a(t, e, c);
      }), s;
  }
  #k(t, e) {
    for (const [n, s] of Object.entries(e)) {
      let r = Xe(t, n);
      if (r === void 0)
        throw new Dt(`invalid state path "${n}"`);
      r = this[s], this.#i(s) || this.#e(
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
  #y(t) {
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
          let m;
          typeof this[p] == "function" ? m = (h) => this[p](h) : (this.#p(n, c, p), m = () => this.#o(p)), n.addEventListener(u, m), s.push(c);
        }
      }
      for (const r of s)
        n.removeAttribute(r);
    }
  }
}
function mo(i, ...t) {
  let e = cn(i, t);
  for (; ; ) {
    const n = to.exec(e);
    if (!n) break;
    const s = n[2];
    if (rn.test(s)) {
      const r = n[1];
      if (!r.startsWith("--")) {
        const c = `--${r}: ${s};
      ${r}: var(--${r})`;
        e = ln(e, n.index, n[0].length, c);
      }
    }
  }
  return e;
}
function ho(i, ...t) {
  let e = cn(i, t);
  for (; ; ) {
    const n = oo.exec(e);
    if (!n || n[1] === "style") break;
    const s = ao(n[2]);
    if (rn.test(s)) {
      const r = `<!-- ${s.trim()} -->`, c = n.index + n[0].indexOf(">") + 1;
      e = ln(e, c, s.length, r);
    }
  }
  return e;
}
export {
  I as Wrec,
  ue as WrecState,
  po as createElement,
  mo as css,
  ho as html
};

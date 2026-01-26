const {
  entries: Pe,
  setPrototypeOf: Re,
  isFrozen: un,
  getPrototypeOf: pn,
  getOwnPropertyDescriptor: mn
} = Object;
let {
  freeze: L,
  seal: I,
  create: Xt
} = Object, {
  apply: qt,
  construct: Kt
} = typeof Reflect < "u" && Reflect;
L || (L = function(t) {
  return t;
});
I || (I = function(t) {
  return t;
});
qt || (qt = function(t, e) {
  for (var o = arguments.length, i = new Array(o > 2 ? o - 2 : 0), r = 2; r < o; r++)
    i[r - 2] = arguments[r];
  return t.apply(e, i);
});
Kt || (Kt = function(t) {
  for (var e = arguments.length, o = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
    o[i - 1] = arguments[i];
  return new t(...o);
});
const gt = M(Array.prototype.forEach), hn = M(Array.prototype.lastIndexOf), Ce = M(Array.prototype.pop), nt = M(Array.prototype.push), dn = M(Array.prototype.splice), bt = M(String.prototype.toLowerCase), Ut = M(String.prototype.toString), Ht = M(String.prototype.match), ot = M(String.prototype.replace), Tn = M(String.prototype.indexOf), En = M(String.prototype.trim), P = M(Object.prototype.hasOwnProperty), O = M(RegExp.prototype.test), it = gn(TypeError);
function M(s) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var e = arguments.length, o = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
      o[i - 1] = arguments[i];
    return qt(s, t, o);
  };
}
function gn(s) {
  return function() {
    for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++)
      e[o] = arguments[o];
    return Kt(s, e);
  };
}
function m(s, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : bt;
  Re && Re(s, null);
  let o = t.length;
  for (; o--; ) {
    let i = t[o];
    if (typeof i == "string") {
      const r = e(i);
      r !== i && (un(t) || (t[o] = r), i = r);
    }
    s[i] = !0;
  }
  return s;
}
function An(s) {
  for (let t = 0; t < s.length; t++)
    P(s, t) || (s[t] = null);
  return s;
}
function k(s) {
  const t = Xt(null);
  for (const [e, o] of Pe(s))
    P(s, e) && (Array.isArray(o) ? t[e] = An(o) : o && typeof o == "object" && o.constructor === Object ? t[e] = k(o) : t[e] = o);
  return t;
}
function st(s, t) {
  for (; s !== null; ) {
    const o = mn(s, t);
    if (o) {
      if (o.get)
        return M(o.get);
      if (typeof o.value == "function")
        return M(o.value);
    }
    s = pn(s);
  }
  function e() {
    return null;
  }
  return e;
}
const Ne = L(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), zt = L(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), $t = L(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), _n = L(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Gt = L(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), bn = L(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Oe = L(["#text"]), Le = L(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Bt = L(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Me = L(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), At = L(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Sn = I(/\{\{[\w\W]*|[\w\W]*\}\}/gm), yn = I(/<%[\w\W]*|[\w\W]*%>/gm), Rn = I(/\$\{[\w\W]*/gm), Cn = I(/^data-[\-\w.\u00B7-\uFFFF]+$/), Nn = I(/^aria-[\-\w]+$/), xe = I(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), On = I(/^(?:\w+script|data):/i), Ln = I(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ve = I(/^html$/i), Mn = I(/^[a-z][.\w]*(-[.\w]+)+$/i);
var we = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Nn,
  ATTR_WHITESPACE: Ln,
  CUSTOM_ELEMENT: Mn,
  DATA_ATTR: Cn,
  DOCTYPE_NAME: ve,
  ERB_EXPR: yn,
  IS_ALLOWED_URI: xe,
  IS_SCRIPT_OR_DATA: On,
  MUSTACHE_EXPR: Sn,
  TMPLIT_EXPR: Rn
});
const rt = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, wn = function() {
  return typeof window > "u" ? null : window;
}, Dn = function(t, e) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let o = null;
  const i = "data-tt-policy-suffix";
  e && e.hasAttribute(i) && (o = e.getAttribute(i));
  const r = "dompurify" + (o ? "#" + o : "");
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
}, De = function() {
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
function ke() {
  let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : wn();
  const t = (f) => ke(f);
  if (t.version = "3.3.1", t.removed = [], !s || !s.document || s.document.nodeType !== rt.document || !s.Element)
    return t.isSupported = !1, t;
  let {
    document: e
  } = s;
  const o = e, i = o.currentScript, {
    DocumentFragment: r,
    HTMLTemplateElement: c,
    Node: h,
    Element: u,
    NodeFilter: p,
    NamedNodeMap: d = s.NamedNodeMap || s.MozNamedAttrMap,
    HTMLFormElement: y,
    DOMParser: $,
    trustedTypes: F
  } = s, G = u.prototype, We = st(G, "cloneNode"), je = st(G, "remove"), Ye = st(G, "nextSibling"), Ve = st(G, "childNodes"), ft = st(G, "parentNode");
  if (typeof c == "function") {
    const f = e.createElement("template");
    f.content && f.content.ownerDocument && (e = f.content.ownerDocument);
  }
  let C, J = "";
  const {
    implementation: St,
    createNodeIterator: Xe,
    createDocumentFragment: qe,
    getElementsByTagName: Ke
  } = e, {
    importNode: Ze
  } = o;
  let N = De();
  t.isSupported = typeof Pe == "function" && typeof ft == "function" && St && St.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: yt,
    ERB_EXPR: Rt,
    TMPLIT_EXPR: Ct,
    DATA_ATTR: Je,
    ARIA_ATTR: Qe,
    IS_SCRIPT_OR_DATA: tn,
    ATTR_WHITESPACE: te,
    CUSTOM_ELEMENT: en
  } = we;
  let {
    IS_ALLOWED_URI: ee
  } = we, _ = null;
  const ne = m({}, [...Ne, ...zt, ...$t, ...Gt, ...Oe]);
  let b = null;
  const oe = m({}, [...Le, ...Bt, ...Me, ...At]);
  let E = Object.seal(Xt(null, {
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
  })), Q = null, Nt = null;
  const j = Object.seal(Xt(null, {
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
  let ie = !0, Ot = !0, se = !1, re = !0, Y = !1, ut = !0, B = !1, Lt = !1, Mt = !1, V = !1, pt = !1, mt = !1, ae = !0, ce = !1;
  const nn = "user-content-";
  let wt = !0, tt = !1, X = {}, x = null;
  const Dt = m({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let le = null;
  const fe = m({}, ["audio", "video", "img", "source", "image", "track"]);
  let It = null;
  const ue = m({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ht = "http://www.w3.org/1998/Math/MathML", dt = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xhtml";
  let q = U, Pt = !1, xt = null;
  const on = m({}, [ht, dt, U], Ut);
  let Tt = m({}, ["mi", "mo", "mn", "ms", "mtext"]), Et = m({}, ["annotation-xml"]);
  const sn = m({}, ["title", "style", "font", "a", "script"]);
  let et = null;
  const rn = ["application/xhtml+xml", "text/html"], an = "text/html";
  let A = null, K = null;
  const cn = e.createElement("form"), pe = function(n) {
    return n instanceof RegExp || n instanceof Function;
  }, vt = function() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(K && K === n)) {
      if ((!n || typeof n != "object") && (n = {}), n = k(n), et = // eslint-disable-next-line unicorn/prefer-includes
      rn.indexOf(n.PARSER_MEDIA_TYPE) === -1 ? an : n.PARSER_MEDIA_TYPE, A = et === "application/xhtml+xml" ? Ut : bt, _ = P(n, "ALLOWED_TAGS") ? m({}, n.ALLOWED_TAGS, A) : ne, b = P(n, "ALLOWED_ATTR") ? m({}, n.ALLOWED_ATTR, A) : oe, xt = P(n, "ALLOWED_NAMESPACES") ? m({}, n.ALLOWED_NAMESPACES, Ut) : on, It = P(n, "ADD_URI_SAFE_ATTR") ? m(k(ue), n.ADD_URI_SAFE_ATTR, A) : ue, le = P(n, "ADD_DATA_URI_TAGS") ? m(k(fe), n.ADD_DATA_URI_TAGS, A) : fe, x = P(n, "FORBID_CONTENTS") ? m({}, n.FORBID_CONTENTS, A) : Dt, Q = P(n, "FORBID_TAGS") ? m({}, n.FORBID_TAGS, A) : k({}), Nt = P(n, "FORBID_ATTR") ? m({}, n.FORBID_ATTR, A) : k({}), X = P(n, "USE_PROFILES") ? n.USE_PROFILES : !1, ie = n.ALLOW_ARIA_ATTR !== !1, Ot = n.ALLOW_DATA_ATTR !== !1, se = n.ALLOW_UNKNOWN_PROTOCOLS || !1, re = n.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Y = n.SAFE_FOR_TEMPLATES || !1, ut = n.SAFE_FOR_XML !== !1, B = n.WHOLE_DOCUMENT || !1, V = n.RETURN_DOM || !1, pt = n.RETURN_DOM_FRAGMENT || !1, mt = n.RETURN_TRUSTED_TYPE || !1, Mt = n.FORCE_BODY || !1, ae = n.SANITIZE_DOM !== !1, ce = n.SANITIZE_NAMED_PROPS || !1, wt = n.KEEP_CONTENT !== !1, tt = n.IN_PLACE || !1, ee = n.ALLOWED_URI_REGEXP || xe, q = n.NAMESPACE || U, Tt = n.MATHML_TEXT_INTEGRATION_POINTS || Tt, Et = n.HTML_INTEGRATION_POINTS || Et, E = n.CUSTOM_ELEMENT_HANDLING || {}, n.CUSTOM_ELEMENT_HANDLING && pe(n.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (E.tagNameCheck = n.CUSTOM_ELEMENT_HANDLING.tagNameCheck), n.CUSTOM_ELEMENT_HANDLING && pe(n.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (E.attributeNameCheck = n.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), n.CUSTOM_ELEMENT_HANDLING && typeof n.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = n.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Y && (Ot = !1), pt && (V = !0), X && (_ = m({}, Oe), b = [], X.html === !0 && (m(_, Ne), m(b, Le)), X.svg === !0 && (m(_, zt), m(b, Bt), m(b, At)), X.svgFilters === !0 && (m(_, $t), m(b, Bt), m(b, At)), X.mathMl === !0 && (m(_, Gt), m(b, Me), m(b, At))), n.ADD_TAGS && (typeof n.ADD_TAGS == "function" ? j.tagCheck = n.ADD_TAGS : (_ === ne && (_ = k(_)), m(_, n.ADD_TAGS, A))), n.ADD_ATTR && (typeof n.ADD_ATTR == "function" ? j.attributeCheck = n.ADD_ATTR : (b === oe && (b = k(b)), m(b, n.ADD_ATTR, A))), n.ADD_URI_SAFE_ATTR && m(It, n.ADD_URI_SAFE_ATTR, A), n.FORBID_CONTENTS && (x === Dt && (x = k(x)), m(x, n.FORBID_CONTENTS, A)), n.ADD_FORBID_CONTENTS && (x === Dt && (x = k(x)), m(x, n.ADD_FORBID_CONTENTS, A)), wt && (_["#text"] = !0), B && m(_, ["html", "head", "body"]), _.table && (m(_, ["tbody"]), delete Q.tbody), n.TRUSTED_TYPES_POLICY) {
        if (typeof n.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw it('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof n.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw it('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        C = n.TRUSTED_TYPES_POLICY, J = C.createHTML("");
      } else
        C === void 0 && (C = Dn(F, i)), C !== null && typeof J == "string" && (J = C.createHTML(""));
      L && L(n), K = n;
    }
  }, me = m({}, [...zt, ...$t, ..._n]), he = m({}, [...Gt, ...bn]), ln = function(n) {
    let a = ft(n);
    (!a || !a.tagName) && (a = {
      namespaceURI: q,
      tagName: "template"
    });
    const l = bt(n.tagName), T = bt(a.tagName);
    return xt[n.namespaceURI] ? n.namespaceURI === dt ? a.namespaceURI === U ? l === "svg" : a.namespaceURI === ht ? l === "svg" && (T === "annotation-xml" || Tt[T]) : !!me[l] : n.namespaceURI === ht ? a.namespaceURI === U ? l === "math" : a.namespaceURI === dt ? l === "math" && Et[T] : !!he[l] : n.namespaceURI === U ? a.namespaceURI === dt && !Et[T] || a.namespaceURI === ht && !Tt[T] ? !1 : !he[l] && (sn[l] || !me[l]) : !!(et === "application/xhtml+xml" && xt[n.namespaceURI]) : !1;
  }, v = function(n) {
    nt(t.removed, {
      element: n
    });
    try {
      ft(n).removeChild(n);
    } catch {
      je(n);
    }
  }, W = function(n, a) {
    try {
      nt(t.removed, {
        attribute: a.getAttributeNode(n),
        from: a
      });
    } catch {
      nt(t.removed, {
        attribute: null,
        from: a
      });
    }
    if (a.removeAttribute(n), n === "is")
      if (V || pt)
        try {
          v(a);
        } catch {
        }
      else
        try {
          a.setAttribute(n, "");
        } catch {
        }
  }, de = function(n) {
    let a = null, l = null;
    if (Mt)
      n = "<remove></remove>" + n;
    else {
      const g = Ht(n, /^[\r\n\t ]+/);
      l = g && g[0];
    }
    et === "application/xhtml+xml" && q === U && (n = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + n + "</body></html>");
    const T = C ? C.createHTML(n) : n;
    if (q === U)
      try {
        a = new $().parseFromString(T, et);
      } catch {
      }
    if (!a || !a.documentElement) {
      a = St.createDocument(q, "template", null);
      try {
        a.documentElement.innerHTML = Pt ? J : T;
      } catch {
      }
    }
    const R = a.body || a.documentElement;
    return n && l && R.insertBefore(e.createTextNode(l), R.childNodes[0] || null), q === U ? Ke.call(a, B ? "html" : "body")[0] : B ? a.documentElement : R;
  }, Te = function(n) {
    return Xe.call(
      n.ownerDocument || n,
      n,
      // eslint-disable-next-line no-bitwise
      p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION,
      null
    );
  }, kt = function(n) {
    return n instanceof y && (typeof n.nodeName != "string" || typeof n.textContent != "string" || typeof n.removeChild != "function" || !(n.attributes instanceof d) || typeof n.removeAttribute != "function" || typeof n.setAttribute != "function" || typeof n.namespaceURI != "string" || typeof n.insertBefore != "function" || typeof n.hasChildNodes != "function");
  }, Ee = function(n) {
    return typeof h == "function" && n instanceof h;
  };
  function H(f, n, a) {
    gt(f, (l) => {
      l.call(t, n, a, K);
    });
  }
  const ge = function(n) {
    let a = null;
    if (H(N.beforeSanitizeElements, n, null), kt(n))
      return v(n), !0;
    const l = A(n.nodeName);
    if (H(N.uponSanitizeElement, n, {
      tagName: l,
      allowedTags: _
    }), ut && n.hasChildNodes() && !Ee(n.firstElementChild) && O(/<[/\w!]/g, n.innerHTML) && O(/<[/\w!]/g, n.textContent) || n.nodeType === rt.progressingInstruction || ut && n.nodeType === rt.comment && O(/<[/\w]/g, n.data))
      return v(n), !0;
    if (!(j.tagCheck instanceof Function && j.tagCheck(l)) && (!_[l] || Q[l])) {
      if (!Q[l] && _e(l) && (E.tagNameCheck instanceof RegExp && O(E.tagNameCheck, l) || E.tagNameCheck instanceof Function && E.tagNameCheck(l)))
        return !1;
      if (wt && !x[l]) {
        const T = ft(n) || n.parentNode, R = Ve(n) || n.childNodes;
        if (R && T) {
          const g = R.length;
          for (let w = g - 1; w >= 0; --w) {
            const z = We(R[w], !0);
            z.__removalCount = (n.__removalCount || 0) + 1, T.insertBefore(z, Ye(n));
          }
        }
      }
      return v(n), !0;
    }
    return n instanceof u && !ln(n) || (l === "noscript" || l === "noembed" || l === "noframes") && O(/<\/no(script|embed|frames)/i, n.innerHTML) ? (v(n), !0) : (Y && n.nodeType === rt.text && (a = n.textContent, gt([yt, Rt, Ct], (T) => {
      a = ot(a, T, " ");
    }), n.textContent !== a && (nt(t.removed, {
      element: n.cloneNode()
    }), n.textContent = a)), H(N.afterSanitizeElements, n, null), !1);
  }, Ae = function(n, a, l) {
    if (ae && (a === "id" || a === "name") && (l in e || l in cn))
      return !1;
    if (!(Ot && !Nt[a] && O(Je, a))) {
      if (!(ie && O(Qe, a))) {
        if (!(j.attributeCheck instanceof Function && j.attributeCheck(a, n))) {
          if (!b[a] || Nt[a]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(_e(n) && (E.tagNameCheck instanceof RegExp && O(E.tagNameCheck, n) || E.tagNameCheck instanceof Function && E.tagNameCheck(n)) && (E.attributeNameCheck instanceof RegExp && O(E.attributeNameCheck, a) || E.attributeNameCheck instanceof Function && E.attributeNameCheck(a, n)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              a === "is" && E.allowCustomizedBuiltInElements && (E.tagNameCheck instanceof RegExp && O(E.tagNameCheck, l) || E.tagNameCheck instanceof Function && E.tagNameCheck(l)))
            ) return !1;
          } else if (!It[a]) {
            if (!O(ee, ot(l, te, ""))) {
              if (!((a === "src" || a === "xlink:href" || a === "href") && n !== "script" && Tn(l, "data:") === 0 && le[n])) {
                if (!(se && !O(tn, ot(l, te, "")))) {
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
  }, _e = function(n) {
    return n !== "annotation-xml" && Ht(n, en);
  }, be = function(n) {
    H(N.beforeSanitizeAttributes, n, null);
    const {
      attributes: a
    } = n;
    if (!a || kt(n))
      return;
    const l = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: b,
      forceKeepAttr: void 0
    };
    let T = a.length;
    for (; T--; ) {
      const R = a[T], {
        name: g,
        namespaceURI: w,
        value: z
      } = R, Z = A(g), Ft = z;
      let S = g === "value" ? Ft : En(Ft);
      if (l.attrName = Z, l.attrValue = S, l.keepAttr = !0, l.forceKeepAttr = void 0, H(N.uponSanitizeAttribute, n, l), S = l.attrValue, ce && (Z === "id" || Z === "name") && (W(g, n), S = nn + S), ut && O(/((--!?|])>)|<\/(style|title|textarea)/i, S)) {
        W(g, n);
        continue;
      }
      if (Z === "attributename" && Ht(S, "href")) {
        W(g, n);
        continue;
      }
      if (l.forceKeepAttr)
        continue;
      if (!l.keepAttr) {
        W(g, n);
        continue;
      }
      if (!re && O(/\/>/i, S)) {
        W(g, n);
        continue;
      }
      Y && gt([yt, Rt, Ct], (ye) => {
        S = ot(S, ye, " ");
      });
      const Se = A(n.nodeName);
      if (!Ae(Se, Z, S)) {
        W(g, n);
        continue;
      }
      if (C && typeof F == "object" && typeof F.getAttributeType == "function" && !w)
        switch (F.getAttributeType(Se, Z)) {
          case "TrustedHTML": {
            S = C.createHTML(S);
            break;
          }
          case "TrustedScriptURL": {
            S = C.createScriptURL(S);
            break;
          }
        }
      if (S !== Ft)
        try {
          w ? n.setAttributeNS(w, g, S) : n.setAttribute(g, S), kt(n) ? v(n) : Ce(t.removed);
        } catch {
          W(g, n);
        }
    }
    H(N.afterSanitizeAttributes, n, null);
  }, fn = function f(n) {
    let a = null;
    const l = Te(n);
    for (H(N.beforeSanitizeShadowDOM, n, null); a = l.nextNode(); )
      H(N.uponSanitizeShadowNode, a, null), ge(a), be(a), a.content instanceof r && f(a.content);
    H(N.afterSanitizeShadowDOM, n, null);
  };
  return t.sanitize = function(f) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, l = null, T = null, R = null;
    if (Pt = !f, Pt && (f = "<!-->"), typeof f != "string" && !Ee(f))
      if (typeof f.toString == "function") {
        if (f = f.toString(), typeof f != "string")
          throw it("dirty is not a string, aborting");
      } else
        throw it("toString is not a function");
    if (!t.isSupported)
      return f;
    if (Lt || vt(n), t.removed = [], typeof f == "string" && (tt = !1), tt) {
      if (f.nodeName) {
        const z = A(f.nodeName);
        if (!_[z] || Q[z])
          throw it("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (f instanceof h)
      a = de("<!---->"), l = a.ownerDocument.importNode(f, !0), l.nodeType === rt.element && l.nodeName === "BODY" || l.nodeName === "HTML" ? a = l : a.appendChild(l);
    else {
      if (!V && !Y && !B && // eslint-disable-next-line unicorn/prefer-includes
      f.indexOf("<") === -1)
        return C && mt ? C.createHTML(f) : f;
      if (a = de(f), !a)
        return V ? null : mt ? J : "";
    }
    a && Mt && v(a.firstChild);
    const g = Te(tt ? f : a);
    for (; T = g.nextNode(); )
      ge(T), be(T), T.content instanceof r && fn(T.content);
    if (tt)
      return f;
    if (V) {
      if (pt)
        for (R = qe.call(a.ownerDocument); a.firstChild; )
          R.appendChild(a.firstChild);
      else
        R = a;
      return (b.shadowroot || b.shadowrootmode) && (R = Ze.call(o, R, !0)), R;
    }
    let w = B ? a.outerHTML : a.innerHTML;
    return B && _["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && O(ve, a.ownerDocument.doctype.name) && (w = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + w), Y && gt([yt, Rt, Ct], (z) => {
      w = ot(w, z, " ");
    }), C && mt ? C.createHTML(w) : w;
  }, t.setConfig = function() {
    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    vt(f), Lt = !0;
  }, t.clearConfig = function() {
    K = null, Lt = !1;
  }, t.isValidAttribute = function(f, n, a) {
    K || vt({});
    const l = A(f), T = A(n);
    return Ae(l, T, a);
  }, t.addHook = function(f, n) {
    typeof n == "function" && nt(N[f], n);
  }, t.removeHook = function(f, n) {
    if (n !== void 0) {
      const a = hn(N[f], n);
      return a === -1 ? void 0 : dn(N[f], a, 1)[0];
    }
    return Ce(N[f]);
  }, t.removeHooks = function(f) {
    N[f] = [];
  }, t.removeAllHooks = function() {
    N = De();
  }, t;
}
var Fe = ke();
function Ie(s, t) {
  let e = s;
  for (const o of t.split("."))
    e = e[o];
  return e;
}
function In(s, t, e) {
  const o = t.split("."), i = o.length - 1;
  let r = s;
  o.forEach((c, h) => {
    h === i ? r[c] = e : r = r[c];
  });
}
const Pn = /* @__PURE__ */ new Set([
  "onblur",
  "onchange",
  "onclick",
  "onfocus",
  "oninput",
  "onkeydown",
  "onreset",
  "onsubmit"
]);
Fe.addHook("uponSanitizeAttribute", (s, t) => {
  const { attrName: e } = t, o = e.toLowerCase();
  Pn.has(o) && (t.forceKeepAttr = !0);
});
class ct extends Error {
}
const xn = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, Ue = "a-zA-Z_$", vn = Ue + "0-9", lt = `[${Ue}][${vn}]*`, kn = /<!--\s*(.*?)\s*-->/, Fn = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, Wt = new RegExp(`^this\\.${lt}$`), jt = new RegExp(`this\\.${lt}(\\.${lt})*`, "g"), He = new RegExp(`this\\.${lt}(\\.${lt})*`), Un = /* @__PURE__ */ new Set(["class", "style"]), ze = 5;
function Hn(s) {
  return s instanceof HTMLButtonElement || s instanceof HTMLFieldSetElement || s instanceof HTMLInputElement || s instanceof HTMLSelectElement || s instanceof HTMLTextAreaElement || s instanceof D;
}
function Bn(s, t, e) {
  const o = document.createElement(s);
  if (t)
    for (const [i, r] of Object.entries(t))
      o.setAttribute(i, r);
  return e && (o.innerHTML = e), o;
}
const zn = (s) => s === String ? "" : s === Number ? 0 : s === Boolean ? !1 : s === Array ? [] : s === Object ? {} : void 0;
function Zt(s) {
  const t = [];
  let e = s.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...Zt(e.shadowRoot)), e.firstElementChild && t.push(...Zt(e)), e = e.nextElementSibling;
  return t;
}
const _t = (s) => s.substring(ze).split(".")[0];
function $e(s, t) {
  let e = s[0];
  return t.forEach((o, i) => {
    e += o + s[i + 1];
  }), e;
}
function Jt(s) {
  const t = typeof s;
  return t === "string" || t === "number" || t === "boolean";
}
function at(s) {
  return s.localName === "textarea";
}
function Qt(s) {
  const { localName: t } = s;
  return t === "input" || t === "select";
}
const $n = (s) => s.replace(/<!--[\s\S]*?-->/g, "");
function Ge(s, t, e, o) {
  return s.slice(0, t) + o + s.slice(t + e);
}
function Gn(s) {
  let t = s.trim(), e = null;
  /^\s*<tr[\s>]/i.test(t) ? (t = `<table><tbody>${t}</tbody></table>`, e = "tbody") : /^\s*<(td|th)[\s>]/i.test(t) ? (t = `<table><tbody><tr>${t}</tr></tbody></table>`, e = "tr") : /^\s*<option[\s>]/i.test(t) ? (t = `<select>${t}</select>`, e = "select") : /^\s*<col[\s>]/i.test(t) && (t = `<table><colgroup>${t}</colgroup></table>`, e = "colgroup");
  const o = Fe.sanitize(t, {
    ADD_TAGS: ["#comment"],
    ALLOW_UNKNOWN_PROTOCOLS: !0,
    RETURN_DOM_FRAGMENT: !0
  });
  if (e) {
    const i = o.querySelector(e);
    if (i) return i.childNodes;
  }
  return o.childNodes;
}
function Yt(s) {
  const t = Number(s);
  if (isNaN(t)) throw new ct(`can't convert "${s}" to a number`);
  return t;
}
function Be(s, t, e) {
  const [o, i] = t.split(":");
  if (Jt(e))
    if (typeof e == "boolean") {
      e ? s.setAttribute(o, o) : s.removeAttribute(o);
      const r = D.getPropName(o);
      s[r] = e;
    } else {
      const r = s.getAttribute(t), c = String(e);
      r !== c && (s.setAttribute(o, c), o === "value" && Qt(s) && (s.value = c));
    }
  else {
    const r = D.getPropName(t);
    s[r] = e;
  }
}
function Vt(s, t, e) {
  const [o, i] = t.split(":");
  s instanceof CSSStyleRule ? s.style.setProperty(o, e) : (Be(s, o, e), o === "value" && Qt(s) && (s.value = e));
}
class D extends HTMLElement {
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
  #i;
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
  attributeChangedCallback(t, e, o) {
    t === "disabled" && this.#d();
    const i = D.getPropName(t);
    if (this.#s(i)) {
      const r = this.#_(i, String(o));
      this[i] = r;
      const c = this.#c[i];
      c && this.setFormValue(c, String(r)), this.propertyChangedCallback(i, e, o);
    }
  }
  #y() {
    if (!this.shadowRoot) return;
    const t = this.#t;
    let { template: e } = t;
    if (!e) {
      e = t.template = document.createElement("template");
      let o = `<style>
    :host([hidden]) { display: none; }`;
      t.css && (o += t.css), o += `</style>
`;
      let i = t.html.trim();
      i.startsWith("<") || (i = `<span><!--${i}--></span>`), e.innerHTML = o + i;
    }
    this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, o) {
    this[e] = o;
  }
  connectedCallback() {
    this.#x(), this.#C(), this.#y(), this.hasAttribute("disabled") && this.#d(), requestAnimationFrame(() => {
      this.shadowRoot && (this.#S(this.shadowRoot), this.#T(this.shadowRoot)), this.#R();
    });
  }
  #R() {
    const t = this.#t, { properties: e } = t;
    for (const [o, { computed: i }] of Object.entries(e))
      i && (this[o] = this.#o(i));
  }
  #C() {
    const t = this.#t, { observedAttributes: e, properties: o } = t;
    for (const [i, r] of Object.entries(o))
      this.#N(i, r, e);
  }
  #N(t, e, o) {
    const i = D.getAttrName(t), r = this.hasAttribute(i);
    e.required && !r && this.#e(this, t, "is a required attribute");
    let c = e.value;
    this.hasOwnProperty(t) && (c = this[t], delete this[t]);
    const { type: h } = e, u = h === Boolean ? c || r : o.includes(i) && r ? this.#A(t, i) : c || zn(h), p = "#" + t;
    this[p] = u, e.computed && this.#w(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[p];
      },
      set(d) {
        h === Number && typeof d == "string" && (d = Yt(d));
        const y = this[p];
        if (d === y) return;
        this.#k(t, h, d), this[p] = d;
        const { state: $, stateProp: F } = this.#t.properties[t];
        F && In($, F, d), this.#I(t), this.#D(t, h, d, i), this.#g(t), this.#P(t, d);
        const G = this.#c[t];
        G && this.setFormValue(G, String(d)), this.propertyChangedCallback(t, y, d), e.dispatch && this.dispatch("change", { [t]: d });
      }
    });
  }
  #d() {
    const t = this.hasAttribute("disabled"), e = Zt(this.shadowRoot);
    for (const o of e)
      Hn(o) && (o.disabled = t);
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
  #O(t) {
    const e = t instanceof D;
    for (const o of t.getAttributeNames()) {
      const i = t.getAttribute(o), r = this.#E(t, i);
      if (r) {
        const c = this[r];
        c === void 0 && this.#a(t, o, r), t[r] = c;
        let [h, u] = o.split(":");
        h === "value" && (u ? (t["on" + u] === void 0 && this.#e(t, o, "refers to an unsupported event name"), t.setAttribute(h, this[r])) : u = "change"), e && t.#u.set(
          D.getPropName(h),
          r
        );
      }
      this.#r(i, t, o);
    }
  }
  #o(t) {
    const e = new Function("return " + t).call(this);
    return Array.isArray(e) ? e.join("") : e;
  }
  #L(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: o } = t, i = o?.cssRules ?? [], r = Array.from(i);
      for (const c of r)
        if (c.constructor === CSSStyleRule) {
          const h = Array.from(c.style);
          for (const u of h)
            if (u.startsWith("--")) {
              const p = c.style.getPropertyValue(u);
              this.#r(p, c, u);
            }
        }
    } else {
      let o = "";
      if (at(t)) {
        this.#r(t.textContent, t);
        const i = t.textContent?.match(kn);
        i && (o = i[1]);
      } else {
        const i = Array.from(t.childNodes).find(
          (r) => r.nodeType === Node.COMMENT_NODE
        );
        i && (o = i.textContent?.trim() ?? "");
      }
      if (o) {
        const i = this.#E(t, o);
        i && at(t) ? t.textContent = this[i] : this.#r(o, t);
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
        if (this.#s("value"))
          t = `value:${c}`;
        else
          return;
      else
        return;
    }
    const e = {}, o = t.split(",");
    for (const c of o) {
      const [h, u] = c.split(":");
      e[h.trim()] = u.trim();
    }
    this.#c = e, this.#i = new FormData(), this.#f = this.attachInternals(), this.#f.setFormValue(this.#i);
    const i = Object.keys(this.#t.properties), r = this.#l;
    for (const c of i)
      r[c] = this[c];
  }
  formResetCallback() {
    const t = this.#l;
    for (const e of Object.keys(t)) {
      let o = t[e];
      Wt.test(o) && (o = this.#o(o)), this[e] = o;
    }
  }
  static getAttrName(t) {
    let e = D.#h.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), D.#h.set(t, e)), e;
  }
  static getPropName(t) {
    let e = D.#m.get(t);
    return e || (e = t.replace(/-([a-z])/g, (o, i) => i.toUpperCase()), D.#m.set(t, e)), e;
  }
  #M(t, e, o) {
    if (o.length !== 1) return;
    const [i] = o;
    if (!Wt.test(i)) return;
    const r = Qt(t) || at(t);
    let [c, h] = (e ?? "").split(":");
    if (!(r && c === "value" || at(t))) return;
    h ? t["on" + h] === void 0 && this.#e(t, e, "refers to an unsupported event name") : h = "change";
    const p = _t(i);
    t.addEventListener(h, (d) => {
      const { target: y } = d;
      if (!y) return;
      const $ = y.value, { type: F } = this.#t.properties[p];
      this[p] = F === Number ? Yt($) : $, this.#g(p);
    });
  }
  #s(t) {
    return !!this.#t.properties[t];
  }
  #T(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const o of e)
      this.#O(o), o.firstElementChild || this.#L(o);
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(D.getAttrName);
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, o) {
  }
  #E(t, e) {
    if (!e || !Wt.test(e)) return;
    const o = _t(e);
    return this[o] === void 0 && this.#a(t, "", o), o;
  }
  #g(t) {
    const i = this.#t.propToExprsMap.get(t) || [];
    for (const r of i) {
      let c = this.#o(r);
      const h = this.#n.get(r) ?? [];
      for (const u of h)
        if (u instanceof HTMLElement)
          this.#b(u, c);
        else if (!(u instanceof CSSStyleRule)) {
          const { element: p, attrName: d } = u;
          p instanceof CSSStyleRule ? p.style.setProperty(d, c) : Vt(p, d, c);
        }
    }
  }
  static register() {
    const t = this.elementName();
    customElements.get(t) || customElements.define(t, this);
  }
  #w(t, e) {
    const { computed: o, uses: i } = e, r = this.#t.propToComputedMap;
    function c(u, p) {
      let d = r.get(u);
      d || (d = [], r.set(u, d)), d.push([t, p]);
    }
    const h = o.match(jt) || [];
    for (const u of h) {
      const p = u.substring(ze);
      this[p] === void 0 && this.#a(null, t, p), typeof this[p] != "function" && c(p, o);
    }
    if (i)
      for (const u of i.split(","))
        c(u, o);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #r(t, e, o = void 0) {
    if (!t) return;
    const i = this.#p(e, o, t);
    if (!i) {
      const u = t.replaceAll("this..", "this.");
      o ? Vt(e, o, u) : "textContent" in e && (e.textContent = u);
      return;
    }
    const r = this.#t;
    i.forEach((u) => {
      const p = _t(u);
      if (typeof this[p] == "function") return;
      const d = r.propToExprsMap;
      let y = d.get(p);
      y || (y = [], d.set(p, y)), y.includes(t) || y.push(t);
    });
    for (const [u, p] of this.#n.entries())
      for (const d of p) {
        const y = d instanceof HTMLElement || d instanceof CSSStyleRule ? d : d.element;
        y instanceof CSSStyleRule || y.isConnected || this.#n.set(
          u,
          p.filter(($) => $ !== d)
        );
      }
    let c = this.#n.get(t);
    c || (c = [], this.#n.set(t, c)), c.push(o ? { element: e, attrName: o } : e), e instanceof HTMLElement && this.#M(e, o, i);
    const h = this.#o(t);
    o ? Vt(e, o, h) : this.#b(e, h);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !Jt(e) || (this.#i.set(t, e), this.#f?.setFormValue(this.#i));
  }
  #e(t, e, o) {
    const i = this.#t, r = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new ct(
      `component ${i.elementName()}` + (t ? `, element "${r}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${o}`
    );
  }
  #a(t, e, o) {
    this.#e(t, e, `refers to missing property "${o}"`);
  }
  #A(t, e) {
    return this.#_(t, this.getAttribute(e));
  }
  #_(t, e) {
    if (e?.match(jt)) return e;
    const o = this.#t, { type: i } = o.properties[t];
    if (i || this.#e(null, t, "does not specify its type"), i === String) return e;
    if (i === Number) return Yt(e);
    if (i === Boolean)
      return e === "true" ? !0 : e === "false" || e === "null" ? !1 : (e && e !== t && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === t);
  }
  // Updates the matching attribute for a property if there is one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #D(t, e, o, i) {
    if (Jt(o) && this.hasAttribute(i)) {
      const r = e === Boolean ? this.hasAttribute(i) : this.#A(t, i);
      o !== r && Be(this, t, o);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #I(t) {
    const o = this.#t.propToComputedMap.get(t) || [];
    for (const [i, r] of o)
      this[i] = this.#o(r);
  }
  #b(t, e) {
    if (e === void 0) return;
    const o = t instanceof HTMLElement, i = typeof e;
    if (i !== "string" && i !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    ), t instanceof HTMLElement && at(t))
      t.value = e;
    else if (o && i === "string" && e.trim().startsWith("<")) {
      const r = Gn(e);
      t.replaceChildren(...r), this.#S(t), this.#T(t);
    } else o && (t.textContent = e);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #P(t, e) {
    const o = this.#u.get(t);
    if (!o) return;
    const i = this.getRootNode();
    if (!(i instanceof ShadowRoot)) return;
    const { host: r } = i;
    if (!r) return;
    const c = r;
    c[o] = e;
  }
  /**
   * @param state - WrecState object
   * @param map - object whose keys are state properties and
   *   whose values are component properties
   */
  useState(t, e) {
    if (!e) {
      e = {};
      for (const o of Object.keys(t))
        e[o] = o;
    }
    this.#v(t, e);
    for (const [o, i] of Object.entries(e))
      if (this.#s(i)) {
        const r = Ie(t, o);
        r !== void 0 && (this[i] = r);
        const c = this.#t.properties[i];
        c.state = t, c.stateProp = o;
      }
    t.addListener(this, e);
  }
  #x() {
    const t = this.#t, e = new Set(Object.keys(t.properties));
    for (const i of e)
      Un.has(i) && this.#e(
        null,
        "",
        `property "${i}" is not allowed because it is a reserved attribute`
      );
    const o = this.#t.name;
    for (const i of this.getAttributeNames())
      if (i !== "class" && i !== "id" && i !== "disabled" && !i.startsWith("on")) {
        if (i === "form-assoc") {
          if (!t.formAssociated)
            throw new ct(
              `add "static formAssociated = true;" to class ${o}`
            );
          continue;
        }
        if (!e.has(D.getPropName(i))) {
          if (i === "name") {
            if (t.formAssociated) continue;
            throw new ct(
              `name attribute requires "static formAssociated = true;" in class ${o}`
            );
          }
          this.#e(null, i, "is not a supported attribute");
        }
      }
  }
  #p(t, e, o) {
    const i = o.match(jt);
    if (i)
      return i.forEach((r) => {
        const c = _t(r);
        this[c] === void 0 && this.#a(t, e, c);
      }), i;
  }
  #v(t, e) {
    for (const [o, i] of Object.entries(e)) {
      let r = Ie(t, o);
      if (r === void 0)
        throw new ct(`invalid state path "${o}"`);
      r = this[i], this.#s(i) || this.#e(
        null,
        i,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  #k(t, e, o) {
    if (o instanceof e) return;
    let i = typeof o;
    if (i === "object") {
      const { constructor: r } = o;
      i = r.name, r !== e && this.#e(
        null,
        t,
        `was set to a ${i}, but must be a ${e.name}`
      );
    }
    i !== e.name.toLowerCase() && this.#e(
      null,
      t,
      `was set to a ${i}, but must be a ${e.name}`
    );
  }
  #S(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const o of e) {
      const i = [];
      for (const r of Array.from(o.attributes)) {
        const c = r.name;
        if (c.startsWith("on")) {
          let h = c.slice(2);
          h = h[0].toLowerCase() + h.slice(1).toLowerCase();
          const u = r.value;
          this.#p(o, c, u);
          let p;
          typeof this[u] == "function" ? p = (d) => this[u](d) : (this.#p(o, c, u), p = () => this.#o(u)), o.addEventListener(h, p), i.push(c);
        }
      }
      for (const r of i)
        o.removeAttribute(r);
    }
  }
}
function Wn(s, ...t) {
  let e = $e(s, t);
  for (; ; ) {
    const o = xn.exec(e);
    if (!o) break;
    const i = o[2];
    if (He.test(i)) {
      const r = o[1];
      if (!r.startsWith("--")) {
        const c = `--${r}: ${i};
      ${r}: var(--${r})`;
        e = Ge(e, o.index, o[0].length, c);
      }
    }
  }
  return e;
}
function jn(s, ...t) {
  let e = $e(s, t);
  for (; ; ) {
    const o = Fn.exec(e);
    if (!o || o[1] === "style") break;
    const i = $n(o[2]);
    if (He.test(i)) {
      const r = `<!-- ${i.trim()} -->`, c = o.index + o[0].indexOf(">") + 1;
      e = Ge(e, c, i.length, r);
    }
  }
  return e;
}
export {
  D as Wrec,
  Bn as createElement,
  Wn as css,
  jn as html
};

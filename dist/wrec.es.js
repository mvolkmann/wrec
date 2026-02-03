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
  create: qt
} = Object, {
  apply: Kt,
  construct: Zt
} = typeof Reflect < "u" && Reflect;
L || (L = function(t) {
  return t;
});
I || (I = function(t) {
  return t;
});
Kt || (Kt = function(t, e) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++)
    i[r - 2] = arguments[r];
  return t.apply(e, i);
});
Zt || (Zt = function(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
    n[i - 1] = arguments[i];
  return new t(...n);
});
const Et = M(Array.prototype.forEach), hn = M(Array.prototype.lastIndexOf), Ce = M(Array.prototype.pop), nt = M(Array.prototype.push), dn = M(Array.prototype.splice), _t = M(String.prototype.toLowerCase), Ht = M(String.prototype.toString), zt = M(String.prototype.match), ot = M(String.prototype.replace), Tn = M(String.prototype.indexOf), En = M(String.prototype.trim), P = M(Object.prototype.hasOwnProperty), O = M(RegExp.prototype.test), it = gn(TypeError);
function M(s) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
      n[i - 1] = arguments[i];
    return Kt(s, t, n);
  };
}
function gn(s) {
  return function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return Zt(s, e);
  };
}
function m(s, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _t;
  Re && Re(s, null);
  let n = t.length;
  for (; n--; ) {
    let i = t[n];
    if (typeof i == "string") {
      const r = e(i);
      r !== i && (un(t) || (t[n] = r), i = r);
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
  const t = qt(null);
  for (const [e, n] of Pe(s))
    P(s, e) && (Array.isArray(n) ? t[e] = An(n) : n && typeof n == "object" && n.constructor === Object ? t[e] = k(n) : t[e] = n);
  return t;
}
function st(s, t) {
  for (; s !== null; ) {
    const n = mn(s, t);
    if (n) {
      if (n.get)
        return M(n.get);
      if (typeof n.value == "function")
        return M(n.value);
    }
    s = pn(s);
  }
  function e() {
    return null;
  }
  return e;
}
const Ne = L(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Gt = L(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), $t = L(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), _n = L(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Bt = L(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), bn = L(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Oe = L(["#text"]), Le = L(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Wt = L(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Me = L(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), gt = L(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Sn = I(/\{\{[\w\W]*|[\w\W]*\}\}/gm), yn = I(/<%[\w\W]*|[\w\W]*%>/gm), Rn = I(/\$\{[\w\W]*/gm), Cn = I(/^data-[\-\w.\u00B7-\uFFFF]+$/), Nn = I(/^aria-[\-\w]+$/), ve = I(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), On = I(/^(?:\w+script|data):/i), Ln = I(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), xe = I(/^html$/i), Mn = I(/^[a-z][.\w]*(-[.\w]+)+$/i);
var we = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Nn,
  ATTR_WHITESPACE: Ln,
  CUSTOM_ELEMENT: Mn,
  DATA_ATTR: Cn,
  DOCTYPE_NAME: xe,
  ERB_EXPR: yn,
  IS_ALLOWED_URI: ve,
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
  let n = null;
  const i = "data-tt-policy-suffix";
  e && e.hasAttribute(i) && (n = e.getAttribute(i));
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
  const n = e, i = n.currentScript, {
    DocumentFragment: r,
    HTMLTemplateElement: c,
    Node: h,
    Element: u,
    NodeFilter: p,
    NamedNodeMap: d = s.NamedNodeMap || s.MozNamedAttrMap,
    HTMLFormElement: b,
    DOMParser: G,
    trustedTypes: F
  } = s, $ = u.prototype, We = st($, "cloneNode"), je = st($, "remove"), Ye = st($, "nextSibling"), Ve = st($, "childNodes"), lt = st($, "parentNode");
  if (typeof c == "function") {
    const f = e.createElement("template");
    f.content && f.content.ownerDocument && (e = f.content.ownerDocument);
  }
  let C, J = "";
  const {
    implementation: yt,
    createNodeIterator: Xe,
    createDocumentFragment: qe,
    getElementsByTagName: Ke
  } = e, {
    importNode: Ze
  } = n;
  let N = De();
  t.isSupported = typeof Pe == "function" && typeof lt == "function" && yt && yt.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Rt,
    ERB_EXPR: Ct,
    TMPLIT_EXPR: Nt,
    DATA_ATTR: Je,
    ARIA_ATTR: Qe,
    IS_SCRIPT_OR_DATA: tn,
    ATTR_WHITESPACE: te,
    CUSTOM_ELEMENT: en
  } = we;
  let {
    IS_ALLOWED_URI: ee
  } = we, _ = null;
  const ne = m({}, [...Ne, ...Gt, ...$t, ...Bt, ...Oe]);
  let S = null;
  const oe = m({}, [...Le, ...Wt, ...Me, ...gt]);
  let E = Object.seal(qt(null, {
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
  })), Q = null, Ot = null;
  const j = Object.seal(qt(null, {
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
  let ie = !0, Lt = !0, se = !1, re = !0, Y = !1, ft = !0, B = !1, Mt = !1, wt = !1, V = !1, ut = !1, pt = !1, ae = !0, ce = !1;
  const nn = "user-content-";
  let Dt = !0, tt = !1, X = {}, v = null;
  const It = m({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let le = null;
  const fe = m({}, ["audio", "video", "img", "source", "image", "track"]);
  let Pt = null;
  const ue = m({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), mt = "http://www.w3.org/1998/Math/MathML", ht = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xhtml";
  let q = U, vt = !1, xt = null;
  const on = m({}, [mt, ht, U], Ht);
  let dt = m({}, ["mi", "mo", "mn", "ms", "mtext"]), Tt = m({}, ["annotation-xml"]);
  const sn = m({}, ["title", "style", "font", "a", "script"]);
  let et = null;
  const rn = ["application/xhtml+xml", "text/html"], an = "text/html";
  let A = null, K = null;
  const cn = e.createElement("form"), pe = function(o) {
    return o instanceof RegExp || o instanceof Function;
  }, kt = function() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(K && K === o)) {
      if ((!o || typeof o != "object") && (o = {}), o = k(o), et = // eslint-disable-next-line unicorn/prefer-includes
      rn.indexOf(o.PARSER_MEDIA_TYPE) === -1 ? an : o.PARSER_MEDIA_TYPE, A = et === "application/xhtml+xml" ? Ht : _t, _ = P(o, "ALLOWED_TAGS") ? m({}, o.ALLOWED_TAGS, A) : ne, S = P(o, "ALLOWED_ATTR") ? m({}, o.ALLOWED_ATTR, A) : oe, xt = P(o, "ALLOWED_NAMESPACES") ? m({}, o.ALLOWED_NAMESPACES, Ht) : on, Pt = P(o, "ADD_URI_SAFE_ATTR") ? m(k(ue), o.ADD_URI_SAFE_ATTR, A) : ue, le = P(o, "ADD_DATA_URI_TAGS") ? m(k(fe), o.ADD_DATA_URI_TAGS, A) : fe, v = P(o, "FORBID_CONTENTS") ? m({}, o.FORBID_CONTENTS, A) : It, Q = P(o, "FORBID_TAGS") ? m({}, o.FORBID_TAGS, A) : k({}), Ot = P(o, "FORBID_ATTR") ? m({}, o.FORBID_ATTR, A) : k({}), X = P(o, "USE_PROFILES") ? o.USE_PROFILES : !1, ie = o.ALLOW_ARIA_ATTR !== !1, Lt = o.ALLOW_DATA_ATTR !== !1, se = o.ALLOW_UNKNOWN_PROTOCOLS || !1, re = o.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Y = o.SAFE_FOR_TEMPLATES || !1, ft = o.SAFE_FOR_XML !== !1, B = o.WHOLE_DOCUMENT || !1, V = o.RETURN_DOM || !1, ut = o.RETURN_DOM_FRAGMENT || !1, pt = o.RETURN_TRUSTED_TYPE || !1, wt = o.FORCE_BODY || !1, ae = o.SANITIZE_DOM !== !1, ce = o.SANITIZE_NAMED_PROPS || !1, Dt = o.KEEP_CONTENT !== !1, tt = o.IN_PLACE || !1, ee = o.ALLOWED_URI_REGEXP || ve, q = o.NAMESPACE || U, dt = o.MATHML_TEXT_INTEGRATION_POINTS || dt, Tt = o.HTML_INTEGRATION_POINTS || Tt, E = o.CUSTOM_ELEMENT_HANDLING || {}, o.CUSTOM_ELEMENT_HANDLING && pe(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (E.tagNameCheck = o.CUSTOM_ELEMENT_HANDLING.tagNameCheck), o.CUSTOM_ELEMENT_HANDLING && pe(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (E.attributeNameCheck = o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), o.CUSTOM_ELEMENT_HANDLING && typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Y && (Lt = !1), ut && (V = !0), X && (_ = m({}, Oe), S = [], X.html === !0 && (m(_, Ne), m(S, Le)), X.svg === !0 && (m(_, Gt), m(S, Wt), m(S, gt)), X.svgFilters === !0 && (m(_, $t), m(S, Wt), m(S, gt)), X.mathMl === !0 && (m(_, Bt), m(S, Me), m(S, gt))), o.ADD_TAGS && (typeof o.ADD_TAGS == "function" ? j.tagCheck = o.ADD_TAGS : (_ === ne && (_ = k(_)), m(_, o.ADD_TAGS, A))), o.ADD_ATTR && (typeof o.ADD_ATTR == "function" ? j.attributeCheck = o.ADD_ATTR : (S === oe && (S = k(S)), m(S, o.ADD_ATTR, A))), o.ADD_URI_SAFE_ATTR && m(Pt, o.ADD_URI_SAFE_ATTR, A), o.FORBID_CONTENTS && (v === It && (v = k(v)), m(v, o.FORBID_CONTENTS, A)), o.ADD_FORBID_CONTENTS && (v === It && (v = k(v)), m(v, o.ADD_FORBID_CONTENTS, A)), Dt && (_["#text"] = !0), B && m(_, ["html", "head", "body"]), _.table && (m(_, ["tbody"]), delete Q.tbody), o.TRUSTED_TYPES_POLICY) {
        if (typeof o.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw it('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof o.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw it('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        C = o.TRUSTED_TYPES_POLICY, J = C.createHTML("");
      } else
        C === void 0 && (C = Dn(F, i)), C !== null && typeof J == "string" && (J = C.createHTML(""));
      L && L(o), K = o;
    }
  }, me = m({}, [...Gt, ...$t, ..._n]), he = m({}, [...Bt, ...bn]), ln = function(o) {
    let a = lt(o);
    (!a || !a.tagName) && (a = {
      namespaceURI: q,
      tagName: "template"
    });
    const l = _t(o.tagName), T = _t(a.tagName);
    return xt[o.namespaceURI] ? o.namespaceURI === ht ? a.namespaceURI === U ? l === "svg" : a.namespaceURI === mt ? l === "svg" && (T === "annotation-xml" || dt[T]) : !!me[l] : o.namespaceURI === mt ? a.namespaceURI === U ? l === "math" : a.namespaceURI === ht ? l === "math" && Tt[T] : !!he[l] : o.namespaceURI === U ? a.namespaceURI === ht && !Tt[T] || a.namespaceURI === mt && !dt[T] ? !1 : !he[l] && (sn[l] || !me[l]) : !!(et === "application/xhtml+xml" && xt[o.namespaceURI]) : !1;
  }, x = function(o) {
    nt(t.removed, {
      element: o
    });
    try {
      lt(o).removeChild(o);
    } catch {
      je(o);
    }
  }, W = function(o, a) {
    try {
      nt(t.removed, {
        attribute: a.getAttributeNode(o),
        from: a
      });
    } catch {
      nt(t.removed, {
        attribute: null,
        from: a
      });
    }
    if (a.removeAttribute(o), o === "is")
      if (V || ut)
        try {
          x(a);
        } catch {
        }
      else
        try {
          a.setAttribute(o, "");
        } catch {
        }
  }, de = function(o) {
    let a = null, l = null;
    if (wt)
      o = "<remove></remove>" + o;
    else {
      const g = zt(o, /^[\r\n\t ]+/);
      l = g && g[0];
    }
    et === "application/xhtml+xml" && q === U && (o = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + o + "</body></html>");
    const T = C ? C.createHTML(o) : o;
    if (q === U)
      try {
        a = new G().parseFromString(T, et);
      } catch {
      }
    if (!a || !a.documentElement) {
      a = yt.createDocument(q, "template", null);
      try {
        a.documentElement.innerHTML = vt ? J : T;
      } catch {
      }
    }
    const R = a.body || a.documentElement;
    return o && l && R.insertBefore(e.createTextNode(l), R.childNodes[0] || null), q === U ? Ke.call(a, B ? "html" : "body")[0] : B ? a.documentElement : R;
  }, Te = function(o) {
    return Xe.call(
      o.ownerDocument || o,
      o,
      // eslint-disable-next-line no-bitwise
      p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION,
      null
    );
  }, Ft = function(o) {
    return o instanceof b && (typeof o.nodeName != "string" || typeof o.textContent != "string" || typeof o.removeChild != "function" || !(o.attributes instanceof d) || typeof o.removeAttribute != "function" || typeof o.setAttribute != "function" || typeof o.namespaceURI != "string" || typeof o.insertBefore != "function" || typeof o.hasChildNodes != "function");
  }, Ee = function(o) {
    return typeof h == "function" && o instanceof h;
  };
  function H(f, o, a) {
    Et(f, (l) => {
      l.call(t, o, a, K);
    });
  }
  const ge = function(o) {
    let a = null;
    if (H(N.beforeSanitizeElements, o, null), Ft(o))
      return x(o), !0;
    const l = A(o.nodeName);
    if (H(N.uponSanitizeElement, o, {
      tagName: l,
      allowedTags: _
    }), ft && o.hasChildNodes() && !Ee(o.firstElementChild) && O(/<[/\w!]/g, o.innerHTML) && O(/<[/\w!]/g, o.textContent) || o.nodeType === rt.progressingInstruction || ft && o.nodeType === rt.comment && O(/<[/\w]/g, o.data))
      return x(o), !0;
    if (!(j.tagCheck instanceof Function && j.tagCheck(l)) && (!_[l] || Q[l])) {
      if (!Q[l] && _e(l) && (E.tagNameCheck instanceof RegExp && O(E.tagNameCheck, l) || E.tagNameCheck instanceof Function && E.tagNameCheck(l)))
        return !1;
      if (Dt && !v[l]) {
        const T = lt(o) || o.parentNode, R = Ve(o) || o.childNodes;
        if (R && T) {
          const g = R.length;
          for (let w = g - 1; w >= 0; --w) {
            const z = We(R[w], !0);
            z.__removalCount = (o.__removalCount || 0) + 1, T.insertBefore(z, Ye(o));
          }
        }
      }
      return x(o), !0;
    }
    return o instanceof u && !ln(o) || (l === "noscript" || l === "noembed" || l === "noframes") && O(/<\/no(script|embed|frames)/i, o.innerHTML) ? (x(o), !0) : (Y && o.nodeType === rt.text && (a = o.textContent, Et([Rt, Ct, Nt], (T) => {
      a = ot(a, T, " ");
    }), o.textContent !== a && (nt(t.removed, {
      element: o.cloneNode()
    }), o.textContent = a)), H(N.afterSanitizeElements, o, null), !1);
  }, Ae = function(o, a, l) {
    if (ae && (a === "id" || a === "name") && (l in e || l in cn))
      return !1;
    if (!(Lt && !Ot[a] && O(Je, a))) {
      if (!(ie && O(Qe, a))) {
        if (!(j.attributeCheck instanceof Function && j.attributeCheck(a, o))) {
          if (!S[a] || Ot[a]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(_e(o) && (E.tagNameCheck instanceof RegExp && O(E.tagNameCheck, o) || E.tagNameCheck instanceof Function && E.tagNameCheck(o)) && (E.attributeNameCheck instanceof RegExp && O(E.attributeNameCheck, a) || E.attributeNameCheck instanceof Function && E.attributeNameCheck(a, o)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              a === "is" && E.allowCustomizedBuiltInElements && (E.tagNameCheck instanceof RegExp && O(E.tagNameCheck, l) || E.tagNameCheck instanceof Function && E.tagNameCheck(l)))
            ) return !1;
          } else if (!Pt[a]) {
            if (!O(ee, ot(l, te, ""))) {
              if (!((a === "src" || a === "xlink:href" || a === "href") && o !== "script" && Tn(l, "data:") === 0 && le[o])) {
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
  }, _e = function(o) {
    return o !== "annotation-xml" && zt(o, en);
  }, be = function(o) {
    H(N.beforeSanitizeAttributes, o, null);
    const {
      attributes: a
    } = o;
    if (!a || Ft(o))
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
      const R = a[T], {
        name: g,
        namespaceURI: w,
        value: z
      } = R, Z = A(g), Ut = z;
      let y = g === "value" ? Ut : En(Ut);
      if (l.attrName = Z, l.attrValue = y, l.keepAttr = !0, l.forceKeepAttr = void 0, H(N.uponSanitizeAttribute, o, l), y = l.attrValue, ce && (Z === "id" || Z === "name") && (W(g, o), y = nn + y), ft && O(/((--!?|])>)|<\/(style|title|textarea)/i, y)) {
        W(g, o);
        continue;
      }
      if (Z === "attributename" && zt(y, "href")) {
        W(g, o);
        continue;
      }
      if (l.forceKeepAttr)
        continue;
      if (!l.keepAttr) {
        W(g, o);
        continue;
      }
      if (!re && O(/\/>/i, y)) {
        W(g, o);
        continue;
      }
      Y && Et([Rt, Ct, Nt], (ye) => {
        y = ot(y, ye, " ");
      });
      const Se = A(o.nodeName);
      if (!Ae(Se, Z, y)) {
        W(g, o);
        continue;
      }
      if (C && typeof F == "object" && typeof F.getAttributeType == "function" && !w)
        switch (F.getAttributeType(Se, Z)) {
          case "TrustedHTML": {
            y = C.createHTML(y);
            break;
          }
          case "TrustedScriptURL": {
            y = C.createScriptURL(y);
            break;
          }
        }
      if (y !== Ut)
        try {
          w ? o.setAttributeNS(w, g, y) : o.setAttribute(g, y), Ft(o) ? x(o) : Ce(t.removed);
        } catch {
          W(g, o);
        }
    }
    H(N.afterSanitizeAttributes, o, null);
  }, fn = function f(o) {
    let a = null;
    const l = Te(o);
    for (H(N.beforeSanitizeShadowDOM, o, null); a = l.nextNode(); )
      H(N.uponSanitizeShadowNode, a, null), ge(a), be(a), a.content instanceof r && f(a.content);
    H(N.afterSanitizeShadowDOM, o, null);
  };
  return t.sanitize = function(f) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, l = null, T = null, R = null;
    if (vt = !f, vt && (f = "<!-->"), typeof f != "string" && !Ee(f))
      if (typeof f.toString == "function") {
        if (f = f.toString(), typeof f != "string")
          throw it("dirty is not a string, aborting");
      } else
        throw it("toString is not a function");
    if (!t.isSupported)
      return f;
    if (Mt || kt(o), t.removed = [], typeof f == "string" && (tt = !1), tt) {
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
        return C && pt ? C.createHTML(f) : f;
      if (a = de(f), !a)
        return V ? null : pt ? J : "";
    }
    a && wt && x(a.firstChild);
    const g = Te(tt ? f : a);
    for (; T = g.nextNode(); )
      ge(T), be(T), T.content instanceof r && fn(T.content);
    if (tt)
      return f;
    if (V) {
      if (ut)
        for (R = qe.call(a.ownerDocument); a.firstChild; )
          R.appendChild(a.firstChild);
      else
        R = a;
      return (S.shadowroot || S.shadowrootmode) && (R = Ze.call(n, R, !0)), R;
    }
    let w = B ? a.outerHTML : a.innerHTML;
    return B && _["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && O(xe, a.ownerDocument.doctype.name) && (w = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + w), Y && Et([Rt, Ct, Nt], (z) => {
      w = ot(w, z, " ");
    }), C && pt ? C.createHTML(w) : w;
  }, t.setConfig = function() {
    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    kt(f), Mt = !0;
  }, t.clearConfig = function() {
    K = null, Mt = !1;
  }, t.isValidAttribute = function(f, o, a) {
    K || kt({});
    const l = A(f), T = A(o);
    return Ae(l, T, a);
  }, t.addHook = function(f, o) {
    typeof o == "function" && nt(N[f], o);
  }, t.removeHook = function(f, o) {
    if (o !== void 0) {
      const a = hn(N[f], o);
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
  for (const n of t.split("."))
    e = e[n];
  return e;
}
function In(s, t, e) {
  const n = t.split("."), i = n.length - 1;
  let r = s;
  n.forEach((c, h) => {
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
  const { attrName: e } = t, n = e.toLowerCase();
  Pn.has(n) && (t.forceKeepAttr = !0);
});
class bt extends Error {
}
const vn = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, Ue = "a-zA-Z_$", xn = Ue + "0-9", ct = `[${Ue}][${xn}]*`, kn = /<!--\s*(.*?)\s*-->/, Fn = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, jt = new RegExp(`^this\\.${ct}$`), Yt = new RegExp(`this\\.${ct}(\\.${ct})*`, "g"), He = new RegExp(`this\\.${ct}(\\.${ct})*`), Un = /* @__PURE__ */ new Set(["class", "style"]), ze = 5;
function Hn(s) {
  return s instanceof HTMLButtonElement || s instanceof HTMLFieldSetElement || s instanceof HTMLInputElement || s instanceof HTMLSelectElement || s instanceof HTMLTextAreaElement || s instanceof D;
}
function Wn(s, t, e) {
  const n = document.createElement(s);
  if (t)
    for (const [i, r] of Object.entries(t))
      n.setAttribute(i, r);
  return e && (n.innerHTML = e), n;
}
const zn = (s) => s === String ? "" : s === Number ? 0 : s === Boolean ? !1 : s === Array ? [] : s === Object ? {} : void 0;
function St(s) {
  const t = [];
  let e = s.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...St(e.shadowRoot)), e.firstElementChild && t.push(...St(e)), e = e.nextElementSibling;
  return t;
}
const At = (s) => s.substring(ze).split(".")[0];
function Ge(s, t) {
  let e = s[0];
  return t.forEach((n, i) => {
    e += n + s[i + 1];
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
const Gn = (s) => s.replace(/<!--[\s\S]*?-->/g, "");
function $e(s, t, e, n) {
  return s.slice(0, t) + n + s.slice(t + e);
}
function $n(s) {
  let t = s.trim(), e = null;
  /^\s*<tr[\s>]/i.test(t) ? (t = `<table><tbody>${t}</tbody></table>`, e = "tbody") : /^\s*<(td|th)[\s>]/i.test(t) ? (t = `<table><tbody><tr>${t}</tr></tbody></table>`, e = "tr") : /^\s*<option[\s>]/i.test(t) ? (t = `<select>${t}</select>`, e = "select") : /^\s*<col[\s>]/i.test(t) && (t = `<table><colgroup>${t}</colgroup></table>`, e = "colgroup");
  const n = Fe.sanitize(t, {
    ADD_TAGS: ["#comment"],
    ALLOW_UNKNOWN_PROTOCOLS: !0,
    RETURN_DOM_FRAGMENT: !0
  });
  if (e) {
    const i = n.querySelector(e);
    if (i) return i.childNodes;
  }
  return n.childNodes;
}
function Vt(s) {
  const t = Number(s);
  if (isNaN(t)) throw new bt(`can't convert "${s}" to a number`);
  return t;
}
function Be(s, t, e) {
  const [n, i] = t.split(":");
  if (Jt(e))
    if (typeof e == "boolean") {
      e ? s.setAttribute(n, n) : s.removeAttribute(n);
      const r = D.getPropName(n);
      s[r] = e;
    } else {
      const r = s.getAttribute(t), c = String(e);
      r !== c && (s.setAttribute(n, c), n === "value" && Qt(s) && (s.value = c));
    }
  else {
    const r = D.getPropName(t);
    s[r] = e;
  }
}
function Xt(s, t, e) {
  const [n, i] = t.split(":");
  s instanceof CSSStyleRule ? s.style.setProperty(n, e) : (Be(s, n, e), n === "value" && Qt(s) && (s.value = e));
}
function Bn(s) {
  const t = /* @__PURE__ */ new Set();
  for (const n of St(s)) {
    const { localName: i } = n;
    i.includes("-") && t.add(i);
  }
  const e = [...t].map((n) => customElements.whenDefined(n));
  return Promise.all(e);
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
  attributeChangedCallback(t, e, n) {
    t === "disabled" && this.#d();
    const i = D.getPropName(t);
    if (this.#s(i)) {
      const r = this.#b(i, String(n));
      this[i] = r;
      const c = this.#c[i];
      c && this.setFormValue(c, String(r)), this.propertyChangedCallback(i, e, n);
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
      let i = t.html.trim();
      i.startsWith("<") || (i = `<span><!--${i}--></span>`), e.innerHTML = n + i;
    }
    await Bn(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, n) {
    this[e] = n;
  }
  connectedCallback() {
    this.#x(), this.#N(), this.#R().then(() => {
      this.hasAttribute("disabled") && this.#d(), requestAnimationFrame(() => {
        this.#y(this.shadowRoot), this.#T(this.shadowRoot), this.#C();
      });
    });
  }
  #C() {
    const t = this.#t, { properties: e } = t;
    for (const [n, { computed: i }] of Object.entries(e))
      i && (this[n] = this.#o(i));
  }
  #N() {
    const t = this.#t, { observedAttributes: e, properties: n } = t;
    for (const [i, r] of Object.entries(n))
      this.#O(i, r, e);
  }
  #O(t, e, n) {
    const i = D.getAttrName(t), r = this.hasAttribute(i);
    e.required && !r && this.#e(this, t, "is a required attribute");
    let c = e.value;
    this.hasOwnProperty(t) && (c = this[t], delete this[t]);
    const { type: h } = e, u = h === Boolean ? c || r : n.includes(i) && r ? this.#_(t, i) : c || zn(h), p = "#" + t;
    this[p] = u, e.computed && this.#D(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[p];
      },
      set(d) {
        h === Number && typeof d == "string" && (d = Vt(d));
        const b = this[p];
        if (d === b) return;
        this.#F(t, h, d), this[p] = d;
        const { state: G, stateProp: F } = this.#t.properties[t];
        F && In(G, F, d), this.#P(t), this.#I(t, h, d, i), this.#A(t), this.#v(t, d);
        const $ = this.#c[t];
        $ && this.setFormValue($, String(d)), this.propertyChangedCallback(t, b, d), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: b,
          value: d
        });
      }
    });
  }
  #d() {
    const t = this.hasAttribute("disabled"), e = St(this.shadowRoot);
    for (const n of e)
      Hn(n) && (n.disabled = t);
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
  #L(t) {
    const e = t instanceof D;
    for (const n of t.getAttributeNames()) {
      const i = t.getAttribute(n), r = this.#g(t, i);
      if (r) {
        const c = this[r];
        c === void 0 && this.#a(t, n, r), t[r] = c;
        let [h, u] = n.split(":");
        h === "value" && (u ? (t["on" + u] === void 0 && this.#e(t, n, "refers to an unsupported event name"), t.setAttribute(h, this[r])) : u = "change"), e && t.#u.set(
          D.getPropName(h),
          r
        );
      }
      this.#r(i, t, n);
    }
  }
  #o(t) {
    const e = new Function("return " + t).call(this);
    return Array.isArray(e) ? e.join("") : e;
  }
  #M(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: n } = t, i = n?.cssRules ?? [], r = Array.from(i);
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
      let n = "";
      if (at(t)) {
        this.#r(t.textContent, t);
        const i = t.textContent?.match(kn);
        i && (n = i[1]);
      } else {
        const i = Array.from(t.childNodes).find(
          (r) => r.nodeType === Node.COMMENT_NODE
        );
        i && (n = i.textContent?.trim() ?? "");
      }
      if (n) {
        const i = this.#g(t, n);
        i && at(t) ? t.textContent = this[i] : this.#r(n, t);
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
    const e = {}, n = t.split(",");
    for (const c of n) {
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
      let n = t[e];
      jt.test(n) && (n = this.#o(n)), this[e] = n;
    }
  }
  static getAttrName(t) {
    let e = D.#h.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), D.#h.set(t, e)), e;
  }
  static getPropName(t) {
    let e = D.#m.get(t);
    return e || (e = t.replace(/-([a-z])/g, (n, i) => i.toUpperCase()), D.#m.set(t, e)), e;
  }
  #w(t, e, n) {
    if (n.length !== 1) return;
    const [i] = n;
    if (!jt.test(i)) return;
    const r = Qt(t) || at(t);
    let [c, h] = (e ?? "").split(":");
    if (!(r && c === "value" || at(t))) return;
    h ? t["on" + h] === void 0 && this.#e(t, e, "refers to an unsupported event name") : h = "change";
    const p = At(i);
    t.addEventListener(h, (d) => {
      const { target: b } = d;
      if (!b) return;
      const G = b.value, { type: F } = this.#t.properties[p];
      this[p] = F === Number ? Vt(G) : G, this.#A(p);
    });
  }
  #s(t) {
    return !!this.#t.properties[t];
  }
  #T(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e)
      this.#L(n), n.firstElementChild || this.#M(n);
  }
  // formAssociated is only needed when the component is inside a form.
  #E() {
    if (this.#t.formAssociated || this.closest("form") === null) return;
    const t = this.#t.name;
    throw new bt(
      `inside form, class ${t} requires "static formAssociated = true;"`
    );
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(D.getAttrName);
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, n) {
  }
  #g(t, e) {
    if (!e || !jt.test(e)) return;
    const n = At(e);
    return this[n] === void 0 && this.#a(t, "", n), n;
  }
  #A(t) {
    const i = this.#t.propToExprsMap.get(t) || [];
    for (const r of i) {
      let c = this.#o(r);
      const h = this.#n.get(r) ?? [];
      for (const u of h)
        if (u instanceof HTMLElement)
          this.#S(u, c);
        else if (!(u instanceof CSSStyleRule)) {
          const { element: p, attrName: d } = u;
          p instanceof CSSStyleRule ? p.style.setProperty(d, c) : Xt(p, d, c);
        }
    }
  }
  static register() {
    const t = this.elementName();
    customElements.get(t) || customElements.define(t, this);
  }
  #D(t, e) {
    const { computed: n, uses: i } = e, r = this.#t.propToComputedMap;
    function c(u, p) {
      let d = r.get(u);
      d || (d = [], r.set(u, d)), d.push([t, p]);
    }
    const h = n.match(Yt) || [];
    for (const u of h) {
      const p = u.substring(ze);
      this[p] === void 0 && this.#a(null, t, p), typeof this[p] != "function" && c(p, n);
    }
    if (i)
      for (const u of i.split(","))
        c(u, n);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #r(t, e, n = void 0) {
    if (!t) return;
    const i = this.#p(e, n, t);
    if (!i) {
      const u = t.replaceAll("this..", "this.");
      n ? Xt(e, n, u) : "textContent" in e && (e.textContent = u);
      return;
    }
    const r = this.#t;
    i.forEach((u) => {
      const p = At(u);
      if (typeof this[p] == "function") return;
      const d = r.propToExprsMap;
      let b = d.get(p);
      b || (b = [], d.set(p, b)), b.includes(t) || b.push(t);
    });
    for (const [u, p] of this.#n.entries())
      for (const d of p) {
        const b = d instanceof HTMLElement || d instanceof CSSStyleRule ? d : d.element;
        b instanceof CSSStyleRule || b.isConnected || this.#n.set(
          u,
          p.filter((G) => G !== d)
        );
      }
    let c = this.#n.get(t);
    c || (c = [], this.#n.set(t, c)), c.push(n ? { element: e, attrName: n } : e), e instanceof HTMLElement && this.#w(e, n, i);
    const h = this.#o(t);
    n ? Xt(e, n, h) : this.#S(e, h);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !Jt(e) || (this.#i.set(t, e), this.#f?.setFormValue(this.#i));
  }
  #e(t, e, n) {
    const i = this.#t, r = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new bt(
      `component ${i.elementName()}` + (t ? `, element "${r}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${n}`
    );
  }
  #a(t, e, n) {
    this.#e(t, e, `refers to missing property "${n}"`);
  }
  #_(t, e) {
    return this.#b(t, this.getAttribute(e));
  }
  #b(t, e) {
    if (e?.match(Yt)) return e;
    const n = this.#t, { type: i } = n.properties[t];
    if (i || this.#e(null, t, "does not specify its type"), i === String) return e;
    if (i === Number) return Vt(e);
    if (i === Boolean)
      return e === "true" ? !0 : e === "false" || e === "null" ? !1 : (e && e !== t && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === t);
  }
  // Updates the matching attribute for a property if there is one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #I(t, e, n, i) {
    if (Jt(n) && this.hasAttribute(i)) {
      const r = e === Boolean ? this.hasAttribute(i) : this.#_(t, i);
      n !== r && Be(this, t, n);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #P(t) {
    const n = this.#t.propToComputedMap.get(t) || [];
    for (const [i, r] of n)
      this[i] = this.#o(r);
  }
  #S(t, e) {
    if (e === void 0) return;
    const n = t instanceof HTMLElement, i = typeof e;
    if (i !== "string" && i !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    ), t instanceof HTMLElement && at(t))
      t.value = e;
    else if (n && i === "string" && e.trim().startsWith("<")) {
      const r = $n(e);
      t.replaceChildren(...r), this.#y(t), this.#T(t);
    } else n && (t.textContent = e);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #v(t, e) {
    const n = this.#u.get(t);
    if (!n) return;
    const i = this.getRootNode();
    if (!(i instanceof ShadowRoot)) return;
    const { host: r } = i;
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
    for (const [n, i] of Object.entries(e))
      if (this.#s(i)) {
        const r = Ie(t, n);
        r !== void 0 && (this[i] = r);
        const c = this.#t.properties[i];
        c.state = t, c.stateProp = n;
      }
    t.addListener(this, e);
  }
  #x() {
    const t = this.#t, e = new Set(Object.keys(t.properties));
    for (const n of e)
      Un.has(n) && this.#e(
        null,
        "",
        `property "${n}" is not allowed because it is a reserved attribute`
      );
    for (const n of this.getAttributeNames())
      if (n !== "class" && n !== "id" && n !== "disabled" && !n.startsWith("on")) {
        if (n === "form-assoc") {
          this.#E();
          continue;
        }
        if (!e.has(D.getPropName(n))) {
          if (n === "name") {
            this.#E();
            continue;
          }
          this.#e(null, n, "is not a supported attribute");
        }
      }
  }
  #p(t, e, n) {
    const i = n.match(Yt);
    if (i)
      return i.forEach((r) => {
        const c = At(r);
        this[c] === void 0 && this.#a(t, e, c);
      }), i;
  }
  #k(t, e) {
    for (const [n, i] of Object.entries(e)) {
      let r = Ie(t, n);
      if (r === void 0)
        throw new bt(`invalid state path "${n}"`);
      r = this[i], this.#s(i) || this.#e(
        null,
        i,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #F(t, e, n) {
    if (n instanceof e) return;
    let i = typeof n;
    if (i === "object") {
      const { constructor: r } = n;
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
  #y(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e) {
      const i = [];
      for (const r of Array.from(n.attributes)) {
        const c = r.name;
        if (c.startsWith("on")) {
          let h = c.slice(2);
          h = h[0].toLowerCase() + h.slice(1).toLowerCase();
          const u = r.value;
          this.#p(n, c, u);
          let p;
          typeof this[u] == "function" ? p = (d) => this[u](d) : (this.#p(n, c, u), p = () => this.#o(u)), n.addEventListener(h, p), i.push(c);
        }
      }
      for (const r of i)
        n.removeAttribute(r);
    }
  }
}
function jn(s, ...t) {
  let e = Ge(s, t);
  for (; ; ) {
    const n = vn.exec(e);
    if (!n) break;
    const i = n[2];
    if (He.test(i)) {
      const r = n[1];
      if (!r.startsWith("--")) {
        const c = `--${r}: ${i};
      ${r}: var(--${r})`;
        e = $e(e, n.index, n[0].length, c);
      }
    }
  }
  return e;
}
function Yn(s, ...t) {
  let e = Ge(s, t);
  for (; ; ) {
    const n = Fn.exec(e);
    if (!n || n[1] === "style") break;
    const i = Gn(n[2]);
    if (He.test(i)) {
      const r = `<!-- ${i.trim()} -->`, c = n.index + n[0].indexOf(">") + 1;
      e = $e(e, c, i.length, r);
    }
  }
  return e;
}
export {
  D as Wrec,
  Wn as createElement,
  jn as css,
  Yn as html
};

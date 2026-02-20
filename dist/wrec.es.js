const {
  entries: Pe,
  setPrototypeOf: Re,
  isFrozen: un,
  getPrototypeOf: pn,
  getOwnPropertyDescriptor: mn
} = Object;
let {
  freeze: N,
  seal: D,
  create: qt
} = Object, {
  apply: Kt,
  construct: Zt
} = typeof Reflect < "u" && Reflect;
N || (N = function(t) {
  return t;
});
D || (D = function(t) {
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
const gt = w(Array.prototype.forEach), hn = w(Array.prototype.lastIndexOf), Ce = w(Array.prototype.pop), ot = w(Array.prototype.push), dn = w(Array.prototype.splice), bt = w(String.prototype.toLowerCase), Ht = w(String.prototype.toString), zt = w(String.prototype.match), it = w(String.prototype.replace), Tn = w(String.prototype.indexOf), En = w(String.prototype.trim), I = w(Object.prototype.hasOwnProperty), O = w(RegExp.prototype.test), st = gn(TypeError);
function w(s) {
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
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : bt;
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
    I(s, t) || (s[t] = null);
  return s;
}
function v(s) {
  const t = qt(null);
  for (const [e, n] of Pe(s))
    I(s, e) && (Array.isArray(n) ? t[e] = An(n) : n && typeof n == "object" && n.constructor === Object ? t[e] = v(n) : t[e] = n);
  return t;
}
function rt(s, t) {
  for (; s !== null; ) {
    const n = mn(s, t);
    if (n) {
      if (n.get)
        return w(n.get);
      if (typeof n.value == "function")
        return w(n.value);
    }
    s = pn(s);
  }
  function e() {
    return null;
  }
  return e;
}
const Me = N(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Gt = N(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), $t = N(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), _n = N(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Wt = N(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), bn = N(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Oe = N(["#text"]), Ne = N(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Bt = N(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), we = N(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), At = N(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Sn = D(/\{\{[\w\W]*|[\w\W]*\}\}/gm), yn = D(/<%[\w\W]*|[\w\W]*%>/gm), Rn = D(/\$\{[\w\W]*/gm), Cn = D(/^data-[\-\w.\u00B7-\uFFFF]+$/), Mn = D(/^aria-[\-\w]+$/), xe = D(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), On = D(/^(?:\w+script|data):/i), Nn = D(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ve = D(/^html$/i), wn = D(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Le = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Mn,
  ATTR_WHITESPACE: Nn,
  CUSTOM_ELEMENT: wn,
  DATA_ATTR: Cn,
  DOCTYPE_NAME: ve,
  ERB_EXPR: yn,
  IS_ALLOWED_URI: xe,
  IS_SCRIPT_OR_DATA: On,
  MUSTACHE_EXPR: Sn,
  TMPLIT_EXPR: Rn
});
const at = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Ln = function() {
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
  let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ln();
  const t = (f) => ke(f);
  if (t.version = "3.3.1", t.removed = [], !s || !s.document || s.document.nodeType !== at.document || !s.Element)
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
  } = s, $ = u.prototype, Be = rt($, "cloneNode"), je = rt($, "remove"), Ye = rt($, "nextSibling"), Ve = rt($, "childNodes"), ft = rt($, "parentNode");
  if (typeof c == "function") {
    const f = e.createElement("template");
    f.content && f.content.ownerDocument && (e = f.content.ownerDocument);
  }
  let C, Q = "";
  const {
    implementation: yt,
    createNodeIterator: Xe,
    createDocumentFragment: qe,
    getElementsByTagName: Ke
  } = e, {
    importNode: Ze
  } = n;
  let M = De();
  t.isSupported = typeof Pe == "function" && typeof ft == "function" && yt && yt.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Rt,
    ERB_EXPR: Ct,
    TMPLIT_EXPR: Mt,
    DATA_ATTR: Je,
    ARIA_ATTR: Qe,
    IS_SCRIPT_OR_DATA: tn,
    ATTR_WHITESPACE: te,
    CUSTOM_ELEMENT: en
  } = Le;
  let {
    IS_ALLOWED_URI: ee
  } = Le, _ = null;
  const ne = m({}, [...Me, ...Gt, ...$t, ...Wt, ...Oe]);
  let S = null;
  const oe = m({}, [...Ne, ...Bt, ...we, ...At]);
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
  })), tt = null, Ot = null;
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
  let ie = !0, Nt = !0, se = !1, re = !0, Y = !1, ut = !0, W = !1, wt = !1, Lt = !1, V = !1, pt = !1, mt = !1, ae = !0, ce = !1;
  const nn = "user-content-";
  let Dt = !0, et = !1, X = {}, P = null;
  const It = m({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let le = null;
  const fe = m({}, ["audio", "video", "img", "source", "image", "track"]);
  let Pt = null;
  const ue = m({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ht = "http://www.w3.org/1998/Math/MathML", dt = "http://www.w3.org/2000/svg", U = "http://www.w3.org/1999/xhtml";
  let q = U, xt = !1, vt = null;
  const on = m({}, [ht, dt, U], Ht);
  let Tt = m({}, ["mi", "mo", "mn", "ms", "mtext"]), Et = m({}, ["annotation-xml"]);
  const sn = m({}, ["title", "style", "font", "a", "script"]);
  let nt = null;
  const rn = ["application/xhtml+xml", "text/html"], an = "text/html";
  let A = null, K = null;
  const cn = e.createElement("form"), pe = function(o) {
    return o instanceof RegExp || o instanceof Function;
  }, kt = function() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(K && K === o)) {
      if ((!o || typeof o != "object") && (o = {}), o = v(o), nt = // eslint-disable-next-line unicorn/prefer-includes
      rn.indexOf(o.PARSER_MEDIA_TYPE) === -1 ? an : o.PARSER_MEDIA_TYPE, A = nt === "application/xhtml+xml" ? Ht : bt, _ = I(o, "ALLOWED_TAGS") ? m({}, o.ALLOWED_TAGS, A) : ne, S = I(o, "ALLOWED_ATTR") ? m({}, o.ALLOWED_ATTR, A) : oe, vt = I(o, "ALLOWED_NAMESPACES") ? m({}, o.ALLOWED_NAMESPACES, Ht) : on, Pt = I(o, "ADD_URI_SAFE_ATTR") ? m(v(ue), o.ADD_URI_SAFE_ATTR, A) : ue, le = I(o, "ADD_DATA_URI_TAGS") ? m(v(fe), o.ADD_DATA_URI_TAGS, A) : fe, P = I(o, "FORBID_CONTENTS") ? m({}, o.FORBID_CONTENTS, A) : It, tt = I(o, "FORBID_TAGS") ? m({}, o.FORBID_TAGS, A) : v({}), Ot = I(o, "FORBID_ATTR") ? m({}, o.FORBID_ATTR, A) : v({}), X = I(o, "USE_PROFILES") ? o.USE_PROFILES : !1, ie = o.ALLOW_ARIA_ATTR !== !1, Nt = o.ALLOW_DATA_ATTR !== !1, se = o.ALLOW_UNKNOWN_PROTOCOLS || !1, re = o.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Y = o.SAFE_FOR_TEMPLATES || !1, ut = o.SAFE_FOR_XML !== !1, W = o.WHOLE_DOCUMENT || !1, V = o.RETURN_DOM || !1, pt = o.RETURN_DOM_FRAGMENT || !1, mt = o.RETURN_TRUSTED_TYPE || !1, Lt = o.FORCE_BODY || !1, ae = o.SANITIZE_DOM !== !1, ce = o.SANITIZE_NAMED_PROPS || !1, Dt = o.KEEP_CONTENT !== !1, et = o.IN_PLACE || !1, ee = o.ALLOWED_URI_REGEXP || xe, q = o.NAMESPACE || U, Tt = o.MATHML_TEXT_INTEGRATION_POINTS || Tt, Et = o.HTML_INTEGRATION_POINTS || Et, E = o.CUSTOM_ELEMENT_HANDLING || {}, o.CUSTOM_ELEMENT_HANDLING && pe(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (E.tagNameCheck = o.CUSTOM_ELEMENT_HANDLING.tagNameCheck), o.CUSTOM_ELEMENT_HANDLING && pe(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (E.attributeNameCheck = o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), o.CUSTOM_ELEMENT_HANDLING && typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Y && (Nt = !1), pt && (V = !0), X && (_ = m({}, Oe), S = [], X.html === !0 && (m(_, Me), m(S, Ne)), X.svg === !0 && (m(_, Gt), m(S, Bt), m(S, At)), X.svgFilters === !0 && (m(_, $t), m(S, Bt), m(S, At)), X.mathMl === !0 && (m(_, Wt), m(S, we), m(S, At))), o.ADD_TAGS && (typeof o.ADD_TAGS == "function" ? j.tagCheck = o.ADD_TAGS : (_ === ne && (_ = v(_)), m(_, o.ADD_TAGS, A))), o.ADD_ATTR && (typeof o.ADD_ATTR == "function" ? j.attributeCheck = o.ADD_ATTR : (S === oe && (S = v(S)), m(S, o.ADD_ATTR, A))), o.ADD_URI_SAFE_ATTR && m(Pt, o.ADD_URI_SAFE_ATTR, A), o.FORBID_CONTENTS && (P === It && (P = v(P)), m(P, o.FORBID_CONTENTS, A)), o.ADD_FORBID_CONTENTS && (P === It && (P = v(P)), m(P, o.ADD_FORBID_CONTENTS, A)), Dt && (_["#text"] = !0), W && m(_, ["html", "head", "body"]), _.table && (m(_, ["tbody"]), delete tt.tbody), o.TRUSTED_TYPES_POLICY) {
        if (typeof o.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw st('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof o.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw st('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        C = o.TRUSTED_TYPES_POLICY, Q = C.createHTML("");
      } else
        C === void 0 && (C = Dn(F, i)), C !== null && typeof Q == "string" && (Q = C.createHTML(""));
      N && N(o), K = o;
    }
  }, me = m({}, [...Gt, ...$t, ..._n]), he = m({}, [...Wt, ...bn]), ln = function(o) {
    let a = ft(o);
    (!a || !a.tagName) && (a = {
      namespaceURI: q,
      tagName: "template"
    });
    const l = bt(o.tagName), T = bt(a.tagName);
    return vt[o.namespaceURI] ? o.namespaceURI === dt ? a.namespaceURI === U ? l === "svg" : a.namespaceURI === ht ? l === "svg" && (T === "annotation-xml" || Tt[T]) : !!me[l] : o.namespaceURI === ht ? a.namespaceURI === U ? l === "math" : a.namespaceURI === dt ? l === "math" && Et[T] : !!he[l] : o.namespaceURI === U ? a.namespaceURI === dt && !Et[T] || a.namespaceURI === ht && !Tt[T] ? !1 : !he[l] && (sn[l] || !me[l]) : !!(nt === "application/xhtml+xml" && vt[o.namespaceURI]) : !1;
  }, x = function(o) {
    ot(t.removed, {
      element: o
    });
    try {
      ft(o).removeChild(o);
    } catch {
      je(o);
    }
  }, B = function(o, a) {
    try {
      ot(t.removed, {
        attribute: a.getAttributeNode(o),
        from: a
      });
    } catch {
      ot(t.removed, {
        attribute: null,
        from: a
      });
    }
    if (a.removeAttribute(o), o === "is")
      if (V || pt)
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
    if (Lt)
      o = "<remove></remove>" + o;
    else {
      const g = zt(o, /^[\r\n\t ]+/);
      l = g && g[0];
    }
    nt === "application/xhtml+xml" && q === U && (o = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + o + "</body></html>");
    const T = C ? C.createHTML(o) : o;
    if (q === U)
      try {
        a = new G().parseFromString(T, nt);
      } catch {
      }
    if (!a || !a.documentElement) {
      a = yt.createDocument(q, "template", null);
      try {
        a.documentElement.innerHTML = xt ? Q : T;
      } catch {
      }
    }
    const R = a.body || a.documentElement;
    return o && l && R.insertBefore(e.createTextNode(l), R.childNodes[0] || null), q === U ? Ke.call(a, W ? "html" : "body")[0] : W ? a.documentElement : R;
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
    gt(f, (l) => {
      l.call(t, o, a, K);
    });
  }
  const ge = function(o) {
    let a = null;
    if (H(M.beforeSanitizeElements, o, null), Ft(o))
      return x(o), !0;
    const l = A(o.nodeName);
    if (H(M.uponSanitizeElement, o, {
      tagName: l,
      allowedTags: _
    }), ut && o.hasChildNodes() && !Ee(o.firstElementChild) && O(/<[/\w!]/g, o.innerHTML) && O(/<[/\w!]/g, o.textContent) || o.nodeType === at.progressingInstruction || ut && o.nodeType === at.comment && O(/<[/\w]/g, o.data))
      return x(o), !0;
    if (!(j.tagCheck instanceof Function && j.tagCheck(l)) && (!_[l] || tt[l])) {
      if (!tt[l] && _e(l) && (E.tagNameCheck instanceof RegExp && O(E.tagNameCheck, l) || E.tagNameCheck instanceof Function && E.tagNameCheck(l)))
        return !1;
      if (Dt && !P[l]) {
        const T = ft(o) || o.parentNode, R = Ve(o) || o.childNodes;
        if (R && T) {
          const g = R.length;
          for (let L = g - 1; L >= 0; --L) {
            const z = Be(R[L], !0);
            z.__removalCount = (o.__removalCount || 0) + 1, T.insertBefore(z, Ye(o));
          }
        }
      }
      return x(o), !0;
    }
    return o instanceof u && !ln(o) || (l === "noscript" || l === "noembed" || l === "noframes") && O(/<\/no(script|embed|frames)/i, o.innerHTML) ? (x(o), !0) : (Y && o.nodeType === at.text && (a = o.textContent, gt([Rt, Ct, Mt], (T) => {
      a = it(a, T, " ");
    }), o.textContent !== a && (ot(t.removed, {
      element: o.cloneNode()
    }), o.textContent = a)), H(M.afterSanitizeElements, o, null), !1);
  }, Ae = function(o, a, l) {
    if (ae && (a === "id" || a === "name") && (l in e || l in cn))
      return !1;
    if (!(Nt && !Ot[a] && O(Je, a))) {
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
            if (!O(ee, it(l, te, ""))) {
              if (!((a === "src" || a === "xlink:href" || a === "href") && o !== "script" && Tn(l, "data:") === 0 && le[o])) {
                if (!(se && !O(tn, it(l, te, "")))) {
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
    H(M.beforeSanitizeAttributes, o, null);
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
        namespaceURI: L,
        value: z
      } = R, Z = A(g), Ut = z;
      let y = g === "value" ? Ut : En(Ut);
      if (l.attrName = Z, l.attrValue = y, l.keepAttr = !0, l.forceKeepAttr = void 0, H(M.uponSanitizeAttribute, o, l), y = l.attrValue, ce && (Z === "id" || Z === "name") && (B(g, o), y = nn + y), ut && O(/((--!?|])>)|<\/(style|title|textarea)/i, y)) {
        B(g, o);
        continue;
      }
      if (Z === "attributename" && zt(y, "href")) {
        B(g, o);
        continue;
      }
      if (l.forceKeepAttr)
        continue;
      if (!l.keepAttr) {
        B(g, o);
        continue;
      }
      if (!re && O(/\/>/i, y)) {
        B(g, o);
        continue;
      }
      Y && gt([Rt, Ct, Mt], (ye) => {
        y = it(y, ye, " ");
      });
      const Se = A(o.nodeName);
      if (!Ae(Se, Z, y)) {
        B(g, o);
        continue;
      }
      if (C && typeof F == "object" && typeof F.getAttributeType == "function" && !L)
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
          L ? o.setAttributeNS(L, g, y) : o.setAttribute(g, y), Ft(o) ? x(o) : Ce(t.removed);
        } catch {
          B(g, o);
        }
    }
    H(M.afterSanitizeAttributes, o, null);
  }, fn = function f(o) {
    let a = null;
    const l = Te(o);
    for (H(M.beforeSanitizeShadowDOM, o, null); a = l.nextNode(); )
      H(M.uponSanitizeShadowNode, a, null), ge(a), be(a), a.content instanceof r && f(a.content);
    H(M.afterSanitizeShadowDOM, o, null);
  };
  return t.sanitize = function(f) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, l = null, T = null, R = null;
    if (xt = !f, xt && (f = "<!-->"), typeof f != "string" && !Ee(f))
      if (typeof f.toString == "function") {
        if (f = f.toString(), typeof f != "string")
          throw st("dirty is not a string, aborting");
      } else
        throw st("toString is not a function");
    if (!t.isSupported)
      return f;
    if (wt || kt(o), t.removed = [], typeof f == "string" && (et = !1), et) {
      if (f.nodeName) {
        const z = A(f.nodeName);
        if (!_[z] || tt[z])
          throw st("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (f instanceof h)
      a = de("<!---->"), l = a.ownerDocument.importNode(f, !0), l.nodeType === at.element && l.nodeName === "BODY" || l.nodeName === "HTML" ? a = l : a.appendChild(l);
    else {
      if (!V && !Y && !W && // eslint-disable-next-line unicorn/prefer-includes
      f.indexOf("<") === -1)
        return C && mt ? C.createHTML(f) : f;
      if (a = de(f), !a)
        return V ? null : mt ? Q : "";
    }
    a && Lt && x(a.firstChild);
    const g = Te(et ? f : a);
    for (; T = g.nextNode(); )
      ge(T), be(T), T.content instanceof r && fn(T.content);
    if (et)
      return f;
    if (V) {
      if (pt)
        for (R = qe.call(a.ownerDocument); a.firstChild; )
          R.appendChild(a.firstChild);
      else
        R = a;
      return (S.shadowroot || S.shadowrootmode) && (R = Ze.call(n, R, !0)), R;
    }
    let L = W ? a.outerHTML : a.innerHTML;
    return W && _["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && O(ve, a.ownerDocument.doctype.name) && (L = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + L), Y && gt([Rt, Ct, Mt], (z) => {
      L = it(L, z, " ");
    }), C && mt ? C.createHTML(L) : L;
  }, t.setConfig = function() {
    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    kt(f), wt = !0;
  }, t.clearConfig = function() {
    K = null, wt = !1;
  }, t.isValidAttribute = function(f, o, a) {
    K || kt({});
    const l = A(f), T = A(o);
    return Ae(l, T, a);
  }, t.addHook = function(f, o) {
    typeof o == "function" && ot(M[f], o);
  }, t.removeHook = function(f, o) {
    if (o !== void 0) {
      const a = hn(M[f], o);
      return a === -1 ? void 0 : dn(M[f], a, 1)[0];
    }
    return Ce(M[f]);
  }, t.removeHooks = function(f) {
    M[f] = [];
  }, t.removeAllHooks = function() {
    M = De();
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
class J extends Error {
}
const xn = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, Ue = "a-zA-Z_$", vn = Ue + "0-9", lt = `[${Ue}][${vn}]*`, kn = /<!--\s*(.*?)\s*-->/, Fn = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, jt = new RegExp(`^this\\.${lt}$`), Yt = new RegExp(`this\\.${lt}(\\.${lt})*`, "g"), He = new RegExp(`this\\.${lt}(\\.${lt})*`), Un = /* @__PURE__ */ new Set(["class", "style"]), ze = 5;
function Hn(s) {
  return s instanceof HTMLButtonElement || s instanceof HTMLFieldSetElement || s instanceof HTMLInputElement || s instanceof HTMLSelectElement || s instanceof HTMLTextAreaElement || s instanceof k;
}
function Bn(s, t, e) {
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
const _t = (s) => s.substring(ze).split(".")[0];
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
function ct(s) {
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
  if (isNaN(t)) throw new J(`can't convert "${s}" to a number`);
  return t;
}
function We(s, t, e) {
  const [n, i] = t.split(":");
  if (Jt(e))
    if (typeof e == "boolean") {
      e ? s.setAttribute(n, n) : s.removeAttribute(n);
      const r = k.getPropName(n);
      s[r] = e;
    } else {
      const r = s.getAttribute(t), c = String(e);
      r !== c && (s.setAttribute(n, c), n === "value" && Qt(s) && (s.value = c));
    }
  else {
    const r = k.getPropName(t);
    s[r] = e;
  }
}
function Xt(s, t, e) {
  const [n, i] = t.split(":");
  s instanceof CSSStyleRule ? s.style.setProperty(n, e) : (We(s, n, e), n === "value" && Qt(s) && (s.value = e));
}
async function Wn(s) {
  const t = /* @__PURE__ */ new Set();
  for (const n of St(s.content)) {
    const { localName: i } = n;
    i.includes("-") && t.add(i);
  }
  function e(n) {
    return new Promise((i, r) => {
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
class k extends HTMLElement {
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
  static define(t) {
    if (this.elementName = t, customElements.get(t))
      throw new J(`custom element ${t} is already defined`);
    customElements.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.attrToPropMap || (t.attrToPropMap = /* @__PURE__ */ new Map()), t.properties || (t.properties = {}), t.propToAttrMap || (t.propToExprsMap = /* @__PURE__ */ new Map()), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, n) {
    t === "disabled" && this.#m();
    const i = k.getPropName(t);
    if (this.#s(i)) {
      const r = this.#A(i, String(n));
      this[i] = r;
      const c = this.#c[i];
      c && this.setFormValue(c, String(r)), this.propertyChangedCallback(i, e, n);
    }
  }
  async #S() {
    const t = this.#t;
    let { template: e } = t;
    if (!e) {
      e = t.template = document.createElement("template");
      let n = `<style>
    :host([hidden]) { display: none; }`;
      t.css && (n += t.css), n += `</style>
`;
      let i = t.html.trim();
      if (!i) throw new J("static property html must be set");
      i.startsWith("<") || (i = `<span><!--${i}--></span>`), e.innerHTML = n + i;
    }
    await Wn(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, n) {
    this[e] = n;
  }
  connectedCallback() {
    this.#P(), this.#R(), this.#S().then(() => {
      this.hasAttribute("disabled") && this.#m(), this.#b(this.shadowRoot), this.#h(this.shadowRoot), this.#y();
    });
  }
  #y() {
    const t = this.#t, { properties: e } = t;
    for (const [n, { computed: i }] of Object.entries(e))
      i && (this[n] = this.#o(i));
  }
  #R() {
    const t = this.#t, { observedAttributes: e, properties: n } = t;
    for (const [i, r] of Object.entries(n))
      this.#C(i, r, e);
  }
  #C(t, e, n) {
    const i = k.getAttrName(t), r = this.hasAttribute(i);
    e.required && !r && this.#e(this, t, "is a required attribute");
    let c = e.value;
    this.hasOwnProperty(t) && (c = this[t], delete this[t]);
    const { type: h } = e, u = h === Boolean ? c || r : n.includes(i) && r ? this.#g(t, i) : c || zn(h), p = "#" + t;
    this[p] = u, e.computed && this.#w(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[p];
      },
      set(d) {
        h === Number && typeof d == "string" && (d = Vt(d));
        const b = this[p];
        if (d === b) return;
        this.#v(t, h, d), this[p] = d;
        const { state: G, stateProp: F } = this.#t.properties[t];
        F && In(G, F, d), this.#D(t), this.#L(t, h, d, i), this.#E(t), this.#I(t, d);
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
  #m() {
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
  #M(t) {
    const e = t instanceof k;
    for (const n of t.getAttributeNames()) {
      const i = t.getAttribute(n), r = this.#T(t, i);
      if (r) {
        const c = this[r];
        c === void 0 && this.#a(t, n, r), t[r] = c;
        let [h, u] = n.split(":");
        h === "value" && (u ? (t["on" + u] === void 0 && this.#e(t, n, "refers to an unsupported event name"), t.setAttribute(h, this[r])) : u = "change"), e && t.#u.set(
          k.getPropName(h),
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
  #O(t) {
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
      if (ct(t)) {
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
        const i = this.#T(t, n);
        i && ct(t) ? t.textContent = this[i] : this.#r(n, t);
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
    let e = this.propToAttrMap.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), this.propToAttrMap.set(t, e)), e;
  }
  static getPropName(t) {
    let e = this.attrToPropMap.get(t);
    return e || (e = t.replace(/-([a-z])/g, (n, i) => i.toUpperCase()), this.attrToPropMap.set(t, e)), e;
  }
  #N(t, e, n) {
    if (n.length !== 1) return;
    const [i] = n;
    if (!jt.test(i)) return;
    const r = Qt(t) || ct(t);
    let [c, h] = (e ?? "").split(":");
    if (!(r && c === "value" || ct(t))) return;
    h ? t["on" + h] === void 0 && this.#e(t, e, "refers to an unsupported event name") : h = "change";
    const p = _t(i);
    t.addEventListener(h, (d) => {
      const { target: b } = d;
      if (!b) return;
      const G = b.value, { type: F } = this.#t.properties[p];
      this[p] = F === Number ? Vt(G) : G, this.#E(p);
    });
  }
  #s(t) {
    return !!this.#t.properties[t];
  }
  #h(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e)
      this.#M(n), n.firstElementChild || this.#O(n);
  }
  // formAssociated is only needed when the component is inside a form.
  #d() {
    if (this.#t.formAssociated || this.closest("form") === null) return;
    const t = this.#t.name;
    throw new J(
      `inside form, class ${t} requires "static formAssociated = true;"`
    );
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(
      (e) => k.getAttrName(e)
    );
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, n) {
  }
  #T(t, e) {
    if (!e || !jt.test(e)) return;
    const n = _t(e);
    return this[n] === void 0 && this.#a(t, "", n), n;
  }
  #E(t) {
    const i = this.#t.propToExprsMap.get(t) || [];
    for (const r of i) {
      let c = this.#o(r);
      const h = this.#n.get(r) ?? [];
      for (const u of h)
        if (u instanceof HTMLElement)
          this.#_(u, c);
        else if (!(u instanceof CSSStyleRule)) {
          const { element: p, attrName: d } = u;
          p instanceof CSSStyleRule ? p.style.setProperty(d, c) : Xt(p, d, c);
        }
    }
  }
  #w(t, e) {
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
      const p = _t(u);
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
    c || (c = [], this.#n.set(t, c)), c.push(n ? { element: e, attrName: n } : e), e instanceof HTMLElement && this.#N(e, n, i);
    const h = this.#o(t);
    n ? Xt(e, n, h) : this.#_(e, h);
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
    const i = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new J(
      `component ${this.#t.elementName}` + (t ? `, element "${i}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${n}`
    );
  }
  #a(t, e, n) {
    this.#e(t, e, `refers to missing property "${n}"`);
  }
  #g(t, e) {
    return this.#A(t, this.getAttribute(e));
  }
  #A(t, e) {
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
  #L(t, e, n, i) {
    if (Jt(n) && this.hasAttribute(i)) {
      const r = e === Boolean ? this.hasAttribute(i) : this.#g(t, i);
      n !== r && We(this, t, n);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #D(t) {
    const n = this.#t.propToComputedMap.get(t) || [];
    for (const [i, r] of n)
      this[i] = this.#o(r);
  }
  #_(t, e) {
    if (e === void 0) return;
    const n = t instanceof HTMLElement, i = typeof e;
    if (i !== "string" && i !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    ), t instanceof HTMLElement && ct(t))
      t.value = e;
    else if (n && i === "string" && e.trim().startsWith("<")) {
      const r = $n(e);
      t.replaceChildren(...r), this.#b(t), this.#h(t);
    } else n && (t.textContent = e);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #I(t, e) {
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
    this.#x(t, e);
    for (const [n, i] of Object.entries(e))
      if (this.#s(i)) {
        const r = Ie(t, n);
        r !== void 0 && (this[i] = r);
        const c = this.#t.properties[i];
        c.state = t, c.stateProp = n;
      }
    t.addListener(this, e);
  }
  #P() {
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
          this.#d();
          continue;
        }
        if (!e.has(k.getPropName(n))) {
          if (n === "name") {
            this.#d();
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
        const c = _t(r);
        this[c] === void 0 && this.#a(t, e, c);
      }), i;
  }
  #x(t, e) {
    for (const [n, i] of Object.entries(e)) {
      let r = Ie(t, n);
      if (r === void 0)
        throw new J(`invalid state path "${n}"`);
      r = this[i], this.#s(i) || this.#e(
        null,
        i,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #v(t, e, n) {
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
  #b(t) {
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
    const n = xn.exec(e);
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
  k as Wrec,
  Bn as createElement,
  jn as css,
  Yn as html
};

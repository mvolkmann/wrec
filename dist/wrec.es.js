var Fr = (s) => {
  throw TypeError(s);
};
var Cn = (s, t, e) => t.has(s) || Fr("Cannot " + e);
var z = (s, t, e) => (Cn(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Pt = (s, t, e) => t.has(s) ? Fr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), Ee = (s, t, e, n) => (Cn(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e), Mr = (s, t, e) => (Cn(s, t, "access private method"), e);
const {
  entries: Po,
  setPrototypeOf: kr,
  isFrozen: gc,
  getPrototypeOf: dc,
  getOwnPropertyDescriptor: fc
} = Object;
let {
  freeze: At,
  seal: bt,
  create: Ms
} = Object, {
  apply: li,
  construct: ui
} = typeof Reflect < "u" && Reflect;
At || (At = function(t) {
  return t;
});
bt || (bt = function(t) {
  return t;
});
li || (li = function(t, e) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), r = 2; r < n; r++)
    i[r - 2] = arguments[r];
  return t.apply(e, i);
});
ui || (ui = function(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
    n[i - 1] = arguments[i];
  return new t(...n);
});
const Is = at(Array.prototype.forEach), pc = at(Array.prototype.lastIndexOf), Or = at(Array.prototype.pop), Ke = at(Array.prototype.push), mc = at(Array.prototype.splice), ks = at(String.prototype.toLowerCase), bn = at(String.prototype.toString), yn = at(String.prototype.match), He = at(String.prototype.replace), Sc = at(String.prototype.indexOf), Cc = at(String.prototype.trim), dt = at(Object.prototype.hasOwnProperty), rt = at(RegExp.prototype.test), We = bc(TypeError);
function at(s) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
      n[i - 1] = arguments[i];
    return li(s, t, n);
  };
}
function bc(s) {
  return function() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return ui(s, e);
  };
}
function T(s, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ks;
  kr && kr(s, null);
  let n = t.length;
  for (; n--; ) {
    let i = t[n];
    if (typeof i == "string") {
      const r = e(i);
      r !== i && (gc(t) || (t[n] = r), i = r);
    }
    s[i] = !0;
  }
  return s;
}
function yc(s) {
  for (let t = 0; t < s.length; t++)
    dt(s, t) || (s[t] = null);
  return s;
}
function Nt(s) {
  const t = Ms(null);
  for (const [e, n] of Po(s))
    dt(s, e) && (Array.isArray(n) ? t[e] = yc(n) : n && typeof n == "object" && n.constructor === Object ? t[e] = Nt(n) : t[e] = n);
  return t;
}
function Ye(s, t) {
  for (; s !== null; ) {
    const n = fc(s, t);
    if (n) {
      if (n.get)
        return at(n.get);
      if (typeof n.value == "function")
        return at(n.value);
    }
    s = dc(s);
  }
  function e() {
    return null;
  }
  return e;
}
const Qr = At(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), En = At(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), In = At(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Ec = At(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), wn = At(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Ic = At(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Lr = At(["#text"]), Gr = At(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Rn = At(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Kr = At(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ws = At(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), wc = bt(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Rc = bt(/<%[\w\W]*|[\w\W]*%>/gm), Bc = bt(/\$\{[\w\W]*/gm), Tc = bt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Dc = bt(/^aria-[\-\w]+$/), Zo = bt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), xc = bt(/^(?:\w+script|data):/i), Nc = bt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Vo = bt(/^html$/i), vc = bt(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Hr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Dc,
  ATTR_WHITESPACE: Nc,
  CUSTOM_ELEMENT: vc,
  DATA_ATTR: Tc,
  DOCTYPE_NAME: Vo,
  ERB_EXPR: Rc,
  IS_ALLOWED_URI: Zo,
  IS_SCRIPT_OR_DATA: xc,
  MUSTACHE_EXPR: wc,
  TMPLIT_EXPR: Bc
});
const Ue = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Fc = function() {
  return typeof window > "u" ? null : window;
}, Mc = function(t, e) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let n = null;
  const i = "data-tt-policy-suffix";
  e && e.hasAttribute(i) && (n = e.getAttribute(i));
  const r = "dompurify" + (n ? "#" + n : "");
  try {
    return t.createPolicy(r, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + r + " could not be created."), null;
  }
}, Wr = function() {
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
function Xo() {
  let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Fc();
  const t = (E) => Xo(E);
  if (t.version = "3.3.2", t.removed = [], !s || !s.document || s.document.nodeType !== Ue.document || !s.Element)
    return t.isSupported = !1, t;
  let {
    document: e
  } = s;
  const n = e, i = n.currentScript, {
    DocumentFragment: r,
    HTMLTemplateElement: o,
    Node: A,
    Element: c,
    NodeFilter: a,
    NamedNodeMap: u = s.NamedNodeMap || s.MozNamedAttrMap,
    HTMLFormElement: g,
    DOMParser: S,
    trustedTypes: b
  } = s, B = c.prototype, tt = Ye(B, "cloneNode"), Tt = Ye(B, "remove"), K = Ye(B, "nextSibling"), yt = Ye(B, "childNodes"), mt = Ye(B, "parentNode");
  if (typeof o == "function") {
    const E = e.createElement("template");
    E.content && E.content.ownerDocument && (e = E.content.ownerDocument);
  }
  let k, et = "";
  const {
    implementation: Y,
    createNodeIterator: Yt,
    createDocumentFragment: fe,
    getElementsByTagName: us
  } = e, {
    importNode: te
  } = n;
  let N = Wr();
  t.isSupported = typeof Po == "function" && typeof mt == "function" && Y && Y.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Ut,
    ERB_EXPR: _t,
    TMPLIT_EXPR: Oe,
    DATA_ATTR: hs,
    ARIA_ATTR: gs,
    IS_SCRIPT_OR_DATA: ds,
    ATTR_WHITESPACE: ee,
    CUSTOM_ELEMENT: ic
  } = Hr;
  let {
    IS_ALLOWED_URI: cr
  } = Hr, Z = null;
  const lr = T({}, [...Qr, ...En, ...In, ...wn, ...Lr]);
  let j = null;
  const ur = T({}, [...Gr, ...Rn, ...Kr, ...ws]);
  let G = Object.seal(Ms(null, {
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
  })), Qe = null, fs = null;
  const Jt = Object.seal(Ms(null, {
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
  let hr = !0, an = !0, gr = !1, dr = !0, pe = !1, ps = !0, se = !1, cn = !1, ln = !1, me = !1, ms = !1, Ss = !1, fr = !0, pr = !1;
  const rc = "user-content-";
  let un = !0, Le = !1, Se = {}, Dt = null;
  const hn = T({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let mr = null;
  const Sr = T({}, ["audio", "video", "img", "source", "image", "track"]);
  let gn = null;
  const Cr = T({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Cs = "http://www.w3.org/1998/Math/MathML", bs = "http://www.w3.org/2000/svg", Qt = "http://www.w3.org/1999/xhtml";
  let Ce = Qt, dn = !1, fn = null;
  const oc = T({}, [Cs, bs, Qt], bn);
  let ys = T({}, ["mi", "mo", "mn", "ms", "mtext"]), Es = T({}, ["annotation-xml"]);
  const Ac = T({}, ["title", "style", "font", "a", "script"]);
  let Ge = null;
  const ac = ["application/xhtml+xml", "text/html"], cc = "text/html";
  let U = null, be = null;
  const lc = e.createElement("form"), br = function(l) {
    return l instanceof RegExp || l instanceof Function;
  }, pn = function() {
    let l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(be && be === l)) {
      if ((!l || typeof l != "object") && (l = {}), l = Nt(l), Ge = // eslint-disable-next-line unicorn/prefer-includes
      ac.indexOf(l.PARSER_MEDIA_TYPE) === -1 ? cc : l.PARSER_MEDIA_TYPE, U = Ge === "application/xhtml+xml" ? bn : ks, Z = dt(l, "ALLOWED_TAGS") ? T({}, l.ALLOWED_TAGS, U) : lr, j = dt(l, "ALLOWED_ATTR") ? T({}, l.ALLOWED_ATTR, U) : ur, fn = dt(l, "ALLOWED_NAMESPACES") ? T({}, l.ALLOWED_NAMESPACES, bn) : oc, gn = dt(l, "ADD_URI_SAFE_ATTR") ? T(Nt(Cr), l.ADD_URI_SAFE_ATTR, U) : Cr, mr = dt(l, "ADD_DATA_URI_TAGS") ? T(Nt(Sr), l.ADD_DATA_URI_TAGS, U) : Sr, Dt = dt(l, "FORBID_CONTENTS") ? T({}, l.FORBID_CONTENTS, U) : hn, Qe = dt(l, "FORBID_TAGS") ? T({}, l.FORBID_TAGS, U) : Nt({}), fs = dt(l, "FORBID_ATTR") ? T({}, l.FORBID_ATTR, U) : Nt({}), Se = dt(l, "USE_PROFILES") ? l.USE_PROFILES : !1, hr = l.ALLOW_ARIA_ATTR !== !1, an = l.ALLOW_DATA_ATTR !== !1, gr = l.ALLOW_UNKNOWN_PROTOCOLS || !1, dr = l.ALLOW_SELF_CLOSE_IN_ATTR !== !1, pe = l.SAFE_FOR_TEMPLATES || !1, ps = l.SAFE_FOR_XML !== !1, se = l.WHOLE_DOCUMENT || !1, me = l.RETURN_DOM || !1, ms = l.RETURN_DOM_FRAGMENT || !1, Ss = l.RETURN_TRUSTED_TYPE || !1, ln = l.FORCE_BODY || !1, fr = l.SANITIZE_DOM !== !1, pr = l.SANITIZE_NAMED_PROPS || !1, un = l.KEEP_CONTENT !== !1, Le = l.IN_PLACE || !1, cr = l.ALLOWED_URI_REGEXP || Zo, Ce = l.NAMESPACE || Qt, ys = l.MATHML_TEXT_INTEGRATION_POINTS || ys, Es = l.HTML_INTEGRATION_POINTS || Es, G = l.CUSTOM_ELEMENT_HANDLING || {}, l.CUSTOM_ELEMENT_HANDLING && br(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (G.tagNameCheck = l.CUSTOM_ELEMENT_HANDLING.tagNameCheck), l.CUSTOM_ELEMENT_HANDLING && br(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (G.attributeNameCheck = l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), l.CUSTOM_ELEMENT_HANDLING && typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (G.allowCustomizedBuiltInElements = l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), pe && (an = !1), ms && (me = !0), Se && (Z = T({}, Lr), j = Ms(null), Se.html === !0 && (T(Z, Qr), T(j, Gr)), Se.svg === !0 && (T(Z, En), T(j, Rn), T(j, ws)), Se.svgFilters === !0 && (T(Z, In), T(j, Rn), T(j, ws)), Se.mathMl === !0 && (T(Z, wn), T(j, Kr), T(j, ws))), dt(l, "ADD_TAGS") || (Jt.tagCheck = null), dt(l, "ADD_ATTR") || (Jt.attributeCheck = null), l.ADD_TAGS && (typeof l.ADD_TAGS == "function" ? Jt.tagCheck = l.ADD_TAGS : (Z === lr && (Z = Nt(Z)), T(Z, l.ADD_TAGS, U))), l.ADD_ATTR && (typeof l.ADD_ATTR == "function" ? Jt.attributeCheck = l.ADD_ATTR : (j === ur && (j = Nt(j)), T(j, l.ADD_ATTR, U))), l.ADD_URI_SAFE_ATTR && T(gn, l.ADD_URI_SAFE_ATTR, U), l.FORBID_CONTENTS && (Dt === hn && (Dt = Nt(Dt)), T(Dt, l.FORBID_CONTENTS, U)), l.ADD_FORBID_CONTENTS && (Dt === hn && (Dt = Nt(Dt)), T(Dt, l.ADD_FORBID_CONTENTS, U)), un && (Z["#text"] = !0), se && T(Z, ["html", "head", "body"]), Z.table && (T(Z, ["tbody"]), delete Qe.tbody), l.TRUSTED_TYPES_POLICY) {
        if (typeof l.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw We('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof l.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw We('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        k = l.TRUSTED_TYPES_POLICY, et = k.createHTML("");
      } else
        k === void 0 && (k = Mc(b, i)), k !== null && typeof et == "string" && (et = k.createHTML(""));
      At && At(l), be = l;
    }
  }, yr = T({}, [...En, ...In, ...Ec]), Er = T({}, [...wn, ...Ic]), uc = function(l) {
    let f = mt(l);
    (!f || !f.tagName) && (f = {
      namespaceURI: Ce,
      tagName: "template"
    });
    const y = ks(l.tagName), O = ks(f.tagName);
    return fn[l.namespaceURI] ? l.namespaceURI === bs ? f.namespaceURI === Qt ? y === "svg" : f.namespaceURI === Cs ? y === "svg" && (O === "annotation-xml" || ys[O]) : !!yr[y] : l.namespaceURI === Cs ? f.namespaceURI === Qt ? y === "math" : f.namespaceURI === bs ? y === "math" && Es[O] : !!Er[y] : l.namespaceURI === Qt ? f.namespaceURI === bs && !Es[O] || f.namespaceURI === Cs && !ys[O] ? !1 : !Er[y] && (Ac[y] || !yr[y]) : !!(Ge === "application/xhtml+xml" && fn[l.namespaceURI]) : !1;
  }, xt = function(l) {
    Ke(t.removed, {
      element: l
    });
    try {
      mt(l).removeChild(l);
    } catch {
      Tt(l);
    }
  }, ne = function(l, f) {
    try {
      Ke(t.removed, {
        attribute: f.getAttributeNode(l),
        from: f
      });
    } catch {
      Ke(t.removed, {
        attribute: null,
        from: f
      });
    }
    if (f.removeAttribute(l), l === "is")
      if (me || ms)
        try {
          xt(f);
        } catch {
        }
      else
        try {
          f.setAttribute(l, "");
        } catch {
        }
  }, Ir = function(l) {
    let f = null, y = null;
    if (ln)
      l = "<remove></remove>" + l;
    else {
      const H = yn(l, /^[\r\n\t ]+/);
      y = H && H[0];
    }
    Ge === "application/xhtml+xml" && Ce === Qt && (l = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + l + "</body></html>");
    const O = k ? k.createHTML(l) : l;
    if (Ce === Qt)
      try {
        f = new S().parseFromString(O, Ge);
      } catch {
      }
    if (!f || !f.documentElement) {
      f = Y.createDocument(Ce, "template", null);
      try {
        f.documentElement.innerHTML = dn ? et : O;
      } catch {
      }
    }
    const st = f.body || f.documentElement;
    return l && y && st.insertBefore(e.createTextNode(y), st.childNodes[0] || null), Ce === Qt ? us.call(f, se ? "html" : "body")[0] : se ? f.documentElement : st;
  }, wr = function(l) {
    return Yt.call(
      l.ownerDocument || l,
      l,
      // eslint-disable-next-line no-bitwise
      a.SHOW_ELEMENT | a.SHOW_COMMENT | a.SHOW_TEXT | a.SHOW_PROCESSING_INSTRUCTION | a.SHOW_CDATA_SECTION,
      null
    );
  }, mn = function(l) {
    return l instanceof g && (typeof l.nodeName != "string" || typeof l.textContent != "string" || typeof l.removeChild != "function" || !(l.attributes instanceof u) || typeof l.removeAttribute != "function" || typeof l.setAttribute != "function" || typeof l.namespaceURI != "string" || typeof l.insertBefore != "function" || typeof l.hasChildNodes != "function");
  }, Rr = function(l) {
    return typeof A == "function" && l instanceof A;
  };
  function Lt(E, l, f) {
    Is(E, (y) => {
      y.call(t, l, f, be);
    });
  }
  const Br = function(l) {
    let f = null;
    if (Lt(N.beforeSanitizeElements, l, null), mn(l))
      return xt(l), !0;
    const y = U(l.nodeName);
    if (Lt(N.uponSanitizeElement, l, {
      tagName: y,
      allowedTags: Z
    }), ps && l.hasChildNodes() && !Rr(l.firstElementChild) && rt(/<[/\w!]/g, l.innerHTML) && rt(/<[/\w!]/g, l.textContent) || l.nodeType === Ue.progressingInstruction || ps && l.nodeType === Ue.comment && rt(/<[/\w]/g, l.data))
      return xt(l), !0;
    if (!(Jt.tagCheck instanceof Function && Jt.tagCheck(y)) && (!Z[y] || Qe[y])) {
      if (!Qe[y] && Dr(y) && (G.tagNameCheck instanceof RegExp && rt(G.tagNameCheck, y) || G.tagNameCheck instanceof Function && G.tagNameCheck(y)))
        return !1;
      if (un && !Dt[y]) {
        const O = mt(l) || l.parentNode, st = yt(l) || l.childNodes;
        if (st && O) {
          const H = st.length;
          for (let lt = H - 1; lt >= 0; --lt) {
            const Gt = tt(st[lt], !0);
            Gt.__removalCount = (l.__removalCount || 0) + 1, O.insertBefore(Gt, K(l));
          }
        }
      }
      return xt(l), !0;
    }
    return l instanceof c && !uc(l) || (y === "noscript" || y === "noembed" || y === "noframes") && rt(/<\/no(script|embed|frames)/i, l.innerHTML) ? (xt(l), !0) : (pe && l.nodeType === Ue.text && (f = l.textContent, Is([Ut, _t, Oe], (O) => {
      f = He(f, O, " ");
    }), l.textContent !== f && (Ke(t.removed, {
      element: l.cloneNode()
    }), l.textContent = f)), Lt(N.afterSanitizeElements, l, null), !1);
  }, Tr = function(l, f, y) {
    if (fs[f] || fr && (f === "id" || f === "name") && (y in e || y in lc))
      return !1;
    if (!(an && !fs[f] && rt(hs, f))) {
      if (!(hr && rt(gs, f))) {
        if (!(Jt.attributeCheck instanceof Function && Jt.attributeCheck(f, l))) {
          if (!j[f] || fs[f]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Dr(l) && (G.tagNameCheck instanceof RegExp && rt(G.tagNameCheck, l) || G.tagNameCheck instanceof Function && G.tagNameCheck(l)) && (G.attributeNameCheck instanceof RegExp && rt(G.attributeNameCheck, f) || G.attributeNameCheck instanceof Function && G.attributeNameCheck(f, l)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              f === "is" && G.allowCustomizedBuiltInElements && (G.tagNameCheck instanceof RegExp && rt(G.tagNameCheck, y) || G.tagNameCheck instanceof Function && G.tagNameCheck(y)))
            ) return !1;
          } else if (!gn[f]) {
            if (!rt(cr, He(y, ee, ""))) {
              if (!((f === "src" || f === "xlink:href" || f === "href") && l !== "script" && Sc(y, "data:") === 0 && mr[l])) {
                if (!(gr && !rt(ds, He(y, ee, "")))) {
                  if (y)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Dr = function(l) {
    return l !== "annotation-xml" && yn(l, ic);
  }, xr = function(l) {
    Lt(N.beforeSanitizeAttributes, l, null);
    const {
      attributes: f
    } = l;
    if (!f || mn(l))
      return;
    const y = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: j,
      forceKeepAttr: void 0
    };
    let O = f.length;
    for (; O--; ) {
      const st = f[O], {
        name: H,
        namespaceURI: lt,
        value: Gt
      } = st, ye = U(H), Sn = Gt;
      let q = H === "value" ? Sn : Cc(Sn);
      if (y.attrName = ye, y.attrValue = q, y.keepAttr = !0, y.forceKeepAttr = void 0, Lt(N.uponSanitizeAttribute, l, y), q = y.attrValue, pr && (ye === "id" || ye === "name") && (ne(H, l), q = rc + q), ps && rt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, q)) {
        ne(H, l);
        continue;
      }
      if (ye === "attributename" && yn(q, "href")) {
        ne(H, l);
        continue;
      }
      if (y.forceKeepAttr)
        continue;
      if (!y.keepAttr) {
        ne(H, l);
        continue;
      }
      if (!dr && rt(/\/>/i, q)) {
        ne(H, l);
        continue;
      }
      pe && Is([Ut, _t, Oe], (vr) => {
        q = He(q, vr, " ");
      });
      const Nr = U(l.nodeName);
      if (!Tr(Nr, ye, q)) {
        ne(H, l);
        continue;
      }
      if (k && typeof b == "object" && typeof b.getAttributeType == "function" && !lt)
        switch (b.getAttributeType(Nr, ye)) {
          case "TrustedHTML": {
            q = k.createHTML(q);
            break;
          }
          case "TrustedScriptURL": {
            q = k.createScriptURL(q);
            break;
          }
        }
      if (q !== Sn)
        try {
          lt ? l.setAttributeNS(lt, H, q) : l.setAttribute(H, q), mn(l) ? xt(l) : Or(t.removed);
        } catch {
          ne(H, l);
        }
    }
    Lt(N.afterSanitizeAttributes, l, null);
  }, hc = function E(l) {
    let f = null;
    const y = wr(l);
    for (Lt(N.beforeSanitizeShadowDOM, l, null); f = y.nextNode(); )
      Lt(N.uponSanitizeShadowNode, f, null), Br(f), xr(f), f.content instanceof r && E(f.content);
    Lt(N.afterSanitizeShadowDOM, l, null);
  };
  return t.sanitize = function(E) {
    let l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, f = null, y = null, O = null, st = null;
    if (dn = !E, dn && (E = "<!-->"), typeof E != "string" && !Rr(E))
      if (typeof E.toString == "function") {
        if (E = E.toString(), typeof E != "string")
          throw We("dirty is not a string, aborting");
      } else
        throw We("toString is not a function");
    if (!t.isSupported)
      return E;
    if (cn || pn(l), t.removed = [], typeof E == "string" && (Le = !1), Le) {
      if (E.nodeName) {
        const Gt = U(E.nodeName);
        if (!Z[Gt] || Qe[Gt])
          throw We("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (E instanceof A)
      f = Ir("<!---->"), y = f.ownerDocument.importNode(E, !0), y.nodeType === Ue.element && y.nodeName === "BODY" || y.nodeName === "HTML" ? f = y : f.appendChild(y);
    else {
      if (!me && !pe && !se && // eslint-disable-next-line unicorn/prefer-includes
      E.indexOf("<") === -1)
        return k && Ss ? k.createHTML(E) : E;
      if (f = Ir(E), !f)
        return me ? null : Ss ? et : "";
    }
    f && ln && xt(f.firstChild);
    const H = wr(Le ? E : f);
    for (; O = H.nextNode(); )
      Br(O), xr(O), O.content instanceof r && hc(O.content);
    if (Le)
      return E;
    if (me) {
      if (ms)
        for (st = fe.call(f.ownerDocument); f.firstChild; )
          st.appendChild(f.firstChild);
      else
        st = f;
      return (j.shadowroot || j.shadowrootmode) && (st = te.call(n, st, !0)), st;
    }
    let lt = se ? f.outerHTML : f.innerHTML;
    return se && Z["!doctype"] && f.ownerDocument && f.ownerDocument.doctype && f.ownerDocument.doctype.name && rt(Vo, f.ownerDocument.doctype.name) && (lt = "<!DOCTYPE " + f.ownerDocument.doctype.name + `>
` + lt), pe && Is([Ut, _t, Oe], (Gt) => {
      lt = He(lt, Gt, " ");
    }), k && Ss ? k.createHTML(lt) : lt;
  }, t.setConfig = function() {
    let E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    pn(E), cn = !0;
  }, t.clearConfig = function() {
    be = null, cn = !1;
  }, t.isValidAttribute = function(E, l, f) {
    be || pn({});
    const y = U(E), O = U(l);
    return Tr(y, O, f);
  }, t.addHook = function(E, l) {
    typeof l == "function" && Ke(N[E], l);
  }, t.removeHook = function(E, l) {
    if (l !== void 0) {
      const f = pc(N[E], l);
      return f === -1 ? void 0 : mc(N[E], f, 1)[0];
    }
    return Or(N[E]);
  }, t.removeHooks = function(E) {
    N[E] = [];
  }, t.removeAllHooks = function() {
    N = Wr();
  }, t;
}
var jo = Xo();
const Ws = /* @__PURE__ */ Symbol("changed"), Re = /* @__PURE__ */ Symbol("classList"), Et = /* @__PURE__ */ Symbol("CustomElements"), Rs = /* @__PURE__ */ Symbol("content"), Bn = /* @__PURE__ */ Symbol("dataset"), ie = /* @__PURE__ */ Symbol("doctype"), hi = /* @__PURE__ */ Symbol("DOMParser"), w = /* @__PURE__ */ Symbol("end"), _e = /* @__PURE__ */ Symbol("EventTarget"), Os = /* @__PURE__ */ Symbol("globals"), It = /* @__PURE__ */ Symbol("image"), Ne = /* @__PURE__ */ Symbol("mime"), Vt = /* @__PURE__ */ Symbol("MutationObserver"), m = /* @__PURE__ */ Symbol("next"), qo = /* @__PURE__ */ Symbol("ownerElement"), X = /* @__PURE__ */ Symbol("prev"), nt = /* @__PURE__ */ Symbol("private"), Ie = /* @__PURE__ */ Symbol("sheet"), ut = /* @__PURE__ */ Symbol("start"), Tn = /* @__PURE__ */ Symbol("style"), qe = /* @__PURE__ */ Symbol("upgrade"), M = /* @__PURE__ */ Symbol("value");
var Dn;
const kc = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), Yr = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (Dn = String.fromCodePoint) !== null && Dn !== void 0 ? Dn : ((s) => {
    let t = "";
    return s > 65535 && (s -= 65536, t += String.fromCharCode(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), t += String.fromCharCode(s), t;
  })
);
function Oc(s) {
  var t;
  return s >= 55296 && s <= 57343 || s > 1114111 ? 65533 : (t = kc.get(s)) !== null && t !== void 0 ? t : s;
}
function zo(s) {
  const t = (
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    typeof atob == "function" ? (
      // Browser (and Node >=16)
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      atob(s)
    ) : (
      // Older Node versions (<16)
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      typeof Buffer.from == "function" ? (
        // eslint-disable-next-line n/no-unsupported-features/node-builtins
        Buffer.from(s, "base64").toString("binary")
      ) : (
        // eslint-disable-next-line unicorn/no-new-buffer, n/no-deprecated-api
        new Buffer(s, "base64").toString("binary")
      )
    )
  ), e = t.length & -2, n = new Uint16Array(e / 2);
  for (let i = 0, r = 0; i < e; i += 2) {
    const o = t.charCodeAt(i), A = t.charCodeAt(i + 1);
    n[r++] = o | A << 8;
  }
  return n;
}
const Qc = /* @__PURE__ */ zo("QR08ALkAAgH6AYsDNQR2BO0EPgXZBQEGLAbdBxMISQrvCmQLfQurDKQNLw4fD4YPpA+6D/IPAAAAAAAAAAAAAAAAKhBMEY8TmxUWF2EYLBkxGuAa3RsJHDscWR8YIC8jSCSIJcMl6ie3Ku8rEC0CLjoupS7kLgAIRU1hYmNmZ2xtbm9wcnN0dVQAWgBeAGUAaQBzAHcAfgCBAIQAhwCSAJoAoACsALMAbABpAGcAO4DGAMZAUAA7gCYAJkBjAHUAdABlADuAwQDBQHIiZXZlAAJhAAFpeW0AcgByAGMAO4DCAMJAEGRyAADgNdgE3XIAYQB2AGUAO4DAAMBA8CFoYZFj4SFjcgBhZAAAoFMqAAFncIsAjgBvAG4ABGFmAADgNdg43fAlbHlGdW5jdGlvbgCgYSBpAG4AZwA7gMUAxUAAAWNzpACoAHIAAOA12Jzc6SFnbgCgVCJpAGwAZABlADuAwwDDQG0AbAA7gMQAxEAABGFjZWZvcnN1xQDYANoA7QDxAPYA+QD8AAABY3LJAM8AayNzbGFzaAAAoBYidgHTANUAAKDnKmUAZAAAoAYjeQARZIABY3J0AOAA5QDrAGEidXNlAACgNSLuI291bGxpcwCgLCFhAJJjcgAA4DXYBd1wAGYAAOA12Dnd5SF2ZdhiYwDyAOoAbSJwZXEAAKBOIgAHSE9hY2RlZmhpbG9yc3UXARoBHwE6AVIBVQFiAWQBZgGCAakB6QHtAfIBYwB5ACdkUABZADuAqQCpQIABY3B5ACUBKAE1AfUhdGUGYWmg0iJ0KGFsRGlmZmVyZW50aWFsRAAAoEUhbCJleXMAAKAtIQACYWVpb0EBRAFKAU0B8iFvbgxhZABpAGwAO4DHAMdAcgBjAAhhbiJpbnQAAKAwIm8AdAAKYQABZG5ZAV0BaSJsbGEAuGB0I2VyRG90ALdg8gA5AWkAp2NyImNsZQAAAkRNUFRwAXQBeQF9AW8AdAAAoJkiaSJudXMAAKCWIuwhdXMAoJUiaSJtZXMAAKCXIm8AAAFjc4cBlAFrKndpc2VDb250b3VySW50ZWdyYWwAAKAyImUjQ3VybHkAAAFEUZwBpAFvJXVibGVRdW90ZQAAoB0gdSJvdGUAAKAZIAACbG5wdbABtgHNAdgBbwBuAGWgNyIAoHQqgAFnaXQAvAHBAcUB8iJ1ZW50AKBhIm4AdAAAoC8i7yV1ckludGVncmFsAKAuIgABZnLRAdMBAKACIe8iZHVjdACgECJuLnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbAAAoDMi7yFzcwCgLypjAHIAAOA12J7ccABDoNMiYQBwAACgTSKABURKU1phY2VmaW9zAAsCEgIVAhgCGwIsAjQCOQI9AnMCfwNvoEUh9CJyYWhkAKARKWMAeQACZGMAeQAFZGMAeQAPZIABZ3JzACECJQIoAuchZXIAoCEgcgAAoKEhaAB2AACg5CoAAWF5MAIzAvIhb24OYRRkbAB0oAciYQCUY3IAAOA12AfdAAFhZkECawIAAWNtRQJnAvIjaXRpY2FsAAJBREdUUAJUAl8CYwJjInV0ZQC0YG8AdAFZAloC2WJiJGxlQWN1dGUA3WJyImF2ZQBgYGkibGRlANxi7yFuZACgxCJmJWVyZW50aWFsRAAAoEYhcAR9AgAAAAAAAIECjgIAABoDZgAA4DXYO91EoagAhQKJAm8AdAAAoNwgcSJ1YWwAAKBQIuIhbGUAA0NETFJVVpkCqAK1Au8C/wIRA28AbgB0AG8AdQByAEkAbgB0AGUAZwByAGEA7ADEAW8AdAKvAgAAAACwAqhgbiNBcnJvdwAAoNMhAAFlb7kC0AJmAHQAgAFBUlQAwQLGAs0CciJyb3cAAKDQIekkZ2h0QXJyb3cAoNQhZQDlACsCbgBnAAABTFLWAugC5SFmdAABQVLcAuECciJyb3cAAKD4J+kkZ2h0QXJyb3cAoPon6SRnaHRBcnJvdwCg+SdpImdodAAAAUFU9gL7AnIicm93AACg0iFlAGUAAKCoInAAQQIGAwAAAAALA3Iicm93AACg0SFvJHduQXJyb3cAAKDVIWUlcnRpY2FsQmFyAACgJSJuAAADQUJMUlRhJAM2AzoDWgNxA3oDciJyb3cAAKGTIUJVLAMwA2EAcgAAoBMpcCNBcnJvdwAAoPUhciJldmUAEWPlIWZ00gJDAwAASwMAAFIDaSVnaHRWZWN0b3IAAKBQKWUkZVZlY3RvcgAAoF4p5SJjdG9yQqC9IWEAcgAAoFYpaSJnaHQA1AFiAwAAaQNlJGVWZWN0b3IAAKBfKeUiY3RvckKgwSFhAHIAAKBXKWUAZQBBoKQiciJyb3cAAKCnIXIAcgBvAPcAtAIAAWN0gwOHA3IA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YwAAoN8i4SFycnCgtiEAoD0pgKIqImJjZG9zACsVMBU6FT4VQRVyImNhcAAAoEgqAAFhdTQVNxVwAACgRipwAACgSipvAHQAAKCNInIAAKBFKgDgKiIA/gACYWxydksVURVuFXMVcgByAG2gtyEAoDwpeQCAAWV2dwBYFWUVaRVxAHACXxUAAAAAYxVyAGUA4wAXFXUA4wAZFWUAZQAAoM4iZSJkZ2UAAKDPImUAbgA7gKQApEBlI2Fycm93AAABbHJ7FX8V5SFmdACgtiFpImdodAAAoLchZQDkAG0VAAFjaYsVkRVvAG4AaQBuAPQAkwFuAHQAAKAxImwiY3R5AACgLSOACUFIYWJjZGVmaGlqbG9yc3R1d3oAuBW7Fb8V1RXgFegV+RUKFhUWHxZUFlcWZRbFFtsW7xb7FgUXChdyAPIAtAJhAHIAAKBlKQACZ2xyc8YVyhXOFdAV5yFlcgCgICDlIXRoAKA4IfIA9QxoAHagECAAoKMiawHZFd4VYSJyb3cAAKAPKWEA4wBfAgABYXnkFecV8iFvbg9hNGQAoUYhYW/tFfQVAAFnciEC8RVyAACgyiF0InNlcQAAoHcqgAFnbG0A/xUCFgUWO4CwALBAdABhALRjcCJ0eXYAAKCxKQABaXIOFhIW8yFodACgfykA4DXYId1hAHIAAAFschsWHRYAoMMhAKDCIYACYWVnc3YAKBauAjYWOhY+Fm0AAKHEIm9zLhY0Fm4AZABzoMQi9SFpdACgZiZhIm1tYQDdY2kAbgAAoPIiAKH3AGlvQxZRFmQAZQAAgfcAO29KFksW90BuI3RpbWVzAACgxyJuAPgAUBZjAHkAUmRjAG8CXhYAAAAAYhZyAG4AAKAeI28AcAAAoA0jgAJscHR1dwBuFnEWdRaSFp4W7CFhciRgZgAA4DXYVd0AotkCZW1wc30WhBaJFo0WcQBkoFAibwB0AACgUSJpIm51cwAAoDgi7CF1cwCgFCLxInVhcmUAoKEiYgBsAGUAYgBhAHIAdwBlAGQAZwDlANcAbgCAAWFkaAClFqoWtBZyAHIAbwD3APUMbwB3AG4AYQByAHIAbwB3APMA8xVhI3Jwb29uAAABbHK8FsAWZQBmAPQAHBZpAGcAaAD0AB4WYgHJFs8WawBhAHIAbwD3AJILbwLUFgAAAADYFnIAbgAAoB8jbwBwAACgDCOAAWNvdADhFukW7BYAAXJ55RboFgDgNdi53FVkbAAAoPYp8iFvaxFhAAFkcvMW9xZvAHQAAKDxImkA5qC/JVsSAAFhaP8WAhdyAPIANQNhAPIA1wvhIm5nbGUAoKYpAAFjaQ4XEBd5AF9k5yJyYXJyAKD/JwAJRGFjZGVmZ2xtbm9wcXJzdHV4MRc4F0YXWxcyBF4XaRd5F40XrBe0F78X2RcVGCEYLRg1GEAYAAFEbzUXgRZvAPQA+BUAAWNzPBdCF3UAdABlADuA6QDpQPQhZXIAoG4qAAJhaW95TRdQF1YXWhfyIW9uG2FyAGOgViI7gOoA6kDsIW9uAKBVIk1kbwB0ABdhAAFEcmIXZhdvAHQAAKBSIgDgNdgi3XKhmipuF3QXYQB2AGUAO4DoAOhAZKCWKm8AdAAAoJgqgKGZKmlscwCAF4UXhxfuInRlcnMAoOcjAKATIWSglSpvAHQAAKCXKoABYXBzAJMXlheiF2MAcgATYXQAeQBzogUinxcAAAAAoRdlAHQAAKAFInAAMaADIDMBqRerFwCgBCAAoAUgAAFnc7AXsRdLYXAAAKACIAABZ3C4F7sXbwBuABlhZgAA4DXYVt2AAWFscwDFF8sXzxdyAHOg1SJsAACg4yl1AHMAAKBxKmkAAKG1A2x21RfYF28AbgC1Y/VjAAJjc3V24BfoF/0XEBgAAWlv5BdWF3IAYwAAoFYiaQLuFwAAAADwF+0ADQThIW50AAFnbPUX+Rd0AHIAAKCWKuUhc3MAoJUqgAFhZWkAAxgGGAoYbABzAD1gcwB0AACgXyJ2AESgYSJEAACgeCrwImFyc2wAoOUpAAFEYRkYHRhvAHQAAKBTInIAcgAAoHEpgAFjZGkAJxgqGO0XcgAAoC8hbwD0AIwCAAFhaDEYMhi3YzuA8ADwQAABbXI5GD0YbAA7gOsA60BvAACgrCCAAWNpcABGGEgYSxhsACFgcwD0ACwEAAFlb08YVxhjAHQAYQB0AGkAbwDuABoEbgBlAG4AdABpAGEAbADlADME4Ql1GAAAgRgAAIMYiBgAAAAAoRilGAAAqhgAALsYvhjRGAAA1xgnGWwAbABpAG4AZwBkAG8AdABzAGUA8QBlF3kARGRtImFsZQAAoEAmgAFpbHIAjRiRGJ0Y7CFpZwCgA/tpApcYAAAAAJoYZwAAoAD7aQBnAACgBPsA4DXYI93sIWlnAKAB++whaWcA4GYAagCAAWFsdACvGLIYthh0AACgbSZpAGcAAKAC+24AcwAAoLElbwBmAJJh8AHCGAAAxhhmAADgNdhX3QABYWvJGMwYbADsAGsEdqDUIgCg2SphI3J0aW50AACgDSoAAWFv2hgiGQABY3PeGB8ZsQPnGP0YBRkSGRUZAAAdGbID7xjyGPQY9xj5GAAA+xg7gL0AvUAAoFMhO4C8ALxAAKBVIQCgWSEAoFshswEBGQAAAxkAoFQhAKBWIbQCCxkOGQAAAAAQGTuAvgC+QACgVyEAoFwhNQAAoFghtgEZGQAAGxkAoFohAKBdITgAAKBeIWwAAKBEIHcAbgAAoCIjYwByAADgNdi73IAIRWFiY2RlZmdpamxub3JzdHYARhlKGVoZXhlmGWkZkhmWGZkZnRmgGa0ZxhnLGc8Z4BkjGmygZyIAoIwqgAFjbXAAUBlTGVgZ9SF0ZfVhbQBhAOSgswM6FgCghipyImV2ZQAfYQABaXliGWUZcgBjAB1hM2RvAHQAIWGAoWUibHFzAMYEcBl6GfGhZSLOBAAAdhlsAGEAbgD0AN8EgKF+KmNkbACBGYQZjBljAACgqSpvAHQAb6CAKmyggioAoIQqZeDbIgD+cwAAoJQqcgAA4DXYJN3noGsirATtIWVsAKA3IWMAeQBTZIChdyJFYWoApxmpGasZAKCSKgCgpSoAoKQqAAJFYWVztBm2Gb0ZwhkAoGkicABwoIoq8iFveACgiipxoIgq8aCIKrUZaQBtAACg5yJwAGYAAOA12FjdYQB2AOUAYwIAAWNp0xnWGXIAAKAKIW0AAKFzImVs3BneGQCgjioAoJAqAIM+ADtjZGxxco0E6xn0GfgZ/BkBGgABY2nvGfEZAKCnKnIAAKB6Km8AdAAAoNci0CFhcgCglSl1ImVzdAAAoHwqgAJhZGVscwAKGvQZFhrVBCAa8AEPGgAAFBpwAHIAbwD4AFkZcgAAoHgpcQAAAWxxxAQbGmwAZQBzAPMASRlpAO0A5AQAAWVuJxouGnIjdG5lcXEAAOBpIgD+xQAsGgAFQWFiY2Vma29zeUAaQxpmGmoabRqDGocalhrCGtMacgDyAMwCAAJpbG1yShpOGlAaVBpyAHMA8ABxD2YAvWBpAGwA9AASBQABZHJYGlsaYwB5AEpkAKGUIWN3YBpkGmkAcgAAoEgpAKCtIWEAcgAAoA8h6SFyYyVhgAFhbHIAcxp7Gn8a8iF0c3WgZSZpAHQAAKBlJuwhaXAAoCYg4yFvbgCguSJyAADgNdgl3XMAAAFld4wakRphInJvdwAAoCUpYSJyb3cAAKAmKYACYW1vcHIAnxqjGqcauhq+GnIAcgAAoP8h9CFodACgOyJrAAABbHKsGrMaZSRmdGFycm93AACgqSHpJGdodGFycm93AKCqIWYAAOA12Fnd4iFhcgCgFSCAAWNsdADIGswa0BpyAADgNdi93GEAcwDoAGka8iFvaydhAAFicNca2xr1IWxsAKBDIOghZW4AoBAg4Qr2GgAA/RoAAAgbExsaGwAAIRs7GwAAAAA+G2IbmRuVG6sbAACyG80b0htjAHUAdABlADuA7QDtQAChYyBpeQEbBhtyAGMAO4DuAO5AOGQAAWN4CxsNG3kANWRjAGwAO4ChAKFAAAFmcssCFhsA4DXYJt1yAGEAdgBlADuA7ADsQIChSCFpbm8AJxsyGzYbAAFpbisbLxtuAHQAAKAMKnQAAKAtIuYhaW4AoNwpdABhAACgKSHsIWlnM2GAAWFvcABDG1sbXhuAAWNndABJG0sbWRtyACthgAFlbHAAcQVRG1UbaQBuAOUAyAVhAHIA9AByBWgAMWFmAACgtyJlAGQAtWEAoggiY2ZvdGkbbRt1G3kb4SFyZQCgBSFpAG4AdKAeImkAZQAAoN0pZABvAPQAWxsAoisiY2VscIEbhRuPG5QbYQBsAACguiIAAWdyiRuNG2UAcgDzACMQ4wCCG2EicmhrAACgFyryIW9kAKA8KgACY2dwdJ8boRukG6gbeQBRZG8AbgAvYWYAAOA12FrdYQC5Y3UAZQBzAHQAO4C/AL9AAAFjabUbuRtyAADgNdi+3G4AAKIIIkVkc3bCG8QbyBvQAwCg+SJvAHQAAKD1Inag9CIAoPMiaaBiIOwhZGUpYesB1hsAANkbYwB5AFZkbAA7gO8A70AAA2NmbW9zdeYb7hvyG/Ub+hsFHAABaXnqG+0bcgBjADVhOWRyAADgNdgn3eEhdGg3YnAAZgAA4DXYW93jAf8bAAADHHIAAOA12L/c8iFjeVhk6yFjeVRkAARhY2ZnaGpvcxUcGhwiHCYcKhwtHDAcNRzwIXBhdqC6A/BjAAFleR4cIRzkIWlsN2E6ZHIAAOA12CjdciJlZW4AOGFjAHkARWRjAHkAXGRwAGYAAOA12FzdYwByAADgNdjA3IALQUJFSGFiY2RlZmdoamxtbm9wcnN0dXYAXhxtHHEcdRx5HN8cBx0dHTwd3B3tHfEdAR4EHh0eLB5FHrwewx7hHgkfPR9LH4ABYXJ0AGQcZxxpHHIA8gBvB/IAxQLhIWlsAKAbKeEhcnIAoA4pZ6BmIgCgiyphAHIAAKBiKWMJjRwAAJAcAACVHAAAAAAAAAAAAACZHJwcAACmHKgcrRwAANIc9SF0ZTph7SJwdHl2AKC0KXIAYQDuAFoG4iFkYbtjZwAAoegnZGyhHKMcAKCRKeUAiwYAoIUqdQBvADuAqwCrQHIAgKOQIWJmaGxwc3QAuhy/HMIcxBzHHMoczhxmoOQhcwAAoB8pcwAAoB0p6wCyGnAAAKCrIWwAAKA5KWkAbQAAoHMpbAAAoKIhAKGrKmFl1hzaHGkAbAAAoBkpc6CtKgDgrSoA/oABYWJyAOUc6RztHHIAcgAAoAwpcgBrAACgcicAAWFr8Rz4HGMAAAFla/Yc9xx7YFtgAAFlc/wc/hwAoIspbAAAAWR1Ax0FHQCgjykAoI0pAAJhZXV5Dh0RHRodHB3yIW9uPmEAAWRpFR0YHWkAbAA8YewAowbiAPccO2QAAmNxcnMkHScdLB05HWEAAKA2KXUAbwDyoBwgqhEAAWR1MB00HeghYXIAoGcpcyJoYXIAAKBLKWgAAKCyIQCiZCJmZ3FzRB1FB5Qdnh10AIACYWhscnQATh1WHWUdbB2NHXIicm93AHSgkCFhAOkAzxxhI3Jwb29uAAABZHVeHWId7yF3bgCgvSFwAACgvCHlJGZ0YXJyb3dzAKDHIWkiZ2h0AIABYWhzAHUdex2DHXIicm93APOglCGdBmEAcgBwAG8AbwBuAPMAzgtxAHUAaQBnAGEAcgByAG8A9wBlGugkcmVldGltZXMAoMsi8aFkIk0HAACaHWwAYQBuAPQAXgcAon0qY2Rnc6YdqR2xHbcdYwAAoKgqbwB0AG+gfypyoIEqAKCDKmXg2iIA/nMAAKCTKoACYWRlZ3MAwB3GHcod1h3ZHXAAcAByAG8A+ACmHG8AdAAAoNYicQAAAWdxzx3SHXQA8gBGB2cAdADyAHQcdADyAFMHaQDtAGMHgAFpbHIA4h3mHeod8yFodACgfClvAG8A8gDKBgDgNdgp3UWgdiIAoJEqYQH1Hf4dcgAAAWR1YB35HWygvCEAoGopbABrAACghCVjAHkAWWQAomoiYWNodAweDx4VHhkecgDyAGsdbwByAG4AZQDyAGAW4SFyZACgaylyAGkAAKD6JQABaW8hHiQe5CFvdEBh9SFzdGGgsCPjIWhlAKCwIwACRWFlczMeNR48HkEeAKBoInAAcKCJKvIhb3gAoIkqcaCHKvGghyo0HmkAbQAAoOYiAARhYm5vcHR3elIeXB5fHoUelh6mHqsetB4AAW5yVh5ZHmcAAKDsJ3IAAKD9IXIA6wCwBmcAgAFsbXIAZh52Hnse5SFmdAABYXKIB2weaQBnAGgAdABhAHIAcgBvAPcAkwfhInBzdG8AoPwnaQBnAGgAdABhAHIAcgBvAPcAmgdwI2Fycm93AAABbHKNHpEeZQBmAPQAxhxpImdodAAAoKwhgAFhZmwAnB6fHqIecgAAoIUpAOA12F3ddQBzAACgLSppIm1lcwAAoDQqYQGvHrMecwB0AACgFyLhAIoOZaHKJbkeRhLuIWdlAKDKJWEAcgBsoCgAdAAAoJMpgAJhY2htdADMHs8e1R7bHt0ecgDyAJ0GbwByAG4AZQDyANYWYQByAGSgyyEAoG0pAKAOIHIAaQAAoL8iAANhY2hpcXTrHu8e1QfzHv0eBh/xIXVvAKA5IHIAAOA12MHcbQDloXIi+h4AAPweAKCNKgCgjyoAAWJ19xwBH28AcqAYIACgGiDyIW9rQmEAhDwAO2NkaGlscXJCBhcfxh0gHyQfKB8sHzEfAAFjaRsfHR8AoKYqcgAAoHkqcgBlAOUAkx3tIWVzAKDJIuEhcnIAoHYpdSJlc3QAAKB7KgABUGk1HzkfYQByAACglillocMlAgdfEnIAAAFkdUIfRx9zImhhcgAAoEop6CFhcgCgZikAAWVuTx9WH3IjdG5lcXEAAOBoIgD+xQBUHwAHRGFjZGVmaGlsbm9wc3VuH3Ifoh+rH68ftx+7H74f5h/uH/MfBwj/HwsgxCFvdACgOiIAAmNscHJ5H30fiR+eH3IAO4CvAK9AAAFldIEfgx8AoEImZaAgJ3MAZQAAoCAnc6CmIXQAbwCAoaYhZGx1AJQfmB+cH28AdwDuAHkDZQBmAPQA6gbwAOkO6yFlcgCgriUAAW95ph+qH+0hbWEAoCkqPGThIXNoAKAUIOElc3VyZWRhbmdsZQCgISJyAADgNdgq3W8AAKAnIYABY2RuAMQfyR/bH3IAbwA7gLUAtUBhoiMi0B8AANMf1x9zAPQAKxFpAHIAAKDwKm8AdAA7gLcAt0B1AHMA4qESIh4TAADjH3WgOCIAoCoqYwHqH+0fcAAAoNsq8gB+GnAAbAB1APMACAgAAWRw9x/7H+UhbHMAoKciZgAA4DXYXt0AAWN0AyAHIHIAAOA12MLc8CFvcwCgPiJsobwDECAVIPQiaW1hcACguCJhAPAAEyAADEdMUlZhYmNkZWZnaGlqbG1vcHJzdHV2dzwgRyBmIG0geSCqILgg2iDeIBEhFSEyIUMhTSFQIZwhnyHSIQAiIyKLIrEivyIUIwABZ3RAIEMgAODZIjgD9uBrItIgBwmAAWVsdABNIF8gYiBmAHQAAAFhclMgWCByInJvdwAAoM0h6SRnaHRhcnJvdwCgziEA4NgiOAP24Goi0iBfCekkZ2h0YXJyb3cAoM8hAAFEZHEgdSDhIXNoAKCvIuEhc2gAoK4igAJiY25wdACCIIYgiSCNIKIgbABhAACgByL1IXRlRGFnAADgICLSIACiSSJFaW9wlSCYIJwgniAA4HAqOANkAADgSyI4A3MASWFyAG8A+AAyCnUAcgBhoG4mbADzoG4mmwjzAa8gAACzIHAAO4CgAKBAbQBwAOXgTiI4AyoJgAJhZW91eQDBIMogzSDWINkg8AHGIAAAyCAAoEMqbwBuAEhh5CFpbEZhbgBnAGSgRyJvAHQAAOBtKjgDcAAAoEIqPWThIXNoAKATIACjYCJBYWRxc3jpIO0g+SD+IAIhDCFyAHIAAKDXIXIAAAFocvIg9SBrAACgJClvoJch9wAGD28AdAAA4FAiOAN1AGkA9gC7CAABZWkGIQohYQByAACgKCntAN8I6SFzdPOgBCLlCHIAAOA12CvdAAJFZXN0/wgcISshLiHxoXEiIiEAABMJ8aFxIgAJAAAnIWwAYQBuAPQAEwlpAO0AGQlyoG8iAKBvIoABQWFwADghOyE/IXIA8gBeIHIAcgAAoK4hYQByAACg8ipzogsiSiEAAAAAxwtkoPwiAKD6ImMAeQBaZIADQUVhZGVzdABcIV8hYiFmIWkhkyGWIXIA8gBXIADgZiI4A3IAcgAAoJohcgAAoCUggKFwImZxcwBwIYQhjiF0AAABYXJ1IXohcgByAG8A9wBlIWkAZwBoAHQAYQByAHIAbwD3AD4h8aFwImAhAACKIWwAYQBuAPQAZwlz4H0qOAMAoG4iaQDtAG0JcqBuImkA5aDqIkUJaQDkADoKAAFwdKMhpyFmAADgNdhf3YCBrAA7aW4AriGvIcchrEBuAIChCSJFZHYAtyG6Ib8hAOD5IjgDbwB0AADg9SI4A+EB1gjEIcYhAKD3IgCg9iJpAHagDCLhAagJzyHRIQCg/iIAoP0igAFhb3IA2CHsIfEhcgCAoSYiYXN0AOAh5SHpIWwAbABlAOwAywhsAADg/SrlIADgAiI4A2wiaW50AACgFCrjoYAi9yEAAPohdQDlAJsJY+CvKjgDZaCAIvEAkwkAAkFhaXQHIgoiFyIeInIA8gBsIHIAcgAAoZshY3cRIhQiAOAzKTgDAOCdITgDZyRodGFycm93AACgmyFyAGkA5aDrIr4JgANjaGltcHF1AC8iPCJHIpwhTSJQIloigKGBImNlcgA2Iv0JOSJ1AOUABgoA4DXYw9zvIXJ0bQKdIQAAAABEImEAcgDhAOEhbQBloEEi8aBEIiYKYQDyAMsIcwB1AAABYnBWIlgi5QDUCeUA3wmAAWJjcABgInMieCKAoYQiRWVzAGci7glqIgDgxSo4A2UAdABl4IIi0iBxAPGgiCJoImMAZaCBIvEA/gmAoYUiRWVzAH8iFgqCIgDgxio4A2UAdABl4IMi0iBxAPGgiSKAIgACZ2lscpIilCKaIpwi7AAMCWwAZABlADuA8QDxQOcAWwlpI2FuZ2xlAAABbHKkIqoi5SFmdGWg6iLxAEUJaSJnaHQAZaDrIvEAvgltoL0DAKEjAGVzuCK8InIAbwAAoBYhcAAAoAcggARESGFkZ2lscnMAziLSItYi2iLeIugi7SICIw8j4SFzaACgrSLhIXJyAKAEKXAAAOBNItIg4SFzaACgrCIAAWV04iLlIgDgZSLSIADgPgDSIG4iZmluAACg3imAAUFldADzIvci+iJyAHIAAKACKQDgZCLSIHLgPADSIGkAZQAA4LQi0iAAAUF0BiMKI3IAcgAAoAMp8iFpZQDgtSLSIGkAbQAA4Dwi0iCAAUFhbgAaIx4jKiNyAHIAAKDWIXIAAAFociMjJiNrAACgIylvoJYh9wD/DuUhYXIAoCcpUxJqFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVCMAAF4jaSN/I4IjjSOeI8AUAAAAAKYjwCMAANoj3yMAAO8jHiQvJD8kRCQAAWNzVyNsFHUAdABlADuA8wDzQAABaXlhI2cjcgBjoJoiO4D0APRAPmSAAmFiaW9zAHEjdCN3I3EBeiNzAOgAdhTsIWFjUWF2AACgOCrvIWxkAKC8KewhaWdTYQABY3KFI4kjaQByAACgvykA4DXYLN1vA5QjAAAAAJYjAACcI24A22JhAHYAZQA7gPIA8kAAoMEpAAFibaEjjAphAHIAAKC1KQACYWNpdKwjryO6I70jcgDyAFkUAAFpcrMjtiNyAACgvinvIXNzAKC7KW4A5QDZCgCgwCmAAWFlaQDFI8gjyyNjAHIATWFnAGEAyWOAAWNkbgDRI9Qj1iPyIW9uv2MAoLYpdQDzAHgBcABmAADgNdhg3YABYWVsAOQj5yPrI3IAAKC3KXIAcAAAoLkpdQDzAHwBAKMoImFkaW9zdvkj/CMPJBMkFiQbJHIA8gBeFIChXSplZm0AAyQJJAwkcgBvoDQhZgAAoDQhO4CqAKpAO4C6ALpA5yFvZgCgtiJyAACgVipsIm9wZQAAoFcqAKBbKoABY2xvACMkJSQrJPIACCRhAHMAaAA7gPgA+EBsAACgmCJpAGwBMyQ4JGQAZQA7gPUA9UBlAHMAYaCXInMAAKA2Km0AbAA7gPYA9kDiIWFyAKA9I+EKXiQAAHokAAB8JJQkAACYJKkkAAAAALUkEQsAAPAkAAAAAAQleiUAAIMlcgCAoSUiYXN0AGUkbyQBCwCBtgA7bGokayS2QGwAZQDsABgDaQJ1JAAAAAB4JG0AAKDzKgCg/Sp5AD9kcgCAAmNpbXB0AIUkiCSLJJkSjyRuAHQAJWBvAGQALmBpAGwAAKAwIOUhbmsAoDEgcgAA4DXYLd2AAWltbwCdJKAkpCR2oMYD1WNtAGEA9AD+B24AZQAAoA4m9KHAA64kAAC0JGMjaGZvcmsAAKDUItZjAAFhdbgkxCRuAAABY2u9JMIkawBooA8hAKAOIfYAaRpzAACkKwBhYmNkZW1zdNMkIRPXJNsk4STjJOck6yTjIWlyAKAjKmkAcgAAoCIqAAFvdYsW3yQAoCUqAKByKm4AO4CxALFAaQBtAACgJip3AG8AAKAnKoABaXB1APUk+iT+JO4idGludACgFSpmAADgNdhh3W4AZAA7gKMAo0CApHoiRWFjZWlub3N1ABMlFSUYJRslTCVRJVklSSV1JQCgsypwAACgtyp1AOUAPwtjoK8qgKJ6ImFjZW5zACclLSU0JTYlSSVwAHAAcgBvAPgAFyV1AHIAbAB5AGUA8QA/C/EAOAuAAWFlcwA8JUElRSXwInByb3gAoLkqcQBxAACgtSppAG0AAKDoImkA7QBEC20AZQDzoDIgIguAAUVhcwBDJVclRSXwAEAlgAFkZnAATwtfJXElgAFhbHMAZSVpJW0l7CFhcgCgLiPpIW5lAKASI/UhcmYAoBMjdKAdIu8AWQvyIWVsAKCwIgABY2l9JYElcgAA4DXYxdzIY24iY3NwAACgCCAAA2Zpb3BzdZElKxuVJZolnyWkJXIAAOA12C7dcABmAADgNdhi3XIiaW1lAACgVyBjAHIAAOA12MbcgAFhZW8AqiW6JcAldAAAAWVpryW2JXIAbgBpAG8AbgDzABkFbgB0AACgFipzAHQAZaA/APEACRj0AG0LgApBQkhhYmNkZWZoaWxtbm9wcnN0dXgA4yXyJfYl+iVpJpAmpia9JtUm5ib4JlonaCdxJ3UnnietJ7EnyCfiJ+cngAFhcnQA6SXsJe4lcgDyAJkM8gD6AuEhaWwAoBwpYQByAPIA3BVhAHIAAKBkKYADY2RlbnFydAAGJhAmEyYYJiYmKyZaJgABZXUKJg0mAOA9IjEDdABlAFVhaQDjACAN7SJwdHl2AKCzKWcAgKHpJ2RlbAAgJiImJCYAoJIpAKClKeUA9wt1AG8AO4C7ALtAcgAApZIhYWJjZmhscHN0dz0mQCZFJkcmSiZMJk4mUSZVJlgmcAAAoHUpZqDlIXMAAKAgKQCgMylzAACgHinrALka8ACVHmwAAKBFKWkAbQAAoHQpbAAAoKMhAKCdIQABYWleJmImaQBsAACgGilvAG6gNiJhAGwA8wB2C4ABYWJyAG8mciZ2JnIA8gAvEnIAawAAoHMnAAFha3omgSZjAAABZWt/JoAmfWBdYAABZXOFJocmAKCMKWwAAAFkdYwmjiYAoI4pAKCQKQACYWV1eZcmmiajJqUm8iFvbllhAAFkaZ4moSZpAGwAV2HsAA8M4gCAJkBkAAJjbHFzrSawJrUmuiZhAACgNylkImhhcgAAoGkpdQBvAPKgHSCjAWgAAKCzIYABYWNnAMMm0iaUC2wAgKEcIWlwcwDLJs4migxuAOUAoAxhAHIA9ADaC3QAAKCtJYABaWxyANsm3ybjJvMhaHQAoH0pbwBvAPIANgwA4DXYL90AAWFv6ib1JnIAAAFkde8m8SYAoMEhbKDAIQCgbCl2oMED8WOAAWducwD+Jk4nUCdoAHQAAANhaGxyc3QKJxInISc1Jz0nRydyInJvdwB0oJIhYQDpAFYmYSNycG9vbgAAAWR1GiceJ28AdwDuAPAmcAAAoMAh5SFmdAABYWgnJy0ncgByAG8AdwDzAAkMYQByAHAAbwBvAG4A8wATBGklZ2h0YXJyb3dzAACgySFxAHUAaQBnAGEAcgByAG8A9wBZJugkcmVldGltZXMAoMwiZwDaYmkAbgBnAGQAbwB0AHMAZQDxABwYgAFhaG0AYCdjJ2YncgDyAAkMYQDyABMEAKAPIG8idXN0AGGgsSPjIWhlAKCxI+0haWQAoO4qAAJhYnB0fCeGJ4knmScAAW5ygCeDJ2cAAKDtJ3IAAKD+IXIA6wAcDIABYWZsAI8nkieVJ3IAAKCGKQDgNdhj3XUAcwAAoC4qaSJtZXMAAKA1KgABYXCiJ6gncgBnoCkAdAAAoJQp7yJsaW50AKASKmEAcgDyADwnAAJhY2hxuCe8J6EMwCfxIXVvAKA6IHIAAOA12MfcAAFidYAmxCdvAPKgGSCoAYABaGlyAM4n0ifWJ3IAZQDlAE0n7SFlcwCgyiJpAIChuSVlZmwAXAxjEt4n9CFyaQCgzinsInVoYXIAoGgpAKAeIWENBSgJKA0oSyhVKIYoAACLKLAoAAAAAOMo5ygAABApJCkxKW0pcSmHKaYpAACYKgAAAACxKmMidXRlAFthcQB1AO8ABR+ApHsiRWFjZWlucHN5ABwoHignKCooLygyKEEoRihJKACgtCrwASMoAAAlKACguCpvAG4AYWF1AOUAgw1koLAqaQBsAF9hcgBjAF1hgAFFYXMAOCg6KD0oAKC2KnAAAKC6KmkAbQAAoOki7yJsaW50AKATKmkA7QCIDUFkbwB0AGKixSKRFgAAAABTKACgZiqAA0FhY21zdHgAYChkKG8ocyh1KHkogihyAHIAAKDYIXIAAAFocmkoayjrAJAab6CYIfcAzAd0ADuApwCnQGkAO2D3IWFyAKApKW0AAAFpbn4ozQBuAHUA8wDOAHQAAKA2J3IA7+A12DDdIxkAAmFjb3mRKJUonSisKHIAcAAAoG8mAAFoeZkonChjAHkASWRIZHIAdABtAqUoAAAAAKgoaQDkAFsPYQByAGEA7ABsJDuArQCtQAABZ22zKLsobQBhAAChwwNmdroouijCY4CjPCJkZWdsbnByAMgozCjPKNMo1yjaKN4obwB0AACgairxoEMiCw5FoJ4qAKCgKkWgnSoAoJ8qZQAAoEYi7CF1cwCgJCrhIXJyAKByKWEAcgDyAPwMAAJhZWl07Sj8KAEpCCkAAWxz8Sj4KGwAcwBlAHQAbQDpAH8oaABwAACgMyrwImFyc2wAoOQpAAFkbFoPBSllAACgIyNloKoqc6CsKgDgrCoA/oABZmxwABUpGCkfKfQhY3lMZGKgLwBhoMQpcgAAoD8jZgAA4DXYZN1hAAABZHIoKRcDZQBzAHWgYCZpAHQAAKBgJoABY3N1ADYpRilhKQABYXU6KUApcABzoJMiAOCTIgD+cABzoJQiAOCUIgD+dQAAAWJwSylWKQChjyJlcz4NUCllAHQAZaCPIvEAPw0AoZAiZXNIDVspZQB0AGWgkCLxAEkNAKGhJWFmZilbBHIAZQFrKVwEAKChJWEAcgDyAAMNAAJjZW10dyl7KX8pgilyAADgNdjI3HQAbQDuAM4AaQDsAAYpYQByAOYAVw0AAWFyiimOKXIA5qAGJhESAAFhbpIpoylpImdodAAAAWVwmSmgKXAAcwBpAGwAbwDuANkXaADpAKAkcwCvYIACYmNtbnAArin8KY4NJSooKgCkgiJFZGVtbnByc7wpvinCKcgpzCnUKdgp3CkAoMUqbwB0AACgvSpkoIYibwB0AACgwyr1IWx0AKDBKgABRWXQKdIpAKDLKgCgiiLsIXVzAKC/KuEhcnIAoHkpgAFlaXUA4inxKfQpdAAAoYIiZW7oKewpcQDxoIYivSllAHEA8aCKItEpbQAAoMcqAAFicPgp+ikAoNUqAKDTKmMAgKJ7ImFjZW5zAAcqDSoUKhYqRihwAHAAcgBvAPgAIyh1AHIAbAB5AGUA8QCDDfEAfA2AAWFlcwAcKiIqPShwAHAAcgBvAPgAPChxAPEAOShnAACgaiYApoMiMTIzRWRlaGxtbnBzPCo/KkIqRSpHKlIqWCpjKmcqaypzKncqO4C5ALlAO4CyALJAO4CzALNAAKDGKgABb3NLKk4qdAAAoL4qdQBiAACg2CpkoIcibwB0AACgxCpzAAABb3VdKmAqbAAAoMknYgAAoNcq4SFycgCgeyn1IWx0AKDCKgABRWVvKnEqAKDMKgCgiyLsIXVzAKDAKoABZWl1AH0qjCqPKnQAAKGDImVugyqHKnEA8aCHIkYqZQBxAPGgiyJwKm0AAKDIKgABYnCTKpUqAKDUKgCg1iqAAUFhbgCdKqEqrCpyAHIAAKDZIXIAAAFocqYqqCrrAJUab6CZIfcAxQf3IWFyAKAqKWwAaQBnADuA3wDfQOELzyrZKtwq6SrsKvEqAAD1KjQrAAAAAAAAAAAAAEwrbCsAAHErvSsAAAAAAADRK3IC1CoAAAAA2CrnIWV0AKAWI8RjcgDrAOUKgAFhZXkA4SrkKucq8iFvbmVh5CFpbGNhQmRvAPQAIg5sInJlYwAAoBUjcgAA4DXYMd0AAmVpa2/7KhIrKCsuK/IBACsAAAkrZQAAATRm6g0EK28AcgDlAOsNYQBzorgDECsAAAAAEit5AG0A0WMAAWNuFislK2sAAAFhcxsrIStwAHAAcgBvAPgAFw5pAG0AAKA8InMA8AD9DQABYXMsKyEr8AAXDnIAbgA7gP4A/kDsATgrOyswG2QA5QBnAmUAcwCAgdcAO2JkAEMrRCtJK9dAYaCgInIAAKAxKgCgMCqAAWVwcwBRK1MraSvhAAkh4qKkIlsrXysAAAAAYytvAHQAAKA2I2kAcgAAoPEqb+A12GXdcgBrAACg2irhAHgociJpbWUAAKA0IIABYWlwAHYreSu3K2QA5QC+DYADYWRlbXBzdACFK6MrmiunK6wrsCuzK24iZ2xlAACitSVkbHFykCuUK5ornCvvIXduAKC/JeUhZnRloMMl8QACBwCgXCJpImdodABloLkl8QBdDG8AdAAAoOwlaSJudXMAAKA6KuwhdXMAoDkqYgAAoM0p6SFtZQCgOyrlInppdW0AoOIjgAFjaHQAwivKK80rAAFyecYrySsA4DXYydxGZGMAeQBbZPIhb2tnYQABaW/UK9creAD0ANERaCJlYWQAAAFsct4r5ytlAGYAdABhAHIAcgBvAPcAXQbpJGdodGFycm93AKCgIQAJQUhhYmNkZmdobG1vcHJzdHV3CiwNLBEsHSwnLDEsQCxLLFIsYix6LIQsjyzLLOgs7Sz/LAotcgDyAAkDYQByAACgYykAAWNyFSwbLHUAdABlADuA+gD6QPIACQ1yAOMBIywAACUseQBeZHYAZQBtYQABaXkrLDAscgBjADuA+wD7QENkgAFhYmgANyw6LD0scgDyANEO7CFhY3FhYQDyAOAOAAFpckQsSCzzIWh0AKB+KQDgNdgy3XIAYQB2AGUAO4D5APlAYQFWLF8scgAAAWxyWixcLACgvyEAoL4hbABrAACggCUAAWN0Zix2LG8CbCwAAAAAcyxyAG4AZaAcI3IAAKAcI28AcAAAoA8jcgBpAACg+CUAAWFsfiyBLGMAcgBrYTuAqACoQAABZ3CILIssbwBuAHNhZgAA4DXYZt0AA2FkaGxzdZksniynLLgsuyzFLHIAcgBvAPcACQ1vAHcAbgBhAHIAcgBvAPcA2A5hI3Jwb29uAAABbHKvLLMsZQBmAPQAWyxpAGcAaAD0AF0sdQDzAKYOaQAAocUDaGzBLMIs0mNvAG4AxWPwI2Fycm93cwCgyCGAAWNpdADRLOEs5CxvAtcsAAAAAN4scgBuAGWgHSNyAACgHSNvAHAAAKAOI24AZwBvYXIAaQAAoPklYwByAADgNdjK3IABZGlyAPMs9yz6LG8AdAAAoPAi7CFkZWlhaQBmoLUlAKC0JQABYW0DLQYtcgDyAMosbAA7gPwA/EDhIm5nbGUAoKcpgAdBQkRhY2RlZmxub3Byc3oAJy0qLTAtNC2bLZ0toS2/LcMtxy3TLdgt3C3gLfwtcgDyABADYQByAHag6CoAoOkqYQBzAOgA/gIAAW5yOC08LechcnQAoJwpgANla25wcnN0AJkpSC1NLVQtXi1iLYItYQBwAHAA4QAaHG8AdABoAGkAbgDnAKEXgAFoaXIAoSmzJFotbwBwAPQAdCVooJUh7wD4JgABaXVmLWotZwBtAOEAuygAAWJwbi14LXMjZXRuZXEAceCKIgD+AODLKgD+cyNldG5lcQBx4IsiAP4A4MwqAP4AAWhyhi2KLWUAdADhABIraSNhbmdsZQAAAWxyki2WLeUhZnQAoLIiaSJnaHQAAKCzInkAMmThIXNoAKCiIoABZWxyAKcttC24LWKiKCKuLQAAAACyLWEAcgAAoLsicQAAoFoi7CFpcACg7iIAAWJ0vC1eD2EA8gBfD3IAAOA12DPddAByAOkAlS1zAHUAAAFicM0t0C0A4IIi0iAA4IMi0iBwAGYAAOA12GfdcgBvAPAAWQt0AHIA6QCaLQABY3XkLegtcgAA4DXYy9wAAWJw7C30LW4AAAFFZXUt8S0A4IoiAP5uAAABRWV/LfktAOCLIgD+6SJnemFnAKCaKYADY2Vmb3BycwANLhAuJS4pLiMuLi40LukhcmN1YQABZGkULiEuAAFiZxguHC5hAHIAAKBfKmUAcaAnIgCgWSLlIXJwAKAYIXIAAOA12DTdcABmAADgNdho3WWgQCJhAHQA6ABqD2MAcgAA4DXYzNzjCuQRUC4AAFQuAABYLmIuAAAAAGMubS5wLnQuAAAAAIguki4AAJouJxIqEnQAcgDpAB0ScgAA4DXYNd0AAUFhWy5eLnIA8gDnAnIA8gCTB75jAAFBYWYuaS5yAPIA4AJyAPIAjAdhAPAAeh5pAHMAAKD7IoABZHB0APgReS6DLgABZmx9LoAuAOA12GnddQDzAP8RaQBtAOUABBIAAUFhiy6OLnIA8gDuAnIA8gCaBwABY3GVLgoScgAA4DXYzdwAAXB0nS6hLmwAdQDzACUScgDpACASAARhY2VmaW9zdbEuvC7ELsguzC7PLtQu2S5jAAABdXm2LrsudABlADuA/QD9QE9kAAFpecAuwy5yAGMAd2FLZG4AO4ClAKVAcgAA4DXYNt1jAHkAV2RwAGYAAOA12GrdYwByAADgNdjO3AABY23dLt8ueQBOZGwAO4D/AP9AAAVhY2RlZmhpb3N38y73Lv8uAi8MLxAvEy8YLx0vIi9jInV0ZQB6YQABYXn7Lv4u8iFvbn5hN2RvAHQAfGEAAWV0Bi8KL3QAcgDmAB8QYQC2Y3IAAOA12DfdYwB5ADZk5yJyYXJyAKDdIXAAZgAA4DXYa91jAHIAAOA12M/cAAFqbiYvKC8AoA0gagAAoAwg"), Lc = /* @__PURE__ */ zo("AAJhZ2xxBwARABMAFQBtAg0AAAAAAA8AcAAmYG8AcwAnYHQAPmB0ADxg9SFvdCJg");
var ot;
(function(s) {
  s[s.VALUE_LENGTH = 49152] = "VALUE_LENGTH", s[s.FLAG13 = 8192] = "FLAG13", s[s.BRANCH_LENGTH = 8064] = "BRANCH_LENGTH", s[s.JUMP_TABLE = 127] = "JUMP_TABLE";
})(ot || (ot = {}));
var L;
(function(s) {
  s[s.NUM = 35] = "NUM", s[s.SEMI = 59] = "SEMI", s[s.EQUALS = 61] = "EQUALS", s[s.ZERO = 48] = "ZERO", s[s.NINE = 57] = "NINE", s[s.LOWER_A = 97] = "LOWER_A", s[s.LOWER_F = 102] = "LOWER_F", s[s.LOWER_X = 120] = "LOWER_X", s[s.LOWER_Z = 122] = "LOWER_Z", s[s.UPPER_A = 65] = "UPPER_A", s[s.UPPER_F = 70] = "UPPER_F", s[s.UPPER_Z = 90] = "UPPER_Z";
})(L || (L = {}));
const Ur = 32;
function gi(s) {
  return s >= L.ZERO && s <= L.NINE;
}
function Gc(s) {
  return s >= L.UPPER_A && s <= L.UPPER_F || s >= L.LOWER_A && s <= L.LOWER_F;
}
function Kc(s) {
  return s >= L.UPPER_A && s <= L.UPPER_Z || s >= L.LOWER_A && s <= L.LOWER_Z || gi(s);
}
function Hc(s) {
  return s === L.EQUALS || Kc(s);
}
var V;
(function(s) {
  s[s.EntityStart = 0] = "EntityStart", s[s.NumericStart = 1] = "NumericStart", s[s.NumericDecimal = 2] = "NumericDecimal", s[s.NumericHex = 3] = "NumericHex", s[s.NamedEntity = 4] = "NamedEntity";
})(V || (V = {}));
var Mt;
(function(s) {
  s[s.Legacy = 0] = "Legacy", s[s.Strict = 1] = "Strict", s[s.Attribute = 2] = "Attribute";
})(Mt || (Mt = {}));
class Wc {
  constructor(t, e, n) {
    this.decodeTree = t, this.emitCodePoint = e, this.errors = n, this.state = V.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Mt.Strict, this.runConsumed = 0;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = V.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1, this.runConsumed = 0;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, e) {
    switch (this.state) {
      case V.EntityStart:
        return t.charCodeAt(e) === L.NUM ? (this.state = V.NumericStart, this.consumed += 1, this.stateNumericStart(t, e + 1)) : (this.state = V.NamedEntity, this.stateNamedEntity(t, e));
      case V.NumericStart:
        return this.stateNumericStart(t, e);
      case V.NumericDecimal:
        return this.stateNumericDecimal(t, e);
      case V.NumericHex:
        return this.stateNumericHex(t, e);
      case V.NamedEntity:
        return this.stateNamedEntity(t, e);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, e) {
    return e >= t.length ? -1 : (t.charCodeAt(e) | Ur) === L.LOWER_X ? (this.state = V.NumericHex, this.consumed += 1, this.stateNumericHex(t, e + 1)) : (this.state = V.NumericDecimal, this.stateNumericDecimal(t, e));
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, e) {
    for (; e < t.length; ) {
      const n = t.charCodeAt(e);
      if (gi(n) || Gc(n)) {
        const i = n <= L.NINE ? n - L.ZERO : (n | Ur) - L.LOWER_A + 10;
        this.result = this.result * 16 + i, this.consumed++, e++;
      } else
        return this.emitNumericEntity(n, 3);
    }
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, e) {
    for (; e < t.length; ) {
      const n = t.charCodeAt(e);
      if (gi(n))
        this.result = this.result * 10 + (n - L.ZERO), this.consumed++, e++;
      else
        return this.emitNumericEntity(n, 2);
    }
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, e) {
    var n;
    if (this.consumed <= e)
      return (n = this.errors) === null || n === void 0 || n.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === L.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === Mt.Strict)
      return 0;
    return this.emitCodePoint(Oc(this.result), this.consumed), this.errors && (t !== L.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, e) {
    const { decodeTree: n } = this;
    let i = n[this.treeIndex], r = (i & ot.VALUE_LENGTH) >> 14;
    for (; e < t.length; ) {
      if (r === 0 && (i & ot.FLAG13) !== 0) {
        const A = (i & ot.BRANCH_LENGTH) >> 7;
        if (this.runConsumed === 0) {
          const c = i & ot.JUMP_TABLE;
          if (t.charCodeAt(e) !== c)
            return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
          e++, this.excess++, this.runConsumed++;
        }
        for (; this.runConsumed < A; ) {
          if (e >= t.length)
            return -1;
          const c = this.runConsumed - 1, a = n[this.treeIndex + 1 + (c >> 1)], u = c % 2 === 0 ? a & 255 : a >> 8 & 255;
          if (t.charCodeAt(e) !== u)
            return this.runConsumed = 0, this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
          e++, this.excess++, this.runConsumed++;
        }
        this.runConsumed = 0, this.treeIndex += 1 + (A >> 1), i = n[this.treeIndex], r = (i & ot.VALUE_LENGTH) >> 14;
      }
      if (e >= t.length)
        break;
      const o = t.charCodeAt(e);
      if (o === L.SEMI && r !== 0 && (i & ot.FLAG13) !== 0)
        return this.emitNamedEntityData(this.treeIndex, r, this.consumed + this.excess);
      if (this.treeIndex = Yc(n, i, this.treeIndex + Math.max(1, r), o), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === Mt.Attribute && // We shouldn't have consumed any characters after the entity,
        (r === 0 || // And there should be no invalid characters.
        Hc(o)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (i = n[this.treeIndex], r = (i & ot.VALUE_LENGTH) >> 14, r !== 0) {
        if (o === L.SEMI)
          return this.emitNamedEntityData(this.treeIndex, r, this.consumed + this.excess);
        this.decodeMode !== Mt.Strict && (i & ot.FLAG13) === 0 && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
      e++, this.excess++;
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: e, decodeTree: n } = this, i = (n[e] & ot.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(e, i, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, e, n) {
    const { decodeTree: i } = this;
    return this.emitCodePoint(e === 1 ? i[t] & ~(ot.VALUE_LENGTH | ot.FLAG13) : i[t + 1], n), e === 3 && this.emitCodePoint(i[t + 2], n), n;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case V.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== Mt.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case V.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case V.NumericHex:
        return this.emitNumericEntity(0, 3);
      case V.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case V.EntityStart:
        return 0;
    }
  }
}
function Yc(s, t, e, n) {
  const i = (t & ot.BRANCH_LENGTH) >> 7, r = t & ot.JUMP_TABLE;
  if (i === 0)
    return r !== 0 && n === r ? e : -1;
  if (r) {
    const a = n - r;
    return a < 0 || a >= i ? -1 : s[e + a] - 1;
  }
  const o = i + 1 >> 1;
  let A = 0, c = i - 1;
  for (; A <= c; ) {
    const a = A + c >>> 1, u = a >> 1, S = s[e + u] >> (a & 1) * 8 & 255;
    if (S < n)
      A = a + 1;
    else if (S > n)
      c = a - 1;
    else
      return s[e + o + a];
  }
  return -1;
}
var I;
(function(s) {
  s[s.Tab = 9] = "Tab", s[s.NewLine = 10] = "NewLine", s[s.FormFeed = 12] = "FormFeed", s[s.CarriageReturn = 13] = "CarriageReturn", s[s.Space = 32] = "Space", s[s.ExclamationMark = 33] = "ExclamationMark", s[s.Number = 35] = "Number", s[s.Amp = 38] = "Amp", s[s.SingleQuote = 39] = "SingleQuote", s[s.DoubleQuote = 34] = "DoubleQuote", s[s.Dash = 45] = "Dash", s[s.Slash = 47] = "Slash", s[s.Zero = 48] = "Zero", s[s.Nine = 57] = "Nine", s[s.Semi = 59] = "Semi", s[s.Lt = 60] = "Lt", s[s.Eq = 61] = "Eq", s[s.Gt = 62] = "Gt", s[s.Questionmark = 63] = "Questionmark", s[s.UpperA = 65] = "UpperA", s[s.LowerA = 97] = "LowerA", s[s.UpperF = 70] = "UpperF", s[s.LowerF = 102] = "LowerF", s[s.UpperZ = 90] = "UpperZ", s[s.LowerZ = 122] = "LowerZ", s[s.LowerX = 120] = "LowerX", s[s.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})(I || (I = {}));
var d;
(function(s) {
  s[s.Text = 1] = "Text", s[s.BeforeTagName = 2] = "BeforeTagName", s[s.InTagName = 3] = "InTagName", s[s.InSelfClosingTag = 4] = "InSelfClosingTag", s[s.BeforeClosingTagName = 5] = "BeforeClosingTagName", s[s.InClosingTagName = 6] = "InClosingTagName", s[s.AfterClosingTagName = 7] = "AfterClosingTagName", s[s.BeforeAttributeName = 8] = "BeforeAttributeName", s[s.InAttributeName = 9] = "InAttributeName", s[s.AfterAttributeName = 10] = "AfterAttributeName", s[s.BeforeAttributeValue = 11] = "BeforeAttributeValue", s[s.InAttributeValueDq = 12] = "InAttributeValueDq", s[s.InAttributeValueSq = 13] = "InAttributeValueSq", s[s.InAttributeValueNq = 14] = "InAttributeValueNq", s[s.BeforeDeclaration = 15] = "BeforeDeclaration", s[s.InDeclaration = 16] = "InDeclaration", s[s.InProcessingInstruction = 17] = "InProcessingInstruction", s[s.BeforeComment = 18] = "BeforeComment", s[s.CDATASequence = 19] = "CDATASequence", s[s.InSpecialComment = 20] = "InSpecialComment", s[s.InCommentLike = 21] = "InCommentLike", s[s.BeforeSpecialS = 22] = "BeforeSpecialS", s[s.BeforeSpecialT = 23] = "BeforeSpecialT", s[s.SpecialStartSequence = 24] = "SpecialStartSequence", s[s.InSpecialTag = 25] = "InSpecialTag", s[s.InEntity = 26] = "InEntity";
})(d || (d = {}));
function Kt(s) {
  return s === I.Space || s === I.NewLine || s === I.Tab || s === I.FormFeed || s === I.CarriageReturn;
}
function Bs(s) {
  return s === I.Slash || s === I.Gt || Kt(s);
}
function Uc(s) {
  return s >= I.LowerA && s <= I.LowerZ || s >= I.UpperA && s <= I.UpperZ;
}
var wt;
(function(s) {
  s[s.NoValue = 0] = "NoValue", s[s.Unquoted = 1] = "Unquoted", s[s.Single = 2] = "Single", s[s.Double = 3] = "Double";
})(wt || (wt = {}));
const W = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ]),
  // `</textarea`
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112])
  // `</xmp`
};
class $o {
  constructor({ xmlMode: t = !1, decodeEntities: e = !0 }, n) {
    this.cbs = n, this.state = d.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = d.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.xmlMode = t, this.decodeEntities = e, this.entityDecoder = new Wc(t ? Lc : Qc, (i, r) => this.emitCodePoint(i, r));
  }
  reset() {
    this.state = d.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = d.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
  }
  write(t) {
    this.offset += this.buffer.length, this.buffer = t, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
  }
  stateText(t) {
    t === I.Lt || !this.decodeEntities && this.fastForwardTo(I.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = d.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === I.Amp && this.startEntity();
  }
  stateSpecialStartSequence(t) {
    const e = this.sequenceIndex === this.currentSequence.length;
    if (!(e ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      Bs(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.isSpecial = !1;
    else if (!e) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = d.InTagName, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === I.Gt || Kt(t)) {
        const e = this.index - this.currentSequence.length;
        if (this.sectionStart < e) {
          const n = this.index;
          this.index = e, this.cbs.ontext(this.sectionStart, e), this.index = n;
        }
        this.isSpecial = !1, this.sectionStart = e + 2, this.stateInClosingTagName(t);
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === W.TitleEnd ? this.decodeEntities && t === I.Amp && this.startEntity() : this.fastForwardTo(I.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === I.Lt);
  }
  stateCDATASequence(t) {
    t === W.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === W.Cdata.length && (this.state = d.InCommentLike, this.currentSequence = W.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = d.InDeclaration, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === t)
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === W.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = d.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(t) {
    return this.xmlMode ? !Bs(t) : Uc(t);
  }
  startSpecial(t, e) {
    this.isSpecial = !0, this.currentSequence = t, this.sequenceIndex = e, this.state = d.SpecialStartSequence;
  }
  stateBeforeTagName(t) {
    if (t === I.ExclamationMark)
      this.state = d.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (t === I.Questionmark)
      this.state = d.InProcessingInstruction, this.sectionStart = this.index + 1;
    else if (this.isTagStartChar(t)) {
      const e = t | 32;
      this.sectionStart = this.index, this.xmlMode ? this.state = d.InTagName : e === W.ScriptEnd[2] ? this.state = d.BeforeSpecialS : e === W.TitleEnd[2] || e === W.XmpEnd[2] ? this.state = d.BeforeSpecialT : this.state = d.InTagName;
    } else t === I.Slash ? this.state = d.BeforeClosingTagName : (this.state = d.Text, this.stateText(t));
  }
  stateInTagName(t) {
    Bs(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateBeforeClosingTagName(t) {
    Kt(t) || (t === I.Gt ? this.state = d.Text : (this.state = this.isTagStartChar(t) ? d.InClosingTagName : d.InSpecialComment, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === I.Gt || Kt(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = d.AfterClosingTagName, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    (t === I.Gt || this.fastForwardTo(I.Gt)) && (this.state = d.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(t) {
    t === I.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = d.InSpecialTag, this.sequenceIndex = 0) : this.state = d.Text, this.sectionStart = this.index + 1) : t === I.Slash ? this.state = d.InSelfClosingTag : Kt(t) || (this.state = d.InAttributeName, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === I.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = d.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : Kt(t) || (this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateInAttributeName(t) {
    (t === I.Eq || Bs(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = this.index, this.state = d.AfterAttributeName, this.stateAfterAttributeName(t));
  }
  stateAfterAttributeName(t) {
    t === I.Eq ? this.state = d.BeforeAttributeValue : t === I.Slash || t === I.Gt ? (this.cbs.onattribend(wt.NoValue, this.sectionStart), this.sectionStart = -1, this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t)) : Kt(t) || (this.cbs.onattribend(wt.NoValue, this.sectionStart), this.state = d.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(t) {
    t === I.DoubleQuote ? (this.state = d.InAttributeValueDq, this.sectionStart = this.index + 1) : t === I.SingleQuote ? (this.state = d.InAttributeValueSq, this.sectionStart = this.index + 1) : Kt(t) || (this.sectionStart = this.index, this.state = d.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
  }
  handleInAttributeValue(t, e) {
    t === e || !this.decodeEntities && this.fastForwardTo(e) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(e === I.DoubleQuote ? wt.Double : wt.Single, this.index + 1), this.state = d.BeforeAttributeName) : this.decodeEntities && t === I.Amp && this.startEntity();
  }
  stateInAttributeValueDoubleQuotes(t) {
    this.handleInAttributeValue(t, I.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(t) {
    this.handleInAttributeValue(t, I.SingleQuote);
  }
  stateInAttributeValueNoQuotes(t) {
    Kt(t) || t === I.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(wt.Unquoted, this.index), this.state = d.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === I.Amp && this.startEntity();
  }
  stateBeforeDeclaration(t) {
    t === I.OpeningSquareBracket ? (this.state = d.CDATASequence, this.sequenceIndex = 0) : this.state = t === I.Dash ? d.BeforeComment : d.InDeclaration;
  }
  stateInDeclaration(t) {
    (t === I.Gt || this.fastForwardTo(I.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = d.Text, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === I.Gt || this.fastForwardTo(I.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = d.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === I.Dash ? (this.state = d.InCommentLike, this.currentSequence = W.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = d.InDeclaration;
  }
  stateInSpecialComment(t) {
    (t === I.Gt || this.fastForwardTo(I.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = d.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    const e = t | 32;
    e === W.ScriptEnd[3] ? this.startSpecial(W.ScriptEnd, 4) : e === W.StyleEnd[3] ? this.startSpecial(W.StyleEnd, 4) : (this.state = d.InTagName, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    switch (t | 32) {
      case W.TitleEnd[3]: {
        this.startSpecial(W.TitleEnd, 4);
        break;
      }
      case W.TextareaEnd[3]: {
        this.startSpecial(W.TextareaEnd, 4);
        break;
      }
      case W.XmpEnd[3]: {
        this.startSpecial(W.XmpEnd, 4);
        break;
      }
      default:
        this.state = d.InTagName, this.stateInTagName(t);
    }
  }
  startEntity() {
    this.baseState = this.state, this.state = d.InEntity, this.entityStart = this.index, this.entityDecoder.startEntity(this.xmlMode ? Mt.Strict : this.baseState === d.Text || this.baseState === d.InSpecialTag ? Mt.Legacy : Mt.Attribute);
  }
  stateInEntity() {
    const t = this.index - this.offset, e = this.entityDecoder.write(this.buffer, t);
    if (e >= 0)
      this.state = this.baseState, e === 0 && (this.index -= 1);
    else {
      if (t < this.buffer.length && this.buffer.charCodeAt(t) === I.Amp) {
        this.state = this.baseState, this.index -= 1;
        return;
      }
      this.index = this.offset + this.buffer.length - 1;
    }
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === d.Text || this.state === d.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === d.InAttributeValueDq || this.state === d.InAttributeValueSq || this.state === d.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    for (; this.shouldContinue(); ) {
      const t = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case d.Text: {
          this.stateText(t);
          break;
        }
        case d.SpecialStartSequence: {
          this.stateSpecialStartSequence(t);
          break;
        }
        case d.InSpecialTag: {
          this.stateInSpecialTag(t);
          break;
        }
        case d.CDATASequence: {
          this.stateCDATASequence(t);
          break;
        }
        case d.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(t);
          break;
        }
        case d.InAttributeName: {
          this.stateInAttributeName(t);
          break;
        }
        case d.InCommentLike: {
          this.stateInCommentLike(t);
          break;
        }
        case d.InSpecialComment: {
          this.stateInSpecialComment(t);
          break;
        }
        case d.BeforeAttributeName: {
          this.stateBeforeAttributeName(t);
          break;
        }
        case d.InTagName: {
          this.stateInTagName(t);
          break;
        }
        case d.InClosingTagName: {
          this.stateInClosingTagName(t);
          break;
        }
        case d.BeforeTagName: {
          this.stateBeforeTagName(t);
          break;
        }
        case d.AfterAttributeName: {
          this.stateAfterAttributeName(t);
          break;
        }
        case d.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(t);
          break;
        }
        case d.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(t);
          break;
        }
        case d.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(t);
          break;
        }
        case d.AfterClosingTagName: {
          this.stateAfterClosingTagName(t);
          break;
        }
        case d.BeforeSpecialS: {
          this.stateBeforeSpecialS(t);
          break;
        }
        case d.BeforeSpecialT: {
          this.stateBeforeSpecialT(t);
          break;
        }
        case d.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(t);
          break;
        }
        case d.InSelfClosingTag: {
          this.stateInSelfClosingTag(t);
          break;
        }
        case d.InDeclaration: {
          this.stateInDeclaration(t);
          break;
        }
        case d.BeforeDeclaration: {
          this.stateBeforeDeclaration(t);
          break;
        }
        case d.BeforeComment: {
          this.stateBeforeComment(t);
          break;
        }
        case d.InProcessingInstruction: {
          this.stateInProcessingInstruction(t);
          break;
        }
        case d.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === d.InEntity && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length + this.offset;
    this.sectionStart >= t || (this.state === d.InCommentLike ? this.currentSequence === W.CdataEnd ? this.cbs.oncdata(this.sectionStart, t, 0) : this.cbs.oncomment(this.sectionStart, t, 0) : this.state === d.InTagName || this.state === d.BeforeAttributeName || this.state === d.BeforeAttributeValue || this.state === d.AfterAttributeName || this.state === d.InAttributeName || this.state === d.InAttributeValueSq || this.state === d.InAttributeValueDq || this.state === d.InAttributeValueNq || this.state === d.InClosingTagName || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, e) {
    this.baseState !== d.Text && this.baseState !== d.InSpecialTag ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + e, this.index = this.sectionStart - 1, this.cbs.onattribentity(t)) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + e, this.index = this.sectionStart - 1, this.cbs.ontextentity(t, this.sectionStart));
  }
}
const we = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), F = /* @__PURE__ */ new Set(["p"]), _r = /* @__PURE__ */ new Set(["thead", "tbody"]), Jr = /* @__PURE__ */ new Set(["dd", "dt"]), Pr = /* @__PURE__ */ new Set(["rt", "rp"]), _c = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", F],
  ["h1", F],
  ["h2", F],
  ["h3", F],
  ["h4", F],
  ["h5", F],
  ["h6", F],
  ["select", we],
  ["input", we],
  ["output", we],
  ["button", we],
  ["datalist", we],
  ["textarea", we],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Jr],
  ["dt", Jr],
  ["address", F],
  ["article", F],
  ["aside", F],
  ["blockquote", F],
  ["details", F],
  ["div", F],
  ["dl", F],
  ["fieldset", F],
  ["figcaption", F],
  ["figure", F],
  ["footer", F],
  ["form", F],
  ["header", F],
  ["hr", F],
  ["main", F],
  ["nav", F],
  ["ol", F],
  ["pre", F],
  ["section", F],
  ["table", F],
  ["ul", F],
  ["rt", Pr],
  ["rp", Pr],
  ["tbody", _r],
  ["tfoot", _r]
]), Jc = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), Zr = /* @__PURE__ */ new Set(["math", "svg"]), Vr = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), Pc = /\s|\//;
let Zc = class {
  constructor(t, e = {}) {
    var n, i, r, o, A, c;
    this.options = e, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = (n = e.lowerCaseTags) !== null && n !== void 0 ? n : this.htmlMode, this.lowerCaseAttributeNames = (i = e.lowerCaseAttributeNames) !== null && i !== void 0 ? i : this.htmlMode, this.recognizeSelfClosing = (r = e.recognizeSelfClosing) !== null && r !== void 0 ? r : !this.htmlMode, this.tokenizer = new ((o = e.Tokenizer) !== null && o !== void 0 ? o : $o)(this.options, this), this.foreignContext = [!this.htmlMode], (c = (A = this.cbs).onparserinit) === null || c === void 0 || c.call(A, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(t, e) {
    var n, i;
    const r = this.getSlice(t, e);
    this.endIndex = e - 1, (i = (n = this.cbs).ontext) === null || i === void 0 || i.call(n, r), this.startIndex = e;
  }
  /** @internal */
  ontextentity(t, e) {
    var n, i;
    this.endIndex = e - 1, (i = (n = this.cbs).ontext) === null || i === void 0 || i.call(n, Yr(t)), this.startIndex = e;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   */
  isVoidElement(t) {
    return this.htmlMode && Jc.has(t);
  }
  /** @internal */
  onopentagname(t, e) {
    this.endIndex = e;
    let n = this.getSlice(t, e);
    this.lowerCaseTagNames && (n = n.toLowerCase()), this.emitOpenTag(n);
  }
  emitOpenTag(t) {
    var e, n, i, r;
    this.openTagStart = this.startIndex, this.tagname = t;
    const o = this.htmlMode && _c.get(t);
    if (o)
      for (; this.stack.length > 0 && o.has(this.stack[0]); ) {
        const A = this.stack.shift();
        (n = (e = this.cbs).onclosetag) === null || n === void 0 || n.call(e, A, !0);
      }
    this.isVoidElement(t) || (this.stack.unshift(t), this.htmlMode && (Zr.has(t) ? this.foreignContext.unshift(!0) : Vr.has(t) && this.foreignContext.unshift(!1))), (r = (i = this.cbs).onopentagname) === null || r === void 0 || r.call(i, t), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(t) {
    var e, n;
    this.startIndex = this.openTagStart, this.attribs && ((n = (e = this.cbs).onopentag) === null || n === void 0 || n.call(e, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /** @internal */
  onopentagend(t) {
    this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
  }
  /** @internal */
  onclosetag(t, e) {
    var n, i, r, o, A, c, a, u;
    this.endIndex = e;
    let g = this.getSlice(t, e);
    if (this.lowerCaseTagNames && (g = g.toLowerCase()), this.htmlMode && (Zr.has(g) || Vr.has(g)) && this.foreignContext.shift(), this.isVoidElement(g))
      this.htmlMode && g === "br" && ((o = (r = this.cbs).onopentagname) === null || o === void 0 || o.call(r, "br"), (c = (A = this.cbs).onopentag) === null || c === void 0 || c.call(A, "br", {}, !0), (u = (a = this.cbs).onclosetag) === null || u === void 0 || u.call(a, "br", !1));
    else {
      const S = this.stack.indexOf(g);
      if (S !== -1)
        for (let b = 0; b <= S; b++) {
          const B = this.stack.shift();
          (i = (n = this.cbs).onclosetag) === null || i === void 0 || i.call(n, B, b !== S);
        }
      else this.htmlMode && g === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = e + 1;
  }
  /** @internal */
  onselfclosingtag(t) {
    this.endIndex = t, this.recognizeSelfClosing || this.foreignContext[0] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
  }
  closeCurrentTag(t) {
    var e, n;
    const i = this.tagname;
    this.endOpenTag(t), this.stack[0] === i && ((n = (e = this.cbs).onclosetag) === null || n === void 0 || n.call(e, i, !t), this.stack.shift());
  }
  /** @internal */
  onattribname(t, e) {
    this.startIndex = t;
    const n = this.getSlice(t, e);
    this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n;
  }
  /** @internal */
  onattribdata(t, e) {
    this.attribvalue += this.getSlice(t, e);
  }
  /** @internal */
  onattribentity(t) {
    this.attribvalue += Yr(t);
  }
  /** @internal */
  onattribend(t, e) {
    var n, i;
    this.endIndex = e, (i = (n = this.cbs).onattribute) === null || i === void 0 || i.call(n, this.attribname, this.attribvalue, t === wt.Double ? '"' : t === wt.Single ? "'" : t === wt.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
  }
  getInstructionName(t) {
    const e = t.search(Pc);
    let n = e < 0 ? t : t.substr(0, e);
    return this.lowerCaseTagNames && (n = n.toLowerCase()), n;
  }
  /** @internal */
  ondeclaration(t, e) {
    this.endIndex = e;
    const n = this.getSlice(t, e);
    if (this.cbs.onprocessinginstruction) {
      const i = this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`!${i}`, `!${n}`);
    }
    this.startIndex = e + 1;
  }
  /** @internal */
  onprocessinginstruction(t, e) {
    this.endIndex = e;
    const n = this.getSlice(t, e);
    if (this.cbs.onprocessinginstruction) {
      const i = this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`?${i}`, `?${n}`);
    }
    this.startIndex = e + 1;
  }
  /** @internal */
  oncomment(t, e, n) {
    var i, r, o, A;
    this.endIndex = e, (r = (i = this.cbs).oncomment) === null || r === void 0 || r.call(i, this.getSlice(t, e - n)), (A = (o = this.cbs).oncommentend) === null || A === void 0 || A.call(o), this.startIndex = e + 1;
  }
  /** @internal */
  oncdata(t, e, n) {
    var i, r, o, A, c, a, u, g, S, b;
    this.endIndex = e;
    const B = this.getSlice(t, e - n);
    !this.htmlMode || this.options.recognizeCDATA ? ((r = (i = this.cbs).oncdatastart) === null || r === void 0 || r.call(i), (A = (o = this.cbs).ontext) === null || A === void 0 || A.call(o, B), (a = (c = this.cbs).oncdataend) === null || a === void 0 || a.call(c)) : ((g = (u = this.cbs).oncomment) === null || g === void 0 || g.call(u, `[CDATA[${B}]]`), (b = (S = this.cbs).oncommentend) === null || b === void 0 || b.call(S)), this.startIndex = e + 1;
  }
  /** @internal */
  onend() {
    var t, e;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let n = 0; n < this.stack.length; n++)
        this.cbs.onclosetag(this.stack[n], !0);
    }
    (e = (t = this.cbs).onend) === null || e === void 0 || e.call(t);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var t, e, n, i;
    (e = (t = this.cbs).onreset) === null || e === void 0 || e.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (i = (n = this.cbs).onparserinit) === null || i === void 0 || i.call(n, this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(!this.htmlMode), this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(t) {
    this.reset(), this.end(t);
  }
  getSlice(t, e) {
    for (; t - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let n = this.buffers[0].slice(t - this.bufferOffset, e - this.bufferOffset);
    for (; e - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(), n += this.buffers[0].slice(0, e - this.bufferOffset);
    return n;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(t) {
    var e, n;
    if (this.ended) {
      (n = (e = this.cbs).onerror) === null || n === void 0 || n.call(e, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(t) {
    var e, n;
    if (this.ended) {
      (n = (e = this.cbs).onerror) === null || n === void 0 || n.call(e, new Error(".end() after done!"));
      return;
    }
    t && this.write(t), this.ended = !0, this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(t) {
    this.write(t);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(t) {
    this.end(t);
  }
};
var J;
(function(s) {
  s.Root = "root", s.Text = "text", s.Directive = "directive", s.Comment = "comment", s.Script = "script", s.Style = "style", s.Tag = "tag", s.CDATA = "cdata", s.Doctype = "doctype";
})(J || (J = {}));
function Vc(s) {
  return s.type === J.Tag || s.type === J.Script || s.type === J.Style;
}
const Xc = J.Root, jc = J.Text, qc = J.Directive, zc = J.Comment, $c = J.Script, tl = J.Style, el = J.Tag, sl = J.CDATA, nl = J.Doctype;
function Ct(s) {
  return Vc(s);
}
function Ri(s) {
  return s.type === J.CDATA;
}
function De(s) {
  return s.type === J.Text;
}
function tA(s) {
  return s.type === J.Comment;
}
function il(s) {
  return s.type === J.Root;
}
function Bt(s) {
  return Object.prototype.hasOwnProperty.call(s, "children");
}
const Xr = /["&'<>$\x80-\uFFFF]/g, rl = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]), ol = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (s, t) => s.codePointAt(t) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (s, t) => (s.charCodeAt(t) & 64512) === 55296 ? (s.charCodeAt(t) - 55296) * 1024 + s.charCodeAt(t + 1) - 56320 + 65536 : s.charCodeAt(t)
  )
);
function eA(s) {
  let t = "", e = 0, n;
  for (; (n = Xr.exec(s)) !== null; ) {
    const i = n.index, r = s.charCodeAt(i), o = rl.get(r);
    o !== void 0 ? (t += s.substring(e, i) + o, e = i + 1) : (t += `${s.substring(e, i)}&#x${ol(s, i).toString(16)};`, e = Xr.lastIndex += +((r & 64512) === 55296));
  }
  return t + s.substr(e);
}
function sA(s, t) {
  return function(n) {
    let i, r = 0, o = "";
    for (; i = s.exec(n); )
      r !== i.index && (o += n.substring(r, i.index)), o += t.get(i[0].charCodeAt(0)), r = i.index + 1;
    return o + n.substring(r);
  };
}
const Al = sA(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
])), al = sA(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
])), cl = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((s) => [s.toLowerCase(), s])), ll = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((s) => [s.toLowerCase(), s])), ul = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function hl(s) {
  return s.replace(/"/g, "&quot;");
}
function gl(s, t) {
  var e;
  if (!s)
    return;
  const n = ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) === !1 ? hl : t.xmlMode || t.encodeEntities !== "utf8" ? eA : Al;
  return Object.keys(s).map((i) => {
    var r, o;
    const A = (r = s[i]) !== null && r !== void 0 ? r : "";
    return t.xmlMode === "foreign" && (i = (o = ll.get(i)) !== null && o !== void 0 ? o : i), !t.emptyAttrs && !t.xmlMode && A === "" ? i : `${i}="${n(A)}"`;
  }).join(" ");
}
const jr = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function Bi(s, t = {}) {
  const e = "length" in s ? s : [s];
  let n = "";
  for (let i = 0; i < e.length; i++)
    n += dl(e[i], t);
  return n;
}
function dl(s, t) {
  switch (s.type) {
    case Xc:
      return Bi(s.children, t);
    // @ts-expect-error We don't use `Doctype` yet
    case nl:
    case qc:
      return Sl(s);
    case zc:
      return yl(s);
    case sl:
      return bl(s);
    case $c:
    case tl:
    case el:
      return ml(s, t);
    case jc:
      return Cl(s, t);
  }
}
const fl = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), pl = /* @__PURE__ */ new Set(["svg", "math"]);
function ml(s, t) {
  var e;
  t.xmlMode === "foreign" && (s.name = (e = cl.get(s.name)) !== null && e !== void 0 ? e : s.name, s.parent && fl.has(s.parent.name) && (t = { ...t, xmlMode: !1 })), !t.xmlMode && pl.has(s.name) && (t = { ...t, xmlMode: "foreign" });
  let n = `<${s.name}`;
  const i = gl(s.attribs, t);
  return i && (n += ` ${i}`), s.children.length === 0 && (t.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    t.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    t.selfClosingTags && jr.has(s.name)
  )) ? (t.xmlMode || (n += " "), n += "/>") : (n += ">", s.children.length > 0 && (n += Bi(s.children, t)), (t.xmlMode || !jr.has(s.name)) && (n += `</${s.name}>`)), n;
}
function Sl(s) {
  return `<${s.data}>`;
}
function Cl(s, t) {
  var e;
  let n = s.data || "";
  return ((e = t.encodeEntities) !== null && e !== void 0 ? e : t.decodeEntities) !== !1 && !(!t.xmlMode && s.parent && ul.has(s.parent.name)) && (n = t.xmlMode || t.encodeEntities !== "utf8" ? eA(n) : al(n)), n;
}
function bl(s) {
  return `<![CDATA[${s.children[0].data}]]>`;
}
function yl(s) {
  return `<!--${s.data}-->`;
}
function nA(s, t) {
  return Bi(s, t);
}
function El(s, t) {
  return Bt(s) ? s.children.map((e) => nA(e, t)).join("") : "";
}
function Qs(s) {
  return Array.isArray(s) ? s.map(Qs).join("") : Ct(s) ? s.name === "br" ? `
` : Qs(s.children) : Ri(s) ? Qs(s.children) : De(s) ? s.data : "";
}
function Ys(s) {
  return Array.isArray(s) ? s.map(Ys).join("") : Bt(s) && !tA(s) ? Ys(s.children) : De(s) ? s.data : "";
}
function di(s) {
  return Array.isArray(s) ? s.map(di).join("") : Bt(s) && (s.type === J.Tag || Ri(s)) ? di(s.children) : De(s) ? s.data : "";
}
function iA(s) {
  return Bt(s) ? s.children : [];
}
function rA(s) {
  return s.parent || null;
}
function Il(s) {
  const t = rA(s);
  if (t != null)
    return iA(t);
  const e = [s];
  let { prev: n, next: i } = s;
  for (; n != null; )
    e.unshift(n), { prev: n } = n;
  for (; i != null; )
    e.push(i), { next: i } = i;
  return e;
}
function wl(s, t) {
  var e;
  return (e = s.attribs) === null || e === void 0 ? void 0 : e[t];
}
function Rl(s, t) {
  return s.attribs != null && Object.prototype.hasOwnProperty.call(s.attribs, t) && s.attribs[t] != null;
}
function Bl(s) {
  return s.name;
}
function Tl(s) {
  let { next: t } = s;
  for (; t !== null && !Ct(t); )
    ({ next: t } = t);
  return t;
}
function Dl(s) {
  let { prev: t } = s;
  for (; t !== null && !Ct(t); )
    ({ prev: t } = t);
  return t;
}
function is(s) {
  if (s.prev && (s.prev.next = s.next), s.next && (s.next.prev = s.prev), s.parent) {
    const t = s.parent.children, e = t.lastIndexOf(s);
    e >= 0 && t.splice(e, 1);
  }
  s.next = null, s.prev = null, s.parent = null;
}
function xl(s, t) {
  const e = t.prev = s.prev;
  e && (e.next = t);
  const n = t.next = s.next;
  n && (n.prev = t);
  const i = t.parent = s.parent;
  if (i) {
    const r = i.children;
    r[r.lastIndexOf(s)] = t, s.parent = null;
  }
}
function Nl(s, t) {
  if (is(t), t.next = null, t.parent = s, s.children.push(t) > 1) {
    const e = s.children[s.children.length - 2];
    e.next = t, t.prev = e;
  } else
    t.prev = null;
}
function vl(s, t) {
  is(t);
  const { parent: e } = s, n = s.next;
  if (t.next = n, t.prev = s, s.next = t, t.parent = e, n) {
    if (n.prev = t, e) {
      const i = e.children;
      i.splice(i.lastIndexOf(n), 0, t);
    }
  } else e && e.children.push(t);
}
function Fl(s, t) {
  if (is(t), t.parent = s, t.prev = null, s.children.unshift(t) !== 1) {
    const e = s.children[1];
    e.prev = t, t.next = e;
  } else
    t.next = null;
}
function Ml(s, t) {
  is(t);
  const { parent: e } = s;
  if (e) {
    const n = e.children;
    n.splice(n.indexOf(s), 0, t);
  }
  s.prev && (s.prev.next = t), t.parent = e, t.prev = s.prev, t.next = s, s.prev = t;
}
function rs(s, t, e = !0, n = 1 / 0) {
  return oA(s, Array.isArray(t) ? t : [t], e, n);
}
function oA(s, t, e, n) {
  const i = [], r = [Array.isArray(t) ? t : [t]], o = [0];
  for (; ; ) {
    if (o[0] >= r[0].length) {
      if (o.length === 1)
        return i;
      r.shift(), o.shift();
      continue;
    }
    const A = r[0][o[0]++];
    if (s(A) && (i.push(A), --n <= 0))
      return i;
    e && Bt(A) && A.children.length > 0 && (o.unshift(0), r.unshift(A.children));
  }
}
function kl(s, t) {
  return t.find(s);
}
function Ti(s, t, e = !0) {
  const n = Array.isArray(t) ? t : [t];
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (Ct(r) && s(r))
      return r;
    if (e && Bt(r) && r.children.length > 0) {
      const o = Ti(s, r.children, !0);
      if (o)
        return o;
    }
  }
  return null;
}
function AA(s, t) {
  return (Array.isArray(t) ? t : [t]).some((e) => Ct(e) && s(e) || Bt(e) && AA(s, e.children));
}
function Ol(s, t) {
  const e = [], n = [Array.isArray(t) ? t : [t]], i = [0];
  for (; ; ) {
    if (i[0] >= n[0].length) {
      if (n.length === 1)
        return e;
      n.shift(), i.shift();
      continue;
    }
    const r = n[0][i[0]++];
    Ct(r) && s(r) && e.push(r), Bt(r) && r.children.length > 0 && (i.unshift(0), n.unshift(r.children));
  }
}
const Us = {
  tag_name(s) {
    return typeof s == "function" ? (t) => Ct(t) && s(t.name) : s === "*" ? Ct : (t) => Ct(t) && t.name === s;
  },
  tag_type(s) {
    return typeof s == "function" ? (t) => s(t.type) : (t) => t.type === s;
  },
  tag_contains(s) {
    return typeof s == "function" ? (t) => De(t) && s(t.data) : (t) => De(t) && t.data === s;
  }
};
function Di(s, t) {
  return typeof t == "function" ? (e) => Ct(e) && t(e.attribs[s]) : (e) => Ct(e) && e.attribs[s] === t;
}
function Ql(s, t) {
  return (e) => s(e) || t(e);
}
function aA(s) {
  const t = Object.keys(s).map((e) => {
    const n = s[e];
    return Object.prototype.hasOwnProperty.call(Us, e) ? Us[e](n) : Di(e, n);
  });
  return t.length === 0 ? null : t.reduce(Ql);
}
function Ll(s, t) {
  const e = aA(s);
  return e ? e(t) : !0;
}
function Gl(s, t, e, n = 1 / 0) {
  const i = aA(s);
  return i ? rs(i, t, e, n) : [];
}
function Kl(s, t, e = !0) {
  return Array.isArray(t) || (t = [t]), Ti(Di("id", s), t, e);
}
function ve(s, t, e = !0, n = 1 / 0) {
  return rs(Us.tag_name(s), t, e, n);
}
function Hl(s, t, e = !0, n = 1 / 0) {
  return rs(Di("class", s), t, e, n);
}
function Wl(s, t, e = !0, n = 1 / 0) {
  return rs(Us.tag_type(s), t, e, n);
}
function Yl(s) {
  let t = s.length;
  for (; --t >= 0; ) {
    const e = s[t];
    if (t > 0 && s.lastIndexOf(e, t - 1) >= 0) {
      s.splice(t, 1);
      continue;
    }
    for (let n = e.parent; n; n = n.parent)
      if (s.includes(n)) {
        s.splice(t, 1);
        break;
      }
  }
  return s;
}
var St;
(function(s) {
  s[s.DISCONNECTED = 1] = "DISCONNECTED", s[s.PRECEDING = 2] = "PRECEDING", s[s.FOLLOWING = 4] = "FOLLOWING", s[s.CONTAINS = 8] = "CONTAINS", s[s.CONTAINED_BY = 16] = "CONTAINED_BY";
})(St || (St = {}));
function cA(s, t) {
  const e = [], n = [];
  if (s === t)
    return 0;
  let i = Bt(s) ? s : s.parent;
  for (; i; )
    e.unshift(i), i = i.parent;
  for (i = Bt(t) ? t : t.parent; i; )
    n.unshift(i), i = i.parent;
  const r = Math.min(e.length, n.length);
  let o = 0;
  for (; o < r && e[o] === n[o]; )
    o++;
  if (o === 0)
    return St.DISCONNECTED;
  const A = e[o - 1], c = A.children, a = e[o], u = n[o];
  return c.indexOf(a) > c.indexOf(u) ? A === t ? St.FOLLOWING | St.CONTAINED_BY : St.FOLLOWING : A === s ? St.PRECEDING | St.CONTAINS : St.PRECEDING;
}
function Ul(s) {
  return s = s.filter((t, e, n) => !n.includes(t, e + 1)), s.sort((t, e) => {
    const n = cA(t, e);
    return n & St.PRECEDING ? -1 : n & St.FOLLOWING ? 1 : 0;
  }), s;
}
function lA(s) {
  const t = _s(Vl, s);
  return t ? t.name === "feed" ? _l(t) : Jl(t) : null;
}
function _l(s) {
  var t;
  const e = s.children, n = {
    type: "atom",
    items: ve("entry", e).map((o) => {
      var A;
      const { children: c } = o, a = { media: uA(c) };
      ht(a, "id", "id", c), ht(a, "title", "title", c);
      const u = (A = _s("link", c)) === null || A === void 0 ? void 0 : A.attribs.href;
      u && (a.link = u);
      const g = Xt("summary", c) || Xt("content", c);
      g && (a.description = g);
      const S = Xt("updated", c);
      return S && (a.pubDate = new Date(S)), a;
    })
  };
  ht(n, "id", "id", e), ht(n, "title", "title", e);
  const i = (t = _s("link", e)) === null || t === void 0 ? void 0 : t.attribs.href;
  i && (n.link = i), ht(n, "description", "subtitle", e);
  const r = Xt("updated", e);
  return r && (n.updated = new Date(r)), ht(n, "author", "email", e, !0), n;
}
function Jl(s) {
  var t, e;
  const n = (e = (t = _s("channel", s.children)) === null || t === void 0 ? void 0 : t.children) !== null && e !== void 0 ? e : [], i = {
    type: s.name.substr(0, 3),
    id: "",
    items: ve("item", s.children).map((o) => {
      const { children: A } = o, c = { media: uA(A) };
      ht(c, "id", "guid", A), ht(c, "title", "title", A), ht(c, "link", "link", A), ht(c, "description", "description", A);
      const a = Xt("pubDate", A) || Xt("dc:date", A);
      return a && (c.pubDate = new Date(a)), c;
    })
  };
  ht(i, "title", "title", n), ht(i, "link", "link", n), ht(i, "description", "description", n);
  const r = Xt("lastBuildDate", n);
  return r && (i.updated = new Date(r)), ht(i, "author", "managingEditor", n, !0), i;
}
const Pl = ["url", "type", "lang"], Zl = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function uA(s) {
  return ve("media:content", s).map((t) => {
    const { attribs: e } = t, n = {
      medium: e.medium,
      isDefault: !!e.isDefault
    };
    for (const i of Pl)
      e[i] && (n[i] = e[i]);
    for (const i of Zl)
      e[i] && (n[i] = parseInt(e[i], 10));
    return e.expression && (n.expression = e.expression), n;
  });
}
function _s(s, t) {
  return ve(s, t, !0, 1)[0];
}
function Xt(s, t, e = !1) {
  return Ys(ve(s, t, e, 1)).trim();
}
function ht(s, t, e, n, i = !1) {
  const r = Xt(e, n, i);
  r && (s[t] = r);
}
function Vl(s) {
  return s === "rss" || s === "feed" || s === "rdf:RDF";
}
const xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return St;
  },
  append: vl,
  appendChild: Nl,
  compareDocumentPosition: cA,
  existsOne: AA,
  filter: rs,
  find: oA,
  findAll: Ol,
  findOne: Ti,
  findOneChild: kl,
  getAttributeValue: wl,
  getChildren: iA,
  getElementById: Kl,
  getElements: Gl,
  getElementsByClassName: Hl,
  getElementsByTagName: ve,
  getElementsByTagType: Wl,
  getFeed: lA,
  getInnerHTML: El,
  getName: Bl,
  getOuterHTML: nA,
  getParent: rA,
  getSiblings: Il,
  getText: Qs,
  hasAttrib: Rl,
  hasChildren: Bt,
  innerText: di,
  isCDATA: Ri,
  isComment: tA,
  isDocument: il,
  isTag: Ct,
  isText: De,
  nextElementSibling: Tl,
  prepend: Ml,
  prependChild: Fl,
  prevElementSibling: Dl,
  removeElement: is,
  removeSubsets: Yl,
  replaceElement: xl,
  testElement: Ll,
  textContent: Ys,
  uniqueSort: Ul
}, Symbol.toStringTag, { value: "Module" })), Xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DomUtils: xi,
  Parser: Zc,
  get QuoteType() {
    return wt;
  },
  Tokenizer: $o,
  getFeed: lA
}, Symbol.toStringTag, { value: "Module" })), zt = -1, x = 1, $ = 2, it = 3, Ot = 4, Wt = 8, Ae = 9, xe = 10, Ht = 11, jl = /* @__PURE__ */ new Set(["ARTICLE", "ASIDE", "BLOCKQUOTE", "BODY", "BR", "BUTTON", "CANVAS", "CAPTION", "COL", "COLGROUP", "DD", "DIV", "DL", "DT", "EMBED", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "UL", "OL", "P"]), ql = -1, zl = 1, $l = 4, tu = 8, eu = 128, su = 1, qr = 2, zr = 4, nu = 8, iu = 16, ru = 32, Js = "http://www.w3.org/2000/svg", {
  assign: ou,
  create: Au,
  defineProperties: au,
  entries: cu,
  keys: lu,
  setPrototypeOf: ct
} = Object, ce = String, gt = (s) => s.nodeType === x ? s[w] : s, $t = ({ ownerDocument: s }) => s[Ne].ignoreCase, Rt = (s, t) => {
  s[m] = t, t[X] = s;
}, hA = (s, t, e) => {
  Rt(s, t), Rt(gt(t), e);
}, gA = (s, t, e, n) => {
  Rt(s, t), Rt(gt(e), n);
}, tn = (s, t, e) => {
  Rt(s, t), Rt(t, e);
}, fi = ({ localName: s, ownerDocument: t }) => t[Ne].ignoreCase ? s.toUpperCase() : s, dA = (s, t) => {
  s && (s[m] = t), t && (t[X] = s);
}, fA = (s, t) => {
  const e = s.createDocumentFragment(), n = s.createElement("");
  n.innerHTML = t;
  const { firstChild: i, lastChild: r } = n;
  if (i) {
    gA(e, i, r, e[w]);
    let o = i;
    do
      o.parentNode = e;
    while (o !== r && (o = gt(o)[m]));
  }
  return e;
}, jt = /* @__PURE__ */ new WeakMap();
let en = !1;
const Be = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), sn = (s, t, e, n) => {
  en && ue.has(s) && s.attributeChangedCallback && s.constructor.observedAttributes.includes(t) && s.attributeChangedCallback(t, e, n);
}, pA = (s, t) => (e) => {
  if (ue.has(e)) {
    const n = ue.get(e);
    n.connected !== t && e.isConnected === t && (n.connected = t, s in e && e[s]());
  }
}, $r = pA("connectedCallback", !0), pi = (s) => {
  if (en) {
    $r(s), jt.has(s) && (s = jt.get(s).shadowRoot);
    let { [m]: t, [w]: e } = s;
    for (; t !== e; )
      t.nodeType === x && $r(t), t = t[m];
  }
}, to = pA("disconnectedCallback", !1), uu = (s) => {
  if (en) {
    to(s), jt.has(s) && (s = jt.get(s).shadowRoot);
    let { [m]: t, [w]: e } = s;
    for (; t !== e; )
      t.nodeType === x && to(t), t = t[m];
  }
};
class hu {
  /**
   * @param {Document} ownerDocument
   */
  constructor(t) {
    this.ownerDocument = t, this.registry = /* @__PURE__ */ new Map(), this.waiting = /* @__PURE__ */ new Map(), this.active = !1;
  }
  /**
   * @param {string} localName the custom element definition name
   * @param {Function} Class the custom element **Class** definition
   * @param {object?} options the optional object with an `extends` property
   */
  define(t, e, n = {}) {
    const { ownerDocument: i, registry: r, waiting: o } = this;
    if (r.has(t))
      throw new Error("unable to redefine " + t);
    if (Be.has(e))
      throw new Error("unable to redefine the same class: " + e);
    this.active = en = !0;
    const { extends: A } = n;
    Be.set(e, {
      ownerDocument: i,
      options: { is: A ? t : "" },
      localName: A || t
    });
    const c = A ? (a) => a.localName === A && a.getAttribute("is") === t : (a) => a.localName === t;
    if (r.set(t, { Class: e, check: c }), o.has(t)) {
      for (const a of o.get(t))
        a(e);
      o.delete(t);
    }
    i.querySelectorAll(
      A ? `${A}[is="${t}"]` : t
    ).forEach(this.upgrade, this);
  }
  /**
   * @param {Element} element
   */
  upgrade(t) {
    if (ue.has(t))
      return;
    const { ownerDocument: e, registry: n } = this, i = t.getAttribute("is") || t.localName;
    if (n.has(i)) {
      const { Class: r, check: o } = n.get(i);
      if (o(t)) {
        const { attributes: A, isConnected: c } = t;
        for (const u of A)
          t.removeAttributeNode(u);
        const a = cu(t);
        for (const [u] of a)
          delete t[u];
        ct(t, r.prototype), e[qe] = { element: t, values: a }, new r(e, i), ue.set(t, { connected: c });
        for (const u of A)
          t.setAttributeNode(u);
        c && t.connectedCallback && t.connectedCallback();
      }
    }
  }
  /**
   * @param {string} localName the custom element definition name
   */
  whenDefined(t) {
    const { registry: e, waiting: n } = this;
    return new Promise((i) => {
      e.has(t) ? i(e.get(t).Class) : (n.has(t) || n.set(t, []), n.get(t).push(i));
    });
  }
  /**
   * @param {string} localName the custom element definition name
   * @returns {Function?} the custom element **Class**, if any
   */
  get(t) {
    const e = this.registry.get(t);
    return e && e.Class;
  }
  /**
   * @param {Function} Class **Class** of custom element
   * @returns {string?} found tag name or null
   */
  getName(t) {
    if (Be.has(t)) {
      const { localName: e } = Be.get(t);
      return e;
    }
    return null;
  }
}
const { Parser: gu } = Xl, re = (s, t, e) => {
  const n = s[w];
  return t.parentNode = s, hA(n[X], t, n), e && t.nodeType === x && pi(t), t;
}, du = (s, t, e, n, i) => {
  e[M] = n, e.ownerElement = s, tn(t[X], e, t), e.name === "class" && (s.className = n), i && sn(s, e.name, null, n);
}, mA = (s, t, e) => {
  const { active: n, registry: i } = s[Et];
  let r = s, o = null, A = !1;
  const c = new gu({
    // <!DOCTYPE ...>
    onprocessinginstruction(a, u) {
      a.toLowerCase() === "!doctype" && (s.doctype = u.slice(a.length).trim());
    },
    // <tagName>
    onopentag(a, u) {
      let g = !0;
      if (t) {
        if (o)
          r = re(r, s.createElementNS(Js, a), n), r.ownerSVGElement = o, g = !1;
        else if (a === "svg" || a === "SVG")
          o = s.createElementNS(Js, a), r = re(r, o, n), g = !1;
        else if (n) {
          const b = a.includes("-") ? a : u.is || "";
          if (b && i.has(b)) {
            const { Class: B } = i.get(b);
            r = re(r, new B(), n), delete u.is, g = !1;
          }
        }
      }
      g && (r = re(r, s.createElement(a), !1));
      let S = r[w];
      for (const b of lu(u))
        du(r, S, s.createAttribute(b), u[b], n);
    },
    // #text, #comment
    oncomment(a) {
      re(r, s.createComment(a), n);
    },
    ontext(a) {
      A ? re(r, s.createCDATASection(a), n) : re(r, s.createTextNode(a), n);
    },
    // #cdata
    oncdatastart() {
      A = !0;
    },
    oncdataend() {
      A = !1;
    },
    // </tagName>
    onclosetag() {
      t && r === o && (o = null), r = r.parentNode;
    }
  }, {
    lowerCaseAttributeNames: !1,
    decodeEntities: !0,
    xmlMode: !t
  });
  return c.write(e), c.end(), s;
}, Ps = /* @__PURE__ */ new Map(), P = (s, t) => {
  for (const e of [].concat(s))
    Ps.set(e, t), Ps.set(e.toUpperCase(), t);
}, SA = ({ [m]: s, [w]: t }, e) => {
  for (; s !== t; ) {
    switch (s.nodeType) {
      case $:
        CA(s, e);
        break;
      case it:
      case Wt:
      case Ot:
        bA(s, e);
        break;
      case x:
        EA(s, e), s = gt(s);
        break;
      case xe:
        yA(s, e);
        break;
    }
    s = s[m];
  }
  const n = e.length - 1, i = e[n];
  typeof i == "number" && i < 0 ? e[n] += zt : e.push(zt);
}, CA = (s, t) => {
  t.push($, s.name);
  const e = s[M].trim();
  e && t.push(e);
}, bA = (s, t) => {
  const e = s[M];
  e.trim() && t.push(s.nodeType, e);
}, fu = (s, t) => {
  t.push(s.nodeType), SA(s, t);
}, yA = ({ name: s, publicId: t, systemId: e }, n) => {
  n.push(xe, s), t && n.push(t), e && n.push(e);
}, EA = (s, t) => {
  t.push(x, s.localName), SA(s, t);
}, IA = (s, t, e, n, i, r, o) => ({
  type: s,
  target: t,
  addedNodes: n,
  removedNodes: i,
  attributeName: r,
  oldValue: o,
  previousSibling: e?.previousSibling || null,
  nextSibling: e?.nextSibling || null
}), eo = (s, t, e, n, i, r) => {
  if (!n || n.includes(e)) {
    const { callback: o, records: A, scheduled: c } = s;
    A.push(IA(
      "attributes",
      t,
      null,
      [],
      [],
      e,
      i ? r : void 0
    )), c || (s.scheduled = !0, Promise.resolve().then(() => {
      s.scheduled = !1, o(A.splice(0), s);
    }));
  }
}, Ni = (s, t, e) => {
  const { ownerDocument: n } = s, { active: i, observers: r } = n[Vt];
  if (i) {
    for (const o of r)
      for (const [
        A,
        {
          childList: c,
          subtree: a,
          attributes: u,
          attributeFilter: g,
          attributeOldValue: S
        }
      ] of o.nodes)
        if (c) {
          if (a && (A === n || A.contains(s)) || !a && A.children.includes(s)) {
            eo(
              o,
              s,
              t,
              g,
              S,
              e
            );
            break;
          }
        } else if (u && A === s) {
          eo(
            o,
            s,
            t,
            g,
            S,
            e
          );
          break;
        }
  }
}, ze = (s, t) => {
  const { ownerDocument: e } = s, { active: n, observers: i } = e[Vt];
  if (n) {
    for (const r of i)
      for (const [o, { subtree: A, childList: c, characterData: a }] of r.nodes)
        if (c && (t && (o === t || /* c8 ignore next */
        A && o.contains(t)) || !t && (A && (o === e || /* c8 ignore next */
        o.contains(s)) || !A && o[a ? "childNodes" : "children"].includes(s)))) {
          const { callback: u, records: g, scheduled: S } = r;
          g.push(IA(
            "childList",
            o,
            s,
            t ? [] : [s],
            t ? [s] : []
          )), S || (r.scheduled = !0, Promise.resolve().then(() => {
            r.scheduled = !1, u(g.splice(0), r);
          }));
          break;
        }
  }
};
class pu {
  constructor(t) {
    const e = /* @__PURE__ */ new Set();
    this.observers = e, this.active = !1, this.class = class {
      constructor(i) {
        this.callback = i, this.nodes = /* @__PURE__ */ new Map(), this.records = [], this.scheduled = !1;
      }
      disconnect() {
        this.records.splice(0), this.nodes.clear(), e.delete(this), t[Vt].active = !!e.size;
      }
      /**
       * @param {Element} target
       * @param {MutationObserverInit} options
       */
      observe(i, r = {
        subtree: !1,
        childList: !1,
        attributes: !1,
        attributeFilter: null,
        attributeOldValue: !1,
        characterData: !1
        // TODO: not implemented yet
        // characterDataOldValue: false
      }) {
        ("attributeOldValue" in r || "attributeFilter" in r) && (r.attributes = !0), r.childList = !!r.childList, r.subtree = !!r.subtree, this.nodes.set(i, r), e.add(this), t[Vt].active = !0;
      }
      /**
       * @returns {MutationRecord[]}
       */
      takeRecords() {
        return this.records.splice(0);
      }
    };
  }
}
const mu = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "class",
  "contenteditable",
  "controls",
  "default",
  "defer",
  "disabled",
  "draggable",
  "formnovalidate",
  "hidden",
  "id",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "style",
  "truespeed"
]), mi = (s, t) => {
  const { [M]: e, name: n } = t;
  t.ownerElement = s, tn(s, t, s[m]), n === "class" && (s.className = e), Ni(s, n, null), sn(s, n, null, e);
}, so = (s, t) => {
  const { [M]: e, name: n } = t;
  Rt(t[X], t[m]), t.ownerElement = t[X] = t[m] = null, n === "class" && (s[Re] = null), Ni(s, n, e), sn(s, n, e, null);
}, v = {
  get(s, t) {
    return s.hasAttribute(t);
  },
  set(s, t, e) {
    e ? s.setAttribute(t, "") : s.removeAttribute(t);
  }
}, qt = {
  get(s, t) {
    return parseFloat(s.getAttribute(t) || 0);
  },
  set(s, t, e) {
    s.setAttribute(t, e);
  }
}, p = {
  get(s, t) {
    return s.getAttribute(t) || "";
  },
  set(s, t, e) {
    s.setAttribute(t, e);
  }
}, Ls = /* @__PURE__ */ new WeakMap();
function Su(s, t) {
  return typeof t == "function" ? t.call(s.target, s) : t.handleEvent(s), s._stopImmediatePropagationFlag;
}
function Cu({ currentTarget: s, target: t }) {
  const e = Ls.get(s);
  if (e && e.has(this.type)) {
    const n = e.get(this.type);
    s === t ? this.eventPhase = this.AT_TARGET : this.eventPhase = this.BUBBLING_PHASE, this.currentTarget = s, this.target = t;
    for (const [i, r] of n)
      if (r && r.once && n.delete(i), Su(this, i))
        break;
    return delete this.currentTarget, delete this.target, this.cancelBubble;
  }
}
class vi {
  constructor() {
    Ls.set(this, /* @__PURE__ */ new Map());
  }
  /**
   * @protected
   */
  _getParent() {
    return null;
  }
  addEventListener(t, e, n) {
    const i = Ls.get(this);
    i.has(t) || i.set(t, /* @__PURE__ */ new Map()), i.get(t).set(e, n);
  }
  removeEventListener(t, e) {
    const n = Ls.get(this);
    if (n.has(t)) {
      const i = n.get(t);
      i.delete(e) && !i.size && n.delete(t);
    }
  }
  dispatchEvent(t) {
    let e = this;
    for (t.eventPhase = t.CAPTURING_PHASE; e; )
      e.dispatchEvent && t._path.push({ currentTarget: e, target: this }), e = t.bubbles && e._getParent && e._getParent();
    return t._path.some(Cu, t), t._path = [], t.eventPhase = t.NONE, !t.defaultPrevented;
  }
}
class kt extends Array {
  item(t) {
    return t < this.length ? this[t] : null;
  }
}
const no = ({ parentNode: s }) => {
  let t = 0;
  for (; s; )
    t++, s = s.parentNode;
  return t;
};
let de = class extends vi {
  static get ELEMENT_NODE() {
    return x;
  }
  static get ATTRIBUTE_NODE() {
    return $;
  }
  static get TEXT_NODE() {
    return it;
  }
  static get CDATA_SECTION_NODE() {
    return Ot;
  }
  static get COMMENT_NODE() {
    return Wt;
  }
  static get DOCUMENT_NODE() {
    return Ae;
  }
  static get DOCUMENT_FRAGMENT_NODE() {
    return Ht;
  }
  static get DOCUMENT_TYPE_NODE() {
    return xe;
  }
  constructor(t, e, n) {
    super(), this.ownerDocument = t, this.localName = e, this.nodeType = n, this.parentNode = null, this[m] = null, this[X] = null;
  }
  get ELEMENT_NODE() {
    return x;
  }
  get ATTRIBUTE_NODE() {
    return $;
  }
  get TEXT_NODE() {
    return it;
  }
  get CDATA_SECTION_NODE() {
    return Ot;
  }
  get COMMENT_NODE() {
    return Wt;
  }
  get DOCUMENT_NODE() {
    return Ae;
  }
  get DOCUMENT_FRAGMENT_NODE() {
    return Ht;
  }
  get DOCUMENT_TYPE_NODE() {
    return xe;
  }
  get baseURI() {
    const t = this.nodeType === Ae ? this : this.ownerDocument;
    if (t) {
      const e = t.querySelector("base");
      if (e)
        return e.getAttribute("href");
      const { location: n } = t.defaultView;
      if (n)
        return n.href;
    }
    return null;
  }
  /* c8 ignore start */
  // mixin: node
  get isConnected() {
    return !1;
  }
  get nodeName() {
    return this.localName;
  }
  get parentElement() {
    return null;
  }
  get previousSibling() {
    return null;
  }
  get previousElementSibling() {
    return null;
  }
  get nextSibling() {
    return null;
  }
  get nextElementSibling() {
    return null;
  }
  get childNodes() {
    return new kt();
  }
  get firstChild() {
    return null;
  }
  get lastChild() {
    return null;
  }
  // default values
  get nodeValue() {
    return null;
  }
  set nodeValue(t) {
  }
  get textContent() {
    return null;
  }
  set textContent(t) {
  }
  normalize() {
  }
  cloneNode() {
    return null;
  }
  contains() {
    return !1;
  }
  /**
   * Inserts a node before a reference node as a child of this parent node.
   * @param {Node} newNode The node to be inserted.
   * @param {Node} referenceNode The node before which newNode is inserted. If this is null, then newNode is inserted at the end of node's child nodes.
   * @returns The added child
   */
  // eslint-disable-next-line no-unused-vars
  insertBefore(t, e) {
    return t;
  }
  /**
   * Adds a node to the end of the list of children of this node.
   * @param {Node} child The node to append to the given parent node.
   * @returns The appended child.
   */
  appendChild(t) {
    return t;
  }
  /**
   * Replaces a child node within this node
   * @param {Node} newChild The new node to replace oldChild.
   * @param {Node} oldChild The child to be replaced.
   * @returns The replaced Node. This is the same node as oldChild.
   */
  replaceChild(t, e) {
    return e;
  }
  /**
   * Removes a child node from the DOM.
   * @param {Node} child A Node that is the child node to be removed from the DOM.
   * @returns The removed node.
   */
  removeChild(t) {
    return t;
  }
  toString() {
    return "";
  }
  /* c8 ignore stop */
  hasChildNodes() {
    return !!this.lastChild;
  }
  isSameNode(t) {
    return this === t;
  }
  // TODO: attributes?
  compareDocumentPosition(t) {
    let e = 0;
    if (this !== t) {
      let n = no(this), i = no(t);
      if (n < i)
        e += zr, this.contains(t) && (e += iu);
      else if (i < n)
        e += qr, t.contains(this) && (e += nu);
      else if (n && i) {
        const { childNodes: r } = this.parentNode;
        r.indexOf(this) < r.indexOf(t) ? e += zr : e += qr;
      }
      (!n || !i) && (e += ru, e += su);
    }
    return e;
  }
  isEqualNode(t) {
    if (this === t)
      return !0;
    if (this.nodeType === t.nodeType) {
      switch (this.nodeType) {
        case Ae:
        case Ht: {
          const e = this.childNodes, n = t.childNodes;
          return e.length === n.length && e.every((i, r) => i.isEqualNode(n[r]));
        }
      }
      return this.toString() === t.toString();
    }
    return !1;
  }
  /**
   * @protected
   */
  _getParent() {
    return this.parentNode;
  }
  /**
   * Calling it on an element inside a standard web page will return an HTMLDocument object representing the entire page (or <iframe>).
   * Calling it on an element inside a shadow DOM will return the associated ShadowRoot.
   * @return {ShadowRoot | HTMLDocument}
   */
  getRootNode() {
    let t = this;
    for (; t.parentNode; )
      t = t.parentNode;
    return t;
  }
};
const { replace: bu } = "", yu = /[<>&\xA0]/g, Eu = {
  " ": "&#160;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
}, Iu = (s) => Eu[s], Fi = (s) => bu.call(s, yu, Iu), wu = /"/g;
let os = class wA extends de {
  constructor(t, e, n = "") {
    super(t, e, $), this.ownerElement = null, this.name = ce(e), this[M] = ce(n), this[Ws] = !1;
  }
  get value() {
    return this[M];
  }
  set value(t) {
    const { [M]: e, name: n, ownerElement: i } = this;
    this[M] = ce(t), this[Ws] = !0, i && (Ni(i, n, e), sn(i, n, e, this[M]));
  }
  cloneNode() {
    const { ownerDocument: t, name: e, [M]: n } = this;
    return new wA(t, e, n);
  }
  toString() {
    const { name: t, [M]: e } = this;
    if (mu.has(t) && !e)
      return $t(this) ? t : `${t}=""`;
    const n = ($t(this) ? e : Fi(e)).replace(wu, "&quot;");
    return `${t}="${n}"`;
  }
  toJSON() {
    const t = [];
    return CA(this, t), t;
  }
};
const RA = ({ ownerDocument: s, parentNode: t }) => {
  for (; t; ) {
    if (t === s)
      return !0;
    t = t.parentNode || t.host;
  }
  return !1;
}, BA = ({ parentNode: s }) => {
  if (s)
    switch (s.nodeType) {
      case Ae:
      case Ht:
        return null;
    }
  return s;
}, $e = ({ [X]: s }) => {
  switch (s ? s.nodeType : 0) {
    case zt:
      return s[ut];
    case it:
    case Wt:
    case Ot:
      return s;
  }
  return null;
}, le = (s) => {
  const t = gt(s)[m];
  return t && (t.nodeType === zt ? null : t);
}, Mi = (s) => {
  let t = le(s);
  for (; t && t.nodeType !== x; )
    t = le(t);
  return t;
}, TA = (s) => {
  let t = $e(s);
  for (; t && t.nodeType !== x; )
    t = $e(t);
  return t;
}, ki = (s, t) => {
  const e = s.createDocumentFragment();
  return e.append(...t), e;
}, DA = (s, t) => {
  const { ownerDocument: e, parentNode: n } = s;
  n && n.insertBefore(
    ki(e, t),
    s
  );
}, xA = (s, t) => {
  const { ownerDocument: e, parentNode: n } = s;
  n && n.insertBefore(
    ki(e, t),
    gt(s)[m]
  );
}, Oi = (s, t) => {
  const { ownerDocument: e, parentNode: n } = s;
  n && (t.includes(s) && Oi(s, [s = s.cloneNode()]), n.insertBefore(
    ki(e, t),
    s
  ), s.remove());
}, NA = (s, t, e) => {
  const { parentNode: n, nodeType: i } = t;
  (s || e) && (dA(s, e), t[X] = null, gt(t)[m] = null), n && (t.parentNode = null, ze(t, n), i === x && uu(t));
};
let As = class extends de {
  constructor(t, e, n, i) {
    super(t, e, n), this[M] = ce(i);
  }
  // <Mixins>
  get isConnected() {
    return RA(this);
  }
  get parentElement() {
    return BA(this);
  }
  get previousSibling() {
    return $e(this);
  }
  get nextSibling() {
    return le(this);
  }
  get previousElementSibling() {
    return TA(this);
  }
  get nextElementSibling() {
    return Mi(this);
  }
  before(...t) {
    DA(this, t);
  }
  after(...t) {
    xA(this, t);
  }
  replaceWith(...t) {
    Oi(this, t);
  }
  remove() {
    NA(this[X], this, this[m]);
  }
  // </Mixins>
  // CharacterData only
  /* c8 ignore start */
  get data() {
    return this[M];
  }
  set data(t) {
    this[M] = ce(t), ze(this, this.parentNode);
  }
  get nodeValue() {
    return this.data;
  }
  set nodeValue(t) {
    this.data = t;
  }
  get textContent() {
    return this.data;
  }
  set textContent(t) {
    this.data = t;
  }
  get length() {
    return this.data.length;
  }
  substringData(t, e) {
    return this.data.substr(t, e);
  }
  appendData(t) {
    this.data += t;
  }
  insertData(t, e) {
    const { data: n } = this;
    this.data = n.slice(0, t) + e + n.slice(t);
  }
  deleteData(t, e) {
    const { data: n } = this;
    this.data = n.slice(0, t) + n.slice(t + e);
  }
  replaceData(t, e, n) {
    const { data: i } = this;
    this.data = i.slice(0, t) + n + i.slice(t + e);
  }
  /* c8 ignore stop */
  toJSON() {
    const t = [];
    return bA(this, t), t;
  }
}, Qi = class vA extends As {
  constructor(t, e = "") {
    super(t, "#cdatasection", Ot, e);
  }
  cloneNode() {
    const { ownerDocument: t, [M]: e } = this;
    return new vA(t, e);
  }
  toString() {
    return `<![CDATA[${this[M]}]]>`;
  }
}, Li = class FA extends As {
  constructor(t, e = "") {
    super(t, "#comment", Wt, e);
  }
  cloneNode() {
    const { ownerDocument: t, [M]: e } = this;
    return new FA(t, e);
  }
  toString() {
    return `<!--${this[M]}-->`;
  }
};
function MA(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Ru(s) {
  if (Object.prototype.hasOwnProperty.call(s, "__esModule")) return s;
  var t = s.default;
  if (typeof t == "function") {
    var e = function n() {
      var i = !1;
      try {
        i = this instanceof n;
      } catch {
      }
      return i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(s).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(s, n);
    Object.defineProperty(e, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return s[n];
      }
    });
  }), e;
}
var xn, io;
function Bu() {
  return io || (io = 1, xn = {
    trueFunc: function() {
      return !0;
    },
    falseFunc: function() {
      return !1;
    }
  }), xn;
}
var Tu = Bu();
const D = /* @__PURE__ */ MA(Tu);
var R;
(function(s) {
  s.Attribute = "attribute", s.Pseudo = "pseudo", s.PseudoElement = "pseudo-element", s.Tag = "tag", s.Universal = "universal", s.Adjacent = "adjacent", s.Child = "child", s.Descendant = "descendant", s.Parent = "parent", s.Sibling = "sibling", s.ColumnCombinator = "column-combinator";
})(R || (R = {}));
var _;
(function(s) {
  s.Any = "any", s.Element = "element", s.End = "end", s.Equals = "equals", s.Exists = "exists", s.Hyphen = "hyphen", s.Not = "not", s.Start = "start";
})(_ || (_ = {}));
const ro = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, Du = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, xu = /* @__PURE__ */ new Map([
  [126, _.Element],
  [94, _.Start],
  [36, _.End],
  [42, _.Any],
  [33, _.Not],
  [124, _.Hyphen]
]), Nu = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function vu(s) {
  switch (s.type) {
    case R.Adjacent:
    case R.Child:
    case R.Descendant:
    case R.Parent:
    case R.Sibling:
    case R.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const Fu = /* @__PURE__ */ new Set(["contains", "icontains"]);
function Mu(s, t, e) {
  const n = parseInt(t, 16) - 65536;
  return n !== n || e ? t : n < 0 ? (
    // BMP codepoint
    String.fromCharCode(n + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320)
  );
}
function Je(s) {
  return s.replace(Du, Mu);
}
function Nn(s) {
  return s === 39 || s === 34;
}
function oo(s) {
  return s === 32 || s === 9 || s === 10 || s === 12 || s === 13;
}
function kA(s) {
  const t = [], e = OA(t, `${s}`, 0);
  if (e < s.length)
    throw new Error(`Unmatched selector: ${s.slice(e)}`);
  return t;
}
function OA(s, t, e) {
  let n = [];
  function i(S) {
    const b = t.slice(e + S).match(ro);
    if (!b)
      throw new Error(`Expected name, found ${t.slice(e)}`);
    const [B] = b;
    return e += S + B.length, Je(B);
  }
  function r(S) {
    for (e += S; e < t.length && oo(t.charCodeAt(e)); )
      e++;
  }
  function o() {
    e += 1;
    const S = e;
    let b = 1;
    for (; b > 0 && e < t.length; e++)
      t.charCodeAt(e) === 40 && !A(e) ? b++ : t.charCodeAt(e) === 41 && !A(e) && b--;
    if (b)
      throw new Error("Parenthesis not matched");
    return Je(t.slice(S, e - 1));
  }
  function A(S) {
    let b = 0;
    for (; t.charCodeAt(--S) === 92; )
      b++;
    return (b & 1) === 1;
  }
  function c() {
    if (n.length > 0 && vu(n[n.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function a(S) {
    if (n.length > 0 && n[n.length - 1].type === R.Descendant) {
      n[n.length - 1].type = S;
      return;
    }
    c(), n.push({ type: S });
  }
  function u(S, b) {
    n.push({
      type: R.Attribute,
      name: S,
      action: b,
      value: i(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function g() {
    if (n.length && n[n.length - 1].type === R.Descendant && n.pop(), n.length === 0)
      throw new Error("Empty sub-selector");
    s.push(n);
  }
  if (r(0), t.length === e)
    return e;
  t: for (; e < t.length; ) {
    const S = t.charCodeAt(e);
    switch (S) {
      // Whitespace
      case 32:
      case 9:
      case 10:
      case 12:
      case 13: {
        (n.length === 0 || n[0].type !== R.Descendant) && (c(), n.push({ type: R.Descendant })), r(1);
        break;
      }
      // Traversals
      case 62: {
        a(R.Child), r(1);
        break;
      }
      case 60: {
        a(R.Parent), r(1);
        break;
      }
      case 126: {
        a(R.Sibling), r(1);
        break;
      }
      case 43: {
        a(R.Adjacent), r(1);
        break;
      }
      // Special attribute selectors: .class, #id
      case 46: {
        u("class", _.Element);
        break;
      }
      case 35: {
        u("id", _.Equals);
        break;
      }
      case 91: {
        r(1);
        let b, B = null;
        t.charCodeAt(e) === 124 ? b = i(1) : t.startsWith("*|", e) ? (B = "*", b = i(2)) : (b = i(0), t.charCodeAt(e) === 124 && t.charCodeAt(e + 1) !== 61 && (B = b, b = i(1))), r(0);
        let tt = _.Exists;
        const Tt = xu.get(t.charCodeAt(e));
        if (Tt) {
          if (tt = Tt, t.charCodeAt(e + 1) !== 61)
            throw new Error("Expected `=`");
          r(2);
        } else t.charCodeAt(e) === 61 && (tt = _.Equals, r(1));
        let K = "", yt = null;
        if (tt !== "exists") {
          if (Nn(t.charCodeAt(e))) {
            const et = t.charCodeAt(e);
            let Y = e + 1;
            for (; Y < t.length && (t.charCodeAt(Y) !== et || A(Y)); )
              Y += 1;
            if (t.charCodeAt(Y) !== et)
              throw new Error("Attribute value didn't end");
            K = Je(t.slice(e + 1, Y)), e = Y + 1;
          } else {
            const et = e;
            for (; e < t.length && (!oo(t.charCodeAt(e)) && t.charCodeAt(e) !== 93 || A(e)); )
              e += 1;
            K = Je(t.slice(et, e));
          }
          r(0);
          const k = t.charCodeAt(e) | 32;
          k === 115 ? (yt = !1, r(1)) : k === 105 && (yt = !0, r(1));
        }
        if (t.charCodeAt(e) !== 93)
          throw new Error("Attribute selector didn't terminate");
        e += 1;
        const mt = {
          type: R.Attribute,
          name: b,
          action: tt,
          value: K,
          namespace: B,
          ignoreCase: yt
        };
        n.push(mt);
        break;
      }
      case 58: {
        if (t.charCodeAt(e + 1) === 58) {
          n.push({
            type: R.PseudoElement,
            name: i(2).toLowerCase(),
            data: t.charCodeAt(e) === 40 ? o() : null
          });
          continue;
        }
        const b = i(1).toLowerCase();
        let B = null;
        if (t.charCodeAt(e) === 40)
          if (Nu.has(b)) {
            if (Nn(t.charCodeAt(e + 1)))
              throw new Error(`Pseudo-selector ${b} cannot be quoted`);
            if (B = [], e = OA(B, t, e + 1), t.charCodeAt(e) !== 41)
              throw new Error(`Missing closing parenthesis in :${b} (${t})`);
            e += 1;
          } else {
            if (B = o(), Fu.has(b)) {
              const tt = B.charCodeAt(0);
              tt === B.charCodeAt(B.length - 1) && Nn(tt) && (B = B.slice(1, -1));
            }
            B = Je(B);
          }
        n.push({ type: R.Pseudo, name: b, data: B });
        break;
      }
      case 44: {
        g(), n = [], r(1);
        break;
      }
      default: {
        if (t.startsWith("/*", e)) {
          const tt = t.indexOf("*/", e + 2);
          if (tt < 0)
            throw new Error("Comment was not terminated");
          e = tt + 2, n.length === 0 && r(0);
          break;
        }
        let b = null, B;
        if (S === 42)
          e += 1, B = "*";
        else if (S === 124) {
          if (B = "", t.charCodeAt(e + 1) === 124) {
            a(R.ColumnCombinator), r(2);
            break;
          }
        } else if (ro.test(t.slice(e)))
          B = i(0);
        else
          break t;
        t.charCodeAt(e) === 124 && t.charCodeAt(e + 1) !== 124 && (b = B, t.charCodeAt(e + 1) === 42 ? (B = "*", e += 2) : B = i(1)), n.push(B === "*" ? { type: R.Universal, namespace: b } : { type: R.Tag, name: B, namespace: b });
      }
    }
  }
  return g(), e;
}
const QA = /* @__PURE__ */ new Map([
  [R.Universal, 50],
  [R.Tag, 30],
  [R.Attribute, 1],
  [R.Pseudo, 0]
]);
function Gi(s) {
  return !QA.has(s.type);
}
const ku = /* @__PURE__ */ new Map([
  [_.Exists, 10],
  [_.Equals, 8],
  [_.Not, 7],
  [_.Start, 6],
  [_.End, 6],
  [_.Any, 5]
]);
function Ou(s) {
  const t = s.map(LA);
  for (let e = 1; e < s.length; e++) {
    const n = t[e];
    if (!(n < 0))
      for (let i = e - 1; i >= 0 && n < t[i]; i--) {
        const r = s[i + 1];
        s[i + 1] = s[i], s[i] = r, t[i + 1] = t[i], t[i] = n;
      }
  }
}
function LA(s) {
  var t, e;
  let n = (t = QA.get(s.type)) !== null && t !== void 0 ? t : -1;
  return s.type === R.Attribute ? (n = (e = ku.get(s.action)) !== null && e !== void 0 ? e : 4, s.action === _.Equals && s.name === "id" && (n = 9), s.ignoreCase && (n >>= 1)) : s.type === R.Pseudo && (s.data ? s.name === "has" || s.name === "contains" ? n = 0 : Array.isArray(s.data) ? (n = Math.min(...s.data.map((i) => Math.min(...i.map(LA)))), n < 0 && (n = 0)) : n = 2 : n = 3), n;
}
const Qu = /[-[\]{}()*+?.,\\^$|#\s]/g;
function Ao(s) {
  return s.replace(Qu, "\\$&");
}
const Lu = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function oe(s, t) {
  return typeof s.ignoreCase == "boolean" ? s.ignoreCase : s.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && Lu.has(s.name);
}
const Gu = {
  equals(s, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    return oe(t, e) ? (r = r.toLowerCase(), (o) => {
      const A = n.getAttributeValue(o, i);
      return A != null && A.length === r.length && A.toLowerCase() === r && s(o);
    }) : (o) => n.getAttributeValue(o, i) === r && s(o);
  },
  hyphen(s, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    const o = r.length;
    return oe(t, e) ? (r = r.toLowerCase(), function(c) {
      const a = n.getAttributeValue(c, i);
      return a != null && (a.length === o || a.charAt(o) === "-") && a.substr(0, o).toLowerCase() === r && s(c);
    }) : function(c) {
      const a = n.getAttributeValue(c, i);
      return a != null && (a.length === o || a.charAt(o) === "-") && a.substr(0, o) === r && s(c);
    };
  },
  element(s, t, e) {
    const { adapter: n } = e, { name: i, value: r } = t;
    if (/\s/.test(r))
      return D.falseFunc;
    const o = new RegExp(`(?:^|\\s)${Ao(r)}(?:$|\\s)`, oe(t, e) ? "i" : "");
    return function(c) {
      const a = n.getAttributeValue(c, i);
      return a != null && a.length >= r.length && o.test(a) && s(c);
    };
  },
  exists(s, { name: t }, { adapter: e }) {
    return (n) => e.hasAttrib(n, t) && s(n);
  },
  start(s, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    const o = r.length;
    return o === 0 ? D.falseFunc : oe(t, e) ? (r = r.toLowerCase(), (A) => {
      const c = n.getAttributeValue(A, i);
      return c != null && c.length >= o && c.substr(0, o).toLowerCase() === r && s(A);
    }) : (A) => {
      var c;
      return !!(!((c = n.getAttributeValue(A, i)) === null || c === void 0) && c.startsWith(r)) && s(A);
    };
  },
  end(s, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    const o = -r.length;
    return o === 0 ? D.falseFunc : oe(t, e) ? (r = r.toLowerCase(), (A) => {
      var c;
      return ((c = n.getAttributeValue(A, i)) === null || c === void 0 ? void 0 : c.substr(o).toLowerCase()) === r && s(A);
    }) : (A) => {
      var c;
      return !!(!((c = n.getAttributeValue(A, i)) === null || c === void 0) && c.endsWith(r)) && s(A);
    };
  },
  any(s, t, e) {
    const { adapter: n } = e, { name: i, value: r } = t;
    if (r === "")
      return D.falseFunc;
    if (oe(t, e)) {
      const o = new RegExp(Ao(r), "i");
      return function(c) {
        const a = n.getAttributeValue(c, i);
        return a != null && a.length >= r.length && o.test(a) && s(c);
      };
    }
    return (o) => {
      var A;
      return !!(!((A = n.getAttributeValue(o, i)) === null || A === void 0) && A.includes(r)) && s(o);
    };
  },
  not(s, t, e) {
    const { adapter: n } = e, { name: i } = t;
    let { value: r } = t;
    return r === "" ? (o) => !!n.getAttributeValue(o, i) && s(o) : oe(t, e) ? (r = r.toLowerCase(), (o) => {
      const A = n.getAttributeValue(o, i);
      return (A == null || A.length !== r.length || A.toLowerCase() !== r) && s(o);
    }) : (o) => n.getAttributeValue(o, i) !== r && s(o);
  }
}, Ku = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), ao = 48, Hu = 57;
function Wu(s) {
  if (s = s.trim().toLowerCase(), s === "even")
    return [2, 0];
  if (s === "odd")
    return [2, 1];
  let t = 0, e = 0, n = r(), i = o();
  if (t < s.length && s.charAt(t) === "n" && (t++, e = n * (i ?? 1), A(), t < s.length ? (n = r(), A(), i = o()) : n = i = 0), i === null || t < s.length)
    throw new Error(`n-th rule couldn't be parsed ('${s}')`);
  return [e, n * i];
  function r() {
    return s.charAt(t) === "-" ? (t++, -1) : (s.charAt(t) === "+" && t++, 1);
  }
  function o() {
    const c = t;
    let a = 0;
    for (; t < s.length && s.charCodeAt(t) >= ao && s.charCodeAt(t) <= Hu; )
      a = a * 10 + (s.charCodeAt(t) - ao), t++;
    return t === c ? null : a;
  }
  function A() {
    for (; t < s.length && Ku.has(s.charCodeAt(t)); )
      t++;
  }
}
function Yu(s) {
  const t = s[0], e = s[1] - 1;
  if (e < 0 && t <= 0)
    return D.falseFunc;
  if (t === -1)
    return (r) => r <= e;
  if (t === 0)
    return (r) => r === e;
  if (t === 1)
    return e < 0 ? D.trueFunc : (r) => r >= e;
  const n = Math.abs(t), i = (e % n + n) % n;
  return t > 1 ? (r) => r >= e && r % n === i : (r) => r <= e && r % n === i;
}
function Ts(s) {
  return Yu(Wu(s));
}
function Ds(s, t) {
  return (e) => {
    const n = t.getParent(e);
    return n != null && t.isTag(n) && s(e);
  };
}
const Si = {
  contains(s, t, { adapter: e }) {
    return function(i) {
      return s(i) && e.getText(i).includes(t);
    };
  },
  icontains(s, t, { adapter: e }) {
    const n = t.toLowerCase();
    return function(r) {
      return s(r) && e.getText(r).toLowerCase().includes(n);
    };
  },
  // Location specific methods
  "nth-child"(s, t, { adapter: e, equals: n }) {
    const i = Ts(t);
    return i === D.falseFunc ? D.falseFunc : i === D.trueFunc ? Ds(s, e) : function(o) {
      const A = e.getSiblings(o);
      let c = 0;
      for (let a = 0; a < A.length && !n(o, A[a]); a++)
        e.isTag(A[a]) && c++;
      return i(c) && s(o);
    };
  },
  "nth-last-child"(s, t, { adapter: e, equals: n }) {
    const i = Ts(t);
    return i === D.falseFunc ? D.falseFunc : i === D.trueFunc ? Ds(s, e) : function(o) {
      const A = e.getSiblings(o);
      let c = 0;
      for (let a = A.length - 1; a >= 0 && !n(o, A[a]); a--)
        e.isTag(A[a]) && c++;
      return i(c) && s(o);
    };
  },
  "nth-of-type"(s, t, { adapter: e, equals: n }) {
    const i = Ts(t);
    return i === D.falseFunc ? D.falseFunc : i === D.trueFunc ? Ds(s, e) : function(o) {
      const A = e.getSiblings(o);
      let c = 0;
      for (let a = 0; a < A.length; a++) {
        const u = A[a];
        if (n(o, u))
          break;
        e.isTag(u) && e.getName(u) === e.getName(o) && c++;
      }
      return i(c) && s(o);
    };
  },
  "nth-last-of-type"(s, t, { adapter: e, equals: n }) {
    const i = Ts(t);
    return i === D.falseFunc ? D.falseFunc : i === D.trueFunc ? Ds(s, e) : function(o) {
      const A = e.getSiblings(o);
      let c = 0;
      for (let a = A.length - 1; a >= 0; a--) {
        const u = A[a];
        if (n(o, u))
          break;
        e.isTag(u) && e.getName(u) === e.getName(o) && c++;
      }
      return i(c) && s(o);
    };
  },
  // TODO determine the actual root element
  root(s, t, { adapter: e }) {
    return (n) => {
      const i = e.getParent(n);
      return (i == null || !e.isTag(i)) && s(n);
    };
  },
  scope(s, t, e, n) {
    const { equals: i } = e;
    return !n || n.length === 0 ? Si.root(s, t, e) : n.length === 1 ? (r) => i(n[0], r) && s(r) : (r) => n.includes(r) && s(r);
  },
  hover: vn("isHovered"),
  visited: vn("isVisited"),
  active: vn("isActive")
};
function vn(s) {
  return function(e, n, { adapter: i }) {
    const r = i[s];
    return typeof r != "function" ? D.falseFunc : function(A) {
      return r(A) && e(A);
    };
  };
}
const co = {
  empty(s, { adapter: t }) {
    return !t.getChildren(s).some((e) => (
      // FIXME: `getText` call is potentially expensive.
      t.isTag(e) || t.getText(e) !== ""
    ));
  },
  "first-child"(s, { adapter: t, equals: e }) {
    if (t.prevElementSibling)
      return t.prevElementSibling(s) == null;
    const n = t.getSiblings(s).find((i) => t.isTag(i));
    return n != null && e(s, n);
  },
  "last-child"(s, { adapter: t, equals: e }) {
    const n = t.getSiblings(s);
    for (let i = n.length - 1; i >= 0; i--) {
      if (e(s, n[i]))
        return !0;
      if (t.isTag(n[i]))
        break;
    }
    return !1;
  },
  "first-of-type"(s, { adapter: t, equals: e }) {
    const n = t.getSiblings(s), i = t.getName(s);
    for (let r = 0; r < n.length; r++) {
      const o = n[r];
      if (e(s, o))
        return !0;
      if (t.isTag(o) && t.getName(o) === i)
        break;
    }
    return !1;
  },
  "last-of-type"(s, { adapter: t, equals: e }) {
    const n = t.getSiblings(s), i = t.getName(s);
    for (let r = n.length - 1; r >= 0; r--) {
      const o = n[r];
      if (e(s, o))
        return !0;
      if (t.isTag(o) && t.getName(o) === i)
        break;
    }
    return !1;
  },
  "only-of-type"(s, { adapter: t, equals: e }) {
    const n = t.getName(s);
    return t.getSiblings(s).every((i) => e(s, i) || !t.isTag(i) || t.getName(i) !== n);
  },
  "only-child"(s, { adapter: t, equals: e }) {
    return t.getSiblings(s).every((n) => e(s, n) || !t.isTag(n));
  }
};
function lo(s, t, e, n) {
  if (e === null) {
    if (s.length > n)
      throw new Error(`Pseudo-class :${t} requires an argument`);
  } else if (s.length === n)
    throw new Error(`Pseudo-class :${t} doesn't have any arguments`);
}
const Uu = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
}, GA = {};
function KA(s, t) {
  return s === D.falseFunc ? D.falseFunc : (e) => t.isTag(e) && s(e);
}
function _u(s, t) {
  const e = t.getSiblings(s);
  if (e.length <= 1)
    return [];
  const n = e.indexOf(s);
  return n < 0 || n === e.length - 1 ? [] : e.slice(n + 1).filter(t.isTag);
}
function Ci(s) {
  return {
    xmlMode: !!s.xmlMode,
    lowerCaseAttributeNames: !!s.lowerCaseAttributeNames,
    lowerCaseTags: !!s.lowerCaseTags,
    quirksMode: !!s.quirksMode,
    cacheResults: !!s.cacheResults,
    pseudos: s.pseudos,
    adapter: s.adapter,
    equals: s.equals
  };
}
const Fn = (s, t, e, n, i) => {
  const r = i(t, Ci(e), n);
  return r === D.trueFunc ? s : r === D.falseFunc ? D.falseFunc : (o) => r(o) && s(o);
}, Mn = {
  is: Fn,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: Fn,
  where: Fn,
  not(s, t, e, n, i) {
    const r = i(t, Ci(e), n);
    return r === D.falseFunc ? s : r === D.trueFunc ? D.falseFunc : (o) => !r(o) && s(o);
  },
  has(s, t, e, n, i) {
    const { adapter: r } = e, o = Ci(e);
    o.relativeSelector = !0;
    const A = t.some((u) => u.some(Gi)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [GA]
    ) : void 0, c = i(t, o, A);
    if (c === D.falseFunc)
      return D.falseFunc;
    const a = KA(c, r);
    if (A && c !== D.trueFunc) {
      const { shouldTestNextSiblings: u = !1 } = c;
      return (g) => {
        if (!s(g))
          return !1;
        A[0] = g;
        const S = r.getChildren(g), b = u ? [...S, ..._u(g, r)] : S;
        return r.existsOne(a, b);
      };
    }
    return (u) => s(u) && r.existsOne(a, r.getChildren(u));
  }
};
function Ju(s, t, e, n, i) {
  var r;
  const { name: o, data: A } = t;
  if (Array.isArray(A)) {
    if (!(o in Mn))
      throw new Error(`Unknown pseudo-class :${o}(${A})`);
    return Mn[o](s, A, e, n, i);
  }
  const c = (r = e.pseudos) === null || r === void 0 ? void 0 : r[o], a = typeof c == "string" ? c : Uu[o];
  if (typeof a == "string") {
    if (A != null)
      throw new Error(`Pseudo ${o} doesn't have any arguments`);
    const u = kA(a);
    return Mn.is(s, u, e, n, i);
  }
  if (typeof c == "function")
    return lo(c, o, A, 1), (u) => c(u, A) && s(u);
  if (o in Si)
    return Si[o](s, A, e, n);
  if (o in co) {
    const u = co[o];
    return lo(u, o, A, 2), (g) => u(g, e, A) && s(g);
  }
  throw new Error(`Unknown pseudo-class :${o}`);
}
function kn(s, t) {
  const e = t.getParent(s);
  return e && t.isTag(e) ? e : null;
}
function Pu(s, t, e, n, i) {
  const { adapter: r, equals: o } = e;
  switch (t.type) {
    case R.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case R.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case R.Attribute: {
      if (t.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!e.xmlMode || e.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), Gu[t.action](s, t, e);
    }
    case R.Pseudo:
      return Ju(s, t, e, n, i);
    // Tags
    case R.Tag: {
      if (t.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      let { name: A } = t;
      return (!e.xmlMode || e.lowerCaseTags) && (A = A.toLowerCase()), function(a) {
        return r.getName(a) === A && s(a);
      };
    }
    // Traversal
    case R.Descendant: {
      if (e.cacheResults === !1 || typeof WeakSet > "u")
        return function(a) {
          let u = a;
          for (; u = kn(u, r); )
            if (s(u))
              return !0;
          return !1;
        };
      const A = /* @__PURE__ */ new WeakSet();
      return function(a) {
        let u = a;
        for (; u = kn(u, r); )
          if (!A.has(u)) {
            if (r.isTag(u) && s(u))
              return !0;
            A.add(u);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(c) {
        let a = c;
        do
          if (s(a))
            return !0;
        while (a = kn(a, r));
        return !1;
      };
    case R.Parent:
      return function(c) {
        return r.getChildren(c).some((a) => r.isTag(a) && s(a));
      };
    case R.Child:
      return function(c) {
        const a = r.getParent(c);
        return a != null && r.isTag(a) && s(a);
      };
    case R.Sibling:
      return function(c) {
        const a = r.getSiblings(c);
        for (let u = 0; u < a.length; u++) {
          const g = a[u];
          if (o(c, g))
            break;
          if (r.isTag(g) && s(g))
            return !0;
        }
        return !1;
      };
    case R.Adjacent:
      return r.prevElementSibling ? function(c) {
        const a = r.prevElementSibling(c);
        return a != null && s(a);
      } : function(c) {
        const a = r.getSiblings(c);
        let u;
        for (let g = 0; g < a.length; g++) {
          const S = a[g];
          if (o(c, S))
            break;
          r.isTag(S) && (u = S);
        }
        return !!u && s(u);
      };
    case R.Universal: {
      if (t.namespace != null && t.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return s;
    }
  }
}
function HA(s, t, e) {
  const n = Zu(s, t, e);
  return KA(n, t.adapter);
}
function Zu(s, t, e) {
  const n = typeof s == "string" ? kA(s) : s;
  return YA(n, t, e);
}
function WA(s) {
  return s.type === R.Pseudo && (s.name === "scope" || Array.isArray(s.data) && s.data.some((t) => t.some(WA)));
}
const Vu = { type: R.Descendant }, Xu = {
  type: "_flexibleDescendant"
}, ju = {
  type: R.Pseudo,
  name: "scope",
  data: null
};
function qu(s, { adapter: t }, e) {
  const n = !!e?.every((i) => {
    const r = t.isTag(i) && t.getParent(i);
    return i === GA || r && t.isTag(r);
  });
  for (const i of s) {
    if (!(i.length > 0 && Gi(i[0]) && i[0].type !== R.Descendant)) if (n && !i.some(WA))
      i.unshift(Vu);
    else
      continue;
    i.unshift(ju);
  }
}
function YA(s, t, e) {
  var n;
  s.forEach(Ou), e = (n = t.context) !== null && n !== void 0 ? n : e;
  const i = Array.isArray(e), r = e && (Array.isArray(e) ? e : [e]);
  if (t.relativeSelector !== !1)
    qu(s, t, r);
  else if (s.some((c) => c.length > 0 && Gi(c[0])))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  let o = !1;
  const A = s.map((c) => {
    if (c.length >= 2) {
      const [a, u] = c;
      a.type !== R.Pseudo || a.name !== "scope" || (i && u.type === R.Descendant ? c[1] = Xu : (u.type === R.Adjacent || u.type === R.Sibling) && (o = !0));
    }
    return zu(c, t, r);
  }).reduce($u, D.falseFunc);
  return A.shouldTestNextSiblings = o, A;
}
function zu(s, t, e) {
  var n;
  return s.reduce((i, r) => i === D.falseFunc ? D.falseFunc : Pu(i, r, t, e, YA), (n = t.rootFunc) !== null && n !== void 0 ? n : D.trueFunc);
}
function $u(s, t) {
  return t === D.falseFunc || s === D.trueFunc ? s : s === D.falseFunc || t === D.trueFunc ? t : function(n) {
    return s(n) || t(n);
  };
}
const UA = (s, t) => s === t, th = {
  adapter: xi,
  equals: UA
};
function _A(s) {
  var t, e, n, i;
  const r = s ?? th;
  return (t = r.adapter) !== null && t !== void 0 || (r.adapter = xi), (e = r.equals) !== null && e !== void 0 || (r.equals = (i = (n = r.adapter) === null || n === void 0 ? void 0 : n.equals) !== null && i !== void 0 ? i : UA), r;
}
function eh(s) {
  return function(e, n, i) {
    const r = _A(n);
    return s(e, r, i);
  };
}
const sh = eh(HA);
function nh(s, t, e) {
  const n = _A(e);
  return (typeof t == "function" ? t : HA(t, n))(s);
}
const { isArray: ih } = Array, nn = ({ nodeType: s }) => s === x, JA = (s, t) => t.some(
  (e) => nn(e) && (s(e) || JA(s, Fe(e)))
), rh = (s, t) => t === "class" ? s.classList.value : s.getAttribute(t), Fe = ({ childNodes: s }) => s, oh = (s) => {
  const { localName: t } = s;
  return $t(s) ? t.toLowerCase() : t;
}, Ah = ({ parentNode: s }) => s, ah = (s) => {
  const { parentNode: t } = s;
  return t ? Fe(t) : s;
}, bi = (s) => ih(s) ? s.map(bi).join("") : nn(s) ? bi(Fe(s)) : s.nodeType === it ? s.data : "", ch = (s, t) => s.hasAttribute(t), lh = (s) => {
  let { length: t } = s;
  for (; t--; ) {
    const e = s[t];
    if (t && -1 < s.lastIndexOf(e, t - 1)) {
      s.splice(t, 1);
      continue;
    }
    for (let { parentNode: n } = e; n; n = n.parentNode)
      if (s.includes(n)) {
        s.splice(t, 1);
        break;
      }
  }
  return s;
}, PA = (s, t) => {
  const e = [];
  for (const n of t)
    nn(n) && (s(n) && e.push(n), e.push(...PA(s, Fe(n))));
  return e;
}, ZA = (s, t) => {
  for (let e of t)
    if (s(e) || (e = ZA(s, Fe(e))))
      return e;
  return null;
}, VA = {
  isTag: nn,
  existsOne: JA,
  getAttributeValue: rh,
  getChildren: Fe,
  getName: oh,
  getParent: Ah,
  getSiblings: ah,
  getText: bi,
  hasAttrib: ch,
  removeSubsets: lh,
  findAll: PA,
  findOne: ZA
}, yi = (s, t) => sh(
  t,
  {
    context: t.includes(":scope") ? s : void 0,
    xmlMode: !$t(s),
    adapter: VA
  }
), uh = (s, t) => nh(
  s,
  t,
  {
    strict: !0,
    context: t.includes(":scope") ? s : void 0,
    xmlMode: !$t(s),
    adapter: VA
  }
);
let as = class XA extends As {
  constructor(t, e = "") {
    super(t, "#text", it, e);
  }
  get wholeText() {
    const t = [];
    let { previousSibling: e, nextSibling: n } = this;
    for (; e && e.nodeType === it; ) {
      t.unshift(e[M]);
      e = e.previousSibling;
    }
    for (t.push(this[M]); n && n.nodeType === it; ) {
      t.push(n[M]);
      n = n.nextSibling;
    }
    return t.join("");
  }
  cloneNode() {
    const { ownerDocument: t, [M]: e } = this;
    return new XA(t, e);
  }
  toString() {
    return Fi(this[M]);
  }
};
const hh = (s) => s instanceof de, On = (s, t, e) => {
  const { ownerDocument: n } = s;
  for (const i of e)
    s.insertBefore(
      hh(i) ? i : new as(n, i),
      t
    );
};
class jA extends de {
  constructor(t, e, n) {
    super(t, e, n), this[nt] = null, this[m] = this[w] = {
      [m]: null,
      [X]: this,
      [ut]: this,
      nodeType: zt,
      ownerDocument: this.ownerDocument,
      parentNode: null
    };
  }
  get childNodes() {
    const t = new kt();
    let { firstChild: e } = this;
    for (; e; )
      t.push(e), e = le(e);
    return t;
  }
  get children() {
    const t = new kt();
    let { firstElementChild: e } = this;
    for (; e; )
      t.push(e), e = Mi(e);
    return t;
  }
  /**
   * @returns {NodeStruct | null}
   */
  get firstChild() {
    let { [m]: t, [w]: e } = this;
    for (; t.nodeType === $; )
      t = t[m];
    return t === e ? null : t;
  }
  /**
   * @returns {NodeStruct | null}
   */
  get firstElementChild() {
    let { firstChild: t } = this;
    for (; t; ) {
      if (t.nodeType === x)
        return t;
      t = le(t);
    }
    return null;
  }
  get lastChild() {
    const t = this[w][X];
    switch (t.nodeType) {
      case zt:
        return t[ut];
      case $:
        return null;
    }
    return t === this ? null : t;
  }
  get lastElementChild() {
    let { lastChild: t } = this;
    for (; t; ) {
      if (t.nodeType === x)
        return t;
      t = $e(t);
    }
    return null;
  }
  get childElementCount() {
    return this.children.length;
  }
  prepend(...t) {
    On(this, this.firstChild, t);
  }
  append(...t) {
    On(this, this[w], t);
  }
  replaceChildren(...t) {
    let { [m]: e, [w]: n } = this;
    for (; e !== n && e.nodeType === $; )
      e = e[m];
    for (; e !== n; ) {
      const i = gt(e)[m];
      e.remove(), e = i;
    }
    t.length && On(this, n, t);
  }
  getElementsByClassName(t) {
    const e = new kt();
    let { [m]: n, [w]: i } = this;
    for (; n !== i; )
      n.nodeType === x && n.hasAttribute("class") && n.classList.has(t) && e.push(n), n = n[m];
    return e;
  }
  getElementsByTagName(t) {
    const e = new kt();
    let { [m]: n, [w]: i } = this;
    for (; n !== i; )
      n.nodeType === x && (n.localName === t || fi(n) === t) && e.push(n), n = n[m];
    return e;
  }
  querySelector(t) {
    const e = yi(this, t);
    let { [m]: n, [w]: i } = this;
    for (; n !== i; ) {
      if (n.nodeType === x && e(n))
        return n;
      n = n.nodeType === x && n.localName === "template" ? n[w] : n[m];
    }
    return null;
  }
  querySelectorAll(t) {
    const e = yi(this, t), n = new kt();
    let { [m]: i, [w]: r } = this;
    for (; i !== r; )
      i.nodeType === x && e(i) && n.push(i), i = i.nodeType === x && i.localName === "template" ? i[w] : i[m];
    return n;
  }
  appendChild(t) {
    return this.insertBefore(t, this[w]);
  }
  contains(t) {
    let e = t;
    for (; e && e !== this; )
      e = e.parentNode;
    return e === this;
  }
  insertBefore(t, e = null) {
    if (t === e)
      return t;
    if (t === this)
      throw new Error("unable to append a node to itself");
    const n = e || this[w];
    switch (t.nodeType) {
      case x:
        t.remove(), t.parentNode = this, hA(n[X], t, n), ze(t, null), pi(t);
        break;
      case Ht: {
        let { [nt]: i, firstChild: r, lastChild: o } = t;
        if (r) {
          gA(n[X], r, o, n), Rt(t, t[w]), i && i.replaceChildren();
          do
            r.parentNode = this, ze(r, null), r.nodeType === x && pi(r);
          while (r !== o && (r = le(r)));
        }
        break;
      }
      case it:
      case Wt:
      case Ot:
        t.remove();
      /* eslint no-fallthrough:0 */
      // this covers DOCUMENT_TYPE_NODE too
      default:
        t.parentNode = this, tn(n[X], t, n), ze(t, null);
        break;
    }
    return t;
  }
  normalize() {
    let { [m]: t, [w]: e } = this;
    for (; t !== e; ) {
      const { [m]: n, [X]: i, nodeType: r } = t;
      r === it && (t[M] ? i && i.nodeType === it && (i.textContent += t.textContent, t.remove()) : t.remove()), t = n;
    }
  }
  removeChild(t) {
    if (t.parentNode !== this)
      throw new Error("node is not a child");
    return t.remove(), t;
  }
  replaceChild(t, e) {
    const n = gt(e)[m];
    return e.remove(), this.insertBefore(t, n), e;
  }
}
class Ki extends jA {
  getElementById(t) {
    let { [m]: e, [w]: n } = this;
    for (; e !== n; ) {
      if (e.nodeType === x && e.id === t)
        return e;
      e = e[m];
    }
    return null;
  }
  cloneNode(t) {
    const { ownerDocument: e, constructor: n } = this, i = new n(e);
    if (t) {
      const { [w]: r } = i;
      for (const o of this.childNodes)
        i.insertBefore(o.cloneNode(t), r);
    }
    return i;
  }
  toString() {
    const { childNodes: t, localName: e } = this;
    return `<${e}>${t.join("")}</${e}>`;
  }
  toJSON() {
    const t = [];
    return fu(this, t), t;
  }
}
let Hi = class extends Ki {
  constructor(t) {
    super(t, "#document-fragment", Ht);
  }
}, Zs = class qA extends de {
  constructor(t, e, n = "", i = "") {
    super(t, "#document-type", xe), this.name = e, this.publicId = n, this.systemId = i;
  }
  cloneNode() {
    const { ownerDocument: t, name: e, publicId: n, systemId: i } = this;
    return new qA(t, e, n, i);
  }
  toString() {
    const { name: t, publicId: e, systemId: n } = this, i = 0 < e.length, r = [t];
    return i && r.push("PUBLIC", `"${e}"`), n.length && (i || r.push("SYSTEM"), r.push(`"${n}"`)), `<!DOCTYPE ${r.join(" ")}>`;
  }
  toJSON() {
    const t = [];
    return yA(this, t), t;
  }
};
const zA = (s) => s.childNodes.join(""), $A = (s, t) => {
  const { ownerDocument: e } = s, { constructor: n } = e, i = new n();
  i[Et] = e[Et];
  const { childNodes: r } = mA(i, $t(s), t);
  s.replaceChildren(...r.map(ta, e));
};
function ta(s) {
  switch (s.ownerDocument = this, s.nodeType) {
    case x:
    case Ht:
      s.childNodes.forEach(ta, this);
      break;
  }
  return s;
}
const Gs = (s) => s.replace(/(([A-Z0-9])([A-Z0-9][a-z]))|(([a-z0-9]+)([A-Z]))/g, "$2$5-$3$6").toLowerCase(), Ks = /* @__PURE__ */ new WeakMap(), Qn = (s) => `data-${Gs(s)}`, gh = (s) => s.slice(5).replace(/-([a-z])/g, (t, e) => e.toUpperCase()), dh = {
  get(s, t) {
    if (t in s)
      return Ks.get(s).getAttribute(Qn(t));
  },
  set(s, t, e) {
    return s[t] = e, Ks.get(s).setAttribute(Qn(t), e), !0;
  },
  deleteProperty(s, t) {
    return t in s && Ks.get(s).removeAttribute(Qn(t)), delete s[t];
  }
};
class ea {
  /**
   * @param {Element} ref
   */
  constructor(t) {
    for (const { name: e, value: n } of t.attributes)
      /^data-/.test(e) && (this[gh(e)] = n);
    return Ks.set(this, t), new Proxy(this, dh);
  }
}
ct(ea.prototype, null);
const { add: fh } = Set.prototype, uo = (s, t) => {
  for (const e of t)
    e && fh.call(s, e);
}, Pe = ({ [qo]: s, value: t }) => {
  const e = s.getAttributeNode("class");
  e ? e.value = t : mi(
    s,
    new os(s.ownerDocument, "class", t)
  );
};
class ph extends Set {
  constructor(t) {
    super(), this[qo] = t;
    const e = t.getAttributeNode("class");
    e && uo(this, e.value.split(/\s+/));
  }
  get length() {
    return this.size;
  }
  get value() {
    return [...this].join(" ");
  }
  /**
   * @param  {...string} tokens
   */
  add(...t) {
    uo(this, t), Pe(this);
  }
  /**
   * @param {string} token
   */
  contains(t) {
    return this.has(t);
  }
  /**
   * @param  {...string} tokens
   */
  remove(...t) {
    for (const e of t)
      this.delete(e);
    Pe(this);
  }
  /**
   * @param {string} token
   * @param {boolean?} force
   */
  toggle(t, e) {
    if (this.has(t)) {
      if (e)
        return !0;
      this.delete(t), Pe(this);
    } else if (e || arguments.length === 1)
      return super.add(t), Pe(this), !0;
    return !1;
  }
  /**
   * @param {string} token
   * @param {string} newToken
   */
  replace(t, e) {
    return this.has(t) ? (this.delete(t), super.add(e), Pe(this), !0) : !1;
  }
  /**
   * @param {string} token
   */
  supports() {
    return !0;
  }
}
const Vs = /* @__PURE__ */ new WeakMap(), Ei = (s) => [...s.keys()].filter((t) => t !== nt), Xs = (s) => {
  const t = Vs.get(s).getAttributeNode("style");
  if ((!t || t[Ws] || s.get(nt) !== t) && (s.clear(), t)) {
    s.set(nt, t);
    for (const e of t[M].split(/\s*;\s*/)) {
      let [n, ...i] = e.split(":");
      if (i.length > 0) {
        n = n.trim();
        const r = i.join(":").trim();
        n && r && s.set(n, r);
      }
    }
  }
  return t;
}, xs = {
  get(s, t) {
    return t in mh ? s[t] : (Xs(s), t === "length" ? Ei(s).length : /^\d+$/.test(t) ? Ei(s)[t] : s.get(Gs(t)));
  },
  set(s, t, e) {
    if (t === "cssText")
      s[t] = e;
    else {
      let n = Xs(s);
      if (e == null ? s.delete(Gs(t)) : s.set(Gs(t), e), !n) {
        const i = Vs.get(s);
        n = i.ownerDocument.createAttribute("style"), i.setAttributeNode(n), s.set(nt, n);
      }
      n[Ws] = !1, n[M] = s.toString();
    }
    return !0;
  }
};
let sa = class extends Map {
  constructor(t) {
    return super(), Vs.set(this, t), new Proxy(this, xs);
  }
  get cssText() {
    return this.toString();
  }
  set cssText(t) {
    Vs.get(this).setAttribute("style", t);
  }
  getPropertyValue(t) {
    const e = this[nt];
    return xs.get(e, t);
  }
  setProperty(t, e) {
    const n = this[nt];
    xs.set(n, t, e);
  }
  removeProperty(t) {
    const e = this[nt];
    xs.set(e, t, null);
  }
  [Symbol.iterator]() {
    const t = this[nt];
    Xs(t);
    const e = Ei(t), { length: n } = e;
    let i = 0;
    return {
      next() {
        const r = i === n;
        return { done: r, value: r ? null : e[i++] };
      }
    };
  }
  get [nt]() {
    return this;
  }
  toString() {
    const t = this[nt];
    Xs(t);
    const e = [];
    return t.forEach(Sh, e), e.join(";");
  }
};
const { prototype: mh } = sa;
function Sh(s, t) {
  t !== nt && this.push(`${t}:${s}`);
}
const ho = 3, go = 2, fo = 1, po = 0;
function Ch(s) {
  return s.currentTarget;
}
class he {
  static get BUBBLING_PHASE() {
    return ho;
  }
  static get AT_TARGET() {
    return go;
  }
  static get CAPTURING_PHASE() {
    return fo;
  }
  static get NONE() {
    return po;
  }
  constructor(t, e = {}) {
    this.type = t, this.bubbles = !!e.bubbles, this.cancelBubble = !1, this._stopImmediatePropagationFlag = !1, this.cancelable = !!e.cancelable, this.eventPhase = this.NONE, this.timeStamp = Date.now(), this.defaultPrevented = !1, this.originalTarget = null, this.returnValue = null, this.srcElement = null, this.target = null, this._path = [];
  }
  get BUBBLING_PHASE() {
    return ho;
  }
  get AT_TARGET() {
    return go;
  }
  get CAPTURING_PHASE() {
    return fo;
  }
  get NONE() {
    return po;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  // simplified implementation, should be https://dom.spec.whatwg.org/#dom-event-composedpath
  composedPath() {
    return this._path.map(Ch);
  }
  stopPropagation() {
    this.cancelBubble = !0;
  }
  stopImmediatePropagation() {
    this.stopPropagation(), this._stopImmediatePropagationFlag = !0;
  }
}
class na extends Array {
  constructor(t) {
    super(), this.ownerElement = t;
  }
  getNamedItem(t) {
    return this.ownerElement.getAttributeNode(t);
  }
  setNamedItem(t) {
    this.ownerElement.setAttributeNode(t), this.unshift(t);
  }
  removeNamedItem(t) {
    const e = this.getNamedItem(t);
    this.ownerElement.removeAttribute(t), this.splice(this.indexOf(e), 1);
  }
  item(t) {
    return t < this.length ? this[t] : null;
  }
  /* c8 ignore start */
  getNamedItemNS(t, e) {
    return this.getNamedItem(e);
  }
  setNamedItemNS(t, e) {
    return this.setNamedItem(e);
  }
  removeNamedItemNS(t, e) {
    return this.removeNamedItem(e);
  }
  /* c8 ignore stop */
}
let Wi = class extends Ki {
  constructor(t) {
    super(t.ownerDocument, "#shadow-root", Ht), this.host = t;
  }
  get innerHTML() {
    return zA(this);
  }
  set innerHTML(t) {
    $A(this, t);
  }
};
const bh = {
  get(s, t) {
    return t in s ? s[t] : s.find(({ name: e }) => e === t);
  }
}, mo = (s, t, e) => {
  if ("ownerSVGElement" in t) {
    const n = s.createElementNS(Js, e);
    return n.ownerSVGElement = t.ownerSVGElement, n;
  }
  return s.createElement(e);
}, yh = ({ localName: s, ownerDocument: t }) => t[Ne].voidElements.test(s);
let cs = class extends jA {
  constructor(t, e) {
    super(t, e, x), this[Re] = null, this[Bn] = null, this[Tn] = null;
  }
  // <Mixins>
  get isConnected() {
    return RA(this);
  }
  get parentElement() {
    return BA(this);
  }
  get previousSibling() {
    return $e(this);
  }
  get nextSibling() {
    return le(this);
  }
  get namespaceURI() {
    return "http://www.w3.org/1999/xhtml";
  }
  get previousElementSibling() {
    return TA(this);
  }
  get nextElementSibling() {
    return Mi(this);
  }
  before(...t) {
    DA(this, t);
  }
  after(...t) {
    xA(this, t);
  }
  replaceWith(...t) {
    Oi(this, t);
  }
  remove() {
    NA(this[X], this, this[w][m]);
  }
  // </Mixins>
  // <specialGetters>
  get id() {
    return p.get(this, "id");
  }
  set id(t) {
    p.set(this, "id", t);
  }
  get className() {
    return this.classList.value;
  }
  set className(t) {
    const { classList: e } = this;
    e.clear(), e.add(...ce(t).split(/\s+/));
  }
  get nodeName() {
    return fi(this);
  }
  get tagName() {
    return fi(this);
  }
  get classList() {
    return this[Re] || (this[Re] = new ph(this));
  }
  get dataset() {
    return this[Bn] || (this[Bn] = new ea(this));
  }
  getBoundingClientRect() {
    return {
      x: 0,
      y: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0
    };
  }
  get nonce() {
    return p.get(this, "nonce");
  }
  set nonce(t) {
    p.set(this, "nonce", t);
  }
  get style() {
    return this[Tn] || (this[Tn] = new sa(this));
  }
  get tabIndex() {
    return qt.get(this, "tabindex") || -1;
  }
  set tabIndex(t) {
    qt.set(this, "tabindex", t);
  }
  get slot() {
    return p.get(this, "slot");
  }
  set slot(t) {
    p.set(this, "slot", t);
  }
  // </specialGetters>
  // <contentRelated>
  get innerText() {
    const t = [];
    let { [m]: e, [w]: n } = this;
    for (; e !== n; )
      e.nodeType === it ? t.push(e.textContent.replace(/\s+/g, " ")) : t.length && e[m] != n && jl.has(e.tagName) && t.push(`
`), e = e[m];
    return t.join("");
  }
  /**
   * @returns {String}
   */
  get textContent() {
    const t = [];
    let { [m]: e, [w]: n } = this;
    for (; e !== n; ) {
      const i = e.nodeType;
      (i === it || i === Ot) && t.push(e.textContent), e = e[m];
    }
    return t.join("");
  }
  set textContent(t) {
    this.replaceChildren(), t != null && t !== "" && this.appendChild(new as(this.ownerDocument, t));
  }
  get innerHTML() {
    return zA(this);
  }
  set innerHTML(t) {
    $A(this, t);
  }
  get outerHTML() {
    return this.toString();
  }
  set outerHTML(t) {
    const e = this.ownerDocument.createElement("");
    e.innerHTML = t, this.replaceWith(...e.childNodes);
  }
  // </contentRelated>
  // <attributes>
  get attributes() {
    const t = new na(this);
    let e = this[m];
    for (; e.nodeType === $; )
      t.push(e), e = e[m];
    return new Proxy(t, bh);
  }
  focus() {
    this.dispatchEvent(new he("focus"));
  }
  getAttribute(t) {
    if (t === "class")
      return this.className;
    const e = this.getAttributeNode(t);
    return e && ($t(this) ? e.value : Fi(e.value));
  }
  getAttributeNode(t) {
    let e = this[m];
    for (; e.nodeType === $; ) {
      if (e.name === t)
        return e;
      e = e[m];
    }
    return null;
  }
  getAttributeNames() {
    const t = new kt();
    let e = this[m];
    for (; e.nodeType === $; )
      t.push(e.name), e = e[m];
    return t;
  }
  hasAttribute(t) {
    return !!this.getAttributeNode(t);
  }
  hasAttributes() {
    return this[m].nodeType === $;
  }
  removeAttribute(t) {
    t === "class" && this[Re] && this[Re].clear();
    let e = this[m];
    for (; e.nodeType === $; ) {
      if (e.name === t) {
        so(this, e);
        return;
      }
      e = e[m];
    }
  }
  removeAttributeNode(t) {
    let e = this[m];
    for (; e.nodeType === $; ) {
      if (e === t) {
        so(this, e);
        return;
      }
      e = e[m];
    }
  }
  setAttribute(t, e) {
    if (t === "class")
      this.className = e;
    else {
      const n = this.getAttributeNode(t);
      n ? n.value = e : mi(this, new os(this.ownerDocument, t, e));
    }
  }
  setAttributeNode(t) {
    const { name: e } = t, n = this.getAttributeNode(e);
    if (n !== t) {
      n && this.removeAttributeNode(n);
      const { ownerElement: i } = t;
      i && i.removeAttributeNode(t), mi(this, t);
    }
    return n;
  }
  toggleAttribute(t, e) {
    return this.hasAttribute(t) ? e ? !0 : (this.removeAttribute(t), !1) : e || arguments.length === 1 ? (this.setAttribute(t, ""), !0) : !1;
  }
  // </attributes>
  // <ShadowDOM>
  get shadowRoot() {
    if (jt.has(this)) {
      const { mode: t, shadowRoot: e } = jt.get(this);
      if (t === "open")
        return e;
    }
    return null;
  }
  attachShadow(t) {
    if (jt.has(this))
      throw new Error("operation not supported");
    const e = new Wi(this);
    return jt.set(this, {
      mode: t.mode,
      shadowRoot: e
    }), e;
  }
  // </ShadowDOM>
  // <selectors>
  matches(t) {
    return uh(this, t);
  }
  closest(t) {
    let e = this;
    const n = yi(e, t);
    for (; e && !n(e); )
      e = e.parentElement;
    return e;
  }
  // </selectors>
  // <insertAdjacent>
  insertAdjacentElement(t, e) {
    const { parentElement: n } = this;
    switch (t) {
      case "beforebegin":
        if (n) {
          n.insertBefore(e, this);
          break;
        }
        return null;
      case "afterbegin":
        this.insertBefore(e, this.firstChild);
        break;
      case "beforeend":
        this.insertBefore(e, null);
        break;
      case "afterend":
        if (n) {
          n.insertBefore(e, this.nextSibling);
          break;
        }
        return null;
    }
    return e;
  }
  insertAdjacentHTML(t, e) {
    this.insertAdjacentElement(t, fA(this.ownerDocument, e));
  }
  insertAdjacentText(t, e) {
    const n = this.ownerDocument.createTextNode(e);
    this.insertAdjacentElement(t, n);
  }
  // </insertAdjacent>
  cloneNode(t = !1) {
    const { ownerDocument: e, localName: n } = this, i = (u) => {
      u.parentNode = o, Rt(A, u), A = u;
    }, r = mo(e, this, n);
    let o = r, A = r, { [m]: c, [w]: a } = this;
    for (; c !== a && (t || c.nodeType === $); ) {
      switch (c.nodeType) {
        case zt:
          Rt(A, o[w]), A = o[w], o = o.parentNode;
          break;
        case x: {
          const u = mo(e, c, c.localName);
          i(u), o = u;
          break;
        }
        case $: {
          const u = c.cloneNode(t);
          u.ownerElement = o, i(u);
          break;
        }
        case it:
        case Wt:
        case Ot:
          i(c.cloneNode(t));
          break;
      }
      c = c[m];
    }
    return Rt(A, r[w]), r;
  }
  // <custom>
  toString() {
    const t = [], { [w]: e } = this;
    let n = { [m]: this }, i = !1;
    do
      switch (n = n[m], n.nodeType) {
        case $: {
          const r = " " + n;
          switch (r) {
            case " id":
            case " class":
            case " style":
              break;
            default:
              t.push(r);
          }
          break;
        }
        case zt: {
          const r = n[ut];
          i ? ("ownerSVGElement" in r ? t.push(" />") : yh(r) ? t.push($t(r) ? ">" : " />") : t.push(`></${r.localName}>`), i = !1) : t.push(`</${r.localName}>`);
          break;
        }
        case x:
          i && t.push(">"), n.toString !== this.toString ? (t.push(n.toString()), n = n[w], i = !1) : (t.push(`<${n.localName}`), i = !0);
          break;
        case it:
        case Wt:
        case Ot:
          t.push((i ? ">" : "") + n), i = !1;
          break;
      }
    while (n !== e);
    return t.join("");
  }
  toJSON() {
    const t = [];
    return EA(this, t), t;
  }
  // </custom>
  /* c8 ignore start */
  getAttributeNS(t, e) {
    return this.getAttribute(e);
  }
  getElementsByTagNameNS(t, e) {
    return this.getElementsByTagName(e);
  }
  hasAttributeNS(t, e) {
    return this.hasAttribute(e);
  }
  removeAttributeNS(t, e) {
    this.removeAttribute(e);
  }
  setAttributeNS(t, e, n) {
    this.setAttribute(e, n);
  }
  setAttributeNodeNS(t) {
    return this.setAttributeNode(t);
  }
  /* c8 ignore stop */
};
const Ln = /* @__PURE__ */ new WeakMap(), Eh = {
  get(s, t) {
    return s[t];
  },
  set(s, t, e) {
    return s[t] = e, !0;
  }
};
let ts = class extends cs {
  constructor(t, e, n = null) {
    super(t, e), this.ownerSVGElement = n;
  }
  get className() {
    return Ln.has(this) || Ln.set(this, new Proxy({ baseVal: "", animVal: "" }, Eh)), Ln.get(this);
  }
  /* c8 ignore start */
  set className(t) {
    const { classList: e } = this;
    e.clear(), e.add(...ce(t).split(/\s+/));
  }
  /* c8 ignore stop */
  get namespaceURI() {
    return "http://www.w3.org/2000/svg";
  }
  getAttribute(t) {
    return t === "class" ? [...this.classList].join(" ") : super.getAttribute(t);
  }
  setAttribute(t, e) {
    if (t === "class")
      this.className = e;
    else if (t === "style") {
      const { className: n } = this;
      n.baseVal = n.animVal = e;
    }
    super.setAttribute(t, e);
  }
};
const ft = () => {
  throw new TypeError("Illegal constructor");
};
function Yi() {
  ft();
}
ct(Yi, os);
Yi.prototype = os.prototype;
function Ui() {
  ft();
}
ct(Ui, Qi);
Ui.prototype = Qi.prototype;
function _i() {
  ft();
}
ct(_i, As);
_i.prototype = As.prototype;
function Ji() {
  ft();
}
ct(Ji, Li);
Ji.prototype = Li.prototype;
function Pi() {
  ft();
}
ct(Pi, Hi);
Pi.prototype = Hi.prototype;
function Zi() {
  ft();
}
ct(Zi, Zs);
Zi.prototype = Zs.prototype;
function Vi() {
  ft();
}
ct(Vi, cs);
Vi.prototype = cs.prototype;
function Xi() {
  ft();
}
ct(Xi, de);
Xi.prototype = de.prototype;
function ji() {
  ft();
}
ct(ji, Wi);
ji.prototype = Wi.prototype;
function qi() {
  ft();
}
ct(qi, as);
qi.prototype = as.prototype;
function zi() {
  ft();
}
ct(zi, ts);
zi.prototype = ts.prototype;
const Ih = {
  Attr: Yi,
  CDATASection: Ui,
  CharacterData: _i,
  Comment: Ji,
  DocumentFragment: Pi,
  DocumentType: Zi,
  Element: Vi,
  Node: Xi,
  ShadowRoot: ji,
  Text: qi,
  SVGElement: zi
}, Ze = /* @__PURE__ */ new WeakMap(), h = {
  get(s, t) {
    return Ze.has(s) && Ze.get(s)[t] || null;
  },
  set(s, t, e) {
    Ze.has(s) || Ze.set(s, {});
    const n = Ze.get(s), i = t.slice(2);
    n[t] && s.removeEventListener(i, n[t], !1), (n[t] = e) && s.addEventListener(i, e, !1);
  }
};
let C = class extends cs {
  static get observedAttributes() {
    return [];
  }
  constructor(t = null, e = "") {
    super(t, e);
    const n = !t;
    let i;
    if (n) {
      const { constructor: r } = this;
      if (!Be.has(r))
        throw new Error("unable to initialize this Custom Element");
      ({ ownerDocument: t, localName: e, options: i } = Be.get(r));
    }
    if (t[qe]) {
      const { element: r, values: o } = t[qe];
      t[qe] = null;
      for (const [A, c] of o)
        r[A] = c;
      return r;
    }
    n && (this.ownerDocument = this[w].ownerDocument = t, this.localName = e, ue.set(this, { connected: !1 }), i.is && this.setAttribute("is", i.is));
  }
  /* c8 ignore start */
  /* TODO: what about these?
  offsetHeight
  offsetLeft
  offsetParent
  offsetTop
  offsetWidth
  */
  blur() {
    this.dispatchEvent(new he("blur"));
  }
  click() {
    const t = new he("click", { bubbles: !0, cancelable: !0 });
    t.button = 0, this.dispatchEvent(t);
  }
  // Boolean getters
  get accessKeyLabel() {
    const { accessKey: t } = this;
    return t && `Alt+Shift+${t}`;
  }
  get isContentEditable() {
    return this.hasAttribute("contenteditable");
  }
  // Boolean Accessors
  get contentEditable() {
    return v.get(this, "contenteditable");
  }
  set contentEditable(t) {
    v.set(this, "contenteditable", t);
  }
  get draggable() {
    return v.get(this, "draggable");
  }
  set draggable(t) {
    v.set(this, "draggable", t);
  }
  get hidden() {
    return v.get(this, "hidden");
  }
  set hidden(t) {
    v.set(this, "hidden", t);
  }
  get spellcheck() {
    return v.get(this, "spellcheck");
  }
  set spellcheck(t) {
    v.set(this, "spellcheck", t);
  }
  // String Accessors
  get accessKey() {
    return p.get(this, "accesskey");
  }
  set accessKey(t) {
    p.set(this, "accesskey", t);
  }
  get dir() {
    return p.get(this, "dir");
  }
  set dir(t) {
    p.set(this, "dir", t);
  }
  get lang() {
    return p.get(this, "lang");
  }
  set lang(t) {
    p.set(this, "lang", t);
  }
  get title() {
    return p.get(this, "title");
  }
  set title(t) {
    p.set(this, "title", t);
  }
  // DOM Level 0
  get onabort() {
    return h.get(this, "onabort");
  }
  set onabort(t) {
    h.set(this, "onabort", t);
  }
  get onblur() {
    return h.get(this, "onblur");
  }
  set onblur(t) {
    h.set(this, "onblur", t);
  }
  get oncancel() {
    return h.get(this, "oncancel");
  }
  set oncancel(t) {
    h.set(this, "oncancel", t);
  }
  get oncanplay() {
    return h.get(this, "oncanplay");
  }
  set oncanplay(t) {
    h.set(this, "oncanplay", t);
  }
  get oncanplaythrough() {
    return h.get(this, "oncanplaythrough");
  }
  set oncanplaythrough(t) {
    h.set(this, "oncanplaythrough", t);
  }
  get onchange() {
    return h.get(this, "onchange");
  }
  set onchange(t) {
    h.set(this, "onchange", t);
  }
  get onclick() {
    return h.get(this, "onclick");
  }
  set onclick(t) {
    h.set(this, "onclick", t);
  }
  get onclose() {
    return h.get(this, "onclose");
  }
  set onclose(t) {
    h.set(this, "onclose", t);
  }
  get oncontextmenu() {
    return h.get(this, "oncontextmenu");
  }
  set oncontextmenu(t) {
    h.set(this, "oncontextmenu", t);
  }
  get oncuechange() {
    return h.get(this, "oncuechange");
  }
  set oncuechange(t) {
    h.set(this, "oncuechange", t);
  }
  get ondblclick() {
    return h.get(this, "ondblclick");
  }
  set ondblclick(t) {
    h.set(this, "ondblclick", t);
  }
  get ondrag() {
    return h.get(this, "ondrag");
  }
  set ondrag(t) {
    h.set(this, "ondrag", t);
  }
  get ondragend() {
    return h.get(this, "ondragend");
  }
  set ondragend(t) {
    h.set(this, "ondragend", t);
  }
  get ondragenter() {
    return h.get(this, "ondragenter");
  }
  set ondragenter(t) {
    h.set(this, "ondragenter", t);
  }
  get ondragleave() {
    return h.get(this, "ondragleave");
  }
  set ondragleave(t) {
    h.set(this, "ondragleave", t);
  }
  get ondragover() {
    return h.get(this, "ondragover");
  }
  set ondragover(t) {
    h.set(this, "ondragover", t);
  }
  get ondragstart() {
    return h.get(this, "ondragstart");
  }
  set ondragstart(t) {
    h.set(this, "ondragstart", t);
  }
  get ondrop() {
    return h.get(this, "ondrop");
  }
  set ondrop(t) {
    h.set(this, "ondrop", t);
  }
  get ondurationchange() {
    return h.get(this, "ondurationchange");
  }
  set ondurationchange(t) {
    h.set(this, "ondurationchange", t);
  }
  get onemptied() {
    return h.get(this, "onemptied");
  }
  set onemptied(t) {
    h.set(this, "onemptied", t);
  }
  get onended() {
    return h.get(this, "onended");
  }
  set onended(t) {
    h.set(this, "onended", t);
  }
  get onerror() {
    return h.get(this, "onerror");
  }
  set onerror(t) {
    h.set(this, "onerror", t);
  }
  get onfocus() {
    return h.get(this, "onfocus");
  }
  set onfocus(t) {
    h.set(this, "onfocus", t);
  }
  get oninput() {
    return h.get(this, "oninput");
  }
  set oninput(t) {
    h.set(this, "oninput", t);
  }
  get oninvalid() {
    return h.get(this, "oninvalid");
  }
  set oninvalid(t) {
    h.set(this, "oninvalid", t);
  }
  get onkeydown() {
    return h.get(this, "onkeydown");
  }
  set onkeydown(t) {
    h.set(this, "onkeydown", t);
  }
  get onkeypress() {
    return h.get(this, "onkeypress");
  }
  set onkeypress(t) {
    h.set(this, "onkeypress", t);
  }
  get onkeyup() {
    return h.get(this, "onkeyup");
  }
  set onkeyup(t) {
    h.set(this, "onkeyup", t);
  }
  get onload() {
    return h.get(this, "onload");
  }
  set onload(t) {
    h.set(this, "onload", t);
  }
  get onloadeddata() {
    return h.get(this, "onloadeddata");
  }
  set onloadeddata(t) {
    h.set(this, "onloadeddata", t);
  }
  get onloadedmetadata() {
    return h.get(this, "onloadedmetadata");
  }
  set onloadedmetadata(t) {
    h.set(this, "onloadedmetadata", t);
  }
  get onloadstart() {
    return h.get(this, "onloadstart");
  }
  set onloadstart(t) {
    h.set(this, "onloadstart", t);
  }
  get onmousedown() {
    return h.get(this, "onmousedown");
  }
  set onmousedown(t) {
    h.set(this, "onmousedown", t);
  }
  get onmouseenter() {
    return h.get(this, "onmouseenter");
  }
  set onmouseenter(t) {
    h.set(this, "onmouseenter", t);
  }
  get onmouseleave() {
    return h.get(this, "onmouseleave");
  }
  set onmouseleave(t) {
    h.set(this, "onmouseleave", t);
  }
  get onmousemove() {
    return h.get(this, "onmousemove");
  }
  set onmousemove(t) {
    h.set(this, "onmousemove", t);
  }
  get onmouseout() {
    return h.get(this, "onmouseout");
  }
  set onmouseout(t) {
    h.set(this, "onmouseout", t);
  }
  get onmouseover() {
    return h.get(this, "onmouseover");
  }
  set onmouseover(t) {
    h.set(this, "onmouseover", t);
  }
  get onmouseup() {
    return h.get(this, "onmouseup");
  }
  set onmouseup(t) {
    h.set(this, "onmouseup", t);
  }
  get onmousewheel() {
    return h.get(this, "onmousewheel");
  }
  set onmousewheel(t) {
    h.set(this, "onmousewheel", t);
  }
  get onpause() {
    return h.get(this, "onpause");
  }
  set onpause(t) {
    h.set(this, "onpause", t);
  }
  get onplay() {
    return h.get(this, "onplay");
  }
  set onplay(t) {
    h.set(this, "onplay", t);
  }
  get onplaying() {
    return h.get(this, "onplaying");
  }
  set onplaying(t) {
    h.set(this, "onplaying", t);
  }
  get onprogress() {
    return h.get(this, "onprogress");
  }
  set onprogress(t) {
    h.set(this, "onprogress", t);
  }
  get onratechange() {
    return h.get(this, "onratechange");
  }
  set onratechange(t) {
    h.set(this, "onratechange", t);
  }
  get onreset() {
    return h.get(this, "onreset");
  }
  set onreset(t) {
    h.set(this, "onreset", t);
  }
  get onresize() {
    return h.get(this, "onresize");
  }
  set onresize(t) {
    h.set(this, "onresize", t);
  }
  get onscroll() {
    return h.get(this, "onscroll");
  }
  set onscroll(t) {
    h.set(this, "onscroll", t);
  }
  get onseeked() {
    return h.get(this, "onseeked");
  }
  set onseeked(t) {
    h.set(this, "onseeked", t);
  }
  get onseeking() {
    return h.get(this, "onseeking");
  }
  set onseeking(t) {
    h.set(this, "onseeking", t);
  }
  get onselect() {
    return h.get(this, "onselect");
  }
  set onselect(t) {
    h.set(this, "onselect", t);
  }
  get onshow() {
    return h.get(this, "onshow");
  }
  set onshow(t) {
    h.set(this, "onshow", t);
  }
  get onstalled() {
    return h.get(this, "onstalled");
  }
  set onstalled(t) {
    h.set(this, "onstalled", t);
  }
  get onsubmit() {
    return h.get(this, "onsubmit");
  }
  set onsubmit(t) {
    h.set(this, "onsubmit", t);
  }
  get onsuspend() {
    return h.get(this, "onsuspend");
  }
  set onsuspend(t) {
    h.set(this, "onsuspend", t);
  }
  get ontimeupdate() {
    return h.get(this, "ontimeupdate");
  }
  set ontimeupdate(t) {
    h.set(this, "ontimeupdate", t);
  }
  get ontoggle() {
    return h.get(this, "ontoggle");
  }
  set ontoggle(t) {
    h.set(this, "ontoggle", t);
  }
  get onvolumechange() {
    return h.get(this, "onvolumechange");
  }
  set onvolumechange(t) {
    h.set(this, "onvolumechange", t);
  }
  get onwaiting() {
    return h.get(this, "onwaiting");
  }
  set onwaiting(t) {
    h.set(this, "onwaiting", t);
  }
  get onauxclick() {
    return h.get(this, "onauxclick");
  }
  set onauxclick(t) {
    h.set(this, "onauxclick", t);
  }
  get ongotpointercapture() {
    return h.get(this, "ongotpointercapture");
  }
  set ongotpointercapture(t) {
    h.set(this, "ongotpointercapture", t);
  }
  get onlostpointercapture() {
    return h.get(this, "onlostpointercapture");
  }
  set onlostpointercapture(t) {
    h.set(this, "onlostpointercapture", t);
  }
  get onpointercancel() {
    return h.get(this, "onpointercancel");
  }
  set onpointercancel(t) {
    h.set(this, "onpointercancel", t);
  }
  get onpointerdown() {
    return h.get(this, "onpointerdown");
  }
  set onpointerdown(t) {
    h.set(this, "onpointerdown", t);
  }
  get onpointerenter() {
    return h.get(this, "onpointerenter");
  }
  set onpointerenter(t) {
    h.set(this, "onpointerenter", t);
  }
  get onpointerleave() {
    return h.get(this, "onpointerleave");
  }
  set onpointerleave(t) {
    h.set(this, "onpointerleave", t);
  }
  get onpointermove() {
    return h.get(this, "onpointermove");
  }
  set onpointermove(t) {
    h.set(this, "onpointermove", t);
  }
  get onpointerout() {
    return h.get(this, "onpointerout");
  }
  set onpointerout(t) {
    h.set(this, "onpointerout", t);
  }
  get onpointerover() {
    return h.get(this, "onpointerover");
  }
  set onpointerover(t) {
    h.set(this, "onpointerover", t);
  }
  get onpointerup() {
    return h.get(this, "onpointerup");
  }
  set onpointerup(t) {
    h.set(this, "onpointerup", t);
  }
  /* c8 ignore stop */
};
const ia = "template";
class ra extends C {
  constructor(t) {
    super(t, ia);
    const e = this.ownerDocument.createDocumentFragment();
    (this[Rs] = e)[nt] = this;
  }
  get content() {
    if (this.hasChildNodes() && !this[Rs].hasChildNodes())
      for (const t of this.childNodes)
        this[Rs].appendChild(t.cloneNode(!0));
    return this[Rs];
  }
}
P(ia, ra);
class wh extends C {
  constructor(t, e = "html") {
    super(t, e);
  }
}
const { toString: Rh } = C.prototype;
class rn extends C {
  get innerHTML() {
    return this.textContent;
  }
  set innerHTML(t) {
    this.textContent = t;
  }
  toString() {
    return Rh.call(this.cloneNode()).replace("><", () => `>${this.textContent}<`);
  }
}
const oa = "script";
class Aa extends rn {
  constructor(t, e = oa) {
    super(t, e);
  }
  get type() {
    return p.get(this, "type");
  }
  set type(t) {
    p.set(this, "type", t);
  }
  get src() {
    return p.get(this, "src");
  }
  set src(t) {
    p.set(this, "src", t);
  }
  get defer() {
    return v.get(this, "defer");
  }
  set defer(t) {
    v.set(this, "defer", t);
  }
  get crossOrigin() {
    return p.get(this, "crossorigin");
  }
  set crossOrigin(t) {
    p.set(this, "crossorigin", t);
  }
  get nomodule() {
    return v.get(this, "nomodule");
  }
  set nomodule(t) {
    v.set(this, "nomodule", t);
  }
  get referrerPolicy() {
    return p.get(this, "referrerpolicy");
  }
  set referrerPolicy(t) {
    p.set(this, "referrerpolicy", t);
  }
  get nonce() {
    return p.get(this, "nonce");
  }
  set nonce(t) {
    p.set(this, "nonce", t);
  }
  get async() {
    return v.get(this, "async");
  }
  set async(t) {
    v.set(this, "async", t);
  }
  get text() {
    return this.textContent;
  }
  set text(t) {
    this.textContent = t;
  }
}
P(oa, Aa);
class Bh extends C {
  constructor(t, e = "frame") {
    super(t, e);
  }
}
const aa = "iframe";
class ca extends C {
  constructor(t, e = aa) {
    super(t, e);
  }
  /* c8 ignore start */
  get src() {
    return p.get(this, "src");
  }
  set src(t) {
    p.set(this, "src", t);
  }
  get srcdoc() {
    return p.get(this, "srcdoc");
  }
  set srcdoc(t) {
    p.set(this, "srcdoc", t);
  }
  get name() {
    return p.get(this, "name");
  }
  set name(t) {
    p.set(this, "name", t);
  }
  get allow() {
    return p.get(this, "allow");
  }
  set allow(t) {
    p.set(this, "allow", t);
  }
  get allowFullscreen() {
    return v.get(this, "allowfullscreen");
  }
  set allowFullscreen(t) {
    v.set(this, "allowfullscreen", t);
  }
  get referrerPolicy() {
    return p.get(this, "referrerpolicy");
  }
  set referrerPolicy(t) {
    p.set(this, "referrerpolicy", t);
  }
  get loading() {
    return p.get(this, "loading");
  }
  set loading(t) {
    p.set(this, "loading", t);
  }
  /* c8 ignore stop */
}
P(aa, ca);
class Th extends C {
  constructor(t, e = "object") {
    super(t, e);
  }
}
class Dh extends C {
  constructor(t, e = "head") {
    super(t, e);
  }
}
class xh extends C {
  constructor(t, e = "body") {
    super(t, e);
  }
}
var Q = {}, Gn = {}, Kn = {}, Hn = {}, Wn = {}, So;
function la() {
  if (So) return Wn;
  So = 1;
  var s = {};
  return s.StyleSheet = function() {
    this.parentStyleSheet = null;
  }, Wn.StyleSheet = s.StyleSheet, Wn;
}
var Yn = {}, Un = {}, Co;
function pt() {
  if (Co) return Un;
  Co = 1;
  var s = {};
  return s.CSSRule = function() {
    this.parentRule = null, this.parentStyleSheet = null;
  }, s.CSSRule.UNKNOWN_RULE = 0, s.CSSRule.STYLE_RULE = 1, s.CSSRule.CHARSET_RULE = 2, s.CSSRule.IMPORT_RULE = 3, s.CSSRule.MEDIA_RULE = 4, s.CSSRule.FONT_FACE_RULE = 5, s.CSSRule.PAGE_RULE = 6, s.CSSRule.KEYFRAMES_RULE = 7, s.CSSRule.KEYFRAME_RULE = 8, s.CSSRule.MARGIN_RULE = 9, s.CSSRule.NAMESPACE_RULE = 10, s.CSSRule.COUNTER_STYLE_RULE = 11, s.CSSRule.SUPPORTS_RULE = 12, s.CSSRule.DOCUMENT_RULE = 13, s.CSSRule.FONT_FEATURE_VALUES_RULE = 14, s.CSSRule.VIEWPORT_RULE = 15, s.CSSRule.REGION_STYLE_RULE = 16, s.CSSRule.prototype = {
    constructor: s.CSSRule
    //FIXME
  }, Un.CSSRule = s.CSSRule, Un;
}
var bo;
function on() {
  if (bo) return Yn;
  bo = 1;
  var s = {
    CSSStyleDeclaration: ke().CSSStyleDeclaration,
    CSSRule: pt().CSSRule
  };
  return s.CSSStyleRule = function() {
    s.CSSRule.call(this), this.selectorText = "", this.style = new s.CSSStyleDeclaration(), this.style.parentRule = this;
  }, s.CSSStyleRule.prototype = new s.CSSRule(), s.CSSStyleRule.prototype.constructor = s.CSSStyleRule, s.CSSStyleRule.prototype.type = 1, Object.defineProperty(s.CSSStyleRule.prototype, "cssText", {
    get: function() {
      var t;
      return this.selectorText ? t = this.selectorText + " {" + this.style.cssText + "}" : t = "", t;
    },
    set: function(t) {
      var e = s.CSSStyleRule.parse(t);
      this.style = e.style, this.selectorText = e.selectorText;
    }
  }), s.CSSStyleRule.parse = function(t) {
    for (var e = 0, n = "selector", i, r = e, o = "", A = {
      selector: !0,
      value: !0
    }, c = new s.CSSStyleRule(), a, u = "", g; g = t.charAt(e); e++)
      switch (g) {
        case " ":
        case "	":
        case "\r":
        case `
`:
        case "\f":
          if (A[n])
            switch (t.charAt(e - 1)) {
              case " ":
              case "	":
              case "\r":
              case `
`:
              case "\f":
                break;
              default:
                o += " ";
                break;
            }
          break;
        // String
        case '"':
          if (r = e + 1, i = t.indexOf('"', r) + 1, !i)
            throw '" is missing';
          o += t.slice(e, i), e = i - 1;
          break;
        case "'":
          if (r = e + 1, i = t.indexOf("'", r) + 1, !i)
            throw "' is missing";
          o += t.slice(e, i), e = i - 1;
          break;
        // Comment
        case "/":
          if (t.charAt(e + 1) === "*") {
            if (e += 2, i = t.indexOf("*/", e), i === -1)
              throw new SyntaxError("Missing */");
            e = i + 1;
          } else
            o += g;
          break;
        case "{":
          n === "selector" && (c.selectorText = o.trim(), o = "", n = "name");
          break;
        case ":":
          n === "name" ? (a = o.trim(), o = "", n = "value") : o += g;
          break;
        case "!":
          n === "value" && t.indexOf("!important", e) === e ? (u = "important", e += 9) : o += g;
          break;
        case ";":
          n === "value" ? (c.style.setProperty(a, o.trim(), u), u = "", o = "", n = "name") : o += g;
          break;
        case "}":
          if (n === "value")
            c.style.setProperty(a, o.trim(), u), u = "", o = "";
          else {
            if (n === "name")
              break;
            o += g;
          }
          n = "selector";
          break;
        default:
          o += g;
          break;
      }
    return c;
  }, Yn.CSSStyleRule = s.CSSStyleRule, Yn;
}
var yo;
function An() {
  if (yo) return Hn;
  yo = 1;
  var s = {
    StyleSheet: la().StyleSheet,
    CSSStyleRule: on().CSSStyleRule
  };
  return s.CSSStyleSheet = function() {
    s.StyleSheet.call(this), this.cssRules = [];
  }, s.CSSStyleSheet.prototype = new s.StyleSheet(), s.CSSStyleSheet.prototype.constructor = s.CSSStyleSheet, s.CSSStyleSheet.prototype.insertRule = function(t, e) {
    if (e < 0 || e > this.cssRules.length)
      throw new RangeError("INDEX_SIZE_ERR");
    var n = s.parse(t).cssRules[0];
    return n.parentStyleSheet = this, this.cssRules.splice(e, 0, n), e;
  }, s.CSSStyleSheet.prototype.deleteRule = function(t) {
    if (t < 0 || t >= this.cssRules.length)
      throw new RangeError("INDEX_SIZE_ERR");
    this.cssRules.splice(t, 1);
  }, s.CSSStyleSheet.prototype.toString = function() {
    for (var t = "", e = this.cssRules, n = 0; n < e.length; n++)
      t += e[n].cssText + `
`;
    return t;
  }, Hn.CSSStyleSheet = s.CSSStyleSheet, s.parse = ir().parse, Hn;
}
var _n = {}, Jn = {}, Eo;
function $i() {
  if (Eo) return Jn;
  Eo = 1;
  var s = {};
  return s.MediaList = function() {
    this.length = 0;
  }, s.MediaList.prototype = {
    constructor: s.MediaList,
    /**
     * @return {string}
     */
    get mediaText() {
      return Array.prototype.join.call(this, ", ");
    },
    /**
     * @param {string} value
     */
    set mediaText(t) {
      for (var e = t.split(","), n = this.length = e.length, i = 0; i < n; i++)
        this[i] = e[i].trim();
    },
    /**
     * @param {string} medium
     */
    appendMedium: function(t) {
      Array.prototype.indexOf.call(this, t) === -1 && (this[this.length] = t, this.length++);
    },
    /**
     * @param {string} medium
     */
    deleteMedium: function(t) {
      var e = Array.prototype.indexOf.call(this, t);
      e !== -1 && Array.prototype.splice.call(this, e, 1);
    }
  }, Jn.MediaList = s.MediaList, Jn;
}
var Io;
function ua() {
  if (Io) return _n;
  Io = 1;
  var s = {
    CSSRule: pt().CSSRule,
    CSSStyleSheet: An().CSSStyleSheet,
    MediaList: $i().MediaList
  };
  return s.CSSImportRule = function() {
    s.CSSRule.call(this), this.href = "", this.media = new s.MediaList(), this.styleSheet = new s.CSSStyleSheet();
  }, s.CSSImportRule.prototype = new s.CSSRule(), s.CSSImportRule.prototype.constructor = s.CSSImportRule, s.CSSImportRule.prototype.type = 3, Object.defineProperty(s.CSSImportRule.prototype, "cssText", {
    get: function() {
      var t = this.media.mediaText;
      return "@import url(" + this.href + ")" + (t ? " " + t : "") + ";";
    },
    set: function(t) {
      for (var e = 0, n = "", i = "", r, o; o = t.charAt(e); e++)
        switch (o) {
          case " ":
          case "	":
          case "\r":
          case `
`:
          case "\f":
            n === "after-import" ? n = "url" : i += o;
            break;
          case "@":
            !n && t.indexOf("@import", e) === e && (n = "after-import", e += 6, i = "");
            break;
          case "u":
            if (n === "url" && t.indexOf("url(", e) === e) {
              if (r = t.indexOf(")", e + 1), r === -1)
                throw e + ': ")" not found';
              e += 4;
              var A = t.slice(e, r);
              A[0] === A[A.length - 1] && (A[0] === '"' || A[0] === "'") && (A = A.slice(1, -1)), this.href = A, e = r, n = "media";
            }
            break;
          case '"':
            if (n === "url") {
              if (r = t.indexOf('"', e + 1), !r)
                throw e + `: '"' not found`;
              this.href = t.slice(e + 1, r), e = r, n = "media";
            }
            break;
          case "'":
            if (n === "url") {
              if (r = t.indexOf("'", e + 1), !r)
                throw e + `: "'" not found`;
              this.href = t.slice(e + 1, r), e = r, n = "media";
            }
            break;
          case ";":
            n === "media" && i && (this.media.mediaText = i.trim());
            break;
          default:
            n === "media" && (i += o);
            break;
        }
    }
  }), _n.CSSImportRule = s.CSSImportRule, _n;
}
var Pn = {}, wo;
function Me() {
  if (wo) return Pn;
  wo = 1;
  var s = {
    CSSRule: pt().CSSRule
  };
  return s.CSSGroupingRule = function() {
    s.CSSRule.call(this), this.cssRules = [];
  }, s.CSSGroupingRule.prototype = new s.CSSRule(), s.CSSGroupingRule.prototype.constructor = s.CSSGroupingRule, s.CSSGroupingRule.prototype.insertRule = function(e, n) {
    if (n < 0 || n > this.cssRules.length)
      throw new RangeError("INDEX_SIZE_ERR");
    var i = s.parse(e).cssRules[0];
    return i.parentRule = this, this.cssRules.splice(n, 0, i), n;
  }, s.CSSGroupingRule.prototype.deleteRule = function(e) {
    if (e < 0 || e >= this.cssRules.length)
      throw new RangeError("INDEX_SIZE_ERR");
    this.cssRules.splice(e, 1)[0].parentRule = null;
  }, Pn.CSSGroupingRule = s.CSSGroupingRule, Pn;
}
var Zn = {}, Vn = {}, Ro;
function ls() {
  if (Ro) return Vn;
  Ro = 1;
  var s = {
    CSSRule: pt().CSSRule,
    CSSGroupingRule: Me().CSSGroupingRule
  };
  return s.CSSConditionRule = function() {
    s.CSSGroupingRule.call(this), this.cssRules = [];
  }, s.CSSConditionRule.prototype = new s.CSSGroupingRule(), s.CSSConditionRule.prototype.constructor = s.CSSConditionRule, s.CSSConditionRule.prototype.conditionText = "", s.CSSConditionRule.prototype.cssText = "", Vn.CSSConditionRule = s.CSSConditionRule, Vn;
}
var Bo;
function tr() {
  if (Bo) return Zn;
  Bo = 1;
  var s = {
    CSSRule: pt().CSSRule,
    CSSGroupingRule: Me().CSSGroupingRule,
    CSSConditionRule: ls().CSSConditionRule,
    MediaList: $i().MediaList
  };
  return s.CSSMediaRule = function() {
    s.CSSConditionRule.call(this), this.media = new s.MediaList();
  }, s.CSSMediaRule.prototype = new s.CSSConditionRule(), s.CSSMediaRule.prototype.constructor = s.CSSMediaRule, s.CSSMediaRule.prototype.type = 4, Object.defineProperties(s.CSSMediaRule.prototype, {
    conditionText: {
      get: function() {
        return this.media.mediaText;
      },
      set: function(t) {
        this.media.mediaText = t;
      },
      configurable: !0,
      enumerable: !0
    },
    cssText: {
      get: function() {
        for (var t = [], e = 0, n = this.cssRules.length; e < n; e++)
          t.push(this.cssRules[e].cssText);
        return "@media " + this.media.mediaText + " {" + t.join("") + "}";
      },
      configurable: !0,
      enumerable: !0
    }
  }), Zn.CSSMediaRule = s.CSSMediaRule, Zn;
}
var Xn = {}, To;
function er() {
  if (To) return Xn;
  To = 1;
  var s = {
    CSSRule: pt().CSSRule,
    CSSGroupingRule: Me().CSSGroupingRule,
    CSSConditionRule: ls().CSSConditionRule
  };
  return s.CSSSupportsRule = function() {
    s.CSSConditionRule.call(this);
  }, s.CSSSupportsRule.prototype = new s.CSSConditionRule(), s.CSSSupportsRule.prototype.constructor = s.CSSSupportsRule, s.CSSSupportsRule.prototype.type = 12, Object.defineProperty(s.CSSSupportsRule.prototype, "cssText", {
    get: function() {
      for (var t = [], e = 0, n = this.cssRules.length; e < n; e++)
        t.push(this.cssRules[e].cssText);
      return "@supports " + this.conditionText + " {" + t.join("") + "}";
    }
  }), Xn.CSSSupportsRule = s.CSSSupportsRule, Xn;
}
var jn = {}, Do;
function ha() {
  if (Do) return jn;
  Do = 1;
  var s = {
    CSSStyleDeclaration: ke().CSSStyleDeclaration,
    CSSRule: pt().CSSRule
  };
  return s.CSSFontFaceRule = function() {
    s.CSSRule.call(this), this.style = new s.CSSStyleDeclaration(), this.style.parentRule = this;
  }, s.CSSFontFaceRule.prototype = new s.CSSRule(), s.CSSFontFaceRule.prototype.constructor = s.CSSFontFaceRule, s.CSSFontFaceRule.prototype.type = 5, Object.defineProperty(s.CSSFontFaceRule.prototype, "cssText", {
    get: function() {
      return "@font-face {" + this.style.cssText + "}";
    }
  }), jn.CSSFontFaceRule = s.CSSFontFaceRule, jn;
}
var qn = {}, xo;
function ga() {
  if (xo) return qn;
  xo = 1;
  var s = {
    CSSRule: pt().CSSRule
  };
  return s.CSSHostRule = function() {
    s.CSSRule.call(this), this.cssRules = [];
  }, s.CSSHostRule.prototype = new s.CSSRule(), s.CSSHostRule.prototype.constructor = s.CSSHostRule, s.CSSHostRule.prototype.type = 1001, Object.defineProperty(s.CSSHostRule.prototype, "cssText", {
    get: function() {
      for (var t = [], e = 0, n = this.cssRules.length; e < n; e++)
        t.push(this.cssRules[e].cssText);
      return "@host {" + t.join("") + "}";
    }
  }), qn.CSSHostRule = s.CSSHostRule, qn;
}
var zn = {}, No;
function sr() {
  if (No) return zn;
  No = 1;
  var s = {
    CSSRule: pt().CSSRule,
    CSSStyleDeclaration: ke().CSSStyleDeclaration
  };
  return s.CSSKeyframeRule = function() {
    s.CSSRule.call(this), this.keyText = "", this.style = new s.CSSStyleDeclaration(), this.style.parentRule = this;
  }, s.CSSKeyframeRule.prototype = new s.CSSRule(), s.CSSKeyframeRule.prototype.constructor = s.CSSKeyframeRule, s.CSSKeyframeRule.prototype.type = 8, Object.defineProperty(s.CSSKeyframeRule.prototype, "cssText", {
    get: function() {
      return this.keyText + " {" + this.style.cssText + "} ";
    }
  }), zn.CSSKeyframeRule = s.CSSKeyframeRule, zn;
}
var $n = {}, vo;
function nr() {
  if (vo) return $n;
  vo = 1;
  var s = {
    CSSRule: pt().CSSRule
  };
  return s.CSSKeyframesRule = function() {
    s.CSSRule.call(this), this.name = "", this.cssRules = [];
  }, s.CSSKeyframesRule.prototype = new s.CSSRule(), s.CSSKeyframesRule.prototype.constructor = s.CSSKeyframesRule, s.CSSKeyframesRule.prototype.type = 7, Object.defineProperty(s.CSSKeyframesRule.prototype, "cssText", {
    get: function() {
      for (var t = [], e = 0, n = this.cssRules.length; e < n; e++)
        t.push("  " + this.cssRules[e].cssText);
      return "@" + (this._vendorPrefix || "") + "keyframes " + this.name + ` { 
` + t.join(`
`) + `
}`;
    }
  }), $n.CSSKeyframesRule = s.CSSKeyframesRule, $n;
}
var ti = {}, ei = {}, Fo;
function da() {
  if (Fo) return ei;
  Fo = 1;
  var s = {};
  return s.CSSValue = function() {
  }, s.CSSValue.prototype = {
    constructor: s.CSSValue,
    // @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
    set cssText(t) {
      var e = this._getConstructorName();
      throw new Error('DOMException: property "cssText" of "' + e + '" is readonly and can not be replaced with "' + t + '"!');
    },
    get cssText() {
      var t = this._getConstructorName();
      throw new Error('getter "cssText" of "' + t + '" is not implemented!');
    },
    _getConstructorName: function() {
      var t = this.constructor.toString(), e = t.match(/function\s([^\(]+)/), n = e[1];
      return n;
    }
  }, ei.CSSValue = s.CSSValue, ei;
}
var Mo;
function fa() {
  if (Mo) return ti;
  Mo = 1;
  var s = {
    CSSValue: da().CSSValue
  };
  return s.CSSValueExpression = function(e, n) {
    this._token = e, this._idx = n;
  }, s.CSSValueExpression.prototype = new s.CSSValue(), s.CSSValueExpression.prototype.constructor = s.CSSValueExpression, s.CSSValueExpression.prototype.parse = function() {
    for (var t = this._token, e = this._idx, n = "", i = "", r = "", o, A = []; ; ++e) {
      if (n = t.charAt(e), n === "") {
        r = "css expression error: unfinished expression!";
        break;
      }
      switch (n) {
        case "(":
          A.push(n), i += n;
          break;
        case ")":
          A.pop(n), i += n;
          break;
        case "/":
          (o = this._parseJSComment(t, e)) ? o.error ? r = "css expression error: unfinished comment in expression!" : e = o.idx : (o = this._parseJSRexExp(t, e)) ? (e = o.idx, i += o.text) : i += n;
          break;
        case "'":
        case '"':
          o = this._parseJSString(t, e, n), o ? (e = o.idx, i += o.text) : i += n;
          break;
        default:
          i += n;
          break;
      }
      if (r || A.length === 0)
        break;
    }
    var c;
    return r ? c = {
      error: r
    } : c = {
      idx: e,
      expression: i
    }, c;
  }, s.CSSValueExpression.prototype._parseJSComment = function(t, e) {
    var n = t.charAt(e + 1), i;
    if (n === "/" || n === "*") {
      var r = e, o, A;
      if (n === "/" ? A = `
` : n === "*" && (A = "*/"), o = t.indexOf(A, r + 1 + 1), o !== -1)
        return o = o + A.length - 1, i = t.substring(e, o + 1), {
          idx: o,
          text: i
        };
      var c = "css expression error: unfinished comment in expression!";
      return {
        error: c
      };
    } else
      return !1;
  }, s.CSSValueExpression.prototype._parseJSString = function(t, e, n) {
    var i = this._findMatchedIdx(t, e, n), r;
    return i === -1 ? !1 : (r = t.substring(e, i + n.length), {
      idx: i,
      text: r
    });
  }, s.CSSValueExpression.prototype._parseJSRexExp = function(t, e) {
    var n = t.substring(0, e).replace(/\s+$/, ""), i = [
      /^$/,
      /\($/,
      /\[$/,
      /\!$/,
      /\+$/,
      /\-$/,
      /\*$/,
      /\/\s+/,
      /\%$/,
      /\=$/,
      /\>$/,
      /<$/,
      /\&$/,
      /\|$/,
      /\^$/,
      /\~$/,
      /\?$/,
      /\,$/,
      /delete$/,
      /in$/,
      /instanceof$/,
      /new$/,
      /typeof$/,
      /void$/
    ], r = i.some(function(A) {
      return A.test(n);
    });
    if (r) {
      var o = "/";
      return this._parseJSString(t, e, o);
    } else
      return !1;
  }, s.CSSValueExpression.prototype._findMatchedIdx = function(t, e, n) {
    for (var i = e, r, o = -1; ; )
      if (r = t.indexOf(n, i + 1), r === -1) {
        r = o;
        break;
      } else {
        var A = t.substring(e + 1, r), c = A.match(/\\+$/);
        if (!c || c[0] % 2 === 0)
          break;
        i = r;
      }
    var a = t.indexOf(`
`, e + 1);
    return a < r && (r = o), r;
  }, ti.CSSValueExpression = s.CSSValueExpression, ti;
}
var si = {}, ni = {}, ko;
function pa() {
  if (ko) return ni;
  ko = 1;
  var s = {};
  return s.MatcherList = function() {
    this.length = 0;
  }, s.MatcherList.prototype = {
    constructor: s.MatcherList,
    /**
     * @return {string}
     */
    get matcherText() {
      return Array.prototype.join.call(this, ", ");
    },
    /**
     * @param {string} value
     */
    set matcherText(t) {
      for (var e = t.split(","), n = this.length = e.length, i = 0; i < n; i++)
        this[i] = e[i].trim();
    },
    /**
     * @param {string} matcher
     */
    appendMatcher: function(t) {
      Array.prototype.indexOf.call(this, t) === -1 && (this[this.length] = t, this.length++);
    },
    /**
     * @param {string} matcher
     */
    deleteMatcher: function(t) {
      var e = Array.prototype.indexOf.call(this, t);
      e !== -1 && Array.prototype.splice.call(this, e, 1);
    }
  }, ni.MatcherList = s.MatcherList, ni;
}
var Oo;
function ma() {
  if (Oo) return si;
  Oo = 1;
  var s = {
    CSSRule: pt().CSSRule,
    MatcherList: pa().MatcherList
  };
  return s.CSSDocumentRule = function() {
    s.CSSRule.call(this), this.matcher = new s.MatcherList(), this.cssRules = [];
  }, s.CSSDocumentRule.prototype = new s.CSSRule(), s.CSSDocumentRule.prototype.constructor = s.CSSDocumentRule, s.CSSDocumentRule.prototype.type = 10, Object.defineProperty(s.CSSDocumentRule.prototype, "cssText", {
    get: function() {
      for (var t = [], e = 0, n = this.cssRules.length; e < n; e++)
        t.push(this.cssRules[e].cssText);
      return "@-moz-document " + this.matcher.matcherText + " {" + t.join("") + "}";
    }
  }), si.CSSDocumentRule = s.CSSDocumentRule, si;
}
var Qo;
function ir() {
  if (Qo) return Kn;
  Qo = 1;
  var s = {};
  return s.parse = function(e) {
    for (var n = 0, i = "before-selector", r, o = "", A = 0, c = {
      selector: !0,
      value: !0,
      "value-parenthesis": !0,
      atRule: !0,
      "importRule-begin": !0,
      importRule: !0,
      atBlock: !0,
      conditionBlock: !0,
      "documentRule-begin": !0
    }, a = new s.CSSStyleSheet(), u = a, g, S = [], b = !1, B, tt, Tt = "", K, yt, mt, k, et, Y, Yt, fe, us = /@(-(?:\w+-)+)?keyframes/g, te = function(Oe) {
      var hs = e.substring(0, n).split(`
`), gs = hs.length, ds = hs.pop().length + 1, ee = new Error(Oe + " (line " + gs + ", char " + ds + ")");
      throw ee.line = gs, ee.char = ds, ee.styleSheet = a, ee;
    }, N; N = e.charAt(n); n++)
      switch (N) {
        case " ":
        case "	":
        case "\r":
        case `
`:
        case "\f":
          c[i] && (o += N);
          break;
        // String
        case '"':
          r = n + 1;
          do
            r = e.indexOf('"', r) + 1, r || te('Unmatched "');
          while (e[r - 2] === "\\");
          switch (o += e.slice(n, r), n = r - 1, i) {
            case "before-value":
              i = "value";
              break;
            case "importRule-begin":
              i = "importRule";
              break;
          }
          break;
        case "'":
          r = n + 1;
          do
            r = e.indexOf("'", r) + 1, r || te("Unmatched '");
          while (e[r - 2] === "\\");
          switch (o += e.slice(n, r), n = r - 1, i) {
            case "before-value":
              i = "value";
              break;
            case "importRule-begin":
              i = "importRule";
              break;
          }
          break;
        // Comment
        case "/":
          e.charAt(n + 1) === "*" ? (n += 2, r = e.indexOf("*/", n), r === -1 ? te("Missing */") : n = r + 1) : o += N, i === "importRule-begin" && (o += " ", i = "importRule");
          break;
        // At-rule
        case "@":
          if (e.indexOf("@-moz-document", n) === n) {
            i = "documentRule-begin", Yt = new s.CSSDocumentRule(), Yt.__starts = n, n += 13, o = "";
            break;
          } else if (e.indexOf("@media", n) === n) {
            i = "atBlock", yt = new s.CSSMediaRule(), yt.__starts = n, n += 5, o = "";
            break;
          } else if (e.indexOf("@supports", n) === n) {
            i = "conditionBlock", mt = new s.CSSSupportsRule(), mt.__starts = n, n += 8, o = "";
            break;
          } else if (e.indexOf("@host", n) === n) {
            i = "hostRule-begin", n += 4, fe = new s.CSSHostRule(), fe.__starts = n, o = "";
            break;
          } else if (e.indexOf("@import", n) === n) {
            i = "importRule-begin", n += 6, o += "@import";
            break;
          } else if (e.indexOf("@font-face", n) === n) {
            i = "fontFaceRule-begin", n += 9, et = new s.CSSFontFaceRule(), et.__starts = n, o = "";
            break;
          } else {
            us.lastIndex = n;
            var Ut = us.exec(e);
            if (Ut && Ut.index === n) {
              i = "keyframesRule-begin", Y = new s.CSSKeyframesRule(), Y.__starts = n, Y._vendorPrefix = Ut[1], n += Ut[0].length - 1, o = "";
              break;
            } else i === "selector" && (i = "atRule");
          }
          o += N;
          break;
        case "{":
          i === "selector" || i === "atRule" ? (K.selectorText = o.trim(), K.style.__starts = n, o = "", i = "before-name") : i === "atBlock" ? (yt.media.mediaText = o.trim(), g && S.push(g), u = g = yt, yt.parentStyleSheet = a, o = "", i = "before-selector") : i === "conditionBlock" ? (mt.conditionText = o.trim(), g && S.push(g), u = g = mt, mt.parentStyleSheet = a, o = "", i = "before-selector") : i === "hostRule-begin" ? (g && S.push(g), u = g = fe, fe.parentStyleSheet = a, o = "", i = "before-selector") : i === "fontFaceRule-begin" ? (g && (et.parentRule = g), et.parentStyleSheet = a, K = et, o = "", i = "before-name") : i === "keyframesRule-begin" ? (Y.name = o.trim(), g && (S.push(g), Y.parentRule = g), Y.parentStyleSheet = a, u = g = Y, o = "", i = "keyframeRule-begin") : i === "keyframeRule-begin" ? (K = new s.CSSKeyframeRule(), K.keyText = o.trim(), K.__starts = n, o = "", i = "before-name") : i === "documentRule-begin" && (Yt.matcher.matcherText = o.trim(), g && (S.push(g), Yt.parentRule = g), u = g = Yt, Yt.parentStyleSheet = a, o = "", i = "before-selector");
          break;
        case ":":
          i === "name" ? (tt = o.trim(), o = "", i = "before-value") : o += N;
          break;
        case "(":
          if (i === "value")
            if (o.trim() === "expression") {
              var _t = new s.CSSValueExpression(e, n).parse();
              _t.error ? te(_t.error) : (o += _t.expression, n = _t.idx);
            } else
              i = "value-parenthesis", A = 1, o += N;
          else i === "value-parenthesis" && A++, o += N;
          break;
        case ")":
          i === "value-parenthesis" && (A--, A === 0 && (i = "value")), o += N;
          break;
        case "!":
          i === "value" && e.indexOf("!important", n) === n ? (Tt = "important", n += 9) : o += N;
          break;
        case ";":
          switch (i) {
            case "value":
              K.style.setProperty(tt, o.trim(), Tt), Tt = "", o = "", i = "before-name";
              break;
            case "atRule":
              o = "", i = "before-selector";
              break;
            case "importRule":
              k = new s.CSSImportRule(), k.parentStyleSheet = k.styleSheet.parentStyleSheet = a, k.cssText = o + N, a.cssRules.push(k), o = "", i = "before-selector";
              break;
            default:
              o += N;
              break;
          }
          break;
        case "}":
          switch (i) {
            case "value":
              K.style.setProperty(tt, o.trim(), Tt), Tt = "";
            /* falls through */
            case "before-name":
            case "name":
              K.__ends = n + 1, g && (K.parentRule = g), K.parentStyleSheet = a, u.cssRules.push(K), o = "", u.constructor === s.CSSKeyframesRule ? i = "keyframeRule-begin" : i = "before-selector";
              break;
            case "keyframeRule-begin":
            case "before-selector":
            case "selector":
              for (g || te("Unexpected }"), b = S.length > 0; S.length > 0; ) {
                if (g = S.pop(), g.constructor.name === "CSSMediaRule" || g.constructor.name === "CSSSupportsRule") {
                  B = u, u = g, u.cssRules.push(B);
                  break;
                }
                S.length === 0 && (b = !1);
              }
              b || (u.__ends = n + 1, a.cssRules.push(u), u = a, g = null), o = "", i = "before-selector";
              break;
          }
          break;
        default:
          switch (i) {
            case "before-selector":
              i = "selector", K = new s.CSSStyleRule(), K.__starts = n;
              break;
            case "before-name":
              i = "name";
              break;
            case "before-value":
              i = "value";
              break;
            case "importRule-begin":
              i = "importRule";
              break;
          }
          o += N;
          break;
      }
    return a;
  }, Kn.parse = s.parse, s.CSSStyleSheet = An().CSSStyleSheet, s.CSSStyleRule = on().CSSStyleRule, s.CSSImportRule = ua().CSSImportRule, s.CSSGroupingRule = Me().CSSGroupingRule, s.CSSMediaRule = tr().CSSMediaRule, s.CSSConditionRule = ls().CSSConditionRule, s.CSSSupportsRule = er().CSSSupportsRule, s.CSSFontFaceRule = ha().CSSFontFaceRule, s.CSSHostRule = ga().CSSHostRule, s.CSSStyleDeclaration = ke().CSSStyleDeclaration, s.CSSKeyframeRule = sr().CSSKeyframeRule, s.CSSKeyframesRule = nr().CSSKeyframesRule, s.CSSValueExpression = fa().CSSValueExpression, s.CSSDocumentRule = ma().CSSDocumentRule, Kn;
}
var Lo;
function ke() {
  if (Lo) return Gn;
  Lo = 1;
  var s = {};
  return s.CSSStyleDeclaration = function() {
    this.length = 0, this.parentRule = null, this._importants = {};
  }, s.CSSStyleDeclaration.prototype = {
    constructor: s.CSSStyleDeclaration,
    /**
     *
     * @param {string} name
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
     * @return {string} the value of the property if it has been explicitly set for this declaration block.
     * Returns the empty string if the property has not been set.
     */
    getPropertyValue: function(t) {
      return this[t] || "";
    },
    /**
     *
     * @param {string} name
     * @param {string} value
     * @param {string} [priority=null] "important" or null
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
     */
    setProperty: function(t, e, n) {
      if (this[t]) {
        var i = Array.prototype.indexOf.call(this, t);
        i < 0 && (this[this.length] = t, this.length++);
      } else
        this[this.length] = t, this.length++;
      this[t] = e + "", this._importants[t] = n;
    },
    /**
     *
     * @param {string} name
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
     * @return {string} the value of the property if it has been explicitly set for this declaration block.
     * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
     */
    removeProperty: function(t) {
      if (!(t in this))
        return "";
      var e = Array.prototype.indexOf.call(this, t);
      if (e < 0)
        return "";
      var n = this[t];
      return this[t] = "", Array.prototype.splice.call(this, e, 1), n;
    },
    getPropertyCSSValue: function() {
    },
    /**
     *
     * @param {String} name
     */
    getPropertyPriority: function(t) {
      return this._importants[t] || "";
    },
    /**
     *   element.style.overflow = "auto"
     *   element.style.getPropertyShorthand("overflow-x")
     *   -> "overflow"
     */
    getPropertyShorthand: function() {
    },
    isPropertyImplicit: function() {
    },
    // Doesn't work in IE < 9
    get cssText() {
      for (var t = [], e = 0, n = this.length; e < n; ++e) {
        var i = this[e], r = this.getPropertyValue(i), o = this.getPropertyPriority(i);
        o && (o = " !" + o), t[e] = i + ": " + r + o + ";";
      }
      return t.join(" ");
    },
    set cssText(t) {
      var e, n;
      for (e = this.length; e--; )
        n = this[e], this[n] = "";
      Array.prototype.splice.call(this, 0, this.length), this._importants = {};
      var i = s.parse("#bogus{" + t + "}").cssRules[0].style, r = i.length;
      for (e = 0; e < r; ++e)
        n = i[e], this.setProperty(i[e], i.getPropertyValue(n), i.getPropertyPriority(n));
    }
  }, Gn.CSSStyleDeclaration = s.CSSStyleDeclaration, s.parse = ir().parse, Gn;
}
var ii = {}, Go;
function Nh() {
  if (Go) return ii;
  Go = 1;
  var s = {
    CSSStyleSheet: An().CSSStyleSheet,
    CSSRule: pt().CSSRule,
    CSSStyleRule: on().CSSStyleRule,
    CSSGroupingRule: Me().CSSGroupingRule,
    CSSConditionRule: ls().CSSConditionRule,
    CSSMediaRule: tr().CSSMediaRule,
    CSSSupportsRule: er().CSSSupportsRule,
    CSSStyleDeclaration: ke().CSSStyleDeclaration,
    CSSKeyframeRule: sr().CSSKeyframeRule,
    CSSKeyframesRule: nr().CSSKeyframesRule
  };
  return s.clone = function t(e) {
    var n = new s.CSSStyleSheet(), i = e.cssRules;
    if (!i)
      return n;
    for (var r = 0, o = i.length; r < o; r++) {
      var A = i[r], c = n.cssRules[r] = new A.constructor(), a = A.style;
      if (a) {
        for (var u = c.style = new s.CSSStyleDeclaration(), g = 0, S = a.length; g < S; g++) {
          var b = u[g] = a[g];
          u[b] = a[b], u._importants[b] = a.getPropertyPriority(b);
        }
        u.length = a.length;
      }
      A.hasOwnProperty("keyText") && (c.keyText = A.keyText), A.hasOwnProperty("selectorText") && (c.selectorText = A.selectorText), A.hasOwnProperty("mediaText") && (c.mediaText = A.mediaText), A.hasOwnProperty("conditionText") && (c.conditionText = A.conditionText), A.hasOwnProperty("cssRules") && (c.cssRules = t(A).cssRules);
    }
    return n;
  }, ii.clone = s.clone, ii;
}
var Ko;
function vh() {
  return Ko || (Ko = 1, Q.CSSStyleDeclaration = ke().CSSStyleDeclaration, Q.CSSRule = pt().CSSRule, Q.CSSGroupingRule = Me().CSSGroupingRule, Q.CSSConditionRule = ls().CSSConditionRule, Q.CSSStyleRule = on().CSSStyleRule, Q.MediaList = $i().MediaList, Q.CSSMediaRule = tr().CSSMediaRule, Q.CSSSupportsRule = er().CSSSupportsRule, Q.CSSImportRule = ua().CSSImportRule, Q.CSSFontFaceRule = ha().CSSFontFaceRule, Q.CSSHostRule = ga().CSSHostRule, Q.StyleSheet = la().StyleSheet, Q.CSSStyleSheet = An().CSSStyleSheet, Q.CSSKeyframesRule = nr().CSSKeyframesRule, Q.CSSKeyframeRule = sr().CSSKeyframeRule, Q.MatcherList = pa().MatcherList, Q.CSSDocumentRule = ma().CSSDocumentRule, Q.CSSValue = da().CSSValue, Q.CSSValueExpression = fa().CSSValueExpression, Q.parse = ir().parse, Q.clone = Nh().clone), Q;
}
var Fh = vh();
const Sa = "style";
class Ca extends rn {
  constructor(t, e = Sa) {
    super(t, e), this[Ie] = null;
  }
  get sheet() {
    const t = this[Ie];
    return t !== null ? t : this[Ie] = Fh.parse(this.textContent);
  }
  get innerHTML() {
    return super.innerHTML || "";
  }
  set innerHTML(t) {
    super.textContent = t, this[Ie] = null;
  }
  get innerText() {
    return super.innerText || "";
  }
  set innerText(t) {
    super.textContent = t, this[Ie] = null;
  }
  get textContent() {
    return super.textContent || "";
  }
  set textContent(t) {
    super.textContent = t, this[Ie] = null;
  }
}
P(Sa, Ca);
class ba extends C {
  constructor(t, e = "time") {
    super(t, e);
  }
  /**
   * @type {string}
   */
  get dateTime() {
    return p.get(this, "datetime");
  }
  set dateTime(t) {
    p.set(this, "datetime", t);
  }
}
P("time", ba);
let Mh = class extends C {
  constructor(t, e = "fieldset") {
    super(t, e);
  }
};
class kh extends C {
  constructor(t, e = "embed") {
    super(t, e);
  }
}
class Oh extends C {
  constructor(t, e = "hr") {
    super(t, e);
  }
}
class Qh extends C {
  constructor(t, e = "progress") {
    super(t, e);
  }
}
class Lh extends C {
  constructor(t, e = "p") {
    super(t, e);
  }
}
class Gh extends C {
  constructor(t, e = "table") {
    super(t, e);
  }
}
class Kh extends C {
  constructor(t, e = "frameset") {
    super(t, e);
  }
}
class Hh extends C {
  constructor(t, e = "li") {
    super(t, e);
  }
}
class Wh extends C {
  constructor(t, e = "base") {
    super(t, e);
  }
}
class Yh extends C {
  constructor(t, e = "datalist") {
    super(t, e);
  }
}
const ya = "input";
let Ea = class extends C {
  constructor(t, e = ya) {
    super(t, e);
  }
  /* c8 ignore start */
  get autofocus() {
    return v.get(this, "autofocus") || -1;
  }
  set autofocus(t) {
    v.set(this, "autofocus", t);
  }
  get disabled() {
    return v.get(this, "disabled");
  }
  set disabled(t) {
    v.set(this, "disabled", t);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  get placeholder() {
    return this.getAttribute("placeholder");
  }
  set placeholder(t) {
    this.setAttribute("placeholder", t);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(t) {
    this.setAttribute("type", t);
  }
  get value() {
    return p.get(this, "value");
  }
  set value(t) {
    p.set(this, "value", t);
  }
  /* c8 ignore stop */
};
P(ya, Ea);
class Uh extends C {
  constructor(t, e = "param") {
    super(t, e);
  }
}
class _h extends C {
  constructor(t, e = "media") {
    super(t, e);
  }
}
class Jh extends C {
  constructor(t, e = "audio") {
    super(t, e);
  }
}
const Ia = "h1";
class wa extends C {
  constructor(t, e = Ia) {
    super(t, e);
  }
}
P([Ia, "h2", "h3", "h4", "h5", "h6"], wa);
class Ph extends C {
  constructor(t, e = "dir") {
    super(t, e);
  }
}
class Zh extends C {
  constructor(t, e = "quote") {
    super(t, e);
  }
}
var Ns = { exports: {} };
const Vh = {}, Xh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vh
}, Symbol.toStringTag, { value: "Module" })), jh = /* @__PURE__ */ Ru(Xh);
var ri, Ho;
function qh() {
  if (Ho) return ri;
  Ho = 1;
  class s {
    constructor(e, n) {
      this.width = e, this.height = n;
    }
    getContext() {
      return null;
    }
    toDataURL() {
      return "";
    }
  }
  return ri = {
    createCanvas: (t, e) => new s(t, e)
  }, ri;
}
var Wo;
function zh() {
  if (Wo) return Ns.exports;
  Wo = 1;
  try {
    Ns.exports = jh;
  } catch {
    Ns.exports = qh();
  }
  return Ns.exports;
}
var $h = zh();
const tg = /* @__PURE__ */ MA($h), { createCanvas: eg } = tg, Ra = "canvas";
class Ba extends C {
  constructor(t, e = Ra) {
    super(t, e), this[It] = eg(300, 150);
  }
  get width() {
    return this[It].width;
  }
  set width(t) {
    qt.set(this, "width", t), this[It].width = t;
  }
  get height() {
    return this[It].height;
  }
  set height(t) {
    qt.set(this, "height", t), this[It].height = t;
  }
  getContext(t) {
    return this[It].getContext(t);
  }
  toDataURL(...t) {
    return this[It].toDataURL(...t);
  }
}
P(Ra, Ba);
class sg extends C {
  constructor(t, e = "legend") {
    super(t, e);
  }
}
const Ta = "option";
class Da extends C {
  constructor(t, e = Ta) {
    super(t, e);
  }
  /* c8 ignore start */
  get value() {
    return p.get(this, "value");
  }
  set value(t) {
    p.set(this, "value", t);
  }
  /* c8 ignore stop */
  get selected() {
    return v.get(this, "selected");
  }
  set selected(t) {
    const e = this.parentElement?.querySelector("option[selected]");
    e && e !== this && (e.selected = !1), v.set(this, "selected", t);
  }
}
P(Ta, Da);
class ng extends C {
  constructor(t, e = "span") {
    super(t, e);
  }
}
class ig extends C {
  constructor(t, e = "meter") {
    super(t, e);
  }
}
class rg extends C {
  constructor(t, e = "video") {
    super(t, e);
  }
}
class og extends C {
  constructor(t, e = "td") {
    super(t, e);
  }
}
const xa = "title";
class Na extends rn {
  constructor(t, e = xa) {
    super(t, e);
  }
}
P(xa, Na);
class Ag extends C {
  constructor(t, e = "output") {
    super(t, e);
  }
}
class ag extends C {
  constructor(t, e = "tr") {
    super(t, e);
  }
}
class cg extends C {
  constructor(t, e = "data") {
    super(t, e);
  }
}
class lg extends C {
  constructor(t, e = "menu") {
    super(t, e);
  }
}
const va = "select";
let Fa = class extends C {
  constructor(t, e = va) {
    super(t, e);
  }
  get options() {
    let t = new kt(), { firstElementChild: e } = this;
    for (; e; )
      e.tagName === "OPTGROUP" ? t.push(...e.children) : t.push(e), e = e.nextElementSibling;
    return t;
  }
  /* c8 ignore start */
  get disabled() {
    return v.get(this, "disabled");
  }
  set disabled(t) {
    v.set(this, "disabled", t);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  /* c8 ignore stop */
  get value() {
    return this.querySelector("option[selected]")?.value;
  }
};
P(va, Fa);
class ug extends C {
  constructor(t, e = "br") {
    super(t, e);
  }
}
const Ma = "button";
let ka = class extends C {
  constructor(t, e = Ma) {
    super(t, e);
  }
  /* c8 ignore start */
  get disabled() {
    return v.get(this, "disabled");
  }
  set disabled(t) {
    v.set(this, "disabled", t);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(t) {
    this.setAttribute("type", t);
  }
  /* c8 ignore stop */
};
P(Ma, ka);
class hg extends C {
  constructor(t, e = "map") {
    super(t, e);
  }
}
class gg extends C {
  constructor(t, e = "optgroup") {
    super(t, e);
  }
}
class dg extends C {
  constructor(t, e = "dl") {
    super(t, e);
  }
}
const Oa = "textarea";
let Qa = class extends rn {
  constructor(t, e = Oa) {
    super(t, e);
  }
  /* c8 ignore start */
  get disabled() {
    return v.get(this, "disabled");
  }
  set disabled(t) {
    v.set(this, "disabled", t);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  get placeholder() {
    return this.getAttribute("placeholder");
  }
  set placeholder(t) {
    this.setAttribute("placeholder", t);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(t) {
    this.setAttribute("type", t);
  }
  get value() {
    return this.textContent;
  }
  set value(t) {
    this.textContent = t;
  }
  /* c8 ignore stop */
};
P(Oa, Qa);
class fg extends C {
  constructor(t, e = "font") {
    super(t, e);
  }
}
class pg extends C {
  constructor(t, e = "div") {
    super(t, e);
  }
}
const La = "link";
class Ga extends C {
  constructor(t, e = La) {
    super(t, e);
  }
  /* c8 ignore start */
  // copy paste from img.src, already covered
  get disabled() {
    return v.get(this, "disabled");
  }
  set disabled(t) {
    v.set(this, "disabled", t);
  }
  get href() {
    return p.get(this, "href").trim();
  }
  set href(t) {
    p.set(this, "href", t);
  }
  get hreflang() {
    return p.get(this, "hreflang");
  }
  set hreflang(t) {
    p.set(this, "hreflang", t);
  }
  get media() {
    return p.get(this, "media");
  }
  set media(t) {
    p.set(this, "media", t);
  }
  get rel() {
    return p.get(this, "rel");
  }
  set rel(t) {
    p.set(this, "rel", t);
  }
  get type() {
    return p.get(this, "type");
  }
  set type(t) {
    p.set(this, "type", t);
  }
  /* c8 ignore stop */
}
P(La, Ga);
const Ka = "slot";
class Ha extends C {
  constructor(t, e = Ka) {
    super(t, e);
  }
  /* c8 ignore start */
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  assign() {
  }
  assignedNodes(t) {
    const e = !!this.name, n = this.getRootNode().host?.childNodes ?? [];
    let i;
    if (e ? i = [...n].filter((r) => r.slot === this.name) : i = [...n].filter((r) => !r.slot), t?.flatten) {
      const r = [];
      for (let o of i)
        o.localName === "slot" ? r.push(...o.assignedNodes({ flatten: !0 })) : r.push(o);
      i = r;
    }
    return i.length ? i : [...this.childNodes];
  }
  assignedElements(t) {
    const e = this.assignedNodes(t).filter((n) => n.nodeType === 1);
    return e.length ? e : [...this.children];
  }
  /* c8 ignore stop */
}
P(Ka, Ha);
class mg extends C {
  constructor(t, e = "form") {
    super(t, e);
  }
}
const Wa = "img";
class rr extends C {
  constructor(t, e = Wa) {
    super(t, e);
  }
  /* c8 ignore start */
  get alt() {
    return p.get(this, "alt");
  }
  set alt(t) {
    p.set(this, "alt", t);
  }
  get sizes() {
    return p.get(this, "sizes");
  }
  set sizes(t) {
    p.set(this, "sizes", t);
  }
  get src() {
    return p.get(this, "src");
  }
  set src(t) {
    p.set(this, "src", t);
  }
  get srcset() {
    return p.get(this, "srcset");
  }
  set srcset(t) {
    p.set(this, "srcset", t);
  }
  get title() {
    return p.get(this, "title");
  }
  set title(t) {
    p.set(this, "title", t);
  }
  get width() {
    return qt.get(this, "width");
  }
  set width(t) {
    qt.set(this, "width", t);
  }
  get height() {
    return qt.get(this, "height");
  }
  set height(t) {
    qt.set(this, "height", t);
  }
  /* c8 ignore stop */
}
P(Wa, rr);
class Sg extends C {
  constructor(t, e = "pre") {
    super(t, e);
  }
}
class Cg extends C {
  constructor(t, e = "ul") {
    super(t, e);
  }
}
const Ya = "meta";
class Ua extends C {
  constructor(t, e = Ya) {
    super(t, e);
  }
  /* c8 ignore start */
  get name() {
    return p.get(this, "name");
  }
  set name(t) {
    p.set(this, "name", t);
  }
  get httpEquiv() {
    return p.get(this, "http-equiv");
  }
  set httpEquiv(t) {
    p.set(this, "http-equiv", t);
  }
  get content() {
    return p.get(this, "content");
  }
  set content(t) {
    p.set(this, "content", t);
  }
  get charset() {
    return p.get(this, "charset");
  }
  set charset(t) {
    p.set(this, "charset", t);
  }
  get media() {
    return p.get(this, "media");
  }
  set media(t) {
    p.set(this, "media", t);
  }
  /* c8 ignore stop */
}
P(Ya, Ua);
class bg extends C {
  constructor(t, e = "picture") {
    super(t, e);
  }
}
class yg extends C {
  constructor(t, e = "area") {
    super(t, e);
  }
}
class Eg extends C {
  constructor(t, e = "ol") {
    super(t, e);
  }
}
class Ig extends C {
  constructor(t, e = "caption") {
    super(t, e);
  }
}
const _a = "a";
class Ja extends C {
  constructor(t, e = _a) {
    super(t, e);
  }
  /* c8 ignore start */
  // copy paste from img.src, already covered
  get href() {
    return encodeURI(decodeURI(p.get(this, "href"))).trim();
  }
  set href(t) {
    p.set(this, "href", decodeURI(t));
  }
  get download() {
    return encodeURI(decodeURI(p.get(this, "download")));
  }
  set download(t) {
    p.set(this, "download", decodeURI(t));
  }
  get target() {
    return p.get(this, "target");
  }
  set target(t) {
    p.set(this, "target", t);
  }
  get type() {
    return p.get(this, "type");
  }
  set type(t) {
    p.set(this, "type", t);
  }
  get rel() {
    return p.get(this, "rel");
  }
  set rel(t) {
    p.set(this, "rel", t);
  }
  /* c8 ignore stop */
}
P(_a, Ja);
class wg extends C {
  constructor(t, e = "label") {
    super(t, e);
  }
}
class Rg extends C {
  constructor(t, e = "unknown") {
    super(t, e);
  }
}
class Bg extends C {
  constructor(t, e = "mod") {
    super(t, e);
  }
}
class Tg extends C {
  constructor(t, e = "details") {
    super(t, e);
  }
}
const Pa = "source";
class Za extends C {
  constructor(t, e = Pa) {
    super(t, e);
  }
  /* c8 ignore start */
  get src() {
    return p.get(this, "src");
  }
  set src(t) {
    p.set(this, "src", t);
  }
  get srcset() {
    return p.get(this, "srcset");
  }
  set srcset(t) {
    p.set(this, "srcset", t);
  }
  get sizes() {
    return p.get(this, "sizes");
  }
  set sizes(t) {
    p.set(this, "sizes", t);
  }
  get type() {
    return p.get(this, "type");
  }
  set type(t) {
    p.set(this, "type", t);
  }
  /* c8 ignore stop */
}
P(Pa, Za);
class Dg extends C {
  constructor(t, e = "track") {
    super(t, e);
  }
}
class xg extends C {
  constructor(t, e = "marquee") {
    super(t, e);
  }
}
const Ng = {
  HTMLElement: C,
  HTMLTemplateElement: ra,
  HTMLHtmlElement: wh,
  HTMLScriptElement: Aa,
  HTMLFrameElement: Bh,
  HTMLIFrameElement: ca,
  HTMLObjectElement: Th,
  HTMLHeadElement: Dh,
  HTMLBodyElement: xh,
  HTMLStyleElement: Ca,
  HTMLTimeElement: ba,
  HTMLFieldSetElement: Mh,
  HTMLEmbedElement: kh,
  HTMLHRElement: Oh,
  HTMLProgressElement: Qh,
  HTMLParagraphElement: Lh,
  HTMLTableElement: Gh,
  HTMLFrameSetElement: Kh,
  HTMLLIElement: Hh,
  HTMLBaseElement: Wh,
  HTMLDataListElement: Yh,
  HTMLInputElement: Ea,
  HTMLParamElement: Uh,
  HTMLMediaElement: _h,
  HTMLAudioElement: Jh,
  HTMLHeadingElement: wa,
  HTMLDirectoryElement: Ph,
  HTMLQuoteElement: Zh,
  HTMLCanvasElement: Ba,
  HTMLLegendElement: sg,
  HTMLOptionElement: Da,
  HTMLSpanElement: ng,
  HTMLMeterElement: ig,
  HTMLVideoElement: rg,
  HTMLTableCellElement: og,
  HTMLTitleElement: Na,
  HTMLOutputElement: Ag,
  HTMLTableRowElement: ag,
  HTMLDataElement: cg,
  HTMLMenuElement: lg,
  HTMLSelectElement: Fa,
  HTMLBRElement: ug,
  HTMLButtonElement: ka,
  HTMLMapElement: hg,
  HTMLOptGroupElement: gg,
  HTMLDListElement: dg,
  HTMLTextAreaElement: Qa,
  HTMLFontElement: fg,
  HTMLDivElement: pg,
  HTMLLinkElement: Ga,
  HTMLSlotElement: Ha,
  HTMLFormElement: mg,
  HTMLImageElement: rr,
  HTMLPreElement: Sg,
  HTMLUListElement: Cg,
  HTMLMetaElement: Ua,
  HTMLPictureElement: bg,
  HTMLAreaElement: yg,
  HTMLOListElement: Eg,
  HTMLTableCaptionElement: Ig,
  HTMLAnchorElement: Ja,
  HTMLLabelElement: wg,
  HTMLUnknownElement: Rg,
  HTMLModElement: Bg,
  HTMLDetailsElement: Tg,
  HTMLSourceElement: Za,
  HTMLTrackElement: Dg,
  HTMLMarqueeElement: xg
}, vs = { test: () => !0 }, vg = {
  "text/html": {
    docType: "<!DOCTYPE html>",
    ignoreCase: !0,
    voidElements: /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i
  },
  "image/svg+xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: !1,
    voidElements: vs
  },
  "text/xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: !1,
    voidElements: vs
  },
  "application/xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: !1,
    voidElements: vs
  },
  "application/xhtml+xml": {
    docType: '<?xml version="1.0" encoding="utf-8"?>',
    ignoreCase: !1,
    voidElements: vs
  }
};
let Va = class extends he {
  constructor(t, e = {}) {
    super(t, e), this.detail = e.detail;
  }
};
class Fg extends he {
  constructor(t, e = {}) {
    super(t, e), this.inputType = e.inputType, this.data = e.data, this.dataTransfer = e.dataTransfer, this.isComposing = e.isComposing || !1, this.ranges = e.ranges;
  }
}
const Mg = (s) => (
  /**
   * @implements globalThis.Image
   */
  class extends rr {
    constructor(e, n) {
      switch (super(s), arguments.length) {
        case 1:
          this.height = e, this.width = e;
          break;
        case 2:
          this.height = n, this.width = e;
          break;
      }
    }
  }
), Yo = ({ [ut]: s, [w]: t }, e = null) => {
  dA(s[X], t[m]);
  do {
    const n = gt(s), i = n === t ? n : n[m];
    e ? e.insertBefore(s, e[w]) : s.remove(), s = i;
  } while (s !== t);
};
class or {
  constructor() {
    this[ut] = null, this[w] = null, this.commonAncestorContainer = null;
  }
  /* TODO: this is more complicated than it looks
    setStart(node, offset) {
      this[START] = node.childNodes[offset];
    }
  
    setEnd(node, offset) {
      this[END] = getEnd(node.childNodes[offset]);
    }
    //*/
  insertNode(t) {
    this[w].parentNode.insertBefore(t, this[ut]);
  }
  selectNode(t) {
    this[ut] = t, this[w] = gt(t);
  }
  // TODO: SVG elements should then create contextual fragments
  //       that return SVG nodes
  selectNodeContents(t) {
    this.selectNode(t), this.commonAncestorContainer = t;
  }
  surroundContents(t) {
    t.replaceChildren(this.extractContents());
  }
  setStartBefore(t) {
    this[ut] = t;
  }
  setStartAfter(t) {
    this[ut] = t.nextSibling;
  }
  setEndBefore(t) {
    this[w] = gt(t.previousSibling);
  }
  setEndAfter(t) {
    this[w] = gt(t);
  }
  cloneContents() {
    let { [ut]: t, [w]: e } = this;
    const n = t.ownerDocument.createDocumentFragment();
    for (; t !== e; )
      n.insertBefore(t.cloneNode(!0), n[w]), t = gt(t), t !== e && (t = t[m]);
    return n;
  }
  deleteContents() {
    Yo(this);
  }
  extractContents() {
    const t = this[ut].ownerDocument.createDocumentFragment();
    return Yo(this, t), t;
  }
  createContextualFragment(t) {
    const { commonAncestorContainer: e } = this, n = "ownerSVGElement" in e, i = n ? e.ownerDocument : e;
    let r = fA(i, t);
    if (n) {
      const o = [...r.childNodes];
      r = i.createDocumentFragment(), Object.setPrototypeOf(r, ts.prototype), r.ownerSVGElement = i;
      for (const A of o)
        Object.setPrototypeOf(A, ts.prototype), A.ownerSVGElement = i, r.appendChild(A);
    } else
      this.selectNode(r);
    return r;
  }
  cloneRange() {
    const t = new or();
    return t[ut] = this[ut], t[w] = this[w], t;
  }
}
const kg = ({ nodeType: s }, t) => {
  switch (s) {
    case x:
      return t & zl;
    case it:
      return t & $l;
    case Wt:
      return t & eu;
    case Ot:
      return t & tu;
  }
  return 0;
};
class Og {
  constructor(t, e = ql) {
    this.root = t, this.currentNode = t, this.whatToShow = e;
    let { [m]: n, [w]: i } = t;
    if (t.nodeType === Ae) {
      const { documentElement: o } = t;
      n = o, i = o[w];
    }
    const r = [];
    for (; n && n !== i; )
      kg(n, e) && r.push(n), n = n[m];
    this[nt] = { i: 0, nodes: r };
  }
  nextNode() {
    const t = this[nt];
    return this.currentNode = t.i < t.nodes.length ? t.nodes[t.i++] : null, this.currentNode;
  }
}
const Uo = (s, t, e) => {
  let { [m]: n, [w]: i } = t;
  return s.call({ ownerDocument: t, [m]: n, [w]: i }, e);
}, Xa = ou(
  {},
  Ih,
  Ng,
  {
    CustomEvent: Va,
    Event: he,
    EventTarget: vi,
    InputEvent: Fg,
    NamedNodeMap: na,
    NodeList: kt
  }
), Fs = /* @__PURE__ */ new WeakMap();
let ge = class extends Ki {
  constructor(t) {
    super(null, "#document", Ae), this[Et] = { active: !1, registry: null }, this[Vt] = { active: !1, class: null }, this[Ne] = vg[t], this[ie] = null, this[hi] = null, this[Os] = null, this[It] = null, this[qe] = null;
  }
  /**
   * @type {globalThis.Document['defaultView']}
   */
  get defaultView() {
    return Fs.has(this) || Fs.set(this, new Proxy(globalThis, {
      set: (t, e, n) => {
        switch (e) {
          case "addEventListener":
          case "removeEventListener":
          case "dispatchEvent":
            this[_e][e] = n;
            break;
          default:
            t[e] = n;
            break;
        }
        return !0;
      },
      get: (t, e) => {
        switch (e) {
          case "addEventListener":
          case "removeEventListener":
          case "dispatchEvent":
            if (!this[_e]) {
              const n = this[_e] = new vi();
              n.dispatchEvent = n.dispatchEvent.bind(n), n.addEventListener = n.addEventListener.bind(n), n.removeEventListener = n.removeEventListener.bind(n);
            }
            return this[_e][e];
          case "document":
            return this;
          /* c8 ignore start */
          case "navigator":
            return {
              userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
            };
          /* c8 ignore stop */
          case "window":
            return Fs.get(this);
          case "customElements":
            return this[Et].registry || (this[Et] = new hu(this)), this[Et];
          case "performance":
            return t.performance;
          case "DOMParser":
            return this[hi];
          case "Image":
            return this[It] || (this[It] = Mg(this)), this[It];
          case "MutationObserver":
            return this[Vt].class || (this[Vt] = new pu(this)), this[Vt].class;
        }
        return this[Os] && this[Os][e] || Xa[e] || t[e];
      }
    })), Fs.get(this);
  }
  get doctype() {
    const t = this[ie];
    if (t)
      return t;
    const { firstChild: e } = this;
    return e && e.nodeType === xe ? this[ie] = e : null;
  }
  set doctype(t) {
    if (/^([a-z:]+)(\s+system|\s+public(\s+"([^"]+)")?)?(\s+"([^"]+)")?/i.test(t)) {
      const { $1: e, $4: n, $6: i } = RegExp;
      this[ie] = new Zs(this, e, n, i), tn(this, this[ie], this[m]);
    }
  }
  get documentElement() {
    return this.firstElementChild;
  }
  get isConnected() {
    return !0;
  }
  /**
   * @protected
   */
  _getParent() {
    return this[_e];
  }
  createAttribute(t) {
    return new os(this, t);
  }
  createCDATASection(t) {
    return new Qi(this, t);
  }
  createComment(t) {
    return new Li(this, t);
  }
  createDocumentFragment() {
    return new Hi(this);
  }
  createDocumentType(t, e, n) {
    return new Zs(this, t, e, n);
  }
  createElement(t) {
    return new cs(this, t);
  }
  createRange() {
    const t = new or();
    return t.commonAncestorContainer = this, t;
  }
  createTextNode(t) {
    return new as(this, t);
  }
  createTreeWalker(t, e = -1) {
    return new Og(t, e);
  }
  createNodeIterator(t, e = -1) {
    return this.createTreeWalker(t, e);
  }
  createEvent(t) {
    const e = Au(t === "Event" ? new he("") : new Va(""));
    return e.initEvent = e.initCustomEvent = (n, i = !1, r = !1, o) => {
      e.bubbles = !!i, au(e, {
        type: { value: n },
        canBubble: { value: i },
        cancelable: { value: r },
        detail: { value: o }
      });
    }, e;
  }
  cloneNode(t = !1) {
    const {
      constructor: e,
      [Et]: n,
      [ie]: i
    } = this, r = new e();
    if (r[Et] = n, t) {
      const o = r[w], { childNodes: A } = this;
      for (let { length: c } = A, a = 0; a < c; a++)
        r.insertBefore(A[a].cloneNode(!0), o);
      i && (r[ie] = A[0]);
    }
    return r;
  }
  importNode(t) {
    const e = 1 < arguments.length && !!arguments[1], n = t.cloneNode(e), { [Et]: i } = this, { active: r } = i, o = (A) => {
      const { ownerDocument: c, nodeType: a } = A;
      A.ownerDocument = this, r && c !== this && a === x && i.upgrade(A);
    };
    if (o(n), e)
      switch (n.nodeType) {
        case x:
        case Ht: {
          let { [m]: A, [w]: c } = n;
          for (; A !== c; )
            A.nodeType === x && o(A), A = A[m];
          break;
        }
      }
    return n;
  }
  toString() {
    return this.childNodes.join("");
  }
  querySelector(t) {
    return Uo(super.querySelector, this, t);
  }
  querySelectorAll(t) {
    return Uo(super.querySelectorAll, this, t);
  }
  /* c8 ignore start */
  getElementsByTagNameNS(t, e) {
    return this.getElementsByTagName(e);
  }
  createAttributeNS(t, e) {
    return this.createAttribute(e);
  }
  createElementNS(t, e, n) {
    return t === Js ? new ts(this, e, null) : this.createElement(e, n);
  }
  /* c8 ignore stop */
};
ct(
  Xa.Document = function() {
    ft();
  },
  ge
).prototype = ge.prototype;
const Qg = (s, t, e, n) => {
  if (!t && Ps.has(e)) {
    const o = Ps.get(e);
    return new o(s, e);
  }
  const { [Et]: { active: i, registry: r } } = s;
  if (i) {
    const o = t ? n.is : e;
    if (r.has(o)) {
      const { Class: A } = r.get(o), c = new A(s, e);
      return ue.set(c, { connected: !1 }), c;
    }
  }
  return new C(s, e);
};
class Lg extends ge {
  constructor() {
    super("text/html");
  }
  get all() {
    const t = new kt();
    let { [m]: e, [w]: n } = this;
    for (; e !== n; )
      e.nodeType === x && t.push(e), e = e[m];
    return t;
  }
  /**
   * @type HTMLHeadElement
   */
  get head() {
    const { documentElement: t } = this;
    let { firstElementChild: e } = t;
    return (!e || e.tagName !== "HEAD") && (e = this.createElement("head"), t.prepend(e)), e;
  }
  /**
   * @type HTMLBodyElement
   */
  get body() {
    const { head: t } = this;
    let { nextElementSibling: e } = t;
    return (!e || e.tagName !== "BODY") && (e = this.createElement("body"), t.after(e)), e;
  }
  /**
   * @type HTMLTitleElement
   */
  get title() {
    const { head: t } = this;
    return t.getElementsByTagName("title").at(0)?.textContent || "";
  }
  set title(t) {
    const { head: e } = this;
    let n = e.getElementsByTagName("title").at(0);
    n ? n.textContent = t : e.insertBefore(
      this.createElement("title"),
      e.firstChild
    ).textContent = t;
  }
  createElement(t, e) {
    const n = !!(e && e.is), i = Qg(this, n, t, e);
    return n && i.setAttribute("is", e.is), i;
  }
}
class Gg extends ge {
  constructor() {
    super("image/svg+xml");
  }
  toString() {
    return this[Ne].docType + super.toString();
  }
}
class Kg extends ge {
  constructor() {
    super("text/xml");
  }
  toString() {
    return this[Ne].docType + super.toString();
  }
}
class Ar {
  /** @typedef {{ "text/html": HTMLDocument, "image/svg+xml": SVGDocument, "text/xml": XMLDocument }} MimeToDoc */
  /**
   * @template {keyof MimeToDoc} MIME
   * @param {string} markupLanguage
   * @param {MIME} mimeType
   * @returns {MimeToDoc[MIME]}
   */
  parseFromString(t, e, n = null) {
    let i = !1, r;
    return e === "text/html" ? (i = !0, r = new Lg()) : e === "image/svg+xml" ? r = new Gg() : r = new Kg(), r[hi] = Ar, n && (r[Os] = n), i && t === "..." && (t = "<!doctype html><html><head></head><body></body></html>"), t ? mA(r, i, t) : r;
  }
}
const ja = (s, t = null) => new Ar().parseFromString(
  s,
  "text/html",
  t
).defaultView;
function Hg() {
  ft();
}
ct(Hg, ge).prototype = ge.prototype;
function qa(s, t, e = "") {
  const n = /* @__PURE__ */ new WeakMap(), i = {
    // Intercept property reads.
    // This creates nested proxies lazily.
    get(r, o) {
      const A = Reflect.get(r, o);
      if (A === null || typeof A != "object") return A;
      const c = n.get(A);
      if (c) return c;
      const a = e ? `${e}.${o}` : o, u = qa(A, t, a);
      return n.set(A, u), u;
    },
    // Intercept property writes.
    set(r, o, A) {
      const c = Reflect.get(r, o);
      if (c !== A) {
        Reflect.set(r, o, A);
        const a = e ? `${e}.${o}` : o;
        t(a, c, A);
      }
      return !0;
    }
  };
  return new Proxy(s, i);
}
function za(s) {
  const t = {};
  for (const [e, n] of Object.entries(s)) {
    const i = typeof n == "object" && n !== null;
    t[e] = i ? za(n) : n;
  }
  return t;
}
const Hs = typeof window < "u" && typeof window.document < "u";
let _o = class extends Error {
};
var ae, zs, vt, ss, ns, Zt, $s, $a;
const Te = class Te {
  constructor(t, e, n) {
    Pt(this, $s);
    Pt(this, zs, /* @__PURE__ */ Symbol("objectId"));
    // This cannot be replaced by a WeakMap<ChangeListener, Set<string>>
    // because there is no way to iterate over the keys of a WeakMap.
    Pt(this, vt, []);
    Pt(this, ss);
    Pt(this, ns);
    Pt(this, Zt);
    if (!t) throw new _o("name cannot be empty");
    if (z(Te, ae).has(t))
      throw new _o(`WrecState with name "${t}" already exists`);
    if (Ee(this, ss, t), Ee(this, ns, e), Ee(this, Zt, qa({}, Mr(this, $s, $a).bind(this))), e && Hs) {
      const i = sessionStorage.getItem("wrec-state-" + t), r = i ? JSON.parse(i) : void 0;
      r && (n = r);
    }
    if (n)
      for (const [i, r] of Object.entries(n))
        this.addProperty(i, r);
    z(Te, ae).set(t, this);
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
    return z(this, ae).get(t);
  }
  /**
   * @param listener - object that has a "changed" method
   * @param map - map from state property paths to component properties
   */
  addListener(t, e = {}) {
    const n = z(this, vt).find(
      (i) => i.listenerRef.deref() === t
    );
    if (n) {
      const { propertyMap: i } = n;
      for (const [r, o] of Object.entries(e))
        i[r] = o;
    } else
      z(this, vt).push({
        listenerRef: new WeakRef(t),
        propertyMap: e
      });
  }
  addProperty(t, e) {
    Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return z(this, Zt)[t];
      },
      set(n) {
        z(this, Zt)[t] = n;
      }
    }), z(this, Zt)[t] = e;
  }
  get id() {
    return z(this, zs);
  }
  // This is useful for debugging from the DevTools console.
  // For example: state.log()
  log() {
    console.log("WrecState:", z(this, ss));
    for (const [t, e] of Object.entries(z(this, Zt)))
      console.log(`  ${t} = ${JSON.stringify(e)}`);
  }
  removeListener(t) {
    Ee(this, vt, z(this, vt).filter((e) => e.listenerRef.deref() !== t));
  }
};
ae = new WeakMap(), zs = new WeakMap(), vt = new WeakMap(), ss = new WeakMap(), ns = new WeakMap(), Zt = new WeakMap(), $s = new WeakSet(), $a = function(t, e, n) {
  const i = /* @__PURE__ */ new Set();
  for (const r of z(this, vt)) {
    const o = r.listenerRef.deref();
    if (!o)
      i.add(r);
    else if (Hs && o instanceof HTMLElement && !o.isConnected)
      i.add(r);
    else {
      const { propertyMap: A } = r, c = Object.keys(A);
      (c.length === 0 || c.includes(t)) && o.changed(
        t,
        A[t],
        n,
        e,
        this
      );
    }
  }
  Ee(this, vt, z(this, vt).filter(
    (r) => !i.has(r)
  ));
}, Pt(Te, ae, /* @__PURE__ */ new Map()), Hs && window.addEventListener("beforeunload", () => {
  for (const [t, e] of z(Te, ae).entries())
    if (z(e, ns)) {
      const n = za(e);
      sessionStorage.setItem("wrec-state-" + t, JSON.stringify(n));
    }
});
let Ii = Te;
Hs && process.env.NODE_ENV === "development" && (window.WrecState = Ii);
function Jo(s, t) {
  let e = s;
  for (const n of t.split("."))
    e = e[n];
  return e;
}
function Wg(s, t, e) {
  const n = t.split("."), i = n.length - 1;
  let r = s;
  n.forEach((o, A) => {
    A === i ? r[o] = e : r = r[o];
  });
}
const Yg = /* @__PURE__ */ new Set([
  "class",
  "disabled",
  "hidden",
  "id",
  "tabindex",
  "title"
]);
if (typeof window > "u") {
  const { HTMLElement: s } = ja("<!DOCTYPE html>");
  global.HTMLElement = s, global.customElements = {
    get: (t) => {
    },
    getName: () => "",
    define: () => {
    },
    upgrade: () => {
    },
    whenDefined: () => Promise.reject()
  };
} else {
  const s = /* @__PURE__ */ new Set([
    "onblur",
    "onchange",
    "onclick",
    "onfocus",
    "oninput",
    "onkeydown",
    "onreset",
    "onsubmit"
  ]);
  jo.addHook(
    "uponSanitizeAttribute",
    (t, e) => {
      const { attrName: n } = e, i = n.toLowerCase();
      s.has(i) && (e.forceKeepAttr = !0);
    }
  );
}
class je extends Error {
}
const Ug = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, tc = "a-zA-Z_$", _g = tc + "0-9", es = `[${tc}][${_g}]*`, Jg = /<!--\s*(.*?)\s*-->/, Pg = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, oi = new RegExp(`^this\\.${es}$`), Ai = new RegExp(`this\\.${es}(\\.${es})*`, "g"), js = new RegExp(`this\\.${es}(\\.${es})*`), Zg = 5;
function Vg(s) {
  return s instanceof HTMLButtonElement || s instanceof HTMLFieldSetElement || s instanceof HTMLInputElement || s instanceof HTMLSelectElement || s instanceof HTMLTextAreaElement || s instanceof Ft;
}
function Cd(s, t, e) {
  const n = document.createElement(s);
  if (t)
    for (const [i, r] of Object.entries(t))
      n.setAttribute(i, r);
  return e && (n.innerHTML = e), n;
}
const Xg = (s) => s === String ? "" : s === Number ? 0 : s === Boolean ? !1 : s === Array ? [] : s === Object ? {} : void 0;
function qs(s) {
  const t = [];
  let e = s.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...qs(e.shadowRoot)), e.firstElementChild && t.push(...qs(e)), e = e.nextElementSibling;
  return t;
}
const Ve = (s) => s.substring(Zg).split(".")[0];
function ec(s, t) {
  let e = s[0];
  return t.forEach((n, i) => {
    e += n + s[i + 1];
  }), e;
}
function wi(s) {
  const t = typeof s;
  return t === "string" || t === "number" || t === "boolean";
}
function Xe(s) {
  return s.localName === "textarea";
}
function ar(s) {
  const { localName: t } = s;
  return t === "input" || t === "select";
}
const jg = (s) => s.replace(/<!--[\s\S]*?-->/g, "");
function sc(s, t, e, n) {
  return s.slice(0, t) + n + s.slice(t + e);
}
function qg(s) {
  let t = s.trim(), e = null;
  /^\s*<tr[\s>]/i.test(t) ? (t = `<table><tbody>${t}</tbody></table>`, e = "tbody") : /^\s*<(td|th)[\s>]/i.test(t) ? (t = `<table><tbody><tr>${t}</tr></tbody></table>`, e = "tr") : /^\s*<option[\s>]/i.test(t) ? (t = `<select>${t}</select>`, e = "select") : /^\s*<col[\s>]/i.test(t) && (t = `<table><colgroup>${t}</colgroup></table>`, e = "colgroup");
  const n = jo.sanitize(t, {
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
function ai(s) {
  const t = Number(s);
  if (isNaN(t)) throw new je(`can't convert "${s}" to a number`);
  return t;
}
function nc(s, t, e) {
  const [n, i] = t.split(":");
  if (wi(e))
    if (typeof e == "boolean") {
      e ? s.setAttribute(n, n) : s.removeAttribute(n);
      const r = Ft.getPropName(n);
      s[r] = e;
    } else {
      const r = s.getAttribute(t), o = String(e);
      r !== o && (s.setAttribute(n, o), n === "value" && ar(s) && (s.value = o));
    }
  else {
    const r = Ft.getPropName(t);
    s[r] = e;
  }
}
function ci(s, t, e) {
  const [n, i] = t.split(":");
  s instanceof CSSStyleRule ? s.style.setProperty(n, e) : (nc(s, n, e), n === "value" && ar(s) && (s.value = e));
}
async function zg(s) {
  const t = /* @__PURE__ */ new Set();
  for (const n of qs(s.content)) {
    const { localName: i } = n;
    i.includes("-") && t.add(i);
  }
  function e(n) {
    return new Promise((i, r) => {
      setTimeout(() => {
        const o = `custom element <${n}> not defined`;
        r(new Error(o));
      }, 1e3);
    });
  }
  return Promise.all(
    [...t].map(
      async (n) => Promise.race([customElements.whenDefined(n), e(n)])
    )
  );
}
class Ft extends HTMLElement {
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
  #a = !1;
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
  #u = null;
  // This is a map from properties in this web component
  // to corresponding properties in a parent web component.
  // This must be an instance property because
  // each component instance can have its properties mapped
  // to the properties of different parent components.
  // This is used to update a parent property
  // when the corresponding child property value changes.
  #h = /* @__PURE__ */ new Map();
  static define(t) {
    if (this.elementName = t, customElements.get(t))
      throw new je(`custom element ${t} is already defined`);
    customElements.define(t, this);
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.attrToPropMap || (t.attrToPropMap = /* @__PURE__ */ new Map()), t.properties || (t.properties = {}), t.propToAttrMap || (t.propToExprsMap = /* @__PURE__ */ new Map()), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, n) {
    t === "disabled" && this.#f();
    const i = Ft.getPropName(t);
    if (this.#r(i)) {
      const r = this.#E(i, String(n));
      this[i] = r;
      const o = this.#c[i];
      o && this.setFormValue(o, String(r)), this.propertyChangedCallback(i, e, n);
    }
  }
  // This applies multiple property changes and only updates
  // the affected parts of the DOM after all of them are made.
  batchSet(t) {
    this.#a = !0;
    const e = this.#t.propToExprsMap, n = /* @__PURE__ */ new Set();
    for (const [A, c] of Object.entries(t)) {
      this[A] = c;
      const a = e.get(A) ?? [];
      for (const u of a)
        n.add(u);
    }
    const i = this.#t.propToComputedMap, r = /* @__PURE__ */ new Set(), o = {};
    for (const A of Object.keys(t)) {
      const c = i.get(A) || [];
      for (const [a, u] of c)
        r.add(a), o[a] = u;
    }
    for (const A of r) {
      const c = o[A];
      this[A] = this.#s(c);
      const a = e.get(A) ?? [];
      for (const u of a)
        n.add(u);
    }
    for (; ; ) {
      let A = !1;
      for (const c of r) {
        const a = o[c], u = this.#s(a), g = this[c];
        JSON.stringify(u) !== JSON.stringify(g) && (this[c] = u, A = !0);
      }
      if (!A) break;
    }
    this.#p([...n]), this.#a = !1;
  }
  async #R() {
    const t = this.#t;
    let { template: e } = t;
    e || (e = t.template = document.createElement("template"), e.innerHTML = t.buildHTML()), await zg(e), this.shadowRoot.replaceChildren(e.content.cloneNode(!0));
  }
  static buildHTML() {
    let t = `<style>
    :host([hidden]) { display: none; }`;
    this.css && (t += this.css), t += `</style>
`;
    let e = this.html.trim();
    if (!e) throw new je("static property html must be set");
    return e.startsWith("<") || (e = `<span><!--${e}--></span>`), t + e;
  }
  changed(t, e, n) {
    this[e] = n;
  }
  connectedCallback() {
    this.#O(), this.#T(), this.#R().then(() => {
      this.hasAttribute("disabled") && this.#f(), this.#w(this.shadowRoot), this.#m(this.shadowRoot), this.#B();
    });
  }
  #B() {
    const t = this.#t, { properties: e } = t;
    for (const [n, { computed: i }] of Object.entries(e))
      i && (this[n] = this.#s(i));
  }
  #T() {
    const t = this.#t, { observedAttributes: e, properties: n } = t;
    for (const [i, r] of Object.entries(n))
      r.computed || this.#d(i, r, e);
    for (const [i, r] of Object.entries(n))
      r.computed && this.#d(i, r, e);
  }
  #d(t, e, n) {
    if (t === "class" || t === "style")
      throw new je(`"${t}" is a reserved property`);
    const i = Ft.getAttrName(t), r = this.hasAttribute(i);
    e.required && !r && this.#e(this, i, "is a required attribute");
    let o = e.value;
    this.hasOwnProperty(t) && (o = this[t], delete this[t]);
    const { type: A } = e, c = A === Boolean ? o || r : n.includes(i) && r ? this.#y(t, i) : o || Xg(A), a = "#" + t;
    this[a] = c, e.computed && this.#v(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[a];
      },
      set(u) {
        A === Number && typeof u == "string" && (u = ai(u));
        const g = this[a];
        if (u === g) return;
        this.#L(t, A, u), this[a] = u;
        const { state: S, stateProp: b } = this.#t.properties[t];
        b && Wg(S, b, u), this.#F(t, A, u, i), this.#a || (this.#M(t), this.#b(t)), this.#k(t, u);
        const B = this.#c[t];
        B && this.setFormValue(B, String(u)), this.propertyChangedCallback(t, g, u), e.dispatch && this.dispatch("change", {
          tagName: this.localName,
          property: t,
          oldValue: g,
          value: u
        });
      }
    });
  }
  #f() {
    const t = this.hasAttribute("disabled"), e = qs(this.shadowRoot);
    for (const n of e)
      Vg(n) && (n.disabled = t);
  }
  disconnectedCallback() {
    this.#n.clear(), this.#l.clear(), this.#h.clear();
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
  #D(t) {
    const e = t instanceof Ft;
    for (const n of t.getAttributeNames()) {
      const i = t.getAttribute(n), r = this.#C(t, i);
      if (r) {
        const o = this[r];
        o === void 0 && this.#A(t, n, r), t[r] = o;
        let [A, c] = n.split(":");
        A === "value" && (c ? (t["on" + c] === void 0 && this.#e(t, n, "refers to an unsupported event name"), t.setAttribute(A, this[r])) : c = "change"), e && t.#h.set(
          Ft.getPropName(A),
          r
        );
      }
      this.#o(i, t, n);
    }
  }
  #p(t) {
    for (const e of t) {
      const n = this.#s(e), i = this.#n.get(e) ?? [];
      for (const r of i)
        if (r instanceof HTMLElement)
          this.#I(r, n);
        else if (!(r instanceof CSSStyleRule)) {
          const { element: o, attrName: A } = r;
          o instanceof CSSStyleRule ? o.style.setProperty(A, n) : ci(o, A, n);
        }
    }
  }
  #s(t) {
    const { context: e } = this.#t;
    return new Function(
      "context",
      `const {${Object.keys(e).join(",")}} = context; return ${t};`
    ).call(this, e);
  }
  #x(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: n } = t, i = n?.cssRules ?? [], r = Array.from(i);
      for (const o of r)
        if (o.constructor === CSSStyleRule) {
          const A = Array.from(o.style);
          for (const c of A)
            if (c.startsWith("--")) {
              const a = o.style.getPropertyValue(c);
              this.#o(a, o, c);
            }
        }
    } else {
      let n = "";
      if (Xe(t)) {
        this.#o(t.textContent, t);
        const i = t.textContent?.match(Jg);
        i && (n = i[1]);
      } else {
        const i = Array.from(t.childNodes).find(
          (r) => r.nodeType === Node.COMMENT_NODE
        );
        i && (n = i.textContent?.trim() ?? "");
      }
      if (n) {
        const i = this.#C(t, n);
        i && Xe(t) ? t.textContent = this[i] : this.#o(n, t);
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
      const o = this.getAttribute("name");
      if (o)
        if (this.#r("value"))
          t = `value:${o}`;
        else
          return;
      else
        return;
    }
    const e = {}, n = t.split(",");
    for (const o of n) {
      const [A, c] = o.split(":");
      e[A.trim()] = c.trim();
    }
    this.#c = e, this.#i = new FormData(), this.#u = this.attachInternals(), this.#u.setFormValue(this.#i);
    const i = Object.keys(this.#t.properties), r = this.#l;
    for (const o of i)
      r[o] = this[o];
  }
  formResetCallback() {
    const t = this.#l;
    for (const e of Object.keys(t)) {
      let n = t[e];
      oi.test(n) && (n = this.#s(n)), this[e] = n;
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
    if (!oi.test(i)) return;
    const r = ar(t) || Xe(t);
    let [o, A] = (e ?? "").split(":");
    if (!(r && o === "value" || Xe(t))) return;
    A ? t["on" + A] === void 0 && this.#e(t, e, "refers to an unsupported event name") : A = "change";
    const a = Ve(i);
    t.addEventListener(A, (u) => {
      const { target: g } = u;
      if (!g) return;
      const S = g.value, { type: b } = this.#t.properties[a];
      this[a] = b === Number ? ai(S) : S, this.#b(a);
    });
  }
  #r(t) {
    return !!this.#t.properties[t];
  }
  #m(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e)
      this.#D(n), n.firstElementChild || this.#x(n);
  }
  // formAssociated is only needed when the component is inside a form.
  #S() {
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
      (e) => Ft.getAttrName(e)
    );
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, n) {
  }
  #C(t, e) {
    if (!e || !oi.test(e)) return;
    const n = Ve(e);
    return this[n] === void 0 && this.#A(t, "", n), n;
  }
  #b(t) {
    const e = this.#t.propToExprsMap.get(t) || [];
    this.#p(e);
  }
  #v(t, e) {
    const { computed: n, uses: i } = e, r = this.#t.propToComputedMap;
    function o(c, a) {
      let u = r.get(c);
      u || (u = [], r.set(c, u)), u.push([t, a]);
    }
    const A = n.match(Ai) || [];
    for (const c of A) {
      const a = Ve(c);
      this[a] === void 0 && this.#A(null, t, a), typeof this[a] != "function" && o(a, n);
    }
    if (i)
      for (const c of i.split(","))
        o(c.trim(), n);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #o(t, e, n = void 0) {
    if (!t) return;
    const i = this.#g(e, n, t);
    if (!i) {
      const c = t.replaceAll("this..", "this.");
      n ? ci(e, n, c) : "textContent" in e && (e.textContent = c);
      return;
    }
    const r = this.#t;
    i.forEach((c) => {
      const a = Ve(c);
      if (typeof this[a] == "function") return;
      const u = r.propToExprsMap;
      let g = u.get(a);
      g || (g = [], u.set(a, g)), g.includes(t) || g.push(t);
    });
    for (const [c, a] of this.#n.entries())
      for (const u of a) {
        const g = u instanceof HTMLElement || u instanceof CSSStyleRule ? u : u.element;
        g instanceof CSSStyleRule || g.isConnected || this.#n.set(
          c,
          a.filter((S) => S !== u)
        );
      }
    let o = this.#n.get(t);
    o || (o = [], this.#n.set(t, o)), o.push(n ? { element: e, attrName: n } : e), e instanceof HTMLElement && this.#N(e, n, i);
    const A = this.#s(t);
    n ? ci(e, n, A) : this.#I(e, A);
  }
  // This follows the best practice
  // "Do not override author-set, global attributes."
  setAttributeSafe(t, e) {
    this.hasAttribute(t) || this.setAttribute(t, e);
  }
  setFormValue(t, e) {
    !this.#i || !wi(e) || (this.#i.set(t, e), this.#u?.setFormValue(this.#i));
  }
  static ssr(t = {}) {
    for (const [a, u] of Object.entries(this.properties))
      if (t[a] === void 0) {
        const { value: g } = u;
        g !== void 0 && (t[a] = g);
      }
    function e(a) {
      return new Function("return " + a).call(t);
    }
    let n = "";
    for (const [a, u] of Object.entries(t)) {
      const g = this.getAttrName(a);
      n += ` ${g}="${u}"`;
    }
    const i = this.buildHTML(), { document: r } = ja(i), o = r.querySelectorAll("*");
    for (const a of o) {
      for (const u of a.attributes) {
        const { value: g } = u;
        js.test(g) && (u.value = e(g));
      }
      for (const u of a.childNodes)
        if (u.nodeType === 8) {
          const g = u.textContent ?? "";
          if (js.test(g)) {
            const S = r.createTextNode(e(g));
            a.replaceChild(S, u);
          }
        }
    }
    const A = [...r.children].map((a) => a.outerHTML).join(`
`), { elementName: c } = this;
    return `
      <${c}${n}>
        <template shadowrootmode="open">
          ${A}
        </template>
      </${c}>
    `;
  }
  #e(t, e, n) {
    const i = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new je(
      `component ${this.#t.elementName}` + (t ? `, element "${i}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${n}`
    );
  }
  #A(t, e, n) {
    this.#e(t, e, `refers to missing property "${n}"`);
  }
  #y(t, e) {
    return this.#E(t, this.getAttribute(e));
  }
  #E(t, e) {
    if (e?.match(Ai)) return e;
    const n = this.#t, { type: i } = n.properties[t];
    if (i || this.#e(null, t, "does not specify its type"), i === String) return e;
    if (i === Number) return ai(e);
    if (i === Boolean)
      return e === "true" ? !0 : e === "false" || e === "null" ? !1 : (e && e !== t && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === t);
  }
  // Updates the matching attribute for a property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #F(t, e, n, i) {
    if (wi(n)) {
      const r = e === Boolean ? this.hasAttribute(i) : this.#y(t, i);
      n !== r && nc(this, i || t, n);
    }
  }
  // Updates all computed properties that reference this property.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #M(t) {
    const n = this.#t.propToComputedMap.get(t) || [];
    for (const [i, r] of n)
      this[i] = this.#s(r);
  }
  #I(t, e) {
    if (e === void 0) return;
    const n = t instanceof HTMLElement;
    Array.isArray(e) && (e = e.join(""));
    const i = typeof e;
    i !== "string" && i !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    );
    const r = String(e);
    if (t instanceof HTMLElement && Xe(t))
      t.value = r;
    else if (n && i === "string" && r.trim().startsWith("<")) {
      const o = qg(r);
      t.replaceChildren(...o), this.#w(t), this.#m(t);
    } else n && (t.textContent = r);
  }
  // Update corresponding parent web component property if bound to one.
  // VS Code thinks this is never called, but it is called by #defineProp.
  #k(t, e) {
    const n = this.#h.get(t);
    if (!n) return;
    const i = this.getRootNode();
    if (!(i instanceof ShadowRoot)) return;
    const { host: r } = i;
    if (!r) return;
    const o = r;
    o[n] = e;
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
    this.#Q(t, e);
    for (const [n, i] of Object.entries(e))
      if (this.#r(i)) {
        const r = Jo(t, n);
        r !== void 0 && (this[i] = r);
        const o = this.#t.properties[i];
        o.state = t, o.stateProp = n;
      }
    t.addListener(this, e);
  }
  #O() {
    const t = new Set(Object.keys(this.#t.properties));
    for (const e of this.getAttributeNames())
      if (!Yg.has(e) && !e.startsWith("on")) {
        if (e === "form-assoc") {
          this.#S();
          continue;
        }
        if (!t.has(Ft.getPropName(e))) {
          if (e === "name") {
            this.#S();
            continue;
          }
          this.#e(null, e, "is not a supported attribute");
        }
      }
  }
  #g(t, e, n) {
    const i = n.match(Ai);
    if (i)
      return i.forEach((r) => {
        const o = Ve(r);
        this[o] === void 0 && this.#A(t, e, o);
      }), i;
  }
  #Q(t, e) {
    for (const [n, i] of Object.entries(e)) {
      let r = Jo(t, n);
      r === void 0 && this.#e(this, void 0, `invalid state path "${n}"`), r = this[i], this.#r(i) || this.#e(
        null,
        i,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  // This is called by #defineProp.
  #L(t, e, n) {
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
  #w(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const n of e) {
      const i = [];
      for (const r of Array.from(n.attributes)) {
        const o = r.name;
        if (o.startsWith("on")) {
          let A = o.slice(2);
          A = A[0].toLowerCase() + A.slice(1).toLowerCase();
          const c = r.value;
          this.#g(n, o, c);
          let a;
          typeof this[c] == "function" ? a = (u) => this[c](u) : (this.#g(n, o, c), a = () => this.#s(c)), n.addEventListener(A, a), i.push(o);
        }
      }
      for (const r of i)
        n.removeAttribute(r);
    }
  }
}
function bd(s, ...t) {
  let e = ec(s, t);
  for (; ; ) {
    const n = Ug.exec(e);
    if (!n) break;
    const i = n[2];
    if (js.test(i)) {
      const r = n[1];
      if (!r.startsWith("--")) {
        const o = `--${r}: ${i};
      ${r}: var(--${r})`;
        e = sc(e, n.index, n[0].length, o);
      }
    }
  }
  return e;
}
function yd(s, ...t) {
  let e = ec(s, t);
  for (; ; ) {
    const n = Pg.exec(e);
    if (!n || n[1] === "style") break;
    const i = jg(n[2]);
    if (js.test(i)) {
      const r = `<!-- ${i.trim()} -->`, o = n.index + n[0].indexOf(">") + 1;
      e = sc(e, o, i.length, r);
    }
  }
  return e;
}
export {
  Ft as Wrec,
  Ii as WrecState,
  Cd as createElement,
  bd as css,
  yd as html
};

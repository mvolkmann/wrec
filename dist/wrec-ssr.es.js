import { Wrec as Vr } from "./wrec.es.js";
import { WrecState as kt, createElement as Rt, css as Pt, html as Mt } from "./wrec.es.js";
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ir(u) {
  if (Object.prototype.hasOwnProperty.call(u, "__esModule")) return u;
  var o = u.default;
  if (typeof o == "function") {
    var c = function s() {
      var g = !1;
      try {
        g = this instanceof s;
      } catch {
      }
      return g ? Reflect.construct(o, arguments, this.constructor) : o.apply(this, arguments);
    };
    c.prototype = o.prototype;
  } else c = {};
  return Object.defineProperty(c, "__esModule", { value: !0 }), Object.keys(u).forEach(function(s) {
    var g = Object.getOwnPropertyDescriptor(u, s);
    Object.defineProperty(c, s, g.get ? g : {
      enumerable: !0,
      get: function() {
        return u[s];
      }
    });
  }), c;
}
var G = {}, Fu = {}, Xu = {}, Gu = { exports: {} };
var Gr = Gu.exports, we;
function Ae() {
  return we || (we = 1, (function(u, o) {
    (function(c) {
      var s = o, g = u && u.exports == s && u, i = typeof Ce == "object" && Ce;
      (i.global === i || i.window === i) && (c = i);
      var r = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, t = /[\x01-\x7F]/g, a = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g, e = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g, d = { "­": "shy", "‌": "zwnj", "‍": "zwj", "‎": "lrm", "⁣": "ic", "⁢": "it", "⁡": "af", "‏": "rlm", "​": "ZeroWidthSpace", "⁠": "NoBreak", "̑": "DownBreve", "⃛": "tdot", "⃜": "DotDot", "	": "Tab", "\n": "NewLine", " ": "puncsp", " ": "MediumSpace", " ": "thinsp", " ": "hairsp", " ": "emsp13", " ": "ensp", " ": "emsp14", " ": "emsp", " ": "numsp", " ": "nbsp", "  ": "ThickSpace", "‾": "oline", _: "lowbar", "‐": "dash", "–": "ndash", "—": "mdash", "―": "horbar", ",": "comma", ";": "semi", "⁏": "bsemi", ":": "colon", "⩴": "Colone", "!": "excl", "¡": "iexcl", "?": "quest", "¿": "iquest", ".": "period", "‥": "nldr", "…": "mldr", "·": "middot", "'": "apos", "‘": "lsquo", "’": "rsquo", "‚": "sbquo", "‹": "lsaquo", "›": "rsaquo", '"': "quot", "“": "ldquo", "”": "rdquo", "„": "bdquo", "«": "laquo", "»": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "⌈": "lceil", "⌉": "rceil", "⌊": "lfloor", "⌋": "rfloor", "⦅": "lopar", "⦆": "ropar", "⦋": "lbrke", "⦌": "rbrke", "⦍": "lbrkslu", "⦎": "rbrksld", "⦏": "lbrksld", "⦐": "rbrkslu", "⦑": "langd", "⦒": "rangd", "⦓": "lparlt", "⦔": "rpargt", "⦕": "gtlPar", "⦖": "ltrPar", "⟦": "lobrk", "⟧": "robrk", "⟨": "lang", "⟩": "rang", "⟪": "Lang", "⟫": "Rang", "⟬": "loang", "⟭": "roang", "❲": "lbbrk", "❳": "rbbrk", "‖": "Vert", "§": "sect", "¶": "para", "@": "commat", "*": "ast", "/": "sol", undefined: null, "&": "amp", "#": "num", "%": "percnt", "‰": "permil", "‱": "pertenk", "†": "dagger", "‡": "Dagger", "•": "bull", "⁃": "hybull", "′": "prime", "″": "Prime", "‴": "tprime", "⁗": "qprime", "‵": "bprime", "⁁": "caret", "`": "grave", "´": "acute", "˜": "tilde", "^": "Hat", "¯": "macr", "˘": "breve", "˙": "dot", "¨": "die", "˚": "ring", "˝": "dblac", "¸": "cedil", "˛": "ogon", "ˆ": "circ", "ˇ": "caron", "°": "deg", "©": "copy", "®": "reg", "℗": "copysr", "℘": "wp", "℞": "rx", "℧": "mho", "℩": "iiota", "←": "larr", "↚": "nlarr", "→": "rarr", "↛": "nrarr", "↑": "uarr", "↓": "darr", "↔": "harr", "↮": "nharr", "↕": "varr", "↖": "nwarr", "↗": "nearr", "↘": "searr", "↙": "swarr", "↝": "rarrw", "↝̸": "nrarrw", "↞": "Larr", "↟": "Uarr", "↠": "Rarr", "↡": "Darr", "↢": "larrtl", "↣": "rarrtl", "↤": "mapstoleft", "↥": "mapstoup", "↦": "map", "↧": "mapstodown", "↩": "larrhk", "↪": "rarrhk", "↫": "larrlp", "↬": "rarrlp", "↭": "harrw", "↰": "lsh", "↱": "rsh", "↲": "ldsh", "↳": "rdsh", "↵": "crarr", "↶": "cularr", "↷": "curarr", "↺": "olarr", "↻": "orarr", "↼": "lharu", "↽": "lhard", "↾": "uharr", "↿": "uharl", "⇀": "rharu", "⇁": "rhard", "⇂": "dharr", "⇃": "dharl", "⇄": "rlarr", "⇅": "udarr", "⇆": "lrarr", "⇇": "llarr", "⇈": "uuarr", "⇉": "rrarr", "⇊": "ddarr", "⇋": "lrhar", "⇌": "rlhar", "⇐": "lArr", "⇍": "nlArr", "⇑": "uArr", "⇒": "rArr", "⇏": "nrArr", "⇓": "dArr", "⇔": "iff", "⇎": "nhArr", "⇕": "vArr", "⇖": "nwArr", "⇗": "neArr", "⇘": "seArr", "⇙": "swArr", "⇚": "lAarr", "⇛": "rAarr", "⇝": "zigrarr", "⇤": "larrb", "⇥": "rarrb", "⇵": "duarr", "⇽": "loarr", "⇾": "roarr", "⇿": "hoarr", "∀": "forall", "∁": "comp", "∂": "part", "∂̸": "npart", "∃": "exist", "∄": "nexist", "∅": "empty", "∇": "Del", "∈": "in", "∉": "notin", "∋": "ni", "∌": "notni", "϶": "bepsi", "∏": "prod", "∐": "coprod", "∑": "sum", "+": "plus", "±": "pm", "÷": "div", "×": "times", "<": "lt", "≮": "nlt", "<⃒": "nvlt", "=": "equals", "≠": "ne", "=⃥": "bne", "⩵": "Equal", ">": "gt", "≯": "ngt", ">⃒": "nvgt", "¬": "not", "|": "vert", "¦": "brvbar", "−": "minus", "∓": "mp", "∔": "plusdo", "⁄": "frasl", "∖": "setmn", "∗": "lowast", "∘": "compfn", "√": "Sqrt", "∝": "prop", "∞": "infin", "∟": "angrt", "∠": "ang", "∠⃒": "nang", "∡": "angmsd", "∢": "angsph", "∣": "mid", "∤": "nmid", "∥": "par", "∦": "npar", "∧": "and", "∨": "or", "∩": "cap", "∩︀": "caps", "∪": "cup", "∪︀": "cups", "∫": "int", "∬": "Int", "∭": "tint", "⨌": "qint", "∮": "oint", "∯": "Conint", "∰": "Cconint", "∱": "cwint", "∲": "cwconint", "∳": "awconint", "∴": "there4", "∵": "becaus", "∶": "ratio", "∷": "Colon", "∸": "minusd", "∺": "mDDot", "∻": "homtht", "∼": "sim", "≁": "nsim", "∼⃒": "nvsim", "∽": "bsim", "∽̱": "race", "∾": "ac", "∾̳": "acE", "∿": "acd", "≀": "wr", "≂": "esim", "≂̸": "nesim", "≃": "sime", "≄": "nsime", "≅": "cong", "≇": "ncong", "≆": "simne", "≈": "ap", "≉": "nap", "≊": "ape", "≋": "apid", "≋̸": "napid", "≌": "bcong", "≍": "CupCap", "≭": "NotCupCap", "≍⃒": "nvap", "≎": "bump", "≎̸": "nbump", "≏": "bumpe", "≏̸": "nbumpe", "≐": "doteq", "≐̸": "nedot", "≑": "eDot", "≒": "efDot", "≓": "erDot", "≔": "colone", "≕": "ecolon", "≖": "ecir", "≗": "cire", "≙": "wedgeq", "≚": "veeeq", "≜": "trie", "≟": "equest", "≡": "equiv", "≢": "nequiv", "≡⃥": "bnequiv", "≤": "le", "≰": "nle", "≤⃒": "nvle", "≥": "ge", "≱": "nge", "≥⃒": "nvge", "≦": "lE", "≦̸": "nlE", "≧": "gE", "≧̸": "ngE", "≨︀": "lvnE", "≨": "lnE", "≩": "gnE", "≩︀": "gvnE", "≪": "ll", "≪̸": "nLtv", "≪⃒": "nLt", "≫": "gg", "≫̸": "nGtv", "≫⃒": "nGt", "≬": "twixt", "≲": "lsim", "≴": "nlsim", "≳": "gsim", "≵": "ngsim", "≶": "lg", "≸": "ntlg", "≷": "gl", "≹": "ntgl", "≺": "pr", "⊀": "npr", "≻": "sc", "⊁": "nsc", "≼": "prcue", "⋠": "nprcue", "≽": "sccue", "⋡": "nsccue", "≾": "prsim", "≿": "scsim", "≿̸": "NotSucceedsTilde", "⊂": "sub", "⊄": "nsub", "⊂⃒": "vnsub", "⊃": "sup", "⊅": "nsup", "⊃⃒": "vnsup", "⊆": "sube", "⊈": "nsube", "⊇": "supe", "⊉": "nsupe", "⊊︀": "vsubne", "⊊": "subne", "⊋︀": "vsupne", "⊋": "supne", "⊍": "cupdot", "⊎": "uplus", "⊏": "sqsub", "⊏̸": "NotSquareSubset", "⊐": "sqsup", "⊐̸": "NotSquareSuperset", "⊑": "sqsube", "⋢": "nsqsube", "⊒": "sqsupe", "⋣": "nsqsupe", "⊓": "sqcap", "⊓︀": "sqcaps", "⊔": "sqcup", "⊔︀": "sqcups", "⊕": "oplus", "⊖": "ominus", "⊗": "otimes", "⊘": "osol", "⊙": "odot", "⊚": "ocir", "⊛": "oast", "⊝": "odash", "⊞": "plusb", "⊟": "minusb", "⊠": "timesb", "⊡": "sdotb", "⊢": "vdash", "⊬": "nvdash", "⊣": "dashv", "⊤": "top", "⊥": "bot", "⊧": "models", "⊨": "vDash", "⊭": "nvDash", "⊩": "Vdash", "⊮": "nVdash", "⊪": "Vvdash", "⊫": "VDash", "⊯": "nVDash", "⊰": "prurel", "⊲": "vltri", "⋪": "nltri", "⊳": "vrtri", "⋫": "nrtri", "⊴": "ltrie", "⋬": "nltrie", "⊴⃒": "nvltrie", "⊵": "rtrie", "⋭": "nrtrie", "⊵⃒": "nvrtrie", "⊶": "origof", "⊷": "imof", "⊸": "mumap", "⊹": "hercon", "⊺": "intcal", "⊻": "veebar", "⊽": "barvee", "⊾": "angrtvb", "⊿": "lrtri", "⋀": "Wedge", "⋁": "Vee", "⋂": "xcap", "⋃": "xcup", "⋄": "diam", "⋅": "sdot", "⋆": "Star", "⋇": "divonx", "⋈": "bowtie", "⋉": "ltimes", "⋊": "rtimes", "⋋": "lthree", "⋌": "rthree", "⋍": "bsime", "⋎": "cuvee", "⋏": "cuwed", "⋐": "Sub", "⋑": "Sup", "⋒": "Cap", "⋓": "Cup", "⋔": "fork", "⋕": "epar", "⋖": "ltdot", "⋗": "gtdot", "⋘": "Ll", "⋘̸": "nLl", "⋙": "Gg", "⋙̸": "nGg", "⋚︀": "lesg", "⋚": "leg", "⋛": "gel", "⋛︀": "gesl", "⋞": "cuepr", "⋟": "cuesc", "⋦": "lnsim", "⋧": "gnsim", "⋨": "prnsim", "⋩": "scnsim", "⋮": "vellip", "⋯": "ctdot", "⋰": "utdot", "⋱": "dtdot", "⋲": "disin", "⋳": "isinsv", "⋴": "isins", "⋵": "isindot", "⋵̸": "notindot", "⋶": "notinvc", "⋷": "notinvb", "⋹": "isinE", "⋹̸": "notinE", "⋺": "nisd", "⋻": "xnis", "⋼": "nis", "⋽": "notnivc", "⋾": "notnivb", "⌅": "barwed", "⌆": "Barwed", "⌌": "drcrop", "⌍": "dlcrop", "⌎": "urcrop", "⌏": "ulcrop", "⌐": "bnot", "⌒": "profline", "⌓": "profsurf", "⌕": "telrec", "⌖": "target", "⌜": "ulcorn", "⌝": "urcorn", "⌞": "dlcorn", "⌟": "drcorn", "⌢": "frown", "⌣": "smile", "⌭": "cylcty", "⌮": "profalar", "⌶": "topbot", "⌽": "ovbar", "⌿": "solbar", "⍼": "angzarr", "⎰": "lmoust", "⎱": "rmoust", "⎴": "tbrk", "⎵": "bbrk", "⎶": "bbrktbrk", "⏜": "OverParenthesis", "⏝": "UnderParenthesis", "⏞": "OverBrace", "⏟": "UnderBrace", "⏢": "trpezium", "⏧": "elinters", "␣": "blank", "─": "boxh", "│": "boxv", "┌": "boxdr", "┐": "boxdl", "└": "boxur", "┘": "boxul", "├": "boxvr", "┤": "boxvl", "┬": "boxhd", "┴": "boxhu", "┼": "boxvh", "═": "boxH", "║": "boxV", "╒": "boxdR", "╓": "boxDr", "╔": "boxDR", "╕": "boxdL", "╖": "boxDl", "╗": "boxDL", "╘": "boxuR", "╙": "boxUr", "╚": "boxUR", "╛": "boxuL", "╜": "boxUl", "╝": "boxUL", "╞": "boxvR", "╟": "boxVr", "╠": "boxVR", "╡": "boxvL", "╢": "boxVl", "╣": "boxVL", "╤": "boxHd", "╥": "boxhD", "╦": "boxHD", "╧": "boxHu", "╨": "boxhU", "╩": "boxHU", "╪": "boxvH", "╫": "boxVh", "╬": "boxVH", "▀": "uhblk", "▄": "lhblk", "█": "block", "░": "blk14", "▒": "blk12", "▓": "blk34", "□": "squ", "▪": "squf", "▫": "EmptyVerySmallSquare", "▭": "rect", "▮": "marker", "▱": "fltns", "△": "xutri", "▴": "utrif", "▵": "utri", "▸": "rtrif", "▹": "rtri", "▽": "xdtri", "▾": "dtrif", "▿": "dtri", "◂": "ltrif", "◃": "ltri", "◊": "loz", "○": "cir", "◬": "tridot", "◯": "xcirc", "◸": "ultri", "◹": "urtri", "◺": "lltri", "◻": "EmptySmallSquare", "◼": "FilledSmallSquare", "★": "starf", "☆": "star", "☎": "phone", "♀": "female", "♂": "male", "♠": "spades", "♣": "clubs", "♥": "hearts", "♦": "diams", "♪": "sung", "✓": "check", "✗": "cross", "✠": "malt", "✶": "sext", "❘": "VerticalSeparator", "⟈": "bsolhsub", "⟉": "suphsol", "⟵": "xlarr", "⟶": "xrarr", "⟷": "xharr", "⟸": "xlArr", "⟹": "xrArr", "⟺": "xhArr", "⟼": "xmap", "⟿": "dzigrarr", "⤂": "nvlArr", "⤃": "nvrArr", "⤄": "nvHarr", "⤅": "Map", "⤌": "lbarr", "⤍": "rbarr", "⤎": "lBarr", "⤏": "rBarr", "⤐": "RBarr", "⤑": "DDotrahd", "⤒": "UpArrowBar", "⤓": "DownArrowBar", "⤖": "Rarrtl", "⤙": "latail", "⤚": "ratail", "⤛": "lAtail", "⤜": "rAtail", "⤝": "larrfs", "⤞": "rarrfs", "⤟": "larrbfs", "⤠": "rarrbfs", "⤣": "nwarhk", "⤤": "nearhk", "⤥": "searhk", "⤦": "swarhk", "⤧": "nwnear", "⤨": "toea", "⤩": "tosa", "⤪": "swnwar", "⤳": "rarrc", "⤳̸": "nrarrc", "⤵": "cudarrr", "⤶": "ldca", "⤷": "rdca", "⤸": "cudarrl", "⤹": "larrpl", "⤼": "curarrm", "⤽": "cularrp", "⥅": "rarrpl", "⥈": "harrcir", "⥉": "Uarrocir", "⥊": "lurdshar", "⥋": "ldrushar", "⥎": "LeftRightVector", "⥏": "RightUpDownVector", "⥐": "DownLeftRightVector", "⥑": "LeftUpDownVector", "⥒": "LeftVectorBar", "⥓": "RightVectorBar", "⥔": "RightUpVectorBar", "⥕": "RightDownVectorBar", "⥖": "DownLeftVectorBar", "⥗": "DownRightVectorBar", "⥘": "LeftUpVectorBar", "⥙": "LeftDownVectorBar", "⥚": "LeftTeeVector", "⥛": "RightTeeVector", "⥜": "RightUpTeeVector", "⥝": "RightDownTeeVector", "⥞": "DownLeftTeeVector", "⥟": "DownRightTeeVector", "⥠": "LeftUpTeeVector", "⥡": "LeftDownTeeVector", "⥢": "lHar", "⥣": "uHar", "⥤": "rHar", "⥥": "dHar", "⥦": "luruhar", "⥧": "ldrdhar", "⥨": "ruluhar", "⥩": "rdldhar", "⥪": "lharul", "⥫": "llhard", "⥬": "rharul", "⥭": "lrhard", "⥮": "udhar", "⥯": "duhar", "⥰": "RoundImplies", "⥱": "erarr", "⥲": "simrarr", "⥳": "larrsim", "⥴": "rarrsim", "⥵": "rarrap", "⥶": "ltlarr", "⥸": "gtrarr", "⥹": "subrarr", "⥻": "suplarr", "⥼": "lfisht", "⥽": "rfisht", "⥾": "ufisht", "⥿": "dfisht", "⦚": "vzigzag", "⦜": "vangrt", "⦝": "angrtvbd", "⦤": "ange", "⦥": "range", "⦦": "dwangle", "⦧": "uwangle", "⦨": "angmsdaa", "⦩": "angmsdab", "⦪": "angmsdac", "⦫": "angmsdad", "⦬": "angmsdae", "⦭": "angmsdaf", "⦮": "angmsdag", "⦯": "angmsdah", "⦰": "bemptyv", "⦱": "demptyv", "⦲": "cemptyv", "⦳": "raemptyv", "⦴": "laemptyv", "⦵": "ohbar", "⦶": "omid", "⦷": "opar", "⦹": "operp", "⦻": "olcross", "⦼": "odsold", "⦾": "olcir", "⦿": "ofcir", "⧀": "olt", "⧁": "ogt", "⧂": "cirscir", "⧃": "cirE", "⧄": "solb", "⧅": "bsolb", "⧉": "boxbox", "⧍": "trisb", "⧎": "rtriltri", "⧏": "LeftTriangleBar", "⧏̸": "NotLeftTriangleBar", "⧐": "RightTriangleBar", "⧐̸": "NotRightTriangleBar", "⧜": "iinfin", "⧝": "infintie", "⧞": "nvinfin", "⧣": "eparsl", "⧤": "smeparsl", "⧥": "eqvparsl", "⧫": "lozf", "⧴": "RuleDelayed", "⧶": "dsol", "⨀": "xodot", "⨁": "xoplus", "⨂": "xotime", "⨄": "xuplus", "⨆": "xsqcup", "⨍": "fpartint", "⨐": "cirfnint", "⨑": "awint", "⨒": "rppolint", "⨓": "scpolint", "⨔": "npolint", "⨕": "pointint", "⨖": "quatint", "⨗": "intlarhk", "⨢": "pluscir", "⨣": "plusacir", "⨤": "simplus", "⨥": "plusdu", "⨦": "plussim", "⨧": "plustwo", "⨩": "mcomma", "⨪": "minusdu", "⨭": "loplus", "⨮": "roplus", "⨯": "Cross", "⨰": "timesd", "⨱": "timesbar", "⨳": "smashp", "⨴": "lotimes", "⨵": "rotimes", "⨶": "otimesas", "⨷": "Otimes", "⨸": "odiv", "⨹": "triplus", "⨺": "triminus", "⨻": "tritime", "⨼": "iprod", "⨿": "amalg", "⩀": "capdot", "⩂": "ncup", "⩃": "ncap", "⩄": "capand", "⩅": "cupor", "⩆": "cupcap", "⩇": "capcup", "⩈": "cupbrcap", "⩉": "capbrcup", "⩊": "cupcup", "⩋": "capcap", "⩌": "ccups", "⩍": "ccaps", "⩐": "ccupssm", "⩓": "And", "⩔": "Or", "⩕": "andand", "⩖": "oror", "⩗": "orslope", "⩘": "andslope", "⩚": "andv", "⩛": "orv", "⩜": "andd", "⩝": "ord", "⩟": "wedbar", "⩦": "sdote", "⩪": "simdot", "⩭": "congdot", "⩭̸": "ncongdot", "⩮": "easter", "⩯": "apacir", "⩰": "apE", "⩰̸": "napE", "⩱": "eplus", "⩲": "pluse", "⩳": "Esim", "⩷": "eDDot", "⩸": "equivDD", "⩹": "ltcir", "⩺": "gtcir", "⩻": "ltquest", "⩼": "gtquest", "⩽": "les", "⩽̸": "nles", "⩾": "ges", "⩾̸": "nges", "⩿": "lesdot", "⪀": "gesdot", "⪁": "lesdoto", "⪂": "gesdoto", "⪃": "lesdotor", "⪄": "gesdotol", "⪅": "lap", "⪆": "gap", "⪇": "lne", "⪈": "gne", "⪉": "lnap", "⪊": "gnap", "⪋": "lEg", "⪌": "gEl", "⪍": "lsime", "⪎": "gsime", "⪏": "lsimg", "⪐": "gsiml", "⪑": "lgE", "⪒": "glE", "⪓": "lesges", "⪔": "gesles", "⪕": "els", "⪖": "egs", "⪗": "elsdot", "⪘": "egsdot", "⪙": "el", "⪚": "eg", "⪝": "siml", "⪞": "simg", "⪟": "simlE", "⪠": "simgE", "⪡": "LessLess", "⪡̸": "NotNestedLessLess", "⪢": "GreaterGreater", "⪢̸": "NotNestedGreaterGreater", "⪤": "glj", "⪥": "gla", "⪦": "ltcc", "⪧": "gtcc", "⪨": "lescc", "⪩": "gescc", "⪪": "smt", "⪫": "lat", "⪬": "smte", "⪬︀": "smtes", "⪭": "late", "⪭︀": "lates", "⪮": "bumpE", "⪯": "pre", "⪯̸": "npre", "⪰": "sce", "⪰̸": "nsce", "⪳": "prE", "⪴": "scE", "⪵": "prnE", "⪶": "scnE", "⪷": "prap", "⪸": "scap", "⪹": "prnap", "⪺": "scnap", "⪻": "Pr", "⪼": "Sc", "⪽": "subdot", "⪾": "supdot", "⪿": "subplus", "⫀": "supplus", "⫁": "submult", "⫂": "supmult", "⫃": "subedot", "⫄": "supedot", "⫅": "subE", "⫅̸": "nsubE", "⫆": "supE", "⫆̸": "nsupE", "⫇": "subsim", "⫈": "supsim", "⫋︀": "vsubnE", "⫋": "subnE", "⫌︀": "vsupnE", "⫌": "supnE", "⫏": "csub", "⫐": "csup", "⫑": "csube", "⫒": "csupe", "⫓": "subsup", "⫔": "supsub", "⫕": "subsub", "⫖": "supsup", "⫗": "suphsub", "⫘": "supdsub", "⫙": "forkv", "⫚": "topfork", "⫛": "mlcp", "⫤": "Dashv", "⫦": "Vdashl", "⫧": "Barv", "⫨": "vBar", "⫩": "vBarv", "⫫": "Vbar", "⫬": "Not", "⫭": "bNot", "⫮": "rnmid", "⫯": "cirmid", "⫰": "midcir", "⫱": "topcir", "⫲": "nhpar", "⫳": "parsim", "⫽": "parsl", "⫽⃥": "nparsl", "♭": "flat", "♮": "natur", "♯": "sharp", "¤": "curren", "¢": "cent", $: "dollar", "£": "pound", "¥": "yen", "€": "euro", "¹": "sup1", "½": "half", "⅓": "frac13", "¼": "frac14", "⅕": "frac15", "⅙": "frac16", "⅛": "frac18", "²": "sup2", "⅔": "frac23", "⅖": "frac25", "³": "sup3", "¾": "frac34", "⅗": "frac35", "⅜": "frac38", "⅘": "frac45", "⅚": "frac56", "⅝": "frac58", "⅞": "frac78", "𝒶": "ascr", "𝕒": "aopf", "𝔞": "afr", "𝔸": "Aopf", "𝔄": "Afr", "𝒜": "Ascr", ª: "ordf", á: "aacute", Á: "Aacute", à: "agrave", À: "Agrave", ă: "abreve", Ă: "Abreve", â: "acirc", Â: "Acirc", å: "aring", Å: "angst", ä: "auml", Ä: "Auml", ã: "atilde", Ã: "Atilde", ą: "aogon", Ą: "Aogon", ā: "amacr", Ā: "Amacr", æ: "aelig", Æ: "AElig", "𝒷": "bscr", "𝕓": "bopf", "𝔟": "bfr", "𝔹": "Bopf", ℬ: "Bscr", "𝔅": "Bfr", "𝔠": "cfr", "𝒸": "cscr", "𝕔": "copf", ℭ: "Cfr", "𝒞": "Cscr", ℂ: "Copf", ć: "cacute", Ć: "Cacute", ĉ: "ccirc", Ĉ: "Ccirc", č: "ccaron", Č: "Ccaron", ċ: "cdot", Ċ: "Cdot", ç: "ccedil", Ç: "Ccedil", "℅": "incare", "𝔡": "dfr", "ⅆ": "dd", "𝕕": "dopf", "𝒹": "dscr", "𝒟": "Dscr", "𝔇": "Dfr", "ⅅ": "DD", "𝔻": "Dopf", ď: "dcaron", Ď: "Dcaron", đ: "dstrok", Đ: "Dstrok", ð: "eth", Ð: "ETH", "ⅇ": "ee", ℯ: "escr", "𝔢": "efr", "𝕖": "eopf", ℰ: "Escr", "𝔈": "Efr", "𝔼": "Eopf", é: "eacute", É: "Eacute", è: "egrave", È: "Egrave", ê: "ecirc", Ê: "Ecirc", ě: "ecaron", Ě: "Ecaron", ë: "euml", Ë: "Euml", ė: "edot", Ė: "Edot", ę: "eogon", Ę: "Eogon", ē: "emacr", Ē: "Emacr", "𝔣": "ffr", "𝕗": "fopf", "𝒻": "fscr", "𝔉": "Ffr", "𝔽": "Fopf", ℱ: "Fscr", ﬀ: "fflig", ﬃ: "ffilig", ﬄ: "ffllig", ﬁ: "filig", fj: "fjlig", ﬂ: "fllig", ƒ: "fnof", ℊ: "gscr", "𝕘": "gopf", "𝔤": "gfr", "𝒢": "Gscr", "𝔾": "Gopf", "𝔊": "Gfr", ǵ: "gacute", ğ: "gbreve", Ğ: "Gbreve", ĝ: "gcirc", Ĝ: "Gcirc", ġ: "gdot", Ġ: "Gdot", Ģ: "Gcedil", "𝔥": "hfr", ℎ: "planckh", "𝒽": "hscr", "𝕙": "hopf", ℋ: "Hscr", ℌ: "Hfr", ℍ: "Hopf", ĥ: "hcirc", Ĥ: "Hcirc", ℏ: "hbar", ħ: "hstrok", Ħ: "Hstrok", "𝕚": "iopf", "𝔦": "ifr", "𝒾": "iscr", "ⅈ": "ii", "𝕀": "Iopf", ℐ: "Iscr", ℑ: "Im", í: "iacute", Í: "Iacute", ì: "igrave", Ì: "Igrave", î: "icirc", Î: "Icirc", ï: "iuml", Ï: "Iuml", ĩ: "itilde", Ĩ: "Itilde", İ: "Idot", į: "iogon", Į: "Iogon", ī: "imacr", Ī: "Imacr", ĳ: "ijlig", Ĳ: "IJlig", ı: "imath", "𝒿": "jscr", "𝕛": "jopf", "𝔧": "jfr", "𝒥": "Jscr", "𝔍": "Jfr", "𝕁": "Jopf", ĵ: "jcirc", Ĵ: "Jcirc", "ȷ": "jmath", "𝕜": "kopf", "𝓀": "kscr", "𝔨": "kfr", "𝒦": "Kscr", "𝕂": "Kopf", "𝔎": "Kfr", ķ: "kcedil", Ķ: "Kcedil", "𝔩": "lfr", "𝓁": "lscr", ℓ: "ell", "𝕝": "lopf", ℒ: "Lscr", "𝔏": "Lfr", "𝕃": "Lopf", ĺ: "lacute", Ĺ: "Lacute", ľ: "lcaron", Ľ: "Lcaron", ļ: "lcedil", Ļ: "Lcedil", ł: "lstrok", Ł: "Lstrok", ŀ: "lmidot", Ŀ: "Lmidot", "𝔪": "mfr", "𝕞": "mopf", "𝓂": "mscr", "𝔐": "Mfr", "𝕄": "Mopf", ℳ: "Mscr", "𝔫": "nfr", "𝕟": "nopf", "𝓃": "nscr", ℕ: "Nopf", "𝒩": "Nscr", "𝔑": "Nfr", ń: "nacute", Ń: "Nacute", ň: "ncaron", Ň: "Ncaron", ñ: "ntilde", Ñ: "Ntilde", ņ: "ncedil", Ņ: "Ncedil", "№": "numero", ŋ: "eng", Ŋ: "ENG", "𝕠": "oopf", "𝔬": "ofr", ℴ: "oscr", "𝒪": "Oscr", "𝔒": "Ofr", "𝕆": "Oopf", º: "ordm", ó: "oacute", Ó: "Oacute", ò: "ograve", Ò: "Ograve", ô: "ocirc", Ô: "Ocirc", ö: "ouml", Ö: "Ouml", ő: "odblac", Ő: "Odblac", õ: "otilde", Õ: "Otilde", ø: "oslash", Ø: "Oslash", ō: "omacr", Ō: "Omacr", œ: "oelig", Œ: "OElig", "𝔭": "pfr", "𝓅": "pscr", "𝕡": "popf", ℙ: "Popf", "𝔓": "Pfr", "𝒫": "Pscr", "𝕢": "qopf", "𝔮": "qfr", "𝓆": "qscr", "𝒬": "Qscr", "𝔔": "Qfr", ℚ: "Qopf", ĸ: "kgreen", "𝔯": "rfr", "𝕣": "ropf", "𝓇": "rscr", ℛ: "Rscr", ℜ: "Re", ℝ: "Ropf", ŕ: "racute", Ŕ: "Racute", ř: "rcaron", Ř: "Rcaron", ŗ: "rcedil", Ŗ: "Rcedil", "𝕤": "sopf", "𝓈": "sscr", "𝔰": "sfr", "𝕊": "Sopf", "𝔖": "Sfr", "𝒮": "Sscr", "Ⓢ": "oS", ś: "sacute", Ś: "Sacute", ŝ: "scirc", Ŝ: "Scirc", š: "scaron", Š: "Scaron", ş: "scedil", Ş: "Scedil", ß: "szlig", "𝔱": "tfr", "𝓉": "tscr", "𝕥": "topf", "𝒯": "Tscr", "𝔗": "Tfr", "𝕋": "Topf", ť: "tcaron", Ť: "Tcaron", ţ: "tcedil", Ţ: "Tcedil", "™": "trade", ŧ: "tstrok", Ŧ: "Tstrok", "𝓊": "uscr", "𝕦": "uopf", "𝔲": "ufr", "𝕌": "Uopf", "𝔘": "Ufr", "𝒰": "Uscr", ú: "uacute", Ú: "Uacute", ù: "ugrave", Ù: "Ugrave", ŭ: "ubreve", Ŭ: "Ubreve", û: "ucirc", Û: "Ucirc", ů: "uring", Ů: "Uring", ü: "uuml", Ü: "Uuml", ű: "udblac", Ű: "Udblac", ũ: "utilde", Ũ: "Utilde", ų: "uogon", Ų: "Uogon", ū: "umacr", Ū: "Umacr", "𝔳": "vfr", "𝕧": "vopf", "𝓋": "vscr", "𝔙": "Vfr", "𝕍": "Vopf", "𝒱": "Vscr", "𝕨": "wopf", "𝓌": "wscr", "𝔴": "wfr", "𝒲": "Wscr", "𝕎": "Wopf", "𝔚": "Wfr", ŵ: "wcirc", Ŵ: "Wcirc", "𝔵": "xfr", "𝓍": "xscr", "𝕩": "xopf", "𝕏": "Xopf", "𝔛": "Xfr", "𝒳": "Xscr", "𝔶": "yfr", "𝓎": "yscr", "𝕪": "yopf", "𝒴": "Yscr", "𝔜": "Yfr", "𝕐": "Yopf", ý: "yacute", Ý: "Yacute", ŷ: "ycirc", Ŷ: "Ycirc", ÿ: "yuml", Ÿ: "Yuml", "𝓏": "zscr", "𝔷": "zfr", "𝕫": "zopf", ℨ: "Zfr", ℤ: "Zopf", "𝒵": "Zscr", ź: "zacute", Ź: "Zacute", ž: "zcaron", Ž: "Zcaron", ż: "zdot", Ż: "Zdot", Ƶ: "imped", þ: "thorn", Þ: "THORN", ŉ: "napos", α: "alpha", Α: "Alpha", β: "beta", Β: "Beta", γ: "gamma", Γ: "Gamma", δ: "delta", Δ: "Delta", ε: "epsi", "ϵ": "epsiv", Ε: "Epsilon", ϝ: "gammad", Ϝ: "Gammad", ζ: "zeta", Ζ: "Zeta", η: "eta", Η: "Eta", θ: "theta", ϑ: "thetav", Θ: "Theta", ι: "iota", Ι: "Iota", κ: "kappa", ϰ: "kappav", Κ: "Kappa", λ: "lambda", Λ: "Lambda", μ: "mu", µ: "micro", Μ: "Mu", ν: "nu", Ν: "Nu", ξ: "xi", Ξ: "Xi", ο: "omicron", Ο: "Omicron", π: "pi", ϖ: "piv", Π: "Pi", ρ: "rho", ϱ: "rhov", Ρ: "Rho", σ: "sigma", Σ: "Sigma", ς: "sigmaf", τ: "tau", Τ: "Tau", υ: "upsi", Υ: "Upsilon", ϒ: "Upsi", φ: "phi", ϕ: "phiv", Φ: "Phi", χ: "chi", Χ: "Chi", ψ: "psi", Ψ: "Psi", ω: "omega", Ω: "ohm", а: "acy", А: "Acy", б: "bcy", Б: "Bcy", в: "vcy", В: "Vcy", г: "gcy", Г: "Gcy", ѓ: "gjcy", Ѓ: "GJcy", д: "dcy", Д: "Dcy", ђ: "djcy", Ђ: "DJcy", е: "iecy", Е: "IEcy", ё: "iocy", Ё: "IOcy", є: "jukcy", Є: "Jukcy", ж: "zhcy", Ж: "ZHcy", з: "zcy", З: "Zcy", ѕ: "dscy", Ѕ: "DScy", и: "icy", И: "Icy", і: "iukcy", І: "Iukcy", ї: "yicy", Ї: "YIcy", й: "jcy", Й: "Jcy", ј: "jsercy", Ј: "Jsercy", к: "kcy", К: "Kcy", ќ: "kjcy", Ќ: "KJcy", л: "lcy", Л: "Lcy", љ: "ljcy", Љ: "LJcy", м: "mcy", М: "Mcy", н: "ncy", Н: "Ncy", њ: "njcy", Њ: "NJcy", о: "ocy", О: "Ocy", п: "pcy", П: "Pcy", р: "rcy", Р: "Rcy", с: "scy", С: "Scy", т: "tcy", Т: "Tcy", ћ: "tshcy", Ћ: "TSHcy", у: "ucy", У: "Ucy", ў: "ubrcy", Ў: "Ubrcy", ф: "fcy", Ф: "Fcy", х: "khcy", Х: "KHcy", ц: "tscy", Ц: "TScy", ч: "chcy", Ч: "CHcy", џ: "dzcy", Џ: "DZcy", ш: "shcy", Ш: "SHcy", щ: "shchcy", Щ: "SHCHcy", ъ: "hardcy", Ъ: "HARDcy", ы: "ycy", Ы: "Ycy", ь: "softcy", Ь: "SOFTcy", э: "ecy", Э: "Ecy", ю: "yucy", Ю: "YUcy", я: "yacy", Я: "YAcy", ℵ: "aleph", ℶ: "beth", ℷ: "gimel", ℸ: "daleth" }, h = /["&'<>`]/g, l = {
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#x27;",
        "<": "&lt;",
        // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
        // following is not strictly necessary unless it’s part of a tag or an
        // unquoted attribute value. We’re only escaping it to support those
        // situations, and for XML support.
        ">": "&gt;",
        // In Internet Explorer ≤ 8, the backtick character can be used
        // to break out of (un)quoted attribute values or HTML comments.
        // See http://html5sec.org/#102, http://html5sec.org/#108, and
        // http://html5sec.org/#133.
        "`": "&#x60;"
      }, f = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/, n = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, m = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g, x = { aacute: "á", Aacute: "Á", abreve: "ă", Abreve: "Ă", ac: "∾", acd: "∿", acE: "∾̳", acirc: "â", Acirc: "Â", acute: "´", acy: "а", Acy: "А", aelig: "æ", AElig: "Æ", af: "⁡", afr: "𝔞", Afr: "𝔄", agrave: "à", Agrave: "À", alefsym: "ℵ", aleph: "ℵ", alpha: "α", Alpha: "Α", amacr: "ā", Amacr: "Ā", amalg: "⨿", amp: "&", AMP: "&", and: "∧", And: "⩓", andand: "⩕", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsd: "∡", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", aogon: "ą", Aogon: "Ą", aopf: "𝕒", Aopf: "𝔸", ap: "≈", apacir: "⩯", ape: "≊", apE: "⩰", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", aring: "å", Aring: "Å", ascr: "𝒶", Ascr: "𝒜", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", atilde: "ã", Atilde: "Ã", auml: "ä", Auml: "Ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", barwed: "⌅", Barwed: "⌆", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", bcy: "б", Bcy: "Б", bdquo: "„", becaus: "∵", because: "∵", Because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", beta: "β", Beta: "Β", beth: "ℶ", between: "≬", bfr: "𝔟", Bfr: "𝔅", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bnot: "⌐", bNot: "⫭", bopf: "𝕓", Bopf: "𝔹", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxdl: "┐", boxdL: "╕", boxDl: "╖", boxDL: "╗", boxdr: "┌", boxdR: "╒", boxDr: "╓", boxDR: "╔", boxh: "─", boxH: "═", boxhd: "┬", boxhD: "╥", boxHd: "╤", boxHD: "╦", boxhu: "┴", boxhU: "╨", boxHu: "╧", boxHU: "╩", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxul: "┘", boxuL: "╛", boxUl: "╜", boxUL: "╝", boxur: "└", boxuR: "╘", boxUr: "╙", boxUR: "╚", boxv: "│", boxV: "║", boxvh: "┼", boxvH: "╪", boxVh: "╫", boxVH: "╬", boxvl: "┤", boxvL: "╡", boxVl: "╢", boxVL: "╣", boxvr: "├", boxvR: "╞", boxVr: "╟", boxVR: "╠", bprime: "‵", breve: "˘", Breve: "˘", brvbar: "¦", bscr: "𝒷", Bscr: "ℬ", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsol: "\\", bsolb: "⧅", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpe: "≏", bumpE: "⪮", bumpeq: "≏", Bumpeq: "≎", cacute: "ć", Cacute: "Ć", cap: "∩", Cap: "⋒", capand: "⩄", capbrcup: "⩉", capcap: "⩋", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", ccaron: "č", Ccaron: "Č", ccedil: "ç", Ccedil: "Ç", ccirc: "ĉ", Ccirc: "Ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", cdot: "ċ", Cdot: "Ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", CenterDot: "·", cfr: "𝔠", Cfr: "ℭ", chcy: "ч", CHcy: "Ч", check: "✓", checkmark: "✓", chi: "χ", Chi: "Χ", cir: "○", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cire: "≗", cirE: "⧃", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", colon: ":", Colon: "∷", colone: "≔", Colone: "⩴", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", conint: "∮", Conint: "∯", ContourIntegral: "∮", copf: "𝕔", Copf: "ℂ", coprod: "∐", Coproduct: "∐", copy: "©", COPY: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", cross: "✗", Cross: "⨯", cscr: "𝒸", Cscr: "𝒞", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cup: "∪", Cup: "⋓", cupbrcap: "⩈", cupcap: "⩆", CupCap: "≍", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dagger: "†", Dagger: "‡", daleth: "ℸ", darr: "↓", dArr: "⇓", Darr: "↡", dash: "‐", dashv: "⊣", Dashv: "⫤", dbkarow: "⤏", dblac: "˝", dcaron: "ď", Dcaron: "Ď", dcy: "д", Dcy: "Д", dd: "ⅆ", DD: "ⅅ", ddagger: "‡", ddarr: "⇊", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", delta: "δ", Delta: "Δ", demptyv: "⦱", dfisht: "⥿", dfr: "𝔡", Dfr: "𝔇", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", diamond: "⋄", Diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", djcy: "ђ", DJcy: "Ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", dopf: "𝕕", Dopf: "𝔻", dot: "˙", Dot: "¨", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", downarrow: "↓", Downarrow: "⇓", DownArrow: "↓", DownArrowBar: "⤓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVector: "↽", DownLeftVectorBar: "⥖", DownRightTeeVector: "⥟", DownRightVector: "⇁", DownRightVectorBar: "⥗", DownTee: "⊤", DownTeeArrow: "↧", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", dscr: "𝒹", Dscr: "𝒟", dscy: "ѕ", DScy: "Ѕ", dsol: "⧶", dstrok: "đ", Dstrok: "Đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", dzcy: "џ", DZcy: "Џ", dzigrarr: "⟿", eacute: "é", Eacute: "É", easter: "⩮", ecaron: "ě", Ecaron: "Ě", ecir: "≖", ecirc: "ê", Ecirc: "Ê", ecolon: "≕", ecy: "э", Ecy: "Э", eDDot: "⩷", edot: "ė", eDot: "≑", Edot: "Ė", ee: "ⅇ", efDot: "≒", efr: "𝔢", Efr: "𝔈", eg: "⪚", egrave: "è", Egrave: "È", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", emacr: "ē", Emacr: "Ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp: " ", emsp13: " ", emsp14: " ", eng: "ŋ", ENG: "Ŋ", ensp: " ", eogon: "ę", Eogon: "Ę", eopf: "𝕖", Eopf: "𝔼", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", epsilon: "ε", Epsilon: "Ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", escr: "ℯ", Escr: "ℰ", esdot: "≐", esim: "≂", Esim: "⩳", eta: "η", Eta: "Η", eth: "ð", ETH: "Ð", euml: "ë", Euml: "Ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", exponentiale: "ⅇ", ExponentialE: "ⅇ", fallingdotseq: "≒", fcy: "ф", Fcy: "Ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", ffr: "𝔣", Ffr: "𝔉", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", fopf: "𝕗", Fopf: "𝔽", forall: "∀", ForAll: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", Fscr: "ℱ", gacute: "ǵ", gamma: "γ", Gamma: "Γ", gammad: "ϝ", Gammad: "Ϝ", gap: "⪆", gbreve: "ğ", Gbreve: "Ğ", Gcedil: "Ģ", gcirc: "ĝ", Gcirc: "Ĝ", gcy: "г", Gcy: "Г", gdot: "ġ", Gdot: "Ġ", ge: "≥", gE: "≧", gel: "⋛", gEl: "⪌", geq: "≥", geqq: "≧", geqslant: "⩾", ges: "⩾", gescc: "⪩", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", gfr: "𝔤", Gfr: "𝔊", gg: "≫", Gg: "⋙", ggg: "⋙", gimel: "ℷ", gjcy: "ѓ", GJcy: "Ѓ", gl: "≷", gla: "⪥", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gnE: "≩", gneq: "⪈", gneqq: "≩", gnsim: "⋧", gopf: "𝕘", Gopf: "𝔾", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", gscr: "ℊ", Gscr: "𝒢", gsim: "≳", gsime: "⪎", gsiml: "⪐", gt: ">", Gt: "≫", GT: ">", gtcc: "⪧", gtcir: "⩺", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", hardcy: "ъ", HARDcy: "Ъ", harr: "↔", hArr: "⇔", harrcir: "⥈", harrw: "↭", Hat: "^", hbar: "ℏ", hcirc: "ĥ", Hcirc: "Ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", Hfr: "ℌ", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", Hopf: "ℍ", horbar: "―", HorizontalLine: "─", hscr: "𝒽", Hscr: "ℋ", hslash: "ℏ", hstrok: "ħ", Hstrok: "Ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", iacute: "í", Iacute: "Í", ic: "⁣", icirc: "î", Icirc: "Î", icy: "и", Icy: "И", Idot: "İ", iecy: "е", IEcy: "Е", iexcl: "¡", iff: "⇔", ifr: "𝔦", Ifr: "ℑ", igrave: "ì", Igrave: "Ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", ijlig: "ĳ", IJlig: "Ĳ", Im: "ℑ", imacr: "ī", Imacr: "Ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", imof: "⊷", imped: "Ƶ", Implies: "⇒", in: "∈", incare: "℅", infin: "∞", infintie: "⧝", inodot: "ı", int: "∫", Int: "∬", intcal: "⊺", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", iocy: "ё", IOcy: "Ё", iogon: "į", Iogon: "Į", iopf: "𝕚", Iopf: "𝕀", iota: "ι", Iota: "Ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", Iscr: "ℐ", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", itilde: "ĩ", Itilde: "Ĩ", iukcy: "і", Iukcy: "І", iuml: "ï", Iuml: "Ï", jcirc: "ĵ", Jcirc: "Ĵ", jcy: "й", Jcy: "Й", jfr: "𝔧", Jfr: "𝔍", jmath: "ȷ", jopf: "𝕛", Jopf: "𝕁", jscr: "𝒿", Jscr: "𝒥", jsercy: "ј", Jsercy: "Ј", jukcy: "є", Jukcy: "Є", kappa: "κ", Kappa: "Κ", kappav: "ϰ", kcedil: "ķ", Kcedil: "Ķ", kcy: "к", Kcy: "К", kfr: "𝔨", Kfr: "𝔎", kgreen: "ĸ", khcy: "х", KHcy: "Х", kjcy: "ќ", KJcy: "Ќ", kopf: "𝕜", Kopf: "𝕂", kscr: "𝓀", Kscr: "𝒦", lAarr: "⇚", lacute: "ĺ", Lacute: "Ĺ", laemptyv: "⦴", lagran: "ℒ", lambda: "λ", Lambda: "Λ", lang: "⟨", Lang: "⟪", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", larr: "←", lArr: "⇐", Larr: "↞", larrb: "⇤", larrbfs: "⤟", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", lat: "⪫", latail: "⤙", lAtail: "⤛", late: "⪭", lates: "⪭︀", lbarr: "⤌", lBarr: "⤎", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", lcaron: "ľ", Lcaron: "Ľ", lcedil: "ļ", Lcedil: "Ļ", lceil: "⌈", lcub: "{", lcy: "л", Lcy: "Л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", lE: "≦", LeftAngleBracket: "⟨", leftarrow: "←", Leftarrow: "⇐", LeftArrow: "←", LeftArrowBar: "⇤", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVector: "⇃", LeftDownVectorBar: "⥙", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", Leftrightarrow: "⇔", LeftRightArrow: "↔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTee: "⊣", LeftTeeArrow: "↤", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangle: "⊲", LeftTriangleBar: "⧏", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVector: "↿", LeftUpVectorBar: "⥘", LeftVector: "↼", LeftVectorBar: "⥒", leg: "⋚", lEg: "⪋", leq: "≤", leqq: "≦", leqslant: "⩽", les: "⩽", lescc: "⪨", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", lfr: "𝔩", Lfr: "𝔏", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", ljcy: "љ", LJcy: "Љ", ll: "≪", Ll: "⋘", llarr: "⇇", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", lmidot: "ŀ", Lmidot: "Ŀ", lmoust: "⎰", lmoustache: "⎰", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lnE: "≨", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", Longleftarrow: "⟸", LongLeftArrow: "⟵", longleftrightarrow: "⟷", Longleftrightarrow: "⟺", LongLeftRightArrow: "⟷", longmapsto: "⟼", longrightarrow: "⟶", Longrightarrow: "⟹", LongRightArrow: "⟶", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", lopf: "𝕝", Lopf: "𝕃", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", Lscr: "ℒ", lsh: "↰", Lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", lstrok: "ł", Lstrok: "Ł", lt: "<", Lt: "≪", LT: "<", ltcc: "⪦", ltcir: "⩹", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", map: "↦", Map: "⤅", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", mcy: "м", Mcy: "М", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", mfr: "𝔪", Mfr: "𝔐", mho: "℧", micro: "µ", mid: "∣", midast: "*", midcir: "⫰", middot: "·", minus: "−", minusb: "⊟", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", mopf: "𝕞", Mopf: "𝕄", mp: "∓", mscr: "𝓂", Mscr: "ℳ", mstpos: "∾", mu: "μ", Mu: "Μ", multimap: "⊸", mumap: "⊸", nabla: "∇", nacute: "ń", Nacute: "Ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natur: "♮", natural: "♮", naturals: "ℕ", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", ncaron: "ň", Ncaron: "Ň", ncedil: "ņ", Ncedil: "Ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", ncy: "н", Ncy: "Н", ndash: "–", ne: "≠", nearhk: "⤤", nearr: "↗", neArr: "⇗", nearrow: "↗", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: `
`, nexist: "∄", nexists: "∄", nfr: "𝔫", Nfr: "𝔑", nge: "≱", ngE: "≧̸", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", ngt: "≯", nGt: "≫⃒", ngtr: "≯", nGtv: "≫̸", nharr: "↮", nhArr: "⇎", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", njcy: "њ", NJcy: "Њ", nlarr: "↚", nlArr: "⇍", nldr: "‥", nle: "≰", nlE: "≦̸", nleftarrow: "↚", nLeftarrow: "⇍", nleftrightarrow: "↮", nLeftrightarrow: "⇎", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nlt: "≮", nLt: "≪⃒", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", nopf: "𝕟", Nopf: "ℕ", not: "¬", Not: "⫬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangle: "⋪", NotLeftTriangleBar: "⧏̸", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangle: "⋫", NotRightTriangleBar: "⧐̸", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", npar: "∦", nparallel: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", npre: "⪯̸", nprec: "⊀", npreceq: "⪯̸", nrarr: "↛", nrArr: "⇏", nrarrc: "⤳̸", nrarrw: "↝̸", nrightarrow: "↛", nRightarrow: "⇏", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", nscr: "𝓃", Nscr: "𝒩", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsube: "⊈", nsubE: "⫅̸", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupe: "⊉", nsupE: "⫆̸", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", ntilde: "ñ", Ntilde: "Ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", nu: "ν", Nu: "Ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nvdash: "⊬", nvDash: "⊭", nVdash: "⊮", nVDash: "⊯", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwarr: "↖", nwArr: "⇖", nwarrow: "↖", nwnear: "⤧", oacute: "ó", Oacute: "Ó", oast: "⊛", ocir: "⊚", ocirc: "ô", Ocirc: "Ô", ocy: "о", Ocy: "О", odash: "⊝", odblac: "ő", Odblac: "Ő", odiv: "⨸", odot: "⊙", odsold: "⦼", oelig: "œ", OElig: "Œ", ofcir: "⦿", ofr: "𝔬", Ofr: "𝔒", ogon: "˛", ograve: "ò", Ograve: "Ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", omacr: "ō", Omacr: "Ō", omega: "ω", Omega: "Ω", omicron: "ο", Omicron: "Ο", omid: "⦶", ominus: "⊖", oopf: "𝕠", Oopf: "𝕆", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", or: "∨", Or: "⩔", orarr: "↻", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", oscr: "ℴ", Oscr: "𝒪", oslash: "ø", Oslash: "Ø", osol: "⊘", otilde: "õ", Otilde: "Õ", otimes: "⊗", Otimes: "⨷", otimesas: "⨶", ouml: "ö", Ouml: "Ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", par: "∥", para: "¶", parallel: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", pcy: "п", Pcy: "П", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", pfr: "𝔭", Pfr: "𝔓", phi: "φ", Phi: "Φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", pi: "π", Pi: "Π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plus: "+", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", popf: "𝕡", Popf: "ℙ", pound: "£", pr: "≺", Pr: "⪻", prap: "⪷", prcue: "≼", pre: "⪯", prE: "⪳", prec: "≺", precapprox: "⪷", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", precsim: "≾", prime: "′", Prime: "″", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportion: "∷", Proportional: "∝", propto: "∝", prsim: "≾", prurel: "⊰", pscr: "𝓅", Pscr: "𝒫", psi: "ψ", Psi: "Ψ", puncsp: " ", qfr: "𝔮", Qfr: "𝔔", qint: "⨌", qopf: "𝕢", Qopf: "ℚ", qprime: "⁗", qscr: "𝓆", Qscr: "𝒬", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', QUOT: '"', rAarr: "⇛", race: "∽̱", racute: "ŕ", Racute: "Ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", Rang: "⟫", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarr: "→", rArr: "⇒", Rarr: "↠", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", rarrtl: "↣", Rarrtl: "⤖", rarrw: "↝", ratail: "⤚", rAtail: "⤜", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rBarr: "⤏", RBarr: "⤐", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", rcaron: "ř", Rcaron: "Ř", rcedil: "ŗ", Rcedil: "Ŗ", rceil: "⌉", rcub: "}", rcy: "р", Rcy: "Р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", Re: "ℜ", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", rect: "▭", reg: "®", REG: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", Rfr: "ℜ", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", rho: "ρ", Rho: "Ρ", rhov: "ϱ", RightAngleBracket: "⟩", rightarrow: "→", Rightarrow: "⇒", RightArrow: "→", RightArrowBar: "⇥", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVector: "⇂", RightDownVectorBar: "⥕", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTee: "⊢", RightTeeArrow: "↦", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangle: "⊳", RightTriangleBar: "⧐", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVector: "↾", RightUpVectorBar: "⥔", RightVector: "⇀", RightVectorBar: "⥓", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoust: "⎱", rmoustache: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", Ropf: "ℝ", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", rscr: "𝓇", Rscr: "ℛ", rsh: "↱", Rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", sacute: "ś", Sacute: "Ś", sbquo: "‚", sc: "≻", Sc: "⪼", scap: "⪸", scaron: "š", Scaron: "Š", sccue: "≽", sce: "⪰", scE: "⪴", scedil: "ş", Scedil: "Ş", scirc: "ŝ", Scirc: "Ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", scy: "с", Scy: "С", sdot: "⋅", sdotb: "⊡", sdote: "⩦", searhk: "⤥", searr: "↘", seArr: "⇘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", sfr: "𝔰", Sfr: "𝔖", sfrown: "⌢", sharp: "♯", shchcy: "щ", SHCHcy: "Щ", shcy: "ш", SHcy: "Ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", sigma: "σ", Sigma: "Σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", softcy: "ь", SOFTcy: "Ь", sol: "/", solb: "⧄", solbar: "⌿", sopf: "𝕤", Sopf: "𝕊", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", squ: "□", square: "□", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squf: "▪", srarr: "→", sscr: "𝓈", Sscr: "𝒮", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", star: "☆", Star: "⋆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", Sub: "⋐", subdot: "⪽", sube: "⊆", subE: "⫅", subedot: "⫃", submult: "⫁", subne: "⊊", subnE: "⫋", subplus: "⪿", subrarr: "⥹", subset: "⊂", Subset: "⋐", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succ: "≻", succapprox: "⪸", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", sum: "∑", Sum: "∑", sung: "♪", sup: "⊃", Sup: "⋑", sup1: "¹", sup2: "²", sup3: "³", supdot: "⪾", supdsub: "⫘", supe: "⊇", supE: "⫆", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supne: "⊋", supnE: "⫌", supplus: "⫀", supset: "⊃", Supset: "⋑", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swarr: "↙", swArr: "⇙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "	", target: "⌖", tau: "τ", Tau: "Τ", tbrk: "⎴", tcaron: "ť", Tcaron: "Ť", tcedil: "ţ", Tcedil: "Ţ", tcy: "т", Tcy: "Т", tdot: "⃛", telrec: "⌕", tfr: "𝔱", Tfr: "𝔗", there4: "∴", therefore: "∴", Therefore: "∴", theta: "θ", Theta: "Θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", thinsp: " ", ThinSpace: " ", thkap: "≈", thksim: "∼", thorn: "þ", THORN: "Þ", tilde: "˜", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", times: "×", timesb: "⊠", timesbar: "⨱", timesd: "⨰", tint: "∭", toea: "⤨", top: "⊤", topbot: "⌶", topcir: "⫱", topf: "𝕥", Topf: "𝕋", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", TRADE: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", tscr: "𝓉", Tscr: "𝒯", tscy: "ц", TScy: "Ц", tshcy: "ћ", TSHcy: "Ћ", tstrok: "ŧ", Tstrok: "Ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", uacute: "ú", Uacute: "Ú", uarr: "↑", uArr: "⇑", Uarr: "↟", Uarrocir: "⥉", ubrcy: "ў", Ubrcy: "Ў", ubreve: "ŭ", Ubreve: "Ŭ", ucirc: "û", Ucirc: "Û", ucy: "у", Ucy: "У", udarr: "⇅", udblac: "ű", Udblac: "Ű", udhar: "⥮", ufisht: "⥾", ufr: "𝔲", Ufr: "𝔘", ugrave: "ù", Ugrave: "Ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", umacr: "ū", Umacr: "Ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", uogon: "ų", Uogon: "Ų", uopf: "𝕦", Uopf: "𝕌", uparrow: "↑", Uparrow: "⇑", UpArrow: "↑", UpArrowBar: "⤒", UpArrowDownArrow: "⇅", updownarrow: "↕", Updownarrow: "⇕", UpDownArrow: "↕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", upsi: "υ", Upsi: "ϒ", upsih: "ϒ", upsilon: "υ", Upsilon: "Υ", UpTee: "⊥", UpTeeArrow: "↥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", uring: "ů", Uring: "Ů", urtri: "◹", uscr: "𝓊", Uscr: "𝒰", utdot: "⋰", utilde: "ũ", Utilde: "Ũ", utri: "▵", utrif: "▴", uuarr: "⇈", uuml: "ü", Uuml: "Ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", vArr: "⇕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vBar: "⫨", Vbar: "⫫", vBarv: "⫩", vcy: "в", Vcy: "В", vdash: "⊢", vDash: "⊨", Vdash: "⊩", VDash: "⊫", Vdashl: "⫦", vee: "∨", Vee: "⋁", veebar: "⊻", veeeq: "≚", vellip: "⋮", verbar: "|", Verbar: "‖", vert: "|", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", vfr: "𝔳", Vfr: "𝔙", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", vopf: "𝕧", Vopf: "𝕍", vprop: "∝", vrtri: "⊳", vscr: "𝓋", Vscr: "𝒱", vsubne: "⊊︀", vsubnE: "⫋︀", vsupne: "⊋︀", vsupnE: "⫌︀", Vvdash: "⊪", vzigzag: "⦚", wcirc: "ŵ", Wcirc: "Ŵ", wedbar: "⩟", wedge: "∧", Wedge: "⋀", wedgeq: "≙", weierp: "℘", wfr: "𝔴", Wfr: "𝔚", wopf: "𝕨", Wopf: "𝕎", wp: "℘", wr: "≀", wreath: "≀", wscr: "𝓌", Wscr: "𝒲", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", xfr: "𝔵", Xfr: "𝔛", xharr: "⟷", xhArr: "⟺", xi: "ξ", Xi: "Ξ", xlarr: "⟵", xlArr: "⟸", xmap: "⟼", xnis: "⋻", xodot: "⨀", xopf: "𝕩", Xopf: "𝕏", xoplus: "⨁", xotime: "⨂", xrarr: "⟶", xrArr: "⟹", xscr: "𝓍", Xscr: "𝒳", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", yacute: "ý", Yacute: "Ý", yacy: "я", YAcy: "Я", ycirc: "ŷ", Ycirc: "Ŷ", ycy: "ы", Ycy: "Ы", yen: "¥", yfr: "𝔶", Yfr: "𝔜", yicy: "ї", YIcy: "Ї", yopf: "𝕪", Yopf: "𝕐", yscr: "𝓎", Yscr: "𝒴", yucy: "ю", YUcy: "Ю", yuml: "ÿ", Yuml: "Ÿ", zacute: "ź", Zacute: "Ź", zcaron: "ž", Zcaron: "Ž", zcy: "з", Zcy: "З", zdot: "ż", Zdot: "Ż", zeetrf: "ℨ", ZeroWidthSpace: "​", zeta: "ζ", Zeta: "Ζ", zfr: "𝔷", Zfr: "ℨ", zhcy: "ж", ZHcy: "Ж", zigrarr: "⇝", zopf: "𝕫", Zopf: "ℤ", zscr: "𝓏", Zscr: "𝒵", zwj: "‍", zwnj: "‌" }, N = { aacute: "á", Aacute: "Á", acirc: "â", Acirc: "Â", acute: "´", aelig: "æ", AElig: "Æ", agrave: "à", Agrave: "À", amp: "&", AMP: "&", aring: "å", Aring: "Å", atilde: "ã", Atilde: "Ã", auml: "ä", Auml: "Ä", brvbar: "¦", ccedil: "ç", Ccedil: "Ç", cedil: "¸", cent: "¢", copy: "©", COPY: "©", curren: "¤", deg: "°", divide: "÷", eacute: "é", Eacute: "É", ecirc: "ê", Ecirc: "Ê", egrave: "è", Egrave: "È", eth: "ð", ETH: "Ð", euml: "ë", Euml: "Ë", frac12: "½", frac14: "¼", frac34: "¾", gt: ">", GT: ">", iacute: "í", Iacute: "Í", icirc: "î", Icirc: "Î", iexcl: "¡", igrave: "ì", Igrave: "Ì", iquest: "¿", iuml: "ï", Iuml: "Ï", laquo: "«", lt: "<", LT: "<", macr: "¯", micro: "µ", middot: "·", nbsp: " ", not: "¬", ntilde: "ñ", Ntilde: "Ñ", oacute: "ó", Oacute: "Ó", ocirc: "ô", Ocirc: "Ô", ograve: "ò", Ograve: "Ò", ordf: "ª", ordm: "º", oslash: "ø", Oslash: "Ø", otilde: "õ", Otilde: "Õ", ouml: "ö", Ouml: "Ö", para: "¶", plusmn: "±", pound: "£", quot: '"', QUOT: '"', raquo: "»", reg: "®", REG: "®", sect: "§", shy: "­", sup1: "¹", sup2: "²", sup3: "³", szlig: "ß", thorn: "þ", THORN: "Þ", times: "×", uacute: "ú", Uacute: "Ú", ucirc: "û", Ucirc: "Û", ugrave: "ù", Ugrave: "Ù", uml: "¨", uuml: "ü", Uuml: "Ü", yacute: "ý", Yacute: "Ý", yen: "¥", yuml: "ÿ" }, q = { 0: "�", 128: "€", 130: "‚", 131: "ƒ", 132: "„", 133: "…", 134: "†", 135: "‡", 136: "ˆ", 137: "‰", 138: "Š", 139: "‹", 140: "Œ", 142: "Ž", 145: "‘", 146: "’", 147: "“", 148: "”", 149: "•", 150: "–", 151: "—", 152: "˜", 153: "™", 154: "š", 155: "›", 156: "œ", 158: "ž", 159: "Ÿ" }, y = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111], D = String.fromCharCode, p = {}, A = p.hasOwnProperty, C = function(B, O) {
        return A.call(B, O);
      }, _ = function(B, O) {
        for (var R = -1, U = B.length; ++R < U; )
          if (B[R] == O)
            return !0;
        return !1;
      }, k = function(B, O) {
        if (!B)
          return O;
        var R = {}, U;
        for (U in O)
          R[U] = C(B, U) ? B[U] : O[U];
        return R;
      }, j = function(B, O) {
        var R = "";
        return B >= 55296 && B <= 57343 || B > 1114111 ? (O && F("character reference outside the permissible Unicode range"), "�") : C(q, B) ? (O && F("disallowed character reference"), q[B]) : (O && _(y, B) && F("disallowed character reference"), B > 65535 && (B -= 65536, R += D(B >>> 10 & 1023 | 55296), B = 56320 | B & 1023), R += D(B), R);
      }, v = function(B) {
        return "&#x" + B.toString(16).toUpperCase() + ";";
      }, L = function(B) {
        return "&#" + B + ";";
      }, F = function(B) {
        throw Error("Parse error: " + B);
      }, S = function(B, O) {
        O = k(O, S.options);
        var R = O.strict;
        R && n.test(B) && F("forbidden code point");
        var U = O.encodeEverything, K = O.useNamedReferences, nu = O.allowUnsafeSymbols, Z = O.decimal ? L : v, $ = function(M) {
          return Z(M.charCodeAt(0));
        };
        return U ? (B = B.replace(t, function(M) {
          return K && C(d, M) ? "&" + d[M] + ";" : $(M);
        }), K && (B = B.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;")), K && (B = B.replace(e, function(M) {
          return "&" + d[M] + ";";
        }))) : K ? (nu || (B = B.replace(h, function(M) {
          return "&" + d[M] + ";";
        })), B = B.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;"), B = B.replace(e, function(M) {
          return "&" + d[M] + ";";
        })) : nu || (B = B.replace(h, $)), B.replace(r, function(M) {
          var V = M.charCodeAt(0), X = M.charCodeAt(1), bu = (V - 55296) * 1024 + X - 56320 + 65536;
          return Z(bu);
        }).replace(a, $);
      };
      S.options = {
        allowUnsafeSymbols: !1,
        encodeEverything: !1,
        strict: !1,
        useNamedReferences: !1,
        decimal: !1
      };
      var b = function(B, O) {
        O = k(O, b.options);
        var R = O.strict;
        return R && f.test(B) && F("malformed character reference"), B.replace(m, function(U, K, nu, Z, $, M, V, X, bu) {
          var Du, mu, Wu, Ju, Au, z;
          return K ? (Au = K, x[Au]) : nu ? (Au = nu, z = Z, z && O.isAttributeValue ? (R && z == "=" && F("`&` did not start a character reference"), U) : (R && F(
            "named character reference was not terminated by a semicolon"
          ), N[Au] + (z || ""))) : $ ? (Wu = $, mu = M, R && !mu && F("character reference was not terminated by a semicolon"), Du = parseInt(Wu, 10), j(Du, R)) : V ? (Ju = V, mu = X, R && !mu && F("character reference was not terminated by a semicolon"), Du = parseInt(Ju, 16), j(Du, R)) : (R && F(
            "named character reference was not terminated by a semicolon"
          ), U);
        });
      };
      b.options = {
        isAttributeValue: !1,
        strict: !1
      };
      var E = function(B) {
        return B.replace(h, function(O) {
          return l[O];
        });
      }, w = {
        version: "1.2.0",
        encode: S,
        decode: b,
        escape: E,
        unescape: b
      };
      if (s && !s.nodeType)
        if (g)
          g.exports = w;
        else
          for (var T in w)
            C(w, T) && (s[T] = w[T]);
      else
        c.he = w;
    })(Gr);
  })(Gu, Gu.exports)), Gu.exports;
}
var Be;
function ne() {
  if (Be) return Xu;
  Be = 1, Object.defineProperty(Xu, "__esModule", { value: !0 });
  const u = Ae();
  class o {
    constructor(s = null, g) {
      this.parentNode = s, this.childNodes = [], Object.defineProperty(this, "range", {
        enumerable: !1,
        writable: !0,
        configurable: !0,
        value: g ?? [-1, -1]
      });
    }
    /**
     * Remove current node
     */
    remove() {
      if (this.parentNode) {
        const s = this.parentNode.childNodes;
        this.parentNode.childNodes = s.filter((g) => this !== g), this.parentNode = null;
      }
      return this;
    }
    get innerText() {
      return this.rawText;
    }
    get textContent() {
      return (0, u.decode)(this.rawText);
    }
    set textContent(s) {
      this.rawText = (0, u.encode)(s);
    }
  }
  return Xu.default = o, Xu;
}
var Yu = {}, qe;
function zu() {
  if (qe) return Yu;
  qe = 1, Object.defineProperty(Yu, "__esModule", { value: !0 });
  var u;
  return (function(o) {
    o[o.ELEMENT_NODE = 1] = "ELEMENT_NODE", o[o.TEXT_NODE = 3] = "TEXT_NODE", o[o.COMMENT_NODE = 8] = "COMMENT_NODE";
  })(u || (u = {})), Yu.default = u, Yu;
}
var Te;
function Tr() {
  if (Te) return Fu;
  Te = 1;
  var u = Fu && Fu.__importDefault || function(g) {
    return g && g.__esModule ? g : { default: g };
  };
  Object.defineProperty(Fu, "__esModule", { value: !0 });
  const o = u(/* @__PURE__ */ ne()), c = u(/* @__PURE__ */ zu());
  class s extends o.default {
    clone() {
      return new s(this.rawText, null, void 0, this.rawTagName);
    }
    constructor(i, r = null, t, a = "!--") {
      super(r, t), this.rawText = i, this.rawTagName = a, this.nodeType = c.default.COMMENT_NODE;
    }
    /**
     * Get unescaped text value of current node and its children.
     * @return {string} text content
     */
    get text() {
      return this.rawText;
    }
    toString() {
      return `<!--${this.rawText}-->`;
    }
  }
  return Fu.default = s, Fu;
}
var tu = {}, uu = {}, vu = {}, au = {}, Eu = {}, se = {}, Fe;
function ie() {
  return Fe || (Fe = 1, (function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.Doctype = u.CDATA = u.Tag = u.Style = u.Script = u.Comment = u.Directive = u.Text = u.Root = u.isTag = u.ElementType = void 0;
    var o;
    (function(s) {
      s.Root = "root", s.Text = "text", s.Directive = "directive", s.Comment = "comment", s.Script = "script", s.Style = "style", s.Tag = "tag", s.CDATA = "cdata", s.Doctype = "doctype";
    })(o = u.ElementType || (u.ElementType = {}));
    function c(s) {
      return s.type === o.Tag || s.type === o.Script || s.type === o.Style;
    }
    u.isTag = c, u.Root = o.Root, u.Text = o.Text, u.Directive = o.Directive, u.Comment = o.Comment, u.Script = o.Script, u.Style = o.Style, u.Tag = o.Tag, u.CDATA = o.CDATA, u.Doctype = o.Doctype;
  })(se)), se;
}
var P = {}, Ne;
function Le() {
  if (Ne) return P;
  Ne = 1;
  var u = P && P.__extends || /* @__PURE__ */ (function() {
    var p = function(A, C) {
      return p = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(_, k) {
        _.__proto__ = k;
      } || function(_, k) {
        for (var j in k) Object.prototype.hasOwnProperty.call(k, j) && (_[j] = k[j]);
      }, p(A, C);
    };
    return function(A, C) {
      if (typeof C != "function" && C !== null)
        throw new TypeError("Class extends value " + String(C) + " is not a constructor or null");
      p(A, C);
      function _() {
        this.constructor = A;
      }
      A.prototype = C === null ? Object.create(C) : (_.prototype = C.prototype, new _());
    };
  })(), o = P && P.__assign || function() {
    return o = Object.assign || function(p) {
      for (var A, C = 1, _ = arguments.length; C < _; C++) {
        A = arguments[C];
        for (var k in A) Object.prototype.hasOwnProperty.call(A, k) && (p[k] = A[k]);
      }
      return p;
    }, o.apply(this, arguments);
  };
  Object.defineProperty(P, "__esModule", { value: !0 }), P.cloneNode = P.hasChildren = P.isDocument = P.isDirective = P.isComment = P.isText = P.isCDATA = P.isTag = P.Element = P.Document = P.CDATA = P.NodeWithChildren = P.ProcessingInstruction = P.Comment = P.Text = P.DataNode = P.Node = void 0;
  var c = /* @__PURE__ */ ie(), s = (
    /** @class */
    (function() {
      function p() {
        this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
      }
      return Object.defineProperty(p.prototype, "parentNode", {
        // Read-write aliases for properties
        /**
         * Same as {@link parent}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function() {
          return this.parent;
        },
        set: function(A) {
          this.parent = A;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(p.prototype, "previousSibling", {
        /**
         * Same as {@link prev}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function() {
          return this.prev;
        },
        set: function(A) {
          this.prev = A;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(p.prototype, "nextSibling", {
        /**
         * Same as {@link next}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function() {
          return this.next;
        },
        set: function(A) {
          this.next = A;
        },
        enumerable: !1,
        configurable: !0
      }), p.prototype.cloneNode = function(A) {
        return A === void 0 && (A = !1), y(this, A);
      }, p;
    })()
  );
  P.Node = s;
  var g = (
    /** @class */
    (function(p) {
      u(A, p);
      function A(C) {
        var _ = p.call(this) || this;
        return _.data = C, _;
      }
      return Object.defineProperty(A.prototype, "nodeValue", {
        /**
         * Same as {@link data}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function() {
          return this.data;
        },
        set: function(C) {
          this.data = C;
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(s)
  );
  P.DataNode = g;
  var i = (
    /** @class */
    (function(p) {
      u(A, p);
      function A() {
        var C = p !== null && p.apply(this, arguments) || this;
        return C.type = c.ElementType.Text, C;
      }
      return Object.defineProperty(A.prototype, "nodeType", {
        get: function() {
          return 3;
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(g)
  );
  P.Text = i;
  var r = (
    /** @class */
    (function(p) {
      u(A, p);
      function A() {
        var C = p !== null && p.apply(this, arguments) || this;
        return C.type = c.ElementType.Comment, C;
      }
      return Object.defineProperty(A.prototype, "nodeType", {
        get: function() {
          return 8;
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(g)
  );
  P.Comment = r;
  var t = (
    /** @class */
    (function(p) {
      u(A, p);
      function A(C, _) {
        var k = p.call(this, _) || this;
        return k.name = C, k.type = c.ElementType.Directive, k;
      }
      return Object.defineProperty(A.prototype, "nodeType", {
        get: function() {
          return 1;
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(g)
  );
  P.ProcessingInstruction = t;
  var a = (
    /** @class */
    (function(p) {
      u(A, p);
      function A(C) {
        var _ = p.call(this) || this;
        return _.children = C, _;
      }
      return Object.defineProperty(A.prototype, "firstChild", {
        // Aliases
        /** First child of the node. */
        get: function() {
          var C;
          return (C = this.children[0]) !== null && C !== void 0 ? C : null;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(A.prototype, "lastChild", {
        /** Last child of the node. */
        get: function() {
          return this.children.length > 0 ? this.children[this.children.length - 1] : null;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(A.prototype, "childNodes", {
        /**
         * Same as {@link children}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function() {
          return this.children;
        },
        set: function(C) {
          this.children = C;
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(s)
  );
  P.NodeWithChildren = a;
  var e = (
    /** @class */
    (function(p) {
      u(A, p);
      function A() {
        var C = p !== null && p.apply(this, arguments) || this;
        return C.type = c.ElementType.CDATA, C;
      }
      return Object.defineProperty(A.prototype, "nodeType", {
        get: function() {
          return 4;
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(a)
  );
  P.CDATA = e;
  var d = (
    /** @class */
    (function(p) {
      u(A, p);
      function A() {
        var C = p !== null && p.apply(this, arguments) || this;
        return C.type = c.ElementType.Root, C;
      }
      return Object.defineProperty(A.prototype, "nodeType", {
        get: function() {
          return 9;
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(a)
  );
  P.Document = d;
  var h = (
    /** @class */
    (function(p) {
      u(A, p);
      function A(C, _, k, j) {
        k === void 0 && (k = []), j === void 0 && (j = C === "script" ? c.ElementType.Script : C === "style" ? c.ElementType.Style : c.ElementType.Tag);
        var v = p.call(this, k) || this;
        return v.name = C, v.attribs = _, v.type = j, v;
      }
      return Object.defineProperty(A.prototype, "nodeType", {
        get: function() {
          return 1;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(A.prototype, "tagName", {
        // DOM Level 1 aliases
        /**
         * Same as {@link name}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function() {
          return this.name;
        },
        set: function(C) {
          this.name = C;
        },
        enumerable: !1,
        configurable: !0
      }), Object.defineProperty(A.prototype, "attributes", {
        get: function() {
          var C = this;
          return Object.keys(this.attribs).map(function(_) {
            var k, j;
            return {
              name: _,
              value: C.attribs[_],
              namespace: (k = C["x-attribsNamespace"]) === null || k === void 0 ? void 0 : k[_],
              prefix: (j = C["x-attribsPrefix"]) === null || j === void 0 ? void 0 : j[_]
            };
          });
        },
        enumerable: !1,
        configurable: !0
      }), A;
    })(a)
  );
  P.Element = h;
  function l(p) {
    return (0, c.isTag)(p);
  }
  P.isTag = l;
  function f(p) {
    return p.type === c.ElementType.CDATA;
  }
  P.isCDATA = f;
  function n(p) {
    return p.type === c.ElementType.Text;
  }
  P.isText = n;
  function m(p) {
    return p.type === c.ElementType.Comment;
  }
  P.isComment = m;
  function x(p) {
    return p.type === c.ElementType.Directive;
  }
  P.isDirective = x;
  function N(p) {
    return p.type === c.ElementType.Root;
  }
  P.isDocument = N;
  function q(p) {
    return Object.prototype.hasOwnProperty.call(p, "children");
  }
  P.hasChildren = q;
  function y(p, A) {
    A === void 0 && (A = !1);
    var C;
    if (n(p))
      C = new i(p.data);
    else if (m(p))
      C = new r(p.data);
    else if (l(p)) {
      var _ = A ? D(p.children) : [], k = new h(p.name, o({}, p.attribs), _);
      _.forEach(function(F) {
        return F.parent = k;
      }), p.namespace != null && (k.namespace = p.namespace), p["x-attribsNamespace"] && (k["x-attribsNamespace"] = o({}, p["x-attribsNamespace"])), p["x-attribsPrefix"] && (k["x-attribsPrefix"] = o({}, p["x-attribsPrefix"])), C = k;
    } else if (f(p)) {
      var _ = A ? D(p.children) : [], j = new e(_);
      _.forEach(function(S) {
        return S.parent = j;
      }), C = j;
    } else if (N(p)) {
      var _ = A ? D(p.children) : [], v = new d(_);
      _.forEach(function(S) {
        return S.parent = v;
      }), p["x-mode"] && (v["x-mode"] = p["x-mode"]), C = v;
    } else if (x(p)) {
      var L = new t(p.name, p.data);
      p["x-name"] != null && (L["x-name"] = p["x-name"], L["x-publicId"] = p["x-publicId"], L["x-systemId"] = p["x-systemId"]), C = L;
    } else
      throw new Error("Not implemented yet: ".concat(p.type));
    return C.startIndex = p.startIndex, C.endIndex = p.endIndex, p.sourceCodeLocation != null && (C.sourceCodeLocation = p.sourceCodeLocation), C;
  }
  P.cloneNode = y;
  function D(p) {
    for (var A = p.map(function(_) {
      return y(_, !0);
    }), C = 1; C < A.length; C++)
      A[C].prev = A[C - 1], A[C - 1].next = A[C];
    return A;
  }
  return P;
}
var _e;
function Ou() {
  return _e || (_e = 1, (function(u) {
    var o = Eu && Eu.__createBinding || (Object.create ? (function(t, a, e, d) {
      d === void 0 && (d = e);
      var h = Object.getOwnPropertyDescriptor(a, e);
      (!h || ("get" in h ? !a.__esModule : h.writable || h.configurable)) && (h = { enumerable: !0, get: function() {
        return a[e];
      } }), Object.defineProperty(t, d, h);
    }) : (function(t, a, e, d) {
      d === void 0 && (d = e), t[d] = a[e];
    })), c = Eu && Eu.__exportStar || function(t, a) {
      for (var e in t) e !== "default" && !Object.prototype.hasOwnProperty.call(a, e) && o(a, t, e);
    };
    Object.defineProperty(u, "__esModule", { value: !0 }), u.DomHandler = void 0;
    var s = /* @__PURE__ */ ie(), g = /* @__PURE__ */ Le();
    c(/* @__PURE__ */ Le(), u);
    var i = {
      withStartIndices: !1,
      withEndIndices: !1,
      xmlMode: !1
    }, r = (
      /** @class */
      (function() {
        function t(a, e, d) {
          this.dom = [], this.root = new g.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof e == "function" && (d = e, e = i), typeof a == "object" && (e = a, a = void 0), this.callback = a ?? null, this.options = e ?? i, this.elementCB = d ?? null;
        }
        return t.prototype.onparserinit = function(a) {
          this.parser = a;
        }, t.prototype.onreset = function() {
          this.dom = [], this.root = new g.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
        }, t.prototype.onend = function() {
          this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
        }, t.prototype.onerror = function(a) {
          this.handleCallback(a);
        }, t.prototype.onclosetag = function() {
          this.lastNode = null;
          var a = this.tagStack.pop();
          this.options.withEndIndices && (a.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(a);
        }, t.prototype.onopentag = function(a, e) {
          var d = this.options.xmlMode ? s.ElementType.Tag : void 0, h = new g.Element(a, e, void 0, d);
          this.addNode(h), this.tagStack.push(h);
        }, t.prototype.ontext = function(a) {
          var e = this.lastNode;
          if (e && e.type === s.ElementType.Text)
            e.data += a, this.options.withEndIndices && (e.endIndex = this.parser.endIndex);
          else {
            var d = new g.Text(a);
            this.addNode(d), this.lastNode = d;
          }
        }, t.prototype.oncomment = function(a) {
          if (this.lastNode && this.lastNode.type === s.ElementType.Comment) {
            this.lastNode.data += a;
            return;
          }
          var e = new g.Comment(a);
          this.addNode(e), this.lastNode = e;
        }, t.prototype.oncommentend = function() {
          this.lastNode = null;
        }, t.prototype.oncdatastart = function() {
          var a = new g.Text(""), e = new g.CDATA([a]);
          this.addNode(e), a.parent = e, this.lastNode = a;
        }, t.prototype.oncdataend = function() {
          this.lastNode = null;
        }, t.prototype.onprocessinginstruction = function(a, e) {
          var d = new g.ProcessingInstruction(a, e);
          this.addNode(d);
        }, t.prototype.handleCallback = function(a) {
          if (typeof this.callback == "function")
            this.callback(a, this.dom);
          else if (a)
            throw a;
        }, t.prototype.addNode = function(a) {
          var e = this.tagStack[this.tagStack.length - 1], d = e.children[e.children.length - 1];
          this.options.withStartIndices && (a.startIndex = this.parser.startIndex), this.options.withEndIndices && (a.endIndex = this.parser.endIndex), e.children.push(a), d && (a.prev = d, d.next = a), a.parent = e, this.lastNode = null;
        }, t;
      })()
    );
    u.DomHandler = r, u.default = r;
  })(Eu)), Eu;
}
var Q = {}, le = {}, eu = {}, Qu = {}, Se;
function zr() {
  return Se || (Se = 1, Object.defineProperty(Qu, "__esModule", { value: !0 }), Qu.default = new Uint16Array(
    // prettier-ignore
    'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(function(u) {
      return u.charCodeAt(0);
    })
  )), Qu;
}
var Ku = {}, Oe;
function Wr() {
  return Oe || (Oe = 1, Object.defineProperty(Ku, "__esModule", { value: !0 }), Ku.default = new Uint16Array(
    // prettier-ignore
    "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(u) {
      return u.charCodeAt(0);
    })
  )), Ku;
}
var de = {}, ke;
function Re() {
  return ke || (ke = 1, (function(u) {
    var o;
    Object.defineProperty(u, "__esModule", { value: !0 }), u.replaceCodePoint = u.fromCodePoint = void 0;
    var c = /* @__PURE__ */ new Map([
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
    ]);
    u.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    (o = String.fromCodePoint) !== null && o !== void 0 ? o : function(i) {
      var r = "";
      return i > 65535 && (i -= 65536, r += String.fromCharCode(i >>> 10 & 1023 | 55296), i = 56320 | i & 1023), r += String.fromCharCode(i), r;
    };
    function s(i) {
      var r;
      return i >= 55296 && i <= 57343 || i > 1114111 ? 65533 : (r = c.get(i)) !== null && r !== void 0 ? r : i;
    }
    u.replaceCodePoint = s;
    function g(i) {
      return (0, u.fromCodePoint)(s(i));
    }
    u.default = g;
  })(de)), de;
}
var Pe;
function Me() {
  return Pe || (Pe = 1, (function(u) {
    var o = eu && eu.__createBinding || (Object.create ? (function(v, L, F, S) {
      S === void 0 && (S = F);
      var b = Object.getOwnPropertyDescriptor(L, F);
      (!b || ("get" in b ? !L.__esModule : b.writable || b.configurable)) && (b = { enumerable: !0, get: function() {
        return L[F];
      } }), Object.defineProperty(v, S, b);
    }) : (function(v, L, F, S) {
      S === void 0 && (S = F), v[S] = L[F];
    })), c = eu && eu.__setModuleDefault || (Object.create ? (function(v, L) {
      Object.defineProperty(v, "default", { enumerable: !0, value: L });
    }) : function(v, L) {
      v.default = L;
    }), s = eu && eu.__importStar || function(v) {
      if (v && v.__esModule) return v;
      var L = {};
      if (v != null) for (var F in v) F !== "default" && Object.prototype.hasOwnProperty.call(v, F) && o(L, v, F);
      return c(L, v), L;
    }, g = eu && eu.__importDefault || function(v) {
      return v && v.__esModule ? v : { default: v };
    };
    Object.defineProperty(u, "__esModule", { value: !0 }), u.decodeXML = u.decodeHTMLStrict = u.decodeHTMLAttribute = u.decodeHTML = u.determineBranch = u.EntityDecoder = u.DecodingMode = u.BinTrieFlags = u.fromCodePoint = u.replaceCodePoint = u.decodeCodePoint = u.xmlDecodeTree = u.htmlDecodeTree = void 0;
    var i = g(/* @__PURE__ */ zr());
    u.htmlDecodeTree = i.default;
    var r = g(/* @__PURE__ */ Wr());
    u.xmlDecodeTree = r.default;
    var t = s(/* @__PURE__ */ Re());
    u.decodeCodePoint = t.default;
    var a = /* @__PURE__ */ Re();
    Object.defineProperty(u, "replaceCodePoint", { enumerable: !0, get: function() {
      return a.replaceCodePoint;
    } }), Object.defineProperty(u, "fromCodePoint", { enumerable: !0, get: function() {
      return a.fromCodePoint;
    } });
    var e;
    (function(v) {
      v[v.NUM = 35] = "NUM", v[v.SEMI = 59] = "SEMI", v[v.EQUALS = 61] = "EQUALS", v[v.ZERO = 48] = "ZERO", v[v.NINE = 57] = "NINE", v[v.LOWER_A = 97] = "LOWER_A", v[v.LOWER_F = 102] = "LOWER_F", v[v.LOWER_X = 120] = "LOWER_X", v[v.LOWER_Z = 122] = "LOWER_Z", v[v.UPPER_A = 65] = "UPPER_A", v[v.UPPER_F = 70] = "UPPER_F", v[v.UPPER_Z = 90] = "UPPER_Z";
    })(e || (e = {}));
    var d = 32, h;
    (function(v) {
      v[v.VALUE_LENGTH = 49152] = "VALUE_LENGTH", v[v.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", v[v.JUMP_TABLE = 127] = "JUMP_TABLE";
    })(h = u.BinTrieFlags || (u.BinTrieFlags = {}));
    function l(v) {
      return v >= e.ZERO && v <= e.NINE;
    }
    function f(v) {
      return v >= e.UPPER_A && v <= e.UPPER_F || v >= e.LOWER_A && v <= e.LOWER_F;
    }
    function n(v) {
      return v >= e.UPPER_A && v <= e.UPPER_Z || v >= e.LOWER_A && v <= e.LOWER_Z || l(v);
    }
    function m(v) {
      return v === e.EQUALS || n(v);
    }
    var x;
    (function(v) {
      v[v.EntityStart = 0] = "EntityStart", v[v.NumericStart = 1] = "NumericStart", v[v.NumericDecimal = 2] = "NumericDecimal", v[v.NumericHex = 3] = "NumericHex", v[v.NamedEntity = 4] = "NamedEntity";
    })(x || (x = {}));
    var N;
    (function(v) {
      v[v.Legacy = 0] = "Legacy", v[v.Strict = 1] = "Strict", v[v.Attribute = 2] = "Attribute";
    })(N = u.DecodingMode || (u.DecodingMode = {}));
    var q = (
      /** @class */
      (function() {
        function v(L, F, S) {
          this.decodeTree = L, this.emitCodePoint = F, this.errors = S, this.state = x.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = N.Strict;
        }
        return v.prototype.startEntity = function(L) {
          this.decodeMode = L, this.state = x.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
        }, v.prototype.write = function(L, F) {
          switch (this.state) {
            case x.EntityStart:
              return L.charCodeAt(F) === e.NUM ? (this.state = x.NumericStart, this.consumed += 1, this.stateNumericStart(L, F + 1)) : (this.state = x.NamedEntity, this.stateNamedEntity(L, F));
            case x.NumericStart:
              return this.stateNumericStart(L, F);
            case x.NumericDecimal:
              return this.stateNumericDecimal(L, F);
            case x.NumericHex:
              return this.stateNumericHex(L, F);
            case x.NamedEntity:
              return this.stateNamedEntity(L, F);
          }
        }, v.prototype.stateNumericStart = function(L, F) {
          return F >= L.length ? -1 : (L.charCodeAt(F) | d) === e.LOWER_X ? (this.state = x.NumericHex, this.consumed += 1, this.stateNumericHex(L, F + 1)) : (this.state = x.NumericDecimal, this.stateNumericDecimal(L, F));
        }, v.prototype.addToNumericResult = function(L, F, S, b) {
          if (F !== S) {
            var E = S - F;
            this.result = this.result * Math.pow(b, E) + parseInt(L.substr(F, E), b), this.consumed += E;
          }
        }, v.prototype.stateNumericHex = function(L, F) {
          for (var S = F; F < L.length; ) {
            var b = L.charCodeAt(F);
            if (l(b) || f(b))
              F += 1;
            else
              return this.addToNumericResult(L, S, F, 16), this.emitNumericEntity(b, 3);
          }
          return this.addToNumericResult(L, S, F, 16), -1;
        }, v.prototype.stateNumericDecimal = function(L, F) {
          for (var S = F; F < L.length; ) {
            var b = L.charCodeAt(F);
            if (l(b))
              F += 1;
            else
              return this.addToNumericResult(L, S, F, 10), this.emitNumericEntity(b, 2);
          }
          return this.addToNumericResult(L, S, F, 10), -1;
        }, v.prototype.emitNumericEntity = function(L, F) {
          var S;
          if (this.consumed <= F)
            return (S = this.errors) === null || S === void 0 || S.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
          if (L === e.SEMI)
            this.consumed += 1;
          else if (this.decodeMode === N.Strict)
            return 0;
          return this.emitCodePoint((0, t.replaceCodePoint)(this.result), this.consumed), this.errors && (L !== e.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
        }, v.prototype.stateNamedEntity = function(L, F) {
          for (var S = this.decodeTree, b = S[this.treeIndex], E = (b & h.VALUE_LENGTH) >> 14; F < L.length; F++, this.excess++) {
            var w = L.charCodeAt(F);
            if (this.treeIndex = D(S, b, this.treeIndex + Math.max(1, E), w), this.treeIndex < 0)
              return this.result === 0 || // If we are parsing an attribute
              this.decodeMode === N.Attribute && // We shouldn't have consumed any characters after the entity,
              (E === 0 || // And there should be no invalid characters.
              m(w)) ? 0 : this.emitNotTerminatedNamedEntity();
            if (b = S[this.treeIndex], E = (b & h.VALUE_LENGTH) >> 14, E !== 0) {
              if (w === e.SEMI)
                return this.emitNamedEntityData(this.treeIndex, E, this.consumed + this.excess);
              this.decodeMode !== N.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
            }
          }
          return -1;
        }, v.prototype.emitNotTerminatedNamedEntity = function() {
          var L, F = this, S = F.result, b = F.decodeTree, E = (b[S] & h.VALUE_LENGTH) >> 14;
          return this.emitNamedEntityData(S, E, this.consumed), (L = this.errors) === null || L === void 0 || L.missingSemicolonAfterCharacterReference(), this.consumed;
        }, v.prototype.emitNamedEntityData = function(L, F, S) {
          var b = this.decodeTree;
          return this.emitCodePoint(F === 1 ? b[L] & ~h.VALUE_LENGTH : b[L + 1], S), F === 3 && this.emitCodePoint(b[L + 2], S), S;
        }, v.prototype.end = function() {
          var L;
          switch (this.state) {
            case x.NamedEntity:
              return this.result !== 0 && (this.decodeMode !== N.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
            // Otherwise, emit a numeric entity if we have one.
            case x.NumericDecimal:
              return this.emitNumericEntity(0, 2);
            case x.NumericHex:
              return this.emitNumericEntity(0, 3);
            case x.NumericStart:
              return (L = this.errors) === null || L === void 0 || L.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
            case x.EntityStart:
              return 0;
          }
        }, v;
      })()
    );
    u.EntityDecoder = q;
    function y(v) {
      var L = "", F = new q(v, function(S) {
        return L += (0, t.fromCodePoint)(S);
      });
      return function(b, E) {
        for (var w = 0, T = 0; (T = b.indexOf("&", T)) >= 0; ) {
          L += b.slice(w, T), F.startEntity(E);
          var B = F.write(
            b,
            // Skip the "&"
            T + 1
          );
          if (B < 0) {
            w = T + F.end();
            break;
          }
          w = T + B, T = B === 0 ? w + 1 : w;
        }
        var O = L + b.slice(w);
        return L = "", O;
      };
    }
    function D(v, L, F, S) {
      var b = (L & h.BRANCH_LENGTH) >> 7, E = L & h.JUMP_TABLE;
      if (b === 0)
        return E !== 0 && S === E ? F : -1;
      if (E) {
        var w = S - E;
        return w < 0 || w >= b ? -1 : v[F + w] - 1;
      }
      for (var T = F, B = T + b - 1; T <= B; ) {
        var O = T + B >>> 1, R = v[O];
        if (R < S)
          T = O + 1;
        else if (R > S)
          B = O - 1;
        else
          return v[O + b];
      }
      return -1;
    }
    u.determineBranch = D;
    var p = y(i.default), A = y(r.default);
    function C(v, L) {
      return L === void 0 && (L = N.Legacy), p(v, L);
    }
    u.decodeHTML = C;
    function _(v) {
      return p(v, N.Attribute);
    }
    u.decodeHTMLAttribute = _;
    function k(v) {
      return p(v, N.Strict);
    }
    u.decodeHTMLStrict = k;
    function j(v) {
      return A(v, N.Strict);
    }
    u.decodeXML = j;
  })(eu)), eu;
}
var ou = {}, $u = {}, je;
function Jr() {
  if (je) return $u;
  je = 1, Object.defineProperty($u, "__esModule", { value: !0 });
  function u(o) {
    for (var c = 1; c < o.length; c++)
      o[c][0] += o[c - 1][0] + 1;
    return o;
  }
  return $u.default = new Map(/* @__PURE__ */ u([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ u([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ u([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ u([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]])), $u;
}
var fe = {}, He;
function me() {
  return He || (He = 1, (function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.escapeText = u.escapeAttribute = u.escapeUTF8 = u.escape = u.encodeXML = u.getCodePoint = u.xmlReplacer = void 0, u.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
    var o = /* @__PURE__ */ new Map([
      [34, "&quot;"],
      [38, "&amp;"],
      [39, "&apos;"],
      [60, "&lt;"],
      [62, "&gt;"]
    ]);
    u.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? function(g, i) {
      return g.codePointAt(i);
    } : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(g, i) {
        return (g.charCodeAt(i) & 64512) === 55296 ? (g.charCodeAt(i) - 55296) * 1024 + g.charCodeAt(i + 1) - 56320 + 65536 : g.charCodeAt(i);
      }
    );
    function c(g) {
      for (var i = "", r = 0, t; (t = u.xmlReplacer.exec(g)) !== null; ) {
        var a = t.index, e = g.charCodeAt(a), d = o.get(e);
        d !== void 0 ? (i += g.substring(r, a) + d, r = a + 1) : (i += "".concat(g.substring(r, a), "&#x").concat((0, u.getCodePoint)(g, a).toString(16), ";"), r = u.xmlReplacer.lastIndex += +((e & 64512) === 55296));
      }
      return i + g.substr(r);
    }
    u.encodeXML = c, u.escape = c;
    function s(g, i) {
      return function(t) {
        for (var a, e = 0, d = ""; a = g.exec(t); )
          e !== a.index && (d += t.substring(e, a.index)), d += i.get(a[0].charCodeAt(0)), e = a.index + 1;
        return d + t.substring(e);
      };
    }
    u.escapeUTF8 = s(/[&<>'"]/g, o), u.escapeAttribute = s(/["&\u00A0]/g, /* @__PURE__ */ new Map([
      [34, "&quot;"],
      [38, "&amp;"],
      [160, "&nbsp;"]
    ])), u.escapeText = s(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [160, "&nbsp;"]
    ]));
  })(fe)), fe;
}
var Ue;
function Ve() {
  if (Ue) return ou;
  Ue = 1;
  var u = ou && ou.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(ou, "__esModule", { value: !0 }), ou.encodeNonAsciiHTML = ou.encodeHTML = void 0;
  var o = u(/* @__PURE__ */ Jr()), c = /* @__PURE__ */ me(), s = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
  function g(t) {
    return r(s, t);
  }
  ou.encodeHTML = g;
  function i(t) {
    return r(c.xmlReplacer, t);
  }
  ou.encodeNonAsciiHTML = i;
  function r(t, a) {
    for (var e = "", d = 0, h; (h = t.exec(a)) !== null; ) {
      var l = h.index;
      e += a.substring(d, l);
      var f = a.charCodeAt(l), n = o.default.get(f);
      if (typeof n == "object") {
        if (l + 1 < a.length) {
          var m = a.charCodeAt(l + 1), x = typeof n.n == "number" ? n.n === m ? n.o : void 0 : n.n.get(m);
          if (x !== void 0) {
            e += x, d = t.lastIndex += 1;
            continue;
          }
        }
        n = n.v;
      }
      if (n !== void 0)
        e += n, d = l + 1;
      else {
        var N = (0, c.getCodePoint)(a, l);
        e += "&#x".concat(N.toString(16), ";"), d = t.lastIndex += +(N !== f);
      }
    }
    return e + a.substr(d);
  }
  return ou;
}
var Ie;
function Zr() {
  return Ie || (Ie = 1, (function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.decodeXMLStrict = u.decodeHTML5Strict = u.decodeHTML4Strict = u.decodeHTML5 = u.decodeHTML4 = u.decodeHTMLAttribute = u.decodeHTMLStrict = u.decodeHTML = u.decodeXML = u.DecodingMode = u.EntityDecoder = u.encodeHTML5 = u.encodeHTML4 = u.encodeNonAsciiHTML = u.encodeHTML = u.escapeText = u.escapeAttribute = u.escapeUTF8 = u.escape = u.encodeXML = u.encode = u.decodeStrict = u.decode = u.EncodingMode = u.EntityLevel = void 0;
    var o = /* @__PURE__ */ Me(), c = /* @__PURE__ */ Ve(), s = /* @__PURE__ */ me(), g;
    (function(l) {
      l[l.XML = 0] = "XML", l[l.HTML = 1] = "HTML";
    })(g = u.EntityLevel || (u.EntityLevel = {}));
    var i;
    (function(l) {
      l[l.UTF8 = 0] = "UTF8", l[l.ASCII = 1] = "ASCII", l[l.Extensive = 2] = "Extensive", l[l.Attribute = 3] = "Attribute", l[l.Text = 4] = "Text";
    })(i = u.EncodingMode || (u.EncodingMode = {}));
    function r(l, f) {
      f === void 0 && (f = g.XML);
      var n = typeof f == "number" ? f : f.level;
      if (n === g.HTML) {
        var m = typeof f == "object" ? f.mode : void 0;
        return (0, o.decodeHTML)(l, m);
      }
      return (0, o.decodeXML)(l);
    }
    u.decode = r;
    function t(l, f) {
      var n;
      f === void 0 && (f = g.XML);
      var m = typeof f == "number" ? { level: f } : f;
      return (n = m.mode) !== null && n !== void 0 || (m.mode = o.DecodingMode.Strict), r(l, m);
    }
    u.decodeStrict = t;
    function a(l, f) {
      f === void 0 && (f = g.XML);
      var n = typeof f == "number" ? { level: f } : f;
      return n.mode === i.UTF8 ? (0, s.escapeUTF8)(l) : n.mode === i.Attribute ? (0, s.escapeAttribute)(l) : n.mode === i.Text ? (0, s.escapeText)(l) : n.level === g.HTML ? n.mode === i.ASCII ? (0, c.encodeNonAsciiHTML)(l) : (0, c.encodeHTML)(l) : (0, s.encodeXML)(l);
    }
    u.encode = a;
    var e = /* @__PURE__ */ me();
    Object.defineProperty(u, "encodeXML", { enumerable: !0, get: function() {
      return e.encodeXML;
    } }), Object.defineProperty(u, "escape", { enumerable: !0, get: function() {
      return e.escape;
    } }), Object.defineProperty(u, "escapeUTF8", { enumerable: !0, get: function() {
      return e.escapeUTF8;
    } }), Object.defineProperty(u, "escapeAttribute", { enumerable: !0, get: function() {
      return e.escapeAttribute;
    } }), Object.defineProperty(u, "escapeText", { enumerable: !0, get: function() {
      return e.escapeText;
    } });
    var d = /* @__PURE__ */ Ve();
    Object.defineProperty(u, "encodeHTML", { enumerable: !0, get: function() {
      return d.encodeHTML;
    } }), Object.defineProperty(u, "encodeNonAsciiHTML", { enumerable: !0, get: function() {
      return d.encodeNonAsciiHTML;
    } }), Object.defineProperty(u, "encodeHTML4", { enumerable: !0, get: function() {
      return d.encodeHTML;
    } }), Object.defineProperty(u, "encodeHTML5", { enumerable: !0, get: function() {
      return d.encodeHTML;
    } });
    var h = /* @__PURE__ */ Me();
    Object.defineProperty(u, "EntityDecoder", { enumerable: !0, get: function() {
      return h.EntityDecoder;
    } }), Object.defineProperty(u, "DecodingMode", { enumerable: !0, get: function() {
      return h.DecodingMode;
    } }), Object.defineProperty(u, "decodeXML", { enumerable: !0, get: function() {
      return h.decodeXML;
    } }), Object.defineProperty(u, "decodeHTML", { enumerable: !0, get: function() {
      return h.decodeHTML;
    } }), Object.defineProperty(u, "decodeHTMLStrict", { enumerable: !0, get: function() {
      return h.decodeHTMLStrict;
    } }), Object.defineProperty(u, "decodeHTMLAttribute", { enumerable: !0, get: function() {
      return h.decodeHTMLAttribute;
    } }), Object.defineProperty(u, "decodeHTML4", { enumerable: !0, get: function() {
      return h.decodeHTML;
    } }), Object.defineProperty(u, "decodeHTML5", { enumerable: !0, get: function() {
      return h.decodeHTML;
    } }), Object.defineProperty(u, "decodeHTML4Strict", { enumerable: !0, get: function() {
      return h.decodeHTMLStrict;
    } }), Object.defineProperty(u, "decodeHTML5Strict", { enumerable: !0, get: function() {
      return h.decodeHTMLStrict;
    } }), Object.defineProperty(u, "decodeXMLStrict", { enumerable: !0, get: function() {
      return h.decodeXML;
    } });
  })(le)), le;
}
var yu = {}, Ge;
function Xr() {
  return Ge || (Ge = 1, Object.defineProperty(yu, "__esModule", { value: !0 }), yu.attributeNames = yu.elementNames = void 0, yu.elementNames = new Map([
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
  ].map(function(u) {
    return [u.toLowerCase(), u];
  })), yu.attributeNames = new Map([
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
  ].map(function(u) {
    return [u.toLowerCase(), u];
  }))), yu;
}
var ze;
function Yr() {
  if (ze) return Q;
  ze = 1;
  var u = Q && Q.__assign || function() {
    return u = Object.assign || function(D) {
      for (var p, A = 1, C = arguments.length; A < C; A++) {
        p = arguments[A];
        for (var _ in p) Object.prototype.hasOwnProperty.call(p, _) && (D[_] = p[_]);
      }
      return D;
    }, u.apply(this, arguments);
  }, o = Q && Q.__createBinding || (Object.create ? (function(D, p, A, C) {
    C === void 0 && (C = A);
    var _ = Object.getOwnPropertyDescriptor(p, A);
    (!_ || ("get" in _ ? !p.__esModule : _.writable || _.configurable)) && (_ = { enumerable: !0, get: function() {
      return p[A];
    } }), Object.defineProperty(D, C, _);
  }) : (function(D, p, A, C) {
    C === void 0 && (C = A), D[C] = p[A];
  })), c = Q && Q.__setModuleDefault || (Object.create ? (function(D, p) {
    Object.defineProperty(D, "default", { enumerable: !0, value: p });
  }) : function(D, p) {
    D.default = p;
  }), s = Q && Q.__importStar || function(D) {
    if (D && D.__esModule) return D;
    var p = {};
    if (D != null) for (var A in D) A !== "default" && Object.prototype.hasOwnProperty.call(D, A) && o(p, D, A);
    return c(p, D), p;
  };
  Object.defineProperty(Q, "__esModule", { value: !0 }), Q.render = void 0;
  var g = s(/* @__PURE__ */ ie()), i = /* @__PURE__ */ Zr(), r = /* @__PURE__ */ Xr(), t = /* @__PURE__ */ new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
  ]);
  function a(D) {
    return D.replace(/"/g, "&quot;");
  }
  function e(D, p) {
    var A;
    if (D) {
      var C = ((A = p.encodeEntities) !== null && A !== void 0 ? A : p.decodeEntities) === !1 ? a : p.xmlMode || p.encodeEntities !== "utf8" ? i.encodeXML : i.escapeAttribute;
      return Object.keys(D).map(function(_) {
        var k, j, v = (k = D[_]) !== null && k !== void 0 ? k : "";
        return p.xmlMode === "foreign" && (_ = (j = r.attributeNames.get(_)) !== null && j !== void 0 ? j : _), !p.emptyAttrs && !p.xmlMode && v === "" ? _ : "".concat(_, '="').concat(C(v), '"');
      }).join(" ");
    }
  }
  var d = /* @__PURE__ */ new Set([
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
  function h(D, p) {
    p === void 0 && (p = {});
    for (var A = ("length" in D) ? D : [D], C = "", _ = 0; _ < A.length; _++)
      C += l(A[_], p);
    return C;
  }
  Q.render = h, Q.default = h;
  function l(D, p) {
    switch (D.type) {
      case g.Root:
        return h(D.children, p);
      // @ts-expect-error We don't use `Doctype` yet
      case g.Doctype:
      case g.Directive:
        return x(D);
      case g.Comment:
        return y(D);
      case g.CDATA:
        return q(D);
      case g.Script:
      case g.Style:
      case g.Tag:
        return m(D, p);
      case g.Text:
        return N(D, p);
    }
  }
  var f = /* @__PURE__ */ new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
  ]), n = /* @__PURE__ */ new Set(["svg", "math"]);
  function m(D, p) {
    var A;
    p.xmlMode === "foreign" && (D.name = (A = r.elementNames.get(D.name)) !== null && A !== void 0 ? A : D.name, D.parent && f.has(D.parent.name) && (p = u(u({}, p), { xmlMode: !1 }))), !p.xmlMode && n.has(D.name) && (p = u(u({}, p), { xmlMode: "foreign" }));
    var C = "<".concat(D.name), _ = e(D.attribs, p);
    return _ && (C += " ".concat(_)), D.children.length === 0 && (p.xmlMode ? (
      // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
      p.selfClosingTags !== !1
    ) : (
      // User explicitly asked for self-closing tags, even in HTML mode
      p.selfClosingTags && d.has(D.name)
    )) ? (p.xmlMode || (C += " "), C += "/>") : (C += ">", D.children.length > 0 && (C += h(D.children, p)), (p.xmlMode || !d.has(D.name)) && (C += "</".concat(D.name, ">"))), C;
  }
  function x(D) {
    return "<".concat(D.data, ">");
  }
  function N(D, p) {
    var A, C = D.data || "";
    return ((A = p.encodeEntities) !== null && A !== void 0 ? A : p.decodeEntities) !== !1 && !(!p.xmlMode && D.parent && t.has(D.parent.name)) && (C = p.xmlMode || p.encodeEntities !== "utf8" ? (0, i.encodeXML)(C) : (0, i.escapeText)(C)), C;
  }
  function q(D) {
    return "<![CDATA[".concat(D.children[0].data, "]]>");
  }
  function y(D) {
    return "<!--".concat(D.data, "-->");
  }
  return Q;
}
var We;
function Fr() {
  if (We) return au;
  We = 1;
  var u = au && au.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(au, "__esModule", { value: !0 }), au.getOuterHTML = g, au.getInnerHTML = i, au.getText = r, au.textContent = t, au.innerText = a;
  var o = /* @__PURE__ */ Ou(), c = u(/* @__PURE__ */ Yr()), s = /* @__PURE__ */ ie();
  function g(e, d) {
    return (0, c.default)(e, d);
  }
  function i(e, d) {
    return (0, o.hasChildren)(e) ? e.children.map(function(h) {
      return g(h, d);
    }).join("") : "";
  }
  function r(e) {
    return Array.isArray(e) ? e.map(r).join("") : (0, o.isTag)(e) ? e.name === "br" ? `
` : r(e.children) : (0, o.isCDATA)(e) ? r(e.children) : (0, o.isText)(e) ? e.data : "";
  }
  function t(e) {
    return Array.isArray(e) ? e.map(t).join("") : (0, o.hasChildren)(e) && !(0, o.isComment)(e) ? t(e.children) : (0, o.isText)(e) ? e.data : "";
  }
  function a(e) {
    return Array.isArray(e) ? e.map(a).join("") : (0, o.hasChildren)(e) && (e.type === s.ElementType.Tag || (0, o.isCDATA)(e)) ? a(e.children) : (0, o.isText)(e) ? e.data : "";
  }
  return au;
}
var ru = {}, Je;
function Qr() {
  if (Je) return ru;
  Je = 1, Object.defineProperty(ru, "__esModule", { value: !0 }), ru.getChildren = o, ru.getParent = c, ru.getSiblings = s, ru.getAttributeValue = g, ru.hasAttrib = i, ru.getName = r, ru.nextElementSibling = t, ru.prevElementSibling = a;
  var u = /* @__PURE__ */ Ou();
  function o(e) {
    return (0, u.hasChildren)(e) ? e.children : [];
  }
  function c(e) {
    return e.parent || null;
  }
  function s(e) {
    var d, h, l = c(e);
    if (l != null)
      return o(l);
    for (var f = [e], n = e.prev, m = e.next; n != null; )
      f.unshift(n), d = n, n = d.prev;
    for (; m != null; )
      f.push(m), h = m, m = h.next;
    return f;
  }
  function g(e, d) {
    var h;
    return (h = e.attribs) === null || h === void 0 ? void 0 : h[d];
  }
  function i(e, d) {
    return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, d) && e.attribs[d] != null;
  }
  function r(e) {
    return e.name;
  }
  function t(e) {
    for (var d, h = e.next; h !== null && !(0, u.isTag)(h); )
      d = h, h = d.next;
    return h;
  }
  function a(e) {
    for (var d, h = e.prev; h !== null && !(0, u.isTag)(h); )
      d = h, h = d.prev;
    return h;
  }
  return ru;
}
var su = {}, Ze;
function Kr() {
  if (Ze) return su;
  Ze = 1, Object.defineProperty(su, "__esModule", { value: !0 }), su.removeElement = u, su.replaceElement = o, su.appendChild = c, su.append = s, su.prependChild = g, su.prepend = i;
  function u(r) {
    if (r.prev && (r.prev.next = r.next), r.next && (r.next.prev = r.prev), r.parent) {
      var t = r.parent.children, a = t.lastIndexOf(r);
      a >= 0 && t.splice(a, 1);
    }
    r.next = null, r.prev = null, r.parent = null;
  }
  function o(r, t) {
    var a = t.prev = r.prev;
    a && (a.next = t);
    var e = t.next = r.next;
    e && (e.prev = t);
    var d = t.parent = r.parent;
    if (d) {
      var h = d.children;
      h[h.lastIndexOf(r)] = t, r.parent = null;
    }
  }
  function c(r, t) {
    if (u(t), t.next = null, t.parent = r, r.children.push(t) > 1) {
      var a = r.children[r.children.length - 2];
      a.next = t, t.prev = a;
    } else
      t.prev = null;
  }
  function s(r, t) {
    u(t);
    var a = r.parent, e = r.next;
    if (t.next = e, t.prev = r, r.next = t, t.parent = a, e) {
      if (e.prev = t, a) {
        var d = a.children;
        d.splice(d.lastIndexOf(e), 0, t);
      }
    } else a && a.children.push(t);
  }
  function g(r, t) {
    if (u(t), t.parent = r, t.prev = null, r.children.unshift(t) !== 1) {
      var a = r.children[1];
      a.prev = t, t.next = a;
    } else
      t.next = null;
  }
  function i(r, t) {
    u(t);
    var a = r.parent;
    if (a) {
      var e = a.children;
      e.splice(e.indexOf(r), 0, t);
    }
    r.prev && (r.prev.next = t), t.parent = a, t.prev = r.prev, t.next = r, r.prev = t;
  }
  return su;
}
var lu = {}, Xe;
function Nr() {
  if (Xe) return lu;
  Xe = 1, Object.defineProperty(lu, "__esModule", { value: !0 }), lu.filter = o, lu.find = c, lu.findOneChild = s, lu.findOne = g, lu.existsOne = i, lu.findAll = r;
  var u = /* @__PURE__ */ Ou();
  function o(t, a, e, d) {
    return e === void 0 && (e = !0), d === void 0 && (d = 1 / 0), c(t, Array.isArray(a) ? a : [a], e, d);
  }
  function c(t, a, e, d) {
    for (var h = [], l = [Array.isArray(a) ? a : [a]], f = [0]; ; ) {
      if (f[0] >= l[0].length) {
        if (f.length === 1)
          return h;
        l.shift(), f.shift();
        continue;
      }
      var n = l[0][f[0]++];
      if (t(n) && (h.push(n), --d <= 0))
        return h;
      e && (0, u.hasChildren)(n) && n.children.length > 0 && (f.unshift(0), l.unshift(n.children));
    }
  }
  function s(t, a) {
    return a.find(t);
  }
  function g(t, a, e) {
    e === void 0 && (e = !0);
    for (var d = Array.isArray(a) ? a : [a], h = 0; h < d.length; h++) {
      var l = d[h];
      if ((0, u.isTag)(l) && t(l))
        return l;
      if (e && (0, u.hasChildren)(l) && l.children.length > 0) {
        var f = g(t, l.children, !0);
        if (f)
          return f;
      }
    }
    return null;
  }
  function i(t, a) {
    return (Array.isArray(a) ? a : [a]).some(function(e) {
      return (0, u.isTag)(e) && t(e) || (0, u.hasChildren)(e) && i(t, e.children);
    });
  }
  function r(t, a) {
    for (var e = [], d = [Array.isArray(a) ? a : [a]], h = [0]; ; ) {
      if (h[0] >= d[0].length) {
        if (d.length === 1)
          return e;
        d.shift(), h.shift();
        continue;
      }
      var l = d[0][h[0]++];
      (0, u.isTag)(l) && t(l) && e.push(l), (0, u.hasChildren)(l) && l.children.length > 0 && (h.unshift(0), d.unshift(l.children));
    }
  }
  return lu;
}
var du = {}, Ye;
function Lr() {
  if (Ye) return du;
  Ye = 1, Object.defineProperty(du, "__esModule", { value: !0 }), du.testElement = r, du.getElements = t, du.getElementById = a, du.getElementsByTagName = e, du.getElementsByClassName = d, du.getElementsByTagType = h;
  var u = /* @__PURE__ */ Ou(), o = /* @__PURE__ */ Nr(), c = {
    tag_name: function(l) {
      return typeof l == "function" ? function(f) {
        return (0, u.isTag)(f) && l(f.name);
      } : l === "*" ? u.isTag : function(f) {
        return (0, u.isTag)(f) && f.name === l;
      };
    },
    tag_type: function(l) {
      return typeof l == "function" ? function(f) {
        return l(f.type);
      } : function(f) {
        return f.type === l;
      };
    },
    tag_contains: function(l) {
      return typeof l == "function" ? function(f) {
        return (0, u.isText)(f) && l(f.data);
      } : function(f) {
        return (0, u.isText)(f) && f.data === l;
      };
    }
  };
  function s(l, f) {
    return typeof f == "function" ? function(n) {
      return (0, u.isTag)(n) && f(n.attribs[l]);
    } : function(n) {
      return (0, u.isTag)(n) && n.attribs[l] === f;
    };
  }
  function g(l, f) {
    return function(n) {
      return l(n) || f(n);
    };
  }
  function i(l) {
    var f = Object.keys(l).map(function(n) {
      var m = l[n];
      return Object.prototype.hasOwnProperty.call(c, n) ? c[n](m) : s(n, m);
    });
    return f.length === 0 ? null : f.reduce(g);
  }
  function r(l, f) {
    var n = i(l);
    return n ? n(f) : !0;
  }
  function t(l, f, n, m) {
    m === void 0 && (m = 1 / 0);
    var x = i(l);
    return x ? (0, o.filter)(x, f, n, m) : [];
  }
  function a(l, f, n) {
    return n === void 0 && (n = !0), Array.isArray(f) || (f = [f]), (0, o.findOne)(s("id", l), f, n);
  }
  function e(l, f, n, m) {
    return n === void 0 && (n = !0), m === void 0 && (m = 1 / 0), (0, o.filter)(c.tag_name(l), f, n, m);
  }
  function d(l, f, n, m) {
    return n === void 0 && (n = !0), m === void 0 && (m = 1 / 0), (0, o.filter)(s("class", l), f, n, m);
  }
  function h(l, f, n, m) {
    return n === void 0 && (n = !0), m === void 0 && (m = 1 / 0), (0, o.filter)(c.tag_type(l), f, n, m);
  }
  return du;
}
var gu = {}, Qe;
function $r() {
  if (Qe) return gu;
  Qe = 1, Object.defineProperty(gu, "__esModule", { value: !0 }), gu.DocumentPosition = void 0, gu.removeSubsets = o, gu.compareDocumentPosition = s, gu.uniqueSort = g;
  var u = /* @__PURE__ */ Ou();
  function o(i) {
    for (var r = i.length; --r >= 0; ) {
      var t = i[r];
      if (r > 0 && i.lastIndexOf(t, r - 1) >= 0) {
        i.splice(r, 1);
        continue;
      }
      for (var a = t.parent; a; a = a.parent)
        if (i.includes(a)) {
          i.splice(r, 1);
          break;
        }
    }
    return i;
  }
  var c;
  (function(i) {
    i[i.DISCONNECTED = 1] = "DISCONNECTED", i[i.PRECEDING = 2] = "PRECEDING", i[i.FOLLOWING = 4] = "FOLLOWING", i[i.CONTAINS = 8] = "CONTAINS", i[i.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(c || (gu.DocumentPosition = c = {}));
  function s(i, r) {
    var t = [], a = [];
    if (i === r)
      return 0;
    for (var e = (0, u.hasChildren)(i) ? i : i.parent; e; )
      t.unshift(e), e = e.parent;
    for (e = (0, u.hasChildren)(r) ? r : r.parent; e; )
      a.unshift(e), e = e.parent;
    for (var d = Math.min(t.length, a.length), h = 0; h < d && t[h] === a[h]; )
      h++;
    if (h === 0)
      return c.DISCONNECTED;
    var l = t[h - 1], f = l.children, n = t[h], m = a[h];
    return f.indexOf(n) > f.indexOf(m) ? l === r ? c.FOLLOWING | c.CONTAINED_BY : c.FOLLOWING : l === i ? c.PRECEDING | c.CONTAINS : c.PRECEDING;
  }
  function g(i) {
    return i = i.filter(function(r, t, a) {
      return !a.includes(r, t + 1);
    }), i.sort(function(r, t) {
      var a = s(r, t);
      return a & c.PRECEDING ? -1 : a & c.FOLLOWING ? 1 : 0;
    }), i;
  }
  return gu;
}
var ue = {}, Ke;
function ut() {
  if (Ke) return ue;
  Ke = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.getFeed = c;
  var u = /* @__PURE__ */ Fr(), o = /* @__PURE__ */ Lr();
  function c(l) {
    var f = a(h, l);
    return f ? f.name === "feed" ? s(f) : g(f) : null;
  }
  function s(l) {
    var f, n = l.children, m = {
      type: "atom",
      items: (0, o.getElementsByTagName)("entry", n).map(function(q) {
        var y, D = q.children, p = { media: t(D) };
        d(p, "id", "id", D), d(p, "title", "title", D);
        var A = (y = a("link", D)) === null || y === void 0 ? void 0 : y.attribs.href;
        A && (p.link = A);
        var C = e("summary", D) || e("content", D);
        C && (p.description = C);
        var _ = e("updated", D);
        return _ && (p.pubDate = new Date(_)), p;
      })
    };
    d(m, "id", "id", n), d(m, "title", "title", n);
    var x = (f = a("link", n)) === null || f === void 0 ? void 0 : f.attribs.href;
    x && (m.link = x), d(m, "description", "subtitle", n);
    var N = e("updated", n);
    return N && (m.updated = new Date(N)), d(m, "author", "email", n, !0), m;
  }
  function g(l) {
    var f, n, m = (n = (f = a("channel", l.children)) === null || f === void 0 ? void 0 : f.children) !== null && n !== void 0 ? n : [], x = {
      type: l.name.substr(0, 3),
      id: "",
      items: (0, o.getElementsByTagName)("item", l.children).map(function(q) {
        var y = q.children, D = { media: t(y) };
        d(D, "id", "guid", y), d(D, "title", "title", y), d(D, "link", "link", y), d(D, "description", "description", y);
        var p = e("pubDate", y) || e("dc:date", y);
        return p && (D.pubDate = new Date(p)), D;
      })
    };
    d(x, "title", "title", m), d(x, "link", "link", m), d(x, "description", "description", m);
    var N = e("lastBuildDate", m);
    return N && (x.updated = new Date(N)), d(x, "author", "managingEditor", m, !0), x;
  }
  var i = ["url", "type", "lang"], r = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width"
  ];
  function t(l) {
    return (0, o.getElementsByTagName)("media:content", l).map(function(f) {
      for (var n = f.attribs, m = {
        medium: n.medium,
        isDefault: !!n.isDefault
      }, x = 0, N = i; x < N.length; x++) {
        var q = N[x];
        n[q] && (m[q] = n[q]);
      }
      for (var y = 0, D = r; y < D.length; y++) {
        var q = D[y];
        n[q] && (m[q] = parseInt(n[q], 10));
      }
      return n.expression && (m.expression = n.expression), m;
    });
  }
  function a(l, f) {
    return (0, o.getElementsByTagName)(l, f, !0, 1)[0];
  }
  function e(l, f, n) {
    return n === void 0 && (n = !1), (0, u.textContent)((0, o.getElementsByTagName)(l, f, n, 1)).trim();
  }
  function d(l, f, n, m, x) {
    x === void 0 && (x = !1);
    var N = e(n, m, x);
    N && (l[f] = N);
  }
  function h(l) {
    return l === "rss" || l === "feed" || l === "rdf:RDF";
  }
  return ue;
}
var $e;
function et() {
  return $e || ($e = 1, (function(u) {
    var o = vu && vu.__createBinding || (Object.create ? (function(g, i, r, t) {
      t === void 0 && (t = r);
      var a = Object.getOwnPropertyDescriptor(i, r);
      (!a || ("get" in a ? !i.__esModule : a.writable || a.configurable)) && (a = { enumerable: !0, get: function() {
        return i[r];
      } }), Object.defineProperty(g, t, a);
    }) : (function(g, i, r, t) {
      t === void 0 && (t = r), g[t] = i[r];
    })), c = vu && vu.__exportStar || function(g, i) {
      for (var r in g) r !== "default" && !Object.prototype.hasOwnProperty.call(i, r) && o(i, g, r);
    };
    Object.defineProperty(u, "__esModule", { value: !0 }), u.hasChildren = u.isDocument = u.isComment = u.isText = u.isCDATA = u.isTag = void 0, c(/* @__PURE__ */ Fr(), u), c(/* @__PURE__ */ Qr(), u), c(/* @__PURE__ */ Kr(), u), c(/* @__PURE__ */ Nr(), u), c(/* @__PURE__ */ Lr(), u), c(/* @__PURE__ */ $r(), u), c(/* @__PURE__ */ ut(), u);
    var s = /* @__PURE__ */ Ou();
    Object.defineProperty(u, "isTag", { enumerable: !0, get: function() {
      return s.isTag;
    } }), Object.defineProperty(u, "isCDATA", { enumerable: !0, get: function() {
      return s.isCDATA;
    } }), Object.defineProperty(u, "isText", { enumerable: !0, get: function() {
      return s.isText;
    } }), Object.defineProperty(u, "isComment", { enumerable: !0, get: function() {
      return s.isComment;
    } }), Object.defineProperty(u, "isDocument", { enumerable: !0, get: function() {
      return s.isDocument;
    } }), Object.defineProperty(u, "hasChildren", { enumerable: !0, get: function() {
      return s.hasChildren;
    } });
  })(vu)), vu;
}
var pe, ur;
function ku() {
  return ur || (ur = 1, pe = {
    trueFunc: function() {
      return !0;
    },
    falseFunc: function() {
      return !1;
    }
  }), pe;
}
var J = {}, H;
(function(u) {
  u.Attribute = "attribute", u.Pseudo = "pseudo", u.PseudoElement = "pseudo-element", u.Tag = "tag", u.Universal = "universal", u.Adjacent = "adjacent", u.Child = "child", u.Descendant = "descendant", u.Parent = "parent", u.Sibling = "sibling", u.ColumnCombinator = "column-combinator";
})(H || (H = {}));
const rt = {
  Unknown: null,
  QuirksMode: "quirks",
  IgnoreCase: !0,
  CaseSensitive: !1
};
var I;
(function(u) {
  u.Any = "any", u.Element = "element", u.End = "end", u.Equals = "equals", u.Exists = "exists", u.Hyphen = "hyphen", u.Not = "not", u.Start = "start";
})(I || (I = {}));
const er = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, tt = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, at = /* @__PURE__ */ new Map([
  [126, I.Element],
  [94, I.Start],
  [36, I.End],
  [42, I.Any],
  [33, I.Not],
  [124, I.Hyphen]
]), nt = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function _r(u) {
  switch (u.type) {
    case H.Adjacent:
    case H.Child:
    case H.Descendant:
    case H.Parent:
    case H.Sibling:
    case H.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const it = /* @__PURE__ */ new Set(["contains", "icontains"]);
function ct(u, o, c) {
  const s = parseInt(o, 16) - 65536;
  return s !== s || c ? o : s < 0 ? (
    // BMP codepoint
    String.fromCharCode(s + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(s >> 10 | 55296, s & 1023 | 56320)
  );
}
function ju(u) {
  return u.replace(tt, ct);
}
function be(u) {
  return u === 39 || u === 34;
}
function rr(u) {
  return u === 32 || u === 9 || u === 10 || u === 12 || u === 13;
}
function ot(u) {
  const o = [], c = Sr(o, `${u}`, 0);
  if (c < u.length)
    throw new Error(`Unmatched selector: ${u.slice(c)}`);
  return o;
}
function Sr(u, o, c) {
  let s = [];
  function g(l) {
    const f = o.slice(c + l).match(er);
    if (!f)
      throw new Error(`Expected name, found ${o.slice(c)}`);
    const [n] = f;
    return c += l + n.length, ju(n);
  }
  function i(l) {
    for (c += l; c < o.length && rr(o.charCodeAt(c)); )
      c++;
  }
  function r() {
    c += 1;
    const l = c;
    let f = 1;
    for (; f > 0 && c < o.length; c++)
      o.charCodeAt(c) === 40 && !t(c) ? f++ : o.charCodeAt(c) === 41 && !t(c) && f--;
    if (f)
      throw new Error("Parenthesis not matched");
    return ju(o.slice(l, c - 1));
  }
  function t(l) {
    let f = 0;
    for (; o.charCodeAt(--l) === 92; )
      f++;
    return (f & 1) === 1;
  }
  function a() {
    if (s.length > 0 && _r(s[s.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function e(l) {
    if (s.length > 0 && s[s.length - 1].type === H.Descendant) {
      s[s.length - 1].type = l;
      return;
    }
    a(), s.push({ type: l });
  }
  function d(l, f) {
    s.push({
      type: H.Attribute,
      name: l,
      action: f,
      value: g(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function h() {
    if (s.length && s[s.length - 1].type === H.Descendant && s.pop(), s.length === 0)
      throw new Error("Empty sub-selector");
    u.push(s);
  }
  if (i(0), o.length === c)
    return c;
  u: for (; c < o.length; ) {
    const l = o.charCodeAt(c);
    switch (l) {
      // Whitespace
      case 32:
      case 9:
      case 10:
      case 12:
      case 13: {
        (s.length === 0 || s[0].type !== H.Descendant) && (a(), s.push({ type: H.Descendant })), i(1);
        break;
      }
      // Traversals
      case 62: {
        e(H.Child), i(1);
        break;
      }
      case 60: {
        e(H.Parent), i(1);
        break;
      }
      case 126: {
        e(H.Sibling), i(1);
        break;
      }
      case 43: {
        e(H.Adjacent), i(1);
        break;
      }
      // Special attribute selectors: .class, #id
      case 46: {
        d("class", I.Element);
        break;
      }
      case 35: {
        d("id", I.Equals);
        break;
      }
      case 91: {
        i(1);
        let f, n = null;
        o.charCodeAt(c) === 124 ? f = g(1) : o.startsWith("*|", c) ? (n = "*", f = g(2)) : (f = g(0), o.charCodeAt(c) === 124 && o.charCodeAt(c + 1) !== 61 && (n = f, f = g(1))), i(0);
        let m = I.Exists;
        const x = at.get(o.charCodeAt(c));
        if (x) {
          if (m = x, o.charCodeAt(c + 1) !== 61)
            throw new Error("Expected `=`");
          i(2);
        } else o.charCodeAt(c) === 61 && (m = I.Equals, i(1));
        let N = "", q = null;
        if (m !== "exists") {
          if (be(o.charCodeAt(c))) {
            const p = o.charCodeAt(c);
            let A = c + 1;
            for (; A < o.length && (o.charCodeAt(A) !== p || t(A)); )
              A += 1;
            if (o.charCodeAt(A) !== p)
              throw new Error("Attribute value didn't end");
            N = ju(o.slice(c + 1, A)), c = A + 1;
          } else {
            const p = c;
            for (; c < o.length && (!rr(o.charCodeAt(c)) && o.charCodeAt(c) !== 93 || t(c)); )
              c += 1;
            N = ju(o.slice(p, c));
          }
          i(0);
          const D = o.charCodeAt(c) | 32;
          D === 115 ? (q = !1, i(1)) : D === 105 && (q = !0, i(1));
        }
        if (o.charCodeAt(c) !== 93)
          throw new Error("Attribute selector didn't terminate");
        c += 1;
        const y = {
          type: H.Attribute,
          name: f,
          action: m,
          value: N,
          namespace: n,
          ignoreCase: q
        };
        s.push(y);
        break;
      }
      case 58: {
        if (o.charCodeAt(c + 1) === 58) {
          s.push({
            type: H.PseudoElement,
            name: g(2).toLowerCase(),
            data: o.charCodeAt(c) === 40 ? r() : null
          });
          continue;
        }
        const f = g(1).toLowerCase();
        let n = null;
        if (o.charCodeAt(c) === 40)
          if (nt.has(f)) {
            if (be(o.charCodeAt(c + 1)))
              throw new Error(`Pseudo-selector ${f} cannot be quoted`);
            if (n = [], c = Sr(n, o, c + 1), o.charCodeAt(c) !== 41)
              throw new Error(`Missing closing parenthesis in :${f} (${o})`);
            c += 1;
          } else {
            if (n = r(), it.has(f)) {
              const m = n.charCodeAt(0);
              m === n.charCodeAt(n.length - 1) && be(m) && (n = n.slice(1, -1));
            }
            n = ju(n);
          }
        s.push({ type: H.Pseudo, name: f, data: n });
        break;
      }
      case 44: {
        h(), s = [], i(1);
        break;
      }
      default: {
        if (o.startsWith("/*", c)) {
          const m = o.indexOf("*/", c + 2);
          if (m < 0)
            throw new Error("Comment was not terminated");
          c = m + 2, s.length === 0 && i(0);
          break;
        }
        let f = null, n;
        if (l === 42)
          c += 1, n = "*";
        else if (l === 124) {
          if (n = "", o.charCodeAt(c + 1) === 124) {
            e(H.ColumnCombinator), i(2);
            break;
          }
        } else if (er.test(o.slice(c)))
          n = g(0);
        else
          break u;
        o.charCodeAt(c) === 124 && o.charCodeAt(c + 1) !== 124 && (f = n, o.charCodeAt(c + 1) === 42 ? (n = "*", c += 2) : n = g(1)), s.push(n === "*" ? { type: H.Universal, namespace: f } : { type: H.Tag, name: n, namespace: f });
      }
    }
  }
  return h(), c;
}
const Or = ["\\", '"'], kr = [...Or, "(", ")"], st = new Set(Or.map((u) => u.charCodeAt(0))), tr = new Set(kr.map((u) => u.charCodeAt(0))), Su = new Set([
  ...kr,
  "~",
  "^",
  "$",
  "*",
  "+",
  "!",
  "|",
  ":",
  "[",
  "]",
  " ",
  "."
].map((u) => u.charCodeAt(0)));
function Rr(u) {
  return u.map((o) => o.map(lt).join("")).join(", ");
}
function lt(u, o, c) {
  switch (u.type) {
    // Simple types
    case H.Child:
      return o === 0 ? "> " : " > ";
    case H.Parent:
      return o === 0 ? "< " : " < ";
    case H.Sibling:
      return o === 0 ? "~ " : " ~ ";
    case H.Adjacent:
      return o === 0 ? "+ " : " + ";
    case H.Descendant:
      return " ";
    case H.ColumnCombinator:
      return o === 0 ? "|| " : " || ";
    case H.Universal:
      return u.namespace === "*" && o + 1 < c.length && "name" in c[o + 1] ? "" : `${Pr(u.namespace)}*`;
    case H.Tag:
      return ar(u);
    case H.PseudoElement:
      return `::${pu(u.name, Su)}${u.data === null ? "" : `(${pu(u.data, tr)})`}`;
    case H.Pseudo:
      return `:${pu(u.name, Su)}${u.data === null ? "" : `(${typeof u.data == "string" ? pu(u.data, tr) : Rr(u.data)})`}`;
    case H.Attribute: {
      if (u.name === "id" && u.action === I.Equals && u.ignoreCase === "quirks" && !u.namespace)
        return `#${pu(u.value, Su)}`;
      if (u.name === "class" && u.action === I.Element && u.ignoreCase === "quirks" && !u.namespace)
        return `.${pu(u.value, Su)}`;
      const s = ar(u);
      return u.action === I.Exists ? `[${s}]` : `[${s}${dt(u.action)}="${pu(u.value, st)}"${u.ignoreCase === null ? "" : u.ignoreCase ? " i" : " s"}]`;
    }
  }
}
function dt(u) {
  switch (u) {
    case I.Equals:
      return "";
    case I.Element:
      return "~";
    case I.Start:
      return "^";
    case I.End:
      return "$";
    case I.Any:
      return "*";
    case I.Not:
      return "!";
    case I.Hyphen:
      return "|";
    case I.Exists:
      throw new Error("Shouldn't be here");
  }
}
function ar(u) {
  return `${Pr(u.namespace)}${pu(u.name, Su)}`;
}
function Pr(u) {
  return u !== null ? `${u === "*" ? "*" : pu(u, Su)}|` : "";
}
function pu(u, o) {
  let c = 0, s = "";
  for (let g = 0; g < u.length; g++)
    o.has(u.charCodeAt(g)) && (s += `${u.slice(c, g)}\\${u.charAt(g)}`, c = g + 1);
  return s.length > 0 ? s + u.slice(c) : u;
}
const ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get AttributeAction() {
    return I;
  },
  IgnoreCaseMode: rt,
  get SelectorType() {
    return H;
  },
  isTraversal: _r,
  parse: ot,
  stringify: Rr
}, Symbol.toStringTag, { value: "Module" })), ce = /* @__PURE__ */ Ir(ft);
var Nu = {}, nr;
function Mr() {
  if (nr) return Nu;
  nr = 1, Object.defineProperty(Nu, "__esModule", { value: !0 }), Nu.isTraversal = void 0;
  var u = ce, o = /* @__PURE__ */ new Map([
    [u.SelectorType.Universal, 50],
    [u.SelectorType.Tag, 30],
    [u.SelectorType.Attribute, 1],
    [u.SelectorType.Pseudo, 0]
  ]);
  function c(r) {
    return !o.has(r.type);
  }
  Nu.isTraversal = c;
  var s = /* @__PURE__ */ new Map([
    [u.AttributeAction.Exists, 10],
    [u.AttributeAction.Equals, 8],
    [u.AttributeAction.Not, 7],
    [u.AttributeAction.Start, 6],
    [u.AttributeAction.End, 6],
    [u.AttributeAction.Any, 5]
  ]);
  function g(r) {
    for (var t = r.map(i), a = 1; a < r.length; a++) {
      var e = t[a];
      if (!(e < 0))
        for (var d = a - 1; d >= 0 && e < t[d]; d--) {
          var h = r[d + 1];
          r[d + 1] = r[d], r[d] = h, t[d + 1] = t[d], t[d] = e;
        }
    }
  }
  Nu.default = g;
  function i(r) {
    var t, a, e = (t = o.get(r.type)) !== null && t !== void 0 ? t : -1;
    return r.type === u.SelectorType.Attribute ? (e = (a = s.get(r.action)) !== null && a !== void 0 ? a : 4, r.action === u.AttributeAction.Equals && r.name === "id" && (e = 9), r.ignoreCase && (e >>= 1)) : r.type === u.SelectorType.Pseudo && (r.data ? r.name === "has" || r.name === "contains" ? e = 0 : Array.isArray(r.data) ? (e = Math.min.apply(Math, r.data.map(function(d) {
      return Math.min.apply(Math, d.map(i));
    })), e < 0 && (e = 0)) : e = 2 : e = 3), e;
  }
  return Nu;
}
var Hu = {}, xu = {}, ir;
function pt() {
  if (ir) return xu;
  ir = 1;
  var u = xu && xu.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(xu, "__esModule", { value: !0 }), xu.attributeRules = void 0;
  var o = u(ku()), c = /[-[\]{}()*+?.,\\^$|#\s]/g;
  function s(r) {
    return r.replace(c, "\\$&");
  }
  var g = /* @__PURE__ */ new Set([
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
  function i(r, t) {
    return typeof r.ignoreCase == "boolean" ? r.ignoreCase : r.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && g.has(r.name);
  }
  return xu.attributeRules = {
    equals: function(r, t, a) {
      var e = a.adapter, d = t.name, h = t.value;
      return i(t, a) ? (h = h.toLowerCase(), function(l) {
        var f = e.getAttributeValue(l, d);
        return f != null && f.length === h.length && f.toLowerCase() === h && r(l);
      }) : function(l) {
        return e.getAttributeValue(l, d) === h && r(l);
      };
    },
    hyphen: function(r, t, a) {
      var e = a.adapter, d = t.name, h = t.value, l = h.length;
      return i(t, a) ? (h = h.toLowerCase(), function(n) {
        var m = e.getAttributeValue(n, d);
        return m != null && (m.length === l || m.charAt(l) === "-") && m.substr(0, l).toLowerCase() === h && r(n);
      }) : function(n) {
        var m = e.getAttributeValue(n, d);
        return m != null && (m.length === l || m.charAt(l) === "-") && m.substr(0, l) === h && r(n);
      };
    },
    element: function(r, t, a) {
      var e = a.adapter, d = t.name, h = t.value;
      if (/\s/.test(h))
        return o.default.falseFunc;
      var l = new RegExp("(?:^|\\s)".concat(s(h), "(?:$|\\s)"), i(t, a) ? "i" : "");
      return function(n) {
        var m = e.getAttributeValue(n, d);
        return m != null && m.length >= h.length && l.test(m) && r(n);
      };
    },
    exists: function(r, t, a) {
      var e = t.name, d = a.adapter;
      return function(h) {
        return d.hasAttrib(h, e) && r(h);
      };
    },
    start: function(r, t, a) {
      var e = a.adapter, d = t.name, h = t.value, l = h.length;
      return l === 0 ? o.default.falseFunc : i(t, a) ? (h = h.toLowerCase(), function(f) {
        var n = e.getAttributeValue(f, d);
        return n != null && n.length >= l && n.substr(0, l).toLowerCase() === h && r(f);
      }) : function(f) {
        var n;
        return !!(!((n = e.getAttributeValue(f, d)) === null || n === void 0) && n.startsWith(h)) && r(f);
      };
    },
    end: function(r, t, a) {
      var e = a.adapter, d = t.name, h = t.value, l = -h.length;
      return l === 0 ? o.default.falseFunc : i(t, a) ? (h = h.toLowerCase(), function(f) {
        var n;
        return ((n = e.getAttributeValue(f, d)) === null || n === void 0 ? void 0 : n.substr(l).toLowerCase()) === h && r(f);
      }) : function(f) {
        var n;
        return !!(!((n = e.getAttributeValue(f, d)) === null || n === void 0) && n.endsWith(h)) && r(f);
      };
    },
    any: function(r, t, a) {
      var e = a.adapter, d = t.name, h = t.value;
      if (h === "")
        return o.default.falseFunc;
      if (i(t, a)) {
        var l = new RegExp(s(h), "i");
        return function(n) {
          var m = e.getAttributeValue(n, d);
          return m != null && m.length >= h.length && l.test(m) && r(n);
        };
      }
      return function(f) {
        var n;
        return !!(!((n = e.getAttributeValue(f, d)) === null || n === void 0) && n.includes(h)) && r(f);
      };
    },
    not: function(r, t, a) {
      var e = a.adapter, d = t.name, h = t.value;
      return h === "" ? function(l) {
        return !!e.getAttributeValue(l, d) && r(l);
      } : i(t, a) ? (h = h.toLowerCase(), function(l) {
        var f = e.getAttributeValue(l, d);
        return (f == null || f.length !== h.length || f.toLowerCase() !== h) && r(l);
      }) : function(l) {
        return e.getAttributeValue(l, d) !== h && r(l);
      };
    }
  }, xu;
}
var he = {}, Uu = {}, ge = {}, Vu = {}, cr;
function bt() {
  if (cr) return Vu;
  cr = 1, Object.defineProperty(Vu, "__esModule", { value: !0 }), Vu.parse = void 0;
  var u = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), o = 48, c = 57;
  function s(g) {
    if (g = g.trim().toLowerCase(), g === "even")
      return [2, 0];
    if (g === "odd")
      return [2, 1];
    var i = 0, r = 0, t = e(), a = d();
    if (i < g.length && g.charAt(i) === "n" && (i++, r = t * (a ?? 1), h(), i < g.length ? (t = e(), h(), a = d()) : t = a = 0), a === null || i < g.length)
      throw new Error("n-th rule couldn't be parsed ('".concat(g, "')"));
    return [r, t * a];
    function e() {
      return g.charAt(i) === "-" ? (i++, -1) : (g.charAt(i) === "+" && i++, 1);
    }
    function d() {
      for (var l = i, f = 0; i < g.length && g.charCodeAt(i) >= o && g.charCodeAt(i) <= c; )
        f = f * 10 + (g.charCodeAt(i) - o), i++;
      return i === l ? null : f;
    }
    function h() {
      for (; i < g.length && u.has(g.charCodeAt(i)); )
        i++;
    }
  }
  return Vu.parse = s, Vu;
}
var fu = {}, or;
function ht() {
  if (or) return fu;
  or = 1;
  var u = fu && fu.__importDefault || function(g) {
    return g && g.__esModule ? g : { default: g };
  };
  Object.defineProperty(fu, "__esModule", { value: !0 }), fu.generate = fu.compile = void 0;
  var o = u(ku());
  function c(g) {
    var i = g[0], r = g[1] - 1;
    if (r < 0 && i <= 0)
      return o.default.falseFunc;
    if (i === -1)
      return function(e) {
        return e <= r;
      };
    if (i === 0)
      return function(e) {
        return e === r;
      };
    if (i === 1)
      return r < 0 ? o.default.trueFunc : function(e) {
        return e >= r;
      };
    var t = Math.abs(i), a = (r % t + t) % t;
    return i > 1 ? function(e) {
      return e >= r && e % t === a;
    } : function(e) {
      return e <= r && e % t === a;
    };
  }
  fu.compile = c;
  function s(g) {
    var i = g[0], r = g[1] - 1, t = 0;
    if (i < 0) {
      var a = -i, e = (r % a + a) % a;
      return function() {
        var d = e + a * t++;
        return d > r ? null : d;
      };
    }
    return i === 0 ? r < 0 ? (
      // There are no result — always return `null`
      function() {
        return null;
      }
    ) : (
      // Return `b` exactly once
      function() {
        return t++ === 0 ? r : null;
      }
    ) : (r < 0 && (r += i * Math.ceil(-r / i)), function() {
      return i * t++ + r;
    });
  }
  return fu.generate = s, fu;
}
var sr;
function gt() {
  return sr || (sr = 1, (function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.sequence = u.generate = u.compile = u.parse = void 0;
    var o = /* @__PURE__ */ bt();
    Object.defineProperty(u, "parse", { enumerable: !0, get: function() {
      return o.parse;
    } });
    var c = /* @__PURE__ */ ht();
    Object.defineProperty(u, "compile", { enumerable: !0, get: function() {
      return c.compile;
    } }), Object.defineProperty(u, "generate", { enumerable: !0, get: function() {
      return c.generate;
    } });
    function s(i) {
      return (0, c.compile)((0, o.parse)(i));
    }
    u.default = s;
    function g(i) {
      return (0, c.generate)((0, o.parse)(i));
    }
    u.sequence = g;
  })(ge)), ge;
}
var lr;
function Dt() {
  return lr || (lr = 1, (function(u) {
    var o = Uu && Uu.__importDefault || function(r) {
      return r && r.__esModule ? r : { default: r };
    };
    Object.defineProperty(u, "__esModule", { value: !0 }), u.filters = void 0;
    var c = o(/* @__PURE__ */ gt()), s = o(ku());
    function g(r, t) {
      return function(a) {
        var e = t.getParent(a);
        return e != null && t.isTag(e) && r(a);
      };
    }
    u.filters = {
      contains: function(r, t, a) {
        var e = a.adapter;
        return function(h) {
          return r(h) && e.getText(h).includes(t);
        };
      },
      icontains: function(r, t, a) {
        var e = a.adapter, d = t.toLowerCase();
        return function(l) {
          return r(l) && e.getText(l).toLowerCase().includes(d);
        };
      },
      // Location specific methods
      "nth-child": function(r, t, a) {
        var e = a.adapter, d = a.equals, h = (0, c.default)(t);
        return h === s.default.falseFunc ? s.default.falseFunc : h === s.default.trueFunc ? g(r, e) : function(f) {
          for (var n = e.getSiblings(f), m = 0, x = 0; x < n.length && !d(f, n[x]); x++)
            e.isTag(n[x]) && m++;
          return h(m) && r(f);
        };
      },
      "nth-last-child": function(r, t, a) {
        var e = a.adapter, d = a.equals, h = (0, c.default)(t);
        return h === s.default.falseFunc ? s.default.falseFunc : h === s.default.trueFunc ? g(r, e) : function(f) {
          for (var n = e.getSiblings(f), m = 0, x = n.length - 1; x >= 0 && !d(f, n[x]); x--)
            e.isTag(n[x]) && m++;
          return h(m) && r(f);
        };
      },
      "nth-of-type": function(r, t, a) {
        var e = a.adapter, d = a.equals, h = (0, c.default)(t);
        return h === s.default.falseFunc ? s.default.falseFunc : h === s.default.trueFunc ? g(r, e) : function(f) {
          for (var n = e.getSiblings(f), m = 0, x = 0; x < n.length; x++) {
            var N = n[x];
            if (d(f, N))
              break;
            e.isTag(N) && e.getName(N) === e.getName(f) && m++;
          }
          return h(m) && r(f);
        };
      },
      "nth-last-of-type": function(r, t, a) {
        var e = a.adapter, d = a.equals, h = (0, c.default)(t);
        return h === s.default.falseFunc ? s.default.falseFunc : h === s.default.trueFunc ? g(r, e) : function(f) {
          for (var n = e.getSiblings(f), m = 0, x = n.length - 1; x >= 0; x--) {
            var N = n[x];
            if (d(f, N))
              break;
            e.isTag(N) && e.getName(N) === e.getName(f) && m++;
          }
          return h(m) && r(f);
        };
      },
      // TODO determine the actual root element
      root: function(r, t, a) {
        var e = a.adapter;
        return function(d) {
          var h = e.getParent(d);
          return (h == null || !e.isTag(h)) && r(d);
        };
      },
      scope: function(r, t, a, e) {
        var d = a.equals;
        return !e || e.length === 0 ? u.filters.root(r, t, a) : e.length === 1 ? function(h) {
          return d(e[0], h) && r(h);
        } : function(h) {
          return e.includes(h) && r(h);
        };
      },
      hover: i("isHovered"),
      visited: i("isVisited"),
      active: i("isActive")
    };
    function i(r) {
      return function(a, e, d) {
        var h = d.adapter, l = h[r];
        return typeof l != "function" ? s.default.falseFunc : function(n) {
          return l(n) && a(n);
        };
      };
    }
  })(Uu)), Uu;
}
var Cu = {}, dr;
function mt() {
  if (dr) return Cu;
  dr = 1, Object.defineProperty(Cu, "__esModule", { value: !0 }), Cu.verifyPseudoArgs = Cu.pseudos = void 0, Cu.pseudos = {
    empty: function(o, c) {
      var s = c.adapter;
      return !s.getChildren(o).some(function(g) {
        return s.isTag(g) || s.getText(g) !== "";
      });
    },
    "first-child": function(o, c) {
      var s = c.adapter, g = c.equals;
      if (s.prevElementSibling)
        return s.prevElementSibling(o) == null;
      var i = s.getSiblings(o).find(function(r) {
        return s.isTag(r);
      });
      return i != null && g(o, i);
    },
    "last-child": function(o, c) {
      for (var s = c.adapter, g = c.equals, i = s.getSiblings(o), r = i.length - 1; r >= 0; r--) {
        if (g(o, i[r]))
          return !0;
        if (s.isTag(i[r]))
          break;
      }
      return !1;
    },
    "first-of-type": function(o, c) {
      for (var s = c.adapter, g = c.equals, i = s.getSiblings(o), r = s.getName(o), t = 0; t < i.length; t++) {
        var a = i[t];
        if (g(o, a))
          return !0;
        if (s.isTag(a) && s.getName(a) === r)
          break;
      }
      return !1;
    },
    "last-of-type": function(o, c) {
      for (var s = c.adapter, g = c.equals, i = s.getSiblings(o), r = s.getName(o), t = i.length - 1; t >= 0; t--) {
        var a = i[t];
        if (g(o, a))
          return !0;
        if (s.isTag(a) && s.getName(a) === r)
          break;
      }
      return !1;
    },
    "only-of-type": function(o, c) {
      var s = c.adapter, g = c.equals, i = s.getName(o);
      return s.getSiblings(o).every(function(r) {
        return g(o, r) || !s.isTag(r) || s.getName(r) !== i;
      });
    },
    "only-child": function(o, c) {
      var s = c.adapter, g = c.equals;
      return s.getSiblings(o).every(function(i) {
        return g(o, i) || !s.isTag(i);
      });
    }
  };
  function u(o, c, s, g) {
    if (s === null) {
      if (o.length > g)
        throw new Error("Pseudo-class :".concat(c, " requires an argument"));
    } else if (o.length === g)
      throw new Error("Pseudo-class :".concat(c, " doesn't have any arguments"));
  }
  return Cu.verifyPseudoArgs = u, Cu;
}
var Iu = {}, fr;
function At() {
  return fr || (fr = 1, Object.defineProperty(Iu, "__esModule", { value: !0 }), Iu.aliases = void 0, Iu.aliases = {
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
  }), Iu;
}
var wu = {}, pr;
function ve() {
  return pr || (pr = 1, (function(u) {
    var o = wu && wu.__spreadArray || function(e, d, h) {
      if (h || arguments.length === 2) for (var l = 0, f = d.length, n; l < f; l++)
        (n || !(l in d)) && (n || (n = Array.prototype.slice.call(d, 0, l)), n[l] = d[l]);
      return e.concat(n || Array.prototype.slice.call(d));
    }, c = wu && wu.__importDefault || function(e) {
      return e && e.__esModule ? e : { default: e };
    };
    Object.defineProperty(u, "__esModule", { value: !0 }), u.subselects = u.getNextSiblings = u.ensureIsTag = u.PLACEHOLDER_ELEMENT = void 0;
    var s = c(ku()), g = Mr();
    u.PLACEHOLDER_ELEMENT = {};
    function i(e, d) {
      return e === s.default.falseFunc ? s.default.falseFunc : function(h) {
        return d.isTag(h) && e(h);
      };
    }
    u.ensureIsTag = i;
    function r(e, d) {
      var h = d.getSiblings(e);
      if (h.length <= 1)
        return [];
      var l = h.indexOf(e);
      return l < 0 || l === h.length - 1 ? [] : h.slice(l + 1).filter(d.isTag);
    }
    u.getNextSiblings = r;
    function t(e) {
      return {
        xmlMode: !!e.xmlMode,
        lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
        lowerCaseTags: !!e.lowerCaseTags,
        quirksMode: !!e.quirksMode,
        cacheResults: !!e.cacheResults,
        pseudos: e.pseudos,
        adapter: e.adapter,
        equals: e.equals
      };
    }
    var a = function(e, d, h, l, f) {
      var n = f(d, t(h), l);
      return n === s.default.trueFunc ? e : n === s.default.falseFunc ? s.default.falseFunc : function(m) {
        return n(m) && e(m);
      };
    };
    u.subselects = {
      is: a,
      /**
       * `:matches` and `:where` are aliases for `:is`.
       */
      matches: a,
      where: a,
      not: function(e, d, h, l, f) {
        var n = f(d, t(h), l);
        return n === s.default.falseFunc ? e : n === s.default.trueFunc ? s.default.falseFunc : function(m) {
          return !n(m) && e(m);
        };
      },
      has: function(e, d, h, l, f) {
        var n = h.adapter, m = t(h);
        m.relativeSelector = !0;
        var x = d.some(function(p) {
          return p.some(g.isTraversal);
        }) ? (
          // Used as a placeholder. Will be replaced with the actual element.
          [u.PLACEHOLDER_ELEMENT]
        ) : void 0, N = f(d, m, x);
        if (N === s.default.falseFunc)
          return s.default.falseFunc;
        var q = i(N, n);
        if (x && N !== s.default.trueFunc) {
          var y = N.shouldTestNextSiblings, D = y === void 0 ? !1 : y;
          return function(p) {
            if (!e(p))
              return !1;
            x[0] = p;
            var A = n.getChildren(p), C = D ? o(o([], A, !0), r(p, n), !0) : A;
            return n.existsOne(q, C);
          };
        }
        return function(p) {
          return e(p) && n.existsOne(q, n.getChildren(p));
        };
      }
    };
  })(wu)), wu;
}
var br;
function jr() {
  return br || (br = 1, (function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.compilePseudoSelector = u.aliases = u.pseudos = u.filters = void 0;
    var o = ce, c = Dt();
    Object.defineProperty(u, "filters", { enumerable: !0, get: function() {
      return c.filters;
    } });
    var s = mt();
    Object.defineProperty(u, "pseudos", { enumerable: !0, get: function() {
      return s.pseudos;
    } });
    var g = At();
    Object.defineProperty(u, "aliases", { enumerable: !0, get: function() {
      return g.aliases;
    } });
    var i = ve();
    function r(t, a, e, d, h) {
      var l, f = a.name, n = a.data;
      if (Array.isArray(n)) {
        if (!(f in i.subselects))
          throw new Error("Unknown pseudo-class :".concat(f, "(").concat(n, ")"));
        return i.subselects[f](t, n, e, d, h);
      }
      var m = (l = e.pseudos) === null || l === void 0 ? void 0 : l[f], x = typeof m == "string" ? m : g.aliases[f];
      if (typeof x == "string") {
        if (n != null)
          throw new Error("Pseudo ".concat(f, " doesn't have any arguments"));
        var N = (0, o.parse)(x);
        return i.subselects.is(t, N, e, d, h);
      }
      if (typeof m == "function")
        return (0, s.verifyPseudoArgs)(m, f, n, 1), function(y) {
          return m(y, n) && t(y);
        };
      if (f in c.filters)
        return c.filters[f](t, n, e, d);
      if (f in s.pseudos) {
        var q = s.pseudos[f];
        return (0, s.verifyPseudoArgs)(q, f, n, 2), function(y) {
          return q(y, e, n) && t(y);
        };
      }
      throw new Error("Unknown pseudo-class :".concat(f));
    }
    u.compilePseudoSelector = r;
  })(he)), he;
}
var hr;
function vt() {
  if (hr) return Hu;
  hr = 1, Object.defineProperty(Hu, "__esModule", { value: !0 }), Hu.compileGeneralSelector = void 0;
  var u = pt(), o = jr(), c = ce;
  function s(i, r) {
    var t = r.getParent(i);
    return t && r.isTag(t) ? t : null;
  }
  function g(i, r, t, a, e) {
    var d = t.adapter, h = t.equals;
    switch (r.type) {
      case c.SelectorType.PseudoElement:
        throw new Error("Pseudo-elements are not supported by css-select");
      case c.SelectorType.ColumnCombinator:
        throw new Error("Column combinators are not yet supported by css-select");
      case c.SelectorType.Attribute: {
        if (r.namespace != null)
          throw new Error("Namespaced attributes are not yet supported by css-select");
        return (!t.xmlMode || t.lowerCaseAttributeNames) && (r.name = r.name.toLowerCase()), u.attributeRules[r.action](i, r, t);
      }
      case c.SelectorType.Pseudo:
        return (0, o.compilePseudoSelector)(i, r, t, a, e);
      // Tags
      case c.SelectorType.Tag: {
        if (r.namespace != null)
          throw new Error("Namespaced tag names are not yet supported by css-select");
        var l = r.name;
        return (!t.xmlMode || t.lowerCaseTags) && (l = l.toLowerCase()), function(m) {
          return d.getName(m) === l && i(m);
        };
      }
      // Traversal
      case c.SelectorType.Descendant: {
        if (t.cacheResults === !1 || typeof WeakSet > "u")
          return function(m) {
            for (var x = m; x = s(x, d); )
              if (i(x))
                return !0;
            return !1;
          };
        var f = /* @__PURE__ */ new WeakSet();
        return function(m) {
          for (var x = m; x = s(x, d); )
            if (!f.has(x)) {
              if (d.isTag(x) && i(x))
                return !0;
              f.add(x);
            }
          return !1;
        };
      }
      case "_flexibleDescendant":
        return function(m) {
          var x = m;
          do
            if (i(x))
              return !0;
          while (x = s(x, d));
          return !1;
        };
      case c.SelectorType.Parent:
        return function(m) {
          return d.getChildren(m).some(function(x) {
            return d.isTag(x) && i(x);
          });
        };
      case c.SelectorType.Child:
        return function(m) {
          var x = d.getParent(m);
          return x != null && d.isTag(x) && i(x);
        };
      case c.SelectorType.Sibling:
        return function(m) {
          for (var x = d.getSiblings(m), N = 0; N < x.length; N++) {
            var q = x[N];
            if (h(m, q))
              break;
            if (d.isTag(q) && i(q))
              return !0;
          }
          return !1;
        };
      case c.SelectorType.Adjacent:
        return d.prevElementSibling ? function(m) {
          var x = d.prevElementSibling(m);
          return x != null && i(x);
        } : function(m) {
          for (var x = d.getSiblings(m), N, q = 0; q < x.length; q++) {
            var y = x[q];
            if (h(m, y))
              break;
            d.isTag(y) && (N = y);
          }
          return !!N && i(N);
        };
      case c.SelectorType.Universal: {
        if (r.namespace != null && r.namespace !== "*")
          throw new Error("Namespaced universal selectors are not yet supported by css-select");
        return i;
      }
    }
  }
  return Hu.compileGeneralSelector = g, Hu;
}
var gr;
function Et() {
  if (gr) return J;
  gr = 1;
  var u = J && J.__createBinding || (Object.create ? (function(y, D, p, A) {
    A === void 0 && (A = p);
    var C = Object.getOwnPropertyDescriptor(D, p);
    (!C || ("get" in C ? !D.__esModule : C.writable || C.configurable)) && (C = { enumerable: !0, get: function() {
      return D[p];
    } }), Object.defineProperty(y, A, C);
  }) : (function(y, D, p, A) {
    A === void 0 && (A = p), y[A] = D[p];
  })), o = J && J.__setModuleDefault || (Object.create ? (function(y, D) {
    Object.defineProperty(y, "default", { enumerable: !0, value: D });
  }) : function(y, D) {
    y.default = D;
  }), c = J && J.__importStar || function(y) {
    if (y && y.__esModule) return y;
    var D = {};
    if (y != null) for (var p in y) p !== "default" && Object.prototype.hasOwnProperty.call(y, p) && u(D, y, p);
    return o(D, y), D;
  }, s = J && J.__importDefault || function(y) {
    return y && y.__esModule ? y : { default: y };
  };
  Object.defineProperty(J, "__esModule", { value: !0 }), J.compileToken = J.compileUnsafe = J.compile = void 0;
  var g = ce, i = s(ku()), r = c(Mr()), t = vt(), a = ve();
  function e(y, D, p) {
    var A = d(y, D, p);
    return (0, a.ensureIsTag)(A, D.adapter);
  }
  J.compile = e;
  function d(y, D, p) {
    var A = typeof y == "string" ? (0, g.parse)(y) : y;
    return x(A, D, p);
  }
  J.compileUnsafe = d;
  function h(y) {
    return y.type === g.SelectorType.Pseudo && (y.name === "scope" || Array.isArray(y.data) && y.data.some(function(D) {
      return D.some(h);
    }));
  }
  var l = { type: g.SelectorType.Descendant }, f = {
    type: "_flexibleDescendant"
  }, n = {
    type: g.SelectorType.Pseudo,
    name: "scope",
    data: null
  };
  function m(y, D, p) {
    for (var A = D.adapter, C = !!p?.every(function(v) {
      var L = A.isTag(v) && A.getParent(v);
      return v === a.PLACEHOLDER_ELEMENT || L && A.isTag(L);
    }), _ = 0, k = y; _ < k.length; _++) {
      var j = k[_];
      if (!(j.length > 0 && (0, r.isTraversal)(j[0]) && j[0].type !== g.SelectorType.Descendant)) if (C && !j.some(h))
        j.unshift(l);
      else
        continue;
      j.unshift(n);
    }
  }
  function x(y, D, p) {
    var A;
    y.forEach(r.default), p = (A = D.context) !== null && A !== void 0 ? A : p;
    var C = Array.isArray(p), _ = p && (Array.isArray(p) ? p : [p]);
    if (D.relativeSelector !== !1)
      m(y, D, _);
    else if (y.some(function(v) {
      return v.length > 0 && (0, r.isTraversal)(v[0]);
    }))
      throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
    var k = !1, j = y.map(function(v) {
      if (v.length >= 2) {
        var L = v[0], F = v[1];
        L.type !== g.SelectorType.Pseudo || L.name !== "scope" || (C && F.type === g.SelectorType.Descendant ? v[1] = f : (F.type === g.SelectorType.Adjacent || F.type === g.SelectorType.Sibling) && (k = !0));
      }
      return N(v, D, _);
    }).reduce(q, i.default.falseFunc);
    return j.shouldTestNextSiblings = k, j;
  }
  J.compileToken = x;
  function N(y, D, p) {
    var A;
    return y.reduce(function(C, _) {
      return C === i.default.falseFunc ? i.default.falseFunc : (0, t.compileGeneralSelector)(C, _, D, p, x);
    }, (A = D.rootFunc) !== null && A !== void 0 ? A : i.default.trueFunc);
  }
  function q(y, D) {
    return D === i.default.falseFunc || y === i.default.trueFunc ? y : y === i.default.falseFunc || D === i.default.trueFunc ? D : function(A) {
      return y(A) || D(A);
    };
  }
  return J;
}
var Dr;
function yt() {
  return Dr || (Dr = 1, (function(u) {
    var o = uu && uu.__createBinding || (Object.create ? (function(q, y, D, p) {
      p === void 0 && (p = D);
      var A = Object.getOwnPropertyDescriptor(y, D);
      (!A || ("get" in A ? !y.__esModule : A.writable || A.configurable)) && (A = { enumerable: !0, get: function() {
        return y[D];
      } }), Object.defineProperty(q, p, A);
    }) : (function(q, y, D, p) {
      p === void 0 && (p = D), q[p] = y[D];
    })), c = uu && uu.__setModuleDefault || (Object.create ? (function(q, y) {
      Object.defineProperty(q, "default", { enumerable: !0, value: y });
    }) : function(q, y) {
      q.default = y;
    }), s = uu && uu.__importStar || function(q) {
      if (q && q.__esModule) return q;
      var y = {};
      if (q != null) for (var D in q) D !== "default" && Object.prototype.hasOwnProperty.call(q, D) && o(y, q, D);
      return c(y, q), y;
    }, g = uu && uu.__importDefault || function(q) {
      return q && q.__esModule ? q : { default: q };
    };
    Object.defineProperty(u, "__esModule", { value: !0 }), u.aliases = u.pseudos = u.filters = u.is = u.selectOne = u.selectAll = u.prepareContext = u._compileToken = u._compileUnsafe = u.compile = void 0;
    var i = s(/* @__PURE__ */ et()), r = g(ku()), t = Et(), a = ve(), e = function(q, y) {
      return q === y;
    }, d = {
      adapter: i,
      equals: e
    };
    function h(q) {
      var y, D, p, A, C = q ?? d;
      return (y = C.adapter) !== null && y !== void 0 || (C.adapter = i), (D = C.equals) !== null && D !== void 0 || (C.equals = (A = (p = C.adapter) === null || p === void 0 ? void 0 : p.equals) !== null && A !== void 0 ? A : e), C;
    }
    function l(q) {
      return function(D, p, A) {
        var C = h(p);
        return q(D, C, A);
      };
    }
    u.compile = l(t.compile), u._compileUnsafe = l(t.compileUnsafe), u._compileToken = l(t.compileToken);
    function f(q) {
      return function(D, p, A) {
        var C = h(A);
        typeof D != "function" && (D = (0, t.compileUnsafe)(D, C, p));
        var _ = n(p, C.adapter, D.shouldTestNextSiblings);
        return q(D, _, C);
      };
    }
    function n(q, y, D) {
      return D === void 0 && (D = !1), D && (q = m(q, y)), Array.isArray(q) ? y.removeSubsets(q) : y.getChildren(q);
    }
    u.prepareContext = n;
    function m(q, y) {
      for (var D = Array.isArray(q) ? q.slice(0) : [q], p = D.length, A = 0; A < p; A++) {
        var C = (0, a.getNextSiblings)(D[A], y);
        D.push.apply(D, C);
      }
      return D;
    }
    u.selectAll = f(function(q, y, D) {
      return q === r.default.falseFunc || !y || y.length === 0 ? [] : D.adapter.findAll(q, y);
    }), u.selectOne = f(function(q, y, D) {
      return q === r.default.falseFunc || !y || y.length === 0 ? null : D.adapter.findOne(q, y);
    });
    function x(q, y, D) {
      var p = h(D);
      return (typeof y == "function" ? y : (0, t.compile)(y, p))(q);
    }
    u.is = x, u.default = u.selectAll;
    var N = jr();
    Object.defineProperty(u, "filters", { enumerable: !0, get: function() {
      return N.filters;
    } }), Object.defineProperty(u, "pseudos", { enumerable: !0, get: function() {
      return N.pseudos;
    } }), Object.defineProperty(u, "aliases", { enumerable: !0, get: function() {
      return N.aliases;
    } });
  })(uu)), uu;
}
var ee = {}, mr;
function xt() {
  if (mr) return ee;
  mr = 1, Object.defineProperty(ee, "__esModule", { value: !0 });
  function u(o) {
    return o[o.length - 1];
  }
  return ee.default = u, ee;
}
var Lu = {}, Ar;
function Ct() {
  if (Ar) return Lu;
  Ar = 1;
  var u = Lu && Lu.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(Lu, "__esModule", { value: !0 });
  const o = u(/* @__PURE__ */ zu());
  function c(n) {
    return n && n.nodeType === o.default.ELEMENT_NODE;
  }
  function s(n, m) {
    return c(n) ? n.getAttribute(m) : void 0;
  }
  function g(n) {
    return (n && n.rawTagName || "").toLowerCase();
  }
  function i(n) {
    return n && n.childNodes;
  }
  function r(n) {
    return n ? n.parentNode : null;
  }
  function t(n) {
    return n.text;
  }
  function a(n) {
    let m = n.length, x, N, q;
    for (; --m > -1; ) {
      for (x = N = n[m], n[m] = null, q = !0; N; ) {
        if (n.indexOf(N) > -1) {
          q = !1, n.splice(m, 1);
          break;
        }
        N = r(N);
      }
      q && (n[m] = x);
    }
    return n;
  }
  function e(n, m) {
    return m.some((x) => c(x) ? n(x) || e(n, i(x)) : !1);
  }
  function d(n) {
    const m = r(n);
    return m ? i(m) : [];
  }
  function h(n, m) {
    return s(n, m) !== void 0;
  }
  function l(n, m) {
    let x = null;
    for (let N = 0, q = m?.length; N < q && !x; N++) {
      const y = m[N];
      if (n(y))
        x = y;
      else {
        const D = i(y);
        D && D.length > 0 && (x = l(n, D));
      }
    }
    return x;
  }
  function f(n, m) {
    let x = [];
    for (let N = 0, q = m.length; N < q; N++) {
      if (!c(m[N]))
        continue;
      n(m[N]) && x.push(m[N]);
      const y = i(m[N]);
      y && (x = x.concat(f(n, y)));
    }
    return x;
  }
  return Lu.default = {
    isTag: c,
    getAttributeValue: s,
    getName: g,
    getChildren: i,
    getParent: r,
    getText: t,
    removeSubsets: a,
    existsOne: e,
    getSiblings: d,
    hasAttrib: h,
    findOne: l,
    findAll: f
  }, Lu;
}
var re = {}, vr;
function wt() {
  if (vr) return re;
  vr = 1, Object.defineProperty(re, "__esModule", { value: !0 });
  class u {
    constructor(c = !1, s) {
      this.addClosingSlash = c, Array.isArray(s) ? this.voidTags = s.reduce((g, i) => g.add(i.toLowerCase()).add(i.toUpperCase()).add(i), /* @__PURE__ */ new Set()) : this.voidTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"].reduce((g, i) => g.add(i.toLowerCase()).add(i.toUpperCase()).add(i), /* @__PURE__ */ new Set());
    }
    formatNode(c, s, g) {
      const i = this.addClosingSlash, r = i && s && !s.endsWith(" ") ? " " : "", t = i ? `${r}/` : "";
      return this.isVoidElement(c.toLowerCase()) ? `<${c}${s}${t}>` : `<${c}${s}>${g}</${c}>`;
    }
    isVoidElement(c) {
      return this.voidTags.has(c);
    }
  }
  return re.default = u, re;
}
var _u = {}, Er;
function Hr() {
  if (Er) return _u;
  Er = 1;
  var u = _u && _u.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(_u, "__esModule", { value: !0 });
  const o = Ae(), c = u(/* @__PURE__ */ ne()), s = u(/* @__PURE__ */ zu());
  class g extends c.default {
    clone() {
      return new g(this._rawText, null);
    }
    constructor(t, a = null, e) {
      super(a, e), this.nodeType = s.default.TEXT_NODE, this.rawTagName = "", this._rawText = t;
    }
    get rawText() {
      return this._rawText;
    }
    /**
     * Set rawText and invalidate trimmed caches
     */
    set rawText(t) {
      this._rawText = t, this._trimmedRawText = void 0, this._trimmedText = void 0;
    }
    /**
     * Returns raw text with all whitespace trimmed except single leading/trailing non-breaking space
     */
    get trimmedRawText() {
      return this._trimmedRawText !== void 0 ? this._trimmedRawText : (this._trimmedRawText = i(this.rawText), this._trimmedRawText);
    }
    /**
     * Returns text with all whitespace trimmed except single leading/trailing non-breaking space
     */
    get trimmedText() {
      return this._trimmedText !== void 0 ? this._trimmedText : (this._trimmedText = i(this.text), this._trimmedText);
    }
    /**
     * Get unescaped text value of current node and its children.
     * @return {string} text content
     */
    get text() {
      return (0, o.decode)(this.rawText);
    }
    /**
     * Detect if the node contains only white space.
     * @return {boolean}
     */
    get isWhitespace() {
      return /^(\s|&nbsp;)*$/.test(this.rawText);
    }
    toString() {
      return this.rawText;
    }
  }
  _u.default = g;
  function i(r) {
    let t = 0, a, e;
    for (; t >= 0 && t < r.length; )
      /\S/.test(r[t]) && (a === void 0 ? (a = t, t = r.length) : (e = t, t = void 0)), a === void 0 ? t++ : t--;
    a === void 0 && (a = 0), e === void 0 && (e = r.length - 1);
    const d = a > 0 && /[^\S\r\n]/.test(r[a - 1]), h = e < r.length - 1 && /[^\S\r\n]/.test(r[e + 1]);
    return (d ? " " : "") + r.slice(a, e + 1) + (h ? " " : "");
  }
  return _u;
}
var yr;
function Ee() {
  if (yr) return tu;
  yr = 1;
  var u = tu && tu.__importDefault || function(S) {
    return S && S.__esModule ? S : { default: S };
  };
  Object.defineProperty(tu, "__esModule", { value: !0 }), tu.parse = tu.base_parse = void 0;
  const o = yt(), c = u(Ae()), s = u(/* @__PURE__ */ xt()), g = u(/* @__PURE__ */ Ct()), i = u(/* @__PURE__ */ wt()), r = u(/* @__PURE__ */ Tr()), t = u(/* @__PURE__ */ ne()), a = u(/* @__PURE__ */ Hr()), e = u(/* @__PURE__ */ zu());
  function d(S) {
    return JSON.parse(JSON.stringify(c.default.decode(S)));
  }
  const h = ["h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup"], l = ["details", "dialog", "dd", "div", "dt"], f = ["fieldset", "figcaption", "figure", "footer", "form"], n = ["table", "td", "tr"], m = ["address", "article", "aside", "blockquote", "br", "hr", "li", "main", "nav", "ol", "p", "pre", "section", "ul"], x = /* @__PURE__ */ new Set();
  function N(...S) {
    const b = (E) => {
      for (let w = 0; w < E.length; w++) {
        const T = E[w];
        x.add(T), x.add(T.toUpperCase());
      }
    };
    for (const E of S)
      b(E);
  }
  N(h, l, f, n, m);
  class q {
    _validate(b) {
      if (/\s/.test(b))
        throw new Error(`DOMException in DOMTokenList.add: The token '${b}' contains HTML space characters, which are not valid in tokens.`);
    }
    constructor(b = [], E = () => null) {
      this._set = new Set(b), this._afterUpdate = E;
    }
    add(b) {
      this._validate(b), this._set.add(b), this._afterUpdate(this);
    }
    replace(b, E) {
      this._validate(E), this._set.delete(b), this._set.add(E), this._afterUpdate(this);
    }
    remove(b) {
      this._set.delete(b) && this._afterUpdate(this);
    }
    toggle(b) {
      this._validate(b), this._set.has(b) ? this._set.delete(b) : this._set.add(b), this._afterUpdate(this);
    }
    contains(b) {
      return this._set.has(b);
    }
    get length() {
      return this._set.size;
    }
    values() {
      return this._set.values();
    }
    get value() {
      return Array.from(this._set.values());
    }
    toString() {
      return Array.from(this._set.values()).join(" ");
    }
  }
  class y extends t.default {
    /**
     * Quote attribute values
     * @param attr attribute value
     * @returns {string} quoted value
     */
    quoteAttribute(b) {
      return b == null ? "null" : JSON.stringify(b.replace(/"/g, "&quot;")).replace(/\\t/g, "	").replace(/\\n/g, `
`).replace(/\\r/g, "\r").replace(/\\/g, "");
    }
    /**
     * Creates an instance of HTMLElement.
     * @param keyAttrs	id and class attribute
     * @param [rawAttrs]	attributes in string
     *
     * @memberof HTMLElement
     */
    constructor(b, E, w = "", T = null, B, O = new i.default(), R = {}) {
      if (super(T, B), this.rawAttrs = w, this.voidTag = O, this.nodeType = e.default.ELEMENT_NODE, this.rawTagName = b, this.rawAttrs = w || "", this._id = E.id || "", this.childNodes = [], this._parseOptions = R, this.classList = new q(
        E.class ? E.class.split(/\s+/) : [],
        (U) => this.setAttribute("class", U.toString())
        // eslint-disable-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      ), E.id && (w || (this.rawAttrs = `id="${E.id}"`)), E.class && !w) {
        const U = `class="${this.classList.toString()}"`;
        this.rawAttrs ? this.rawAttrs += ` ${U}` : this.rawAttrs = U;
      }
    }
    /**
     * Remove Child element from childNodes array
     * @param {HTMLElement} node     node to remove
     */
    removeChild(b) {
      return this.childNodes = this.childNodes.filter((E) => E !== b), this;
    }
    /**
     * Exchanges given child with new child
     * @param {HTMLElement} oldNode     node to exchange
     * @param {HTMLElement} newNode     new node
     */
    exchangeChild(b, E) {
      const w = this.childNodes;
      return this.childNodes = w.map((T) => T === b ? E : T), this;
    }
    get tagName() {
      return this.rawTagName ? this.rawTagName.toUpperCase() : this.rawTagName;
    }
    set tagName(b) {
      this.rawTagName = b.toLowerCase();
    }
    get localName() {
      return this.rawTagName.toLowerCase();
    }
    get isVoidElement() {
      return this.voidTag.isVoidElement(this.localName);
    }
    get id() {
      return this._id;
    }
    set id(b) {
      this.setAttribute("id", b);
    }
    /**
     * Get escpaed (as-it) text value of current node and its children.
     * @return {string} text content
     */
    get rawText() {
      return /^br$/i.test(this.rawTagName) ? `
` : this.childNodes.reduce((b, E) => b += E.rawText, "");
    }
    get textContent() {
      return d(this.rawText);
    }
    set textContent(b) {
      const E = [new a.default(b, this)];
      this.childNodes = E;
    }
    /**
     * Get unescaped text value of current node and its children.
     * @return {string} text content
     */
    get text() {
      return d(this.rawText);
    }
    /**
     * Get structured Text (with '\n' etc.)
     * @return {string} structured text
     */
    get structuredText() {
      let b = [];
      const E = [b];
      function w(T) {
        if (T.nodeType === e.default.ELEMENT_NODE)
          x.has(T.rawTagName) ? (b.length > 0 && E.push(b = []), T.childNodes.forEach(w), b.length > 0 && E.push(b = [])) : T.childNodes.forEach(w);
        else if (T.nodeType === e.default.TEXT_NODE)
          if (T.isWhitespace)
            b.prependWhitespace = !0;
          else {
            let B = T.trimmedText;
            b.prependWhitespace && (B = ` ${B}`, b.prependWhitespace = !1), b.push(B);
          }
      }
      return w(this), E.map((T) => T.join("").replace(/\s{2,}/g, " ")).join(`
`).replace(/\s+$/, "");
    }
    toString() {
      const b = this.rawTagName;
      if (b) {
        const E = this.rawAttrs ? ` ${this.rawAttrs}` : "";
        return this.voidTag.formatNode(b, E, this.innerHTML);
      }
      return this.innerHTML;
    }
    get innerHTML() {
      return this.childNodes.map((b) => b.toString()).join("");
    }
    set innerHTML(b) {
      const E = v(b, this._parseOptions), w = E.childNodes.length ? E.childNodes : [new a.default(b, this)];
      F(w, this), F(this.childNodes, null), this.childNodes = w;
    }
    set_content(b, E = {}) {
      if (b instanceof t.default)
        b = [b];
      else if (typeof b == "string") {
        E = Object.assign(Object.assign({}, this._parseOptions), E);
        const w = v(b, E);
        b = w.childNodes.length ? w.childNodes : [new a.default(w.innerHTML, this)];
      }
      return F(this.childNodes, null), F(b, this), this.childNodes = b, this;
    }
    replaceWith(...b) {
      const E = this.parentNode, w = b.map((B) => {
        if (B instanceof t.default)
          return [B];
        if (typeof B == "string") {
          const O = v(B, this._parseOptions);
          return O.childNodes.length ? O.childNodes : [new a.default(B, this)];
        }
        return [];
      }).flat(), T = E.childNodes.findIndex((B) => B === this);
      return F([this], null), E.childNodes = [...E.childNodes.slice(0, T), ...F(w, E), ...E.childNodes.slice(T + 1)], this;
    }
    get outerHTML() {
      return this.toString();
    }
    /**
     * Trim element from right (in block) after seeing pattern in a TextNode.
     * @param  {RegExp} pattern pattern to find
     * @return {HTMLElement}    reference to current node
     */
    trimRight(b) {
      for (let E = 0; E < this.childNodes.length; E++) {
        const w = this.childNodes[E];
        if (w.nodeType === e.default.ELEMENT_NODE)
          w.trimRight(b);
        else {
          const T = w.rawText.search(b);
          T > -1 && (w.rawText = w.rawText.substr(0, T), this.childNodes.length = E + 1);
        }
      }
      return this;
    }
    /**
     * Get DOM structure
     * @return {string} structure
     */
    get structure() {
      const b = [];
      let E = 0;
      function w(B) {
        b.push("  ".repeat(E) + B);
      }
      function T(B) {
        const O = B._id ? `#${B._id}` : "", R = B.classList.length ? `.${B.classList.value.join(".")}` : "";
        w(`${B.rawTagName}${O}${R}`), E++, B.childNodes.forEach((U) => {
          U.nodeType === e.default.ELEMENT_NODE ? T(U) : U.nodeType === e.default.TEXT_NODE && (U.isWhitespace || w("#text"));
        }), E--;
      }
      return T(this), b.join(`
`);
    }
    /**
     * Remove whitespaces in this sub tree.
     * @return {HTMLElement} pointer to this
     */
    removeWhitespace() {
      let b = 0;
      this.childNodes.forEach((w) => {
        if (w.nodeType === e.default.TEXT_NODE) {
          if (w.isWhitespace)
            return;
          w.rawText = w.trimmedRawText;
        } else w.nodeType === e.default.ELEMENT_NODE && w.removeWhitespace();
        this.childNodes[b++] = w;
      }), this.childNodes.length = b;
      const E = Object.keys(this.rawAttributes).map((w) => {
        const T = this.rawAttributes[w];
        return `${w}=${JSON.stringify(T)}`;
      }).join(" ");
      return this.rawAttrs = E, delete this._rawAttrs, this;
    }
    /**
     * Query CSS selector to find matching nodes.
     * @param  {string}         selector Simplified CSS selector
     * @return {HTMLElement[]}  matching elements
     */
    querySelectorAll(b) {
      return (0, o.selectAll)(b, this, {
        xmlMode: !0,
        adapter: g.default
      });
    }
    /**
     * Query CSS Selector to find matching node.
     * @param  {string}         selector Simplified CSS selector
     * @return {(HTMLElement|null)}    matching node
     */
    querySelector(b) {
      return (0, o.selectOne)(b, this, {
        xmlMode: !0,
        adapter: g.default
      });
    }
    /**
     * Tests whether the node matches a given CSS selector.
     * @param  {string}   selector Simplified CSS selector
     * @return {boolean}
     */
    matches(b) {
      return (0, o.is)(this, b, {
        xmlMode: !0,
        adapter: g.default
      });
    }
    /**
     * find elements by their tagName
     * @param {string} tagName the tagName of the elements to select
     */
    getElementsByTagName(b) {
      const E = b.toUpperCase(), w = [], T = [];
      let B = this, O = 0;
      for (; O !== void 0; ) {
        let R;
        do
          R = B.childNodes[O++];
        while (O < B.childNodes.length && R === void 0);
        if (R === void 0) {
          B = B.parentNode, O = T.pop();
          continue;
        }
        R.nodeType === e.default.ELEMENT_NODE && ((b === "*" || R.tagName === E) && w.push(R), R.childNodes.length > 0 && (T.push(O), B = R, O = 0));
      }
      return w;
    }
    /**
     * find element by it's id
     * @param {string} id the id of the element to select
     * @returns {HTMLElement | null} the element with the given id or null if not found
     */
    getElementById(b) {
      const E = [];
      let w = this, T = 0;
      for (; T !== void 0; ) {
        let B;
        do
          B = w.childNodes[T++];
        while (T < w.childNodes.length && B === void 0);
        if (B === void 0) {
          w = w.parentNode, T = E.pop();
          continue;
        }
        if (B.nodeType === e.default.ELEMENT_NODE) {
          if (B._id === b)
            return B;
          B.childNodes.length > 0 && (E.push(T), w = B, T = 0);
        }
      }
      return null;
    }
    /**
     * traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string. Will return itself or the matching ancestor. If no such element exists, it returns null.
     * @param selector a DOMString containing a selector list
     * @returns {HTMLElement | null} the element with the given id or null if not found
     */
    closest(b) {
      const E = /* @__PURE__ */ new Map();
      let w = this, T = null;
      function B(O, R) {
        let U = null;
        for (let K = 0, nu = R.length; K < nu && !U; K++) {
          const Z = R[K];
          if (O(Z))
            U = Z;
          else {
            const $ = E.get(Z);
            $ && (U = B(O, [$]));
          }
        }
        return U;
      }
      for (; w; )
        E.set(w, T), T = w, w = w.parentNode;
      for (w = this; w; ) {
        const O = (0, o.selectOne)(b, w, {
          xmlMode: !0,
          adapter: Object.assign(Object.assign({}, g.default), {
            getChildren(R) {
              const U = E.get(R);
              return U && [U];
            },
            getSiblings(R) {
              return [R];
            },
            findOne: B,
            findAll() {
              return [];
            }
          })
        });
        if (O)
          return O;
        w = w.parentNode;
      }
      return null;
    }
    /**
     * Append a child node to childNodes
     * @param  {Node} node node to append
     * @return {Node}      node appended
     */
    appendChild(b) {
      return this.append(b), b;
    }
    /**
     * Get attributes
     * @access private
     * @return {Object} parsed and unescaped attributes
     */
    get attrs() {
      if (this._attrs)
        return this._attrs;
      this._attrs = {};
      const b = this.rawAttributes;
      for (const E in b) {
        const w = b[E] || "";
        this._attrs[E.toLowerCase()] = d(w);
      }
      return this._attrs;
    }
    get attributes() {
      const b = {}, E = this.rawAttributes;
      for (const w in E) {
        const T = E[w] || "";
        b[w] = d(T);
      }
      return b;
    }
    /**
     * Get escaped (as-is) attributes
     * @return {Object} parsed attributes
     */
    get rawAttributes() {
      if (this._rawAttrs)
        return this._rawAttrs;
      const b = {};
      if (this.rawAttrs) {
        const E = /([a-zA-Z()[\]#@$.?:][a-zA-Z0-9-._:()[\]#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g;
        let w;
        for (; w = E.exec(this.rawAttrs); ) {
          const T = w[1];
          let B = w[2] || null;
          B && (B[0] === "'" || B[0] === '"') && (B = B.slice(1, B.length - 1)), b[T] = b[T] || B;
        }
      }
      return this._rawAttrs = b, b;
    }
    removeAttribute(b) {
      const E = this.rawAttributes;
      return delete E[b], this._attrs && delete this._attrs[b], this.rawAttrs = Object.keys(E).map((w) => {
        const T = this.quoteAttribute(E[w]);
        return T === "null" || T === '""' ? w : `${w}=${T}`;
      }).join(" "), b === "id" && (this._id = ""), this;
    }
    hasAttribute(b) {
      return b.toLowerCase() in this.attrs;
    }
    /**
     * Get an attribute
     * @return {string | undefined} value of the attribute; or undefined if not exist
     */
    getAttribute(b) {
      return this.attrs[b.toLowerCase()];
    }
    /**
     * Set an attribute value to the HTMLElement
     * @param {string} key The attribute name
     * @param {string} value The value to set, or null / undefined to remove an attribute
     */
    setAttribute(b, E) {
      if (arguments.length < 2)
        throw new Error("Failed to execute 'setAttribute' on 'Element'");
      const w = b.toLowerCase(), T = this.rawAttributes;
      for (const B in T)
        if (B.toLowerCase() === w) {
          b = B;
          break;
        }
      return T[b] = String(E), this._attrs && (this._attrs[w] = d(T[b])), this.rawAttrs = Object.keys(T).map((B) => {
        const O = this.quoteAttribute(T[B]);
        return O === "null" || O === '""' ? B : `${B}=${O}`;
      }).join(" "), b === "id" && (this._id = E), this;
    }
    /**
     * Replace all the attributes of the HTMLElement by the provided attributes
     * @param {Attributes} attributes the new attribute set
     */
    setAttributes(b) {
      return this._attrs && delete this._attrs, this._rawAttrs && delete this._rawAttrs, this.rawAttrs = Object.keys(b).map((E) => {
        const w = b[E];
        return w === "null" || w === '""' ? E : `${E}=${this.quoteAttribute(String(w))}`;
      }).join(" "), "id" in b && (this._id = b.id), this;
    }
    insertAdjacentHTML(b, E) {
      if (arguments.length < 2)
        throw new Error("2 arguments required");
      const w = v(E, this._parseOptions);
      if (b === "afterend")
        this.after(...w.childNodes);
      else if (b === "afterbegin")
        this.prepend(...w.childNodes);
      else if (b === "beforeend")
        this.append(...w.childNodes);
      else if (b === "beforebegin")
        this.before(...w.childNodes);
      else
        throw new Error(`The value provided ('${b}') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'`);
      return this;
    }
    /** Prepend nodes or strings to this node's children. */
    prepend(...b) {
      const E = L(b);
      F(E, this), this.childNodes.unshift(...E);
    }
    /** Append nodes or strings to this node's children. */
    append(...b) {
      const E = L(b);
      F(E, this), this.childNodes.push(...E);
    }
    /** Insert nodes or strings before this node. */
    before(...b) {
      const E = L(b), w = this.parentNode.childNodes;
      F(E, this.parentNode), w.splice(w.indexOf(this), 0, ...E);
    }
    /** Insert nodes or strings after this node. */
    after(...b) {
      const E = L(b), w = this.parentNode.childNodes;
      F(E, this.parentNode), w.splice(w.indexOf(this) + 1, 0, ...E);
    }
    get nextSibling() {
      if (this.parentNode) {
        const b = this.parentNode.childNodes;
        let E = 0;
        for (; E < b.length; ) {
          const w = b[E++];
          if (this === w)
            return b[E] || null;
        }
        return null;
      }
    }
    get nextElementSibling() {
      if (this.parentNode) {
        const b = this.parentNode.childNodes;
        let E = 0, w = !1;
        for (; E < b.length; ) {
          const T = b[E++];
          if (w) {
            if (T instanceof y)
              return T || null;
          } else this === T && (w = !0);
        }
        return null;
      }
    }
    get previousSibling() {
      if (this.parentNode) {
        const b = this.parentNode.childNodes;
        let E = b.length;
        for (; E > 0; ) {
          const w = b[--E];
          if (this === w)
            return b[E - 1] || null;
        }
        return null;
      }
    }
    get previousElementSibling() {
      if (this.parentNode) {
        const b = this.parentNode.childNodes;
        let E = b.length, w = !1;
        for (; E > 0; ) {
          const T = b[--E];
          if (w) {
            if (T instanceof y)
              return T || null;
          } else this === T && (w = !0);
        }
        return null;
      }
    }
    /** Get all childNodes of type {@link HTMLElement}. */
    get children() {
      const b = [];
      for (const E of this.childNodes)
        E instanceof y && b.push(E);
      return b;
    }
    /**
     * Get the first child node.
     * @return The first child or undefined if none exists.
     */
    get firstChild() {
      return this.childNodes[0];
    }
    /**
     * Get the first child node of type {@link HTMLElement}.
     * @return The first child element or undefined if none exists.
     */
    get firstElementChild() {
      return this.children[0];
    }
    /**
     * Get the last child node.
     * @return The last child or undefined if none exists.
     */
    get lastChild() {
      return (0, s.default)(this.childNodes);
    }
    /**
     * Get the last child node of type {@link HTMLElement}.
     * @return The last child element or undefined if none exists.
     */
    get lastElementChild() {
      return this.children[this.children.length - 1];
    }
    get childElementCount() {
      return this.children.length;
    }
    get classNames() {
      return this.classList.toString();
    }
    /** Clone this Node */
    clone() {
      return v(this.toString(), this._parseOptions).firstChild;
    }
  }
  tu.default = y;
  const D = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z@\xB7\xC0-\xD6\xD8-\xF6\u00F8-\u03A1\u03A3-\u03D9\u03DB-\u03EF\u03F7-\u03FF\u0400-\u04FF\u0500-\u052F\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E00-\u1E9B\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64-\uAB65\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\x37F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/gu, p = /(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi, A = {
    li: { li: !0, LI: !0 },
    LI: { li: !0, LI: !0 },
    p: { p: !0, div: !0, P: !0, DIV: !0 },
    P: { p: !0, div: !0, P: !0, DIV: !0 },
    b: { div: !0, DIV: !0 },
    B: { div: !0, DIV: !0 },
    td: { td: !0, th: !0, TD: !0, TH: !0 },
    TD: { td: !0, th: !0, TD: !0, TH: !0 },
    th: { td: !0, th: !0, TD: !0, TH: !0 },
    TH: { td: !0, th: !0, TD: !0, TH: !0 },
    h1: { h1: !0, H1: !0 },
    H1: { h1: !0, H1: !0 },
    h2: { h2: !0, H2: !0 },
    H2: { h2: !0, H2: !0 },
    h3: { h3: !0, H3: !0 },
    H3: { h3: !0, H3: !0 },
    h4: { h4: !0, H4: !0 },
    H4: { h4: !0, H4: !0 },
    h5: { h5: !0, H5: !0 },
    H5: { h5: !0, H5: !0 },
    h6: { h6: !0, H6: !0 },
    H6: { h6: !0, H6: !0 }
  }, C = {
    li: { ul: !0, ol: !0, UL: !0, OL: !0 },
    LI: { ul: !0, ol: !0, UL: !0, OL: !0 },
    a: { div: !0, DIV: !0 },
    A: { div: !0, DIV: !0 },
    b: { div: !0, DIV: !0 },
    B: { div: !0, DIV: !0 },
    i: { div: !0, DIV: !0 },
    I: { div: !0, DIV: !0 },
    p: { div: !0, DIV: !0 },
    P: { div: !0, DIV: !0 },
    td: { tr: !0, table: !0, TR: !0, TABLE: !0 },
    TD: { tr: !0, table: !0, TR: !0, TABLE: !0 },
    th: { tr: !0, table: !0, TR: !0, TABLE: !0 },
    TH: { tr: !0, table: !0, TR: !0, TABLE: !0 }
  }, _ = {
    p: { a: !0, audio: !0, del: !0, ins: !0, map: !0, noscript: !0, video: !0 }
  }, k = "documentfragmentcontainer";
  function j(S, b = {}) {
    var E, w;
    const T = new i.default((E = b?.voidTag) === null || E === void 0 ? void 0 : E.closingSlash, (w = b?.voidTag) === null || w === void 0 ? void 0 : w.tags), B = b.blockTextElements || {
      script: !0,
      noscript: !0,
      style: !0,
      pre: !0
    }, O = Object.keys(B), R = O.map((z) => new RegExp(`^${z}$`, "i")), U = O.filter((z) => !!B[z]).map((z) => new RegExp(`^${z}$`, "i"));
    function K(z) {
      return U.some((iu) => iu.test(z));
    }
    function nu(z) {
      return R.some((iu) => iu.test(z));
    }
    const Z = (z, iu) => [z - Au, iu - Au], $ = new y(null, {}, "", null, [0, S.length], T, b);
    let M = $;
    const V = [$];
    let X = -1, bu, Du;
    S = `<${k}>${S}</${k}>`;
    const { lowerCaseTagName: mu, fixNestedATags: Wu } = b, Ju = S.length - (k.length + 2), Au = k.length + 2;
    for (; Du = D.exec(S); ) {
      let { 0: z, 1: iu, 2: W, 3: ye, 4: xe } = Du;
      const oe = z.length, Zu = D.lastIndex - oe, Bu = D.lastIndex;
      if (X > -1 && X + oe < Bu) {
        const cu = S.substring(X, Zu);
        M.appendChild(new a.default(cu, M, Z(X, Zu)));
      }
      if (X = D.lastIndex, W !== k) {
        if (z[1] === "!") {
          if (b.comment) {
            const cu = S.substring(Zu + 4, Bu - 3);
            M.appendChild(new r.default(cu, M, Z(Zu, Bu)));
          }
          continue;
        }
        if (mu && (W = W.toLowerCase()), !iu) {
          const cu = {};
          for (let qu; qu = p.exec(ye); ) {
            const { 1: Tu, 2: hu } = qu, Mu = hu[0] === "'" || hu[0] === '"';
            cu[Tu.toLowerCase()] = Mu ? hu.slice(1, hu.length - 1) : hu;
          }
          const Ru = M.rawTagName;
          !xe && !b.preserveTagNesting && A[Ru] && A[Ru][W] && (V.pop(), M = (0, s.default)(V)), Wu && (W === "a" || W === "A") && (bu !== void 0 && (V.splice(bu), M = (0, s.default)(V)), bu = V.length);
          const Y = D.lastIndex, Pu = Y - oe;
          if (M = M.appendChild(
            // Initialize range (end position updated later for closed tags)
            new y(W, cu, ye.slice(1), null, Z(Pu, Y), T, b)
          ), V.push(M), nu(W)) {
            const qu = `</${W}>`, Tu = mu ? S.toLocaleLowerCase().indexOf(qu, D.lastIndex) : S.indexOf(qu, D.lastIndex), hu = Tu === -1 ? Ju : Tu;
            if (K(W)) {
              const Mu = S.substring(Y, hu);
              Mu.length > 0 && /\S/.test(Mu) && M.appendChild(new a.default(Mu, M, Z(Y, hu)));
            }
            Tu === -1 ? X = D.lastIndex = S.length + 1 : (X = D.lastIndex = Tu + qu.length, iu = "/");
          }
        }
        if (iu || xe || T.isVoidElement(W))
          for (; ; )
            if (bu != null && (W === "a" || W === "A") && (bu = void 0), M.rawTagName === W) {
              M.range[1] = Z(-1, Math.max(X, Bu))[1], V.pop(), M = (0, s.default)(V);
              break;
            } else {
              const cu = M.tagName;
              if (C[cu] && C[cu][W]) {
                V.pop(), M = (0, s.default)(V);
                continue;
              }
              const Ru = M.rawTagName ? M.rawTagName.toLowerCase() : "";
              if (_[Ru]) {
                const Y = W.toLowerCase();
                if (V.length > 1) {
                  const Pu = V[V.length - 2];
                  if (Pu && Pu.rawTagName && Pu.rawTagName.toLowerCase() === Y && !_[Ru][Y]) {
                    M.range[1] = Z(-1, Math.max(X, Bu))[1], V.pop(), M = (0, s.default)(V);
                    continue;
                  }
                }
              }
              if (b.closeAllByClosing === !0) {
                let Y;
                for (Y = V.length - 2; Y >= 0 && V[Y].rawTagName !== W; Y--)
                  ;
                if (Y >= 0) {
                  for (; V.length > Y; )
                    M.range[1] = Z(-1, Math.max(X, Bu))[1], V.pop(), M = (0, s.default)(V);
                  continue;
                }
              }
              break;
            }
      }
    }
    return V;
  }
  tu.base_parse = j;
  function v(S, b = {}) {
    const E = j(S, b), [w] = E;
    for (; E.length > 1; ) {
      const T = E.pop(), B = (0, s.default)(E);
      T.parentNode && T.parentNode.parentNode && (T.parentNode === B && T.tagName === B.tagName ? b.parseNoneClosedTags !== !0 && (B.removeChild(T), T.childNodes.forEach((O) => {
        B.parentNode.appendChild(O);
      }), E.pop()) : b.parseNoneClosedTags !== !0 && (B.removeChild(T), T.childNodes.forEach((O) => {
        B.appendChild(O);
      })));
    }
    return w;
  }
  tu.parse = v;
  function L(S) {
    return S.map((b) => typeof b == "string" ? new a.default(b) : (b.remove(), b));
  }
  function F(S, b) {
    return S.map((E) => (E.parentNode = b, E));
  }
  return tu;
}
var De = {}, xr;
function Bt() {
  return xr || (xr = 1, (function(u) {
    Object.defineProperty(u, "__esModule", { value: !0 }), u.default = void 0;
    var o = /* @__PURE__ */ Ee();
    Object.defineProperty(u, "default", { enumerable: !0, get: function() {
      return o.parse;
    } });
  })(De)), De;
}
var te = {}, Cr;
function qt() {
  if (Cr) return te;
  Cr = 1, Object.defineProperty(te, "__esModule", { value: !0 });
  const u = /* @__PURE__ */ Ee();
  function o(c, s = {}) {
    return (0, u.base_parse)(c, s).length === 1;
  }
  return te.default = o, te;
}
var wr;
function Tt() {
  if (wr) return G;
  wr = 1;
  var u = G && G.__importDefault || function(e) {
    return e && e.__esModule ? e : { default: e };
  };
  Object.defineProperty(G, "__esModule", { value: !0 }), G.NodeType = G.TextNode = G.Node = G.valid = G.CommentNode = G.HTMLElement = G.parse = void 0;
  const o = u(/* @__PURE__ */ Tr());
  G.CommentNode = o.default;
  const c = u(/* @__PURE__ */ Ee());
  G.HTMLElement = c.default;
  const s = u(/* @__PURE__ */ ne());
  G.Node = s.default;
  const g = u(/* @__PURE__ */ Hr());
  G.TextNode = g.default;
  const i = u(/* @__PURE__ */ zu());
  G.NodeType = i.default;
  const r = u(/* @__PURE__ */ Bt()), t = u(/* @__PURE__ */ qt());
  G.valid = t.default;
  function a(e, d = {}) {
    return (0, r.default)(e, d);
  }
  return G.default = a, G.parse = a, a.parse = r.default, a.HTMLElement = c.default, a.CommentNode = o.default, a.valid = t.default, a.Node = s.default, a.TextNode = g.default, a.NodeType = i.default, G;
}
var ae = /* @__PURE__ */ Tt();
const Ur = "a-zA-Z_$", Ft = Ur + "0-9", Br = `[${Ur}][${Ft}]*`, qr = new RegExp(`this\\.${Br}(\\.${Br})*`), Nt = 5, Lt = (u) => u.substring(Nt).split(".")[0];
Vr.ssr = function(o = {}) {
  let c = "";
  const s = Object.keys(o);
  s.sort();
  for (const l of s) {
    const f = this.getAttrName(l);
    c += ` ${f}="${o[l]}"`;
  }
  const g = this.properties;
  for (const [l, f] of Object.entries(g))
    if (o[l] === void 0) {
      const { value: n } = f;
      n !== void 0 && (o[l] = n);
    }
  function i(l) {
    return new Function("return " + l).call(o);
  }
  function r(l) {
    const { attributes: f } = l;
    for (const [m, x] of Object.entries(f))
      if (qr.test(x)) {
        const N = i(x), q = Lt(m), y = g[q]?.value ?? "";
        N === y ? l.removeAttribute(m) : l.setAttribute(m, String(N));
      }
    const { childNodes: n } = l;
    n.forEach((m, x) => {
      if (m.nodeType === ae.NodeType.ELEMENT_NODE)
        r(m);
      else if (m.nodeType === ae.NodeType.COMMENT_NODE) {
        const N = m.textContent ?? "";
        if (qr.test(N)) {
          const q = i(N);
          n[x] = new ae.TextNode(String(q));
        }
      }
    });
  }
  const t = this.buildHTML(), a = ae.parse(t, { comment: !0 }), { children: e } = a;
  e.forEach(r);
  const d = e.map((l) => l.outerHTML).join(`
`), h = this.elementName;
  return `
      <${h}${c}>
        <template shadowrootmode="open">
          ${d}
        </template>
      </${h}>
    `;
};
export {
  Vr as Wrec,
  kt as WrecState,
  Rt as createElement,
  Pt as css,
  Mt as html
};

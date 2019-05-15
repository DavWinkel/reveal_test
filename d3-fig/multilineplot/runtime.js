function e(e, t, n) {
    n = n || {};
    var r = e.ownerDocument,
        i = r.defaultView.CustomEvent;
    "function" == typeof i ? i = new i(t, {
        detail: n
    }) : ((i = r.createEvent("Event")).initEvent(t, !1, !1), i.detail = n), e.dispatchEvent(i)
}

function t(e) {
    return Array.isArray(e) || e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array
}

function n(e) {
    return e === (0 | e) + ""
}

function r(e) {
    const t = document.createElement("span");
    return t.className = "observablehq--cellname", t.textContent = `${e} = `, t
}
const i = Symbol.prototype.toString;

function o(e) {
    return i.call(e)
}
const {
    getOwnPropertySymbols: s,
    prototype: {
        hasOwnProperty: a
    }
} = Object, {
    toStringTag: l
} = Symbol, u = {}, c = s;

function d(e, t) {
    return a.call(e, t)
}

function h(e) {
    return e[l] || e.constructor && e.constructor.name || "Object"
}

function p(e, t) {
    try {
        const n = e[t];
        return n && n.constructor, n
    } catch (e) {
        return u
    }
}

function f(n, i, o) {
    const s = t(n);
    let a, l, u;
    n instanceof Map ? (a = `Map(${n.size})`, l = m) : n instanceof Set ? (a = `Set(${n.size})`, l = g) : s ? (a = `${n.constructor.name}(${n.length})`, l = b) : (a = h(n), l = v);
    const c = document.createElement("span");
    c.className = "observablehq--expanded", o && c.appendChild(r(o));
    const d = c.appendChild(document.createElement("a"));
    d.innerHTML = "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M4 7L0 1h8z' fill='currentColor' />\n  </svg>", d.appendChild(document.createTextNode(`${a}${s?" [":" {"}`)), d.addEventListener("mouseup", function(e) {
        e.stopPropagation(), J(c, k(n, null, o))
    }), l = l(n);
    for (let e = 0; !(u = l.next()).done && e < 20; ++e) c.appendChild(u.value);
    if (!u.done) {
        const t = c.appendChild(document.createElement("a"));
        t.className = "observablehq--field", t.style.display = "block", t.appendChild(document.createTextNode("  … more")), t.addEventListener("mouseup", function(t) {
            t.stopPropagation(), c.insertBefore(u.value, c.lastChild.previousSibling);
            for (let e = 0; !(u = l.next()).done && e < 19; ++e) c.insertBefore(u.value, c.lastChild.previousSibling);
            u.done && c.removeChild(c.lastChild.previousSibling), e(c, "load")
        })
    }
    return c.appendChild(document.createTextNode(s ? "]" : "}")), c
}

function* m(e) {
    for (const [t, n] of e) yield w(t, n);
    yield* v(e)
}

function* g(e) {
    for (const t of e) yield y(t);
    yield* v(e)
}

function* b(e) {
    for (let t = 0, n = e.length; t < n; ++t) t in e && (yield _(t, p(e, t), "observablehq--index"));
    for (const t in e) !n(t) && d(e, t) && (yield _(t, p(e, t), "observablehq--key"));
    for (const t of c(e)) yield _(o(t), p(e, t), "observablehq--symbol")
}

function* v(e) {
    for (const t in e) d(e, t) && (yield _(t, p(e, t), "observablehq--key"));
    for (const t of c(e)) yield _(o(t), p(e, t), "observablehq--symbol")
}

function _(e, t, n) {
    const r = document.createElement("div"),
        i = r.appendChild(document.createElement("span"));
    return r.className = "observablehq--field", i.className = n, i.textContent = `  ${e}`, r.appendChild(document.createTextNode(": ")), r.appendChild(G(t)), r
}

function w(e, t) {
    const n = document.createElement("div");
    return n.className = "observablehq--field", n.appendChild(document.createTextNode("  ")), n.appendChild(G(e)), n.appendChild(document.createTextNode(" => ")), n.appendChild(G(t)), n
}

function y(e) {
    const t = document.createElement("div");
    return t.className = "observablehq--field", t.appendChild(document.createTextNode("  ")), t.appendChild(G(e)), t
}

function x(e) {
    const t = window.getSelection();
    return "Range" === t.type && (t.containsNode(e, !0) || t.anchorNode.isSelfOrDescendant(e) || t.focusNode.isSelfOrDescendant(e))
}

function k(e, n, i) {
    const o = t(e);
    let s, a, l;
    if (e instanceof Map ? (s = `Map(${e.size})`, a = C) : e instanceof Set ? (s = `Set(${e.size})`, a = E) : o ? (s = `${e.constructor.name}(${e.length})`, a = S) : (s = h(e), a = $), n) {
        const t = document.createElement("span");
        return t.className = "observablehq--shallow", i && t.appendChild(r(i)), t.appendChild(document.createTextNode(s)), t.addEventListener("mouseup", function(n) {
            x(t) || (n.stopPropagation(), J(t, k(e)))
        }), t
    }
    const u = document.createElement("span");
    u.className = "observablehq--collapsed", i && u.appendChild(r(i));
    const c = u.appendChild(document.createElement("a"));
    c.innerHTML = "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M7 4L1 8V0z' fill='currentColor' />\n  </svg>", c.appendChild(document.createTextNode(`${s}${o?" [":" {"}`)), u.addEventListener("mouseup", function(t) {
        x(u) || (t.stopPropagation(), J(u, f(e, 0, i)))
    }, !0), a = a(e);
    for (let e = 0; !(l = a.next()).done && e < 20; ++e) e > 0 && u.appendChild(document.createTextNode(", ")), u.appendChild(l.value);
    return l.done || u.appendChild(document.createTextNode(", …")), u.appendChild(document.createTextNode(o ? "]" : "}")), u
}

function* C(e) {
    for (const [t, n] of e) yield L(t, n);
    yield* $(e)
}

function* E(e) {
    for (const t of e) yield G(t, !0);
    yield* $(e)
}

function* S(e) {
    let t = -1,
        r = 0;
    for (const n = e.length; r < n; ++r) r in e && (r > t + 1 && (yield q(r - t - 1)), yield G(p(e, r), !0), t = r);
    r > t + 1 && (yield q(r - t - 1));
    for (const t in e) !n(t) && d(e, t) && (yield N(t, p(e, t), "observablehq--key"));
    for (const t of c(e)) yield N(o(t), p(e, t), "observablehq--symbol")
}

function* $(e) {
    for (const t in e) d(e, t) && (yield N(t, p(e, t), "observablehq--key"));
    for (const t of c(e)) yield N(o(t), p(e, t), "observablehq--symbol")
}

function q(e) {
    const t = document.createElement("span");
    return t.className = "observablehq--empty", t.textContent = 1 === e ? "empty" : `empty × ${e}`, t
}

function N(e, t, n) {
    const r = document.createDocumentFragment(),
        i = r.appendChild(document.createElement("span"));
    return i.className = n, i.textContent = e, r.appendChild(document.createTextNode(": ")), r.appendChild(G(t, !0)), r
}

function L(e, t) {
    const n = document.createDocumentFragment();
    return n.appendChild(G(e, !0)), n.appendChild(document.createTextNode(" => ")), n.appendChild(G(t, !0)), n
}

function P(e, t) {
    var n = e + "",
        r = n.length;
    return r < t ? new Array(t - r + 1).join(0) + n : n
}

function j(e) {
    return e < 0 ? "-" + P(-e, 6) : e > 9999 ? "+" + P(e, 6) : P(e, 4)
}
var A = Error.prototype.toString;
var O = RegExp.prototype.toString;
const T = 20;

function M(e) {
    return e.replace(/[\\`\x00-\x09\x0b-\x19]|\${/g, U)
}

function U(e) {
    var t = e.charCodeAt(0);
    switch (t) {
        case 8:
            return "\\b";
        case 9:
            return "\\t";
        case 11:
            return "\\v";
        case 12:
            return "\\f";
        case 13:
            return "\\r"
    }
    return t < 16 ? "\\x0" + t.toString(16) : t < 32 ? "\\x" + t.toString(16) : "\\" + e
}

function R(e, t) {
    for (var n = 0; t.exec(e);) ++n;
    return n
}
var z = Function.prototype.toString,
    F = {
        prefix: "async ƒ"
    },
    D = {
        prefix: "async ƒ*"
    },
    I = {
        prefix: "class"
    },
    H = {
        prefix: "ƒ"
    },
    W = {
        prefix: "ƒ*"
    };

function B(e, t, n) {
    var i = document.createElement("span");
    i.className = "observablehq--function", n && i.appendChild(r(n));
    var o = i.appendChild(document.createElement("span"));
    return o.className = "observablehq--keyword", o.textContent = e.prefix, i.appendChild(document.createTextNode(t)), i
}
const {
    prototype: {
        toString: V
    }
} = Object;

function G(e, t, n, i) {
    let s = typeof e;
    switch (s) {
        case "boolean":
        case "undefined":
            e += "";
            break;
        case "number":
            e = 0 === e && 1 / e < 0 ? "-0" : e + "";
            break;
        case "bigint":
            e += "n";
            break;
        case "symbol":
            e = o(e);
            break;
        case "function":
            return function(e, t) {
                var n, r, i = z.call(e);
                switch (e.constructor && e.constructor.name) {
                    case "AsyncFunction":
                        n = F;
                        break;
                    case "AsyncGeneratorFunction":
                        n = D;
                        break;
                    case "GeneratorFunction":
                        n = W;
                        break;
                    default:
                        n = /^class\b/.test(i) ? I : H
                }
                return n === I ? B(n, "", t) : (r = /^(?:async\s*)?(\w+)\s*=>/.exec(i)) ? B(n, "(" + r[1] + ")", t) : (r = /^(?:async\s*)?\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(i)) ? B(n, r[1] ? "(" + r[1].replace(/\s*,\s*/g, ", ") + ")" : "()", t) : (r = /^(?:async\s*)?function(?:\s*\*)?(?:\s*\w+)?\s*\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(i)) ? B(n, r[1] ? "(" + r[1].replace(/\s*,\s*/g, ", ") + ")" : "()", t) : B(n, "(…)", t)
            }(e, i);
        case "string":
            return function(e, t, n, i) {
                if (!1 === t) {
                    if (R(e, /["\n]/g) <= R(e, /`|\${/g)) {
                        const t = document.createElement("span");
                        i && t.appendChild(r(i));
                        const n = t.appendChild(document.createElement("span"));
                        return n.className = "observablehq--string", n.textContent = JSON.stringify(e), t
                    }
                    const o = e.split("\n");
                    if (o.length > T && !n) {
                        const n = document.createElement("div");
                        i && n.appendChild(r(i));
                        const s = n.appendChild(document.createElement("span"));
                        s.className = "observablehq--string", s.textContent = "`" + M(o.slice(0, T).join("\n"));
                        const a = n.appendChild(document.createElement("span")),
                            l = o.length - T;
                        return a.textContent = `Show ${l} truncated line${l>1?"s":""}`, a.className = "observablehq--string-expand", a.addEventListener("mouseup", function(r) {
                            r.stopPropagation(), J(n, G(e, t, !0, i))
                        }), n
                    }
                    const s = document.createElement("span");
                    i && s.appendChild(r(i));
                    const a = s.appendChild(document.createElement("span"));
                    return a.className = `observablehq--string${n?" observablehq--expanded":""}`, a.textContent = "`" + M(e) + "`", s
                }
                const o = document.createElement("span");
                i && o.appendChild(r(i));
                const s = o.appendChild(document.createElement("span"));
                return s.className = "observablehq--string", s.textContent = JSON.stringify(e.length > 100 ? `${e.slice(0,50)}…${e.slice(-49)}` : e), o
            }(e, t, n, i);
        default:
            if (null === e) {
                s = null, e = "null";
                break
            }
            if (e instanceof Date) {
                s = "date", a = e, e = isNaN(a) ? "Invalid Date" : function(e) {
                    return 0 === e.getUTCMilliseconds() && 0 === e.getUTCSeconds() && 0 === e.getUTCMinutes() && 0 === e.getUTCHours()
                }(a) ? j(a.getUTCFullYear()) + "-" + P(a.getUTCMonth() + 1, 2) + "-" + P(a.getUTCDate(), 2) : j(a.getFullYear()) + "-" + P(a.getMonth() + 1, 2) + "-" + P(a.getDate(), 2) + "T" + P(a.getHours(), 2) + ":" + P(a.getMinutes(), 2) + (a.getMilliseconds() ? ":" + P(a.getSeconds(), 2) + "." + P(a.getMilliseconds(), 3) : a.getSeconds() ? ":" + P(a.getSeconds(), 2) : "");
                break
            }
            if (e === u) {
                s = "forbidden", e = "[forbidden]";
                break
            }
            switch (V.call(e)) {
                case "[object RegExp]":
                    s = "regexp", e = function(e) {
                        return O.call(e)
                    }(e);
                    break;
                case "[object Error]":
                case "[object DOMException]":
                    s = "error", e = function(e) {
                        return e.stack || A.call(e)
                    }(e);
                    break;
                default:
                    return (n ? f : k)(e, t, i)
            }
    }
    var a;
    const l = document.createElement("span");
    i && l.appendChild(r(i));
    const c = l.appendChild(document.createElement("span"));
    return c.className = `observablehq--${s}`, c.textContent = e, l
}

function J(t, n) {
    t.classList.contains("observablehq--inspect") && n.classList.add("observablehq--inspect"), t.parentNode.replaceChild(n, t), e(n, "load")
}
const Y = /\s+\(\d+:\d+\)$/m;
class X {
    constructor(e) {
        if (!e) throw new Error("invalid node");
        this._node = e, e.classList.add("observablehq")
    }
    pending() {
        const {
            _node: e
        } = this;
        e.classList.remove("observablehq--error"), e.classList.add("observablehq--running")
    }
    fulfilled(t, n) {
        const {
            _node: r
        } = this;
        if ((!(t instanceof Element || t instanceof Text) || t.parentNode && t.parentNode !== r) && (t = G(t, !1, r.firstChild && r.firstChild.classList && r.firstChild.classList.contains("observablehq--expanded"), n)).classList.add("observablehq--inspect"), r.classList.remove("observablehq--running", "observablehq--error"), r.firstChild !== t)
            if (r.firstChild) {
                for (; r.lastChild !== r.firstChild;) r.removeChild(r.lastChild);
                r.replaceChild(t, r.firstChild)
            } else r.appendChild(t);
        e(r, "update")
    }
    rejected(t, n) {
        const {
            _node: i
        } = this;
        for (i.classList.remove("observablehq--running"), i.classList.add("observablehq--error"); i.lastChild;) i.removeChild(i.lastChild);
        var o = document.createElement("div");
        o.className = "observablehq--inspect", n && o.appendChild(r(n)), o.appendChild(document.createTextNode((t + "").replace(Y, ""))), i.appendChild(o), e(i, "error", {
            error: t
        })
    }
}

function K(e) {
    return function() {
        return e
    }
}
X.into = function(e) {
    if ("string" == typeof e && null == (e = document.querySelector(e))) throw new Error("container not found");
    return function() {
        return new X(e.appendChild(document.createElement("div")))
    }
};
var Q = {
    math: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};
var Z = 0;

function ee(e) {
    this.id = e, this.href = window.location.href + "#" + e
}
ee.prototype.toString = function() {
    return "url(" + this.href + ")"
};
var te = {
    canvas: function(e, t) {
        var n = document.createElement("canvas");
        return n.width = e, n.height = t, n
    },
    context2d: function(e, t, n) {
        null == n && (n = devicePixelRatio);
        var r = document.createElement("canvas");
        r.width = e * n, r.height = t * n, r.style.width = e + "px";
        var i = r.getContext("2d");
        return i.scale(n, n), i
    },
    download: function(e, t = "untitled", n = "Save") {
        const r = document.createElement("a"),
            i = r.appendChild(document.createElement("button"));
        async function o() {
            await new Promise(requestAnimationFrame), URL.revokeObjectURL(r.href), r.removeAttribute("href"), i.textContent = n, i.disabled = !1
        }
        return i.textContent = n, r.download = t, r.onclick = (async t => {
            if (i.disabled = !0, r.href) return o();
            i.textContent = "Saving…";
            try {
                const t = await ("function" == typeof e ? e() : e);
                i.textContent = "Download", r.href = URL.createObjectURL(t)
            } catch (e) {
                i.textContent = n
            }
            if (t.eventPhase) return o();
            i.disabled = !1
        }), r
    },
    element: function(e, t) {
        var n, r = e += "",
            i = r.indexOf(":");
        i >= 0 && "xmlns" !== (r = e.slice(0, i)) && (e = e.slice(i + 1));
        var o = Q.hasOwnProperty(r) ? document.createElementNS(Q[r], e) : document.createElement(e);
        if (t)
            for (var s in t) i = (r = s).indexOf(":"), n = t[s], i >= 0 && "xmlns" !== (r = s.slice(0, i)) && (s = s.slice(i + 1)), Q.hasOwnProperty(r) ? o.setAttributeNS(Q[r], s, n) : o.setAttribute(s, n);
        return o
    },
    input: function(e) {
        var t = document.createElement("input");
        return null != e && (t.type = e), t
    },
    range: function(e, t, n) {
        1 === arguments.length && (t = e, e = null);
        var r = document.createElement("input");
        return r.min = e = null == e ? 0 : +e, r.max = t = null == t ? 1 : +t, r.step = null == n ? "any" : n = +n, r.type = "range", r
    },
    select: function(e) {
        var t = document.createElement("select");
        return Array.prototype.forEach.call(e, function(e) {
            var n = document.createElement("option");
            n.value = n.textContent = e, t.appendChild(n)
        }), t
    },
    svg: function(e, t) {
        var n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return n.setAttribute("viewBox", [0, 0, e, t]), n.setAttribute("width", e), n.setAttribute("height", t), n
    },
    text: function(e) {
        return document.createTextNode(e)
    },
    uid: function(e) {
        return new ee("O-" + (null == e ? "" : e + "-") + ++Z)
    }
};
var ne = {
    buffer: function(e) {
        return new Promise(function(t, n) {
            var r = new FileReader;
            r.onload = function() {
                t(r.result)
            }, r.onerror = n, r.readAsArrayBuffer(e)
        })
    },
    text: function(e) {
        return new Promise(function(t, n) {
            var r = new FileReader;
            r.onload = function() {
                t(r.result)
            }, r.onerror = n, r.readAsText(e)
        })
    },
    url: function(e) {
        return new Promise(function(t, n) {
            var r = new FileReader;
            r.onload = function() {
                t(r.result)
            }, r.onerror = n, r.readAsDataURL(e)
        })
    }
};

function re() {
    return this
}

function ie(e, t) {
    let n = !1;
    return {
        [Symbol.iterator]: re,
        next: () => n ? {
            done: !0
        } : (n = !0, {
            done: !1,
            value: e
        }),
        return: () => (n = !0, t(e), {
            done: !0
        }),
        throw: () => ({
            done: n = !0
        })
    }
}

function oe(e) {
    let t, n, r = !1;
    const i = e(function(e) {
        n ? (n(e), n = null) : r = !0;
        return t = e
    });
    return {
        [Symbol.iterator]: re,
        throw: () => ({
            done: !0
        }),
        return: () => (null != i && i(), {
            done: !0
        }),
        next: function() {
            return {
                done: !1,
                value: r ? (r = !1, Promise.resolve(t)) : new Promise(e => n = e)
            }
        }
    }
}

function se(e) {
    switch (e.type) {
        case "range":
        case "number":
            return e.valueAsNumber;
        case "date":
            return e.valueAsDate;
        case "checkbox":
            return e.checked;
        case "file":
            return e.multiple ? e.files : e.files[0];
        default:
            return e.value
    }
}
var ae = {
    disposable: ie,
    filter: function*(e, t) {
        for (var n, r = -1; !(n = e.next()).done;) t(n.value, ++r) && (yield n.value)
    },
    input: function(e) {
        return oe(function(t) {
            var n = function(e) {
                    switch (e.type) {
                        case "button":
                        case "submit":
                        case "checkbox":
                            return "click";
                        case "file":
                            return "change";
                        default:
                            return "input"
                    }
                }(e),
                r = se(e);

            function i() {
                t(se(e))
            }
            return e.addEventListener(n, i), void 0 !== r && t(r),
                function() {
                    e.removeEventListener(n, i)
                }
        })
    },
    map: function*(e, t) {
        for (var n, r = -1; !(n = e.next()).done;) yield t(n.value, ++r)
    },
    observe: oe,
    queue: function(e) {
        let t;
        const n = [],
            r = e(function(e) {
                return n.push(e), t && (t(n.shift()), t = null), e
            });
        return {
            [Symbol.iterator]: re,
            throw: () => ({
                done: !0
            }),
            return: () => (null != r && r(), {
                done: !0
            }),
            next: function() {
                return {
                    done: !1,
                    value: n.length ? Promise.resolve(n.shift()) : new Promise(e => t = e)
                }
            }
        }
    },
    range: function*(e, t, n) {
        e = +e, t = +t, n = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +n;
        for (var r = -1, i = 0 | Math.max(0, Math.ceil((t - e) / n)); ++r < i;) yield e + r * n
    },
    valueAt: function(e, t) {
        if (!(!isFinite(t = +t) || t < 0 || t != t | 0))
            for (var n, r = -1; !(n = e.next()).done;)
                if (++r === t) return n.value
    },
    worker: function(e) {
        const t = URL.createObjectURL(new Blob([e], {
                type: "text/javascript"
            })),
            n = new Worker(t);
        return ie(n, () => {
            n.terminate(), URL.revokeObjectURL(t)
        })
    }
};

function le(e, t) {
    return function(n) {
        var r, i, o, s, a, l, u, c, d = n[0],
            h = [],
            p = null,
            f = -1;
        for (a = 1, l = arguments.length; a < l; ++a) {
            if ((r = arguments[a]) instanceof Node) h[++f] = r, d += "\x3c!--o:" + f + "--\x3e";
            else if (Array.isArray(r)) {
                for (u = 0, c = r.length; u < c; ++u)(i = r[u]) instanceof Node ? (null === p && (h[++f] = p = document.createDocumentFragment(), d += "\x3c!--o:" + f + "--\x3e"), p.appendChild(i)) : (p = null, d += i);
                p = null
            } else d += r;
            d += n[a]
        }
        if (p = e(d), ++f > 0) {
            for (o = new Array(f), s = document.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null, !1); s.nextNode();) i = s.currentNode, /^o:/.test(i.nodeValue) && (o[+i.nodeValue.slice(2)] = i);
            for (a = 0; a < f; ++a)(i = o[a]) && i.parentNode.replaceChild(h[a], i)
        }
        return 1 === p.childNodes.length ? p.removeChild(p.firstChild) : 11 === p.nodeType ? ((i = t()).appendChild(p), i) : p
    }
}
var ue = le(function(e) {
        var t = document.createElement("template");
        return t.innerHTML = e.trim(), document.importNode(t.content, !0)
    }, function() {
        return document.createElement("span")
    }),
    ce = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: ye,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        nptable: ye,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        table: ye,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/
    };

function de(e) {
    this.tokens = [], this.tokens.links = {}, this.options = e || ke.defaults, this.rules = ce.normal, this.options.gfm && (this.options.tables ? this.rules = ce.tables : this.rules = ce.gfm)
}
ce.bullet = /(?:[*+-]|\d+\.)/, ce.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, ce.item = be(ce.item, "gm")(/bull/g, ce.bullet)(), ce.list = be(ce.list)(/bull/g, ce.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + ce.def.source + ")")(), ce.blockquote = be(ce.blockquote)("def", ce.def)(), ce._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", ce.html = be(ce.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, ce._tag)(), ce.paragraph = be(ce.paragraph)("hr", ce.hr)("heading", ce.heading)("lheading", ce.lheading)("blockquote", ce.blockquote)("tag", "<" + ce._tag)("def", ce.def)(), ce.normal = xe({}, ce), ce.gfm = xe({}, ce.normal, {
    fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
    paragraph: /^/,
    heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
}), ce.gfm.paragraph = be(ce.paragraph)("(?!", "(?!" + ce.gfm.fences.source.replace("\\1", "\\2") + "|" + ce.list.source.replace("\\1", "\\3") + "|")(), ce.tables = xe({}, ce.gfm, {
    nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
    table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
}), de.rules = ce, de.lex = function(e, t) {
    return new de(t).lex(e)
}, de.prototype.lex = function(e) {
    return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0)
}, de.prototype.token = function(e, t, n) {
    var r, i, o, s, a, l, u, c, d;
    for (e = e.replace(/^ +$/gm, ""); e;)
        if ((o = this.rules.newline.exec(e)) && (e = e.substring(o[0].length), o[0].length > 1 && this.tokens.push({
                type: "space"
            })), o = this.rules.code.exec(e)) e = e.substring(o[0].length), o = o[0].replace(/^ {4}/gm, ""), this.tokens.push({
            type: "code",
            text: this.options.pedantic ? o : o.replace(/\n+$/, "")
        });
        else if (o = this.rules.fences.exec(e)) e = e.substring(o[0].length), this.tokens.push({
        type: "code",
        lang: o[2],
        text: o[3] || ""
    });
    else if (o = this.rules.heading.exec(e)) e = e.substring(o[0].length), this.tokens.push({
        type: "heading",
        depth: o[1].length,
        text: o[2]
    });
    else if (t && (o = this.rules.nptable.exec(e))) {
        for (e = e.substring(o[0].length), l = {
                type: "table",
                header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: o[3].replace(/\n$/, "").split("\n")
            }, c = 0; c < l.align.length; c++) /^ *-+: *$/.test(l.align[c]) ? l.align[c] = "right" : /^ *:-+: *$/.test(l.align[c]) ? l.align[c] = "center" : /^ *:-+ *$/.test(l.align[c]) ? l.align[c] = "left" : l.align[c] = null;
        for (c = 0; c < l.cells.length; c++) l.cells[c] = l.cells[c].split(/ *\| */);
        this.tokens.push(l)
    } else if (o = this.rules.lheading.exec(e)) e = e.substring(o[0].length), this.tokens.push({
        type: "heading",
        depth: "=" === o[2] ? 1 : 2,
        text: o[1]
    });
    else if (o = this.rules.hr.exec(e)) e = e.substring(o[0].length), this.tokens.push({
        type: "hr"
    });
    else if (o = this.rules.blockquote.exec(e)) e = e.substring(o[0].length), this.tokens.push({
        type: "blockquote_start"
    }), o = o[0].replace(/^ *> ?/gm, ""), this.token(o, t, !0), this.tokens.push({
        type: "blockquote_end"
    });
    else if (o = this.rules.list.exec(e)) {
        for (e = e.substring(o[0].length), s = o[2], this.tokens.push({
                type: "list_start",
                ordered: s.length > 1
            }), r = !1, d = (o = o[0].match(this.rules.item)).length, c = 0; c < d; c++) u = (l = o[c]).length, ~(l = l.replace(/^ *([*+-]|\d+\.) +/, "")).indexOf("\n ") && (u -= l.length, l = this.options.pedantic ? l.replace(/^ {1,4}/gm, "") : l.replace(new RegExp("^ {1," + u + "}", "gm"), "")), this.options.smartLists && c !== d - 1 && (s === (a = ce.bullet.exec(o[c + 1])[0]) || s.length > 1 && a.length > 1 || (e = o.slice(c + 1).join("\n") + e, c = d - 1)), i = r || /\n\n(?!\s*$)/.test(l), c !== d - 1 && (r = "\n" === l.charAt(l.length - 1), i || (i = r)), this.tokens.push({
            type: i ? "loose_item_start" : "list_item_start"
        }), this.token(l, !1, n), this.tokens.push({
            type: "list_item_end"
        });
        this.tokens.push({
            type: "list_end"
        })
    } else if (o = this.rules.html.exec(e)) e = e.substring(o[0].length), this.tokens.push({
        type: this.options.sanitize ? "paragraph" : "html",
        pre: !this.options.sanitizer && ("pre" === o[1] || "script" === o[1] || "style" === o[1]),
        text: o[0]
    });
    else if (!n && t && (o = this.rules.def.exec(e))) e = e.substring(o[0].length), this.tokens.links[o[1].toLowerCase()] = {
        href: o[2],
        title: o[3]
    };
    else if (t && (o = this.rules.table.exec(e))) {
        for (e = e.substring(o[0].length), l = {
                type: "table",
                header: o[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: o[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: o[3].replace(/(?: *\| *)?\n$/, "").split("\n")
            }, c = 0; c < l.align.length; c++) /^ *-+: *$/.test(l.align[c]) ? l.align[c] = "right" : /^ *:-+: *$/.test(l.align[c]) ? l.align[c] = "center" : /^ *:-+ *$/.test(l.align[c]) ? l.align[c] = "left" : l.align[c] = null;
        for (c = 0; c < l.cells.length; c++) l.cells[c] = l.cells[c].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
        this.tokens.push(l)
    } else if (t && (o = this.rules.paragraph.exec(e))) e = e.substring(o[0].length), this.tokens.push({
        type: "paragraph",
        text: "\n" === o[1].charAt(o[1].length - 1) ? o[1].slice(0, -1) : o[1]
    });
    else if (o = this.rules.text.exec(e)) e = e.substring(o[0].length), this.tokens.push({
        type: "text",
        text: o[0]
    });
    else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
    return this.tokens
};
var he = {
    escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
    autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
    url: ye,
    tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
    link: /^!?\[(inside)\]\(href\)/,
    reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
    nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
    strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
    em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
    code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
    br: /^ {2,}\n(?!\s*$)/,
    del: ye,
    text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

function pe(e, t) {
    if (this.options = t || ke.defaults, this.links = e, this.rules = he.normal, this.renderer = this.options.renderer || new fe, this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");
    this.options.gfm ? this.options.breaks ? this.rules = he.breaks : this.rules = he.gfm : this.options.pedantic && (this.rules = he.pedantic)
}

function fe(e) {
    this.options = e || {}
}

function me(e) {
    this.tokens = [], this.token = null, this.options = e || ke.defaults, this.options.renderer = this.options.renderer || new fe, this.renderer = this.options.renderer, this.renderer.options = this.options
}

function ge(e, t) {
    return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

function be(e, t) {
    return e = e.source, t = t || "",
        function n(r, i) {
            return r ? (i = (i = i.source || i).replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, i), n) : new RegExp(e, t)
        }
}

function ve(e, t) {
    return _e[" " + e] || (/^[^:]+:\/*[^\/]*$/.test(e) ? _e[" " + e] = e + "/" : _e[" " + e] = e.replace(/[^\/]*$/, "")), e = _e[" " + e], "//" === t.slice(0, 2) ? e.replace(/:[\s\S]*/, ":") + t : "/" === t.charAt(0) ? e.replace(/(:\/*[^\/]*)[\s\S]*/, "$1") + t : e + t
}
he._inside = /(?:\[[^\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/, he._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, he.link = be(he.link)("inside", he._inside)("href", he._href)(), he.reflink = be(he.reflink)("inside", he._inside)(), he.normal = xe({}, he), he.pedantic = xe({}, he.normal, {
    strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
}), he.gfm = xe({}, he.normal, {
    escape: be(he.escape)("])", "~|])")(),
    url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
    del: /^~~(?=\S)([\s\S]*?\S)~~/,
    text: be(he.text)("]|", "~]|")("|", "|https?://|")()
}), he.breaks = xe({}, he.gfm, {
    br: be(he.br)("{2,}", "*")(),
    text: be(he.gfm.text)("{2,}", "*")()
}), pe.rules = he, pe.output = function(e, t, n) {
    return new pe(t, n).output(e)
}, pe.prototype.output = function(e) {
    for (var t, n, r, i, o = ""; e;)
        if (i = this.rules.escape.exec(e)) e = e.substring(i[0].length), o += i[1];
        else if (i = this.rules.autolink.exec(e)) e = e.substring(i[0].length), "@" === i[2] ? (n = ge(":" === i[1].charAt(6) ? this.mangle(i[1].substring(7)) : this.mangle(i[1])), r = this.mangle("mailto:") + n) : r = n = ge(i[1]), o += this.renderer.link(r, null, n);
    else if (this.inLink || !(i = this.rules.url.exec(e))) {
        if (i = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(i[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1), e = e.substring(i[0].length), o += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(i[0]) : ge(i[0]) : i[0];
        else if (i = this.rules.link.exec(e)) e = e.substring(i[0].length), this.inLink = !0, o += this.outputLink(i, {
            href: i[2],
            title: i[3]
        }), this.inLink = !1;
        else if ((i = this.rules.reflink.exec(e)) || (i = this.rules.nolink.exec(e))) {
            if (e = e.substring(i[0].length), t = (i[2] || i[1]).replace(/\s+/g, " "), !(t = this.links[t.toLowerCase()]) || !t.href) {
                o += i[0].charAt(0), e = i[0].substring(1) + e;
                continue
            }
            this.inLink = !0, o += this.outputLink(i, t), this.inLink = !1
        } else if (i = this.rules.strong.exec(e)) e = e.substring(i[0].length), o += this.renderer.strong(this.output(i[2] || i[1]));
        else if (i = this.rules.em.exec(e)) e = e.substring(i[0].length), o += this.renderer.em(this.output(i[2] || i[1]));
        else if (i = this.rules.code.exec(e)) e = e.substring(i[0].length), o += this.renderer.codespan(ge(i[2].trim(), !0));
        else if (i = this.rules.br.exec(e)) e = e.substring(i[0].length), o += this.renderer.br();
        else if (i = this.rules.del.exec(e)) e = e.substring(i[0].length), o += this.renderer.del(this.output(i[1]));
        else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), o += this.renderer.text(ge(this.smartypants(i[0])));
        else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
    } else e = e.substring(i[0].length), r = n = ge(i[1]), o += this.renderer.link(r, null, n);
    return o
}, pe.prototype.outputLink = function(e, t) {
    var n = ge(t.href),
        r = t.title ? ge(t.title) : null;
    return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, ge(e[1]))
}, pe.prototype.smartypants = function(e) {
    return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014\/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
}, pe.prototype.mangle = function(e) {
    if (!this.options.mangle) return e;
    for (var t, n = "", r = e.length, i = 0; i < r; i++) t = e.charCodeAt(i), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
    return n
}, fe.prototype.code = function(e, t, n) {
    if (this.options.highlight) {
        var r = this.options.highlight(e, t);
        null != r && r !== e && (n = !0, e = r)
    }
    return t ? '<pre><code class="' + this.options.langPrefix + ge(t, !0) + '">' + (n ? e : ge(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : ge(e, !0)) + "\n</code></pre>"
}, fe.prototype.blockquote = function(e) {
    return "<blockquote>\n" + e + "</blockquote>\n"
}, fe.prototype.html = function(e) {
    return e
}, fe.prototype.heading = function(e, t, n) {
    return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
}, fe.prototype.hr = function() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
}, fe.prototype.list = function(e, t) {
    var n = t ? "ol" : "ul";
    return "<" + n + ">\n" + e + "</" + n + ">\n"
}, fe.prototype.listitem = function(e) {
    return "<li>" + e + "</li>\n"
}, fe.prototype.paragraph = function(e) {
    return "<p>" + e + "</p>\n"
}, fe.prototype.table = function(e, t) {
    return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
}, fe.prototype.tablerow = function(e) {
    return "<tr>\n" + e + "</tr>\n"
}, fe.prototype.tablecell = function(e, t) {
    var n = t.header ? "th" : "td";
    return (t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">") + e + "</" + n + ">\n"
}, fe.prototype.strong = function(e) {
    return "<strong>" + e + "</strong>"
}, fe.prototype.em = function(e) {
    return "<em>" + e + "</em>"
}, fe.prototype.codespan = function(e) {
    return "<code>" + e + "</code>"
}, fe.prototype.br = function() {
    return this.options.xhtml ? "<br/>" : "<br>"
}, fe.prototype.del = function(e) {
    return "<del>" + e + "</del>"
}, fe.prototype.link = function(e, t, n) {
    if (this.options.sanitize) {
        try {
            var r = decodeURIComponent((i = e, i.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, function(e, t) {
                return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
            }))).replace(/[^\w:]/g, "").toLowerCase()
        } catch (e) {
            return n
        }
        if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:") || 0 === r.indexOf("data:")) return n
    }
    var i;
    this.options.baseUrl && !we.test(e) && (e = ve(this.options.baseUrl, e));
    var o = '<a href="' + e + '"';
    return t && (o += ' title="' + t + '"'), o += ">" + n + "</a>"
}, fe.prototype.image = function(e, t, n) {
    this.options.baseUrl && !we.test(e) && (e = ve(this.options.baseUrl, e));
    var r = '<img src="' + e + '" alt="' + n + '"';
    return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">"
}, fe.prototype.text = function(e) {
    return e
}, me.parse = function(e, t, n) {
    return new me(t, n).parse(e)
}, me.prototype.parse = function(e) {
    this.inline = new pe(e.links, this.options, this.renderer), this.tokens = e.reverse();
    for (var t = ""; this.next();) t += this.tok();
    return t
}, me.prototype.next = function() {
    return this.token = this.tokens.pop()
}, me.prototype.peek = function() {
    return this.tokens[this.tokens.length - 1] || 0
}, me.prototype.parseText = function() {
    for (var e = this.token.text;
        "text" === this.peek().type;) e += "\n" + this.next().text;
    return this.inline.output(e)
}, me.prototype.tok = function() {
    switch (this.token.type) {
        case "space":
            return "";
        case "hr":
            return this.renderer.hr();
        case "heading":
            return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
        case "code":
            return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
        case "table":
            var e, t, n, r, i = "",
                o = "";
            for (n = "", e = 0; e < this.token.header.length; e++)({
                header: !0,
                align: this.token.align[e]
            }), n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
                header: !0,
                align: this.token.align[e]
            });
            for (i += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
                for (t = this.token.cells[e], n = "", r = 0; r < t.length; r++) n += this.renderer.tablecell(this.inline.output(t[r]), {
                    header: !1,
                    align: this.token.align[r]
                });
                o += this.renderer.tablerow(n)
            }
            return this.renderer.table(i, o);
        case "blockquote_start":
            for (o = "";
                "blockquote_end" !== this.next().type;) o += this.tok();
            return this.renderer.blockquote(o);
        case "list_start":
            o = "";
            for (var s = this.token.ordered;
                "list_end" !== this.next().type;) o += this.tok();
            return this.renderer.list(o, s);
        case "list_item_start":
            for (o = "";
                "list_item_end" !== this.next().type;) o += "text" === this.token.type ? this.parseText() : this.tok();
            return this.renderer.listitem(o);
        case "loose_item_start":
            for (o = "";
                "list_item_end" !== this.next().type;) o += this.tok();
            return this.renderer.listitem(o);
        case "html":
            var a = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
            return this.renderer.html(a);
        case "paragraph":
            return this.renderer.paragraph(this.inline.output(this.token.text));
        case "text":
            return this.renderer.paragraph(this.parseText())
    }
};
var _e = {},
    we = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function ye() {}

function xe(e) {
    for (var t, n, r = 1; r < arguments.length; r++)
        for (n in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e
}

function ke(e, t, n) {
    if (n || "function" == typeof t) {
        n || (n = t, t = null);
        var r, i, o = (t = xe({}, ke.defaults, t || {})).highlight,
            s = 0;
        try {
            r = de.lex(e, t)
        } catch (e) {
            return n(e)
        }
        i = r.length;
        var a = function(e) {
            if (e) return t.highlight = o, n(e);
            var i;
            try {
                i = me.parse(r, t)
            } catch (t) {
                e = t
            }
            return t.highlight = o, e ? n(e) : n(null, i)
        };
        if (!o || o.length < 3) return a();
        if (delete t.highlight, !i) return a();
        for (; s < r.length; s++) ! function(e) {
            "code" !== e.type ? --i || a() : o(e.text, e.lang, function(t, n) {
                return t ? a(t) : null == n || n === e.text ? --i || a() : (e.text = n, e.escaped = !0, void(--i || a()))
            })
        }(r[s])
    } else try {
        return t && (t = xe({}, ke.defaults, t)), me.parse(de.lex(e, t), t)
    } catch (e) {
        if (e.message += "\nPlease report this to https://github.com/chjj/marked.", (t || ke.defaults).silent) return "<p>An error occurred:</p><pre>" + ge(e.message + "", !0) + "</pre>";
        throw e
    }
}
ye.exec = ye, ke.options = ke.setOptions = function(e) {
    return xe(ke.defaults, e), ke
}, ke.defaults = {
    gfm: !0,
    tables: !0,
    breaks: !1,
    pedantic: !1,
    sanitize: !1,
    sanitizer: null,
    mangle: !0,
    smartLists: !1,
    silent: !1,
    highlight: null,
    langPrefix: "lang-",
    smartypants: !1,
    headerPrefix: "",
    renderer: new fe,
    xhtml: !1,
    baseUrl: null
}, ke.Parser = me, ke.parser = me.parse, ke.Renderer = fe, ke.Lexer = de, ke.lexer = de.lex, ke.InlineLexer = pe, ke.inlineLexer = pe.output, ke.parse = ke;
const Ce = "https://cdn.jsdelivr.net/npm/@observablehq/highlight.js@2.0.0/";

function Ee(e) {
    return function() {
        return le(function(t) {
            var n = document.createElement("div");
            n.innerHTML = ke(t, {
                langPrefix: ""
            }).trim();
            var r = n.querySelectorAll("pre code[class]");
            return r.length > 0 && e(Ce + "highlight.min.js").then(function(t) {
                r.forEach(function(n) {
                    function r() {
                        t.highlightBlock(n), n.parentNode.classList.add("observablehq--md-pre")
                    }
                    t.getLanguage(n.className) ? r() : e(Ce + "async-languages/index.js").then(r => {
                        if (r.has(n.className)) return e(Ce + "async-languages/" + r.get(n.className)).then(e => {
                            t.registerLanguage(n.className, e)
                        })
                    }).then(r, r)
                })
            }), n
        }, function() {
            return document.createElement("div")
        })
    }
}

function Se(e) {
    let t;
    Object.defineProperties(this, {
        generator: {
            value: oe(e => void(t = e))
        },
        value: {
            get: () => e,
            set: n => t(e = n)
        }
    }), void 0 !== e && t(e)
}

function* $e() {
    for (;;) yield Date.now()
}
var qe = new Map;

function Ne(e, t) {
    var n;
    return (n = qe.get(e = +e)) ? n.then(K(t)) : (n = Date.now()) >= e ? Promise.resolve(t) : function(e, t) {
        var n = new Promise(function(n) {
            qe.delete(t);
            var r = t - e;
            if (!(r > 0)) throw new Error("invalid time");
            if (r > 2147483647) throw new Error("too long to wait");
            setTimeout(n, r)
        });
        return qe.set(t, n), n
    }(n, e).then(K(t))
}
var Le = {
    delay: function(e, t) {
        return new Promise(function(n) {
            setTimeout(function() {
                n(t)
            }, e)
        })
    },
    tick: function(e, t) {
        return Ne(Math.ceil((Date.now() + 1) / e) * e, t)
    },
    when: Ne
};

function Pe(e, t) {
    if (/^(\w+:)|\/\//i.test(e)) return e;
    if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
    if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e)) throw new Error("illegal name");
    return "https://unpkg.com/" + e
}
const je = new Map,
    Ae = [],
    Oe = Ae.map,
    Te = Ae.some,
    Me = Ae.hasOwnProperty,
    Ue = "https://cdn.jsdelivr.net/npm/",
    Re = /^((?:@[^\/@]+\/)?[^\/@]+)(?:@([^\/]+))?(?:\/(.*))?$/,
    ze = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/,
    Fe = /\.[^\/]*$/,
    De = ["unpkg", "jsdelivr", "browser", "main"];
class RequireError extends Error {
    constructor(e) {
        super(e)
    }
}

function Ie(e) {
    const t = Re.exec(e);
    return t && {
        name: t[1],
        version: t[2],
        path: t[3]
    }
}

function He(e) {
    const t = `${Ue}${e.name}${e.version?`@${e.version}`:""}/package.json`;
    let n = je.get(t);
    return n || je.set(t, n = fetch(t).then(e => {
        if (!e.ok) throw new RequireError("unable to load package.json");
        return e.redirected && !je.has(e.url) && je.set(e.url, n), e.json()
    })), n
}
RequireError.prototype.name = RequireError.name;
const We = Be(async function(e, t) {
    if (e.startsWith(Ue) && (e = e.substring(Ue.length)), /^(\w+:)|\/\//i.test(e)) return e;
    if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
    if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e)) throw new RequireError("illegal name");
    const n = Ie(e);
    if (!n) return `${Ue}${e}`;
    if (!n.version && null != t && t.startsWith(Ue)) {
        const e = await He(Ie(t.substring(Ue.length)));
        n.version = e.dependencies && e.dependencies[n.name] || e.peerDependencies && e.peerDependencies[n.name]
    }
    if (n.path && !Fe.test(n.path) && (n.path += ".js"), n.path && n.version && ze.test(n.version)) return `${Ue}${n.name}@${n.version}/${n.path}`;
    const r = await He(n);
    return `${Ue}${r.name}@${r.version}/${n.path||function(e){for(const t of De){const n=e[t];if("string"==typeof n)return Fe.test(n)?n:`${n}.js`}}(r)||"index.js"}`
});

function Be(e) {
    const t = new Map,
        n = i(null);

    function r(e) {
        if ("string" != typeof e) return e;
        let n = t.get(e);
        return n || t.set(e, n = new Promise((t, n) => {
            const r = document.createElement("script");
            r.onload = (() => {
                try {
                    t(Ae.pop()(i(e)))
                } catch (e) {
                    n(new RequireError("invalid module"))
                }
                r.remove()
            }), r.onerror = (() => {
                n(new RequireError("unable to load module")), r.remove()
            }), r.async = !0, r.src = e, window.define = Ye, document.head.appendChild(r)
        })), n
    }

    function i(t) {
        return n => Promise.resolve(e(n, t)).then(r)
    }

    function o(e) {
        return arguments.length > 1 ? Promise.all(Oe.call(arguments, n)).then(Ve) : n(e)
    }
    return o.alias = function(t) {
        return Be((n, r) => n in t && (r = null, "string" != typeof(n = t[n])) ? n : e(n, r))
    }, o.resolve = e, o
}

function Ve(e) {
    const t = {};
    for (const n of e)
        for (const e in n) Me.call(n, e) && (null == n[e] ? Object.defineProperty(t, e, {
            get: Ge(n, e)
        }) : t[e] = n[e]);
    return t
}

function Ge(e, t) {
    return () => e[t]
}

function Je(e) {
    return e + "" == "exports"
}

function Ye(e, t, n) {
    const r = arguments.length;
    r < 2 ? (n = e, t = []) : r < 3 && (n = t, t = "string" == typeof e ? [] : e), Ae.push(Te.call(t, Je) ? e => {
        const r = {};
        return Promise.all(Oe.call(t, t => Je(t += "") ? r : e(t))).then(e => (n.apply(null, e), r))
    } : e => Promise.all(Oe.call(t, e)).then(e => "function" == typeof n ? n.apply(null, e) : n))
}

function Xe(e) {
    return null == e ? We : Be(e)
}
Ye.amd = {};
var Ke = le(function(e) {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "g");
        return t.innerHTML = e.trim(), t
    }, function() {
        return document.createElementNS("http://www.w3.org/2000/svg", "g")
    }),
    Qe = String.raw;

function Ze(e) {
    return new Promise(function(t, n) {
        var r = document.createElement("link");
        r.rel = "stylesheet", r.href = e, r.onerror = n, r.onload = t, document.head.appendChild(r)
    })
}

function et(e) {
    return function() {
        return Promise.all([e("@observablehq/katex@0.10.1/dist/katex.min.js"), e.resolve("@observablehq/katex@0.10.1/dist/katex.min.css").then(Ze)]).then(function(e) {
            var t = e[0],
                n = r();

            function r(e) {
                return function() {
                    var n = document.createElement("div");
                    return t.render(Qe.apply(String, arguments), n, e), n.removeChild(n.firstChild)
                }
            }
            return n.options = r, n.block = r({
                displayMode: !0
            }), n
        })
    }
}

function tt() {
    return oe(function(e) {
        var t = e(document.body.clientWidth);

        function n() {
            var n = document.body.clientWidth;
            n !== t && e(t = n)
        }
        return window.addEventListener("resize", n),
            function() {
                window.removeEventListener("resize", n)
            }
    })
}

function nt(e) {
    const t = Xe(e);
    Object.defineProperties(this, {
        DOM: {
            value: te,
            writable: !0,
            enumerable: !0
        },
        Files: {
            value: ne,
            writable: !0,
            enumerable: !0
        },
        Generators: {
            value: ae,
            writable: !0,
            enumerable: !0
        },
        html: {
            value: K(ue),
            writable: !0,
            enumerable: !0
        },
        md: {
            value: Ee(t),
            writable: !0,
            enumerable: !0
        },
        Mutable: {
            value: K(Se),
            writable: !0,
            enumerable: !0
        },
        now: {
            value: $e,
            writable: !0,
            enumerable: !0
        },
        Promises: {
            value: Le,
            writable: !0,
            enumerable: !0
        },
        require: {
            value: K(t),
            writable: !0,
            enumerable: !0
        },
        resolve: {
            value: K(Pe),
            writable: !0,
            enumerable: !0
        },
        svg: {
            value: K(Ke),
            writable: !0,
            enumerable: !0
        },
        tex: {
            value: et(t),
            writable: !0,
            enumerable: !0
        },
        width: {
            value: tt,
            writable: !0,
            enumerable: !0
        }
    })
}

function rt(e, t) {
    this.message = e + "", this.input = t
}
rt.prototype = Object.create(Error.prototype), rt.prototype.name = "RuntimeError", rt.prototype.constructor = rt;
var it = Array.prototype,
    ot = it.map,
    st = it.forEach;

function at(e) {
    return function() {
        return e
    }
}

function lt(e) {
    return e
}

function ut() {}
var ct = 1,
    dt = 2,
    ht = 3,
    pt = {};

function ft(e, t, n) {
    var r;
    null == n && (n = pt), Object.defineProperties(this, {
        _observer: {
            value: n,
            writable: !0
        },
        _definition: {
            value: bt,
            writable: !0
        },
        _duplicate: {
            value: void 0,
            writable: !0
        },
        _duplicates: {
            value: void 0,
            writable: !0
        },
        _indegree: {
            value: -1,
            writable: !0
        },
        _inputs: {
            value: [],
            writable: !0
        },
        _invalidate: {
            value: ut,
            writable: !0
        },
        _module: {
            value: t
        },
        _name: {
            value: null,
            writable: !0
        },
        _outputs: {
            value: new Set,
            writable: !0
        },
        _promise: {
            value: Promise.resolve(void 0),
            writable: !0
        },
        _reachable: {
            value: n !== pt,
            writable: !0
        },
        _rejector: {
            value: (r = this, function(e) {
                if (e === bt) throw new rt(r._name + " is not defined", r._name);
                throw new rt(r._name + " could not be resolved", r._name)
            })
        },
        _type: {
            value: e
        },
        _value: {
            value: void 0,
            writable: !0
        },
        _version: {
            value: 0,
            writable: !0
        }
    })
}

function mt(e) {
    e._module._runtime._dirty.add(e), e._outputs.add(this)
}

function gt(e) {
    e._module._runtime._dirty.add(e), e._outputs.delete(this)
}

function bt() {
    throw bt
}

function vt(e) {
    return function() {
        throw new rt(e + " is defined more than once")
    }
}

function _t(e, t, n) {
    var r = this._module._scope,
        i = this._module._runtime;
    if (this._inputs.forEach(gt, this), t.forEach(mt, this), this._inputs = t, this._definition = n, this._value = void 0, e == this._name && r.get(e) === this) this._outputs.forEach(i._updates.add, i._updates);
    else {
        var o, s;
        if (this._name)
            if (this._outputs.size) r.delete(this._name), (s = this._module._resolve(this._name))._outputs = this._outputs, this._outputs = new Set, s._outputs.forEach(function(e) {
                e._inputs[e._inputs.indexOf(this)] = s
            }, this), s._outputs.forEach(i._updates.add, i._updates), i._dirty.add(s).add(this), r.set(this._name, s);
            else if ((s = r.get(this._name)) === this) r.delete(this._name);
        else {
            if (s._type !== ht) throw new Error;
            s._duplicates.delete(this), this._duplicate = void 0, 1 === s._duplicates.size && (s = s._duplicates.keys().next().value, o = r.get(this._name), s._outputs = o._outputs, o._outputs = new Set, s._outputs.forEach(function(e) {
                e._inputs[e._inputs.indexOf(o)] = s
            }), s._definition = s._duplicate, s._duplicate = void 0, i._dirty.add(o).add(s), i._updates.add(s), r.set(this._name, s))
        }
        if (this._outputs.size) throw new Error;
        e && ((s = r.get(e)) ? s._type === ht ? (this._definition = vt(e), this._duplicate = n, s._duplicates.add(this)) : s._type === dt ? (this._outputs = s._outputs, s._outputs = new Set, this._outputs.forEach(function(e) {
            e._inputs[e._inputs.indexOf(s)] = this
        }, this), i._dirty.add(s).add(this), r.set(e, this)) : (s._duplicate = s._definition, this._duplicate = n, (o = new ft(ht, this._module))._name = e, o._definition = this._definition = s._definition = vt(e), o._outputs = s._outputs, s._outputs = new Set, o._outputs.forEach(function(e) {
            e._inputs[e._inputs.indexOf(s)] = o
        }), o._duplicates = new Set([this, s]), i._dirty.add(s).add(o), i._updates.add(s).add(o), r.set(e, o)) : r.set(e, this)), this._name = e
    }
    return i._updates.add(this), i._compute(), this
}
Object.defineProperties(ft.prototype, {
    _pending: {
        value: function() {
            this._observer.pending && this._observer.pending()
        },
        writable: !0,
        configurable: !0
    },
    _fulfilled: {
        value: function(e) {
            this._observer.fulfilled && this._observer.fulfilled(e, this._name)
        },
        writable: !0,
        configurable: !0
    },
    _rejected: {
        value: function(e) {
            this._observer.rejected && this._observer.rejected(e, this._name)
        },
        writable: !0,
        configurable: !0
    },
    define: {
        value: function(e, t, n) {
            switch (arguments.length) {
                case 1:
                    n = e, e = t = null;
                    break;
                case 2:
                    n = t, "string" == typeof e ? t = null : (t = e, e = null)
            }
            return _t.call(this, null == e ? null : e + "", null == t ? [] : ot.call(t, this._module._resolve, this._module), "function" == typeof n ? n : at(n))
        },
        writable: !0,
        configurable: !0
    },
    delete: {
        value: function() {
            return _t.call(this, null, [], ut)
        },
        writable: !0,
        configurable: !0
    },
    import: {
        value: function(e, t, n) {
            arguments.length < 3 && (n = t, t = e);
            return _t.call(this, t + "", [n._resolve(e + "")], lt)
        },
        writable: !0,
        configurable: !0
    }
});
var wt = new Map;

function yt(e) {
    Object.defineProperties(this, {
        _runtime: {
            value: e
        },
        _scope: {
            value: new Map
        }
    })
}

function xt(e) {
    return e._name
}
Object.defineProperties(yt.prototype, {
    _copy: {
        value: function(e, t, n) {
            var r = new yt(this._runtime);
            return n.set(this, r), this._scope.forEach(function(i, o) {
                var s, a = new ft(i._type, r);
                if (s = e.get(o)) a.import(s.name, s.alias, t);
                else if (i._definition === lt) {
                    var l = i._inputs[0],
                        u = l._module,
                        c = n.get(u) || u._copy(wt, null, n);
                    a.import(l._name, o, c)
                } else a.define(o, i._inputs.map(xt), i._definition)
            }), r
        },
        writable: !0,
        configurable: !0
    },
    _resolve: {
        value: function(e) {
            var t, n = this._scope.get(e);
            if (!n)
                if (n = new ft(dt, this), this._runtime._builtin._scope.has(e)) n.import(e, this._runtime._builtin);
                else if ("invalidation" === e) n.define(e, Ct);
            else if ("visibility" === e) n.define(e, Et);
            else {
                try {
                    t = this._runtime._global(e)
                } catch (t) {
                    return n.define(e, (r = t, function() {
                        throw r
                    }))
                }
                void 0 === t ? this._scope.set(n._name = e, n) : n.define(e, at(t))
            }
            var r;
            return n
        },
        writable: !0,
        configurable: !0
    },
    redefine: {
        value: function(e) {
            var t = this._scope.get(e);
            if (!t) throw new rt(e + " is not defined");
            if (t._type === ht) throw new rt(e + " is defined more than once");
            return t.define.apply(t, arguments)
        },
        writable: !0,
        configurable: !0
    },
    define: {
        value: function() {
            var e = new ft(ct, this);
            return e.define.apply(e, arguments)
        },
        writable: !0,
        configurable: !0
    },
    derive: {
        value: function(e, t) {
            var n = new Map;
            return st.call(e, function(e) {
                "object" != typeof e && (e = {
                    name: e + ""
                }), null == e.alias && (e.alias = e.name), n.set(e.alias, e)
            }), this._copy(n, t, new Map)
        },
        writable: !0,
        configurable: !0
    },
    import: {
        value: function() {
            var e = new ft(ct, this);
            return e.import.apply(e, arguments)
        },
        writable: !0,
        configurable: !0
    },
    value: {
        value: function(e) {
            var t = this._scope.get(e);
            if (!t) throw new rt(e + " is not defined");
            t._observer === pt && (t._observer = !0, this._runtime._dirty.add(t));
            return this._runtime._compute().then(() => t._promise)
        },
        writable: !0,
        configurable: !0
    },
    variable: {
        value: function(e) {
            return new ft(ct, this, e)
        },
        writable: !0,
        configurable: !0
    }
});
const kt = "function" == typeof requestAnimationFrame ? requestAnimationFrame : setImmediate;
var Ct = {},
    Et = {};

function St(e = new nt, t = function(e) {
    return window[e]
}) {
    var n = this.module();
    if (Object.defineProperties(this, {
            _dirty: {
                value: new Set
            },
            _updates: {
                value: new Set
            },
            _computing: {
                value: null,
                writable: !0
            },
            _modules: {
                value: new Map
            },
            _builtin: {
                value: n
            },
            _global: {
                value: t
            }
        }), e)
        for (var r in e) new ft(dt, n).define(r, [], e[r])
}

function $t(e) {
    ++e._indegree
}

function qt(e) {
    return e._promise.catch(e._rejector)
}

function Nt(e) {
    return new Promise(function(t) {
        e._invalidate = t
    })
}

function Lt(e, t) {
    let n, r, i = "function" == typeof IntersectionObserver && t._observer && t._observer._node,
        o = !i,
        s = ut,
        a = ut;
    return i && ((r = new IntersectionObserver(([e]) => (o = e.isIntersecting) && (n = null, s()))).observe(i), e.then(() => (r.disconnect(), r = null, a()))),
        function(e) {
            return o ? Promise.resolve(e) : r ? (n || (n = new Promise((e, t) => (s = e, a = t))), n.then(() => e)) : Promise.reject()
        }
}

function Pt(e) {
    e._invalidate(), e._invalidate = ut, e._pending();
    var t = e._value,
        n = ++e._version,
        r = null,
        i = e._promise = Promise.all(e._inputs.map(qt)).then(function(i) {
            if (e._version === n) {
                for (var o = 0, s = i.length; o < s; ++o) switch (i[o]) {
                    case Ct:
                        i[o] = r = Nt(e);
                        break;
                    case Et:
                        r || (r = Nt(e)), i[o] = Lt(r, e)
                }
                return e._definition.apply(t, i)
            }
        }).then(function(t) {
            return function(e) {
                return e && "function" == typeof e.next && "function" == typeof e.return
            }(t) ? ((r || Nt(e)).then((o = t, function() {
                o.return()
            })), function(e, t, n, r) {
                function i() {
                    var n = new Promise(function(e) {
                        e(r.next())
                    }).then(function(r) {
                        return r.done ? void 0 : Promise.resolve(r.value).then(function(r) {
                            if (e._version === t) return jt(e, r, n).then(i), e._fulfilled(r), r
                        })
                    });
                    n.catch(function(r) {
                        e._version === t && (jt(e, void 0, n), e._rejected(r))
                    })
                }
                return new Promise(function(e) {
                    e(r.next())
                }).then(function(e) {
                    if (!e.done) return n.then(i), e.value
                })
            }(e, n, i, t)) : t;
            var o
        });
    i.then(function(t) {
        e._version === n && (e._value = t, e._fulfilled(t))
    }, function(t) {
        e._version === n && (e._value = void 0, e._rejected(t))
    })
}

function jt(e, t, n) {
    var r = e._module._runtime;
    return e._value = t, e._promise = n, e._outputs.forEach(r._updates.add, r._updates), r._compute()
}
Object.defineProperties(St, {
    load: {
        value: function(e, t, n) {
            if ("function" == typeof t && (n = t, t = null), "function" != typeof n) throw new Error("invalid observer");
            null == t && (t = new nt);
            const {
                modules: r,
                id: i
            } = e, o = new Map, s = new St(t), a = l(i);

            function l(e) {
                let t = o.get(e);
                return t || o.set(e, t = s.module()), t
            }
            for (const e of r) {
                const t = l(e.id);
                let r = 0;
                for (const i of e.variables) i.from ? t.import(i.remote, i.name, l(i.from)) : t === a ? t.variable(n(i, r, e.variables)).define(i.name, i.inputs, i.value) : t.define(i.name, i.inputs, i.value), ++r
            }
            return s
        },
        writable: !0,
        configurable: !0
    }
}), Object.defineProperties(St.prototype, {
    _compute: {
        value: function() {
            return this._computing || (this._computing = this._computeSoon())
        },
        writable: !0,
        configurable: !0
    },
    _computeSoon: {
        value: function() {
            var e = this;
            return new Promise(function(t) {
                kt(function() {
                    t(), e._computeNow()
                })
            })
        },
        writable: !0,
        configurable: !0
    },
    _computeNow: {
        value: function() {
            var e, t, n = [];
            (e = new Set(this._dirty)).forEach(function(t) {
                t._inputs.forEach(e.add, e);
                const n = function(e) {
                    if (e._observer !== pt) return !0;
                    var t = new Set(e._outputs);
                    for (const e of t) {
                        if (e._observer !== pt) return !0;
                        e._outputs.forEach(t.add, t)
                    }
                    return !1
                }(t);
                n > t._reachable ? this._updates.add(t) : n < t._reachable && t._invalidate(), t._reachable = n
            }, this), (e = new Set(this._updates)).forEach(function(t) {
                t._reachable ? (t._indegree = 0, t._outputs.forEach(e.add, e)) : (t._indegree = -1, e.delete(t))
            }), this._computing = null, this._updates.clear(), this._dirty.clear(), e.forEach(function(e) {
                e._outputs.forEach($t)
            }), e.forEach(function(e) {
                0 === e._indegree && n.push(e)
            });
            for (; t = n.pop();) Pt(t), t._outputs.forEach(r), e.delete(t);

            function r(e) {
                0 == --e._indegree && n.push(e)
            }
            e.forEach(function(e) {
                var t = new rt("circular definition");
                e._value = void 0, (e._promise = Promise.reject(t)).catch(ut), e._rejected(t)
            })
        },
        writable: !0,
        configurable: !0
    },
    module: {
        value: function(e, t = ut) {
            if (void 0 === e) return new yt(this);
            let n = this._modules.get(e);
            return n || (this._modules.set(e, n = e(this, t)), n)
        },
        writable: !0,
        configurable: !0
    }
});
export {
    X as Inspector, nt as Library, St as Runtime, rt as RuntimeError
};
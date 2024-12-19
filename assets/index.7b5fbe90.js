(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && n(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy),
      o.crossorigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossorigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = s(o);
    fetch(o.href, i);
  }
})();
function Ln(e, t) {
  const s = Object.create(null),
    n = e.split(",");
  for (let o = 0; o < n.length; o++) s[n[o]] = !0;
  return t ? (o) => !!s[o.toLowerCase()] : (o) => !!s[o];
}
const Ya =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ha = Ln(Ya);
function ei(e) {
  return !!e || e === "";
}
function ft(e) {
  if (H(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s],
        o = me(n) ? Ja(n) : ft(n);
      if (o) for (const i in o) t[i] = o[i];
    }
    return t;
  } else {
    if (me(e)) return e;
    if (pe(e)) return e;
  }
}
const Qa = /;(?![^(]*\))/g,
  Ua = /:(.+)/;
function Ja(e) {
  const t = {};
  return (
    e.split(Qa).forEach((s) => {
      if (s) {
        const n = s.split(Ua);
        n.length > 1 && (t[n[0].trim()] = n[1].trim());
      }
    }),
    t
  );
}
function be(e) {
  let t = "";
  if (me(e)) t = e;
  else if (H(e))
    for (let s = 0; s < e.length; s++) {
      const n = be(e[s]);
      n && (t += n + " ");
    }
  else if (pe(e)) for (const s in e) e[s] && (t += s + " ");
  return t.trim();
}
const Ie = (e) =>
    me(e)
      ? e
      : e == null
      ? ""
      : H(e) || (pe(e) && (e.toString === oi || !W(e.toString)))
      ? JSON.stringify(e, ti, 2)
      : String(e),
  ti = (e, t) =>
    t && t.__v_isRef
      ? ti(e, t.value)
      : Jt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (s, [n, o]) => ((s[`${n} =>`] = o), s),
            {}
          ),
        }
      : si(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : pe(t) && !H(t) && !ii(t)
      ? String(t)
      : t,
  ie = {},
  Ut = [],
  Ve = () => {},
  za = () => !1,
  Ka = /^on[^a-z]/,
  Qs = (e) => Ka.test(e),
  jn = (e) => e.startsWith("onUpdate:"),
  we = Object.assign,
  Dn = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1);
  },
  Za = Object.prototype.hasOwnProperty,
  V = (e, t) => Za.call(e, t),
  H = Array.isArray,
  Jt = (e) => Us(e) === "[object Map]",
  si = (e) => Us(e) === "[object Set]",
  W = (e) => typeof e == "function",
  me = (e) => typeof e == "string",
  Fn = (e) => typeof e == "symbol",
  pe = (e) => e !== null && typeof e == "object",
  ni = (e) => pe(e) && W(e.then) && W(e.catch),
  oi = Object.prototype.toString,
  Us = (e) => oi.call(e),
  Wa = (e) => Us(e).slice(8, -1),
  ii = (e) => Us(e) === "[object Object]",
  Rn = (e) =>
    me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Ss = Ln(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Js = (e) => {
    const t = Object.create(null);
    return (s) => t[s] || (t[s] = e(s));
  },
  Va = /-(\w)/g,
  ot = Js((e) => e.replace(Va, (t, s) => (s ? s.toUpperCase() : ""))),
  Ga = /\B([A-Z])/g,
  Wt = Js((e) => e.replace(Ga, "-$1").toLowerCase()),
  zs = Js((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Os = Js((e) => (e ? `on${zs(e)}` : "")),
  cs = (e, t) => !Object.is(e, t),
  fn = (e, t) => {
    for (let s = 0; s < e.length; s++) e[s](t);
  },
  Ls = (e, t, s) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: s });
  },
  ai = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let fo;
const Xa = () =>
  fo ||
  (fo =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let et;
class qa {
  constructor(t = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        et &&
        ((this.parent = et),
        (this.index = (et.scopes || (et.scopes = [])).push(this) - 1));
  }
  run(t) {
    if (this.active) {
      const s = et;
      try {
        return (et = this), t();
      } finally {
        et = s;
      }
    }
  }
  on() {
    et = this;
  }
  off() {
    et = this.parent;
  }
  stop(t) {
    if (this.active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++) this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
      if (this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      this.active = !1;
    }
  }
}
function $a(e, t = et) {
  t && t.active && t.effects.push(e);
}
const Mn = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  ri = (e) => (e.w & wt) > 0,
  ci = (e) => (e.n & wt) > 0,
  er = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= wt;
  },
  tr = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let s = 0;
      for (let n = 0; n < t.length; n++) {
        const o = t[n];
        ri(o) && !ci(o) ? o.delete(e) : (t[s++] = o),
          (o.w &= ~wt),
          (o.n &= ~wt);
      }
      t.length = s;
    }
  },
  vn = new WeakMap();
let ss = 0,
  wt = 1;
const _n = 30;
let Ke;
const Ft = Symbol(""),
  yn = Symbol("");
class Yn {
  constructor(t, s = null, n) {
    (this.fn = t),
      (this.scheduler = s),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      $a(this, n);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ke,
      s = _t;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ke),
        (Ke = this),
        (_t = !0),
        (wt = 1 << ++ss),
        ss <= _n ? er(this) : uo(this),
        this.fn()
      );
    } finally {
      ss <= _n && tr(this),
        (wt = 1 << --ss),
        (Ke = this.parent),
        (_t = s),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ke === this
      ? (this.deferStop = !0)
      : this.active &&
        (uo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function uo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++) t[s].delete(e);
    t.length = 0;
  }
}
let _t = !0;
const li = [];
function Vt() {
  li.push(_t), (_t = !1);
}
function Gt() {
  const e = li.pop();
  _t = e === void 0 ? !0 : e;
}
function Me(e, t, s) {
  if (_t && Ke) {
    let n = vn.get(e);
    n || vn.set(e, (n = new Map()));
    let o = n.get(s);
    o || n.set(s, (o = Mn())), di(o);
  }
}
function di(e, t) {
  let s = !1;
  ss <= _n ? ci(e) || ((e.n |= wt), (s = !ri(e))) : (s = !e.has(Ke)),
    s && (e.add(Ke), Ke.deps.push(e));
}
function dt(e, t, s, n, o, i) {
  const a = vn.get(e);
  if (!a) return;
  let r = [];
  if (t === "clear") r = [...a.values()];
  else if (s === "length" && H(e))
    a.forEach((c, d) => {
      (d === "length" || d >= n) && r.push(c);
    });
  else
    switch ((s !== void 0 && r.push(a.get(s)), t)) {
      case "add":
        H(e)
          ? Rn(s) && r.push(a.get("length"))
          : (r.push(a.get(Ft)), Jt(e) && r.push(a.get(yn)));
        break;
      case "delete":
        H(e) || (r.push(a.get(Ft)), Jt(e) && r.push(a.get(yn)));
        break;
      case "set":
        Jt(e) && r.push(a.get(Ft));
        break;
    }
  if (r.length === 1) r[0] && bn(r[0]);
  else {
    const c = [];
    for (const d of r) d && c.push(...d);
    bn(Mn(c));
  }
}
function bn(e, t) {
  const s = H(e) ? e : [...e];
  for (const n of s) n.computed && Ao(n);
  for (const n of s) n.computed || Ao(n);
}
function Ao(e, t) {
  (e !== Ke || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const sr = Ln("__proto__,__v_isRef,__isVue"),
  fi = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Fn)
  ),
  nr = Hn(),
  or = Hn(!1, !0),
  ir = Hn(!0),
  po = ar();
function ar() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...s) {
        const n = X(this);
        for (let i = 0, a = this.length; i < a; i++) Me(n, "get", i + "");
        const o = n[t](...s);
        return o === -1 || o === !1 ? n[t](...s.map(X)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...s) {
        Vt();
        const n = X(this)[t].apply(this, s);
        return Gt(), n;
      };
    }),
    e
  );
}
function Hn(e = !1, t = !1) {
  return function (n, o, i) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && i === (e ? (t ? wr : gi) : t ? hi : pi).get(n))
      return n;
    const a = H(n);
    if (!e && a && V(po, o)) return Reflect.get(po, o, i);
    const r = Reflect.get(n, o, i);
    return (Fn(o) ? fi.has(o) : sr(o)) || (e || Me(n, "get", o), t)
      ? r
      : xe(r)
      ? a && Rn(o)
        ? r
        : r.value
      : pe(r)
      ? e
        ? mi(r)
        : Zs(r)
      : r;
  };
}
const rr = ui(),
  cr = ui(!0);
function ui(e = !1) {
  return function (s, n, o, i) {
    let a = s[n];
    if (ls(a) && xe(a) && !xe(o)) return !1;
    if (
      !e &&
      !ls(o) &&
      (wn(o) || ((o = X(o)), (a = X(a))), !H(s) && xe(a) && !xe(o))
    )
      return (a.value = o), !0;
    const r = H(s) && Rn(n) ? Number(n) < s.length : V(s, n),
      c = Reflect.set(s, n, o, i);
    return (
      s === X(i) && (r ? cs(o, a) && dt(s, "set", n, o) : dt(s, "add", n, o)), c
    );
  };
}
function lr(e, t) {
  const s = V(e, t);
  e[t];
  const n = Reflect.deleteProperty(e, t);
  return n && s && dt(e, "delete", t, void 0), n;
}
function dr(e, t) {
  const s = Reflect.has(e, t);
  return (!Fn(t) || !fi.has(t)) && Me(e, "has", t), s;
}
function fr(e) {
  return Me(e, "iterate", H(e) ? "length" : Ft), Reflect.ownKeys(e);
}
const Ai = { get: nr, set: rr, deleteProperty: lr, has: dr, ownKeys: fr },
  ur = {
    get: ir,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Ar = we({}, Ai, { get: or, set: cr }),
  Qn = (e) => e,
  Ks = (e) => Reflect.getPrototypeOf(e);
function bs(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const o = X(e),
    i = X(t);
  s || (t !== i && Me(o, "get", t), Me(o, "get", i));
  const { has: a } = Ks(o),
    r = n ? Qn : s ? zn : ds;
  if (a.call(o, t)) return r(e.get(t));
  if (a.call(o, i)) return r(e.get(i));
  e !== o && e.get(t);
}
function ws(e, t = !1) {
  const s = this.__v_raw,
    n = X(s),
    o = X(e);
  return (
    t || (e !== o && Me(n, "has", e), Me(n, "has", o)),
    e === o ? s.has(e) : s.has(e) || s.has(o)
  );
}
function Cs(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Me(X(e), "iterate", Ft), Reflect.get(e, "size", e)
  );
}
function ho(e) {
  e = X(e);
  const t = X(this);
  return Ks(t).has.call(t, e) || (t.add(e), dt(t, "add", e, e)), this;
}
function go(e, t) {
  t = X(t);
  const s = X(this),
    { has: n, get: o } = Ks(s);
  let i = n.call(s, e);
  i || ((e = X(e)), (i = n.call(s, e)));
  const a = o.call(s, e);
  return (
    s.set(e, t), i ? cs(t, a) && dt(s, "set", e, t) : dt(s, "add", e, t), this
  );
}
function mo(e) {
  const t = X(this),
    { has: s, get: n } = Ks(t);
  let o = s.call(t, e);
  o || ((e = X(e)), (o = s.call(t, e))), n && n.call(t, e);
  const i = t.delete(e);
  return o && dt(t, "delete", e, void 0), i;
}
function vo() {
  const e = X(this),
    t = e.size !== 0,
    s = e.clear();
  return t && dt(e, "clear", void 0, void 0), s;
}
function Is(e, t) {
  return function (n, o) {
    const i = this,
      a = i.__v_raw,
      r = X(a),
      c = t ? Qn : e ? zn : ds;
    return (
      !e && Me(r, "iterate", Ft), a.forEach((d, u) => n.call(o, c(d), c(u), i))
    );
  };
}
function xs(e, t, s) {
  return function (...n) {
    const o = this.__v_raw,
      i = X(o),
      a = Jt(i),
      r = e === "entries" || (e === Symbol.iterator && a),
      c = e === "keys" && a,
      d = o[e](...n),
      u = s ? Qn : t ? zn : ds;
    return (
      !t && Me(i, "iterate", c ? yn : Ft),
      {
        next() {
          const { value: m, done: g } = d.next();
          return g
            ? { value: m, done: g }
            : { value: r ? [u(m[0]), u(m[1])] : u(m), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function pt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function pr() {
  const e = {
      get(i) {
        return bs(this, i);
      },
      get size() {
        return Cs(this);
      },
      has: ws,
      add: ho,
      set: go,
      delete: mo,
      clear: vo,
      forEach: Is(!1, !1),
    },
    t = {
      get(i) {
        return bs(this, i, !1, !0);
      },
      get size() {
        return Cs(this);
      },
      has: ws,
      add: ho,
      set: go,
      delete: mo,
      clear: vo,
      forEach: Is(!1, !0),
    },
    s = {
      get(i) {
        return bs(this, i, !0);
      },
      get size() {
        return Cs(this, !0);
      },
      has(i) {
        return ws.call(this, i, !0);
      },
      add: pt("add"),
      set: pt("set"),
      delete: pt("delete"),
      clear: pt("clear"),
      forEach: Is(!0, !1),
    },
    n = {
      get(i) {
        return bs(this, i, !0, !0);
      },
      get size() {
        return Cs(this, !0);
      },
      has(i) {
        return ws.call(this, i, !0);
      },
      add: pt("add"),
      set: pt("set"),
      delete: pt("delete"),
      clear: pt("clear"),
      forEach: Is(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = xs(i, !1, !1)),
        (s[i] = xs(i, !0, !1)),
        (t[i] = xs(i, !1, !0)),
        (n[i] = xs(i, !0, !0));
    }),
    [e, s, t, n]
  );
}
const [hr, gr, mr, vr] = pr();
function Un(e, t) {
  const s = t ? (e ? vr : mr) : e ? gr : hr;
  return (n, o, i) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? n
      : Reflect.get(V(s, o) && o in n ? s : n, o, i);
}
const _r = { get: Un(!1, !1) },
  yr = { get: Un(!1, !0) },
  br = { get: Un(!0, !1) },
  pi = new WeakMap(),
  hi = new WeakMap(),
  gi = new WeakMap(),
  wr = new WeakMap();
function Cr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ir(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Cr(Wa(e));
}
function Zs(e) {
  return ls(e) ? e : Jn(e, !1, Ai, _r, pi);
}
function xr(e) {
  return Jn(e, !1, Ar, yr, hi);
}
function mi(e) {
  return Jn(e, !0, ur, br, gi);
}
function Jn(e, t, s, n, o) {
  if (!pe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = o.get(e);
  if (i) return i;
  const a = Ir(e);
  if (a === 0) return e;
  const r = new Proxy(e, a === 2 ? n : s);
  return o.set(e, r), r;
}
function zt(e) {
  return ls(e) ? zt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ls(e) {
  return !!(e && e.__v_isReadonly);
}
function wn(e) {
  return !!(e && e.__v_isShallow);
}
function vi(e) {
  return zt(e) || ls(e);
}
function X(e) {
  const t = e && e.__v_raw;
  return t ? X(t) : e;
}
function _i(e) {
  return Ls(e, "__v_skip", !0), e;
}
const ds = (e) => (pe(e) ? Zs(e) : e),
  zn = (e) => (pe(e) ? mi(e) : e);
function yi(e) {
  _t && Ke && ((e = X(e)), di(e.dep || (e.dep = Mn())));
}
function bi(e, t) {
  (e = X(e)), e.dep && bn(e.dep);
}
function xe(e) {
  return !!(e && e.__v_isRef === !0);
}
function Re(e) {
  return Er(e, !1);
}
function Er(e, t) {
  return xe(e) ? e : new Br(e, t);
}
class Br {
  constructor(t, s) {
    (this.__v_isShallow = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = s ? t : X(t)),
      (this._value = s ? t : ds(t));
  }
  get value() {
    return yi(this), this._value;
  }
  set value(t) {
    (t = this.__v_isShallow ? t : X(t)),
      cs(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : ds(t)),
        bi(this));
  }
}
function T(e) {
  return xe(e) ? e.value : e;
}
const Sr = {
  get: (e, t, s) => T(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return xe(o) && !xe(s) ? ((o.value = s), !0) : Reflect.set(e, t, s, n);
  },
};
function wi(e) {
  return zt(e) ? e : new Proxy(e, Sr);
}
class Or {
  constructor(t, s, n, o) {
    (this._setter = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new Yn(t, () => {
        this._dirty || ((this._dirty = !0), bi(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = n);
  }
  get value() {
    const t = X(this);
    return (
      yi(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Nr(e, t, s = !1) {
  let n, o;
  const i = W(e);
  return (
    i ? ((n = e), (o = Ve)) : ((n = e.get), (o = e.set)),
    new Or(n, o, i || !o, s)
  );
}
function yt(e, t, s, n) {
  let o;
  try {
    o = n ? e(...n) : e();
  } catch (i) {
    Ws(i, t, s);
  }
  return o;
}
function He(e, t, s, n) {
  if (W(e)) {
    const i = yt(e, t, s, n);
    return (
      i &&
        ni(i) &&
        i.catch((a) => {
          Ws(a, t, s);
        }),
      i
    );
  }
  const o = [];
  for (let i = 0; i < e.length; i++) o.push(He(e[i], t, s, n));
  return o;
}
function Ws(e, t, s, n = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const a = t.proxy,
      r = s;
    for (; i; ) {
      const d = i.ec;
      if (d) {
        for (let u = 0; u < d.length; u++) if (d[u](e, a, r) === !1) return;
      }
      i = i.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      yt(c, null, 10, [e, a, r]);
      return;
    }
  }
  kr(e, s, o, n);
}
function kr(e, t, s, n = !0) {
  console.error(e);
}
let js = !1,
  Cn = !1;
const je = [];
let rt = 0;
const os = [];
let ns = null,
  Ht = 0;
const is = [];
let gt = null,
  Qt = 0;
const Ci = Promise.resolve();
let Kn = null,
  In = null;
function ms(e) {
  const t = Kn || Ci;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Tr(e) {
  let t = rt + 1,
    s = je.length;
  for (; t < s; ) {
    const n = (t + s) >>> 1;
    fs(je[n]) < e ? (t = n + 1) : (s = n);
  }
  return t;
}
function Ii(e) {
  (!je.length || !je.includes(e, js && e.allowRecurse ? rt + 1 : rt)) &&
    e !== In &&
    (e.id == null ? je.push(e) : je.splice(Tr(e.id), 0, e), xi());
}
function xi() {
  !js && !Cn && ((Cn = !0), (Kn = Ci.then(Si)));
}
function Pr(e) {
  const t = je.indexOf(e);
  t > rt && je.splice(t, 1);
}
function Ei(e, t, s, n) {
  H(e)
    ? s.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? n + 1 : n)) && s.push(e),
    xi();
}
function Lr(e) {
  Ei(e, ns, os, Ht);
}
function jr(e) {
  Ei(e, gt, is, Qt);
}
function Vs(e, t = null) {
  if (os.length) {
    for (
      In = t, ns = [...new Set(os)], os.length = 0, Ht = 0;
      Ht < ns.length;
      Ht++
    )
      ns[Ht]();
    (ns = null), (Ht = 0), (In = null), Vs(e, t);
  }
}
function Bi(e) {
  if ((Vs(), is.length)) {
    const t = [...new Set(is)];
    if (((is.length = 0), gt)) {
      gt.push(...t);
      return;
    }
    for (gt = t, gt.sort((s, n) => fs(s) - fs(n)), Qt = 0; Qt < gt.length; Qt++)
      gt[Qt]();
    (gt = null), (Qt = 0);
  }
}
const fs = (e) => (e.id == null ? 1 / 0 : e.id);
function Si(e) {
  (Cn = !1), (js = !0), Vs(e), je.sort((s, n) => fs(s) - fs(n));
  const t = Ve;
  try {
    for (rt = 0; rt < je.length; rt++) {
      const s = je[rt];
      s && s.active !== !1 && yt(s, null, 14);
    }
  } finally {
    (rt = 0),
      (je.length = 0),
      Bi(),
      (js = !1),
      (Kn = null),
      (je.length || os.length || is.length) && Si(e);
  }
}
function Dr(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ie;
  let o = s;
  const i = t.startsWith("update:"),
    a = i && t.slice(7);
  if (a && a in n) {
    const u = `${a === "modelValue" ? "model" : a}Modifiers`,
      { number: m, trim: g } = n[u] || ie;
    g && (o = s.map((O) => O.trim())), m && (o = s.map(ai));
  }
  let r,
    c = n[(r = Os(t))] || n[(r = Os(ot(t)))];
  !c && i && (c = n[(r = Os(Wt(t)))]), c && He(c, e, 6, o);
  const d = n[r + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[r]) return;
    (e.emitted[r] = !0), He(d, e, 6, o);
  }
}
function Oi(e, t, s = !1) {
  const n = t.emitsCache,
    o = n.get(e);
  if (o !== void 0) return o;
  const i = e.emits;
  let a = {},
    r = !1;
  if (!W(e)) {
    const c = (d) => {
      const u = Oi(d, t, !0);
      u && ((r = !0), we(a, u));
    };
    !s && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !i && !r
    ? (n.set(e, null), null)
    : (H(i) ? i.forEach((c) => (a[c] = null)) : we(a, i), n.set(e, a), a);
}
function Gs(e, t) {
  return !e || !Qs(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      V(e, t[0].toLowerCase() + t.slice(1)) || V(e, Wt(t)) || V(e, t));
}
let Ee = null,
  Xs = null;
function Ds(e) {
  const t = Ee;
  return (Ee = e), (Xs = (e && e.type.__scopeId) || null), t;
}
function Be(e) {
  Xs = e;
}
function Se() {
  Xs = null;
}
function it(e, t = Ee, s) {
  if (!t || e._n) return e;
  const n = (...o) => {
    n._d && Oo(-1);
    const i = Ds(t),
      a = e(...o);
    return Ds(i), n._d && Oo(1), a;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function un(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    props: i,
    propsOptions: [a],
    slots: r,
    attrs: c,
    emit: d,
    render: u,
    renderCache: m,
    data: g,
    setupState: O,
    ctx: k,
    inheritAttrs: D,
  } = e;
  let S, M;
  const _e = Ds(e);
  try {
    if (s.shapeFlag & 4) {
      const te = o || n;
      (S = tt(u.call(te, te, m, i, O, g, k))), (M = c);
    } else {
      const te = t;
      (S = tt(
        te.length > 1 ? te(i, { attrs: c, slots: r, emit: d }) : te(i, null)
      )),
        (M = t.props ? c : Fr(c));
    }
  } catch (te) {
    (rs.length = 0), Ws(te, e, 1), (S = B(Qe));
  }
  let de = S;
  if (M && D !== !1) {
    const te = Object.keys(M),
      { shapeFlag: Ae } = de;
    te.length &&
      Ae & 7 &&
      (a && te.some(jn) && (M = Rr(M, a)), (de = Ct(de, M)));
  }
  return (
    s.dirs &&
      ((de = Ct(de)), (de.dirs = de.dirs ? de.dirs.concat(s.dirs) : s.dirs)),
    s.transition && (de.transition = s.transition),
    (S = de),
    Ds(_e),
    S
  );
}
const Fr = (e) => {
    let t;
    for (const s in e)
      (s === "class" || s === "style" || Qs(s)) && ((t || (t = {}))[s] = e[s]);
    return t;
  },
  Rr = (e, t) => {
    const s = {};
    for (const n in e) (!jn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
    return s;
  };
function Mr(e, t, s) {
  const { props: n, children: o, component: i } = e,
    { props: a, children: r, patchFlag: c } = t,
    d = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (s && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return n ? _o(n, a, d) : !!a;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let m = 0; m < u.length; m++) {
        const g = u[m];
        if (a[g] !== n[g] && !Gs(d, g)) return !0;
      }
    }
  } else
    return (o || r) && (!r || !r.$stable)
      ? !0
      : n === a
      ? !1
      : n
      ? a
        ? _o(n, a, d)
        : !0
      : !!a;
  return !1;
}
function _o(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (t[i] !== e[i] && !Gs(s, i)) return !0;
  }
  return !1;
}
function Yr({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = s), (t = t.parent);
}
const Hr = (e) => e.__isSuspense;
function Qr(e, t) {
  t && t.pendingBranch
    ? H(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : jr(e);
}
function Ur(e, t) {
  if (ye) {
    let s = ye.provides;
    const n = ye.parent && ye.parent.provides;
    n === s && (s = ye.provides = Object.create(n)), (s[e] = t);
  }
}
function Ns(e, t, s = !1) {
  const n = ye || Ee;
  if (n) {
    const o =
      n.parent == null
        ? n.vnode.appContext && n.vnode.appContext.provides
        : n.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return s && W(t) ? t.call(n.proxy) : t;
  }
}
const yo = {};
function An(e, t, s) {
  return Ni(e, t, s);
}
function Ni(
  e,
  t,
  { immediate: s, deep: n, flush: o, onTrack: i, onTrigger: a } = ie
) {
  const r = ye;
  let c,
    d = !1,
    u = !1;
  if (
    (xe(e)
      ? ((c = () => e.value), (d = wn(e)))
      : zt(e)
      ? ((c = () => e), (n = !0))
      : H(e)
      ? ((u = !0),
        (d = e.some((M) => zt(M) || wn(M))),
        (c = () =>
          e.map((M) => {
            if (xe(M)) return M.value;
            if (zt(M)) return Lt(M);
            if (W(M)) return yt(M, r, 2);
          })))
      : W(e)
      ? t
        ? (c = () => yt(e, r, 2))
        : (c = () => {
            if (!(r && r.isUnmounted)) return m && m(), He(e, r, 3, [g]);
          })
      : (c = Ve),
    t && n)
  ) {
    const M = c;
    c = () => Lt(M());
  }
  let m,
    g = (M) => {
      m = S.onStop = () => {
        yt(M, r, 4);
      };
    };
  if (hs)
    return (g = Ve), t ? s && He(t, r, 3, [c(), u ? [] : void 0, g]) : c(), Ve;
  let O = u ? [] : yo;
  const k = () => {
    if (!!S.active)
      if (t) {
        const M = S.run();
        (n || d || (u ? M.some((_e, de) => cs(_e, O[de])) : cs(M, O))) &&
          (m && m(), He(t, r, 3, [M, O === yo ? void 0 : O, g]), (O = M));
      } else S.run();
  };
  k.allowRecurse = !!t;
  let D;
  o === "sync"
    ? (D = k)
    : o === "post"
    ? (D = () => ke(k, r && r.suspense))
    : (D = () => Lr(k));
  const S = new Yn(c, D);
  return (
    t
      ? s
        ? k()
        : (O = S.run())
      : o === "post"
      ? ke(S.run.bind(S), r && r.suspense)
      : S.run(),
    () => {
      S.stop(), r && r.scope && Dn(r.scope.effects, S);
    }
  );
}
function Jr(e, t, s) {
  const n = this.proxy,
    o = me(e) ? (e.includes(".") ? ki(n, e) : () => n[e]) : e.bind(n, n);
  let i;
  W(t) ? (i = t) : ((i = t.handler), (s = t));
  const a = ye;
  Kt(this);
  const r = Ni(o, i.bind(n), s);
  return a ? Kt(a) : Rt(), r;
}
function ki(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++) n = n[s[o]];
    return n;
  };
}
function Lt(e, t) {
  if (!pe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), xe(e))) Lt(e.value, t);
  else if (H(e)) for (let s = 0; s < e.length; s++) Lt(e[s], t);
  else if (si(e) || Jt(e))
    e.forEach((s) => {
      Lt(s, t);
    });
  else if (ii(e)) for (const s in e) Lt(e[s], t);
  return e;
}
function Ti() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    vs(() => {
      e.isMounted = !0;
    }),
    Fi(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ye = [Function, Array],
  zr = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ye,
      onEnter: Ye,
      onAfterEnter: Ye,
      onEnterCancelled: Ye,
      onBeforeLeave: Ye,
      onLeave: Ye,
      onAfterLeave: Ye,
      onLeaveCancelled: Ye,
      onBeforeAppear: Ye,
      onAppear: Ye,
      onAfterAppear: Ye,
      onAppearCancelled: Ye,
    },
    setup(e, { slots: t }) {
      const s = eo(),
        n = Ti();
      let o;
      return () => {
        const i = t.default && Zn(t.default(), !0);
        if (!i || !i.length) return;
        let a = i[0];
        if (i.length > 1) {
          for (const D of i)
            if (D.type !== Qe) {
              a = D;
              break;
            }
        }
        const r = X(e),
          { mode: c } = r;
        if (n.isLeaving) return pn(a);
        const d = bo(a);
        if (!d) return pn(a);
        const u = us(d, r, n, s);
        As(d, u);
        const m = s.subTree,
          g = m && bo(m);
        let O = !1;
        const { getTransitionKey: k } = d.type;
        if (k) {
          const D = k();
          o === void 0 ? (o = D) : D !== o && ((o = D), (O = !0));
        }
        if (g && g.type !== Qe && (!Tt(d, g) || O)) {
          const D = us(g, r, n, s);
          if ((As(g, D), c === "out-in"))
            return (
              (n.isLeaving = !0),
              (D.afterLeave = () => {
                (n.isLeaving = !1), s.update();
              }),
              pn(a)
            );
          c === "in-out" &&
            d.type !== Qe &&
            (D.delayLeave = (S, M, _e) => {
              const de = Li(n, g);
              (de[String(g.key)] = g),
                (S._leaveCb = () => {
                  M(), (S._leaveCb = void 0), delete u.delayedLeave;
                }),
                (u.delayedLeave = _e);
            });
        }
        return a;
      };
    },
  },
  Pi = zr;
function Li(e, t) {
  const { leavingVNodes: s } = e;
  let n = s.get(t.type);
  return n || ((n = Object.create(null)), s.set(t.type, n)), n;
}
function us(e, t, s, n) {
  const {
      appear: o,
      mode: i,
      persisted: a = !1,
      onBeforeEnter: r,
      onEnter: c,
      onAfterEnter: d,
      onEnterCancelled: u,
      onBeforeLeave: m,
      onLeave: g,
      onAfterLeave: O,
      onLeaveCancelled: k,
      onBeforeAppear: D,
      onAppear: S,
      onAfterAppear: M,
      onAppearCancelled: _e,
    } = t,
    de = String(e.key),
    te = Li(s, e),
    Ae = (Z, ee) => {
      Z && He(Z, n, 9, ee);
    },
    Xe = (Z, ee) => {
      const re = ee[1];
      Ae(Z, ee),
        H(Z) ? Z.every((he) => he.length <= 1) && re() : Z.length <= 1 && re();
    },
    Ue = {
      mode: i,
      persisted: a,
      beforeEnter(Z) {
        let ee = r;
        if (!s.isMounted)
          if (o) ee = D || r;
          else return;
        Z._leaveCb && Z._leaveCb(!0);
        const re = te[de];
        re && Tt(e, re) && re.el._leaveCb && re.el._leaveCb(), Ae(ee, [Z]);
      },
      enter(Z) {
        let ee = c,
          re = d,
          he = u;
        if (!s.isMounted)
          if (o) (ee = S || c), (re = M || d), (he = _e || u);
          else return;
        let j = !1;
        const se = (Z._enterCb = (Ne) => {
          j ||
            ((j = !0),
            Ne ? Ae(he, [Z]) : Ae(re, [Z]),
            Ue.delayedLeave && Ue.delayedLeave(),
            (Z._enterCb = void 0));
        });
        ee ? Xe(ee, [Z, se]) : se();
      },
      leave(Z, ee) {
        const re = String(e.key);
        if ((Z._enterCb && Z._enterCb(!0), s.isUnmounting)) return ee();
        Ae(m, [Z]);
        let he = !1;
        const j = (Z._leaveCb = (se) => {
          he ||
            ((he = !0),
            ee(),
            se ? Ae(k, [Z]) : Ae(O, [Z]),
            (Z._leaveCb = void 0),
            te[re] === e && delete te[re]);
        });
        (te[re] = e), g ? Xe(g, [Z, j]) : j();
      },
      clone(Z) {
        return us(Z, t, s, n);
      },
    };
  return Ue;
}
function pn(e) {
  if (qs(e)) return (e = Ct(e)), (e.children = null), e;
}
function bo(e) {
  return qs(e) ? (e.children ? e.children[0] : void 0) : e;
}
function As(e, t) {
  e.shapeFlag & 6 && e.component
    ? As(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Zn(e, t = !1, s) {
  let n = [],
    o = 0;
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    const r = s == null ? a.key : String(s) + String(a.key != null ? a.key : i);
    a.type === ue
      ? (a.patchFlag & 128 && o++, (n = n.concat(Zn(a.children, t, r))))
      : (t || a.type !== Qe) && n.push(r != null ? Ct(a, { key: r }) : a);
  }
  if (o > 1) for (let i = 0; i < n.length; i++) n[i].patchFlag = -2;
  return n;
}
function ve(e) {
  return W(e) ? { setup: e, name: e.name } : e;
}
const as = (e) => !!e.type.__asyncLoader,
  qs = (e) => e.type.__isKeepAlive;
function Kr(e, t) {
  ji(e, "a", t);
}
function Zr(e, t) {
  ji(e, "da", t);
}
function ji(e, t, s = ye) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let o = s;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if (($s(t, n, s), s)) {
    let o = s.parent;
    for (; o && o.parent; )
      qs(o.parent.vnode) && Wr(n, t, s, o), (o = o.parent);
  }
}
function Wr(e, t, s, n) {
  const o = $s(t, e, n, !0);
  Ri(() => {
    Dn(n[t], o);
  }, s);
}
function $s(e, t, s = ye, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...a) => {
          if (s.isUnmounted) return;
          Vt(), Kt(s);
          const r = He(t, s, e, a);
          return Rt(), Gt(), r;
        });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const ut =
    (e) =>
    (t, s = ye) =>
      (!hs || e === "sp") && $s(e, t, s),
  en = ut("bm"),
  vs = ut("m"),
  Vr = ut("bu"),
  Di = ut("u"),
  Fi = ut("bum"),
  Ri = ut("um"),
  Gr = ut("sp"),
  Xr = ut("rtg"),
  qr = ut("rtc");
function $r(e, t = ye) {
  $s("ec", e, t);
}
function x(e, t) {
  const s = Ee;
  if (s === null) return e;
  const n = on(s) || s.proxy,
    o = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [a, r, c, d = ie] = t[i];
    W(a) && (a = { mounted: a, updated: a }),
      a.deep && Lt(r),
      o.push({
        dir: a,
        instance: n,
        value: r,
        oldValue: void 0,
        arg: c,
        modifiers: d,
      });
  }
  return e;
}
function St(e, t, s, n) {
  const o = e.dirs,
    i = t && t.dirs;
  for (let a = 0; a < o.length; a++) {
    const r = o[a];
    i && (r.oldValue = i[a].value);
    let c = r.dir[n];
    c && (Vt(), He(c, s, 8, [e.el, r, e, t]), Gt());
  }
}
const Wn = "components",
  ec = "directives";
function ct(e, t) {
  return Gn(Wn, e, !0, t) || e;
}
const Mi = Symbol();
function Vn(e) {
  return me(e) ? Gn(Wn, e, !1) || e : e || Mi;
}
function tn(e) {
  return Gn(ec, e);
}
function Gn(e, t, s = !0, n = !1) {
  const o = Ee || ye;
  if (o) {
    const i = o.type;
    if (e === Wn) {
      const r = Oc(i, !1);
      if (r && (r === t || r === ot(t) || r === zs(ot(t)))) return i;
    }
    const a = wo(o[e] || i[e], t) || wo(o.appContext[e], t);
    return !a && n ? i : a;
  }
}
function wo(e, t) {
  return e && (e[t] || e[ot(t)] || e[zs(ot(t))]);
}
function bt(e, t, s, n) {
  let o;
  const i = s && s[n];
  if (H(e) || me(e)) {
    o = new Array(e.length);
    for (let a = 0, r = e.length; a < r; a++)
      o[a] = t(e[a], a, void 0, i && i[a]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let a = 0; a < e; a++) o[a] = t(a + 1, a, void 0, i && i[a]);
  } else if (pe(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (a, r) => t(a, r, void 0, i && i[r]));
    else {
      const a = Object.keys(e);
      o = new Array(a.length);
      for (let r = 0, c = a.length; r < c; r++) {
        const d = a[r];
        o[r] = t(e[d], d, r, i && i[r]);
      }
    }
  else o = [];
  return s && (s[n] = o), o;
}
function Yi(e, t, s = {}, n, o) {
  if (Ee.isCE || (Ee.parent && as(Ee.parent) && Ee.parent.isCE))
    return B("slot", t === "default" ? null : { name: t }, n && n());
  let i = e[t];
  i && i._c && (i._d = !1), h();
  const a = i && Hi(i(s)),
    r = Te(
      ue,
      { key: s.key || `_${t}` },
      a || (n ? n() : []),
      a && e._ === 1 ? 64 : -2
    );
  return (
    !o && r.scopeId && (r.slotScopeIds = [r.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    r
  );
}
function Hi(e) {
  return e.some((t) =>
    Ms(t) ? !(t.type === Qe || (t.type === ue && !Hi(t.children))) : !0
  )
    ? e
    : null;
}
function tc(e) {
  const t = {};
  for (const s in e) t[Os(s)] = e[s];
  return t;
}
const xn = (e) => (e ? ($i(e) ? on(e) || e.proxy : xn(e.parent)) : null),
  Fs = we(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => xn(e.parent),
    $root: (e) => xn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ui(e),
    $forceUpdate: (e) => e.f || (e.f = () => Ii(e.update)),
    $nextTick: (e) => e.n || (e.n = ms.bind(e.proxy)),
    $watch: (e) => Jr.bind(e),
  }),
  sc = {
    get({ _: e }, t) {
      const {
        ctx: s,
        setupState: n,
        data: o,
        props: i,
        accessCache: a,
        type: r,
        appContext: c,
      } = e;
      let d;
      if (t[0] !== "$") {
        const O = a[t];
        if (O !== void 0)
          switch (O) {
            case 1:
              return n[t];
            case 2:
              return o[t];
            case 4:
              return s[t];
            case 3:
              return i[t];
          }
        else {
          if (n !== ie && V(n, t)) return (a[t] = 1), n[t];
          if (o !== ie && V(o, t)) return (a[t] = 2), o[t];
          if ((d = e.propsOptions[0]) && V(d, t)) return (a[t] = 3), i[t];
          if (s !== ie && V(s, t)) return (a[t] = 4), s[t];
          En && (a[t] = 0);
        }
      }
      const u = Fs[t];
      let m, g;
      if (u) return t === "$attrs" && Me(e, "get", t), u(e);
      if ((m = r.__cssModules) && (m = m[t])) return m;
      if (s !== ie && V(s, t)) return (a[t] = 4), s[t];
      if (((g = c.config.globalProperties), V(g, t))) return g[t];
    },
    set({ _: e }, t, s) {
      const { data: n, setupState: o, ctx: i } = e;
      return o !== ie && V(o, t)
        ? ((o[t] = s), !0)
        : n !== ie && V(n, t)
        ? ((n[t] = s), !0)
        : V(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = s), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: s,
          ctx: n,
          appContext: o,
          propsOptions: i,
        },
      },
      a
    ) {
      let r;
      return (
        !!s[a] ||
        (e !== ie && V(e, a)) ||
        (t !== ie && V(t, a)) ||
        ((r = i[0]) && V(r, a)) ||
        V(n, a) ||
        V(Fs, a) ||
        V(o.config.globalProperties, a)
      );
    },
    defineProperty(e, t, s) {
      return (
        s.get != null
          ? (e._.accessCache[t] = 0)
          : V(s, "value") && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
      );
    },
  };
let En = !0;
function nc(e) {
  const t = Ui(e),
    s = e.proxy,
    n = e.ctx;
  (En = !1), t.beforeCreate && Co(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: i,
    methods: a,
    watch: r,
    provide: c,
    inject: d,
    created: u,
    beforeMount: m,
    mounted: g,
    beforeUpdate: O,
    updated: k,
    activated: D,
    deactivated: S,
    beforeDestroy: M,
    beforeUnmount: _e,
    destroyed: de,
    unmounted: te,
    render: Ae,
    renderTracked: Xe,
    renderTriggered: Ue,
    errorCaptured: Z,
    serverPrefetch: ee,
    expose: re,
    inheritAttrs: he,
    components: j,
    directives: se,
    filters: Ne,
  } = t;
  if ((d && oc(d, n, null, e.appContext.config.unwrapInjectedRef), a))
    for (const fe in a) {
      const $ = a[fe];
      W($) && (n[fe] = $.bind(s));
    }
  if (o) {
    const fe = o.call(s, s);
    pe(fe) && (e.data = Zs(fe));
  }
  if (((En = !0), i))
    for (const fe in i) {
      const $ = i[fe],
        Pe = W($) ? $.bind(s, s) : W($.get) ? $.get.bind(s, s) : Ve,
        $t = !W($) && W($.set) ? $.set.bind(s) : Ve,
        xt = ta({ get: Pe, set: $t });
      Object.defineProperty(n, fe, {
        enumerable: !0,
        configurable: !0,
        get: () => xt.value,
        set: (Y) => (xt.value = Y),
      });
    }
  if (r) for (const fe in r) Qi(r[fe], n, s, fe);
  if (c) {
    const fe = W(c) ? c.call(s) : c;
    Reflect.ownKeys(fe).forEach(($) => {
      Ur($, fe[$]);
    });
  }
  u && Co(u, e, "c");
  function ge(fe, $) {
    H($) ? $.forEach((Pe) => fe(Pe.bind(s))) : $ && fe($.bind(s));
  }
  if (
    (ge(en, m),
    ge(vs, g),
    ge(Vr, O),
    ge(Di, k),
    ge(Kr, D),
    ge(Zr, S),
    ge($r, Z),
    ge(qr, Xe),
    ge(Xr, Ue),
    ge(Fi, _e),
    ge(Ri, te),
    ge(Gr, ee),
    H(re))
  )
    if (re.length) {
      const fe = e.exposed || (e.exposed = {});
      re.forEach(($) => {
        Object.defineProperty(fe, $, {
          get: () => s[$],
          set: (Pe) => (s[$] = Pe),
        });
      });
    } else e.exposed || (e.exposed = {});
  Ae && e.render === Ve && (e.render = Ae),
    he != null && (e.inheritAttrs = he),
    j && (e.components = j),
    se && (e.directives = se);
}
function oc(e, t, s = Ve, n = !1) {
  H(e) && (e = Bn(e));
  for (const o in e) {
    const i = e[o];
    let a;
    pe(i)
      ? "default" in i
        ? (a = Ns(i.from || o, i.default, !0))
        : (a = Ns(i.from || o))
      : (a = Ns(i)),
      xe(a) && n
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => a.value,
            set: (r) => (a.value = r),
          })
        : (t[o] = a);
  }
}
function Co(e, t, s) {
  He(H(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function Qi(e, t, s, n) {
  const o = n.includes(".") ? ki(s, n) : () => s[n];
  if (me(e)) {
    const i = t[e];
    W(i) && An(o, i);
  } else if (W(e)) An(o, e.bind(s));
  else if (pe(e))
    if (H(e)) e.forEach((i) => Qi(i, t, s, n));
    else {
      const i = W(e.handler) ? e.handler.bind(s) : t[e.handler];
      W(i) && An(o, i, e);
    }
}
function Ui(e) {
  const t = e.type,
    { mixins: s, extends: n } = t,
    {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: a },
    } = e.appContext,
    r = i.get(t);
  let c;
  return (
    r
      ? (c = r)
      : !o.length && !s && !n
      ? (c = t)
      : ((c = {}), o.length && o.forEach((d) => Rs(c, d, a, !0)), Rs(c, t, a)),
    i.set(t, c),
    c
  );
}
function Rs(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && Rs(e, i, s, !0), o && o.forEach((a) => Rs(e, a, s, !0));
  for (const a in t)
    if (!(n && a === "expose")) {
      const r = ic[a] || (s && s[a]);
      e[a] = r ? r(e[a], t[a]) : t[a];
    }
  return e;
}
const ic = {
  data: Io,
  props: kt,
  emits: kt,
  methods: kt,
  computed: kt,
  beforeCreate: Oe,
  created: Oe,
  beforeMount: Oe,
  mounted: Oe,
  beforeUpdate: Oe,
  updated: Oe,
  beforeDestroy: Oe,
  beforeUnmount: Oe,
  destroyed: Oe,
  unmounted: Oe,
  activated: Oe,
  deactivated: Oe,
  errorCaptured: Oe,
  serverPrefetch: Oe,
  components: kt,
  directives: kt,
  watch: rc,
  provide: Io,
  inject: ac,
};
function Io(e, t) {
  return t
    ? e
      ? function () {
          return we(
            W(e) ? e.call(this, this) : e,
            W(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function ac(e, t) {
  return kt(Bn(e), Bn(t));
}
function Bn(e) {
  if (H(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Oe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function kt(e, t) {
  return e ? we(we(Object.create(null), e), t) : t;
}
function rc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = we(Object.create(null), e);
  for (const n in t) s[n] = Oe(e[n], t[n]);
  return s;
}
function cc(e, t, s, n = !1) {
  const o = {},
    i = {};
  Ls(i, sn, 1), (e.propsDefaults = Object.create(null)), Ji(e, t, o, i);
  for (const a in e.propsOptions[0]) a in o || (o[a] = void 0);
  s ? (e.props = n ? o : xr(o)) : e.type.props ? (e.props = o) : (e.props = i),
    (e.attrs = i);
}
function lc(e, t, s, n) {
  const {
      props: o,
      attrs: i,
      vnode: { patchFlag: a },
    } = e,
    r = X(o),
    [c] = e.propsOptions;
  let d = !1;
  if ((n || a > 0) && !(a & 16)) {
    if (a & 8) {
      const u = e.vnode.dynamicProps;
      for (let m = 0; m < u.length; m++) {
        let g = u[m];
        if (Gs(e.emitsOptions, g)) continue;
        const O = t[g];
        if (c)
          if (V(i, g)) O !== i[g] && ((i[g] = O), (d = !0));
          else {
            const k = ot(g);
            o[k] = Sn(c, r, k, O, e, !1);
          }
        else O !== i[g] && ((i[g] = O), (d = !0));
      }
    }
  } else {
    Ji(e, t, o, i) && (d = !0);
    let u;
    for (const m in r)
      (!t || (!V(t, m) && ((u = Wt(m)) === m || !V(t, u)))) &&
        (c
          ? s &&
            (s[m] !== void 0 || s[u] !== void 0) &&
            (o[m] = Sn(c, r, m, void 0, e, !0))
          : delete o[m]);
    if (i !== r)
      for (const m in i) (!t || (!V(t, m) && !0)) && (delete i[m], (d = !0));
  }
  d && dt(e, "set", "$attrs");
}
function Ji(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let a = !1,
    r;
  if (t)
    for (let c in t) {
      if (Ss(c)) continue;
      const d = t[c];
      let u;
      o && V(o, (u = ot(c)))
        ? !i || !i.includes(u)
          ? (s[u] = d)
          : ((r || (r = {}))[u] = d)
        : Gs(e.emitsOptions, c) ||
          ((!(c in n) || d !== n[c]) && ((n[c] = d), (a = !0)));
    }
  if (i) {
    const c = X(s),
      d = r || ie;
    for (let u = 0; u < i.length; u++) {
      const m = i[u];
      s[m] = Sn(o, c, m, d[m], e, !V(d, m));
    }
  }
  return a;
}
function Sn(e, t, s, n, o, i) {
  const a = e[s];
  if (a != null) {
    const r = V(a, "default");
    if (r && n === void 0) {
      const c = a.default;
      if (a.type !== Function && W(c)) {
        const { propsDefaults: d } = o;
        s in d ? (n = d[s]) : (Kt(o), (n = d[s] = c.call(null, t)), Rt());
      } else n = c;
    }
    a[0] &&
      (i && !r ? (n = !1) : a[1] && (n === "" || n === Wt(s)) && (n = !0));
  }
  return n;
}
function zi(e, t, s = !1) {
  const n = t.propsCache,
    o = n.get(e);
  if (o) return o;
  const i = e.props,
    a = {},
    r = [];
  let c = !1;
  if (!W(e)) {
    const u = (m) => {
      c = !0;
      const [g, O] = zi(m, t, !0);
      we(a, g), O && r.push(...O);
    };
    !s && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!i && !c) return n.set(e, Ut), Ut;
  if (H(i))
    for (let u = 0; u < i.length; u++) {
      const m = ot(i[u]);
      xo(m) && (a[m] = ie);
    }
  else if (i)
    for (const u in i) {
      const m = ot(u);
      if (xo(m)) {
        const g = i[u],
          O = (a[m] = H(g) || W(g) ? { type: g } : g);
        if (O) {
          const k = So(Boolean, O.type),
            D = So(String, O.type);
          (O[0] = k > -1),
            (O[1] = D < 0 || k < D),
            (k > -1 || V(O, "default")) && r.push(m);
        }
      }
    }
  const d = [a, r];
  return n.set(e, d), d;
}
function xo(e) {
  return e[0] !== "$";
}
function Eo(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Bo(e, t) {
  return Eo(e) === Eo(t);
}
function So(e, t) {
  return H(t) ? t.findIndex((s) => Bo(s, e)) : W(t) && Bo(t, e) ? 0 : -1;
}
const Ki = (e) => e[0] === "_" || e === "$stable",
  Xn = (e) => (H(e) ? e.map(tt) : [tt(e)]),
  dc = (e, t, s) => {
    if (t._n) return t;
    const n = it((...o) => Xn(t(...o)), s);
    return (n._c = !1), n;
  },
  Zi = (e, t, s) => {
    const n = e._ctx;
    for (const o in e) {
      if (Ki(o)) continue;
      const i = e[o];
      if (W(i)) t[o] = dc(o, i, n);
      else if (i != null) {
        const a = Xn(i);
        t[o] = () => a;
      }
    }
  },
  Wi = (e, t) => {
    const s = Xn(t);
    e.slots.default = () => s;
  },
  fc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const s = t._;
      s ? ((e.slots = X(t)), Ls(t, "_", s)) : Zi(t, (e.slots = {}));
    } else (e.slots = {}), t && Wi(e, t);
    Ls(e.slots, sn, 1);
  },
  uc = (e, t, s) => {
    const { vnode: n, slots: o } = e;
    let i = !0,
      a = ie;
    if (n.shapeFlag & 32) {
      const r = t._;
      r
        ? s && r === 1
          ? (i = !1)
          : (we(o, t), !s && r === 1 && delete o._)
        : ((i = !t.$stable), Zi(t, o)),
        (a = t);
    } else t && (Wi(e, t), (a = { default: 1 }));
    if (i) for (const r in o) !Ki(r) && !(r in a) && delete o[r];
  };
function Vi() {
  return {
    app: null,
    config: {
      isNativeTag: za,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Ac = 0;
function pc(e, t) {
  return function (n, o = null) {
    W(n) || (n = Object.assign({}, n)), o != null && !pe(o) && (o = null);
    const i = Vi(),
      a = new Set();
    let r = !1;
    const c = (i.app = {
      _uid: Ac++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Tc,
      get config() {
        return i.config;
      },
      set config(d) {},
      use(d, ...u) {
        return (
          a.has(d) ||
            (d && W(d.install)
              ? (a.add(d), d.install(c, ...u))
              : W(d) && (a.add(d), d(c, ...u))),
          c
        );
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), c;
      },
      component(d, u) {
        return u ? ((i.components[d] = u), c) : i.components[d];
      },
      directive(d, u) {
        return u ? ((i.directives[d] = u), c) : i.directives[d];
      },
      mount(d, u, m) {
        if (!r) {
          const g = B(n, o);
          return (
            (g.appContext = i),
            u && t ? t(g, d) : e(g, d, m),
            (r = !0),
            (c._container = d),
            (d.__vue_app__ = c),
            on(g.component) || g.component.proxy
          );
        }
      },
      unmount() {
        r && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, u) {
        return (i.provides[d] = u), c;
      },
    });
    return c;
  };
}
function On(e, t, s, n, o = !1) {
  if (H(e)) {
    e.forEach((g, O) => On(g, t && (H(t) ? t[O] : t), s, n, o));
    return;
  }
  if (as(n) && !o) return;
  const i = n.shapeFlag & 4 ? on(n.component) || n.component.proxy : n.el,
    a = o ? null : i,
    { i: r, r: c } = e,
    d = t && t.r,
    u = r.refs === ie ? (r.refs = {}) : r.refs,
    m = r.setupState;
  if (
    (d != null &&
      d !== c &&
      (me(d)
        ? ((u[d] = null), V(m, d) && (m[d] = null))
        : xe(d) && (d.value = null)),
    W(c))
  )
    yt(c, r, 12, [a, u]);
  else {
    const g = me(c),
      O = xe(c);
    if (g || O) {
      const k = () => {
        if (e.f) {
          const D = g ? u[c] : c.value;
          o
            ? H(D) && Dn(D, i)
            : H(D)
            ? D.includes(i) || D.push(i)
            : g
            ? ((u[c] = [i]), V(m, c) && (m[c] = u[c]))
            : ((c.value = [i]), e.k && (u[e.k] = c.value));
        } else
          g
            ? ((u[c] = a), V(m, c) && (m[c] = a))
            : O && ((c.value = a), e.k && (u[e.k] = a));
      };
      a ? ((k.id = -1), ke(k, s)) : k();
    }
  }
}
const ke = Qr;
function hc(e) {
  return gc(e);
}
function gc(e, t) {
  const s = Xa();
  s.__VUE__ = !0;
  const {
      insert: n,
      remove: o,
      patchProp: i,
      createElement: a,
      createText: r,
      createComment: c,
      setText: d,
      setElementText: u,
      parentNode: m,
      nextSibling: g,
      setScopeId: O = Ve,
      cloneNode: k,
      insertStaticContent: D,
    } = e,
    S = (
      l,
      f,
      p,
      y = null,
      _ = null,
      C = null,
      E = !1,
      w = null,
      I = !!f.dynamicChildren
    ) => {
      if (l === f) return;
      l && !Tt(l, f) && ((y = Ce(l)), N(l, _, C, !0), (l = null)),
        f.patchFlag === -2 && ((I = !1), (f.dynamicChildren = null));
      const { type: b, ref: F, shapeFlag: P } = f;
      switch (b) {
        case qn:
          M(l, f, p, y);
          break;
        case Qe:
          _e(l, f, p, y);
          break;
        case ks:
          l == null && de(f, p, y, E);
          break;
        case ue:
          se(l, f, p, y, _, C, E, w, I);
          break;
        default:
          P & 1
            ? Xe(l, f, p, y, _, C, E, w, I)
            : P & 6
            ? Ne(l, f, p, y, _, C, E, w, I)
            : (P & 64 || P & 128) && b.process(l, f, p, y, _, C, E, w, I, Bt);
      }
      F != null && _ && On(F, l && l.ref, C, f || l, !f);
    },
    M = (l, f, p, y) => {
      if (l == null) n((f.el = r(f.children)), p, y);
      else {
        const _ = (f.el = l.el);
        f.children !== l.children && d(_, f.children);
      }
    },
    _e = (l, f, p, y) => {
      l == null ? n((f.el = c(f.children || "")), p, y) : (f.el = l.el);
    },
    de = (l, f, p, y) => {
      [l.el, l.anchor] = D(l.children, f, p, y, l.el, l.anchor);
    },
    te = ({ el: l, anchor: f }, p, y) => {
      let _;
      for (; l && l !== f; ) (_ = g(l)), n(l, p, y), (l = _);
      n(f, p, y);
    },
    Ae = ({ el: l, anchor: f }) => {
      let p;
      for (; l && l !== f; ) (p = g(l)), o(l), (l = p);
      o(f);
    },
    Xe = (l, f, p, y, _, C, E, w, I) => {
      (E = E || f.type === "svg"),
        l == null ? Ue(f, p, y, _, C, E, w, I) : re(l, f, _, C, E, w, I);
    },
    Ue = (l, f, p, y, _, C, E, w) => {
      let I, b;
      const {
        type: F,
        props: P,
        shapeFlag: R,
        transition: U,
        patchFlag: G,
        dirs: ne,
      } = l;
      if (l.el && k !== void 0 && G === -1) I = l.el = k(l.el);
      else {
        if (
          ((I = l.el = a(l.type, C, P && P.is, P)),
          R & 8
            ? u(I, l.children)
            : R & 16 &&
              ee(l.children, I, null, y, _, C && F !== "foreignObject", E, w),
          ne && St(l, null, y, "created"),
          P)
        ) {
          for (const le in P)
            le !== "value" &&
              !Ss(le) &&
              i(I, le, null, P[le], C, l.children, y, _, J);
          "value" in P && i(I, "value", null, P.value),
            (b = P.onVnodeBeforeMount) && $e(b, y, l);
        }
        Z(I, l, l.scopeId, E, y);
      }
      ne && St(l, null, y, "beforeMount");
      const oe = (!_ || (_ && !_.pendingBranch)) && U && !U.persisted;
      oe && U.beforeEnter(I),
        n(I, f, p),
        ((b = P && P.onVnodeMounted) || oe || ne) &&
          ke(() => {
            b && $e(b, y, l), oe && U.enter(I), ne && St(l, null, y, "mounted");
          }, _);
    },
    Z = (l, f, p, y, _) => {
      if ((p && O(l, p), y)) for (let C = 0; C < y.length; C++) O(l, y[C]);
      if (_) {
        let C = _.subTree;
        if (f === C) {
          const E = _.vnode;
          Z(l, E, E.scopeId, E.slotScopeIds, _.parent);
        }
      }
    },
    ee = (l, f, p, y, _, C, E, w, I = 0) => {
      for (let b = I; b < l.length; b++) {
        const F = (l[b] = w ? vt(l[b]) : tt(l[b]));
        S(null, F, f, p, y, _, C, E, w);
      }
    },
    re = (l, f, p, y, _, C, E) => {
      const w = (f.el = l.el);
      let { patchFlag: I, dynamicChildren: b, dirs: F } = f;
      I |= l.patchFlag & 16;
      const P = l.props || ie,
        R = f.props || ie;
      let U;
      p && Ot(p, !1),
        (U = R.onVnodeBeforeUpdate) && $e(U, p, f, l),
        F && St(f, l, p, "beforeUpdate"),
        p && Ot(p, !0);
      const G = _ && f.type !== "foreignObject";
      if (
        (b
          ? he(l.dynamicChildren, b, w, p, y, G, C)
          : E || Pe(l, f, w, null, p, y, G, C, !1),
        I > 0)
      ) {
        if (I & 16) j(w, f, P, R, p, y, _);
        else if (
          (I & 2 && P.class !== R.class && i(w, "class", null, R.class, _),
          I & 4 && i(w, "style", P.style, R.style, _),
          I & 8)
        ) {
          const ne = f.dynamicProps;
          for (let oe = 0; oe < ne.length; oe++) {
            const le = ne[oe],
              Je = P[le],
              Mt = R[le];
            (Mt !== Je || le === "value") &&
              i(w, le, Je, Mt, _, l.children, p, y, J);
          }
        }
        I & 1 && l.children !== f.children && u(w, f.children);
      } else !E && b == null && j(w, f, P, R, p, y, _);
      ((U = R.onVnodeUpdated) || F) &&
        ke(() => {
          U && $e(U, p, f, l), F && St(f, l, p, "updated");
        }, y);
    },
    he = (l, f, p, y, _, C, E) => {
      for (let w = 0; w < f.length; w++) {
        const I = l[w],
          b = f[w],
          F =
            I.el && (I.type === ue || !Tt(I, b) || I.shapeFlag & 70)
              ? m(I.el)
              : p;
        S(I, b, F, null, y, _, C, E, !0);
      }
    },
    j = (l, f, p, y, _, C, E) => {
      if (p !== y) {
        for (const w in y) {
          if (Ss(w)) continue;
          const I = y[w],
            b = p[w];
          I !== b && w !== "value" && i(l, w, b, I, E, f.children, _, C, J);
        }
        if (p !== ie)
          for (const w in p)
            !Ss(w) && !(w in y) && i(l, w, p[w], null, E, f.children, _, C, J);
        "value" in y && i(l, "value", p.value, y.value);
      }
    },
    se = (l, f, p, y, _, C, E, w, I) => {
      const b = (f.el = l ? l.el : r("")),
        F = (f.anchor = l ? l.anchor : r(""));
      let { patchFlag: P, dynamicChildren: R, slotScopeIds: U } = f;
      U && (w = w ? w.concat(U) : U),
        l == null
          ? (n(b, p, y), n(F, p, y), ee(f.children, p, F, _, C, E, w, I))
          : P > 0 && P & 64 && R && l.dynamicChildren
          ? (he(l.dynamicChildren, R, p, _, C, E, w),
            (f.key != null || (_ && f === _.subTree)) && Gi(l, f, !0))
          : Pe(l, f, p, F, _, C, E, w, I);
    },
    Ne = (l, f, p, y, _, C, E, w, I) => {
      (f.slotScopeIds = w),
        l == null
          ? f.shapeFlag & 512
            ? _.ctx.activate(f, p, y, E, I)
            : At(f, p, y, _, C, E, I)
          : ge(l, f, I);
    },
    At = (l, f, p, y, _, C, E) => {
      const w = (l.component = Ic(l, y, _));
      if ((qs(l) && (w.ctx.renderer = Bt), xc(w), w.asyncDep)) {
        if ((_ && _.registerDep(w, fe), !l.el)) {
          const I = (w.subTree = B(Qe));
          _e(null, I, f, p);
        }
        return;
      }
      fe(w, l, f, p, _, C, E);
    },
    ge = (l, f, p) => {
      const y = (f.component = l.component);
      if (Mr(l, f, p))
        if (y.asyncDep && !y.asyncResolved) {
          $(y, f, p);
          return;
        } else (y.next = f), Pr(y.update), y.update();
      else (f.el = l.el), (y.vnode = f);
    },
    fe = (l, f, p, y, _, C, E) => {
      const w = () => {
          if (l.isMounted) {
            let { next: F, bu: P, u: R, parent: U, vnode: G } = l,
              ne = F,
              oe;
            Ot(l, !1),
              F ? ((F.el = G.el), $(l, F, E)) : (F = G),
              P && fn(P),
              (oe = F.props && F.props.onVnodeBeforeUpdate) && $e(oe, U, F, G),
              Ot(l, !0);
            const le = un(l),
              Je = l.subTree;
            (l.subTree = le),
              S(Je, le, m(Je.el), Ce(Je), l, _, C),
              (F.el = le.el),
              ne === null && Yr(l, le.el),
              R && ke(R, _),
              (oe = F.props && F.props.onVnodeUpdated) &&
                ke(() => $e(oe, U, F, G), _);
          } else {
            let F;
            const { el: P, props: R } = f,
              { bm: U, m: G, parent: ne } = l,
              oe = as(f);
            if (
              (Ot(l, !1),
              U && fn(U),
              !oe && (F = R && R.onVnodeBeforeMount) && $e(F, ne, f),
              Ot(l, !0),
              P && dn)
            ) {
              const le = () => {
                (l.subTree = un(l)), dn(P, l.subTree, l, _, null);
              };
              oe
                ? f.type.__asyncLoader().then(() => !l.isUnmounted && le())
                : le();
            } else {
              const le = (l.subTree = un(l));
              S(null, le, p, y, l, _, C), (f.el = le.el);
            }
            if ((G && ke(G, _), !oe && (F = R && R.onVnodeMounted))) {
              const le = f;
              ke(() => $e(F, ne, le), _);
            }
            (f.shapeFlag & 256 ||
              (ne && as(ne.vnode) && ne.vnode.shapeFlag & 256)) &&
              l.a &&
              ke(l.a, _),
              (l.isMounted = !0),
              (f = p = y = null);
          }
        },
        I = (l.effect = new Yn(w, () => Ii(b), l.scope)),
        b = (l.update = () => I.run());
      (b.id = l.uid), Ot(l, !0), b();
    },
    $ = (l, f, p) => {
      f.component = l;
      const y = l.vnode.props;
      (l.vnode = f),
        (l.next = null),
        lc(l, f.props, y, p),
        uc(l, f.children, p),
        Vt(),
        Vs(void 0, l.update),
        Gt();
    },
    Pe = (l, f, p, y, _, C, E, w, I = !1) => {
      const b = l && l.children,
        F = l ? l.shapeFlag : 0,
        P = f.children,
        { patchFlag: R, shapeFlag: U } = f;
      if (R > 0) {
        if (R & 128) {
          xt(b, P, p, y, _, C, E, w, I);
          return;
        } else if (R & 256) {
          $t(b, P, p, y, _, C, E, w, I);
          return;
        }
      }
      U & 8
        ? (F & 16 && J(b, _, C), P !== b && u(p, P))
        : F & 16
        ? U & 16
          ? xt(b, P, p, y, _, C, E, w, I)
          : J(b, _, C, !0)
        : (F & 8 && u(p, ""), U & 16 && ee(P, p, y, _, C, E, w, I));
    },
    $t = (l, f, p, y, _, C, E, w, I) => {
      (l = l || Ut), (f = f || Ut);
      const b = l.length,
        F = f.length,
        P = Math.min(b, F);
      let R;
      for (R = 0; R < P; R++) {
        const U = (f[R] = I ? vt(f[R]) : tt(f[R]));
        S(l[R], U, p, null, _, C, E, w, I);
      }
      b > F ? J(l, _, C, !0, !1, P) : ee(f, p, y, _, C, E, w, I, P);
    },
    xt = (l, f, p, y, _, C, E, w, I) => {
      let b = 0;
      const F = f.length;
      let P = l.length - 1,
        R = F - 1;
      for (; b <= P && b <= R; ) {
        const U = l[b],
          G = (f[b] = I ? vt(f[b]) : tt(f[b]));
        if (Tt(U, G)) S(U, G, p, null, _, C, E, w, I);
        else break;
        b++;
      }
      for (; b <= P && b <= R; ) {
        const U = l[P],
          G = (f[R] = I ? vt(f[R]) : tt(f[R]));
        if (Tt(U, G)) S(U, G, p, null, _, C, E, w, I);
        else break;
        P--, R--;
      }
      if (b > P) {
        if (b <= R) {
          const U = R + 1,
            G = U < F ? f[U].el : y;
          for (; b <= R; )
            S(null, (f[b] = I ? vt(f[b]) : tt(f[b])), p, G, _, C, E, w, I), b++;
        }
      } else if (b > R) for (; b <= P; ) N(l[b], _, C, !0), b++;
      else {
        const U = b,
          G = b,
          ne = new Map();
        for (b = G; b <= R; b++) {
          const Le = (f[b] = I ? vt(f[b]) : tt(f[b]));
          Le.key != null && ne.set(Le.key, b);
        }
        let oe,
          le = 0;
        const Je = R - G + 1;
        let Mt = !1,
          ro = 0;
        const es = new Array(Je);
        for (b = 0; b < Je; b++) es[b] = 0;
        for (b = U; b <= P; b++) {
          const Le = l[b];
          if (le >= Je) {
            N(Le, _, C, !0);
            continue;
          }
          let qe;
          if (Le.key != null) qe = ne.get(Le.key);
          else
            for (oe = G; oe <= R; oe++)
              if (es[oe - G] === 0 && Tt(Le, f[oe])) {
                qe = oe;
                break;
              }
          qe === void 0
            ? N(Le, _, C, !0)
            : ((es[qe - G] = b + 1),
              qe >= ro ? (ro = qe) : (Mt = !0),
              S(Le, f[qe], p, null, _, C, E, w, I),
              le++);
        }
        const co = Mt ? mc(es) : Ut;
        for (oe = co.length - 1, b = Je - 1; b >= 0; b--) {
          const Le = G + b,
            qe = f[Le],
            lo = Le + 1 < F ? f[Le + 1].el : y;
          es[b] === 0
            ? S(null, qe, p, lo, _, C, E, w, I)
            : Mt && (oe < 0 || b !== co[oe] ? Y(qe, p, lo, 2) : oe--);
        }
      }
    },
    Y = (l, f, p, y, _ = null) => {
      const { el: C, type: E, transition: w, children: I, shapeFlag: b } = l;
      if (b & 6) {
        Y(l.component.subTree, f, p, y);
        return;
      }
      if (b & 128) {
        l.suspense.move(f, p, y);
        return;
      }
      if (b & 64) {
        E.move(l, f, p, Bt);
        return;
      }
      if (E === ue) {
        n(C, f, p);
        for (let P = 0; P < I.length; P++) Y(I[P], f, p, y);
        n(l.anchor, f, p);
        return;
      }
      if (E === ks) {
        te(l, f, p);
        return;
      }
      if (y !== 2 && b & 1 && w)
        if (y === 0) w.beforeEnter(C), n(C, f, p), ke(() => w.enter(C), _);
        else {
          const { leave: P, delayLeave: R, afterLeave: U } = w,
            G = () => n(C, f, p),
            ne = () => {
              P(C, () => {
                G(), U && U();
              });
            };
          R ? R(C, G, ne) : ne();
        }
      else n(C, f, p);
    },
    N = (l, f, p, y = !1, _ = !1) => {
      const {
        type: C,
        props: E,
        ref: w,
        children: I,
        dynamicChildren: b,
        shapeFlag: F,
        patchFlag: P,
        dirs: R,
      } = l;
      if ((w != null && On(w, null, p, l, !0), F & 256)) {
        f.ctx.deactivate(l);
        return;
      }
      const U = F & 1 && R,
        G = !as(l);
      let ne;
      if ((G && (ne = E && E.onVnodeBeforeUnmount) && $e(ne, f, l), F & 6))
        z(l.component, p, y);
      else {
        if (F & 128) {
          l.suspense.unmount(p, y);
          return;
        }
        U && St(l, null, f, "beforeUnmount"),
          F & 64
            ? l.type.remove(l, f, p, _, Bt, y)
            : b && (C !== ue || (P > 0 && P & 64))
            ? J(b, f, p, !1, !0)
            : ((C === ue && P & 384) || (!_ && F & 16)) && J(I, f, p),
          y && L(l);
      }
      ((G && (ne = E && E.onVnodeUnmounted)) || U) &&
        ke(() => {
          ne && $e(ne, f, l), U && St(l, null, f, "unmounted");
        }, p);
    },
    L = (l) => {
      const { type: f, el: p, anchor: y, transition: _ } = l;
      if (f === ue) {
        Q(p, y);
        return;
      }
      if (f === ks) {
        Ae(l);
        return;
      }
      const C = () => {
        o(p), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (l.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: E, delayLeave: w } = _,
          I = () => E(p, C);
        w ? w(l.el, C, I) : I();
      } else C();
    },
    Q = (l, f) => {
      let p;
      for (; l !== f; ) (p = g(l)), o(l), (l = p);
      o(f);
    },
    z = (l, f, p) => {
      const { bum: y, scope: _, update: C, subTree: E, um: w } = l;
      y && fn(y),
        _.stop(),
        C && ((C.active = !1), N(E, l, f, p)),
        w && ke(w, f),
        ke(() => {
          l.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          l.asyncDep &&
          !l.asyncResolved &&
          l.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve());
    },
    J = (l, f, p, y = !1, _ = !1, C = 0) => {
      for (let E = C; E < l.length; E++) N(l[E], f, p, y, _);
    },
    Ce = (l) =>
      l.shapeFlag & 6
        ? Ce(l.component.subTree)
        : l.shapeFlag & 128
        ? l.suspense.next()
        : g(l.anchor || l.el),
    Et = (l, f, p) => {
      l == null
        ? f._vnode && N(f._vnode, null, null, !0)
        : S(f._vnode || null, l, f, null, null, null, p),
        Bi(),
        (f._vnode = l);
    },
    Bt = {
      p: S,
      um: N,
      m: Y,
      r: L,
      mt: At,
      mc: ee,
      pc: Pe,
      pbc: he,
      n: Ce,
      o: e,
    };
  let ln, dn;
  return (
    t && ([ln, dn] = t(Bt)), { render: Et, hydrate: ln, createApp: pc(Et, ln) }
  );
}
function Ot({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function Gi(e, t, s = !1) {
  const n = e.children,
    o = t.children;
  if (H(n) && H(o))
    for (let i = 0; i < n.length; i++) {
      const a = n[i];
      let r = o[i];
      r.shapeFlag & 1 &&
        !r.dynamicChildren &&
        ((r.patchFlag <= 0 || r.patchFlag === 32) &&
          ((r = o[i] = vt(o[i])), (r.el = a.el)),
        s || Gi(a, r));
    }
}
function mc(e) {
  const t = e.slice(),
    s = [0];
  let n, o, i, a, r;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const d = e[n];
    if (d !== 0) {
      if (((o = s[s.length - 1]), e[o] < d)) {
        (t[n] = o), s.push(n);
        continue;
      }
      for (i = 0, a = s.length - 1; i < a; )
        (r = (i + a) >> 1), e[s[r]] < d ? (i = r + 1) : (a = r);
      d < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), (s[i] = n));
    }
  }
  for (i = s.length, a = s[i - 1]; i-- > 0; ) (s[i] = a), (a = t[a]);
  return s;
}
const vc = (e) => e.__isTeleport,
  ue = Symbol(void 0),
  qn = Symbol(void 0),
  Qe = Symbol(void 0),
  ks = Symbol(void 0),
  rs = [];
let Ze = null;
function h(e = !1) {
  rs.push((Ze = e ? null : []));
}
function _c() {
  rs.pop(), (Ze = rs[rs.length - 1] || null);
}
let ps = 1;
function Oo(e) {
  ps += e;
}
function Xi(e) {
  return (
    (e.dynamicChildren = ps > 0 ? Ze || Ut : null),
    _c(),
    ps > 0 && Ze && Ze.push(e),
    e
  );
}
function v(e, t, s, n, o, i) {
  return Xi(A(e, t, s, n, o, i, !0));
}
function Te(e, t, s, n, o) {
  return Xi(B(e, t, s, n, o, !0));
}
function Ms(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Tt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const sn = "__vInternal",
  qi = ({ key: e }) => (e != null ? e : null),
  Ts = ({ ref: e, ref_key: t, ref_for: s }) =>
    e != null
      ? me(e) || xe(e) || W(e)
        ? { i: Ee, r: e, k: t, f: !!s }
        : e
      : null;
function A(
  e,
  t = null,
  s = null,
  n = 0,
  o = null,
  i = e === ue ? 0 : 1,
  a = !1,
  r = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && qi(t),
    ref: t && Ts(t),
    scopeId: Xs,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    r
      ? ($n(c, s), i & 128 && e.normalize(c))
      : s && (c.shapeFlag |= me(s) ? 8 : 16),
    ps > 0 &&
      !a &&
      Ze &&
      (c.patchFlag > 0 || i & 6) &&
      c.patchFlag !== 32 &&
      Ze.push(c),
    c
  );
}
const B = yc;
function yc(e, t = null, s = null, n = 0, o = null, i = !1) {
  if (((!e || e === Mi) && (e = Qe), Ms(e))) {
    const r = Ct(e, t, !0);
    return (
      s && $n(r, s),
      ps > 0 &&
        !i &&
        Ze &&
        (r.shapeFlag & 6 ? (Ze[Ze.indexOf(e)] = r) : Ze.push(r)),
      (r.patchFlag |= -2),
      r
    );
  }
  if ((Nc(e) && (e = e.__vccOpts), t)) {
    t = bc(t);
    let { class: r, style: c } = t;
    r && !me(r) && (t.class = be(r)),
      pe(c) && (vi(c) && !H(c) && (c = we({}, c)), (t.style = ft(c)));
  }
  const a = me(e) ? 1 : Hr(e) ? 128 : vc(e) ? 64 : pe(e) ? 4 : W(e) ? 2 : 0;
  return A(e, t, s, n, o, a, i, !0);
}
function bc(e) {
  return e ? (vi(e) || sn in e ? we({}, e) : e) : null;
}
function Ct(e, t, s = !1) {
  const { props: n, ref: o, patchFlag: i, children: a } = e,
    r = t ? nn(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: r,
    key: r && qi(r),
    ref:
      t && t.ref ? (s && o ? (H(o) ? o.concat(Ts(t)) : [o, Ts(t)]) : Ts(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ue ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ct(e.ssContent),
    ssFallback: e.ssFallback && Ct(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function Ge(e = " ", t = 0) {
  return B(qn, null, e, t);
}
function q(e, t) {
  const s = B(ks, null, e);
  return (s.staticCount = t), s;
}
function st(e = "", t = !1) {
  return t ? (h(), Te(Qe, null, e)) : B(Qe, null, e);
}
function tt(e) {
  return e == null || typeof e == "boolean"
    ? B(Qe)
    : H(e)
    ? B(ue, null, e.slice())
    : typeof e == "object"
    ? vt(e)
    : B(qn, null, String(e));
}
function vt(e) {
  return e.el === null || e.memo ? e : Ct(e);
}
function $n(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (H(t)) s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), $n(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !(sn in t)
        ? (t._ctx = Ee)
        : o === 3 &&
          Ee &&
          (Ee.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    W(t)
      ? ((t = { default: t, _ctx: Ee }), (s = 32))
      : ((t = String(t)), n & 64 ? ((s = 16), (t = [Ge(t)])) : (s = 8));
  (e.children = t), (e.shapeFlag |= s);
}
function nn(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = be([t.class, n.class]));
      else if (o === "style") t.style = ft([t.style, n.style]);
      else if (Qs(o)) {
        const i = t[o],
          a = n[o];
        a &&
          i !== a &&
          !(H(i) && i.includes(a)) &&
          (t[o] = i ? [].concat(i, a) : a);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function $e(e, t, s, n = null) {
  He(e, t, 7, [s, n]);
}
const wc = Vi();
let Cc = 0;
function Ic(e, t, s) {
  const n = e.type,
    o = (t ? t.appContext : e.appContext) || wc,
    i = {
      uid: Cc++,
      vnode: e,
      type: n,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new qa(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: zi(n, o),
      emitsOptions: Oi(n, o),
      emit: null,
      emitted: null,
      propsDefaults: ie,
      inheritAttrs: n.inheritAttrs,
      ctx: ie,
      data: ie,
      props: ie,
      attrs: ie,
      slots: ie,
      refs: ie,
      setupState: ie,
      setupContext: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Dr.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let ye = null;
const eo = () => ye || Ee,
  Kt = (e) => {
    (ye = e), e.scope.on();
  },
  Rt = () => {
    ye && ye.scope.off(), (ye = null);
  };
function $i(e) {
  return e.vnode.shapeFlag & 4;
}
let hs = !1;
function xc(e, t = !1) {
  hs = t;
  const { props: s, children: n } = e.vnode,
    o = $i(e);
  cc(e, s, o, t), fc(e, n);
  const i = o ? Ec(e, t) : void 0;
  return (hs = !1), i;
}
function Ec(e, t) {
  const s = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = _i(new Proxy(e.ctx, sc)));
  const { setup: n } = s;
  if (n) {
    const o = (e.setupContext = n.length > 1 ? Sc(e) : null);
    Kt(e), Vt();
    const i = yt(n, e, 0, [e.props, o]);
    if ((Gt(), Rt(), ni(i))) {
      if ((i.then(Rt, Rt), t))
        return i
          .then((a) => {
            No(e, a, t);
          })
          .catch((a) => {
            Ws(a, e, 0);
          });
      e.asyncDep = i;
    } else No(e, i, t);
  } else ea(e, t);
}
function No(e, t, s) {
  W(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : pe(t) && (e.setupState = wi(t)),
    ea(e, s);
}
let ko;
function ea(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && ko && !n.render) {
      const o = n.template;
      if (o) {
        const { isCustomElement: i, compilerOptions: a } = e.appContext.config,
          { delimiters: r, compilerOptions: c } = n,
          d = we(we({ isCustomElement: i, delimiters: r }, a), c);
        n.render = ko(o, d);
      }
    }
    e.render = n.render || Ve;
  }
  Kt(e), Vt(), nc(e), Gt(), Rt();
}
function Bc(e) {
  return new Proxy(e.attrs, {
    get(t, s) {
      return Me(e, "get", "$attrs"), t[s];
    },
  });
}
function Sc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  let s;
  return {
    get attrs() {
      return s || (s = Bc(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function on(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(wi(_i(e.exposed)), {
        get(t, s) {
          if (s in t) return t[s];
          if (s in Fs) return Fs[s](e);
        },
      }))
    );
}
function Oc(e, t = !0) {
  return W(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Nc(e) {
  return W(e) && "__vccOpts" in e;
}
const ta = (e, t) => Nr(e, t, hs);
function kc(e, t, s) {
  const n = arguments.length;
  return n === 2
    ? pe(t) && !H(t)
      ? Ms(t)
        ? B(e, null, [t])
        : B(e, t)
      : B(e, null, t)
    : (n > 3
        ? (s = Array.prototype.slice.call(arguments, 2))
        : n === 3 && Ms(s) && (s = [s]),
      B(e, t, s));
}
const Tc = "3.2.37",
  Pc = "http://www.w3.org/2000/svg",
  Pt = typeof document < "u" ? document : null,
  To = Pt && Pt.createElement("template"),
  Lc = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, s, n) => {
      const o = t
        ? Pt.createElementNS(Pc, e)
        : Pt.createElement(e, s ? { is: s } : void 0);
      return (
        e === "select" &&
          n &&
          n.multiple != null &&
          o.setAttribute("multiple", n.multiple),
        o
      );
    },
    createText: (e) => Pt.createTextNode(e),
    createComment: (e) => Pt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Pt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    cloneNode(e) {
      const t = e.cloneNode(!0);
      return "_value" in e && (t._value = e._value), t;
    },
    insertStaticContent(e, t, s, n, o, i) {
      const a = s ? s.previousSibling : t.lastChild;
      if (o && (o === i || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), s),
            !(o === i || !(o = o.nextSibling));

        );
      else {
        To.innerHTML = n ? `<svg>${e}</svg>` : e;
        const r = To.content;
        if (n) {
          const c = r.firstChild;
          for (; c.firstChild; ) r.appendChild(c.firstChild);
          r.removeChild(c);
        }
        t.insertBefore(r, s);
      }
      return [
        a ? a.nextSibling : t.firstChild,
        s ? s.previousSibling : t.lastChild,
      ];
    },
  };
function jc(e, t, s) {
  const n = e._vtc;
  n && (t = (t ? [t, ...n] : [...n]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : s
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Dc(e, t, s) {
  const n = e.style,
    o = me(s);
  if (s && !o) {
    for (const i in s) Nn(n, i, s[i]);
    if (t && !me(t)) for (const i in t) s[i] == null && Nn(n, i, "");
  } else {
    const i = n.display;
    o ? t !== s && (n.cssText = s) : t && e.removeAttribute("style"),
      "_vod" in e && (n.display = i);
  }
}
const Po = /\s*!important$/;
function Nn(e, t, s) {
  if (H(s)) s.forEach((n) => Nn(e, t, n));
  else if ((s == null && (s = ""), t.startsWith("--"))) e.setProperty(t, s);
  else {
    const n = Fc(e, t);
    Po.test(s)
      ? e.setProperty(Wt(n), s.replace(Po, ""), "important")
      : (e[n] = s);
  }
}
const Lo = ["Webkit", "Moz", "ms"],
  hn = {};
function Fc(e, t) {
  const s = hn[t];
  if (s) return s;
  let n = ot(t);
  if (n !== "filter" && n in e) return (hn[t] = n);
  n = zs(n);
  for (let o = 0; o < Lo.length; o++) {
    const i = Lo[o] + n;
    if (i in e) return (hn[t] = i);
  }
  return t;
}
const jo = "http://www.w3.org/1999/xlink";
function Rc(e, t, s, n, o) {
  if (n && t.startsWith("xlink:"))
    s == null
      ? e.removeAttributeNS(jo, t.slice(6, t.length))
      : e.setAttributeNS(jo, t, s);
  else {
    const i = Ha(t);
    s == null || (i && !ei(s))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : s);
  }
}
function Mc(e, t, s, n, o, i, a) {
  if (t === "innerHTML" || t === "textContent") {
    n && a(n, o, i), (e[t] = s == null ? "" : s);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = s;
    const c = s == null ? "" : s;
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      s == null && e.removeAttribute(t);
    return;
  }
  let r = !1;
  if (s === "" || s == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (s = ei(s))
      : s == null && c === "string"
      ? ((s = ""), (r = !0))
      : c === "number" && ((s = 0), (r = !0));
  }
  try {
    e[t] = s;
  } catch {}
  r && e.removeAttribute(t);
}
const [sa, Yc] = (() => {
  let e = Date.now,
    t = !1;
  if (typeof window < "u") {
    Date.now() > document.createEvent("Event").timeStamp &&
      (e = performance.now.bind(performance));
    const s = navigator.userAgent.match(/firefox\/(\d+)/i);
    t = !!(s && Number(s[1]) <= 53);
  }
  return [e, t];
})();
let kn = 0;
const Hc = Promise.resolve(),
  Qc = () => {
    kn = 0;
  },
  Uc = () => kn || (Hc.then(Qc), (kn = sa()));
function Jc(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function zc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
function Kc(e, t, s, n, o = null) {
  const i = e._vei || (e._vei = {}),
    a = i[t];
  if (n && a) a.value = n;
  else {
    const [r, c] = Zc(t);
    if (n) {
      const d = (i[t] = Wc(n, o));
      Jc(e, r, d, c);
    } else a && (zc(e, r, a, c), (i[t] = void 0));
  }
}
const Do = /(?:Once|Passive|Capture)$/;
function Zc(e) {
  let t;
  if (Do.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Do)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [Wt(e.slice(2)), t];
}
function Wc(e, t) {
  const s = (n) => {
    const o = n.timeStamp || sa();
    (Yc || o >= s.attached - 1) && He(Vc(n, s.value), t, 5, [n]);
  };
  return (s.value = e), (s.attached = Uc()), s;
}
function Vc(e, t) {
  if (H(t)) {
    const s = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        s.call(e), (e._stopped = !0);
      }),
      t.map((n) => (o) => !o._stopped && n && n(o))
    );
  } else return t;
}
const Fo = /^on[a-z]/,
  Gc = (e, t, s, n, o = !1, i, a, r, c) => {
    t === "class"
      ? jc(e, n, o)
      : t === "style"
      ? Dc(e, s, n)
      : Qs(t)
      ? jn(t) || Kc(e, t, s, n, a)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Xc(e, t, n, o)
        )
      ? Mc(e, t, n, i, a, r, c)
      : (t === "true-value"
          ? (e._trueValue = n)
          : t === "false-value" && (e._falseValue = n),
        Rc(e, t, n, o));
  };
function Xc(e, t, s, n) {
  return n
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Fo.test(t) && W(s))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Fo.test(t) && me(s))
    ? !1
    : t in e;
}
const ht = "transition",
  ts = "animation",
  an = (e, { slots: t }) => kc(Pi, oa(e), t);
an.displayName = "Transition";
const na = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
  },
  qc = (an.props = we({}, Pi.props, na)),
  Nt = (e, t = []) => {
    H(e) ? e.forEach((s) => s(...t)) : e && e(...t);
  },
  Ro = (e) => (e ? (H(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function oa(e) {
  const t = {};
  for (const j in e) j in na || (t[j] = e[j]);
  if (e.css === !1) return t;
  const {
      name: s = "v",
      type: n,
      duration: o,
      enterFromClass: i = `${s}-enter-from`,
      enterActiveClass: a = `${s}-enter-active`,
      enterToClass: r = `${s}-enter-to`,
      appearFromClass: c = i,
      appearActiveClass: d = a,
      appearToClass: u = r,
      leaveFromClass: m = `${s}-leave-from`,
      leaveActiveClass: g = `${s}-leave-active`,
      leaveToClass: O = `${s}-leave-to`,
    } = e,
    k = $c(o),
    D = k && k[0],
    S = k && k[1],
    {
      onBeforeEnter: M,
      onEnter: _e,
      onEnterCancelled: de,
      onLeave: te,
      onLeaveCancelled: Ae,
      onBeforeAppear: Xe = M,
      onAppear: Ue = _e,
      onAppearCancelled: Z = de,
    } = t,
    ee = (j, se, Ne) => {
      mt(j, se ? u : r), mt(j, se ? d : a), Ne && Ne();
    },
    re = (j, se) => {
      (j._isLeaving = !1), mt(j, m), mt(j, O), mt(j, g), se && se();
    },
    he = (j) => (se, Ne) => {
      const At = j ? Ue : _e,
        ge = () => ee(se, j, Ne);
      Nt(At, [se, ge]),
        Mo(() => {
          mt(se, j ? c : i), at(se, j ? u : r), Ro(At) || Yo(se, n, D, ge);
        });
    };
  return we(t, {
    onBeforeEnter(j) {
      Nt(M, [j]), at(j, i), at(j, a);
    },
    onBeforeAppear(j) {
      Nt(Xe, [j]), at(j, c), at(j, d);
    },
    onEnter: he(!1),
    onAppear: he(!0),
    onLeave(j, se) {
      j._isLeaving = !0;
      const Ne = () => re(j, se);
      at(j, m),
        aa(),
        at(j, g),
        Mo(() => {
          !j._isLeaving || (mt(j, m), at(j, O), Ro(te) || Yo(j, n, S, Ne));
        }),
        Nt(te, [j, Ne]);
    },
    onEnterCancelled(j) {
      ee(j, !1), Nt(de, [j]);
    },
    onAppearCancelled(j) {
      ee(j, !0), Nt(Z, [j]);
    },
    onLeaveCancelled(j) {
      re(j), Nt(Ae, [j]);
    },
  });
}
function $c(e) {
  if (e == null) return null;
  if (pe(e)) return [gn(e.enter), gn(e.leave)];
  {
    const t = gn(e);
    return [t, t];
  }
}
function gn(e) {
  return ai(e);
}
function at(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.add(s)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function mt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const { _vtc: s } = e;
  s && (s.delete(t), s.size || (e._vtc = void 0));
}
function Mo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let el = 0;
function Yo(e, t, s, n) {
  const o = (e._endId = ++el),
    i = () => {
      o === e._endId && n();
    };
  if (s) return setTimeout(i, s);
  const { type: a, timeout: r, propCount: c } = ia(e, t);
  if (!a) return n();
  const d = a + "end";
  let u = 0;
  const m = () => {
      e.removeEventListener(d, g), i();
    },
    g = (O) => {
      O.target === e && ++u >= c && m();
    };
  setTimeout(() => {
    u < c && m();
  }, r + 1),
    e.addEventListener(d, g);
}
function ia(e, t) {
  const s = window.getComputedStyle(e),
    n = (k) => (s[k] || "").split(", "),
    o = n(ht + "Delay"),
    i = n(ht + "Duration"),
    a = Ho(o, i),
    r = n(ts + "Delay"),
    c = n(ts + "Duration"),
    d = Ho(r, c);
  let u = null,
    m = 0,
    g = 0;
  t === ht
    ? a > 0 && ((u = ht), (m = a), (g = i.length))
    : t === ts
    ? d > 0 && ((u = ts), (m = d), (g = c.length))
    : ((m = Math.max(a, d)),
      (u = m > 0 ? (a > d ? ht : ts) : null),
      (g = u ? (u === ht ? i.length : c.length) : 0));
  const O = u === ht && /\b(transform|all)(,|$)/.test(s[ht + "Property"]);
  return { type: u, timeout: m, propCount: g, hasTransform: O };
}
function Ho(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((s, n) => Qo(s) + Qo(e[n])));
}
function Qo(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function aa() {
  return document.body.offsetHeight;
}
const ra = new WeakMap(),
  ca = new WeakMap(),
  tl = {
    name: "TransitionGroup",
    props: we({}, qc, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const s = eo(),
        n = Ti();
      let o, i;
      return (
        Di(() => {
          if (!o.length) return;
          const a = e.moveClass || `${e.name || "v"}-move`;
          if (!al(o[0].el, s.vnode.el, a)) return;
          o.forEach(nl), o.forEach(ol);
          const r = o.filter(il);
          aa(),
            r.forEach((c) => {
              const d = c.el,
                u = d.style;
              at(d, a),
                (u.transform = u.webkitTransform = u.transitionDuration = "");
              const m = (d._moveCb = (g) => {
                (g && g.target !== d) ||
                  ((!g || /transform$/.test(g.propertyName)) &&
                    (d.removeEventListener("transitionend", m),
                    (d._moveCb = null),
                    mt(d, a)));
              });
              d.addEventListener("transitionend", m);
            });
        }),
        () => {
          const a = X(e),
            r = oa(a);
          let c = a.tag || ue;
          (o = i), (i = t.default ? Zn(t.default()) : []);
          for (let d = 0; d < i.length; d++) {
            const u = i[d];
            u.key != null && As(u, us(u, r, n, s));
          }
          if (o)
            for (let d = 0; d < o.length; d++) {
              const u = o[d];
              As(u, us(u, r, n, s)), ra.set(u, u.el.getBoundingClientRect());
            }
          return B(c, null, i);
        }
      );
    },
  },
  sl = tl;
function nl(e) {
  const t = e.el;
  t._moveCb && t._moveCb(), t._enterCb && t._enterCb();
}
function ol(e) {
  ca.set(e, e.el.getBoundingClientRect());
}
function il(e) {
  const t = ra.get(e),
    s = ca.get(e),
    n = t.left - s.left,
    o = t.top - s.top;
  if (n || o) {
    const i = e.el.style;
    return (
      (i.transform = i.webkitTransform = `translate(${n}px,${o}px)`),
      (i.transitionDuration = "0s"),
      e
    );
  }
}
function al(e, t, s) {
  const n = e.cloneNode();
  e._vtc &&
    e._vtc.forEach((a) => {
      a.split(/\s+/).forEach((r) => r && n.classList.remove(r));
    }),
    s.split(/\s+/).forEach((a) => a && n.classList.add(a)),
    (n.style.display = "none");
  const o = t.nodeType === 1 ? t : t.parentNode;
  o.appendChild(n);
  const { hasTransform: i } = ia(n);
  return o.removeChild(n), i;
}
const rl = ["ctrl", "shift", "alt", "meta"],
  cl = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => rl.some((s) => e[`${s}Key`] && !t.includes(s)),
  },
  ll =
    (e, t) =>
    (s, ...n) => {
      for (let o = 0; o < t.length; o++) {
        const i = cl[t[o]];
        if (i && i(s, t)) return;
      }
      return e(s, ...n);
    },
  dl = we({ patchProp: Gc }, Lc);
let Uo;
function fl() {
  return Uo || (Uo = hc(dl));
}
const la = (...e) => {
  const t = fl().createApp(...e),
    { mount: s } = t;
  return (
    (t.mount = (n) => {
      const o = ul(n);
      if (!o) return;
      const i = t._component;
      !W(i) && !i.render && !i.template && (i.template = o.innerHTML),
        (o.innerHTML = "");
      const a = s(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        a
      );
    }),
    t
  );
};
function ul(e) {
  return me(e) ? document.querySelector(e) : e;
}
const Al = "/img/logo.webp",
  pl = ve({
    __name: "SimpleButton",
    props: { enableHover: { type: Boolean, default: !0 } },
    setup(e) {
      return (t, s) => (
        h(),
        v(
          "button",
          { class: be(["simpleButton", { "enable-hover": e.enableHover }]) },
          [Yi(t.$slots, "default", {}, void 0, !0)],
          2
        )
      );
    },
  });
const ce = (e, t) => {
    const s = e.__vccOpts || e;
    for (const [n, o] of t) s[n] = o;
    return s;
  },
  da = ce(pl, [["__scopeId", "data-v-d1689510"]]),
  to = (e) => (Be("data-v-9aa37936"), (e = e()), Se(), e),
  hl = to(() => A("span", null, null, -1)),
  gl = to(() => A("span", null, null, -1)),
  ml = to(() => A("span", null, null, -1)),
  vl = [hl, gl, ml],
  _l = ve({
    __name: "Hamburger",
    props: { active: { type: Boolean } },
    setup(e) {
      return (t, s) => (
        h(),
        v("div", { class: be(["hamburger", { "is-active": e.active }]) }, vl, 2)
      );
    },
  });
const yl = ce(_l, [["__scopeId", "data-v-9aa37936"]]);
var bl =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function wl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var fa = { exports: {} };
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */ (function (e, t) {
  (function (n, o) {
    e.exports = o();
  })(bl, function () {
    return (function () {
      var s = {
          686: function (i, a, r) {
            r.d(a, {
              default: function () {
                return xt;
              },
            });
            var c = r(279),
              d = r.n(c),
              u = r(370),
              m = r.n(u),
              g = r(817),
              O = r.n(g);
            function k(Y) {
              try {
                return document.execCommand(Y);
              } catch {
                return !1;
              }
            }
            var D = function (N) {
                var L = O()(N);
                return k("cut"), L;
              },
              S = D;
            function M(Y) {
              var N = document.documentElement.getAttribute("dir") === "rtl",
                L = document.createElement("textarea");
              (L.style.fontSize = "12pt"),
                (L.style.border = "0"),
                (L.style.padding = "0"),
                (L.style.margin = "0"),
                (L.style.position = "absolute"),
                (L.style[N ? "right" : "left"] = "-9999px");
              var Q = window.pageYOffset || document.documentElement.scrollTop;
              return (
                (L.style.top = "".concat(Q, "px")),
                L.setAttribute("readonly", ""),
                (L.value = Y),
                L
              );
            }
            var _e = function (N, L) {
                var Q = M(N);
                L.container.appendChild(Q);
                var z = O()(Q);
                return k("copy"), Q.remove(), z;
              },
              de = function (N) {
                var L =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : { container: document.body },
                  Q = "";
                return (
                  typeof N == "string"
                    ? (Q = _e(N, L))
                    : N instanceof HTMLInputElement &&
                      !["text", "search", "url", "tel", "password"].includes(
                        N == null ? void 0 : N.type
                      )
                    ? (Q = _e(N.value, L))
                    : ((Q = O()(N)), k("copy")),
                  Q
                );
              },
              te = de;
            function Ae(Y) {
              return (
                typeof Symbol == "function" &&
                typeof Symbol.iterator == "symbol"
                  ? (Ae = function (L) {
                      return typeof L;
                    })
                  : (Ae = function (L) {
                      return L &&
                        typeof Symbol == "function" &&
                        L.constructor === Symbol &&
                        L !== Symbol.prototype
                        ? "symbol"
                        : typeof L;
                    }),
                Ae(Y)
              );
            }
            var Xe = function () {
                var N =
                    arguments.length > 0 && arguments[0] !== void 0
                      ? arguments[0]
                      : {},
                  L = N.action,
                  Q = L === void 0 ? "copy" : L,
                  z = N.container,
                  J = N.target,
                  Ce = N.text;
                if (Q !== "copy" && Q !== "cut")
                  throw new Error(
                    'Invalid "action" value, use either "copy" or "cut"'
                  );
                if (J !== void 0)
                  if (J && Ae(J) === "object" && J.nodeType === 1) {
                    if (Q === "copy" && J.hasAttribute("disabled"))
                      throw new Error(
                        'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                      );
                    if (
                      Q === "cut" &&
                      (J.hasAttribute("readonly") || J.hasAttribute("disabled"))
                    )
                      throw new Error(
                        `Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`
                      );
                  } else
                    throw new Error(
                      'Invalid "target" value, use a valid Element'
                    );
                if (Ce) return te(Ce, { container: z });
                if (J) return Q === "cut" ? S(J) : te(J, { container: z });
              },
              Ue = Xe;
            function Z(Y) {
              return (
                typeof Symbol == "function" &&
                typeof Symbol.iterator == "symbol"
                  ? (Z = function (L) {
                      return typeof L;
                    })
                  : (Z = function (L) {
                      return L &&
                        typeof Symbol == "function" &&
                        L.constructor === Symbol &&
                        L !== Symbol.prototype
                        ? "symbol"
                        : typeof L;
                    }),
                Z(Y)
              );
            }
            function ee(Y, N) {
              if (!(Y instanceof N))
                throw new TypeError("Cannot call a class as a function");
            }
            function re(Y, N) {
              for (var L = 0; L < N.length; L++) {
                var Q = N[L];
                (Q.enumerable = Q.enumerable || !1),
                  (Q.configurable = !0),
                  "value" in Q && (Q.writable = !0),
                  Object.defineProperty(Y, Q.key, Q);
              }
            }
            function he(Y, N, L) {
              return N && re(Y.prototype, N), L && re(Y, L), Y;
            }
            function j(Y, N) {
              if (typeof N != "function" && N !== null)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (Y.prototype = Object.create(N && N.prototype, {
                constructor: { value: Y, writable: !0, configurable: !0 },
              })),
                N && se(Y, N);
            }
            function se(Y, N) {
              return (
                (se =
                  Object.setPrototypeOf ||
                  function (Q, z) {
                    return (Q.__proto__ = z), Q;
                  }),
                se(Y, N)
              );
            }
            function Ne(Y) {
              var N = fe();
              return function () {
                var Q = $(Y),
                  z;
                if (N) {
                  var J = $(this).constructor;
                  z = Reflect.construct(Q, arguments, J);
                } else z = Q.apply(this, arguments);
                return At(this, z);
              };
            }
            function At(Y, N) {
              return N && (Z(N) === "object" || typeof N == "function")
                ? N
                : ge(Y);
            }
            function ge(Y) {
              if (Y === void 0)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return Y;
            }
            function fe() {
              if (
                typeof Reflect > "u" ||
                !Reflect.construct ||
                Reflect.construct.sham
              )
                return !1;
              if (typeof Proxy == "function") return !0;
              try {
                return (
                  Date.prototype.toString.call(
                    Reflect.construct(Date, [], function () {})
                  ),
                  !0
                );
              } catch {
                return !1;
              }
            }
            function $(Y) {
              return (
                ($ = Object.setPrototypeOf
                  ? Object.getPrototypeOf
                  : function (L) {
                      return L.__proto__ || Object.getPrototypeOf(L);
                    }),
                $(Y)
              );
            }
            function Pe(Y, N) {
              var L = "data-clipboard-".concat(Y);
              if (!!N.hasAttribute(L)) return N.getAttribute(L);
            }
            var $t = (function (Y) {
                j(L, Y);
                var N = Ne(L);
                function L(Q, z) {
                  var J;
                  return (
                    ee(this, L),
                    (J = N.call(this)),
                    J.resolveOptions(z),
                    J.listenClick(Q),
                    J
                  );
                }
                return (
                  he(
                    L,
                    [
                      {
                        key: "resolveOptions",
                        value: function () {
                          var z =
                            arguments.length > 0 && arguments[0] !== void 0
                              ? arguments[0]
                              : {};
                          (this.action =
                            typeof z.action == "function"
                              ? z.action
                              : this.defaultAction),
                            (this.target =
                              typeof z.target == "function"
                                ? z.target
                                : this.defaultTarget),
                            (this.text =
                              typeof z.text == "function"
                                ? z.text
                                : this.defaultText),
                            (this.container =
                              Z(z.container) === "object"
                                ? z.container
                                : document.body);
                        },
                      },
                      {
                        key: "listenClick",
                        value: function (z) {
                          var J = this;
                          this.listener = m()(z, "click", function (Ce) {
                            return J.onClick(Ce);
                          });
                        },
                      },
                      {
                        key: "onClick",
                        value: function (z) {
                          var J = z.delegateTarget || z.currentTarget,
                            Ce = this.action(J) || "copy",
                            Et = Ue({
                              action: Ce,
                              container: this.container,
                              target: this.target(J),
                              text: this.text(J),
                            });
                          this.emit(Et ? "success" : "error", {
                            action: Ce,
                            text: Et,
                            trigger: J,
                            clearSelection: function () {
                              J && J.focus(),
                                window.getSelection().removeAllRanges();
                            },
                          });
                        },
                      },
                      {
                        key: "defaultAction",
                        value: function (z) {
                          return Pe("action", z);
                        },
                      },
                      {
                        key: "defaultTarget",
                        value: function (z) {
                          var J = Pe("target", z);
                          if (J) return document.querySelector(J);
                        },
                      },
                      {
                        key: "defaultText",
                        value: function (z) {
                          return Pe("text", z);
                        },
                      },
                      {
                        key: "destroy",
                        value: function () {
                          this.listener.destroy();
                        },
                      },
                    ],
                    [
                      {
                        key: "copy",
                        value: function (z) {
                          var J =
                            arguments.length > 1 && arguments[1] !== void 0
                              ? arguments[1]
                              : { container: document.body };
                          return te(z, J);
                        },
                      },
                      {
                        key: "cut",
                        value: function (z) {
                          return S(z);
                        },
                      },
                      {
                        key: "isSupported",
                        value: function () {
                          var z =
                              arguments.length > 0 && arguments[0] !== void 0
                                ? arguments[0]
                                : ["copy", "cut"],
                            J = typeof z == "string" ? [z] : z,
                            Ce = !!document.queryCommandSupported;
                          return (
                            J.forEach(function (Et) {
                              Ce = Ce && !!document.queryCommandSupported(Et);
                            }),
                            Ce
                          );
                        },
                      },
                    ]
                  ),
                  L
                );
              })(d()),
              xt = $t;
          },
          828: function (i) {
            var a = 9;
            if (typeof Element < "u" && !Element.prototype.matches) {
              var r = Element.prototype;
              r.matches =
                r.matchesSelector ||
                r.mozMatchesSelector ||
                r.msMatchesSelector ||
                r.oMatchesSelector ||
                r.webkitMatchesSelector;
            }
            function c(d, u) {
              for (; d && d.nodeType !== a; ) {
                if (typeof d.matches == "function" && d.matches(u)) return d;
                d = d.parentNode;
              }
            }
            i.exports = c;
          },
          438: function (i, a, r) {
            var c = r(828);
            function d(g, O, k, D, S) {
              var M = m.apply(this, arguments);
              return (
                g.addEventListener(k, M, S),
                {
                  destroy: function () {
                    g.removeEventListener(k, M, S);
                  },
                }
              );
            }
            function u(g, O, k, D, S) {
              return typeof g.addEventListener == "function"
                ? d.apply(null, arguments)
                : typeof k == "function"
                ? d.bind(null, document).apply(null, arguments)
                : (typeof g == "string" && (g = document.querySelectorAll(g)),
                  Array.prototype.map.call(g, function (M) {
                    return d(M, O, k, D, S);
                  }));
            }
            function m(g, O, k, D) {
              return function (S) {
                (S.delegateTarget = c(S.target, O)),
                  S.delegateTarget && D.call(g, S);
              };
            }
            i.exports = u;
          },
          879: function (i, a) {
            (a.node = function (r) {
              return (
                r !== void 0 && r instanceof HTMLElement && r.nodeType === 1
              );
            }),
              (a.nodeList = function (r) {
                var c = Object.prototype.toString.call(r);
                return (
                  r !== void 0 &&
                  (c === "[object NodeList]" ||
                    c === "[object HTMLCollection]") &&
                  "length" in r &&
                  (r.length === 0 || a.node(r[0]))
                );
              }),
              (a.string = function (r) {
                return typeof r == "string" || r instanceof String;
              }),
              (a.fn = function (r) {
                var c = Object.prototype.toString.call(r);
                return c === "[object Function]";
              });
          },
          370: function (i, a, r) {
            var c = r(879),
              d = r(438);
            function u(k, D, S) {
              if (!k && !D && !S) throw new Error("Missing required arguments");
              if (!c.string(D))
                throw new TypeError("Second argument must be a String");
              if (!c.fn(S))
                throw new TypeError("Third argument must be a Function");
              if (c.node(k)) return m(k, D, S);
              if (c.nodeList(k)) return g(k, D, S);
              if (c.string(k)) return O(k, D, S);
              throw new TypeError(
                "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
              );
            }
            function m(k, D, S) {
              return (
                k.addEventListener(D, S),
                {
                  destroy: function () {
                    k.removeEventListener(D, S);
                  },
                }
              );
            }
            function g(k, D, S) {
              return (
                Array.prototype.forEach.call(k, function (M) {
                  M.addEventListener(D, S);
                }),
                {
                  destroy: function () {
                    Array.prototype.forEach.call(k, function (M) {
                      M.removeEventListener(D, S);
                    });
                  },
                }
              );
            }
            function O(k, D, S) {
              return d(document.body, k, D, S);
            }
            i.exports = u;
          },
          817: function (i) {
            function a(r) {
              var c;
              if (r.nodeName === "SELECT") r.focus(), (c = r.value);
              else if (r.nodeName === "INPUT" || r.nodeName === "TEXTAREA") {
                var d = r.hasAttribute("readonly");
                d || r.setAttribute("readonly", ""),
                  r.select(),
                  r.setSelectionRange(0, r.value.length),
                  d || r.removeAttribute("readonly"),
                  (c = r.value);
              } else {
                r.hasAttribute("contenteditable") && r.focus();
                var u = window.getSelection(),
                  m = document.createRange();
                m.selectNodeContents(r),
                  u.removeAllRanges(),
                  u.addRange(m),
                  (c = u.toString());
              }
              return c;
            }
            i.exports = a;
          },
          279: function (i) {
            function a() {}
            (a.prototype = {
              on: function (r, c, d) {
                var u = this.e || (this.e = {});
                return (u[r] || (u[r] = [])).push({ fn: c, ctx: d }), this;
              },
              once: function (r, c, d) {
                var u = this;
                function m() {
                  u.off(r, m), c.apply(d, arguments);
                }
                return (m._ = c), this.on(r, m, d);
              },
              emit: function (r) {
                var c = [].slice.call(arguments, 1),
                  d = ((this.e || (this.e = {}))[r] || []).slice(),
                  u = 0,
                  m = d.length;
                for (u; u < m; u++) d[u].fn.apply(d[u].ctx, c);
                return this;
              },
              off: function (r, c) {
                var d = this.e || (this.e = {}),
                  u = d[r],
                  m = [];
                if (u && c)
                  for (var g = 0, O = u.length; g < O; g++)
                    u[g].fn !== c && u[g].fn._ !== c && m.push(u[g]);
                return m.length ? (d[r] = m) : delete d[r], this;
              },
            }),
              (i.exports = a),
              (i.exports.TinyEmitter = a);
          },
        },
        n = {};
      function o(i) {
        if (n[i]) return n[i].exports;
        var a = (n[i] = { exports: {} });
        return s[i](a, a.exports, o), a.exports;
      }
      return (
        (function () {
          o.n = function (i) {
            var a =
              i && i.__esModule
                ? function () {
                    return i.default;
                  }
                : function () {
                    return i;
                  };
            return o.d(a, { a }), a;
          };
        })(),
        (function () {
          o.d = function (i, a) {
            for (var r in a)
              o.o(a, r) &&
                !o.o(i, r) &&
                Object.defineProperty(i, r, { enumerable: !0, get: a[r] });
          };
        })(),
        (function () {
          o.o = function (i, a) {
            return Object.prototype.hasOwnProperty.call(i, a);
          };
        })(),
        o(686)
      );
    })().default;
  });
})(fa);
const Cl = wl(fa.exports);
var Il = Object.defineProperty,
  Jo = Object.getOwnPropertySymbols,
  xl = Object.prototype.hasOwnProperty,
  El = Object.prototype.propertyIsEnumerable,
  zo = (e, t, s) =>
    t in e
      ? Il(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  ua = (e, t) => {
    for (var s in t || (t = {})) xl.call(t, s) && zo(e, s, t[s]);
    if (Jo) for (var s of Jo(t)) El.call(t, s) && zo(e, s, t[s]);
    return e;
  },
  rn = (e) => typeof e == "function",
  cn = (e) => typeof e == "string",
  Aa = (e) => cn(e) && e.trim().length > 0,
  Bl = (e) => typeof e == "number",
  jt = (e) => typeof e > "u",
  gs = (e) => typeof e == "object" && e !== null,
  Sl = (e) => nt(e, "tag") && Aa(e.tag),
  pa = (e) => window.TouchEvent && e instanceof TouchEvent,
  ha = (e) => nt(e, "component") && ga(e.component),
  Ol = (e) => rn(e) || gs(e),
  ga = (e) => !jt(e) && (cn(e) || Ol(e) || ha(e)),
  Ko = (e) =>
    gs(e) &&
    ["height", "width", "right", "left", "top", "bottom"].every((t) =>
      Bl(e[t])
    ),
  nt = (e, t) => (gs(e) || rn(e)) && t in e,
  Nl = (
    (e) => () =>
      e++
  )(0);
function mn(e) {
  return pa(e) ? e.targetTouches[0].clientX : e.clientX;
}
function Zo(e) {
  return pa(e) ? e.targetTouches[0].clientY : e.clientY;
}
var kl = (e) => {
    jt(e.remove) ? e.parentNode && e.parentNode.removeChild(e) : e.remove();
  },
  _s = (e) =>
    ha(e)
      ? _s(e.component)
      : Sl(e)
      ? ve({
          render() {
            return e;
          },
        })
      : typeof e == "string"
      ? e
      : X(T(e)),
  Tl = (e) => {
    if (typeof e == "string") return e;
    const t = nt(e, "props") && gs(e.props) ? e.props : {},
      s = nt(e, "listeners") && gs(e.listeners) ? e.listeners : {};
    return { component: _s(e), props: t, listeners: s };
  },
  Pl = () => typeof window < "u",
  so = class {
    constructor() {
      this.allHandlers = {};
    }
    getHandlers(e) {
      return this.allHandlers[e] || [];
    }
    on(e, t) {
      const s = this.getHandlers(e);
      s.push(t), (this.allHandlers[e] = s);
    }
    off(e, t) {
      const s = this.getHandlers(e);
      s.splice(s.indexOf(t) >>> 0, 1);
    }
    emit(e, t) {
      this.getHandlers(e).forEach((n) => n(t));
    }
  },
  Ll = (e) => ["on", "off", "emit"].every((t) => nt(e, t) && rn(e[t])),
  De;
(function (e) {
  (e.SUCCESS = "success"),
    (e.ERROR = "error"),
    (e.WARNING = "warning"),
    (e.INFO = "info"),
    (e.DEFAULT = "default");
})(De || (De = {}));
var Zt;
(function (e) {
  (e.TOP_LEFT = "top-left"),
    (e.TOP_CENTER = "top-center"),
    (e.TOP_RIGHT = "top-right"),
    (e.BOTTOM_LEFT = "bottom-left"),
    (e.BOTTOM_CENTER = "bottom-center"),
    (e.BOTTOM_RIGHT = "bottom-right");
})(Zt || (Zt = {}));
var Fe;
(function (e) {
  (e.ADD = "add"),
    (e.DISMISS = "dismiss"),
    (e.UPDATE = "update"),
    (e.CLEAR = "clear"),
    (e.UPDATE_DEFAULTS = "update_defaults");
})(Fe || (Fe = {}));
var We = "Vue-Toastification",
  ze = {
    type: { type: String, default: De.DEFAULT },
    classNames: { type: [String, Array], default: () => [] },
    trueBoolean: { type: Boolean, default: !0 },
  },
  ma = {
    type: ze.type,
    customIcon: { type: [String, Boolean, Object, Function], default: !0 },
  },
  Ps = {
    component: { type: [String, Object, Function, Boolean], default: "button" },
    classNames: ze.classNames,
    showOnHover: { type: Boolean, default: !1 },
    ariaLabel: { type: String, default: "close" },
  },
  Tn = {
    timeout: { type: [Number, Boolean], default: 5e3 },
    hideProgressBar: { type: Boolean, default: !1 },
    isRunning: { type: Boolean, default: !1 },
  },
  va = { transition: { type: [Object, String], default: `${We}__bounce` } },
  jl = {
    position: { type: String, default: Zt.TOP_RIGHT },
    draggable: ze.trueBoolean,
    draggablePercent: { type: Number, default: 0.6 },
    pauseOnFocusLoss: ze.trueBoolean,
    pauseOnHover: ze.trueBoolean,
    closeOnClick: ze.trueBoolean,
    timeout: Tn.timeout,
    hideProgressBar: Tn.hideProgressBar,
    toastClassName: ze.classNames,
    bodyClassName: ze.classNames,
    icon: ma.customIcon,
    closeButton: Ps.component,
    closeButtonClassName: Ps.classNames,
    showCloseButtonOnHover: Ps.showOnHover,
    accessibility: {
      type: Object,
      default: () => ({ toastRole: "alert", closeButtonLabel: "close" }),
    },
    rtl: { type: Boolean, default: !1 },
    eventBus: { type: Object, required: !1, default: () => new so() },
  },
  Dl = {
    id: { type: [String, Number], required: !0, default: 0 },
    type: ze.type,
    content: { type: [String, Object, Function], required: !0, default: "" },
    onClick: { type: Function, default: void 0 },
    onClose: { type: Function, default: void 0 },
  },
  Fl = {
    container: { type: [Object, Function], default: () => document.body },
    newestOnTop: ze.trueBoolean,
    maxToasts: { type: Number, default: 20 },
    transition: va.transition,
    toastDefaults: Object,
    filterBeforeCreate: { type: Function, default: (e) => e },
    filterToasts: { type: Function, default: (e) => e },
    containerClassName: ze.classNames,
    onMounted: Function,
    shareAppContext: [Boolean, Object],
  },
  lt = {
    CORE_TOAST: jl,
    TOAST: Dl,
    CONTAINER: Fl,
    PROGRESS_BAR: Tn,
    ICON: ma,
    TRANSITION: va,
    CLOSE_BUTTON: Ps,
  },
  _a = ve({
    name: "VtProgressBar",
    props: lt.PROGRESS_BAR,
    data() {
      return { hasClass: !0 };
    },
    computed: {
      style() {
        return {
          animationDuration: `${this.timeout}ms`,
          animationPlayState: this.isRunning ? "running" : "paused",
          opacity: this.hideProgressBar ? 0 : 1,
        };
      },
      cpClass() {
        return this.hasClass ? `${We}__progress-bar` : "";
      },
    },
    watch: {
      timeout() {
        (this.hasClass = !1), this.$nextTick(() => (this.hasClass = !0));
      },
    },
    mounted() {
      this.$el.addEventListener("animationend", this.animationEnded);
    },
    beforeUnmount() {
      this.$el.removeEventListener("animationend", this.animationEnded);
    },
    methods: {
      animationEnded() {
        this.$emit("close-toast");
      },
    },
  });
function Rl(e, t) {
  return h(), v("div", { style: ft(e.style), class: be(e.cpClass) }, null, 6);
}
_a.render = Rl;
var Ml = _a,
  ya = ve({
    name: "VtCloseButton",
    props: lt.CLOSE_BUTTON,
    computed: {
      buttonComponent() {
        return this.component !== !1 ? _s(this.component) : "button";
      },
      classes() {
        const e = [`${We}__close-button`];
        return (
          this.showOnHover && e.push("show-on-hover"), e.concat(this.classNames)
        );
      },
    },
  }),
  Yl = Ge(" \xD7 ");
function Hl(e, t) {
  return (
    h(),
    Te(
      Vn(e.buttonComponent),
      nn({ "aria-label": e.ariaLabel, class: e.classes }, e.$attrs),
      { default: it(() => [Yl]), _: 1 },
      16,
      ["aria-label", "class"]
    )
  );
}
ya.render = Hl;
var Ql = ya,
  ba = {},
  Ul = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "check-circle",
    class: "svg-inline--fa fa-check-circle fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
  },
  Jl = A(
    "path",
    {
      fill: "currentColor",
      d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z",
    },
    null,
    -1
  ),
  zl = [Jl];
function Kl(e, t) {
  return h(), v("svg", Ul, zl);
}
ba.render = Kl;
var Zl = ba,
  wa = {},
  Wl = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "info-circle",
    class: "svg-inline--fa fa-info-circle fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
  },
  Vl = A(
    "path",
    {
      fill: "currentColor",
      d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z",
    },
    null,
    -1
  ),
  Gl = [Vl];
function Xl(e, t) {
  return h(), v("svg", Wl, Gl);
}
wa.render = Xl;
var Wo = wa,
  Ca = {},
  ql = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "exclamation-circle",
    class: "svg-inline--fa fa-exclamation-circle fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
  },
  $l = A(
    "path",
    {
      fill: "currentColor",
      d: "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
    },
    null,
    -1
  ),
  ed = [$l];
function td(e, t) {
  return h(), v("svg", ql, ed);
}
Ca.render = td;
var sd = Ca,
  Ia = {},
  nd = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "exclamation-triangle",
    class: "svg-inline--fa fa-exclamation-triangle fa-w-18",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 576 512",
  },
  od = A(
    "path",
    {
      fill: "currentColor",
      d: "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z",
    },
    null,
    -1
  ),
  id = [od];
function ad(e, t) {
  return h(), v("svg", nd, id);
}
Ia.render = ad;
var rd = Ia,
  xa = ve({
    name: "VtIcon",
    props: lt.ICON,
    computed: {
      customIconChildren() {
        return nt(this.customIcon, "iconChildren")
          ? this.trimValue(this.customIcon.iconChildren)
          : "";
      },
      customIconClass() {
        return cn(this.customIcon)
          ? this.trimValue(this.customIcon)
          : nt(this.customIcon, "iconClass")
          ? this.trimValue(this.customIcon.iconClass)
          : "";
      },
      customIconTag() {
        return nt(this.customIcon, "iconTag")
          ? this.trimValue(this.customIcon.iconTag, "i")
          : "i";
      },
      hasCustomIcon() {
        return this.customIconClass.length > 0;
      },
      component() {
        return this.hasCustomIcon
          ? this.customIconTag
          : ga(this.customIcon)
          ? _s(this.customIcon)
          : this.iconTypeComponent;
      },
      iconTypeComponent() {
        return {
          [De.DEFAULT]: Wo,
          [De.INFO]: Wo,
          [De.SUCCESS]: Zl,
          [De.ERROR]: rd,
          [De.WARNING]: sd,
        }[this.type];
      },
      iconClasses() {
        const e = [`${We}__icon`];
        return this.hasCustomIcon ? e.concat(this.customIconClass) : e;
      },
    },
    methods: {
      trimValue(e, t = "") {
        return Aa(e) ? e.trim() : t;
      },
    },
  });
function cd(e, t) {
  return (
    h(),
    Te(
      Vn(e.component),
      { class: be(e.iconClasses) },
      { default: it(() => [Ge(Ie(e.customIconChildren), 1)]), _: 1 },
      8,
      ["class"]
    )
  );
}
xa.render = cd;
var ld = xa,
  Ea = ve({
    name: "VtToast",
    components: { ProgressBar: Ml, CloseButton: Ql, Icon: ld },
    inheritAttrs: !1,
    props: Object.assign({}, lt.CORE_TOAST, lt.TOAST),
    data() {
      return {
        isRunning: !0,
        disableTransitions: !1,
        beingDragged: !1,
        dragStart: 0,
        dragPos: { x: 0, y: 0 },
        dragRect: {},
      };
    },
    computed: {
      classes() {
        const e = [
          `${We}__toast`,
          `${We}__toast--${this.type}`,
          `${this.position}`,
        ].concat(this.toastClassName);
        return (
          this.disableTransitions && e.push("disable-transition"),
          this.rtl && e.push(`${We}__toast--rtl`),
          e
        );
      },
      bodyClasses() {
        return [
          `${We}__toast-${cn(this.content) ? "body" : "component-body"}`,
        ].concat(this.bodyClassName);
      },
      draggableStyle() {
        return this.dragStart === this.dragPos.x
          ? {}
          : this.beingDragged
          ? {
              transform: `translateX(${this.dragDelta}px)`,
              opacity: 1 - Math.abs(this.dragDelta / this.removalDistance),
            }
          : {
              transition: "transform 0.2s, opacity 0.2s",
              transform: "translateX(0)",
              opacity: 1,
            };
      },
      dragDelta() {
        return this.beingDragged ? this.dragPos.x - this.dragStart : 0;
      },
      removalDistance() {
        return Ko(this.dragRect)
          ? (this.dragRect.right - this.dragRect.left) * this.draggablePercent
          : 0;
      },
    },
    mounted() {
      this.draggable && this.draggableSetup(),
        this.pauseOnFocusLoss && this.focusSetup();
    },
    beforeUnmount() {
      this.draggable && this.draggableCleanup(),
        this.pauseOnFocusLoss && this.focusCleanup();
    },
    methods: {
      hasProp: nt,
      getVueComponentFromObj: _s,
      closeToast() {
        this.eventBus.emit(Fe.DISMISS, this.id);
      },
      clickHandler() {
        this.onClick && this.onClick(this.closeToast),
          this.closeOnClick &&
            (!this.beingDragged || this.dragStart === this.dragPos.x) &&
            this.closeToast();
      },
      timeoutHandler() {
        this.closeToast();
      },
      hoverPause() {
        this.pauseOnHover && (this.isRunning = !1);
      },
      hoverPlay() {
        this.pauseOnHover && (this.isRunning = !0);
      },
      focusPause() {
        this.isRunning = !1;
      },
      focusPlay() {
        this.isRunning = !0;
      },
      focusSetup() {
        addEventListener("blur", this.focusPause),
          addEventListener("focus", this.focusPlay);
      },
      focusCleanup() {
        removeEventListener("blur", this.focusPause),
          removeEventListener("focus", this.focusPlay);
      },
      draggableSetup() {
        const e = this.$el;
        e.addEventListener("touchstart", this.onDragStart, { passive: !0 }),
          e.addEventListener("mousedown", this.onDragStart),
          addEventListener("touchmove", this.onDragMove, { passive: !1 }),
          addEventListener("mousemove", this.onDragMove),
          addEventListener("touchend", this.onDragEnd),
          addEventListener("mouseup", this.onDragEnd);
      },
      draggableCleanup() {
        const e = this.$el;
        e.removeEventListener("touchstart", this.onDragStart),
          e.removeEventListener("mousedown", this.onDragStart),
          removeEventListener("touchmove", this.onDragMove),
          removeEventListener("mousemove", this.onDragMove),
          removeEventListener("touchend", this.onDragEnd),
          removeEventListener("mouseup", this.onDragEnd);
      },
      onDragStart(e) {
        (this.beingDragged = !0),
          (this.dragPos = { x: mn(e), y: Zo(e) }),
          (this.dragStart = mn(e)),
          (this.dragRect = this.$el.getBoundingClientRect());
      },
      onDragMove(e) {
        this.beingDragged &&
          (e.preventDefault(),
          this.isRunning && (this.isRunning = !1),
          (this.dragPos = { x: mn(e), y: Zo(e) }));
      },
      onDragEnd() {
        this.beingDragged &&
          (Math.abs(this.dragDelta) >= this.removalDistance
            ? ((this.disableTransitions = !0),
              this.$nextTick(() => this.closeToast()))
            : setTimeout(() => {
                (this.beingDragged = !1),
                  Ko(this.dragRect) &&
                  this.pauseOnHover &&
                  this.dragRect.bottom >= this.dragPos.y &&
                  this.dragPos.y >= this.dragRect.top &&
                  this.dragRect.left <= this.dragPos.x &&
                  this.dragPos.x <= this.dragRect.right
                    ? (this.isRunning = !1)
                    : (this.isRunning = !0);
              }));
      },
    },
  }),
  dd = ["role"];
function fd(e, t) {
  const s = ct("Icon"),
    n = ct("CloseButton"),
    o = ct("ProgressBar");
  return (
    h(),
    v(
      "div",
      {
        class: be(e.classes),
        style: ft(e.draggableStyle),
        onClick:
          t[0] || (t[0] = (...i) => e.clickHandler && e.clickHandler(...i)),
        onMouseenter:
          t[1] || (t[1] = (...i) => e.hoverPause && e.hoverPause(...i)),
        onMouseleave:
          t[2] || (t[2] = (...i) => e.hoverPlay && e.hoverPlay(...i)),
      },
      [
        e.icon
          ? (h(),
            Te(s, { key: 0, "custom-icon": e.icon, type: e.type }, null, 8, [
              "custom-icon",
              "type",
            ]))
          : st("v-if", !0),
        A(
          "div",
          {
            role: e.accessibility.toastRole || "alert",
            class: be(e.bodyClasses),
          },
          [
            typeof e.content == "string"
              ? (h(), v(ue, { key: 0 }, [Ge(Ie(e.content), 1)], 2112))
              : (h(),
                Te(
                  Vn(e.getVueComponentFromObj(e.content)),
                  nn(
                    { key: 1, "toast-id": e.id },
                    e.hasProp(e.content, "props") ? e.content.props : {},
                    tc(
                      e.hasProp(e.content, "listeners")
                        ? e.content.listeners
                        : {}
                    ),
                    { onCloseToast: e.closeToast }
                  ),
                  null,
                  16,
                  ["toast-id", "onCloseToast"]
                )),
          ],
          10,
          dd
        ),
        e.closeButton
          ? (h(),
            Te(
              n,
              {
                key: 1,
                component: e.closeButton,
                "class-names": e.closeButtonClassName,
                "show-on-hover": e.showCloseButtonOnHover,
                "aria-label": e.accessibility.closeButtonLabel,
                onClick: ll(e.closeToast, ["stop"]),
              },
              null,
              8,
              [
                "component",
                "class-names",
                "show-on-hover",
                "aria-label",
                "onClick",
              ]
            ))
          : st("v-if", !0),
        e.timeout
          ? (h(),
            Te(
              o,
              {
                key: 2,
                "is-running": e.isRunning,
                "hide-progress-bar": e.hideProgressBar,
                timeout: e.timeout,
                onCloseToast: e.timeoutHandler,
              },
              null,
              8,
              ["is-running", "hide-progress-bar", "timeout", "onCloseToast"]
            ))
          : st("v-if", !0),
      ],
      38
    )
  );
}
Ea.render = fd;
var ud = Ea,
  Ba = ve({
    name: "VtTransition",
    props: lt.TRANSITION,
    emits: ["leave"],
    methods: {
      hasProp: nt,
      leave(e) {
        e instanceof HTMLElement &&
          ((e.style.left = e.offsetLeft + "px"),
          (e.style.top = e.offsetTop + "px"),
          (e.style.width = getComputedStyle(e).width),
          (e.style.position = "absolute"));
      },
    },
  });
function Ad(e, t) {
  return (
    h(),
    Te(
      sl,
      {
        tag: "div",
        "enter-active-class": e.transition.enter
          ? e.transition.enter
          : `${e.transition}-enter-active`,
        "move-class": e.transition.move
          ? e.transition.move
          : `${e.transition}-move`,
        "leave-active-class": e.transition.leave
          ? e.transition.leave
          : `${e.transition}-leave-active`,
        onLeave: e.leave,
      },
      { default: it(() => [Yi(e.$slots, "default")]), _: 3 },
      8,
      ["enter-active-class", "move-class", "leave-active-class", "onLeave"]
    )
  );
}
Ba.render = Ad;
var pd = Ba,
  Sa = ve({
    name: "VueToastification",
    devtools: { hide: !0 },
    components: { Toast: ud, VtTransition: pd },
    props: Object.assign({}, lt.CORE_TOAST, lt.CONTAINER, lt.TRANSITION),
    data() {
      return {
        count: 0,
        positions: Object.values(Zt),
        toasts: {},
        defaults: {},
      };
    },
    computed: {
      toastArray() {
        return Object.values(this.toasts);
      },
      filteredToasts() {
        return this.defaults.filterToasts(this.toastArray);
      },
    },
    beforeMount() {
      const e = this.eventBus;
      e.on(Fe.ADD, this.addToast),
        e.on(Fe.CLEAR, this.clearToasts),
        e.on(Fe.DISMISS, this.dismissToast),
        e.on(Fe.UPDATE, this.updateToast),
        e.on(Fe.UPDATE_DEFAULTS, this.updateDefaults),
        (this.defaults = this.$props);
    },
    mounted() {
      this.setup(this.container);
    },
    methods: {
      async setup(e) {
        rn(e) && (e = await e()), kl(this.$el), e.appendChild(this.$el);
      },
      setToast(e) {
        jt(e.id) || (this.toasts[e.id] = e);
      },
      addToast(e) {
        e.content = Tl(e.content);
        const t = Object.assign(
            {},
            this.defaults,
            e.type &&
              this.defaults.toastDefaults &&
              this.defaults.toastDefaults[e.type],
            e
          ),
          s = this.defaults.filterBeforeCreate(t, this.toastArray);
        s && this.setToast(s);
      },
      dismissToast(e) {
        const t = this.toasts[e];
        !jt(t) && !jt(t.onClose) && t.onClose(), delete this.toasts[e];
      },
      clearToasts() {
        Object.keys(this.toasts).forEach((e) => {
          this.dismissToast(e);
        });
      },
      getPositionToasts(e) {
        const t = this.filteredToasts
          .filter((s) => s.position === e)
          .slice(0, this.defaults.maxToasts);
        return this.defaults.newestOnTop ? t.reverse() : t;
      },
      updateDefaults(e) {
        jt(e.container) || this.setup(e.container),
          (this.defaults = Object.assign({}, this.defaults, e));
      },
      updateToast({ id: e, options: t, create: s }) {
        this.toasts[e]
          ? (t.timeout && t.timeout === this.toasts[e].timeout && t.timeout++,
            this.setToast(Object.assign({}, this.toasts[e], t)))
          : s && this.addToast(Object.assign({}, { id: e }, t));
      },
      getClasses(e) {
        return [`${We}__container`, e].concat(this.defaults.containerClassName);
      },
    },
  });
function hd(e, t) {
  const s = ct("Toast"),
    n = ct("VtTransition");
  return (
    h(),
    v("div", null, [
      (h(!0),
      v(
        ue,
        null,
        bt(
          e.positions,
          (o) => (
            h(),
            v("div", { key: o }, [
              B(
                n,
                {
                  transition: e.defaults.transition,
                  class: be(e.getClasses(o)),
                },
                {
                  default: it(() => [
                    (h(!0),
                    v(
                      ue,
                      null,
                      bt(
                        e.getPositionToasts(o),
                        (i) => (h(), Te(s, nn({ key: i.id }, i), null, 16))
                      ),
                      128
                    )),
                  ]),
                  _: 2,
                },
                1032,
                ["transition", "class"]
              ),
            ])
          )
        ),
        128
      )),
    ])
  );
}
Sa.render = hd;
var gd = Sa,
  Vo = (e = {}, t = !0) => {
    const s = (e.eventBus = e.eventBus || new so());
    t &&
      ms(() => {
        const i = la(gd, ua({}, e)),
          a = i.mount(document.createElement("div")),
          r = e.onMounted;
        if ((jt(r) || r(a, i), e.shareAppContext)) {
          const c = e.shareAppContext;
          c === !0
            ? console.warn(
                `[${We}] App to share context with was not provided.`
              )
            : ((i._context.components = c._context.components),
              (i._context.directives = c._context.directives),
              (i._context.mixins = c._context.mixins),
              (i._context.provides = c._context.provides),
              (i.config.globalProperties = c.config.globalProperties));
        }
      });
    const n = (i, a) => {
      const r = Object.assign({}, { id: Nl(), type: De.DEFAULT }, a, {
        content: i,
      });
      return s.emit(Fe.ADD, r), r.id;
    };
    (n.clear = () => s.emit(Fe.CLEAR, void 0)),
      (n.updateDefaults = (i) => {
        s.emit(Fe.UPDATE_DEFAULTS, i);
      }),
      (n.dismiss = (i) => {
        s.emit(Fe.DISMISS, i);
      });
    function o(i, { content: a, options: r }, c = !1) {
      const d = Object.assign({}, r, { content: a });
      s.emit(Fe.UPDATE, { id: i, options: d, create: c });
    }
    return (
      (n.update = o),
      (n.success = (i, a) => n(i, Object.assign({}, a, { type: De.SUCCESS }))),
      (n.info = (i, a) => n(i, Object.assign({}, a, { type: De.INFO }))),
      (n.error = (i, a) => n(i, Object.assign({}, a, { type: De.ERROR }))),
      (n.warning = (i, a) => n(i, Object.assign({}, a, { type: De.WARNING }))),
      n
    );
  },
  md = () => {
    const e = () => console.warn(`[${We}] This plugin does not support SSR!`);
    return new Proxy(e, {
      get() {
        return e;
      },
    });
  };
function Pn(e) {
  return Pl() ? (Ll(e) ? Vo({ eventBus: e }, !1) : Vo(e, !0)) : md();
}
var Oa = Symbol("VueToastification"),
  Na = new so(),
  vd = (e, t) => {
    (t == null ? void 0 : t.shareAppContext) === !0 && (t.shareAppContext = e);
    const s = Pn(ua({ eventBus: Na }, t));
    e.provide(Oa, s);
  },
  Go = (e) => {
    if (e) return Pn(e);
    const t = eo() ? Ns(Oa, void 0) : void 0;
    return t || Pn(Na);
  },
  _d = vd;
const Xt = (e) => (Be("data-v-a9b2508f"), (e = e()), Se(), e),
  yd = { class: "address" },
  bd = Xt(() => A("strong", null, "BSC", -1)),
  wd = Xt(() =>
    A(
      "strong",
      { style: { display: "inline-block", transform: "translate(1px, -1px)" } },
      ":",
      -1
    )
  ),
  Cd = Xt(() =>
    A("span", null, " 0x000000000000000000000000000000 ", -1)
  ),
  Id = { class: "address" },
  xd = Xt(() => A("strong", null, "Mainnet", -1)),
  Ed = Xt(() =>
    A(
      "strong",
      { style: { display: "inline-block", transform: "translate(1px, -1px)" } },
      ":",
      -1
    )
  ),
  Bd = Xt(() =>
    A("span", null, " 0x0000000000000000000000000000000 ", -1)
  ),
  Sd = ve({
    __name: "Popover",
    props: { target: null, disabled: { type: Boolean } },
    emits: ["visible"],
    setup(e, { emit: t }) {
      const s = e,
        n = Re(),
        o = Re(!1),
        i = Re({});
      let a,
        r = "";
      function c() {
        if (s.disabled) return;
        const u = a.getBoundingClientRect();
        (i.value = {
          left: u.left + u.width / 2 + "px",
          top: u.bottom + 18 + "px",
          lineHeight: 1.5,
          paddingTop: "18px",
          transform: "translateX(-50%)",
        }),
          (o.value = !0),
          t("visible", !0),
          (r = "mousemove"),
          ms(() => {
            if (n.value) {
              const g =
                n.value.getBoundingClientRect().right - window.innerWidth;
              g > 0 &&
                (i.value.transform = `translateX(calc(-50% - ${g + 30}px))`);
            }
          });
      }
      function d() {
        (r = "mouseleave"),
          setTimeout(() => {
            r === "mouseleave" && ((o.value = !1), t("visible", !1));
          }, 150);
      }
      return (
        vs(() => {
          (a = document.querySelector(s.target)),
            a &&
              (a.addEventListener("mousemove", c),
              a.addEventListener("mouseleave", d));
          const u = new Cl("#btn-copy");
          u.on("success", function (m) {
            Go().success("PHB Contract copied !", {
              position: Zt.TOP_RIGHT,
              timeout: 2e3,
              closeOnClick: !0,
              pauseOnFocusLoss: !1,
              pauseOnHover: !0,
              draggable: !0,
              draggablePercent: 0.6,
              showCloseButtonOnHover: !1,
              hideProgressBar: !0,
              closeButton: !1,
              icon: !0,
              rtl: !1,
            });
          }),
            u.on("error", function (m) {
              console.error("[Copy PHB Token]", m),
                Go().error("An error occurred while copying PHB Token !", {
                  position: Zt.TOP_RIGHT,
                  timeout: 2e3,
                  closeOnClick: !0,
                  pauseOnFocusLoss: !1,
                  pauseOnHover: !0,
                  draggable: !0,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: !1,
                  hideProgressBar: !0,
                  closeButton: !1,
                  icon: !0,
                  rtl: !1,
                });
            });
        }),
        en(() => {
          a &&
            (a.removeEventListener("mouseenter", c),
            a.removeEventListener("mouseleave", d));
        }),
        (u, m) => {
          const g = ct("SvgIcon");
          return (
            h(),
            Te(
              an,
              { name: "fade-in" },
              {
                default: it(() => [
                  o.value
                    ? (h(),
                      v(
                        "div",
                        {
                          key: 0,
                          ref_key: "refPopover",
                          ref: n,
                          class: "popover",
                          style: ft(i.value),
                        },
                        [
                          A("div", yd, [
                            bd,
                            wd,
                            Cd,
                            B(g, {
                              icon: "copy",
                              id: "btn-copy",
                              "data-clipboard-text":
                                "0x000000000000000000000000000000",
                            }),
                          ]),
                          A("div", Id, [
                            xd,
                            Ed,
                            Bd,
                            B(g, {
                              icon: "copy",
                              id: "btn-copy",
                              "data-clipboard-text":
                                "0x0000000000000000000000000000000",
                            }),
                          ]),
                        ],
                        4
                      ))
                    : st("", !0),
                ]),
                _: 1,
              }
            )
          );
        }
      );
    },
  });
const Od = ce(Sd, [["__scopeId", "data-v-a9b2508f"]]);
const Nd = {},
  kd = {
    width: "12px",
    height: "12px",
    viewBox: "0 0 12 12",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
  },
  Td = q(
    2
  ),
  Pd = [Td];
function Ld(e, t) {
  return h(), v("svg", kd, Pd);
}
const no = ce(Nd, [
  ["render", Ld],
  ["__scopeId", "data-v-97cdaf17"],
]);
const jd = {},
  ka = (e) => (Be("data-v-bdd8b1bc"), (e = e()), Se(), e),
  Dd = {
    width: "10px",
    height: "6px",
    viewBox: "0 0 10 6",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
  },
  Fd = ka(() => A("title", null, "\u8DEF\u5F84", -1)),
  Rd = ka(() =>
    A(
      "g",
      {
        id: "\u9875\u9762-1",
        stroke: "none",
        "stroke-width": "1",
        fill: "none",
        "fill-rule": "evenodd",
      },
      [
        A(
          "g",
          {
            id: "Navigation-Developers",
            transform: "translate(-830.000000, -42.000000)",
            fill: "currentColor",
            "fill-rule": "nonzero",
          },
          [
            A(
              "g",
              {
                id: "\u7F16\u7EC4-30",
                transform: "translate(752.000000, 38.000000)",
              },
              [
                A("path", {
                  d: "M83.495,9.74352047 C83.355,9.89480794 83.165,10.0352892 82.985,9.99206416 C82.805,10.0244829 82.635,9.87319544 82.495,9.74352047 L78.165,5.04280287 C77.945,4.80506543 77.945,4.41604052 78.165,4.17830308 C78.385,3.94056564 78.745,3.94056564 78.965,4.17830308 L82.995,8.65208949 L87.035,4.17830308 C87.255,3.94056564 87.615,3.94056564 87.835,4.17830308 C88.055,4.41604052 88.055,4.80506543 87.835,5.04280287 L83.495,9.74352047 Z",
                  id: "\u8DEF\u5F84",
                }),
              ]
            ),
          ]
        ),
      ],
      -1
    )
  ),
  Md = [Fd, Rd];
function Yd(e, t) {
  return h(), v("svg", Dd, Md);
}
const Hd = ce(jd, [
  ["render", Yd],
  ["__scopeId", "data-v-bdd8b1bc"],
]);
const Qd = { class: "hey-menu" },
  Ud = { class: "dropdown" },
  Jd = { class: "dropdown_wrapper" },
  zd = { key: 0, class: "menu_title" },
  Kd = { class: "menu-item" },
  Zd = { class: "title" },
  Wd = { key: 0 },
  Vd = { class: "links" },
  Gd = ["href"],
  Xd = {
    __name: "_index",
    props: ["title", "list"],
    setup(e) {
      return (t, s) => (
        h(),
        v("div", Qd, [
          A(
            "label",
            {
              class: "menu-title",
              onClick: s[0] || (s[0] = (n) => t.$emit("selectMenu")),
            },
            [A("span", null, Ie(e.title), 1), B(Hd)]
          ),
          A("div", Ud, [
            A("div", Jd, [
              (h(!0),
              v(
                ue,
                null,
                bt(
                  e.list,
                  (n) => (
                    h(),
                    v(
                      "div",
                      { class: be({ menu_group: !0, thin: n.thin }) },
                      [
                        n.title
                          ? (h(), v("label", zd, Ie(n.title), 1))
                          : st("", !0),
                        (h(!0),
                        v(
                          ue,
                          null,
                          bt(
                            n.list,
                            (o) => (
                              h(),
                              v("div", Kd, [
                                A("div", Zd, [
                                  o.label
                                    ? (h(), v("label", Wd, Ie(o.label), 1))
                                    : st("", !0),
                                  Ge(" " + Ie(o.title), 1),
                                ]),
                                A("div", Vd, [
                                  (h(!0),
                                  v(
                                    ue,
                                    null,
                                    bt(
                                      o.links,
                                      (i) => (
                                        h(),
                                        v(
                                          "a",
                                          { href: i[1], target: "_blank" },
                                          [A("span", null, Ie(i[0]), 1), B(no)],
                                          8,
                                          Gd
                                        )
                                      )
                                    ),
                                    256
                                  )),
                                ]),
                              ])
                            )
                          ),
                          256
                        )),
                      ],
                      2
                    )
                  )
                ),
                256
              )),
            ]),
          ]),
        ])
      );
    },
  },
  Ta = ce(Xd, [["__scopeId", "data-v-dae2a90a"]]);
const qd = {
  __name: "tech",
  setup(e) {
    // const t = [
    //   {
    //     title: "Infrastructure",
    //     list: [
    //       {
    //         label: "SkyNet",
    //         title: "AI Compute Layer",
    //         links: [["View Control Panel", "https://skynet.phoenix.global/"]],
    //       },
    //       {
    //         title: "Layer 1",
    //         links: [["View Mainnet Explorer", "https://scan.phoenix.global/"]],
    //       },
    //     ],
    //   },
    //   {
    //     title: "DApps",
    //     thin: !0,
    //     list: [
    //       {
    //         title: "AlphaNet",
    //         links: [["Launch", "https://alphanet.phoenix.global/"]],
    //       },
    //       {
    //         title: "Hypermatrix",
    //         links: [
    //           ["Learn More", "https://alphanet.phoenix.global/product?id=101"],
    //         ],
    //       },
    //       {
    //         title: "GenAI",
    //         links: [["Launch", "https://genai-doc.phoenix.global/"]],
    //       },
    //       {
    //         title: "PhoenixLLM",
    //         links: [["Launch", "https://t.me/PhoenixLLM_bot"]],
    //       },
    //     ],
    //   },
    //   {
    //     title: "DePIN",
    //     list: [
    //       {
    //         title: "PhoenixNode",
    //         links: [
    //           ["Launch", "https://pnode.phoenix.global/"],
    //           ["View Litepaper", "https://pnode-litepaper.phoenix.global/"],
    //         ],
    //       },
    //     ],
    //   },
    // ];
    // return (s, n) => (
    //   h(), Te(Ta, { class: "tech-menu", title: "Technology", list: t })
    // );
  },
};
const $d = {
    __name: "deve",
    setup(e) {
    //   const t = [
    //     {
    //       title: "",
    //       list: [
    //         {
    //           label: "SkyNet",
    //           title: "AI Compute Layer",
    //           links: [["View SDK", "https://computation-sdk.phoenix.global/"]],
    //         },
    //         {
    //           title: "Layer 1 Mainnet",
    //           links: [
    //             ["View SDK", "https://phoenixchain-sdk.phoenix.global"],
    //             ["View DOC", "https://mainnet-doc.phoenix.global/"],
    //           ],
    //         },
    //         {
    //           title: "PhoenixLLM",
    //           links: [
    //             [
    //               "View SDK",
    //               "https://computation-sdk.phoenix.global/reference/api-reference/phoenixllm",
    //             ],
    //           ],
    //         },
    //       ],
    //     },
    //   ];
    //   return (s, n) => (
    //     h(), Te(Ta, { class: "deve-menu", title: "Developers", list: t })
    //   );
    },
  },
  ef = {
    __name: "index",
    setup(e) {
      const t = Re(-1);
      function s(n) {
        t.value == n ? (t.value = -1) : (t.value = n);
      }
      return (n, o) => (
        h(),
        v(
          ue,
          null,
          [
            B(
              qd,
              {
                class: be({ selected: t.value == 0 }),
                onSelectMenu: o[0] || (o[0] = (i) => s(0)),
              },
              null,
              8,
              ["class"]
            ),
            B(
              $d,
              {
                class: be({ selected: t.value == 1 }),
                onSelectMenu: o[1] || (o[1] = (i) => s(1)),
              },
              null,
              8,
              ["class"]
            ),
          ],
          64
        )
      );
    },
  },
  tf = { class: "homeHeader" },
  sf = { class: "homeHeader-content is-limit is-limit__padding" },
  nf = A(
    "svg",
    { class: "homeHeader-logo", viewBox: "0 0 242 44" },
    [A("image", { href: Al, width: "100%", height: "100%" })],
    -1
  ),
  of = A(
    "a",
    {
      class: "navLink",
      target: "_blank",
      href: "",
    },
    "",
    -1
  ),
  af = ve({
    __name: "HomeHeader",
    setup(e) {
      const t = Re(!1),
        s = Re(!1);
      function n() {
        t.value = !t.value;
      }
      function o(c) {
        return document.querySelector(c).offsetTop;
      }
      function i() {
        n(), window.scrollTo({ top: o("#ecosystem"), behavior: "smooth" });
      }
      function a() {
        n(), window.scrollTo({ top: o("#partners"), behavior: "smooth" });
      }
      function r(c) {
        c.target.id !== "hamburger" && t.value && (t.value = !1);
      }
      return (c, d) => {
        const u = ct("SvgIcon"),
          m = tn("click-away");
        return (
          h(),
          v("header", tf, [
            A("div", sf, [
              nf,
              x(
                (h(),
                v(
                  "nav",
                  { class: be(["homeHeader-nav", { "is-active": t.value }]) },
                  [
                    A(
                      "span",
                      { class: "homeHeader-nav-home", onClick: n },
                      "Home"
                    ),
                    B(ef),
                    // A("a", { class: "navLink", onClick: i }, "Ecosystem"),
                    // A("a", { class: "navLink", onClick: a }, "Partners"),
                    of,
                    B(
                      da,
                      {
                        class: be(["homeHeader-btn", { "is-turn": s.value }]),
                        "enable-hover": !1,
                      },
                      {
                        default: it(() => [
                          B(u, {
                            icon: "btn-PHB-BSC-Contract",
                            svgStyle: { width: "82px" },
                          }),
                          B(u, { id: "arrow-down", icon: "arrow-down" }),
                          B(Od, {
                            target: ".homeHeader-btn",
                            onVisible: d[0] || (d[0] = (g) => (s.value = g)),
                          }),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"]
                    ),
                  ],
                  2
                )),
                [[m, r]]
              ),
              B(yl, { id: "hamburger", active: t.value, onClick: n }, null, 8, [
                "active",
              ]),
            ]),
          ])
        );
      };
    },
  });
const rf = {},
  cf = { class: "animatedMouse" };
function lf(e, t) {
  return h(), v("div", cf);
}
const df = ce(rf, [
  ["render", lf],
  ["__scopeId", "data-v-bbfcc9ac"],
]);
const ff = {},
  Pa = (e) => (Be("data-v-586ba597"), (e = e()), Se(), e),
  uf = Pa(() =>
    A(
      "div",
      { class: "title" },
      [
        Ge(" Decentralized AI"),
        A("br"),
        Ge(" Elastic Compute Infrastructure "),
      ],
      -1
    )
  ),
  Af = Pa(() =>
    A(
      "div",
      { class: "subtitle" },
      " Train, Deploy, and Scale Next-Generation AI-Enabled Apps ",
      -1
    )
  ),
  pf = [uf, Af];
function hf(e, t) {
  return h(), v("section", null, pf);
}
const gf = ce(ff, [
    ["render", hf],
    ["__scopeId", "data-v-586ba597"],
  ]),
  mf = "/assets/herovideo.480p.38fb2110.mp4",
  vf = "/assets/ff_herovideo.2.b28c7dfb.jpg",
  _f = { class: "heroImage" },
  yf = { class: "heroImage-wrapper is-padding" },
  bf = { class: "heroImage-content is-limit is-limit__padding" },
  wf = ["src"],
  Cf = ["src"],
  If = ve({
    __name: "HeroImage",
    setup(e) {
      const t = Re(!0);
      function s() {
        window.open("", "_blank");
      }
      function n(o) {
        t.value = !1;
      }
      return (o, i) => {
        const a = ct("SvgIcon");
        return (
          h(),
          v("div", _f, [
            A("div", yf, [
              A("div", bf, [
                B(gf),
                B(
                  da,
                  { class: "heroImage-btn font-tomkin_bold", onClick: s },
                  {
                    default: it(() => [
                      B(a, { id: "arrow-right", icon: "arrow-line-right" }),
                      B(a, { id: "stakeYourPHB", icon: "btn-StakeYourPHB" }),
                    ]),
                    _: 1,
                  }
                ),
                B(df, { class: "heroImage-mouse" }),
              ]),
            ]),
            t.value
              ? (h(),
                v(
                  "img",
                  { key: 0, src: T(vf), class: "heroImage-ff_video" },
                  null,
                  8,
                  wf
                ))
              : st("", !0),
            A(
              "video",
              {
                class: "heroImage-video",
                autoplay: "",
                loop: "",
                playsinline: "",
                muted: "",
                onLoadeddata: n,
              },
              [A("source", { src: T(mf), type: "video/mp4" }, null, 8, Cf)],
              32
            ),
          ])
        );
      };
    },
  });
const xf = ce(If, [["__scopeId", "data-v-f8224e0d"]]);
const Ef = {},
  Bf = { class: "sectionDivider" };
function Sf(e, t) {
  return h(), v("div", Bf);
}
const Xo = ce(Ef, [
    ["render", Sf],
    ["__scopeId", "data-v-4ea9eeab"],
  ]),
  Of = "/assets/head.2f2bd7af.png",
  Nf =
    "data:image/png;base64,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",
  kf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAA5xJREFUeF7t281q1FAUB/D/hUlGpfYFdN2NL6A7XbWKH4iIdEahWEQRBQVBcKEFF4LgQhGEUrVQmlJGhIKoBRFFhL6AbyC6FKrWzqR65U5bpTpfuefc5DY52Tb/m3N+PZnQ3I6CHCQBRUpLGAJIHAIBFECiADEuEyiARAFiXCZQAIkCxLhMoAASBYhxmUABJAoQ4zwTWG3sbtYxHS4Q62kdH26cxdYgwiP11cn6hEXpgAZPY75Zg8IgL6JWqMT3AFwA8B5xMISa+kbolz1KA/yL179W2SIb4l5dwo74MTRO/ula4x1KwX5Mqe/sEpYL2gP+j7deAh1xRG9BfWUWSh9u0ddb9AUHMK6WLHtmjdkBtsejI57W27EczwHY16HT14iDg6ipH6waFovZAQ7He6D0SwDrt26rS9tNYlX3Q8fmM3X1wdT+eIUwOIRJtWzRN1vEDtBc3gtEPY8v4RG8UHU2kYQL2QP6g/gccXgUNdVI2DvL6TRAfxCfIQ6PZYFIB/QGUc2hr3Qc4ypmGa0eF+EB9AfxKT6VTuCNWumxf/JpfIC+IGr1BJ9Lw2kh8gL6ggjMIg6qqKmf5BHrsgA/oD+IEQaCUxhTv1wiugH0B3EKA8GIS0R3gP4gTmIgGHWF6BbQH8SHiIIzgNLct7N7QH8QxxEF57gR0wH0B/EBovA85xSmB2iq7v4azJzl+i3OfUThRS7EdAH9QbyLKLzEgZg+oC+IGncwE16hImYD6A2ivo2Z8lUKYnaA/iDewkz5mi1itoC+IELfRFS+boOYPaCputKYADDauQE9j6g8lLjJSjwINPdvOh2LUCu7ML3tY9L1swes1McAdaNL4QtQwSCm1WKiBl3u26wVki3gJsczhtkB5gAvO8Cc4GUDmCO89AFzhpcuYA7x0gPMKV46gDnGcw+Yczy3gAXAcwdYEDw3gAXC4wd0iedyPyXRG4qNJ/P9LVxAPL4JLCgeD2CB8eiABcejAQpe82li9xCpNMz+hdnH6HTYvYavLu2ELn1w8h0UwtO2XdQOsPuXYezw1qvsPN12//rhAM9+Ak2yPSINrzOiV3g0wNaIPHitEb3DowNuRITV1mO3W2v1dr7M9jXabtdL+HO7z8B/L2JuZ3Mk3bfttVjzYLHY9O51ecp5PICUCjZ5VgCJv0ABFECiADEuEyiARAFiXCZQAIkCxLhMoAASBYhxmUABJAoQ4zKBAkgUIMZlAgWQKECM/wa/bGZvR/Dk2gAAAABJRU5ErkJggg==",
  Ys =
    "";
function Tf(e, t) {
  function s() {
    Math.abs(e.getBoundingClientRect().top) < window.innerHeight && (n(), t());
  }
  function n() {
    window.removeEventListener("scroll", s);
  }
  return window.addEventListener("scroll", s), s(), n;
}
function Pf(
  e,
  { delay: t = 0, duration: s = 500, from: n = "100%", easing: o = "ease" } = {}
) {
  (e.style.opacity = 0),
    Tf(e, function () {
      const i = e.animate(
        [
          { opacity: 0, transform: `translateY(${n})` },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: s, easing: o, delay: t }
      );
      i.onfinish = function () {
        e.style.opacity = "";
      };
    });
}
const K = {
  mounted(e, { value: t }) {
    Pf(e, { from: "100px", duration: 1e3, delay: t });
  },
};
const La = (e) => (Be("data-v-ae77c672"), (e = e()), Se(), e),
  Lf = { class: "row1" },
  jf = { class: "head" },
  Df = La(() =>
    A(
      "div",
      { class: "head-wrapper" },
      [
        A("img", { src: Of }),
        A("div", { class: "title" }, [
          A("img", { src: Nf, style: { height: "20px" } }),
          A("br"),
          Ge("AI Compute Layer "),
        ]),
      ],
      -1
    )
  ),
  Ff = [Df],
  Rf = { class: "lksdfa" },
  Mf = { class: "overview" },
  Yf = Ge(
    " Our SkyNet AI Elastic Compute Layer is decentralized infrastructure for the full AI compute lifecycle, from training, inference, to scaling and one-click deployment of AI models and applications including deep neural networks, large language models (LLM), generative AI, predictive analytics, and edge computing. Our AI Elastic Compute Layer is integrated with both open source and proprietary AI frameworks. "
  ),
  Hf = [Yf],
  Qf = { class: "switch-btns" },
  Uf = ["onClick"],
  Jf = La(() => A("img", { class: "arrow", src: kf }, null, -1)),
  zf = { class: "switch-panel" },
  Kf = { key: 0, class: "switch-panel-wrapper" },
  Zf = q(
    '<div class="links" data-v-ae77c672><a href="https://skynet.phoenix.global/" target="_blank" data-v-ae77c672><span data-v-ae77c672></span><img class="link" src="' +
      Ys +
      '" data-v-ae77c672></a><a href="https://computation-sdk.phoenix.global/" target="_blank" data-v-ae77c672><span data-v-ae77c672></span><img class="link" src="' +
      Ys +
      '" data-v-ae77c672></a></div>',
    1
  ),
  Wf = {
    __name: "index",
    setup(e) {
      const t = Zs([
          {
            btn: "AI On-Demand",
            txt: "Coordinate the deployment of ready-to-use AI and machine learning models with a click of a button. Scale computational capacity through our AI Node Network. SkyNet Control Panel enables codeless deployment and training of AI models, with support for IPFS data upload.",
          },
          {
            btn: "AI Infrastructure Scaling",
            txt: "Effortlessly scale AI compute resources via our AI Node Network for AI models such as deep learning, deep reinforcement learning, and large language models (LLM) - our AI Node Network helps users perform smart auto-resource allocation. SkyNet\u2019s task-based AI compute model dismisses the need to rent dedicated GPUs.",
          },
          {
            btn: "Generative AI",
            txt: "Fine-tune, customize, and utilize generative AI models with no code required, whether it\u2019s generating images or short videos, to customizing vertical LLMs for teams and enterprise. Skynet provides the leading decentralized PaaS (Platform-as-a-Service) for generative AI applications.",
          },
        ]),
        s = Re(0),
        n = Re(!0);
      async function o(i) {
        (s.value = i), (n.value = !1), await ms(), (n.value = !0);
      }
      return (i, a) => (
        h(),
        v("div", Lf, [
          x((h(), v("div", jf, Ff)), [[T(K), 200]]),
          A("div", Rf, [
            x((h(), v("div", Mf, Hf)), [[T(K)]]),
            x(
              (h(),
              v("div", Qf, [
                (h(!0),
                v(
                  ue,
                  null,
                  bt(
                    t,
                    (r, c) => (
                      h(),
                      v(
                        "button",
                        {
                          class: be({ selected: s.value == c }),
                          onClick: (d) => o(c),
                        },
                        [Ge(Ie(r.btn) + " ", 1), Jf],
                        10,
                        Uf
                      )
                    )
                  ),
                  256
                )),
              ])),
              [[T(K), 200]]
            ),
            x(
              (h(),
              v("div", zf, [
                n.value
                  ? (h(),
                    v("div", Kf, [A("div", null, Ie(t[s.value].txt), 1), Zf]))
                  : st("", !0),
              ])),
              [[T(K), 400]]
            ),
          ]),
        ])
      );
    },
  },
  Vf = ce(Wf, [["__scopeId", "data-v-ae77c672"]]),
  Gf =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAA/5JREFUeF7t291qE0EUB/D/aGYjUvoE3vYd6hOIFUUsLdZKEQQVRFAQBC+0vRIELwqCEKgUajdoRFBELYgoIvgCvoHYS8GP1narI5t0aYPJZnbOmQ9hepuc3Zlf/pMzu5sKxD+SgCBVx2JEQGIIImAEJAoQy2MCIyBRgFgeExgBiQLE8pjACEgUIJbHBEZAogCxnD+B02oYKptAmiwQx2avfCo7iD1KYTn5SD0JL2AHbwXAKKDmkNZnqQNkr8/xhHrVPq7AISoiH2AXXjHtwBB38Ia3R/iNisgD2BMvMMR/8YoBkhDpgKV4gSD2xyMjOgLMx+lpOQ/GywdnnEI6YH56rRR6QLSM1+lDXH+hITrA4wUMKYmO8PgBQ0B0iGcH0CeiYzx7gD4QPeDZBXSJ6AnPPqALRI94bgBtIk5vjkIhv3lRXNv22pQZb5J1dnh8+8BBZ+PeJwaA5y6BBS4XYiB47gE5lnNAeH4AKYiB4fkDNEEMEM8vYCVE5M9XJnx223490l0X7jcC7cZS2uatblXKzuwfsFoSne/zBu3O7ABOrx3A8v7Pg07e9bpZEs2Sl5+rDoX74nulMfZ4Mz/gqY1ZQFwxetpVDdEcr/PodR2JHMOi+EVB5AXs4N3cHhB1gqMlE+M5thLPsFobx1uxZYrIB9iNV4yHZ6Lds+M9psADLMsZQCgTRB7A3ng2EHnxdsTuIk0u+QHMG4aqfbKyR+v+TrSFV7idR5o0qiLyJNDmVUIbcfMRhJit/DsW/ab0AfvkYZOuzAPY3sv5vzdntC1SeI8tOYaW+FE1ffyXcqEg6ifvHfbKI1gSP03w+AFDSKI+3hsMyaNoiDVTPDuAPhH18V4jk8fQEusUPHuAPhC18dQKkuQ49QqkgOdrIr0+Slffifp4L/A1OYGXYoOaPDeALpKoj/ccWTKOltjkwrO7hHeP0lYStfHEU2S1SW48d4A2kqiP9wRDtZNoiIwzee6WsI0k6uIp8RirtSnK3ZZB6HabiI3GoosHPMQXedomntslzJFEfbwUmZxBS/welCDq6+4TWIy4amPRx1vCiDyDOfGHiqNT7w+wSmOBmARU/l9PZXep8yMuYkSedYXnbwlXX846YVjAiDznEi8MQP0kliE2kMoLprfldT6dfu/xu4R5kngPqbzoAy+cBFZrLLvZjZ9lUFK3uzacBFZHnEeaXOaCMD1OeIA634kKd9BMrppOmrMuTMAyRKVuo1m/xolAOVa4gL0QlbqFZv06ZcLctWEDdiGqeaT1G9wA1OOFD9hGNPi1F1VGs/7/ANScjI+3RUCiegSMgEQBYnlMYAQkChDLYwIjIFGAWB4TGAGJAsTymMAISBQglscEEgH/Amz1jm8Al6llAAAAAElFTkSuQmCC",
  Xf = "",
  qf = "/assets/brain.21213e25.png",
  $f = "/assets/llm_logo.6a5ab203.png",
  eu =
    "data:image/png;base64,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";
const It = (e) => (Be("data-v-de8c539c"), (e = e()), Se(), e),
  tu = { class: "row2_container" },
  su = It(() => A("img", { class: "arrow_down", src: Gf }, null, -1)),
  nu = It(() => A("div", { class: "new_row2" }, [A("img", { src: Xf })], -1)),
  ou = { class: "container" },
  iu = It(() =>
    A(
      "div",
      { class: "title" },
      [A("img", { src: qf }), A("span", null, "AI On-Demand")],
      -1
    )
  ),
  au = { class: "items" },
  ru = { class: "item1" },
  cu = It(() => A("div", { class: "llm_title" }, [A("img", { src: $f })], -1)),
  lu = It(() =>
    A(
      "p",
      null,
      " Phoenix's proprietary Large Language Model (LLM) Service. ",
      -1
    )
  ),
  du = [cu, lu],
  fu = { class: "item2" },
  uu = q(
    '<div class="dp_title" data-v-de8c539c>Deep Learning</div><div class="models" data-v-de8c539c><div class="model" data-v-de8c539c><label data-v-de8c539c>CNN</label><span data-v-de8c539c>Convolutional Neural Network</span></div><div class="model" data-v-de8c539c><label data-v-de8c539c>LSTM</label><span data-v-de8c539c>Long Short-Term Memory</span></div><div class="model" data-v-de8c539c><label data-v-de8c539c>DRL</label><span data-v-de8c539c>Deep Reinforcement Learning</span></div><div class="model" data-v-de8c539c><label data-v-de8c539c>RNN</label><span data-v-de8c539c>Recurrent Neural Network</span></div></div>',
    2
  ),
  Au = [uu],
  pu = { class: "item3" },
  hu = It(() => A("img", { src: eu }, null, -1)),
  gu = It(() => A("div", { class: "viper" }, "ViperAI", -1)),
  mu = It(() => A("div", { class: "wave" }, "WaveML", -1)),
  vu = [hu, gu, mu],
  _u = {
    __name: "index",
    setup(e) {
      return (t, s) =>
        x(
          (h(),
          v("div", tu, [
            su,
            nu,
            A("div", ou, [
              iu,
              A("div", au, [
                x((h(), v("div", ru, du)), [[T(K), 200]]),
                x((h(), v("div", fu, Au)), [[T(K), 400]]),
                x((h(), v("div", pu, vu)), [[T(K), 600]]),
              ]),
            ]),
          ])),
          [[T(K), 0]]
        );
    },
  },
  yu = ce(_u, [["__scopeId", "data-v-de8c539c"]]),
  bu = "/assets/layer1.ec900159.png";
const ja = (e) => (Be("data-v-3d2a26a8"), (e = e()), Se(), e),
  wu = { class: "row2" },
  Cu = { class: "head" },
  Iu = ja(() =>
    A(
      "div",
      { class: "head-wrapper" },
      [
        A("img", { src: bu }),
        A("div", { class: "title" }, "Enterprise Layer 1"),
      ],
      -1
    )
  ),
  xu = [Iu],
  Eu = { class: "adfeodkj" },
  Bu = { class: "overview" },
  Su = Ge(
    " Our Layer 1 is an enterprise-grade, highly-scalable EVM compatible blockchain developed for scalable data-centric and computationally-intensive applications. "
  ),
  Ou = [Su],
  Nu = ja(() => A("div", { class: "filler" }, null, -1)),
  ku = { class: "links" },
  Tu = q(
    '<a href="https://scan.phoenix.global/" target="_blank" data-v-3d2a26a8><span data-v-3d2a26a8></span><img class="link" src="' +
      Ys +
      '" data-v-3d2a26a8></a><a href="https://phoenixchain-sdk.phoenix.global" target="_blank" data-v-3d2a26a8><span data-v-3d2a26a8></span><img class="link" src="' +
      Ys +
      '" data-v-3d2a26a8></a>',
    3
  ),
  Pu = [Tu],
  Lu = {
    __name: "index",
    setup(e) {
      return (t, s) => (
        h(),
        v("div", wu, [
          x((h(), v("div", Cu, xu)), [[T(K), 200]]),
          A("div", Eu, [
            x((h(), v("div", Bu, Ou)), [[T(K)]]),
            Nu,
            x((h(), v("div", ku, Pu)), [[T(K), 400]]),
          ]),
        ])
      );
    },
  },
  ju = ce(Lu, [["__scopeId", "data-v-3d2a26a8"]]);
const Du = (e) => (Be("data-v-d7d4c0cf"), (e = e()), Se(), e),
  Fu = { class: "block-container" },
  Ru = { class: "about-phx block" },
  Mu = Du(() => A("h2", null, "Skynet\u2019s Infrastructure", -1)),
  Yu = {
    __name: "index",
    setup(e) {
      return (t, s) => (
        h(), v("div", Fu, [A("div", Ru, [Mu, B(Vf), B(yu), B(ju)])])
      );
    },
  },
  Hu = ce(Yu, [["__scopeId", "data-v-d7d4c0cf"]]),
  Qu = { class: "applicationItem" },
  Uu = ["src"],
  Ju = { class: "applicationItem-title" },
  zu = { class: "applicationItem-desc" },
  Es = ve({
    __name: "ApplicationItem",
    props: { img: null, title: null, desc: null },
    setup(e) {
      return (t, s) => (
        h(),
        v("div", Qu, [
          A("img", { class: "applicationItem-img", src: e.img }, null, 8, Uu),
          A("h5", Ju, Ie(e.title), 1),
          A("div", zu, Ie(e.desc), 1),
        ])
      );
    },
  });
const Ku = "/assets/applications-CRM-LOYALTY.daceff97.webp",
  Zu = "/assets/applications-CONSUMER-DATA.e4aa65e7.webp",
  Wu = "/assets/applications-CUSTOMER-EXPERIENCE.8acc73d6.webp",
  Vu = "/assets/applications-ARTIFICIAL-INTELLIGENCE.a3105a70.webp",
  Gu = { class: "applications" },
  Xu = A("h2", { class: "applications-title" }, "Key Features", -1),
  qu = { class: "applications-items" },
  $u = ve({
    __name: "Applications",
    setup(e) {
      return (t, s) => {
        const n = tn("enter");
        return (
          h(),
          v("div", Gu, [
            Xu,
            A("div", qu, [
              x(
                B(
                  Es,
                  {
                    img: T(Ku),
                    title: "Decentralized Deep Learning",
                    desc: "Scale deep learning models via our AI Node Network.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n]]
              ),
              x(
                B(
                  Es,
                  {
                    img: T(Zu),
                    title: "GPU Resource Scaling",
                    desc: "Low-cost decentralized network of GPU resources for AI applications.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n, { delay: 300 }]]
              ),
              x(
                B(
                  Es,
                  {
                    img: T(Wu),
                    title: "Codeless AI Deployment",
                    desc: "Deploy predictive AI models with little to no code.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n, { delay: 450 }]]
              ),
              x(
                B(
                  Es,
                  {
                    img: T(Vu),
                    title: "AIGC-Enabled Apps\xA0\xA0\xA0\xA0",
                    desc: "Use and build apps using AI generated content models.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n, { delay: 600 }]]
              ),
            ]),
          ])
        );
      };
    },
  });
const eA = "/assets/alphanet.356fb168.png",
  tA = "/assets/alphanet_logo.c94818ad.png",
  ae =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQ5JREFUSEvtlD1OAzEQRt9A6OjoaOAqcAYKJA6QALkAVdJxAP7OgcRRCCmhQyRHQOKLJvJKq0hrZh03SKy03fg9zze2jcAnaQTcAYNAeVPyDlxYZIGkM+AW2IvUAwfAPvAZEgSh6zJJ3ukY+AF2qgpa8CXwDRxWE0i6B64Bh58CL8BRFcEm3MxeJX1UEUh6AK6anTs8zWJ7QRd8a4Ekj9Yz950vPHMzm7VPW3FECe6xXHbBizuIwosEfeC9BQn+CPib5JmfmNlb7oaHZ1ACD3ewAf9KpyW786YrSc/AcedNTvAnYAj0gqcOnL2bE0yAaYJ75vM+r2pTmxPcAOf+l8JdUuWxy3X2L/h17n8/ohVv3ZLRj5tjYwAAAABJRU5ErkJggg==",
  sA = "/assets/nybl.cd65a7e0.png",
  nA = "/assets/nybl_logo.2657ed87.png",
  oA = "/assets/horizon.a53c8181.png",
  iA = "/assets/horizon_logo.24e773de.png",
  aA = "/assets/llm.ccdc9b17.png",
  rA = "/assets/llm_logo.ca6639e4.png",
  cA = "/assets/genai.9186bbc1.png",
  lA = "/assets/genai_logo.dd74d9d1.png",
  dA = "/assets/hypermatrix.8ad11d29.png",
  fA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAAA0CAMAAAAkCqTQAAAAAXNSR0IArs4c6QAAAvFQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////rkHhmgAAAPp0Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0FCQ0RFRkdISUpLTE1OT1BR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",
  uA = "/assets/bella.f030dca0.png",
  AA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAABACAYAAABrwvk3AAAAAXNSR0IArs4c6QAADlpJREFUeNrtXQmQFNUZbhCR3ZnZdXEjEAUFLxTxLqWQKOWVaHkmZUVFNBqVREtERY1WgkatxCNlGYMKlgmH7O7MALtz7EIUETVBdneGawEVDaIoGs2iy4K70zPLdv6/5x8Zl+43fbye7pH3V321R/Xx+r339X+8/38tSfnSPG+CtDoUkhJ1O6VkSJESQScgS4nQp3D95fD7U4CLpWR4hCRESMnKh88dJLXAZF4d6pLWLHSKOHuB5FwNwHshkqHPpNa6qJQM3iIla6vFgAgpHQmHD5Bag3+R2hZnJ7XT5NECkqitHu4fRjJ9JDXXPii9/cowMThCvC+r6ibCpJVdI88+ZApnyZQMfgCm5K+l5OwDxSAJ8a4kgk3qpPUCefKxbmFOIy2UmhccLgZKiFcJtNtz5Mn3lVRtFFotNdecLgZLiPck6VHy5GP9YiTRNqm15hwxYEK8poGUksC6RfCzbrvUHBwnBk2IIJB1TdQmran7sRg4IYJAVqD6RLUL1PC7ECGCQBYCC2sX9Uirg5PE4AkRBLKCtYtwnWiT9E54sFvdpihKP8AlgKsBo8VE0uyjwwF3AabmAf+eAqjWOedUnXMmY58LAvEMKrSGprtMoKVKVr4E/A1wqKDN9/roPEVbUoBTdM55QOecjwEHCALxDCgkgmsgEbXSRQJF+gzy2wAR4NjbRxN1yPAN4CSdc+7VOed9QSD+2Qp7pMSCiz1EIJQQQKQfCQKVjBaa5TECpQETBH0EgUogmAD5cq0QTNgYHughAqE8IugjCOR9rFaTYHdIq4LHe4xAcwR9BIFKY00oEcqoVa3eItBcQR9BIPPaAEPLxcLahXvv2VJ7oyCQIFDpEkjNUYOyiNbgKkj4nA94kT8gWNAanAO/R+FnK/y9BfCttGUp3LtmaikQCP4/BCcO4ELAtYBJgCsAZwFGAQYWsf2DAEcBxgGupLb8EnABYCyPNS2vEQjOLwccDRgPuApwPT0zrledCDik+ATCrIBEKAZ7Gowv6gxurh0C9z0bUnqmHfjGm7dV1ihVXiQQ/F4BuA4QpkmQ1jnnv4DlGIAAHOdgu8cAHge8RQvAWiIDNgHqANcA/KVKIBonzG54EvBvQLvO9bsB6wHz6YVS5jyB1qvkeQVSasrcVKL+aPrZiqb0J4FY5qHKJamjPECgl+ltdytNxF7FnHRQZsNoju0dS+3aZbIt2PYNgJsAB5USgeD40wA1gC6Tz9wDSJB2GuAMgdT6nOBGVRO4LIGoPLfidUUJ/BMQy2z3x+QZlY3OaqQCBFoJeF2xL18A7rCzMItmIWAa4H8c2gM9rJzsdQKh9gA8BPiawzMvAhzDl0AY/cJ9FFpq73fdh3t4xYBALNUUgKw0IJISaNyjBJaAzRGV1/kiqZ+6RCDeMhdNQQttHAyo5dyWz9Fv8yqB4JihgCjnZ96KfhJfArXWdUvJ+We5zZ/Kmo4qfyS9IdDYmyVQDkCiQDyz2xdN3SM9rPQvcQIp5I/4TZLHqfahiXmt1whEQZo3HHrmrwDn8iNQItQptYRHum6+1aeODcTS3YDvEwgR70GN1OuLdD8hzeabn2aDQGhWvEsD/SogCfjUoJ+EflF/A20bYFDz7AFsI3sf27IC8B5N8EKys1DKUjEJRD5n3EC7M4BPAK30zBhM2UzPU0i27WvCljqBot0376N98hHLZE26SGqmFOa3jmCBQJuotuWkvo4phowBl1OkrreAQ3+bgbZNM+AkY7Tp0r7havS3cJIA7qNJyxIMLgz1CIEeKdBWLKF4CfAz1M4afuIZgN9T2QRL0L+t+sEQyB+RGwJNij6BciQCkvmi8oMuEAjD1jONrKuQ5riKbG49wbfnkYxrHEt+ip58SGTtZ6A9wwAvEOH05Am3CURh6h2MNmJ4+gKD43oEvVxYcv8PgkCBqHIcmG5fqqYai0CqOQckiqVTZVH550UkEJoLd1i49gmANsZ1n2Sc+yzjPDRbjrbQnrsYJEIyjHGLQDQO8xjP/LrZGi16kf2BYQ3gC2p4yRMItM8f1dB1IfLk0KRqoa1li7sOLxKBHrK5bvOZznXx/8N03p47GJGkUTba8yjjOZ91kUBobn7LMDGH2XjmmYxnfrikCTQo1jUC/JrPDWmfPtE5OO+vRSAQBgnKbd5jCjn6Wr7QdRrHT2UECybbbEslaTAt2aiVBlMkAj3GMJ0vs/nMQxh+4DvZqGiJEghIMEsNVZshTy4yF0t/7WuSxzpIINuDR/fANKC1Ovd4Md+PofY06BzbbDaLQKc915NZqhWUOKvYBMJnovQnLVlWOIvA0DPfy0j9GVOSBPJFMxdCeHq3GhwwSyAEmH2+iPy0gwT6wMrCp859/sTwZwJ5xx3C8JvQlHmGwuBW8Rwt6Mo695jiAoFG6ETNUOPeyan/RzAyGm4oOQKh/+KPpd9Df8YSeSigAJkKX/jCu4c6RKAgx2jfBTr3QF9nSJ/oW7vinjzjAoFO0SF0p96uPxb6vz+tFWnJ7JIiEGYdAAGWWjLdtKJy8fRNDhHoMY4EGqkTAcO37Mg+znTaRQItcIFA43WOxSzzSo5j8Hed+7RLlr6F6gKBqsJKJWiNEBfyIJaq+XK1NglUzzv6prMWk9EJJByTd9xpFrK+eUrIBQKdw0jCHchxDF7Qe2gJitO6vU6gsnjXYeDvxLMLpmk+BGpCAqXWV4R3DrbRsfPNhHUt3uNEnUicvHct4rvjulwk0BwXCHSmnmZQOO7PhyY5g0B1y01/oa6IBIJw9QQoT9iQ1TycyJOLxkVS38C1x9jo2D/rhbA5Dt71OvdA57k677gjKadOS3bTpHISd7pAoBN0ctgwbeciTv0/kHIX9QhUexnsLdBjypQrAoEqGzuqfDH5ASBNR8FUHSvA5NPGHsW/uPscG507mWGDj+I0gK8wanMG5R3no7UJLZlHNTJOor8LBPoRrUFpydOc+v9sIqQOgfAzIYm6l6UNDYphEjlIoEB95yG+WPpX4J+sV4ljdqHUBCpgCpY3yFfa6NxTKbVfS37HYfBGK9lSby2ZoXH8LIZPUPSIaREIhH5oSOf4/7ASXU34uXNZdmv2yOTsSiDGbPhSd49KpHWL2TviZHcE7ZZanx/OpafDn5aVR9Ongjn1OISo16tFcWqYOu0YeXKBhIqoPMlGB+NC3r8YWmiMzcFbwFjE+4nGOZcwctZe/qERiI6/0UrOoMH2n0/mbwEC5aQldCVs0lEH5EgANoCWadNEUv3ZOui1zedDbtlJphBPn1wWS48rj/dcUh5J3wKEeQ6c+XUwoVOqxnHCXGMRKCJfZ7OTb2f079uKpZ1e1OtO1wke5DILBmqcgzvtrGEktt5qsS0BwOkaOENhlDsXiUBYOPiRzjmYI3e1jQXUTYUiJ9pn4xcPkrXVLAxavvIImPhtgVhPO2gK44ikd8Dk3aVOYChnQjNK1TixdPGIk2/CRVOX2yQQZgCsY/TxMoVZU7/P9QZQLY7MyGu7hnH+DQziYZTubsXE5hxkRr5GpmoHTf4c0IGPMsoMilXOcHeBwr+bLZjmCSOhR8sTZ8h8xQd+yrbv/BRTyLhCmH2DCJneQH3XBA6myi901mryI2a3oKNfYMV7nFK4nn+JwthyiYIJhTY0WUQLr/0Y18Hk0TuoCpNVrnGVmxqIzjm4wITPFRCONvAynE4+o+IogaqjSiAQkT920sl3FHHQehG53d8oH8+BQIVqUnLSRmUBV9AqOq5jXIRVpoAYIy0/vw5lrIH2nKYU3pGmkxaCb6V0oTMp4oR7oj1OZc6F5HkHfKDpFitScXPEQlt2YZ/g3hI3kX+DzzyBXoBPM0xBQSCdsoY1Vcv4pHzgmgwjZ0rPPu9kmFtaazmXm2jPZBMLq3uoLWYWYpcXSpchQvaaJNAUKwSic6cWqJ7tqz07KSBjWfZfAuE2WJH0PM5Rp8MY6fV2pJPl9xQg0S4H2oOftjzMwP2P0DEBWQSaoLPuYnRbqzsZ/iN32X8JBKUQvmg39y99kyaq4ThGW+zUFpG5uJVTW3opsXKwCdN2lkkC+XU0uZmNFTF7YzunZ+5hmdb7J4GgzWoAJN5Z7dD6B6Z//MaKTd3HxPsHvsU5tGckOdF2zJUPSKOZ3V53ONUjGSJQnhZqt0qgvDSfxTYz1DeQf1QnCNSnoM4fzTwmOSxKdpfMexT9qlI9Rxf3sB7vQHvOJVJ2mNA4uG8dbipyqI37HkNrYvkvh5MNBCA299HEZsnbj4I0tSZMWXzmlfQCrMpry05BoNzWv7H0V4FFnaOlIgmFhM+j5NNGQAvlcL1LC58ryDS6kYfGMaiRMKw+h+69ltqykRZp4xQtxHIBXpW1FRQWX0YT9DgD56BP+QiZdI2Kxc+b4HlE4ttJE79Fa3fvkpZZRbVdMyg66te4BkYn31SyG09uJo34/v5HIMzqxp1KXRQlu4smJkIO4Vn4ZaM9B1NbqhXDn/Wwdb8qxcSG+USAKsXAXnYGr9efrpd75kEmFrmHUo2Wiv2LQJBfB77PZn+9/Y9HCRFiS0qOQNDOCthsvryh52IxekIEgUyGrLGdvlhqmhg5IYJAZsmDpRHqNlZ8bGghQjgRKLXV0wTKft6kB7YAnsHzywxChNiXJcpBUJ6w0tb+bE6n6kQzHf6G1G/FYAnxpEBE69GKVxWPrfP0qkV5vki6xd/QPVGMkhDPSkU0dTRUlH5S1CpS3dqeXkoQlT+GzzreJ0X3bnsrRIhnpbw+dSk46u3qZ0bimSISZk+WMEvUL3PL8Kn7tb6G1LTBka7hYlSElJQEol1nw34HcZjInerExs1AYk4g+6U5df+EmLzFH88sw+ga/JworTC2mixEiDcF0iP89fLxsE/CS4AvwT/azhlfgJZZ5ovLk3AzxPIo7Dw5O3mg6Hghbsr/AcFH0DkOrPOUAAAAAElFTkSuQmCC",
  pA = "/assets/neo.e3fe69aa.png",
  hA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAABECAYAAAAhtL9RAAAAAXNSR0IArs4c6QAADQNJREFUeNrtnQt0FNUZxy8QCG8qVlDeoBbKo+gBoYgiaKsHpUrRlsJBqKKHh5VaOYqlKLFFUdpCstkkO5sXokEbyVuBShUrxYogFcEH4SXJ7uZBAoI85Dn9f7M3yWa9s7uzO5vdDfc7538WksydO3N/+813v/sYxiJlBxO7swplFnPZtzBn2tPscOoAJk1aVFt1SkdWnjaeuRQbq7DvZZXpqqbqDBU/q4RymcP+a7bPcpW8WdKiw9TcVsxhG84cyjIAupM5bSqryVJZFaB1Kg0ikOnn9OlUDuPvMlil7Resck0HeROlNb25rH0B4iOsUvknPk+xmkx42szG0OqJIK7NVuGlL+D/XyDM+Atz2m9mO5TW8sZKC59V4NHvsk1BbPs6PGiVBu0RyGUPDFxv0XHkqY9m079P42c7UO4ihBk3yJstzRyjR3yZdRzgsiJEKNWAawgFzFOF3R0rE8wVynGA/C6rUuawMuVa2QjSDMa1m+NYWdpQVm57HmBtQ4zrhtbdGTMXXCHM6W7PTud0KTX4WQE89IPsYHp32TjSfMe1LmUBvOsmQHNag0gLEZoAWl8w13n8CsWJlFwOc6T+CvXqJBtMGmPHsn8AQCfD064BMEfqQ4Rg49pwiiDWQgz7RWQ99uFnKxCTj0NaLl425OVk5SvbaQ1faV8JEPZr8WdtltvbuZToA1fU+auD2aV8h3j5U9T9WVZmG8lUCXPztFzkaymurbQvQYNvBwgXtVQWedxo9LZGvDJ9+c7kkGc+gXg9ke1P6yYbvLmYI70Xcqzz0dib3PnarNBSX9Gi+qeGdh3liI8pS3InO6p0kY3enMyp7IrquNZo6HCED5i4bMcBbxGeJg+xiqzGQ9ObE+JkwzcfgPfFNLhU92qeUnMo5+BlMTlIeep7+eF865Usb9UDrCgllxVaZsqGbzYA20pjDmDqSFalN4QILmU3QoSX3Z20hDYNnja7LStIHs8Kky2sIOkAK05R2QYcW5j0mGx4CXBk4tq6AROnvZy50tNZeepEVmvp3Oia1q0cwvItz8HTbmcFlkvs7TRVg7cwWWVFVnwmzpcNLwFuOm9bN2DiVE6groUYAZzBDqVc3eg6ipJ7aGAWWDZCp9hbqaomgrbA0iAJsAS4SVTNO5ZO5QI870dIfy1BZ2xwY2gx2pZnuQee1g6PW6V5WfK23tBKgCXATaK6bEiVNtF9D4aFkwDuGKYilq2zhISWrMQ6hhUnLweQ+wDrRbYeczGKfEAbZoBVVe0A3QYtgGxQIfQutBF6HXoBmgpdH+7mxDm6Q3dCf4BSoXzoHWgTVACl8XpOgDo3BWI4TxvoJmgW9BK0FloPvcc/6R69DD0EjYbaxg7AjSbm2B3Qa8yRNomVZ3RtVM+S5EGs2PIEIPwQsJ7RoC22+va2IQCMmxjvr4Hx+27QM9Bn0HnVv1VyoG4PAyRjIDt0UA3MLkBfQi9C/cMEbi9oEfQJdDLAep2C/gcthvpEL8AUIrgnrX+DnO1GxLWz2aG0fo3qthbr5gqSZyCDUAxoj2rhQUmqcWiDA7g/9AG0DBok+P1k6Cs1ODsHpdMXwARIruZe/4wavDmg30OtTQK3NS/vazU0K4MeJ2cSXQC7lPPQdi1fW64Ma+xplfYIDyay/KTVALVMi2upM0bgBQttcAAPgI7zG3kCyqNHM//dPOi0GrrtgAaGAAo9lveo5tkb0BUmfKHyVHOtGOoRHQC7Q4V8bcJQow6Z5UYAtgQdsl0A94Lmbc2CNniAjwhu5CT+mBPZWagU2gr9G/oU+sZP42yjRg8ClGEBeDj64u2GtvCnyS7omJ9jKH7vEiS83Xhc6y9E+IzH5G/x+HxXACHGFvF9amqAa7VJ6Gu0c+fmtkH2YCbCg/dZofWEO65NCS1ECC/Ae6FDgptLMd5C6MdQV6hdXQxNcRw0G9ruo3FWQ60MgHINjxP1Ytu3od9AfQlG6hR51Kc3NJ2Do2fZRurj0Wco8FHmdh4OXMfrEQe14J+d+f2eD/3XRxl0Xe2jAeBX3cO7mBVGYQKNjhWFEVrzABZ5uCegTgGURyAlQZd0YuJbAgSlJZSlUx/yyPcTGAHGqY9CRwXlUB2nGwR4oQ+P+zTUMcBy2kNP+vDIz0YXwAWWUs3rNgW85gJcA0002MgtOcRCLxxgGeN5qOJtn0NDg3js/1wnrKDYumuAZdCTp1YH3geCDEd+yR2Et1Fdb5AAhwYwecxpQTYMhRj7BWWWBpKV4Gk4byMvOjKEjtc8neucFeDxNp3jF4TYIZyj88Ra3fCUkQAHA/CbITbM8zodwJEBeDrRIz8hxPrE806St73jLxzB73tCLp14tY0J6bgNOk+/XhLg4ACm9NmYEBvmNp0wYLKf4+YKjinXTzEZqtNUQdnVdB/8HDdN58toymANyrmDP/G87WEJcHAAk6eKC7FRevPBA2971M9xuYJjskwcgvYexbsI3evnuNU6+e04k+pFWYoPBefIkQAHB/ByExolnne6vO13fuYTiEb+7jdx6FeUBnvSz3WI0oPLTB6S/pPOl6RjZAHOU67BUPGBGAN4qkmNstMgwJTTrRKEMwNNBGWpoE6rfPw95bgPC465z2SAJ/GngadVuOdwRBLg3LSegOpQjAE81qRG+cQgwCMEaaWTfCYXzavICFEK9B/RoIaPOg33GG73TJ3dZDLANwrOQ3HxTyTAxgEeHiGAJ+h0/MJtOT7qdDMf+fOecfcjkwHuwz2ut02QABsDmHKSwyIE8F0CWJrCMv1kU0RZkX5hmONcJjjXXAmwBNif/V0CLAEOVwhxjg8iUErOGQZRp3GejzqNFXyp6FF/XRhCCNFgye0S4NgBeCT0rdffUwZgCHRlmHSVr8nkNCdBp2M50mSAhwumpZ5z90ckwLECcB/eQfJOow1iETKe2hM92u81+Tz3COZEVMo0WmwBTCNSXwiOmRZBgNvyAQVv+7PJ5/mj4Bw73dNYJcAxATA/JkdwzFoWQcP5X9GZvG7WUHIrnYlGb0R+KFkCbBTg2TornQdEEOCZgjqdMXHA51boO8E55kiAYw/ga/kMMW9LNKlOo41OiuexuahOtLCzZYj1acnXIYomtfeVAMcewC10Zn+Rx7s7xPp04otQaa7tSvqyBHhcCz6ULVqWNDfEOj0smANB9mp0TGiXABsC2CN19a3gWMq/3hGCp0sWlLc0kMWd5LV1Vl8f9zfH2UeZE3WWOlHabkTDX0qAYwpgfuyLOqNmx/gi07YG6tFPp3NIZjVQzjM6ZRzndYoPsBxahfGYj+X/CY2PiCTAr1l6AarDEmDDAHfh+yr42kOBOnyDvXfb4Y98Gpr9GbSCD/2K7GMayDBwPR34XnB6RnvFzdDbLopP8p/mZ7n/v76/3VfkJ7R/xTYqoW8ZdRkBzI/vxSHzZUf5YtEPOFzv89XGLj97ue2jEb4grqmnzuoJT6vie1qU8KmgxTynW+nnuI8bOm7RAjDtNFmMzagLLYsB1zYAfCbsm5s0E4A9gFlv8uSdj4JZnu9Rpx5Qkcl1ooWdvcVnjCTAnkYvXslbNRY7Tr4AoL/UtpfStk21RhLgGsHNNAvgnaEC7PHoXqyTyjJip3hH7ocmXBvtTLRIZw6vEavi5XTQP1u0AOxptMFfYfJd2JUyETqseWOz9koztjuli08aOeuhoSYBvM2rbPr3/BDKu552reHDzecDBOQih4z2ER4VhkGO/nw92x4DdTrPr+G5wFJ50Qiwp9HbhQqTpmMPtTexfq6KlYS4W6Wx/YFpKcsovgtkndqZ1LhDvMoepZqz3Srlc2/hWYEsHmtu5psNbub7Nazhe1PcbcY5A6hTRz718imaIM/jXs86lfC6krcdF8hWXbEDsKcVpvQGzI8A5g3wysfq9ws2sq/aZfiKAb6iOZ5/toi2OoVWUiwB7GnrrEOwJetChBhbAfDJgDt/8h0ZzcxiFeA6o0zGusTRCC+WAtDdAPhs/esHJMCXgTlsB2IaYE/LxstgiqzjWH7iCm3DlCJB508C3Nw8sLLV/XagTPdbgmIZYE/LWX4FQowprCBxLcB1ujt/de/YkAA3H/sau+OU26YglPiH9pagurfVV6bHNsCelocha9oJviC5BKFFDQBeIBu+OVoF3hLksP8WoG3A24NqNdgIZjNDjEgA3CiT8bfBLPev/WVjN3uYbYPhlR8HdFsA3GkNPHo1livGAZZ2mRkN8TpSfwr4VmhvhXcql9xv08yQAEuLMTuCdxNXpI0HgKlQacOrYTMkwNJizCoxFdJpu0+D0aWUaVmMmgA6fxJgaVFnLqUPOn8PMqe9BB2+2vpMhqjzJwGWFtXmzBwIkOcD3ve0zh/BXJ0pAZYWY6ZujmOu9BHMmbYcKbkd9Z2/E69IgKXFmH2e0pGVpd8KiJPxhvq9GsAqayFvjLTYs4OJ3VmZbRxTE9rImyEtVPs/5j7wNJP2zo4AAAAASUVORK5CYII=",
  gA = "/assets/flamingo.1f6724fb.png",
  mA = "/assets/logo-flamingo.72237f81.png",
  vA = "/assets/logx.ebf71264.png",
  _A =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAAAsCAMAAAAEhEfMAAAAAXNSR0IArs4c6QAAAsFQTFRFAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////j/////////////////////+fn5////////////+f////n/////+fn5////////////+v/6////////////+v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////INWgSgAAAOp0Uk5TAAECAwQFBgcICQoLDA4PEBESExQVFhcYGRobHB0eHyAhIiMkJCUmJygpKSorLCwsLS0uLzAwMTIzMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6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",
  yA = "/assets/algebra.4d90a9e4.png",
  bA = "/assets/algebra-logo.ad0e6fb4.png",
  wA = "/assets/ink.607c5a41.png",
  CA = "/assets/ink-logo.59c4648f.png",
  IA = "/assets/horizon-dex.d8cb3688.png",
  xA = "/assets/horizon-dex-logo.57a5fed1.png",
  EA = "/assets/oxgen.head.21e970d4.png",
  BA = "/assets/oxgen.logo.b4d0cc9a.png",
  SA = "/assets/xade.dc3beeb2.png",
  OA =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAA8CAMAAAAKTDUQAAAAAXNSR0IArs4c6QAAAq9QTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////J9QBRAAAAOR0Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKiwtMTIzNDU2Nzg6Ozw9P0BBQkNERUZJSktMTU9QUVJUVVZXWFlaW11fYGFiY2RlZmhpamttbm9wcXJzdHd5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlpeYmZqbnJ6foKGio6Sm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",
  NA = "/assets/hippocrat.f574cb2c.png",
  kA = "/assets/logo_HIPPOCRAT.758e5e04.png",
  TA = "/assets/sypool.4ee4de90.png",
  PA = "/assets/logo-sypool.d0ea2131.png",
  LA = "/assets/game-swift.head.9f13fa51.png",
  jA = "/assets/game-swift.logo.8d5779e8.png",
  DA = "/assets/tripo.6b32fcd3.png",
  FA =
    "data:image/png;base64,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",
  RA = "/assets/meta2150s.f74d887a.png",
  MA = "/assets/logo_meta2150s.f2976c18.png",
  YA = "/assets/miracle-play.7f834595.png",
  HA = "/assets/miracle-play-logo.11c1dfc7.png",
  QA = "/assets/titled.961ef99a.png",
  UA = "/assets/titled_logo.10055f33.png",
  JA = "/assets/superb.2800830a.png",
  zA = "/assets/superb_logo.51ed173c.png",
  KA = "/assets/crust.70b21b05.png",
  ZA =
    "data:image/png;base64,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",
  WA = "/assets/arpa.75648e2b.png",
  VA = "/assets/arpa-logo.5e12c5d4.png",
  GA = "/assets/wowearn.3d148e50.png",
  XA = "/assets/wowearn-logo.183475ad.png",
  qA = "/assets/apro.58b9921e.png",
  $A = "/assets/apro-logo.aa49e9ae.png";
const ep = (e) => (Be("data-v-fd98f2e6"), (e = e()), Se(), e),
  tp = { class: "block-container", id: "ecosystem" },
  sp = { class: "block" },
  np = ep(() =>
    A(
      "div",
      { class: "section_title" },
      [
        A("h2", null, "Ecosystem"),
        A(
          "p",
          null,
          "Skynet\u2019s ecosystem includes a variety of Web 3 and AI-driven applications built on SkyNet Compute Layer and Layer 1 Blockchain"
        ),
      ],
      -1
    )
  ),
  op = { class: "items" },
  ip = { class: "item" },
  ap = q(
    '<img class="head" src="' +
      eA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      tA +
      '" data-v-fd98f2e6><p data-v-fd98f2e6>AlphaNet is the AI platform for the crypto market, and is a native dApp built on Phoenix Layer 1 and AI-scaling infrastructure.</p><a href="https://alphanet.phoenix.global/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  rp = [ap],
  cp = { class: "item" },
  lp = q(
    // '<img class="head" src="' +
    //   sA +
    //   '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
    //   nA +
    //   '" data-v-fd98f2e6><p data-v-fd98f2e6>NYBL is AIGC metaverse project powered by Phoenix and will use Phoenix Computation Layer\u2019s AI Node Network to scale its AI and GPU-based video and image processing.</p><a href="https://www.nybl.io/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
    //   ae +
    //   '" data-v-fd98f2e6></a></div>',
    // 2
  ),
  // dp = [lp],
  fp = { class: "item" },
  up = q(
    '<img class="head" src="' +
      oA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      iA +
      '" data-v-fd98f2e6><p data-v-fd98f2e6>Horizon Protocol and its decentralized futures exchange utilizes AlphaNet and Phoenix SkyNet to create the first truly AI-enabled DEX.</p><a href="https://horizonprotocol.com/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Ap = [up],
  pp = { class: "item" },
  hp = q(
    '<img class="head" src="' +
      aA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo llm" src="' +
      rA +
      '" data-v-fd98f2e6><p data-v-fd98f2e6>PhoenixLLM is a Large Language Model (LLM) built and run on Phoenix SkyNet, and is integrated with the Telegram ecosystem and Open Source frameworks.</p><a href="https://t.me/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Use PhoenixLLM</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  gp = [hp],
  mp = { class: "item" },
  vp = q(
    '<img class="head" src="' +
      cA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo genai" src="' +
      lA +
      '" data-v-fd98f2e6><p data-v-fd98f2e6>Phoenix GenAI is a Generative AI model service running on SkyNet, providing users powerful image, art, and video content creation capabilities via Telegram.</p><a href="https://genai-doc.phoenix.global/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Use GenAI</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  _p = [vp],
  yp = { class: "item" },
  bp = q(
    '<img class="head" src="' +
      dA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      fA +
      '" style="height:26px;" data-v-fd98f2e6><p data-v-fd98f2e6> Hypermatrix is a state-of-the-art, institutional-grade AI trading strategy customizer and creation infrastructure, and represents the next phase of AlphaNet\u2019s AI technology development, powered by SkyNet. </p><a href="https://alphanet.phoenix.global/product?id=101" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  wp = [bp],
  Cp = { class: "item" },
  Ip = q(
    '<img class="head" src="' +
      uA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      AA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Bella Protocol is a DeFi yield optimizer live on zkSync, Mantle, Uniswap V3. Bella is leveraging AlphaNet and Hypermatrix to create AI-enhanced DeFi and yield optimization for users. </p><a href="https://www.bella.fi/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  xp = [Ip],
  Ep = { class: "item" },
  Bp = q(
    '<img class="head" src="' +
      pA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      hA +
      '" style="height:32px;" data-v-fd98f2e6><p style="font-size:15px;" data-v-fd98f2e6> Phoenix serves as a one-stop AI infrastructure and computing platform for Neo and projects within the Neo X ecosystem. Neo ecosystem will leverage SkyNet, AlphaNet, GenAI, and Hypermatrix. </p><a href="https://medium.com/neo-smart-economy/neo-partners-with-phoenix-to-drive-ai-enhanced-blockchain-adoption-for-the-neo-ecosystem-26f3d873362d" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>View Release</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Sp = [Bp],
  Op = { class: "item" },
  Np = q(
    '<img class="head" src="' +
      gA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      mA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Flamingo is Neo ecosystem&#39;s premier DEX, and will be integrating AlphaNet and Hypermatrix into its platform to enable AI-enhanced trading for its users. </p><a href="https://flamingo.finance/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  kp = [Np],
  Tp = { class: "item" },
  Pp = q(
    '<img class="head" src="' +
      vA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo genai" src="' +
      _A +
      '" data-v-fd98f2e6><p data-v-fd98f2e6> LogX is an advanced orderbook perp DEX with AI trading agents &amp; intelligent risk management, gas-free trading creates for traders an unparalleled experience. </p><a href="https://www.logx.trade/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Lp = [Pp],
  jp = { class: "item" },
  Dp = q(
    '<img class="head" src="' +
      yA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      bA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Algebra is a concentrated liquidity AMM protocol used by 20+ DEXes, AlphaNet will integrate Algebra DEX Engine to support Dexes such as Swapsicle, Kim, SpiritSwap, and more. </p><a href="https://algebra.finance/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Fp = [Dp],
  Rp = { class: "item" },
  Mp = q(
    '<img class="head" src="' +
      wA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      CA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Ink Finance is a comprehensive DeFi asset management platform, it integrates with AlphaNet to deliver AI-enhanced treasury management and governance features. </p><a href="https://www.inkfinance.xyz/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Yp = [Mp],
  Hp = { class: "item" },
  Qp = q(
    '<img class="head" src="' +
      IA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      xA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> HorizonDEX is a high performing concentrated liquidity DEX on LineaBuild and Base. AlphaNet will introduce innovative AI trading products to enhance the trading experience for HorizonDEX users. </p><a href="https://app.horizondex.io/swap" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Up = [Qp],
  Jp = { class: "item" },
  zp = q(
    '<img class="head" src="' +
      EA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      BA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> 0xGen is an intelligent DeFi trading execution platform and aggregator, and is to integrate with AlphaNet and Hypermatrix to create AI-enhanced DeFi. </p><a href="https://0xgen.io/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Kp = [zp],
  Zp = { class: "item" },
  Wp = q(
    '<img class="head" src="' +
      SA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      OA +
      '" style="height:26px;" data-v-fd98f2e6><p data-v-fd98f2e6> Xade Finance is a multi-asset DeFi trading platform with omnichain liquidity and advanced analytics, and is to integrate with AlphaNet&#39;s AI signal and strategies. </p><a href="https://xade.finance/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Vp = [Wp],
  Gp = { class: "item" },
  Xp = q(
    '<img class="head" src="' +
      NA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      kA +
      '" style="height:38px;" data-v-fd98f2e6><p data-v-fd98f2e6> Hippocrat is a healthcare data DeSci (Decentralized Science) project, and has partnered with Phoenix to leverage SkyNet for building a custom LLM and AI models for analytics. </p><a href="https://hippocrat.io/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  qp = [Xp],
  $p = { class: "item" },
  eh = q(
    '<img class="head" src="' +
      TA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      PA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Sypool is a DeFi asset management platform, offering tokenized fund shares and quantitative trading products. Sypool has partnered with AlphaNet to provide enhanced AI capabilities for its users. </p><a href="https://sypool.io/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  th = [eh],
  sh = { class: "item" },
  nh = q(
    '<img class="head" src="' +
      LA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      jA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> GameSwift is a platform leveraging computing power and AI to revolutionize gaming, and is partnered with Phoenix SkyNet to further enhance scalability and AI features of its network. </p><a href="https://gameswift.io/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  oh = [nh],
  ih = { class: "item" },
  ah = q(
    '<img class="head" src="' +
      DA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      FA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Tripo is the leading AI-to-3D technology platform and is the first 3rd party AI model to be integrated into SkyNet AI Marketplace. </p><a href="https://www.tripo3d.ai/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  rh = [ah],
  ch = { class: "item" },
  lh = q(
    '<img class="head" src="' +
      RA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      MA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Meta2150s is a Web 3 gaming platform and aggregator and utilizes AI-to-3D capabilities through SkyNet AI Marketplace for game asset and NFT creation. </p><a href="https://meta2150s.com/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  dh = [lh],
  fh = { class: "item" },
  uh = q(
    '<img class="head" src="' +
      YA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      HA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Miracle Play is an online e-sports tournament platform, and will utilize Phoenix&#39;s custom LLM and AI-to-3D to create engaging 3D assets for gaming events. </p><a href="https://miracleplay.gg/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Ah = [uh],
  ph = { class: "item" },
  hh = q(
    '<img class="head" src="' +
      QA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      UA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Tilted is a leading platform for gaming asset management and liquidity. Users on Tilted platform can leverage Phoenix GenAI and AI-to-3D tool for in-game and NFT assets creation. </p><a href="https://tilted.xyz/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  gh = [hh],
  mh = { class: "item" },
  vh = q(
    '<img class="head" src="' +
      JA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      zA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> SuperB is a next-gen social gaming platform incubated by leading Korean game studio EVR Studio. Phoenix will provide AI Elastic Compute Layer, SkyNet, to power SuperB\u2019s metaverse. </p><a href="https://super-b.io/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  _h = [vh],
  yh = { class: "item" },
  bh = q(
    '<img class="head" src="' +
      KA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      ZA +
      '" style="height:32px;" data-v-fd98f2e6><p data-v-fd98f2e6> Crust Network is a cross-chain storage solution that supports various IPFS, PoS, and PoW protocols.Crust will be integrated into Phoenix AI Ecosystem as the first storage-focused partner. </p><a href="https://crust.network/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  wh = [bh],
  Ch = { class: "item" },
  Ih = q(
    '<img class="head" src="' +
      WA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      VA +
      '" style="height:28px;" data-v-fd98f2e6><p data-v-fd98f2e6> ARPA is a decentralized secure computation network, ARPA will combine its ZK rollup-based ML/AI capabilities with Phoenix\u2019s robust AI infrastructure. </p><a href="https://www.arpanetwork.io/en-US" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  xh = [Ih],
  Eh = { class: "item" },
  Bh = q(
    '<img class="head" src="' +
      GA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      XA +
      '" style="height:33px;" data-v-fd98f2e6><p data-v-fd98f2e6> WOW EARN is an all-in-one Web 3 app platform, it will integrate with Phoenix\u2019s cutting-edge AI technology to empower users with advanced AI capabilities. </p><a href="https://wowearn.com/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  Sh = [Bh],
  Oh = { class: "item" },
  Nh = q(
    '<img class="head" src="' +
      qA +
      '" data-v-fd98f2e6><div class="body" data-v-fd98f2e6><img class="logo" src="' +
      $A +
      '" style="height:28px;" data-v-fd98f2e6><p data-v-fd98f2e6> APRO Oracle is a decentralized oracle network specifically for the Bitcoin ecosystem, it will integrate with AlphaNet and Hypermatrix to develop oracle-verified AI trading agents. </p><a href="https://www.apro.com/" target="_blank" data-v-fd98f2e6><span data-v-fd98f2e6>Learn More</span><img src="' +
      ae +
      '" data-v-fd98f2e6></a></div>',
    2
  ),
  kh = [Nh],
  Th = {
    __name: "index",
    setup(e) {
      return (t, s) => (
        h(),
        v("section", tp, [
          A("div", sp, [
            np,
            A("div", op, [
              x((h(), v("div", ip, rp)), [[T(K)]]),
              x((h(), v("div", cp, dp)), [[T(K), 200]]),
              x((h(), v("div", fp, Ap)), [[T(K), 300]]),
              x((h(), v("div", pp, gp)), [[T(K), 100]]),
              x((h(), v("div", mp, _p)), [[T(K), 200]]),
              x((h(), v("div", yp, wp)), [[T(K), 300]]),
              x((h(), v("div", Cp, xp)), [[T(K), 100]]),
              x((h(), v("div", Ep, Sp)), [[T(K), 200]]),
              x((h(), v("div", Op, kp)), [[T(K), 300]]),
              x((h(), v("div", Tp, Lp)), [[T(K), 100]]),
              x((h(), v("div", jp, Fp)), [[T(K), 200]]),
              x((h(), v("div", Rp, Yp)), [[T(K), 300]]),
              x((h(), v("div", Hp, Up)), [[T(K), 100]]),
              x((h(), v("div", Jp, Kp)), [[T(K), 200]]),
              x((h(), v("div", Zp, Vp)), [[T(K), 100]]),
              x((h(), v("div", Gp, qp)), [[T(K), 100]]),
              x((h(), v("div", $p, th)), [[T(K), 300]]),
              x((h(), v("div", sh, oh)), [[T(K), 200]]),
              x((h(), v("div", ih, rh)), [[T(K), 100]]),
              x((h(), v("div", ch, dh)), [[T(K), 200]]),
              x((h(), v("div", fh, Ah)), [[T(K), 300]]),
              x((h(), v("div", ph, gh)), [[T(K), 100]]),
              x((h(), v("div", mh, _h)), [[T(K), 200]]),
              x((h(), v("div", yh, wh)), [[T(K), 300]]),
              x((h(), v("div", Ch, xh)), [[T(K), 100]]),
              x((h(), v("div", Eh, Sh)), [[T(K), 200]]),
              x((h(), v("div", Oh, kh)), [[T(K), 300]]),
            ]),
          ]),
        ])
      );
    },
  },
  Ph = ce(Th, [["__scopeId", "data-v-fd98f2e6"]]),
  Lh = "/assets/arpa.685f491c.png",
  jh = "/assets/apro.18ac9c85.png",
  Dh = "/assets/hippocrat.f3406dcf.png",
  Fh = "/assets/100000phb.4a7f2251.png",
  Rh = "/assets/neo.3b738b4f.png",
  Mh = "/assets/skynet.6d6f6da8.png",
  Yh = "/assets/crust.3703c623.webp",
  Hh = "/assets/china-mobile.d3e7e3fe.webp",
  Qh = "/assets/neo-staking.cf9b161e.webp";
const oo = (e) => (Be("data-v-82c250a9"), (e = e()), Se(), e),
  Uh = { class: "block-container" },
  Jh = { class: "block" },
  zh = { class: "section_title" },
  Kh = oo(() => A("h2", null, "", -1)),
  Zh = { class: "items" },
  Wh = ["src"],
  Vh = { class: "body" },
  Gh = ["href"],
  Xh = oo(() => A("span", null, "View Details", -1)),
  qh = oo(() => A("div", { class: "bb" }, null, -1)),
  $h = {
    __name: "index",
    setup(e) {
      const t = [
       
      ];
      return (s, n) => (
        h(),
        v("section", Uh, [
          A("div", Jh, [
            A("div", zh, [
              Kh,
              A("div", Zh, [
                (h(),
                v(
                  ue,
                  null,
                  bt(t, (o, i) =>
                    x(
                      A("div", { class: "item", key: o.img }, [
                        A(
                          "img",
                          { src: o.img, class: be({ darken: o.darken_head }) },
                          null,
                          10,
                          Wh
                        ),
                        A("div", Vh, [
                          A(
                            "p",
                            { class: be({ "sm-font": o.small_font }) },
                            Ie(o.text),
                            3
                          ),
                          A(
                            "a",
                            { href: o.link, target: "_blank" },
                            [Xh, B(no)],
                            8,
                            Gh
                          ),
                        ]),
                        qh,
                      ]),
                      [[T(K), i * 200]]
                    )
                  ),
                  64
                )),
              ]),
            ]),
          ]),
        ])
      );
    },
  },
  eg = ce($h, [["__scopeId", "data-v-82c250a9"]]),
  qo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAAXNSR0IArs4c6QAAAhBQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////YKLGdAAAAK90Uk5TAAECAwQFBggJCgwOEBESExQWGBkaHB0eHyAjJCUmJyssLS4vMjQ1ODk6Oz0+P0FCREZHSElLTE1OUlNWV1hZWl1eX2NkZWZnaWprbG5vdHV2d3p7f4CBgoOEhoiLjI2OkpSZmpydoqOlp6ipq6ytr7CxtLW2uLm6u7y+v8HExcbHyMnKy83O0dLT1tfZ2tzd3t/g4eLk5ebn6Onq6+zt7u/w8fL09fb3+Pn6+/z9/nGsTakAAAa4SURBVHja7Vz/Qxs1FE+7lm8CN5hU65dNdGhLRQGHCBtfVCgqDvyCmwiolTKdVp1Y8AuuUKZYmTqroEMpTnQbyGj/RfHe3ZW7XXtJLin5oe/HNHn3afKSvPd5SRAqSlGKIrLUBPrGIzOxRDK1vZ1KJmIzkfG+QM3BYKnt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",
//   tg = "/assets/skynet_tutorial.d0982486.mp4",
  sg = "/assets/bg.d4d0b36b.png",
  ng = "/assets/play-hover.7ee0ebc3.png";
const Da = (e) => (Be("data-v-adf4c303"), (e = e()), Se(), e),
  og = { key: 0, class: "block" },
  ig = Da(() => A("div", { class: "row1" }, "", -1)),
//   ag = Da(() =>
//     A(
//       "div",
//       { class: "row2" },
//       "See how to train, deploy, and perform inference for a deep neural network for image recognition with on the fly with zero programming required.",
//       -1
//     )
//   ),
  rg = {
    __name: "index",
    setup(e) {
      const t = Re(!1),
        s = Re(null);
      async function n() {
        (t.value = !0),
          await ms(),
          s.value.play(),
          s.value.addEventListener("ended", () => {
            t.value = !1;
          });
      }
      function o(a) {
        a.target.src = ng;
      }
      function i(a) {
        a.target.src = qo;
      }
      return (a, r) => (
        h(),
        v(
          "div",
          {
            class: "block-container",
            style: ft({ "background-image": t.value ? "" : `url(${T(sg)})` }),
          },
          [
            t.value
              ? (h(),
                v(
                  "video",
                  {
                    key: 1,
                    autoplay: "",
                    controls: "",
                    ref_key: "video_dom",
                    ref: s,
                    src: tg,
                  },
                  null,
                  512
                ))
              : (h(),
                v("div", og, [
                  ig,
                  ag,
                  A(
                    "img",
                    { src: qo, onMouseenter: o, onMouseleave: i, onClick: n },
                    null,
                    32
                  ),
                ])),
          ],
          4
        )
      );
    },
  },
  cg = ce(rg, [["__scopeId", "data-v-adf4c303"]]);
const io = (e) => (Be("data-v-bc1f2af9"), (e = e()), Se(), e),
  lg = { class: "item" },
  dg = ["src"],
  fg = { class: "introduction" },
  ug = io(() => A("h5", null, "ROLE IN SKYNET TECH", -1)),
  Ag = io(() => A("div", null, null, -1)),
  pg = ["href"],
  hg = io(() => A("span", null, "", -1)),
  gg = {
    __name: "item",
    props: ["logo", "introduction", "ul", "site", "role_label_margin"],
    setup(e) {
      const t = e;
      return (s, n) => (
        h(),
        v("div", lg, [
          A("img", { class: "logo", src: t.logo }, null, 8, dg),
          A("div", fg, Ie(t.introduction), 1),
          A(
            "div",
            {
              class: "role_in_phoenix",
              style: ft({ marginTop: t.role_label_margin }),
            },
            [
              ug,
              (h(!0),
              v(
                ue,
                null,
                bt(
                  t.ul,
                  (o) => (
                    h(),
                    v("ul", { key: o }, [
                      A("li", null, [Ag, A("span", null, Ie(o), 1)]),
                    ])
                  )
                ),
                128
              )),
            ],
            4
          ),
          A("a", { href: e.site, target: "_blank" }, [hg, B(no)], 8, pg),
        ])
      );
    },
  },
  Bs = ce(gg, [["__scopeId", "data-v-bc1f2af9"]]),
  mg = "/assets/apex.6f177b15.png",
  vg = "/assets/flc.c0b63b6b.png",
  _g =
    "data:image/png;base64,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",
  yg = "/assets/bobber.ab8042d0.png";
const bg = (e) => (Be("data-v-ca2b45b7"), (e = e()), Se(), e),
  wg = { class: "block-container", id: "partners" },
  Cg = { class: "block" },
  Ig = bg(() =>
    A(
      "div",
      { class: "header" },
      [
        A("h2", null, "Strategic Technology Partners"),
        A(
          "p",
          { class: "subtitle" },
          "The organizations empowering Skynet's infrastructure & AI technology"
        ),
      ],
      -1
    )
  ),
  xg = { class: "body" },
  Eg = { class: "row" },
  Bg = { class: "row" },
  Sg = {
    __name: "index",
    setup(e) {
      return (t, s) => (
        h(),
        v("section", wg, [
          A("div", Cg, [
            Ig,
            A("div", xg, [
              x(
                (h(),
                v("div", Eg, [
                  x(
                    B(
                      Bs,
                      {
                        logo: T(mg),
                        introduction: `Leading China-based, enterprise data
              & AI company backed by Tencent and
              Anker Innovation, headquartered in Hong Kong and Shanghai.`,
                        ul: [
                          "Layer 1 Enterprise Blockchain, Enterprise Partner Ecosystem",
                        ],
                        site: "",
                        role_label_margin: "40px",
                      },
                      null,
                      8,
                      ["logo"]
                    ),
                    [[T(K)]]
                  ),
                  B(
                    Bs,
                    {
                      logo: T(vg),
                      introduction: `Decentralized AI research organization headquartered in Hong
              Kong, focused on federated learning, decentralized edge computing, multi
              party computation.`,
                      ul: [
                        "SkyNet, AI On-Demand, AI App Ecosystem Development",
                      ],
                      site: "https://flc.ai/",
                      role_label_margin: "32px",
                    },
                    null,
                    8,
                    ["logo"]
                  ),
                ])),
                [[T(K), 200]]
              ),
              x(
                (h(),
                v("div", Bg, [
                  B(
                    Bs,
                    {
                      logo: T(_g),
                      introduction: `AI-driven proprietary trading firm focused on emerging asset classes,
              asia-based with offices in Shanghai, Hong Kong, Beijing, and Melbourne.`,
                      ul: [
                        "SkyNet, AlphaNet, AI Compute Resources, Proprietary AI Models",
                      ],
                      site: "https://www.tensorcorp.com/",
                      role_label_margin: "40px",
                    },
                    null,
                    8,
                    ["logo"]
                  ),
                  B(
                    Bs,
                    {
                      logo: T(yg),
                      introduction: `Bobber.com is a leading DePIN hardware company, and is Helium's
              largest hardware provider, with over 400,000 devices shipped. A JDI Group company.`,
                      ul: ["Proprietary Compute Infrastructure and Hardware"],
                      site: "https://bobber.com/",
                      role_label_margin: "32px",
                    },
                    null,
                    8,
                    ["logo"]
                  ),
                ])),
                [[T(K), 400]]
              ),
            ]),
          ]),
        ])
      );
    },
  },
  Og = ce(Sg, [["__scopeId", "data-v-ca2b45b7"]]),
  Ng = { class: "industryItem" },
  kg = { class: "industryItem-imgWrapper", viewBox: "0 0 760 478" },
  Tg = ["href"],
  Pg = { class: "industryItem-title font-tomkin_bold" },
  Lg = { class: "industryItem-desc" },
  jg = ve({
    __name: "IndustryItem",
    props: { img: null, title: null, desc: null },
    setup(e) {
      return (t, s) => (
        h(),
        v("div", Ng, [
          (h(),
          v("svg", kg, [
            A("image", { class: "industryItem-img", href: e.img }, null, 8, Tg),
          ])),
          A("h5", Pg, Ie(e.title), 1),
          A("div", Lg, Ie(e.desc), 1),
        ])
      );
    },
  });
const Yt = ce(jg, [["__scopeId", "data-v-63cd6f65"]]),
  Dg = "/assets/1.c0599a9d.png",
  Fg = "/assets/2.2ff45905.png",
  Rg = "/assets/3.88f973e9.png",
  Mg = "/assets/4.2fce834a.png",
  Yg = "/assets/5.ec44fe3f.png",
  Hg = "/assets/6.c14b26c0.png",
  Qg = (e) => (Be("data-v-703e98e7"), (e = e()), Se(), e),
  Ug = { class: "industries" },
  Jg = Qg(() =>
    A("h2", { class: "industries-title" }, "Vertical Solutions", -1)
  ),
  zg = { class: "industries-items" },
  Kg = ve({
    __name: "Industries",
    setup(e) {
      return (t, s) => {
        const n = tn("enter");
        return (
          h(),
          v("div", Ug, [
            Jg,
            A("div", zg, [
              x(
                B(
                  Yt,
                  {
                    img: T(Dg),
                    title: "Markets & Trading",
                    desc: "Leverage cost-effective AI infrastructure and models for markets.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n]]
              ),
              x(
                B(
                  Yt,
                  {
                    img: T(Fg),
                    title: "Research & Knowledge",
                    desc: "Rapid AI model deployment for predictive analytics & research across verticals.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n, { delay: 300 }]]
              ),
              x(
                B(
                  Yt,
                  {
                    img: T(Rg),
                    title: "Gaming & Metaverse",
                    desc: "Build AI capabilities on Web 3 infrastructure, including using deep reinforcement learning models.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n, { delay: 450 }]]
              ),
              x(
                B(
                  Yt,
                  {
                    img: T(Mg),
                    title: "Financial Services",
                    desc: "Rapidly build and scale AI-enabled automation tools and predictive models.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n]]
              ),
              x(
                B(
                  Yt,
                  {
                    img: T(Yg),
                    title: "IoT & Edge Computing",
                    desc: "Build & deploy AI-powered distributed computing on local device networks.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n, { delay: 300 }]]
              ),
              x(
                B(
                  Yt,
                  {
                    img: T(Hg),
                    title: "Tech & Software",
                    desc: "Monetize idle cloud and datacenter computational capacity using an agile approach.",
                  },
                  null,
                  8,
                  ["img"]
                ),
                [[n, { delay: 450 }]]
              ),
            ]),
          ])
        );
      };
    },
  });
const Zg = ce(Kg, [["__scopeId", "data-v-703e98e7"]]),
  Wg = "/assets/InvestorsPartners-Binance.1e48a3f5.webp",
  Vg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAACMCAMAAADcFoniAAAAAXNSR0IArs4c6QAAAYZQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////l9NhuQAAAIJ0Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgS5OMxAAAAcfSURBVHja7ZzrW9NIFIenFyhF7gWLiCiCQhVQRAEFBVdQQEVQVJCLqFzVKlABoaVt/vOVOQlPm86ZJPvsfoD9vR8nk8lk3mYuZwaEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgjNHpTFlu/qhDZlvxNTKxTv3ssLxYwtTMF+17s7yZSO7FV+Ynbpa5epvq25NL69uHmYPExszQtSJNzrCq8jfaWi5U+k+XQMOZltz8Txwy24rvkYm7FcpnX5AX65XX6qb38wuOPyl1eJW6l4n8W44WOwNc5gb2DdLx6a4ABOYJNNaCqmfXswLPv88WFp0cPad5kauLiluM3aEirwKP2b4XgMBcgcZrTwKvpdSF70bZ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",
  Gg = "/assets/flc.aa521a40.png",
  Xg = "/assets/InvestorsPartners-TencentCloud.f662b556.webp",
  qg = "/assets/byte.2383877e.webp",
  $g = "/assets/ali.204b95c2.png",
  em = "/assets/InvestorsPartners-Hashed.3a908caf.webp",
  tm = "/assets/InvestorsPartners-Kenetic.bf3fd0f2.webp",
  sm = "/assets/alchemy.90dfc887.webp",
  nm = "/assets/anker.3db23a9e.png",
  om = "/assets/bobber.2f590e4b.png",
  im =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAACMCAMAAADcFoniAAAAAXNSR0IArs4c6QAAAWhQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uWI2fQAAAHh0Uk5TAAECAwQFBgcICQoLDA0ODxASExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqLC4vMDEyNDU3ODk6Ozw9Pj9AQUJDREZHSElKS0xNTk9QUVJTVFVWV1haW1xdXl9gYWNkZWZnaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AwnSEUQAABJBJREFUeNrt3FlbE1cAgOGZEAjQQGRfIxVJBYWyqanYCrhhi1IEAQuIVpKAEMgy298vDZktCxAuZnKe53svk5lcnI9ZzixIEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8FBCK8p0FD9ZOHM7TX35c743UGX9SL64fp6x9EXaKFK7ip+sGhXo5xuxYKX1O3RzCcayngP+X+hHPERAgQNeOJ0KElDkgIa+e4eAIgc0jLOxAAFFDmio0wECihzQ0GZkAooc0NAmCShEwK2BgsGx33fPXQWVAQKKEPCDvVTz+J7mKHjcREABAq45l5PvJx0FVwgoWkBJalrV7cNgFwGFCyjJC3bBHZmAwgWUpOf2JthJQAEDSltWwb9kAgoYsDljfpkOEVDAgNIzaxMcIqCIARutKf1rAooYUHpvfnsQIKCIAcfNYCchAooYsFktfptrJ6CIAeUzc/lOAooYUDo2p/LdBBQy4JEZjIBi70I1dqFCBmwyT2LyEQKKGHDUDHbKNELIgG/Mb78ykRcxoHxSclOegGIFnLTu6Y4S0HPTT4pitw0YtDbATDMBPWeeQBop+ZYBrSOgsc4NXe8p1t1Y+yWjTC0BH1o7UL1HIqDnrFh6v/lRt5Uk13ZtwAfWJmx8CRDQe9+s8d8z96E71kcnDdcElJ/az/bafwEE9NBL+8ncvwvnIA1v7QcFt6WrA3Z+1h2rSwT0waAjQfr53f7pY8fD1g/LAjoerZcH1xTHsukWAvpBPna9ZKQ6ehqZUFnArZ6C/p8nV5Kq6xXB+xIBfTGvV31nbFEqC6graoFW+p51XCKgP4KJqm9OB8sDVntPfpEXPH0zrFaJ4rg2c01A/Q9nPwJ67HHFnaj+QrppwPwj9w8S0OPzmIUKBfVl+aYB/+2SCOirwGOl7P9OxF07xSsCZuP8ox//t8G+b+6N8Puwq1/1gOevwuU/R0DvNU4lrJmBlpov3ajeVzxK5g5mWiv9GAH90BBdOsqrmnLyJiqXfbmkFGUvZdKJ7cUHP8mVf6rttLhYmmH1VnPvUPtllDZ3m6bIpWrJ7MNpj8ww1oHRzEboNuu17igTjJ7/ui/uEp6M1b5e7OJefraD8fNb+LRwBrIZrm21lo+Fk5dEAyPor+CheYVluamGqciceXN/nSH0d1L4j+MmX/ymh8LYoT29mGUQfRRYc8/Ul+/cYKVfvjovBKhDDKN/OnIl83Xl0/jVR7XW2e8lF1O3Aoyjf3vQ6I+ySy7pd7Fqu9LWiY1s6fIHnIj6O53/oJVfNsvsPhluKUndNvJsP1v+/5eXgoyh3/P4VMVrn5nE5uLUyEBfb9/gvdlXn49ylW4kpu4yfnUwk/gte8X9d736YzTKCza/+jgStqzkjZppnyJcCq2bhO2rNSbU96KcfdZVwsjbsxq2vv0R9p51Jzx3qN0oX247yiXQ+jydib5LX9NQz+3PcOyrY433Xh+p1U481fTHR2Hq1b3Ir6uHOU13zyaU5Pocd+BFOi+NzS9vJs/zai658fLpRCfnnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+OU/lTkiY8oPadwAAAAASUVORK5CYII=",
  am =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAACMCAMAAADcFoniAAAAAXNSR0IArs4c6QAAAYZQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////l9NhuQAAAIJ0Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgS5OMxAAAApTSURBVHja7ZznQxtHE8bvJNERxfQi01EgNiXYhhhs7LjEGBIghhBjm2ZEsQFTjdq1//wFdLNX91Z+k0/o+X0DDXvHPtrdmdndkSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABX9K7fsLFYffNjV8Jie+PD8ouHg7Gq8L95QHHL0JvNk1Q2mzrbnh1pL5H5pnJp58Olw7SqaWr2ZH06XiNDHyEvjRxKx82PU4YbPXuWmO37P7tSjr7aS+u2xjJfZus4bckN84eK/cna+epAyNe05vXC/DVz1eI3uJ8znZ8vVAFzHZ9c6Sr5YRGLYhuKty11t7vYx7Z3R/V57ul4pU/DcTL9KHynphS1VdACXo+H/UehH2u6+ZPKaepz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",
  rm = "/assets/woox.8aa1bccb.png",
  cm = "/assets/neo.e21c4f66.png",
  lm =
    "data:image/png;base64,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",
  dm =
    "data:image/png;base64,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",
  fm = "/assets/aws.9094d0c0.png";
const um = {},
  qt = (e) => (Be("data-v-3fb43233"), (e = e()), Se(), e),
  Am = { class: "investorsPartners" },
  pm = qt(() =>
    A("h2", { class: "investorsPartners-title" }, "", -1)
  ),
  hm = { class: "investorsPartners-items" },
//   gm = {
//     class: "investorsPartners-item",
//     href: "https://accounts.binance.com/en/register?ref=COH4OPCC",
//     target: "_blank",
//   },
  mm = qt(() => A("img", { src: Wg }, null, -1)),
  vm = [mm],
  _m = {
    class: "investorsPartners-item",
    href: "https://www.tensorcorp.com/",
    target: "_blank",
  },
  ym = qt(() => A("img", { src: Vg }, null, -1)),
  bm = [ym],
  wm = { class: "investorsPartners-item", src: Gg },
  Cm = { class: "investorsPartners-item", src: Xg },
  Im = { class: "investorsPartners-item", src: qg },
  xm = { class: "investorsPartners-item", src: $g },
  Em = { class: "investorsPartners-item", src: em },
  Bm = { class: "investorsPartners-item", src: tm },
  Sm = { class: "investorsPartners-item", src: sm },
  Om = { class: "investorsPartners-item", src: nm },
  Nm = {
    class: "investorsPartners-item",
    href: "https://bobber.com/",
    target: "_blank",
  },
  km = qt(() => A("img", { src: om }, null, -1)),
  Tm = [km],
  Pm = { class: "investorsPartners-item", src: im },
  Lm = {
    class: "investorsPartners-item",
    href: "https://www.jd.com/",
    target: "_blank",
  },
  jm = qt(() => A("img", { src: am }, null, -1)),
  Dm = [jm],
  Fm = {
    class: "investorsPartners-item",
    href: "https://woo.org/",
    target: "_blank",
  },
  Rm = qt(() => A("img", { src: rm }, null, -1)),
  Mm = [Rm],
  Ym = { class: "investorsPartners-item", src: cm },
  Hm = { class: "investorsPartners-item", src: lm },
  Qm = { class: "investorsPartners-item", src: dm },
  Um = { class: "investorsPartners-item", src: fm };
function Jm(e, t) {
  const s = tn("enter");
  return (
    h(),
    v("div", Am, [
      pm,
      A("div", hm, [
        x((h(), v("a", gm, vm)), [[s]]),
        x((h(), v("a", _m, bm)), [[s, { delay: 150 }]]),
        x(A("img", wm, null, 512), [[s, { delay: 250 }]]),
        x(A("img", Cm, null, 512), [[s, { delay: 350 }]]),
        x(A("img", Im, null, 512), [[s, { delay: 450 }]]),
        x(A("img", xm, null, 512), [[s, { delay: 550 }]]),
        x(A("img", Em, null, 512), [[s, { delay: 650 }]]),
        x(A("img", Bm, null, 512), [[s, { delay: 750 }]]),
        x(A("img", Sm, null, 512), [[s, { delay: 850 }]]),
        x(A("img", Om, null, 512), [[s, { delay: 950 }]]),
        x((h(), v("a", Nm, Tm)), [[s, { delay: 1050 }]]),
        x(A("img", Pm, null, 512), [[s, { delay: 1150 }]]),
        x((h(), v("a", Lm, Dm)), [[s, { delay: 1250 }]]),
        x((h(), v("a", Fm, Mm)), [[s, { delay: 1350 }]]),
        x(A("img", Ym, null, 512), [[s, { delay: 1450 }]]),
        x(A("img", Hm, null, 512), [[s, { delay: 1550 }]]),
        x(A("img", Qm, null, 512), [[s, { delay: 1650 }]]),
        x(A("img", Um, null, 512), [[s, { delay: 1750 }]]),
      ]),
    ])
  );
}
const zm = ce(um, [
  ["render", Jm],
  ["__scopeId", "data-v-3fb43233"],
]);
const Km = {},
  Zm = { class: "homeFooter" },
  Wm = q(
    '<h4 class="homeFooter-title" data-v-c9d280fd>Join the conversation</h4><div class="homeFooter-items font-barlow" data-v-c9d280fd><a class="iconfont icon-telegram" href="https://t.me/" target="_blank" data-v-c9d280fd><span data-v-c9d280fd>TELEGRAM</span></a><a class="iconfont icon-twitter" href="https://x.com/" target="_blank" data-v-c9d280fd><span data-v-c9d280fd>TWITTER</span></a></div><div class="homeFooter-rights" data-v-c9d280fd>\xA9 2024 Skynet Global. All rights reserved.</div>',
    3
  ),
  Vm = [Wm];
function Gm(e, t) {
  return h(), v("div", Zm, Vm);
}
const Xm = ce(Km, [
    ["render", Gm],
    ["__scopeId", "data-v-c9d280fd"],
  ]),
  $o = (e) => e ** 3,
  qm = (e) => (e < 0.5 ? $o(e * 2) / 2 : 1 - $o((1 - e) * 2) / 2),
  $m = (e) => {
    if (!e.value) return;
    const t = Date.now(),
      s = e.value.scrollTop,
      n = () => {
        if (!e.value) return;
        const o = (Date.now() - t) / 500;
        o < 1
          ? ((e.value.scrollTop = s * (1 - qm(o))), requestAnimationFrame(n))
          : (e.value.scrollTop = 0);
      };
    requestAnimationFrame(n);
  },
  ev = ve({
    __name: "Backtop",
    props: { target: null },
    setup(e) {
      const t = e,
        s = Re(!1),
        n = Re();
      function o() {
        n.value && $m(n);
      }
      function i() {
        n.value && (s.value = n.value.scrollTop >= 400);
      }
      return (
        vs(() => {
          t.target && (n.value = document.querySelector(t.target)),
            n.value || (n.value = document.scrollingElement),
            document.addEventListener("scroll", i);
        }),
        en(() => {
          document.removeEventListener("scroll", i);
        }),
        (a, r) => (
          h(),
          Te(
            an,
            { name: "fade-in" },
            {
              default: it(() => [
                s.value
                  ? (h(), v("i", { key: 0, class: "backtop", onClick: o }))
                  : st("", !0),
              ]),
              _: 1,
            }
          )
        )
      );
    },
  });
const tv = ce(ev, [["__scopeId", "data-v-09d1e220"]]),
  sv = "/assets/center_logo.71df4b77.png";
const nv = {},
  ov = { class: "block-container" },
  iv = q(
    '<div class="bg_container" data-v-ef88e7df></div><div class="vision block" data-v-ef88e7df><h2 data-v-ef88e7df>Vision</h2><div class="main" data-v-ef88e7df><div class="item1" data-v-ef88e7df><h3 data-v-ef88e7df>The Skynet Trifecta</h3><p data-v-ef88e7df> The Skynet Trifecta is our vision of how value is delivered by Skynet using decentralized AI technology. The Trifecta focuses on using our decentralized AI infrastructure to empower use cases with substantial real-world value.</p></div><div class="item2" data-v-ef88e7df><h4 data-v-ef88e7df>AI Alpha</h4><p data-v-ef88e7df> Unleashing the power of AI for alpha generation, or creating profit for users, as in the case of AlphaNet. </p></div><div class="item3" data-v-ef88e7df><h4 data-v-ef88e7df>AI Insights</h4><p data-v-ef88e7df> Make predictive AI insights accessible, scalable, and easy to utilize, via SkyNet\u2019s AI model service. </p></div><div class="item4" data-v-ef88e7df><h4 data-v-ef88e7df>AI Productivity</h4><p data-v-ef88e7df> Leverage AI to change the way you work, research, and learn, through technology such as SkynetLLM. </p></div><img class="logo" src="' +
      sv +
      '" data-v-ef88e7df></div></div>',
    2
  ),
  av = [iv];
function rv(e, t) {
  return h(), v("div", ov, av);
}
const cv = ce(nv, [
    ["render", rv],
    ["__scopeId", "data-v-ef88e7df"],
  ]),
  lv = "";
const dv = {},
  ao = (e) => (Be("data-v-7394209d"), (e = e()), Se(), e),
  fv = { class: "block-container" },
  uv = { class: "block" },
  Av = ao(() => A("h2", null, "Deploy Custom AI Solutions", -1)),
  pv = ao(() =>
    A(
      "p",
      null,
      "Leverage SkyNet's Al technology to quickly create and deploy custom applications across domain-specific use cases and industries.",
      -1
    )
  ),
  hv = ao(() => A("img", { src: lv }, null, -1));
function gv(e, t) {
  const s = ct("hgroup");
  return (
    h(),
    v("div", fv, [
      A("div", uv, [B(s, null, { default: it(() => [Av, pv]), _: 1 }), hv]),
    ])
  );
}
const mv = ce(dv, [
    ["render", gv],
    ["__scopeId", "data-v-7394209d"],
  ]),
  vv = { class: "phoenixHome" },
  _v = ve({
    __name: "App",
    setup(e) {
      function t(s) {
        if (document.scrollingElement) {
          const n = document.querySelector(".homeHeader");
          if (!n) return;
          document.scrollingElement.scrollTop > 25
            ? n.classList.add("is-sticky")
            : n.classList.remove("is-sticky");
        }
      }
      return (
        vs(() => {
          document.addEventListener("scroll", t);
        }),
        en(() => {
          document.removeEventListener("scroll", t);
        }),
        (s, n) => (
          h(),
          v("main", vv, [
            B(af, { class: "phoenixHome-header" }),
            B(xf, { class: "" }),
            B(Xo, { class: "phoenixHome-divider" }),
            B(Hu),
            B(eg),
            B($u, { class: "phoenixHome-applications is-limit is-padding" }),
            B(mv),
            B(Ph),
            B(cv),
            B(cg),
            B(Og),
            B(Zg, { class: "phoenixHome-industries is-limit is-padding" }),
            B(zm, {
              class: "phoenixHome-investorsPartners is-limit is-padding",
            }),
            B(Xo, { class: "phoenixHome-divider" }),
            B(Xm, { class: "" }),
            B(tv),
          ])
        )
      );
    },
  });
const Fa = function () {
    return document.ontouchstart !== null ? "click" : "touchstart";
  },
  Hs = "__vue_click_away__",
  Ra = function (e, t, s) {
    Ma(e);
    let n = s.context,
      o = t.value,
      i = !1;
    setTimeout(function () {
      i = !0;
    }, 0),
      (e[Hs] = function (a) {
        if ((!e || !e.contains(a.target)) && o && i && typeof o == "function")
          return o.call(n, a);
      }),
      document.addEventListener(Fa(), e[Hs], !1);
  },
  Ma = function (e) {
    document.removeEventListener(Fa(), e[Hs], !1), delete e[Hs];
  },
  yv = function (e, t, s) {
    t.value !== t.oldValue && Ra(e, t, s);
  },
  bv = {
    install: function (e) {
      e.directive("click-away", wv);
    },
  },
  wv = { mounted: Ra, updated: yv, unmounted: Ma };
let Dt;
function Cv(e) {
  const t = e / 1e3;
  return `opacity 1s ${t}s ease, bottom 0.5s ${t}s ease`;
}
function Iv() {
  return {
    mounted(e, t) {
      var i;
      const s = window.getComputedStyle(e),
        n = ((i = t.value) == null ? void 0 : i.delay) || 150,
        o = Cv(n);
      e.classList.add("is-target"),
        s.transition
          ? (e.style.transition = `${s.transition},${o}`)
          : (e.style.transition = o),
        Dt == null || Dt.observe(e);
    },
    updated(e, t) {},
  };
}
function xv(e) {
  (Dt = new IntersectionObserver(
    (t) => {
      t.forEach((s, n) => {
        const o = s.target;
        s.intersectionRatio > 0 &&
          (o.classList.add("is-enter"), Dt == null || Dt.unobserve(s.target));
      });
    },
    { root: null, rootMargin: "0px", threshold: [0] }
  )),
    e.directive("enter", Iv());
}
const Ev = { key: 0, class: "svgIcon" },
  Bv = ["xlink:href"],
  Sv = ve({
    __name: "SvgIcon",
    props: {
      icon: { type: String, required: !0 },
      color: { type: String, default: "" },
      svgStyle: { type: Object, default: void 0 },
      size: { type: [String, Number], default: void 0 },
    },
    setup(e) {
      const t = e,
        s = ta(() => {
          const n = {};
          return (
            t.color && (n.color = t.color),
            t.svgStyle && Object.assign(n, t.svgStyle),
            t.size && ((n.width = t.size), (n.height = t.size)),
            n
          );
        });
      return (n, o) =>
        e.icon
          ? (h(),
            v("i", Ev, [
              (h(),
              v(
                "svg",
                { style: ft(T(s)), "aria-hidden": "true" },
                [A("use", { "xlink:href": "#icon-" + e.icon }, null, 8, Bv)],
                4
              )),
            ]))
          : st("", !0);
    },
  });
const Ov = {
    install: (e) => {
      e.component("SvgIcon", Sv);
    },
  },
  ys = la(_v);
ys.use(_d, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: !0,
});
ys.use(bv);
ys.use(Ov);
xv(ys);
ys.mount("#app");

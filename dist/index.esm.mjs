import { EventEmitter as e } from "events";

var t;

!function(e) {
  e.newListener = "newListener", e.removeListener = "removeListener";
}(t || (t = {}));

class EventEmitter extends e {
  on(e, t) {
    return [ e ].flat().forEach((e => super.on(e, t))), this;
  }
  once(e, t) {
    return [ e ].flat().forEach((e => super.once(e, t))), this;
  }
  addListener(e, t) {
    return this.on(e, t);
  }
  off(e, t) {
    return [ e ].flat().forEach((e => super.off(e, t))), this;
  }
  removeListener(e, t) {
    return this.off(e, t);
  }
  _emit(e, t, r) {
    return _emitArgv(e, t, r);
  }
  emit(e, t, ...r) {
    return ({cacheEvent: t, argv: r} = this._emit(e, t, r)), t.triggered = super.emit(e, t, ...r), 
    t;
  }
  async emitAsync(e, t, ...r) {
    ({cacheEvent: t, argv: r} = this._emit(e, t, r));
    let n = !1;
    for (const i of this.rawListeners(e)) await i(t, ...r), n = !0;
    return t.triggered = n, t;
  }
}

function _createCacheEvent(e, t) {
  var r, n, i, a, s;
  return null !== (r = t) && void 0 !== r || (t = {}), null !== (i = (n = t).triggered) && void 0 !== i || (n.triggered = null), 
  null !== (s = (a = t).name) && void 0 !== s || (a.name = e), "returnValue" in t || (t.returnValue = void 0), 
  t;
}

function _emitArgv(e, t, r) {
  return "newListener" !== e && "removeListener" !== e || "string" != typeof t || (r.unshift(t), 
  t = void 0), {
    event: e,
    cacheEvent: t = _createCacheEvent(e, t),
    argv: r
  };
}

export { t as EnumInternalEventName, EventEmitter, _createCacheEvent, _emitArgv, EventEmitter as default };
//# sourceMappingURL=index.esm.mjs.map

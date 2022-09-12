'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var events = require('events');

exports.EnumInternalEventName = void 0;

(function (EnumInternalEventName) {
  EnumInternalEventName["newListener"] = "newListener";
  EnumInternalEventName["removeListener"] = "removeListener";
  EnumInternalEventName["error"] = "error";
})(exports.EnumInternalEventName || (exports.EnumInternalEventName = {}));

class EventEmitter extends events.EventEmitter {
  on(event, listener) {
    [event].flat().forEach(event => super.on(event, listener));
    return this;
  }

  once(event, listener) {
    [event].flat().forEach(event => super.once(event, listener));
    return this;
  }

  addListener(event, listener) {
    return this.on(event, listener);
  }

  off(event, listener) {
    [event].flat().forEach(event => super.off(event, listener));
    return this;
  }

  removeListener(event, listener) {
    return this.off(event, listener);
  }

  _emit(event, cacheEvent, argv) {
    return _emitArgv(event, cacheEvent, argv);
  }

  emit(event, cacheEvent, ...argv) {
    ({
      cacheEvent,
      argv
    } = this._emit(event, cacheEvent, argv));
    cacheEvent.triggered = super.emit(event, cacheEvent, ...argv);
    return cacheEvent;
  }

  async emitAsync(event, cacheEvent, ...argv) {
    ({
      cacheEvent,
      argv
    } = this._emit(event, cacheEvent, argv));
    let triggered = false;

    for (const listener of this.rawListeners(event)) {
      await listener(cacheEvent, ...argv);
      triggered = true;
    }

    cacheEvent.triggered = triggered;
    return cacheEvent;
  }

}
function _createCacheEvent(event, cacheEvent) {
  var _cacheEvent, _cacheEvent2, _cacheEvent2$triggere, _cacheEvent3, _cacheEvent3$name;

  (_cacheEvent = cacheEvent) !== null && _cacheEvent !== void 0 ? _cacheEvent : cacheEvent = {};
  (_cacheEvent2$triggere = (_cacheEvent2 = cacheEvent).triggered) !== null && _cacheEvent2$triggere !== void 0 ? _cacheEvent2$triggere : _cacheEvent2.triggered = null;
  (_cacheEvent3$name = (_cacheEvent3 = cacheEvent).name) !== null && _cacheEvent3$name !== void 0 ? _cacheEvent3$name : _cacheEvent3.name = event;

  if (!('returnValue' in cacheEvent)) {
    cacheEvent.returnValue = void 0;
  }

  return cacheEvent;
}
function _emitArgv(event, cacheEvent, argv) {
  if ((event === "newListener" || event === "removeListener") && typeof cacheEvent === 'string') {
    argv.unshift(cacheEvent);
    cacheEvent = void 0;
  }

  cacheEvent = _createCacheEvent(event, cacheEvent);
  return {
    event,
    cacheEvent,
    argv
  };
}

exports.EventEmitter = EventEmitter;
exports._createCacheEvent = _createCacheEvent;
exports._emitArgv = _emitArgv;
exports["default"] = EventEmitter;
//# sourceMappingURL=index.cjs.development.cjs.map

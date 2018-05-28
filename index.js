"use strict";
/**
 * Created by user on 2018/5/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitterNode = require("events");
const defaultsDeep = require("defaults-deep");
class EventEmitter extends EventEmitterNode {
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    emit(event, cacheEvent, ...argv) {
        // @ts-ignore
        cacheEvent = defaultsDeep(cacheEvent || {}, {
            triggered: false,
            name: event,
            returnValue: {},
        });
        cacheEvent.triggered = super.emit(event, cacheEvent, ...argv);
        return cacheEvent;
    }
}
exports.EventEmitter = EventEmitter;
exports.default = EventEmitter;

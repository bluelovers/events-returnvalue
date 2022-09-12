/// <reference types="node" />

import { EventEmitter as EventEmitterNode } from 'events';

export declare type ITSToStringLiteralAllowedType = string | number | boolean | bigint;
/**
 * `${T}`
 */
export declare type ITSToStringLiteral<T extends ITSToStringLiteralAllowedType> = `${T}`;
/**
 * T & `${T}`
 */
export declare type ITSTypeAndStringLiteral<T extends ITSToStringLiteralAllowedType> = T | ITSToStringLiteral<T>;
export type IEventName = string | symbol | ITSTypeAndStringLiteral<EnumInternalEventName>;
export interface ICacheEventCore<R extends any, E extends IEventName> {
	triggered: boolean;
	name: E;
	returnValue: R;
}
export type ICacheEventInput<R extends any, E extends IEventName, T extends Record<any, any>> = Partial<ICacheEventCore<R, E>> & T;
export type ICacheEventRuntime<R extends any, E extends IEventName, T extends Record<any, any>> = ICacheEventCore<R, E> & T;
export type IListener<R extends any, E extends IEventName, T extends Record<any, any>> = (cacheEvent: ICacheEventRuntime<R, E, T>, ...argv: any[]) => any;
export declare const enum EnumInternalEventName {
	/**
	 * @see https://nodejs.org/api/events.html#event-newlistener
	 */
	newListener = "newListener",
	/**
	 * @see https://nodejs.org/api/events.html#event-newlistener
	 */
	removeListener = "removeListener",
	/**
	 * @see https://nodejs.org/api/events.html#capture-rejections-of-promises
	 */
	error = "error"
}
export declare class EventEmitter<E extends IEventName> extends EventEmitterNode {
	on<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>): this;
	once<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>): this;
	addListener<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>): this;
	off<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>): this;
	removeListener<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>): this;
	protected _emit<R extends any, T extends Record<any, any> = Record<any, any>>(event: E, cacheEvent: ICacheEventInput<R, E, T>, argv: any[]): {
		event: E;
		cacheEvent: ICacheEventInput<R, E, T>;
		argv: any[];
	};
	emit<R extends any, T extends Record<any, any>>(event: E, cacheEvent?: ICacheEventInput<R, E, T>, ...argv: any[]): ICacheEventRuntime<R, E, T>;
	emitAsync<R extends any, T extends Record<any, any>>(event: E, cacheEvent?: ICacheEventInput<R, E, T>, ...argv: any[]): Promise<ICacheEventRuntime<R, E, T>>;
}
export declare function _createCacheEvent<R extends any, E extends IEventName, T extends Record<any, any>>(event: E, cacheEvent: ICacheEventInput<R, E, T>): ICacheEventRuntime<R, E, T>;
export declare function _emitArgv<R extends any, E extends IEventName, T extends Record<any, any>>(event: E, cacheEvent: ICacheEventInput<R, E, T>, argv: any[]): {
	event: E;
	cacheEvent: ICacheEventInput<R, E, T>;
	argv: any[];
};

export {
	EventEmitter as default,
};

export {};

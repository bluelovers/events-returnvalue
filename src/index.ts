import { EventEmitter as EventEmitterNode } from 'events';
import { ITSTypeAndStringLiteral } from 'ts-type';

export type IEventName = string | symbol | ITSTypeAndStringLiteral<EnumInternalEventName>;

export interface ICacheEventCore<R extends any, E extends IEventName>
{
	triggered: boolean,
	name: E,
	returnValue: R,
}

export type ICacheEventInput<R extends any, E extends IEventName, T extends Record<any, any>> =
	Partial<ICacheEventCore<R, E>>
	& T;
export type ICacheEventRuntime<R extends any, E extends IEventName, T extends Record<any, any>> =
	ICacheEventCore<R, E>
	& T;

export type IListener<R extends any, E extends IEventName, T extends Record<any, any>> = (cacheEvent: ICacheEventRuntime<R, E, T>,
	...argv: any[]
) => any;

export const enum EnumInternalEventName
{
	/**
	 * @see https://nodejs.org/api/events.html#event-newlistener
	 */
	newListener = 'newListener',
	/**
	 * @see https://nodejs.org/api/events.html#event-newlistener
	 */
	removeListener = 'removeListener',

	/**
	 * @see https://nodejs.org/api/events.html#capture-rejections-of-promises
	 */
	error = 'error',
}

export class EventEmitter<E extends IEventName> extends EventEmitterNode
{
	// @ts-ignore
	public override on<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>)
	{
		[event].flat().forEach(event => super.on(event, listener))
		return this;
	}

	// @ts-ignore
	public override once<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>)
	{
		[event].flat().forEach(event => super.once(event, listener))
		return this;
	}

	// @ts-ignore
	public override addListener<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>)
	{
		return this.on(event, listener);
	}

	// @ts-ignore
	public override off<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E, listener: IListener<R, E, T>)
	{
		[event].flat().forEach(event => super.off(event, listener))
		return this;
	}

	// @ts-ignore
	public override removeListener<R extends any, T extends Record<any, any> = Record<any, any>>(event: E[] | E,
		listener: IListener<R, E, T>,
	)
	{
		return this.off(event, listener);
	}

	protected _emit<R extends any, T extends Record<any, any> = Record<any, any>>(event: E,
		cacheEvent: ICacheEventInput<R, E, T>,
		argv: any[],
	)
	{
		return _emitArgv(event, cacheEvent, argv);
	}

	public override emit<R extends any, T extends Record<any, any>>(event: E,
		cacheEvent?: ICacheEventInput<R, E, T>,
		...argv: any[]
	)
	{
		({ cacheEvent, argv } = this._emit(event, cacheEvent, argv));
		cacheEvent.triggered = super.emit(event, cacheEvent, ...argv);
		return cacheEvent as ICacheEventRuntime<R, E, T>;
	}

	public async emitAsync<R extends any, T extends Record<any, any>>(event: E,
		cacheEvent?: ICacheEventInput<R, E, T>,
		...argv: any[]
	)
	{
		({ cacheEvent, argv } = this._emit(event, cacheEvent, argv));
		let triggered = false;

		for (const listener of this.rawListeners(event))
		{
			await listener(cacheEvent, ...argv);
			triggered = true;
		}

		cacheEvent.triggered = triggered;
		return cacheEvent as ICacheEventRuntime<R, E, T>;
	}
}

export function _createCacheEvent<R extends any, E extends IEventName, T extends Record<any, any>>(event: E,
	cacheEvent: ICacheEventInput<R, E, T>,
): ICacheEventRuntime<R, E, T>
{
	cacheEvent ??= {} as any;
	cacheEvent.triggered ??= null;
	cacheEvent.name ??= event;
	if (!('returnValue' in cacheEvent))
	{
		cacheEvent.returnValue = void 0;
	}
	return cacheEvent as any
}

export function _emitArgv<R extends any, E extends IEventName, T extends Record<any, any>>(event: E,
	cacheEvent: ICacheEventInput<R, E, T>,
	argv: any[],
)
{
	if ((event === EnumInternalEventName.newListener || event === EnumInternalEventName.removeListener) && typeof cacheEvent === 'string')
	{
		argv.unshift(cacheEvent);
		cacheEvent = void 0;
	}
	cacheEvent = _createCacheEvent(event, cacheEvent);

	return {
		event,
		cacheEvent,
		argv,
	}
}

export default EventEmitter

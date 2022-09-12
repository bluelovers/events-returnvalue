
import { EventEmitter as EventEmitterNode } from 'events';

export interface ICacheEventCore<R extends any, E extends string = string>
{
	triggered: boolean,
	name: E,
	returnValue: R,
}

export type ICacheEventInput<R extends any, E extends string, T extends Record<any, any>> = Partial<ICacheEventCore<R, E>> & T;
export type ICacheEventRuntime<R extends any, E extends string, T extends Record<any, any>> = ICacheEventCore<R, E> & T;

export type IListener<R extends any, E extends string, T extends Record<any, any>> = (cacheEvent?: ICacheEventRuntime<R, E, T>, ...argv: any[]) => any;

export class EventEmitter<E extends string> extends EventEmitterNode
{
	public override on<R extends any, T extends Record<any, any>>(event: E, listener: IListener<R, E, T>)
	{
		return super.on(event, listener);
	}

	public override once<R extends any, T extends Record<any, any>>(event: E, listener: IListener<R, E, T>)
	{
		return super.once(event, listener);
	}

	public override emit<R extends any, T extends Record<any, any>>(event: E,
		cacheEvent?: ICacheEventInput<R, E, T>,
		...argv: any[]
	)
	{
		cacheEvent = _createCacheEvent(event, cacheEvent);

		cacheEvent.triggered = super.emit(event, cacheEvent, ...argv);
		return cacheEvent as ICacheEventRuntime<R, E, T>;
	}
}

export function _createCacheEvent<R extends any, E extends string, T extends Record<any, any>>(event: E,
	cacheEvent: ICacheEventInput<R, E, T>,
): ICacheEventRuntime<R, E, T>
{
	cacheEvent ??= {} as any;
	cacheEvent.triggered ??= false;
	cacheEvent.name ??= event;
	cacheEvent.returnValue ??= null;
	return cacheEvent as any
}

export default EventEmitter

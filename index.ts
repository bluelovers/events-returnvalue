/**
 * Created by user on 2018/5/28/028.
 */

import * as EventEmitterNode from 'events';
import * as defaultsDeep from 'defaults-deep';

export class EventEmitter extends EventEmitterNode
{
	public on<R extends any, T extends any>(event: string, listener: (cacheEvent?: {
		triggered?: boolean,
		name?: string,
		returnValue?: R,
	} & T, ...argv) => void)
	{
		return super.on(event, listener);
	}

	public once<R extends any, T extends any>(event: string, listener: (cacheEvent?: {
		triggered?: boolean,
		name?: string,
		returnValue?: R,
	} & T, ...argv) => void)
	{
		return super.once(event, listener);
	}

	public emit<R extends any, T extends any>(event: string, cacheEvent?: {
		triggered?: boolean,
		name?: string,
		returnValue?: R,
	} & T, ...argv)
	{
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

export default EventEmitter

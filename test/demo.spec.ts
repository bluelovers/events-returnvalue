//@noUnusedParameters:false

import { EventEmitter } from '../src';

test(`demo`, () =>
{
	let ev = new EventEmitter();

	ev.on('test', function (cacheEvent)
	{
		cacheEvent.returnValue = 777;
	});

	let actual = ev.emit('test');

	expect(actual).toMatchSnapshot();

});

test(`async`, async () =>
{
	let ev = new EventEmitter();

	ev.on('test', function (cacheEvent)
	{
		cacheEvent.returnValue = [];
	});

	ev.on<any[]>('test', function (cacheEvent)
	{
		cacheEvent.returnValue.push('sync');
	});

	ev.on<any[]>('test', async function (cacheEvent)
	{
		await new Promise((resolve) => setTimeout(resolve, 3000));
		cacheEvent.returnValue.push('async');
	});

	ev.on<any[]>('test', async function (cacheEvent)
	{
		cacheEvent.returnValue.push('async2');
	});

	ev.on<any[]>('test', async function (cacheEvent)
	{
		await new Promise((resolve) => setTimeout(resolve, 500));
		cacheEvent.returnValue.push('async3');
	});

	ev.on<any[]>('test', function (cacheEvent)
	{
		cacheEvent.returnValue.push('sync2');
	});

	let actual = await ev.emitAsync('test');

	expect(actual).toMatchSnapshot();

});

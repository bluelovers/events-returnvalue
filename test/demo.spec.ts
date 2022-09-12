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

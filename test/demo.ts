/**
 * Created by user on 2018/5/28/028.
 */

import { EventEmitter } from '../src';

let ev = new EventEmitter();

ev.once('newListener', (...argv) =>
{
	console.dir(argv)
});

ev.once('test', async function (cacheEvent)
{
	cacheEvent.returnValue = 555;
	console.log(555)
});

ev.on('test', function (cacheEvent)
{
	cacheEvent.returnValue = 777;
	console.log(777)
});

ev.on('test', async function (cacheEvent)
{
	cacheEvent.returnValue = 666;
	console.log(666)
});

console.dir(ev);

console.dir(ev.listeners('test'));
console.dir(ev.rawListeners('test'));

// @ts-ignore
ev.rawListeners('test')[0]({});

console.dir(ev.listeners('test'));
console.dir(ev.rawListeners('test'));

let r = ev.emit('test');

console.log(r);
// => { triggered: true, name: 'test', returnValue: 777 }

console.dir(ev);

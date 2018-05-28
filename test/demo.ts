/**
 * Created by user on 2018/5/28/028.
 */

import EventEmitter from '..';

let ev = new EventEmitter();

ev.on('test', function (cacheEvent)
{
	cacheEvent.returnValue = 777;
});

let r = ev.emit('test');

console.log(r);
// => { triggered: true, name: 'test', returnValue: 777 }

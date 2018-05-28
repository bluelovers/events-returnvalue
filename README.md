# events-returnvalue

    node.js EventEmitter with return value

```ts
import EventEmitter from 'events-returnvalue';

let ev = new EventEmitter();

ev.on('test', function (cacheEvent)
{
	cacheEvent.returnValue = 777;
});

let r = ev.emit('test');

console.log(r);
// => { triggered: true, name: 'test', returnValue: 777 }
```

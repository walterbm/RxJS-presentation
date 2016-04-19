// In Memory Example
var inMemorySource = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];

var result = inMemorySource
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y);

console.log(result);

// RxJS Event Example
var Rx = require('rx');

var eventSource = Rx.Observable
  .interval(300)
  .take(9)
  .map( e => ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][e] );

result = eventSource
  // .map( e => parseInt(e))
  // .filter( e => !isNaN(e))
  // .reduce((x,y) => x + y);

result.subscribe(number => console.log(number) );

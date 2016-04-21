// Imperative Example
console.log("IN MEMORY EXAMPLE");
// static in-memory array
var inMemorySource =
  ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
var result = inMemorySource
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y);
// using a functional approach
// to add up the numerical values in the array
console.log(result);


// RxJS Reactive Example
console.log("REACTIVE EXAMPLE");
// use an Observable
// to create an event stream of the same data.
var eventSource = Rx.Observable
  // pull a value from the data source every 300ms
  .interval(300)
  // use all nine values from data source
  .take(9)
  // add values to data source
  .map( e =>
    ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][e]
  );
// use the same functional approach as above
// to add up the numerical values in the array
result = eventSource
  .map( e => parseInt(e))
  .filter( e => !isNaN(e))
  .reduce((x,y) => x + y);
// listen to the event stream and print out result to console
result.subscribe(number => console.log(number) );

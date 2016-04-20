// Static Example
console.log("STATIC EXAMPLE");
var a = 3;
var b = 10 * a;
console.log(b); // => 30
// if the value of a changes, b does not reflect the change
a = 4;
console.log(b); // => 30
// have to re-declare b to reflect the change
b = 10 * a;
console.log(b); // => 40


// RxJS Simple Event Example
console.log("REACTIVE EXAMPLE");
// instead of static variables use Observable event streams
// A will be an event stream with only two events (3 & 4)
var streamA = Rx.Observable.of(3, 4);
// B will map over every event from A
// and perform an operation
var streamB = streamA.map(a => 10 * a);
// let's listen to A to see all the A events
console.log("Events from stream A:");
streamA.subscribe(a => console.log(a)); // => 3; 4;
// let's listen to B
// and see how the changing value of A
// affect the B events
console.log("Events from stream B:")
streamB.subscribe(b => console.log(b)); // => 30; 40;

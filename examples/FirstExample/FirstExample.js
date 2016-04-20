// Static Example
console.log("STATIC EXAMPLE");
var a = 3;
var b = 10 * a;
console.log(b);
// if the value of a changes, b does not reflect the change
a = 4;
console.log(b);
// have to re-declare b to reflect the change
b = 10 * a;
console.log(b);


// RxJS Event Example
console.log("REACTIVE EXAMPLE");

var streamA = Rx.Observable.of(3, 4);
var streamB = streamA.map(a => 10 * a);

streamB.subscribe(b => console.log(b));

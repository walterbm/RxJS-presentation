// RxJS & Responding to Edge DOM Events
var button = document.querySelector('.button');
var label = document.querySelector('h4');

// create Observable event stream from click DOM events
var clickStream = Rx.Observable.fromEvent(button, 'click');
// we want to fire an action when a user clicked 3 times
// double and single click are easy
// and can be handled by the native DOM events
// but handling more complex cases
// becomes very difficult with iterative programing

// create a new stream
// that will only emits events when 3 click are detected
var tripleClickStream = clickStream
  // buffer (or group) the events that occur within 250ms
  .buffer(function () {
    return clickStream.debounce(250)
  })
  // for each grouped event stream
  // return the size of the group
  .map(function(arr) {
    return arr.length
  })
  // if the size is 3
  // we know exactly 3 events were captured within 250ms
  // this is a triple click!
  .filter(function (len) {
    return len === 3
  });

// anytime tripleClickStream event happens
// we know a triple click was detected
tripleClickStream.subscribe(function(event) {
  label.textContent = 'TRIPLE CLICK!!!';
});
// we can also listen to the stream for silence
// (i.e. no triple click events)
tripleClickStream
  // if nothing happened  within 1sec
  // clear the notification text
  .debounce(1000)
  .subscribe(function (suggestion) {
    label.textContent = '-';
  });

var button = document.querySelector('.button');
var label = document.querySelector('h4');

var clickStream = Rx.Observable.fromEvent(button, 'click');

var tripleClickStream = clickStream
  .buffer(function () {
    return clickStream.debounce(250)
  })
  .map(function(arr) {
    return arr.length
  })
  .filter(function (len) {
    return len === 3
  });

tripleClickStream.subscribe(function(event) {
  label.textContent = 'triple click!!!';
});

tripleClickStream
  .debounce(1000)
  .subscribe(function (suggestion) {
    label.textContent = '-';
  });

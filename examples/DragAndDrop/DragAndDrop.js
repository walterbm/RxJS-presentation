// RxJS and UI DOM Manipulation Example
var Observable = Rx.Observable;
// get relevant DOM nodes
var parent = document.getElementById("parent");
var widget = document.getElementById("widget");

// create event streams from mouse events
var mouseDowns = Observable.fromEvent(widget, "mousedown");
var parentMouseMoves = Observable.fromEvent(parent, "mousemove");
var parentMouseUps = Observable.fromEvent(parent, "mouseup");

// let's create a "drags" event stream
// by mapping over the mouseDowns event stream
var drags =
  mouseDowns.
    map(function(e) {
      // for every event in the mouseDown stream
      // take the event in the parentMouseMoves stream
      // (i.e. the mouse event inside the parent DOM element)
      return parentMouseMoves.
        // only stop the drags event stream
        // when a parentMouseUps event is triggered
        takeUntil(parentMouseUps);
    }).
    // concatAll() will flatten nested structures
    // since after mapping each event will be
    // wrapped in another Observable "array"
    concatAll();
// listener to the drags events stream
var subscription =
  // handlers for individual events
  drags.forEach(
    // for each drag event
    // change the position of the widget DOM node
    // each mouse event will move the widget across the page
    function onNext(e) {
      widget.style.left = e.clientX  - 200 + "px";
      widget.style.top = e.clientY  - 200 + "px";
    },
    function onError(error) {
      console.log('error');
    },
    function onCompleted() {}
  );

// RxJS and DOM Manipulation Example
var Observable = Rx.Observable;
// get relevant DOM nodes
var parent = document.getElementById("parent");
var widget = document.getElementById("widget");

// create event streams from mouse events
var mouseDowns = Observable.fromEvent(widget, "mousedown");
var parentMouseMoves = Observable.fromEvent(parent, "mousemove");
var parentMouseUps = Observable.fromEvent(parent, "mouseup");

// create "drags" event stream by mapping over the mouseDowns event stream
var drags =
  mouseDowns.
    map(function(e) {
      // for event mouseDown event, take the event in the parent
      // (i.e. the mouse event inside the parent DOM element)
      return parentMouseMoves.
        // stop the drags event stream when a parentMouseUps event is triggered
        takeUntil(parentMouseUps);
    }).
    // flatten the nested structures (each event will be wrapped in an Observable "array")
    concatAll();
// listen to the drags events stream
var subscription =
  // handlers for individual events
  drags.forEach(
    // for each drag event change the position of the widget DOM node
    // so each mouse event will move the widget across the page
    function onNext(e) {
      widget.style.left = e.clientX  - 200 + "px";
      widget.style.top = e.clientY  - 200 + "px";
    },
    function onError(error) {
      console.log('error');
    },
    function onCompleted() {});

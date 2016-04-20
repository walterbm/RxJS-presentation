// RxJS with DOM Events Example

var Observable = Rx.Observable;

var button = document.getElementById('button');

// create event stream from DOM events
var clicks = Observable.fromEvent(button, 'click');
// extract data from the event stream and create a new stream with the click coordinates
var points = clicks.map(function(e){
	return {x: e.clientX, y: e.clientY};
});
// listen to the click event stream
var clickSubscription =
	// handlers for individual events
	clicks.forEach(
		// success handler
		function onNext(e) { // DOM event fired!
			alert('clicked');
			// close the subscription and stop listening to the event stream
			clickSubscription.dispose();
		},
		// error handler
		function onError(error) { // DOM events do not fire errors
			console.log('ERROR!');
		},
		// completed handler (when the event stream ends)
		function onCompleted() { // DOM event streams do not "end"
			console.log("done");
		}
  );
// listen to the points event stream
var pointSubscription =
	// handlers for individual events in the points stream
	points.forEach(
		function onNext(point) { // point event fired!
			alert('clicked:' + JSON.stringify(point));
			// close the subscription and stop listening to the point stream
			pointSubscription.dispose();
		},
		function onError(error) { // DOM events do not fire errors
			console.log('ERROR!');
		},
		function onCompleted() { // DOM event streams do not "end"
			console.log("done");
		});

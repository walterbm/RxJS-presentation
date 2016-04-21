// RxJS with DOM Events Example
// declare an Observable
var Observable = Rx.Observable;

var button = document.getElementById('button');

// create an event stream from button click events
var clicks = Observable.fromEvent(button, 'click');
// now we can map over every event
// and extract data from the event
// creating a new stream with the click coordinates
var points = clicks.map(function(e){
	return {x: e.clientX, y: e.clientY};
});
// listener to the click event stream
var clickSubscription =
	// handlers for individual click events
	clicks.forEach(
		// success handler
		function onNext(e) {
			// DOM event fired!
			alert('clicked');
			// close the subscription
			// and stop listening to the click event stream
			clickSubscription.dispose();
		},
		// error handler (optional)
		function onError(error) {
			// DOM events don't fire errors
			console.log('ERROR!');
		},
		// completed handler (when the event stream ends)
		function onCompleted() {
			// DOM event streams do not "end"
			console.log("done");
		}
  );
// listener to the points event stream
var pointSubscription =
	// handlers for individual events in the points stream
	points.forEach(
		function onNext(point) {
			// point event fired!
			alert('clicked:' + JSON.stringify(point));
			// close the subscription
			// and stop listening to the point stream
			pointSubscription.dispose();
		},
		function onError(error) {
			// DOM events do not fire errors
			console.log('ERROR!');
		},
		function onCompleted() {
			// DOM event streams do not "end"
			console.log("done");
		});

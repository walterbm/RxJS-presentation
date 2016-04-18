

// var handler = function(e) {
// 	alert('clicked');
// 	button.removeEventListener('click', handler);
// };
//
// button.addEventListener('click', handler);
//
// try {
//   [1,2,3].forEach(function(i){
//     console.log(i);
//   });
//
//   console.log("DONE");
// }
// catch (e) {
//   console.log("ERROR");
// }

var Observable = Rx.Observable;

var button = document.getElementById('button');

var clicks = Observable.fromEvent(button, 'click');

var points = clicks.map(function(e){
	return {x: e.clientX, y: e.clientY};
});

var clickSubscription =
	clicks.forEach(
		function onNext(e) {
			alert('clicked');
			clickSubscription.dispose();
		},
		function onError(error) {
			debugger;
			console.log('ERROR!');
		},
		function onCompleted() {
			console.log("done");
		}
  );
var pointSubscription =
	points.forEach(
		function onNext(point) {
			alert('clicked:' + JSON.stringify(point));
			pointSubscription.dispose();
		},
		function onError(error) {
			console.log('ERROR!');
		},
		function onCompleted() {
			console.log("done");
		});

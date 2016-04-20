// RxJS & AJAX Network Requests

// DOM elements
var refreshButton = document.querySelector('.refresh');
var closeButton1 = document.querySelector('.close1');
var closeButton2 = document.querySelector('.close2');
var closeButton3 = document.querySelector('.close3');

// create four streams from DOM events associated with click on elements
// one for DOM events from clicking on the refresh button
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
// three separate streams for DOM events on each component's close button
var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
var close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click');
var close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click');

// when the page loads none of the above DOM event streams will have fired (no clicks)
// to make sure we have initial data we use a startup stream with only one event
var startupRequestStream = Rx.Observable.just('https://api.github.com/users');

// create a new event stream that transforms DOM events into urls
// i.e. a new url event for every click on the refresh DOM element
var requestOnRefreshStream = refreshClickStream
  .map(ev => {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

// to simplify our code we can combine event streams
// the request stream will use events from both the startup and the refresh streams
var requestStream = startupRequestStream.merge(requestOnRefreshStream);

// the response stream will respond to every event from the requestStream
// requestStream events are only urls
var responseStream = requestStream
  // flat map is simply mapping over the collection and flattening nested structures
  .flatMap(requestUrl =>
    // creates a new event stream from the AJAX promise
    // but the promise stream and the response stream are flattened into one
    Rx.Observable.fromPromise(axios.get(requestUrl))
  )
  // store or cache the last request response in the stream
  // so listeners to this response stream can request data
  // without the need for a redundant network calls
  // (still need to make calls to retrieve user avatars)
  .shareReplay(1);

// get a random element from the JSON response array
function getRandomUser(response) {
  // pul data out of response object (from GET request promise)
  var listUsers = response.data;
  return listUsers[Math.floor(Math.random()*listUsers.length)];
}
// create a new stream from multiple source streams
function createSuggestionStream(responseStream, closeClickStream) {
  // for every response get a random user
  return responseStream.map(getRandomUser)
    // start with an empty event to clear out existing information
    .startWith(null)
    // merge response with close click stream events
    .merge(
      // get a random user's information
      // but only pull from the cached result
      closeClickStream.withLatestFrom(responseStream,
                                  (x, R) => getRandomUser(R))
    );
}

// now we create three streams
// one for every component that will display a user's information
// each stream will respond to DOM events from the component's close button
var suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
var suggestion2Stream = createSuggestionStream(responseStream, close2Clicks);
var suggestion3Stream = createSuggestionStream(responseStream, close3Clicks);

// listen for changes on each stream
// every event on these streams will contain a user
// when an event is fired the components will automatically render

// suggested user event stream for component 1
suggestion1Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});
// suggested user event stream for component 2
suggestion2Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion2');
});
// suggested user event stream for component 3
suggestion3Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion3');
});

// Render the changes to the DOM (a primitive React.render())
function renderSuggestion(suggestedUser, selector) {
  var suggestionElement = document.querySelector(selector);
  if (suggestedUser === null) {
    suggestionElement.style.visibility = 'hidden';
  } else {
    suggestionElement.style.visibility = 'visible';
    var usernameElement = suggestionElement.querySelector('.username');
    usernameElement.href = suggestedUser.html_url;
    usernameElement.textContent = suggestedUser.login;
    var imgElement = suggestionElement.querySelector('img');
    imgElement.src = "";
    imgElement.src = suggestedUser.avatar_url;
  }
}

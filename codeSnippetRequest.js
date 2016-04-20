var codeSnippetRequest = function (url) {
  var codeSnippet = document.getElementsByTagName("code")[0]

  var initializingStream = Rx.Observable.just(url);
  var responseStream = initializingStream
    .flatMap(requestUrl => Rx.Observable.fromPromise(axios.get(requestUrl)))
  responseStream.subscribe(response => {
    codeSnippet.innerHTML = response.data;
    Prism.highlightAll();
  });
}

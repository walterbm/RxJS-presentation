var codeSnippetRequest = function (url) {
  var codeSnippet = document.getElementsByTagName("code")[0]
  axios.get(url)
    .then(function (response) {
      codeSnippet.innerHTML = response.data;
      Prism.highlightAll();
    })
    .catch(function (response) {
      console.log(response);
    });
}

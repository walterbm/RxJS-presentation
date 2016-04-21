# RxJS & Reactive Programing
[RxJS](https://github.com/Reactive-Extensions/RxJS) is a reactive programing library for composing asynchronous and event-based javascript applications using the Observer pattern.

This repo contains six examples of RxJS being used for simple events, DOM manipulation, and AJAX requests.

## Reactive Programing Generally
[_Reactive programing_](https://en.wikipedia.org/wiki/Reactive_programming) is a programming paradigm oriented around data flows and the propagation of change where the underlying execution model will automatically propagate changes through the application.

In practice, the data flows used by reactive programming follow specific types of message-driven architectures. The two most prominent type of data flows architectures are:
- Event-based
- Actor-based

RxJS uses the event-based data flow model.

#### Event-Based Data Flow
An event-based data flow is one where events ( encoded as messages) are placed in a queue that is monitored by zero or more observers.
- e.g. DOM events, Flux.js, promises

Unlike the traditional imperative programming, in an event-based system the caller does not block and hold onto a thread while waiting for a response.

#### Observables  
The key functionality provided by RxJS is the [_Observer pattern_](https://en.wikipedia.org/wiki/Observer_pattern) applied to javascript. An Observer is an asynchronous collection that is modeled as an "array" where the items arrive over time.

#### Examples
The [RxJS examples site](http://walterbm.github.io/RxJS-presentation/) contains six small demos using RxJS. Each example illustrate a basic use-case for RxJS and displays the code alongside the demo.

1. [Imperative vs. Reactive code](http://walterbm.github.io/RxJS-presentation/examples/FirstExample/FirstExample.html)
2. [The Observer & Basic RxJS Events](http://walterbm.github.io/RxJS-presentation/examples/BasicEvents/BasicEvents.html)
3. [DOM events & Observables](http://walterbm.github.io/RxJS-presentation/examples/DOMevents+Observable/DOMevents+Observable.html)
4. [RxJS & Responding to Custom DOM Events](http://walterbm.github.io/RxJS-presentation/examples/TripleClick/TripleClick.html) (Triple Click)
5. [RxJS &  UI DOM Manipulation](http://walterbm.github.io/RxJS-presentation/examples/DragAndDrop/DragAndDrop.html) (Drag & Drop)
6. [AJAX Network Requests](http://walterbm.github.io/RxJS-presentation/examples/NetworkRequests/NetworkRequests.html) (Random User from the Github API)

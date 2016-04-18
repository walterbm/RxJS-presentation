# RxJS & Reactive Programing

## Generally
### Imperative Programing
- Definition: a sequential order of operations based around a call stack
 - call stack keeps track of the caller of a given routine, execute the invoked routine while blocking the caller in the process, and returning control to the caller with a return value (or nothing at all).
- Examples:
### Reactive Programing
- Definition: "a programming paradigm oriented around data flows and the propagation of change...and that the underlying execution model will automatically propagate changes through the data flow."
- Architecture
 - Message Driven Architecture
  - Event-based: events encoded as messages that are placed in a queue that is monitored by 0 or more observers. The big difference between event-driven and imperative style is that the caller does not block and hold onto a thread while waiting for a response. e.g. callbacks and Flux.js
  - Actor-based: asynchronous message passing between multiple actors. An actor is a construct with the following properties:
    1. A mailbox for receiving messages.
    2. The actor’s logic, which relies on pattern matching to determine how to handle each type of message it receives.
    3. Isolated state — rather than shared state — for storing context between requests.

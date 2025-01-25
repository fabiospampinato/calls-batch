# Calls Batch

Execute calls in debounced batches, with pre/postflush hooks, useful for performance.

My initial use case for this was: I have a React application that will be re-rendered every time files in a particular folder changes, but there could be hundreds of those changes in 1s and that means hundreds of re-renders, so in order to avoid that the functions that should be called because of these changes are executed in batches and before each batch I'm pausing re-renders and after each batch I'm resuming re-renders.

## Install

```sh
npm install calls-batch
```

## Usage

```ts
import CallsBatch from 'calls-batch';

// Let's create a new batch

const batch = new CallsBatch ({
  preflush () {}, // Function to call before all the batched calls are executed
  postflush () {}, // Function to call before all the batched calls are executed
  wait: 100 // Debounce wait
});

// Let's define a function to batch later on

function foo () {}

// Enqueuing some calls to "foo", with optional arguments

batch.add ( foo );
batch.add ( foo, [1] );
batch.add ( foo, [1, 2, 'foo'] );

// Let's automatically make a batched version of "foo", which will automatically enqueue calls to "foo" with the provided arguments when called

const fooWrapped = batch.wrap ( foo );

// Let's automatically add a call to "foo" with the provided arguments to the batch

fooWrapped ( 1 );

// Let's force all the enqueued calls to happen immediately

batch.flush ();
```

## License

MIT © Fabio Spampinato

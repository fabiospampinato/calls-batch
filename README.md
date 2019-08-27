# Calls Batch

Execute calls in debounced batches, with pre/postflush hooks, useful for performance.

My initial use case for this was: I have a React application that will be re-rendered every time files in a particular folder changes, but there could be hundreds of those changes in 1s and that means hundreds of re-renders, so in order to avoid that the functions that should be called because of these changes are executed in batches and before each batch I'm pausing re-renders and after each batch I'm resuming re-renders.

## Install

```sh
npm install --save calls-batch
```

## Usage

```ts
import CallsBatch from 'calls-batch';

const batch = new CallsBatch ({
  preflush () {}, // Function to call before all the batched calls are executed
  postflush () {}, // Function to call before all the batched calls are executed
  wait: 100 // Debounce wait
})

function foo () {}

batch.add ( foo );
batch.add ( foo, [1] );
batch.add ( foo, [1, 2, 'foo'] );

const fooWrapped = batch.wrap ( foo ); // Returns a function which automatically adds a call to `method`, with the provided arguments, to the batch whenver called

fooWrapped ( 1 ); // Automatically add a call to `foo` with the provided arguments to the batch

// batch.flush (); // Force a flush immediately
```

## API

### `new CallsBatch ( options )`

Creates a new `CallsBatch` instance, the options object has the following shape:

```ts
{
  preflush?: Function,
  postflush?: Function,
  wait: number
}
```

### `batch.add ( method: Function, args?: any[] ): void`

Add a function call to the batch, optionally passing an array of `args` that the passed `method` will be called with.

The call will be executed in a debounced manner, that is, as soon as no other `batch.add` call is performend in the following `options.wait` milliseconds all the queued calls will be executed.

### `batch.get (): queue`

Get the current queue of calls.

### `batch.set ( queue ): void`

Replace the current queue of calls with another.

### `batch.wrap ( method: Function ): Function`

Returns a function which automatically adds a call to `method`, with the provided arguments, to the batch whenever called.

### `batch.flush (): Promise<void>`

Force flushing the batched calls immediately.

## License

MIT © Fabio Spampinato

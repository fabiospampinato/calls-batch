
/* MAIN */

type Callback = () => void;

type FN<Args extends unknown[], Return extends unknown> = ( ...args: Args ) => Return;

type Queue = [Function, unknown[]?][];

type Options = {
  preflush?: Callback,
  postflush?: Callback,
  wait: number
};

/* EXPORT */

export type {Callback, FN, Queue, Options};

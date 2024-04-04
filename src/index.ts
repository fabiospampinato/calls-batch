
/* IMPORT */

import {debounce} from 'dettle';
import type {Callback, FN, Queue, Options} from './types';

/* MAIN */

class CallsBatch {

  /* VARIABLES */

  private queue: Queue = [];
  private flushDebounced: Callback;
  private preflush?: Callback;
  private postflush?: Callback;

  /* CONSTRUCTOR */

  constructor ( options: Options ) {

    this.flushDebounced = debounce ( this.flush, options.wait );
    this.preflush = options.preflush;
    this.postflush = options.postflush;

  }

  /* API */

  flush = async (): Promise<void> => {

    try {

      this.preflush?.();

      const queue = this.queue;

      this.queue = [];

      for ( const [method, args] of queue ) {

        await method.apply ( undefined, args );

      }

      this.postflush?.();

    } catch ( error: unknown ) {

      this.postflush?.();

      throw error;

    }

  };

  add = <Args extends unknown[], Return extends unknown> ( method: FN<Args, Return>, args?: Args ): void => {

    this.queue.push ([ method, args ]);

    this.flushDebounced ();

  };

  wrap = <Args extends unknown[], Return extends unknown> ( method: FN<Args, Return> ): FN<Args, void> => {

    return ( ...args: Args ): void => {

      this.add ( method, args );

    };

  };

}

/* EXPORT */

export default CallsBatch;
export type {Options};

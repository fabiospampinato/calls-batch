
/* IMPORT */

import * as debounce from 'debounce';
import {IQueue, IOptions} from './types';

/* CALLS BATCH */

class CallsBatch {

  options: IOptions;
  queue: IQueue = [];
  flushDebounced: Function;

  constructor ( options: IOptions ) {

    this.options = options;

    this.flushDebounced = debounce ( this.flush, this.options.wait );

  }

  add ( method: Function, args?: any[] ) {

    this.queue.push ([ method, args ]);

    this.flushDebounced ();

  }

  get (): IQueue {

    return this.queue;

  }

  set ( queue: IQueue ) {

    this.queue = queue;

  }

  wrap<FN extends ( ...args: any ) => any> ( method: FN ) {

    return ( ...args: Parameters<FN> ) => {

      this.add ( method, args );

    };

  }

  async flush () {

    try {

      if ( this.options.preflush ) this.options.preflush ();

      const queue = this.queue;

      this.queue = [];

      for ( let [method, args] of queue ) {

        await method.apply ( undefined, args );

      }

      if ( this.options.postflush ) this.options.postflush ();

    } catch ( e ) {

      if ( this.options.postflush ) this.options.postflush ();

      throw e;

    }

  }

}

/* EXPORT */

export default CallsBatch;

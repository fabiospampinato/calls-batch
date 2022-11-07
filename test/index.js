
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import CallsBatch from '../dist/index.js';

/* MAIN */

describe ( 'CallsBatch', it => {

  it ( 'works', async t => {

    let calls = '';

    const batch = new CallsBatch ({
      preflush: () => calls += '[',
      postflush: () => calls += ']',
      delay: 10
    });

    batch.add ( () => calls += 'a' );
    batch.add ( id => calls += id, [1] );
    batch.add ( id => calls += id, [2] );

    const wrapped = batch.wrap ( id => calls += id );

    wrapped ( 'r' );
    wrapped ( 's' )
    wrapped ( 't' )

    t.is ( calls, '' );

    await delay ( 100 );

    t.is ( calls, '[a12rst]' );

  });

});

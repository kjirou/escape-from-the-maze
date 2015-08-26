import assert from 'power-assert';

import {
  calculateMillisecondsPerFrame,
  dictionarize
} from 'lib/util';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('calculateMillisecondsPerFrame', function() {
    assert.strictEqual(calculateMillisecondsPerFrame(), 33);
  });

  it('dictionarize', function() {
    assert.deepEqual(
      dictionarize([
        { type: 'foo', value: 1 },
        { type: 'bar', value: 2 }
      ], 'type'),
      {
        foo: { type: 'foo', value: 1 },
        bar: { type: 'bar', value: 2 }
      }
    );
  });
});

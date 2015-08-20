import assert from 'power-assert';

import {calculateMillisecondsPerFrame} from 'lib/util';


describe('lib/util', function() {

  it('calculateMillisecondsPerFrame', function() {
    assert.strictEqual(calculateMillisecondsPerFrame(), 33);
  });
});

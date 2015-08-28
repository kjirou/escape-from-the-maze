import assert from 'power-assert';
import path from 'path';

import conf from 'conf';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('root', function() {
    let App = require(path.join(conf.root, 'app.es6'));
    assert.strictEqual(typeof App, 'function');
  });
});

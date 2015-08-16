import assert from 'power-assert';

import someEs5Module from '../support/some-es5-module';
import someEs6Module from '../support/some-es6-module';


describe('power-assert vendor', function() {

  it('should assert .js codes as ES5', function() {
    assert.deepEqual(someEs5Module, {
      foo: 1,
      bar: 2
    });
  });

  it('should assert .es6 codes as ES6', function() {
    assert.deepEqual(someEs6Module, {
      foo: 1,
      bar: 2
    });
  });
});

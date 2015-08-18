import _ from 'lodash'
import assert from 'power-assert'

import SingletonMixin from 'lib/mixins/singleton'


describe('lib/mixins/singleton', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof SingletonMixin, 'object');
  });

  it('getInstance, clearInstance', () => {
    class Foo {
      constructor(x, y) {
        this.data = {
          x: x,
          y: y
        };
      }
    }
    _.assign(Foo, SingletonMixin);

    let foo = Foo.getInstance(1, 2);
    assert.deepEqual(foo.data, { x: 1, y: 2 });
    let foo2 = Foo.getInstance();
    assert(foo === foo2);

    Foo.clearInstance();
    let foo3 = Foo.getInstance(2, 3);
    assert(foo !== foo3);
    assert.deepEqual(foo3.data, { x: 2, y: 3 });
  });
});

import assert from 'power-assert';

import Store from 'stores/Store';


describe(__filename, function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Store, 'function');
  });

  it('should be inherited', function() {
    class SubStore extends Store {}

    let store = SubStore.getInstance();
    let store2 = SubStore.getInstance();
    assert.strictEqual(store, store2, 'Can use inherited static props');
  });
});

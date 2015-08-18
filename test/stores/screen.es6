import assert from 'power-assert';

import ScreenStore from 'stores/screen';


describe('stores/screen', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof ScreenStore, 'function');
  });

  it('pageId', function() {
    var store = new ScreenStore();
    store._pageId = 'foo';
    assert.strictEqual(store.pageId, 'foo');
  });
});

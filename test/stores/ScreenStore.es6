import assert from 'power-assert';

import ScreenStore from 'stores/ScreenStore';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof ScreenStore, 'function');
  });

  it('pageId', function() {
    var store = new ScreenStore();
    store._pageId = 'foo';
    assert.strictEqual(store.pageId, 'foo');
  });
});

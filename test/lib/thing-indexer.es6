import assert from 'power-assert';
import uuidModule from 'uuid';

import ThingIndexer from 'lib/thing-indexer';


describe('lib/thing-indexer', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof ThingIndexer, 'function');
  });

  it('update, get', function() {
    let indexer = new ThingIndexer();
    let uuid = uuidModule.v4();
    indexer.update(uuid, [1, 2]);
    indexer.update(uuid, [1, 3]);
    assert.deepEqual(indexer.get(uuid), [1, 3]);
    assert.strictEqual(indexer.get('not-existing-uuid'), null);
  });

  it('remove', function() {
    let indexer = new ThingIndexer();
    let uuid1 = uuidModule.v4();
    let uuid2 = uuidModule.v4();
    indexer.update(uuid1, [1, 2]);
    indexer.update(uuid2, [1, 3]);
    assert.deepEqual(indexer.get(uuid1), [1, 2]);
    indexer.remove(uuid1);
    assert.strictEqual(indexer.get(uuid1), null);
  });
});

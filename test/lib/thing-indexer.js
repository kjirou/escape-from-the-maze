var assert = require('power-assert');
var uuidModule = require('uuid');

var ThingIndexer = require('lib/thing-indexer');


describe('lib/thing-indexer', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof ThingIndexer, 'function');
  });

  it('update, get', function() {
    var indexer = new ThingIndexer();
    var uuid = uuidModule.v4();
    indexer.update(uuid, [1, 2]);
    indexer.update(uuid, [1, 3]);
    assert.deepEqual(indexer.get(uuid), [1, 3]);
    assert.strictEqual(indexer.get('not-existing-uuid'), null);
  });

  it('remove', function() {
    var indexer = new ThingIndexer();
    var uuid1 = uuidModule.v4();
    var uuid2 = uuidModule.v4();
    indexer.update(uuid1, [1, 2]);
    indexer.update(uuid2, [1, 3]);
    assert.deepEqual(indexer.get(uuid1), [1, 2]);
    indexer.remove(uuid1);
    assert.strictEqual(indexer.get(uuid1), null);
  });
});

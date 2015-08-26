import assert from 'power-assert';
import uuidModule from 'uuid';

import ThingIndexerModel from 'models/ThingIndexerModel';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof ThingIndexerModel, 'function');
  });

  it('update, get, getIds', function() {
    let indexer = new ThingIndexerModel();
    assert.deepEqual(indexer.getIds(), []);
    let uuid = uuidModule.v4();
    indexer.update(uuid, [1, 2]);
    indexer.update(uuid, [1, 3]);
    assert.deepEqual(indexer.get(uuid), [1, 3]);
    assert.deepEqual(indexer.getIds(), [uuid]);
    assert.strictEqual(indexer.get('not-existing-uuid'), null);
  });

  it('remove', function() {
    let indexer = new ThingIndexerModel();
    let uuid1 = uuidModule.v4();
    let uuid2 = uuidModule.v4();
    indexer.update(uuid1, [1, 2]);
    indexer.update(uuid2, [1, 3]);
    assert.deepEqual(indexer.get(uuid1), [1, 2]);
    indexer.remove(uuid1);
    assert.strictEqual(indexer.get(uuid1), null);
  });
});

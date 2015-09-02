'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _modelsThingIndexerModel = require('models/ThingIndexerModel');

var _modelsThingIndexerModel2 = _interopRequireDefault(_modelsThingIndexerModel);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _modelsThingIndexerModel2['default'], 'function');
  });

  it('update, get, getIds', function () {
    var indexer = new _modelsThingIndexerModel2['default']();
    _powerAssert2['default'].deepEqual(indexer.getIds(), []);
    var uuid = _uuid2['default'].v4();
    indexer.update(uuid, [1, 2]);
    indexer.update(uuid, [1, 3]);
    _powerAssert2['default'].deepEqual(indexer.get(uuid), [1, 3]);
    _powerAssert2['default'].deepEqual(indexer.getIds(), [uuid]);
    _powerAssert2['default'].strictEqual(indexer.get('not-existing-uuid'), null);
  });

  it('remove', function () {
    var indexer = new _modelsThingIndexerModel2['default']();
    var uuid1 = _uuid2['default'].v4();
    var uuid2 = _uuid2['default'].v4();
    indexer.update(uuid1, [1, 2]);
    indexer.update(uuid2, [1, 3]);
    _powerAssert2['default'].deepEqual(indexer.get(uuid1), [1, 2]);
    indexer.remove(uuid1);
    _powerAssert2['default'].strictEqual(indexer.get(uuid1), null);
  });
});
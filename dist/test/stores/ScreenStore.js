'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _storesScreenStore = require('stores/ScreenStore');

var _storesScreenStore2 = _interopRequireDefault(_storesScreenStore);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _storesScreenStore2['default'], 'function');
  });

  it('pageId', function () {
    var store = new _storesScreenStore2['default']();
    store._pageId = 'foo';
    _powerAssert2['default'].strictEqual(store.pageId, 'foo');
  });
});
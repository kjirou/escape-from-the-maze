'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _app = require('app');

var _app2 = _interopRequireDefault(_app);

var _libEventManager = require('lib/EventManager');

var _libEventManager2 = _interopRequireDefault(_libEventManager);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  beforeEach(function () {
    _app2['default'].purgeInstances();
  });

  it('should create instance', function () {
    var app = new _app2['default']();
    _powerAssert2['default'].strictEqual(typeof app, 'object');
    _powerAssert2['default'].strictEqual(app instanceof _app2['default'], true);
  });

  it('purgeInstances', function () {
    _powerAssert2['default'].strictEqual(_libEventManager2['default']._instance, null);
    _libEventManager2['default'].getInstance();
    _powerAssert2['default'].strictEqual(_libEventManager2['default']._instance instanceof _libEventManager2['default'], true);
    _app2['default'].purgeInstances();
    _powerAssert2['default'].strictEqual(_libEventManager2['default']._instance, null);
  });
});
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _app = require('app');

var _app2 = _interopRequireDefault(_app);

var _inputAppInput = require('input/AppInput');

var _inputAppInput2 = _interopRequireDefault(_inputAppInput);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  beforeEach(function () {
    _app2['default'].purgeInstances();
  });

  it('should create instance', function () {
    var input = new _inputAppInput2['default']();
    (0, _powerAssert2['default'])(input instanceof _inputAppInput2['default']);
  });

  it('should destruct all observable sequences at clearInstance', function () {
    var input = _inputAppInput2['default'].getInstance();
    var spies = [];
    spies.push(_sinon2['default'].spy(input._timerSubscription, 'dispose'));
    spies.push(_sinon2['default'].spy(input._keypressSubscription, 'dispose'));
    _inputAppInput2['default'].clearInstance();
    _powerAssert2['default'].strictEqual(spies[0].callCount, 1);
    _powerAssert2['default'].strictEqual(spies[1].callCount, 1);
  });
});
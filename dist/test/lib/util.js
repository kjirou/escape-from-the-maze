'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

var _libUtil = require('lib/util');

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('createCounter', function () {
    var counter = undefined;
    counter = (0, _libUtil.createCounter)();
    _powerAssert2['default'].strictEqual(counter(), 1);
    _powerAssert2['default'].strictEqual(counter(), 2);
    counter = (0, _libUtil.createCounter)(-2);
    _powerAssert2['default'].strictEqual(counter(), -2);
    _powerAssert2['default'].strictEqual(counter(), -1);
  });

  it('calculateMillisecondsPerFrame', function () {
    _powerAssert2['default'].strictEqual((0, _libUtil.calculateMillisecondsPerFrame)(), ~ ~(1000 / _conf2['default'].fps));
  });

  it('dictionarize', function () {
    _powerAssert2['default'].deepEqual((0, _libUtil.dictionarize)([{ type: 'foo', value: 1 }, { type: 'bar', value: 2 }], 'type'), {
      foo: { type: 'foo', value: 1 },
      bar: { type: 'bar', value: 2 }
    });
  });

  it('createHelpText', function () {
    _powerAssert2['default'].strictEqual(typeof (0, _libUtil.createHelpText)(), 'string');
  });
});
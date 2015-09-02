'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _supportSomeEs5Module = require('../support/some-es5-module');

var _supportSomeEs5Module2 = _interopRequireDefault(_supportSomeEs5Module);

var _supportSomeEs6Module = require('../support/some-es6-module');

var _supportSomeEs6Module2 = _interopRequireDefault(_supportSomeEs6Module);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should assert .js codes as ES5', function () {
    _powerAssert2['default'].deepEqual(_supportSomeEs5Module2['default'], {
      foo: 1,
      bar: 2
    });
  });

  it('should assert .es6 codes as ES6', function () {
    _powerAssert2['default'].deepEqual(_supportSomeEs6Module2['default'], {
      foo: 1,
      bar: 2
    });
  });
});
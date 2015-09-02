'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('root', function () {
    var App = require(_path2['default'].join(_conf2['default'].root, 'app.es6'));
    _powerAssert2['default'].strictEqual(typeof App, 'function');
  });
});
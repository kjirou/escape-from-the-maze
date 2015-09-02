'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _modelsGameResultModel = require('models/GameResultModel');

var _modelsGameResultModel2 = _interopRequireDefault(_modelsGameResultModel);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('calculateScore', function () {
    var store = new _modelsGameResultModel2['default']({ timeLimit: 100000, lastGameTime: 77777 });
    _powerAssert2['default'].strictEqual(store.calculateScore(), 22223);
  });
});
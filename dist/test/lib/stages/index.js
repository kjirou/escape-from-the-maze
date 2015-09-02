'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _libStages = require('lib/stages');

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  context('Stage', function () {

    it('getName', function () {
      var FooBarStage = Object.assign({}, _libStages.Stage, {
        typeId: 'foo_bar'
      });
      _powerAssert2['default'].strictEqual(FooBarStage.getName(), 'Foo Bar');
    });
  });

  context('stageList, stages', function () {

    it('should be', function () {
      (0, _powerAssert2['default'])(_libStages.stageList.length > 0);
      _powerAssert2['default'].strictEqual(_libStages.stageList.length, Object.keys(_libStages.stages).length);

      var descriptions = _libStages.stageList.map(function (v) {
        return v.description;
      });
      _powerAssert2['default'].strictEqual(descriptions.length, _lodash2['default'].unique(descriptions).length);
    });
  });
});
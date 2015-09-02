'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _modelsThingsWallThingModel = require('models/things/WallThingModel');

var _modelsThingsWallThingModel2 = _interopRequireDefault(_modelsThingsWallThingModel);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _modelsThingsWallThingModel2['default'], 'function');
  });

  it('uuid', function () {
    var thing = new _modelsThingsWallThingModel2['default']();
    (0, _powerAssert2['default'])(_validator2['default'].isUUID(thing.uuid, 4));
  });

  it('getTypeId', function () {
    var thing = new _modelsThingsWallThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.getTypeId(), 'wall');
  });

  it('getSymbol', function () {
    var thing = new _modelsThingsWallThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.getSymbol(), '#');
  });

  it('isPassable', function () {
    var thing = new _modelsThingsWallThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.isPassable(), false);
  });

  it('toContent', function () {
    var thing = new _modelsThingsWallThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.toContent(), '#');
  });
});
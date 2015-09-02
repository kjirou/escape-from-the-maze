'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _modelsThingsThingModel = require('models/things/ThingModel');

var _modelsThingsThingModel2 = _interopRequireDefault(_modelsThingsThingModel);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _modelsThingsThingModel2['default'], 'function');
  });

  it('uuid', function () {
    var thingModel = new _modelsThingsThingModel2['default']();
    (0, _powerAssert2['default'])(_validator2['default'].isUUID(thingModel.uuid, 4));
  });

  it('getTypeId', function () {
    var thingModel = new _modelsThingsThingModel2['default']();
    _powerAssert2['default'].strictEqual(thingModel.getTypeId(), '_thing');
  });

  it('getSymbol', function () {
    var thingModel = new _modelsThingsThingModel2['default']();
    _powerAssert2['default'].strictEqual(thingModel.getSymbol(), '?');
  });

  it('isPassable', function () {
    var thingModel = new _modelsThingsThingModel2['default']();
    _powerAssert2['default'].strictEqual(thingModel.isPassable(), true);
    thingModel._isPassable = false;
    _powerAssert2['default'].strictEqual(thingModel.isPassable(), false);
  });

  it('toContent', function () {
    var thingModel = new _modelsThingsThingModel2['default']();
    _powerAssert2['default'].strictEqual(thingModel.toContent(), thingModel.getSymbol());
  });
});
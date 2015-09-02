'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _modelsThingsPlayerThingModel = require('models/things/PlayerThingModel');

var _modelsThingsPlayerThingModel2 = _interopRequireDefault(_modelsThingsPlayerThingModel);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _modelsThingsPlayerThingModel2['default'], 'function');
  });

  it('uuid', function () {
    var thing = new _modelsThingsPlayerThingModel2['default']();
    (0, _powerAssert2['default'])(_validator2['default'].isUUID(thing.uuid, 4));
  });

  it('getTypeId', function () {
    var thing = new _modelsThingsPlayerThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.getTypeId(), 'player');
  });

  it('getSymbol', function () {
    var thing = new _modelsThingsPlayerThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.getSymbol(), '@');
  });

  it('isPassable', function () {
    var thing = new _modelsThingsPlayerThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.isPassable(), true);
  });

  it('toContent', function () {
    var thing = new _modelsThingsPlayerThingModel2['default']();
    _powerAssert2['default'].strictEqual(thing.toContent(), '{magenta-fg}@{/}');
  });
});
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _modelsCellModel = require('models/CellModel');

var _modelsCellModel2 = _interopRequireDefault(_modelsCellModel);

var _modelsThingsThingModel = require('models/things/ThingModel');

var _modelsThingsThingModel2 = _interopRequireDefault(_modelsThingsThingModel);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _modelsCellModel2['default'], 'function');
  });

  it('thing accessors', function () {
    var cell = new _modelsCellModel2['default']();
    var thing = new _modelsThingsThingModel2['default']();

    _powerAssert2['default'].strictEqual(cell.findThing(thing), null);
    _powerAssert2['default'].strictEqual(cell.hasThing(thing), false);
    cell.setThing(thing);
    _powerAssert2['default'].strictEqual(cell.findThing(thing), thing);
    _powerAssert2['default'].strictEqual(cell.findThingOrError(thing), thing);
    _powerAssert2['default'].strictEqual(cell.hasThing(thing), true);

    var anotherThing = new _modelsThingsThingModel2['default']();
    _powerAssert2['default'].strictEqual(cell.findThing(anotherThing), null);
    _powerAssert2['default'].throws(function () {
      cell.findThingOrError(anotherThing);
    }, /Can not /);

    _powerAssert2['default'].strictEqual(cell.removeThing(anotherThing), false);
    _powerAssert2['default'].strictEqual(cell.hasThing(thing), true);
    _powerAssert2['default'].strictEqual(cell.removeThing(thing), true);
    _powerAssert2['default'].strictEqual(cell.hasThing(thing), false);
  });

  it('isPassable', function () {
    var cell = undefined,
        thing = undefined;
    cell = new _modelsCellModel2['default']();
    _powerAssert2['default'].strictEqual(cell.isPassable(), true);

    thing = new _modelsThingsThingModel2['default']();
    thing._isPassable = true;
    cell.setThing(thing);
    _powerAssert2['default'].strictEqual(cell.isPassable(), true);

    thing = new _modelsThingsThingModel2['default']();
    thing._isPassable = false;
    cell.setThing(thing);
    _powerAssert2['default'].strictEqual(cell.isPassable(), false);

    thing = new _modelsThingsThingModel2['default']();
    thing._isPassable = true;
    cell.setThing(thing);
    _powerAssert2['default'].strictEqual(cell.isPassable(), false);
  });

  it('toContent', function () {
    var cell = undefined;
    cell = new _modelsCellModel2['default']();
    _powerAssert2['default'].strictEqual(cell.toContent(), ' ');
    cell.setThing(new _modelsThingsThingModel2['default']());
    _powerAssert2['default'].strictEqual(cell.toContent(), '?');
  });
});
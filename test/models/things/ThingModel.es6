import assert from 'power-assert';
import validatorjs from 'validator';

import ThingModel from 'models/things/ThingModel';


describe(__filename, function() {

  it('should be defined', function() {
    assert.strictEqual(typeof ThingModel, 'function');
  });

  it('uuid', function() {
    let thingModel = new ThingModel();
    assert(validatorjs.isUUID(thingModel.uuid, 4));
  });

  it('getTypeId', function() {
    let thingModel = new ThingModel();
    assert.strictEqual(thingModel.getTypeId(), '_thing');
  });

  it('getSymbol', function() {
    let thingModel = new ThingModel();
    assert.strictEqual(thingModel.getSymbol(), '?');
  });

  it('isPassable', function() {
    let thingModel = new ThingModel();
    assert.strictEqual(thingModel.isPassable(), true);
    thingModel._isPassable = false;
    assert.strictEqual(thingModel.isPassable(), false);
  });

  it('toContent', function() {
    let thingModel = new ThingModel();
    assert.strictEqual(thingModel.toContent(), thingModel.getSymbol());
  });
});

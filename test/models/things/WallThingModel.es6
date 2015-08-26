import assert from 'power-assert';
import validatorjs from 'validator';

import WallThingModel from 'models/things/WallThingModel';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof WallThingModel, 'function');
  });

  it('uuid', function() {
    let thing = new WallThingModel();
    assert(validatorjs.isUUID(thing.uuid, 4));
  });

  it('getTypeId', function() {
    let thing = new WallThingModel();
    assert.strictEqual(thing.getTypeId(), 'wall');
  });

  it('getSymbol', function() {
    let thing = new WallThingModel();
    assert.strictEqual(thing.getSymbol(), '#');
  });

  it('isPassable', function() {
    let thing = new WallThingModel();
    assert.strictEqual(thing.isPassable(), false);
  });

  it('toContent', function() {
    let thing = new WallThingModel();
    assert.strictEqual(thing.toContent(), '#');
  });
});

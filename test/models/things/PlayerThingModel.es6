import assert from 'power-assert';
import validatorjs from 'validator';

import PlayerThingModel from 'models/things/PlayerThingModel';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('should be defined', function() {
    assert.strictEqual(typeof PlayerThingModel, 'function');
  });

  it('uuid', function() {
    let thing = new PlayerThingModel();
    assert(validatorjs.isUUID(thing.uuid, 4));
  });

  it('getTypeId', function() {
    let thing = new PlayerThingModel();
    assert.strictEqual(thing.getTypeId(), 'player');
  });

  it('getSymbol', function() {
    let thing = new PlayerThingModel();
    assert.strictEqual(thing.getSymbol(), '@');
  });

  it('isPassable', function() {
    let thing = new PlayerThingModel();
    assert.strictEqual(thing.isPassable(), true);
  });

  it('toContent', function() {
    let thing = new PlayerThingModel();
    assert.strictEqual(thing.toContent(), '{green-fg}@{/}');
  });
});

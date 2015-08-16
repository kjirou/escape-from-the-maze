import assert from 'power-assert';
import validatorjs from 'validator';

import PlayerThing from 'lib/things/player';


describe('lib/things/player', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof PlayerThing, 'function');
  });

  it('uuid', function() {
    let thing = new PlayerThing();
    assert(validatorjs.isUUID(thing.uuid, 4));
  });

  it('getTypeId', function() {
    let thing = new PlayerThing();
    assert.strictEqual(thing.getTypeId(), 'player');
  });

  it('getSymbol', function() {
    let thing = new PlayerThing();
    assert.strictEqual(thing.getSymbol(), '@');
  });

  it('isPassable', function() {
    let thing = new PlayerThing();
    assert.strictEqual(thing.isPassable(), true);
  });

  it('toContent', function() {
    let thing = new PlayerThing();
    assert.strictEqual(thing.toContent(), '{green-fg}@{/}');
  });
});

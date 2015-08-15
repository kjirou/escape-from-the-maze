var assert = require('power-assert');
var validatorjs = require('validator');

var PlayerThing = require('lib/things/player');


describe('lib/things/player', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof PlayerThing, 'function');
  });

  it('uuid', function() {
    var thing = new PlayerThing();
    assert(validatorjs.isUUID(thing.uuid, 4));
  });

  it('getTypeId', function() {
    var thing = new PlayerThing();
    assert.strictEqual(thing.getTypeId(), 'player');
  });

  it('getSymbol', function() {
    var thing = new PlayerThing();
    assert.strictEqual(thing.getSymbol(), '@');
  });

  it('isPassable', function() {
    var thing = new PlayerThing();
    assert.strictEqual(thing.isPassable(), true);
  });

  it('toContent', function() {
    var thing = new PlayerThing();
    assert.strictEqual(thing.toContent(), '{green-fg}@{/}');
  });
});

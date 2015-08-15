var assert = require('assert');

var PlayerThing = require('lib/things/player');


describe('lib/things/player', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof PlayerThing, 'function');
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

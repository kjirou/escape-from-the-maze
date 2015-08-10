var assert = require('assert');

var Thing = require('lib/things/thing');


describe('lib/things/thing', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Thing, 'function');
  });

  it('getTypeId', function() {
    var thing = new Thing();
    assert.strictEqual(thing.getTypeId(), 'thing');
  });

  it('isPassable', function() {
    var thing = new Thing();
    assert.strictEqual(thing.isPassable(), true);
    thing._isPassable = false;
    assert.strictEqual(thing.isPassable(), false);
  });
});

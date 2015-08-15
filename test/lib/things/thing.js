var assert = require('power-assert');
var validatorjs = require('validator');

var Thing = require('lib/things/thing');


describe('lib/things/thing', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Thing, 'function');
  });

  it('uuid', function() {
    var thing = new Thing();
    assert(validatorjs.isUUID(thing.uuid, 4));
  });

  it('getTypeId', function() {
    var thing = new Thing();
    assert.strictEqual(thing.getTypeId(), 'thing');
  });

  it('getSymbol', function() {
    var thing = new Thing();
    assert.strictEqual(thing.getSymbol(), '?');
  });

  it('isPassable', function() {
    var thing = new Thing();
    assert.strictEqual(thing.isPassable(), true);
    thing._isPassable = false;
    assert.strictEqual(thing.isPassable(), false);
  });

  it('toContent', function() {
    var thing = new Thing();
    assert.strictEqual(thing.toContent(), thing.getSymbol());
  });
});

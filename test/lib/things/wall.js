var assert = require('assert');

var WallThing = require('lib/things/wall');


describe('lib/things/wall', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof WallThing, 'function');
  });

  it('getTypeId', function() {
    var wall = new WallThing();
    assert.strictEqual(wall.getTypeId(), 'wall');
  });

  it('isPassable', function() {
    var wall = new WallThing();
    assert.strictEqual(wall.isPassable(), false);
  });
});

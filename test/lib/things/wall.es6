import assert from 'power-assert';

import WallThing from 'lib/things/wall';


describe('lib/things/wall', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof WallThing, 'function');
  });

  it('getTypeId', function() {
    let wall = new WallThing();
    assert.strictEqual(wall.getTypeId(), 'wall');
  });

  it('getSymbol', function() {
    let wall = new WallThing();
    assert.strictEqual(wall.getSymbol(), '#');
  });

  it('isPassable', function() {
    let wall = new WallThing();
    assert.strictEqual(wall.isPassable(), false);
  });
});

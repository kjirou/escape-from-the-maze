var assert = require('assert');

var Cell = require('lib/cell');
var Thing = require('lib/things/thing');


describe('lib/cell', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Cell, 'function');
  });

  it('isPassable', function() {
    var cell, thing;
    cell = new Cell();
    assert.strictEqual(cell.isPassable(), true);

    thing = new Thing();
    thing._isPassable = true;
    cell.setThing(thing);
    assert.strictEqual(cell.isPassable(), true);

    thing = new Thing();
    thing._isPassable = false;
    cell.setThing(thing);
    assert.strictEqual(cell.isPassable(), false);

    thing = new Thing();
    thing._isPassable = true;
    cell.setThing(thing);
    assert.strictEqual(cell.isPassable(), false);
  });

  it('toContent', function() {
    var cell;
    cell = new Cell();
    assert.strictEqual(cell.toContent(), ' ');
    cell.setThing(new Thing());
    assert.strictEqual(cell.toContent(), '?');
  });
});

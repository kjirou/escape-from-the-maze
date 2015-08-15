var assert = require('power-assert');

var Cell = require('lib/cell');
var Thing = require('lib/things/thing');


describe('lib/cell', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Cell, 'function');
  });

  it('thing accessors', function() {
    var cell = new Cell();
    var thing = new Thing();

    assert.strictEqual(cell.findThing(thing), null);
    assert.strictEqual(cell.hasThing(thing), false);
    cell.setThing(thing);
    assert.strictEqual(cell.findThing(thing), thing);
    assert.strictEqual(cell.findThingOrError(thing), thing);
    assert.strictEqual(cell.hasThing(thing), true);

    var anotherThing = new Thing();
    assert.strictEqual(cell.findThing(anotherThing), null);
    assert.throws(function() {
      cell.findThingOrError(anotherThing);
    }, /Can not /);

    assert.strictEqual(cell.removeThing(anotherThing), false);
    assert.strictEqual(cell.hasThing(thing), true);
    assert.strictEqual(cell.removeThing(thing), true);
    assert.strictEqual(cell.hasThing(thing), false);
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

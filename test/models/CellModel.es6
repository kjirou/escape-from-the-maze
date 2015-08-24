import assert from 'power-assert';

import CellModel from 'models/CellModel';
import ThingModel from 'models/things/ThingModel';


describe(__filename, function() {

  it('should be defined', function() {
    assert.strictEqual(typeof CellModel, 'function');
  });

  it('thing accessors', function() {
    let cell = new CellModel();
    let thing = new ThingModel();

    assert.strictEqual(cell.findThing(thing), null);
    assert.strictEqual(cell.hasThing(thing), false);
    cell.setThing(thing);
    assert.strictEqual(cell.findThing(thing), thing);
    assert.strictEqual(cell.findThingOrError(thing), thing);
    assert.strictEqual(cell.hasThing(thing), true);

    let anotherThing = new ThingModel();
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
    let cell, thing;
    cell = new CellModel();
    assert.strictEqual(cell.isPassable(), true);

    thing = new ThingModel();
    thing._isPassable = true;
    cell.setThing(thing);
    assert.strictEqual(cell.isPassable(), true);

    thing = new ThingModel();
    thing._isPassable = false;
    cell.setThing(thing);
    assert.strictEqual(cell.isPassable(), false);

    thing = new ThingModel();
    thing._isPassable = true;
    cell.setThing(thing);
    assert.strictEqual(cell.isPassable(), false);
  });

  it('toContent', function() {
    let cell;
    cell = new CellModel();
    assert.strictEqual(cell.toContent(), ' ');
    cell.setThing(new ThingModel());
    assert.strictEqual(cell.toContent(), '?');
  });
});

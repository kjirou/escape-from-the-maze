import assert from 'power-assert';
import validatorjs from 'validator';

import Thing from 'lib/things/thing';


describe('lib/things/thing', function() {

  it('should be defined', function() {
    assert.strictEqual(typeof Thing, 'function');
  });

  it('uuid', function() {
    let thing = new Thing();
    assert(validatorjs.isUUID(thing.uuid, 4));
  });

  it('getTypeId', function() {
    let thing = new Thing();
    assert.strictEqual(thing.getTypeId(), 'thing');
  });

  it('getSymbol', function() {
    let thing = new Thing();
    assert.strictEqual(thing.getSymbol(), '?');
  });

  it('isPassable', function() {
    let thing = new Thing();
    assert.strictEqual(thing.isPassable(), true);
    thing._isPassable = false;
    assert.strictEqual(thing.isPassable(), false);
  });

  it('toContent', function() {
    let thing = new Thing();
    assert.strictEqual(thing.toContent(), thing.getSymbol());
  });
});

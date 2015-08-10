var _ = require('lodash');
var util = require('util');

var Thing = require('lib/things/thing');


function WallThing() {
  Thing.apply(this);

  this._symbol = '#';
  this._isPassable = false;
}
util.inherits(WallThing, Thing);
_.assign(WallThing, Thing);

WallThing.typeId = 'wall';


module.exports = WallThing;

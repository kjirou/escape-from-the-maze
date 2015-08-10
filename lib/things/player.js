var _ = require('lodash');
var util = require('util');

var Thing = require('lib/things/thing');


function PlayerThing() {
  Thing.apply(this);

  this._symbol = '@';
}
util.inherits(PlayerThing, Thing);
_.assign(PlayerThing, Thing);

PlayerThing.typeId = 'player';


module.exports = PlayerThing;

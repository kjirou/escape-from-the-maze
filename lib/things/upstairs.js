var _ = require('lodash');
var util = require('util');

var Thing = require('lib/things/thing');


function UpstairsThing() {
  Thing.apply(this);

  this._symbol = '<';
}
util.inherits(UpstairsThing, Thing);
_.assign(UpstairsThing, Thing);

Thing.typeId = 'upstairs';


module.exports = UpstairsThing;

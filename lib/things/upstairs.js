var _ = require('lodash');
var util = require('util');

var Thing = require('lib/things/thing');


function UpstairsThing() {
  Thing.apply(this);

  this._symbol = '<';
}
util.inherits(UpstairsThing, Thing);
_.assign(UpstairsThing, Thing);

UpstairsThing.typeId = 'upstairs';

UpstairsThing.prototype.toContent = function toContent() {
  return '{magenta-fg}' + this._symbol + '{/}';
};


module.exports = UpstairsThing;

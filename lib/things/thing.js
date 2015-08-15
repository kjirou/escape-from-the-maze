var uuid = require('uuid');


function Thing() {
  this.uuid = uuid.v4();
  this._symbol = '?';
  this._isPassable = true;
}

Thing.typeId = 'thing';

Thing.prototype.getTypeId = function getTypeId() {
  return this.constructor.typeId;
};

Thing.prototype.getSymbol = function getSymbol() {
  return this._symbol;
};

Thing.prototype.isPassable = function isPassable() {
  return this._isPassable;
};

Thing.prototype.toContent = function toContent() {
  return this._symbol;
};


module.exports = Thing;

function Thing() {
  this._isPassable = true;
}

Thing.typeId = 'thing';

Thing.prototype.getTypeId = function getTypeId() {
  return this.constructor.typeId;
};

Thing.prototype.isPassable = function isPassable() {
  return this._isPassable;
};


module.exports = Thing;

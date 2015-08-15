function Cell() {
  this._things = [];
}

Cell.prototype.setThing = function setThing(thing) {
  this._things.push(thing);
};

Cell.prototype.isPassable = function isPassable() {
  if (this._things.length === 0) {
    return true;
  }
  return this._things.every(function(thing) {
    return thing.isPassable();
  });
};

Cell.prototype.toContent = function toContent() {
  if (this._things.length > 0) {
    return this._things[0].toContent();
  } else {
    return ' ';
  }
};


module.exports = Cell;

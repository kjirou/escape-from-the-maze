var _ = require('lodash');


function Cell() {
  this._things = [];
}

Cell.prototype.getThings = function getThings() {
  return this._things;
};

Cell.prototype.getThing = function getThing() {
  return this.getThings()[0] || null;
};

Cell.prototype.getThingOrError = function getThingOrError() {
  var thing = this.getThing();
  if (thing) {
    return thing;
  } else {
    throw new Error('Can not get a thing');
  }
};

Cell.prototype.findThing = function findThing(thing) {
  return _.find(this._things, function(thing_) {
    return thing === thing_;
  }) || null;
};

Cell.prototype.findThingOrError = function findThingOrError(thing) {
  var thing_ = this.findThing(thing);
  if (thing_) {
    return thing_;
  } else {
    throw new Error('Can not find the thing');
  }
};

Cell.prototype.hasThing = function hasThing(thing) {
  return !!this.findThing(thing);
};

Cell.prototype.setThing = function setThing(thing) {
  if (this.hasThing(thing)) {
    throw new Error('The thing is duplicated');
  }
  this._things.push(thing);
};

/*
 * @param {Thing} thing
 * @return {boolean} Removed or not removed
 */
Cell.prototype.removeThing = function removeThing(thing) {
  var removed = _.remove(this._things, function(thing_) {
    return thing === thing_;
  });
  return removed.length > 0;
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

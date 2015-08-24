import _ from 'lodash';

import Model from 'models/Model';


export default class CellModel extends Model {

  constructor() {
    super();

    this._things = [];
  }

  getThings() {
    return this._things;
  }

  getThing() {
    return this.getThings()[0] || null;
  }

  getThingOrError() {
    let thing = this.getThing();
    if (thing) {
      return thing;
    } else {
      throw new Error('Can not get a thing');
    }
  }

  findThing(thing) {
    return _.find(this._things, function(thing_) {
      return thing === thing_;
    }) || null;
  }

  findThingOrError(thing) {
    let thing_ = this.findThing(thing);
    if (thing_) {
      return thing_;
    } else {
      throw new Error('Can not find the thing');
    }
  }

  hasThing(thing) {
    return !!this.findThing(thing);
  }

  setThing(thing) {
    if (this.hasThing(thing)) {
      throw new Error('The thing is duplicated');
    }
    this._things.push(thing);
  }

  /*
   * @param {Thing} thing
   * @return {boolean} Removed or not removed
   */
  removeThing(thing) {
    let removed = _.remove(this._things, function(thing_) {
      return thing === thing_;
    });
    return removed.length > 0;
  }

  isPassable() {
    if (this._things.length === 0) {
      return true;
    }
    return this._things.every(function(thing) {
      return thing.isPassable();
    });
  }

  toContent() {
    if (this._things.length > 0) {
      return this._things[0].toContent();
    } else {
      return ' ';
    }
  }
}

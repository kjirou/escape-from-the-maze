import uuid from 'uuid';

import Model from 'models/Model';


export default class ThingModel extends Model {

  constructor() {
    super();

    this.uuid = uuid.v4();
    this._symbol = '?';
    this._isPassable = true;
    this._isPickable = false;
  }

  getTypeId() {
    return this.constructor.typeId;
  }

  getSymbol() {
    return this._symbol;
  }

  isPassable() {
    return this._isPassable;
  }

  isPickable() {
    return this._isPickable;
  }

  toContent() {
    return this._symbol;
  }
}

Object.assign(ThingModel, {
  typeId: '_thing'
});

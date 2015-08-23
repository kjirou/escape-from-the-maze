import uuid from 'uuid';


export default class Thing {

  constructor() {
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

Object.assign(Thing, {
  typeId: 'thing'
});

import uuid from 'uuid';


class Thing {

  constructor() {
    this.uuid = uuid.v4();
    this._symbol = '?';
    this._isPassable = true;
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

  toContent() {
    return this._symbol;
  }
}

Thing.typeId = 'thing';


export default Thing;

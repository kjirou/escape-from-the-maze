import Thing from 'lib/things/thing';


export default class PicksThing extends Thing {

  constructor() {
    super();

    this._symbol = 'T';
    this._isPickable = true;
  }

  toContent() {
    return '{yellow-fg}' + this._symbol + '{/}';
  }
}

Object.assign(PicksThing, {
  typeId: 'picks'
});

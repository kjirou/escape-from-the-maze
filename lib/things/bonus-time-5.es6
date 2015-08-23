import Thing from 'lib/things/thing';


export default class BonusTime5Thing extends Thing {

  constructor() {
    super();

    this._symbol = '5';
    this._isPickable = true;
  }

  toContent() {
    return '{green-fg}' + this._symbol + '{/}';
  }
}

Object.assign(BonusTime5Thing, {
  typeId: 'bonus_time_5'
});
